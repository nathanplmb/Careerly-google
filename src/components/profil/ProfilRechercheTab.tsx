import {
  Compass,
  MapPin,
  Calendar,
  Building2,
  Euro,
  Laptop,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfilTagSuggestions } from "./ProfilTagSuggestions";
import type { Profil } from "@/lib/profil";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

const SUGGESTIONS_METIERS = [
  "Bras Droit CEO",
  "Consultant Junior",
  "Analyste M&A",
  "Chef de Projet",
  "Data Analyst",
  "Product Manager Junior",
  "Business Developer",
  "Chargé de Marketing",
  "Contrôleur de Gestion",
];

const SUGGESTIONS_SECTEURS = [
  "Conseil & Stratégie",
  "Finance & Banque",
  "Tech & IA",
  "Luxe & Cosmétiques",
  "Santé & Pharma",
  "E-commerce & Retail",
  "Industrie & Énergie",
  "Audit & Gestion",
];

const SUGGESTIONS_ENTREPRISES = [
  "L'Oréal",
  "BNP Paribas",
  "McKinsey & Co",
  "LVMH",
  "TotalEnergies",
  "Capgemini",
  "Société Générale",
  "Google",
  "Danone",
  "Kearney",
];

const SUGGESTIONS_LIEUX = [
  "Paris & Île-de-France",
  "Lyon",
  "Bordeaux",
  "Nantes",
  "Lille",
  "Toulouse",
  "Marseille",
  "Milan (Italie)",
  "Londres (UK)",
  "Madrid (Espagne)",
  "Full Remote (100% Télétravail)",
];

const PRESETS_TELETRAVAIL = [
  "Hybride (2-3 jours / semaine)",
  "Hybride (1-2 jours / semaine)",
  "100% Télétravail (Full remote)",
  "100% Présentiel (Sur site)",
  "Flexible / Ouvert",
];

const PRESETS_REMUNERATION = [
  "Minimum légal (~650 € / mois)",
  "1 000 € / mois",
  "1 200 € / mois",
  "1 500 € / mois",
  "1 800 €+ / mois",
  "Selon profil / Négociable",
];

const PRESETS_DUREE = [
  "Stage 4 à 6 mois",
  "Stage 6 mois",
  "Alternance 1 an",
  "Alternance 2 ans",
  "Césure (2x 6 mois)",
  "Graduate Program",
];

export function ProfilRechercheTab({ profil, onChange }: Props) {
  const toggleOrAppendTag = (
    field: keyof Profil,
    current: string,
    tag: string,
  ) => {
    const list = current
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
      next = list.length > 0 ? `${current.trim()}, ${tag}` : tag;
    }
    onChange({ [field]: next });
  };

  return (
    <div className="grid gap-6">
      {/* 1. Objectifs de postes & secteurs */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Compass className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Métiers, Secteurs & Entreprises cibles
            </h2>
            <p className="text-xs text-muted-foreground">
              Ces éléments orientent directement le calcul du score de matching
              de chaque offre.
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          {/* Métiers visés */}
          <div className="grid gap-2">
            <Label htmlFor="metiers-input" className="text-sm font-medium">
              Métiers ou postes visés
            </Label>
            <Input
              id="metiers-input"
              value={profil.metiers}
              onChange={(e) => onChange({ metiers: e.target.value })}
              placeholder="Ex: Bras Droit CEO, Consultant Stratégie Junior, Data Analyst..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_METIERS}
              currentValue={profil.metiers}
              onSelectTag={(tag) =>
                toggleOrAppendTag("metiers", profil.metiers, tag)
              }
            />
          </div>

          {/* Secteurs visés */}
          <div className="grid gap-2">
            <Label htmlFor="domaines-input" className="text-sm font-medium">
              Secteurs & Domaines d'activité
            </Label>
            <Input
              id="domaines-input"
              value={profil.domaines}
              onChange={(e) => onChange({ domaines: e.target.value })}
              placeholder="Ex: Conseil en Stratégie, Finance d'entreprise, Tech & IA, Luxe..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_SECTEURS}
              currentValue={profil.domaines}
              onSelectTag={(tag) =>
                toggleOrAppendTag("domaines", profil.domaines, tag)
              }
            />
          </div>

          {/* Entreprises cibles */}
          <div className="grid gap-2">
            <Label htmlFor="entreprises-input" className="text-sm font-medium">
              Entreprises prioritaires ciblées
            </Label>
            <Textarea
              id="entreprises-input"
              rows={2}
              value={profil.entreprisesCiblees}
              onChange={(e) => onChange({ entreprisesCiblees: e.target.value })}
              placeholder="Ex: L'Oréal, McKinsey, BNP Paribas, Danone, Capgemini..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_ENTREPRISES}
              currentValue={profil.entreprisesCiblees}
              onSelectTag={(tag) =>
                toggleOrAppendTag(
                  "entreprisesCiblees",
                  profil.entreprisesCiblees,
                  tag,
                )
              }
            />
          </div>
        </div>
      </section>

      {/* 2. Modalités, Lieu & Calendrier */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MapPin className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Localisation & Calendrier
            </h2>
            <p className="text-xs text-muted-foreground">
              Précisez vos disponibilités et zones géographiques de recherche.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Localisation */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="loc-input" className="text-sm font-medium">
              Localisation souhaitée
            </Label>
            <Input
              id="loc-input"
              value={profil.localisation}
              onChange={(e) => onChange({ localisation: e.target.value })}
              placeholder="Ex: Paris, Lyon, International..."
            />
            <ProfilTagSuggestions
              tags={SUGGESTIONS_LIEUX}
              currentValue={profil.localisation}
              onSelectTag={(tag) => onChange({ localisation: tag })}
            />
          </div>

          {/* Mobilité */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="mob-input" className="text-sm font-medium">
              Mobilité géographique
            </Label>
            <Input
              id="mob-input"
              value={profil.mobilite}
              onChange={(e) => onChange({ mobilite: e.target.value })}
              placeholder="Ex: Île-de-France, Mobilité France entière, Europe (permis B)..."
            />
          </div>

          {/* Date de début */}
          <div className="grid gap-2">
            <Label htmlFor="datedebut-input" className="text-sm font-medium">
              Date de début souhaitée
            </Label>
            <Input
              id="datedebut-input"
              type="date"
              value={profil.dateDebut}
              onChange={(e) => onChange({ dateDebut: e.target.value })}
            />
          </div>

          {/* Durée */}
          <div className="grid gap-2">
            <Label htmlFor="duree-input" className="text-sm font-medium">
              Durée recherchée
            </Label>
            <Input
              id="duree-input"
              value={profil.duree}
              onChange={(e) => onChange({ duree: e.target.value })}
              placeholder="Ex: 6 mois, 1 an..."
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESETS_DUREE.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => onChange({ duree: d })}
                  className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Télétravail & Rémunération */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Euro className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Télétravail & Gratification
            </h2>
            <p className="text-xs text-muted-foreground">
              Vos souhaits d'organisation et de rémunération.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Télétravail */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium">Rythme de télétravail</Label>
            <Input
              value={profil.teletravail}
              onChange={(e) => onChange({ teletravail: e.target.value })}
              placeholder="Ex: 2 à 3 jours / semaine"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESETS_TELETRAVAIL.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onChange({ teletravail: t })}
                  className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Rémunération */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium">
              Gratification souhaitée
            </Label>
            <Input
              value={profil.remuneration}
              onChange={(e) => onChange({ remuneration: e.target.value })}
              placeholder="Ex: 1 200 € / mois"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESETS_REMUNERATION.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onChange({ remuneration: r })}
                  className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground hover:bg-muted"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
