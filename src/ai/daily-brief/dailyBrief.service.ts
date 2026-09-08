import { GoogleGenAI } from "@google/genai";
import {
  DAILY_BRIEF_SYSTEM_PROMPT,
  buildDailyBriefUserPrompt,
} from "./dailyBrief.prompt";
import {
  DailyBriefZodSchema,
  geminiDailyBriefResponseSchema,
} from "./dailyBrief.schema";
import type { DailyBriefData, DailyBriefInputData } from "./dailyBrief.types";
import { generateDeterministicDailyBrief } from "./dailyBrief.deterministic";

export { generateDeterministicDailyBrief } from "./dailyBrief.deterministic";

function getAiClient(): GoogleGenAI {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("La clé d'API GEMINI_API_KEY n'est pas configurée.");
  }
  return new GoogleGenAI({
    apiKey,
  });
}

function cleanJsonString(raw: string): string {
  if (!raw) return "{}";
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return (match?.[1] ? match[1] : raw).trim();
}

const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
  "gemini-3.7-flash",
  "gemini-3.8-flash",
  "gemini-3.6-flash",
];

/**
 * Génère le Daily Brief en appelant l'IA Gemini avec cascade de modèles et schéma structuré.
 */
export async function generateDailyBriefIA(
  input: DailyBriefInputData,
): Promise<DailyBriefData> {
  // Si aucune clé Gemini n'est configurée, repli immédiat sur le générateur déterministe
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    console.info(
      "[Daily Brief] Pas de GEMINI_API_KEY trouvée, utilisation du brief déterministe.",
    );
    return generateDeterministicDailyBrief(input, true);
  }

  let ai: GoogleGenAI;
  try {
    ai = getAiClient();
  } catch (err) {
    console.warn("[Daily Brief] Erreur d'initialisation du client IA:", err);
    return generateDeterministicDailyBrief(input, true);
  }

  const userPrompt = buildDailyBriefUserPrompt(input);
  let rawJsonText: string | null = null;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
    const model = CANDIDATE_MODELS[attempt] || "gemini-3.1-flash-lite";
    try {
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction: DAILY_BRIEF_SYSTEM_PROMPT,
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: geminiDailyBriefResponseSchema,
        },
      });

      if (response.text) {
        rawJsonText = response.text;
        break;
      }
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      lastError = errorObj;
      console.info(
        `[Daily Brief] Modèle ${model} temporairement indisponible (${attempt + 1}/${CANDIDATE_MODELS.length}), basculement automatique.`,
      );
    }
  }

  if (!rawJsonText) {
    console.info(
      "[Daily Brief] Modèles IA distants indisponibles, utilisation du moteur déterministe certifié.",
    );
    return generateDeterministicDailyBrief(input, true);
  }

  try {
    const cleaned = cleanJsonString(rawJsonText);
    const parsed = JSON.parse(cleaned);
    const validated = DailyBriefZodSchema.parse(parsed);

    return {
      greeting: validated.greeting,
      summary: validated.summary,
      today: validated.today.slice(0, 5),
      watch: validated.watch.slice(0, 3),
      upcoming: validated.upcoming.slice(0, 5),
      recent: validated.recent.slice(0, 5),
      generatedAt: new Date().toISOString(),
      isFallback: false,
    };
  } catch (parseErr) {
    console.warn(
      "[Daily Brief] Erreur de validation de la réponse IA, basculement vers le mode déterministe:",
      parseErr,
    );
    return generateDeterministicDailyBrief(input, true);
  }
}
