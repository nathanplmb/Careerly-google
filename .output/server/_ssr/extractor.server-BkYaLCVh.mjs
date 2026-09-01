import { f as object, l as array } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as appelerGeminiSecurise, r as extraireJsonPropre } from "./gemini.server-Br57x9Lc.mjs";
import { a as ExperienceEntitySchema, c as LanguageEntitySchema, i as EngagementEntitySchema, l as ProjectEntitySchema, n as CertificationEntitySchema, o as IdentityEntitySchema, r as EducationEntitySchema, s as InterestEntitySchema, t as CVImportResultSchema, u as SkillEntitySchema } from "./schema-BG_0AQDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/extractor.server-BkYaLCVh.js
var MODELE_CV_IMPORT = "gemini-2.5-flash";
var PROMPT_EXTRACTION_CV_V2 = `Tu es l'extracteur de CV de précision de NACORA.
Ta mission est d'extraire STRICTEMENT les informations réellement et textuellement présentes dans le document fourni.

RÈGLES D'OR DE FIDÉLITÉ (VIOLATION = ÉCHEC CRITIQUE) :
1. VÉRITÉ FACTUELLE STRICTE : N'invente JAMAIS aucune information (aucun diplôme, aucune entreprise, aucune date, aucune compétence, aucun niveau, aucun titre non écrit).
2. ISOLATION DES EXPÉRIENCES : Chaque expérience professionnelle mentionnée DOIT constituer un objet DISTINCT dans le tableau "experiences". Extrais rigoureusement les dates dans "startDate" et "endDate" au format YYYY-MM, et retire-les du titre.
3. ISOLATION DES FORMATIONS : Chaque diplôme ou cursus DOIT être un objet distinct dans "education". Ne crée pas de doublons si une formation est mentionnée sur plusieurs lignes.
4. COMPÉTENCES SANS NIVEAU INVENTÉ : N'attribue un "level" à une compétence QUE si le CV écrit expressément un niveau (ex: "Avancé", "Expert"). Sinon, mets OBLIGATOIREMENT "level": null. Ne mets AUCUNE langue, AUCUNE certification et AUCUN intérêt dans "skills".
5. ÉTANCHÉITÉ DES CATÉGORIES :
   - Les LANGUES (ex: Français, Anglais, Espagnol) vont EXCLUSIVEMENT dans "languages", JAMAIS dans "skills".
   - Les CERTIFICATIONS ou scores (ex: TOEIC, TAGE MAGE) vont EXCLUSIVEMENT dans "certifications", JAMAIS dans "skills".
   - Les CENTRES D'INTÉRÊT vont EXCLUSIVEMENT dans "interests", JAMAIS dans "skills".
6. PROJETS NON FRAGMENTÉS : Ne sépare pas le nom d'un projet de sa description. Une phrase descriptive appartient à la description du projet en cours, elle ne doit pas devenir un nouveau projet.
7. IDENTITÉ ET EN-TÊTE : Utilise l'en-tête du document comme source prioritaire pour l'identité. Le prénom et le nom (ex: Nathan PALUMBO) doivent aller dans "firstName" et "lastName". Ne mets pas la ville ("city") si elle n'est pas clairement dans l'en-tête. "professionalTitle" doit être null si aucun titre explicite n'apparaît dans l'en-tête (ne pas utiliser une formation comme titre).
8. FORMAT JSON STRICT : Réponds UNIQUEMENT avec un objet JSON valide conforme au schéma.`;
var GeminiExtractionSchema = object({
	identity: IdentityEntitySchema,
	experiences: array(ExperienceEntitySchema).default([]),
	education: array(EducationEntitySchema).default([]),
	skills: array(SkillEntitySchema).default([]),
	languages: array(LanguageEntitySchema).default([]),
	certifications: array(CertificationEntitySchema).default([]),
	projects: array(ProjectEntitySchema).default([]),
	interests: array(InterestEntitySchema).default([]),
	engagements: array(EngagementEntitySchema).default([])
});
async function extraireContenuCVServer(doc, segmented) {
	const startTime = Date.now();
	const warnings = [];
	const contexteSegments = `
DOCUMENT TEXTUEL :
"""
${doc.plainText}
"""

BLOCS ISOLÉS PAR LE SEGMENTEUR DÉTERMINISTE :
- Lignes d'en-tête/identité : ${segmented.identityLines.length} lignes
- Blocs d'expériences détectés : ${segmented.experienceBlocks.length} blocs
- Blocs de formations détectés : ${segmented.educationBlocks.length} blocs
- Blocs de projets détectés : ${segmented.projectBlocks.length} blocs
- Blocs de langues détectés : ${segmented.languageBlocks.length} blocs
- Blocs de certifications détectés : ${segmented.certificationBlocks.length} blocs
- Blocs d'intérêts détectés : ${segmented.interestBlocks.length} blocs
`;
	try {
		const rawResponse = await appelerGeminiSecurise({
			promptSysteme: PROMPT_EXTRACTION_CV_V2,
			promptUtilisateur: `Extrais avec une fidélité absolue toutes les entités du CV ci-dessous :\n\n${contexteSegments}`,
			temperature: .1,
			modele: MODELE_CV_IMPORT,
			reponseFormat: "json"
		});
		const parsedJson = extraireJsonPropre(rawResponse);
		const validatedGemini = GeminiExtractionSchema.parse(parsedJson);
		const experiences = assainirExperiences(validatedGemini.experiences, segmented.experienceBlocks, warnings);
		const education = assainirEducation(validatedGemini.education, segmented.educationBlocks, warnings);
		const skills = assainirSkills(validatedGemini.skills, validatedGemini.languages, validatedGemini.certifications, warnings);
		const languages = assainirLanguages(validatedGemini.languages, warnings);
		const certifications = assainirCertifications(validatedGemini.certifications, warnings);
		const projects = assainirProjects(validatedGemini.projects, segmented.projectBlocks, warnings);
		const interests = assainirInterests(validatedGemini.interests, warnings);
		const engagements = validatedGemini.engagements || [];
		const identity = assainirIdentity(validatedGemini.identity, segmented.identityLines);
		const counts = {
			experiences: experiences.length,
			education: education.length,
			skills: skills.length,
			languages: languages.length,
			certifications: certifications.length,
			projects: projects.length,
			interests: interests.length,
			engagements: engagements.length
		};
		const processingTimeMs = Date.now() - startTime;
		const result = {
			document: {
				fileName: doc.fileName,
				fileSize: doc.fileSize,
				extractedAt: (/* @__PURE__ */ new Date()).toISOString(),
				totalCharacters: doc.plainText.length
			},
			identity,
			experiences,
			education,
			skills,
			languages,
			certifications,
			projects,
			interests,
			engagements,
			warnings,
			metadata: {
				counts,
				hasAmbiguities: warnings.some((w) => w.severity === "warning"),
				processingTimeMs
			}
		};
		return CVImportResultSchema.parse(result);
	} catch (error) {
		console.error("[CV Importer Server] Erreur lors de l'extraction Gemini:", error);
		return fallbackExtractionDirecte(doc, segmented, warnings, startTime);
	}
}
function assainirIdentity(raw, identityLines) {
	let title = raw.professionalTitle;
	if (title && /^(?:étudiant|bac|but|licence|master|iut|lycée)\b/i.test(title.trim())) title = null;
	let firstName = raw.firstName || "";
	let lastName = raw.lastName || "";
	if (!firstName && identityLines.length > 0) {
		const parts = identityLines[0].trim().split(/\s+/);
		if (parts.length >= 2) {
			firstName = parts[0];
			lastName = parts.slice(1).join(" ");
		}
	}
	return {
		firstName,
		lastName,
		email: raw.email || null,
		phone: raw.phone || null,
		city: raw.city || null,
		country: raw.country || "France",
		linkedin: raw.linkedin || null,
		portfolio: raw.portfolio || null,
		github: raw.github || null,
		drivingLicense: raw.drivingLicense || null,
		mobility: raw.mobility || null,
		professionalTitle: title,
		summary: raw.summary || null
	};
}
function assainirExperiences(geminiExps, segmentedBlocks, warnings) {
	if (segmentedBlocks.length > geminiExps.length && segmentedBlocks.length >= 8) warnings.push({
		field: "experiences",
		message: `${segmentedBlocks.length} expériences ont été segmentées dans votre document.`,
		severity: "info"
	});
	return geminiExps.map((exp, idx) => {
		if (exp.startDate && exp.endDate && exp.startDate === exp.endDate && !exp.isCurrent) {}
		return {
			...exp,
			id: exp.id || `exp-${idx + 1}`,
			title: exp.title.trim() || "Poste",
			company: exp.company.trim() || "Entreprise",
			responsibilities: exp.responsibilities || [],
			achievements: exp.achievements || []
		};
	});
}
function assainirEducation(geminiEdu, _segmentedBlocks, _warnings) {
	const unique = /* @__PURE__ */ new Map();
	for (const edu of geminiEdu) {
		const key = `${edu.school.trim().toLowerCase()}|${edu.degree.trim().toLowerCase()}`;
		if (!unique.has(key)) unique.set(key, edu);
	}
	return Array.from(unique.values()).map((edu, idx) => ({
		...edu,
		id: edu.id || `edu-${idx + 1}`,
		school: edu.school.trim() || "Établissement",
		degree: edu.degree.trim() || "Formation"
	}));
}
function assainirSkills(skills, languages, certifications, _warnings) {
	const langueNoms = new Set(languages.map((l) => l.name.toLowerCase()));
	const certifNoms = new Set(certifications.map((c) => c.name.toLowerCase()));
	const blacklist = /* @__PURE__ */ new Set([
		"français",
		"anglais",
		"espagnol",
		"allemand",
		"italien",
		"toeic",
		"tage mage",
		"cles",
		"b2",
		"b1",
		"c1",
		"a2",
		"automobile",
		"économie",
		"horlogerie"
	]);
	const unique = /* @__PURE__ */ new Map();
	for (const s of skills) {
		const cleanName = s.name.trim();
		const lower = cleanName.toLowerCase();
		if (!cleanName || langueNoms.has(lower) || certifNoms.has(lower) || blacklist.has(lower)) continue;
		if (lower.includes("anglais") || lower.includes("toeic") || lower.includes("espagnol") || lower.includes("français")) continue;
		if (!unique.has(lower)) unique.set(lower, {
			...s,
			id: s.id || `skill-${unique.size + 1}`,
			name: cleanName,
			level: null
		});
	}
	return Array.from(unique.values());
}
function assainirLanguages(languages, _warnings) {
	const unique = /* @__PURE__ */ new Map();
	for (const l of languages) {
		const cleanName = l.name.trim();
		const lower = cleanName.toLowerCase();
		if (!cleanName) continue;
		if (!unique.has(lower)) unique.set(lower, {
			...l,
			id: l.id || `lang-${unique.size + 1}`,
			name: cleanName
		});
	}
	return Array.from(unique.values());
}
function assainirCertifications(certifications, _warnings) {
	const unique = /* @__PURE__ */ new Map();
	for (const c of certifications) {
		const cleanName = c.name.trim();
		const lower = cleanName.toLowerCase();
		if (!cleanName) continue;
		if (!unique.has(lower)) unique.set(lower, {
			...c,
			id: c.id || `cert-${unique.size + 1}`,
			name: cleanName
		});
	}
	return Array.from(unique.values());
}
function assainirProjects(projects, _segmentedBlocks, _warnings) {
	const unique = /* @__PURE__ */ new Map();
	for (const p of projects) {
		const cleanName = p.name.trim();
		const lower = cleanName.toLowerCase();
		if (!cleanName) continue;
		if (cleanName.length > 60 && unique.size > 0) {
			const lastKey = Array.from(unique.keys()).pop();
			const lastProj = unique.get(lastKey);
			lastProj.description = [
				lastProj.description,
				cleanName,
				p.description
			].filter(Boolean).join(" ");
			continue;
		}
		if (!unique.has(lower)) unique.set(lower, {
			...p,
			name: cleanName,
			description: p.description.trim()
		});
	}
	return Array.from(unique.values()).map((p, idx) => ({
		...p,
		id: p.id || `proj-${idx + 1}`,
		name: p.name || `Projet ${idx + 1}`
	}));
}
function assainirInterests(interests, _warnings) {
	const unique = /* @__PURE__ */ new Map();
	for (const i of interests) {
		const cleanName = i.name.trim();
		const lower = cleanName.toLowerCase();
		if (!cleanName) continue;
		if (!unique.has(lower)) unique.set(lower, {
			...i,
			id: i.id || `int-${unique.size + 1}`,
			name: cleanName
		});
	}
	return Array.from(unique.values());
}
function fallbackExtractionDirecte(doc, segmented, warnings, startTime) {
	warnings.push({
		field: "extraction",
		message: "Extraction directe par analyse structurelle des blocs.",
		severity: "info"
	});
	const experiences = segmented.experienceBlocks.map((b, idx) => {
		const firstLine = b.lines[0] || "";
		const secondLine = b.lines[1] || "";
		return {
			id: `exp-${idx + 1}`,
			title: firstLine,
			company: secondLine,
			location: null,
			contractType: null,
			startDate: null,
			endDate: null,
			isCurrent: false,
			responsibilities: b.lines.slice(2),
			achievements: [],
			source: b.source
		};
	});
	const education = segmented.educationBlocks.map((b, idx) => ({
		id: `edu-${idx + 1}`,
		school: b.lines[1] || b.lines[0] || "",
		degree: b.lines[0] || "",
		location: null,
		specialization: b.lines[2] || null,
		mention: null,
		startDate: null,
		endDate: null,
		source: b.source
	}));
	const languages = segmented.languageBlocks.map((b, idx) => ({
		id: `lang-${idx + 1}`,
		name: b.rawText,
		level: null,
		source: b.source
	}));
	const certifications = segmented.certificationBlocks.map((b, idx) => ({
		id: `cert-${idx + 1}`,
		name: b.rawText,
		score: null,
		date: null,
		source: b.source
	}));
	const projects = segmented.projectBlocks.map((b, idx) => ({
		id: `proj-${idx + 1}`,
		name: b.lines[0] || "Projet",
		description: b.lines.slice(1).join(" "),
		type: null,
		organization: null,
		date: null,
		source: b.source
	}));
	const interests = segmented.interestBlocks.map((b, idx) => ({
		id: `int-${idx + 1}`,
		name: b.rawText,
		description: null,
		source: b.source
	}));
	const skills = segmented.skillBlocks.map((b, idx) => ({
		id: `skill-${idx + 1}`,
		name: b.rawText,
		category: "Autre",
		level: null,
		source: b.source
	}));
	return {
		document: {
			fileName: doc.fileName,
			fileSize: doc.fileSize,
			extractedAt: (/* @__PURE__ */ new Date()).toISOString(),
			totalCharacters: doc.plainText.length
		},
		identity: {
			firstName: "",
			lastName: "",
			email: null,
			phone: null,
			city: null,
			country: "France",
			linkedin: null,
			portfolio: null,
			github: null,
			drivingLicense: null,
			mobility: null,
			professionalTitle: null,
			summary: null
		},
		experiences,
		education,
		skills,
		languages,
		certifications,
		projects,
		interests,
		engagements: [],
		warnings,
		metadata: {
			counts: {
				experiences: experiences.length,
				education: education.length,
				skills: skills.length,
				languages: languages.length,
				certifications: certifications.length,
				projects: projects.length,
				interests: interests.length,
				engagements: 0
			},
			hasAmbiguities: false,
			processingTimeMs: Date.now() - startTime
		}
	};
}
//#endregion
export { extraireContenuCVServer };
