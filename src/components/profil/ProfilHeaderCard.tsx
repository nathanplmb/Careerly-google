import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileText,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { Profil } from "@/lib/profil";
import type { BilanCompletude } from "@/lib/profil-completion";

type Props = {
  profil: Profil;
  bilan: BilanCompletude;
  onOpenCvModal: () => void;
  onOpenSummaryIaModal: () => void;
  onOpenOptimizerModal: () => void;
  onSelectTab: (tab: string) => void;
  saving?: boolean;
};

export function ProfilHeaderCard({
  profil,
  bilan,
  onOpenCvModal,
  onOpenSummaryIaModal,
  onOpenOptimizerModal,
  onSelectTab,
  saving,
}: Props) {
  const nomAffiche =
    profil.prenom || profil.nom
      ? `${profil.prenom} ${profil.nom}`.trim()
      : "Candidat";

  const initiales =
    (profil.prenom?.[0] || "") + (profil.nom?.[0] || "") ||
    profil.ecole?.[0] ||
    "C";

  const titrePro =
    profil.titre ||
    profil.cvStructure?.titre ||
    [profil.formation, profil.ecole].filter(Boolean).join(" @ ") ||
    "Profil Candidat";

  return (
    <div className="glass-card relative overflow-hidden p-6 sm:p-7 space-y-6 border-purple-500/20 bg-gradient-to-br from-card/90 via-card/70 to-purple-950/20">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-purple-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Rangée supérieure : Identité & Actions IA */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Identité & Titre */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-xl font-bold text-white shadow-lg shadow-purple-600/30 border border-purple-400/30">
            {profil.photoUrl ? (
              <img
                src={profil.photoUrl}
                alt={nomAffiche}
                className="size-full rounded-2xl object-cover"
              />
            ) : (
              initiales.toUpperCase()
            )}
            <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background text-[10px]">
              ✓
            </span>
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl truncate">
                {nomAffiche}
              </h1>
              <Badge
                variant="outline"
                className={`text-xs font-semibold px-2.5 py-0.5 ${bilan.badgeColor}`}
              >
                {bilan.label}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm font-medium text-purple-300">
              {titrePro}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {profil.contrats && (
                <span className="inline-flex items-center rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-xs font-medium text-purple-200">
                  🎯 {profil.contrats}
                </span>
              )}
              {profil.localisation && (
                <span className="inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  📍 {profil.localisation}
                </span>
              )}
              {profil.modeTravail && (
                <span className="inline-flex items-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                  💻 {profil.modeTravail}
                </span>
              )}
              {profil.dateDebut && (
                <span className="inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  ⏱️ Dispo : {profil.dateDebut}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Boutons d'action IA rapides */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
          <Button
            size="sm"
            onClick={onOpenCvModal}
            className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 text-xs font-semibold"
          >
            <FileText className="size-3.5" />
            Analyser mon CV
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onOpenSummaryIaModal}
            className="gap-1.5 border-purple-500/30 hover:bg-purple-500/10 text-purple-300 text-xs font-semibold"
          >
            <Sparkles className="size-3.5" />
            Synthèse & Conseils IA
          </Button>
        </div>
      </div>

      {/* Rangée inférieure : Jauge de complétude & Checklist de rubriques */}
      <div className="rounded-2xl border border-border/60 bg-background/50 p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs">
              ⚡
            </span>
            <div>
              <span className="text-xs font-bold text-foreground block">
                Niveau de complétude du profil ({bilan.nbComplets}/
                {bilan.nbTotal} rubriques complètes)
              </span>
              <span className="text-[11px] text-muted-foreground">
                Plus votre profil est riche, plus le Match IA et le Coach
                d'entretien sont précis.
              </span>
            </div>
          </div>

          <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            {bilan.score}% complet
          </span>
        </div>

        <Progress value={bilan.score} className="h-2 bg-secondary" />

        {/* Pilules interactives des rubriques */}
        <div className="flex flex-wrap gap-2 pt-1">
          {bilan.categories?.map((cat) => {
            const isComplet = cat.statut === "complet";
            const isAmeliorer = cat.statut === "a_ameliorer";

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectTab(cat.tab)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                  isComplet
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : isAmeliorer
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"
                }`}
              >
                {isComplet ? (
                  <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                ) : isAmeliorer ? (
                  <AlertCircle className="size-3 text-amber-400 shrink-0" />
                ) : (
                  <span className="size-2 rounded-full bg-muted-foreground/50 shrink-0" />
                )}
                <span>{cat.nom}</span>
              </button>
            );
          })}
        </div>

        {/* Suggestion prioritaire intelligente */}
        {bilan.suggestions.length > 0 && (
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/40 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-purple-400 font-bold shrink-0">
                💡 Conseil IA :
              </span>
              <span className="text-muted-foreground truncate">
                {bilan.suggestions[0].titre}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab(bilan.suggestions[0].tab)}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 shrink-0"
            >
              Compléter (+{bilan.suggestions[0].gain} pts)
              <ArrowUpRight className="size-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
