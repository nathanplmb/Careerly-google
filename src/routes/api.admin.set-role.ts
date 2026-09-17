import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/admin/set-role")({
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
            isAdmin?: boolean;
          };

          if (!body.targetUid || typeof body.isAdmin !== "boolean") {
            return new Response(
              JSON.stringify({
                error: "Paramètres 'targetUid' et 'isAdmin' requis.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const auth = getAdminAuth();
          const db = getAdminFirestore();

          const targetUser = await auth
            .getUser(body.targetUid)
            .catch(() => null);
          const targetEmail = (targetUser?.email || "").toLowerCase();

          // Protection du super admin
          if (targetEmail === SUPER_ADMIN_EMAIL && !body.isAdmin) {
            return new Response(
              JSON.stringify({
                error:
                  "Impossible de révoquer le rôle du super-administrateur principal.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          // Protection contre la révocation du dernier admin
          if (!body.isAdmin) {
            const currentAdminsSnap = await db.collection("admins").get();
            if (
              currentAdminsSnap.docs.some((d) => d.id === body.targetUid) &&
              currentAdminsSnap.size <= 1
            ) {
              return new Response(
                JSON.stringify({
                  error:
                    "Impossible de révoquer le dernier administrateur actif du système.",
                }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }
          }

          // 1. Mise à jour collection /admins/{uid}
          if (body.isAdmin) {
            await db
              .collection("admins")
              .doc(body.targetUid)
              .set(
                {
                  user_id: body.targetUid,
                  email: targetEmail || "",
                  role:
                    targetEmail === SUPER_ADMIN_EMAIL ? "super_admin" : "admin",
                  promuPar: adminCheck.uid,
                  promuLe: new Date().toISOString(),
                },
                { merge: true },
              );
          } else {
            await db.collection("admins").doc(body.targetUid).delete();
          }

          // 2. Mise à jour Custom Claims dans Firebase Auth
          if (targetUser) {
            const currentClaims = targetUser.customClaims || {};
            await auth.setCustomUserClaims(body.targetUid, {
              ...currentClaims,
              admin: body.isAdmin,
            });
          }

          // 3. Journalisation audit
          await db
            .collection("audit_logs")
            .add({
              action: body.isAdmin
                ? "ADMIN_ROLE_GRANTED"
                : "ADMIN_ROLE_REVOKED",
              targetUid: body.targetUid,
              targetEmail,
              requesterUid: adminCheck.uid,
              timestamp: new Date().toISOString(),
            })
            .catch(() => {});

          return new Response(
            JSON.stringify({
              success: true,
              isAdmin: body.isAdmin,
              message: body.isAdmin
                ? `Rôle administrateur accordé avec succès à ${targetEmail || body.targetUid}.`
                : `Rôle administrateur retiré avec succès pour ${targetEmail || body.targetUid}.`,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        } catch (err: unknown) {
          console.error("Erreur API /api/admin/set-role:", err);
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
