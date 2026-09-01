import { c as _enum, d as number, f as object, l as array, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { t as createServerRpc } from "./createServerRpc-BTzMH-Hs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv-import.functions-C3RtT1bt.js
var ImportCVInput = object({ doc: object({
	fileName: string(),
	fileSize: number(),
	fileType: _enum([
		"pdf",
		"docx",
		"txt",
		"rtf",
		"autre"
	]),
	pages: array(object({
		pageNumber: number(),
		blocks: array(object({
			text: string(),
			x: number().optional(),
			y: number().optional(),
			width: number().optional(),
			height: number().optional(),
			page: number().optional()
		})),
		text: string()
	})),
	plainText: string().min(20)
}) });
var extraireCvServeur_createServerFn_handler = createServerRpc({
	id: "47e694db27267631b2b10d89ba6fbeadb11f0a43861158b1191494d12c917b28",
	name: "extraireCvServeur",
	filename: "src/lib/cv-import.functions.ts"
}, (opts) => extraireCvServeur.__executeServer(opts));
var extraireCvServeur = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => ImportCVInput.parse(data)).handler(extraireCvServeur_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "cv");
	const { detectSections } = await import("./sections-C5fC3oXB.mjs");
	const { segmentBlocks } = await import("./segmenter-aZGqxh3g.mjs");
	const { extraireContenuCVServer } = await import("./extractor.server-D4d6mS2X.mjs");
	const { validateCVImportResult } = await import("./validator-By3zfY0U.mjs");
	const segmented = segmentBlocks(detectSections(data.doc));
	const { result } = validateCVImportResult(await extraireContenuCVServer(data.doc, segmented));
	return result;
});
//#endregion
export { extraireCvServeur_createServerFn_handler };
