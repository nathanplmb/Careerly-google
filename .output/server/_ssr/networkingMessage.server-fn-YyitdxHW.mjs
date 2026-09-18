import { r as createServerFn } from "./server-gVjOTrxD.mjs";
import { t as GenerateNetworkingMessageInputZodSchema } from "./networkingMessage.schema-Bl0tYGQq.mjs";
import { t as createServerRpc } from "./createServerRpc-DboiyhIu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/networkingMessage.server-fn-YyitdxHW.js
var generateNetworkingMessageServerFn_createServerFn_handler = createServerRpc({
	id: "530dd75f0d23c73a9480aba6977b83b913b731251471b283785c5924115c2146",
	name: "generateNetworkingMessageServerFn",
	filename: "src/ai/networking-message/networkingMessage.server-fn.ts"
}, (opts) => generateNetworkingMessageServerFn.__executeServer(opts));
var generateNetworkingMessageServerFn = createServerFn({ method: "POST" }).validator((data) => GenerateNetworkingMessageInputZodSchema.parse(data)).handler(generateNetworkingMessageServerFn_createServerFn_handler, async ({ data }) => {
	const { generateNetworkingMessageIA } = await import("./networkingMessage.service-CqwDadlH.mjs");
	return await generateNetworkingMessageIA(data);
});
//#endregion
export { generateNetworkingMessageServerFn_createServerFn_handler };
