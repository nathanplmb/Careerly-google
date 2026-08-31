import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Sparkles } from "../_libs/lucide-react.mjs";
import { M as cn } from "./router-AVT1AZP0.mjs";
import { i as niveauMatch } from "./match-run-DeALWp7w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MatchBadge-Gk6ifGnI.js
var import_jsx_runtime = require_jsx_runtime();
/** Badge compact réutilisable (tableau, kanban, fiche, daily brief). */
function MatchBadge({ match, obsolete, className }) {
	if (!match || typeof match.global !== "number") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("text-xs text-muted-foreground", className),
		children: "—"
	});
	const n = niveauMatch(match.global);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", n.badge, obsolete && "opacity-60", className),
		title: obsolete ? "Analyse potentiellement obsolète — profil ou offre modifié" : `${n.label}${match.confiance ? ` · confiance ${match.confiance}%` : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }),
			match.global,
			"% — ",
			n.label,
			obsolete ? " ⟳" : ""
		]
	});
}
//#endregion
export { MatchBadge as t };
