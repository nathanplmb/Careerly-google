import { useState } from "react";
import {
  Award,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Profil } from "@/lib/profil";
import {
  nouvelleCertification,
  type CvCertification,
} from "@/lib/cv-structure";

const SUGGESTIONS_CERTIFS = [
  "AMF (Autorité des Marchés Financiers)",
  "CFA Level 1",
  "Bloomberg Market Concepts (BMC)",
  "AWS Certified Cloud Practitioner",
  "Google Analytics Certification",
  "Google Cloud Digital Leader",
  "Microsoft Excel Expert (MO-201)",
  "Scrum Master (PSM I)",
  "HubSpot Inbound Marketing",
  "SQL / DataCamp Data Analyst",
];

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilCertificationsTab({ profil, onChange }: Props) {
  const cv = profil.cvStructure;
  const certifs = cv?.certifications || [];

  const [nouveauNom, setNouveauNom] = useState("");
  const [nouvelOrganisme, setNouvelOrganisme] = useState("");
  const [nouvelleDate, setNouvelleDate] = useState("");
  const [nouveauLien, setNouveauLien] = useState("");
  const [nouveauIdentifiant, setNouveauIdentifiant] = useState("");

  const updateCertifs = (nouvellesCertifs: CvCertification[]) => {
    onChange({
      cvStructure: {
        ...cv,
        certifications: nouvellesCertifs,
      },
    });
  };

  const handleAjouterCertif = () => {
    const nom = nouveauNom.trim();
    if (!nom) return;

    const nc: CvCertification = {
      id: crypto.randomUUID(),
      nom,
      organisme: nouvelOrganisme.trim() || undefined,
      date: nouvelleDate.trim() || undefined,
      lien: nouveauLien.trim() || undefined,
      identifiant: nouveauIdentifiant.trim() || undefined,
    };

    updateCertifs([nc, ...certifs]);
    setNouveauNom("");
    setNouvelOrganisme("");
    setNouvelleDate("");
    setNouveauLien("");
    setNouveauIdentifiant("");
  };

  const handleSupprimerCertif = (id: string) => {
    updateCertifs(certifs.filter((c) => c.id !== id));
  };

  const handleModifierCertif = (
    id: string,
    patch: Partial<CvCertification>,
  ) => {
    updateCertifs(certifs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  return (
    <div className="space-y-6">
      {/* 1. Formulaire d'ajout de Certification */}
      <div className="glass-card p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-border/50 pb-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Award className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Certifications Professionnelles & Accréditations ({certifs.length}
              )
            </h3>
            <p className="text-xs text-muted-foreground">
              Valorisez vos diplômes certifiants, certifications tech, finance,
              marketing ou cloud
            </p>
          </div>
        </div>

        {/* Suggestions rapides */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Certifications reconnues :
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS_CERTIFS.map((sug) => {
              const alreadyAdded = certifs.some(
                (c) => c.nom.toLowerCase() === sug.toLowerCase(),
              );
              return (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setNouveauNom(sug)}
                  disabled={alreadyAdded}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    alreadyAdded
                      ? "opacity-40 cursor-not-allowed border-border/50 text-muted-foreground"
                      : "border-border/70 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-foreground"
                  }`}
                >
                  + {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Formulaire d'ajout complet */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs text-foreground font-medium">
              Intitulé de la Certification *
            </Label>
            <Input
              value={nouveauNom}
              onChange={(e) => setNouveauNom(e.target.value)}
              placeholder="Ex: Certification AMF, AWS Solutions Architect..."
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Organisme émetteur
            </Label>
            <Input
              value={nouvelOrganisme}
              onChange={(e) => setNouvelOrganisme(e.target.value)}
              placeholder="Ex: Autorité des Marchés Financiers, Amazon Web Services..."
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Date d'obtention
            </Label>
            <Input
              value={nouvelleDate}
              onChange={(e) => setNouvelleDate(e.target.value)}
              placeholder="Ex: Mars 2024 ou 2024"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Numéro / ID de licence
            </Label>
            <Input
              value={nouveauIdentifiant}
              onChange={(e) => setNouveauIdentifiant(e.target.value)}
              placeholder="Ex: AMF-2024-98421"
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Lien de vérification (Badge / URL)
            </Label>
            <Input
              value={nouveauLien}
              onChange={(e) => setNouveauLien(e.target.value)}
              placeholder="https://credly.com/..."
              className="text-xs"
            />
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleAjouterCertif}
          disabled={!nouveauNom.trim()}
          className="gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs w-full sm:w-auto"
        >
          <Plus className="size-3.5" />
          Ajouter la certification
        </Button>
      </div>

      {/* 2. Liste des Certifications enregistrées */}
      <div className="space-y-3">
        {certifs.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6 glass-card">
            Aucune certification enregistrée. Une certification officielle
            apporte une crédibilité immédiate à votre profil !
          </p>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {certifs.map((c) => (
            <div
              key={c.id}
              className="glass-card p-4 rounded-xl border border-border/70 flex flex-col justify-between gap-3 bg-card/60"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Award className="size-3.5" />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {c.nom}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSupprimerCertif(c.id)}
                    className="size-6 p-0 text-muted-foreground hover:text-rose-400 shrink-0"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  {c.organisme && (
                    <p className="flex items-center gap-1.5">
                      <Building className="size-3 text-muted-foreground/70" />
                      <span>{c.organisme}</span>
                    </p>
                  )}
                  {c.date && (
                    <p className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-muted-foreground/70" />
                      <span>Obtenu en : {c.date}</span>
                    </p>
                  )}
                  {c.identifiant && (
                    <p className="text-[11px] font-mono text-purple-300">
                      ID : {c.identifiant}
                    </p>
                  )}
                </div>
              </div>

              {c.lien && (
                <a
                  href={c.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300"
                >
                  <ExternalLink className="size-3" />
                  <span>Vérifier l'authenticité</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
