import {
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Profil } from "@/lib/profil";
import type { BilanCompletude } from "@/lib/profil-completion";

type Props = {
  profil: Profil;
  bilan: BilanCompletude;
  onNavigate: (tab: string) => void;
};

export function ProfilOverviewTab({ profil, bilan, onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* 1. Carte Score Global & Progression */}
      <div className="glass-card relative overflow-hidden p-6 sm:p-7 space-y-5 border-purple-500/20 bg-gradient-to-br from-card/90 via-card/70 to-purple-950/20">
        <div className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-purple-500/15 blur-3xl" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs">
                ⚡
              </span>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Score de Complétude du Dossier
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {bilan.nbComplets} sur {bilan.nbTotal} rubriques complétées avec
              succès.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`text-xs font-semibold px-3 py-1 ${bilan.badgeColor}`}
            >
              {bilan.label}
            </Badge>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              {bilan.score}%
            </span>
          </div>
        </div>

        <Progress value={bilan.score} className="h-2.5 bg-secondary" />

        {/* Grille des rubriques avec statut */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2">
          {bilan.categories.map((cat) => {
            const isComplet = cat.statut === "complet";
            const isAmeliorer = cat.statut === "a_ameliorer";

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate(cat.tab)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                  isComplet
                    ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10"
                    : isAmeliorer
                      ? "border-amber-500/25 bg-amber-500/5 text-amber-300 hover:bg-amber-500/10"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <div className="min-w-0 pr-1">
                  <span className="text-xs font-medium block truncate">
                    {cat.nom}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    {cat.points}/{cat.maxPoints} pts
                  </span>
                </div>
                {isComplet ? (
                  <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="size-3.5 text-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Suggestions Prioritaires d'Amélioration */}
      {bilan.suggestions.length > 0 && (
        <div className="glass-card p-5 sm:p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <TrendingUp className="size-4 text-purple-400" />
            Actions Prioritaires pour Maximiser votre Score
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            {bilan.suggestions.map((sug) => (
              <div
                key={sug.id}
                onClick={() => onNavigate(sug.tab)}
                className="group flex flex-col justify-between p-4 rounded-2xl border border-border/70 bg-card/60 hover:bg-card/90 hover:border-purple-500/40 transition-all cursor-pointer space-y-2.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      {sug.titre}
                    </span>
                    <Badge className="bg-purple-500/15 text-purple-300 border-purple-500/30 text-[10px] shrink-0">
                      +{sug.gain} pts
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {sug.conseil}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Compléter cette rubrique</span>
                  <ArrowRight className="size-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
