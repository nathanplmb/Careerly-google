import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Briefcase,
  Loader2,
  Send,
  Timer,
  LayoutDashboard,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DailyBrief } from "@/components/DailyBrief";
import { StatCard } from "@/components/StatCard";
import { RecentCandidatures } from "@/components/DashboardHighlights";
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
  emptyCandidature,
  todayIso,
  type Candidature,
  STATUTS_CANDIDATURE,
} from "@/lib/candidatures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Tableau de bord — NACORA" }],
  }),
  component: Index,
});

function Index() {
  const { user, authLoading, items, ready, patch, save } = useCandidatures();
  const navigate = useNavigate();
  const profil = useProfil(user);
  const [bioOn, setBioOn] = useState(false);
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);

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
      envoyees: items.filter((c) =>
        (STATUTS_CANDIDATURE as readonly string[]).includes(c.statut),
      ).length,
      entretiens: items.filter((c) => c.statut === "Entretien").length,
      limites: items.filter(
        (c) =>
          c.dateLimite &&
          c.dateLimite >= today &&
          c.dateLimite <= addDays(today, 7) &&
          c.statut === "À candidater",
      ).length,
      relances: items.filter(
        (c) =>
          c.dateRelance &&
          c.dateRelance <= today &&
          c.statut === "Candidature envoyée",
      ).length,
    };
  }, [items, today]);

  if (bioOn && !unlocked && !authLoading) {
    return <BiometricLockScreen userId={user?.id || ""} onUnlock={unlock} />;
  }

  return (
    <AppShell
      eyebrow="Tableau de bord"
      title={profil ? `Bonjour, ${profil.prenom} !` : "Bonjour !"}
      subtitle="Prêt(e) pour votre recherche d'opportunités ?"
      headerExtra={
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link to="/opportunites">Voir tout</Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            Nouvelle candidature
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
      <DailyBrief
        items={items}
        ready={ready}
        userPrenom={profil?.prenom}
        onOuvrir={(c) => {
          setEditing(c);
          setOpen(true);
        }}
      />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard
          label="Total"
          value={stats.total}
          icon={Briefcase}
          index={0}
          tone="violet"
          to="/opportunites"
        />
        <StatCard
          label="Envoyées"
          value={stats.envoyees}
          icon={Send}
          index={1}
          tone="emerald"
          to="/opportunites"
        />
        <StatCard
          label="Deadlines"
          value={stats.limites}
          icon={Timer}
          index={2}
          tone="amber"
          to="/opportunites"
        />
        <StatCard
          label="À relancer"
          value={stats.relances}
          icon={Bell}
          index={3}
          tone="lilac"
          to="/opportunites"
        />
      </div>

      <div className="mt-4 grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1.15fr_1fr]">
        <RecentCandidatures
          items={items}
          onOuvrir={(c) => {
            setEditing(c);
            setOpen(true);
          }}
        />
      </div>

      <Onboarding open={tuto.open} onOpenChange={tuto.setOpen} />

      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        existingItems={items}
        onOpenExisting={(c) => {
          setEditing(c);
          setOpen(true);
        }}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
      />
    </AppShell>
  );
}
