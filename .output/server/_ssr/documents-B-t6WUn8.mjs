import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { lt as FileText, m as Trash2, xt as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as Button, l as AppShell, u as useSession } from "./router-Chlelb_S2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-B-t6WUn8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/documents.tsx?tsr-split=component";
function getDocumentsStorageKey(userId) {
	return userId ? `nacora_${userId}_lettres_v1` : "nacora_guest_lettres_v1";
}
function charger(userId) {
	if (typeof window === "undefined") return [];
	try {
		const key = getDocumentsStorageKey(userId);
		let raw = localStorage.getItem(key);
		if (!raw && userId) {
			const oldRaw = localStorage.getItem("careerly.lettres");
			if (oldRaw) {
				localStorage.setItem(key, oldRaw);
				localStorage.removeItem("careerly.lettres");
				raw = oldRaw;
			}
		}
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function DocumentsPage() {
	const { user } = useSession();
	const userId = user?.id;
	const [lettres, setLettres] = (0, import_react.useState)([]);
	const [ouverte, setOuverte] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setLettres(charger(userId));
	}, [userId]);
	const persister = (l) => {
		setLettres(l);
		try {
			const key = getDocumentsStorageKey(userId);
			localStorage.setItem(key, JSON.stringify(l));
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Documents",
		title: "Documents",
		subtitle: `${lettres.length} document(s) enregistré(s)`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-card pop-in flex h-fit flex-col gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-sm font-semibold",
					children: "Générateur de documents"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground",
					children: "La génération par l'IA sera bientôt de retour dans une nouvelle version."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "flex flex-col gap-3",
				children: [lettres.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (void 0)(FileText, { className: "mx-auto mb-3 size-6 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 15
					}, this), "Aucun document pour l'instant."]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 36
				}, this), lettres.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "glass-card pop-in p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left",
							onClick: () => setOuverte(ouverte === l.id ? null : l.id),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "truncate text-[14px] font-semibold",
								children: l.titre
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: l.objet || new Date(l.creeLe).toLocaleDateString("fr-FR")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 73,
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
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 86,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => persister(lettres.filter((x) => x.id !== l.id)),
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4 text-destructive" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 15
					}, this), ouverte === l.id && /* @__PURE__ */ (void 0)("div", {
						className: "mt-3 border-t border-border/60 pt-3",
						children: /* @__PURE__ */ (void 0)("p", {
							className: "whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground",
							children: l.contenu
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 36
					}, this)]
				}, l.id, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 29
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 57,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 56,
		columnNumber: 10
	}, this);
}
//#endregion
export { DocumentsPage as component };
