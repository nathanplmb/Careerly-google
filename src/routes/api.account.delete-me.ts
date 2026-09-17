import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/account/delete-me")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { executeCascadeAccountDeletion, verifyAuthToken } =
            await import("@/lib/firebase-admin.server");
          const authHeader = request.headers.get("authorization") || "";
          const token = authHeader.replace(/^Bearer\s+/i, "");

          if (!token) {
            return new Response(
              JSON.stringify({ error: "Jeton d'authentification manquant." }),
              { status: 401, headers: { "Content-Type": "application/json" } },
            );
          }

          const decoded = await verifyAuthToken(token);
          if (!decoded || !decoded.uid) {
            return new Response(
              JSON.stringify({
                error: "Jeton d'authentification invalide ou expiré.",
              }),
              { status: 401, headers: { "Content-Type": "application/json" } },
            );
          }

          const targetUid = decoded.uid;

          const result = await executeCascadeAccountDeletion({
            targetUid,
            requesterUid: targetUid,
            isSelfDeletion: true,
          });

          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: unknown) {
          console.error("Erreur API /api/account/delete-me:", err);
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
