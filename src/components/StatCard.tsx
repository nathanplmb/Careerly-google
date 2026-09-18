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
        "glass-card-interactive pop-in relative overflow-hidden p-4.5 transition-all",
        accent && "border-primary/40 shadow-[0_0_20px_rgba(216,26,69,0.15)]",
      )}
    >
      <div className="flex items-center gap-3.5">
        <span className="size-10 shrink-0 rounded-xl bg-white/5 dark:bg-white/5 flex items-center justify-center text-foreground border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
          <Icon className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="num text-2xl sm:text-[26px] font-bold leading-none text-foreground tracking-tight">
            <AnimatedNumber value={value} />
            {suffix}
          </div>
          <p className="mt-1.5 truncate text-xs font-normal text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2 border-t border-white/5 pt-2">
        <span className="truncate text-[11px] font-medium text-muted-foreground/80">
          {delta ?? ""}
        </span>
        <Spark seed={index} />
      </div>
      {to ? (
        <ChevronRight className="absolute right-3 top-3 size-4 text-muted-foreground/60 opacity-0 transition group-hover:opacity-100" />
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
