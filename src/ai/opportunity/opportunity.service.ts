import { GoogleGenAI } from "@google/genai";
import {
  OPPORTUNITY_SYSTEM_PROMPT,
  buildOpportunityUserPrompt,
} from "./opportunity.prompt";
import {
  OpportunityExtractionZodSchema,
  geminiOpportunityResponseSchema,
  type OpportunityExtractionRaw,
} from "./opportunity.schema";
import type {
  OpportunityCompanyMetric,
  OpportunityExtractedData,
} from "./opportunity.types";
import {
  cleanOfferText,
  isSuspiciousTitle,
  extractCleanJobTitle,
  sanitizeCompanyAndMetrics,
  extraireOpportuniteHeuristique,
} from "./opportunity.heuristic";

// Re-exports pour compatibilité
export {
  cleanOfferText,
  isSuspiciousTitle,
  extractCleanJobTitle,
  sanitizeCompanyAndMetrics,
  extraireOpportuniteHeuristique,
};

/**
 * Tronque une valeur pour les logs afin d'éviter le bruit et les surcharges console,
 * tout en garantissant l'absence absolue de fuite de tokens ou clés API.
 */
function truncateForLog(val: unknown, maxLen = 300): string {
  if (val === null || val === undefined) return "";
  const str = typeof val === "string" ? val : JSON.stringify(val);
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + `... [tronqué, ${str.length} car.]`;
}

function getAiClient(): GoogleGenAI {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "La variable d'environnement GEMINI_API_KEY n'est pas configurée.",
    );
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function cleanJsonString(raw: string): string {
  if (!raw) return "{}";
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return (match?.[1] ? match[1] : raw).trim();
}

/**
 * Cascade de modèles Gemini :
 * 1. gemini-3.8-flash : Priorité absolue, puissant et optimisé pour le texte structuré
 * 2. gemini-3.7-flash : Modèle alternatif de haute performance
 * 3. gemini-3.6-flash : Deuxième modèle Flash
 * 4. gemini-2.5-flash : Flash stable
 * 5. gemini-flash-latest : Alias générique
 * 6. gemini-3.1-flash-lite : Filet de sécurité rapide
 */
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

async function generateContentWithFallback(
  ai: GoogleGenAI,
  contents: string,
  systemInstruction: string,
  responseSchema: unknown,
): Promise<{ text: string; modelUsed: string }> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
    const model = CANDIDATE_MODELS[attempt] || "gemini-3.8-flash";
    console.info(
      `[AI CONFIG] Modèle candidat: ${model} (${attempt + 1}/${CANDIDATE_MODELS.length}) | temperature=0.0`,
    );

    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.0,
          responseMimeType: "application/json",
          responseSchema,
        },
      });

      if (response.text) {
        return { text: response.text, modelUsed: model };
      }
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      lastError = errorObj;
      const errMsg = errorObj.message;
      const isAuthError =
        errMsg.includes("API_KEY") ||
        errMsg.includes("GEMINI_API_KEY") ||
        errMsg.includes("invalid API key");

      if (isAuthError) {
        throw new Error("Clé d'API Gemini manquante ou invalide.");
      }

      console.warn(
        `[Opportunity AI] Modèle ${model} indisponible (${errorObj.message?.slice(0, 100)}), basculement vers candidat suivant.`,
      );
      continue;
    }
  }

  throw (
    lastError || new Error("Indisponibilité temporaire des modèles Gemini.")
  );
}

/**
 * Service central officiel d'extraction d'opportunité par IA.
 * Source unique de traitement partagée entre AI Studio et Vercel.
 */
