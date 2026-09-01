import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-DDzEUEFj.mjs";
import { Ot as ChevronRight, Pt as CalendarClock, V as LoaderCircle, kt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { c as formatDate, m as todayIso } from "./candidatures-ck14d0Ow.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-BqqfhG9v.mjs";
import { t as useProfil } from "./useProfil-Batqat5N.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendrier-Bvh77_hS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/calendrier.tsx?tsr-split=component";
var COULEURS = {
	"Date limite": "bg-destructive/15 text-destructive border-destructive/30",
	Relance: "bg-warning/15 text-warning border-warning/30",
	Entretien: "bg-success/15 text-success border-success/30",
	Envoi: "bg-primary/15 text-primary border-primary/30"
};
var JOURS = [
	"L",
	"M",
	"M",
	"J",
	"V",
	"S",
	"D"
];
function moisLabel(annee, mois) {
	return new Date(annee, mois, 1).toLocaleDateString("fr-FR", {
		month: "long",
		year: "numeric"
	});
}
function iso(annee, mois, jour) {
	return `${annee}-${String(mois + 1).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;
}
function CalendrierPage() {
	const { user, authLoading, items, save } = useCandidatures();
	const profil = useProfil(user);
	const today = todayIso();
	const now = /* @__PURE__ */ new Date();
	const [annee, setAnnee] = (0, import_react.useState)(now.getFullYear());
	const [mois, setMois] = (0, import_react.useState)(now.getMonth());
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const evenements = (0, import_react.useMemo)(() => {
		const list = [];
		for (const c of items) {
			if (c.dateLimite && c.statut === "Je vais postuler") list.push({
				date: c.dateLimite,
				type: "Date limite",
				candidature: c
			});
			if (c.dateRelance && (c.statut === "J'ai postulé" || c.statut === "J'ai relancé")) list.push({
				date: c.dateRelance,
				type: "Relance",
				candidature: c
			});
			if (c.statut === "J'ai un entretien" && c.dateDernierContact) list.push({
				date: c.dateDernierContact,
				type: "Entretien",
				candidature: c
			});
			if (c.dateEnvoi) list.push({
				date: c.dateEnvoi,
				type: "Envoi",
				candidature: c
			});
		}
		return list.sort((a, b) => a.date.localeCompare(b.date));
	}, [items]);
	const parJour = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const e of evenements) {
			if (!map.has(e.date)) map.set(e.date, []);
			map.get(e.date).push(e);
		}
		return map;
	}, [evenements]);
	const aVenir = (0, import_react.useMemo)(() => evenements.filter((e) => e.date >= today && e.type !== "Envoi").slice(0, 12), [evenements, today]);
	const decalage = (new Date(annee, mois, 1).getDay() + 6) % 7;
	const nbJours = new Date(annee, mois + 1, 0).getDate();
	const cases = [...Array.from({ length: decalage }, () => null), ...Array.from({ length: nbJours }, (_, i) => i + 1)];
	const changerMois = (delta) => {
		const d = new Date(annee, mois + delta, 1);
		setAnnee(d.getFullYear());
		setMois(d.getMonth());
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Planning",
		title: "Calendrier",
		subtitle: "Deadlines, relances et entretiens",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 126
		}, this) : null,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-card pop-in p-3 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-sm font-semibold capitalize",
							children: moisLabel(annee, mois)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => changerMois(-1),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronLeft, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 102,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 101,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										setAnnee(now.getFullYear());
										setMois(now.getMonth());
									},
									children: "Aujourd'hui"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 104,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => changerMois(1),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 111,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 110,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground",
						children: JOURS.map((j, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: j }, i, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 34
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-1 grid grid-cols-7 gap-0.5 sm:gap-1",
						children: cases.map((jour, i) => {
							if (jour === null) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, `v${i}`, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 39
							}, this);
							const d = iso(annee, mois, jour);
							const evts = parJour.get(d) ?? [];
							const premierEvt = evts[0];
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: cn("min-w-0 overflow-hidden rounded-lg border border-border/50 p-0.5 text-left sm:rounded-xl sm:p-1 sm:min-h-16", d === today && "border-primary/60 bg-primary/10"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										if (!premierEvt) return;
										setEditing(premierEvt.candidature);
										setOpen(true);
									},
									className: "flex aspect-square w-full flex-col items-center justify-center gap-1 sm:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] leading-none text-muted-foreground",
										children: jour
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-0.5",
										children: evts.slice(0, 3).map((e, k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-1.5 rounded-full border", COULEURS[e.type]) }, k, false, {
											fileName: _jsxFileName,
											lineNumber: 137,
											columnNumber: 55
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "hidden sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[11px] text-muted-foreground",
										children: jour
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-0.5 flex flex-col gap-0.5",
										children: [evts.slice(0, 2).map((e, k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => {
												setEditing(e.candidature);
												setOpen(true);
											},
											className: cn("truncate rounded-md border px-1 py-0.5 text-[9.5px] font-medium", COULEURS[e.type]),
											title: `${e.type} — ${e.candidature.entreprise}`,
											children: e.candidature.entreprise || e.type
										}, k, false, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 55
										}, this)), evts.length > 2 && /* @__PURE__ */ (void 0)("span", {
											className: "text-[9.5px] text-muted-foreground",
											children: ["+", evts.length - 2]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 153,
											columnNumber: 43
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 146,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 19
								}, this)]
							}, d, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 95,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-card pop-in p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mb-3 inline-flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarClock, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 13
						}, this), " À venir"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, this),
					aVenir.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "Aucune échéance à venir."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 35
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "flex flex-col gap-2",
						children: aVenir.map((e, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => {
								setEditing(e.candidature);
								setOpen(true);
							},
							className: "flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-2.5 text-left transition-colors hover:bg-accent/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: cn("rounded-lg border px-2 py-1 text-[10.5px] font-semibold", COULEURS[e.type]),
									children: e.type
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block truncate text-[13.5px] font-medium",
										children: e.candidature.entreprise
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 180,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block truncate text-xs text-muted-foreground",
										children: e.candidature.poste
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 183,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "shrink-0 text-xs text-muted-foreground",
									children: formatDate(e.date)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 17
						}, this) }, i, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 35
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 163,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 94,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CandidatureSheet, {
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
			lineNumber: 196,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 93,
		columnNumber: 10
	}, this);
}
//#endregion
export { CalendrierPage as component };
