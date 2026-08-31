import { useState } from "react";
import {
  Wrench,
  Sparkles,
  Plus,
  Trash2,
  X,
  Layers,
  Heart,
  Cpu,
  Bookmark,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Profil } from "@/lib/profil";
import {
  NIVEAUX_COMPETENCE,
  nouvelleCompetence,
  type CvCompetence,
  type NiveauCompetence,
} from "@/lib/cv-structure";
import { ProfilTagSuggestions } from "./ProfilTagSuggestions";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilSkillsTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const competencesList = cv?.competences || [];

  const [nouvelleHardSkill, setNouvelleHardSkill] = useState("");
  const [niveauHardSkill, setNiveauHardSkill] =
    useState<NiveauCompetence>("Intermédiaire");

  const updateCompetences = (nouvelles: CvCompetence[]) => {
    const resumeText = nouvelles
      .map((c) => `${c.nom} (${c.niveau || "Intermédiaire"})`)
      .join(", ");
    onChange({
      competences: resumeText || profil.competences,
      cvStructure: {
        ...cv,
        competences: nouvelles,
      },
    });
  };

  const handleAjouterHardSkill = () => {
    if (!nouvelleHardSkill.trim()) return;
    const nc: CvCompetence = {
      id: crypto.randomUUID(),
      nom: nouvelleHardSkill.trim(),
      niveau: niveauHardSkill,
      categorie: "Hard Skill",
    };
    updateCompetences([...competencesList, nc]);
    setNouvelleHardSkill("");
  };

  const handleSupprimerCompetence = (id: string) => {
    updateCompetences(competencesList.filter((c) => c.id !== id));
  };

  const handleModifierNiveau = (id: string, niveau: NiveauCompetence) => {
    updateCompetences(
      competencesList.map((c) => (c.id === id ? { ...c, niveau } : c)),
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Hard Skills qualifiés avec Niveau */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Cpu className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Hard Skills & Compétences Techniques ({competencesList.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Définissez votre niveau de maîtrise pour affiner le calcul de
              compatibilité du Match IA
            </p>
          </div>
        </div>

        {/* Formulaire d'ajout rapide */}
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex-1 min-w-[240px] space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Compétence technique
            </Label>
            <Input
              value={nouvelleHardSkill}
              onChange={(e) => setNouvelleHardSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAjouterHardSkill();
                }
              }}
              placeholder="Ex : Modélisation financière, Python, SEO, Google Ads, UX Research..."
            />
          </div>

          <div className="w-40 space-y-1.5">
            <Label className="text-xs text-muted-foreground">Niveau</Label>
            <Select
              value={niveauHardSkill}
              onValueChange={(v) => setNiveauHardSkill(v as NiveauCompetence)}
            >
              <SelectTrigger className="text-xs h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NIVEAUX_COMPETENCE.map((n) => (
                  <SelectItem key={n} value={n} className="text-xs">
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            onClick={handleAjouterHardSkill}
            className="gap-1.5 bg-purple-600 hover:bg-purple-500 text-white h-10 px-4 shrink-0"
          >
            <Plus className="size-4" />
            Ajouter
          </Button>
        </div>

        <ProfilTagSuggestions
          categorie="competences"
          valeurActuelle={profil.competences}
          onSelectSuggestion={(nom) => {
            if (
              !competencesList.some(
                (c) => c.nom.toLowerCase() === nom.toLowerCase(),
              )
            ) {
              const nc: CvCompetence = {
                id: crypto.randomUUID(),
                nom,
                niveau: "Intermédiaire",
                categorie: "Hard Skill",
              };
              updateCompetences([...competencesList, nc]);
            }
          }}
        />

        {/* Liste des compétences qualifiées */}
        {competencesList.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-2">
            {competencesList.map((comp) => (
              <div
                key={comp.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/60 p-2.5 px-3 transition-colors hover:border-purple-500/30"
              >
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-foreground truncate">
                    {comp.nom}
                  </span>
                  <span className="text-[10px] text-purple-400 font-medium">
                    {comp.niveau || "Intermédiaire"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Select
                    value={comp.niveau || "Intermédiaire"}
                    onValueChange={(n) =>
                      handleModifierNiveau(comp.id, n as NiveauCompetence)
                    }
                  >
                    <SelectTrigger className="h-6 w-20 text-[10px] px-1.5 border-border/60">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NIVEAUX_COMPETENCE.map((n) => (
                        <SelectItem key={n} value={n} className="text-xs">
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSupprimerCompetence(comp.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-rose-400"
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Logiciels & Outils Maîtrisés */}
      <div className="glass-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Wrench className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Logiciels & Outils du Quotidien
            </h3>
            <p className="text-xs text-muted-foreground">
              Outils bureautiques, design, analytics, développement et CRM
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Logiciels maîtrisés (séparés par des virgules)
          </Label>
          <Input
            value={profil.logiciels}
            onChange={(e) => onChange({ logiciels: e.target.value })}
            placeholder="Ex : Excel (RechercheX, TCD, VBA), Figma, Notion, Salesforce, Google Analytics, PowerBI, SQL, Slack..."
          />
        </div>

        <ProfilTagSuggestions
          categorie="logiciels"
          valeurActuelle={profil.logiciels}
          onSelectSuggestion={(val) => {
            const current = profil.logiciels
              ? profil.logiciels
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [];
            if (!current.includes(val)) {
              onChange({ logiciels: [...current, val].join(", ") });
            }
          }}
        />
      </div>

      {/* 3. Soft Skills & Savoir-être */}
      <div className="glass-card p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
            <Heart className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Soft Skills & Savoir-être
            </h3>
            <p className="text-xs text-muted-foreground">
              Qualités humaines et relationnelles valorisées en entretien
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Vos atouts relationnels et méthodes de travail
          </Label>
          <Input
            value={(cv?.softSkills || []).join(", ")}
            onChange={(e) =>
              onChange({
                cvStructure: {
                  ...cv,
                  softSkills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                },
              })
            }
            placeholder="Ex : Aisance relationnelle, Esprit d'analyse, Rigueur, Leadership, Autonomie, Adaptabilité, Esprit d'équipe..."
          />
        </div>
      </div>
    </div>
  );
}
