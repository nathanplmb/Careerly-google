import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CvUpload } from "./CvUpload";
import { CvAnalysisProgress } from "./CvAnalysisProgress";
import { CvImportPreview } from "./CvImportPreview";
import { extraireTexteFichier } from "@/lib/cv-fichier";
import { extraireCvServeur } from "@/lib/cv-import.functions";
import { mergeCvImportWithProfil } from "@/ai/cv-import/cvImport.mapper";
import type {
  CvImportStep,
  CvImportResult,
} from "@/ai/cv-import/cvImport.types";
import type { Profil } from "@/lib/profil";

interface CvImporterProps {
  existingProfil?: Profil | null;
  onImportComplete: (patch: Partial<Profil>) => Promise<void> | void;
  onCancel: () => void;
}

export function CvImporter({
  existingProfil,
  onImportComplete,
  onCancel,
}: CvImporterProps) {
  const [status, setStatus] = useState<CvImportStep>("idle");
  const [result, setResult] = useState<CvImportResult | null>(null);
  const [isPersisting, setIsPersisting] = useState(false);

  const importMutation = useMutation({
    mutationFn: async ({ file, text }: { file?: File; text?: string }) => {
      let rawText = text || "";

      if (file) {
        setStatus("reading");
        rawText = await extraireTexteFichier(file);
      }

      setStatus("identifying");
      await new Promise((resolve) => setTimeout(resolve, 500));

      setStatus("structuring");
      // Appel du service serveur
      const extractionResult = await extraireCvServeur({
        data: { text: rawText },
      });

      setStatus("verifying");
      await new Promise((resolve) => setTimeout(resolve, 400));

      return extractionResult;
    },
    onSuccess: (data) => {
      setResult(data);
      setStatus("preview");
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'analyse du CV.",
      );
      setStatus("error");
    },
  });

  const handleConfirm = async (finalData: CvImportResult) => {
    setIsPersisting(true);
    try {
      const patch = mergeCvImportWithProfil(finalData, existingProfil);
      await Promise.resolve(onImportComplete(patch));

      const countExp = finalData.experiences.length;
      const countEdu = finalData.education.length;
      toast.success(
        `CV importé avec succès ! (${countExp} expérience${countExp > 1 ? "s" : ""}, ${countEdu} formation${countEdu > 1 ? "s" : ""})`,
      );
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de l'intégration des données au profil.");
    } finally {
      setIsPersisting(false);
    }
  };

  const handleFileSelected = (file: File) => {
    setStatus("reading");
    importMutation.mutate({ file });
  };

  const handleTextSelected = (text: string) => {
    setStatus("reading");
    importMutation.mutate({ text });
  };

  const isProcessing = [
    "reading",
    "identifying",
    "structuring",
    "verifying",
  ].includes(status);

  return (
    <div className="w-full">
      {status === "idle" || status === "error" ? (
        <CvUpload
          onFileSelected={handleFileSelected}
          onTextSelected={handleTextSelected}
          disabled={importMutation.isPending}
        />
      ) : isProcessing ? (
        <CvAnalysisProgress status={status} />
      ) : status === "preview" && result ? (
        <CvImportPreview
          result={result}
          onConfirm={handleConfirm}
          onCancel={onCancel}
          isSubmitting={isPersisting}
        />
      ) : null}
    </div>
  );
}
