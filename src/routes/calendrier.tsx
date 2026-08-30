import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

import { Button } from "@/components/ui/button";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import { formatDate, todayIso, type Candidature } from "@/lib/candidatures";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier — Careerly" },
      {
        name: "description",
        content:
          "Toutes vos échéances de recherche de stage : dates limites, relances à faire et entretiens à venir.",
      },
      { property: "og:title", content: "Calendrier — Careerly" },
      {
        property: "og:description",
        content:
          "Visualisez vos deadlines, relances et entretiens mois par mois.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CalendrierPage,
});

type Evenement = {
  date: string;
  type: "Date limite" | "Relance" | "Entretien" | "Envoi";
  candidature: Candidature;
};

const COULEURS: Record<Evenement["type"], string> = {
  "Date limite": "bg-destructive/15 text-destructive border-destructive/30",
  Relance: "bg-warning/15 text-warning border-warning/30",
  Entretien: "bg-success/15 text-success border-success/30",
  Envoi: "bg-primary/15 text-primary border-primary/30",
};

const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

function moisLabel(annee: number, mois: number) {
  return new Date(annee, mois, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

function iso(annee: number, mois: number, jour: number) {
  return `${annee}-${String(mois + 1).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;
}

function CalendrierPage() {
  const { user, authLoading, items, save } = useCandidatures();
  const profil = useProfil(user);
  const today = todayIso();
  const now = new Date();
  const [annee, setAnnee] = useState(now.getFullYear());
  const [mois, setMois] = useState(now.getMonth());
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);

  const evenements = useMemo(() => {
    const list: Evenement[] = [];
    for (const c of items) {
      if (c.dateLimite && c.statut === "Je vais postuler")
        list.push({ date: c.dateLimite, type: "Date limite", candidature: c });
      if (
        c.dateRelance &&
        (c.statut === "J'ai postulé" || c.statut === "J'ai relancé")
      )
        list.push({ date: c.dateRelance, type: "Relance", candidature: c });
      if (c.statut === "J'ai un entretien" && c.dateDernierContact)
        list.push({
          date: c.dateDernierContact,
          type: "Entretien",
          candidature: c,
        });
      if (c.dateEnvoi)
        list.push({ date: c.dateEnvoi, type: "Envoi", candidature: c });
    }
    return list.sort((a, b) => a.date.localeCompare(b.date));
  }, [items]);

  const parJour = useMemo(() => {
    const map = new Map<string, Evenement[]>();
    for (const e of evenements) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date)!.push(e);
    }
    return map;
  }, [evenements]);

  const aVenir = useMemo(
    () =>
      evenements
        .filter((e) => e.date >= today && e.type !== "Envoi")
        .slice(0, 12),
    [evenements, today],
  );

  const premier = new Date(annee, mois, 1);
  const decalage = (premier.getDay() + 6) % 7; // lundi = 0
  const nbJours = new Date(annee, mois + 1, 0).getDate();
  const cases = [
    ...Array.from({ length: decalage }, () => null),
    ...Array.from({ length: nbJours }, (_, i) => i + 1),
  ];

  const changerMois = (delta: number) => {
    const d = new Date(annee, mois + delta, 1);
    setAnnee(d.getFullYear());
    setMois(d.getMonth());
  };

  return (
    <AppShell
      eyebrow="Planning"
      title="Calendrier"
      subtitle="Deadlines, relances et entretiens"
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="glass-card pop-in p-3 sm:p-5">
          <header className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold capitalize">
              {moisLabel(annee, mois)}
            </h2>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changerMois(-1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAnnee(now.getFullYear());
                  setMois(now.getMonth());
                }}
              >
                Aujourd'hui
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changerMois(1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground">
            {JOURS.map((j, i) => (
              <span key={i}>{j}</span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-0.5 sm:gap-1">
            {cases.map((jour, i) => {
              if (jour === null) return <span key={`v${i}`} />;
              const d = iso(annee, mois, jour);
              const evts = parJour.get(d) ?? [];
              const premierEvt = evts[0];
              return (
                <div
                  key={d}
                  className={cn(
                    "min-w-0 overflow-hidden rounded-lg border border-border/50 p-0.5 text-left sm:rounded-xl sm:p-1 sm:min-h-16",
                    d === today && "border-primary/60 bg-primary/10",
                  )}
                >
                  {/* Mobile : jour + pastilles */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!premierEvt) return;
                      setEditing(premierEvt.candidature);
                      setOpen(true);
                    }}
                    className="flex aspect-square w-full flex-col items-center justify-center gap-1 sm:hidden"
                  >
                    <span className="text-[11px] leading-none text-muted-foreground">
                      {jour}
                    </span>
                    <span className="flex items-center gap-0.5">
                      {evts.slice(0, 3).map((e, k) => (
                        <span
                          key={k}
                          className={cn(
                            "size-1.5 rounded-full border",
                            COULEURS[e.type],
                          )}
                        />
                      ))}
                    </span>
                  </button>

                  {/* Desktop / tablette */}
                  <div className="hidden sm:block">
                    <span className="text-[11px] text-muted-foreground">
                      {jour}
                    </span>
                    <div className="mt-0.5 flex flex-col gap-0.5">
                      {evts.slice(0, 2).map((e, k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => {
                            setEditing(e.candidature);
                            setOpen(true);
                          }}
                          className={cn(
                            "truncate rounded-md border px-1 py-0.5 text-[9.5px] font-medium",
                            COULEURS[e.type],
                          )}
                          title={`${e.type} — ${e.candidature.entreprise}`}
                        >
                          {e.candidature.entreprise || e.type}
                        </button>
                      ))}
                      {evts.length > 2 && (
                        <span className="text-[9.5px] text-muted-foreground">
                          +{evts.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="glass-card pop-in p-5">
          <h2 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
            <CalendarClock className="size-4 text-primary" /> À venir
          </h2>
          {aVenir.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aucune échéance à venir.
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {aVenir.map((e, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(e.candidature);
                    setOpen(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-2.5 text-left transition-colors hover:bg-accent/40"
                >
                  <span
                    className={cn(
                      "rounded-lg border px-2 py-1 text-[10.5px] font-semibold",
                      COULEURS[e.type],
                    )}
                  >
                    {e.type}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium">
                      {e.candidature.entreprise}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {e.candidature.poste}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(e.date)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        profil={profil}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
      />
    </AppShell>
  );
}
