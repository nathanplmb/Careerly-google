import { useState } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Plus,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getNextBestAction, type Candidature } from "@/lib/candidatures";

interface OpportunitySelectorProps {
  items: Candidature[];
  selectedId?: string | null;
  onSelect: (candidature: Candidature) => void;
  onCreateNew: () => void;
  title?: string;
  subtitle?: string;
}

export function OpportunitySelector({
  items,
  selectedId,
  onSelect,
  onCreateNew,
  title = "Sur quelle opportunité voulez-vous travailler ?",
  subtitle = "Sélectionnez une opportunité enregistrée pour charger automatiquement l'offre et votre profil sans aucune saisie.",
}: OpportunitySelectorProps) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      item.entreprise.toLowerCase().includes(q) ||
      item.poste.toLowerCase().includes(q) ||
      item.lieu.toLowerCase().includes(q) ||
      item.statut.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 rounded-3xl border border-primary/20 bg-card/60 p-5 sm:p-6 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-xl bg-primary/15 text-primary">
              <Target className="size-4" />
            </div>
            <h3 className="text-base font-bold text-foreground">{title}</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>

        <Button
          onClick={onCreateNew}
          size="sm"
          className="gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md"
        >
          <Plus className="size-3.5" />
          <span>Nouvelle opportunité</span>
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par entreprise, poste, lieu ou statut..."
          className="h-10 rounded-2xl border-border/60 bg-background/50 pl-10 text-xs text-foreground placeholder:text-muted-foreground/70"
        />
      </div>

      {/* Liste des opportunités */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 p-8 text-center">
          <Building2 className="size-8 text-muted-foreground/40" />
          <p className="mt-2 text-sm font-semibold text-foreground">
            {search
              ? "Aucune opportunité trouvée"
              : "Aucune opportunité enregistrée"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {search
              ? "Essayez une autre recherche ou créez une nouvelle opportunité."
              : "Ajoutez votre première opportunité pour utiliser toutes les capacités de NACORA AI."}
          </p>
          <Button
            onClick={onCreateNew}
            variant="outline"
            size="sm"
            className="mt-4 gap-1.5 rounded-xl text-xs"
          >
            <Plus className="size-3.5" />
            <span>Ajouter une opportunité</span>
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((item) => {
            const isSelected = item.id === selectedId;
            const nba = getNextBestAction(item);
            const matchScore = item.match?.global;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 ring-2 ring-primary/40 shadow-md"
                    : "border-border/60 bg-background/40 hover:border-primary/40 hover:bg-card/80"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-muted/60 text-foreground font-bold text-xs">
                        {item.entreprise.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {item.entreprise}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                          {item.poste}
                        </p>
                      </div>
                    </div>

                    {matchScore !== undefined && (
                      <Badge
                        variant="outline"
                        className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[11px] font-bold shrink-0"
                      >
                        <Sparkles className="mr-1 size-3" />
                        Match {matchScore}%
                      </Badge>
                    )}
                  </div>

                  {/* Actions & statut */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-normal"
                    >
                      {item.statut}
                    </Badge>
                    {item.dateLimite && (
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="size-3" />
                        J-{item.dateLimite}
                      </span>
                    )}
                  </div>
                </div>

                {/* Prochaine Meilleure Action */}
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    <span>{nba.label}</span>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
