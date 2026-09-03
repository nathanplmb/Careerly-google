import { i as createServerFn } from "./server-DeZHsuy6.mjs";
import { t as createServerRpc } from "./createServerRpc-ZGFaToQZ.mjs";
import { t as DailyBriefInputZodSchema } from "./dailyBrief.schema-Dw9hTe13.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dailyBrief.server-fn-D38UvaXy.js
var genererDailyBriefServerFn_createServerFn_handler = createServerRpc({
	id: "275d6a691bee41845509fd010f5db584ebcec34ce4c9ba60e5806d9785a5a2b2",
	name: "genererDailyBriefServerFn",
	filename: "src/ai/daily-brief/dailyBrief.server-fn.ts"
}, (opts) => genererDailyBriefServerFn.__executeServer(opts));
var genererDailyBriefServerFn = createServerFn({ method: "POST" }).validator((data) => DailyBriefInputZodSchema.parse(data)).handler(genererDailyBriefServerFn_createServerFn_handler, async ({ data }) => {
	const { generateDailyBriefIA } = await import("./dailyBrief.service-Bo29i6g0.mjs").then((n) => n.t);
	return await generateDailyBriefIA(data);
});
//#endregion
export { genererDailyBriefServerFn_createServerFn_handler };
