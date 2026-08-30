import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
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
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { genererInterview } from "@/lib/redaction.functions";
import { offreEnTexte, profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";

export const Route = createFileRoute("/assistant/interview")({
  head: () => ({
    meta: [
      { title: "Interview Coach — Careerly" },
      {
        name: "description",
        content:
          "Préparez vos entretiens : questions probables, pistes de réponse STAR, arguments clés et questions à poser au recruteur.",
      },
      { property: "og:title", content: "Interview Coach — Careerly" },
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
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      eyebrow="AI Studio"
      title="Interview Coach"
      subtitle="Questions probables, pistes de réponse et arguments clés"
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <section className="glass-card pop-in flex h-fit min-w-0 flex-col gap-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Entretien pour
            </label>
            <Select value={cibleId} onValueChange={setCibleId}>
              <SelectTrigger className="min-w-0">
                <SelectValue placeholder="Choisir une offre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aucune">Entretien générique</SelectItem>
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
              Contexte complémentaire
            </label>
            <Textarea
              value={consigne}
              onChange={(e) => setConsigne(e.target.value)}
              rows={5}
              placeholder="Ex : entretien en visio de 30 min avec le manager technique."
            />
          </div>

          <Button onClick={() => void lancer()} disabled={loading || !profil}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Préparation…
              </>
            ) : (
              <>
                <Sparkles /> Préparer l'entretien
              </>
            )}
          </Button>

          {!profil && (
            <p className="text-xs text-muted-foreground">
              Renseignez d'abord{" "}
              <Link to="/profil" className="text-primary hover:underline">
                votre profil
              </Link>
              .
            </p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          {!prep && (
            <p className="glass-card p-8 text-center text-sm text-muted-foreground">
              <MessageSquareQuote className="mx-auto mb-3 size-6 text-primary" />
              Votre préparation d'entretien apparaîtra ici.
            </p>
          )}
          {prep && (
            <div className="pop-in flex flex-col gap-3">
              {prep.questions.length > 0 && (
                <div className="glass-card p-4">
                  <h3 className="mb-2 text-sm font-semibold">
                    Questions probables
                  </h3>
                  <Accordion type="single" collapsible>
                    {prep.questions.map((q, i) => (
                      <AccordionItem key={i} value={`q${i}`}>
                        <AccordionTrigger className="text-left text-[13.5px]">
                          <span>
                            <span className="mr-2 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] text-primary">
                              {q.categorie}
                            </span>
                            {q.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 text-[13.5px] text-muted-foreground">
                            {q.pistes.map((p, j) => (
                              <li key={j}>{p}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
              <Liste
                titre="Arguments clés à placer"
                items={prep.argumentsCles}
                icon={<Target className="size-4 text-primary" />}
              />
              <Liste
                titre="Points de vigilance"
                items={prep.pointsFaibles}
                icon={<TriangleAlert className="size-4 text-amber-400" />}
              />
              <Liste
                titre="Questions à poser au recruteur"
                items={prep.questionsARecruteur}
                icon={<MessageSquareQuote className="size-4 text-primary" />}
              />
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
