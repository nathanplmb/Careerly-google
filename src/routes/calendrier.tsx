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
      { title: "Calendrier — NACORA" },
      {
        name: "description",
        content:
          "Toutes vos échéances de recherche de stage : dates limites, relances à faire et entretiens à venir.",
      },
      { property: "og:title", content: "Calendrier — NACORA" },
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
  titre?: string;
  candidature: Candidature;
};

const COULEURS: Record<Evenement["type"], string> = {
  "Date limite": "bg-destructive/15 text-destructive border-destructive/30",
  Relance: "bg-warning/15 text-warning border-warning/30",
  Entretien: "bg-success/15 text-success border-success/30",
  Envoi: "bg-primary/15 text-primary border-primary/30",
};

const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

function extraireDateIso(raw?: string | null): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match && match[1]) return match[1];
  return null;
}

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
      // 1. Date limite / Deadline de candidature (Opportunity.applicationDeadline en priorité)
      const deadline = extraireDateIso(c.applicationDeadline || c.dateLimite);
      if (deadline) {
        const nomPoste = c.poste || c.title || c.entreprise || "Candidature";
        list.push({
          date: deadline,
          type: "Date limite",
          titre: `Deadline — ${nomPoste}`,
          candidature: c,
        });
      }

      // 2. Relance
      const dateRelance = extraireDateIso(c.dateRelance || c.followUpDate);
      if (
        dateRelance &&
        (c.statut === "Candidature envoyée" || c.statut === "Relancée")
      ) {
        list.push({ date: dateRelance, type: "Relance", candidature: c });
      }

      // 3. Entretien
      const dateEntretien = extraireDateIso(
        c.interviewDate || c.dateDernierContact || c.lastContactDate,
      );
      if (
        (c.statut === "Entretien" || c.statut === "Deuxième entretien") &&
        dateEntretien
      ) {
        list.push({
          date: dateEntretien,
          type: "Entretien",
          candidature: c,
        });
      }

      // 4. Envoi
      const dateEnvoi = extraireDateIso(c.dateEnvoi || c.appliedAt);
      if (dateEnvoi) {
        list.push({ date: dateEnvoi, type: "Envoi", candidature: c });
      }
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
      title="Calendrier"
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="glass-panel p-5 sm:p-6 shadow-md">
          <header className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {moisLabel(annee, mois)}
            </h2>
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 p-1 backdrop-blur-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changerMois(-1)}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
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
                className="h-8 px-3 text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
              >
                Aujourd'hui
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changerMois(1)}
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-muted-foreground">
            {JOURS.map((j, i) => (
              <span key={i} className="py-1">{j}</span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1.5">
            {cases.map((jour, i) => {
              if (jour === null) return <span key={`v${i}`} />;
              const d = iso(annee, mois, jour);
              const evts = parJour.get(d) ?? [];
              const premierEvt = evts[0];
              return (
                <div
                  key={d}
                  className={cn(
                    "min-w-0 overflow-hidden rounded-xl border p-1.5 text-left min-h-18 transition-all backdrop-blur-md",
                    d === today
                      ? "border-primary/60 bg-primary/10 shadow-[0_0_12px_rgba(216,26,69,0.2)]"
                      : "border-white/8 bg-white/4 dark:bg-white/4 hover:border-white/20 hover:bg-white/8",
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
                    className="flex aspect-square w-full flex-col items-center justify-center gap-1 sm:hidden cursor-pointer"
                  >
                    <span className={cn(
                      "text-[11px] leading-none font-bold",
                      d === today ? "text-primary" : "text-muted-foreground"
                    )}>
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
                    <span className={cn(
                      "text-[11px] font-bold px-1",
                      d === today ? "text-primary font-extrabold" : "text-muted-foreground"
                    )}>
                      {jour}
                    </span>
                    <div className="mt-1 flex flex-col gap-1">
                      {evts.slice(0, 2).map((e, k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => {
                            setEditing(e.candidature);
                            setOpen(true);
                          }}
                          className={cn(
                            "truncate rounded-lg border px-2 py-0.5 text-[9px] font-bold text-left w-full backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer shadow-xs",
                            COULEURS[e.type],
                          )}
                          title={
                            e.titre || `${e.type} — ${e.candidature.entreprise}`
                          }
                        >
                          {e.titre || e.candidature.entreprise || e.type}
                        </button>
                      ))}
                      {evts.length > 2 && (
                        <span className="text-[9px] text-muted-foreground font-semibold px-1">
                          +{evts.length - 2} de plus
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-6 shadow-md flex flex-col">
          <h2 className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <CalendarClock className="size-4 text-primary" /> À venir
          </h2>
          {aVenir.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-sm text-muted-foreground">
              <CalendarClock className="size-8 text-muted-foreground/40 mb-2" />
              <p>Aucune échéance à venir.</p>
            </div>
          )}
          <ul className="flex flex-col gap-2.5">
            {aVenir.map((e, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(e.candidature);
                    setOpen(true);
                  }}
                  className="glass-card-interactive flex w-full items-center gap-3 px-3.5 py-3 text-left cursor-pointer"
                >
                  <span
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-[10.5px] font-semibold backdrop-blur-md",
                      COULEURS[e.type],
                    )}
                  >
                    {e.type}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-semibold text-foreground">
                      {e.titre || e.candidature.entreprise}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground mt-0.5">
                      {e.titre
                        ? e.candidature.entreprise || e.candidature.poste
                        : e.candidature.poste}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-mono text-muted-foreground">
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
