import { t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini.server-D450yT_j.js
var ai = new GoogleGenAI({
	apiKey: process.env["GEMINI_API_KEY"] || "",
	httpOptions: { headers: { "User-Agent": "aistudio-build" } }
});
/**
* Ordre de puissance décroissante :
* 1. gemini-3.8-flash (très puissant, priorité principale)
* 2. gemini-3.7-flash (si 3.8 non disponible ou saturé)
* 3. gemini-3.6-flash (modèle Flash puissant et moderne)
* 4. gemini-3.1-flash-lite (filet de sécurité ultime ultra-rapide)
*/
var DEFAULT_MODEL_CASCADE = [
	"gemini-3.8-flash",
	"gemini-3.7-flash",
	"gemini-3.6-flash",
	"gemini-3.1-flash-lite",
	"gemini-flash-latest"
];
async function appelerGeminiSecurise(opts) {
	if (!process.env["GEMINI_API_KEY"]) throw new Error("GEMINI_API_KEY is not configured.");
	const modelsToTry = opts.modele ? [opts.modele, ...DEFAULT_MODEL_CASCADE.filter((m) => m !== opts.modele)] : DEFAULT_MODEL_CASCADE;
	let lastError = null;
	for (let attempt = 0; attempt < modelsToTry.length; attempt++) {
		const model = modelsToTry[attempt] || "gemini-3.7-flash";
		try {
			const response = await ai.models.generateContent({
				model,
				contents: opts.promptUtilisateur,
				config: {
					systemInstruction: opts.promptSysteme,
					temperature: opts.temperature ?? .7,
					responseMimeType: opts.reponseFormat === "json" ? "application/json" : "text/plain"
				}
			});
			if (response.text) return response.text;
		} catch (err) {
			const errorObj = err instanceof Error ? err : new Error(String(err));
			lastError = errorObj;
			const errMsg = errorObj.message;
			if (errMsg.includes("API_KEY") || errMsg.includes("GEMINI_API_KEY") || errMsg.includes("invalid API key")) throw errorObj;
			console.info(`[Gemini Server] Modèle ${model} indisponible, basculement vers le candidat suivant (${attempt + 1}/${modelsToTry.length}).`);
			continue;
		}
	}
	throw lastError || /* @__PURE__ */ new Error("Échec de l'appel Gemini.");
}
function extraireJsonPropre(text) {
	if (!text) return "";
	const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
	return match ? match[1] || "" : text.trim();
}
//#endregion
export { extraireJsonPropre as n, appelerGeminiSecurise as t };
