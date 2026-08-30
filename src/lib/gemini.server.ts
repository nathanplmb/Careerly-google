import { GoogleGenAI } from "@google/genai";

let _ai: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!_ai) {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.VITE_GEMINI_API_KEY ||
      (typeof import.meta !== "undefined" &&
        (import.meta as unknown as { env?: { VITE_GEMINI_API_KEY?: string } })
          .env?.VITE_GEMINI_API_KEY);
    if (!apiKey) {
      throw new Error("Clé AI manquante. Veuillez configurer GEMINI_API_KEY.");
    }
    _ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return _ai;
}

export const GEMINI_MODEL = "gemini-3.7-flash";
export const GEMINI_FALLBACK_MODELS = [
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-lite",
];

/** Nettoie et extrait un JSON valide à partir de la réponse Gemini */
export function extraireJsonPropre<T>(texte: string): T {
  let propre = texte.trim();
  // Retrait des blocs markdown ```json ... ```
  if (propre.startsWith("```")) {
    propre = propre
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
  }
  try {
    return JSON.parse(propre) as T;
  } catch (err) {
    // Tentative de rattrapage en cherchant le premier { ou [ et le dernier } ou ]
    const premierAccolade = propre.indexOf("{");
    const dernierAccolade = propre.lastIndexOf("}");
    const premierCrochet = propre.indexOf("[");
    const dernierCrochet = propre.lastIndexOf("]");

    if (
      premierAccolade !== -1 &&
      dernierAccolade !== -1 &&
      (premierCrochet === -1 || premierAccolade < premierCrochet)
    ) {
      const extrait = propre.slice(premierAccolade, dernierAccolade + 1);
      return JSON.parse(extrait) as T;
    }
    if (premierCrochet !== -1 && dernierCrochet !== -1) {
      const extrait = propre.slice(premierCrochet, dernierCrochet + 1);
      return JSON.parse(extrait) as T;
    }
    throw new Error(
      `Réponse JSON invalide reçue de Gemini : ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

/** Exécute un appel Gemini avec résilience, retry et modèle de secours en cas de 503/429 */
export async function appelerGeminiSecurise(options: {
  contents: string;
  systemInstruction?: string;
  responseMimeType?: string;
}): Promise<string> {
  const ai = getGeminiClient();
  const modeles = GEMINI_FALLBACK_MODELS;
  let dernierErreur: unknown = null;

  for (const model of modeles) {
    for (let tentative = 0; tentative < 2; tentative++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: options.contents,
          config: {
            systemInstruction: options.systemInstruction,
            responseMimeType: options.responseMimeType ?? "application/json",
          },
        });
        return response.text || "";
      } catch (err: unknown) {
        dernierErreur = err;
        const msg = err instanceof Error ? err.message : String(err);
        const estTemporaire =
          /503|UNAVAILABLE|high demand|temporarily|rate limit|429|resource exhausted/i.test(
            msg,
          );
        if (estTemporaire && tentative === 0) {
          // Attendre 700ms avant de retenter sur le même modèle
          await new Promise((r) => setTimeout(r, 700));
          continue;
        }
        // Si erreur non temporaire ou déjà réessayé, passer au modèle suivant
        break;
      }
    }
  }

  throw dernierErreur || new Error("Erreur de communication avec l'IA.");
}
