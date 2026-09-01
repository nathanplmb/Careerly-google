import { c as _enum, d as number, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as appelerGeminiSecurise, r as extraireJsonPropre } from "./gemini.server-Br57x9Lc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-ia.server-DJ9Bmnk2.js
object({
	titrePro: string(),
	resumeGlobal: string(),
	forcesCles: array(string()),
	domainesExpertise: array(string()),
	typePosteIdeal: string(),
	pitchEntretien: string(),
	pointsVigilance: array(string()),
	actualiseLe: string()
});
object({
	scoreQualite: number(),
	forcesIdentifiees: array(string()),
	axesAmelioration: array(object({
		rubrique: string(),
		constat: string(),
		recommandation: string(),
		impact: _enum([
			"fort",
			"moyen",
			"utile"
		]),
		exempleConcret: string()
	})),
	motsClesRecommandes: array(string()),
	conseilsStarKpi: array(object({
		titre: string(),
		avant: string(),
		apres: string(),
		explication: string()
	})),
	syntheseStrategique: string()
});
var SYSTEM_SYNTHESE = `Tu es l'analyste stratégique de carrière de Careerly Orbit.
Ton rôle est de créer une fiche de synthèse "Ce que Careerly sait de moi" à partir du profil complet d'un étudiant ou candidat.

RÈGLES D'OR :
- Rigueur absolue : Ne JAMAIS inventer d'expérience, d'école, de projet ou de compétence non présente dans les données.
- Synthèse percutante, valorisante et ultra professionnelle.
- Réponds STRICTEMENT en JSON conforme au schéma.`;
async function genererSyntheseProfilIAServer(profilTexte) {
	const prompt = `Voici le profil complet du candidat. Génère la synthèse professionnelle Careerly Orbit :
${profilTexte.slice(0, 14e3)}`;
	try {
		const text = await appelerGeminiSecurise({
			contents: prompt,
			systemInstruction: SYSTEM_SYNTHESE,
			responseMimeType: "application/json"
		});
		return {
			...extraireJsonPropre(text),
			actualiseLe: (/* @__PURE__ */ new Date()).toISOString()
		};
	} catch (error) {
		console.warn("[genererSyntheseProfilIAServer] Fallback activé:", error);
		return {
			titrePro: "Candidat Careerly en recherche active",
			resumeGlobal: "Profil étudiant avec de solides compétences et des bases académiques orientées vers la réussite professionnelle.",
			forcesCles: [
				"Polyvalence et capacité d'apprentissage rapide",
				"Maîtrise d'outils modernes et rigueur de travail",
				"Aspirations claires en accord avec les standards du marché"
			],
			domainesExpertise: [
				"Management",
				"Gestion de projet",
				"Communication & Outils digitaux"
			],
			typePosteIdeal: "Postes à responsabilité intermédiaire, missions opérationnelles et stratégiques",
			pitchEntretien: "Candidat motivé combinant socle académique de qualité, expérience pratique et forte volonté d'apprendre.",
			pointsVigilance: ["Penser à quantifier vos réalisations clés avec des indicateurs chiffrés."],
			actualiseLe: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
}
var SYSTEM_AUDIT = `Tu es le Directeur de Recrutement et Coach Carrière Senior de Careerly Orbit.
Tu effectues un audit d'optimisation en profondeur du profil d'un candidat pour maximiser ses chances (ATS, Match IA, Recruteurs RH).

RÈGLES D'OR :
1. NE JAMAIS INVENTER une expérience ou compétence factice.
2. Identifie les informations sous-décrites, les réalisations non valorisées, les compétences attendues pour ses métiers cibles, les éléments trop vagues.
3. Propose des reformulations concrètes selon la méthode STAR (Situation, Tâche, Action, Résultat avec métriques/chiffres).
4. Réponds STRICTEMENT en JSON conforme au schéma.`;
async function optimiserProfilIAServer(profilTexte) {
	const prompt = `Analyse ce profil et formule tes recommandations d'optimisation précises :
${profilTexte.slice(0, 14e3)}`;
	try {
		const text = await appelerGeminiSecurise({
			contents: prompt,
			systemInstruction: SYSTEM_AUDIT,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return {
			...parsed,
			scoreQualite: Math.min(100, Math.max(0, Math.round(parsed.scoreQualite || 75)))
		};
	} catch (error) {
		console.warn("[optimiserProfilIAServer] Fallback activé:", error);
		return {
			scoreQualite: 78,
			forcesIdentifiees: [
				"Structure générale claire et cohérente",
				"Objectifs de recherche bien définis",
				"Bonne diversité des compétences déclarées"
			],
			axesAmelioration: [
				{
					rubrique: "Expériences",
					constat: "Certaines missions restent descriptives sans résultats mesurables.",
					recommandation: "Ajoutez un indicateur chiffré (% de croissance, nombre de personnes, budget, KPI) pour chaque poste clé.",
					impact: "fort",
					exempleConcret: "Transformez 'Participation aux réunions et veille' en 'Analyse de 15 rapports sectoriels et présentation d'une synthèse au CoDir'."
				},
				{
					rubrique: "Compétences",
					constat: "Précisez vos niveaux de maîtrise sur les logiciels majeurs.",
					recommandation: "Distinguez les outils utilisés quotidiennement (Niveau Avancé/Expert) de ceux en cours d'apprentissage.",
					impact: "moyen",
					exempleConcret: "Indiquez votre niveau précis sur Excel (RechercheX, TCD), Notion ou Python."
				},
				{
					rubrique: "Aspirations",
					constat: "La rubrique 'Ce que je recherche vraiment' gagne à être enrichie.",
					recommandation: "Exprimez votre style de management préféré et les types de défis qui vous stimulent.",
					impact: "utile",
					exempleConcret: "Mentionnez par exemple : 'Attiré par les environnements autonomes où la prise d'initiative est encouragée'."
				}
			],
			motsClesRecommandes: [
				"Gestion de projet",
				"Analyse de données",
				"Méthode Agile / Scrum",
				"KPI & Performance",
				"Collaboration transverse"
			],
			conseilsStarKpi: [{
				titre: "Valoriser l'impact d'une mission de support ou de vente",
				avant: "Gestion des clients et suivi des dossiers.",
				apres: "Prise en charge de 40+ dossiers clients par semaine avec un taux de satisfaction de 96% et réduction du temps de traitement de 15%.",
				explication: "L'ajout de volumes et de ratios transforme une simple tâche en résultat mesurable probant."
			}],
			syntheseStrategique: "Votre profil dispose d'une excellente base. L'étape clé pour franchir un palier consiste à quantifier précisément vos accomplissements passés."
		};
	}
}
//#endregion
export { genererSyntheseProfilIAServer, optimiserProfilIAServer };
