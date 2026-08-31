import { f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as appelerGeminiSecurise, r as extraireJsonPropre, t as GEMINI_MODEL } from "./gemini.server-kLocAPgu.mjs";
import { c as fallbackGenererRelance } from "./ai-fallbacks-CDZFwBkU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/relance.server-C_LzYwge.js
var RelanceSchema = object({
	objet: string(),
	message: string(),
	conseils: array(string())
});
var SYSTEM_INSTRUCTION = `Tu es un conseiller carrière qui rédige des messages professionnels pour un étudiant en recherche de stage/alternance.

RÈGLES ABSOLUES :
- N'invente JAMAIS une information : pas de date, d'entretien, de nom, de compétence ou d'échange qui ne figure pas dans les données fournies.
- Si une information manque, reste général plutôt que d'inventer.
- Ton professionnel, chaleureux et concis. Vouvoiement.
- Le message fait 100 à 180 mots, structuré : accroche personnalisée, rappel du contexte réel, valeur apportée, demande claire, formule de politesse.
- Termine par une signature avec le prénom et nom du candidat s'ils sont connus, sinon "[Votre prénom NOM]".
- "objet" : objet d'email court et explicite (max 70 caractères).
- "conseils" : 2 à 3 conseils courts et concrets pour l'envoi (moment, canal, relance suivante).
- Réponds intégralement en français au format JSON strict.`;
async function genererRelanceIA(entree) {
	const userPrompt = `=== TYPE DE MESSAGE DEMANDÉ ===
${entree.typeRelance}

=== CONTACT DESTINATAIRE ===
${entree.contact.slice(0, 3e3)}

=== PROFIL DU CANDIDAT ===
${entree.profil.slice(0, 6e3)}

=== OFFRE / CANDIDATURE ASSOCIÉE ===
${entree.offre.slice(0, 6e3) || "Aucune candidature associée."}

=== HISTORIQUE DES ÉCHANGES ===
${entree.historique.slice(0, 4e3)}

=== CONSIGNE COMPLÉMENTAIRE DU CANDIDAT ===
${entree.consigne.slice(0, 1e3) || "Aucune."}`;
	try {
		const text = await appelerGeminiSecurise({
			contents: userPrompt,
			systemInstruction: SYSTEM_INSTRUCTION,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return RelanceSchema.parse(parsed);
	} catch (error) {
		console.warn("[genererRelanceIA] Repli intelligent activé:", error);
		return fallbackGenererRelance(entree);
	}
}
var MODELE_RELANCE = GEMINI_MODEL;
//#endregion
export { MODELE_RELANCE, genererRelanceIA };
