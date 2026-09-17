import { d as array, f as boolean, h as string, m as object, p as number } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { a as extractMissionsBlock, c as extractSkillsAndTools, d as resolveApplicationDeadline, f as resolveOpportunityContractType, i as extractCompanyMetrics, l as extraireOpportuniteHeuristique, n as extractBenefitsBlock, o as extractParentCompanyAndGroup, p as sanitizeCompanyAndMetrics, r as extractCleanJobTitle, s as extractQualities, t as cleanOfferText, u as isSuspiciousTitle } from "./opportunity.heuristic-CZXaBu-l.mjs";
import { t as GoogleGenAI } from "../_libs/google__genai+p-retry.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunity.service-CAuAXGF3.js
var OPPORTUNITY_SYSTEM_PROMPT = `Tu es l'agent d'extraction haute précision de NACORA : "Opportunity Intelligence Extraction".
Ton unique mission est d'analyser le texte brut d'une offre d'emploi / stage / alternance et d'extraire TOUTES les informations factuelles de manière exhaustive, structurée et fidèle au texte selon le format JSON strict attendu.

RÈGLES ABSOLUES ET ANTI-HALLUCINATION :
1. STRICTE ADHÉRENCE AUX FAITS : Tu ne dois utiliser QUE les informations explicitement présentes dans le texte de l'offre fourni.
2. NE JAMAIS INVENTER, SUPPLÉER OU DÉDUIRE :
   - Si le salaire est "Information non renseignée", non mentionné ou non chiffré -> salary: null, salaryMin: null, salaryMax: null. Ne devine jamais une rémunération.
   - Si le site web n'est pas écrit -> companyWebsite: null. Même si tu connais l'entreprise.
   - Si la date limite est "Pas de date limite de candidature", "Aucune date limite", "Sans date limite", "No application deadline", "Open until filled", "Tant que l'offre est en ligne", ou absente -> applicationDeadline: null. Ne JAMAIS inventer la date du jour (aujourd'hui) ni aucune date arbitraire comme deadline !
   - Si le télétravail est "Non spécifié" -> remotePolicy: "Non spécifié" ou null, remoteDetails: null.
   - Si aucune langue n'est demandée -> requiredLanguages: [], preferredLanguages: []. Ne déduis JAMAIS que l'anglais est requis sauf si le texte le mentionne ("fluent in english", "anglais courant", etc.).
   - Si aucune expérience n'est précisée -> experienceRequirements: null.
   - Si la date de fin n'est pas précisée -> endDate: null. Ne jamais inventer une date de fin si seule une date de début est donnée.
   - Si une liste est vide -> renvoie [] (tableau vide).

3. HIÉRARCHIE ENTREPRISE vs GROUPE (CRITIQUE) :
   - company / companyName : L'entité précise qui recrute ou qui publie l'offre (ex: "Natixis", "Natixis CIB", "Alan", "Qonto").
   - parentCompany / groupName : Le groupe de rattachement s'il est mentionné (ex: "Groupe BPCE", "Groupe Crédit Agricole", "Groupe L'Oréal").
   - RÈGLE ABSOLUE : Lorsqu'un texte mentionne :
     "Natixis" et "Natixis CIB fait partie du Groupe BPCE",
     alors company = "Natixis", companyName = "Natixis", et parentCompany = "Groupe BPCE" (ou groupName = "Groupe BPCE").
     Ne JAMAIS remplacer l'entreprise de l'offre par son groupe (ne jamais mettre company = "BPCE" quand l'entité est Natixis) !

4. EXTRACTION EXHAUSTIVE DES MISSIONS (PRIORITÉ ABSOLUE) :
   - Repère les ancres sémantiques : "missions principales", "vos missions", "en collaboration avec votre tuteur, vos missions principales seront", "missions confiées", "au quotidien".
   - Tu DOIS extraire CHAQUE point ou paragraphe de mission comme un élément distinct dans le tableau 'missions'.
   - Ne résume pas, ne fusionne pas et ne renvoie JAMAIS missions: [] s'il y a un bloc de missions dans l'offre !
   - Exemple : Si 5 missions sont listées sous "vos missions principales seront :", le tableau 'missions' DOIT contenir exactement ces 5 missions complètes.

5. EXTRACTION DU PROFIL RECHERCHÉ, COMPÉTENCES & QUALITÉS :
   - requiredSkills : Compétences indispensables ou obligatoires ("Vous maîtrisez Python...", "bonnes connaissances en Generative AI, RAG, Machine Learning").
   - preferredSkills : Atouts, compétences facultatives ou un "plus" ("Des bases en technologies web (HTML, CSS, JavaScript) et en SQL seront un plus").
   - tools : Outils, librairies, frameworks, langages concrets (ex: "Python", "LangChain", "scikit-learn", "XGBoost", "HTML", "CSS", "JavaScript", "SQL", "Excel", "Figma").
   - qualities : Qualités humaines / soft skills ("Vous êtes curieux, autonome, proactif et orienté solutions. Vous appréciez le travail en équipe et savez communiquer avec des interlocuteurs variés" -> ["Curiosité", "Autonomie", "Proactivité", "Orientation solutions", "Travail en équipe", "Communication"]).
   - educationRequirements : Niveau de formation et spécialisations ("Étudiant de niveau Bac +5, diplôme universitaire ou école d'ingénieur, spécialisation Data Science et Intelligence Artificielle" -> ["Bac +5", "Diplôme universitaire ou école d'ingénieur", "Spécialisation Data Science et Intelligence Artificielle"]).
   - educationLevel : Niveau d'études synthétique (ex: "Bac +5").
   - requiredLanguages : Langues requises (ex: "you are perfectly fluent in english" -> [{ langue: "Anglais", niveau: "Courant / Fluent (C1-C2)", obligatoire: true }]).

6. EXTRACTION DES AVANTAGES (BENEFITS) :
   - Repère les ancres : "Avantages :", "Nous vous offrons :", "Package :".
   - Extrais TOUS les avantages comme éléments distincts dans le tableau 'benefits'.
   - Exemples : "Indemnité de stage attractive", "Remboursement du titre de transport à 60 %", "Un jour d'absence autorisé payé par mois travaillé", "Restaurant d'entreprise", "Comité d'entreprise", "Fondation d'entreprise".
   - ATTENTION : Ne JAMAIS classer les avantages dans les missions ! Les avantages vont STRICTEMENT dans 'benefits'.

7. EXTRACTION DU TYPE DE CONTRAT ET DURÉE :
   - contractType : "Stage", "Alternance", "CDD", "CDI", "VIE", "Freelance", "Intérim".
     * PRIORITÉ ABSOLUE STAGE vs VIE : Si le titre ou le contexte de l'offre mentionne "Stage" ou "Internship" (ex: "Stage 4 à 6 mois", "Stage - 6 mois", "Stage de 6 mois à Madrid", "Internship – London", "Stage au sein d'un groupe international"), contractType DOIT être "Stage".
     * NE JAMAIS DÉDUIRE "VIE" simplement parce que le poste est à l'étranger, international ou en anglais. "VIE" doit UNIQUEMENT être choisi si l'offre mentionne EXPLICITEMENT "VIE", "V.I.E", "Volontariat International en Entreprise" ou "International Corporate Volunteer".
   - duration : Durée mentionnée ("6 mois", "4 à 6 mois", "12 mois", etc.). Ne pas confondre avec le type de contrat.

8. EXTRACTION DES DATES :
   - startDate : Date de début (ex: "Octobre 2026", "2026-10", "Dès que possible").
   - applicationDeadline : Date limite ISO (YYYY-MM-DD) UNIQUEMENT si une vraie date explicite est écrite dans l'offre. Si l'offre indique "Pas de date limite de candidature", "Aucune date limite", "Sans date limite", "No application deadline", "Open until filled", "Tant que l'offre est en ligne" ou aucune date -> applicationDeadline: null. Ne JAMAIS utiliser la date du jour (aujourd'hui) comme deadline !
   - sourcePublishedAt : Date de publication (ex: "15 septembre 2026" -> "2026-09-15").

9. EXTRACTION DES MÉTRIQUES & CONTEXTE DE L'ENTREPRISE :
   - Repère tout chiffre clé dans 'companyMetrics' avec label et value :
     * "15 k employés" -> { label: "Effectif", value: "15 k employés" }
     * "400 000 utilisateurs" -> { label: "Utilisateurs", value: "400 000" }
     * "1 M€ de levée" -> { label: "Levée de fonds", value: "1 M€" }
   - companySize : "15 k employés" ou "Grande entreprise".
   - companySector : Secteur d'activité ("Banque / Finance").
   - companyDescription : Description de l'entreprise si présente.

10. NETTOYAGE DU TEXTE & GARDE-FOUS STRICTS :
    - TITRE : Interdiction formelle d'utiliser du bruit web ("Aller au contenu", "Passer au contenu", "Menu", "Career Center", "Postuler", "Recherche").
      Identifie le véritable intitulé de poste ("Stage - 6 mois - Data Scientist Generative AI F/H").
    - ENTREPRISE : Interdiction absolue de fusionner l'effectif ou le secteur dans le nom (ex: "15 k employésBanque").
      company = "Natixis", companySize = "15 k employés", companySector = "Banque / Finance".

Renvoie UNIQUEMENT le JSON valide correspondant à la structure requise.`;
function buildOpportunityUserPrompt(rawText, optionalUrl) {
	let prompt = `Voici le texte brut de l'offre à analyser et structurer :\n\n"""\n${rawText.trim()}\n"""`;
	if (optionalUrl && optionalUrl.trim()) prompt += `\n\nURL source fournie par l'utilisateur : ${optionalUrl.trim()}`;
	return prompt;
}
var OpportunityMetricSchema = object({
	label: string(),
	value: string()
});
var OpportunityLanguageSchema = object({
	langue: string(),
	niveau: string().optional().nullable(),
	obligatoire: boolean().optional().nullable()
});
var OpportunityExtractionZodSchema = object({
	title: string().default(""),
	company: string().default(""),
	location: string().default(""),
	country: string().nullable().optional(),
	contractType: string().nullable().optional(),
	duration: string().nullable().optional(),
	startDate: string().nullable().optional(),
	endDate: string().nullable().optional(),
	salary: string().nullable().optional(),
	salaryMin: number().nullable().optional(),
	salaryMax: number().nullable().optional(),
	salaryCurrency: string().nullable().optional(),
	remotePolicy: string().nullable().optional(),
	remoteDetails: string().nullable().optional(),
	applicationDeadline: string().nullable().optional(),
	jobFunction: string().nullable().optional(),
	educationLevel: string().nullable().optional(),
	source: string().nullable().optional(),
	sourceUrl: string().nullable().optional(),
	missions: array(string()).default([]),
	responsibilities: array(string()).default([]),
	requiredSkills: array(string()).default([]),
	preferredSkills: array(string()).default([]),
	tools: array(string()).default([]),
	requiredLanguages: array(OpportunityLanguageSchema).default([]),
	preferredLanguages: array(OpportunityLanguageSchema).default([]),
	qualities: array(string()).default([]),
	experienceRequirements: string().nullable().optional(),
	educationRequirements: array(string()).default([]),
	companyName: string().nullable().optional(),
	parentCompany: string().nullable().optional(),
	groupName: string().nullable().optional(),
	companyDescription: string().nullable().optional(),
	companySector: string().nullable().optional(),
	companySize: string().nullable().optional(),
	companyLocation: string().nullable().optional(),
	companyWebsite: string().nullable().optional(),
	companyContext: array(string()).default([]),
	companyPartners: array(string()).default([]),
	companyMetrics: array(OpportunityMetricSchema).default([]),
	recruitmentProcess: array(string()).default([]),
	applicationMethod: string().nullable().optional(),
	applicationRequirements: array(string()).default([]),
	benefits: array(string()).default([]),
	sourceType: string().nullable().optional(),
	sourceName: string().nullable().optional(),
	sourcePublishedAt: string().nullable().optional()
});
/**
* Gemini JSON schema for Type.OBJECT structured output
*/
var geminiOpportunityResponseSchema = {
	type: "OBJECT",
	properties: {
		title: {
			type: "STRING",
			description: "Intitulé exact et complet du poste (ex: Stage – Marketing & Engagement Utilisateurs (Application Mobile))"
		},
		company: {
			type: "STRING",
			description: "Nom de l'entreprise qui recrute (ex: EXO)"
		},
		location: {
			type: "STRING",
			description: "Lieu du poste (ex: Paris, France)"
		},
		country: {
			type: "STRING",
			description: "Pays (ex: France)"
		},
		contractType: {
			type: "STRING",
			description: "Type de contrat (Stage, Alternance, VIE, CDI, CDD, Freelance, Intérim). RÈGLE PRIORITAIRE : Si le poste est un stage ou internship (même international ou en anglais), mettre Stage. VIE UNIQUEMENT si explicitement stipulé (Volontariat International en Entreprise / VIE / V.I.E)."
		},
		duration: {
			type: "STRING",
			description: "Durée du contrat (ex: 3 à 6 mois, 6 mois)"
		},
		startDate: {
			type: "STRING",
			description: "Date de début indiquée (ex: Dès que possible, Septembre 2026)"
		},
		endDate: {
			type: "STRING",
			description: "Date de fin si indiquée, sinon null"
		},
		salary: {
			type: "STRING",
			description: "Salaire mentionné tel quel dans l'offre, sinon null (ne jamais inventer)"
		},
		salaryMin: {
			type: "NUMBER",
			description: "Salaire minimum si mentionné en nombre, sinon null"
		},
		salaryMax: {
			type: "NUMBER",
			description: "Salaire maximum si mentionné en nombre, sinon null"
		},
		salaryCurrency: {
			type: "STRING",
			description: "Devise du salaire (EUR, USD, etc.)"
		},
		remotePolicy: {
			type: "STRING",
			description: "Politique générale de télétravail (ex: Partiel, Total, Sur site, Non renseigné)"
		},
		remoteDetails: {
			type: "STRING",
			description: "Détails précis du télétravail (ex: 1 jour de télétravail par semaine)"
		},
		applicationDeadline: {
			type: "STRING",
			description: "Date limite de candidature au format ISO YYYY-MM-DD UNIQUEMENT si une date explicite est mentionnée. Si aucune date limite ou mentionné 'Pas de date limite' / 'Tant que l'offre est en ligne', mettre impérativement null. Ne JAMAIS inventer aujourd'hui comme date."
		},
		jobFunction: {
			type: "STRING",
			description: "Fonction ou métier principal (ex: Marketing & Webmarketing)"
		},
		educationLevel: {
			type: "STRING",
			description: "Niveaux d'études demandés (ex: Master, MSc ou Programme Grande École; Bac+3, Bachelor)"
		},
		source: {
			type: "STRING",
			description: "Plateforme ou source détectée (ex: JobTeaser, LinkedIn, Welcome to the Jungle)"
		},
		sourceUrl: {
			type: "STRING",
			description: "URL de l'offre si présente dans le texte, sinon null"
		},
		missions: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Liste des missions distinctes à accomplir (extraire chaque mission séparément sans les transformer en compétences)"
		},
		responsibilities: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Responsabilités ou périmètres d'action spécifiques"
		},
		requiredSkills: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Compétences techniques obligatoires ou indispensables"
		},
		preferredSkills: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Compétences facultatives, atouts ou 'un plus' apprécié"
		},
		tools: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Outils, logiciels ou plateformes mentionnés (ex: TikTok, Instagram, Ads, Notion, Excel, Figma)"
		},
		requiredLanguages: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					langue: { type: "STRING" },
					niveau: { type: "STRING" },
					obligatoire: { type: "BOOLEAN" }
				},
				required: ["langue"]
			},
			description: "Langues obligatoires explicitement mentionnées (ne pas inventer si non précisé)"
		},
		preferredLanguages: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					langue: { type: "STRING" },
					niveau: { type: "STRING" }
				},
				required: ["langue"]
			},
			description: "Langues mentionnées comme atout"
		},
		qualities: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Qualités personnelles, soft skills, traits de caractère recherchés (ex: créativité, organisation, ouverture d'esprit, force de proposition)"
		},
		experienceRequirements: {
			type: "STRING",
			description: "Expérience requise mentionnée (ex: 2 ans d'expérience, Débutant accepté, etc.), null si rien"
		},
		educationRequirements: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Liste de tous les diplômes et niveaux explicitement acceptés (ex: Bac+3, Bachelor, Master, MSc, Programme Grande École)"
		},
		companyName: {
			type: "STRING",
			description: "Nom précis de l'entreprise qui porte / publie l'offre (ex: Natixis, Alan)"
		},
		parentCompany: {
			type: "STRING",
			description: "Nom de la société mère ou du groupe si mentionné (ex: Groupe BPCE), sinon null"
		},
		groupName: {
			type: "STRING",
			description: "Nom du groupe d'appartenance si mentionné (ex: Groupe BPCE), sinon null"
		},
		companyDescription: {
			type: "STRING",
			description: "Description de l'activité de l'entreprise"
		},
		companySector: {
			type: "STRING",
			description: "Secteur d'activité (ex: Loisirs / Culture / Sports)"
		},
		companySize: {
			type: "STRING",
			description: "Taille de l'entreprise / effectif (ex: 20 employés, Start-up)"
		},
		companyLocation: {
			type: "STRING",
			description: "Localisation du siège ou des bureaux"
		},
		companyWebsite: {
			type: "STRING",
			description: "Site web officiel mentionné dans l'offre (null si absent, ne pas inventer)"
		},
		companyContext: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Faits de contexte de l'entreprise (ex: Levée de fonds de 1 M€, 400 000 utilisateurs, plus de 1 000 000 € de cadeaux distribués)"
		},
		companyPartners: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Partenaires ou clients mentionnés dans l'annonce (ex: Nike, Garmin, Feed, Nutripure, Aroma-Zone, Gymshark)"
		},
		companyMetrics: {
			type: "ARRAY",
			items: {
				type: "OBJECT",
				properties: {
					label: {
						type: "STRING",
						description: "Nom de la métrique (ex: Utilisateurs, Abonnés Instagram, Salles partenaires, Levée de fonds)"
					},
					value: {
						type: "STRING",
						description: "Valeur chiffrée (ex: 400 000, 75 000, 1 000, 1 M€)"
					}
				},
				required: ["label", "value"]
			},
			description: "Chiffres clés et métriques de l'entreprise"
		},
		recruitmentProcess: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Étapes du processus de recrutement dans l'ordre (ex: 1. Message court, 2. CV, 3. Appel téléphonique, 4. Entretien physique ou visio)"
		},
		applicationMethod: {
			type: "STRING",
			description: "Mode de candidature (ex: Candidature simplifiée, Via le site, Email)"
		},
		applicationRequirements: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Documents ou éléments demandés ou différenciants (ex: CV, Message court, Élément différenciant facultatif : meme, TikTok, idée, jeu)"
		},
		benefits: {
			type: "ARRAY",
			items: { type: "STRING" },
			description: "Avantages mentionnés (ex: Équipe jeune et dynamique, Teambuildings dans les salles partenaires, Petits-déjeuners réguliers, 1 jour de télétravail par semaine, Locaux au cœur de Paris 2e)"
		},
		sourceType: {
			type: "STRING",
			description: "Type de source (ex: job_board, direct_site, email, text)"
		},
		sourceName: {
			type: "STRING",
			description: "Nom de la source (ex: JobTeaser, LinkedIn, Welcome to the Jungle)"
		},
		sourcePublishedAt: {
			type: "STRING",
			description: "Date de publication de l'offre au format YYYY-MM-DD si indiquée (ex: 2026-08-05), sinon null"
		}
	},
	required: [
		"title",
		"company",
		"missions",
		"requiredSkills",
		"qualities"
	]
};
/**
* Tronque une valeur pour les logs afin d'éviter le bruit et les surcharges console,
* tout en garantissant l'absence absolue de fuite de tokens ou clés API.
*/
function truncateForLog(val, maxLen = 300) {
	if (val === null || val === void 0) return "";
	const str = typeof val === "string" ? val : JSON.stringify(val);
	if (str.length <= maxLen) return str;
	return str.slice(0, maxLen) + `... [tronqué, ${str.length} car.]`;
}
function getAiClient() {
	const apiKey = processModule.env["GEMINI_API_KEY"];
	if (!apiKey || !apiKey.trim()) throw new Error("La variable d'environnement GEMINI_API_KEY n'est pas configurée.");
	return new GoogleGenAI({
		apiKey: apiKey.trim(),
		httpOptions: { headers: { "User-Agent": "aistudio-build" } }
	});
}
function cleanJsonString(raw) {
	if (!raw) return "{}";
	const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
	return (match?.[1] ? match[1] : raw).trim();
}
/**
* Cascade de modèles Gemini officiels :
* 1. gemini-3.8-flash : Modèle principal ultra-rapide et haute précision
* 2. gemini-3.7-flash : Modèle alternatif éprouvé et très stable
* 3. gemini-flash-latest : Alias de fallback automatique
* 4. gemini-3.1-flash-lite : Filet de sécurité réactif et basse latence
* 5. gemini-2.5-flash : Fallback haute disponibilité
*/
var CANDIDATE_MODELS = [
	"gemini-3.8-flash",
	"gemini-3.7-flash",
	"gemini-flash-latest",
	"gemini-3.1-flash-lite",
	"gemini-2.5-flash"
];
async function generateContentWithFallback(ai, contents, systemInstruction, responseSchema) {
	let lastError = null;
	for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
		const model = CANDIDATE_MODELS[attempt] || "gemini-3.8-flash";
		console.info(`[AI CONFIG] Modèle candidat: ${model} (${attempt + 1}/${CANDIDATE_MODELS.length}) | temperature=0.0`);
		try {
			const response = await ai.models.generateContent({
				model,
				contents,
				config: {
					systemInstruction,
					temperature: 0,
					responseMimeType: "application/json",
					responseSchema
				}
			});
			if (response.text) return {
				text: response.text,
				modelUsed: model
			};
		} catch (err) {
			const errorObj = err instanceof Error ? err : new Error(String(err));
			lastError = errorObj;
			const errMsg = errorObj.message;
			if (errMsg.includes("API_KEY") || errMsg.includes("GEMINI_API_KEY") || errMsg.includes("invalid API key")) throw new Error("Clé d'API Gemini manquante ou invalide.");
			console.warn(`[Opportunity AI] Modèle ${model} indisponible (${errorObj.message?.slice(0, 100)}), basculement vers candidat suivant.`);
			if ((errMsg.includes("503") || errMsg.includes("high demand") || errMsg.includes("UNAVAILABLE") || errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED")) && attempt < CANDIDATE_MODELS.length - 1) await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
			continue;
		}
	}
	throw lastError || /* @__PURE__ */ new Error("Indisponibilité temporaire des modèles Gemini.");
}
/**
* Service central officiel d'extraction d'opportunité par IA.
* Source unique de traitement partagée entre AI Studio et Vercel.
*/
async function extraireOpportuniteIA(rawText, optionalUrl) {
	if (!rawText || rawText.trim().length < 15) throw new Error("Le texte de l'offre est trop court pour être analysé.");
	console.info(`[OPPORTUNITY SOURCE] Texte brut reçu (${rawText.length} caractères):`, truncateForLog(rawText, 250));
	const cleanedText = cleanOfferText(rawText);
	console.info(`[OPPORTUNITY CLEANED] Texte nettoyé (${cleanedText.length} caractères):`, truncateForLog(cleanedText, 250));
	let ai = null;
	try {
		ai = getAiClient();
	} catch (err) {
		const errorMsg = err instanceof Error ? err.message : String(err);
		console.warn(`[Opportunity AI] Client IA indisponible (${errorMsg}), basculement déterministe vers le moteur heuristique de secours.`);
		return extraireOpportuniteHeuristique(cleanedText, optionalUrl);
	}
	const userPrompt = buildOpportunityUserPrompt(cleanedText, optionalUrl);
	console.info(`[AI PROMPT] Prompt réellement envoyé (${userPrompt.length} caractères):`, truncateForLog(userPrompt, 300));
	let responseText;
	let modelUsed;
	try {
		const result = await generateContentWithFallback(ai, userPrompt, OPPORTUNITY_SYSTEM_PROMPT, geminiOpportunityResponseSchema);
		responseText = result.text;
		modelUsed = result.modelUsed;
	} catch (err) {
		const errorMsg = err instanceof Error ? err.message : String(err);
		console.warn(`[Opportunity AI] Tous les modèles distants sont indisponibles (${errorMsg}), activation du moteur heuristique de secours:`);
		return extraireOpportuniteHeuristique(cleanedText, optionalUrl);
	}
	console.info(`[AI RAW RESPONSE] Réponse brute du modèle (${modelUsed}):`, truncateForLog(responseText, 350));
	const cleanedJson = cleanJsonString(responseText);
	let parsedRaw;
	try {
		parsedRaw = JSON.parse(cleanedJson);
	} catch (err) {
		console.error("Erreur de parsing JSON brut Gemini:", err, responseText);
		throw new Error("L'IA n'a pas renvoyé un format JSON valide.");
	}
	console.info("[AI PARSED] Objet JSON extrait du modèle:", {
		title: parsedRaw["title"],
		company: parsedRaw["company"],
		contractType: parsedRaw["contractType"],
		duration: parsedRaw["duration"],
		startDate: parsedRaw["startDate"]
	});
	const parseResult = OpportunityExtractionZodSchema.safeParse(parsedRaw);
	if (!parseResult.success) console.warn("Avertissement de validation Zod de l'extraction :", parseResult.error.format());
	const data = parseResult.success ? parseResult.data : parsedRaw;
	let resolvedTitle = data.title ? data.title.trim() : "";
	if (isSuspiciousTitle(resolvedTitle)) {
		console.warn(`[GARDE-FOU TITRE] Faux positif détecté ("${resolvedTitle}"). Recherche déterministe d'un titre authentique...`);
		resolvedTitle = extractCleanJobTitle(cleanedText) || "Poste sans titre";
	}
	const companySanitized = sanitizeCompanyAndMetrics(data.company, cleanedText);
	const resolvedCompany = companySanitized.cleanCompany || (data.company && !isSuspiciousTitle(data.company) ? data.company.trim() : "Entreprise inconnue");
	const resolvedContractType = resolveOpportunityContractType(data.contractType, cleanedText, resolvedTitle);
	let resolvedDuration = data.duration || null;
	if (!resolvedDuration || resolvedDuration.trim().toLowerCase() === "null") {
		const durationMatch = cleanedText.match(/(?:durée(?:\s*du\s*(?:contrat|stage|poste))?|stage\s+de|alternance\s+de|mission\s+de|contrat\s+de)\s*[:–-]?\s*(\d+\s*(?:[àa]\s*\d+\s*)?(?:mois|semaines|ans?|jours?))\b/i) || cleanedText.match(/\b(\d+\s*(?:[àa]\s*\d+\s*)?mois)\b/i);
		if (durationMatch && durationMatch[1]) resolvedDuration = durationMatch[1].trim();
	}
	let resolvedStartDate = data.startDate || null;
	if (!resolvedStartDate || resolvedStartDate.trim().toLowerCase() === "null") {
		const startDateMatch = cleanedText.match(/(?:[àa]\s+partir\s+de|d[ée]but\s*:?|d[ée]marrage\s*:?|d[èe]s\s*:?|[àa]\s+pourvoir\s+(?:en|d[èe]s|[àa]\s+partir\s+de))\s*([a-zA-ZÀ-ÿ0-9\s]+?(?:\d{4}|d[èe]s\s+que\s+possible|imm[ée]diat(?:ement)?))\b/i);
		if (startDateMatch && startDateMatch[1]) {
			const candidate = startDateMatch[1].trim();
			if (candidate.length > 2 && candidate.length < 35) resolvedStartDate = candidate;
		}
	}
	const companyMetrics = Array.isArray(data.companyMetrics) ? data.companyMetrics.map((m) => ({
		label: String(m.label || "").trim(),
		value: String(m.value || "").trim()
	})).filter((m) => Boolean(m.label && m.value)) : [];
	if (companySanitized.extractedMetric) {
		if (!companyMetrics.some((m) => m.label.toLowerCase() === "effectif")) companyMetrics.push(companySanitized.extractedMetric);
	}
	if (companyMetrics.length === 0) {
		const userCountMatch = cleanedText.match(/(?:plus de\s+)?(\d{1,3}(?:\s\d{3})+|\d+\s*000)\s*(utilisateurs|membres|clients|abonn[ée]s|salles\s+partenaires)/i);
		if (userCountMatch && userCountMatch[1] && userCountMatch[2]) companyMetrics.push({
			label: userCountMatch[2].charAt(0).toUpperCase() + userCountMatch[2].slice(1),
			value: userCountMatch[1].trim()
		});
		const fundingMatch = cleanedText.match(/(\d+(?:[.,]\d+)?\s*(?:M€|k€|millions?\s*d'euros?))\s*(?:de\s+lev[ée]e|lev[ée]s?|de\s+chiffre\s+d'affaires)/i);
		if (fundingMatch && fundingMatch[1]) companyMetrics.push({
			label: "Financement",
			value: fundingMatch[1].trim()
		});
	}
	const resolvedDeadline = resolveApplicationDeadline(data.applicationDeadline, cleanedText);
	const extracted = {
		title: resolvedTitle,
		poste: resolvedTitle,
		company: resolvedCompany,
		entreprise: resolvedCompany,
		location: (data.location || "").trim(),
		lieu: (data.location || "").trim(),
		country: data.country || null,
		contractType: resolvedContractType,
		typeContrat: resolvedContractType,
		duration: resolvedDuration,
		startDate: resolvedStartDate,
		endDate: data.endDate || null,
		salary: data.salary || null,
		salaryMin: typeof data.salaryMin === "number" ? data.salaryMin : null,
		salaryMax: typeof data.salaryMax === "number" ? data.salaryMax : null,
		salaryCurrency: data.salaryCurrency || null,
		remotePolicy: data.remotePolicy || null,
		remoteDetails: data.remoteDetails || null,
		applicationDeadline: resolvedDeadline,
		dateLimite: resolvedDeadline || "",
		jobFunction: data.jobFunction || null,
		educationLevel: data.educationLevel || null,
		source: data.source || data.sourceName || (optionalUrl ? "Lien externe" : null),
		sourceUrl: optionalUrl?.trim() || data.sourceUrl || null,
		missions: Array.isArray(data.missions) ? data.missions.map((m) => String(m).trim()).filter((m) => Boolean(m) && !isSuspiciousTitle(m)) : [],
		responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities.map((r) => String(r).trim()).filter((r) => Boolean(r) && !isSuspiciousTitle(r)) : [],
		requiredSkills: Array.isArray(data.requiredSkills) ? data.requiredSkills.map((s) => String(s).trim()).filter(Boolean) : [],
		preferredSkills: Array.isArray(data.preferredSkills) ? data.preferredSkills.map((s) => String(s).trim()).filter(Boolean) : [],
		tools: Array.isArray(data.tools) ? data.tools.map((t) => String(t).trim()).filter(Boolean) : [],
		requiredLanguages: Array.isArray(data.requiredLanguages) ? data.requiredLanguages.map((l) => ({
			langue: String(l.langue || "").trim(),
			niveau: l.niveau ? String(l.niveau).trim() : void 0,
			obligatoire: l.obligatoire ?? true
		})).filter((l) => Boolean(l.langue)) : [],
		preferredLanguages: Array.isArray(data.preferredLanguages) ? data.preferredLanguages.map((l) => ({
			langue: String(l.langue || "").trim(),
			niveau: l.niveau ? String(l.niveau).trim() : void 0
		})).filter((l) => Boolean(l.langue)) : [],
		qualities: Array.isArray(data.qualities) ? data.qualities.map((q) => String(q).trim()).filter(Boolean) : [],
		experienceRequirements: data.experienceRequirements || null,
		educationRequirements: Array.isArray(data.educationRequirements) ? data.educationRequirements.map((e) => String(e).trim()).filter(Boolean) : [],
		companyName: resolvedCompany,
		parentCompany: data.parentCompany || data.groupName || companySanitized.parentCompany || null,
		groupName: data.groupName || data.parentCompany || companySanitized.groupName || null,
		companyDescription: data.companyDescription || null,
		companySector: companySanitized.extractedSector || data.companySector || null,
		companySize: companySanitized.extractedSize || data.companySize || null,
		companyLocation: data.companyLocation || null,
		companyWebsite: data.companyWebsite || null,
		companyContext: Array.isArray(data.companyContext) ? data.companyContext.map((c) => String(c).trim()).filter(Boolean) : [],
		companyPartners: Array.isArray(data.companyPartners) ? data.companyPartners.map((p) => String(p).trim()).filter(Boolean) : [],
		companyMetrics,
		recruitmentProcess: Array.isArray(data.recruitmentProcess) ? data.recruitmentProcess.map((p) => String(p).trim()).filter(Boolean) : [],
		applicationMethod: data.applicationMethod || null,
		applicationRequirements: Array.isArray(data.applicationRequirements) ? data.applicationRequirements.map((r) => String(r).trim()).filter(Boolean) : [],
		benefits: Array.isArray(data.benefits) ? data.benefits.map((b) => String(b).trim()).filter(Boolean) : [],
		sourceType: data.sourceType || "job_board",
		sourceName: data.sourceName || data.source || null,
		sourcePublishedAt: data.sourcePublishedAt || null,
		extractedAt: (/* @__PURE__ */ new Date()).toISOString(),
		_extractionMethod: "ai",
		_modelUsed: modelUsed
	};
	if (extracted.missions.length === 0) {
		const fallbackMissions = extractMissionsBlock(cleanedText);
		if (fallbackMissions.length > 0) {
			console.info(`[GARDE-FOU MISSIONS] Récupération heuristique de ${fallbackMissions.length} missions omises par l'IA.`);
			extracted.missions = fallbackMissions;
		}
	}
	if (extracted.benefits.length === 0) {
		const fallbackBenefits = extractBenefitsBlock(cleanedText);
		if (fallbackBenefits.length > 0) {
			console.info(`[GARDE-FOU AVANTAGES] Récupération heuristique de ${fallbackBenefits.length} avantages omis par l'IA.`);
			extracted.benefits = fallbackBenefits;
		}
	}
	if (extracted.companyMetrics.length === 0) {
		const fallbackMetrics = extractCompanyMetrics(cleanedText);
		if (fallbackMetrics.length > 0) extracted.companyMetrics = fallbackMetrics;
	}
	if (extracted.requiredSkills.length === 0) {
		const fallbackTech = extractSkillsAndTools(cleanedText);
		if (fallbackTech.requiredSkills.length > 0) extracted.requiredSkills = fallbackTech.requiredSkills;
		if (extracted.tools.length === 0 && fallbackTech.tools.length > 0) extracted.tools = fallbackTech.tools;
	}
	if (extracted.qualities.length === 0) {
		const fallbackQualities = extractQualities(cleanedText);
		if (fallbackQualities.length > 0) extracted.qualities = fallbackQualities;
	}
	if (!extracted.parentCompany) {
		const grp = extractParentCompanyAndGroup(cleanedText);
		if (grp.parentCompany) {
			extracted.parentCompany = grp.parentCompany;
			extracted.groupName = grp.groupName;
		}
	}
	console.info(`[AI NORMALIZED] Opportunité structurée validée (${extracted._extractionMethod} via ${extracted._modelUsed}):`, {
		title: extracted.title,
		company: extracted.company,
		contractType: extracted.contractType,
		duration: extracted.duration,
		startDate: extracted.startDate,
		metricsCount: extracted.companyMetrics.length,
		missionsCount: extracted.missions.length,
		skillsCount: extracted.requiredSkills.length,
		companyMetrics: extracted.companyMetrics
	});
	return extracted;
}
//#endregion
export { extraireOpportuniteIA };
