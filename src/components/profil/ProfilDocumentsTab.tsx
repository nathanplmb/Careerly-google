import { useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  FileCode,
  Eye,
  CheckCircle2,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Profil } from "@/lib/profil";
import { cvStructureEnTexte, normaliserCvStructure } from "@/lib/cv-structure";
import { CvBuilder } from "@/components/CvBuilder";
import { CvImporter } from "@/components/cv-import/CvImporter";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
};

export function ProfilDocumentsTab({ profil, onChange }: Props) {
  const [modeVue, setModeVue] = useState<"editeur" | "texte">("editeur");
  const [copie, setCopie] = useState(false);
  const [showImporter, setShowImporter] = useState(false);

  const cv = normaliserCvStructure(profil.cvStructure);
  const texteCv = cvStructureEnTexte(cv);

  const copierTexte = () => {
    navigator.clipboard.writeText(texteCv);
    setCopie(true);
    toast.success("Texte complet du profil copié dans le presse-papier !");
    setTimeout(() => setCopie(false), 2000);
  };

  const exporterJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(profil, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `careerly-profil-${(profil.nom || "candidat").toLowerCase()}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Profil exporté au format JSON !");
  };

  return (
    <div className="space-y-6">
      {/* Bannière Import & Export IA */}
      <div className="glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-card/60 to-indigo-500/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold">
              Source de vérité NACORA
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-purple-400" />
            CV Structuré & Import / Export
          </h3>
          <p className="text-xs text-muted-foreground max-w-xl">
            Importez un CV existant (PDF, Word ou texte collé) pour extraire
            automatiquement et fidèlement toutes vos informations dans votre
            profil NACORA.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={() => setShowImporter(true)}
            className="gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs shadow-sm shadow-purple-600/30"
          >
            <UploadCloud className="size-3.5" />
            Importer un CV
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={exporterJson}
            className="gap-1.5 border-border/70 text-xs"
          >
            <Download className="size-3.5" />
            Exporter JSON
          </Button>
        </div>
      </div>

      {/* Panneau d'importation CV */}
      {showImporter && (
        <div className="glass-card p-6 border-purple-500/40 bg-card/95 shadow-xl relative animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <span className="flex size-7 rounded-lg bg-purple-500/20 text-purple-400 items-center justify-center">
                <UploadCloud className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Module CV Importer IA
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Extraction exhaustive sans perte, compatible PDF, DOCX et
                  texte.
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowImporter(false)}
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          </div>

          <CvImporter
            existingProfil={profil}
            onImportComplete={(patch) => {
              onChange(patch);
              setShowImporter(false);
            }}
            onCancel={() => setShowImporter(false)}
          />
        </div>
      )}

      {/* Switcher Editeur Rapide / Vue Texte IA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={modeVue === "editeur" ? "secondary" : "ghost"}
            onClick={() => setModeVue("editeur")}
            className="gap-1.5 text-xs h-8"
          >
            <FileCode className="size-3.5" />
            Éditeur structuré avancé
          </Button>
          <Button
            size="sm"
            variant={modeVue === "texte" ? "secondary" : "ghost"}
            onClick={() => setModeVue("texte")}
            className="gap-1.5 text-xs h-8"
          >
            <Eye className="size-3.5" />
            Aperçu Texte IA (Contexte injecté)
          </Button>
        </div>

        {modeVue === "texte" && (
          <Button
            size="sm"
            variant="outline"
            onClick={copierTexte}
            className="gap-1.5 text-xs h-8"
          >
            {copie ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copie ? "Copié" : "Copier le texte"}
          </Button>
        )}
      </div>

      {modeVue === "editeur" ? (
        <CvBuilder
          value={cv}
          onChange={(nouvCv) => onChange({ cvStructure: nouvCv })}
        />
      ) : (
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-2">
            <CheckCircle2 className="size-3.5 text-emerald-400" />
            Voici exactement les données transmises au modèle IA lors de
            l'analyse d'offres et de la génération de candidatures.
          </div>
          <pre className="font-mono text-xs text-muted-foreground/90 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto bg-background/50 p-4 rounded-xl border border-border/50">
            {texteCv || "Profil vide pour le moment."}
          </pre>
        </div>
      )}
    </div>
  );
}
