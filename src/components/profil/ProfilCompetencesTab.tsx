import { Wrench, Code2, Globe2, Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfilTagSuggestions } from "./ProfilTagSuggestions";
import type { Profil } from "@/lib/profil";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

const SUGGESTIONS_COMPETENCES = [
  "Gestion de projet",
  "Analyse financière",
  "Modélisation de données",
  "Stratégie d'entreprise",
  "Communication client",
  "Méthodologies Agiles / Scrum",
  "Business Development",
  "Veille concurrentielle",
  "Audit & Contrôle de gestion",
  "Négociation commerciale",
  "Synthèse & Reporting",
  "Problem Solving",
];

const SUGGESTIONS_LOGICIELS = [
  "Excel (Modélisation / VBA)",
  "PowerPoint",
  "Power BI",
  "Python (Data Analysis)",
  "SQL",
  "Salesforce",
  "Notion",
  "Figma",
  "Tableau Software",
  "SAP",
  "HubSpot",
  "Google Analytics",
];

const SUGGESTIONS_LANGUES = [
  "Français (Langue maternelle)",
  "Anglais (Courant / C1)",
  "Anglais (Professionnel / B2)",
  "Espagnol (Intermédiaire / B2)",
  "Allemand (B1)",
  "Italien (B1)",
  "Chinois / Mandarin (A2)",
];

const NIVEAUX_ANGLAIS = [
  "C2 (Bilingue / Langue maternelle)",
  "C1 (Courant / Autonome / TOEIC 900+)",
  "B2 (Professionnel / TOEIC 785-895)",
  "B1 (Intermédiaire / Pratique)",
  "A2 (Élémentaire)",
];

export function ProfilCompetencesTab({ profil, onChange }: Props) {
  const toggleOrAppendTag = (
    field: keyof Profil,
    current: string,
    tag: string,
  ) => {
    const list = (current || "")
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const exists = list.some((s) => s.toLowerCase() === tag.toLowerCase());
    let next: string;
    if (exists) {
      next = list
        .filter((s) => s.toLowerCase() !== tag.toLowerCase())
        .join(", ");
    } else {
      const trimmed = (current || "").trim();
      next = trimmed.length > 0 ? `${trimmed}, ${tag}` : tag;
    }
    onChange({ [field]: next });
  };

  return (
    <div className="grid gap-6">
      {/* 1. Compétences & Savoir-faire */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-border/40 border-b">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Wrench className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Compétences clés & Savoir-faire
            </h2>
            <p className="text-xs text-muted-foreground">
              L'IA compare ces compétences aux prérequis des offres pour
              calculer votre score.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="comp-input" className="text-sm font-medium">
              Compétences (Hard & Soft skills)
            </Label>
            <Textarea
              id="comp-input"
              rows={3}
              value={profil.competences}
              onChange={(e) => onChange({ competences: e.target.value })}
              placeholder="Ex: Analyse de données, gestion de projet, communication client, synthèse stratégique..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_COMPETENCES}
              currentValue={profil.competences}
              onSelectTag={(tag) =>
                toggleOrAppendTag("competences", profil.competences, tag)
              }
            />
          </div>
        </div>
      </section>

      {/* 2. Logiciels & Outils */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-border/40 border-b">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Code2 className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Logiciels, Outils & Technologies
            </h2>
            <p className="text-xs text-muted-foreground">
              Les recruteurs filtrent souvent les candidats sur ces mots-clés
              techniques.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="logiciels-input" className="text-sm font-medium">
              Logiciels maîtrisés
            </Label>
            <Textarea
              id="logiciels-input"
              rows={2}
              value={profil.logiciels}
              onChange={(e) => onChange({ logiciels: e.target.value })}
              placeholder="Ex: Excel (RechercheV, TCD), PowerPoint, Power BI, Python, SQL, Notion..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_LOGICIELS}
              currentValue={profil.logiciels}
              onSelectTag={(tag) =>
                toggleOrAppendTag("logiciels", profil.logiciels, tag)
              }
            />
          </div>
        </div>
      </section>

      {/* 3. Langues & Niveaux */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-border/40 border-b">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe2 className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Langues & Niveaux de maîtrise
            </h2>
            <p className="text-xs text-muted-foreground">
              Essentiel pour les postes internationaux et multinationales.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Liste des langues */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="langues-input" className="text-sm font-medium">
              Langues parlées
            </Label>
            <Input
              id="langues-input"
              value={profil.langues}
              onChange={(e) => onChange({ langues: e.target.value })}
              placeholder="Ex: Français (Natif), Anglais (C1), Espagnol (B2)..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_LANGUES}
              currentValue={profil.langues}
              onSelectTag={(tag) =>
                toggleOrAppendTag("langues", profil.langues, tag)
              }
            />
          </div>

          {/* Niveau d'anglais */}
          <div className="grid gap-2 sm:col-span-2">
            <Label className="text-sm font-medium">
              Niveau d'anglais principal
            </Label>
            <Select
              value={
                profil.niveauAnglais || "C1 (Courant / Autonome / TOEIC 900+)"
              }
              onValueChange={(v) => onChange({ niveauAnglais: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre niveau d'anglais" />
              </SelectTrigger>
              <SelectContent>
                {NIVEAUX_ANGLAIS.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* 4. Expériences passées (texte rapide) */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-border/40 border-b">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Briefcase className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Résumé de vos expériences phares
            </h2>
            <p className="text-xs text-muted-foreground">
              Points forts de vos stages, alternances ou projets associatifs
              passés.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Textarea
            rows={3}
            value={profil.experiences}
            onChange={(e) => onChange({ experiences: e.target.value })}
            placeholder="Ex: Stage de 6 mois en tant qu'Analyste Junior chez BNP Paribas : modélisation financière, rédaction de pitchs sectoriels..."
          />
        </div>
      </section>
    </div>
  );
}
