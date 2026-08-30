import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Linkedin, Loader2, Sparkles } from "lucide-react";
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
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { genererLinkedin } from "@/lib/redaction.functions";
import { offreEnTexte, profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";

export const Route = createFileRoute("/assistant/linkedin")({
  head: () => ({
    meta: [
      { title: "LinkedIn Assistant — Careerly" },
      {
        name: "description",
        content:
          "Générez vos notes d'invitation, messages de suivi et accroche de profil LinkedIn à partir de votre profil réel.",
      },
      { property: "og:title", content: "LinkedIn Assistant — Careerly" },
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
            toast.success("Copié.");
          }}
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
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      eyebrow="AI Studio"
      title="LinkedIn Assistant"
      subtitle="Invitations, messages de suivi et accroche de profil"
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <section className="glass-card pop-in flex flex-col gap-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Offre ciblée (facultatif)
            </label>
            <Select value={cibleId} onValueChange={setCibleId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aucune">Aucune offre</SelectItem>
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
              Consigne complémentaire
            </label>
            <Textarea
              value={consigne}
              onChange={(e) => setConsigne(e.target.value)}
              rows={5}
              placeholder="Ex : je contacte un ancien élève de mon école, ton un peu plus direct."
            />
          </div>

          <Button onClick={() => void generer()} disabled={loading || !profil}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Génération…
              </>
            ) : (
              <>
                <Sparkles /> Générer mes messages
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
          {!res && (
            <p className="glass-card p-8 text-center text-sm text-muted-foreground">
              <Linkedin className="mx-auto mb-3 size-6 text-primary" />
              Vos messages LinkedIn générés apparaîtront ici.
            </p>
          )}
          {res && (
            <div className="pop-in flex flex-col gap-3">
              <Bloc titre="Note d'invitation" texte={res.invitation} />
              <Bloc
                titre="Message après acceptation"
                texte={res.messageSuivi}
              />
              <Bloc titre="Accroche de profil" texte={res.accrocheProfil} />
              {res.conseils.length > 0 && (
                <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
                  <h3 className="mb-2 text-sm font-semibold">Conseils</h3>
                  <ul className="list-disc pl-5 text-[13.5px] text-muted-foreground">
                    {res.conseils.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
