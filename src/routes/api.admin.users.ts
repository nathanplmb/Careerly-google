import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/users")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const { listAllUsersAdmin, verifyIsAdmin } =
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

          const data = await listAllUsersAdmin();
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: unknown) {
          console.error("Erreur API /api/admin/users:", err);
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
