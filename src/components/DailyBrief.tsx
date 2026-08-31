import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  Mail,
  Pencil,
  Send,
  Sparkles,
  Star,
  Timer,
  UserRound,
  Wand2,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { texteErreurIA } from "@/lib/ai-erreurs";
import {
  autoDejaTente,
  chargerBriefCache,
  faitsDuJour,
  hashFaits,
  marquerAutoTente,
  sauverBriefCache,
  type ActionBrief,
  type Brief,
  type CategorieBrief,
  type ElementBrief,
} from "@/lib/brief";
import { lancerBrief } from "@/lib/brief-run";
import { getNextBestAction, type Candidature } from "@/lib/candidatures";
import type { Profil } from "@/lib/profil";

type Props = {
  items: Candidature[];
  profil: Profil | null;
  pret: boolean;
  onPostuler: (c: Candidature) => void;
  onRelancer: (c: Candidature) => void;
  onOuvrir: (c: Candidature) => void;
  onAnalyser: (c: Candidature) => void;
};

type Meta = {
  libelle: string;
  icone: typeof Bell;
  coin: typeof Mail;
  tone: string;
};

const META: Record<CategorieBrief, Meta> = {
  urgent: {
    libelle: "Urgent",
    icone: AlertTriangle,
    coin: Timer,
    tone: "var(--destructive)",
  },
  relance: {
    libelle: "Relance",
    icone: Bell,
    coin: Mail,
    tone: "var(--primary)",
  },
  entretien: {
    libelle: "Entretien",
    icone: UserRound,
    coin: CalendarDays,
    tone: "var(--warning)",
  },
  deadline: {
    libelle: "Deadline",
    icone: CalendarClock,
    coin: Timer,
    tone: "var(--success)",
  },
  opportunite: {
    libelle: "Opportunité",
    icone: Sparkles,
    coin: Star,
    tone: "var(--pink)",
  },
  finaliser: {
    libelle: "À finaliser",
    icone: Pencil,
    coin: Pencil,
    tone: "var(--lilac)",
  },
};

const ACTION_META: Record<
  ActionBrief,
  { libelle: string; icone: typeof Bell }
> = {
  relancer: { libelle: "Relancer avec l'IA", icone: Wand2 },
  postuler: { libelle: "Marquer postulé", icone: Send },
  analyser: { libelle: "Voir l'analyse", icone: Sparkles },
  voir_offre: { libelle: "Voir l'offre", icone: ExternalLink },
  ouvrir: { libelle: "Préparer", icone: Pencil },
};

/** Découpe la raison en deux lignes courtes façon maquette. */
function lignes(raison: string) {
  const t = raison.trim();
  if (t.length <= 42) return [t];
  const coupe = t.lastIndexOf(" ", 42);
  const i = coupe > 18 ? coupe : 42;
  return [t.slice(0, i), t.slice(i).trim()];
}

