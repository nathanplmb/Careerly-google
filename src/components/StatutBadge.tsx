import type { Statut } from "@/lib/candidatures";

const STYLES: Record<
  Statut,
  { bg: string; text: string; border: string; dot: string; glow?: string }
> = {
  Sauvegardée: {
    bg: "bg-white/5 backdrop-blur-md",
    text: "text-muted-foreground",
    border: "border-white/10",
    dot: "bg-zinc-400",
  },
  "À préparer": {
    bg: "bg-amber-500/10 backdrop-blur-md",
    text: "text-amber-400 dark:text-amber-300",
    border: "border-amber-500/25",
    dot: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
  },
  "À étudier": {
    bg: "bg-blue-500/10 backdrop-blur-md",
    text: "text-blue-400 dark:text-blue-300",
    border: "border-blue-500/25",
    dot: "bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]",
  },
  "À candidater": {
    bg: "bg-primary/15 backdrop-blur-md",
    text: "text-primary dark:text-[#FF386B]",
    border: "border-primary/30",
    dot: "bg-primary shadow-[0_0_8px_rgba(216,26,69,0.7)]",
  },
  "Candidature envoyée": {
    bg: "bg-blue-500/10 backdrop-blur-md",
    text: "text-blue-400 dark:text-blue-300",
    border: "border-blue-500/25",
    dot: "bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.6)]",
  },
  Relancée: {
    bg: "bg-amber-500/10 backdrop-blur-md",
    text: "text-amber-400 dark:text-amber-300",
    border: "border-amber-500/25",
    dot: "bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
  },
  Entretien: {
    bg: "bg-emerald-500/10 backdrop-blur-md",
    text: "text-emerald-400 dark:text-emerald-300",
    border: "border-emerald-500/25",
    dot: "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]",
  },
  "Deuxième entretien": {
    bg: "bg-emerald-500/15 backdrop-blur-md",
    text: "text-emerald-400 dark:text-emerald-300",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  },
  "Offre reçue": {
    bg: "bg-emerald-500/20 backdrop-blur-md",
    text: "text-emerald-300",
    border: "border-emerald-500/35",
    dot: "bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
  },
  Acceptée: {
    bg: "bg-emerald-500/25 backdrop-blur-md",
    text: "text-emerald-200",
    border: "border-emerald-500/45",
    dot: "bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.9)]",
  },
  Refusée: {
    bg: "bg-destructive/10 backdrop-blur-md",
    text: "text-destructive",
    border: "border-destructive/25",
    dot: "bg-destructive shadow-[0_0_6px_rgba(240,68,56,0.6)]",
  },
  "Sans réponse": {
    bg: "bg-white/5 backdrop-blur-md",
    text: "text-muted-foreground",
    border: "border-white/10",
    dot: "bg-zinc-400",
  },
  Clôturée: {
    bg: "bg-white/5 backdrop-blur-md",
    text: "text-muted-foreground/80",
    border: "border-white/10",
    dot: "bg-zinc-500",
  },
};

type Props = {
  statut: Statut;
  size?: "xs" | "sm" | "md";
};

export function StatutBadge({ statut, size = "md" }: Props) {
  const cfg = STYLES[statut] || {
    bg: "bg-white/5 backdrop-blur-md",
    text: "text-muted-foreground",
    border: "border-white/10",
    dot: "bg-zinc-400",
  };

  const sizeClass =
    size === "xs"
      ? "px-2 py-0.5 text-[10px]"
      : size === "sm"
        ? "px-2.5 py-0.5 text-[11px]"
        : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-all ${sizeClass} ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <span className={`size-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {statut}
    </span>
  );
}
