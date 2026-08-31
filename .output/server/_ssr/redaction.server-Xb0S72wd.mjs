import { f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as appelerGeminiSecurise, r as extraireJsonPropre } from "./gemini.server-kLocAPgu.mjs";
import { a as fallbackGenererInterview, o as fallbackGenererLettre, s as fallbackGenererLinkedin } from "./ai-fallbacks-CDZFwBkU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redaction.server-Xb0S72wd.js
var REGLES = `RÈGLES ABSOLUES D'EXCELLENCE :
- N'invente JAMAIS une information (expérience, diplôme, chiffre, date, nom) absente des données fournies.
- Si une information manque, reste général ou suggère un angle plutôt que d'inventer des faits.
- Ton professionnel, authentique, percutant et sans platitudes ("dynamique et motivé", "leader incontesté").
- Style percutant et personnalisé : relie explicitement les réalisations concrètes du candidat aux enjeux réels du poste.
- Réponds intégralement en français et exclusivement au format JSON strict.`;
var LettreSchema = object({
	objet: string(),
	lettre: string(),
	conseils: array(string())
});
var LinkedinSchema = object({
	invitation: string(),
	messageSuivi: string(),
	accrocheProfil: string(),
	conseils: array(string())
});
var InterviewSchema = object({
	questions: array(object({
		question: string(),
		categorie: string(),
		pistes: array(string())
	})),
	argumentsCles: array(string()),
	pointsFaibles: array(string()),
	questionsARecruteur: array(string())
});
async function genererLettreIA(e) {
	try {
		const text = await appelerGeminiSecurise({
			contents: `=== PROFIL DU CANDIDAT ===
${e.profil.slice(0, 6e3) || "Profil non renseigné."}

=== OFFRE VISÉE ===
${e.offre.slice(0, 6e3) || "Offre non renseignée."}

=== CONSIGNE DU CANDIDAT ===
${e.consigne.slice(0, 1e3) || "Aucune."}`,
			systemInstruction: `Tu es un assistant IA d'élite en rédaction de candidatures pour étudiants et jeunes diplômés.
${REGLES}
- "lettre" : 250 à 350 mots, structure puissante en 3 temps (Accroche contextualisée sur l'entreprise & le défi du poste / Preuves & réalisations clés du candidat / Projection commune & appel à l'échange).
- "objet" : objet d'email percutant et professionnel (max 75 caractères, ex: "Candidature Stage Bras Droit DG - Clara Dupont - Janv 2026").
- "conseils" : 3 conseils stratégiques d'envoi et de suivi.`,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return LettreSchema.parse(parsed);
	} catch (error) {
		console.warn("[genererLettreIA] Repli intelligent activé:", error);
		return fallbackGenererLettre(e);
	}
}
async function genererLinkedinIA(e) {
	try {
		const text = await appelerGeminiSecurise({
			contents: `=== PROFIL DU CANDIDAT ===
${e.profil.slice(0, 6e3) || "Profil non renseigné."}

=== ENTREPRISE / OFFRE CIBLÉE ===
${e.offre.slice(0, 6e3) || "Aucune offre ciblée."}

=== CONSIGNE DU CANDIDAT ===
${e.consigne.slice(0, 1e3) || "Aucune."}`,
			systemInstruction: `Tu es un assistant IA coach en personal branding et networking LinkedIn pour étudiants.
${REGLES}
- "invitation" : note d'invitation ultra-personnalisée (200 à 280 caractères max), concise, donnant une raison claire et bienveillante d'accepter.
- "messageSuivi" : message post-acceptation (80 à 130 mots) avec demande d'échange rapide de 10-15 min sur le métier ou le stage.
- "accrocheProfil" : titre / headline LinkedIn impactant (<220 caractères) mettant en valeur la formation et la spécialité.
- "conseils" : 3 conseils de posture réseau et d'engagement.`,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return LinkedinSchema.parse(parsed);
	} catch (error) {
		console.warn("[genererLinkedinIA] Repli intelligent activé:", error);
		return fallbackGenererLinkedin(e);
	}
}
async function genererInterviewIA(e) {
	try {
		const text = await appelerGeminiSecurise({
			contents: `=== PROFIL DU CANDIDAT ===
${e.profil.slice(0, 6e3) || "Profil non renseigné."}

=== OFFRE / ENTREPRISE ===
${e.offre.slice(0, 6e3) || "Offre non renseignée."}

=== CONSIGNE DU CANDIDAT ===
${e.consigne.slice(0, 1e3) || "Aucune."}`,
			systemInstruction: `Tu es un assistant IA coach de préparation aux entretiens d'embauche pour stages et alternances d'excellence.
${REGLES}
- "questions" : 8 questions pointues et probables (Parcours, Motivation profonde, Technique/Métier, Comportemental/Fit, Cas de mise en situation). "pistes" : 2 à 3 points concrets guidant la réponse (méthode STAR : Situation, Tâche, Action, Résultat).
- "argumentsCles" : 4 arguments massues tirés du profil pour convaincre le recruteur.
- "pointsFaibles" : 3 points de vigilance ou objections potentielles et comment les retourner à son avantage.
- "questionsARecruteur" : 4 questions intelligentes et valorisantes à poser en fin d'entretien.`,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return InterviewSchema.parse(parsed);
	} catch (error) {
		console.warn("[genererInterviewIA] Repli intelligent activé:", error);
		return fallbackGenererInterview(e);
	}
}
//#endregion
export { genererInterviewIA, genererLettreIA, genererLinkedinIA };
