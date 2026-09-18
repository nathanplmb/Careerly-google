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
    <AppShell title="Documents">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <section className="glass-panel flex h-fit flex-col gap-4 p-5 sm:p-6 shadow-md">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Générateur de documents
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            La génération par l'IA sera bientôt de retour dans une nouvelle
            version.
          </p>
        </section>

        <section className="flex flex-col gap-3.5">
          {lettres.length === 0 && (
            <div className="glass-panel border-dashed p-8 text-center text-sm text-muted-foreground flex flex-col items-center justify-center">
              <FileText className="mx-auto mb-3 size-8 text-primary/80" />
              <span>Aucun document pour l'instant.</span>
            </div>
          )}
          {lettres.map((l) => (
            <article
              key={l.id}
              className="glass-card-interactive p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left cursor-pointer"
                  onClick={() => setOuverte(ouverte === l.id ? null : l.id)}
                >
                  <h3 className="truncate text-sm font-bold text-foreground">
                    {l.titre}
                  </h3>
                  <p className="truncate text-xs text-muted-foreground font-semibold mt-1">
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
                    className="h-8 w-8 rounded-lg hover:bg-white/10"
                  >
                    <Copy className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      persister(lettres.filter((x) => x.id !== l.id))
                    }
                    className="h-8 w-8 rounded-lg hover:bg-destructive/15 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              {ouverte === l.id && (
                <div className="mt-3.5 border-t border-white/10 pt-3.5">
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-muted-foreground font-medium">
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
