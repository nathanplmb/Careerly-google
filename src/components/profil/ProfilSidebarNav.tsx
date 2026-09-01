import { useMemo } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Circle,
  Sparkles,
  TrendingUp,
  FileText,
  Search,
  Layers,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { BilanCompletude } from "@/lib/profil-completion";
import {
  PROFIL_SECTION_GROUPS,
  type ProfilSectionId,
} from "./profil-sections-data";

type Props = {
  activeTab: ProfilSectionId;
  onSelectTab: (tabId: ProfilSectionId) => void;
  bilan: BilanCompletude;
  viewMode: "focus" | "tout_en_un";
  onToggleViewMode: (mode: "focus" | "tout_en_un") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCvModal: () => void;
  onOpenSummaryIaModal: () => void;
  onOpenOptimizerModal: () => void;
};

export function ProfilSidebarNav({
  activeTab,
  onSelectTab,
  bilan,
  viewMode,
  onToggleViewMode,
  searchQuery,
  onSearchChange,
  onOpenCvModal,
  onOpenSummaryIaModal,
  onOpenOptimizerModal,
}: Props) {
  // Map rapide des catégories pour statut et points
  const catStatusMap = useMemo(() => {
    const map = new Map<
      string,
      { statut: string; gain: number; points: number; maxPoints: number }
    >();
    bilan.categories.forEach((cat) => {
      map.set(cat.tab, {
        statut: cat.statut,
        gain: cat.maxPoints - cat.points,
        points: cat.points,
        maxPoints: cat.maxPoints,
      });
    });
    return map;
  }, [bilan]);

  // Filtrage selon recherche
  const q = searchQuery.toLowerCase().trim();
  const filteredGroups = useMemo(() => {
    if (!q) return PROFIL_SECTION_GROUPS;
    return PROFIL_SECTION_GROUPS.map((group) => ({
      ...group,
      sections: group.sections.filter(
        (sec) =>
          sec.titre.toLowerCase().includes(q) ||
          sec.description.toLowerCase().includes(q) ||
          sec.keywords.some((kw) => kw.includes(q)),
      ),
    })).filter((group) => group.sections.length > 0);
  }, [q]);

  return (
    <div className="space-y-4">
      {/* 1. Carte Score Rapide & Actions IA */}
      <div className="rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm p-4 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-xs">
              ✨
            </span>
            <div>
              <span className="text-xs font-bold text-foreground block">
                Complétude Profil
              </span>
              <span className="text-[11px] text-muted-foreground">
                {bilan.nbComplets}/{bilan.nbTotal} rubriques
              </span>
            </div>
          </div>
          <span className="text-sm font-black text-purple-400">
            {bilan.score}%
          </span>
        </div>

        <Progress value={bilan.score} className="h-2 bg-secondary" />

        {/* Boutons d'action IA compacts */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenSummaryIaModal}
            className="text-[11px] h-8 px-2 border-purple-500/30 hover:bg-purple-500/10 text-purple-300 gap-1.5 font-medium justify-center"
          >
            <Sparkles className="size-3 shrink-0" />
            Synthèse IA
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenOptimizerModal}
            className="text-[11px] h-8 px-2 border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 gap-1.5 font-medium justify-center"
          >
            <TrendingUp className="size-3 shrink-0" />
            Optimiser
          </Button>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={onOpenCvModal}
          className="w-full text-xs h-8 gap-1.5 bg-secondary/80 hover:bg-secondary text-secondary-foreground font-medium justify-center"
        >
          <FileText className="size-3.5 text-purple-400" />
          Remplir via Scan CV (IA)
        </Button>
      </div>

      {/* 2. Barre de Recherche et Toggle de Mode */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Rechercher une rubrique (ex: salaire, anglais)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-3 text-xs h-9 bg-card/60 border-border/60 placeholder:text-muted-foreground/70"
          />
        </div>

        {/* Switcher Mode Focus vs Mode Tout-en-un */}
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-1">
          <button
            type="button"
            onClick={() => onToggleViewMode("focus")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all ${
              viewMode === "focus"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="size-3.5" />
            Par Section
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode("tout_en_un")}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all ${
              viewMode === "tout_en_un"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="size-3.5" />
            Tout Dérouler
          </button>
        </div>
      </div>

      {/* 3. Liste des Rubriques groupées */}
      <div className="space-y-4">
        {filteredGroups.map((group) => (
          <div key={group.id} className="space-y-1.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2">
              {group.titre}
            </h4>

            <div className="space-y-1">
              {group.sections.map((section) => {
                const Icone = section.icone;
                const isActive = activeTab === section.id;
                const statusInfo = catStatusMap.get(section.id);
                const isComplet = statusInfo?.statut === "complet";
                const isAmeliorer = statusInfo?.statut === "a_ameliorer";

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => onSelectTab(section.id)}
                    className={`w-full flex items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-left transition-all ${
                      isActive
                        ? "bg-purple-600/15 border border-purple-500/40 text-foreground font-medium shadow-xs"
                        : "hover:bg-card/70 border border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-lg border text-xs ${section.color}`}
                      >
                        <Icone className="size-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`text-xs block truncate ${
                            isActive
                              ? "font-semibold text-foreground"
                              : "text-foreground/90 font-medium"
                          }`}
                        >
                          {section.titre}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate block">
                          {section.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isComplet ? (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-1.5 py-0.5">
                          <CheckCircle2 className="size-3" />
                          <span className="hidden xl:inline">Rempli</span>
                        </span>
                      ) : isAmeliorer ? (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-md px-1.5 py-0.5">
                          <AlertCircle className="size-3 text-amber-400" />
                          <span className="hidden xl:inline">
                            +{statusInfo?.gain} pts
                          </span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground/70 bg-muted/30 border border-border/40 rounded-md px-1.5 py-0.5">
                          <Circle className="size-2 text-muted-foreground/40" />
                          <span className="hidden xl:inline">À remplir</span>
                        </span>
                      )}
                      <ChevronRight
                        className={`size-3.5 transition-transform ${
                          isActive
                            ? "text-purple-400 translate-x-0.5"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
