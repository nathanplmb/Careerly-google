import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  Pencil,
  RefreshCw,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { todayIso, type Candidature } from "@/lib/candidatures";
import { Button } from "@/components/ui/button";
import type {
  BriefItem,
  DailyBriefData,
  DailyBriefInputData,
  OpportunityInputForBrief,
} from "@/ai/daily-brief/dailyBrief.types";
import { generateDeterministicDailyBrief } from "@/ai/daily-brief/dailyBrief.service";
import { genererDailyBriefServerFn } from "@/ai/daily-brief/dailyBrief.server-fn";

type DailyBriefProps = {
  items: Candidature[];
  userPrenom?: string;
  onOuvrir?: (item: Candidature) => void;
  ready?: boolean;
};

const CACHE_KEY = "nacora_daily_brief_cache_v3";

type CacheEntry = {
  date: string;
  hash: string;
  brief: DailyBriefData;
  timestamp: number;
};

function sanitizeBriefData(raw: unknown): DailyBriefData | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Partial<DailyBriefData>;
  return {
    greeting: typeof b.greeting === "string" ? b.greeting : "Bonjour",
    summary:
      typeof b.summary === "string"
        ? b.summary
        : "Voici ce qui mérite votre attention aujourd'hui.",
    today: Array.isArray(b.today) ? b.today : [],
    watch: Array.isArray(b.watch) ? b.watch : [],
    upcoming: Array.isArray(b.upcoming) ? b.upcoming : [],
    recent: Array.isArray(b.recent) ? b.recent : [],
    generatedAt:
      typeof b.generatedAt === "string"
        ? b.generatedAt
        : new Date().toISOString(),
    isFallback: Boolean(b.isFallback),
  };
}

function computeOpportunitiesHash(
  items: Candidature[],
  currentDate: string,
): string {
  const parts = items
    .filter((c) => !c.archive)
    .map(
      (c) =>
        `${c.id}|${c.statut}|${c.applicationDeadline || c.dateLimite || ""}|${
          c.followUpDate || c.dateRelance || ""
        }|${c.interviewDate || ""}|${c.savedAt || ""}`,
    )
    .sort()
    .join(";");
  return `${currentDate}::${parts}`;
}

function getItemIcon(type: BriefItem["type"]) {
  switch (type) {
    case "deadline":
      return CalendarClock;
    case "relance":
      return Bell;
    case "entretien":
      return UserRound;
    case "preparation":
      return Pencil;
    case "opportunite":
      return Star;
    default:
      return Clock;
  }
}

function getPriorityBadge(priority: BriefItem["priority"]) {
  switch (priority) {
    case "high":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    case "medium":
      return "border-warning/30 bg-warning/10 text-warning";
    case "low":
    default:
      return "border-primary/30 bg-primary/10 text-primary";
  }
}

