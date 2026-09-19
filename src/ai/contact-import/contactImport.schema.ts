import { z } from "zod";

export const ContactToClassifyZodSchema = z.object({
  id: z.string(),
  nom: z.string(),
  entreprise: z.string(),
  poste: z.string(),
  notes: z.string().optional(),
  linkedin: z.string().optional(),
});

export const ClassifyContactsBatchInputZodSchema = z.object({
  contacts: z.array(ContactToClassifyZodSchema),
  existingCompanies: z.array(z.string()).optional(),
  userSchool: z.string().optional(),
  userTargetSector: z.string().optional(),
});

export const ContactClassificationZodSchema = z.object({
  id: z.string(),
  normalizedCompany: z.string(),
  companyMatchedWithExisting: z.string().optional(),
  normalizedFunction: z.string(),
  normalizedLevel: z.string(),
  category: z.enum([
    "Recruteur / RH",
    "Alumni",
    "Étudiant / en recherche",
    "Professionnel du secteur ciblé",
    "Professionnel hors secteur ciblé",
    "Autre",
  ]),
  categoryConfidence: z.number().min(0).max(100),
  pastCompanies: z.array(z.string()).optional().default([]),
  education: z.array(z.string()).optional().default([]),
  companySector: z.string().optional().default(""),
  explanation: z.string().optional(),
});

export const ClassifyContactsBatchResultZodSchema = z.object({
  classifications: z.array(ContactClassificationZodSchema),
});
