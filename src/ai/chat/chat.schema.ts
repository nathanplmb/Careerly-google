import { z } from "zod";

export const ChatMessageZodSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1, "Le message ne peut pas être vide"),
});

export const CandidateContextZodSchema = z
  .object({
    name: z.string().optional(),
    titreVise: z.string().optional(),
    competences: z.array(z.string()).default([]),
    secteur: z.string().optional(),
    formation: z.string().optional(),
    experiences: z.string().optional(),
    langues: z.array(z.string()).default([]),
    localisation: z.string().optional(),
    contrats: z.string().optional(),
    remuneration: z.string().optional(),
    objectifs: z.string().optional(),
  })
  .optional();

export const ChatRequestZodSchema = z.object({
  messages: z.array(ChatMessageZodSchema).min(1, "Au moins un message requis"),
  modelId: z.enum([
    "gemini-3.5-flash",
    "gemini-3.1-pro-preview",
    "gemini-3.1-flash-lite",
  ]),
  personaId: z.enum([
    "general_advisor",
    "interview_coach",
    "cv_expert",
    "job_strategist",
    "salary_negotiator",
    "custom",
  ]),
  customSystemInstruction: z.string().optional(),
  candidateContext: CandidateContextZodSchema,
});

export type ChatRequestZod = z.infer<typeof ChatRequestZodSchema>;