function CartePriorite({
  element,
  index,
  actif,
  onAgir,
}: {
  element: ElementBrief;
  index: number;
  actif: boolean;
  onAgir: () => void;
}) {
  const meta = META[element.categorie];
  const action = ACTION_META[element.action];
  const Icone = meta.icone;
  const Coin = meta.coin;
  const BtnIcone = action.icone;

  return (
    <article
      style={
        {
          "--tone": meta.tone,
          animationDelay: `${index * 70}ms`,
        } as React.CSSProperties
      }
      className={cn(
        "tone-card pop-in flex min-h-[188px] w-[min(80vw,272px)] shrink-0 flex-col p-4 sm:min-h-[212px] sm:w-auto",
        actif &&
          "ring-1 ring-[color-mix(in_oklab,var(--tone)_55%,transparent)]",
      )}
    >
      <header className="flex items-start justify-between gap-2">
        <span className="flex items-center gap-2">
          <span className="tone-chip size-7 shrink-0">
            <Icone className="size-3.5" />
          </span>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: "var(--tone)" }}
          >
            {meta.libelle}
          </span>
        </span>
        <Coin className="size-4 shrink-0 text-muted-foreground/70" />
      </header>

      <h3 className="mt-4 text-[17px] font-bold leading-tight tracking-tight">
        {element.titre}
      </h3>
      <div className="mt-1.5 space-y-0.5 text-[13px] leading-snug text-muted-foreground">
        {lignes(element.raison).map((l) => (
          <p key={l} className="line-clamp-2">
            {l}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={onAgir}
        className="tone-btn mt-auto inline-flex w-fit items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold"
      >
        <BtnIcone className="size-4" />
        {action.libelle}
      </button>
    </article>
  );
}

export function DailyBrief({
  items,
  profil,
  pret,
  onPostuler,
  onRelancer,
  onOuvrir,
  onAnalyser,
}: Props) {
  const [brief, setBrief] = useState<Brief | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const rangee = useRef<HTMLDivElement>(null);

  const faits = useMemo(() => faitsDuJour(items), [items]);
  const hash = useMemo(() => hashFaits(faits), [faits]);
  const [autoFait, setAutoFait] = useState(false);
  const cacheLu = useRef(false);

  // Réutilisation du brief en cache dès que les faits sont identiques : zéro crédit.
  useEffect(() => {
    if (!pret || cacheLu.current) return;
    cacheLu.current = true;
    const cache = chargerBriefCache(hash);
    if (cache) {
      setBrief(cache);
      setAutoFait(true);
    }
  }, [pret, hash]);

  // Génération automatique : une seule fois par jour, jamais à chaque rechargement.
  useEffect(() => {
    if (autoFait || !pret || brief || chargement || faits.length === 0) return;
    if (!cacheLu.current) return;
    setAutoFait(true);
    if (autoDejaTente()) return;
    marquerAutoTente();
    void generer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFait, pret, brief, chargement, faits.length]);

  const generer = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const b = await lancerBrief(items, profil);
      setBrief(b);
      sauverBriefCache(b, hash);
      marquerAutoTente();
      setPage(0);
    } catch (e) {
      setErreur(texteErreurIA(e));
    } finally {
      setChargement(false);
    }
  };

  const navigate = useNavigate();

  const agir = (id: string, action: ActionBrief) => {
    const c = items.find((i) => i.id === id);
    if (!c) return;
    if (action === "voir_offre" && c.lien) {
      window.open(c.lien, "_blank");
      return;
    }
    const nba = getNextBestAction(c);
    void navigate({
      to: "/assistant",
      search: { oppId: c.id, step: nba.step } as Record<string, unknown>,
    });
  };

  const elements = brief?.elements ?? [];
  const pages = Math.max(1, Math.ceil(elements.length / 4));
  const visibles = elements.slice(page * 4, page * 4 + 4);

  const glisser = (sens: -1 | 1) => {
    setPage((p) => (p + sens + pages) % pages);
    rangee.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold tracking-tight">
            Vos priorités
          </h2>
          <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
            {brief
              ? brief.resume
              : faits.length > 0
                ? `${faits.length} point${faits.length > 1 ? "s" : ""} détecté${
                    faits.length > 1 ? "s" : ""
                  } aujourd'hui`
                : "Aucune action urgente aujourd'hui."}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {pages > 1 && (
            <>
              <button
                type="button"
                aria-label="Priorités précédentes"
                onClick={() => glisser(-1)}
                className="press grid size-8 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Priorités suivantes"
                onClick={() => glisser(1)}
                className="press grid size-8 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
          <button
            type="button"
            aria-label={brief ? "Actualiser le brief" : "Générer mon brief"}
            title={brief ? "Actualiser le brief" : "Générer mon brief"}
            onClick={() => void generer()}
            disabled={chargement || !pret || faits.length === 0}
            className="press grid size-8 place-items-center rounded-full border border-primary/40 bg-primary/12 text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
          >
            {chargement ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
          </button>
        </div>
      </div>

      {erreur && (
        <p className="mb-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {erreur}
        </p>
      )}

      {chargement && !brief && (
        <div className="snap-row sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[188px] w-[min(80vw,272px)] shrink-0 animate-pulse rounded-2xl border border-border/50 bg-card/40 sm:h-[212px] sm:w-auto"
            />
          ))}
        </div>
      )}

      {!chargement && !brief && faits.length === 0 && (
        <div className="glass-card flex items-center gap-3 p-5 text-sm text-muted-foreground">
          <span className="tone-chip size-9 shrink-0">
            <Sparkles className="size-4" />
          </span>
          Rien d'urgent aujourd'hui. Ajoutez une candidature pour alimenter
          votre brief.
        </div>
      )}

      {visibles.length > 0 && (
        <div
          ref={rangee}
          className="snap-row sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4"
        >
          {visibles.map((e, i) => (
            <CartePriorite
              key={e.id + e.categorie}
              element={e}
              index={i}
              actif={i === 0}
              onAgir={() => agir(e.id, e.action)}
            />
          ))}
        </div>
      )}

      {pages > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1}`}
              onClick={() => setPage(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === page ? "w-6 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
      )}

      {brief && brief.recommandations.length > 0 && (
        <details className="glass-card mt-3 hidden p-3 sm:block">
          <summary className="cursor-pointer list-none text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground">
            Recommandations ({brief.recommandations.length})
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {brief.recommandations.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </details>
      )}

      {brief?.repli && (
        <p className="mt-2 text-xs text-muted-foreground">
          Brief factuel généré sans IA.
        </p>
      )}
    </section>
  );
}
