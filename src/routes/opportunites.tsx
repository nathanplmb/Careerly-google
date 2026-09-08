import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarClock,
  Clock,
  ExternalLink,
  GripVertical,
  Layers,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCandidatures } from "@/hooks/useCandidatures";
import { useProfil } from "@/hooks/useProfil";
import {
  addDays,
  emptyCandidature,
  formatDate,
  isDeadlineOverdue,
  STATUTS_OPPORTUNITE,
  todayIso,
  type Candidature,
  type Statut,
} from "@/lib/candidatures";
import {
  statutToWorkflowStepKey,
  transitionWorkflowStep,
} from "@/lib/workflow";

// Accents subtils et distinctifs pour chaque statut du pipeline
const ACCENTS_PANNEAUX: Record<string, { dot: string; border: string }> = {
  Sauvegardée: {
    dot: "oklch(0.68 0.18 290)", // Lilas / Violet Careerly
    border: "color-mix(in oklab, oklch(0.68 0.18 290) 25%, var(--border))",
  },
  "À préparer": {
    dot: "oklch(0.70 0.16 230)", // Bleu indigo
    border: "color-mix(in oklab, oklch(0.70 0.16 230) 25%, var(--border))",
  },
  "À étudier": {
    dot: "oklch(0.75 0.15 65)", // Ambre chaud
    border: "color-mix(in oklab, oklch(0.75 0.15 65) 25%, var(--border))",
  },
  "À candidater": {
    dot: "oklch(0.72 0.17 150)", // Émeraude doux
    border: "color-mix(in oklab, oklch(0.72 0.17 150) 25%, var(--border))",
  },
};

