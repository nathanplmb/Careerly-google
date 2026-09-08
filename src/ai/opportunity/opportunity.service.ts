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
import type { OpportunityExtractedData } from "./opportunity.types";

function getAiClient(): GoogleGenAI {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("La clé d'API GEMINI_API_KEY n'est pas configurée.");
  }
  return new GoogleGenAI({
    apiKey,
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
 * Modèles candidats par ordre de disponibilité, rapidité et résilience :
 * gemini-3.1-flash-lite : ultra-rapide, quota élevé, quasiment jamais saturé (idéal pour l'extraction)
 * gemini-flash-latest : alias moderne officiel
 * gemini-3.7-flash : haute fidélité avec fallback
 * gemini-3.8-flash : modèle de pointe
 * gemini-3.6-flash : modèle Flash moderne
 */
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-3.6-flash",
];

async function generateContentWithFallback(
  ai: GoogleGenAI,
  contents: string,
  systemInstruction: string,
  responseSchema: unknown,
): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
    const model = CANDIDATE_MODELS[attempt] || "gemini-3.1-flash-lite";
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
        return response.text;
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

      console.info(
        `[Opportunity AI] Modèle ${model} indisponible (${errorObj.message?.slice(0, 80)}), basculement vers le candidat suivant (${attempt + 1}/${CANDIDATE_MODELS.length}).`,
      );

      continue;
    }
  }

  // Si tous les modèles ont échoué, on relève l'erreur pour basculer sur l'extraction heuristique
  throw lastError || new Error("Indisponibilité temporaire des modèles IA.");
}

/**
 * Extraction heuristique de secours en cas d'indisponibilité totale du réseau ou des serveurs IA
 */
