import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-D8ETlJSB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CU_jJy1z.mjs";
import { t as createServerRpc } from "./createServerRpc-oBdLUL4Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/relance.functions-s3fCS4Uk.js
var Input = object({
	typeRelance: string().min(1),
	contact: string().min(1),
	profil: string().default(""),
	offre: string().default(""),
	historique: string().default(""),
	consigne: string().default("")
});
var genererRelance_createServerFn_handler = createServerRpc({
	id: "083602d0b411f735d2eebc83b88e78ffbf195fe1ecbd8d102e008b00ba40a90e",
	name: "genererRelance",
	filename: "src/lib/relance.functions.ts"
}, (opts) => genererRelance.__executeServer(opts));
var genererRelance = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(genererRelance_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterEntree } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "relance");
	const { genererRelanceIA, MODELE_RELANCE } = await import("./relance.server-DAT5Jkku.mjs");
	return {
		...await genererRelanceIA({
			...data,
			...limiterEntree(data, "relance")
		}),
		modele: MODELE_RELANCE
	};
});
//#endregion
export { genererRelance_createServerFn_handler };
