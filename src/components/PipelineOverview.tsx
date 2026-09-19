import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Candidature } from "@/lib/candidatures";

interface PipelineOverviewProps {
  items: Candidature[];
}

export function PipelineOverview({ items }: PipelineOverviewProps) {
  const activeItems = useMemo(() => items.filter((c) => !c.archive), [items]);

  const counts = useMemo(() => {
    let sauvegardees = 0;
    let aPreparer = 0;
    let aEtudier = 0;
    let aCandidater = 0;
    let envoyees = 0;
    let entretiens = 0;

    for (const c of activeItems) {
      const s = c.statut;
      if (s === "Sauvegardée" || c.currentWorkflowStep === "saved") {
        sauvegardees++;
      } else if (s === "À préparer" || c.currentWorkflowStep === "to_prepare") {
        aPreparer++;
      } else if (s === "À étudier") {
        aEtudier++;
      } else if (s === "À candidater") {
        aCandidater++;
      } else if (s === "Candidature envoyée" || s === "Relancée") {
        envoyees++;
      } else if (s === "Entretien" || s === "Deuxième entretien") {
        entretiens++;
      }
    }

    return {
      sauvegardees,
      aPreparer,
      aEtudier,
      aCandidater,
      envoyees,
      entretiens,
      total: activeItems.length,
    };
  }, [activeItems]);

  const stages = [
    {
      label: "Sauvegardées",
      count: counts.sauvegardees,
      dot: "bg-muted-foreground/40",
    },
    { label: "À préparer", count: counts.aPreparer, dot: "bg-primary" },
    { label: "À étudier", count: counts.aEtudier, dot: "bg-lilac" },
    { label: "À candidater", count: counts.aCandidater, dot: "bg-amber-400" },
    { label: "Envoyées", count: counts.envoyees, dot: "bg-emerald-400" },
    { label: "Entretiens", count: counts.entretiens, dot: "bg-sky-400" },
  ];

  return (
    <section
      id="candidatures-overview-card"
      className="glass-panel p-5.5 transition-all"
      suppressHydrationWarning
    >
      <header className="mb-4 flex items-center justify-between border-b border-white/10 pb-3.5">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Mes candidatures
        </h3>
        <span className="text-xs text-muted-foreground font-normal">
          {counts.total} au total
        </span>
      </header>

      {/* Lignes compactes des étapes */}
      <div className="space-y-2.5">
        {stages.map((st) => (
          <div
            key={st.label}
            className="flex items-center justify-between text-xs py-0.5"
          >
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${st.dot} shadow-xs`} />
              <span className="text-muted-foreground font-normal">
                {st.label}
              </span>
            </div>
            <span className="text-foreground font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px]">
              {st.count}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3.5">
        <Link
          to="/opportunites"
          className="group inline-flex w-full items-center justify-between text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>Voir toutes les opportunités</span>
          <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Link>
      </div>
    </section>
  );
}
