import {
  SlidersHorizontal,
  ShieldAlert,
  CheckCircle2,
  Building,
  MapPin,
  DollarSign,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CRITERES,
  IMPORTANCES,
  type Critere,
  type Importance,
  type Profil,
} from "@/lib/profil";

const NIVEAUX_IMPORTANCE: {
  value: Importance;
  label: string;
  color: string;
}[] = [
  {
    value: "Très important",
    label: "Très important (x2)",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  {
    value: "Important",
    label: "Important (x1.5)",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
  },
  {
    value: "Moyen",
    label: "Moyen (x1)",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  },
  {
    value: "Faible",
    label: "Faible (x0.5)",
    color: "text-muted-foreground bg-secondary border-border/50",
  },
];

const LABELS_CRITERES: Record<
  Critere,
  { label: string; desc: string; icon: string }
> = {
  missions: {
    label: "Intérêt & Richesse des missions",
    desc: "Adéquation avec votre projet professionnel et complexité des tâches",
    icon: "🎯",
  },
  secteur: {
    label: "Secteur d'activité",
    desc: "Affinité avec l'industrie, le produit ou le domaine de l'entreprise",
    icon: "🏢",
  },
  localisation: {
    label: "Localisation & Temps de trajet",
    desc: "Proximité géographique et facilité d'accès au lieu de travail",
    icon: "📍",
  },
  remuneration: {
    label: "Rémunération & Gratification",
    desc: "Montant mensuel, primes, tickets resto et avantages",
    icon: "💰",
  },
  teletravail: {
    label: "Politique de Télétravail",
    desc: "Flexibilité du rythme de travail (hybride, remote)",
    icon: "💻",
  },
  "taille entreprise": {
    label: "Taille d'entreprise & Culture",
    desc: "Scale-up, Grand groupe, Startup, dynamique d'équipe",
    icon: "👥",
  },
};

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilPreferencesTab({ profil, onChange }: Props) {
  const criteres = profil.criteres || {};
  const preferences =
    profil.preferences || profil.cvStructure?.preferences || {};

  const handleImportanceChange = (critere: Critere, value: Importance) => {
    onChange({
      criteres: {
        ...criteres,
        [critere]: value,
      },
    });
  };

  const handlePreferencesChange = (patch: Partial<typeof preferences>) => {
    const nextPrefs = { ...preferences, ...patch };
    onChange({
      preferences: nextPrefs,
      cvStructure: {
        ...profil.cvStructure,
        preferences: {
          ...profil.cvStructure.preferences,
          ...nextPrefs,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Pondération des Critères de Matching */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <SlidersHorizontal className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Pondération des Critères de Matching
            </h3>
            <p className="text-xs text-muted-foreground">
              Ajustez l'importance de chaque critère dans le calcul du Score IA
              de correspondance
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {CRITERES.map((c) => {
            const info = LABELS_CRITERES[c] || {
              label: c,
              desc: "",
              icon: "📌",
            };
            const currentImportance: Importance =
              (criteres[c] as Importance) || "Important";

            return (
              <div
                key={c}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-3.5 px-4 transition-colors hover:border-purple-500/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg">{info.icon}</span>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-xs font-bold text-foreground">
                      {info.label}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {info.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Select
                    value={currentImportance}
                    onValueChange={(val) =>
                      handleImportanceChange(c, val as Importance)
                    }
                  >
                    <SelectTrigger className="h-8 w-44 text-xs font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NIVEAUX_IMPORTANCE.map((n) => (
                        <SelectItem
                          key={n.value}
                          value={n.value}
                          className="text-xs font-medium"
                        >
                          {n.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Filtres & Critères d'exclusion */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
            <ShieldAlert className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Critères Non Négociables & Secteurs à Éviter
            </h3>
            <p className="text-xs text-muted-foreground">
              Permet à l'IA d'écarter ou de déclasser automatiquement les offres
              incompatibles
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Secteurs ou types d'entreprises à éviter
            </Label>
            <Input
              value={(preferences.secteursAEviter || []).join(", ")}
              onChange={(e) =>
                handlePreferencesChange({
                  secteursAEviter: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Ex : Tabac, Armement, Grande distribution, Téléprospection..."
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Critères rédhibitoires / Non négociables
            </Label>
            <Input
              value={(preferences.criteresNonNegociables || []).join(", ")}
              onChange={(e) =>
                handlePreferencesChange({
                  criteresNonNegociables: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="Ex : Pas de stage non rémunéré, Déplacements max 1j/semaine, Localisation Île-de-France uniquement..."
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