export async function extraireOpportuniteIA(
  rawText: string,
  optionalUrl?: string,
): Promise<OpportunityExtractedData> {
  if (!rawText || rawText.trim().length < 15) {
    throw new Error("Le texte de l'offre est trop court pour être analysé.");
  }

  // [OPPORTUNITY SOURCE] Log structuré du texte brut reçu
  console.info(
    `[OPPORTUNITY SOURCE] Texte brut reçu (${rawText.length} caractères):`,
    truncateForLog(rawText, 250),
  );

  // Nettoyage proactif du texte d'entrée
  const cleanedText = cleanOfferText(rawText);

  // [OPPORTUNITY CLEANED] Log structuré du texte nettoyé envoyé à l'analyseur
  console.info(
    `[OPPORTUNITY CLEANED] Texte nettoyé (${cleanedText.length} caractères):`,
    truncateForLog(cleanedText, 250),
  );

  let ai: GoogleGenAI | null = null;
  try {
    ai = getAiClient();
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[Opportunity AI] Client IA indisponible (${errorMsg}), basculement déterministe vers le moteur heuristique de secours.`,
    );
    return extraireOpportuniteHeuristique(cleanedText, optionalUrl);
  }

  const userPrompt = buildOpportunityUserPrompt(cleanedText, optionalUrl);

  // [AI PROMPT] Log structuré du prompt envoyé
  console.info(
    `[AI PROMPT] Prompt réellement envoyé (${userPrompt.length} caractères):`,
    truncateForLog(userPrompt, 300),
  );

  let responseText: string;
  let modelUsed: string;
  try {
    const result = await generateContentWithFallback(
      ai,
      userPrompt,
      OPPORTUNITY_SYSTEM_PROMPT,
      geminiOpportunityResponseSchema,
    );
    responseText = result.text;
    modelUsed = result.modelUsed;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[Opportunity AI] Tous les modèles distants sont indisponibles (${errorMsg}), activation du moteur heuristique de secours:`,
    );
    return extraireOpportuniteHeuristique(cleanedText, optionalUrl);
  }

  // [AI RAW RESPONSE] Log structuré de la réponse brute reçue
  console.info(
    `[AI RAW RESPONSE] Réponse brute du modèle (${modelUsed}):`,
    truncateForLog(responseText, 350),
  );

  const cleanedJson = cleanJsonString(responseText);

  let parsedRaw: Record<string, unknown>;
  try {
    parsedRaw = JSON.parse(cleanedJson);
  } catch (err) {
    console.error("Erreur de parsing JSON brut Gemini:", err, responseText);
    throw new Error("L'IA n'a pas renvoyé un format JSON valide.");
  }

  // [AI PARSED] Log structuré de l'objet parsé
  console.info("[AI PARSED] Objet JSON extrait du modèle:", {
    title: parsedRaw["title"],
    company: parsedRaw["company"],
    contractType: parsedRaw["contractType"],
    duration: parsedRaw["duration"],
    startDate: parsedRaw["startDate"],
  });

  const parseResult = OpportunityExtractionZodSchema.safeParse(parsedRaw);
  if (!parseResult.success) {
    console.warn(
      "Avertissement de validation Zod de l'extraction :",
      parseResult.error.format(),
    );
  }

  const data: OpportunityExtractionRaw = parseResult.success
    ? parseResult.data
    : (parsedRaw as unknown as OpportunityExtractionRaw);

  // --- GARDE-FOUS DÉTERMINISTES STRICTS CONTRE LES FAUX POSITIFS ---

  // 1. Garde-fou Titre : Rejet absolu de "Aller au contenu" et autres bruits web
  let resolvedTitle = data.title ? data.title.trim() : "";
  if (isSuspiciousTitle(resolvedTitle)) {
    console.warn(
      `[GARDE-FOU TITRE] Faux positif détecté ("${resolvedTitle}"). Recherche déterministe d'un titre authentique...`,
    );
    const candidateTitle = extractCleanJobTitle(cleanedText);
    resolvedTitle = candidateTitle || "Poste sans titre";
  }

  // 2. Garde-fou Entreprise : Rejet et dissociation de "15 k employésBanque"
  const companySanitized = sanitizeCompanyAndMetrics(data.company, cleanedText);
  const resolvedCompany =
    companySanitized.cleanCompany ||
    (data.company && !isSuspiciousTitle(data.company)
      ? data.company.trim()
      : "Entreprise inconnue");

  // 3. Détection déterministe du type de contrat
  let resolvedContractType = data.contractType || null;
  if (
    /\b(stage|stagiaire|internship|intern)\b/i.test(cleanedText) &&
    (!resolvedContractType || resolvedContractType.toLowerCase() === "cdi")
  ) {
    resolvedContractType = "Stage";
  } else if (
    /\b(alternance|alternant|apprentissage|apprenti|contrat de pro(?:fessionnalisation)?)\b/i.test(
      cleanedText,
    ) &&
    (!resolvedContractType || resolvedContractType.toLowerCase() === "cdi")
  ) {
    resolvedContractType = "Alternance";
  } else if (
    /\b(cdd|contrat à durée déterminée)\b/i.test(cleanedText) &&
    !/\b(stage|alternance)\b/i.test(cleanedText)
  ) {
    resolvedContractType = "CDD";
  } else if (
    /\b(cdi|contrat à durée indéterminée)\b/i.test(cleanedText) &&
    !/\b(stage|alternance|stagiaire)\b/i.test(cleanedText)
  ) {
    resolvedContractType = "CDI";
  } else if (
    /\b(v\.?i\.?e|volontariat international en entreprise)\b/i.test(cleanedText)
  ) {
    resolvedContractType = "VIE";
  } else if (/\b(freelance|indépendant)\b/i.test(cleanedText)) {
    resolvedContractType = "Freelance";
  } else if (/\b(intérim|interim)\b/i.test(cleanedText)) {
    resolvedContractType = "Intérim";
  }

  // 4. Détection déterministe de la durée si omise
  let resolvedDuration = data.duration || null;
  if (!resolvedDuration || resolvedDuration.trim().toLowerCase() === "null") {
    const durationMatch =
      cleanedText.match(
        /(?:durée(?:\s*du\s*(?:contrat|stage|poste))?|stage\s+de|alternance\s+de|mission\s+de|contrat\s+de)\s*[:–-]?\s*(\d+\s*(?:[àa]\s*\d+\s*)?(?:mois|semaines|ans?|jours?))\b/i,
      ) || cleanedText.match(/\b(\d+\s*(?:[àa]\s*\d+\s*)?mois)\b/i);
    if (durationMatch && durationMatch[1]) {
      resolvedDuration = durationMatch[1].trim();
    }
  }

  // 5. Détection déterministe de la date de début si omise
  let resolvedStartDate = data.startDate || null;
  if (!resolvedStartDate || resolvedStartDate.trim().toLowerCase() === "null") {
    const startDateMatch = cleanedText.match(
      /(?:[àa]\s+partir\s+de|d[ée]but\s*:?|d[ée]marrage\s*:?|d[èe]s\s*:?|[àa]\s+pourvoir\s+(?:en|d[èe]s|[àa]\s+partir\s+de))\s*([a-zA-ZÀ-ÿ0-9\s]+?(?:\d{4}|d[èe]s\s+que\s+possible|imm[ée]diat(?:ement)?))\b/i,
    );
    if (startDateMatch && startDateMatch[1]) {
      const candidate = startDateMatch[1].trim();
      if (candidate.length > 2 && candidate.length < 35) {
        resolvedStartDate = candidate;
      }
    }
  }

  // 6. Métriques de l'entreprise : conservation stricte et consolidation
  const companyMetrics: OpportunityCompanyMetric[] = Array.isArray(
    data.companyMetrics,
  )
    ? data.companyMetrics
        .map((m) => ({
          label: String(m.label || "").trim(),
          value: String(m.value || "").trim(),
        }))
        .filter((m) => Boolean(m.label && m.value))
    : [];

  if (companySanitized.extractedMetric) {
    const alreadyExists = companyMetrics.some(
      (m) => m.label.toLowerCase() === "effectif",
    );
    if (!alreadyExists) {
      companyMetrics.push(companySanitized.extractedMetric);
    }
  }

  if (companyMetrics.length === 0) {
    const userCountMatch = cleanedText.match(
      /(?:plus de\s+)?(\d{1,3}(?:\s\d{3})+|\d+\s*000)\s*(utilisateurs|membres|clients|abonn[ée]s|salles\s+partenaires)/i,
    );
    if (userCountMatch && userCountMatch[1] && userCountMatch[2]) {
      companyMetrics.push({
        label:
          userCountMatch[2].charAt(0).toUpperCase() +
          userCountMatch[2].slice(1),
        value: userCountMatch[1].trim(),
      });
    }
    const fundingMatch = cleanedText.match(
      /(\d+(?:[.,]\d+)?\s*(?:M€|k€|millions?\s*d'euros?))\s*(?:de\s+lev[ée]e|lev[ée]s?|de\s+chiffre\s+d'affaires)/i,
    );
    if (fundingMatch && fundingMatch[1]) {
      companyMetrics.push({
        label: "Financement",
        value: fundingMatch[1].trim(),
      });
    }
  }

  // Construction de l'objet final normalisé
  const extracted: OpportunityExtractedData = {
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
    applicationDeadline: data.applicationDeadline || null,
    jobFunction: data.jobFunction || null,
    educationLevel: data.educationLevel || null,
    source:
      data.source || data.sourceName || (optionalUrl ? "Lien externe" : null),
    sourceUrl: optionalUrl?.trim() || data.sourceUrl || null,

    missions: Array.isArray(data.missions)
      ? data.missions
          .map((m) => String(m).trim())
          .filter((m) => Boolean(m) && !isSuspiciousTitle(m))
      : [],
    responsibilities: Array.isArray(data.responsibilities)
      ? data.responsibilities
          .map((r) => String(r).trim())
          .filter((r) => Boolean(r) && !isSuspiciousTitle(r))
      : [],

    requiredSkills: Array.isArray(data.requiredSkills)
      ? data.requiredSkills.map((s) => String(s).trim()).filter(Boolean)
      : [],
    preferredSkills: Array.isArray(data.preferredSkills)
      ? data.preferredSkills.map((s) => String(s).trim()).filter(Boolean)
      : [],
    tools: Array.isArray(data.tools)
      ? data.tools.map((t) => String(t).trim()).filter(Boolean)
      : [],
    requiredLanguages: Array.isArray(data.requiredLanguages)
      ? data.requiredLanguages
          .map((l) => ({
            langue: String(l.langue || "").trim(),
            niveau: l.niveau ? String(l.niveau).trim() : undefined,
            obligatoire: l.obligatoire ?? true,
          }))
          .filter((l) => Boolean(l.langue))
      : [],
    preferredLanguages: Array.isArray(data.preferredLanguages)
      ? data.preferredLanguages
          .map((l) => ({
            langue: String(l.langue || "").trim(),
            niveau: l.niveau ? String(l.niveau).trim() : undefined,
          }))
          .filter((l) => Boolean(l.langue))
      : [],
    qualities: Array.isArray(data.qualities)
      ? data.qualities.map((q) => String(q).trim()).filter(Boolean)
      : [],
    experienceRequirements: data.experienceRequirements || null,
    educationRequirements: Array.isArray(data.educationRequirements)
      ? data.educationRequirements.map((e) => String(e).trim()).filter(Boolean)
      : [],

    companyName: resolvedCompany,
    companyDescription: data.companyDescription || null,
    companySector:
      companySanitized.extractedSector || data.companySector || null,
    companySize: companySanitized.extractedSize || data.companySize || null,
    companyLocation: data.companyLocation || null,
    companyWebsite: data.companyWebsite || null,
    companyContext: Array.isArray(data.companyContext)
      ? data.companyContext.map((c) => String(c).trim()).filter(Boolean)
      : [],
    companyPartners: Array.isArray(data.companyPartners)
      ? data.companyPartners.map((p) => String(p).trim()).filter(Boolean)
      : [],
    companyMetrics,

    recruitmentProcess: Array.isArray(data.recruitmentProcess)
      ? data.recruitmentProcess.map((p) => String(p).trim()).filter(Boolean)
      : [],
    applicationMethod: data.applicationMethod || null,
    applicationRequirements: Array.isArray(data.applicationRequirements)
      ? data.applicationRequirements
          .map((r) => String(r).trim())
          .filter(Boolean)
      : [],

    benefits: Array.isArray(data.benefits)
      ? data.benefits.map((b) => String(b).trim()).filter(Boolean)
      : [],

    sourceType: data.sourceType || "job_board",
    sourceName: data.sourceName || data.source || null,
    sourcePublishedAt: data.sourcePublishedAt || null,
    extractedAt: new Date().toISOString(),
    _extractionMethod: "ai",
    _modelUsed: modelUsed,
  };

  // [AI NORMALIZED] Log structuré après normalisation et validation
  console.info(
    `[AI NORMALIZED] Opportunité structurée validée (${extracted._extractionMethod} via ${extracted._modelUsed}):`,
    {
      title: extracted.title,
      company: extracted.company,
      contractType: extracted.contractType,
      duration: extracted.duration,
      startDate: extracted.startDate,
      metricsCount: extracted.companyMetrics.length,
      missionsCount: extracted.missions.length,
      skillsCount: extracted.requiredSkills.length,
      companyMetrics: extracted.companyMetrics,
    },
  );

  return extracted;
}
