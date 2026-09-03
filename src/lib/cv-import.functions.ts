import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
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

export const extraireCvServeur = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => ImportCVInput.parse(data))
  .handler(async ({ data }): Promise<CvImportResult> => {
    const rawText = data.text || data.doc?.plainText || "";
    if (!rawText || rawText.trim().length < 20) {
      throw new Error(
        "Aucun texte exploitable n'a été transmis pour l'analyse.",
      );
    }

    const { parseAndExtractCV } =
      await import("@/ai/cv-import/cvImport.service");
    const result = await parseAndExtractCV(rawText);

    return result;
  });
