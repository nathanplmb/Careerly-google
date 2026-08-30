import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { niveauMatch } from "@/lib/matching";
import type { MatchScore } from "@/lib/candidatures";

type Props = {
  match: MatchScore | null | undefined;
  obsolete?: boolean;
  className?: string;
};

/** Badge compact réutilisable (tableau, kanban, fiche, daily brief). */
export function MatchBadge({ match, obsolete, className }: Props) {
  if (!match || typeof match.global !== "number") {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>—</span>
    );
  }
  const n = niveauMatch(match.global);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        n.badge,
        obsolete && "opacity-60",
        className,
      )}
      title={
        obsolete
          ? "Analyse potentiellement obsolète — profil ou offre modifié"
          : `${n.label}${match.confiance ? ` · confiance ${match.confiance}%` : ""}`
      }
    >
      <Sparkles className="size-3" />
      {match.global}% — {n.label}
      {obsolete ? " ⟳" : ""}
    </span>
  );
}
