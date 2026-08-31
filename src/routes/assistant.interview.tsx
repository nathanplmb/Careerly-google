import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  Loader2,
  MessageSquareQuote,
  Sparkles,
  Target,
  TriangleAlert,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AiContextCard } from "@/components/ai-hub/AiContextCard";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { genererInterview } from "@/lib/redaction.functions";
import { offreEnTexte, profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";

export const Route = createFileRoute("/assistant/interview")({
  head: () => ({
    meta: [
      { title: "Interview Coach — Careerly AI Hub" },
      {
        name: "description",
        content:
          "Préparez vos entretiens : questions probables, pistes de réponse STAR, arguments clés et questions à poser au recruteur.",
      },
      { property: "og:title", content: "Interview Coach — Careerly AI Hub" },
      {
        property: "og:description",
        content:
          "Simulation d'entretien personnalisée à partir de votre profil et de l'offre visée.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InterviewPage,
});

type Prep = {
  questions: { question: string; categorie: string; pistes: string[] }[];
  argumentsCles: string[];
  pointsFaibles: string[];
  questionsARecruteur: string[];
};

function Liste({
  titre,
  items,
  icon,
}: {
  titre: string;
  items: string[];
  icon: React.ReactNode;
}) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {icon}
        {titre}
      </h3>
      <ul className="list-disc pl-5 text-[13.5px] leading-relaxed text-muted-foreground">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function InterviewPage() {
  const { user, authLoading, items } = useCandidatures();
  const profil = useProfil(user);
  const [cibleId, setCibleId] = useState<string>(items[0]?.id ?? "aucune");
  const [consigne, setConsigne] = useState("");
  const [loading, setLoading] = useState(false);
  const [prep, setPrep] = useState<Prep | null>(null);

  const lancer = async () => {
    if (!profil) {
      toast.error("Complétez d'abord votre profil.");
      return;
    }
    const cible = items.find((c) => c.id === cibleId) ?? null;
    setLoading(true);
    try {
      const r = await genererInterview({
        data: {
          profil: profilEnTexte(profil),
          offre: cible ? offreEnTexte(cible) : "",
          consigne,
        },
      });
      setPrep({
        questions: r.questions ?? [],
        argumentsCles: r.argumentsCles ?? [],
        pointsFaibles: r.pointsFaibles ?? [],
        questionsARecruteur: r.questionsARecruteur ?? [],
      });
      toast.success("Simulation d'entretien générée !");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      eyebrow="Careerly AI Hub"
      title="Interview Coach"
      subtitle="Simulation d'entretien, trames STAR et questions au recruteur"
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
        <AiContextCard />

        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <section className="glass-card pop-in flex h-fit min-w-0 flex-col gap-4 p-5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Candidature visée
              </label>
              <Select value={cibleId} onValueChange={setCibleId}>
                <SelectTrigger className="w-full rounded-2xl border-border/80 bg-card/70 py-5 text-sm">
                  <SelectValue placeholder="Sélectionnez une candidature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aucune">
                    Général (sans offre spécifique)
                  </SelectItem>
                  {items.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.entreprise} — {c.poste}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Consigne ou focus
              </label>
              <Textarea
                value={consigne}
                onChange={(e) => setConsigne(e.target.value)}
                placeholder="Ex. Insister sur la gestion du stress, le leadership ou un changement de secteur..."
                className="min-h-[110px] rounded-2xl border-border/80 bg-card/70 text-xs"
              />
            </div>

            <Button
              onClick={lancer}
              disabled={loading || !profil}
              className="gap-2 rounded-2xl bg-primary py-5 text-xs font-semibold text-primary-foreground shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Préparation en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>Lancer l'entraînement</span>
                </>
              )}
            </Button>
          </section>

          <section className="flex min-w-0 flex-col gap-3">
            {prep ? (
              <>
                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                  <h3 className="mb-2 text-sm font-semibold">
                    Questions probables & pistes de réponse (STAR)
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {prep.questions.map((q, i) => (
                      <AccordionItem key={i} value={`q-${i}`}>
                        <AccordionTrigger className="text-left text-xs font-medium">
                          <span className="font-semibold text-primary">
                            [{q.categorie}]
                          </span>{" "}
                          {q.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-xs text-muted-foreground">
                          <ul className="list-disc pl-5">
                            {q.pistes.map((p, j) => (
                              <li key={j}>{p}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <Liste
                  titre="Arguments clés à valoriser"
                  items={prep.argumentsCles}
                  icon={<Target className="size-4 text-emerald-400" />}
                />
                <Liste
                  titre="Points faibles à anticiper"
                  items={prep.pointsFaibles}
                  icon={<TriangleAlert className="size-4 text-amber-400" />}
                />
                <Liste
                  titre="Questions à poser au recruteur"
                  items={prep.questionsARecruteur}
                  icon={<MessageSquareQuote className="size-4 text-primary" />}
                />
              </>
            ) : (
              <div className="glass-card p-10 text-center text-xs text-muted-foreground">
                <MessageSquareQuote className="mx-auto size-8 text-muted-foreground/50 mb-2" />
                <p className="font-medium text-foreground">
                  Aucune simulation active.
                </p>
                <p className="mt-1">
                  Choisissez une offre et lancez l'entraînement.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
