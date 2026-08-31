import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { o as getRequest, s as createMiddleware } from "./server-BocG72bt.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-middleware-ke1QXT9x.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const SUPABASE_URL = processModule.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) return next({ context: {
		supabase: null,
		userId: "local-user",
		claims: { sub: "local-user" }
	} });
	const request = getRequest();
	if (!request?.headers) return next({ context: {
		supabase: null,
		userId: "local-user",
		claims: { sub: "local-user" }
	} });
	const authHeader = request.headers.get("authorization");
	if (!authHeader || !authHeader.startsWith("Bearer ")) return next({ context: {
		supabase: null,
		userId: "local-user",
		claims: { sub: "local-user" }
	} });
	const token = authHeader.replace("Bearer ", "");
	if (!token || token.split(".").length !== 3) return next({ context: {
		supabase: null,
		userId: "local-user",
		claims: { sub: "local-user" }
	} });
	try {
		const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
			global: {
				fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
				headers: { Authorization: `Bearer ${token}` }
			},
			auth: {
				storage: void 0,
				persistSession: false,
				autoRefreshToken: false
			}
		});
		const { data, error } = await supabase.auth.getClaims(token);
		if (error || !data?.claims || !data.claims.sub) return next({ context: {
			supabase,
			userId: "local-user",
			claims: { sub: "local-user" }
		} });
		return next({ context: {
			supabase,
			userId: data.claims.sub,
			claims: data.claims
		} });
	} catch {
		return next({ context: {
			supabase: null,
			userId: "local-user",
			claims: { sub: "local-user" }
		} });
	}
});
//#endregion
export { requireSupabaseAuth as t };
