import type { Statut } from "@/lib/candidatures";

const STYLES: Record<Statut, string> = {
  "Je vais postuler": "bg-muted text-muted-foreground border-border",
  "J'ai postulé": "bg-accent text-accent-foreground border-primary/20",
  "J'ai relancé": "bg-primary/15 text-primary border-primary/30",
  "J'ai un entretien": "bg-success/15 text-success border-success/30",
  "J'ai reçu une réponse négative":
    "bg-destructive/10 text-destructive border-destructive/25",
  "Je n'ai pas reçu de réponse": "bg-warning/15 text-warning border-warning/30",
};

export function StatutBadge({ statut }: { statut: Statut }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[statut]}`}
    >
      {statut}
    </span>
  );
}
