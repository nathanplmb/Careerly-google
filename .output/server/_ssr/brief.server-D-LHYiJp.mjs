import { f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as appelerGeminiSecurise, r as extraireJsonPropre, t as GEMINI_MODEL } from "./gemini.server-BnZeqvha.mjs";
import { i as fallbackGenererBrief } from "./ai-fallbacks-CDZFwBkU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brief.server-D-LHYiJp.js
var BriefSchema = object({
	resume: string().catch("Priorités du jour"),
	elements: array(object({
		id: string().catch(""),
		titre: string().catch(""),
		raison: string().catch("")
	})).catch([]),
	recommandations: array(string()).catch([])
});
var SYSTEM_INSTRUCTION = `Tu es le conseiller carrière quotidien d'un étudiant qui cherche un stage. Tu réponds à la question : « Qu'est-ce que je dois faire aujourd'hui ? ».

RÈGLES ABSOLUES :
- Tu ne disposes QUE de la liste de faits fournie. N'invente JAMAIS une date, une deadline, un entretien, une entreprise ou une action absente de cette liste.
- Chaque élément renvoyé doit reprendre EXACTEMENT un identifiant "id" présent dans les faits. N'invente aucun id, n'en fusionne aucun.
- "raison" doit reformuler le fait correspondant sans ajouter d'information nouvelle (une phrase courte et concrète, dates reprises telles quelles).
- "titre" : impératif court et actionnable (ex : « Relancer Michelin »).
- Classe par urgence réelle : dates limites dépassées ou imminentes, relances dues, entretiens, opportunités à fort match, fiches à compléter.
- Renvoie au maximum 6 éléments, les plus prioritaires.
- "resume" : 1 à 2 phrases donnant la priorité du jour. S'il n'y a aucun fait, dis-le simplement.
- "recommandations" : 0 à 3 conseils personnalisés basés uniquement sur les faits et le profil (rythme de candidatures, secteurs, compétences à mettre en avant). Aucun conseil générique creux.
- Réponds en français, en vouvoyant, au format JSON strict.`;
async function genererBriefIA(entree) {
	const userPrompt = `=== PROFIL DU CANDIDAT ===
${entree.profil.slice(0, 6e3) || "Profil non renseigné."}

=== FAITS DU JOUR (source unique de vérité) ===
${entree.faits.slice(0, 12e3)}`;
	try {
		const text = await appelerGeminiSecurise({
			contents: userPrompt,
			systemInstruction: SYSTEM_INSTRUCTION,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return BriefSchema.parse(parsed);
	} catch (error) {
		console.warn("[genererBriefIA] Repli intelligent activé:", error);
		return fallbackGenererBrief(entree);
	}
}
var MODELE_BRIEF = GEMINI_MODEL;
//#endregion
export { MODELE_BRIEF, genererBriefIA };
