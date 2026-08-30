import { a as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-BZ6BkQmi.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { n as Route$1 } from "./_ssr/router-C_66Z-ZF.mjs";
import { t as Button } from "./_ssr/button-DDzEUEFj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-3mngTFkz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/[.]lovable.oauth.consent.tsx?tsr-split=component";
function Consent() {
	const details = Route$1.useLoaderData();
	const { authorization_id } = Route$1.useSearch();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const clientName = details?.client?.name ?? "cette application";
	async function decide(approve) {
		setBusy(true);
		setError(null);
		const { data, error } = approve ? await supabase.auth.oauth.approveAuthorization(authorization_id) : await supabase.auth.oauth.denyAuthorization(authorization_id);
		if (error) {
			setBusy(false);
			setError(error.message);
			return;
		}
		const target = data?.redirect_url ?? data?.redirect_to;
		if (!target) {
			setBusy(false);
			setError("Aucune redirection renvoyée par le serveur d'autorisation.");
			return;
		}
		window.location.href = target;
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "aurora-bg flex min-h-screen items-center justify-center px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card w-full max-w-md p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold",
					children: [
						"Connecter ",
						clientName,
						" à Careerly"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [clientName, " pourra lire et modifier vos candidatures, vos contacts et votre profil, en votre nom. Vous pouvez révoquer cet accès à tout moment."]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 9
				}, this),
				error && /* @__PURE__ */ (void 0)("p", {
					role: "alert",
					className: "mt-4 text-sm text-destructive",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "flex-1",
						disabled: busy,
						onClick: () => decide(true),
						children: "Autoriser"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						className: "flex-1",
						disabled: busy,
						onClick: () => decide(false),
						children: "Refuser"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 43,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 10
	}, this);
}
//#endregion
export { Consent as component };
