import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  CalendarClock,
  Clock,
  ExternalLink,
  Filter,
  GripVertical,
  Kanban as KanbanIcon,
  Layers,
  List as ListIcon,
  Loader2,
  MapPin,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { CandidatureSheet } from "@/components/CandidatureSheet";
import { StatutBadge } from "@/components/StatutBadge";
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

// Styles d'accents officiels NACORA pour les 4 colonnes du pipeline
const ACCENTS_PANNEAUX: Record<
  string,
  { dot: string; bgBadge: string; textBadge: string; borderHeader: string }
> = {
  Sauvegardée: {
    dot: "#71717a",
    bgBadge: "bg-zinc-500/10",
    textBadge: "text-zinc-400",
    borderHeader: "border-zinc-500/30",
  },
  "À préparer": {
    dot: "#f59e0b",
    bgBadge: "bg-amber-500/10",
    textBadge: "text-amber-400",
    borderHeader: "border-amber-500/30",
  },
  "À étudier": {
    dot: "#3b82f6",
    bgBadge: "bg-blue-500/10",
    textBadge: "text-blue-400",
    borderHeader: "border-blue-500/30",
  },
  "À candidater": {
    dot: "var(--primary)",
    bgBadge: "bg-primary/10",
    textBadge: "text-primary",
    borderHeader: "border-primary/30",
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
          "Tableau de bord pipeline interactif avec vue Kanban et vue Liste.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OpportunitesPage,
});

