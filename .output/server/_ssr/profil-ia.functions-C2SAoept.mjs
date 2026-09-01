import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { t as createServerRpc } from "./createServerRpc-BTzMH-Hs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-ia.functions-C2SAoept.js
var SyntheseInput = object({ profilTexte: string().min(5) });
var genererSyntheseProfil_createServerFn_handler = createServerRpc({
	id: "9352f6eabe68edbb75492c4f24a9cec674afb6ae0ff47c5892bf1cb413aa97a5",
	name: "genererSyntheseProfil",
	filename: "src/lib/profil-ia.functions.ts"
}, (opts) => genererSyntheseProfil.__executeServer(opts));
var genererSyntheseProfil = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => SyntheseInput.parse(data)).handler(genererSyntheseProfil_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "profil_synthese").catch(() => void 0);
	const { genererSyntheseProfilIAServer } = await import("./profil-ia.server-DJ9Bmnk2.mjs");
	return await genererSyntheseProfilIAServer(data.profilTexte);
});
var OptimiserInput = object({ profilTexte: string().min(5) });
var optimiserProfilIA_createServerFn_handler = createServerRpc({
	id: "b0aeaa7fd503b52f35234669d03a865dd7908c6c61f462822bccace20eb59efe",
	name: "optimiserProfilIA",
	filename: "src/lib/profil-ia.functions.ts"
}, (opts) => optimiserProfilIA.__executeServer(opts));
var optimiserProfilIA = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => OptimiserInput.parse(data)).handler(optimiserProfilIA_createServerFn_handler, async ({ data, context }) => {
	const { consommerQuota } = await import("./quota.server-DCy6e-0g.mjs");
	await consommerQuota(context.supabase, "profil_audit").catch(() => void 0);
	const { optimiserProfilIAServer } = await import("./profil-ia.server-DJ9Bmnk2.mjs");
	return await optimiserProfilIAServer(data.profilTexte);
});
//#endregion
export { genererSyntheseProfil_createServerFn_handler, optimiserProfilIA_createServerFn_handler };
