import { a as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { B as LoaderCircle, D as Plus, _ as Sparkles, it as ExternalLink, xt as CalendarClock } from "../_libs/lucide-react.mjs";
import { j as Button } from "./router-AVT1AZP0.mjs";
import { t as AppShell } from "./AppShell-BmQ9z9SM.mjs";
import { c as emptyCandidature, h as todayIso, i as STATUTS, o as addDays, u as formatDate } from "./candidatures-0RcN-a4_.mjs";
import { t as useCandidatures } from "./useCandidatures-CQvAyOlk.mjs";
import { t as useProfil } from "./useProfil-BCVXrGCS.mjs";
import { t as MatchBadge } from "./MatchBadge-Gk6ifGnI.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-BNx2Rq1Z.mjs";
import { t as ImportIaDialog } from "./ImportIaDialog-DziaOMPd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunites-Dx9F2Yy2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Pipeline",
		title: "Opportunités",
		subtitle: "Votre pipeline, colonne par colonne",
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		headerExtra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "secondary",
			onClick: () => setIaOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Analyser une offre (IA)"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => {
				setEditing(emptyCandidature());
				setOpen(true);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Ajouter une opportunité"]
		})] }),
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: [
			urgentes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card pop-in mb-5 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 inline-flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }), " Deadlines dans les 7 jours"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: urgentes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => ouvrir(c),
						className: "press rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium",
						children: [
							c.entreprise,
							" — ",
							formatDate(c.dateLimite)
						]
					}, c.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: colonnes.map(({ statut, liste }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "tone-card pop-in flex min-w-0 flex-col gap-3 p-4",
					style: {
						animationDelay: `${i * 50}ms`,
						"--tone": TONS_COLONNE[i % TONS_COLONNE.length]
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex min-w-0 items-center gap-2 text-sm font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 shrink-0 rounded-full",
									style: { backgroundColor: "var(--tone)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: statut
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tone-chip shrink-0 px-2 py-0.5 text-[11px] font-bold",
								children: liste.length
							})]
						}),
						liste.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-xs text-muted-foreground",
							children: "Aucune opportunité ici."
						}),
						liste.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-border/60 bg-card/60 p-3 transition-colors hover:bg-accent/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => ouvrir(c),
									className: "block w-full text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[13.5px] font-semibold",
										children: c.entreprise
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: c.poste
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2",
									children: [
										c.match && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, { match: c.match }),
										c.lieu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: c.lieu
										}),
										c.dateLimite && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: c.dateLimite < today ? "text-[11px] font-medium text-destructive" : c.dateLimite <= addDays(today, 7) ? "text-[11px] font-medium text-primary" : "text-[11px] text-muted-foreground",
											children: ["Limite ", formatDate(c.dateLimite)]
										}),
										c.lien && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: c.lien,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1 text-[11px] text-primary hover:underline",
											children: ["Offre ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-1.5",
									children: STATUTS.filter((s) => s !== statut).slice(0, 2).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => patch(c.id, { statut: s }),
										className: "rounded-full border border-border/70 px-2 py-1 text-[10.5px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground",
										children: ["→ ", s]
									}, s))
								})
							]
						}, c.id))
					]
				}, statut))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportIaDialog, {
				open: iaOpen,
				onOpenChange: setIaOpen,
				onResult: (c) => {
					setEditing(c);
					setOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidatureSheet, {
				open,
				onOpenChange: setOpen,
				value: editing,
				profil,
				onSave: async (c) => {
					await save(c);
					setOpen(false);
				}
			})
		]
	});
}
//#endregion
export { OpportunitesPage as component };
