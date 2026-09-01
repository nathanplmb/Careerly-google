import { useState } from "react";
import { Languages, Plus, Trash2, Award, Globe2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  nouvelleLangue,
  type CvLangue,
  type NiveauLangue,
} from "@/lib/cv-structure";

const NIVEAUX_LANGUES: { value: NiveauLangue; label: string; desc: string }[] =
  [
    { value: "Langue maternelle", label: "Langue maternelle", desc: "Natif" },
    {
      value: "Bilingue",
      label: "Bilingue (C2)",
      desc: "Aisance totale et fluide",
    },
    {
      value: "Courant",
      label: "Courant (C1)",
      desc: "Capacité à négocier et travailler",
    },
    {
      value: "Professionnel",
      label: "Professionnel (B2)",
      desc: "Autonomie en réunion et à l'écrit",
    },
    {
      value: "Intermédiaire",
      label: "Intermédiaire (B1)",
      desc: "Compréhension et échanges simples",
    },
    { value: "Notions", label: "Notions (A2/A1)", desc: "Bases élémentaires" },
  ];

const SUGGESTIONS_LANGUES = [
  "Anglais",
  "Français",
  "Espagnol",
  "Allemand",
  "Italien",
  "Mandarin",
  "Arabe",
  "Portugais",
  "Japonais",
  "Russe",
];

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilLanguagesTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const langues = cv?.langues || [];

  const [nouvelleLangueNom, setNouvelleLangueNom] = useState("");
  const [nouveauNiveau, setNouveauNiveau] = useState<NiveauLangue>("Courant");
  const [nouvelleCertif, setNouvelleCertif] = useState("");
  const [nouveauScore, setNouveauScore] = useState("");

  const updateLangues = (nouvellesLangues: CvLangue[]) => {
    const anglaisItem = nouvellesLangues.find((l) =>
      l.nom.toLowerCase().includes("anglais"),
    );
    const languesStr = nouvellesLangues
      .map((l) => `${l.nom} (${l.niveau})`)
      .join(", ");

    onChange({
      langues: languesStr,
      niveauAnglais: anglaisItem?.niveau || profil.niveauAnglais,
      cvStructure: {
        ...cv,
        langues: nouvellesLangues,
      },
    });
  };

  const handleAjouterLangue = () => {
    const nom = nouvelleLangueNom.trim();
    if (!nom) return;

    const nl: CvLangue = {
      id: crypto.randomUUID(),
      nom,
      niveau: nouveauNiveau,
      certification: nouvelleCertif.trim() || undefined,
      score: nouveauScore.trim() || undefined,
    };

    updateLangues([...langues, nl]);
    setNouvelleLangueNom("");
    setNouvelleCertif("");
    setNouveauScore("");
  };

  const handleSupprimerLangue = (id: string) => {
    updateLangues(langues.filter((l) => l.id !== id));
  };

  const handleModifierNiveau = (id: string, niveau: NiveauLangue) => {
    updateLangues(langues.map((l) => (l.id === id ? { ...l, niveau } : l)));
  };

  const handleModifierScore = (id: string, certif?: string, score?: string) => {
    updateLangues(
      langues.map((l) =>
        l.id === id ? { ...l, certification: certif, score } : l,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Formulaire d'ajout rapide */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Globe2 className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Langues & Niveaux CECRL ({langues.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Précisez vos langues de travail, niveaux d'aisance et scores
              certifiés
            </p>
          </div>
        </div>

        {/* Suggestions rapides de langues */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Suggestions rapides :
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS_LANGUES.map((sug) => {
              const alreadyAdded = langues.some(
                (l) => l.nom.toLowerCase() === sug.toLowerCase(),
              );
              return (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setNouvelleLangueNom(sug)}
                  disabled={alreadyAdded}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    alreadyAdded
                      ? "opacity-40 cursor-not-allowed border-border/50 text-muted-foreground"
                      : "border-border/70 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-foreground"
                  }`}
                >
                  + {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Champs d'ajout */}
        <div className="grid gap-3 sm:grid-cols-4 items-end">
          <div className="space-y-1.5 sm:col-span-1">
            <Label className="text-xs text-foreground font-medium">
              Langue *
            </Label>
            <Input
              value={nouvelleLangueNom}
              onChange={(e) => setNouvelleLangueNom(e.target.value)}
              placeholder="Ex: Anglais, Espagnol..."
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label className="text-xs text-foreground font-medium">
              Niveau CECRL
            </Label>
            <Select
              value={nouveauNiveau}
              onValueChange={(val) => setNouveauNiveau(val as NiveauLangue)}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NIVEAUX_LANGUES.map((n) => (
                  <SelectItem key={n.value} value={n.value} className="text-xs">
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label className="text-xs text-muted-foreground">
              Certif & Score (optionnel)
            </Label>
            <Input
              value={nouveauScore}
              onChange={(e) => setNouveauScore(e.target.value)}
              placeholder="Ex: TOEIC 945, IELTS 7.5..."
              className="text-xs"
            />
          </div>

          <Button
            size="sm"
            onClick={handleAjouterLangue}
            disabled={!nouvelleLangueNom.trim()}
            className="gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs h-10 w-full"
          >
            <Plus className="size-3.5" />
            Ajouter la langue
          </Button>
        </div>
      </div>

      {/* 2. Liste des Langues enregistrées */}
      <div className="space-y-3">
        {langues.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6 glass-card">
            Aucune langue enregistrée. L'anglais et votre langue maternelle sont
            essentiels pour le Match IA.
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {langues.map((l) => (
            <div
              key={l.id}
              className="glass-card p-4 rounded-xl border border-border/70 flex items-center justify-between gap-3 bg-card/60"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground truncate">
                    {l.nom}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                  >
                    {l.niveau}
                  </Badge>
                </div>
                {l.score && (
                  <span className="text-xs text-purple-300 block font-medium">
                    🏆 {l.score}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={l.niveau}
                  onValueChange={(val) =>
                    handleModifierNiveau(l.id, val as NiveauLangue)
                  }
                >
                  <SelectTrigger className="h-7 w-28 text-[11px] border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NIVEAUX_LANGUES.map((n) => (
                      <SelectItem
                        key={n.value}
                        value={n.value}
                        className="text-xs"
                      >
                        {n.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSupprimerLangue(l.id)}
                  className="size-7 p-0 text-muted-foreground hover:text-rose-400"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
