import { GraduationCap, User, Award, School } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Profil } from "@/lib/profil";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

const SUGGESTIONS_ECOLES = [
  "NEOMA Business School",
  "HEC Paris",
  "ESSEC Business School",
  "ESCP Business School",
  "EDHEC Business School",
  "EM Lyon",
  "Audencia",
  "Grenoble EM",
  "KEDGE Business School",
  "SKEMA Business School",
  "Université Paris-Dauphine",
  "Sorbonne Université",
  "Sciences Po Paris",
];

const SUGGESTIONS_FORMATIONS = [
  "Programme Grande École (Master in Management)",
  "MSc Corporate Finance & Investment Banking",
  "MSc International Business",
  "MSc Digital Marketing & Data Analytics",
  "MSc Supply Chain Management",
  "MSc Luxury Management",
  "Master Conseil & Conduite du Changement",
  "Bachelor in Business Administration (BBA)",
];

const NIVEAUX = [
  "L3 (Licence 3 / Bachelor)",
  "M1 (Master 1)",
  "Année de Césure (Gap Year)",
  "M2 (Master 2)",
  "MSc (Master of Science)",
  "Mastère Spécialisé",
  "Diplômé / Jeune diplômé",
];

const CONTRATS = [
  "Stage (4 à 6 mois)",
  "Stage de fin d'études",
  "Alternance (Contrat d'apprentissage)",
  "Alternance (Contrat de professionnalisation)",
  "Graduate Program",
  "CDI (Premier emploi)",
  "CDD",
];

export function ProfilFormationTab({ profil, onChange }: Props) {
  return (
    <div className="grid gap-6">
      {/* Identité */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <User className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Identité du candidat
            </h2>
            <p className="text-xs text-muted-foreground">
              Utilisé pour la signature des lettres de motivation et les
              relances.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="prenom-input" className="text-sm font-medium">
              Prénom
            </Label>
            <Input
              id="prenom-input"
              value={profil.prenom}
              onChange={(e) => onChange({ prenom: e.target.value })}
              placeholder="Ex: Nathan"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nom-input" className="text-sm font-medium">
              Nom
            </Label>
            <Input
              id="nom-input"
              value={profil.nom}
              onChange={(e) => onChange({ nom: e.target.value })}
              placeholder="Ex: Paul"
            />
          </div>
        </div>
      </section>

      {/* Formation & Diplôme */}
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <GraduationCap className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Formation & Parcours académique
            </h2>
            <p className="text-xs text-muted-foreground">
              Votre école et filière permettent d'ajuster la pertinence des
              offres.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* École */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="ecole-input" className="text-sm font-medium">
              École / Université
            </Label>
            <Input
              id="ecole-input"
              value={profil.ecole}
              onChange={(e) => onChange({ ecole: e.target.value })}
              placeholder="Ex: NEOMA Business School"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTIONS_ECOLES.slice(0, 6).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => onChange({ ecole: e })}
                  className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Formation / Programme */}
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="formation-input" className="text-sm font-medium">
              Programme ou Spécialisation
            </Label>
            <Input
              id="formation-input"
              value={profil.formation}
              onChange={(e) => onChange({ formation: e.target.value })}
              placeholder="Ex: Programme Grande École, MSc Corporate Finance..."
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTIONS_FORMATIONS.slice(0, 4).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onChange({ formation: f })}
                  className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Niveau */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium">
              Niveau d'études actuel
            </Label>
            <Select
              value={profil.niveau || "M1 (Master 1)"}
              onValueChange={(v) => onChange({ niveau: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre niveau" />
              </SelectTrigger>
              <SelectContent>
                {NIVEAUX.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type de contrat recherché */}
          <div className="grid gap-2">
            <Label className="text-sm font-medium">Type de contrat cible</Label>
            <Select
              value={profil.contrats || "Stage (4 à 6 mois)"}
              onValueChange={(v) => onChange({ contrats: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le contrat" />
              </SelectTrigger>
              <SelectContent>
                {CONTRATS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
}