function OpportunitesPage() {
  const { user, authLoading, items, patch, save, remove, syncing } =
    useCandidatures();
  const profil = useProfil(user);
  const [editing, setEditing] = useState<Candidature | null>(null);
  const [open, setOpen] = useState(false);

  // Modes de vue : "all" (complet) ou "overdue" (retards)
  const [viewMode, setViewMode] = useState<"all" | "overdue">("all");

  // Mode de rendu : "kanban" (défaut) ou "list"
  const [displayLayout, setDisplayLayout] = useState<"kanban" | "list">(
    "kanban",
  );

  // Filtres de recherche & contrat
  const [searchQuery, setSearchQuery] = useState("");
  const [contractFilter, setContractFilter] = useState<string>("all");

  // État Drag & Drop
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // Suppression avec confirmation AlertDialog
  const [candidateToDelete, setCandidateToDelete] =
    useState<Candidature | null>(null);

  const today = todayIso();

  // Candidatures filtrées par recherche et type de contrat
  const filteredItems = useMemo(() => {
    return items.filter((c) => {
      // Filtre texte
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchEnterprise = (c.entreprise || "").toLowerCase().includes(q);
        const matchPoste = (c.poste || "").toLowerCase().includes(q);
        const matchLieu = (c.lieu || "").toLowerCase().includes(q);
        if (!matchEnterprise && !matchPoste && !matchLieu) return false;
      }
      // Filtre contrat
      if (contractFilter !== "all") {
        if (
          (c.contractType || "").toLowerCase() !== contractFilter.toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    });
  }, [items, searchQuery, contractFilter]);

  // Détection des opportunités en retard
  const overdueItems = useMemo(
    () => filteredItems.filter((c) => isDeadlineOverdue(c, today)),
    [filteredItems, today],
  );

  // Types de contrats disponibles pour le filtre
  const availableContractTypes = useMemo(() => {
    const set = new Set<string>();
    items.forEach((c) => {
      if (c.contractType && c.contractType.trim()) {
        set.add(c.contractType.trim());
      }
    });
    return Array.from(set);
  }, [items]);

  // 4 Panneaux du pipeline
  const colonnes = useMemo(() => {
    const sourceItems =
      viewMode === "overdue"
        ? filteredItems.filter((c) => isDeadlineOverdue(c, today))
        : filteredItems;

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
  }, [filteredItems, viewMode, today]);

  // Deadlines à venir dans les 7 jours parmi les opportunités non échues
  const urgentes = useMemo(
    () =>
      filteredItems
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
    [filteredItems, today],
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

  const hasActiveFilters =
    searchQuery !== "" || contractFilter !== "all" || viewMode !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setContractFilter("all");
    setViewMode("all");
  };

  return (
    <AppShell
      title="Vos Opportunités"
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
          className="shadow-sm"
        >
          <Plus className="size-4.5" />
          <span>Nouvelle opportunité</span>
        </Button>
      }
      actions={
        authLoading || syncing ? (
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-card/60 px-3 py-1.5 rounded-xl border border-border/60">
            <Loader2 className="size-4 animate-spin text-primary" />
            <span className="hidden sm:inline">Synchronisation…</span>
          </div>
        ) : null
      }
    >
      <div className="space-y-6">
        {/* BARRE DE FILTRES ET CONTRÔLES DE VUE */}
        <section
          aria-label="Filtres et modes d'affichage"
          className="glass-panel flex flex-col gap-3.5 p-3.5 sm:p-4 shadow-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Recherche & Filtre par contrat */}
            <div className="flex flex-1 flex-wrap items-center gap-2.5 min-w-[260px]">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrer par entreprise, poste, lieu…"
                  className="h-9.5 w-full rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:bg-white/8 focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                />
              </div>

              {availableContractTypes.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Filter className="size-3.5 text-muted-foreground shrink-0 hidden sm:block" />
                  <select
                    value={contractFilter}
                    onChange={(e) => setContractFilter(e.target.value)}
                    className="h-9.5 rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 px-3 text-xs font-normal text-foreground focus:outline-none focus:border-primary/50 backdrop-blur-md cursor-pointer transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                  >
                    <option value="all" className="bg-[#12141C] text-foreground">Tous les contrats</option>
                    {availableContractTypes.map((ct) => (
                      <option key={ct} value={ct} className="bg-[#12141C] text-foreground">
                        {ct}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer transition-all"
                >
                  <RotateCcw className="size-3" /> Réinitialiser
                </button>
              )}
            </div>

            {/* Commutateurs de vue : Filtres statut + Toggle Kanban/Liste */}
            <div className="flex items-center gap-2.5">
              {/* Filtres Rapides (Tout / Retards) - Liquid Glass Segmented Control */}
              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                <button
                  type="button"
                  onClick={() => setViewMode("all")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    viewMode === "all"
                      ? "bg-white/15 dark:bg-white/12 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers className="size-3.5" />
                  Toutes
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      viewMode === "all"
                        ? "bg-white/15 text-foreground"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {filteredItems.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("overdue")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    viewMode === "overdue"
                      ? "bg-destructive text-destructive-foreground font-semibold shadow-[0_2px_10px_rgba(240,68,56,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] border border-destructive/40"
                      : overdueItems.length > 0
                        ? "text-destructive hover:bg-destructive/10"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <AlertCircle className="size-3.5" />
                  Retards
                  {overdueItems.length > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                        viewMode === "overdue"
                          ? "bg-black/25 text-white"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {overdueItems.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Toggle Kanban vs Liste - Liquid Glass Segmented Control */}
              <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                <button
                  type="button"
                  onClick={() => setDisplayLayout("kanban")}
                  title="Vue Kanban"
                  className={`grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer ${
                    displayLayout === "kanban"
                      ? "bg-white/15 dark:bg-white/12 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <KanbanIcon className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayLayout("list")}
                  title="Vue Liste"
                  className={`grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer ${
                    displayLayout === "list"
                      ? "bg-white/15 dark:bg-white/12 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ListIcon className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ALERTE INTELLIGENTE DEADLINES DÉPASSÉES */}
        {viewMode === "all" && overdueItems.length > 0 && (
          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 backdrop-blur-xl p-4 shadow-[0_8px_24px_rgba(240,68,56,0.15)] sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex size-2.5 rounded-full bg-destructive shrink-0 shadow-[0_0_8px_rgba(240,68,56,0.8)]" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  {overdueItems.length} opportunité
                  {overdueItems.length > 1
                    ? "s nécessitent"
                    : " nécessite"}{" "}
                  votre attention
                </p>
                <p className="text-xs text-muted-foreground">
                  La date limite de candidature est dépassée sans envoi
                  enregistré.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("overdue")}
              className="shrink-0 border-destructive/40 text-xs font-semibold text-destructive hover:bg-destructive/20"
            >
              Afficher les retards
            </Button>
          </div>
        )}

        {/* ACCÈS RAPIDE DEADLINES DANS LES 7 JOURS */}
        {viewMode === "all" && urgentes.length > 0 && (
          <div className="glass-panel flex flex-col gap-2.5 p-4 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <CalendarClock className="size-4" />
              Deadlines imminentes (7j)
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {urgentes.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => ouvrir(c)}
                  className="press inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/15 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:bg-primary/25 hover:border-primary/40 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                >
                  <span className="font-bold text-primary">{c.entreprise}</span>
                  <span className="text-muted-foreground/60">•</span>
                  <span className="text-muted-foreground">
                    {formatDate(c.dateLimite || c.applicationDeadline)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MANQUE DE RÉSULTATS APPRÈS FILTRAGE */}
        {filteredItems.length === 0 && (
          <div className="glass-panel flex flex-col items-center justify-center border-dashed p-12 text-center">
            <Building2 className="size-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-base font-bold text-foreground">
              Aucune opportunité trouvée
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mt-1 mb-6">
              Aucune candidature ne correspond à vos critères de recherche
              actuels.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              <RotateCcw className="size-4 mr-2" /> Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* RENDU VUE KANBAN */}
        {filteredItems.length > 0 && displayLayout === "kanban" && (
          <div className="grid grid-cols-1 gap-4.5 md:grid-cols-2 lg:grid-cols-4">
            {colonnes.map(({ statut, liste }) => {
              const isColumnHovered = dragOverColumn === statut;
              const accent = ACCENTS_PANNEAUX[statut] || {
                dot: "var(--primary)",
                bgBadge: "bg-secondary",
                textBadge: "text-foreground",
                borderHeader: "border-border",
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
                    const id =
                      e.dataTransfer.getData("text/plain") || draggedId;
                    if (id) {
                      handleDrop(id, statut);
                    }
                    setDraggedId(null);
                  }}
                  className={`flex min-h-[500px] flex-col rounded-2xl backdrop-blur-2xl transition-all duration-200 shadow-lg ${
                    isColumnHovered
                      ? "bg-white/10 ring-2 ring-primary/40 shadow-[0_0_32px_rgba(216,26,69,0.25)]"
                      : "bg-white/5 dark:bg-card/30 border border-white/10"
                  }`}
                >
                  {/* EN-TÊTE DE LA COLONNE KANBAN */}
                  <header className="flex shrink-0 items-center justify-between px-4 py-3.5 bg-white/5 backdrop-blur-md rounded-t-2xl">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="size-2.5 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        style={{ backgroundColor: accent.dot }}
                      />
                      <h2 className="text-xs font-bold tracking-tight text-foreground uppercase">
                        {statut}
                      </h2>
                    </div>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-slate-300 backdrop-blur-md">
                      {liste.length}
                    </span>
                  </header>

                  {/* CONTENU & CARTES KANBAN */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {liste.length === 0 ? (
                      <div
                        className={`flex h-full min-h-[140px] flex-col items-center justify-center rounded-xl p-4 text-center text-xs transition-all ${
                          isColumnHovered
                            ? "bg-primary/15 text-primary font-medium"
                            : "bg-white/5 text-muted-foreground/60"
                        }`}
                      >
                        {isColumnHovered ? (
                          <span className="font-semibold text-xs">
                            Déposer en « {statut} »
                          </span>
                        ) : viewMode === "overdue" ? (
                          <span>Aucun retard</span>
                        ) : (
                          <span>Aucune opportunité</span>
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
                            className={`group relative rounded-xl border p-3.5 transition-all duration-200 cursor-grab active:cursor-grabbing ${
                              isBeingDragged
                                ? "opacity-35 ring-2 ring-primary border-primary scale-95"
                                : isOverdue
                                  ? "border-destructive/40 bg-destructive/10 hover:border-destructive/70 hover:shadow-[0_8px_24px_rgba(240,68,56,0.25)]"
                                  : "glass-card-interactive shadow-sm hover:border-white/20"
                            }`}
                          >
                            {/* ENTREPRISE & POSTE */}
                            <div className="flex items-start justify-between gap-2">
                              <div
                                onClick={() => ouvrir(c)}
                                className="block min-w-0 flex-1 cursor-pointer"
                              >
                                <p className="truncate text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                                  {c.entreprise || "Entreprise"}
                                </p>
                                <h3 className="truncate text-sm font-semibold text-foreground mt-0.5 tracking-tight">
                                  {c.poste || "Poste sans titre"}
                                </h3>
                              </div>

                              <div className="flex shrink-0 items-center gap-0.5">
                                <span
                                  title="Glisser pour déplacer"
                                  className="cursor-grab p-1 text-muted-foreground/40 hover:text-muted-foreground"
                                >
                                  <GripVertical className="size-3.5" />
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Supprimer ${c.poste}`}
                                  title="Supprimer cette opportunité"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCandidateToDelete(c);
                                  }}
                                  className="rounded-lg p-1 text-muted-foreground/60 transition-all hover:bg-destructive/15 hover:text-destructive focus:opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* BADGES & MÉTADONNÉES */}
                            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                              {isOverdue && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-destructive/35 bg-destructive/15 px-2 py-0.5 text-[10px] font-medium text-destructive backdrop-blur-md">
                                  <AlertCircle className="size-2.5" />
                                  Expirée (
                                  {formatDate(
                                    c.applicationDeadline || c.dateLimite,
                                  )}
                                  )
                                </span>
                              )}

                              {c.contractType && (
                                <span className="rounded-lg bg-white/10 px-2 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-md">
                                  {c.contractType}
                                </span>
                              )}

                              {c.duration && (
                                <span className="rounded-lg bg-white/7 px-2 py-0.5 text-[11px] text-slate-300 backdrop-blur-md">
                                  {c.duration}
                                </span>
                              )}
                            </div>

                            {/* LOCALISATION & DEADLINE */}
                            <div className="mt-3 flex items-center justify-between gap-1.5 text-xs text-muted-foreground border-t border-white/5 pt-2">
                              <div className="flex items-center gap-2 truncate">
                                {c.lieu && (
                                  <span className="inline-flex items-center gap-1 truncate text-[11px]">
                                    <MapPin className="size-3 shrink-0 text-muted-foreground/60" />
                                    {c.lieu}
                                  </span>
                                )}
                                {!isOverdue &&
                                  (c.dateLimite || c.applicationDeadline) && (
                                    <span
                                      className={
                                        (c.dateLimite ||
                                          c.applicationDeadline)! <=
                                        addDays(today, 7)
                                          ? "inline-flex items-center gap-1 font-semibold text-amber-400 text-[11px]"
                                          : "inline-flex items-center gap-1 text-[11px]"
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
                                  className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-primary hover:underline"
                                >
                                  Lien <ExternalLink className="size-2.5" />
                                </a>
                              )}
                            </div>

                            {/* ACTIONS RAPIDES DE STATUT */}
                            <div className="mt-2.5 flex flex-wrap gap-1 border-t border-white/5 pt-2">
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
                                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:text-foreground cursor-pointer"
                                  >
                                    → {s}
                                  </button>
                                ))}
                            </div>
                          </article>
                        );
                      })
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* RENDU VUE LISTE */}
        {filteredItems.length > 0 && displayLayout === "list" && (
          <div className="glass-panel overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold text-muted-foreground backdrop-blur-md">
                    <th className="px-5 py-3.5">Entreprise & Poste</th>
                    <th className="px-5 py-3.5">Étape actuelle</th>
                    <th className="px-5 py-3.5">Contrat & Lieu</th>
                    <th className="px-5 py-3.5">Deadline</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map((c) => {
                    const isOverdue = isDeadlineOverdue(c, today);
                    return (
                      <tr
                        key={c.id}
                        onClick={() => ouvrir(c)}
                        className="group hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <p className="text-xs font-medium text-muted-foreground">
                            {c.entreprise || "Entreprise"}
                          </p>
                          <p className="text-sm font-semibold text-foreground mt-0.5">
                            {c.poste || "Poste sans titre"}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatutBadge statut={c.statut} size="sm" />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{c.contractType || "—"}</span>
                            <span className="text-[11px] text-muted-foreground/70">
                              {c.lieu || "Non spécifié"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          {isOverdue ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive">
                              <AlertCircle className="size-3" />
                              {formatDate(
                                c.applicationDeadline || c.dateLimite,
                              )}
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground font-mono">
                              {formatDate(
                                c.applicationDeadline || c.dateLimite,
                              )}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div
                            className="flex items-center justify-end gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => ouvrir(c)}
                              className="h-8 px-3 text-xs"
                            >
                              Ouvrir
                            </Button>
                            <button
                              type="button"
                              onClick={() => setCandidateToDelete(c)}
                              className="p-1.5 text-muted-foreground/60 hover:text-destructive rounded-lg hover:bg-destructive/15 transition-all cursor-pointer"
                              title="Supprimer"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* DIALOGUE DE CONFIRMATION DE SUPPRESSION */}
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
              {candidateToDelete?.entreprise || "Entreprise inconnue"} » sera
              définitivement supprimée.
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
