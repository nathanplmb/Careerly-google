import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-D8ETlJSB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CU_jJy1z.mjs";
import { t as createServerRpc } from "./createServerRpc-oBdLUL4Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matching.functions-BMYkeH4W.js
var Input = object({
	profil: string().min(1),
	offre: string().min(10)
});
var analyserCorrespondance_createServerFn_handler = createServerRpc({
	id: "2896e34e239084a572794632bb40835f08ef389cdd202ac616d7b85426bd61ef",
	name: "analyserCorrespondance",
	filename: "src/lib/matching.functions.ts"
}, (opts) => analyserCorrespondance.__executeServer(opts));
var analyserCorrespondance = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(analyserCorrespondance_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterTexte } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "match");
	const { analyserCorrespondanceIA, MODELE_MATCH } = await import("./matching.server-1Kzwvnc8.mjs");
	return {
		...await analyserCorrespondanceIA({
			profil: limiterTexte(data.profil, "match"),
			offre: limiterTexte(data.offre, "match")
		}),
		modele: MODELE_MATCH
	};
});
//#endregion
export { analyserCorrespondance_createServerFn_handler };
