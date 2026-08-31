import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  FileSearch,
  Gauge,
  Linkedin,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { UsageIaCard } from "@/components/UsageIaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AiContextCard } from "@/components/ai-hub/AiContextCard";
import { AiWorkflowStepper } from "@/components/ai-hub/AiWorkflowStepper";
import { OpportunitySelector } from "@/components/ai-hub/OpportunitySelector";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useSession } from "@/hooks/useSession";
import { useProfil } from "@/hooks/useProfil";
import {
  emptyCandidature,
  type Candidature,
  type WorkflowStepId,
} from "@/lib/candidatures";

export const Route = createFileRoute("/assistant/")({
  head: () => ({
    meta: [
      {
        title:
          "Careerly AI — Votre copilote pour décrocher votre prochaine opportunité",
      },
      {
        name: "description",
        content:
          "Intelligence artificielle unifiée de Careerly : analysez une offre, calculez votre Match IA, adaptez votre CV, rédigez vos e-mails et préparez vos entretiens.",
      },
      {
        property: "og:title",
        content: "Careerly AI — Copilote Unifié",
      },
      {
        property: "og:description",
        content:
          "Une seule intelligence artificielle pour piloter l'ensemble de vos candidatures.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AssistantHubPage,
});

const EXEMPLES_INTENTIONS = [
  {
    label: "Analyse cette offre et dis-moi si elle me correspond",
    step: "match" as WorkflowStepId,
  },
  {
    label: "Adapte mon CV à cette offre",
    step: "pitch" as WorkflowStepId,
  },
  {
    label: "Prépare-moi pour cet entretien",
    step: "interview" as WorkflowStepId,
  },
  {
    label: "Écris un mail au recruteur",
    step: "contact" as WorkflowStepId,
  },
  {
    label: "Aide-moi à relancer cette candidature",
    step: "contact" as WorkflowStepId,
  },
];

function AssistantHubPage() {
  const { user } = useSession();
  const profil = useProfil(user);
  const { items, save, patch } = useCandidatures();

  const [promptInput, setPromptInput] = useState("");
  const [selectedOpp, setSelectedOpp] = useState<Candidature | null>(null);
  const [activeStep, setActiveStep] = useState<WorkflowStepId>("offre");
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showQuotasModal, setShowQuotasModal] = useState(false);
  const [newOppDraft, setNewOppDraft] = useState<Candidature | null>(null);

  // Lecture des paramètres URL éventuels (ex: /assistant?oppId=123&step=match)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const oppId = params.get("oppId");
    const step = params.get("step") as WorkflowStepId | null;

    if (oppId && items.length > 0) {
      const found = items.find((i) => i.id === oppId);
      if (found) {
        setSelectedOpp(found);
        if (step) setActiveStep(step);
      }
    }
  }, [items]);

  // Si l'utilisateur clique sur une intention ou soumet une demande
  const handleIntentionSubmit = (text: string, targetStep?: WorkflowStepId) => {
    const query = text.toLowerCase().trim();
    if (!query) return;

    // 1. Chercher si le texte mentionne le nom d'une opportunité existante
    const foundOpp = items.find(
      (item) =>
        query.includes(item.entreprise.toLowerCase()) ||
        query.includes(item.poste.toLowerCase()),
    );

    if (foundOpp) {
      setSelectedOpp(foundOpp);
      setActiveStep(targetStep || "match");
      setPromptInput("");
      return;
    }

    // 2. Si une opportunité est déjà sélectionnée
    if (selectedOpp) {
      setActiveStep(targetStep || "match");
      setPromptInput("");
      return;
    }

    // 3. Sinon, afficher le sélecteur d'opportunité
    setActiveStep(targetStep || "offre");
    setShowSelectorModal(true);
  };

  const handleQuickActionClick = (step: WorkflowStepId) => {
    setActiveStep(step);
    if (!selectedOpp) {
      setShowSelectorModal(true);
    }
  };

  const handleSelectOpportunity = (candidature: Candidature) => {
    setSelectedOpp(candidature);
    setShowSelectorModal(false);
  };

  const handleCreateNewOpp = () => {
    setShowSelectorModal(false);
    setNewOppDraft(emptyCandidature());
    setShowCreateSheet(true);
  };

  const handleSaveOpp = async (c: Candidature) => {
    const saved = await save(c);
    setSelectedOpp(saved);
  };

  const handleUpdateOppProgress = (patchData: Partial<Candidature>) => {
    if (!selectedOpp) return;
    patch(selectedOpp.id, patchData);
    setSelectedOpp((prev) => (prev ? { ...prev, ...patchData } : prev));
  };

  return (
    <AppShell
      eyebrow="Intelligence Artificielle Unifiée"
      title="CAREERLY AI"
      subtitle="Votre copilote pour décrocher votre prochaine opportunité."
      headerExtra={
        <div className="flex items-center gap-2">
          {/* Badge discret de crédit */}
          <button
            type="button"
            onClick={() => setShowQuotasModal(!showQuotasModal)}
            className="flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
            title="Cliquez pour voir le détail de vos crédits"
          >
            <Gauge className="size-3.5 text-primary animate-pulse" />
            <span>32 / 40 crédits</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Modale / panneau de crédits si cliqué */}
        {showQuotasModal && (
          <div className="pop-in rounded-2xl border border-primary/20 bg-card/80 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Consommation de Crédits IA
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuotasModal(false)}
                className="h-6 text-xs text-muted-foreground"
              >
                Fermer
              </Button>
            </div>
            <UsageIaCard connecte={Boolean(user)} />
          </div>
        )}

        {/* 1. GRANDE ZONE DE SAISIE PRINCIPALE ÉPURÉE */}
        <section className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card/90 to-primary/5 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Sparkles className="size-4" />
              <span>Demander à Careerly AI</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Que voulez-vous faire ?
            </h2>

            {/* Zone de saisie principale */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleIntentionSubmit(promptInput);
              }}
              className="relative flex items-center"
            >
              <Input
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ex: Analyse mon offre chez L'Oréal, adapte mon CV, écris un mail..."
                className="h-14 sm:h-16 rounded-2xl border-primary/30 bg-background/80 pl-5 pr-14 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 shadow-inner focus-visible:ring-primary/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!promptInput.trim()}
                className="absolute right-2 size-10 sm:size-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform"
              >
                <Send className="size-4 sm:size-5" />
              </Button>
            </form>

            {/* Exemples cliquables */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Idées de requêtes rapides :
              </p>
              <div className="flex flex-wrap gap-2">
                {EXEMPLES_INTENTIONS.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => {
                      setPromptInput(ex.label);
                      handleIntentionSubmit(ex.label, ex.step);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/50 px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-foreground transition-all"
                  >
                    <Sparkles className="size-3 text-primary" />
                    <span>« {ex.label} »</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. ACTIONS RAPIDES SOUS LA ZONE DE SAISIE */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            type="button"
            onClick={() => handleQuickActionClick("match")}
            className="group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-primary/15 text-primary group-hover:scale-110 transition-transform">
              <Sparkles className="size-5" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Analyser une offre
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Match IA & opportunité
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickActionClick("pitch")}
            className="group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-violet-500/15 text-violet-400 group-hover:scale-110 transition-transform">
              <Wand2 className="size-5" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Adapter mon CV
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                CV Optimizer & Pitch
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickActionClick("contact")}
            className="group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform">
              <Linkedin className="size-5" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Écrire un message
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Email / LinkedIn
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickActionClick("interview")}
            className="group flex flex-col items-start justify-between rounded-2xl border border-border/60 bg-card/60 p-4 text-left hover:border-primary/50 hover:bg-card hover:shadow-lg transition-all"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-amber-500/15 text-amber-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="size-5" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Préparer un entretien
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Interview Coach
              </p>
            </div>
          </button>
        </div>

        {/* 3. WORKFLOW OU SÉLECTEUR D'OPPORTUNITÉ */}
        {!selectedOpp ? (
          <OpportunitySelector
            items={items}
            onSelect={handleSelectOpportunity}
            onCreateNew={handleCreateNewOpp}
          />
        ) : (
          <div className="space-y-4">
            <AiWorkflowStepper
              candidature={selectedOpp}
              initialStep={activeStep}
              onChangeCandidature={() => setSelectedOpp(null)}
              onUpdateCandidature={handleUpdateOppProgress}
            />
          </div>
        )}

        {/* Contexte Profil discret sous forme de rappel */}
        <AiContextCard />
      </div>

      {/* Sheet de création d'opportunité si demandée */}
      {showCreateSheet && newOppDraft && (
        <CandidatureSheet
          open={showCreateSheet}
          onOpenChange={setShowCreateSheet}
          value={newOppDraft}
          onSave={handleSaveOpp}
          onStartWorkflow={(c) => {
            setSelectedOpp(c);
            setActiveStep("match");
          }}
          profil={profil}
        />
      )}
    </AppShell>
  );
}
