import { useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import { useCandidatures } from "@/hooks/useCandidatures";
import { lancerAnalyse } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import {
  saveAiHistoryItem,
  type AiMatchResult,
  type AiOffreData,
} from "@/lib/ai-hub";
import type { Candidature } from "@/lib/candidatures";

interface AiMatchStepProps {
  offreData: AiOffreData;
  matchData?: AiMatchResult;
  onChangeMatchData: (data: AiMatchResult) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function AiMatchStep({
  offreData,
  matchData,
  onChangeMatchData,
  onNextStep,
  onPrevStep,
}: AiMatchStepProps) {
  const { user } = useSession();
  const profil = useProfil(user);
  const { patch } = useCandidatures();

  const [chargement, setChargement] = useState(false);

  const evaluerMatch = async () => {
    if (!profil) {
      toast.error("Veuillez d'abord compléter votre profil.");
      return;
    }
    if (!offreData.texte && !offreData.missions && !offreData.poste) {
      toast.error("Veuillez renseigner les détails de l'offre à l'étape 1.");
      return;
    }

    setChargement(true);
    try {
      const candVirtuelle: Candidature = {
        id: offreData.candidatureIdLiee || "temp_offre",
        entreprise: offreData.entreprise || "Entreprise ciblée",
        poste: offreData.poste || "Poste ciblé",
        statut: "A_POSTULER",
        lieu: offreData.lieu,
        missions: offreData.missions || offreData.texte,
        profilRecherche: offreData.profilRecherche,
        creeLe: new Date().toISOString(),
      };

      const match = await lancerAnalyse(candVirtuelle, profil);

      const resultat: AiMatchResult = {
        global: match.global ?? 75,
        competences: match.competences ?? 75,
        experience: match.experience ?? 70,
        formation: match.formation ?? 80,
        synthese:
          match.synthese ||
          "Bonne adéquation globale entre votre profil et les exigences du poste.",
        pointsForts: match.pointsForts || [],
        pointsVigilance: match.pointsVigilance || [],
        competencesManquantes: match.competencesManquantes || [],
        recommandations: match.recommandations || [],
      };

      onChangeMatchData(resultat);

      if (offreData.candidatureIdLiee) {
        patch(offreData.candidatureIdLiee, { match });
      }

      saveAiHistoryItem({
        type: "match",
        titre: `Match ${resultat.global}% : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
        sousTitre: `${resultat.pointsForts.length} points forts • ${resultat.competencesManquantes.length} compétences cibles`,
        apercu: resultat.synthese,
        offreData,
        matchData: resultat,
      });

      toast.success("Évaluation Match IA calculée !");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setChargement(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80)
      return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 60) return "text-primary border-primary/30 bg-primary/10";
    return "text-amber-400 border-amber-500/30 bg-amber-500/10";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Étape 2 : Match IA & Compatibilité profil
          </h3>
          <p className="text-xs text-muted-foreground">
            Comparaison multi-dimensionnelle entre votre profil (expériences,
            compétences, études) et l'offre.
          </p>
        </div>

        <Button
          type="button"
          onClick={evaluerMatch}
          disabled={chargement}
          className="h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          {chargement ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Calcul en cours...</span>
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              <span>
                {matchData ? "Recalculer le Match" : "Lancer le Match IA"}
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Target Offer Reminder */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2 truncate">
          <Target className="size-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground truncate">
            {offreData.poste || "Poste sélectionné"}
          </span>
          <span className="text-muted-foreground truncate">
            @ {offreData.entreprise || "Entreprise"}
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onPrevStep}
          className="h-6 text-[11px] text-muted-foreground hover:text-foreground"
        >
          Modifier l'offre
        </Button>
      </div>

      {/* Main Match Results */}
      {!matchData && !chargement ? (
        <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
          <Sparkles className="mx-auto size-8 text-primary/70 mb-3" />
          <h4 className="text-sm font-semibold text-foreground">
            Prêt pour l'évaluation Match IA
          </h4>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
            Cliquez sur le bouton ci-dessus pour confronter votre profil complet
            aux exigences de l'offre et obtenir une analyse détaillée de vos
            atouts.
          </p>
          <Button
            type="button"
            onClick={evaluerMatch}
            className="mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground"
          >
            <Sparkles className="size-3.5" />
            <span>Calculer mon score de match</span>
          </Button>
        </div>
      ) : chargement ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center">
          <Loader2 className="size-8 animate-spin text-primary mb-3" />
          <p className="text-sm font-semibold text-foreground">
            Analyse de compatibilité en cours...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Croisement des compétences, années d'expérience et missions clés
          </p>
        </div>
      ) : matchData ? (
        <div className="space-y-4">
          {/* Top Score Radar Card */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card/80 to-primary/5 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`grid size-16 place-items-center rounded-2xl border text-xl font-extrabold ${getScoreColor(
                    matchData.global,
                  )}`}
                >
                  {matchData.global}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground">
                      Score de Correspondance Global
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${getScoreColor(matchData.global)}`}
                    >
                      {matchData.global >= 75
                        ? "Très fort potentiel"
                        : matchData.global >= 50
                          ? "Bonne adéquation"
                          : "Profil à valoriser"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground max-w-xl">
                    {matchData.synthese}
                  </p>
                </div>
              </div>
            </div>

            {/* Subscores */}
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border/40 pt-4 sm:grid-cols-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Compétences techniques
                  </span>
                  <span className="font-semibold text-foreground">
                    {matchData.competences}%
                  </span>
                </div>
                <Progress value={matchData.competences} className="h-1.5" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Expérience & Réalisations
                  </span>
                  <span className="font-semibold text-foreground">
                    {matchData.experience}%
                  </span>
                </div>
                <Progress value={matchData.experience} className="h-1.5" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Formation & Alignement
                  </span>
                  <span className="font-semibold text-foreground">
                    {matchData.formation}%
                  </span>
                </div>
                <Progress value={matchData.formation} className="h-1.5" />
              </div>
            </div>
          </div>

          {/* Strengths and Vigilance grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Points forts */}
            <div className="rounded-2xl border border-emerald-500/20 bg-card/60 p-4">
              <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="size-4" />
                <span>Points forts à valoriser</span>
              </div>
              {matchData.pointsForts.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Aucun point spécifique identifié.
                </p>
              ) : (
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {matchData.pointsForts.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Compétences à renforcer / vigilance */}
            <div className="rounded-2xl border border-amber-500/20 bg-card/60 p-4">
              <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Lightbulb className="size-4" />
                <span>Compétences cibles & vigilance</span>
              </div>
              {matchData.competencesManquantes.length === 0 &&
              matchData.pointsVigilance.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Tous les critères clés sont déjà présents sur votre profil.
                </p>
              ) : (
                <div className="space-y-2 text-xs text-muted-foreground">
                  {matchData.competencesManquantes.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-300"
                      >
                        À valoriser
                      </Badge>
                      <span className="truncate">{c}</span>
                    </div>
                  ))}
                  {matchData.pointsVigilance.map((v, i) => (
                    <p
                      key={i}
                      className="text-[11.5px] italic text-muted-foreground"
                    >
                      • {v}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPrevStep}
              className="h-9 gap-1.5 rounded-xl border-border text-xs"
            >
              <ArrowLeft className="size-3.5" />
              <span>Retour à l'offre</span>
            </Button>

            <Button
              type="button"
              onClick={onNextStep}
              className="h-9 gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              <span>Continuer : Adapter mon CV & Pitch</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
