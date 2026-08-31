import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-D8ETlJSB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CU_jJy1z.mjs";
import { t as createServerRpc } from "./createServerRpc-oBdLUL4Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tri-ia.functions-CBFYDpNA.js
var Input = object({
	texte: string().min(10),
	aujourdhui: string()
});
var trierAvecIa_createServerFn_handler = createServerRpc({
	id: "1bb0be9313798ba1b18dae0bd81804d89445abd1715cf12be9b75f8d4c676adc",
	name: "trierAvecIa",
	filename: "src/lib/tri-ia.functions.ts"
}, (opts) => trierAvecIa.__executeServer(opts));
var trierAvecIa = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(trierAvecIa_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterTexte } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "tri");
	const { trierTexte } = await import("./tri-ia.server-DRzkHdod.mjs");
	return trierTexte(limiterTexte(data.texte, "tri"), data.aujourdhui);
});
//#endregion
export { trierAvecIa_createServerFn_handler };
