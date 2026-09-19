import { c as _enum, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.context-C99HGULU.js
var ChatMessageZodSchema = object({
	role: _enum(["user", "assistant"]),
	content: string().min(1, "Le message ne peut pas être vide")
});
var CandidateContextZodSchema = object({
	name: string().optional(),
	titreVise: string().optional(),
	competences: array(string()).default([]),
	secteur: string().optional(),
	formation: string().optional(),
	experiences: string().optional(),
	langues: array(string()).default([]),
	localisation: string().optional(),
	contrats: string().optional(),
	remuneration: string().optional(),
	objectifs: string().optional()
}).optional();
var ChatRequestZodSchema = object({
	messages: array(ChatMessageZodSchema).min(1, "Au moins un message requis"),
	modelId: _enum([
		"gemini-3.5-flash",
		"gemini-3.1-pro-preview",
		"gemini-3.1-flash-lite"
	]),
	personaId: _enum([
		"general_advisor",
		"interview_coach",
		"cv_expert",
		"job_strategist",
		"salary_negotiator",
		"custom"
	]),
	customSystemInstruction: string().optional(),
	candidateContext: CandidateContextZodSchema
});
/**
* Normalise une chaîne ou un tableau de compétences en une liste propre de strings.
* - Si tableau : conserve et nettoie les éléments
* - Si tableau d'objets ({ nom, name }) : extrait les noms
* - Si string : découpe par virgules, points-virgules ou sauts de ligne
* - Si vide / null / undefined : retourne []
*/
function normalizeStringArray(raw) {
	if (!raw) return [];
	if (Array.isArray(raw)) {
		const result = [];
		for (const item of raw) if (typeof item === "string") {
			const trimmed = item.trim();
			if (trimmed && !result.includes(trimmed)) result.push(trimmed);
		} else if (item && typeof item === "object") {
			const itemObj = item;
			const nameVal = itemObj.nom || itemObj.name || itemObj.label || itemObj.title;
			if (typeof nameVal === "string") {
				const trimmed = nameVal.trim();
				if (trimmed && !result.includes(trimmed)) result.push(trimmed);
			}
		}
		return result;
	}
	if (typeof raw === "string") {
		const trimmed = raw.trim();
		if (!trimmed) return [];
		const tokens = trimmed.split(/[,;\n\r•·|]+/).map((t) => t.trim().replace(/^[-*•\s]+/, "")).filter((t) => t.length > 0);
		const unique = [];
		for (const t of tokens) if (!unique.includes(t)) unique.push(t);
		return unique;
	}
	return [];
}
/**
* Normalise les langues d'un profil (tableau ou string ou tableau d'objets LangueCV)
*/
function normalizeLanguesArray(raw) {
	if (!raw) return [];
	if (Array.isArray(raw)) {
		const result = [];
		for (const item of raw) if (typeof item === "string") {
			const trimmed = item.trim();
			if (trimmed && !result.includes(trimmed)) result.push(trimmed);
		} else if (item && typeof item === "object") {
			const langObj = item;
			const nom = typeof langObj.nom === "string" ? langObj.nom.trim() : "";
			const niveau = typeof langObj.niveau === "string" ? langObj.niveau.trim() : "";
			if (nom) {
				const label = niveau ? `${nom} (${niveau})` : nom;
				if (!result.includes(label)) result.push(label);
			}
		}
		return result;
	}
	if (typeof raw === "string") return normalizeStringArray(raw);
	return [];
}
/**
* Fonction centrale de normalisation du contexte candidat.
* Garantit que TOUS les champs respectent strictement le contrat Zod et l'API Gemini :
* - `competences` est TOUJOURS un tableau (`Array.isArray() === true`)
* - `langues` est TOUJOURS un tableau (`Array.isArray() === true`)
* - Aucun `null` ni `undefined` dans les listes
* - Ne fabrique AUCUNE fausse donnée (change le format, pas le contenu).
*/
function normalizeCandidateContext(raw) {
	if (!raw || typeof raw !== "object") return;
	const rawObj = raw;
	const competences = normalizeStringArray(rawObj.competences);
	const langues = normalizeLanguesArray(rawObj.langues);
	const name = typeof rawObj.name === "string" && rawObj.name.trim().length > 0 ? rawObj.name.trim() : void 0;
	const titreVise = typeof rawObj.titreVise === "string" && rawObj.titreVise.trim().length > 0 ? rawObj.titreVise.trim() : typeof rawObj.titre === "string" && rawObj.titre.trim().length > 0 ? rawObj.titre.trim() : void 0;
	const secteur = typeof rawObj.secteur === "string" && rawObj.secteur.trim().length > 0 ? rawObj.secteur.trim() : typeof rawObj.domaines === "string" && rawObj.domaines.trim().length > 0 ? rawObj.domaines.trim() : void 0;
	const formation = typeof rawObj.formation === "string" && rawObj.formation.trim().length > 0 ? rawObj.formation.trim() : void 0;
	const experiences = typeof rawObj.experiences === "string" && rawObj.experiences.trim().length > 0 ? rawObj.experiences.trim() : void 0;
	const localisation = typeof rawObj.localisation === "string" && rawObj.localisation.trim().length > 0 ? rawObj.localisation.trim() : void 0;
	const contrats = typeof rawObj.contrats === "string" && rawObj.contrats.trim().length > 0 ? rawObj.contrats.trim() : void 0;
	const remuneration = typeof rawObj.remuneration === "string" && rawObj.remuneration.trim().length > 0 ? rawObj.remuneration.trim() : void 0;
	const objectifs = typeof rawObj.objectifs === "string" && rawObj.objectifs.trim().length > 0 ? rawObj.objectifs.trim() : typeof rawObj.rechercheVraie === "string" && rawObj.rechercheVraie.trim().length > 0 ? rawObj.rechercheVraie.trim() : void 0;
	if (!(name || titreVise || competences.length > 0 || secteur || formation || experiences || langues.length > 0 || localisation || contrats || remuneration || objectifs)) return;
	return {
		name,
		titreVise,
		competences,
		secteur,
		formation,
		experiences,
		langues,
		localisation,
		contrats,
		remuneration,
		objectifs
	};
}
/**
* Construit un contexte candidat propre et complet depuis le modèle de Profil utilisateur.
*/
function buildCandidateContextFromProfil(profil) {
	if (!profil) return void 0;
	const name = [profil.prenom, profil.nom].filter(Boolean).join(" ").trim() || void 0;
	const titreVise = profil.titre?.trim() || profil.metiers?.trim() || profil.cvStructure?.titre?.trim() || void 0;
	const skillsList = [];
	if (profil.competences) skillsList.push(...normalizeStringArray(profil.competences));
	if (profil.logiciels) skillsList.push(...normalizeStringArray(profil.logiciels));
	if (profil.cvStructure?.competences?.length) skillsList.push(...normalizeStringArray(profil.cvStructure.competences));
	const uniqueCompetences = Array.from(new Set(skillsList.filter(Boolean)));
	const secteur = profil.domaines?.trim() || (typeof profil.criteres?.secteur === "string" ? profil.criteres.secteur : void 0) || profil.entreprisesCiblees?.trim() || void 0;
	const formationParts = [];
	if (profil.formation) formationParts.push(profil.formation.trim());
	if (profil.ecole) formationParts.push(`à ${profil.ecole.trim()}`);
	if (profil.niveau) formationParts.push(`(${profil.niveau.trim()})`);
	const formation = formationParts.length > 0 ? formationParts.join(" ") : profil.cvStructure?.formations?.[0]?.diplome ? `${profil.cvStructure.formations[0].diplome} - ${profil.cvStructure.formations[0].etablissement || ""}`.trim() : void 0;
	let experiences = profil.experiences?.trim() || void 0;
	if (!experiences && profil.cvStructure?.experiences?.length) experiences = profil.cvStructure.experiences.slice(0, 3).map((e) => `${e.poste || "Poste"} chez ${e.entreprise || "Entreprise"} (${e.debut || ""} - ${e.enCours ? "En cours" : e.fin || ""})`).join(" ; ");
	const languesList = [];
	if (profil.langues) languesList.push(...normalizeStringArray(profil.langues));
	if (profil.niveauAnglais) languesList.push(`Anglais: ${profil.niveauAnglais.trim()}`);
	if (profil.cvStructure?.langues?.length) languesList.push(...normalizeLanguesArray(profil.cvStructure.langues));
	const uniqueLangues = Array.from(new Set(languesList.filter(Boolean)));
	const localisation = [
		profil.localisation,
		profil.pays,
		profil.mobilite ? `(Mobilité: ${profil.mobilite})` : ""
	].filter(Boolean).join(" ").trim() || void 0;
	const contrats = [profil.contrats, profil.modeTravail || profil.teletravail].filter(Boolean).join(" - ").trim() || void 0;
	const remuneration = profil.remuneration?.trim() || void 0;
	const objectifs = profil.rechercheVraie?.trim() || (profil.prioritesRecherche?.length ? profil.prioritesRecherche.join(", ") : void 0);
	return normalizeCandidateContext({
		name,
		titreVise,
		competences: uniqueCompetences,
		secteur,
		formation,
		experiences,
		langues: uniqueLangues,
		localisation,
		contrats,
		remuneration,
		objectifs
	});
}
//#endregion
export { buildCandidateContextFromProfil as n, normalizeCandidateContext as r, ChatRequestZodSchema as t };
