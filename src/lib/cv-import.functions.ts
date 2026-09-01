import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import type { CVImportResult } from "./cv-import/types";

const ImportCVInput = z.object({
  doc: z.object({
    fileName: z.string(),
    fileSize: z.number(),
    fileType: z.enum(["pdf", "docx", "txt", "rtf", "autre"]),
    pages: z.array(
      z.object({
        pageNumber: z.number(),
        blocks: z.array(
          z.object({
            text: z.string(),
            x: z.number().optional(),
            y: z.number().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            page: z.number().optional(),
          }),
        ),
        text: z.string(),
      }),
    ),
    plainText: z.string().min(20),
  }),
});

export const extraireCvServeur = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: unknown) => ImportCVInput.parse(data))
  .handler(async ({ data, context }): Promise<CVImportResult> => {
    const { consommerQuota } = await import("./quota.server");
    await consommerQuota(context.supabase, "cv");

    const { detectSections } = await import("./cv-import/sections");
    const { segmentBlocks } = await import("./cv-import/segmenter");
    const { extraireContenuCVServer } = await import(
      "./cv-import/extractor.server"
    );
    const { validateCVImportResult } = await import("./cv-import/validator");

    const sections = detectSections(data.doc);
    const segmented = segmentBlocks(sections);
    const rawResult = await extraireContenuCVServer(data.doc, segmented);
    const { result } = validateCVImportResult(rawResult);

    return result;
  });
