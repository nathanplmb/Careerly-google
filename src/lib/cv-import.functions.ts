import { z } from "zod";
import type { CvImportResult } from "@/ai/cv-import/cvImport.types";

const ImportCVInput = z.object({
  doc: z
    .object({
      fileName: z.string().optional(),
      fileSize: z.number().optional(),
      fileType: z.string().optional(),
      plainText: z.string().min(20),
    })
    .optional(),
  text: z.string().min(20).optional(),
});

export const extraireCvServeur = async ({ data }: { data: unknown }): Promise<CvImportResult> => {
  const parsedData = ImportCVInput.parse(data);
  const rawText = parsedData.text || parsedData.doc?.plainText || "";
  
  if (!rawText || rawText.trim().length < 20) {
    throw new Error(
      "Aucun texte exploitable n'a été transmis pour l'analyse.",
    );
  }
  
  const { parseAndExtractCV } = await import("@/ai/cv-import/cvImport.service");
  const result = await parseAndExtractCV(rawText);
  return result;
};
