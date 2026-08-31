import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-D8ETlJSB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CU_jJy1z.mjs";
import { t as createServerRpc } from "./createServerRpc-oBdLUL4Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redaction.functions-DCdIBKwC.js
var Entree = object({
	profil: string().default(""),
	offre: string().default(""),
	consigne: string().default("")
});
var genererLettre_createServerFn_handler = createServerRpc({
	id: "7997b2e3a006c44a00fe04cdb9fc9cdc02f7ab88467baa270ad9ca1720130d41",
	name: "genererLettre",
	filename: "src/lib/redaction.functions.ts"
}, (opts) => genererLettre.__executeServer(opts));
var genererLettre = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Entree.parse(data)).handler(genererLettre_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterEntree } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "redaction");
	const { genererLettreIA } = await import("./redaction.server-BDvZZv8t.mjs");
	return genererLettreIA(limiterEntree(data, "redaction"));
});
var genererLinkedin_createServerFn_handler = createServerRpc({
	id: "daf786ab0b66bb28893566417a3af10ab6f993db6263c9cad43981c25bf01c5a",
	name: "genererLinkedin",
	filename: "src/lib/redaction.functions.ts"
}, (opts) => genererLinkedin.__executeServer(opts));
var genererLinkedin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Entree.parse(data)).handler(genererLinkedin_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterEntree } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "redaction");
	const { genererLinkedinIA } = await import("./redaction.server-BDvZZv8t.mjs");
	return genererLinkedinIA(limiterEntree(data, "redaction"));
});
var genererInterview_createServerFn_handler = createServerRpc({
	id: "ab1d6822282227581179677a75a3716b81aff39280cab57c9361859b15522701",
	name: "genererInterview",
	filename: "src/lib/redaction.functions.ts"
}, (opts) => genererInterview.__executeServer(opts));
var genererInterview = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Entree.parse(data)).handler(genererInterview_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota, limiterEntree } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "redaction");
	const { genererInterviewIA } = await import("./redaction.server-BDvZZv8t.mjs");
	return genererInterviewIA(limiterEntree(data, "redaction"));
});
//#endregion
export { genererInterview_createServerFn_handler, genererLettre_createServerFn_handler, genererLinkedin_createServerFn_handler };
