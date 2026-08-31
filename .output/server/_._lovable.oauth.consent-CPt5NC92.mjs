import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-CPt5NC92.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
	className: "flex min-h-screen items-center justify-center p-6 text-center",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted-foreground",
		children: [
			"Impossible de charger cette demande d'autorisation :",
			" ",
			String(error?.message ?? error)
		]
	})
});
//#endregion
export { SplitErrorComponent as errorComponent };
