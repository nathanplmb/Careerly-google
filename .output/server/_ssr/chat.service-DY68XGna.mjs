import { r as normalizeCandidateContext } from "./chat.context-C99HGULU.mjs";
import { n as buildFullSystemInstruction } from "./chat.prompt-kSSU_L-J.mjs";
import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.service-DY68XGna.js
var ai = new GoogleGenAI({
	apiKey: process.env["GEMINI_API_KEY"] || "",
	httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});
async function executeChatTurn(payload) {
	if (!process.env["GEMINI_API_KEY"]) throw new Error("Clé API Gemini non configurée (GEMINI_API_KEY).");
	const normalizedPayload = {
		...payload,
		candidateContext: normalizeCandidateContext(payload.candidateContext)
	};
	const systemInstruction = buildFullSystemInstruction(normalizedPayload);
	const contents = payload.messages.map((msg) => ({
		role: msg.role === "user" ? "user" : "model",
		parts: [{ text: msg.content }]
	}));
	const requestedModel = payload.modelId || "gemini-3.5-flash";
	const cascadeOrder = [
		requestedModel,
		"gemini-3.5-flash",
		"gemini-3.8-flash",
		"gemini-3.1-flash-lite"
	];
	const uniqueModelsToTry = Array.from(new Set(cascadeOrder));
	let lastError = null;
	let successfulModelUsed = requestedModel;
	for (const model of uniqueModelsToTry) try {
		const replyText = (await ai.models.generateContent({
			model,
			contents,
			config: {
				systemInstruction,
				temperature: requestedModel === "gemini-3.1-pro-preview" ? .4 : .7
			}
		})).text?.trim();
		if (replyText) {
			successfulModelUsed = model;
			return {
				reply: replyText,
				modelUsed: successfulModelUsed,
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			};
		}
	} catch (err) {
		const errorObj = err instanceof Error ? err : new Error(String(err));
		lastError = errorObj;
		const errMsg = errorObj.message;
		if (errMsg.includes("API_KEY") || errMsg.includes("invalid API key") || errMsg.includes("unauthenticated")) throw errorObj;
		console.warn(`[Gemini Chat] Le modèle ${model} a échoué (${errMsg}), essai du modèle suivant...`);
	}
	throw lastError || /* @__PURE__ */ new Error("Impossible d'obtenir une réponse de Gemini.");
}
//#endregion
export { executeChatTurn };
