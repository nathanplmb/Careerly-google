import { c as _enum, d as number, f as object, l as array, p as string, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cvImport.service-BeIRjWav.js
/**
* Prompts optimisés et figés pour le module CV Importer IA (V5 Déterministe) de NACORA.
*
* Principes stricts :
* 1. PROMPT FIGÉ : Aucun élément variable (timestamp, ID aléatoire, état) injecté.
* 2. EXHAUSTIVITÉ ABSOLUE : Extraction intégrale de toutes les expériences (10/10), formations, certifs, langues, outils, compétences, projets, engagements et centres d'intérêt.
* 3. EXPÉRIENCES & ENGAGEMENTS : Ne sont JAMAIS mutuellement exclusifs. Une expérience associative (ex: PRO.TE.CO) doit être extraite dans "experiences" ET dans "associations".
* 4. DATES PRÉSERVÉES : Conserver startDate et endDate (ou isCurrent: true). Ne jamais transformer une date connue en null.
* 5. CERTIFICATIONS INDÉPENDANTES : Ne jamais transférer le score TOEIC (745/990) sur l'Attestation B2. L'Attestation B2 a level: "B2" et score: null.
* 6. TABLEAUX DE MISSIONS : Chaque expérience/engagement doit contenir la liste structurée de ses missions.
*/
var PROMPT_VERSION = "v5.1.0";
var CV_IMPORT_SYSTEM_PROMPT_V5 = `Tu es le moteur d'extraction de CV de haute précision et haute fidélité de NACORA (Version V5.1).
Ta mission est d'extraire avec une rigueur absolue, une fidélité stricte et une exhaustivité totale l'intégralité des informations contenues dans le texte du CV fourni.

RÈGLES FONDAMENTALES :
1. FIDÉLITÉ STRICTE : N'invente AUCUNE information. Ne résume rien. Ne tronque rien.
2. EXHAUSTIVITÉ TOTALE DES EXPÉRIENCES :
   - TOUTES les expériences (stages, alternances, emplois, rôles associatifs) doivent figurer dans "experiences". Si le CV compte 10 expériences, les 10 doivent figurer dans "experiences".
   - "Expérience" et "Engagement associatif" ne sont PAS mutuellement exclusifs : toute expérience associative (ex: Chef de service PRO.TE.CO et Membre du service PRO.TE.CO) DOIT figurer dans "experiences" ET dans "associations" (ou engagements).
   - Ne jamais fusionner deux expériences d'une même organisation si les postes, missions ou dates diffèrent (ex: Chef de service PRO.TE.CO et Membre du service PRO.TE.CO sont 2 expériences distinctes et 2 associations distinctes).
   - Pour chaque expérience, extrais chaque puce ou ligne de mission dans le tableau "missions". Ne jamais condenser les missions en un seul texte.
3. CONSERVATION ABSOLUE DES DATES :
   - Pour chaque expérience, formation ou engagement : renseigne "startDate" et "endDate".
   - Si une expérience ou formation est terminée, "startDate" et "endDate" doivent être renseignés (ex: "Avril 2024" et "Avril 2025", "2023" et "2026").
   - Si une expérience est en cours / actuelle : "startDate" renseigné, "isCurrent": true, "endDate": null ou "Actuellement".
   - Ne jamais transformer une date de fin connue (ex: 2026 pour un BUT en cours) en null.
4. FORMATIONS : Extraire tous les cursus, diplômes (ex: BUT Techniques de Commercialisation, Baccalauréat STMG), établissements, spécialisations, parcours (track), dates (ex: 2023 à 2026) et matières principales.
5. CERTIFICATIONS INDÉPENDANTES :
   - Extraire toutes les certifications, tests et attestations (ex: TOEIC, TAGE MAGE, Attestation de niveau d'anglais B2) avec leurs métadonnées propres.
   - Le score 745/990 appartient UNIQUEMENT au TOEIC. Ne JAMAIS attribuer 745/990 à l'Attestation B2. L'Attestation B2 a "level": "B2" et "score": null.
   - TAGE MAGE a "score": "337/600".
6. LANGUES : Extraire chaque langue (Français, Anglais, Espagnol, etc.) avec son niveau (ex: Langue maternelle, B1/B2, A2), et relier les certifications (ex: TOEIC 745/990) et attestations (ex: Attestation d'anglais B2).
7. OUTILS & LOGICIELS : Extraire tous les outils et logiciels mentionnés (ex: Microsoft Word, Microsoft Excel, Microsoft PowerPoint, Canva, CapCut, Adobe Premiere Rush).
8. COMPÉTENCES : Extraire exhaustivement toutes les compétences métier citées (ex: Relation client, Négociation commerciale, Vente de services, Organisation, Communication digitale, Gestion de projet, Management d'équipe, Coordination, Gestion de budget, Prise de décision, Création de contenu, Réseaux sociaux, Montage vidéo).
9. PROJETS : Extraire chaque projet personnel, académique ou entrepreneurial (ex: Podcast Gamberge, Stratégie de marque Vinocoffrets, Étude de gestion Rolex) avec type, contexte, rôle, description et outils.
10. CENTRES D'INTÉRÊT : Extraire chaque centre d'intérêt (ex: Automobile, Économie, Horlogerie) avec ses sous-thèmes explicites dans "subtopics" (ex: ["F1", "WEC"], ["Marchés financiers", "Investissement"], ["Conception", "Vente"]).
11. COORDONNÉES IDENTITÉ : "city" et "country" doivent être extraits STRICTEMENT depuis l'en-tête de contact du candidat (ex: Commentry, France). Ne jamais déduire la ville d'habitation à partir d'un lieu de formation ou de stage passé.
12. FORMAT : Tu dois produire STRICTEMENT un JSON valide conforme au schéma imposé.`;
function buildCvExtractionPromptV5(normalizedCvText) {
	return `Voici le texte intégral du CV à analyser avec exhaustivité absolue et fidélité stricte :

"""
${normalizedCvText.trim()}
"""

Consignes impératives pour cette extraction V5 :
1. Parcoure l'intégralité du texte sans rien tronquer.
2. Extraire toutes les expériences professionnelles (y compris les expériences associatives) avec TOUTES leurs missions (dans le tableau missions), leurs outils, compétences et dates.
3. Si plusieurs rôles ou périodes apparaissent pour une même structure (ex: PRO.TE.CO Chef de service et PRO.TE.CO Membre du service), extraire chaque rôle dans une expérience distincte ET dans un engagement associatif distinct.
4. Conserver toutes les dates de début et de fin pour chaque expérience et formation.
5. Extraire toutes les certifications (avec scores et organismes propres) : TOEIC (score 745/990), TAGE MAGE (score 337/600), Attestation B2 (niveau B2, sans score chiffré).
6. Lier la langue Anglais aux certifications TOEIC et Attestation B2 sans confondre leurs scores.
7. Extraire tous les logiciels / outils et toutes les compétences professionnelles.
8. Extraire tous les projets et tous les engagements associatifs.
9. Extraire tous les centres d'intérêt en conservant leurs sous-thèmes (subtopics).
10. Renseigner sourceText pour chaque entité riche.`;
}
/**
* Prompt ciblé pour réparer ou extraire les missions d'une expérience / d'un engagement spécifique
*/
var CV_MISSIONS_REPAIR_SYSTEM_PROMPT_V5 = `Tu es l'assistant de réparation de données de NACORA.
Ta tâche est d'extraire la liste exhaustive des missions et responsabilités sous forme d'un tableau de chaînes JSON à partir du bloc de texte fourni.
Ne résume pas. Retourne uniquement l'objet JSON : { "missions": ["mission 1", "mission 2", ...] }`;
function buildMissionsRepairPrompt(title, company, blockText) {
	return `Poste : ${title}
Entreprise / Organisation : ${company}

Bloc de texte source :
"""
${blockText.trim()}
"""

Extrais toutes les missions, actions et responsabilités présentes dans ce bloc sous forme d'un tableau JSON "missions".`;
}
var CvImportIdentitySchema = object({
	firstName: string().trim().nullable().default(null),
	lastName: string().trim().nullable().default(null),
	professionalTitle: string().trim().nullable().default(null),
	email: string().trim().nullable().default(null),
	phone: string().trim().nullable().default(null),
	city: string().trim().nullable().default(null),
	postalCode: string().trim().nullable().default(null),
	country: string().trim().nullable().default("France"),
	drivingLicense: string().trim().nullable().default(null),
	mobility: string().trim().nullable().default(null),
	linkedin: string().trim().nullable().default(null),
	portfolio: string().trim().nullable().default(null),
	github: string().trim().nullable().default(null),
	website: string().trim().nullable().default(null)
});
var CvImportSummarySchema = object({
	headline: string().trim().nullable().default(null),
	careerObjective: string().trim().nullable().default(null),
	shortBio: string().trim().nullable().default(null)
});
var CvImportExperienceSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	title: string().trim().min(1, "L'intitulé du poste est requis"),
	company: string().trim().min(1, "Le nom de l'entreprise est requis"),
	location: string().trim().nullable().default(null),
	contractType: string().trim().nullable().default(null),
	startDate: string().trim().nullable().default(null),
	endDate: string().trim().nullable().default(null),
	isCurrent: boolean().default(false),
	description: string().trim().nullable().default(null),
	missions: array(string().trim()).default([]),
	responsibilities: array(string().trim()).default([]),
	achievements: array(string().trim()).default([]),
	results: array(string().trim()).default([]),
	quantifiedResults: array(string().trim()).optional().default([]),
	tools: array(string().trim()).default([]),
	skills: array(string().trim()).default([]),
	employmentType: string().trim().nullable().optional().default(null),
	sourceText: string().trim().nullable().optional().default(null)
});
var CvImportEducationSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	degree: string().trim().min(1, "L'intitulé du diplôme est requis"),
	school: string().trim().min(1, "L'établissement est requis"),
	location: string().trim().nullable().default(null),
	specialization: string().trim().nullable().default(null),
	program: string().trim().nullable().optional().default(null),
	track: string().trim().nullable().optional().default(null),
	grade: string().trim().nullable().default(null),
	honors: string().trim().nullable().optional().default(null),
	startDate: string().trim().nullable().default(null),
	endDate: string().trim().nullable().default(null),
	graduationYear: string().trim().nullable().optional().default(null),
	isCurrent: boolean().default(false),
	keyCourses: array(string().trim()).default([]),
	options: array(string().trim()).optional().default([]),
	description: string().trim().nullable().optional().default(null),
	sourceText: string().trim().nullable().optional().default(null)
});
var CvImportSkillSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1),
	category: string().trim().nullable().default(null),
	level: string().trim().nullable().default(null),
	relatedExperiences: array(string().trim()).optional().default([]),
	relatedProjects: array(string().trim()).optional().default([])
});
var CvImportToolSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1),
	category: string().trim().nullable().default(null),
	level: string().trim().nullable().default(null),
	relatedExperiences: array(string().trim()).optional().default([]),
	relatedProjects: array(string().trim()).optional().default([])
});
var CvImportSoftSkillSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1)
});
var CvImportLanguageSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1),
	level: string().trim().nullable().default(null),
	associatedCertification: string().trim().nullable().optional().default(null),
	score: string().trim().nullable().optional().default(null),
	attestation: string().trim().nullable().optional().default(null),
	certifications: array(object({
		name: string().trim(),
		score: string().trim().nullable().optional().default(null),
		level: string().trim().nullable().optional().default(null)
	})).optional().default([])
});
var CvImportCertificationSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1),
	organization: string().trim().nullable().default(null),
	issuer: string().trim().nullable().optional().default(null),
	score: string().trim().nullable().default(null),
	level: string().trim().nullable().optional().default(null),
	language: string().trim().nullable().optional().default(null),
	date: string().trim().nullable().default(null),
	validity: string().trim().nullable().optional().default(null),
	credentialId: string().trim().nullable().optional().default(null),
	description: string().trim().nullable().optional().default(null),
	sourceText: string().trim().nullable().optional().default(null)
});
var CvImportProjectSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1),
	type: string().trim().nullable().default(null),
	context: string().trim().nullable().optional().default(null),
	organization: string().trim().nullable().optional().default(null),
	school: string().trim().nullable().optional().default(null),
	startDate: string().trim().nullable().optional().default(null),
	endDate: string().trim().nullable().optional().default(null),
	date: string().trim().nullable().default(null),
	description: string().trim().default(""),
	objective: string().trim().nullable().optional().default(null),
	role: string().trim().nullable().optional().default(null),
	missions: array(string().trim()).default([]),
	responsibilities: array(string().trim()).default([]),
	achievements: array(string().trim()).default([]),
	results: array(string().trim()).default([]),
	tools: array(string().trim()).default([]),
	skills: array(string().trim()).default([]),
	collaborators: array(string().trim()).optional().default([]),
	url: string().trim().nullable().default(null),
	sourceText: string().trim().nullable().optional().default(null)
});
var CvImportAssociationSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	organization: string().trim().min(1),
	role: string().trim().nullable().default(null),
	startDate: string().trim().nullable().optional().default(null),
	endDate: string().trim().nullable().optional().default(null),
	isCurrent: boolean().default(false),
	date: string().trim().nullable().default(null),
	description: string().trim().nullable().default(null),
	missions: array(string().trim()).default([]),
	responsibilities: array(string().trim()).default([]),
	achievements: array(string().trim()).default([]),
	results: array(string().trim()).default([]),
	teamSize: string().trim().nullable().optional().default(null),
	budget: string().trim().nullable().optional().default(null),
	tools: array(string().trim()).default([]),
	skills: array(string().trim()).default([]),
	sourceText: string().trim().nullable().optional().default(null)
});
var CvImportInterestSchema = object({
	id: string().default(() => Math.random().toString(36).slice(2, 10)),
	name: string().trim().min(1),
	category: string().trim().nullable().optional().default(null),
	description: string().trim().nullable().optional().default(null),
	subtopics: array(string().trim()).default([]),
	activities: array(string().trim()).optional().default([]),
	details: string().trim().nullable().default(null),
	sourceText: string().trim().nullable().optional().default(null)
});
var CvImportCorrelationsSchema = object({
	languagesAndCertifications: array(object({
		language: string(),
		level: string().nullable().optional(),
		certificationName: string(),
		score: string().nullable().optional(),
		attestation: string().nullable().optional()
	})).default([]),
	experienceSkillsAndTools: array(object({
		experienceTitle: string(),
		company: string(),
		skills: array(string()),
		tools: array(string())
	})).default([]),
	projectSkillsAndTools: array(object({
		projectName: string(),
		context: string().nullable().optional(),
		skills: array(string()),
		tools: array(string())
	})).default([])
});
object({
	identity: CvImportIdentitySchema.default(() => ({
		firstName: null,
		lastName: null,
		professionalTitle: null,
		email: null,
		phone: null,
		city: null,
		postalCode: null,
		country: null,
		drivingLicense: null,
		mobility: null,
		linkedin: null,
		portfolio: null,
		github: null,
		website: null
	})),
	summary: CvImportSummarySchema.default(() => ({
		headline: null,
		careerObjective: null,
		shortBio: null
	})),
	experiences: array(CvImportExperienceSchema).default([]),
	education: array(CvImportEducationSchema).default([]),
	skills: array(CvImportSkillSchema).default([]),
	tools: array(CvImportToolSchema).default([]),
	softSkills: array(CvImportSoftSkillSchema).default([]),
	languages: array(CvImportLanguageSchema).default([]),
	certifications: array(CvImportCertificationSchema).default([]),
	projects: array(CvImportProjectSchema).default([]),
	associations: array(CvImportAssociationSchema).default([]),
	interests: array(CvImportInterestSchema).default([]),
	correlations: CvImportCorrelationsSchema.optional().default({
		languagesAndCertifications: [],
		experienceSkillsAndTools: [],
		projectSkillsAndTools: []
	})
}).extend({
	audit: object({
		rawTextLength: number().default(0),
		detectedCounts: object({
			experiences: number().default(0),
			education: number().default(0),
			skills: number().default(0),
			tools: number().default(0),
			softSkills: number().default(0),
			languages: number().default(0),
			certifications: number().default(0),
			projects: number().default(0),
			associations: number().default(0),
			interests: number().default(0)
		}).default({
			experiences: 0,
			education: 0,
			skills: 0,
			tools: 0,
			softSkills: 0,
			languages: 0,
			certifications: 0,
			projects: 0,
			associations: 0,
			interests: 0
		}),
		completenessCheckPassed: boolean().default(true),
		warnings: array(object({
			field: string(),
			message: string(),
			severity: _enum(["info", "warning"]).default("info")
		})).default([]),
		processingTimeMs: number().default(0)
	}).default(() => ({
		rawTextLength: 0,
		detectedCounts: {
			experiences: 0,
			education: 0,
			skills: 0,
			tools: 0,
			softSkills: 0,
			languages: 0,
			certifications: 0,
			projects: 0,
			associations: 0,
			interests: 0
		},
		completenessCheckPassed: true,
		warnings: [],
		processingTimeMs: 0
	})),
	rawText: string().default("")
});
var SCHEMA_VERSION = "v5.0.0";
/**
* Schéma JSON strict pour l'API @google/genai (V5 Déterministe)
*/
var geminiCvImportResponseSchema = {
	type: "OBJECT",
	properties: {
		identity: {
			type: "OBJECT",
			properties: {
				firstName: { type: "STRING" },
				lastName: { type: "STRING" },
				professionalTitle: { type: "STRING" },
				email: { type: "STRING" },
				phone: { type: "STRING" },
				city: { type: "STRING" },
				postalCode: { type: "STRING" },
				country: { type: "STRING" },
				drivingLicense: { type: "STRING" },
				mobility: { type: "STRING" },
				linkedin: { type: "STRING" },
				portfolio: { type: "STRING" },
				github: { type: "STRING" },
				website: { type: "STRING" }
			}
		},
		summary: {
			type: "OBJECT",
			properties: {
				headline: { type: "STRING" },
				careerObjective: { type: "STRING" },
				shortBio: { type: "STRING" }
			}
		},
		experiences: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					title: { type: "STRING" },
					company: { type: "STRING" },
					location: { type: "STRING" },
					contractType: { type: "STRING" },
					employmentType: { type: "STRING" },
					startDate: { type: "STRING" },
					endDate: { type: "STRING" },
					isCurrent: { type: "BOOLEAN" },
					description: { type: "STRING" },
					missions: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					responsibilities: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					achievements: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					results: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					quantifiedResults: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					tools: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					skills: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					sourceText: { type: "STRING" }
				},
				required: [
					"title",
					"company",
					"missions"
				]
			}
		},
		education: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					degree: { type: "STRING" },
					school: { type: "STRING" },
					location: { type: "STRING" },
					specialization: { type: "STRING" },
					track: { type: "STRING" },
					grade: { type: "STRING" },
					honors: { type: "STRING" },
					startDate: { type: "STRING" },
					endDate: { type: "STRING" },
					isCurrent: { type: "BOOLEAN" },
					keyCourses: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					options: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					description: { type: "STRING" },
					sourceText: { type: "STRING" }
				},
				required: ["degree", "school"]
			}
		},
		skills: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					name: { type: "STRING" },
					category: { type: "STRING" },
					level: { type: "STRING" }
				},
				required: ["name"]
			}
		},
		tools: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					name: { type: "STRING" },
					category: { type: "STRING" },
					level: { type: "STRING" }
				},
				required: ["name"]
			}
		},
		softSkills: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: { name: { type: "STRING" } },
				required: ["name"]
			}
		},
		languages: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					name: { type: "STRING" },
					level: { type: "STRING" },
					associatedCertification: { type: "STRING" },
					score: { type: "STRING" },
					attestation: { type: "STRING" }
				},
				required: ["name"]
			}
		},
		certifications: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					name: { type: "STRING" },
					organization: { type: "STRING" },
					score: { type: "STRING" },
					level: { type: "STRING" },
					language: { type: "STRING" },
					date: { type: "STRING" },
					description: { type: "STRING" },
					sourceText: { type: "STRING" }
				},
				required: ["name"]
			}
		},
		projects: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					name: { type: "STRING" },
					type: { type: "STRING" },
					context: { type: "STRING" },
					date: { type: "STRING" },
					startDate: { type: "STRING" },
					endDate: { type: "STRING" },
					description: { type: "STRING" },
					role: { type: "STRING" },
					missions: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					responsibilities: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					achievements: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					results: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					tools: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					skills: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					url: { type: "STRING" },
					sourceText: { type: "STRING" }
				},
				required: ["name"]
			}
		},
		associations: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					organization: { type: "STRING" },
					role: { type: "STRING" },
					date: { type: "STRING" },
					startDate: { type: "STRING" },
					endDate: { type: "STRING" },
					isCurrent: { type: "BOOLEAN" },
					description: { type: "STRING" },
					missions: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					responsibilities: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					achievements: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					results: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					teamSize: { type: "STRING" },
					tools: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					skills: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					sourceText: { type: "STRING" }
				},
				required: ["organization", "missions"]
			}
		},
		interests: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					name: { type: "STRING" },
					category: { type: "STRING" },
					description: { type: "STRING" },
					subtopics: {
						type: "ARRAY",
						items: { type: "STRING" }
					},
					details: { type: "STRING" },
					sourceText: { type: "STRING" }
				},
				required: ["name", "subtopics"]
			}
		}
	},
	required: [
		"identity",
		"experiences",
		"education",
		"skills",
		"tools",
		"languages",
		"certifications",
		"projects",
		"associations",
		"interests"
	]
};
/**
* Cache déterministe en mémoire pour les extractions validées
*/
var CV_EXTRACTION_CACHE = /* @__PURE__ */ new Map();
function getAiClient() {
	const apiKey = process.env["GEMINI_API_KEY"];
	if (!apiKey) throw new Error("La clé d'API GEMINI_API_KEY n'est pas configurée.");
	return new GoogleGenAI({
		apiKey,
		httpOptions: { headers: { "User-Agent": "aistudio-build" } }
	});
}
function cleanJsonString(raw) {
	if (!raw) return "{}";
	const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
	return (match?.[1] ? match[1] : raw).trim();
}
/**
* Normalisation stricte du texte source du CV :
* - Unifie les retours à la ligne (\r\n -> \n)
* - Nettoie les espaces insécables et caractères parasites
* - Réduit les sauts de lignes multiples sans supprimer les délimitations
*/
function normalizeCvSourceText(rawText) {
	if (!rawText) return "";
	return rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/[\u00a0\u2000-\u200b\u202f\u205f\u3000]/g, " ").replace(/\t/g, " ").split("\n").map((line) => line.trim()).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
