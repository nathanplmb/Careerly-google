import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Loader2,
  MessageSquare,
  MessageSquareQuote,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import { genererInterview } from "@/lib/redaction.functions";
import { profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";
import {
  saveAiHistoryItem,
  type AiInterviewResult,
  type AiOffreData,
} from "@/lib/ai-hub";

interface AiInterviewStepProps {
  offreData: AiOffreData;
  interviewData?: AiInterviewResult;
  onChangeInterviewData: (data: AiInterviewResult) => void;
  onPrevStep: () => void;
  onFinishWorkflow?: () => void;
}

export function AiInterviewStep({
  offreData,
  interviewData,
  onChangeInterviewData,
  onPrevStep,
  onFinishWorkflow,
}: AiInterviewStepProps) {
  const { user } = useSession();
  const profil = useProfil(user);
  const runGenererInterview = useServerFn(genererInterview);

  const [chargement, setChargement] = useState(false);

  const genererSimulation = async () => {
    if (!profil) {
      toast.error("Veuillez d'abord compléter votre profil.");
      return;
    }
    setChargement(true);
    try {
      const profilTexte = profilEnTexte(profil);
      const offreTexte = [
        `Entreprise : ${offreData.entreprise}`,
        `Poste : ${offreData.poste}`,
        `Lieu : ${offreData.lieu}`,
        `Missions : ${offreData.missions}`,
        `Profil recherché : ${offreData.profilRecherche}`,
      ].join("\n");

      const res = (await runGenererInterview({
        data: {
          profil: profilTexte,
          offre: offreTexte,
          consigne: "Préparation d'entretien structurée STAR",
        },
      })) as {
        questions?: {
          question: string;
          categorie: string;
          pistes: string[];
        }[];
        argumentsCles?: string[];
        pointsFaibles?: string[];
        questionsARecruteur?: string[];
      };

      const questions = res?.questions || [
        {
          question: `Parlez-moi de vous et pourquoi postuler chez ${offreData.entreprise || "nous"} ?`,
          categorie: "Fit & Motivation",
          pistes: [
            "Résumez votre parcours en 3 étapes claires.",
            "Expliquez le déclic pour cette entreprise précise.",
            "Terminez par ce que vous apporterez immédiatement.",
          ],
        },
        {
          question: `Comment abordez-vous les missions de ${offreData.poste || "ce poste"} ?`,
          categorie: "Technique & Organisation",
          pistes: [
            "Citez une situation passée similaire (S).",
            "Décrivez la tâche et vos actions concrètes (T/A).",
            "Concluez avec les résultats quantifiés obtenus (R).",
          ],
        },
      ];

      const argumentsCles = res?.argumentsCles || [
        "Capacité éprouvée à mener des projets en autonomie",
        "Expertise sectorielle et méthodologie rigoureuse",
        "Dynamisme et fort esprit d'équipe",
      ];

      const pointsFaibles = res?.pointsFaibles || [
        "Anticipez les questions sur vos axes de progrès techniques",
        "Soyez clair sur vos disponibilités et vos attentes de formation",
      ];

      const questionsARecruteur = res?.questionsARecruteur || [
        `Quels seront les principaux défis de l'équipe sur les 6 prochains mois ?`,
        `À quoi ressemblera une semaine type pour ce poste chez ${offreData.entreprise || "vous"} ?`,
        `Quelles sont les opportunités d'apprentissage et d'évolution ?`,
      ];

      const resultat: AiInterviewResult = {
        questions,
        argumentsCles,
        pointsFaibles,
        questionsARecruteur,
      };

      onChangeInterviewData(resultat);

      saveAiHistoryItem({
        type: "interview",
        titre: `Interview Coach : ${offreData.poste || "Poste"} @ ${offreData.entreprise || "Entreprise"}`,
        sousTitre: `${questions.length} questions STAR & arguments préparés`,
        apercu: questions[0]?.question || "Simulation d'entretien",
        offreData,
        interviewData: resultat,
      });

      toast.success("Simulation d'entretien et arguments générés !");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Étape 5 : Interview Coach & Questions STAR
          </h3>
          <p className="text-xs text-muted-foreground">
            Anticipez les questions pièges, préparez des réponses structurées
            STAR et vos questions au recruteur.
          </p>
        </div>

        <Button
          type="button"
          onClick={genererSimulation}
          disabled={chargement}
          className="h-8 gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          {chargement ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Entraînement...</span>
            </>
          ) : (
            <>
              <Wand2 className="size-3.5" />
              <span>
                {interviewData
                  ? "Régénérer la simulation"
                  : "Lancer le Coach IA"}
              </span>
            </>
          )}
        </Button>
      </div>

      {/* Target reminder */}
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2 truncate">
          <Target className="size-4 text-primary shrink-0" />
          <span className="font-semibold text-foreground truncate">
            {offreData.poste || "Poste visé"}
          </span>
          <span className="text-muted-foreground truncate">
            @ {offreData.entreprise || "Entreprise"}
          </span>
        </div>
      </div>

      {/* Content */}
      {!interviewData && !chargement ? (
        <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
          <MessageSquareQuote className="mx-auto size-8 text-primary/70 mb-3" />
          <h4 className="text-sm font-semibold text-foreground">
            Prêt pour la simulation d'entretien
          </h4>
          <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
            L'IA va extraire les questions les plus probables pour ce poste et
            construire pour vous des trames de réponses selon la méthode STAR.
          </p>
          <Button
            type="button"
            onClick={genererSimulation}
            className="mt-4 gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground"
          >
            <Sparkles className="size-3.5" />
            <span>Simuler mon entretien d'embauche</span>
          </Button>
        </div>
      ) : chargement ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-12 text-center">
          <Loader2 className="size-8 animate-spin text-primary mb-3" />
          <p className="text-sm font-semibold text-foreground">
            Construction des scénarios d'entretien...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Génération des questions techniques, comportementales et pièges
          </p>
        </div>
      ) : interviewData ? (
        <div className="space-y-4">
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted/60 p-1">
              <TabsTrigger value="questions" className="rounded-lg text-xs">
                Questions probables & STAR ({interviewData.questions.length})
              </TabsTrigger>
              <TabsTrigger value="arguments" className="rounded-lg text-xs">
                Arguments clés & vigilance
              </TabsTrigger>
              <TabsTrigger
                value="questions_recruteur"
                className="rounded-lg text-xs"
              >
                Questions au recruteur
              </TabsTrigger>
            </TabsList>

            {/* Questions STAR Tab */}
            <TabsContent value="questions" className="mt-4 space-y-3">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {interviewData.questions.map((q, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="rounded-xl border border-border/60 bg-card/60 px-3.5"
                  >
                    <AccordionTrigger className="py-3 text-left text-xs font-semibold hover:no-underline">
                      <div className="flex items-center gap-2 pr-2">
                        <Badge
                          variant="outline"
                          className="text-[10px] text-primary shrink-0"
                        >
                          {q.categorie || "Question"}
                        </Badge>
                        <span className="text-foreground">{q.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 pt-1 text-xs text-muted-foreground border-t border-border/40">
                      <p className="font-semibold text-foreground mb-1.5 text-[11px]">
                        Pistes de réponse structurées (Méthode STAR) :
                      </p>
                      <ul className="space-y-1.5 pl-1">
                        {q.pistes.map((piste, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                            <span>{piste}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Arguments Tab */}
            <TabsContent value="arguments" className="mt-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/20 bg-card/60 p-4">
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-primary">
                    <Sparkles className="size-4" />
                    <span>Arguments décisifs à placer</span>
                  </div>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {interviewData.argumentsCles.map((arg, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                        <span>{arg}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-card/60 p-4">
                  <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <Lightbulb className="size-4" />
                    <span>Points de vigilance</span>
                  </div>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {interviewData.pointsFaibles.map((pf, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{pf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Questions au recruteur */}
            <TabsContent value="questions_recruteur" className="mt-4 space-y-3">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-foreground">
                  <HelpCircle className="size-4 text-primary" />
                  <span>
                    Questions stratégiques à poser à la fin de l'entretien
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {interviewData.questionsARecruteur.map((qr, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-xl bg-background/50 p-2.5"
                    >
                      <span className="font-bold text-primary">{i + 1}.</span>
                      <span className="text-foreground">{qr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onPrevStep}
              className="h-9 gap-1.5 rounded-xl border-border text-xs"
            >
              <ArrowLeft className="size-3.5" />
              <span>Retour à la prise de contact</span>
            </Button>

            {onFinishWorkflow && (
              <Button
                type="button"
                onClick={onFinishWorkflow}
                className="h-9 gap-2 rounded-xl bg-emerald-600 px-5 text-xs font-semibold text-white shadow-md hover:bg-emerald-700"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Workflow complet terminé</span>
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
