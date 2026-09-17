import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/delete-user")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { executeCascadeAccountDeletion, verifyIsAdmin } =
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
            targetUid?: string;
          };

          if (!body.targetUid) {
            return new Response(
              JSON.stringify({ error: "Paramètre 'targetUid' requis." }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const result = await executeCascadeAccountDeletion({
            targetUid: body.targetUid,
            requesterUid: adminCheck.uid,
            isSelfDeletion: false,
          });

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: unknown) {
          console.error("Erreur API /api/admin/delete-user:", err);
          const msg = err instanceof Error ? err.message : String(err);
          return new Response(JSON.stringify({ error: msg }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
