import { useState } from "react";
import {
  Compass,
  Target,
  Building2,
  Calendar,
  DollarSign,
  Laptop,
  Sparkles,
  HeartHandshake,
  Plus,
  X,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Profil } from "@/lib/profil";
import { ProfilTagSuggestions } from "./ProfilTagSuggestions";

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
  { id: "hybride", label: "Hybride (Télétravail + Bureau)", icone: "🏢" },
  { id: "full_remote", label: "100% Télétravail / Full Remote", icone: "💻" },
  { id: "presentiel", label: "Présentiel complet", icone: "👥" },
  { id: "indifferent", label: "Indifférent", icone: "✨" },
];

const ENVIRONNEMENTS_OPTIONS = [
  "Grand groupe",
  "Scale-up",
  "Startup",
  "Cabinet de conseil",
  "Banque / Finance",
  "PME / ETI",
  "Secteur public / ONG",
  "Tech / SaaS",
];

const PRIORITES_OPTIONS = [
  "Missions apprenantes & formatrices",
  "Mentorat & Management bienveillant",
  "Perspectives de recrutement (CDI à la clé)",
  "Rémunération attractive / Bonus",
  "Culture d'entreprise & Équilibre de vie",
  "Impact écologique / RSE",
  "Exposition internationale",
  "Autonomie & Prise de décision",
];

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilObjectivesTab({ profil, onChange }: Props) {
  const [nouveauMetier, setNouveauMetier] = useState("");
  const [nouveauDomaine, setNouveauDomaine] = useState("");
  const [nouvelleEntreprise, setNouvelleEntreprise] = useState("");

  const environnements = profil.environnements ?? ["Grand groupe", "Scale-up"];
  const priorites = profil.prioritesRecherche ?? [
    "Missions apprenantes & formatrices",
    "Mentorat & Management bienveillant",
  ];

  const toggleEnvironnement = (env: string) => {
    const exists = environnements.includes(env);
    const next = exists
      ? environnements.filter((e) => e !== env)
      : [...environnements, env];
    onChange({ environnements: next });
  };

  const togglePriorite = (prio: string) => {
    const exists = priorites.includes(prio);
    const next = exists
      ? priorites.filter((p) => p !== prio)
      : [...priorites, prio];
    onChange({ prioritesRecherche: next });
  };

  const ajouterTag = (
    val: string,
    champ: "metiers" | "domaines" | "entreprisesCiblees",
    reset: () => void,
  ) => {
    const trim = val.trim();
    if (!trim) return;
    const current = profil[champ]
      ? profil[champ]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    if (!current.includes(trim)) {
      current.push(trim);
      onChange({ [champ]: current.join(", ") });
    }
    reset();
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
    const next = current.filter((t) => t !== tag);
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
      {/* 1. Métiers & Secteurs Ciblés */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Target className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Métiers & Secteurs Cibles
            </h3>
            <p className="text-xs text-muted-foreground">
              Les intitulés de postes et domaines d'activité que le Match IA
              doit cibler en priorité
            </p>
          </div>
        </div>

        {/* Métiers ciblés */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Intitulés de postes / Métiers recherchés *
          </Label>
          <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50">
            {metiersList.map((m) => (
              <Badge
                key={m}
                variant="secondary"
                className="gap-1.5 bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs py-1 px-2.5"
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
            <div className="flex-1 min-w-[200px] flex items-center gap-2">
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
                placeholder="Ajouter un métier (ex: Bras Droit, Chef de Produit, Analyste M&A...) et tapez Entrée"
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
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
            </div>
          </div>
          <ProfilTagSuggestions
            categorie="metiers"
            valeurActuelle={profil.metiers}
            onSelectSuggestion={(val) => {
              const current = profil.metiers
                ? profil.metiers
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];
              if (!current.includes(val)) {
                onChange({ metiers: [...current, val].join(", ") });
              }
            }}
          />
        </div>

        {/* Domaines d'activité */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Domaines / Secteurs d'activité
          </Label>
          <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50">
            {domainesList.map((d) => (
              <Badge
                key={d}
                variant="secondary"
                className="gap-1.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 text-xs py-1 px-2.5"
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
            <div className="flex-1 min-w-[200px] flex items-center gap-2">
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
                placeholder="Ajouter un secteur (ex: Tech / SaaS, Conseil, Finance, Luxe...) et tapez Entrée"
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
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
            </div>
          </div>
          <ProfilTagSuggestions
            categorie="domaines"
            valeurActuelle={profil.domaines}
            onSelectSuggestion={(val) => {
              const current = profil.domaines
                ? profil.domaines
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];
              if (!current.includes(val)) {
                onChange({ domaines: [...current, val].join(", ") });
              }
            }}
          />
        </div>

        {/* Entreprises ciblées */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Entreprises spécifiques ciblées (Dream Companies)
          </Label>
          <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50">
            {entreprisesList.map((e) => (
              <Badge
                key={e}
                variant="secondary"
                className="gap-1.5 bg-blue-500/15 text-blue-300 border border-blue-500/20 text-xs py-1 px-2.5"
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
            <div className="flex-1 min-w-[200px] flex items-center gap-2">
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
                placeholder="Ex : L'Oréal, BNP Paribas, Doctolib, BCG, Alan... et tapez Entrée"
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
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
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modalités de contrat & Calendrier */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Calendar className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Type de contrat & Calendrier de recherche
            </h3>
            <p className="text-xs text-muted-foreground">
              Format de la mission, dates de disponibilité et durée souhaitée
            </p>
          </div>
        </div>

        {/* Type de contrat */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
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
                      ? "border-purple-500/40 bg-purple-500/20 text-purple-200 shadow-xs"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/80 hover:text-foreground"
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
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Date de début souhaitée
            </Label>
            <Input
              value={profil.dateDebut}
              onChange={(e) => onChange({ dateDebut: e.target.value })}
              placeholder="Ex : Janvier 2026, Septembre..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Durée souhaitée
            </Label>
            <Input
              value={profil.duree}
              onChange={(e) => onChange({ duree: e.target.value })}
              placeholder="Ex : 6 mois, 12 à 24 mois..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-emerald-400" /> Rémunération
              min.
            </Label>
            <Input
              value={profil.remuneration}
              onChange={(e) => onChange({ remuneration: e.target.value })}
              placeholder="Ex : 1200 €/mois, 45k€..."
            />
          </div>
        </div>

        {/* Mode de travail */}
        <div className="space-y-2 pt-2">
          <Label className="text-xs text-muted-foreground">
            Mode de travail préféré
          </Label>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {MODES_TRAVAIL.map((m) => {
              const selected = (profil.modeTravail || "hybride") === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() =>
                    onChange({ modeTravail: m.id, teletravail: m.label })
                  }
                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                    selected
                      ? "border-purple-500/40 bg-purple-500/15 text-purple-200"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"
                  }`}
                >
                  <span className="text-base">{m.icone}</span>
                  <span className="text-xs font-semibold">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Environnements d'entreprise & Priorités */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Building2 className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Environnements & Critères Prioritaires
            </h3>
            <p className="text-xs text-muted-foreground">
              La taille de structure et les valeurs qui comptent le plus pour
              vous
            </p>
          </div>
        </div>

        {/* Environnements */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Types de structures privilégiées
          </Label>
          <div className="flex flex-wrap gap-2">
            {ENVIRONNEMENTS_OPTIONS.map((env) => {
              const selected = environnements.includes(env);
              return (
                <button
                  key={env}
                  type="button"
                  onClick={() => toggleEnvironnement(env)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                    selected
                      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"
                  }`}
                >
                  {selected && <Check className="size-3.5 inline mr-1" />}
                  {env}
                </button>
              );
            })}
          </div>
        </div>

        {/* Priorités */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Vos priorités absolues dans une opportunité
          </Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {PRIORITES_OPTIONS.map((prio) => {
              const selected = priorites.includes(prio);
              return (
                <button
                  key={prio}
                  type="button"
                  onClick={() => togglePriorite(prio)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
                    selected
                      ? "border-purple-500/40 bg-purple-500/15 text-purple-200 font-semibold"
                      : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`size-3.5 rounded-full border flex items-center justify-center ${selected ? "border-purple-400 bg-purple-500 text-white" : "border-muted-foreground/40"}`}
                  >
                    {selected && <Check className="size-2.5" />}
                  </span>
                  <span>{prio}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Ce que je recherche vraiment (Zone libre stratégique pour l'IA) */}
      <div className="glass-card p-5 sm:p-6 space-y-4 border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-card/60 to-indigo-500/5">
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
              Expliquez avec vos propres mots ce qui vous motive, vos ambitions
              et le type d'équipe idéale
            </p>
          </div>
        </div>

        <Textarea
          value={profil.rechercheVraie || ""}
          onChange={(e) => onChange({ rechercheVraie: e.target.value })}
          rows={4}
          placeholder="Ex : Je recherche un stage où je serai au contact direct de la direction ou des fondateurs, avec une vraie autonomie sur les sujets opérationnels. J'aimerais particulièrement travailler sur le lancement de nouveaux produits ou l'expansion internationale, dans une ambiance bienveillante mais stimulante..."
          className="text-xs leading-relaxed border-purple-500/20 bg-background/50 focus-visible:ring-purple-500"
        />
        <p className="text-[11px] text-muted-foreground">
          ✨ Ce paragraphe est directement injecté dans le contexte du Match IA,
          de la rédaction des lettres de motivation, des messages LinkedIn et du
          Coach d'entretien.
        </p>
      </div>
    </div>
  );
}
