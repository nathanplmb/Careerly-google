import { i as TSS_SERVER_FUNCTION } from "./server-BocG72bt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-neQCt8ex.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as t };
