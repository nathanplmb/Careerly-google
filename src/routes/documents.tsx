import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, FileText, Loader2, Sparkles, Trash2 } from "lucide-react";
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
import { genererLettre } from "@/lib/redaction.functions";
import { offreEnTexte, profilEnTexte } from "@/lib/match-run";
import { texteErreurIA } from "@/lib/ai-erreurs";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — NACORA" },
      {
        name: "description",
        content:
          "Générez et conservez vos lettres de motivation personnalisées pour chaque offre suivie.",
      },
      { property: "og:title", content: "Documents — NACORA" },
      {
        property: "og:description",
        content:
          "Lettres de motivation générées par l'IA à partir de votre profil réel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DocumentsPage,
});

type Lettre = {
  id: string;
  titre: string;
  objet: string;
  contenu: string;
  conseils: string[];
  creeLe: string;
};

const CLE = "careerly.lettres";

function charger(): Lettre[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CLE);
    return raw ? (JSON.parse(raw) as Lettre[]) : [];
  } catch {
    return [];
  }
}

function DocumentsPage() {
  const { user, authLoading, items } = useCandidatures();
  const profil = useProfil(user);
  const [lettres, setLettres] = useState<Lettre[]>([]);
  const [cibleId, setCibleId] = useState("aucune");
  const [consigne, setConsigne] = useState("");
  const [loading, setLoading] = useState(false);
  const [ouverte, setOuverte] = useState<string | null>(null);

  useEffect(() => setLettres(charger()), []);

  const persister = (l: Lettre[]) => {
    setLettres(l);
    try {
      localStorage.setItem(CLE, JSON.stringify(l));
    } catch {
      /* quota */
    }
  };

  const generer = async () => {
    if (!profil) {
      toast.error("Complétez d'abord votre profil.");
      return;
    }
    const cible = items.find((c) => c.id === cibleId) ?? null;
    setLoading(true);
    try {
      const r = await genererLettre({
        data: {
          profil: profilEnTexte(profil),
          offre: cible ? offreEnTexte(cible) : "",
          consigne,
        },
      });
      const lettre: Lettre = {
        id: crypto.randomUUID(),
        titre: cible
          ? `${cible.entreprise} — ${cible.poste}`
          : "Lettre générique",
        objet: (r.objet ?? "").trim(),
        contenu: (r.lettre ?? "").trim(),
        conseils: r.conseils ?? [],
        creeLe: new Date().toISOString(),
      };
      persister([lettre, ...lettres]);
      setOuverte(lettre.id);
      toast.success("Lettre générée.");
    } catch (e) {
      toast.error(texteErreurIA(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      eyebrow="AI Studio"
      title="Documents"
      subtitle={`${lettres.length} lettre(s) de motivation enregistrée(s)`}
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <section className="glass-card pop-in flex h-fit flex-col gap-4 p-5">
          <h2 className="text-sm font-semibold">
            Nouvelle lettre de motivation
          </h2>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Offre visée
            </label>
            <Select value={cibleId} onValueChange={setCibleId}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une offre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aucune">Lettre générique</SelectItem>
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
              placeholder="Ex : insister sur mon projet professionnel et ma disponibilité."
            />
          </div>
          <Button onClick={() => void generer()} disabled={loading || !profil}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Rédaction…
              </>
            ) : (
              <>
                <Sparkles /> Générer la lettre
              </>
            )}
          </Button>
          {!profil && (
            <p className="text-xs text-muted-foreground">
              Renseignez d'abord{" "}
              <Link to="/profil" className="text-primary hover:underline">
                votre profil
              </Link>{" "}
              (ou importez votre CV) pour une lettre pertinente.
            </p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          {lettres.length === 0 && (
            <p className="glass-card p-8 text-center text-sm text-muted-foreground">
              <FileText className="mx-auto mb-3 size-6 text-primary" />
              Aucune lettre pour l'instant.
            </p>
          )}
          {lettres.map((l) => (
            <article key={l.id} className="glass-card pop-in p-4">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() => setOuverte(ouverte === l.id ? null : l.id)}
                >
                  <h3 className="truncate text-[14px] font-semibold">
                    {l.titre}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {l.objet || new Date(l.creeLe).toLocaleDateString("fr-FR")}
                  </p>
                </button>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      void navigator.clipboard.writeText(l.contenu);
                      toast.success("Lettre copiée.");
                    }}
                  >
                    <Copy className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      persister(lettres.filter((x) => x.id !== l.id))
                    }
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {ouverte === l.id && (
                <div className="mt-3 border-t border-border/60 pt-3">
                  <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground">
                    {l.contenu}
                  </p>
                  {l.conseils.length > 0 && (
                    <ul className="mt-3 list-disc pl-5 text-xs text-muted-foreground">
                      {l.conseils.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
