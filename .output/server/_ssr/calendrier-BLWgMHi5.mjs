import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { Gt as cn, Ut as Button, p as AppShell, rt as formatDate, zt as todayIso } from "./profil-cloud-BuRN1ITj.mjs";
import { It as ChevronRight, Lt as ChevronLeft, Ut as CalendarClock, W as LoaderCircle } from "../_libs/lucide-react.mjs";
import { b as CandidatureSheet, i as useCandidatures, o as useProfil } from "./router-CIiD33-r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendrier-BLWgMHi5.js
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
function extraireDateIso(raw) {
	if (!raw || typeof raw !== "string") return null;
	const match = raw.trim().match(/^(\d{4}-\d{2}-\d{2})/);
	if (match && match[1]) return match[1];
	return null;
}
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
			const deadline = extraireDateIso(c.applicationDeadline || c.dateLimite);
			if (deadline) {
				const nomPoste = c.poste || c.title || c.entreprise || "Candidature";
				list.push({
					date: deadline,
					type: "Date limite",
					titre: `Deadline — ${nomPoste}`,
					candidature: c
				});
			}
			const dateRelance = extraireDateIso(c.dateRelance || c.followUpDate);
			if (dateRelance && (c.statut === "Candidature envoyée" || c.statut === "Relancée")) list.push({
				date: dateRelance,
				type: "Relance",
				candidature: c
			});
			const dateEntretien = extraireDateIso(c.interviewDate || c.dateDernierContact || c.lastContactDate);
			if ((c.statut === "Entretien" || c.statut === "Deuxième entretien") && dateEntretien) list.push({
				date: dateEntretien,
				type: "Entretien",
				candidature: c
			});
			const dateEnvoi = extraireDateIso(c.dateEnvoi || c.appliedAt);
			if (dateEnvoi) list.push({
				date: dateEnvoi,
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
		title: "Calendrier",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 122,
			columnNumber: 62
		}, this) : null,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-5 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-panel p-5 sm:p-6 shadow-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
						className: "mb-5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-sm font-bold uppercase tracking-wider text-foreground",
							children: moisLabel(annee, mois)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 p-1 backdrop-blur-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => changerMois(-1),
									className: "h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronLeft, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 131,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										setAnnee(now.getFullYear());
										setMois(now.getMonth());
									},
									className: "h-8 px-3 text-xs font-semibold rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10",
									children: "Aujourd'hui"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => changerMois(1),
									className: "h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-muted-foreground",
						children: JOURS.map((j, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "py-1",
							children: j
						}, i, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 34
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2 grid grid-cols-7 gap-1.5",
						children: cases.map((jour, i) => {
							if (jour === null) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, `v${i}`, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 39
							}, this);
							const d = iso(annee, mois, jour);
							const evts = parJour.get(d) ?? [];
							const premierEvt = evts[0];
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: cn("min-w-0 overflow-hidden rounded-xl border p-1.5 text-left min-h-18 transition-all backdrop-blur-md", d === today ? "border-primary/60 bg-primary/10 shadow-[0_0_12px_rgba(216,26,69,0.2)]" : "border-white/8 bg-white/4 dark:bg-white/4 hover:border-white/20 hover:bg-white/8"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										if (!premierEvt) return;
										setEditing(premierEvt.candidature);
										setOpen(true);
									},
									className: "flex aspect-square w-full flex-col items-center justify-center gap-1 sm:hidden cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("text-[11px] leading-none font-bold", d === today ? "text-primary" : "text-muted-foreground"),
										children: jour
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 164,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-0.5",
										children: evts.slice(0, 3).map((e, k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: cn("size-1.5 rounded-full border", COULEURS[e.type]) }, k, false, {
											fileName: _jsxFileName,
											lineNumber: 168,
											columnNumber: 55
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "hidden sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: cn("text-[11px] font-bold px-1", d === today ? "text-primary font-extrabold" : "text-muted-foreground"),
										children: jour
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 flex flex-col gap-1",
										children: [evts.slice(0, 2).map((e, k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => {
												setEditing(e.candidature);
												setOpen(true);
											},
											className: cn("truncate rounded-lg border px-2 py-0.5 text-[9px] font-bold text-left w-full backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer shadow-xs", COULEURS[e.type]),
											title: e.titre || `${e.type} — ${e.candidature.entreprise}`,
											children: e.titre || e.candidature.entreprise || e.type
										}, k, false, {
											fileName: _jsxFileName,
											lineNumber: 178,
											columnNumber: 55
										}, this)), evts.length > 2 && /* @__PURE__ */ (void 0)("span", {
											className: "text-[9px] text-muted-foreground font-semibold px-1",
											children: [
												"+",
												evts.length - 2,
												" de plus"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 184,
											columnNumber: 43
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 177,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 19
								}, this)]
							}, d, true, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "glass-panel p-5 sm:p-6 shadow-md flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mb-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarClock, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 13
						}, this), " À venir"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 11
					}, this),
					aVenir.length === 0 && /* @__PURE__ */ (void 0)("div", {
						className: "flex-1 flex flex-col items-center justify-center py-12 text-center text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (void 0)(CalendarClock, { className: "size-8 text-muted-foreground/40 mb-2" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", { children: "Aucune échéance à venir." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 198,
						columnNumber: 35
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "flex flex-col gap-2.5",
						children: aVenir.map((e, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => {
								setEditing(e.candidature);
								setOpen(true);
							},
							className: "glass-card-interactive flex w-full items-center gap-3 px-3.5 py-3 text-left cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: cn("rounded-lg border px-2.5 py-1 text-[10.5px] font-semibold backdrop-blur-md", COULEURS[e.type]),
									children: e.type
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block truncate text-[13.5px] font-semibold text-foreground",
										children: e.titre || e.candidature.entreprise
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block truncate text-xs text-muted-foreground mt-0.5",
										children: e.titre ? e.candidature.entreprise || e.candidature.poste : e.candidature.poste
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "shrink-0 text-xs font-mono text-muted-foreground",
									children: formatDate(e.date)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 17
						}, this) }, i, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 35
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 194,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 123,
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
			lineNumber: 228,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 122,
		columnNumber: 10
	}, this);
}
//#endregion
export { CalendrierPage as component };
