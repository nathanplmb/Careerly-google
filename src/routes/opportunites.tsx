import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";
import {
  CalendarClock,
  ExternalLink,
  Loader2,
  Plus,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

import { Button } from "@/components/ui/button";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import {
  addDays,
  emptyCandidature,
  formatDate,
  STATUTS_OPPORTUNITE,
  todayIso,
  type Candidature,
  type Statut,
} from "@/lib/candidatures";

const TONS_COLONNE = [
  "var(--primary)",
  "var(--lilac)",
  "var(--warning)",
  "var(--success)",
  "var(--destructive)",
  "var(--pink)",
];

export const Route = createFileRoute("/opportunites")({
  head: () => ({
    meta: [
      { title: "Opportunités — NACORA" },
      {
        name: "description",
        content:
          "Votre pipeline d'opportunités en colonnes : à postuler, envoyées, relancées, entretiens et réponses.",
      },
      { property: "og:title", content: "Opportunités — NACORA" },
      {
        property: "og:description",
        content:
          "Visualisez votre pipeline de candidatures et les deadlines à ne pas manquer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OpportunitesPage,
});

function OpportunitesPage() {
  const { user, authLoading, items, patch, save } = useCandidatures();
  const profil = useProfil(user);
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);

  const today = todayIso();

  const colonnes = useMemo(
    () =>
      STATUTS_OPPORTUNITE.map((s) => ({
        statut: s,
        liste: items.filter((c) => c.statut === s),
      })),
    [items],
  );

  const urgentes = useMemo(
    () =>
      items
        .filter(
          (c) =>
            c.dateLimite &&
            c.dateLimite >= today &&
            c.dateLimite <= addDays(today, 7),
        )
        .sort((a, b) => a.dateLimite.localeCompare(b.dateLimite)),
    [items, today],
  );

  const ouvrir = (c: Candidature) => {
    setEditing(c);
    setOpen(true);
  };

  return (
    <AppShell
      eyebrow="Pipeline"
      title="Opportunités"
      subtitle="Votre pipeline, colonne par colonne"
      onAdd={() => {
        setEditing(emptyCandidature());
        setOpen(true);
      }}
      headerExtra={
        <>
          <Button
            onClick={() => {
              setEditing(emptyCandidature());
              setOpen(true);
            }}
          >
            <Plus /> Ajouter une opportunité
          </Button>
        </>
      }
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      {urgentes.length > 0 && (
        <div className="glass-card pop-in mb-5 p-5">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
            <CalendarClock className="size-4 text-primary" /> Deadlines dans les
            7 jours
          </p>
          <div className="flex flex-wrap gap-2">
            {urgentes.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => ouvrir(c)}
                className="press rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium"
              >
                {c.entreprise} — {formatDate(c.dateLimite)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {colonnes.map(({ statut, liste }, i) => (
          <section
            key={statut}
            className="tone-card pop-in flex min-w-0 flex-col gap-3 p-4"
            style={
              {
                animationDelay: `${i * 50}ms`,
                "--tone": TONS_COLONNE[i % TONS_COLONNE.length],
              } as CSSProperties
            }
          >
            <header className="flex items-center justify-between gap-2">
              <h2 className="flex min-w-0 items-center gap-2 text-sm font-semibold">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--tone)" }}
                />
                <span className="truncate">{statut}</span>
              </h2>
              <span className="tone-chip shrink-0 px-2 py-0.5 text-[11px] font-bold">
                {liste.length}
              </span>
            </header>

            {liste.length === 0 && (
              <p className="py-6 text-center text-xs text-muted-foreground">
                Aucune opportunité ici.
              </p>
            )}

            {liste.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-border/60 bg-card/60 p-3 transition-colors hover:bg-accent/40"
              >
                <button
                  type="button"
                  onClick={() => ouvrir(c)}
                  className="block w-full text-left"
                >
                  <p className="truncate text-[13.5px] font-semibold">
                    {c.entreprise}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.poste}
                  </p>
                </button>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {c.lieu && (
                    <span className="text-[11px] text-muted-foreground">
                      {c.lieu}
                    </span>
                  )}
                  {c.dateLimite && (
                    <span
                      className={
                        c.dateLimite < today
                          ? "text-[11px] font-medium text-destructive"
                          : c.dateLimite <= addDays(today, 7)
                            ? "text-[11px] font-medium text-primary"
                            : "text-[11px] text-muted-foreground"
                      }
                    >
                      Limite {formatDate(c.dateLimite)}
                    </span>
                  )}
                  {c.lien && (
                    <a
                      href={c.lien}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                    >
                      Offre <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {STATUTS_OPPORTUNITE.filter((s) => s !== statut)
                    .slice(0, 2)
                    .map((s: Statut) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => patch(c.id, { statut: s })}
                        className="rounded-full border border-border/70 px-2 py-1 text-[10.5px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                      >
                        → {s}
                      </button>
                    ))}
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>

      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        profil={profil}
        existingItems={items}
        onOpenExisting={(c) => {
          setEditing(c);
          setOpen(true);
        }}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
      />
    </AppShell>
  );
}
