import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Copy,
  Download,
  Globe,
  Loader2,
  LogIn,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { fetchContacts } from "@/lib/contacts-cloud";
import { supabase } from "@/integrations/supabase/client";
import { setCompteActif } from "@/lib/auth-local";
import {
  appliquerCodeTransfert,
  genererCodeTransfert,
} from "@/lib/sync-transfert";
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
  const [syncCode, setSyncCode] = useState("");
  const [importCode, setImportCode] = useState("");

  const handleGenerateSyncCode = () => {
    const code = genererCodeTransfert();
    setSyncCode(code);
    toast.success("Code de transfert généré !");
  };

  const handleCopyCode = async () => {
    if (!syncCode) return;
    try {
      await navigator.clipboard.writeText(syncCode);
      toast.success("Code copié dans le presse-papiers !");
    } catch {
      toast.info("Copiez manuellement le code affiché.");
    }
  };

  const handleApplyCode = async () => {
    if (!importCode.trim()) {
      toast.error("Veuillez coller un code de synchronisation valide.");
      return;
    }
    const res = appliquerCodeTransfert(importCode);
    if (res.success) {
      toast.success(
        `Synchronisation réussie ! ${res.candidaturesCount} candidatures et ${res.contactsCount} contacts importés.`,
      );
      await queryClient.invalidateQueries();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast.error(res.message);
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    setCompteActif(null);
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignorer
    }
    toast.success("Déconnexion réussie");
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

        <Carte
          titre="Synchronisation & Transfert (Preview ⇄ Vercel)"
          description="Transférez l'intégralité de vos candidatures, contacts et profil entre la Preview Google AI Studio et votre déploiement Vercel en 1 clic sans aucune configuration serveur."
        >
          <div className="w-full space-y-4">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">
                  1. Exporter vos données de cet appareil
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleGenerateSyncCode}
                    className="h-7 text-xs gap-1.5"
                  >
                    <RefreshCw className="size-3" /> Générer le code
                  </Button>
                  {syncCode && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyCode}
                      className="h-7 text-xs gap-1.5"
                    >
                      <Copy className="size-3" /> Copier
                    </Button>
                  )}
                </div>
              </div>
              {syncCode && (
                <Textarea
                  readOnly
                  rows={2}
                  value={syncCode}
                  className="font-mono text-[10px] resize-none bg-background/50 select-all"
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />
              )}
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/20 p-3 space-y-2">
              <span className="text-xs font-semibold">
                2. Importer et écraser/mettre à jour avec un code de transfert
              </span>
              <Textarea
                rows={2}
                placeholder="Collez le code CAREERLY_SYNC_... généré depuis votre autre environnement"
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                className="font-mono text-xs resize-none"
              />
              <Button
                size="sm"
                onClick={handleApplyCode}
                className="w-full gap-2 mt-1"
              >
                <Globe className="size-3.5" /> Appliquer la synchronisation
                immédiatement
              </Button>
            </div>
          </div>
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
