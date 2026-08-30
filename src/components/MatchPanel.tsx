import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  RefreshCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  labelRecommandation,
  MENTION_TRANSPARENCE,
  niveauMatch,
} from "@/lib/matching";
import type { Candidature, MatchScore } from "@/lib/candidatures";

type Props = {
  match: MatchScore | null;
  obsolete: boolean;
  loading: boolean;
  erreur: string | null;
  profilPret: boolean;
  offrePrete: boolean;
  onAnalyser: () => void;
  candidature?: Candidature;
};

function Liste({
  titre,
  items,
  icon,
  tone,
}: {
  titre: string;
  items: string[];
  icon: React.ReactNode;
  tone?: "positif" | "vigilance";
}) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {titre}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((t, i) => (
          <li
            key={i}
            className={cn(
              "flex gap-2 text-sm text-muted-foreground",
              tone === "positif" && "text-foreground",
            )}
          >
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chips({
  titre,
  items,
  variant,
}: {
  titre: string;
  items: string[];
  variant: "ok" | "warn" | "muted";
}) {
  if (!items?.length) return null;
  const cls =
    variant === "ok"
      ? "border-primary/30 bg-primary/10 text-primary"
      : variant === "warn"
        ? "border-destructive/30 bg-destructive/10 text-destructive"
        : "border-border bg-muted text-muted-foreground";
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{titre}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.map((s, i) => (
          <span
            key={i}
            className={cn("rounded-full border px-2 py-0.5 text-xs", cls)}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MatchPanel({
  match,
  obsolete,
  loading,
  erreur,
  profilPret,
  offrePrete,
  onAnalyser,
}: Props) {
  const niveau = match ? niveauMatch(match.global) : null;

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="size-4 text-primary" />
          Correspondance avec votre profil
        </h3>
        <Button
          size="sm"
          onClick={onAnalyser}
          disabled={loading || !profilPret || !offrePrete}
          variant={match ? "outline" : "default"}
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Analyse en cours…
            </>
          ) : match ? (
            <>
              <RefreshCw className="size-4" /> Ré-analyser
            </>
          ) : (
            <>
              <Sparkles className="size-4" /> Analyser avec l'IA
            </>
          )}
        </Button>
      </div>

      {!profilPret && (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>
            Complétez d'abord votre{" "}
            <Link to="/profil" className="text-primary hover:underline">
              profil
            </Link>{" "}
            (formation, compétences, expériences) pour obtenir une analyse
            fiable.
          </span>
        </p>
      )}

      {profilPret && !offrePrete && (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          Ajoutez le détail de l'offre (missions, profil recherché) pour lancer
          l'analyse.
        </p>
      )}

      {erreur && (
        <p className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {erreur}
        </p>
      )}

      {loading && !match && (
        <div className="mt-4 space-y-3">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="h-2 w-full animate-pulse rounded bg-muted" />
          <div className="h-2 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      )}

      {!match && !loading && profilPret && offrePrete && !erreur && (
        <p className="mt-3 text-sm text-muted-foreground">
          Aucune analyse pour le moment. Lancez l'analyse pour savoir si cette
          offre correspond à votre profil.
        </p>
      )}

      {match && niveau && (
        <div className="mt-4 space-y-5">
          {obsolete && (
            <p className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
              <AlertTriangle className="size-4 shrink-0" />
              Votre profil ou l'offre a été modifié depuis la dernière analyse.
            </p>
          )}

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <div className="text-4xl font-semibold text-primary">
                {match.global}
                <span className="text-lg text-muted-foreground"> / 100</span>
              </div>
              <span
                className={cn(
                  "mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                  niveau.badge,
                )}
              >
                {niveau.label}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {typeof match.confiance === "number" && (
                <p>Confiance de l'analyse : {match.confiance}%</p>
              )}
              {match.confianceRaison && <p>{match.confianceRaison}</p>}
              {match.genereLe && (
                <p>
                  Analysé le{" "}
                  {new Date(match.genereLe).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>

          {match.details?.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {match.details.map((d, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{d.critere}</span>
                    <span className="text-muted-foreground">{d.score} %</span>
                  </div>
                  <Progress value={d.score} className="mt-1.5 h-1.5" />
                  {d.explication && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {d.explication}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <Liste
            titre="Pourquoi cette offre vous correspond"
            items={match.pointsForts}
            icon={<CheckCircle2 className="size-4 text-primary" />}
            tone="positif"
          />

          <Liste
            titre="Points de vigilance"
            items={match.vigilance}
            icon={<AlertTriangle className="size-4 text-destructive" />}
            tone="vigilance"
          />

          {(match.competences?.correspondances?.length ||
            match.competences?.aRenforcer?.length ||
            match.competences?.nonRenseignees?.length ||
            match.competencesManquantes?.length) && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Compétences à renforcer</h4>
              <Chips
                titre="Correspondances"
                items={match.competences?.correspondances ?? []}
                variant="ok"
              />
              <Chips
                titre="À renforcer"
                items={match.competences?.aRenforcer ?? []}
                variant="muted"
              />
              <Chips
                titre="Non renseignées dans votre profil"
                items={
                  match.competences?.nonRenseignees ??
                  match.competencesManquantes ??
                  []
                }
                variant="warn"
              />
            </div>
          )}

          <div className="rounded-lg border bg-muted/40 p-3">
            <p className="text-sm font-medium">
              Recommandation : {labelRecommandation(match.recommandation)}
            </p>
            {match.explication && (
              <p className="mt-1 text-sm text-muted-foreground">
                {match.explication}
              </p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {MENTION_TRANSPARENCE}
          </p>
        </div>
      )}
    </section>
  );
}
