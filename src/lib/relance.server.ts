import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { messageErreurIA } from "./ai-gateway.server";

const RelanceSchema = z.object({
  objet: z.string(),
  message: z.string(),
  conseils: z.array(z.string()),
});

export type RelanceIA = z.infer<typeof RelanceSchema>;

export type EntreeRelance = {
  typeRelance: string;
  contact: string;
  profil: string;
  offre: string;
  historique: string;
  consigne: string;
};

const SYSTEM_INSTRUCTION = `Tu es un conseiller carrière qui rédige des messages professionnels pour un étudiant en recherche de stage/alternance.

RÈGLES ABSOLUES :
- N'invente JAMAIS une information : pas de date, d'entretien, de nom, de compétence ou d'échange qui ne figure pas dans les données fournies.
- Si une information manque, reste général plutôt que d'inventer.
- Ton professionnel, chaleureux et concis. Vouvoiement.
- Le message fait 100 à 180 mots, structuré : accroche personnalisée, rappel du contexte réel, valeur apportée, demande claire, formule de politesse.
- Termine par une signature avec le prénom et nom du candidat s'ils sont connus, sinon "[Votre prénom NOM]".
- "objet" : objet d'email court et explicite (max 70 caractères).
- "conseils" : 2 à 3 conseils courts et concrets pour l'envoi (moment, canal, relance suivante).
- Réponds intégralement en français au format JSON strict.`;

export async function genererRelanceIA(
  entree: EntreeRelance,
): Promise<RelanceIA> {
  const userPrompt = `=== TYPE DE MESSAGE DEMANDÉ ===
${entree.typeRelance}

=== CONTACT DESTINATAIRE ===
${entree.contact.slice(0, 3000)}

=== PROFIL DU CANDIDAT ===
${entree.profil.slice(0, 6000)}

=== OFFRE / CANDIDATURE ASSOCIÉE ===
${entree.offre.slice(0, 6000) || "Aucune candidature associée."}

=== HISTORIQUE DES ÉCHANGES ===
${entree.historique.slice(0, 4000)}

=== CONSIGNE COMPLÉMENTAIRE DU CANDIDAT ===
${entree.consigne.slice(0, 1000) || "Aucune."}`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    });

    const parsed = extraireJsonPropre<RelanceIA>(text);
    return RelanceSchema.parse(parsed);
  } catch (error) {
    console.error("[genererRelanceIA] Erreur Gemini:", error);
    throw new Error(messageErreurIA(error));
  }
}

export const MODELE_RELANCE = GEMINI_MODEL;
