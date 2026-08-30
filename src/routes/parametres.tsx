import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  Download,
  Loader2,
  LogIn,
  LogOut,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { fetchContacts } from "@/lib/contacts-cloud";
import { supabase } from "@/integrations/supabase/client";
import { UsageIaCard } from "@/components/UsageIaCard";

export const Route = createFileRoute("/parametres")({
  head: () => ({
    meta: [
      { title: "Paramètres — Careerly" },
      {
        name: "description",
        content:
          "Gérez votre compte Careerly, exportez vos candidatures et contrôlez vos données locales.",
      },
      { property: "og:title", content: "Paramètres — Careerly" },
      {
        property: "og:description",
        content: "Compte, export de données et confidentialité dans Careerly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ParametresPage,
});

function Carte({
  titre,
  description,
  children,
}: {
  titre: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card pop-in p-5">
      <h2 className="text-sm font-semibold">{titre}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

function telecharger(nom: string, contenu: string, type: string) {
  const url = URL.createObjectURL(new Blob([contenu], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nom;
  a.click();
  URL.revokeObjectURL(url);
}

function csv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]!);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [
    cols.join(","),
    ...rows.map((r) => cols.map((c) => esc(r[c])).join(",")),
  ].join("\n");
}

function ParametresPage() {
  const { user, authLoading, items } = useCandidatures();
  const profil = useProfil(user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const exportJson = async () => {
    setBusy(true);
    try {
      const contacts = user ? await fetchContacts().catch(() => []) : [];
      telecharger(
        `careerly-export-${new Date().toISOString().slice(0, 10)}.json`,
        JSON.stringify({ profil, candidatures: items, contacts }, null, 2),
        "application/json",
      );
      toast.success("Export téléchargé.");
    } finally {
      setBusy(false);
    }
  };

  const exportCsv = () => {
    const rows = items.map((c) => ({
      entreprise: c.entreprise,
      poste: c.poste,
      lieu: c.lieu,
      statut: c.statut,
      dateEnvoi: c.dateEnvoi,
      dateRelance: c.dateRelance,

      dateLimite: c.dateLimite,
      source: c.source,
      secteur: c.secteur,
      priorite: c.priorite,
      match: c.match?.global ?? "",
    }));
    if (!rows.length) {
      toast.info("Aucune candidature à exporter.");
      return;
    }
    telecharger(
      `careerly-candidatures-${new Date().toISOString().slice(0, 10)}.csv`,
      csv(rows),
      "text/csv;charset=utf-8",
    );
  };

  const viderLocal = () => {
    if (!confirm("Effacer les données enregistrées sur cet appareil ?")) return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith("careerly.") || k.startsWith("suivit-stage"))
      .forEach((k) => localStorage.removeItem(k));
    toast.success("Données locales effacées. Rechargez la page.");
  };

  return (
    <AppShell
      eyebrow="Compte"
      title="Paramètres"
      subtitle="Compte, données et confidentialité"
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Carte
          titre="Compte"
          description={
            user
              ? `Connecté en tant que ${user.email ?? "utilisateur"}. Vos données sont synchronisées entre vos appareils.`
              : "Vous n'êtes pas connecté : vos données restent sur cet appareil uniquement."
          }
        >
          {user ? (
            <>
              <Button variant="secondary" asChild>
                <Link to="/profil">
                  <UserRound /> Mon profil
                </Link>
              </Button>
              <Button variant="outline" onClick={() => void signOut()}>
                <LogOut /> Se déconnecter
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">
                <LogIn /> Se connecter
              </Link>
            </Button>
          )}
        </Carte>

        <UsageIaCard connecte={!!user} />

        <Carte
          titre="Exporter mes données"
          description="Téléchargez une copie complète de vos candidatures, contacts et profil."
        >
          <Button
            variant="secondary"
            onClick={() => void exportJson()}
            disabled={busy}
          >
            {busy ? <Loader2 className="animate-spin" /> : <Download />} Export
            JSON
          </Button>
          <Button variant="secondary" onClick={exportCsv}>
            <Download /> Candidatures CSV
          </Button>
        </Carte>

        <Carte
          titre="Confidentialité"
          description="Les analyses IA utilisent uniquement les informations que vous saisissez (profil, offres, contacts). Aucune donnée n'est partagée avec des tiers en dehors du traitement de la demande."
        >
          <Button variant="secondary" asChild>
            <Link to="/assistant/connect">
              <ShieldCheck /> Connexions IA
            </Link>
          </Button>
        </Carte>

        <Carte
          titre="Données de cet appareil"
          description="Efface la copie locale (profil, candidatures hors ligne, lettres). Vos données cloud restent intactes si vous êtes connecté."
        >
          <Button variant="destructive" onClick={viderLocal}>
            <Trash2 /> Effacer les données locales
          </Button>
        </Carte>
      </div>
    </AppShell>
  );
}
