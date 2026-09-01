import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  Lightbulb,
  FileText,
  Compass,
  UserRound,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Copy,
  Check,
  RefreshCw,
  Target,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import type { Profil } from "@/lib/profil";
import type { BilanCompletude } from "@/lib/profil-completion";
import type { SyntheseProfilIA } from "@/lib/cv-structure";
import { genererSyntheseProfil } from "@/lib/profil-ia.functions";
import { profilEnTexte } from "@/lib/match-run";

type Props = {
  profil: Profil;
  bilan: BilanCompletude;
  onNavigateTab: (tab: string) => void;
  onOpenCvModal: () => void;
  onOpenSummaryIaModal: () => void;
  onOpenOptimizerModal: () => void;
  onUpdateProfil: (patch: Partial<Profil>) => void;
};

export function ProfilOverviewTab({
  profil,
  bilan,
  onNavigateTab,
  onOpenCvModal,
  onOpenSummaryIaModal,
  onOpenOptimizerModal,
  onUpdateProfil,
}: Props) {
  const [refreshingIa, setRefreshingIa] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const synthese: SyntheseProfilIA | null =
    profil.syntheseIa || profil.cvStructure?.syntheseIa || null;

  const handleActualiserSynthese = async () => {
    setRefreshingIa(true);
    try {
      const profilTexte = profilEnTexte(profil);
      const res = await genererSyntheseProfil({ data: { profilTexte } });
      onUpdateProfil({
        syntheseIa: res,
        cvStructure: {
          ...profil.cvStructure,
          syntheseIa: res,
        },
      });
      toast.success("Dossier NACORA AI actualisé avec succès !");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'actualisation de la synthèse IA.",
      );
    } finally {
      setRefreshingIa(false);
    }
  };

  const copyPitch = () => {
    if (!synthese?.pitchEntretien) return;
    navigator.clipboard.writeText(synthese.pitchEntretien);
    setCopiedPitch(true);
    toast.success("Pitch d'entretien copié dans le presse-papier !");
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const nomAffiche =
    profil.prenom || profil.nom
      ? `${profil.prenom} ${profil.nom}`.trim()
      : "Candidat";

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
                onClick={() => onNavigateTab(cat.tab)}
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

      {/* 2. Ce que NACORA AI sait de vous (Fiche Synthèse) */}
      <div className="glass-card p-6 sm:p-7 space-y-6 border-purple-500/25">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-xs">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Vision Stratégique NACORA AI
              </h3>
              <p className="text-xs text-muted-foreground">
                Ce que nos moteurs d'IA (Match IA, CV Optimizer, Assistant
                Email) exploitent
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleActualiserSynthese}
              disabled={refreshingIa}
              className="gap-1.5 text-xs border-purple-500/30 hover:bg-purple-500/10 text-purple-300"
            >
              <RefreshCw
                className={`size-3.5 ${refreshingIa ? "animate-spin" : ""}`}
              />
              Actualiser avec l'IA
            </Button>
            <Button
              size="sm"
              onClick={onOpenOptimizerModal}
              className="gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs shadow-xs"
            >
              <TrendingUp className="size-3.5" />
              Audit d'Optimisation
            </Button>
          </div>
        </div>

        {synthese ? (
          <div className="space-y-5">
            {/* Résumé & Poste Idéal */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-card/60 p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <UserRound className="size-3.5" /> Profil Global
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {synthese.resumeGlobal}
                </p>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card/60 p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Target className="size-3.5" /> Cible & Type de Poste Idéal
                </span>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {synthese.typePosteIdeal || "Non encore qualifié par l'IA."}
                </p>
              </div>
            </div>

            {/* Forces clés & Domaines d'expertise */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" /> Forces Clés Distinctives
                </span>
                <ul className="space-y-1.5 text-xs text-emerald-200">
                  {synthese.forcesCles?.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Zap className="size-3.5" /> Domaines d'Expertise Détectés
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {synthese.domainesExpertise?.map((d, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[11px] bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                    >
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Pitch d'Entretien Généré */}
            {synthese.pitchEntretien && (
              <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="size-4 text-purple-400" />
                    Pitch d'accroche pour vos entretiens
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyPitch}
                    className="h-7 text-xs gap-1.5 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
                  >
                    {copiedPitch ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        Copier le pitch
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed italic border-l-2 border-purple-500/40 pl-3">
                  « {synthese.pitchEntretien} »
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <Sparkles className="size-6" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">
              Générez votre première synthèse IA
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Cliquez ci-dessous pour analyser l'intégralité de vos expériences,
              diplômes et aspirations afin de générer votre pitch stratégique.
            </p>
            <Button
              size="sm"
              onClick={handleActualiserSynthese}
              disabled={refreshingIa}
              className="gap-2 bg-purple-600 hover:bg-purple-500 text-white text-xs"
            >
              <Sparkles className="size-3.5" />
              {refreshingIa ? "Analyse en cours..." : "Générer ma Synthèse IA"}
            </Button>
          </div>
        )}
      </div>

      {/* 3. Suggestions Prioritaires d'Amélioration */}
      {bilan.suggestions.length > 0 && (
        <div className="glass-card p-5 sm:p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <TrendingUp className="size-4 text-purple-400" />
            Actions Prioritaires pour Maximiser votre Score ATS & Matching
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            {bilan.suggestions.map((sug) => (
              <div
                key={sug.id}
                onClick={() => onNavigateTab(sug.tab)}
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
