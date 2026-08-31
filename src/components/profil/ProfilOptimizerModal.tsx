import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Target,
  Key,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import type { Profil } from "@/lib/profil";
import { optimiserProfilIA } from "@/lib/profil-ia.functions";
import type { AuditProfilIA } from "@/lib/profil-ia.server";
import { profilEnTexte } from "@/lib/match-run";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profil: Profil;
  onNavigateTab: (tab: string) => void;
};

export function ProfilOptimizerModal({
  open,
  onOpenChange,
  profil,
  onNavigateTab,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditProfilIA | null>(null);

  const handleLancerAudit = async () => {
    setLoading(true);
    try {
      const profilTexte = profilEnTexte(profil);
      const res = await optimiserProfilIA({ data: { profilTexte } });
      setAudit(res as AuditProfilIA);
      toast.success("Audit d'optimisation IA terminé !");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'audit IA du profil.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20">
                <Sparkles className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  Optimiser mon profil avec l'IA
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Audit ATS & Recruteur : recommandations concrètes STAR, KPI
                  chiffrés et mots-clés stratégiques.
                </DialogDescription>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLancerAudit}
              disabled={loading}
              className="gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0"
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              />
              {audit ? "Ré-auditer" : "Lancer l'audit"}
            </Button>
          </div>
        </DialogHeader>

        {!audit && !loading && (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <TrendingUp className="size-7" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">
                Audit de valorisation & compatibilité recruteurs
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                L'IA analyse vos descriptions d'expériences, la pertinence de
                vos compétences et la précision de vos objectifs pour vous
                donner des conseils d'impact immédiat.
              </p>
            </div>
            <Button
              onClick={handleLancerAudit}
              className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20"
            >
              <Sparkles className="size-4" />
              Auditer et valoriser mon profil
            </Button>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center space-y-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse">
              <RefreshCw className="size-6 animate-spin" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Audit approfondi en cours...
            </p>
            <p className="text-xs text-muted-foreground">
              Vérification des mots-clés ATS, structure STAR et valorisation
              chiffrée
            </p>
          </div>
        )}

        {audit && !loading && (
          <div className="space-y-6 pt-2">
            {/* Score Qualité & Bilan global */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    Score Qualité du Profil
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  Diagnostic stratégique de vos candidatures
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {audit.syntheseStrategique}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-background/80 px-5 py-3 shrink-0 shadow-inner">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  {audit.scoreQualite}/100
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Niveau d'impact
                </span>
              </div>
            </div>

            {/* Mots-clés recommandés pour les ATS et Recruteurs */}
            {audit.motsClesRecommandes?.length > 0 && (
              <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <Key className="size-4" />
                  Mots-clés stratégiques à intégrer dans votre profil
                </div>
                <div className="flex flex-wrap gap-2">
                  {audit.motsClesRecommandes.map((mot, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300"
                    >
                      + {mot}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Axes d'amélioration concrets */}
            {audit.axesAmelioration?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <AlertCircle className="size-4 text-purple-400" />
                  Axes d'amélioration prioritaires
                </h4>
                <div className="space-y-3">
                  {audit.axesAmelioration.map((axe, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/70 bg-card/70 p-4 space-y-2.5 transition-all hover:border-purple-500/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">
                            {axe.rubrique}
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-semibold ${
                              axe.impact === "fort"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                : axe.impact === "moyen"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            Impact {axe.impact}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground font-medium">
                          Constat :{" "}
                        </strong>
                        {axe.constat}
                      </p>

                      <p className="text-xs text-foreground/90 font-medium">
                        <strong className="text-purple-400">
                          Conseil IA :{" "}
                        </strong>
                        {axe.recommandation}
                      </p>

                      {axe.exempleConcret && (
                        <div className="rounded-lg bg-background/50 border border-purple-500/15 p-2.5 text-xs italic text-muted-foreground">
                          💡{" "}
                          <span className="font-semibold text-foreground/80">
                            Exemple :{" "}
                          </span>
                          « {axe.exempleConcret} »
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exemples STAR & KPI Avant / Après */}
            {audit.conseilsStarKpi?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Lightbulb className="size-4 text-amber-400" />
                  Transformation STAR & KPI chiffrés (Avant / Après)
                </h4>
                <div className="space-y-3">
                  {audit.conseilsStarKpi.map((kpi, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/70 bg-card/70 p-4 space-y-3"
                    >
                      <h5 className="text-xs font-bold text-foreground">
                        {kpi.titre}
                      </h5>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-rose-400 tracking-wider">
                            Formulation standard
                          </span>
                          <p className="text-xs text-muted-foreground line-through">
                            {kpi.avant}
                          </p>
                        </div>
                        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 space-y-1">
                          <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                            Formulation impact & KPI
                          </span>
                          <p className="text-xs text-emerald-300 font-medium">
                            {kpi.apres}
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {kpi.explication}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
