import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { ft as Copy, p as Trash2, tt as FileText } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./useSession-B4uaWKjb.mjs";
import { t as useCandidatures } from "./useCandidatures-ChiYtpVv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-ocxBAu2U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Documents",
		title: "Documents",
		subtitle: `${lettres.length} document(s) enregistré(s)`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in flex h-fit flex-col gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Générateur de documents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "La génération par l'IA sera bientôt de retour dans une nouvelle version."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [lettres.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "glass-card p-8 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto mb-3 size-6 text-primary" }), "Aucun document pour l'instant."]
				}), lettres.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "glass-card pop-in p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-w-0 flex-1 text-left",
							onClick: () => setOuverte(ouverte === l.id ? null : l.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate text-[14px] font-semibold",
								children: l.titre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: l.objet || new Date(l.creeLe).toLocaleDateString("fr-FR")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => {
									navigator.clipboard.writeText(l.contenu);
									toast.success("Copié.");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => persister(lettres.filter((x) => x.id !== l.id)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
							})]
						})]
					}), ouverte === l.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 border-t border-border/60 pt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap text-[13.5px] leading-relaxed text-muted-foreground",
							children: l.contenu
						})
					})]
				}, l.id))]
			})]
		})
	});
}
//#endregion
export { DocumentsPage as component };
