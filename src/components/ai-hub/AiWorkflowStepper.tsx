import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Linkedin,
  MessageSquare,
  RotateCcw,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AiOffreStep } from "./AiOffreStep";
import { AiMatchStep } from "./AiMatchStep";
import { AiPitchStep } from "./AiPitchStep";
import { AiContactStep } from "./AiContactStep";
import { AiInterviewStep } from "./AiInterviewStep";
import type {
  AiContactResult,
  AiInterviewResult,
  AiMatchResult,
  AiOffreData,
  AiPitchResult,
  AiWorkflowStep,
} from "@/lib/ai-hub";
import type { Candidature } from "@/lib/candidatures";

const STEPS: {
  id: AiWorkflowStep;
  num: number;
  label: string;
  shortLabel: string;
  icon: typeof FileSearch;
}[] = [
  {
    id: "offre",
    num: 1,
    label: "1. Offre & Missions",
    shortLabel: "Offre",
    icon: FileSearch,
  },
  {
    id: "match",
    num: 2,
    label: "2. Match IA",
    shortLabel: "Match",
    icon: Sparkles,
  },
  {
    id: "pitch",
    num: 3,
    label: "3. CV & Pitch",
    shortLabel: "CV & Pitch",
    icon: Wand2,
  },
  {
    id: "contact",
    num: 4,
    label: "4. Prise de contact",
    shortLabel: "Contact",
    icon: Linkedin,
  },
  {
    id: "interview",
    num: 5,
    label: "5. Interview Coach",
    shortLabel: "Coach",
    icon: MessageSquare,
  },
];

const OFFRE_VIDE: AiOffreData = {
  texte: "",
  entreprise: "",
  poste: "",
  lieu: "",
  lien: "",
  dateLimite: "",
  missions: "",
  profilRecherche: "",
  secteur: "",
  priorite: "auto",
  contactRecruteur: "",
};

interface AiWorkflowStepperProps {
  candidature?: Candidature | null;
  initialStep?: AiWorkflowStep;
  preloadedOffre?: Partial<AiOffreData>;
  onChangeCandidature?: () => void;
  onUpdateCandidature?: (patch: Partial<Candidature>) => void;
  onDone?: () => void;
}

