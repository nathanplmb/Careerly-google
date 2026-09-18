import { c as _enum, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/networkingMessage.schema-Bl0tYGQq.js
var GenerateNetworkingMessageInputZodSchema = object({
	contact: object({
		nom: string(),
		entreprise: string().optional(),
		poste: string().optional(),
		type: string().optional(),
		category: string().optional(),
		linkedin: string().optional(),
		notes: string().optional()
	}),
	opportunity: object({
		poste: string().optional(),
		entreprise: string().optional(),
		currentStage: string().optional(),
		lieu: string().optional()
	}).optional(),
	userProfile: object({
		prenom: string().optional(),
		nom: string().optional(),
		ecole: string().optional(),
		posteRecherche: string().optional(),
		competences: array(string()).optional()
	}).optional(),
	tone: _enum([
		"alumni",
		"spontane",
		"direct",
		"entretien"
	]).optional().default("alumni")
});
var GenerateNetworkingMessageResultZodSchema = object({
	objet: string(),
	message: string(),
	conseils: array(string())
});
//#endregion
export { GenerateNetworkingMessageResultZodSchema as n, GenerateNetworkingMessageInputZodSchema as t };
