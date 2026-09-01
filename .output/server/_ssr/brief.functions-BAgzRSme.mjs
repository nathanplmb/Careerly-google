import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-ChZ9lotr.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DzSAAPdn.mjs";
import { t as createServerRpc } from "./createServerRpc-9mSXyqDc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/brief.functions-BAgzRSme.js
var Input = object({
	faits: string().min(1),
	profil: string().optional()
});
var genererBrief_createServerFn_handler = createServerRpc({
	id: "75a504a229f5e3c0e0dba4175783b8f62dd4394c929a9350ed6741f047b60228",
	name: "genererBrief",
	filename: "src/lib/brief.functions.ts"
}, (opts) => genererBrief.__executeServer(opts));
var genererBrief = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Input.parse(data)).handler(genererBrief_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterTexte } = await import("./quota.server-DCy6e-0g.mjs");
	try {
		await consommerQuota(context.supabase, "brief");
	} catch (e) {
		return {
			quotaAtteint: true,
			message: e instanceof Error ? e.message : "Quota IA atteint.",
			resume: "",
			elements: [],
			recommandations: [],
			modele: ""
		};
	}
	const { genererBriefIA, MODELE_BRIEF } = await import("./brief.server-3lnAZ8P8.mjs");
	return {
		...await genererBriefIA({
			faits: limiterTexte(data.faits, "brief"),
			profil: limiterTexte(data.profil ?? "", "brief")
		}),
		quotaAtteint: false,
		modele: MODELE_BRIEF
	};
});
//#endregion
export { genererBrief_createServerFn_handler };
