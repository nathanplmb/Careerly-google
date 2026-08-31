import { c as _enum, d as number, f as object, l as array, p as string, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { a as fallbackAnalyserCv, n as appelerGeminiSecurise, r as extraireJsonPropre, t as GEMINI_MODEL } from "./ai-fallbacks-io-4b2vQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv.server-DK-Vurhs.js
var AnalyseSchema = object({
	global: number(),
	scores: array(object({
		critere: string(),
		score: number(),
		explication: string()
	})),
	pointsForts: array(string()),
	aCorriger: array(object({
		titre: string(),
		conseil: string(),
		priorite: _enum([
			"haute",
			"moyenne",
			"basse"
		])
	})),
	reformulations: array(object({
		avant: string(),
		apres: string()
	})),
	motsClesManquants: array(string()),
	resume: string(),
	profilDetecte: object({
		competences: string(),
		logiciels: string(),
		langues: string(),
		niveauAnglais: string(),
		experiences: string(),
		formation: string(),
		ecole: string(),
		niveau: string(),
		metiers: string(),
		domaines: string(),
		localisation: string()
	}),
	cvStructure: object({
		titre: string(),
		accroche: string(),
		email: string(),
		telephone: string(),
		ville: string(),
		linkedin: string(),
		portfolio: string(),
		permis: string(),
		experiences: array(object({
			poste: string(),
			entreprise: string(),
			lieu: string(),
			contrat: string(),
			debut: string(),
			fin: string(),
			enCours: boolean(),
			description: string(),
			realisations: array(string()),
			competences: array(string())
		})),
		formations: array(object({
			diplome: string(),
			etablissement: string(),
			lieu: string(),
			debut: string(),
			fin: string(),
			mention: string(),
			details: string()
		})),
		certifications: array(object({
			nom: string(),
			organisme: string(),
			date: string(),
			identifiant: string(),
			lien: string()
		})),
		projets: array(object({
			nom: string(),
			role: string(),
			periode: string(),
			description: string(),
			lien: string()
		})),
		competences: array(object({
			nom: string(),
			categorie: string(),
			niveau: _enum([
				"Notions",
				"Intermédiaire",
				"Avancé",
				"Expert"
			])
		})),
		langues: array(object({
			nom: string(),
			niveau: _enum([
				"A1",
				"A2",
				"B1",
				"B2",
				"C1",
				"C2",
				"Langue maternelle"
			]),
			certification: string()
		})),
		benevolats: array(object({
			role: string(),
			organisation: string(),
			periode: string(),
			description: string()
		})),
		interets: array(string())
	})
});
var SYSTEM_INSTRUCTION = `Tu es l'assistant IA expert en recrutement de talents et audit de CV pour Grandes Écoles et cabinets de premier plan.
Tu réalises un audit rigoureux, bienveillant et orienté résultats du CV d'un étudiant.

RÈGLES D'EXCELLENCE :
- Rigueur factuelle : Ne JAMAIS inventer d'information absente du CV. Si un champ manque, chaîne vide ("") ou tableau vide ([]).
- Tu vouvoies le candidat et apportes des conseils immédiatement actionnables.
- Format JSON strict :
  * "scores" : 4 dimensions évaluées ("Clarté et structure", "Impact et résultats chiffrés", "Adéquation avec le projet professionnel", "Mots-clés et lisibilité ATS"), chacune avec score 0-100 et explication constructive.
  * "global" : note globale pondérée 0-100.
  * "pointsForts" : 3 à 5 forces distinctives identifiées dans le parcours.
  * "aCorriger" : 3 à 6 axes prioritaires avec titre percutant, conseil méthodologique (ex: méthode STAR, verbes d'action, métriques), et priorite ("haute"|"moyenne"|"basse").
  * "reformulations" : 3 à 6 puces concrètes réécrites ("avant" = extrait brut, "apres" = version musclée avec verbe d'action et impact).
  * "motsClesManquants" : liste des mots-clés et compétences recherchées par les recruteurs du secteur qui manquent.
  * "resume" : synthèse globale percutante en 2-3 phrases.
  * "profilDetecte" : synthèse structurée par champs pour pré-remplir le profil de l'étudiant.
  * "cvStructure" : parsing exhaustif (expériences, formations, certifications, projets, compétences, langues, bénévolats, centres d'intérêt).`;
async function analyserCvIA(entree) {
	const userPrompt = `Analyse ce CV d'étudiant selon les directives :

=== TEXTE DU CV ===
${entree.cv.slice(0, 16e3)}
${entree.profil?.trim() ? `\n=== PROJET / PROFIL DÉCLARÉ PAR LE CANDIDAT ===\n${entree.profil.slice(0, 6e3)}` : ""}`;
	try {
		const text = await appelerGeminiSecurise({
			contents: userPrompt,
			systemInstruction: SYSTEM_INSTRUCTION,
			responseMimeType: "application/json"
		});
		const rawParsed = extraireJsonPropre(text);
		return normalise(AnalyseSchema.parse(rawParsed));
	} catch (error) {
		console.warn("[analyserCvIA] Repli intelligent activé:", error);
		return fallbackAnalyserCv(entree);
	}
}
var clamp = (n) => Math.max(0, Math.min(100, Math.round(n || 0)));
function normalise(a) {
	return {
		...a,
		global: clamp(a.global),
		scores: (a.scores ?? []).map((s) => ({
			...s,
			score: clamp(s.score)
		}))
	};
}
var MODELE_CV = GEMINI_MODEL;
//#endregion
export { MODELE_CV, analyserCvIA };
