import { useState } from "react";
import {
  Target,
  Calendar,
  DollarSign,
  Sparkles,
  Plus,
  X,
  Check,
  ShieldAlert,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Profil } from "@/lib/profil";

const CONTRATS_OPTIONS = [
  "Stage",
  "Alternance",
  "CDI",
  "CDD",
  "VIE",
  "Graduate Program",
  "Freelance",
];

const MODES_TRAVAIL = [
  {
    id: "hybride",
    label: "Hybride",
    desc: "Télétravail + Bureau",
    icone: "🏢",
  },
  {
    id: "full_remote",
    label: "100% Remote",
    desc: "Télétravail complet",
    icone: "💻",
  },
  { id: "presentiel", label: "Présentiel", desc: "Sur site", icone: "👥" },
  { id: "indifferent", label: "Indifférent", desc: "Flexible", icone: "✨" },
];

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilObjectivesTab({ profil, onChange }: Props) {
  const [nouveauMetier, setNouveauMetier] = useState("");
  const [nouveauDomaine, setNouveauDomaine] = useState("");
  const [nouvelleEntreprise, setNouvelleEntreprise] = useState("");

  const ajouterTag = (
    val: string,
    champ: "metiers" | "domaines" | "entreprisesCiblees",
    reset?: () => void,
  ) => {
    const trim = val.trim();
    if (!trim) return;
    const current = profil[champ]
      ? profil[champ]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    if (!current.some((c) => c.toLowerCase() === trim.toLowerCase())) {
      current.push(trim);
      onChange({ [champ]: current.join(", ") });
    }
    if (reset) reset();
  };

  const retirerTag = (
    tag: string,
    champ: "metiers" | "domaines" | "entreprisesCiblees",
  ) => {
    const current = profil[champ]
      ? profil[champ]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const next = current.filter(
      (t) => t.toLowerCase() !== tag.toLowerCase().trim(),
    );
    onChange({ [champ]: next.join(", ") });
  };

  const metiersList = (profil.metiers || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const domainesList = (profil.domaines || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const entreprisesList = (profil.entreprisesCiblees || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {/* 1. Postes & Secteurs Cibles */}
      <div className="glass-card p-5 sm:p-6 space-y-5 rounded-2xl border border-border/70 bg-card/80">
        <div className="flex items-center gap-3 border-b border-border/40 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Target className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Postes & Secteurs ciblés
            </h3>
            <p className="text-xs text-muted-foreground">
              Les intitulés et domaines recherchés pour le Match IA
            </p>
          </div>
        </div>

        {/* Métiers recherchés */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-foreground">
            Intitulés de postes / Métiers recherchés *
          </Label>
          <div className="flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-purple-500/50 transition-colors">
            {metiersList.map((m) => (
              <Badge
                key={m}
                variant="secondary"
                className="gap-1 bg-purple-500/15 text-purple-200 border border-purple-500/30 text-xs py-1 px-2.5 rounded-lg"
              >
                {m}
                <button
                  type="button"
                  onClick={() => retirerTag(m, "metiers")}
                  className="rounded-full hover:bg-purple-500/20 p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            <div className="flex-1 min-w-[180px] flex items-center gap-2">
              <input
                type="text"
                value={nouveauMetier}
                onChange={(e) => setNouveauMetier(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    ajouterTag(nouveauMetier, "metiers", () =>
                      setNouveauMetier(""),
                    );
                  }
                }}
                placeholder={
                  metiersList.length === 0
                    ? "Ex : Bras Droit CEO, Chef de Projet, Data Analyst... (Entrée)"
                    : "Ajouter un autre intitulé..."
                }
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {nouveauMetier && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    ajouterTag(nouveauMetier, "metiers", () =>
                      setNouveauMetier(""),
                    )
                  }
                  className="h-6 px-2 text-xs text-purple-400"
                >
                  <Plus className="size-3" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Domaines d'activité */}
        <div className="space-y-2 pt-2 border-t border-border/40">
          <Label className="text-xs font-medium text-foreground">
            Domaines / Secteurs d'activité
          </Label>
          <div className="flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-indigo-500/50 transition-colors">
            {domainesList.map((d) => (
              <Badge
                key={d}
                variant="secondary"
                className="gap-1 bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 text-xs py-1 px-2.5 rounded-lg"
              >
                {d}
                <button
                  type="button"
                  onClick={() => retirerTag(d, "domaines")}
                  className="rounded-full hover:bg-indigo-500/20 p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            <div className="flex-1 min-w-[180px] flex items-center gap-2">
              <input
                type="text"
                value={nouveauDomaine}
                onChange={(e) => setNouveauDomaine(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    ajouterTag(nouveauDomaine, "domaines", () =>
                      setNouveauDomaine(""),
                    );
                  }
                }}
                placeholder={
                  domainesList.length === 0
                    ? "Ex : Tech & SaaS, Finance, Conseil, Luxe... (Entrée)"
                    : "Ajouter un secteur..."
                }
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {nouveauDomaine && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    ajouterTag(nouveauDomaine, "domaines", () =>
                      setNouveauDomaine(""),
                    )
                  }
                  className="h-6 px-2 text-xs text-indigo-400"
                >
                  <Plus className="size-3" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Entreprises spécifiques ciblées */}
        <div className="space-y-2 pt-2 border-t border-border/40">
          <Label className="text-xs font-medium text-foreground">
            Entreprises spécifiques ciblées (Optionnel)
          </Label>
          <div className="flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-blue-500/50 transition-colors">
            {entreprisesList.map((e) => (
              <Badge
                key={e}
                variant="secondary"
                className="gap-1 bg-blue-500/15 text-blue-200 border border-blue-500/30 text-xs py-1 px-2.5 rounded-lg"
              >
                {e}
                <button
                  type="button"
                  onClick={() => retirerTag(e, "entreprisesCiblees")}
                  className="rounded-full hover:bg-blue-500/20 p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            <div className="flex-1 min-w-[180px] flex items-center gap-2">
              <input
                type="text"
                value={nouvelleEntreprise}
                onChange={(e) => setNouvelleEntreprise(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () =>
                      setNouvelleEntreprise(""),
                    );
                  }
                }}
                placeholder="Ex : L'Oréal, BNP Paribas, Doctolib, BCG... (Entrée)"
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {nouvelleEntreprise && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () =>
                      setNouvelleEntreprise(""),
                    )
                  }
                  className="h-6 px-2 text-xs text-blue-400"
                >
                  <Plus className="size-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Type de contrat & Disponibilité */}
      <div className="glass-card p-5 sm:p-6 space-y-5 rounded-2xl border border-border/70 bg-card/80">
        <div className="flex items-center gap-3 border-b border-border/40 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Calendar className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Contrat & Disponibilité
            </h3>
            <p className="text-xs text-muted-foreground">
              Type de contrat, calendrier et rythme de travail
            </p>
          </div>
        </div>

        {/* Type de contrat */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-foreground">
            Type de contrat recherché *
          </Label>
          <div className="flex flex-wrap gap-2">
            {CONTRATS_OPTIONS.map((c) => {
              const selected = (profil.contrats || "").includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    const current = (profil.contrats || "")
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);
                    const next = selected
                      ? current.filter((x) => x !== c)
                      : [...current, c];
                    onChange({ contrats: next.join(", ") || "Stage" });
                  }}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                    selected
                      ? "border-purple-500/50 bg-purple-500/20 text-purple-200 shadow-xs"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {selected && <Check className="size-3.5 inline mr-1" />}
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Date de début souhaitée
            </Label>
            <Input
              value={profil.dateDebut || ""}
              onChange={(e) => onChange({ dateDebut: e.target.value })}
              placeholder="Ex : Dès que possible, Septembre 2026..."
              className="text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">
              Durée souhaitée
            </Label>
            <Input
              value={profil.duree || ""}
              onChange={(e) => onChange({ duree: e.target.value })}
              placeholder="Ex : 6 mois, 1 an..."
              className="text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-emerald-400" /> Rémunération
              min.
            </Label>
            <Input
              value={profil.remuneration || ""}
              onChange={(e) => onChange({ remuneration: e.target.value })}
              placeholder="Ex : 1 200 €/mois, 45 k€..."
              className="text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Mode de travail préféré */}
        <div className="space-y-2 pt-1 border-t border-border/40">
          <Label className="text-xs font-medium text-foreground">
            Mode de travail préféré
          </Label>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
            {MODES_TRAVAIL.map((m) => {
              const selected = (profil.modeTravail || "hybride") === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() =>
                    onChange({ modeTravail: m.id, teletravail: m.label })
                  }
                  className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${
                    selected
                      ? "border-purple-500/50 bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/30"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"
                  }`}
                >
                  <span className="text-base">{m.icone}</span>
                  <span className="text-xs font-semibold text-foreground">
                    {m.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Contexte IA & Critères non négociables */}
      <div className="glass-card p-5 sm:p-6 space-y-4 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-card/80 to-indigo-500/5">
        <div className="flex items-center gap-3 border-b border-purple-500/20 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
            <Sparkles className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              Ce que je recherche vraiment
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]">
                Booster IA
              </Badge>
            </h3>
            <p className="text-xs text-muted-foreground">
              Décrivez librement vos attentes et le type d'équipe idéal pour
              guider l'IA
            </p>
          </div>
        </div>

        <Textarea
          value={profil.rechercheVraie || ""}
          onChange={(e) => onChange({ rechercheVraie: e.target.value })}
          rows={3}
          placeholder="Ex : Je recherche une opportunité avec une forte autonomie sur des projets stratégiques. Une équipe bienveillante, axée sur l'apprentissage et avec des perspectives de recrutement..."
          className="text-xs leading-relaxed border-purple-500/20 bg-background/50 focus-visible:ring-purple-500 rounded-xl"
        />

        <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/40">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">
              Secteurs à éviter
            </Label>
            <Input
              value={(profil as any).secteursEviter || ""}
              onChange={(e) =>
                onChange({
                  // @ts-ignore
                  secteursEviter: e.target.value,
                })
              }
              placeholder="Ex : Tabac, Armement, Grande distribution..."
              className="text-xs rounded-xl border-border/70"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-foreground">
              Critères rédhibitoires
            </Label>
            <Input
              value={(profil as any).redhibitoires || ""}
              onChange={(e) =>
                onChange({
                  // @ts-ignore
                  redhibitoires: e.target.value,
                })
              }
              placeholder="Ex : Pas de présentiel à plus d'1h de trajet..."
              className="text-xs rounded-xl border-border/70"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
