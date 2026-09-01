import { Plus, Check } from "lucide-react";

export type SuggestionCategory =
  | "metiers"
  | "domaines"
  | "competences"
  | "logiciels"
  | "soft_skills"
  | "entreprises"
  | "contrats"
  | "lieux";

const DEFAULT_CATEGORY_TAGS: Record<string, string[]> = {
  metiers: [
    "Bras Droit CEO",
    "Consultant Stratégie & Management",
    "Chef de Projet / PMO",
    "Product Manager / PO",
    "Data Analyst / BI",
    "Chargé d'Affaires M&A / Private Equity",
    "Business Developer B2B",
    "Contrôleur de Gestion Junior",
    "Auditeur Financier Junior",
    "Growth Marketer / Acquisition",
    "Consultant RSE / ESG",
    "Customer Success Manager",
  ],
  domaines: [
    "Tech, SaaS & IA",
    "Banque d'Investissement & Finance",
    "Conseil en Stratégie & Organisation",
    "Luxe, Mode & Beauté",
    "Santé, Pharma & Biotech",
    "Énergie, Climat & CleanTech",
    "E-commerce & Grande Consommation",
    "Immobilier & PropTech",
    "Aéronautique, Défense & Industrie",
    "Impact, Climat & ESS",
  ],
  competences: [
    "Modélisation financière",
    "Analyse de données",
    "Gestion de projet Agile / Scrum",
    "Prospection & Négociation B2B",
    "Pitch & Présentation Exécutive",
    "Audit financier & Comptabilité",
    "Stratégie Go-to-Market",
    "SEO / SEA & Growth",
    "Reporting & Tableaux de bord",
    "Étude de marché & Benchmark",
  ],
  logiciels: [
    "Excel (TCD, RechercheX, VBA)",
    "Power BI",
    "SQL",
    "Python (Pandas, Numpy)",
    "Figma",
    "Notion",
    "Salesforce CRM",
    "HubSpot",
    "Google Analytics 4",
    "Tableau Software",
    "Jira / Confluence",
    "Canva",
  ],
  soft_skills: [
    "Rigueur & Esprit d'analyse",
    "Leadership & Esprit d'équipe",
    "Adaptabilité & Polyvalence",
    "Aisance relationnelle",
    "Autonomie & Proactivité",
    "Sens de l'écoute & Empathie",
    "Résolution de problèmes complexes",
  ],
  entreprises: [
    "McKinsey & Company",
    "Boston Consulting Group (BCG)",
    "Bain & Company",
    "BNP Paribas",
    "Société Générale",
    "L'Oréal",
    "LVMH",
    "Kering",
    "TotalEnergies",
    "Airbus",
    "Doctolib",
    "Qonto",
    "Alan",
  ],
  contrats: [
    "Stage de fin d'études (6 mois)",
    "Stage de césure (6 mois)",
    "Alternance (12 mois)",
    "Alternance (24 mois)",
    "Premier CDI",
    "VIE (Volontariat International)",
  ],
};

type Props = {
  label?: string;
  tags?: string[];
  categorie?: SuggestionCategory | string;
  currentValue?: string;
  valeurActuelle?: string;
  onSelectTag?: (tag: string) => void;
  onSelectSuggestion?: (tag: string) => void;
};

export function ProfilTagSuggestions({
  label = "Suggestions rapides",
  tags,
  categorie,
  currentValue,
  valeurActuelle,
  onSelectTag,
  onSelectSuggestion,
}: Props) {
  const currentStr = String(currentValue ?? valeurActuelle ?? "").toLowerCase();
  const availableTags =
    tags && tags.length > 0
      ? tags
      : categorie && DEFAULT_CATEGORY_TAGS[categorie]
        ? DEFAULT_CATEGORY_TAGS[categorie]
        : [];

  if (availableTags.length === 0) {
    return null;
  }

  const handleSelect = (tag: string) => {
    if (onSelectTag) {
      onSelectTag(tag);
    }
    if (onSelectSuggestion) {
      onSelectSuggestion(tag);
    }
  };

  return (
    <div className="space-y-1.5 pt-1">
      {label && (
        <span className="text-[11px] font-medium text-muted-foreground">
          {label} :
        </span>
      )}
      <div className="flex flex-wrap gap-1.5">
        {availableTags.map((tag) => {
          const isSelected = currentStr.includes(tag.toLowerCase());
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleSelect(tag)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${
                isSelected
                  ? "border border-primary/40 bg-primary/10 font-medium text-primary shadow-xs"
                  : "border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {isSelected ? (
                <Check className="size-3 text-primary" />
              ) : (
                <Plus className="size-3 opacity-60" />
              )}
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
