import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, FileText, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { useCandidatures } from "@/hooks/useCandidatures";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [{ title: "Documents — NACORA" }],
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
  const { authLoading } = useCandidatures();
  const [lettres, setLettres] = useState<Lettre[]>([]);
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

  return (
    <AppShell
      eyebrow="Documents"
      title="Documents"
      subtitle={`${lettres.length} document(s) enregistré(s)`}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <section className="glass-card pop-in flex h-fit flex-col gap-4 p-5">
          <h2 className="text-sm font-semibold">Générateur de documents</h2>
          <p className="text-sm text-muted-foreground">
            La génération par l'IA sera bientôt de retour dans une nouvelle
            version.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          {lettres.length === 0 && (
            <p className="glass-card p-8 text-center text-sm text-muted-foreground">
              <FileText className="mx-auto mb-3 size-6 text-primary" />
              Aucun document pour l'instant.
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
                      toast.success("Copié.");
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
                </div>
              )}
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}
