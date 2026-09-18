import { GoogleGenAI } from "@google/genai";
import type { ChatRequestPayload, ChatResponsePayload } from "./chat.types";
import { buildFullSystemInstruction } from "./chat.prompt";
import { normalizeCandidateContext } from "./chat.context";

const ai = new GoogleGenAI({
  apiKey: process.env["GEMINI_API_KEY"] || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function executeChatTurn(
  payload: ChatRequestPayload,
): Promise<ChatResponsePayload> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("Clé API Gemini non configurée (GEMINI_API_KEY).");
  }

  const normalizedPayload: ChatRequestPayload = {
    ...payload,
    candidateContext: normalizeCandidateContext(payload.candidateContext),
  };

  const systemInstruction = buildFullSystemInstruction(normalizedPayload);

  // Map messages to Gemini format (role must be 'user' or 'model')
  const contents = payload.messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));

  const requestedModel = payload.modelId || "gemini-3.5-flash";

  // Build fallback model cascade based on requested primary model
  const cascadeOrder = [
    requestedModel,
    "gemini-3.5-flash",
    "gemini-3.8-flash",
    "gemini-3.1-flash-lite",
  ];
  const uniqueModelsToTry = Array.from(new Set(cascadeOrder));

  let lastError: Error | null = null;
  let successfulModelUsed = requestedModel;

  for (const model of uniqueModelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: requestedModel === "gemini-3.1-pro-preview" ? 0.4 : 0.7,
        },
      });

      const replyText = response.text?.trim();
      if (replyText) {
        successfulModelUsed = model;
        return {
          reply: replyText,
          modelUsed: successfulModelUsed,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      lastError = errorObj;
      const errMsg = errorObj.message;

      // Fail immediately on explicit authentication error
      if (
        errMsg.includes("API_KEY") ||
        errMsg.includes("invalid API key") ||
        errMsg.includes("unauthenticated")
      ) {
        throw errorObj;
      }

      console.warn(
        `[Gemini Chat] Le modèle ${model} a échoué (${errMsg}), essai du modèle suivant...`,
      );
    }
  }

  throw lastError || new Error("Impossible d'obtenir une réponse de Gemini.");
}
