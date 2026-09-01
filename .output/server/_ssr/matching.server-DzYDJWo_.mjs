import { c as _enum, d as number, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as appelerGeminiSecurise, r as extraireJsonPropre, t as GEMINI_MODEL } from "./gemini.server-Br57x9Lc.mjs";
import { t as fallbackAnalyserCorrespondance } from "./ai-fallbacks-CexeS-CD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matching.server-DzYDJWo_.js
var AnalyseSchema = object({
	global: number(),
	confiance: number(),
	confianceRaison: string(),
	details: array(object({
		critere: string(),
		score: number(),
		explication: string()
	})),
	pointsForts: array(string()),
	vigilance: array(string()),
	competences: object({
		correspondances: array(string()),
		aRenforcer: array(string()),
		nonRenseignees: array(string())
	}),
	recommandation: _enum([
		"postuler",
		"postuler_si_interet",
		"secondaire",
		"peu_prioritaire"
	]),
	explication: string()
});
var SYSTEM_INSTRUCTION = `Tu es l'assistant IA coach carrière expert et exigeant pour étudiants et jeunes diplômés (Grandes Écoles de commerce et d'ingénieurs).
Ton rôle est d'analyser méticuleusement l'adéquation entre le profil d'un candidat et une offre de stage ou d'alternance.

RÈGLES D'EXCELLENCE :
1. RIGUEUR FACTUELLE : Base-toi strictement sur les éléments fournis. Ne JAMAIS inventer d'expérience ou de diplôme.
2. DÉTECTION FINE DES COMPÉTENCES :
   - competences.correspondances : compétences & outils explicitement maîtrisés par le profil ET demandés par l'offre.
   - competences.aRenforcer : compétences proches, connexes ou de niveau intermédiaire nécessitant un renforcement rapide.
   - competences.nonRenseignees : compétences clés ou prérequis de l'offre non mentionnés dans le profil.
3. ÉVALUATION PAR DIMENSIONS ("details") :
   - Évalue précisément : "Compétences techniques & Outils", "Formation & Niveau d'études", "Expériences & Missions", "Soft skills & Posture", "Localisation & Rythme", "Langues".
   - Attribue un score sur 100 réaliste et une explication analytique courte (1 phrase percutante).
4. POINTS FORTS & VIGILANCE :
   - pointsForts (3 à 5 éléments) : atouts distinctifs concrets à valoriser en entretien.
   - vigilance (2 à 4 éléments) : points sensibles ou questions potentielles du recruteur et comment les anticiper.
5. RECOMMANDATION DÉCISIVE :
   - "postuler" (adéquation forte >75%), "postuler_si_interet" (bon match avec quelques écarts 60-75%), "secondaire" (match partiel 40-59%), "peu_prioritaire" (<40%).
6. "explication" : Synthèse globale en 2-3 phrases stratégiques donnant la feuille de route du candidat pour cette candidature.
7. Format de sortie : JSON strict valide conforme au schéma.`;
async function analyserCorrespondanceIA(entree) {
	const userPrompt = `Compare ce profil et cette offre de stage :

=== PROFIL DU CANDIDAT ===
${entree.profil.slice(0, 8e3)}

=== OFFRE DE STAGE ===
${entree.offre.slice(0, 12e3)}`;
	try {
		const text = await appelerGeminiSecurise({
			contents: userPrompt,
			systemInstruction: SYSTEM_INSTRUCTION,
			responseMimeType: "application/json"
		});
		const rawParsed = extraireJsonPropre(text);
		return normalise(AnalyseSchema.parse(rawParsed));
	} catch (error) {
		console.warn("[analyserCorrespondanceIA] Repli intelligent activé:", error);
		return fallbackAnalyserCorrespondance(entree);
	}
}
var clamp = (n) => Math.max(0, Math.min(100, Math.round(n || 0)));
function normalise(a) {
	return {
		...a,
		global: clamp(a.global),
		confiance: clamp(a.confiance),
		details: (a.details ?? []).map((d) => ({
			...d,
			score: clamp(d.score)
		}))
	};
}
var MODELE_MATCH = GEMINI_MODEL;
//#endregion
export { MODELE_MATCH, analyserCorrespondanceIA };
