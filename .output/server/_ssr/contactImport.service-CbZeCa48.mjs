import { n as extraireJsonPropre, t as appelerGeminiSecurise } from "./gemini.server-D450yT_j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contactImport.service-CbZeCa48.js
var CONTACT_IMPORT_SYSTEM_PROMPT = `
Tu es l'assistant IA de NACORA, un système intelligent de gestion de candidatures et de réseau professionnel pour étudiants et jeunes diplômés (notamment en finance, conseil, tech, gestion de patrimoine, etc.).

Ta mission est d'analyser un lot de contacts professionnels importés (par exemple depuis LinkedIn) et de les classifier selon TROIS AXES précis :

1. ENTREPRISE :
   - Extrais et normalise le nom de l'entreprise (ex: "BRED Banque Populaire - Dép M&A" -> "BRED").
   - Si une liste d'entreprises existantes ('existingCompanies') est fournie, cherche un rapprochement (fuzzy matching, ex: "BRED Pop" -> "BRED").

2. POSTE & MÉTIER :
   - Extrais la fonction principale (ex: "Analyste M&A", "Head of Talent", "Chargé de recrutement", "Étudiant").
   - Extrais le niveau d'expérience (ex: "Junior", "Senior", "Manager", "Directeur", "Stagiaire / Alternant", "RH / Recruteur", "Inconnu").

3. CATÉGORIE DU CONTACT (Choix strict parmi les 6 valeurs suivantes) :
   - "Recruteur / RH" : Si le poste contient des mots-clés RH, recrutement, talent acquisition, HRBP, etc.
   - "Alumni" : Si le profil indique une même école que l'utilisateur (ex: ecole de l'utilisateur) ou si mentionné dans les notes/titres.
   - "Étudiant / en recherche" : Si la personne est étudiant, stagiaire, alternant ou en recherche d'opportunité.
   - "Professionnel du secteur ciblé" : Si le poste correspond au secteur ciblé de l'utilisateur (ex: finance, M&A, private equity, conseil, tech, etc.).
   - "Professionnel hors secteur ciblé" : Si la personne occupe un poste professionnel mais dans un autre secteur.
   - "Autre" : Si la classification n'est pas évidente.

4. ENRICHISSEMENT DU PARCOURS ET DU SECTEUR :
   - 'pastCompanies' : Tableau d'entreprises antérieures identifiées (ex: ["Société Générale", "Rothschild"]).
   - 'education' : Tableau des établissements / formations mentionnés (ex: ["IUT Clermont Auvergne", "Université Paris-Dauphine"]).
   - 'companySector' : Secteur d'activité de l'entreprise actuelle (ex: "Finance / Banque", "Fintech", "Gestion de patrimoine", "Conseil").
   - RÈGLE CRITIQUE D'ANTI-HALLUCINATION : Si une information (entreprises passées, formation) n'est PAS présente ou déductible des données transmises, renvoie un tableau vide [] ou une chaîne vide "". NE PAS inventer de parcours ou de diplôme.

Fournis un score de confiance de 0 à 100 pour chaque classification ainsi qu'une courte explication (1 sentence).

FORMAT DE RÉPONSE EXIGÉ :
Renvoie EXCLUSIVEMENT un objet JSON respectant cette structure :
{
  "classifications": [
    {
      "id": "contact_id",
      "normalizedCompany": "Nom entreprise propre",
      "companyMatchedWithExisting": "Nom entreprise existante si match ou omit",
      "normalizedFunction": "Fonction normalisée",
      "normalizedLevel": "Niveau normalisé",
      "category": "Catégorie exacte parmi les 6 choix",
      "categoryConfidence": 90,
      "pastCompanies": ["Entreprise 1"],
      "education": ["Établissement 1"],
      "companySector": "Secteur",
      "explanation": "Raison courte de la classification"
    }
  ]
}
`;
function buildContactImportUserPrompt(input) {
	const contactsFormatted = input.contacts.map((c) => `- ID: ${c.id} | Nom: ${c.nom} | Entreprise: ${c.entreprise || "Non renseignée"} | Poste: ${c.poste || "Non renseigné"} | Notes: ${c.notes || "S.O."}`).join("\n");
	const existingCompList = input.existingCompanies?.length ? input.existingCompanies.join(", ") : "Aucune entreprise existante renseignée";
	return `
CONTEXTE UTILISATEUR :
- École / Formation utilisateur : ${input.userSchool || "Non spécifiée"}
- Secteur / Métier ciblé : ${input.userTargetSector || "Finance / Conseil / Gestion de patrimoine / Tech"}
- Entreprises déjà enregistrées dans NACORA : ${existingCompList}

LISTE DES CONTACTS À CLASSIFIER ET NORMALISER (${input.contacts.length} contacts) :
${contactsFormatted}

Analyse chaque contact et renvoie l'objet JSON "classifications".
`;
}
var VALID_CATEGORIES = [
	"Recruteur / RH",
	"Alumni",
	"Étudiant / en recherche",
	"Professionnel du secteur ciblé",
	"Professionnel hors secteur ciblé",
	"Autre"
];
function normalizeCategory(cat) {
	if (!cat) return "Autre";
	const str = String(cat).trim();
	if (VALID_CATEGORIES.includes(str)) return str;
	const lower = str.toLowerCase();
	if (lower.includes("recrute") || lower.includes("rh") || lower.includes("talent") || lower.includes("hr")) return "Recruteur / RH";
	if (lower.includes("alumn")) return "Alumni";
	if (lower.includes("étudiant") || lower.includes("etudiant") || lower.includes("recherche") || lower.includes("stagiaire") || lower.includes("alternant")) return "Étudiant / en recherche";
	if (lower.includes("du secteur") || lower.includes("ciblé") || lower.includes("cible")) return "Professionnel du secteur ciblé";
	if (lower.includes("hors secteur") || lower.includes("autre secteur")) return "Professionnel hors secteur ciblé";
	return "Autre";
}
async function classifyContactsBatchIA(input) {
	if (!input.contacts || input.contacts.length === 0) return { classifications: [] };
	try {
		const promptUtilisateur = buildContactImportUserPrompt(input);
		const rawResult = await appelerGeminiSecurise({
			promptSysteme: CONTACT_IMPORT_SYSTEM_PROMPT,
			promptUtilisateur,
			reponseFormat: "json",
			temperature: .2
		});
		const jsonClean = extraireJsonPropre(rawResult);
		let parsed;
		try {
			parsed = JSON.parse(jsonClean);
		} catch (parseErr) {
			console.warn("[ContactImportService] Impossible de parser le JSON retourné par Gemini:", jsonClean, parseErr);
			return { classifications: [] };
		}
		let rawList = [];
		if (Array.isArray(parsed)) rawList = parsed;
		else if (parsed && typeof parsed === "object") {
			const obj = parsed;
			if (Array.isArray(obj.classifications)) rawList = obj.classifications;
			else if (Array.isArray(obj.classified)) rawList = obj.classified;
			else if (Array.isArray(obj.results)) rawList = obj.results;
			else if (Array.isArray(obj.contacts)) rawList = obj.contacts;
			else if (Array.isArray(obj.data)) rawList = obj.data;
		}
		return { classifications: rawList.map((item, idx) => {
			const fallbackInput = input.contacts[idx];
			const id = String(item.id || fallbackInput?.id || `contact_${idx}`);
			const normalizedCompany = String(item.normalizedCompany || item.company || fallbackInput?.entreprise || "");
			const companyMatchedWithExisting = item.companyMatchedWithExisting ? String(item.companyMatchedWithExisting) : void 0;
			const normalizedFunction = String(item.normalizedFunction || item.function || item.poste || fallbackInput?.poste || "");
			const normalizedLevel = String(item.normalizedLevel || item.level || "");
			const category = normalizeCategory(typeof item.category === "string" ? item.category : void 0);
			let categoryConfidence = typeof item.categoryConfidence === "number" ? item.categoryConfidence : 80;
			if (categoryConfidence > 0 && categoryConfidence <= 1) categoryConfidence = Math.round(categoryConfidence * 100);
			categoryConfidence = Math.min(100, Math.max(0, categoryConfidence));
			const pastCompanies = Array.isArray(item.pastCompanies) ? item.pastCompanies.map((c) => String(c).trim()).filter(Boolean) : [];
			const education = Array.isArray(item.education) ? item.education.map((e) => String(e).trim()).filter(Boolean) : [];
			const companySector = typeof item.companySector === "string" ? item.companySector.trim() : "";
			const explanation = typeof item.explanation === "string" ? item.explanation.trim() : "";
			return {
				id,
				normalizedCompany,
				companyMatchedWithExisting,
				normalizedFunction,
				normalizedLevel,
				category,
				categoryConfidence,
				pastCompanies,
				education,
				companySector,
				explanation
			};
		}) };
	} catch (err) {
		console.error("[ContactImportService] Erreur lors de la classification des contacts:", err);
		return { classifications: [] };
	}
}
//#endregion
export { classifyContactsBatchIA };
