import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { t as createServerRpc } from "./createServerRpc-BTzMH-Hs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quota.functions-EYI_E9YI.js
var usageIaDuJour_createServerFn_handler = createServerRpc({
	id: "378b207fa4fdee797d916e49b30889c2a21ee687fbe35cec99abc178bc8b5528",
	name: "usageIaDuJour",
	filename: "src/lib/quota.functions.ts"
}, (opts) => usageIaDuJour.__executeServer(opts));
var usageIaDuJour = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(usageIaDuJour_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.rpc("usage_ia_du_jour");
	if (error) throw new Error("Usage IA indisponible pour le moment.");
	return data ?? {
		plan: "gratuit",
		lignes: [],
		total_utilise: 0,
		total_limite: 60
	};
});
//#endregion
export { usageIaDuJour_createServerFn_handler };
