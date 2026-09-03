import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { OpportunityExtractedData } from "./opportunity.types";

const ExtraireOpportuniteInput = z.object({
  text: z
    .string()
    .min(10, "Le texte de l'offre doit contenir au moins 10 caractères."),
  url: z.string().optional(),
});

export const extraireOpportuniteServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => ExtraireOpportuniteInput.parse(data))
  .handler(async ({ data }): Promise<OpportunityExtractedData> => {
    const { extraireOpportuniteIA } = await import("./opportunity.service");
    return await extraireOpportuniteIA(data.text, data.url);
  });
