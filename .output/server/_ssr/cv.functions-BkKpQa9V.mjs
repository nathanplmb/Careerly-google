import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-Ca2emXMH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-WrckP5Dl.mjs";
import { t as createServerRpc } from "./createServerRpc-DLmrBSLa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cv.functions-BkKpQa9V.js
var Input = object({
	cv: string().min(50),
	profil: string().optional()
});
var analyserCv_createServerFn_handler = createServerRpc({
	id: "f31cec66ab6270632e857c072556e946de1cb08cff5fad1e7ad30363aeb8101e",
	name: "analyserCv",
	filename: "src/lib/cv.functions.ts"
}, (opts) => analyserCv.__executeServer(opts));
var analyserCv = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(analyserCv_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterTexte } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "cv");
	const { analyserCvIA, MODELE_CV } = await import("./cv.server-DK-Vurhs.mjs");
	return {
		...await analyserCvIA({
			cv: limiterTexte(data.cv, "cv"),
			profil: limiterTexte(data.profil ?? "", "cv")
		}),
		modele: MODELE_CV
	};
});
//#endregion
export { analyserCv_createServerFn_handler };
