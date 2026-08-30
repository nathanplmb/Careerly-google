import { useQuery } from "@tanstack/react-query";
import { Gauge, Loader2 } from "lucide-react";
import { usageIaDuJour, type LigneUsage } from "@/lib/quota.functions";

const LIBELLES: Record<string, string> = {
  brief: "Daily Brief",
  match: "Match IA",
  offre: "Analyse d'offre",
  cv: "Analyse de CV",
  tri: "Assistant IA",
  redaction: "Rédaction IA",
  relance: "Relance IA",
};

function Barre({ ligne }: { ligne: LigneUsage }) {
  const pct =
    ligne.limite > 0 ? Math.min(100, (ligne.utilise / ligne.limite) * 100) : 0;
  const reste = Math.max(0, ligne.limite - ligne.utilise);
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span>{LIBELLES[ligne.outil] ?? ligne.outil}</span>
        <span
          className={reste === 0 ? "text-destructive" : "text-muted-foreground"}
        >
          {reste} restant{reste > 1 ? "s" : ""} / {ligne.limite}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${pct >= 100 ? "bg-destructive" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function UsageIaCard({ connecte }: { connecte: boolean }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usage-ia"],
    queryFn: () => usageIaDuJour(),
    enabled: connecte,
    staleTime: 60_000,
  });

  return (
    <section className="glass-card pop-in p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <Gauge className="size-4" /> Utilisation IA du jour
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Les quotas se réinitialisent chaque jour. Ils protègent le service
        contre les usages abusifs.
      </p>

      {!connecte ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Connectez-vous pour voir vos quotas IA.
        </p>
      ) : isLoading ? (
        <Loader2 className="mt-4 size-4 animate-spin opacity-70" />
      ) : error || !data ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Usage indisponible pour le moment.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {data.lignes.map((l) => (
            <Barre key={l.outil} ligne={l} />
          ))}
          <div className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
            Total : {data.total_utilise} / {data.total_limite} analyses
            aujourd'hui · plan {data.plan}
          </div>
        </div>
      )}
    </section>
  );
}
