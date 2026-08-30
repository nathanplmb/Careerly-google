import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { messageErreurIA } from "./ai-gateway.server";

const OffreSchema = z.object({
  entreprise: z.string(),
  poste: z.string(),
  lieu: z.string(),
  lien: z.string(),
  contact: z.string(),
  dateLimite: z.string(),
  commentaire: z.string(),
  resume: z.string(),
});

export type OffreExtraite = z.infer<typeof OffreSchema>;

const VIDE: OffreExtraite = {
  entreprise: "",
  poste: "",
  lieu: "",
  lien: "",
  contact: "",
  dateLimite: "",
  commentaire: "",
  resume: "",
};

const SYSTEM_INSTRUCTION = `Tu es un assistant qui aide un étudiant à suivre ses candidatures de stage.
À partir d'une fiche de poste ou description d'offre, extrais les informations au format JSON strict :
- entreprise : nom de l'entreprise (vide si introuvable)
- poste : intitulé exact du poste
- lieu : ville / lieu du poste
- lien : URL de l'offre si présente dans le texte, sinon vide
- contact : nom, email et/ou téléphone du recruteur si présents, sinon vide
- dateLimite : date limite pour postuler au format AAAA-MM-JJ si indiquée, sinon vide
- commentaire : une phrase courte et utile (conseil de candidature, point clé), max 140 caractères
- resume : un résumé structuré du détail de l'offre (missions, profil, durée, rémunération) en quelques lignes`;

export async function extraireOffre(texte: string): Promise<OffreExtraite> {
  const userPrompt = `Fiche de poste :
"""
${texte.slice(0, 12000)}
"""`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    });

    const rawParsed = extraireJsonPropre<Partial<OffreExtraite>>(text);
    return { ...VIDE, ...rawParsed };
  } catch (error) {
    console.error("[extraireOffre] Erreur Gemini:", error);
    throw new Error(messageErreurIA(error));
  }
}
