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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Profil } from "@/lib/profil";
import { cvStructureEnTexte, normaliserCvStructure } from "@/lib/cv-structure";
import { CvBuilder } from "@/components/CvBuilder";

type Props = {
  profil: Profil;
  onChange: (patch: Partial<Profil>) => void;
  onOpenCvModal: () => void;
};

export function ProfilDocumentsTab({ profil, onChange, onOpenCvModal }: Props) {
  const [modeVue, setModeVue] = useState<"editeur" | "texte">("editeur");
  const [copie, setCopie] = useState(false);

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
              Source de vérité Careerly
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-4 text-purple-400" />
            CV Structuré & Export de données
          </h3>
          <p className="text-xs text-muted-foreground max-w-xl">
            Importez un CV existant pour extraire automatiquement les
            informations ou téléchargez votre profil pour l'utiliser sur
            d'autres plateformes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={onOpenCvModal}
            className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs"
          >
            <FileText className="size-4" />
            Importer un CV (PDF / Word)
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
