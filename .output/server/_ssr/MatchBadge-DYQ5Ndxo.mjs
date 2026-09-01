import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-DDzEUEFj.mjs";
import { v as Sparkles } from "../_libs/lucide-react.mjs";
import { i as niveauMatch } from "./match-run-CVvUCz6E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchBadge-DYQ5Ndxo.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/MatchBadge.tsx";
/** Badge compact réutilisable (tableau, kanban, fiche, daily brief). */
function MatchBadge({ match, obsolete, className }) {
	if (!match || typeof match.global !== "number") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("text-xs text-muted-foreground", className),
		children: "—"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 7
	}, this);
	const n = niveauMatch(match.global);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", n.badge, obsolete && "opacity-60", className),
		title: obsolete ? "Analyse potentiellement obsolète — profil ou offre modifié" : `${n.label}${match.confiance ? ` · confiance ${match.confiance}%` : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 7
			}, this),
			match.global,
			"% — ",
			n.label,
			obsolete ? " ⟳" : ""
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
//#endregion
export { MatchBadge as t };
