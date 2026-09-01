import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatutBadge-B9ErESh7.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/StatutBadge.tsx";
var STYLES = {
	"Je vais postuler": "bg-muted text-muted-foreground border-border",
	"J'ai postulé": "bg-accent text-accent-foreground border-primary/20",
	"J'ai relancé": "bg-primary/15 text-primary border-primary/30",
	"J'ai un entretien": "bg-success/15 text-success border-success/30",
	"J'ai reçu une réponse négative": "bg-destructive/10 text-destructive border-destructive/25",
	"Je n'ai pas reçu de réponse": "bg-warning/15 text-warning border-warning/30"
};
function StatutBadge({ statut }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[statut]}`,
		children: statut
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
//#endregion
export { StatutBadge as t };
