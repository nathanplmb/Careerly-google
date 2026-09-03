import { useState } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { Profil } from "@/lib/profil";
import { nouvelleExperience, type CvExperience } from "@/lib/cv-structure";

const TYPES_EXP = [
  "Stage",
  "Alternance",
  "CDI",
  "CDD",
  "Projet / Freelance",
  "Job étudiant",
  "Césure",
];

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilExperiencesTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const experiences = cv?.experiences || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const updateExperiences = (nouvellesExp: CvExperience[]) => {
    const primary = nouvellesExp[0];
    const resumeExp = nouvellesExp
      .map(
        (e) =>
          `${e.poste} chez ${e.entreprise} (${e.periode || "Période"}) : ${e.description}`,
      )
      .join("\n\n");

    onChange({
      experiences: resumeExp || profil.experiences,
      cvStructure: {
        ...cv,
        experiences: nouvellesExp,
      },
    });
  };

  const handleAjouter = () => {
    const ne = nouvelleExperience();
    const updated = [ne, ...experiences];
    updateExperiences(updated);
    setExpandedIndex(0);
  };

  const handleSupprimer = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    updateExperiences(updated);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleModifier = (index: number, patch: Partial<CvExperience>) => {
    const updated = experiences.map((e, i) =>
      i === index ? { ...e, ...patch } : e,
    );
    updateExperiences(updated);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Briefcase className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Expériences Professionnelles ({experiences.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Stages, alternances, jobs et missions avec réalisations
              quantifiées (KPI)
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleAjouter}
          className="gap-2 bg-purple-600 hover:bg-purple-500 text-white shadow-xs"
        >
          <Plus className="size-4" />
          Ajouter une expérience
        </Button>
      </div>

      {experiences.length === 0 && (
        <div className="glass-card p-10 text-center space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <Briefcase className="size-6" />
          </div>
          <h4 className="text-sm font-semibold text-foreground">
            Aucune expérience enregistrée
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Ajoutez vos stages passés, alternances ou projets pour que l'IA
            valorise votre parcours dans vos lettres et candidatures.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAjouter}
            className="gap-1.5"
          >
            <Plus className="size-3.5" />
            Ajouter ma première expérience
          </Button>
        </div>
      )}

      {/* Liste des Expériences */}
      <div className="space-y-4">
        {experiences.map((exp, idx) => {
          const isExpanded = expandedIndex === idx;
          const titreAffiche =
            exp.poste || exp.entreprise || `Expérience #${idx + 1}`;
          const sousTitre = [
            exp.entreprise,
            exp.typeContrat || exp.contrat || "Stage",
            exp.periode || (exp.enCours ? "En cours" : ""),
            exp.ville || exp.lieu,
          ]
            .filter(Boolean)
            .join(" • ");

          return (
            <div
              key={exp.id || idx}
              className="glass-card overflow-hidden border border-border/70 transition-all hover:border-purple-500/30"
            >
              {/* Header Accordéon */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-card/40 hover:bg-card/70 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground truncate">
                        {titreAffiche}
                      </h4>
                      {exp.kpi && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] hidden sm:inline-flex">
                          ✨ KPI chiffré
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {sousTitre || "Détails à renseigner"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {exp.enCours && (
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                      Poste actuel
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSupprimer(idx);
                    }}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-rose-400"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                  <span className="text-muted-foreground">
                    {isExpanded ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </span>
                </div>
              </div>

              {/* Contenu Déplié */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-border/50 bg-background/30 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Intitulé du poste *
                      </Label>
                      <Input
                        value={exp.poste}
                        onChange={(e) =>
                          handleModifier(idx, { poste: e.target.value })
                        }
                        placeholder="Ex : Bras Droit du CEO, Analyste Financier, Chef de Projet..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Entreprise / Organisation *
                      </Label>
                      <Input
                        value={exp.entreprise}
                        onChange={(e) =>
                          handleModifier(idx, { entreprise: e.target.value })
                        }
                        placeholder="Ex : LVMH, BNP Paribas, Swile, BCG..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Type de contrat
                      </Label>
                      <Input
                        value={exp.typeContrat || exp.contrat || "Stage"}
                        onChange={(e) =>
                          handleModifier(idx, {
                            typeContrat: e.target.value,
                            contrat: e.target.value,
                          })
                        }
                        placeholder="Ex : Stage, Alternance, CDI, Projet..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Ville / Lieu
                      </Label>
                      <Input
                        value={exp.ville || exp.lieu || ""}
                        onChange={(e) =>
                          handleModifier(idx, {
                            ville: e.target.value,
                            lieu: e.target.value,
                          })
                        }
                        placeholder="Ex : Paris, Lyon, Londres, Remote..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Période
                      </Label>
                      <Input
                        value={exp.periode || ""}
                        onChange={(e) =>
                          handleModifier(idx, { periode: e.target.value })
                        }
                        placeholder="Ex : Janv. 2024 - Juil. 2024 (6 mois)"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={Boolean(exp.enCours)}
                      onCheckedChange={(c) =>
                        handleModifier(idx, { enCours: c })
                      }
                    />
                    <Label className="text-xs text-foreground cursor-pointer">
                      J'occupe actuellement ce poste
                    </Label>
                  </div>

                  {/* Missions principales */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Missions & Responsabilités principales *
                    </Label>
                    <Textarea
                      rows={3}
                      value={exp.description || ""}
                      onChange={(e) =>
                        handleModifier(idx, { description: e.target.value })
                      }
                      placeholder="Ex : • Pilotage des dashboards de performance et reporting hebdomadaire au CoDir&#10;• Coordination de 3 agences partenaires pour le lancement du nouveau produit&#10;• Analyse concurrentielle et benchmark sur 12 acteurs du marché..."
                      className="text-xs leading-relaxed"
                    />
                  </div>

                  {/* Réalisations clés & KPI Chiffrés (Mise en avant spéciale) */}
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <TrendingUp className="size-4" />
                        Réalisations clés & Indicateurs chiffrés (KPI)
                      </Label>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                        Boost ATS & Matching
                      </Badge>
                    </div>
                    <Textarea
                      rows={2}
                      value={
                        exp.kpi ||
                        exp.realisationsCles ||
                        (exp.realisations ? exp.realisations.join("\n") : "")
                      }
                      onChange={(e) =>
                        handleModifier(idx, {
                          kpi: e.target.value,
                          realisationsCles: e.target.value,
                          realisations: e.target.value
                            .split("\n")
                            .filter(Boolean),
                        })
                      }
                      placeholder="Ex : • +32% d'acquisition de leads qualifiés en 3 mois&#10;• Gestion d'un budget marketing de 45k€ avec ROI de x3.4&#10;• Réduction de 20% du temps de traitement des dossiers"
                      className="text-xs text-emerald-200 placeholder:text-emerald-400/40 bg-background/50 border-emerald-500/20 focus-visible:ring-emerald-500"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      💡 Les chiffres concrets (croissance, volumes, budgets,
                      satisfaction) multiplient par 2 l'impact auprès des
                      recruteurs.
                    </p>
                  </div>

                  {/* Outils & Technologies utilisés */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Layers className="size-3.5" />
                      Outils, logiciels et compétences mobilisés (séparés par
                      des virgules)
                    </Label>
                    <Input
                      value={((exp as any).technologies || []).join(", ")}
                      onChange={(e) =>
                        handleModifier(idx, {
                          // @ts-ignore
                          technologies: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Ex : Excel (VBA / TCD), Figma, SQL, Notion, Salesforce, Google Analytics..."
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
