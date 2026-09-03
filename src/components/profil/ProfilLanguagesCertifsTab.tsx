import { useState } from "react";
import {
  Languages,
  Award,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  Calendar,
  Globe,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Profil } from "@/lib/profil";
import {
  NIVEAUX_LANGUE,
  nouvelleCertification,
  nouvelleLangue,
  type CvCertification,
  type CvLangue,
  type NiveauLangue,
} from "@/lib/cv-structure";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilLanguagesCertifsTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const languesList = cv?.langues || [];
  const certifsList = cv?.certifications || [];

  const [nouvelleLangueNom, setNouvelleLangueNom] = useState("");
  const [niveauLangueSelect, setNiveauLangueSelect] = useState<NiveauLangue>(
    "Courant (C1)" as any,
  );
  const [scoreOfficiel, setScoreOfficiel] = useState("");

  const updateLangues = (nouvelles: CvLangue[]) => {
    const resumeText = nouvelles
      .map((l) => `${(l as any).langue} (${l.niveau || "Courant"})`)
      .join(", ");
    onChange({
      langues: resumeText || profi(l as any).langues,
      cvStructure: {
        ...cv,
        langues: nouvelles,
      },
    });
  };

  const updateCertifications = (nouvelles: CvCertification[]) => {
    onChange({
      cvStructure: {
        ...cv,
        certifications: nouvelles,
      },
    });
  };

  const handleAjouterLangue = () => {
    if (!nouvelleLangueNom.trim()) return;
    const nl: CvLangue = {
      id: crypto.randomUUID(),
      // @ts-ignore
      langue: nouvelleLangueNom.trim(),
      niveau: niveauLangueSelect,
      score: scoreOfficiel.trim() || undefined,
    };
    updateLangues([...languesList, nl]);
    setNouvelleLangueNom("");
    setScoreOfficiel("");
  };

  const handleSupprimerLangue = (id: string) => {
    updateLangues(languesList.filter((l) => l.id !== id));
  };

  const handleAjouterCertif = () => {
    const nc = nouvelleCertification();
    updateCertifications([...certifsList, nc]);
  };

  const handleSupprimerCertif = (id: string) => {
    updateCertifications(certifsList.filter((c) => c.id !== id));
  };

  const handleModifierCertif = (
    id: string,
    patch: Partial<CvCertification>,
  ) => {
    updateCertifications(
      certifsList.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Langues & Niveaux CECRL */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Languages className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Langues Maîtrisées ({languesList.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Évaluez votre niveau sur l'échelle CECRL et mentionnez vos scores
              officiels (TOEIC, TOEFL...)
            </p>
          </div>
        </div>

        {/* Formulaire ajout langue */}
        <div className="grid gap-3 sm:grid-cols-4 items-end">
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs text-muted-foreground">Langue</Label>
            <Input
              value={nouvelleLangueNom}
              onChange={(e) => setNouvelleLangueNom(e.target.value)}
              placeholder="Ex : Anglais, Espagnol, Allemand, Chinois..."
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Niveau CECRL
            </Label>
            <Select
              value={niveauLangueSelect}
              onValueChange={(v) => setNiveauLangueSelect(v as NiveauLangue)}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NIVEAUX_LANGUE.map((n) => (
                  <SelectItem key={n} value={n} className="text-xs">
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            onClick={handleAjouterLangue}
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white h-10 px-4"
          >
            <Plus className="size-4" />
            Ajouter
          </Button>
        </div>

        {/* Liste des langues */}
        {languesList.length > 0 && (
          <div className="grid gap-2.5 sm:grid-cols-2 pt-2">
            {languesList.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/60 p-3"
              >
                <div className="space-y-0.5 min-w-0">
                  <span className="font-semibold text-xs text-foreground block truncate">
                    {lang.langue}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-indigo-400 font-medium">
                      {lang.niveau}
                    </span>
                    {lang.score && (
                      <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                        Score : {lang.score}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSupprimerLangue(lang.id)}
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-rose-400"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Certifications Professionnelles & Diplômes d'Excellence */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Award className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Certifications & Accréditations ({certifsList.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                AMF, Bloomberg, Google, CFA, AWS, HubSpot, Microsoft, Scrum...
              </p>
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleAjouterCertif}
            className="gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs"
          >
            <Plus className="size-3.5" />
            Ajouter une certification
          </Button>
        </div>

        {certifsList.length === 0 && (
          <div className="text-center py-6 text-xs text-muted-foreground space-y-2">
            <p>Aucune certification ajoutée pour le moment.</p>
            <p className="text-[11px]">
              💡 Les certifications professionnelles attestent de vos
              compétences opérationnelles dès le premier tri.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {certifsList.map((cert) => (
            <div
              key={cert.id}
              className="rounded-xl border border-border/70 bg-card/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Input
                  value={cert.nom}
                  onChange={(e) =>
                    handleModifierCertif(cert.id, { nom: e.target.value })
                  }
                  placeholder="Nom de la certification (ex: Certification AMF, Google Data Analytics...)"
                  className="text-xs font-semibold"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSupprimerCertif(cert.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Input
                  value={cert.emetteur || ""}
                  onChange={(e) =>
                    handleModifierCertif(cert.id, {
                      // @ts-ignore
                      emetteur: e.target.value,
                    })
                  }
                  placeholder="Organisme (ex: Google, CFA Institute, Bloomberg...)"
                  className="text-xs"
                />
                <Input
                  value={cert.annee || ""}
                  onChange={(e) =>
                    handleModifierCertif(cert.id, {
                      // @ts-ignore
                      annee: e.target.value,
                    })
                  }
                  placeholder="Année / Date d'obtention (ex: 2024)"
                  className="text-xs"
                />
                <Input
                  value={cert.url || ""}
                  onChange={(e) =>
                    handleModifierCertif(cert.id, {
                      // @ts-ignore
                      url: e.target.value,
                    })
                  }
                  placeholder="Lien / URL de vérification (optionnel)"
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
