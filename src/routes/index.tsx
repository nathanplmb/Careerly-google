import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Bell,
  Briefcase,
  Loader2,
  LogIn,
  GraduationCap,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DailyBrief } from "@/components/DailyBrief";
import { StatCard } from "@/components/StatCard";
import {
  AiBar,
  MatchSpotlight,
  RecentCandidatures,
} from "@/components/DashboardHighlights";
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
import { matchObsolete } from "@/lib/matching";
import { lancerAnalyse, offreAnalysable } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import { biometricEnabled } from "@/lib/biometric";
import {
  addDays,
  emptyCandidature,
  todayIso,
  type Candidature,
} from "@/lib/candidatures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — NACORA" },
      {
        name: "description",
        content:
          "Votre copilote de recherche de stage : brief quotidien, relances, deadlines et match IA en un coup d'œil.",
      },
      { property: "og:title", content: "Tableau de bord — NACORA" },
      {
        property: "og:description",
        content:
          "Brief quotidien, relances, deadlines et match IA : tout votre suivi de candidatures dans NACORA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
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
  const [majMatchs, setMajMatchs] = useState<{
    fait: number;
    total: number;
  } | null>(null);

  const { unlocked, unlock } = useBiometricLock(user?.id ?? null, bioOn);
  const tuto = useOnboarding(user?.id ?? null, ready && !authLoading);

  useEffect(() => {
    if (user?.id) setBioOn(biometricEnabled(user.id));
    else setBioOn(false);
  }, [user?.id]);

  const today = todayIso();

  const marquerPostule = (c: Candidature) =>
    patch(c.id, {
      statut: "J'ai postulé",
      dateEnvoi: today,
      dateRelance: addDays(today, 10),
      dateDernierContact: today,
    });

  const marquerRelance = (c: Candidature) =>
    patch(c.id, {
      statut: "J'ai relancé",
      dateRelance: c.dateRelance || today,
      dateDernierContact: today,
    });

  const analyserLigne = async (c: Candidature) => {
    if (!profil) {
      toast.error("Complétez d'abord votre profil pour lancer l'analyse.");
      return;
    }
    if (!offreAnalysable(c)) {
      toast.error("Ajoutez le détail de l'offre avant de lancer l'analyse.");
      return;
    }
    try {
      const match = await lancerAnalyse(c, profil);
      patch(c.id, { match });
      toast.success(`Analyse terminée : ${match.global} / 100`);
    } catch (e) {
      toast.error(texteErreurIA(e));
    }
  };

  /** Ré-analyse les offres sans match ou dont le match est obsolète. */
  const rafraichirMatchs = async (opts?: { silencieux?: boolean }) => {
    if (!profil || majMatchs) return;
    const cibles = items.filter(
      (c) => offreAnalysable(c) && (!c.match || matchObsolete(c, profil)),
    );
    if (cibles.length === 0) {
      if (!opts?.silencieux) toast.info("Tous les matchs IA sont à jour.");
      return;
    }
    setMajMatchs({ fait: 0, total: cibles.length });
    let erreurs = 0;
    let messageErreur = "";
    for (const [i, c] of cibles.entries()) {
      try {
        const match = await lancerAnalyse(c, profil);
        patch(c.id, { match });
      } catch (e) {
        erreurs += 1;
        messageErreur = texteErreurIA(e);
        if (
          /crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(
            messageErreur,
          )
        ) {
          setMajMatchs({ fait: i + 1, total: cibles.length });
          break;
        }
      }
      setMajMatchs({ fait: i + 1, total: cibles.length });
    }
    setMajMatchs(null);
    const ok = cibles.length - erreurs;
    if (erreurs && ok === 0)
      toast.error(messageErreur || "Mise à jour des matchs IA impossible.");
    else if (erreurs)
      toast.warning(`${ok} match(s) mis à jour, ${erreurs} en échec.`);
    else if (!opts?.silencieux) toast.success(`${ok} match(s) IA mis à jour.`);
  };

  // Aucun rafraîchissement automatique des matchs IA : action manuelle uniquement
  // (bouton « Actualiser les matchs IA ») pour économiser les crédits.

  const stats = useMemo(() => {
    return {
      total: items.length,
      envoyees: items.filter((c) => c.statut !== "Je vais postuler").length,
      entretiens: items.filter((c) => c.statut === "J'ai un entretien").length,
      limites: items.filter(
        (c) =>
          c.dateLimite &&
          c.dateLimite >= today &&
          c.dateLimite <= addDays(today, 7) &&
          c.statut === "Je vais postuler",
      ).length,
      relances: items.filter(
        (c) =>
          c.dateRelance &&
          c.dateRelance <= today &&
          c.statut === "J'ai postulé",
      ).length,
    };
  }, [items, today]);

  const scoreMoyen = useMemo(() => {
    const scores = items
      .map((c) => c.match?.global)
      .filter((v): v is number => !!v);
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [items]);

  const meilleurMatch = useMemo(() => {
    const avec = items.filter((c) => c.match);
    if (!avec.length) return null;
    return avec.reduce((a, b) =>
      (b.match?.global ?? 0) > (a.match?.global ?? 0) ? b : a,
    );
  }, [items]);

  if (user && bioOn && !unlocked) {
    return <BiometricLockScreen userId={user.id} onUnlock={unlock} />;
  }

  return (
    <AppShell
      onAdd={() => {
        setEditing(emptyCandidature());
        setOpen(true);
      }}
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : !user ? (
          <AccountMenu user={null} />
        ) : null
      }
    >
      <div className="pop-in mb-6">
        <p className="text-[15px] font-medium text-muted-foreground">
          Bonjour {profil?.prenom || user?.email?.split("@")[0] || "à vous"} 👋
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-[34px] sm:leading-tight">
          Voici ce qui mérite votre{" "}
          <span className="text-gradient">attention</span> aujourd'hui.
        </h1>
      </div>

      <DailyBrief
        items={items}
        profil={profil}
        pret={ready}
        onPostuler={marquerPostule}
        onRelancer={marquerRelance}
        onOuvrir={(c) => {
          setEditing(c);
          setOpen(true);
        }}
        onAnalyser={(c) => void analyserLigne(c)}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Candidatures"
          value={stats.total}
          icon={Briefcase}
          index={0}
          tone="violet"
          to="/candidatures"
          delta={`${stats.envoyees} envoyées`}
        />
        <StatCard
          label="Entretiens"
          value={stats.entretiens}
          icon={Send}
          index={1}
          tone="lilac"
          to="/candidatures"
          search={{ statut: "J'ai un entretien" }}
          delta="en cours"
        />
        <StatCard
          label="Relances à faire"
          value={stats.relances}
          icon={Bell}
          index={2}
          tone="amber"
          to="/candidatures"
          search={{ vue: "relances" }}
          accent={stats.relances > 0}
          delta={`${stats.limites} deadline(s) < 7 j`}
        />
        <StatCard
          label="Score moyen"
          value={scoreMoyen}
          suffix="%"
          icon={Sparkles}
          index={3}
          tone="emerald"
          to="/assistant/match"
          delta="match IA"
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
        <MatchSpotlight
          candidature={meilleurMatch}
          onOuvrir={(c) => {
            setEditing(c);
            setOpen(true);
          }}
        />
      </div>

      <div className="glass-card mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">Toutes vos candidatures</p>
          <p className="text-xs text-muted-foreground">
            Tableau complet avec filtres, tri, actions rapides et export.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={tuto.ouvrir}>
            <GraduationCap /> Revoir le tutoriel
          </Button>
          <Button
            variant="secondary"
            disabled={!!majMatchs || !profil}
            onClick={() => void rafraichirMatchs()}
          >
            {majMatchs ? (
              <>
                <Loader2 className="animate-spin" /> Matchs IA {majMatchs.fait}/
                {majMatchs.total}
              </>
            ) : (
              <>
                <RefreshCw /> Actualiser les matchs IA
              </>
            )}
          </Button>
          <Button asChild>
            <Link to="/candidatures">
              Ouvrir le tableau <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <AiBar
        onCv={() => void navigate({ to: "/profil" })}
        onEmail={() => void navigate({ to: "/contacts" })}
        onEntretien={() => void navigate({ to: "/assistant/interview" })}
      />

      <Onboarding open={tuto.open} onOpenChange={tuto.setOpen} />

      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        profil={profil}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
      />
    </AppShell>
  );
}
