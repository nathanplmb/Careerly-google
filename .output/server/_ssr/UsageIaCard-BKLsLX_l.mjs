import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { V as LoaderCircle, nt as Gauge } from "../_libs/lucide-react.mjs";
import { r as createServerFn } from "./server-ChZ9lotr.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DzSAAPdn.mjs";
import { t as createSsrRpc } from "./profil-cloud-Dh3oB5oU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/UsageIaCard-BKLsLX_l.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var usageIaDuJour = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("378b207fa4fdee797d916e49b30889c2a21ee687fbe35cec99abc178bc8b5528"));
var _jsxFileName = "/app/applet/src/components/UsageIaCard.tsx";
var LIBELLES = {
	brief: "Daily Brief",
	match: "Match IA",
	offre: "Analyse d'offre",
	cv: "Analyse de CV",
	tri: "Assistant IA",
	redaction: "Rédaction IA",
	relance: "Relance IA"
};
function Barre({ ligne }) {
	const pct = ligne.limite > 0 ? Math.min(100, ligne.utilise / ligne.limite * 100) : 0;
	const reste = Math.max(0, ligne.limite - ligne.utilise);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: LIBELLES[ligne.outil] ?? ligne.outil }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 22,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: reste === 0 ? "text-destructive" : "text-muted-foreground",
			children: [
				reste,
				" restant",
				reste > 1 ? "s" : "",
				" / ",
				ligne.limite
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `h-full rounded-full ${pct >= 100 ? "bg-destructive" : "bg-primary"}`,
			style: { width: `${pct}%` }
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 30,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 29,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
function UsageIaCard({ connecte }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["usage-ia"],
		queryFn: () => usageIaDuJour(),
		enabled: connecte,
		staleTime: 6e4
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card pop-in p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gauge, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this), " Utilisation IA du jour"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 49,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Les quotas se réinitialisent chaque jour. Ils protègent le service contre les usages abusifs."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			!connecte ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Connectez-vous pour voir vos quotas IA."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 9
			}, this) : isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "mt-4 size-4 animate-spin opacity-70" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 9
			}, this) : error || !data ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Usage indisponible pour le moment."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 space-y-3",
				children: [data.lignes.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Barre, { ligne: l }, l.outil, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 13
				}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-border/60 pt-3 text-xs text-muted-foreground",
					children: [
						"Total : ",
						data.total_utilise,
						" / ",
						data.total_limite,
						" analyses aujourd'hui · plan ",
						data.plan
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
//#endregion
export { UsageIaCard as t };