export function DailyBrief({
  items,
  userPrenom,
  onOuvrir,
  ready = true,
}: DailyBriefProps) {
  const navigate = useNavigate();
  const currentDate = useMemo(() => todayIso(), []);
  const currentHash = useMemo(
    () => computeOpportunitiesHash(items, currentDate),
    [items, currentDate],
  );

  const [brief, setBrief] = useState<DailyBriefData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Protection contre double exécution et gestion des requêtes concurrentes
  const isMountedRef = useRef(true);
  const lastFetchedHashRef = useRef<string | null>(null);
  const activeRequestIdRef = useRef(0);

  // Transformation des candidatures en format input pour l'IA
  const inputData: DailyBriefInputData = useMemo(() => {
    const opps: OpportunityInputForBrief[] = items.map((c) => ({
      id: c.id,
      entreprise: c.entreprise || c.company || c.companyName || "",
      poste: c.poste || c.title || "",
      statut: c.statut || "Sauvegardée",
      lieu: c.lieu || c.location || undefined,
      applicationDeadline: c.applicationDeadline || c.dateLimite || null,
      dateLimite: c.dateLimite || c.applicationDeadline || null,
      appliedAt: c.appliedAt || c.dateEnvoi || null,
      dateEnvoi: c.dateEnvoi || c.appliedAt || null,
      followUpDate: c.followUpDate || c.dateRelance || null,
      dateRelance: c.dateRelance || c.followUpDate || null,
      lastContactDate: c.lastContactDate || c.dateDernierContact || null,
      interviewDate: c.interviewDate || null,
      secondInterviewDate: c.secondInterviewDate || null,
      currentWorkflowStep: c.currentWorkflowStep || null,
      savedAt: c.savedAt || null,
      preparedAt: c.preparedAt || null,
      offerReceivedAt: c.offerReceivedAt || null,
      acceptedAt: c.acceptedAt || null,
      rejectedAt: c.rejectedAt || null,
      notes: c.commentaire || c.personalNotes || null,
      archive: Boolean(c.archive),
    }));

    return {
      userPrenom,
      currentDate,
      opportunities: opps,
    };
  }, [items, userPrenom, currentDate]);

  // Exécution du brief (avec cache local et fallback robuste)
  const executerBrief = async (forcerRecalcul = false) => {
    const requestId = ++activeRequestIdRef.current;
    setLoading(true);
    setErrorMessage(null);

    // 1. Vérification du cache
    if (!forcerRecalcul) {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached: CacheEntry = JSON.parse(raw);
          const sanitizedCached = sanitizeBriefData(cached?.brief);
          if (
            sanitizedCached &&
            cached.date === currentDate &&
            cached.hash === currentHash
          ) {
            setBrief(sanitizedCached);
            setLoading(false);
            lastFetchedHashRef.current = currentHash;
            return;
          } else if (!sanitizedCached) {
            localStorage.removeItem(CACHE_KEY);
          }
        }
      } catch {
        // Ignorer erreur de lecture cache
      }
    }

    try {
      // 2. Appel serveur sécurisé
      const resultat = await genererDailyBriefServerFn({ data: inputData });

      if (isMountedRef.current && requestId === activeRequestIdRef.current) {
        const sanitized = sanitizeBriefData(resultat);
        if (sanitized) {
          setBrief(sanitized);
          lastFetchedHashRef.current = currentHash;
          try {
            const entry: CacheEntry = {
              date: currentDate,
              hash: currentHash,
              brief: sanitized,
              timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
          } catch {
            // LocalStorage plein ou indisponible
          }
        }
      }
    } catch (err: unknown) {
      if (requestId !== activeRequestIdRef.current) {
        // Requête supplantée, ignorer
        return;
      }

      const isAbort =
        err instanceof Error &&
        (err.name === "AbortError" ||
          err.message?.includes("aborted") ||
          err.message?.includes("AbortError"));

      if (isAbort) {
        // Annulation propre, ignorer sans afficher d'erreur alarmante
        return;
      }

      console.warn(
        "[Daily Brief] Erreur lors de l'appel IA, utilisation du repli déterministe :",
        err,
      );
      if (isMountedRef.current) {
        // Repli transparent déterministe basé sur les faits réels
        const repli = sanitizeBriefData(
          generateDeterministicDailyBrief(inputData, true),
        );
        if (repli) {
          setBrief(repli);
        }
        setErrorMessage("Le Brief IA est temporairement indisponible.");
      }
    } finally {
      if (isMountedRef.current && requestId === activeRequestIdRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    // Si les données de candidatures sont encore en cours de chargement initial, attendre
    if (!ready) {
      return;
    }

    // Charger immédiatement le cache si disponible pour éviter tout flash
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached: CacheEntry = JSON.parse(raw);
        const sanitizedCached = sanitizeBriefData(cached?.brief);
        if (
          sanitizedCached &&
          cached.date === currentDate &&
          cached.hash === currentHash
        ) {
          setBrief(sanitizedCached);
          lastFetchedHashRef.current = currentHash;
          return;
        }
      }
    } catch {
      // Ignorer
    }

    // Si le hash a changé ou pas encore chargé, déclencher la génération une seule fois
    if (lastFetchedHashRef.current !== currentHash && !loading) {
      lastFetchedHashRef.current = currentHash;
      executerBrief(false);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [currentHash, currentDate, ready]);

  const handleAction = (item: BriefItem) => {
    if (item.opportunityId) {
      const cand = items.find((c) => c.id === item.opportunityId);
      if (cand && onOuvrir) {
        onOuvrir(cand);
        return;
      }
    }

    if (item.actionType === "view_calendar") {
      navigate({ to: "/calendrier" });
      return;
    }

    // Par défaut vers la page des opportunités
    navigate({ to: "/opportunites" });
  };

  if (!brief && loading) {
    return (
      <section
        id="daily-brief-loading"
        className="mb-8 rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <RefreshCw className="size-5 animate-spin" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Génération de votre Daily Brief...
              </h2>
              <p className="text-xs text-muted-foreground">
                Analyse de vos opportunités, deadlines et entretiens du jour.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!brief) return null;

  const safeToday = Array.isArray(brief.today) ? brief.today : [];
  const safeWatch = Array.isArray(brief.watch) ? brief.watch : [];
  const safeUpcoming = Array.isArray(brief.upcoming) ? brief.upcoming : [];
  const safeRecent = Array.isArray(brief.recent) ? brief.recent : [];

  const aDesActions =
    safeToday.length > 0 ||
    safeWatch.length > 0 ||
    safeUpcoming.length > 0 ||
    safeRecent.length > 0;

  return (
    <section
      id="daily-brief-module"
      className="mb-8 rounded-2xl border border-border/80 bg-card/75 p-5 shadow-sm backdrop-blur-sm sm:p-6"
    >
      {/* En-tête du Brief */}
      <header className="mb-6 flex flex-col justify-between gap-3 border-b border-border/50 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              {brief.greeting}
            </h2>
            {brief.isFallback && (
              <span className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                Mode factuel
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {brief.summary || "Voici ce qui mérite ton attention aujourd'hui."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {errorMessage && (
            <span className="text-xs text-amber-400/90">{errorMessage}</span>
          )}
          <Button
            id="daily-brief-refresh-button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => executerBrief(true)}
            className="h-8 gap-2 rounded-xl text-xs font-medium"
          >
            <RefreshCw
              className={cn("size-3.5", loading && "animate-spin text-primary")}
            />
            {loading ? "Actualisation..." : "Actualiser le Brief"}
          </Button>
        </div>
      </header>

      {/* État "Rien à faire" */}
      {!aDesActions ? (
        <div
          id="daily-brief-empty-state"
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <div className="mb-3 grid size-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            Tout est à jour.
          </h3>
          <p className="mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
            Aucune action urgente aujourd'hui. Vos candidatures et relances sont
            parfaitement en ordre.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* SECTION 1 : À FAIRE AUJOURD'HUI */}
          {safeToday.length > 0 && (
            <div id="daily-brief-section-today">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-md bg-destructive/15 text-destructive">
                  <AlertTriangle className="size-3" />
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  À faire aujourd'hui ({safeToday.length})
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {safeToday.map((item) => {
                  const Icon = getItemIcon(item.type);
                  return (
                    <article
                      key={item.id}
                      className="group relative flex flex-col justify-between rounded-xl border border-border/80 bg-background/60 p-4 transition-all hover:border-primary/40 hover:bg-background/90 hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                            <Icon className="size-3.5 text-primary" />
                            <span className="truncate">{item.company}</span>
                          </span>
                          {item.dateContext && (
                            <span
                              className={cn(
                                "rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-tight",
                                getPriorityBadge(item.priority),
                              )}
                            >
                              {item.dateContext}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 text-sm font-bold leading-snug tracking-tight text-foreground">
                          {item.title}
                        </h4>

                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {item.message}
                        </p>
                      </div>

                      <div className="mt-4 pt-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAction(item)}
                          className="h-7 w-full justify-center gap-1.5 rounded-lg text-xs font-medium"
                        >
                          <Eye className="size-3.5" />
                          {item.actionLabel || "Voir l'opportunité"}
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 2 : À SURVEILLER */}
          {safeWatch.length > 0 && (
            <div id="daily-brief-section-watch">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-md bg-warning/15 text-warning">
                  <Clock className="size-3" />
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  À surveiller ({safeWatch.length})
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {safeWatch.map((item) => {
                  const Icon = getItemIcon(item.type);
                  return (
                    <article
                      key={item.id}
                      className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-background/50 p-4 transition-all hover:border-warning/40 hover:bg-background/80"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                            <Icon className="size-3.5 text-warning" />
                            <span className="truncate">{item.company}</span>
                          </span>
                          {item.dateContext && (
                            <span className="rounded-md border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-bold text-warning">
                              {item.dateContext}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
                          {item.title}
                        </h4>

                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {item.message}
                        </p>
                      </div>

                      <div className="mt-4 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(item)}
                          className="h-7 w-full justify-center gap-1.5 rounded-lg text-xs font-medium"
                        >
                          <Eye className="size-3.5" />
                          {item.actionLabel || "Voir l'opportunité"}
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3 : À VENIR */}
          {safeUpcoming.length > 0 && (
            <div id="daily-brief-section-upcoming">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-md bg-success/15 text-success">
                  <CalendarDays className="size-3" />
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  À venir ({safeUpcoming.length})
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {safeUpcoming.map((item) => {
                  const Icon = getItemIcon(item.type);
                  return (
                    <article
                      key={item.id}
                      className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-background/50 p-4 transition-all hover:border-success/40 hover:bg-background/80"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                            <Icon className="size-3.5 text-success" />
                            <span className="truncate">{item.company}</span>
                          </span>
                          {item.dateContext && (
                            <span className="rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                              {item.dateContext}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
                          {item.title}
                        </h4>

                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {item.message}
                        </p>
                      </div>

                      <div className="mt-4 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction(item)}
                          className="h-7 w-full justify-center gap-1.5 rounded-lg text-xs font-medium"
                        >
                          <CalendarDays className="size-3.5" />
                          {item.actionLabel || "Voir le calendrier"}
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4 : ACTIVITÉ RÉCENTE */}
          {safeRecent.length > 0 && (
            <div id="daily-brief-section-recent">
              <div className="mb-3 flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-md bg-primary/15 text-primary">
                  <Sparkles className="size-3" />
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Activité récente ({safeRecent.length})
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {safeRecent.map((item) => {
                  const Icon = getItemIcon(item.type);
                  return (
                    <article
                      key={item.id}
                      className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-background/40 p-4 transition-all hover:border-primary/40 hover:bg-background/70"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                            <Icon className="size-3.5 text-primary" />
                            <span className="truncate">{item.company}</span>
                          </span>
                          {item.dateContext && (
                            <span className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {item.dateContext}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
                          {item.title}
                        </h4>

                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {item.message}
                        </p>
                      </div>

                      <div className="mt-4 pt-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction(item)}
                          className="h-7 w-full justify-center gap-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="size-3.5" />
                          {item.actionLabel || "Voir l'opportunité"}
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
