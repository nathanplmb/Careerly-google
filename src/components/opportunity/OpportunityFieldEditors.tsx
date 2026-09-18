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
  isEditing?: boolean;
}

export function TagListEditor({
  label,
  items,
  onChange,
  placeholder = "Ajouter...",
  badgeClassName = "bg-primary/10 text-primary border-primary/20",
  emptyText = "Non renseigné",
  isEditing = true,
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
        <label className="text-xs font-bold uppercase tracking-wider text-slate-200">
          {label} ({items.length})
        </label>
      </div>

      <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2.5 rounded-xl bg-[#080A11] border border-slate-800/80">
        {items.length === 0 ? (
          <span className="text-xs text-slate-400 italic self-center px-1">
            {emptyText}
          </span>
        ) : (
          items.map((item, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className={`text-xs py-1 px-2.5 flex items-center gap-1.5 font-medium transition-all ${badgeClassName}`}
            >
              <span className="text-slate-100">{item}</span>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-slate-300 hover:text-rose-400 transition-colors focus:outline-none"
                  title="Supprimer"
                >
                  <X className="size-3" />
                </button>
              )}
            </Badge>
          ))
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2 pt-1">
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
            className="h-8 text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAdd}
            disabled={!inputVal.trim()}
            className="h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            <Plus className="size-3.5 mr-1" /> Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}

interface MetricsEditorProps {
  metrics: OpportunityCompanyMetric[];
  onChange: (metrics: OpportunityCompanyMetric[]) => void;
  isEditing?: boolean;
}

export function MetricsEditor({
  metrics,
  onChange,
  isEditing = true,
}: MetricsEditorProps) {
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
        <BarChart3 className="size-3.5 text-muted-foreground/80" />
        <span>Chiffres clés & Métriques ({metrics.length})</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {metrics.length === 0 ? (
          <div className="col-span-full py-3 px-4 rounded-xl bg-[#080A11] border border-slate-800 text-xs text-slate-400 italic">
            Aucun chiffre clé détecté.
          </div>
        ) : (
          metrics.map((m, idx) => (
            <div
              key={idx}
              className="relative group p-3 rounded-xl border border-slate-800 bg-[#080A11] shadow-xs flex flex-col justify-between"
            >
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 transition-opacity"
                >
                  <X className="size-3.5" />
                </button>
              )}
              <div className="text-base font-bold text-foreground truncate pr-4">
                {m.value}
              </div>
              <div className="text-[11px] text-slate-200 font-medium truncate">
                {m.label}
              </div>
            </div>
          ))
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2 pt-1">
          <Input
            placeholder="Métrique (ex: Chiffre d'affaires)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="h-8 text-xs flex-1 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
          />
          <Input
            placeholder="Valeur (ex: 12M€)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="h-8 text-xs w-32 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAdd}
            disabled={!label.trim() || !value.trim()}
            className="h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            <Plus className="size-3.5 mr-1" /> Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}

interface LanguagesEditorProps {
  requiredLanguages: OpportunityLanguage[];
  preferredLanguages: OpportunityLanguage[];
  onChangeRequired: (langs: OpportunityLanguage[]) => void;
  onChangePreferred: (langs: OpportunityLanguage[]) => void;
  isEditing?: boolean;
}

export function LanguagesEditor({
  requiredLanguages,
  preferredLanguages,
  onChangeRequired,
  onChangePreferred,
  isEditing = true,
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
        <Languages className="size-3.5 text-muted-foreground/80" />
        <span>Langues ({total})</span>
      </div>

      <div className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-[#080A11] border border-slate-800 min-h-[42px]">
        {total === 0 ? (
          <span className="text-xs text-slate-400 italic self-center px-1">
            Non renseigné (aucune langue explicitement requise dans l'offre)
          </span>
        ) : (
          <>
            {requiredLanguages.map((l, idx) => (
              <Badge
                key={`req-${idx}`}
                variant="outline"
                className="text-xs py-1 px-2.5 flex items-center gap-1.5 bg-primary/10 text-foreground border-primary/20 font-semibold"
              >
                <span>{l.langue}</span>
                {l.niveau && (
                  <span className="text-[10px] opacity-90">({l.niveau})</span>
                )}
                <span className="text-[9px] uppercase font-bold tracking-tight bg-rose-500/30 px-1 rounded">
                  Requis
                </span>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      onChangeRequired(
                        requiredLanguages.filter((_, i) => i !== idx),
                      )
                    }
                    className="hover:text-rose-400 focus:outline-none"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </Badge>
            ))}
            {preferredLanguages.map((l, idx) => (
              <Badge
                key={`pref-${idx}`}
                variant="outline"
                className="text-xs py-1 px-2.5 flex items-center gap-1.5 bg-sky-500/20 text-sky-200 border-sky-500/40 font-bold"
              >
                <span>{l.langue}</span>
                {l.niveau && (
                  <span className="text-[10px] opacity-90">({l.niveau})</span>
                )}
                <span className="text-[9px] uppercase font-bold tracking-tight bg-sky-500/30 px-1 rounded">
                  Atout
                </span>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() =>
                      onChangePreferred(
                        preferredLanguages.filter((_, i) => i !== idx),
                      )
                    }
                    className="hover:text-rose-400 focus:outline-none"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </Badge>
            ))}
          </>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2 pt-1">
          <Input
            placeholder="Langue (ex: Anglais)"
            value={newLang}
            onChange={(e) => setNewLang(e.target.value)}
            className="h-8 text-xs flex-1 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
          />
          <Input
            placeholder="Niveau (ex: Courant, C1)"
            value={newNiveau}
            onChange={(e) => setNewNiveau(e.target.value)}
            className="h-8 text-xs w-32 bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg"
          />
          <Button
            type="button"
            size="sm"
            variant={isObligatoire ? "default" : "secondary"}
            onClick={() => setIsObligatoire(!isObligatoire)}
            className="h-8 text-[11px] px-2 font-semibold bg-primary hover:bg-primary/95 text-white"
          >
            {isObligatoire ? "Obligatoire" : "Atout"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAdd}
            disabled={!newLang.trim()}
            className="h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            <Plus className="size-3.5 mr-1" /> Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}

interface ProcessStepsEditorProps {
  steps: string[];
  onChange: (steps: string[]) => void;
  isEditing?: boolean;
}

export function ProcessStepsEditor({
  steps,
  onChange,
  isEditing = true,
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
        <ListOrdered className="size-3.5 text-muted-foreground/80" />
        <span>Étapes du recrutement ({steps.length})</span>
      </div>

      <div className="space-y-1.5">
        {steps.length === 0 ? (
          <div className="py-2.5 px-3 rounded-xl bg-[#080A11] border border-slate-800 text-xs text-slate-400 italic">
            Non renseigné dans l'offre.
          </div>
        ) : (
          steps.map((st, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 px-3 rounded-xl border border-slate-800 bg-[#080A11] text-xs text-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <span className="size-5 rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-slate-100">{st}</span>
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-slate-400 hover:text-rose-400"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2 pt-1">
          <Input
            placeholder="Nouvelle étape (ex: Entretien RH)"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="h-8 text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-lg flex-1"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAdd}
            disabled={!stepInput.trim()}
            className="h-8 px-2.5 text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            <Plus className="size-3.5 mr-1" /> Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}
