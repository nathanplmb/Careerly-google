import { r as createServerFn } from "./server-1xgczoSm.mjs";
import { t as ClassifyContactsBatchInputZodSchema } from "./contactImport.schema-CabBof2c.mjs";
import { t as createServerRpc } from "./createServerRpc-yJObEWzd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contactImport.server-fn-BXG1LsLV.js
var classifyContactsBatchServerFn_createServerFn_handler = createServerRpc({
	id: "5dce3a03db727f995b2906f56c8fff4642a6524d3c785429cbac717e581b9048",
	name: "classifyContactsBatchServerFn",
	filename: "src/ai/contact-import/contactImport.server-fn.ts"
}, (opts) => classifyContactsBatchServerFn.__executeServer(opts));
var classifyContactsBatchServerFn = createServerFn({ method: "POST" }).validator((data) => ClassifyContactsBatchInputZodSchema.parse(data)).handler(classifyContactsBatchServerFn_createServerFn_handler, async ({ data }) => {
	const { classifyContactsBatchIA } = await import("./contactImport.service-CbZeCa48.mjs");
	return await classifyContactsBatchIA(data);
});
//#endregion
export { classifyContactsBatchServerFn_createServerFn_handler };
