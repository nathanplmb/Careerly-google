import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-Cpkpi9xW.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/[.]lovable.oauth.consent.tsx?tsr-split=errorComponent";
var SplitErrorComponent = ({ error }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
	className: "flex min-h-screen items-center justify-center p-6 text-center",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "text-sm text-muted-foreground",
		children: [
			"Impossible de charger cette demande d'autorisation :",
			" ",
			String(error?.message ?? error)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 4,
		columnNumber: 7
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 3,
	columnNumber: 7
}, void 0);
//#endregion
export { SplitErrorComponent as errorComponent };