export const Route = createFileRoute("/opportunites")({
  head: () => ({
    meta: [
      { title: "Opportunités — NACORA" },
      {
        name: "description",
        content:
          "Votre pipeline d'opportunités en 4 espaces : sauvegardées, à préparer, à étudier et à candidater.",
      },
      { property: "og:title", content: "Opportunités — NACORA" },
      {
        property: "og:description",
        content:
          "Tableau de bord pipeline en 4 panneaux avec glisser-déposer et alertes de deadlines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OpportunitesPage,
});

function OpportunitesPage() {
  const { user, authLoading, items, patch, save, remove } = useCandidatures();
  const profil = useProfil(user);
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);

  // Filtre de vue : "all" (Kanban complet) ou "overdue" (Deadlines dépassées uniquement)
  const [viewMode, setViewMode] = useState<"all" | "overdue">("all");

  // État Drag & Drop
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Suppression avec confirmation AlertDialog
  const [candidateToDelete, setCandidateToDelete] =
    useState<Candidature | null>(null);

  const today = todayIso();

  // Détection des opportunités en retard (état calculé sans altérer les modèles)
  const overdueItems = useMemo(
    () => items.filter((c) => isDeadlineOverdue(c, today)),
    [items, today],
  );

  // 4 Panneaux du pipeline
  const colonnes = useMemo(() => {
    const sourceItems =
      viewMode === "overdue"
        ? items.filter((c) => isDeadlineOverdue(c, today))
        : items;

    return STATUTS_OPPORTUNITE.map((s) => ({
      statut: s,
      liste: sourceItems.filter((c) => {
        if (c.statut === s || c.currentStage === s) return true;
        if (s === "Sauvegardée" && c.currentWorkflowStep === "saved")
          return true;
        if (s === "À préparer" && c.currentWorkflowStep === "to_prepare")
          return true;
        return false;
      }),
    }));
  }, [items, viewMode, today]);

  // Deadlines à venir dans les 7 jours parmi les opportunités non échues
  const urgentes = useMemo(
    () =>
      items
        .filter(
          (c) =>
            (c.dateLimite || c.applicationDeadline) &&
            (c.dateLimite || c.applicationDeadline)! >= today &&
            (c.dateLimite || c.applicationDeadline)! <= addDays(today, 7),
        )
        .sort((a, b) =>
          (a.dateLimite || a.applicationDeadline || "").localeCompare(
            b.dateLimite || b.applicationDeadline || "",
          ),
        ),
    [items, today],
  );

  const ouvrir = (c: Candidature) => {
    setEditing(c);
    setOpen(true);
  };

  // Déplacement d'opportunité via Drag & Drop ou action directe
  const handleMoveToStatut = (
    targetItem: Candidature,
    targetStatut: Statut,
  ) => {
    if (
      targetItem.statut === targetStatut &&
      targetItem.currentStage === targetStatut
    ) {
      return;
    }

    const targetStepKey = statutToWorkflowStepKey(targetStatut);
    const patchData = transitionWorkflowStep(targetItem, targetStepKey);

    patch(targetItem.id, patchData);
    toast.success(`Opportunité déplacée vers « ${targetStatut} »`);
  };

  const handleDrop = (candidatureId: string, targetStatut: Statut) => {
    const targetItem = items.find((c) => c.id === candidatureId);
    if (!targetItem) return;
    handleMoveToStatut(targetItem, targetStatut);
  };

  const handleConfirmDelete = () => {
    if (!candidateToDelete) return;
    const id = candidateToDelete.id;
    const label =
      candidateToDelete.poste ||
      candidateToDelete.entreprise ||
      "l'opportunité";
    remove(id);
    setCandidateToDelete(null);
    if (editing?.id === id) {
      setOpen(false);
      setEditing(null);
    }
    toast.success(`« ${label} » a été supprimée.`);
  };

  return (
    <AppShell
      eyebrow="Pipeline"
      title="Opportunités"
      subtitle="Visualisez et organisez votre pipeline en 4 espaces de travail"
      onAdd={() => {
        setEditing(emptyCandidature());
        setOpen(true);
      }}
      headerExtra={
        <Button
          onClick={() => {
            setEditing(emptyCandidature());
            setOpen(true);
          }}
          className="shadow-xs"
        >
          <Plus className="size-4" />
          <span>Ajouter une opportunité</span>
        </Button>
      }
      actions={
        authLoading ? (
          <Loader2 className="size-5 animate-spin opacity-70" />
        ) : null
      }
    >
      <div className="space-y-4">
        {/* NIVEAU 2 : CONTRÔLES & FILTRES DE VUE */}
        <section
          aria-label="Contrôles du pipeline"
          className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3"
        >
          <div className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/60 p-1">
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                viewMode === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
              }`}
            >
              <Layers className="size-3.5" />
              Toutes les colonnes
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  viewMode === "all"
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {items.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("overdue")}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                viewMode === "overdue"
                  ? "bg-rose-600 text-white shadow-xs"
                  : overdueItems.length > 0
                    ? "text-rose-500 hover:bg-rose-500/10 dark:text-rose-400"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
              }`}
            >
              <AlertCircle className="size-3.5" />
              Deadlines dépassées
              {overdueItems.length > 0 && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    viewMode === "overdue"
                      ? "bg-white/25 text-white"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {overdueItems.length}
                </span>
              )}
            </button>
          </div>

          {viewMode === "overdue" && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">
                Affichage filtré : opportunités expirées non envoyées
              </span>
              <button
                type="button"
                onClick={() => setViewMode("all")}
                className="font-semibold text-primary hover:underline"
              >
                Tout réafficher
              </button>
            </div>
          )}
        </section>

        {/* NIVEAU 3A : ALERTE INTELLIGENTE SUBTILE (DEADLINES DÉPASSÉES) */}
        {viewMode === "all" && overdueItems.length > 0 && (
          <div className="pop-in flex flex-col justify-between gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/[0.04] p-3 shadow-xs sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex size-2 rounded-full bg-rose-500 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {overdueItems.length} opportunité
                  {overdueItems.length > 1 ? "s" : ""} nécessite
                  {overdueItems.length > 1 ? "nt" : ""} votre attention
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {overdueItems.length > 1
                    ? "Plusieurs dates limites de candidature sont dépassées sans envoi."
                    : "Une date limite de candidature est dépassée sans envoi enregistré."}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("overdue")}
              className="h-7 shrink-0 self-start border-rose-500/30 text-xs font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 sm:self-auto"
            >
              Voir les retards
            </Button>
          </div>
        )}

        {/* NIVEAU 3B : MODULE COMPACT DE SYNTHÈSE (DEADLINES DANS LES 7 JOURS) */}
        {viewMode === "all" && urgentes.length > 0 && (
          <div className="pop-in flex flex-col gap-2 rounded-xl border border-border/60 bg-card/40 px-3.5 py-2.5 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <CalendarClock className="size-3.5 text-primary" />
              Deadlines dans les 7 jours
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {urgentes.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => ouvrir(c)}
                  className="press inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-foreground transition-colors hover:bg-primary/20"
                >
                  <span className="font-semibold text-primary">
                    {c.entreprise}
                  </span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-muted-foreground">
                    {formatDate(c.dateLimite || c.applicationDeadline)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NIVEAU 4 : LES 4 GRANDS PANNEAUX (GRILLE 2 × 2 SUR DESKTOP / TABLETTE) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5">
          {colonnes.map(({ statut, liste }, i) => {
            const isColumnHovered = dragOverColumn === statut;
            const accent = ACCENTS_PANNEAUX[statut] || {
              dot: "var(--primary)",
              border: "var(--border)",
            };

            return (
              <section
                key={statut}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                  if (dragOverColumn !== statut) {
                    setDragOverColumn(statut);
                  }
                }}
                onDragLeave={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDragOverColumn(null);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverColumn(null);
                  const id = e.dataTransfer.getData("text/plain") || draggedId;
                  if (id) {
                    handleDrop(id, statut);
                  }
                  setDraggedId(null);
                }}
                className={`pop-in flex h-[480px] flex-col rounded-2xl border transition-all duration-200 lg:h-[520px] ${
                  isColumnHovered
                    ? "border-primary/60 bg-primary/[0.03] ring-2 ring-primary/40 shadow-md"
                    : "border-border/60 bg-card/45 shadow-xs hover:border-border/80"
                }`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* EN-TÊTE DU PANNEAU (HAUTEUR ET PADDING PARFAITEMENT ALIGNÉS) */}
                <header className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-2.5 shrink-0 rounded-full shadow-xs"
                      style={{ backgroundColor: accent.dot }}
                    />
                    <h2 className="text-sm font-bold tracking-tight text-foreground">
                      {statut}
                    </h2>
                  </div>
                  <span className="rounded-full bg-muted/60 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    {liste.length}
                  </span>
                </header>

                {/* ZONE DE CONTENU / CARTES AVEC DÉFILEMENT INTERNE ÉQUILIBRÉ */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
                  {liste.length === 0 ? (
                    <div
                      className={`flex h-full min-h-[160px] flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center text-xs transition-colors ${
                        isColumnHovered
                          ? "border-primary/50 bg-primary/5 text-primary"
                          : "border-border/50 text-muted-foreground"
                      }`}
                    >
                      {isColumnHovered ? (
                        <span className="font-semibold">
                          Déposer ici pour passer en « {statut} »
                        </span>
                      ) : viewMode === "overdue" ? (
                        <span>Aucune deadline dépassée dans ce panneau.</span>
                      ) : (
                        <span>Aucune opportunité dans ce panneau.</span>
                      )}
                    </div>
                  ) : (
                    liste.map((c) => {
                      const isOverdue = isDeadlineOverdue(c, today);
                      const isBeingDragged = draggedId === c.id;

                      return (
                        <article
                          key={c.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", c.id);
                            e.dataTransfer.effectAllowed = "move";
                            setDraggedId(c.id);
                          }}
                          onDragEnd={() => {
                            setDraggedId(null);
                            setDragOverColumn(null);
                          }}
                          className={`group relative rounded-xl border p-3 transition-all duration-150 cursor-grab active:cursor-grabbing ${
                            isBeingDragged
                              ? "opacity-40 ring-2 ring-primary border-primary scale-[0.98]"
                              : isOverdue
                                ? "border-rose-500/40 bg-card/90 hover:border-rose-500 shadow-xs"
                                : "border-border/60 bg-card/75 hover:bg-card hover:border-border hover:shadow-xs"
                          }`}
                        >
                          {/* 1. ENTREPRISE & 2. POSTE */}
                          <div className="flex items-start justify-between gap-2">
                            <div
                              onClick={() => ouvrir(c)}
                              className="block min-w-0 flex-1 cursor-pointer"
                            >
                              <h3 className="truncate text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                                {c.entreprise || "Entreprise inconnue"}
                              </h3>
                              <p className="truncate text-[13.5px] font-semibold text-foreground">
                                {c.poste || "Poste sans titre"}
                              </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-0.5">
                              <span
                                title="Glisser pour déplacer"
                                className="cursor-grab p-1 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/70"
                              >
                                <GripVertical className="size-3.5" />
                              </span>
                              <button
                                type="button"
                                aria-label={`Supprimer l'opportunité ${c.poste}`}
                                title="Supprimer cette opportunité"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCandidateToDelete(c);
                                }}
                                className="rounded-md p-1 text-muted-foreground opacity-70 transition-all hover:bg-destructive/10 hover:text-destructive focus:opacity-100 sm:opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* 3. BADGES : TYPE DE CONTRAT, DURÉE, MÉTRIQUES, DEADLINE DÉPASSÉE */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {isOverdue && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                                <AlertCircle className="size-3" />
                                Deadline dépassée (
                                {formatDate(
                                  c.applicationDeadline || c.dateLimite,
                                )}
                                )
                              </span>
                            )}

                            {c.contractType && (
                              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10.5px] font-medium text-primary">
                                {c.contractType}
                              </span>
                            )}

                            {c.duration && (
                              <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10.5px] text-muted-foreground">
                                {c.duration}
                              </span>
                            )}

                            {Array.isArray(c.companyMetrics) &&
                              c.companyMetrics.length > 0 && (
                                <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400">
                                  {c.companyMetrics.length} métrique
                                  {c.companyMetrics.length > 1 ? "s" : ""}
                                </span>
                              )}
                          </div>

                          {/* 4. LOCALISATION & DEADLINE NON ÉCHUE & 5. LIEN VERS L'OFFRE */}
                          <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                            <div className="flex items-center gap-2 truncate">
                              {c.lieu && (
                                <span className="truncate">{c.lieu}</span>
                              )}
                              {c.lieu &&
                                (c.dateLimite || c.applicationDeadline) && (
                                  <span>•</span>
                                )}
                              {!isOverdue &&
                                (c.dateLimite || c.applicationDeadline) && (
                                  <span
                                    className={
                                      (c.dateLimite ||
                                        c.applicationDeadline)! <=
                                      addDays(today, 7)
                                        ? "inline-flex items-center gap-1 font-medium text-primary"
                                        : "inline-flex items-center gap-1"
                                    }
                                  >
                                    <Clock className="size-3 shrink-0" />
                                    {formatDate(
                                      c.dateLimite || c.applicationDeadline,
                                    )}
                                  </span>
                                )}
                            </div>

                            {c.lien && (
                              <a
                                href={c.lien}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-primary hover:underline"
                              >
                                Offre <ExternalLink className="size-3" />
                              </a>
                            )}
                          </div>

                          {/* ACTIONS RAPIDES DE CHANGEMENT DE STATUT */}
                          <div className="mt-2 flex flex-wrap gap-1 border-t border-border/40 pt-1.5">
                            {STATUTS_OPPORTUNITE.filter((s) => s !== statut)
                              .slice(0, 3)
                              .map((s: Statut) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoveToStatut(c, s);
                                  }}
                                  className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-foreground"
                                >
                                  → {s}
                                </button>
                              ))}
                          </div>
                        </article>
                      );
                    })
                  )}

                  {/* DROP ZONE ACTIVE EN SURVOL */}
                  {isColumnHovered && liste.length > 0 && (
                    <div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 py-2.5 text-center text-xs font-medium text-primary animate-pulse">
                      Déposer ici pour passer en « {statut} »
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* DIALOGUE DE CONFIRMATION DE SUPPRESSION (ALERTDIALOG) */}
      <AlertDialog
        open={Boolean(candidateToDelete)}
        onOpenChange={(openDialog) => {
          if (!openDialog) setCandidateToDelete(null);
        }}
      >
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Supprimer cette opportunité ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Cette action est irréversible. L'opportunité «{" "}
              {candidateToDelete?.poste || "Sans titre"} » chez «{" "}
              {candidateToDelete?.entreprise || "Entreprise inconnue"} » ainsi
              que ses événements associés et notes de suivi seront
              définitivement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* FICHE DÉTAIL DE L'OPPORTUNITÉ (SHEET) */}
      <CandidatureSheet
        open={open}
        onOpenChange={setOpen}
        value={editing}
        profil={profil}
        existingItems={items}
        onOpenExisting={(c) => {
          setEditing(c);
          setOpen(true);
        }}
        onSave={async (c) => {
          await save(c);
          setOpen(false);
        }}
        onDelete={(id) => {
          remove(id);
          setOpen(false);
          setEditing(null);
        }}
      />
    </AppShell>
  );
}
