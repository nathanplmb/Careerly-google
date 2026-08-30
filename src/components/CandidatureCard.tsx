import {
  Bell,
  CalendarClock,
  ExternalLink,
  Loader2,
  MapPin,
  MoreVertical,
  Pencil,
  Send,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MatchBadge } from "@/components/MatchBadge";
import { StatutQuickSelect } from "@/components/StatutQuickSelect";
import { matchObsolete } from "@/lib/matching";
import {
  addDays,
  formatDate,
  todayIso,
  type Candidature,
  type Statut,
} from "@/lib/candidatures";
import type { Profil } from "@/lib/profil";

type Props = {
  c: Candidature;
  index?: number;
  profil: Profil | null;
  analyse?: boolean;
  onStatut: (s: Statut) => void;
  onOuvrir: () => void;
  onPostuler: () => void;
  onRelancer: () => void;
  onAnalyser: () => void;
  onSupprimer: () => void;
};

/** Carte candidature : format compact, lisible sur mobile comme sur desktop. */
export function CandidatureCard({
  c,
  index = 0,
  profil,
  analyse,
  onStatut,
  onOuvrir,
  onPostuler,
  onRelancer,
  onAnalyser,
  onSupprimer,
}: Props) {
  const today = todayIso();
  const limiteDepassee = !!c.dateLimite && c.dateLimite < today;
  const limiteProche =
    !!c.dateLimite && !limiteDepassee && c.dateLimite <= addDays(today, 7);
  const relanceDue =
    !!c.dateRelance && c.dateRelance <= today && c.statut === "J'ai postulé";

  return (
    <article
      className="glass-card pop-in flex min-w-0 flex-col gap-3 p-4 transition-colors hover:border-primary/40"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <header className="flex min-w-0 items-start gap-2">
        <button
          type="button"
          onClick={onOuvrir}
          className="min-w-0 flex-1 text-left"
          aria-label={`Ouvrir ${c.entreprise}`}
        >
          <p className="truncate text-[15px] font-bold leading-tight">
            {c.entreprise || "Sans entreprise"}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[13px] text-muted-foreground">
            {c.poste || "Poste non précisé"}
          </p>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Plus d'actions">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onSelect={onOuvrir}>
              <Pencil className="size-4" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onPostuler}>
              <Send className="size-4" /> Marquer postulé (relance J+10)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onRelancer}>
              <Bell className="size-4" /> Marquer relancé
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onAnalyser}>
              <Sparkles className="size-4" /> Analyser avec l'IA
            </DropdownMenuItem>
            {c.lien ? (
              <DropdownMenuItem asChild>
                <a href={c.lien} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" /> Voir l'offre
                </a>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={onSupprimer}
              className="text-destructive"
            >
              <Trash2 className="size-4" /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <StatutQuickSelect statut={c.statut} onChange={onStatut} />
        {analyse ? (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" /> Analyse…
          </span>
        ) : c.match ? (
          <button
            type="button"
            onClick={onAnalyser}
            title="Ré-analyser avec l'IA"
          >
            <MatchBadge match={c.match} obsolete={matchObsolete(c, profil)} />
          </button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAnalyser}
            className="h-7 text-xs"
          >
            <Sparkles className="size-3.5" /> Analyser
          </Button>
        )}
      </div>

      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
        {c.lieu ? (
          <li className="inline-flex min-w-0 items-center gap-1">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{c.lieu}</span>
          </li>
        ) : null}
        {c.contact ? (
          <li className="inline-flex min-w-0 items-center gap-1">
            <User className="size-3.5 shrink-0" />
            <span className="truncate">{c.contact}</span>
          </li>
        ) : null}
        {c.dateEnvoi ? <li>Envoyée le {formatDate(c.dateEnvoi)}</li> : null}
      </ul>

      {(c.dateLimite || relanceDue) && (
        <div className="flex flex-wrap gap-2">
          {c.dateLimite ? (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                limiteDepassee
                  ? "bg-destructive/15 text-destructive"
                  : limiteProche
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              <CalendarClock className="size-3.5" />
              {limiteDepassee ? "Expirée le " : "Limite "}
              {formatDate(c.dateLimite)}
            </span>
          ) : null}
          {relanceDue ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] px-2 py-1 text-[11px] font-semibold text-[var(--warning)]">
              <Bell className="size-3.5" /> Relance à faire
            </span>
          ) : null}
        </div>
      )}

      <div className="mt-auto flex gap-2 pt-1">
        <Button
          size="sm"
          variant="secondary"
          className="flex-1"
          onClick={onPostuler}
        >
          <Send className="size-3.5" /> Postulé
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="flex-1"
          onClick={onRelancer}
        >
          <Bell className="size-3.5" /> Relancé
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onOuvrir}
          aria-label="Modifier"
        >
          <Pencil className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}
