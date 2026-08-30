import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { messageErreurIA } from "./ai-gateway.server";

const REGLES = `RÈGLES ABSOLUES :
- N'invente JAMAIS une information (expérience, diplôme, chiffre, date, nom) absente des données fournies.
- Si une information manque, reste général plutôt que d'inventer.
- Ton professionnel, clair, sans jargon marketing. Vouvoiement.
- Réponds intégralement en français et exclusivement au format JSON strict.`;

export const LettreSchema = z.object({
  objet: z.string(),
  lettre: z.string(),
  conseils: z.array(z.string()),
});
export type LettreIA = z.infer<typeof LettreSchema>;

export const LinkedinSchema = z.object({
  invitation: z.string(),
  messageSuivi: z.string(),
  accrocheProfil: z.string(),
  conseils: z.array(z.string()),
});
export type LinkedinIA = z.infer<typeof LinkedinSchema>;

export const InterviewSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      categorie: z.string(),
      pistes: z.array(z.string()),
    }),
  ),
  argumentsCles: z.array(z.string()),
  pointsFaibles: z.array(z.string()),
  questionsARecruteur: z.array(z.string()),
});
export type InterviewIA = z.infer<typeof InterviewSchema>;

async function generer<T>(
  schema: z.ZodType<T>,
  systemInstruction: string,
  prompt: string,
): Promise<T> {
  try {
    const text = await appelerGeminiSecurise({
      contents: prompt,
      systemInstruction,
      responseMimeType: "application/json",
    });

    const parsed = extraireJsonPropre<T>(text);
    return schema.parse(parsed);
  } catch (error) {
    console.error("[redaction] échec Gemini:", error);
    throw new Error(messageErreurIA(error));
  }
}

export type EntreeRedaction = {
  profil: string;
  offre: string;
  consigne: string;
};

export async function genererLettreIA(e: EntreeRedaction): Promise<LettreIA> {
  return generer(
    LettreSchema,
    `Tu rédiges une lettre de motivation pour un étudiant en recherche de stage/alternance.
${REGLES}
- "lettre" : 250 à 350 mots, structurée (accroche, pourquoi cette entreprise, pourquoi ce profil, projection, formule de politesse).
- "objet" : objet d'email court (max 80 caractères).
- "conseils" : 2 à 3 conseils d'envoi concrets.`,
    `=== PROFIL DU CANDIDAT ===
${e.profil.slice(0, 6000) || "Profil non renseigné."}

=== OFFRE VISÉE ===
${e.offre.slice(0, 6000) || "Offre non renseignée."}

=== CONSIGNE DU CANDIDAT ===
${e.consigne.slice(0, 1000) || "Aucune."}`,
  );
}

export async function genererLinkedinIA(
  e: EntreeRedaction,
): Promise<LinkedinIA> {
  return generer(
    LinkedinSchema,
    `Tu es un coach LinkedIn pour un étudiant en recherche de stage/alternance.
${REGLES}
- "invitation" : note d'invitation LinkedIn de 250 caractères maximum.
- "messageSuivi" : message envoyé après acceptation, 80 à 130 mots, avec une demande claire.
- "accrocheProfil" : titre/accroche de profil LinkedIn de 220 caractères maximum.
- "conseils" : 3 conseils concrets pour améliorer sa présence LinkedIn.`,
    `=== PROFIL DU CANDIDAT ===
${e.profil.slice(0, 6000) || "Profil non renseigné."}

=== ENTREPRISE / OFFRE CIBLÉE ===
${e.offre.slice(0, 6000) || "Aucune offre ciblée."}

=== CONSIGNE DU CANDIDAT ===
${e.consigne.slice(0, 1000) || "Aucune."}`,
  );
}

export async function genererInterviewIA(
  e: EntreeRedaction,
): Promise<InterviewIA> {
  return generer(
    InterviewSchema,
    `Tu es un coach d'entretien pour un étudiant en recherche de stage/alternance.
${REGLES}
- "questions" : 8 questions probables pour cet entretien. "categorie" parmi : Parcours, Motivation, Technique, Comportemental, Situation. "pistes" : 2 à 3 puces guidant la réponse (méthode STAR quand pertinent), fondées uniquement sur le profil fourni.
- "argumentsCles" : 4 arguments à mettre en avant.
- "pointsFaibles" : 3 points de vigilance du profil face à cette offre, formulés de façon constructive.
- "questionsARecruteur" : 4 questions pertinentes à poser au recruteur.`,
    `=== PROFIL DU CANDIDAT ===
${e.profil.slice(0, 6000) || "Profil non renseigné."}

=== OFFRE / ENTREPRISE ===
${e.offre.slice(0, 6000) || "Offre non renseignée."}

=== CONSIGNE DU CANDIDAT ===
${e.consigne.slice(0, 1000) || "Aucune."}`,
  );
}

export const MODELE_REDACTION = GEMINI_MODEL;
