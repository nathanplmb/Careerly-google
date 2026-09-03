import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatDate, type Candidature } from "@/lib/candidatures";
import { cn } from "@/lib/utils";

const BAR_COLORS = [
  "bg-primary",
  "bg-warning",
  "bg-lilac",
  "bg-success",
  "bg-chart-3",
  "bg-destructive",
];

function initiales(nom: string) {
  return (
    nom
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((m) => m[0]?.toUpperCase())
      .join("") || "?"
  );
}

/** Liste « Mes candidatures récentes ». */
export function RecentCandidatures({
  items,
  onOuvrir,
}: {
  items: Candidature[];
  onOuvrir: (c: Candidature) => void;
}) {
  const recentes = items.slice(0, 5);
  return (
    <section className="glass-card pop-in p-4 sm:p-5">
      <header className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-bold">Mes candidatures récentes</h2>
        <Link
          to="/opportunites"
          className="rounded-full bg-accent/50 px-3 py-1 text-[11.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Voir tout
        </Link>
      </header>

      <ul className="flex flex-col">
        {recentes.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">
            Aucune candidature pour le moment.
          </li>
        )}
        {recentes.map((c, i) => {
          return (
            <li
              key={c.id}
              className="pop-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                type="button"
                onClick={() => onOuvrir(c)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-accent/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/60 text-[12px] font-bold">
                  {initiales(c.entreprise)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-semibold">
                    {c.entreprise || "Sans nom"}
                  </span>
                  <span className="block truncate text-[12px] text-muted-foreground">
                    {c.poste || "—"}
                  </span>
                </span>
                {c.match && n && (
                  <span className="hidden items-center gap-2 sm:flex">
                    <span
                      className={cn(
                        "num rounded-md border px-1.5 py-0.5 text-[12px] font-bold",
                        (n as any)?.badge,
                      )}
                    >
                      {c.match.global}%
                    </span>
                    <span className="hidden text-[12px] text-muted-foreground lg:block">
                      {(n as any)?.label}
                    </span>
                  </span>
                )}
                <span className="hidden w-32 shrink-0 text-right md:block">
                  <span className="block truncate text-[11px] font-medium text-foreground">
                    {c.statut}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {formatDate(c.dateEnvoi) || "—"}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Panneau « meilleur match » avec anneau de score et sous-critères. */
export function MatchSpotlight({
  candidature,
  onOuvrir,
}: {
  candidature: Candidature | null;
  onOuvrir: (c: Candidature) => void;
}) {
  const match = candidature?.match ?? null;
  const score = match?.global ?? 0;
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <section className="glass-card pop-in relative overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />
      {!candidature || !match ? (
        <div className="flex h-full min-h-48 flex-col items-center justify-center text-center">
          <Sparkles className="mb-3 size-6 text-primary" />
          <p className="text-sm font-semibold">Aucune analyse IA disponible</p>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            Lancez « Actualiser les matchs IA » pour découvrir vos meilleures
            opportunités.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 text-center xl:flex-row xl:items-start xl:text-left">
          <div className="relative grid size-[120px] shrink-0 place-items-center">
            <svg viewBox="0 0 120 120" className="size-[120px] -rotate-90">
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                strokeWidth="10"
                className="stroke-accent/60"
              />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="var(--color-primary)"
                strokeDasharray={C}
                strokeDashoffset={C - (C * score) / 100}
                style={{
                  transition: "stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)",
                }}
              />
            </svg>
            <span className="absolute num text-3xl font-extrabold">
              {score}
              <span className="text-base">%</span>
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="flex items-center justify-center gap-1.5 text-[17px] font-bold xl:justify-start">
              {(n as any)?.label} <span className="text-primary">✦</span>
            </h3>
            <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">
              {match.explication ||
                `${candidature.poste} chez ${candidature.entreprise}`}
            </p>
            <button
              type="button"
              onClick={() => onOuvrir(candidature)}
              className="press mt-3 inline-flex items-center gap-2 rounded-full gradient-hero px-4 py-2 text-[13px] font-semibold text-primary-foreground"
            >
              Voir l'analyse complète
            </button>
          </div>
        </div>
      )}

      {match && (match.criteres?.length || 0) > 0 && (
        <ul className="mt-5 flex flex-col gap-2.5">
          {match.criteres.slice(0, 6).map((d, i) => (
            <li key={d.critere} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-[12.5px] text-muted-foreground">
                {d.critere}
              </span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent/60">
                <span
                  className={cn("block h-full rounded-full", BAR_COLORS[i % 6])}
                  style={{
                    width: `${Math.max(0, Math.min(100, d.score))}%`,
                    transition: "width .8s cubic-bezier(.22,1,.36,1)",
                  }}
                />
              </span>
              <span className="num w-9 shrink-0 text-right text-[12px] font-semibold">
                {d.score}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Bandeau Careerly AI en bas du tableau de bord. */
export function AiBar({
  onCv,
  onEmail,
  onEntretien,
}: {
  onCv: () => void;
  onEmail: () => void;
  onEntretien: () => void;
}) {
  const actions = [
    { label: "Analyser mon CV", onClick: onCv },
    { label: "Générer un email", onClick: onEmail },
    { label: "Préparer un entretien", onClick: onEntretien },
  ];
  return (
    <section className="ai-surface pop-in mt-6 flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="ai-pulse grid size-10 shrink-0 place-items-center rounded-2xl gradient-hero text-primary-foreground">
          <Sparkles className="size-5" />
        </span>
        <div>
          <p className="text-[15px] font-bold">
            NACORA AI <span className="text-primary">✦</span>
          </p>
          <p className="text-[12.5px] text-muted-foreground">
            Votre copilote intelligent pour décrocher le bon poste.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={a.onClick}
            className="press inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-[13px] font-medium transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Sparkles className="size-3.5 text-primary" /> {a.label}
          </button>
        ))}
      </div>
    </section>
  );
}
