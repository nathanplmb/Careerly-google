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
  return (match ? match[1] : raw).trim();
}

/**
 * Modèles candidats par ordre décroissant de puissance selon la demande :
 * 1. gemini-3.8-flash (très puissant, premier choix)
 * 2. gemini-3.7-flash (si 3.8 non disponible ou saturé)
 * 3. gemini-3.6-flash (modèle Flash puissant et disponible)
 * 4. gemini-3.1-flash-lite (secours ultime très réactif)
 */
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.1-flash-lite",
];

async function generateContentWithFallback(
  ai: GoogleGenAI,
  contents: string,
  systemInstruction: string,
  responseSchema: unknown,
): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
    const model = CANDIDATE_MODELS[attempt];
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.1,
          responseMimeType: "application/json",
          // @ts-expect-error GenAI SDK accepts responseSchema in config
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

      // Log discret pour le suivi de cascade sans fausse alerte environnement
      console.info(
        `[Opportunity AI] Modèle ${model} indisponible, basculement vers le modèle suivant (${attempt + 1}/${CANDIDATE_MODELS.length}).`,
      );

      continue;
    }
  }

  // Si tous les modèles ont échoué
  let friendlyMsg = "Impossible d'extraire les données de l'offre avec l'IA.";
  if (lastError) {
    const rawMsg = lastError?.message || String(lastError);
    if (
      rawMsg.includes("503") ||
      rawMsg.includes("high demand") ||
      rawMsg.includes("UNAVAILABLE")
    ) {
      friendlyMsg =
        "Les serveurs de l'IA connaissent une forte demande temporaire. Veuillez patienter quelques instants et réessayer.";
    } else if (
      rawMsg.includes("429") ||
      rawMsg.includes("RESOURCE_EXHAUSTED")
    ) {
      friendlyMsg =
        "Limite de requêtes atteinte temporairement. Veuillez réessayer dans un instant.";
    } else if (
      rawMsg.includes("API_KEY") ||
      rawMsg.includes("GEMINI_API_KEY")
    ) {
      friendlyMsg = "Clé d'API Gemini manquante ou invalide.";
    } else {
      friendlyMsg = `Erreur IA : ${lastError.message || rawMsg}`;
    }
  }
  throw new Error(friendlyMsg);
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

  const ai = getAiClient();
  const userPrompt = buildOpportunityUserPrompt(rawText, optionalUrl);

  const responseText = await generateContentWithFallback(
    ai,
    userPrompt,
    OPPORTUNITY_SYSTEM_PROMPT,
    geminiOpportunityResponseSchema,
  );
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

  const extracted: OpportunityExtractedData = {
    title: (data.title || "Poste sans titre").trim(),
    poste: (data.title || "Poste sans titre").trim(),
    company: (data.company || "Entreprise inconnue").trim(),
    entreprise: (data.company || "Entreprise inconnue").trim(),
    location: (data.location || "").trim(),
    lieu: (data.location || "").trim(),
    country: data.country || null,
    contractType: data.contractType || null,
    typeContrat: data.contractType || null,
    duration: data.duration || null,
    startDate: data.startDate || null,
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
    companyMetrics: Array.isArray(data.companyMetrics)
      ? data.companyMetrics
          .map((m) => ({
            label: String(m.label || "").trim(),
            value: String(m.value || "").trim(),
          }))
          .filter((m) => Boolean(m.label && m.value))
      : [],

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

  return extracted;
}
