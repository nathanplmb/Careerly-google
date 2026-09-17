import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/diagnose")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { searchAndDiagnoseUser, verifyIsAdmin } =
            await import("@/lib/firebase-admin.server");
          const authHeader = request.headers.get("authorization") || "";
          const token = authHeader.replace(/^Bearer\s+/i, "");

          if (!token) {
            return new Response(
              JSON.stringify({ error: "Jeton d'authentification manquant." }),
              { status: 401, headers: { "Content-Type": "application/json" } },
            );
          }

          const adminCheck = await verifyIsAdmin(token);
          if (!adminCheck || !adminCheck.isAdmin) {
            return new Response(
              JSON.stringify({
                error: "Accès refusé. Privilèges administrateur requis.",
              }),
              { status: 403, headers: { "Content-Type": "application/json" } },
            );
          }

          const body = (await request.json().catch(() => ({}))) as {
            query?: string;
          };
          if (!body.query) {
            return new Response(
              JSON.stringify({
                error: "Paramètre de recherche 'query' manquant.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const diagnosedUser = await searchAndDiagnoseUser(body.query);
          return new Response(
            JSON.stringify({
              found: Boolean(diagnosedUser),
              user: diagnosedUser,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (err: unknown) {
          console.error("Erreur API /api/admin/diagnose:", err);
          const msg = err instanceof Error ? err.message : String(err);
          return new Response(
            JSON.stringify({ error: `Erreur serveur: ${msg}` }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
