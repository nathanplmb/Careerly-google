import { useState } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { Profil } from "@/lib/profil";
import {
  nouvelleFormation,
  type CvFormation,
  type CvStructure,
} from "@/lib/cv-structure";

const NIVEAUX_ETUDES = [
  "Bac +1",
  "Bac +2 (BTS / DUT / Prépa)",
  "Bac +3 (Licence / Bachelor)",
  "Bac +4 (Master 1)",
  "Bac +5 (Master 2 / PGE / Ingénieur)",
  "Mastère Spécialisé / MBA",
  "Doctorat / PhD",
];

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilEducationTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const formations = cv?.formations || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const updateFormations = (nouvellesFormations: CvFormation[]) => {
    const primary = nouvellesFormations[0];
    onChange({
      formation: primary?.diplome || profil.formation,
      ecole: primary?.etablissement || profil.ecole,
      niveau: primary?.niveau || profil.niveau,
      cvStructure: {
        ...cv,
        formations: nouvellesFormations,
      },
    });
  };

  const handleAjouter = () => {
    const nf = nouvelleFormation();
    const updated = [nf, ...formations];
    updateFormations(updated);
    setExpandedIndex(0);
  };

  const handleSupprimer = (index: number) => {
    const updated = formations.filter((_, i) => i !== index);
    updateFormations(updated);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleModifier = (index: number, patch: Partial<CvFormation>) => {
    const updated = formations.map((f, i) =>
      i === index ? { ...f, ...patch } : f,
    );
    updateFormations(updated);
  };

  return (
    <div className="space-y-6">
      {/* En-tête & Action d'ajout */}
      <div className="glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Parcours Académique & Diplômes ({formations.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Renseignez vos écoles, masters, spécialisations et cours clés
              valorisables
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleAjouter}
          className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
        >
          <Plus className="size-4" />
          Ajouter une formation
        </Button>
      </div>

      {formations.length === 0 && (
        <div className="glass-card p-10 text-center space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            <GraduationCap className="size-6" />
          </div>
          <h4 className="text-sm font-semibold text-foreground">
            Aucune formation renseignée
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Ajoutez votre cursus actuel (école de commerce, d'ingénieurs,
            université...) pour enrichir votre profil.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleAjouter}
            className="gap-1.5"
          >
            <Plus className="size-3.5" />
            Ajouter ma formation principale
          </Button>
        </div>
      )}

      {/* Liste des Formations en Timeline */}
      <div className="space-y-4">
        {formations.map((f, idx) => {
          const isExpanded = expandedIndex === idx;
          const titreAffiche =
            f.diplome || f.etablissement || `Formation #${idx + 1}`;
          const sousTitre = [
            f.etablissement,
            f.specialisation,
            (f as any).periode ||
              ((f as any).anneeDebut
                ? `${(f as any).anneeDebut} - ${f.enCours ? "En cours" : (f as any).anneeFin || ""}`
                : ""),
          ]
            .filter(Boolean)
            .join(" • ");

          return (
            <div
              key={f.id || idx}
              className="glass-card overflow-hidden border border-border/70 transition-all hover:border-indigo-500/30"
            >
              {/* Header de la carte */}
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-card/40 hover:bg-card/70 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 font-bold text-xs">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {titreAffiche}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {sousTitre || "Détails à renseigner"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {f.enCours && (
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                      En cours
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

              {/* Formulaire déplié */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-border/50 bg-background/30 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Établissement / École / Université *
                      </Label>
                      <Input
                        value={f.etablissement}
                        onChange={(e) =>
                          handleModifier(idx, { etablissement: e.target.value })
                        }
                        placeholder="Ex : NEOMA Business School, Sorbonne..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Diplôme / Programme *
                      </Label>
                      <Input
                        value={f.diplome}
                        onChange={(e) =>
                          handleModifier(idx, { diplome: e.target.value })
                        }
                        placeholder="Ex : Master Grande École, Bachelor..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Niveau d'études
                      </Label>
                      <Input
                        value={f.niveau || ""}
                        onChange={(e) =>
                          handleModifier(idx, { niveau: e.target.value })
                        }
                        placeholder="Ex : M1, M2, Bac+5..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Spécialisation / Majeure
                      </Label>
                      <Input
                        value={f.specialisation || ""}
                        onChange={(e) =>
                          handleModifier(idx, {
                            specialisation: e.target.value,
                          })
                        }
                        placeholder="Ex : Finance d'entreprise, Marketing Digital..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Mention / Grade
                      </Label>
                      <Input
                        value={f.mention || ""}
                        onChange={(e) =>
                          handleModifier(idx, { mention: e.target.value })
                        }
                        placeholder="Ex : Très bien, Major de promotion..."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Ville / Campus
                      </Label>
                      <Input
                        value={f.ville || ""}
                        onChange={(e) =>
                          handleModifier(idx, { ville: e.target.value })
                        }
                        placeholder="Ex : Paris, Reims, Rouen..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Période / Année
                      </Label>
                      <Input
                        value={(f as any).periode || ""}
                        onChange={(e) =>
                          handleModifier(idx, { periode: e.target.value })
                        }
                        placeholder="Ex : 2023 - 2026, Sept 2024 - Présent"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <Switch
                        checked={Boolean(f.enCours)}
                        onCheckedChange={(c) =>
                          handleModifier(idx, { enCours: c })
                        }
                      />
                      <Label className="text-xs text-foreground cursor-pointer">
                        Formation en cours
                      </Label>
                    </div>
                  </div>

                  {/* Cours importants & Projets académiques */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <BookOpen className="size-3.5" />
                      Matières clés & Cours importants (séparés par des
                      virgules)
                    </Label>
                    <Input
                      value={(f.coursImportants || []).join(", ")}
                      onChange={(e) =>
                        handleModifier(idx, {
                          coursImportants: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Ex : Analyse financière approfondie, Stratégie d'entreprise, Business Analytics, Négociation..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Projet académique majeur / Thèse / Mémoire (Optionnel)
                    </Label>
                    <Textarea
                      rows={2}
                      value={f.description || ""}
                      onChange={(e) =>
                        handleModifier(idx, { description: e.target.value })
                      }
                      placeholder="Ex : Réalisation d'une étude d'opportunité de marché pour une startup fintech, soutenance devant un jury professionnel..."
                      className="text-xs"
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
