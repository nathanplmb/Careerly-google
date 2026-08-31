import { t as GoogleGenAI } from "../_libs/google__genai+p-retry+retry.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/gemini.server-kLocAPgu.js
var _ai = null;
function getGeminiClient() {
	const env = typeof import.meta !== "undefined" ? {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	} : void 0;
	const apiKey = processModule.env.GEMINI_API_KEY || processModule.env.VITE_GEMINI_API_KEY || env?.VITE_GEMINI_API_KEY;
	if (!apiKey) throw new Error("Clé AI manquante. Veuillez configurer GEMINI_API_KEY.");
	if (!_ai) _ai = new GoogleGenAI({
		apiKey,
		httpOptions: { headers: { "User-Agent": "aistudio-build" } }
	});
	return _ai;
}
var GEMINI_MODEL = "gemini-3.7-flash";
var GEMINI_FALLBACK_MODELS = [
	"gemini-3.7-flash",
	"gemini-flash-latest",
	"gemini-3.1-pro-preview",
	"gemini-3.1-flash-lite"
];
/** Nettoie et extrait un JSON valide à partir de la réponse Gemini */
function extraireJsonPropre(texte) {
	let propre = texte.trim();
	if (propre.startsWith("```")) propre = propre.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
	try {
		return JSON.parse(propre);
	} catch (err) {
		const premierAccolade = propre.indexOf("{");
		const dernierAccolade = propre.lastIndexOf("}");
		const premierCrochet = propre.indexOf("[");
		const dernierCrochet = propre.lastIndexOf("]");
		if (premierAccolade !== -1 && dernierAccolade !== -1 && (premierCrochet === -1 || premierAccolade < premierCrochet)) {
			const extrait = propre.slice(premierAccolade, dernierAccolade + 1);
			return JSON.parse(extrait);
		}
		if (premierCrochet !== -1 && dernierCrochet !== -1) {
			const extrait = propre.slice(premierCrochet, dernierCrochet + 1);
			return JSON.parse(extrait);
		}
		throw new Error(`Réponse JSON invalide reçue de Gemini : ${err instanceof Error ? err.message : String(err)}`);
	}
}
/** Exécute un appel Gemini avec résilience, retry et modèle de secours en cas de 503/429 */
async function appelerGeminiSecurise(options) {
	const ai = getGeminiClient();
	const modeles = GEMINI_FALLBACK_MODELS;
	let dernierErreur = null;
	for (const model of modeles) for (let tentative = 0; tentative < 2; tentative++) try {
		return (await ai.models.generateContent({
			model,
			contents: options.contents,
			config: {
				systemInstruction: options.systemInstruction,
				responseMimeType: options.responseMimeType ?? "application/json"
			}
		})).text || "";
	} catch (err) {
		dernierErreur = err;
		const msg = err instanceof Error ? err.message : String(err);
		if (/503|UNAVAILABLE|high demand|temporarily|rate limit|429|resource exhausted/i.test(msg) && tentative === 0) {
			await new Promise((r) => setTimeout(r, 700));
			continue;
		}
		break;
	}
	throw dernierErreur || /* @__PURE__ */ new Error("Erreur de communication avec l'IA.");
}
//#endregion
export { appelerGeminiSecurise as n, extraireJsonPropre as r, GEMINI_MODEL as t };
