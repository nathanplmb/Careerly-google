import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/revoke-tokens")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { getAdminAuth, getAdminFirestore, verifyIsAdmin } =
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

          const auth = getAdminAuth();
          await auth.revokeRefreshTokens(body.targetUid);

          // Audit log
          const db = getAdminFirestore();
          await db
            .collection("audit_logs")
            .add({
              action: "ADMIN_REVOKE_SESSIONS",
              targetUid: body.targetUid,
              requesterUid: adminCheck.uid,
              timestamp: new Date().toISOString(),
            })
            .catch(() => {});

          return new Response(
            JSON.stringify({
              success: true,
              message:
                "Toutes les sessions actives et jetons de rafraîchissement ont été révoqués pour cet utilisateur.",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        } catch (err: unknown) {
          console.error("Erreur API /api/admin/revoke-tokens:", err);
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
