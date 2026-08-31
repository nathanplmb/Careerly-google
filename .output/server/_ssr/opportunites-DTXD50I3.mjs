import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { V as LoaderCircle, ft as ExternalLink, jt as CalendarClock, k as Plus, v as Sparkles } from "../_libs/lucide-react.mjs";
import { B as formatDate, I as addDays, K as todayIso, P as STATUTS, R as emptyCandidature, dt as Button } from "./router-Dma1Qf70.mjs";
import { t as AppShell } from "./AppShell-SgP4smEW.mjs";
import { t as useProfil } from "./useProfil-CGOz7dcn.mjs";
import { t as useCandidatures } from "./useCandidatures-CSkPDSDT.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-Bp5wFfkA.mjs";
import { t as MatchBadge } from "./MatchBadge-4nih43Sz.mjs";
import { t as ImportIaDialog } from "./ImportIaDialog-DocvtAav.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunites-DTXD50I3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/opportunites.tsx?tsr-split=component";
var TONS_COLONNE = [
	"var(--primary)",
	"var(--lilac)",
	"var(--warning)",
	"var(--success)",
	"var(--destructive)",
	"var(--pink)"
];
function OpportunitesPage() {
	const { user, authLoading, items, patch, save } = useCandidatures();
	const profil = useProfil(user);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [iaOpen, setIaOpen] = (0, import_react.useState)(false);
	const today = todayIso();
	const colonnes = (0, import_react.useMemo)(() => STATUTS.map((s) => ({
		statut: s,
		liste: items.filter((c) => c.statut === s)
	})), [items]);
	const urgentes = (0, import_react.useMemo)(() => items.filter((c) => c.dateLimite && c.dateLimite >= today && c.dateLimite <= addDays(today, 7)).sort((a, b) => a.dateLimite.localeCompare(b.dateLimite)), [items, today]);
	const ouvrir = (c) => {
		setEditing(c);
		setOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Pipeline",
		title: "Opportunités",
		subtitle: "Votre pipeline, colonne par colonne",
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "secondary",
			onClick: () => setIaOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 13
			}, this), " Analyser une offre (IA)"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => {
				setEditing(emptyCandidature());
				setOpen(true);
			},
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 13
			}, this), " Ajouter une opportunité"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 19
		}, this),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 37
		}, this) : null,
		children: [
			urgentes.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card pop-in mb-5 p-5",
				children: [/* @__PURE__ */ (void 0)("p", {
					className: "mb-3 inline-flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (void 0)(CalendarClock, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 13
					}, this), " Deadlines dans les 7 jours"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-wrap gap-2",
					children: urgentes.map((c) => /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => ouvrir(c),
						className: "press rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium",
						children: [
							c.entreprise,
							" — ",
							formatDate(c.dateLimite)
						]
					}, c.id, true, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 32
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 31
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: colonnes.map(({ statut, liste }, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "tone-card pop-in flex min-w-0 flex-col gap-3 p-4",
					style: {
						animationDelay: `${i * 50}ms`,
						"--tone": TONS_COLONNE[i % TONS_COLONNE.length]
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "flex min-w-0 items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "size-2 shrink-0 rounded-full",
									style: { backgroundColor: "var(--tone)" }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 70,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "truncate",
									children: statut
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 73,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "tone-chip shrink-0 px-2 py-0.5 text-[11px] font-bold",
								children: liste.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 13
						}, this),
						liste.length === 0 && /* @__PURE__ */ (void 0)("p", {
							className: "py-6 text-center text-xs text-muted-foreground",
							children: "Aucune opportunité ici."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 36
						}, this),
						liste.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "rounded-2xl border border-border/60 bg-card/60 p-3 transition-colors hover:bg-accent/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => ouvrir(c),
									className: "block w-full text-left",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "truncate text-[13.5px] font-semibold",
										children: c.entreprise
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 86,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: c.poste
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 89,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2",
									children: [
										c.match && /* @__PURE__ */ (void 0)(MatchBadge, { match: c.match }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 94,
											columnNumber: 31
										}, this),
										c.lieu && /* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] text-muted-foreground",
											children: c.lieu
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 95,
											columnNumber: 30
										}, this),
										c.dateLimite && /* @__PURE__ */ (void 0)("span", {
											className: c.dateLimite < today ? "text-[11px] font-medium text-destructive" : c.dateLimite <= addDays(today, 7) ? "text-[11px] font-medium text-primary" : "text-[11px] text-muted-foreground",
											children: ["Limite ", formatDate(c.dateLimite)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 98,
											columnNumber: 36
										}, this),
										c.lien && /* @__PURE__ */ (void 0)("a", {
											href: c.lien,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1 text-[11px] text-primary hover:underline",
											children: ["Offre ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 102,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 101,
											columnNumber: 30
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex flex-wrap gap-1.5",
									children: STATUTS.filter((s) => s !== statut).slice(0, 2).map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => patch(c.id, { statut: s }),
										className: "rounded-full border border-border/70 px-2 py-1 text-[10.5px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
										children: ["→ ", s]
									}, s, true, {
										fileName: _jsxFileName,
										lineNumber: 106,
										columnNumber: 85
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 17
								}, this)
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 84,
							columnNumber: 29
						}, this))
					]
				}, statut, true, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 16
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImportIaDialog, {
				open: iaOpen,
				onOpenChange: setIaOpen,
				onResult: (c) => {
					setEditing(c);
					setOpen(true);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CandidatureSheet, {
				open,
				onOpenChange: setOpen,
				value: editing,
				profil,
				onSave: async (c) => {
					await save(c);
					setOpen(false);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 10
	}, this);
}
//#endregion
export { OpportunitesPage as component };
