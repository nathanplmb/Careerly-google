import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, BarChart3, Languages, ListOrdered } from "lucide-react";
import type {
  OpportunityCompanyMetric,
  OpportunityLanguage,
} from "@/ai/opportunity/opportunity.types";

interface TagListEditorProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  badgeClassName?: string;
  emptyText?: string;
}

export function TagListEditor({
  label,
  items,
  onChange,
  placeholder = "Ajouter...",
  badgeClassName = "bg-primary/10 text-primary border-primary/20",
  emptyText = "Non renseigné",
}: TagListEditorProps) {
  const [inputVal, setInputVal] = useState("");

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    if (!items.includes(trimmed)) {
      onChange([...items, trimmed]);
    }
    setInputVal("");
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label} ({items.length})
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-muted/20 border border-border/40">
        {items.length === 0 ? (
          <span className="text-xs text-muted-foreground/60 italic self-center px-1">
            {emptyText}
          </span>
        ) : (
          items.map((item, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className={`text-xs py-1 px-2.5 flex items-center gap-1.5 font-medium transition-all ${badgeClassName}`}
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-muted-foreground hover:text-destructive transition-colors focus:outline-none"
                title="Supprimer"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
          className="h-8 text-xs bg-background"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={!inputVal.trim()}
          className="h-8 px-2.5 text-xs"
        >
          <Plus className="size-3.5 mr-1" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

interface MetricsEditorProps {
  metrics: OpportunityCompanyMetric[];
  onChange: (metrics: OpportunityCompanyMetric[]) => void;
}

export function MetricsEditor({ metrics, onChange }: MetricsEditorProps) {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!label.trim() || !value.trim()) return;
    onChange([...metrics, { label: label.trim(), value: value.trim() }]);
    setLabel("");
    setValue("");
  };

  const handleRemove = (index: number) => {
    onChange(metrics.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <BarChart3 className="size-3.5" />
        <span>Chiffres clés & Métriques ({metrics.length})</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {metrics.length === 0 ? (
          <div className="col-span-full py-3 px-4 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground/60 italic">
            Aucun chiffre clé détecté dans l'offre.
          </div>
        ) : (
          metrics.map((m, idx) => (
            <div
              key={idx}
              className="relative group p-3 rounded-xl border border-border/60 bg-card/60 shadow-xs flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
              >
                <X className="size-3.5" />
              </button>
              <div className="text-base font-bold text-primary truncate pr-4">
                {m.value}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                {m.label}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Métrique (ex: Utilisateurs)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="h-8 text-xs flex-1 bg-background"
        />
        <Input
          placeholder="Valeur (ex: 400 000)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          className="h-8 text-xs w-32 bg-background"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={!label.trim() || !value.trim()}
          className="h-8 px-2.5 text-xs"
        >
          <Plus className="size-3.5 mr-1" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

interface LanguagesEditorProps {
  requiredLanguages: OpportunityLanguage[];
  preferredLanguages: OpportunityLanguage[];
  onChangeRequired: (langs: OpportunityLanguage[]) => void;
  onChangePreferred: (langs: OpportunityLanguage[]) => void;
}

export function LanguagesEditor({
  requiredLanguages,
  preferredLanguages,
  onChangeRequired,
  onChangePreferred,
}: LanguagesEditorProps) {
  const [newLang, setNewLang] = useState("");
  const [newNiveau, setNewNiveau] = useState("");
  const [isObligatoire, setIsObligatoire] = useState(true);

  const handleAdd = () => {
    if (!newLang.trim()) return;
    const item: OpportunityLanguage = {
      langue: newLang.trim(),
      niveau: newNiveau.trim() || undefined,
      obligatoire: isObligatoire,
    };
    if (isObligatoire) {
      onChangeRequired([...requiredLanguages, item]);
    } else {
      onChangePreferred([...preferredLanguages, item]);
    }
    setNewLang("");
    setNewNiveau("");
  };

  const total = requiredLanguages.length + preferredLanguages.length;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Languages className="size-3.5" />
        <span>Langues ({total})</span>
      </div>

      <div className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-muted/20 border border-border/40 min-h-[42px]">
        {total === 0 ? (
          <span className="text-xs text-muted-foreground/60 italic self-center px-1">
            Non renseigné (aucune langue explicitement requise dans l'offre)
          </span>
        ) : (
          <>
            {requiredLanguages.map((l, idx) => (
              <Badge
                key={`req-${idx}`}
                variant="outline"
                className="text-xs py-1 px-2.5 flex items-center gap-1.5 bg-destructive/10 text-destructive border-destructive/30 font-medium"
              >
                <span>{l.langue}</span>
                {l.niveau && (
                  <span className="text-[10px] opacity-80">({l.niveau})</span>
                )}
                <span className="text-[9px] uppercase font-bold tracking-tight bg-destructive/20 px-1 rounded">
                  Requis
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChangeRequired(
                      requiredLanguages.filter((_, i) => i !== idx),
                    )
                  }
                  className="hover:opacity-75 focus:outline-none"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {preferredLanguages.map((l, idx) => (
              <Badge
                key={`pref-${idx}`}
                variant="outline"
                className="text-xs py-1 px-2.5 flex items-center gap-1.5 bg-lilac/10 text-lilac border-lilac/30 font-medium"
              >
                <span>{l.langue}</span>
                {l.niveau && (
                  <span className="text-[10px] opacity-80">({l.niveau})</span>
                )}
                <span className="text-[9px] uppercase font-bold tracking-tight bg-lilac/20 px-1 rounded">
                  Atout
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChangePreferred(
                      preferredLanguages.filter((_, i) => i !== idx),
                    )
                  }
                  className="hover:opacity-75 focus:outline-none"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Langue (ex: Anglais)"
          value={newLang}
          onChange={(e) => setNewLang(e.target.value)}
          className="h-8 text-xs flex-1 bg-background"
        />
        <Input
          placeholder="Niveau (ex: Courant, C1)"
          value={newNiveau}
          onChange={(e) => setNewNiveau(e.target.value)}
          className="h-8 text-xs w-32 bg-background"
        />
        <Button
          type="button"
          size="sm"
          variant={isObligatoire ? "default" : "secondary"}
          onClick={() => setIsObligatoire(!isObligatoire)}
          className="h-8 text-[11px] px-2"
        >
          {isObligatoire ? "Obligatoire" : "Atout"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={!newLang.trim()}
          className="h-8 px-2.5 text-xs"
        >
          <Plus className="size-3.5 mr-1" /> Ajouter
        </Button>
      </div>
    </div>
  );
}

interface ProcessStepsEditorProps {
  steps: string[];
  onChange: (steps: string[]) => void;
}

export function ProcessStepsEditor({
  steps,
  onChange,
}: ProcessStepsEditorProps) {
  const [stepInput, setStepInput] = useState("");

  const handleAdd = () => {
    if (!stepInput.trim()) return;
    onChange([...steps, stepInput.trim()]);
    setStepInput("");
  };

  const handleRemove = (index: number) => {
    onChange(steps.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <ListOrdered className="size-3.5" />
        <span>Étapes du recrutement ({steps.length})</span>
      </div>

      <div className="space-y-1.5">
        {steps.length === 0 ? (
          <div className="py-2.5 px-3 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground/60 italic">
            Non renseigné dans l'offre.
          </div>
        ) : (
          steps.map((st, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 px-3 rounded-lg border border-border/50 bg-card/60 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="size-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-medium">{st}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Nouvelle étape (ex: 3. Entretien avec le Head of Marketing)"
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          className="h-8 text-xs bg-background flex-1"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={!stepInput.trim()}
          className="h-8 px-2.5 text-xs"
        >
          <Plus className="size-3.5 mr-1" /> Ajouter
        </Button>
      </div>
    </div>
  );
}
