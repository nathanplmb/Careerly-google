import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DailyBrief } from "@/components/DailyBrief";
import { PipelineOverview } from "@/components/PipelineOverview";
import { Button } from "@/components/ui/button";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { AccountMenu } from "@/components/AccountMenu";
import { Onboarding, useOnboarding } from "@/components/Onboarding";
import {
  BiometricLockScreen,
  useBiometricLock,
} from "@/components/BiometricLock";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { biometricEnabled } from "@/lib/biometric";
import {
  addDays,
  todayIso,
  type Candidature,
  STATUTS_CANDIDATURE,
} from "@/lib/candidatures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Accueil — NACORA" }],
  }),
  component: Index,
});

function Index() {
  const { user, authLoading, items, ready, patch, save, remove } =
    useCandidatures();
  const navigate = useNavigate();
  const profil = useProfil(user);
  const [bioOn, setBioOn] = useState(false);
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<
    "offre" | "profil" | "entreprise" | "workflow"
  >("offre");

  const { unlocked, unlock } = useBiometricLock(user?.id ?? null, bioOn);
  const tuto = useOnboarding(user?.id ?? null, ready && !authLoading);

  useEffect(() => {
    if (user?.id) setBioOn(biometricEnabled(user.id));
    else setBioOn(false);
  }, [user?.id]);

  const today = todayIso();

  const stats = useMemo(() => {
    return {
      total: items.length,
      envoyees: items.filter(
        (c) => c.statut === "Candidature envoyée" || c.statut === "Relancée",
      ).length,
      entretiens: items.filter(
        (c) => c.statut === "Entretien" || c.statut === "Deuxième entretien",
      ).length,
      limites: items.filter(
        (c) =>
          c.dateLimite &&
          c.dateLimite >= today &&
          c.dateLimite <= addDays(today, 7) &&
          c.statut !== "Candidature envoyée" &&
          c.statut !== "Refusée",
      ).length,
      relances: items.filter(
        (c) =>
          c.dateRelance &&
          c.dateRelance <= today &&
          (c.statut === "Candidature envoyée" || c.statut === "Relancée"),
      ).length,
    };
  }, [items, today]);

  if (bioOn && !unlocked && !authLoading) {
    return <BiometricLockScreen userId={user?.id || ""} onUnlock={unlock} />;
  }

  return (
    <AppShell
      title={profil?.prenom ? `Bonjour, ${profil.prenom}` : "Bonjour"}
      subtitle="Voici ce qui mérite votre attention aujourd'hui."
      headerExtra={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 rounded-lg border-border/60 bg-card/40 px-3 text-xs font-medium hover:bg-accent/40"
          >
            <Link to="/opportunites">Voir mes opportunités</Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setInitialTab("offre");
              setOpen(true);
            }}
            className="h-8 rounded-lg px-3 text-xs font-medium gap-1.5 shadow-sm"
          >
            <Plus className="size-3.5" />
            Ajouter une opportunité
          </Button>
        </div>
      }
      actions={
        <div className="flex items-center gap-2">
          {authLoading && (
            <Loader2 className="size-5 animate-spin opacity-70" />
          )}
          <AccountMenu user={user} />
        </div>
      }
    >
      {/* Ligne très discrète de synthèse globale */}
      <div
        className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground/80 font-normal"
        suppressHydrationWarning
      >
        <span>
          {stats.total} opportunité{stats.total > 1 ? "s" : ""}
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span>
          {stats.envoyees} envoyée{stats.envoyees > 1 ? "s" : ""}
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span>
          {stats.limites} deadline{stats.limites > 1 ? "s" : ""}
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span>
          {stats.relances} relance{stats.relances > 1 ? "s" : ""}
        </span>
      </div>

      {/* Grille principale : À faire aujourd'hui (gauche) + Mes candidatures (droite) */}
      <div
        className="grid grid-cols-1 gap-5 lg:grid-cols-12 items-start"
        suppressHydrationWarning
      >
        <div className="lg:col-span-8 min-w-0">
          <DailyBrief
            items={items}
            ready={ready}
            userPrenom={profil?.prenom}
            onOuvrir={(c, tab) => {
              setEditing(c);
              setInitialTab(tab || "offre");
              setOpen(true);
            }}
            onPatch={patch}
            onRemove={remove}
          />
        </div>

        <div className="lg:col-span-4 min-w-0">
          <PipelineOverview items={items} />
        </div>
      </div>

      <Onboarding open={tuto.open} onOpenChange={tuto.setOpen} />

      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        initialTab={initialTab}
        existingItems={items}
        onOpenExisting={(c) => {
          setEditing(c);
          setInitialTab("offre");
          setOpen(true);
        }}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
        onDelete={async (id) => {
          await remove(id);
          setOpen(false);
        }}
      />
    </AppShell>
  );
}
