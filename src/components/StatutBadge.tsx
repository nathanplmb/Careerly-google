import type { Statut } from "@/lib/candidatures";

const STYLES: Record<Statut, string> = {
  Sauvegardée: "bg-muted/50 text-muted-foreground border-border/50",
  "À préparer": "bg-primary/10 text-primary border-primary/20",
  "À étudier": "bg-muted text-foreground border-border",
  "À candidater": "bg-primary/10 text-primary border-primary/20",
  "Candidature envoyée": "bg-accent text-accent-foreground border-primary/20",
  Relancée: "bg-primary/15 text-primary border-primary/30",
  Entretien: "bg-success/15 text-success border-success/30",
  "Deuxième entretien": "bg-success/25 text-success border-success/40",
  "Offre reçue": "bg-success/20 text-success border-success/40",
  Acceptée: "bg-success/30 text-success border-success/50 font-bold",
  Refusée: "bg-destructive/10 text-destructive border-destructive/25",
  "Sans réponse": "bg-warning/15 text-warning border-warning/30",
  Clôturée: "bg-muted/30 text-muted-foreground border-border/30",
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