export function AiWorkflowStepper({
  candidature,
  initialStep = "offre",
  preloadedOffre,
  onChangeCandidature,
  onUpdateCandidature,
  onDone,
}: AiWorkflowStepperProps) {
  const [currentStep, setCurrentStep] = useState<AiWorkflowStep>(initialStep);

  const [offreData, setOffreData] = useState<AiOffreData>(() => {
    if (candidature) {
      return {
        texte: candidature.detail || "",
        entreprise: candidature.entreprise || "",
        poste: candidature.poste || "",
        lieu: candidature.lieu || "",
        lien: candidature.lien || "",
        dateLimite: candidature.dateLimite || "",
        missions: candidature.missions || "",
        profilRecherche: candidature.profilRecherche || "",
        secteur: candidature.secteur || "",
        priorite: candidature.priorite || "auto",
        contactRecruteur: candidature.contact || "",
      };
    }
    return { ...OFFRE_VIDE, ...preloadedOffre };
  });

  const [matchData, setMatchData] = useState<AiMatchResult | undefined>(
    undefined,
  );
  const [pitchData, setPitchData] = useState<AiPitchResult | undefined>(
    undefined,
  );
  const [contactData, setContactData] = useState<AiContactResult | undefined>(
    undefined,
  );
  const [interviewData, setInterviewData] = useState<
    AiInterviewResult | undefined
  >(undefined);

  // Synchronisation avec l'opportunité quand elle change
  useEffect(() => {
    if (candidature) {
      setOffreData({
        texte: candidature.detail || "",
        entreprise: candidature.entreprise || "",
        poste: candidature.poste || "",
        lieu: candidature.lieu || "",
        lien: candidature.lien || "",
        dateLimite: candidature.dateLimite || "",
        missions: candidature.missions || "",
        profilRecherche: candidature.profilRecherche || "",
        secteur: candidature.secteur || "",
        priorite: candidature.priorite || "auto",
        contactRecruteur: candidature.contact || "",
      });

      if (candidature.match) {
        setMatchData({
          scoreGlobal: candidature.match.global,
          pointsForts: candidature.match.pointsForts || [],
          pointsVigilance: candidature.match.vigilance || [],
          competencesCles:
            candidature.match.details?.map((d) => d.critere) || [],
          explication: candidature.match.explication || "",
          recommandation:
            candidature.match.global >= 70
              ? "Candidature fortement recommandée"
              : candidature.match.global >= 50
                ? "Candidature possible sous réserve d'adaptation"
                : "Écarts importants constatés",
        });
      }

      if (candidature.workflowProgress?.currentStep) {
        setCurrentStep(candidature.workflowProgress.currentStep);
      }
    }
  }, [candidature]);

  const handleStepChange = (step: AiWorkflowStep) => {
    setCurrentStep(step);
    if (candidature && onUpdateCandidature) {
      const prevSteps = candidature.workflowProgress?.completedSteps ?? [
        "offre",
      ];
      const updatedSteps = Array.from(new Set([...prevSteps, step]));
      onUpdateCandidature({
        workflowProgress: {
          currentStep: step,
          completedSteps: updatedSteps as typeof prevSteps,
        },
      });
    }
  };

  const handleReset = () => {
    if (onChangeCandidature) {
      onChangeCandidature();
    } else {
      setOffreData(OFFRE_VIDE);
      setMatchData(undefined);
      setPitchData(undefined);
      setContactData(undefined);
      setInterviewData(undefined);
      setCurrentStep("offre");
    }
  };

  const isStepCompleted = (stepId: AiWorkflowStep) => {
    switch (stepId) {
      case "offre":
        return Boolean(
          offreData.entreprise || offreData.poste || offreData.missions,
        );
      case "match":
        return Boolean(matchData);
      case "pitch":
        return Boolean(pitchData);
      case "contact":
        return Boolean(contactData);
      case "interview":
        return Boolean(interviewData);
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-primary/20 bg-card/50 p-4 sm:p-6 shadow-xl backdrop-blur-xl">
      {/* Active Opportunity Context Banner */}
      {candidature && (
        <div className="flex flex-col gap-2 rounded-2xl border border-primary/30 bg-primary/10 p-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm">
              <Building2 className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground">
                  {candidature.entreprise}
                </h3>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs font-medium text-foreground">
                  {candidature.poste}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Contexte chargé automatiquement • Statut : {candidature.statut}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-8 gap-1.5 rounded-xl border-primary/30 text-xs font-medium text-primary hover:bg-primary/15"
          >
            <RotateCcw className="size-3.5" />
            <span>Changer d'opportunité</span>
          </Button>
        </div>
      )}

      {/* Top Workflow Stepper Navigation */}
      <div className="flex flex-col gap-4 border-b border-border/50 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                ✦
              </span>
              <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                Workflow IA Candidature
              </h2>
              {offreData.poste && !candidature && (
                <Badge
                  variant="outline"
                  className="text-[11px] border-primary/30 text-primary"
                >
                  {offreData.poste}
                </Badge>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Guide complet de l'analyse d'une offre jusqu'à la simulation
              d'entretien.
            </p>
          </div>

          {!candidature && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-8 gap-1.5 rounded-xl text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              <span>Réinitialiser</span>
            </Button>
          )}
        </div>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const completed = isStepCompleted(step.id);
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id)}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border p-2 sm:p-3 text-center transition-all ${
                  isActive
                    ? "border-primary bg-primary/15 shadow-sm ring-1 ring-primary/40 text-foreground"
                    : completed
                      ? "border-border/70 bg-card/70 hover:border-primary/40 text-muted-foreground hover:text-foreground"
                      : "border-border/40 bg-card/30 opacity-70 hover:opacity-100 text-muted-foreground"
                }`}
              >
                <div className="mb-1 flex items-center justify-center">
                  {completed && !isActive ? (
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  ) : (
                    <Icon
                      className={`size-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>

                <span className="hidden text-[11px] font-semibold sm:inline truncate max-w-full">
                  {step.label}
                </span>
                <span className="inline text-[10px] font-semibold sm:hidden truncate max-w-full">
                  {step.shortLabel}
                </span>

                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Contents */}
      <div>
        {currentStep === "offre" && (
          <AiOffreStep
            offreData={offreData}
            onChangeOffreData={(partial) =>
              setOffreData((prev) => ({ ...prev, ...partial }))
            }
            onNextStep={() => setCurrentStep("match")}
          />
        )}

        {currentStep === "match" && (
          <AiMatchStep
            offreData={offreData}
            matchData={matchData}
            onChangeMatchData={(res) => setMatchData(res)}
            onNextStep={() => setCurrentStep("pitch")}
            onPrevStep={() => setCurrentStep("offre")}
          />
        )}

        {currentStep === "pitch" && (
          <AiPitchStep
            offreData={offreData}
            matchData={matchData}
            pitchData={pitchData}
            onChangePitchData={(res) => setPitchData(res)}
            onNextStep={() => setCurrentStep("contact")}
            onPrevStep={() => setCurrentStep("match")}
          />
        )}

        {currentStep === "contact" && (
          <AiContactStep
            offreData={offreData}
            contactData={contactData}
            onChangeContactData={(res) => setContactData(res)}
            onNextStep={() => setCurrentStep("interview")}
            onPrevStep={() => setCurrentStep("pitch")}
          />
        )}

        {currentStep === "interview" && (
          <AiInterviewStep
            offreData={offreData}
            interviewData={interviewData}
            onChangeInterviewData={(res) => setInterviewData(res)}
            onPrevStep={() => setCurrentStep("contact")}
            onFinishWorkflow={() => {
              if (onDone) onDone();
            }}
          />
        )}
      </div>
    </div>
  );
}
