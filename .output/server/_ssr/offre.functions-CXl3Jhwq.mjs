import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-ChZ9lotr.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DzSAAPdn.mjs";
import { t as createServerRpc } from "./createServerRpc-9mSXyqDc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offre.functions-CXl3Jhwq.js
var Input = object({ texte: string().min(10) });
var analyserOffre_createServerFn_handler = createServerRpc({
	id: "a9a7d9748349c2caef4f1579d82ce8841e1718bdbb7ff691cfe5318e8c13da92",
	name: "analyserOffre",
	filename: "src/lib/offre.functions.ts"
}, (opts) => analyserOffre.__executeServer(opts));
var analyserOffre = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Input.parse(data)).handler(analyserOffre_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterTexte } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "offre");
	const { extraireOffre } = await import("./extraction.server-DR-1j8ap.mjs");
	return extraireOffre(limiterTexte(data.texte, "offre"));
});
//#endregion
export { analyserOffre_createServerFn_handler };
