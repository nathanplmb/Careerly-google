import { h as string, m as object } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { i as createServerFn } from "./server-WJa-_0402.mjs";
import { t as createServerRpc } from "./createServerRpc-CI9cjqqT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunity.server-fn-BfFJERpg.js
var ExtraireOpportuniteInput = object({
	text: string().min(10, "Le texte de l'offre doit contenir au moins 10 caractères."),
	url: string().optional()
});
var extraireOpportuniteServerFn_createServerFn_handler = createServerRpc({
	id: "a8546a28c65e51fb3ecf9b7f6df5ff54e8d3e0bde77d5c2290b5d284fcc08ab9",
	name: "extraireOpportuniteServerFn",
	filename: "src/ai/opportunity/opportunity.server-fn.ts"
}, (opts) => extraireOpportuniteServerFn.__executeServer(opts));
var extraireOpportuniteServerFn = createServerFn({ method: "POST" }).validator((data) => ExtraireOpportuniteInput.parse(data)).handler(extraireOpportuniteServerFn_createServerFn_handler, async ({ data }) => {
	const { extraireOpportuniteIA } = await import("./opportunity.service-CkwRJfFL.mjs");
	return await extraireOpportuniteIA(data.text, data.url);
});
//#endregion
export { extraireOpportuniteServerFn_createServerFn_handler };
