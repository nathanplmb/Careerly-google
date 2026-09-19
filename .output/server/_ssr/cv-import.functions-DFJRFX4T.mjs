import { r as createServerFn } from "./server-BjfJ2E7A.mjs";
import { d as number, f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-CDaSMsxu.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BFRM2pED.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv-import.functions-DFJRFX4T.js
var ImportCVInput = object({
	doc: object({
		fileName: string().optional(),
		fileSize: number().optional(),
		fileType: string().optional(),
		plainText: string().min(20)
	}).optional(),
	text: string().min(20).optional()
});
var extraireCvServeur_createServerFn_handler = createServerRpc({
	id: "47e694db27267631b2b10d89ba6fbeadb11f0a43861158b1191494d12c917b28",
	name: "extraireCvServeur",
	filename: "src/lib/cv-import.functions.ts"
}, (opts) => extraireCvServeur.__executeServer(opts));
var extraireCvServeur = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => ImportCVInput.parse(data)).handler(extraireCvServeur_createServerFn_handler, async ({ data }) => {
	const rawText = data.text || data.doc?.plainText || "";
	if (!rawText || rawText.trim().length < 20) throw new Error("Aucun texte exploitable n'a été transmis pour l'analyse.");
	const { parseAndExtractCV } = await import("./cvImport.service-CX5_ZxF4.mjs");
	return await parseAndExtractCV(rawText);
});
//#endregion
export { extraireCvServeur_createServerFn_handler };
