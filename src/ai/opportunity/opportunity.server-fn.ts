import { z } from "zod";
import type { OpportunityExtractedData } from "./opportunity.types";

const ExtraireOpportuniteInput = z.object({
  text: z
    .string()
    .min(10, "Le texte de l'offre doit contenir au moins 10 caractères."),
  url: z.string().optional(),
});

export const extraireOpportuniteServerFn = async ({
  data,
}: {
  data: unknown;
}): Promise<OpportunityExtractedData> => {
  const parsedData = ExtraireOpportuniteInput.parse(data);
  const { extraireOpportuniteIA } = await import("./opportunity.service");
  return await extraireOpportuniteIA(parsedData.text, parsedData.url);
};
