import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env["GEMINI_API_KEY"] || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

type GeminiOptions = {
  promptSysteme: string;
  promptUtilisateur: string;
  temperature?: number;
  modele?: string;
  reponseFormat?: "json" | "text";
};

/**
 * Ordre de puissance décroissante :
 * 1. gemini-3.8-flash (très puissant, priorité principale)
 * 2. gemini-3.7-flash (si 3.8 non disponible ou saturé)
 * 3. gemini-3.6-flash (modèle Flash puissant et moderne)
 * 4. gemini-3.1-flash-lite (filet de sécurité ultime ultra-rapide)
 */
const DEFAULT_MODEL_CASCADE = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.1-flash-lite",
];

export async function appelerGeminiSecurise(
  opts: GeminiOptions,
): Promise<string> {
  if (!process.env["GEMINI_API_KEY"]) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const modelsToTry = opts.modele
    ? [opts.modele, ...DEFAULT_MODEL_CASCADE.filter((m) => m !== opts.modele)]
    : DEFAULT_MODEL_CASCADE;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < modelsToTry.length; attempt++) {
    const model = modelsToTry[attempt];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: opts.promptUtilisateur,
        config: {
          systemInstruction: opts.promptSysteme,
          temperature: opts.temperature ?? 0.7,
          responseMimeType:
            opts.reponseFormat === "json" ? "application/json" : "text/plain",
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
        throw errorObj;
      }

      console.info(
        `[Gemini Server] Modèle ${model} indisponible, basculement vers le candidat suivant (${attempt + 1}/${modelsToTry.length}).`,
      );

      continue;
    }
  }

  throw lastError || new Error("Échec de l'appel Gemini.");
}

export function extraireJsonPropre(text: string): string {
  if (!text) return "";
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return match ? match[1] || "" : text.trim();
}
