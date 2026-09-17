import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/toggle-status")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const {
            getAdminAuth,
            getAdminFirestore,
            SUPER_ADMIN_EMAIL,
            verifyIsAdmin,
          } = await import("@/lib/firebase-admin.server");
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
            disabled?: boolean;
          };

          if (!body.targetUid || typeof body.disabled !== "boolean") {
            return new Response(
              JSON.stringify({
                error: "Paramètres 'targetUid' et 'disabled' requis.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const auth = getAdminAuth();
          const targetUser = await auth.getUser(body.targetUid);
          if ((targetUser.email || "").toLowerCase() === SUPER_ADMIN_EMAIL) {
            return new Response(
              JSON.stringify({
                error:
                  "Impossible de désactiver le compte super-administrateur principal.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          await auth.updateUser(body.targetUid, {
            disabled: body.disabled,
          });

          if (body.disabled) {
            // Révocation des sessions actives
            await auth.revokeRefreshTokens(body.targetUid).catch(() => {});
          }

          // Audit log
          const db = getAdminFirestore();
          await db
            .collection("audit_logs")
            .add({
              action: body.disabled
                ? "ADMIN_DISABLE_USER"
                : "ADMIN_ENABLE_USER",
              targetUid: body.targetUid,
              targetEmail: targetUser.email,
              requesterUid: adminCheck.uid,
              timestamp: new Date().toISOString(),
            })
            .catch(() => {});

          return new Response(
            JSON.stringify({
              success: true,
              disabled: body.disabled,
              message: body.disabled
                ? `Le compte ${targetUser.email || body.targetUid} a été désactivé et ses sessions révoquées.`
                : `Le compte ${targetUser.email || body.targetUid} a été réactivé avec succès.`,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        } catch (err: unknown) {
          console.error("Erreur API /api/admin/toggle-status:", err);
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
