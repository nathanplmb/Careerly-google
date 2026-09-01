import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CvUpload } from "./CvUpload";
import { CvAnalysisProgress } from "./CvAnalysisProgress";
import { CvImportPreview } from "./CvImportPreview";
import { readCVDocument } from "@/lib/cv-import/document";
import { extraireCvServeur } from "@/lib/cv-import.functions";
import { mapImportResultToProfilePatch } from "@/lib/cv-import/mapper";
import type { CVImportFlowStatus, CVImportResult } from "@/lib/cv-import/types";
import type { Profil } from "@/lib/profil";

interface CvImporterProps {
  existingProfil?: Profil;
  onImportComplete: (patch: Partial<Profil>) => void;
  onCancel: () => void;
}

export function CvImporter({ existingProfil, onImportComplete, onCancel }: CvImporterProps) {
  const [status, setStatus] = useState<CVImportFlowStatus>("idle");
  const [result, setResult] = useState<CVImportResult | null>(null);

  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      setStatus("reading");
      const doc = await readCVDocument(file);
      
      setStatus("segmenting");
      await new Promise((resolve) => setTimeout(resolve, 800)); // Transition visuelle
      
      setStatus("analyzing");
      
      // Appel du serveur
      const extractionResult = await extraireCvServeur({ data: { doc } });
      
      setStatus("validating");
      await new Promise((resolve) => setTimeout(resolve, 600)); // Transition visuelle
      
      return extractionResult;
    },
    onSuccess: (data) => {
      setResult(data);
      setStatus("preview");
    },
    onError: (err) => {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'analyse");
      setStatus("error");
    },
  });

  const handleConfirm = () => {
    if (!result) return;
    try {
      // Pour l'instant, on n'affiche pas l'écran de diff avancé. On map et on sauvegarde
      const patch = mapImportResultToProfilePatch(result);
      onImportComplete(patch);
      toast.success("CV importé avec succès !");
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de l'intégration au profil");
    }
  };

  const handleFileSelected = (file: File) => {
    setStatus("uploading");
    importMutation.mutate(file);
  };

  const isProcessing = ["reading", "segmenting", "analyzing", "validating"].includes(status);

  return (
    <div className="w-full">
      {status === "idle" || status === "error" || status === "uploading" ? (
        <CvUpload onFileSelected={handleFileSelected} disabled={importMutation.isPending} />
      ) : isProcessing ? (
        <CvAnalysisProgress status={status} />
      ) : status === "preview" && result ? (
        <CvImportPreview 
          result={result} 
          onConfirm={handleConfirm}
          onCancel={onCancel} 
        />
      ) : null}
    </div>
  );
}
