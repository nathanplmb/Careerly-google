import { f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { t as TRI_VIDE } from "./tri-ia-B8lJPUTf.mjs";
import { f as fallbackTrierTexte, n as appelerGeminiSecurise, r as extraireJsonPropre } from "./ai-fallbacks-io-4b2vQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tri-ia.server-CMvIzGc1.js
object({
	resume: string(),
	candidatures: array(object({
		entreprise: string(),
		poste: string(),
		statut: string(),
		lieu: string(),
		lien: string(),
		source: string(),
		secteur: string(),
		dateLimite: string(),
		dateEnvoi: string(),
		commentaire: string(),
		detail: string()
	})),
	contacts: array(object({
		nom: string(),
		entreprise: string(),
		poste: string(),
		email: string(),
		telephone: string(),
		linkedin: string(),
		type: string(),
		notes: string()
	})),
	echeances: array(object({
		entreprise: string(),
		titre: string(),
		date: string(),
		nature: string()
	}))
});
async function trierTexte(texte, aujourdhui) {
	const systemInstruction = `Tu es l'assistant IA intelligent de tri et d'organisation pour étudiants et candidats (stages/alternances).
On te donne un texte brut quelconque : annonce, e-mail, notes, liste d'entreprises, message LinkedIn, copier-coller de tableau, compte-rendu…
Tu analyses méthodiquement le contenu pour TOUT structurer sans rien inventer.
Date du jour : ${aujourdhui}. Toutes les dates doivent être au format AAAA-MM-JJ.

Classe en trois familles (JSON strict) :
1. candidatures : chaque offre / opportunité / entreprise ciblée.
   - entreprise : nom propre de l'entreprise réelle (pas le job board).
   - poste : intitulé propre du poste.
   - statut : "Je vais postuler", "J'ai postulé", "J'ai relancé", "J'ai un entretien", "J'ai reçu une réponse négative", "Je n'ai pas reçu de réponse".
   - source : "JobTeaser", "LinkedIn", "Welcome to the Jungle", "Indeed", "Site entreprise", "Candidature spontanée", "Réseau", "École", "Autre".
   - secteur : "Tech & IA", "Conseil & Stratégie", "Finance & Banque", "Luxe & Cosmétiques", "Audit & Contrôle de gestion", "Marketing & Communication", "Santé & Pharma", "Industrie & Énergie", "E-commerce & Retail", "RH & Recrutement", "Droit & Juridique", "Agroalimentaire", "Immobilier & BTP", "Autre".
   - dateLimite : date limite AAAA-MM-JJ ; dateEnvoi : date d'envoi si mentionnée.
   - commentaire : conseil stratégique ou rappel (max 140 car).
   - detail : résumé synthétique et très concis (missions clés, profil requis, modalités).
2. contacts : chaque interlocuteur identifié (recruteur, RH, manager, tuteur, contact réseau).
   - nom, entreprise, poste, email, telephone, linkedin.
   - type : "Recruteur", "RH", "Manager", "Ancien élève", "Contact professionnel", "Rencontré en entretien".
   - notes : informations utiles issues du texte.
3. echeances : chaque jalon ou date clé (date limite, relance, date d'entretien).
   - nature : "limite", "relance", "entretien", "autre".

resume : Synthèse de 1 à 2 phrases décrivant clairement ce qui a été détecté et extrait.`;
	const userPrompt = `Texte à classer :
"""
${texte.slice(0, 2e4)}
"""`;
	try {
		const text = await appelerGeminiSecurise({
			contents: userPrompt,
			systemInstruction,
			responseMimeType: "application/json"
		});
		const parsed = extraireJsonPropre(text);
		return {
			...TRI_VIDE,
			...parsed
		};
	} catch (error) {
		console.warn("[trierTexte] Repli intelligent activé:", error);
		return fallbackTrierTexte(texte, aujourdhui);
	}
}
//#endregion
export { trierTexte };
