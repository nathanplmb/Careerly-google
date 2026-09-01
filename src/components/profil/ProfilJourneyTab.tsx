import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Calendar,
  Building2,
  MapPin,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
  nouvelleExperience,
  nouvelleFormation,
  type CvExperience,
  type CvFormation,
  type TypeContrat,
} from "@/lib/cv-structure";

const TYPES_CONTRAT: TypeContrat[] = [
  "Stage",
  "Alternance",
  "CDI",
  "CDD",
  "Freelance",
  "VIE",
  "Graduate Program",
  "Projet",
  "Autre",
];

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

export function ProfilJourneyTab({ profil, onChange }: Props) {
  const [subView, setSubView] = useState<"experiences" | "formations">(
    "experiences",
  );
  const cv = profil.cvStructure;
  const experiences = cv?.experiences || [];
  const formations = cv?.formations || [];

  const [expandedExp, setExpandedExp] = useState<number | null>(0);
  const [expandedForm, setExpandedForm] = useState<number | null>(0);

  // Expériences handlers
  const updateExperiences = (nouvellesExp: CvExperience[]) => {
    onChange({
      cvStructure: {
        ...cv,
        experiences: nouvellesExp,
      },
    });
  };

  const handleAjouterExp = () => {
    const ne = nouvelleExperience();
    updateExperiences([ne, ...experiences]);
    setExpandedExp(0);
  };

  const handleSupprimerExp = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    updateExperiences(updated);
    if (expandedExp === index) setExpandedExp(null);
  };

  const handleModifierExp = (index: number, patch: Partial<CvExperience>) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, ...patch } : exp,
    );
    updateExperiences(updated);
  };

  // Formations handlers
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

  const handleAjouterForm = () => {
    const nf = nouvelleFormation();
    updateFormations([nf, ...formations]);
    setExpandedForm(0);
  };

  const handleSupprimerForm = (index: number) => {
    const updated = formations.filter((_, i) => i !== index);
    updateFormations(updated);
    if (expandedForm === index) setExpandedForm(null);
  };

  const handleModifierForm = (index: number, patch: Partial<CvFormation>) => {
    const updated = formations.map((f, i) =>
      i === index ? { ...f, ...patch } : f,
    );
    updateFormations(updated);
  };

  return (
    <div className="space-y-6">
      {/* Sélecteur de sous-section (Expériences vs Formations) */}
      <div className="glass-card p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/50">
          <button
            type="button"
            onClick={() => setSubView("experiences")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              subView === "experiences"
                ? "bg-card text-foreground shadow-xs border border-border/80 text-purple-300"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Briefcase className="size-3.5 text-purple-400" />
            <span>Expériences professionnelles</span>
            <Badge
              variant="secondary"
              className="text-[10px] bg-purple-500/15 text-purple-300 px-1.5 py-0"
            >
              {experiences.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setSubView("formations")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              subView === "formations"
                ? "bg-card text-foreground shadow-xs border border-border/80 text-indigo-300"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="size-3.5 text-indigo-400" />
            <span>Formations & Diplômes</span>
            <Badge
              variant="secondary"
              className="text-[10px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0"
            >
              {formations.length}
            </Badge>
          </button>
        </div>

        {subView === "experiences" ? (
          <Button
            size="sm"
            onClick={handleAjouterExp}
            className="gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs shrink-0"
          >
            <Plus className="size-3.5" />
            Ajouter une expérience
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleAjouterForm}
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs shrink-0"
          >
            <Plus className="size-3.5" />
            Ajouter une formation
          </Button>
        )}
      </div>

      {/* VUE 1 : EXPÉRIENCES PROFESSIONNELLES */}
      {subView === "experiences" && (
        <div className="space-y-4">
          {experiences.length === 0 && (
            <div className="glass-card p-10 text-center space-y-3">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Briefcase className="size-6" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Aucune expérience professionnelle enregistrée
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Ajoutez vos stages, alternances, jobs ou projets phares pour
                enrichir votre dossier.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleAjouterExp}
                className="gap-1.5"
              >
                <Plus className="size-3.5" />
                Ajouter une première expérience
              </Button>
            </div>
          )}

          {experiences.map((exp, idx) => {
            const isExpanded = expandedExp === idx;
            const titreAffiche =
              exp.poste || exp.entreprise || `Expérience #${idx + 1}`;
            const sousTitre = [exp.entreprise, exp.typeContrat, exp.lieu]
              .filter(Boolean)
              .join(" • ");
            const dates =
              exp.debut || exp.fin
                ? `${exp.debut || "?"} - ${exp.enCours ? "Aujourd'hui" : exp.fin || "?"}`
                : "";

            return (
              <div
                key={exp.id}
                className="glass-card overflow-hidden transition-all border border-border/70 bg-card/60"
              >
                {/* Header accordéon */}
                <div
                  onClick={() => setExpandedExp(isExpanded ? null : idx)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-bold text-xs">
                      #{experiences.length - idx}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground truncate">
                          {titreAffiche}
                        </span>
                        {exp.enCours && (
                          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-[10px] py-0">
                            En cours
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {sousTitre} {dates && `• ${dates}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSupprimerExp(idx);
                      }}
                      className="size-8 p-0 text-muted-foreground hover:text-rose-400"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Formulaire détaillé */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-border/50 space-y-4 bg-background/40">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">
                          Intitulé du poste *
                        </Label>
                        <Input
                          value={exp.poste}
                          onChange={(e) =>
                            handleModifierExp(idx, { poste: e.target.value })
                          }
                          placeholder="Ex: Bras Droit CEO, Consultant Junior..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">
                          Entreprise / Organisation *
                        </Label>
                        <Input
                          value={exp.entreprise}
                          onChange={(e) =>
                            handleModifierExp(idx, {
                              entreprise: e.target.value,
                            })
                          }
                          placeholder="Ex: Qonto, BCG, LVMH, BNP Paribas..."
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Type de contrat
                        </Label>
                        <Select
                          value={exp.typeContrat || "Stage"}
                          onValueChange={(val) =>
                            handleModifierExp(idx, {
                              typeContrat: val as TypeContrat,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TYPES_CONTRAT.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Date de début
                        </Label>
                        <Input
                          value={exp.debut}
                          onChange={(e) =>
                            handleModifierExp(idx, { debut: e.target.value })
                          }
                          placeholder="Ex: 01/2024 ou Janvier 2024"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Date de fin
                        </Label>
                        <Input
                          value={exp.fin}
                          disabled={exp.enCours}
                          onChange={(e) =>
                            handleModifierExp(idx, { fin: e.target.value })
                          }
                          placeholder={
                            exp.enCours
                              ? "Poste actuel"
                              : "Ex: 06/2024 ou Juin 2024"
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={exp.enCours}
                          onCheckedChange={(c) =>
                            handleModifierExp(idx, {
                              enCours: c,
                              fin: c ? "" : exp.fin,
                            })
                          }
                        />
                        <span className="text-xs text-foreground font-medium">
                          Poste actuel / En cours
                        </span>
                      </div>

                      <div className="w-1/2">
                        <Input
                          value={exp.lieu}
                          onChange={(e) =>
                            handleModifierExp(idx, { lieu: e.target.value })
                          }
                          placeholder="Lieu (ex: Paris, France)"
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>

                    {/* Missions & Responsabilités */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium text-foreground">
                          Missions & Responsabilités
                        </Label>
                        <span className="text-[10px] text-muted-foreground">
                          Utilisez des verbes d'action
                        </span>
                      </div>
                      <Textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) =>
                          handleModifierExp(idx, {
                            description: e.target.value,
                          })
                        }
                        placeholder="• Gestion et pilotage de 3 chantiers transverses...&#10;• Analyse quantitative de 15 opportunités de marché..."
                        className="text-xs"
                      />
                    </div>

                    {/* KPI & Réalisations Chiffrées (ATS Booster) */}
                    <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                          <TrendingUp className="size-3.5 text-purple-400" />
                          Réalisations Chiffrées & KPI d'impact (ATS Booster)
                        </span>
                        <span className="text-[10px] text-purple-400 font-medium">
                          +20 pts Matching IA
                        </span>
                      </div>
                      <Input
                        value={exp.kpi || exp.realisationsCles || ""}
                        onChange={(e) =>
                          handleModifierExp(idx, {
                            kpi: e.target.value,
                            realisationsCles: e.target.value,
                          })
                        }
                        placeholder="Ex: +32% de taux d'ouverture email, 450k€ de budget géré, 12 audits réalisés..."
                        className="text-xs bg-background/80 border-purple-500/30"
                      />
                    </div>

                    {/* Outils & Compétences mobilisés */}
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Outils & Compétences mobilisés dans ce poste
                      </Label>
                      <Input
                        value={exp.competences?.join(", ") || ""}
                        onChange={(e) =>
                          handleModifierExp(idx, {
                            competences: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Ex: Notion, SQL, Excel, Figma, Analyse financière..."
                        className="text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VUE 2 : FORMATIONS & DIPLÔMES */}
      {subView === "formations" && (
        <div className="space-y-4">
          {formations.length === 0 && (
            <div className="glass-card p-10 text-center space-y-3">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <GraduationCap className="size-6" />
              </div>
              <h4 className="text-sm font-semibold text-foreground">
                Aucune formation enregistrée
              </h4>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Ajoutez votre école, université, master ou classe préparatoire.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleAjouterForm}
                className="gap-1.5"
              >
                <Plus className="size-3.5" />
                Ajouter une formation
              </Button>
            </div>
          )}

          {formations.map((f, idx) => {
            const isExpanded = expandedForm === idx;
            const titreAffiche =
              f.diplome || f.etablissement || `Formation #${idx + 1}`;
            const sousTitre = [f.etablissement, f.specialisation, f.niveau]
              .filter(Boolean)
              .join(" • ");
            const dates =
              f.debut || f.fin
                ? `${f.debut || "?"} - ${f.enCours ? "En cours" : f.fin || "?"}`
                : "";

            return (
              <div
                key={f.id}
                className="glass-card overflow-hidden transition-all border border-border/70 bg-card/60"
              >
                {/* Header accordéon */}
                <div
                  onClick={() => setExpandedForm(isExpanded ? null : idx)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-bold text-xs">
                      🎓
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground truncate">
                          {titreAffiche}
                        </span>
                        {f.enCours && (
                          <Badge className="bg-indigo-500/15 text-indigo-300 border-indigo-500/30 text-[10px] py-0">
                            En cours
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {sousTitre} {dates && `• ${dates}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSupprimerForm(idx);
                      }}
                      className="size-8 p-0 text-muted-foreground hover:text-rose-400"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Formulaire détaillé */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-border/50 space-y-4 bg-background/40">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">
                          Établissement / École *
                        </Label>
                        <Input
                          value={f.etablissement}
                          onChange={(e) =>
                            handleModifierForm(idx, {
                              etablissement: e.target.value,
                            })
                          }
                          placeholder="Ex: NEOMA Business School, HEC Paris, Dauphine..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-foreground">
                          Intitulé du Diplôme / Cursus *
                        </Label>
                        <Input
                          value={f.diplome}
                          onChange={(e) =>
                            handleModifierForm(idx, {
                              diplome: e.target.value,
                            })
                          }
                          placeholder="Ex: Programme Grande École (PGE), Master 2 Finance..."
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Niveau d'études
                        </Label>
                        <Select
                          value={
                            f.niveau || "Bac +5 (Master 2 / PGE / Ingénieur)"
                          }
                          onValueChange={(val) =>
                            handleModifierForm(idx, { niveau: val })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {NIVEAUX_ETUDES.map((n) => (
                              <SelectItem key={n} value={n}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Spécialisation / Majeure
                        </Label>
                        <Input
                          value={f.specialisation || ""}
                          onChange={(e) =>
                            handleModifierForm(idx, {
                              specialisation: e.target.value,
                            })
                          }
                          placeholder="Ex: Corporate Finance, Strategy, Data..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Mention / Distinctions
                        </Label>
                        <Input
                          value={f.mention || ""}
                          onChange={(e) =>
                            handleModifierForm(idx, {
                              mention: e.target.value,
                            })
                          }
                          placeholder="Ex: Mention Très Bien, Major de promo..."
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Date de début
                        </Label>
                        <Input
                          value={f.debut}
                          onChange={(e) =>
                            handleModifierForm(idx, { debut: e.target.value })
                          }
                          placeholder="Ex: 2022"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Date de fin / Promo
                        </Label>
                        <Input
                          value={f.fin}
                          onChange={(e) =>
                            handleModifierForm(idx, { fin: e.target.value })
                          }
                          placeholder="Ex: 2026 (Promo 2026)"
                        />
                      </div>
                    </div>

                    {/* Cours clés & Projets académiques */}
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Cours clés & Projets académiques valorisables
                      </Label>
                      <Input
                        value={f.coursImportants?.join(", ") || ""}
                        onChange={(e) =>
                          handleModifierForm(idx, {
                            coursImportants: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Ex: Modélisation financière LBO, Stratégie M&A, Machine Learning appliqué, Droit des affaires..."
                        className="text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