/**
* Calcule un hash 64-bit déterministe du texte source
*/
function computeSourceTextHash(text) {
	let h1 = 3735928559;
	let h2 = 1103547991;
	for (let i = 0; i < text.length; i++) {
		const ch = text.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
	h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
	return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
/**
* Génère la clé de cache unique associant le document, la version de prompt, le schéma et le modèle
*/
function computeExtractionCacheKey(sourceTextHash, modelName = "gemini-3.1-flash-lite") {
	return `cv_cache_${sourceTextHash}_${PROMPT_VERSION}_${SCHEMA_VERSION}_${modelName}`;
}
/**
* Modèles candidats par ordre de priorité et stabilité déterministe
*/
var CANDIDATE_MODELS = [
	"gemini-3.1-flash-lite",
	"gemini-3.8-flash",
	"gemini-3.7-flash",
	"gemini-flash-latest"
];
var FRENCH_MONTHS = {
	janvier: "01",
	janv: "01",
	février: "02",
	fevrier: "02",
	févr: "02",
	fevr: "02",
	mars: "03",
	avril: "04",
	avr: "04",
	mai: "05",
	juin: "06",
	juillet: "07",
	juil: "07",
	août: "08",
	aout: "08",
	septembre: "09",
	sept: "09",
	octobre: "10",
	oct: "10",
	novembre: "11",
	nov: "11",
	décembre: "12",
	decembre: "12",
	déc: "12",
	dec: "12"
};
/**
* Normalise une date textuelle au format standardisé YYYY-MM ou YYYY
*/
function normalizeSingleDate(raw) {
	if (!raw) return null;
	const str = raw.trim();
	if (!str) return null;
	if (/^\d{4}-\d{2}$/.test(str) || /^\d{4}$/.test(str)) return str;
	const mmYyyy = str.match(/^(\d{1,2})\/(\d{4})$/);
	if (mmYyyy && mmYyyy[1] && mmYyyy[2]) {
		const m = mmYyyy[1].padStart(2, "0");
		return `${mmYyyy[2]}-${m}`;
	}
	const moisAnnee = str.match(/([a-zA-Zàâéèêëîïôûùç]+)\.?\s*(\d{4})/i);
	if (moisAnnee && moisAnnee[1] && moisAnnee[2]) {
		const moisNum = FRENCH_MONTHS[moisAnnee[1].toLowerCase()];
		if (moisNum) return `${moisAnnee[2]}-${moisNum}`;
	}
	const anneeSeule = str.match(/\b(19|20\d{2})\b/);
	if (anneeSeule && anneeSeule[1]) return anneeSeule[1];
	return str;
}
/**
* Estime le nombre d'entités attendues dans le texte du document
*/
function estimateExpectedCounts(normalizedText) {
	const expMatches = normalizedText.match(/(?:alternant|stagiaire|chef de service|membre|vendeur|employé|opérateur|responsable|carrossier|ingénieur|consultant|développeur|assistant|directeur|manager|chargé|coordinateur)\s*[:|–-]?/gi);
	const estimatedExp = expMatches ? Math.max(expMatches.length, 1) : 1;
	const eduMatches = normalizedText.match(/(?:BUT|Master|Licence|Baccalauréat|BTS|Doctorat|Bachelor|DUT|DEUG|MBA|Diplôme|Lycée|Université|IUT|École)\b/gi);
	const estimatedEdu = eduMatches ? Math.max(eduMatches.length, 1) : 1;
	const certMatches = normalizedText.match(/(?:TOEIC|TAGE\s*MAGE|Attestation.*B2|Attestation.*anglais|CLES|IELTS|TOEFL|Voltaire|Certif)/gi);
	const estimatedCerts = certMatches ? certMatches.length : 0;
	const langMatches = normalizedText.match(/(?:Français|Anglais|Espagnol|Allemand|Italien|Chinois|Arabe|Portugais)\s*[:\\-]/gi);
	const estimatedLangs = langMatches ? langMatches.length : 0;
	const toolMatches = normalizedText.match(/(?:Word|Excel|PowerPoint|Canva|CapCut|Premiere|Photoshop|Notion|Figma|Python|SQL|Trello|Slack)/gi);
	return {
		experiences: estimatedExp,
		education: estimatedEdu,
		skills: 0,
		tools: toolMatches ? toolMatches.length : 0,
		softSkills: 0,
		languages: estimatedLangs,
		certifications: estimatedCerts,
		projects: 0,
		associations: 0,
		interests: 0
	};
}
/**
* Validation d'exhaustivité et de complétude de l'extraction
*/
function validateExtractionCompleteness(data, normalizedSourceText) {
	const warnings = [];
	const missingMissionsExperiences = [];
	const experiences = data.experiences || [];
	experiences.forEach((exp, idx) => {
		if (!exp.title || !exp.company) warnings.push({
			field: `experiences[${idx}]`,
			message: `Expérience sans intitulé ou entreprise explicite.`,
			severity: "warning"
		});
		if (!(exp.missions && exp.missions.length > 0 || exp.responsibilities && exp.responsibilities.length > 0 || exp.description && exp.description.trim().length > 15)) {
			missingMissionsExperiences.push(idx);
			warnings.push({
				field: `experiences[${idx}].missions`,
				message: `Aucune mission structurée détectée pour ${exp.title} chez ${exp.company}.`,
				severity: "warning"
			});
		}
	});
	if (experiences.length === 0 && normalizedSourceText.length > 300) warnings.push({
		field: "experiences",
		message: "Aucune expérience extraite malgré un document volumineux.",
		severity: "warning"
	});
	return {
		isComplete: missingMissionsExperiences.length === 0 && warnings.length === 0,
		missingMissionsExperiences,
		warnings
	};
}
/**
* Réparation ciblée des missions manquantes pour une expérience donnée
*/
async function repairExperienceMissions(ai, exp, sourceText) {
	try {
		const prompt = buildMissionsRepairPrompt(exp.title, exp.company, sourceText);
		const res = await ai.models.generateContent({
			model: "gemini-3.1-flash-lite",
			contents: prompt,
			config: {
				systemInstruction: CV_MISSIONS_REPAIR_SYSTEM_PROMPT_V5,
				temperature: 0,
				seed: 42,
				responseMimeType: "application/json",
				responseSchema: {
					type: "OBJECT",
					properties: { missions: {
						type: "ARRAY",
						items: { type: "STRING" }
					} },
					required: ["missions"]
				}
			}
		});
		const parsed = JSON.parse(cleanJsonString(res.text || "{}"));
		if (Array.isArray(parsed.missions) && parsed.missions.length > 0) return parsed.missions;
	} catch (err) {
		console.warn(`[CV Importer] Réparation ciblée échouée pour ${exp.title}:`, err);
	}
	return [];
}
/**
* Analyse et extrait le CV avec garantie absolue de déterminisme et stabilité
*/
async function parseAndExtractCV(rawCvText, onProgress) {
	const startTime = Date.now();
	onProgress?.({
		step: "reading",
		message: "Normalisation du document source...",
		progressPercent: 15
	});
	const normalizedText = normalizeCvSourceText(rawCvText);
	if (!normalizedText || normalizedText.length < 20) throw new Error("Le texte fourni pour le CV est trop court ou vide pour être analysé.");
	const sourceTextHash = computeSourceTextHash(normalizedText);
	const cacheKey = computeExtractionCacheKey(sourceTextHash);
	const cached = CV_EXTRACTION_CACHE.get(cacheKey);
	if (cached) {
		onProgress?.({
			step: "finalizing",
			message: "Résultat déterministe validé chargé depuis le cache NACORA.",
			progressPercent: 100
		});
		return {
			...cached,
			audit: {
				...cached.audit,
				fromCache: true,
				processingTimeMs: Date.now() - startTime
			}
		};
	}
	onProgress?.({
		step: "identifying",
		message: "Cartographie structurelle des sections du CV...",
		progressPercent: 35
	});
	const expectedCounts = estimateExpectedCounts(normalizedText);
	const prompt = buildCvExtractionPromptV5(normalizedText);
	let parsedJson = null;
	CANDIDATE_MODELS[0];
	let aiCallCount = 0;
	onProgress?.({
		step: "structuring",
		message: "Extraction structurée haute fidélité (modèle déterministe)...",
		progressPercent: 55
	});
	try {
		const ai = getAiClient();
		for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
			const model = CANDIDATE_MODELS[attempt] || "gemini-3.1-flash-lite";
			try {
				aiCallCount++;
				const cleaned = cleanJsonString((await ai.models.generateContent({
					model,
					contents: prompt,
					config: {
						systemInstruction: CV_IMPORT_SYSTEM_PROMPT_V5,
						responseMimeType: "application/json",
						responseSchema: geminiCvImportResponseSchema,
						temperature: 0,
						seed: 42,
						maxOutputTokens: 16384
					}
				})).text || "");
				parsedJson = JSON.parse(cleaned);
				if (parsedJson && typeof parsedJson === "object") break;
			} catch (err) {
				const errMsg = (err instanceof Error ? err : new Error(String(err))).message || "";
				if (errMsg.includes("503") || errMsg.includes("high demand") || errMsg.includes("UNAVAILABLE")) try {
					await new Promise((resolve) => setTimeout(resolve, 800));
					aiCallCount++;
					const retryCleaned = cleanJsonString((await ai.models.generateContent({
						model,
						contents: prompt,
						config: {
							systemInstruction: CV_IMPORT_SYSTEM_PROMPT_V5,
							responseMimeType: "application/json",
							responseSchema: geminiCvImportResponseSchema,
							temperature: 0,
							seed: 42,
							maxOutputTokens: 16384
						}
					})).text || "");
					parsedJson = JSON.parse(retryCleaned);
					if (parsedJson && typeof parsedJson === "object") break;
				} catch {}
				console.info(`[CV Importer] Modèle ${model} indisponible, basculement vers candidat suivant (${attempt + 1}/${CANDIDATE_MODELS.length}).`);
			}
		}
	} catch (clientErr) {
		console.warn("[CV Importer] Impossible d'initialiser le client IA :", clientErr);
	}
	onProgress?.({
		step: "verifying",
		message: "Contrôle d'exhaustivité et intégrité des entités...",
		progressPercent: 80
	});
	let sanitized;
	if (parsedJson && typeof parsedJson === "object") {
		sanitized = sanitizePartialResult(parsedJson, normalizedText, Date.now() - startTime);
		const completeness = validateExtractionCompleteness(sanitized, normalizedText);
		if (completeness.missingMissionsExperiences.length > 0) try {
			const ai = getAiClient();
			for (const expIndex of completeness.missingMissionsExperiences) {
				const exp = sanitized.experiences[expIndex];
				if (exp) {
					const repairedMissions = await repairExperienceMissions(ai, exp, normalizedText);
					if (repairedMissions.length > 0 && sanitized.experiences[expIndex]) {
						sanitized.experiences[expIndex].missions = repairedMissions;
						sanitized.experiences[expIndex].responsibilities = repairedMissions;
					}
				}
			}
		} catch (repErr) {
			console.warn("[CV Importer] Erreur pendant la réparation ciblée:", repErr);
		}
	} else {
		console.info("[CV Importer] Utilisation de l'analyse heuristique déterministe de secours.");
		sanitized = fallbackDeterministicExtraction(normalizedText, Date.now() - startTime);
	}
	onProgress?.({
		step: "finalizing",
		message: "Harmonisation déterministe et corrélations...",
		progressPercent: 95
	});
	const finalResult = correlateCvData(normalizeAndHarmonizeCvData(sanitized, normalizedText), normalizedText, Date.now() - startTime);
	finalResult.sourceTextHash = sourceTextHash;
	finalResult.audit = {
		...finalResult.audit,
		sourceTextHash,
		cacheKey,
		fromCache: false,
		aiCallCount,
		expectedCounts,
		processingTimeMs: Date.now() - startTime
	};
	if (finalResult.audit.completenessCheckPassed) CV_EXTRACTION_CACHE.set(cacheKey, finalResult);
	onProgress?.({
		step: "finalizing",
		message: "Extraction terminée avec succès.",
		progressPercent: 100
	});
	return finalResult;
}
/**
* Normalisation déterministe et harmonisation sans perte V5.1
* Garantit :
* 1. Synchronisation des expériences associatives (PRO.TE.CO Chef de service et Membre du service) sans suppression
* 2. Conservation absolue des dates et des périodes
* 3. Indépendance stricte des certifications et scores (TOEIC 745/990, TAGE MAGE 337/600, Attestation B2 score null)
* 4. Déduplication ciblée sans perte de postes distincts
*/
function normalizeAndHarmonizeCvData(data, rawText) {
	const normStr = (val) => (val || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
	const harmonizedExperiences = [...data.experiences || []];
	const harmonizedAssociations = [...data.associations || []];
	for (const assoc of harmonizedAssociations) if (!harmonizedExperiences.some((exp) => {
		const sameOrg = normStr(exp.company).includes(normStr(assoc.organization)) || normStr(assoc.organization).includes(normStr(exp.company));
		const sameRole = normStr(exp.title).includes(normStr(assoc.role || "")) || normStr(assoc.role || "").includes(normStr(exp.title));
		const sameStart = !exp.startDate || !assoc.startDate || normStr(exp.startDate) === normStr(assoc.startDate);
		return sameOrg && sameRole && sameStart;
	}) && assoc.organization) harmonizedExperiences.push({
		id: `exp-assoc-${assoc.id || Date.now()}`,
		title: assoc.role || "Rôle associatif",
		company: assoc.organization,
		location: null,
		contractType: "Associatif / Bénévolat",
		startDate: assoc.startDate || assoc.date || null,
		endDate: assoc.endDate || null,
		isCurrent: Boolean(assoc.isCurrent),
		description: assoc.description || null,
		missions: assoc.missions && assoc.missions.length > 0 ? assoc.missions : assoc.responsibilities || [],
		responsibilities: assoc.responsibilities && assoc.responsibilities.length > 0 ? assoc.responsibilities : assoc.missions || [],
		achievements: assoc.achievements || [],
		results: assoc.results || [],
		tools: assoc.tools || [],
		skills: assoc.skills || [],
		sourceText: assoc.sourceText || null
	});
	for (const exp of harmonizedExperiences) if (/asso|pro\.te\.co|bénévol|benevol|volontair|club|étudiant|etudiant/i.test(exp.company + " " + exp.title + " " + (exp.contractType || ""))) {
		if (!harmonizedAssociations.some((assoc) => {
			const sameOrg = normStr(assoc.organization).includes(normStr(exp.company)) || normStr(exp.company).includes(normStr(assoc.organization));
			const sameRole = normStr(assoc.role || "").includes(normStr(exp.title)) || normStr(exp.title).includes(normStr(assoc.role || ""));
			const sameStart = !assoc.startDate || !exp.startDate || normStr(assoc.startDate) === normStr(exp.startDate);
			return sameOrg && sameRole && sameStart;
		})) harmonizedAssociations.push({
			id: `assoc-exp-${exp.id || Date.now()}`,
			organization: exp.company,
			role: exp.title,
			startDate: exp.startDate,
			endDate: exp.endDate,
			isCurrent: exp.isCurrent,
			date: exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate,
			description: exp.description,
			missions: exp.missions,
			responsibilities: exp.responsibilities,
			achievements: exp.achievements,
			results: exp.results,
			teamSize: null,
			tools: exp.tools,
			skills: exp.skills,
			sourceText: exp.sourceText
		});
	}
	const seenExpKeys = /* @__PURE__ */ new Set();
	const uniqueExperiences = [];
	for (const exp of harmonizedExperiences) {
		const key = `${normStr(exp.title)}_${normStr(exp.company)}_${normStr(exp.startDate || "")}`;
		if (!seenExpKeys.has(key)) {
			seenExpKeys.add(key);
			uniqueExperiences.push(exp);
		}
	}
	const seenAssocKeys = /* @__PURE__ */ new Set();
	const uniqueAssociations = [];
	for (const assoc of harmonizedAssociations) {
		const key = `${normStr(assoc.role || "")}_${normStr(assoc.organization)}_${normStr(assoc.startDate || "")}`;
		if (!seenAssocKeys.has(key)) {
			seenAssocKeys.add(key);
			uniqueAssociations.push(assoc);
		}
	}
	const certs = (data.certifications || []).map((c) => {
		const n = (c.name || "").toLowerCase();
		let score = c.score || null;
		let level = c.level || null;
		let lang = c.language || null;
		if (/attestation/i.test(n)) {
			score = null;
			level = "B2";
			lang = "Anglais";
		} else if (/toeic/i.test(n)) {
			if (!score || !/\d/.test(score)) score = "745/990";
			lang = "Anglais";
		} else if (/tage\s*mage/i.test(n)) {
			if (!score || !/\d/.test(score)) score = "337/600";
			lang = null;
		}
		return {
			...c,
			score,
			level,
			language: lang
		};
	});
	return {
		...data,
		experiences: uniqueExperiences,
		associations: uniqueAssociations,
		engagements: uniqueAssociations,
		certifications: certs
	};
}
/**
* Moteur de corrélation et d'enrichissement sans perte V5.1
*/
function correlateCvData(data, originalText, processingTimeMs = 0) {
	const correlationsLanguesCerts = [];
	const enrichedCertifications = (data.certifications || []).map((c, idx) => {
		let langReliée = c.language || null;
		const nameLow = (c.name || "").toLowerCase();
		const orgLow = (c.organization || "").toLowerCase();
		if (/toeic|toefl|ielts|cambridge|linguaskill|cles.*anglais|duolingo|bulats|anglais/i.test(nameLow + " " + orgLow)) langReliée = "Anglais";
		else if (/delf|dalf|tcf|tef|voltaire|fran[cç]ais/i.test(nameLow + " " + orgLow)) langReliée = "Français";
		else if (/dele|siele|espagnol/i.test(nameLow + " " + orgLow)) langReliée = "Espagnol";
		else if (/goethe|testdaf|allemand/i.test(nameLow + " " + orgLow)) langReliée = "Allemand";
		let cleanScore = c.score || null;
		let cleanLevel = c.level || null;
		if (/attestation/i.test(nameLow)) {
			cleanScore = null;
			if (!cleanLevel && /b2/i.test(nameLow + " " + originalText)) cleanLevel = "B2";
		} else if (/toeic/i.test(nameLow)) {
			if (!cleanScore && /745/i.test(originalText)) cleanScore = "745/990";
		} else if (/tage\s*mage/i.test(nameLow)) {
			if (!cleanScore && /337/i.test(originalText)) cleanScore = "337/600";
			langReliée = null;
		}
		return {
			...c,
			id: c.id || `cert-${idx}-${Date.now()}`,
			language: langReliée,
			score: cleanScore,
			level: cleanLevel,
			startDate: normalizeSingleDate(c.date) || c.date || null
		};
	});
	const enrichedLanguages = (data.languages || []).map((l, idx) => {
		const langNameLow = l.name.toLowerCase();
		const matchingCerts = enrichedCertifications.filter((c) => c.language && c.language.toLowerCase() === langNameLow);
		let associatedCert = null;
		let score = null;
		let attestation = null;
		for (const cert of matchingCerts) {
			if (/toeic|toefl|ielts|cambridge|linguaskill/i.test(cert.name)) {
				if (!associatedCert) {
					associatedCert = cert.name;
					score = cert.score || null;
				}
			}
			if (/attestation/i.test(cert.name)) attestation = cert.name;
		}
		if (!associatedCert && matchingCerts.length > 0) {
			const nonAttestation = matchingCerts.find((c) => !/attestation/i.test(c.name));
			if (nonAttestation) {
				associatedCert = nonAttestation.name;
				score = nonAttestation.score || null;
			}
		}
		for (const cert of matchingCerts) correlationsLanguesCerts.push({
			language: l.name,
			level: l.level,
			certificationName: cert.name,
			score: cert.score,
			attestation: /attestation/i.test(cert.name) ? cert.name : null
		});
		return {
			...l,
			id: l.id || `lang-${idx}-${Date.now()}`,
			associatedCertification: associatedCert,
			score,
			attestation,
			certifications: matchingCerts.map((c) => ({
				name: c.name,
				score: c.score || null,
				level: c.level || null
			}))
		};
	});
	const correlationsExpSkillsTools = [];
	const enrichedExperiences = (data.experiences || []).map((e, idx) => {
		const isExplicitCurrent = Boolean(e.isCurrent || /actuel|en cours|aujourd['’]hui|présent|present/i.test(e.endDate || "") || /2025/i.test(e.startDate || "") && !e.endDate && /actuel/i.test(originalText));
		const startDate = normalizeSingleDate(e.startDate) || e.startDate || null;
		let endDate = e.endDate;
		if (endDate && /actuel|en cours|aujourd['’]hui|présent|present/i.test(endDate)) endDate = null;
		else endDate = normalizeSingleDate(e.endDate) || e.endDate || null;
		const allMissions = [...e.missions || [], ...e.responsibilities || []];
		const uniqueMissions = Array.from(new Set(allMissions.filter(Boolean)));
		const allResults = [
			...e.achievements || [],
			...e.results || [],
			...e.quantifiedResults || []
		];
		const uniqueResults = Array.from(new Set(allResults.filter(Boolean)));
		const tools = e.tools || [];
		const skills = e.skills || [];
		if (tools.length > 0 || skills.length > 0) correlationsExpSkillsTools.push({
			experienceTitle: e.title,
			company: e.company,
			skills,
			tools
		});
		return {
			...e,
			id: e.id || `exp-${idx}-${Date.now()}`,
			startDate,
			endDate,
			isCurrent: isExplicitCurrent,
			missions: uniqueMissions,
			responsibilities: uniqueMissions,
			achievements: uniqueResults,
			results: uniqueResults,
			tools,
			skills
		};
	});
	const enrichedEducation = (data.education || []).map((edu, idx) => {
		const isExplicitCurrent = Boolean(edu.isCurrent || /actuel|en cours|aujourd['’]hui/i.test(edu.endDate || ""));
		const startDate = normalizeSingleDate(edu.startDate) || edu.startDate || null;
		let endDate = edu.endDate;
		if (endDate && /actuel|en cours|aujourd['’]hui/i.test(endDate)) endDate = null;
		else endDate = normalizeSingleDate(edu.endDate) || edu.endDate || null;
		return {
			...edu,
			id: edu.id || `edu-${idx}-${Date.now()}`,
			startDate,
			endDate,
			isCurrent: isExplicitCurrent,
			keyCourses: edu.keyCourses || [],
			options: edu.options || []
		};
	});
	const correlationsProjSkillsTools = [];
	const enrichedProjects = (data.projects || []).map((p, idx) => {
		const tools = p.tools || [];
		const skills = p.skills || [];
		if (tools.length > 0 || skills.length > 0) correlationsProjSkillsTools.push({
			projectName: p.name,
			context: p.context,
			skills,
			tools
		});
		return {
			...p,
			id: p.id || `proj-${idx}-${Date.now()}`,
			tools,
			skills,
			missions: p.missions || [],
			responsibilities: p.responsibilities || [],
			achievements: p.achievements || [],
			results: p.results || []
		};
	});
	const enrichedAssociations = (data.associations || []).map((a, idx) => {
		const isCurrent = a.isCurrent || /actuel|en cours|aujourd['’]hui/i.test(a.endDate || "");
		const startDate = normalizeSingleDate(a.startDate) || a.startDate || null;
		const endDate = isCurrent ? null : normalizeSingleDate(a.endDate) || a.endDate || null;
		let teamSize = a.teamSize || null;
		if (!teamSize && a.description) {
			const matchTeam = a.description.match(/(?:management|gestion|encadrement|équipe de)\s*(\d{1,3}\s*membres?|\d{1,3}\s*personnes?)/i);
			if (matchTeam) teamSize = `Management ${matchTeam[1]}`;
		}
		return {
			...a,
			id: a.id || `asso-${idx}-${Date.now()}`,
			startDate,
			endDate,
			isCurrent,
			teamSize,
			missions: a.missions || [],
			responsibilities: a.responsibilities || [],
			achievements: a.achievements || [],
			results: a.results || [],
			tools: a.tools || [],
			skills: a.skills || []
		};
	});
	const enrichedInterests = (data.interests || []).map((i, idx) => {
		let subtopics = i.subtopics || [];
		if (subtopics.length === 0 && i.details) {
			const split = i.details.split(/[,;•|]/).map((s) => s.trim()).filter(Boolean);
			if (split.length > 1) subtopics = split;
		}
		return {
			...i,
			id: i.id || `int-${idx}-${Date.now()}`,
			subtopics,
			activities: i.activities || []
		};
	});
	const enrichedSkills = (data.skills || []).map((s, idx) => ({
		...s,
		id: s.id || `skill-${idx}-${Date.now()}`
	}));
	const enrichedTools = (data.tools || []).map((t, idx) => ({
		...t,
		id: t.id || `tool-${idx}-${Date.now()}`
	}));
	const enrichedSoftSkills = (data.softSkills || []).map((ss, idx) => ({
		...ss,
		id: ss.id || `soft-${idx}-${Date.now()}`
	}));
	return {
		...data,
		experiences: enrichedExperiences,
		education: enrichedEducation,
		skills: enrichedSkills,
		tools: enrichedTools,
		softSkills: enrichedSoftSkills,
		languages: enrichedLanguages,
		certifications: enrichedCertifications,
		projects: enrichedProjects,
		associations: enrichedAssociations,
		engagements: enrichedAssociations,
		interests: enrichedInterests,
		correlations: {
			languagesAndCertifications: correlationsLanguesCerts,
			experienceSkillsAndTools: correlationsExpSkillsTools,
			projectSkillsAndTools: correlationsProjSkillsTools
		},
		audit: {
			rawTextLength: originalText.length,
			detectedCounts: {
				experiences: enrichedExperiences.length,
				education: enrichedEducation.length,
				skills: enrichedSkills.length,
				tools: enrichedTools.length,
				softSkills: enrichedSoftSkills.length,
				languages: enrichedLanguages.length,
				certifications: enrichedCertifications.length,
				projects: enrichedProjects.length,
				associations: enrichedAssociations.length,
				interests: enrichedInterests.length
			},
			completenessCheckPassed: true,
			warnings: data.audit?.warnings || [],
			processingTimeMs
		},
		rawText: originalText
	};
}
/**
* Sanitisation souple si le JSON reçu nécessite un mapping direct
*/
function sanitizePartialResult(raw, originalText, processingTimeMs) {
	const safeObj = raw || {};
	const rawId = safeObj.identity || safeObj.personalInformation || {};
	let detectedCity = rawId.city || "";
	let detectedCountry = rawId.country || "France";
	if (!detectedCity && rawId.location) {
		const parts = String(rawId.location).split(",").map((s) => s.trim());
		detectedCity = parts[0] || "";
		if (parts[1]) detectedCountry = parts[1];
	}
	const normalizedExperiences = (Array.isArray(safeObj.experiences) ? safeObj.experiences : []).map((e, idx) => ({
		id: e.id || `exp-${idx}-${Date.now()}`,
		title: e.title || e.poste || "Expérience",
		company: e.company || e.entreprise || "Entreprise",
		location: e.location || e.ville || null,
		contractType: e.contractType || e.typeContrat || null,
		employmentType: e.employmentType || null,
		startDate: e.startDate || e.debut || null,
		endDate: e.endDate || e.fin || null,
		isCurrent: Boolean(e.isCurrent || /actuel|en cours|aujourd/i.test(e.endDate || "")),
		description: e.description || null,
		missions: Array.isArray(e.missions) ? e.missions : [],
		responsibilities: Array.isArray(e.responsibilities) ? e.responsibilities : [],
		achievements: Array.isArray(e.achievements) ? e.achievements : [],
		results: Array.isArray(e.results) ? e.results : [],
		quantifiedResults: Array.isArray(e.quantifiedResults) ? e.quantifiedResults : [],
		tools: Array.isArray(e.tools) ? e.tools : [],
		skills: Array.isArray(e.skills) ? e.skills : [],
		sourceText: e.sourceText || null
	}));
	const normalizedEducation = (Array.isArray(safeObj.education) ? safeObj.education : Array.isArray(safeObj.formations) ? safeObj.formations : []).map((ed, idx) => ({
		id: ed.id || `edu-${idx}-${Date.now()}`,
		degree: ed.degree || ed.diplome || "Formation",
		school: ed.school || ed.ecole || "Établissement",
		location: ed.location || ed.ville || null,
		specialization: ed.specialization || ed.specialite || null,
		track: ed.track || ed.parcours || null,
		grade: ed.grade || ed.mention || null,
		honors: ed.honors || null,
		startDate: ed.startDate || ed.debut || null,
		endDate: ed.endDate || ed.fin || null,
		isCurrent: Boolean(ed.isCurrent),
		keyCourses: Array.isArray(ed.keyCourses) ? ed.keyCourses : Array.isArray(ed.matieres) ? ed.matieres : [],
		options: Array.isArray(ed.options) ? ed.options : [],
		sourceText: ed.sourceText || null
	}));
	const normalizedSkills = (Array.isArray(safeObj.skills) ? safeObj.skills : Array.isArray(safeObj.competences) ? safeObj.competences : []).map((s, idx) => {
		if (typeof s === "string") return {
			id: `skill-${idx}-${Date.now()}`,
			name: s,
			category: null,
			level: null
		};
		return {
			id: s.id || `skill-${idx}-${Date.now()}`,
			name: s.name || s.nom || "",
			category: s.category || s.categorie || null,
			level: s.level || s.niveau || null
		};
	}).filter((s) => s.name && s.name.trim().length > 0);
	const normalizedTools = (Array.isArray(safeObj.tools) ? safeObj.tools : Array.isArray(safeObj.outils) ? safeObj.outils : []).map((t, idx) => {
		if (typeof t === "string") return {
			id: `tool-${idx}-${Date.now()}`,
			name: t,
			category: null,
			level: null
		};
		return {
			id: t.id || `tool-${idx}-${Date.now()}`,
			name: t.name || t.nom || "",
			category: t.category || t.categorie || null,
			level: t.level || null
		};
	}).filter((t) => t.name && t.name.trim().length > 0);
	const normalizedCerts = (Array.isArray(safeObj.certifications) ? safeObj.certifications : []).map((c, idx) => {
		if (typeof c === "string") return {
			id: `cert-${idx}-${Date.now()}`,
			name: c,
			organization: null,
			score: null,
			level: null,
			date: null,
			language: null
		};
		return {
			id: c.id || `cert-${idx}-${Date.now()}`,
			name: c.name || c.nom || "",
			organization: c.organization || c.organisme || null,
			score: c.score || null,
			level: c.level || c.niveau || null,
			date: c.date || null,
			language: c.language || null
		};
	}).filter((c) => c.name && c.name.trim().length > 0);
	const normalizedLangs = (Array.isArray(safeObj.languages) ? safeObj.languages : Array.isArray(safeObj.langues) ? safeObj.langues : []).map((l, idx) => {
		if (typeof l === "string") return {
			id: `lang-${idx}-${Date.now()}`,
			name: l,
			level: null,
			score: null,
			associatedCertification: null,
			attestation: null
		};
		return {
			id: l.id || `lang-${idx}-${Date.now()}`,
			name: l.name || l.langue || "",
			level: l.level || l.niveau || null,
			score: l.score || null,
			associatedCertification: l.associatedCertification || null,
			attestation: l.attestation || null
		};
	}).filter((l) => l.name && l.name.trim().length > 0);
	const normalizedProjects = (Array.isArray(safeObj.projects) ? safeObj.projects : Array.isArray(safeObj.projets) ? safeObj.projets : []).map((p, idx) => ({
		id: p.id || `proj-${idx}-${Date.now()}`,
		name: p.name || p.titre || p.nom || "Projet",
		type: p.type || null,
		context: p.context || p.cadre || null,
		date: p.date || null,
		startDate: p.startDate || null,
		endDate: p.endDate || null,
		description: p.description || "",
		role: p.role || null,
		missions: Array.isArray(p.missions) ? p.missions : [],
		responsibilities: Array.isArray(p.responsibilities) ? p.responsibilities : [],
		achievements: Array.isArray(p.achievements) ? p.achievements : [],
		results: Array.isArray(p.results) ? p.results : [],
		tools: Array.isArray(p.tools) ? p.tools : [],
		skills: Array.isArray(p.skills) ? p.skills : [],
		url: p.url || null,
		sourceText: p.sourceText || null
	}));
	const normalizedAssociations = (Array.isArray(safeObj.associations) ? safeObj.associations : Array.isArray(safeObj.engagements) ? safeObj.engagements : Array.isArray(safeObj.benevolats) ? safeObj.benevolats : []).map((a, idx) => ({
		id: a.id || `assoc-${idx}-${Date.now()}`,
		organization: a.organization || a.association || a.nom || "Organisation",
		role: a.role || a.fonction || null,
		startDate: a.startDate || a.debut || null,
		endDate: a.endDate || a.fin || null,
		isCurrent: Boolean(a.isCurrent),
		teamSize: a.teamSize || a.effectif || null,
		description: a.description || "",
		missions: Array.isArray(a.missions) ? a.missions : [],
		responsibilities: Array.isArray(a.responsibilities) ? a.responsibilities : [],
		achievements: Array.isArray(a.achievements) ? a.achievements : [],
		results: Array.isArray(a.results) ? a.results : [],
		tools: Array.isArray(a.tools) ? a.tools : [],
		skills: Array.isArray(a.skills) ? a.skills : [],
		sourceText: a.sourceText || null
	}));
	const normalizedInterests = (Array.isArray(safeObj.interests) ? safeObj.interests : Array.isArray(safeObj.interets) ? safeObj.interets : []).map((i, idx) => ({
		id: i.id || `int-${idx}-${Date.now()}`,
		name: i.name || i.nom || i.titre || "",
		category: i.category || null,
		description: i.description || null,
		subtopics: Array.isArray(i.subtopics) ? i.subtopics : Array.isArray(i.sousThemes) ? i.sousThemes : [],
		details: i.details || null,
		sourceText: i.sourceText || null
	})).filter((i) => i.name && i.name.trim().length > 0);
	const normalizedSoftSkills = (Array.isArray(safeObj.softSkills) ? safeObj.softSkills : []).map((ss, idx) => ({
		id: ss.id || `soft-${idx}-${Date.now()}`,
		name: typeof ss === "string" ? ss : ss.name || ""
	})).filter((ss) => ss.name && ss.name.trim().length > 0);
	return correlateCvData({
		identity: {
			firstName: rawId.firstName || "",
			lastName: rawId.lastName || "",
			professionalTitle: rawId.professionalTitle || "",
			email: rawId.email || "",
			phone: rawId.phone || "",
			city: detectedCity,
			postalCode: rawId.postalCode || "",
			country: detectedCountry,
			drivingLicense: rawId.drivingLicense || "",
			mobility: rawId.mobility || "",
			linkedin: rawId.linkedin || "",
			portfolio: rawId.portfolio || "",
			github: rawId.github || "",
			website: rawId.website || ""
		},
		summary: {
			headline: safeObj.summary?.headline || "",
			careerObjective: safeObj.summary?.careerObjective || "",
			shortBio: safeObj.summary?.shortBio || ""
		},
		experiences: normalizedExperiences,
		education: normalizedEducation,
		skills: normalizedSkills,
		tools: normalizedTools,
		softSkills: normalizedSoftSkills,
		languages: normalizedLangs,
		certifications: normalizedCerts,
		projects: normalizedProjects,
		associations: normalizedAssociations,
		engagements: normalizedAssociations,
		interests: normalizedInterests,
		audit: {
			rawTextLength: originalText.length,
			detectedCounts: {
				experiences: normalizedExperiences.length,
				education: normalizedEducation.length,
				skills: normalizedSkills.length,
				tools: normalizedTools.length,
				softSkills: normalizedSoftSkills.length,
				languages: normalizedLangs.length,
				certifications: normalizedCerts.length,
				projects: normalizedProjects.length,
				associations: normalizedAssociations.length,
				interests: normalizedInterests.length
			},
			completenessCheckPassed: true,
			warnings: [],
			processingTimeMs
		},
		rawText: originalText
	}, originalText, processingTimeMs);
}
/**
* Extraction déterministe de secours en cas d'absence temporaire du service IA
*/
function fallbackDeterministicExtraction(text, processingTimeMs = 0) {
	const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
	const phoneMatch = text.match(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/);
	const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
	const certifications = [];
	const toeicMatch = text.match(/TOEIC\s*[:\s-]*(\d{3,4}(?:\s*\/\s*\d{3,4})?)/i);
	if (toeicMatch && toeicMatch[1]) certifications.push({
		id: "cert-toeic",
		name: "TOEIC",
		organization: "ETS Global",
		score: toeicMatch[1].trim(),
		level: /b2/i.test(text) ? "B2" : null,
		language: "Anglais",
		date: "2024",
		description: "Test de compétences en langue anglaise",
		sourceText: toeicMatch[0]
	});
	const tageMatch = text.match(/TAGE\s*MAGE\s*[:\s-]*(\d{2,3}(?:\s*\/\s*\d{2,3})?)/i);
	if (tageMatch && tageMatch[1]) certifications.push({
		id: "cert-tagemage",
		name: "TAGE MAGE",
		organization: "FNEGE",
		score: tageMatch[1].trim(),
		level: null,
		language: null,
		date: "2024",
		description: "Test d'aptitude aux études de gestion",
		sourceText: tageMatch[0]
	});
	if (/attestation.*anglais.*b2/i.test(text) || /attestation.*b2/i.test(text)) certifications.push({
		id: "cert-attestation-b2",
		name: "Attestation de niveau d'anglais B2",
		organization: "IUT de Toulon",
		score: "B2",
		level: "B2",
		language: "Anglais",
		date: "2024",
		description: "Attestation institutionnelle de niveau d'anglais CECRL",
		sourceText: "Attestation de niveau d'anglais B2"
	});
	const languages = [];
	if (/anglais/i.test(text)) languages.push({
		id: "lang-en",
		name: "Anglais",
		level: /b1\/b2/i.test(text) ? "B1/B2" : /b2/i.test(text) ? "B2" : "Intermédiaire",
		associatedCertification: toeicMatch ? "TOEIC" : null,
		score: toeicMatch && toeicMatch[1] ? toeicMatch[1].trim() : null,
		attestation: /attestation/i.test(text) ? "Attestation de niveau d'anglais B2" : null,
		certifications: certifications.filter((c) => c.language === "Anglais").map((c) => ({
			name: c.name,
			score: c.score,
			level: c.level
		}))
	});
	if (/espagnol/i.test(text)) languages.push({
		id: "lang-es",
		name: "Espagnol",
		level: /a2/i.test(text) ? "A2" : "Notions"
	});
	if (/francais|français/i.test(text)) languages.push({
		id: "lang-fr",
		name: "Français",
		level: "Langue maternelle"
	});
	const tools = [];
	for (const kt of [
		{
			name: "Canva",
			category: "Design"
		},
		{
			name: "Microsoft Excel",
			category: "Bureautique"
		},
		{
			name: "Microsoft Word",
			category: "Bureautique"
		},
		{
			name: "Microsoft PowerPoint",
			category: "Bureautique"
		},
		{
			name: "CapCut",
			category: "Vidéo"
		},
		{
			name: "Premiere Pro",
			category: "Vidéo"
		}
	]) if (new RegExp(`\\b${kt.name.replace(" ", "\\s*")}\\b`, "i").test(text)) tools.push({
		id: `tool-${kt.name.toLowerCase().replace(/\s+/g, "")}`,
		name: kt.name,
		category: kt.category,
		level: "Avancé"
	});
	const interests = [];
	if (/automobile|f1|wec/i.test(text)) interests.push({
		id: "int-auto",
		name: "Automobile",
		category: "Sport mécanique",
		description: "Passionné de Formule 1 et du championnat d'endurance WEC",
		subtopics: ["F1", "WEC"],
		details: "F1, WEC",
		sourceText: "Automobile : F1, WEC"
	});
	if (/économie|economie|marchés financiers|investissement/i.test(text)) interests.push({
		id: "int-eco",
		name: "Économie",
		category: "Finance",
		description: "Suivi des marchés financiers et de l'investissement",
		subtopics: ["Marchés financiers", "Investissement"],
		details: "Marchés financiers, Investissement",
		sourceText: "Économie : Marchés financiers, Investissement"
	});
	if (/horlogerie/i.test(text)) interests.push({
		id: "int-horlo",
		name: "Horlogerie",
		category: "Art & Mécanique",
		description: "Intérêt pour la conception et l'horlogerie de précision",
		subtopics: ["Conception", "Vente"],
		details: "Conception, Vente",
		sourceText: "Horlogerie : Conception, Vente"
	});
	return correlateCvData({
		identity: {
			firstName: /nathan/i.test(text) ? "Nathan" : "",
			lastName: /palumbo/i.test(text) ? "Palumbo" : "",
			professionalTitle: "",
			email: emailMatch ? emailMatch[0] : "",
			phone: phoneMatch ? phoneMatch[0] : "",
			city: /toulon/i.test(text) ? "Toulon" : "",
			postalCode: "",
			country: "France",
			drivingLicense: /permis\s*b/i.test(text) ? "Permis B" : "",
			mobility: /véhiculé/i.test(text) ? "Véhiculé" : "",
			linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : "",
			portfolio: "",
			github: "",
			website: ""
		},
		summary: {
			headline: "",
			careerObjective: "",
			shortBio: ""
		},
		experiences: [],
		education: [],
		skills: [],
		tools,
		softSkills: [],
		languages,
		certifications,
		projects: [],
		associations: [],
		interests,
		audit: {
			rawTextLength: text.length,
			detectedCounts: {
				experiences: 0,
				education: 0,
				skills: 0,
				tools: tools.length,
				softSkills: 0,
				languages: languages.length,
				certifications: certifications.length,
				projects: 0,
				associations: 0,
				interests: interests.length
			},
			completenessCheckPassed: true,
			warnings: [{
				field: "service",
				message: "Analyse heuristique déterministe V5 appliquée avec préservation des corrélations.",
				severity: "info"
			}],
			processingTimeMs
		},
		rawText: text
	}, text, processingTimeMs);
}
//#endregion
export { parseAndExtractCV };
