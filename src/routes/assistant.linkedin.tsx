import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Copy, Linkedin, Loader2, Sparkles } from "lucide-react";
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
import { AiContextCard } from "@/components/ai-hub/AiContextCard";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { genererLinkedin } from "@/lib/redaction.functions";
import { offreEnTexte, profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";

export const Route = createFileRoute("/assistant/linkedin")({
  head: () => ({
    meta: [
      { title: "LinkedIn Assistant — Careerly AI Hub" },
      {
        name: "description",
        content:
          "Générez vos notes d'invitation, messages de suivi et accroche de profil LinkedIn à partir de votre profil réel.",
      },
      { property: "og:title", content: "LinkedIn Assistant — Careerly AI Hub" },
      {
        property: "og:description",
        content:
          "Messages LinkedIn personnalisés générés par l'IA à partir de votre profil et de l'offre ciblée.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LinkedinPage,
});

type Resultat = {
  invitation: string;
  messageSuivi: string;
  accrocheProfil: string;
  conseils: string[];
};

function Bloc({ titre, texte }: { titre: string; texte: string }) {
  if (!texte) return null;
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{titre}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            void navigator.clipboard.writeText(texte);
            toast.success("Copié dans le presse-papiers.");
          }}
          className="h-7 text-xs"
        >
          <Copy className="size-3.5" /> Copier
        </Button>
      </div>
      <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground">
        {texte}
      </p>
    </div>
  );
}

function LinkedinPage() {
  const { user, authLoading, items } = useCandidatures();
  const profil = useProfil(user);
  const [cibleId, setCibleId] = useState("aucune");
  const [consigne, setConsigne] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Resultat | null>(null);

  const generer = async () => {
    if (!profil) {
      toast.error("Complétez d'abord votre profil.");
      return;
    }
    const cible = items.find((c) => c.id === cibleId) ?? null;
    setLoading(true);
    try {
      const r = await genererLinkedin({
        data: {
          profil: profilEnTexte(profil),
          offre: cible ? offreEnTexte(cible) : "",
          consigne,
        },
      });
      setRes({
        invitation: r.invitation ?? "",
        messageSuivi: r.messageSuivi ?? "",
        accrocheProfil: r.accrocheProfil ?? "",
        conseils: r.conseils ?? [],
      });
      toast.success("Messages LinkedIn générés !");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      eyebrow="Careerly AI Hub"
      title="LinkedIn Assistant"
      subtitle="Invitations réseau, messages d'approche et accroche de profil"
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

        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <section className="glass-card pop-in p-5 space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Linkedin className="size-4" />
              <span>Paramètres de génération</span>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-foreground">
                Offre ciblée (optionnel) :
              </label>
              <Select value={cibleId} onValueChange={setCibleId}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Général (sans offre spécifique)" />
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
              <label className="mb-1.5 block text-xs font-semibold text-foreground">
                Consigne spécifique ou ton souhaité :
              </label>
              <Textarea
                value={consigne}
                onChange={(e) => setConsigne(e.target.value)}
                placeholder="Ex: Ton chaleureux, prise de contact auprès d'un alumni de mon école..."
                className="min-h-[100px] rounded-xl text-xs"
              />
            </div>

            <Button
              onClick={generer}
              disabled={loading || !profil}
              className="w-full gap-2 rounded-xl bg-primary text-xs font-semibold text-primary-foreground shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Rédaction en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>Générer mes messages LinkedIn</span>
                </>
              )}
            </Button>
          </section>

          <section className="space-y-3">
            {res ? (
              <>
                <Bloc
                  titre="Note d'invitation (< 300 caractères)"
                  texte={res.invitation}
                />
                <Bloc
                  titre="Message de suivi / InMail"
                  texte={res.messageSuivi}
                />
                <Bloc
                  titre="Accroche pour votre profil LinkedIn"
                  texte={res.accrocheProfil}
                />
                {res.conseils.length > 0 && (
                  <div className="rounded-2xl border border-primary/20 bg-card/60 p-4">
                    <h3 className="mb-2 text-xs font-semibold text-primary">
                      Conseils de conversion
                    </h3>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {res.conseils.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="glass-card p-10 text-center text-xs text-muted-foreground">
                <Linkedin className="mx-auto size-8 text-muted-foreground/50 mb-2" />
                <p className="font-medium text-foreground">
                  Aucun message généré pour le moment.
                </p>
                <p className="mt-1">
                  Configurez vos options à gauche et cliquez sur "Générer".
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </AppShell>
  );
}
