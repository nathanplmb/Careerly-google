import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id:
      typeof s["authorization_id"] === "string"
        ? (s["authorization_id"] as string)
        : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    const next = location.pathname + location.searchStr;
    if (!data.session) throw redirect({ to: "/auth", search: { next } });
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get(
      "authorization_id",
    )!;
    const { data, error } =
      await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate =
      (data as { redirect_url?: string; redirect_to?: string })?.redirect_url ??
      (data as { redirect_to?: string })?.redirect_to;
    if (immediate && !(data as { client?: unknown })?.client)
      throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center p-6 text-center">
      <p className="text-sm text-muted-foreground">
        Impossible de charger cette demande d'autorisation :{" "}
        {String((error as Error)?.message ?? error)}
      </p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData() as {
    client?: { name?: string };
  } | null;
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientName = details?.client?.name ?? "cette application";

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await supabase.auth.oauth.approveAuthorization(authorization_id)
      : await supabase.auth.oauth.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target =
      (data as { redirect_url?: string; redirect_to?: string })?.redirect_url ??
      (data as { redirect_to?: string })?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("Aucune redirection renvoyée par le serveur d'autorisation.");
      return;
    }
    window.location.href = target;
  }

  return (
    <main className="aurora-bg flex min-h-screen items-center justify-center px-5 py-10">
      <div className="glass-card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold">
          Connecter {clientName} à Careerly
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {clientName} pourra lire et modifier vos candidatures, vos contacts et
          votre profil, en votre nom. Vous pouvez révoquer cet accès à tout
          moment.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <Button
            className="flex-1"
            disabled={busy}
            onClick={() => decide(true)}
          >
            Autoriser
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            disabled={busy}
            onClick={() => decide(false)}
          >
            Refuser
          </Button>
        </div>
      </div>
    </main>
  );
}
