import { r as createServerFn } from "./server-BjfJ2E7A.mjs";
import { r as normalizeCandidateContext, t as ChatRequestZodSchema } from "./chat.context-C99HGULU.mjs";
import { t as createServerRpc } from "./createServerRpc-CDaSMsxu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat.server-fn-CjxrN4YM.js
var executeChatTurnServerFn_createServerFn_handler = createServerRpc({
	id: "0860c3f6928439e19cf404851f7fd84cb3b48d8061e44bf1c3f88ac6dd586462",
	name: "executeChatTurnServerFn",
	filename: "src/ai/chat/chat.server-fn.ts"
}, (opts) => executeChatTurnServerFn.__executeServer(opts));
var executeChatTurnServerFn = createServerFn({ method: "POST" }).validator((data) => {
	if (data && typeof data === "object") {
		const obj = data;
		if ("candidateContext" in obj && obj.candidateContext !== void 0) return ChatRequestZodSchema.parse({
			...obj,
			candidateContext: normalizeCandidateContext(obj.candidateContext)
		});
	}
	return ChatRequestZodSchema.parse(data);
}).handler(executeChatTurnServerFn_createServerFn_handler, async ({ data }) => {
	const { executeChatTurn } = await import("./chat.service-DY68XGna.mjs");
	return await executeChatTurn(data);
});
//#endregion
export { executeChatTurnServerFn_createServerFn_handler };
