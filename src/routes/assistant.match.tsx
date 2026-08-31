import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

import { Button } from "@/components/ui/button";
import { MatchBadge } from "@/components/MatchBadge";
import { MatchPanel } from "@/components/MatchPanel";
import { AiContextCard } from "@/components/ai-hub/AiContextCard";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { matchObsolete, niveauMatch } from "@/lib/matching";
import { lancerAnalyse, offreAnalysable } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import type { Candidature } from "@/lib/candidatures";

export const Route = createFileRoute("/assistant/match")({
  head: () => ({
    meta: [
      { title: "Match IA — Careerly AI Hub" },
      {
        name: "description",
        content:
          "Classement IA de vos offres : score de correspondance, points forts, vigilance et compétences à renforcer.",
      },
      { property: "og:title", content: "Match IA — Careerly AI Hub" },
      {
        property: "og:description",
        content:
          "Comparez votre profil à chaque offre et priorisez les candidatures avec le meilleur potentiel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MatchPage,
});

function MatchPage() {
  const { user, authLoading, items, patch } = useCandidatures();
  const profil = useProfil(user);
  const [selection, setSelection] = useState<string | null>(null);
  const [enCours, setEnCours] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [maj, setMaj] = useState<{ fait: number; total: number } | null>(null);

  const classement = useMemo(
    () =>
      [...items].sort(
        (a, b) => (b.match?.global ?? -1) - (a.match?.global ?? -1),
      ),
    [items],
  );

  const courant: Candidature | null =
    classement.find((c) => c.id === selection) ?? classement[0] ?? null;

  const moyenne = useMemo(() => {
    const s = items.map((c) => c.match?.global).filter((v): v is number => !!v);
    return s.length ? Math.round(s.reduce((a, b) => a + b, 0) / s.length) : 0;
  }, [items]);

  const analyser = async (c: Candidature) => {
    if (!profil) {
      setErreur("Complétez d'abord votre profil.");
      return;
    }
    if (!offreAnalysable(c)) {
      setErreur("Ajoutez le détail de l'offre avant de lancer l'analyse.");
      return;
    }
    setErreur(null);
    setEnCours(c.id);
    try {
      const match = await lancerAnalyse(c, profil);
      patch(c.id, { match });
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setEnCours(null);
    }
  };

  const toutAnalyser = async () => {
    if (!profil || maj) return;
    const cibles = items.filter(
      (c) => offreAnalysable(c) && (!c.match || matchObsolete(c, profil)),
    );
    if (!cibles.length) {
      toast.info("Tous les matchs IA sont à jour.");
      return;
    }
    setMaj({ fait: 0, total: cibles.length });
    let erreurs = 0;
    let message = "";
    for (const [i, c] of cibles.entries()) {
      try {
        const match = await lancerAnalyse(c, profil);
        patch(c.id, { match });
      } catch (e) {
        erreurs += 1;
        message = texteErreurIA(e);
        if (
          /crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(
            message,
          )
        )
          break;
      }
      setMaj({ fait: i + 1, total: cibles.length });
    }
    setMaj(null);
    if (erreurs) toast.warning(message || `${erreurs} analyse(s) en échec.`);
    else toast.success("Matchs IA à jour.");
  };

  return (
    <AppShell
      eyebrow="Careerly AI Hub"
      title="Match IA & Compatibilité"
      subtitle={`Score moyen de ${moyenne}% sur ${items.length} opportunité(s)`}
      headerExtra={
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground"
        >
          <Link to="/assistant">
            <ArrowLeft className="size-3.5" />
            <span>Retour AI Hub</span>
          </Link>
        </Button>
      }
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="space-y-6">
        {/* Context Card */}
        <AiContextCard />

        {/* Global actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="secondary"
            disabled={!!maj || !profil}
            onClick={() => void toutAnalyser()}
            className="h-9 gap-2 rounded-xl text-xs font-semibold shadow-sm"
          >
            {maj ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>
                  Actualisation {maj.fait}/{maj.total}
                </span>
              </>
            ) : (
              <>
                <RefreshCw className="size-3.5" />
                <span>Actualiser tous les matchs ({items.length})</span>
              </>
            )}
          </Button>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-primary hover:text-primary/80"
          >
            <Link to="/assistant">
              <span>Lancer le Workflow complet</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Grid: List + Detail panel */}
        <div className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1fr_1.1fr]">
          <section className="glass-card pop-in p-4">
            <h2 className="mb-3 px-1 text-sm font-semibold">
              Classement des offres ({classement.length})
            </h2>
            {classement.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Aucune opportunité à analyser. Ajoutez des candidatures depuis
                l'onglet Candidatures ou l'AI Hub.
              </p>
            )}
            <ul className="flex flex-col gap-1.5">
              {classement.map((c, i) => {
                const score = c.match?.global;
                const n = typeof score === "number" ? niveauMatch(score) : null;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSelection(c.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors ${
                        courant?.id === c.id
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/60 bg-card/50 hover:bg-accent/40"
                      }`}
                    >
                      <span className="w-5 shrink-0 text-xs text-muted-foreground font-semibold">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-medium">
                          {c.entreprise || "Sans entreprise"}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {c.poste}
                        </span>
                      </span>
                      {enCours === c.id ? (
                        <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
                      ) : c.match ? (
                        <MatchBadge
                          match={c.match}
                          obsolete={matchObsolete(c, profil)}
                        />
                      ) : (
                        <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                          <Sparkles className="size-3.5" /> non analysé
                        </span>
                      )}
                      {n && <span className="sr-only">{n.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="pop-in">
            {courant ? (
              <MatchPanel
                match={courant.match}
                obsolete={matchObsolete(courant, profil)}
                loading={enCours === courant.id}
                erreur={erreur}
                profilPret={!!profil}
                offrePrete={offreAnalysable(courant)}
                onAnalyser={() => void analyser(courant)}
                candidature={courant}
              />
            ) : (
              <p className="glass-card p-8 text-center text-sm text-muted-foreground">
                Sélectionnez une offre pour voir l'analyse détaillée.
              </p>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
