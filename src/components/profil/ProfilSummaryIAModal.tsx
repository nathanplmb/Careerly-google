import { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Check,
  Copy,
  Target,
  Award,
  AlertTriangle,
  Flame,
  MessageSquareQuote,
  TrendingUp,
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
import { toast } from "sonner";
import type { Profil } from "@/lib/profil";
import type { SyntheseProfilIA } from "@/lib/cv-structure";
import { genererSyntheseProfil } from "@/lib/profil-ia.functions";
import { profilEnTexte } from "@/lib/match-run";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profil: Profil;
  onUpdateProfil: (patch: Partial<Profil>) => void;
};

export function ProfilSummaryIAModal({
  open,
  onOpenChange,
  profil,
  onUpdateProfil,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const synthese: SyntheseProfilIA | null =
    profil.syntheseIa || profil.cvStructure?.syntheseIa || null;

  const handleGenerer = async () => {
    setLoading(true);
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
      toast.success("Fiche Profil IA actualisée avec succès !");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Erreur lors de la génération de la synthèse IA.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyPitch = () => {
    if (!synthese?.pitchEntretien) return;
    navigator.clipboard.writeText(synthese.pitchEntretien);
    setCopiedPitch(true);
    toast.success("Pitch d'entretien copié dans le presse-papier !");
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                <Sparkles className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold text-foreground">
                  Ce que Careerly sait de moi
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  La vision stratégique synthétisée par l'IA à partir de
                  l'ensemble de votre profil.
                </DialogDescription>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerer}
              disabled={loading}
              className="gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0"
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              />
              {synthese ? "Réactualiser" : "Générer la synthèse"}
            </Button>
          </div>
        </DialogHeader>

        {!synthese && !loading && (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <Sparkles className="size-7" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h4 className="text-sm font-semibold text-foreground">
                Aucune synthèse générée pour le moment
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cliquez sur le bouton ci-dessous pour laisser Careerly analyser
                vos études, expériences, compétences et critères afin d'établir
                votre diagnostic de positionnement.
              </p>
            </div>
            <Button
              onClick={handleGenerer}
              className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20"
            >
              <Sparkles className="size-4" />
              Créer ma synthèse IA
            </Button>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center space-y-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse">
              <RefreshCw className="size-6 animate-spin" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Analyse globale de votre profil par l'IA...
            </p>
            <p className="text-xs text-muted-foreground">
              Extraction des forces clés, positionnement stratégique et pitch
              d'accroche
            </p>
          </div>
        )}

        {synthese && !loading && (
          <div className="space-y-6 pt-3">
            {/* Titre & Résumé Global */}
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold px-2.5 py-0.5">
                  Positionnement Professionnel
                </Badge>
                {synthese.actualiseLe && (
                  <span className="text-[11px] text-muted-foreground">
                    Mis à jour le{" "}
                    {new Date(synthese.actualiseLe).toLocaleDateString("fr-FR")}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {synthese.titrePro ||
                  profil.titre ||
                  "Candidat à fort potentiel"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {synthese.resumeGlobal}
              </p>
            </div>

            {/* Forces clés & Domaines d'expertise */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Flame className="size-4" />
                  Vos 3 forces clés
                </div>
                <ul className="space-y-2">
                  {synthese.forcesCles?.map((force, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-foreground/90"
                    >
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{force}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <Award className="size-4" />
                  Domaines d'expertise
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {synthese.domainesExpertise?.map((dom, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300"
                    >
                      {dom}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Type de poste idéal */}
            <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Target className="size-4" />
                Type de poste & Environnement idéal
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {synthese.typePosteIdeal}
              </p>
            </div>

            {/* Pitch d'entretien personnalisé */}
            <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                  <MessageSquareQuote className="size-4" />
                  Pitch d'accroche pour vos entretiens (30s)
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyPitch}
                  className="h-7 gap-1.5 px-2 text-xs text-purple-300 hover:bg-purple-500/20"
                >
                  {copiedPitch ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copiedPitch ? "Copié" : "Copier"}
                </Button>
              </div>
              <p className="text-xs text-foreground italic leading-relaxed bg-background/40 p-3 rounded-lg border border-purple-500/20">
                « {synthese.pitchEntretien} »
              </p>
            </div>

            {/* Points de vigilance */}
            {synthese.pointsVigilance?.length > 0 && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <AlertTriangle className="size-4" />
                  Axes de vigilance identifiés
                </div>
                <ul className="space-y-1.5">
                  {synthese.pointsVigilance.map((pv, i) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{pv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
