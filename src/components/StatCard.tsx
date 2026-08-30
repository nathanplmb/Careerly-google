import type { ReactNode } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { cn } from "@/lib/utils";

type Tone = "violet" | "lilac" | "amber" | "emerald";

const TONES: Record<Tone, string> = {
  violet: "var(--primary)",
  lilac: "var(--lilac)",
  amber: "var(--warning)",
  emerald: "var(--success)",
};

/** Micro-courbe décorative lissée (sparkline). */
function Spark({ seed = 0 }: { seed?: number }) {
  const vals = [10, 16, 11, 19, 13, 22, 16, 24].map(
    (v, i) => (v + ((seed * 5 + i * 7) % 8)) % 24,
  );
  const pts = vals.map((v, i) => [i * 9, 26 - v] as const);
  const d = pts
    .map(([x, y], i) => {
      if (i === 0) return `M${x},${y}`;
      const [px, py] = pts[i - 1] ?? [0, 0];
      const cx = (px + x) / 2;
      return `C${cx},${py} ${cx},${y} ${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 64 28" className="h-7 w-16 shrink-0 overflow-visible">
      <path
        d={d}
        fill="none"
        stroke="var(--tone)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  index = 0,
  accent,
  delta,
  tone = "violet",
  suffix,
  to,
  search,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  index?: number;
  accent?: boolean;
  delta?: string;
  tone?: Tone;
  suffix?: string;
  to?: LinkProps["to"];
  search?: Record<string, string>;
}) {
  const contenu = (
    <div
      style={
        {
          "--tone": TONES[tone],
          animationDelay: `${index * 70}ms`,
        } as React.CSSProperties
      }
      className={cn(
        "tone-card pop-in relative overflow-hidden p-4",
        accent &&
          "shadow-[0_0_44px_-18px_color-mix(in_oklab,var(--tone)_90%,transparent)]",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="tone-chip size-10 shrink-0 rounded-2xl">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="num text-[30px] font-extrabold leading-none">
            <AnimatedNumber value={value} />
            {suffix}
          </div>
          <p className="mt-1 truncate text-[13px] text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span
          className="truncate text-[11px] font-semibold"
          style={{ color: "var(--tone)" }}
        >
          {delta ?? ""}
        </span>
        <Spark seed={index} />
      </div>
      {to ? (
        <ChevronRight className="absolute right-3 top-3 size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
      ) : null}
    </div>
  );

  if (!to) return contenu;
  return (
    <Link
      to={to}
      search={search as never}
      className="group block min-w-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {contenu as ReactNode}
    </Link>
  );
}
