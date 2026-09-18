import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Et as Copy, mt as FileText, p as Trash2 } from "../_libs/lucide-react.mjs";
import { G as AppShell, Ht as Button, i as useCandidatures } from "./router-BFBvTUYb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-CQxBvMAR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/documents.tsx?tsr-split=component";
var CLE = "careerly.lettres";
function charger() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(CLE);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function DocumentsPage() {
	const { authLoading } = useCandidatures();
	const [lettres, setLettres] = (0, import_react.useState)([]);
	const [ouverte, setOuverte] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => setLettres(charger()), []);
	const persister = (l) => {
		setLettres(l);
		try {
			localStorage.setItem(CLE, JSON.stringify(l));
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: "Documents",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-panel flex h-fit flex-col gap-4 p-5 sm:p-6 shadow-md",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-sm font-bold uppercase tracking-wider text-foreground",
					children: "Générateur de documents"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
					children: "La génération par l'IA sera bientôt de retour dans une nouvelle version."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "flex flex-col gap-3.5",
				children: [lettres.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "glass-panel border-dashed p-8 text-center text-sm text-muted-foreground flex flex-col items-center justify-center",
					children: [/* @__PURE__ */ (void 0)(FileText, { className: "mx-auto mb-3 size-8 text-primary/80" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Aucun document pour l'instant." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 36
				}, this), lettres.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "glass-card-interactive p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left cursor-pointer",
							onClick: () => setOuverte(ouverte === l.id ? null : l.id),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "truncate text-sm font-bold text-foreground",
								children: l.titre
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 60,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-xs text-muted-foreground font-semibold mt-1",
								children: l.objet || new Date(l.creeLe).toLocaleDateString("fr-FR")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex shrink-0 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => {
									navigator.clipboard.writeText(l.contenu);
									toast.success("Copié.");
								},
								className: "h-8 w-8 rounded-lg hover:bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 72,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => persister(lettres.filter((x) => x.id !== l.id)),
								className: "h-8 w-8 rounded-lg hover:bg-destructive/15 text-muted-foreground hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 75,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 15
					}, this), ouverte === l.id && /* @__PURE__ */ (void 0)("div", {
						className: "mt-3.5 border-t border-white/10 pt-3.5",
						children: /* @__PURE__ */ (void 0)("p", {
							className: "whitespace-pre-wrap text-[13px] leading-relaxed text-muted-foreground font-medium",
							children: l.contenu
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 36
					}, this)]
				}, l.id, true, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 29
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 10
	}, this);
}
//#endregion
export { DocumentsPage as component };
