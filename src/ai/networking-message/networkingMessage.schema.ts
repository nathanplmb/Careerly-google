import { z } from "zod";

export const GenerateNetworkingMessageInputZodSchema = z.object({
  contact: z.object({
    nom: z.string(),
    entreprise: z.string().optional(),
    poste: z.string().optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    linkedin: z.string().optional(),
    notes: z.string().optional(),
  }),
  opportunity: z
    .object({
      poste: z.string().optional(),
      entreprise: z.string().optional(),
      currentStage: z.string().optional(),
      lieu: z.string().optional(),
    })
    .optional(),
  userProfile: z
    .object({
      prenom: z.string().optional(),
      nom: z.string().optional(),
      ecole: z.string().optional(),
      posteRecherche: z.string().optional(),
      competences: z.array(z.string()).optional(),
    })
    .optional(),
  tone: z
    .enum(["alumni", "spontane", "direct", "entretien"])
    .optional()
    .default("alumni"),
});

export const GenerateNetworkingMessageResultZodSchema = z.object({
  objet: z.string(),
  message: z.string(),
  conseils: z.array(z.string()),
});
