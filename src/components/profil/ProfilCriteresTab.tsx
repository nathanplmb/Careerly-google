import {
  SlidersHorizontal,
  Building,
  MapPin,
  Euro,
  Laptop,
  Target,
  Sparkles,
} from "lucide-react";
import {
  CRITERES,
  IMPORTANCES,
  type Critere,
  type Importance,
  type Profil,
} from "@/lib/profil";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

const CRITERES_CONFIG: Record<
  Critere,
  {
    titre: string;
    description: string;
    icone: typeof Target;
  }
> = {
  missions: {
    titre: "Missions & Responsabilités",
    description:
      "Alignement des tâches quotidiennes avec vos objectifs de carrière.",
    icone: Target,
  },
  secteur: {
    titre: "Secteur d'activité",
    description: "Pertinence du domaine (Finance, Luxe, Conseil, Tech, etc.).",
    icone: Sparkles,
  },
  localisation: {
    titre: "Localisation & Transport",
    description:
      "Proximité géographique et facilité d'accès au lieu de travail.",
    icone: MapPin,
  },
  remuneration: {
    titre: "Gratification / Rémunération",
    description: "Niveau d'indemnité mensuelle et avantages proposés.",
    icone: Euro,
  },
  teletravail: {
    titre: "Flexibilité & Télétravail",
    description: "Possibilité d'organiser son temps de travail en distanciel.",
    icone: Laptop,
  },
  "taille entreprise": {
    titre: "Taille & Notoriété de l'entreprise",
    description:
      "Grand groupe international, ETI, PME ou Startup en croissance.",
    icone: Building,
  },
};

const IMPORTANCE_BADGES: Record<
  Importance,
  {
    label: string;
    style: string;
    stars: string;
  }
> = {
  "Très important": {
    label: "Très important",
    style:
      "border-primary bg-primary text-primary-foreground font-semibold shadow-xs",
    stars: "★★★",
  },
  Important: {
    label: "Important",
    style: "border-primary/40 bg-primary/10 text-primary font-medium",
    stars: "★★☆",
  },
  Moyen: {
    label: "Moyen",
    style: "border-border bg-muted/60 text-muted-foreground",
    stars: "★☆☆",
  },
  Faible: {
    label: "Faible",
    style: "border-border/40 bg-transparent text-muted-foreground/60",
    stars: "☆☆☆",
  },
};

export function ProfilCriteresTab({ profil, onChange }: Props) {
  const setImportance = (c: Critere, imp: Importance) => {
    onChange({
      criteres: {
        ...profil.criteres,
        [c]: imp,
      },
    });
  };

  return (
    <div className="grid gap-6">
      <section className="glass-card space-y-5 p-6">
        <div className="flex items-center gap-2.5 pb-2 border-border/40 border-b">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <SlidersHorizontal className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Pondération des critères de matching
            </h2>
            <p className="text-xs text-muted-foreground">
              Définissez ce qui compte le plus pour vous. L'algorithme ajustera
              le score de chaque opportunité selon cette grille.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CRITERES.map((c) => {
            const config = CRITERES_CONFIG[c];
            const currentImp = (profil.criteres[c] || "Moyen") as Importance;
            const Icone = config.icone;

            return (
              <div
                key={c}
                className="flex flex-col justify-between gap-3.5 rounded-xl border border-border/70 bg-card/60 p-4 transition-all hover:border-primary/30 hover:bg-card"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <Icone className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {config.titre}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {config.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {IMPORTANCES.map((imp) => {
                    const isSelected = currentImp === imp;
                    const badge = IMPORTANCE_BADGES[imp];
                    return (
                      <button
                        key={imp}
                        type="button"
                        onClick={() => setImportance(c, imp)}
                        className={`flex flex-col items-center justify-center rounded-lg border px-1.5 py-1.5 text-center text-xs transition-all ${
                          isSelected
                            ? badge.style
                            : "border-border/50 bg-background/50 text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <span className="text-[10px] tracking-tighter opacity-80">
                          {badge.stars}
                        </span>
                        <span className="text-[11px] font-medium leading-tight line-clamp-1">
                          {imp}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
