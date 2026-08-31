import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { V as LoaderCircle, nt as Gauge } from "../_libs/lucide-react.mjs";
import { r as createServerFn } from "./server-p5qu-I7z.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-aShfmQCg.mjs";
import { t as createSsrRpc } from "./profil-cloud-CHHpOSQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/UsageIaCard-DS_grngF.js
var import_jsx_runtime = require_jsx_runtime();
var usageIaDuJour = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("378b207fa4fdee797d916e49b30889c2a21ee687fbe35cec99abc178bc8b5528"));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: LIBELLES[ligne.outil] ?? ligne.outil }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: reste === 0 ? "text-destructive" : "text-muted-foreground",
			children: [
				reste,
				" restant",
				reste > 1 ? "s" : "",
				" / ",
				ligne.limite
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 h-1.5 overflow-hidden rounded-full bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full ${pct >= 100 ? "bg-destructive" : "bg-primary"}`,
			style: { width: `${pct}%` }
		})
	})] });
}
function UsageIaCard({ connecte }) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["usage-ia"],
		queryFn: () => usageIaDuJour(),
		enabled: connecte,
		staleTime: 6e4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass-card pop-in p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4" }), " Utilisation IA du jour"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Les quotas se réinitialisent chaque jour. Ils protègent le service contre les usages abusifs."
			}),
			!connecte ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Connectez-vous pour voir vos quotas IA."
			}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-4 size-4 animate-spin opacity-70" }) : error || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Usage indisponible pour le moment."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-3",
				children: [data.lignes.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barre, { ligne: l }, l.outil)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border/60 pt-3 text-xs text-muted-foreground",
					children: [
						"Total : ",
						data.total_utilise,
						" / ",
						data.total_limite,
						" analyses aujourd'hui · plan ",
						data.plan
					]
				})]
			})
		]
	});
}
//#endregion
export { UsageIaCard as t };