export function extraireOpportuniteHeuristique(
  rawText: string,
  optionalUrl?: string,
): OpportunityExtractedData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // 1. Détection du titre du poste
  let title = "";
  const titleRegex =
    /(?:intitulé(?: du poste)?|titre|poste|job title|job|offre)\s*[:\-–]\s*([^\n\r.]+)/i;
  for (const line of lines) {
    const m = line.match(titleRegex);
    if (m && m[1] && m[1].length > 3) {
      title = m[1].trim();
      break;
    }
  }
  if (!title) {
    const jobKeywordsRegex =
      /\b(?:développeur|developpeur|ingénieur|ingenieur|lead dev|tech lead|architecte|consultant|manager|chef de projet|product owner|product manager|data scientist|data engineer|devops|designer|commercial|comptable|stage|alternance|stagiaire|alternant)\b/i;
    for (const line of lines.slice(0, 10)) {
      if (jobKeywordsRegex.test(line) && line.length < 80) {
        title = line.replace(/^[#*•\-\s]+/, "").trim();
        break;
      }
    }
  }
  if (!title && lines.length > 0) {
    title = lines[0]
      .replace(/^[#*•\-\s]+/, "")
      .slice(0, 70)
      .trim();
  }

  // 2. Détection de l'entreprise
  let company = "";
  if (title && /\bchez\s+/i.test(title)) {
    const parts = title.split(/\bchez\s+/i);
    title = parts[0].trim();
    if (parts[1]) {
      company = parts[1]
        .split(/\s+(?:à|au|en|pour)\s+/i)[0]
        .replace(/[.,;:].*$/, "")
        .trim();
    }
  }

  const companyRegex =
    /(?:entreprise|société|societe|chez|company|client)\s*[:\-–]?\s*([A-Za-z0-9À-ÿ\s&.-]{2,30})/i;
  if (!company) {
    for (const line of lines) {
      const m = line.match(companyRegex);
      if (
        m &&
        m[1] &&
        !m[1].toLowerCase().includes("recherche") &&
        !m[1].toLowerCase().includes("recrute")
      ) {
        company = m[1]
          .split(/\s+(?:à|au|en|pour)\s+/i)[0]
          .replace(/[.,;:].*$/, "")
          .trim();
        break;
      }
    }
  }
  if (!company && optionalUrl) {
    try {
      const parsedUrl = new URL(optionalUrl);
      const host = parsedUrl.hostname.replace(/^www\./, "");
      const parts = host.split(".");
      if (
        parts.length >= 2 &&
        ![
          "welcometothejungle",
          "linkedin",
          "indeed",
          "hellowork",
          "apec",
          "glassdoor",
        ].includes(parts[0])
      ) {
        company = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
    } catch {
      // Ignorer si url invalide
    }
  }

  // 3. Détection de la localisation
  let location = "";
  const locRegex =
    /(?:lieu|localisation|ville|location)\s*[:\-–]?\s*([^\n\r,;()]+)/i;
  for (const line of lines) {
    const m = line.match(locRegex);
    if (m && m[1]) {
      location = m[1].trim();
      break;
    }
  }
  if (!location) {
    const commonCities = [
      "Paris",
      "Lyon",
      "Marseille",
      "Toulouse",
      "Bordeaux",
      "Nantes",
      "Lille",
      "Strasbourg",
      "Rennes",
      "Montpellier",
      "Nice",
      "Grenoble",
    ];
    for (const city of commonCities) {
      if (new RegExp(`\\b${city}\\b`, "i").test(rawText)) {
        location = city;
        break;
      }
    }
  }

  // 4. Type de contrat
  let contractType: string | null = null;
  if (/\bCDI\b/i.test(rawText)) contractType = "CDI";
  else if (/\bCDD\b/i.test(rawText)) contractType = "CDD";
  else if (/\b(?:stage|stagiaire)\b/i.test(rawText)) contractType = "Stage";
  else if (/\b(?:alternance|apprentissage|contrat pro)\b/i.test(rawText))
    contractType = "Alternance";
  else if (/\bfreelance\b/i.test(rawText)) contractType = "Freelance";

  // 5. Télétravail
  let remotePolicy: string | null = null;
  if (/full\s*remote|100%\s*télétravail|télétravail\s*total/i.test(rawText)) {
    remotePolicy = "Full remote";
  } else if (
    /hybride|partiel|télétravail\s*(?:partiel|possible|\d+\s*j)/i.test(rawText)
  ) {
    remotePolicy = "Hybride";
  } else if (/présentiel/i.test(rawText)) {
    remotePolicy = "Présentiel";
  }

  // 6. Salaire
  let salary: string | null = null;
  const salMatch = rawText.match(
    /\b(\d{2,3}(?:\s?[–-]\s?\d{2,3})?\s?[kK]€?|\d{2,3}\s?000\s?€|\d{3,4}\s?€\s*\/\s*mois)\b/i,
  );
  if (salMatch) {
    salary = salMatch[0].trim();
  }

  // 7. Missions (lignes à puces)
  const missions: string[] = [];
  for (const line of lines) {
    if (/^[•\-*]\s*(.+)/.test(line)) {
      const bullet = line.replace(/^[•\-*]\s*/, "").trim();
      if (bullet.length > 10 && bullet.length < 250) {
        missions.push(bullet);
      }
    }
  }

  // 8. Compétences
  const techKeywords = [
    "React",
    "Vue",
    "Angular",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "Spring",
    "Go",
    "Golang",
    "C#",
    ".NET",
    "PHP",
    "Symfony",
    "Laravel",
    "Ruby",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
    "Git",
    "CI/CD",
    "Tailwind",
    "REST",
    "GraphQL",
    "Figma",
    "Agile",
    "Scrum",
  ];
  const requiredSkills: string[] = [];
  for (const skill of techKeywords) {
    if (new RegExp(`\\b${skill.replace(".", "\\.")}\\b`, "i").test(rawText)) {
      requiredSkills.push(skill);
    }
  }

  return {
    title: title || "Poste sans titre",
    poste: title || "Poste sans titre",
    company: company || "Entreprise inconnue",
    entreprise: company || "Entreprise inconnue",
    location: location || "",
    lieu: location || "",
    country: "France",
    contractType,
    typeContrat: contractType,
    remotePolicy,
    salary,
    source: optionalUrl ? "Lien externe" : "Texte brut",
    sourceUrl: optionalUrl?.trim() || null,
    missions: missions.slice(0, 8),
    responsibilities: [],
    requiredSkills: requiredSkills.slice(0, 10),
    preferredSkills: [],
    tools: [],
    requiredLanguages: [],
    preferredLanguages: [],
    qualities: [],
    educationRequirements: [],
    companyContext: [],
    companyPartners: [],
    companyMetrics: [],
    recruitmentProcess: [],
    applicationRequirements: [],
    benefits: [],
    sourceType: "job_board",
    sourceName: optionalUrl ? "Lien externe" : "Texte brut",
    extractedAt: new Date().toISOString(),
  };
}

/**
 * Service serveur pour l'extraction haute précision d'une opportunité
 */
export async function extraireOpportuniteIA(
  rawText: string,
  optionalUrl?: string,
): Promise<OpportunityExtractedData> {
  if (!rawText || rawText.trim().length < 15) {
    throw new Error("Le texte de l'offre est trop court pour être analysé.");
  }

  let ai: GoogleGenAI | null = null;
  try {
    ai = getAiClient();
  } catch (err) {
    console.warn(
      "[Opportunity AI] Client IA non disponible, basculement vers extraction heuristique:",
      err,
    );
    return extraireOpportuniteHeuristique(rawText, optionalUrl);
  }

  const userPrompt = buildOpportunityUserPrompt(rawText, optionalUrl);

  let responseText: string;
  try {
    responseText = await generateContentWithFallback(
      ai,
      userPrompt,
      OPPORTUNITY_SYSTEM_PROMPT,
      geminiOpportunityResponseSchema,
    );
  } catch (err) {
    console.warn(
      "[Opportunity AI] Tous les modèles distants sont temporairement indisponibles, utilisation du moteur heuristique de secours:",
      err,
    );
    return extraireOpportuniteHeuristique(rawText, optionalUrl);
  }
  const cleanedJson = cleanJsonString(responseText);

  let parsedRaw: Record<string, unknown>;
  try {
    parsedRaw = JSON.parse(cleanedJson);
  } catch (err) {
    console.error("Erreur de parsing JSON brut Gemini:", err, responseText);
    throw new Error("L'IA n'a pas renvoyé un format JSON valide.");
  }

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

  console.info("[AI EXTRACTION] JSON structuré brut issu de Gemini:", {
    title: data.title,
    company: data.company,
    contractType: data.contractType,
    duration: data.duration,
    startDate: data.startDate,
    metricsCount: Array.isArray(data.companyMetrics)
      ? data.companyMetrics.length
      : 0,
    missionsCount: Array.isArray(data.missions) ? data.missions.length : 0,
    skillsCount: Array.isArray(data.requiredSkills)
      ? data.requiredSkills.length
      : 0,
  });

  // --- GARDE-FOUS DÉTERMINISTES (Règles 13 et 19) ---
  // 1. Détection déterministe et anti-incohérence du type de contrat
  let resolvedContractType = data.contractType || null;
  const lowerText = rawText.toLowerCase();

  if (
    /\b(stage|stagiaire|internship|intern)\b/i.test(rawText) &&
    (!resolvedContractType || resolvedContractType.toLowerCase() === "cdi")
  ) {
    resolvedContractType = "Stage";
  } else if (
    /\b(alternance|alternant|apprentissage|apprenti|contrat de pro(?:fessionnalisation)?)\b/i.test(
      rawText,
    ) &&
    (!resolvedContractType || resolvedContractType.toLowerCase() === "cdi")
  ) {
    resolvedContractType = "Alternance";
  } else if (
    /\b(cdd|contrat à durée déterminée)\b/i.test(rawText) &&
    !/\b(stage|alternance)\b/i.test(rawText)
  ) {
    resolvedContractType = "CDD";
  } else if (
    /\b(cdi|contrat à durée indéterminée)\b/i.test(rawText) &&
    !/\b(stage|alternance|stagiaire)\b/i.test(rawText)
  ) {
    resolvedContractType = "CDI";
  } else if (
    /\b(v\.?i\.?e|volontariat international en entreprise)\b/i.test(rawText)
  ) {
    resolvedContractType = "VIE";
  } else if (/\b(freelance|indépendant)\b/i.test(rawText)) {
    resolvedContractType = "Freelance";
  } else if (/\b(intérim|interim)\b/i.test(rawText)) {
    resolvedContractType = "Intérim";
  }

  // 2. Détection déterministe de la durée si omise par l'IA
  let resolvedDuration = data.duration || null;
  if (!resolvedDuration || resolvedDuration.trim().toLowerCase() === "null") {
    const durationMatch =
      rawText.match(
        /(?:durée(?:\s*du\s*(?:contrat|stage|poste))?|stage\s+de|alternance\s+de|mission\s+de|contrat\s+de)\s*[:–-]?\s*(\d+\s*(?:[àa]\s*\d+\s*)?(?:mois|semaines|ans?|jours?))\b/i,
      ) || rawText.match(/\b(\d+\s*(?:[àa]\s*\d+\s*)?mois)\b/i);
    if (durationMatch && durationMatch[1]) {
      resolvedDuration = durationMatch[1].trim();
    }
  }

  // 3. Détection déterministe de la date de début si omise
  let resolvedStartDate = data.startDate || null;
  if (!resolvedStartDate || resolvedStartDate.trim().toLowerCase() === "null") {
    const startDateMatch = rawText.match(
      /(?:[àa]\s+partir\s+de|d[ée]but\s*:?|d[ée]marrage\s*:?|d[èe]s\s*:?|[àa]\s+pourvoir\s+(?:en|d[èe]s|[àa]\s+partir\s+de))\s*([a-zA-ZÀ-ÿ0-9\s]+?(?:\d{4}|d[èe]s\s+que\s+possible|imm[ée]diat(?:ement)?))\b/i,
    );
    if (startDateMatch && startDateMatch[1]) {
      const candidate = startDateMatch[1].trim();
      if (candidate.length > 2 && candidate.length < 35) {
        resolvedStartDate = candidate;
      }
    }
  }

  // 4. Métriques de l'entreprise : conservation stricte et extraction complémentaire
  const companyMetrics = Array.isArray(data.companyMetrics)
    ? data.companyMetrics
        .map((m) => ({
          label: String(m.label || "").trim(),
          value: String(m.value || "").trim(),
        }))
        .filter((m) => Boolean(m.label && m.value))
    : [];

  // Si l'IA n'a pas détecté de métriques mais que le texte contient des chiffres évidents
  if (companyMetrics.length === 0) {
    const userCountMatch = rawText.match(
      /(?:plus de\s+)?(\d{1,3}(?:\s\d{3})+|\d+\s*000)\s*(utilisateurs|membres|clients|abonn[ée]s|salles\s+partenaires)/i,
    );
    if (userCountMatch) {
      companyMetrics.push({
        label:
          userCountMatch[2].charAt(0).toUpperCase() +
          userCountMatch[2].slice(1),
        value: userCountMatch[1].trim(),
      });
    }
    const fundingMatch = rawText.match(
      /(\d+(?:[.,]\d+)?\s*(?:M€|k€|millions?\s*d'euros?))\s*(?:de\s+lev[ée]e|lev[ée]s?|de\s+chiffre\s+d'affaires)/i,
    );
    if (fundingMatch) {
      companyMetrics.push({
        label: "Financement",
        value: fundingMatch[1].trim(),
      });
    }
  }

  const extracted: OpportunityExtractedData = {
    title: (data.title || "Poste sans titre").trim(),
    poste: (data.title || "Poste sans titre").trim(),
    company: (data.company || "Entreprise inconnue").trim(),
    entreprise: (data.company || "Entreprise inconnue").trim(),
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
      ? data.missions.map((m) => String(m).trim()).filter(Boolean)
      : [],
    responsibilities: Array.isArray(data.responsibilities)
      ? data.responsibilities.map((r) => String(r).trim()).filter(Boolean)
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

    companyName: data.companyName || data.company || null,
    companyDescription: data.companyDescription || null,
    companySector: data.companySector || null,
    companySize: data.companySize || null,
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
  };

  console.info(
    "[ANALYSIS NORMALIZED] Résultat après validation et harmonisation:",
    {
      title: extracted.title,
      company: extracted.company,
      contractType: extracted.contractType,
      duration: extracted.duration,
      startDate: extracted.startDate,
      metricsCount: extracted.companyMetrics.length,
      missionsCount: extracted.missions.length,
      skillsCount: extracted.requiredSkills.length,
      metrics: extracted.companyMetrics,
    },
  );

  return extracted;
}
