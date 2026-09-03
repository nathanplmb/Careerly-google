import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { _ as todayIso, d as formatDate } from "./candidatures-CZEj3mXa.mjs";
import { B as LoaderCircle, Dt as CalendarClock, bt as ChevronRight, xt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./useSession-B4uaWKjb.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-DGd6aJB4.mjs";
import { t as useCandidatures } from "./useCandidatures-ChiYtpVv.mjs";
import { t as useProfil } from "./useProfil-7Z3e6ezo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendrier-JXWjAkY1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Planning",
		title: "Calendrier",
		subtitle: "Deadlines, relances et entretiens",
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in p-3 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold capitalize",
							children: moisLabel(annee, mois)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => changerMois(-1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										setAnnee(now.getFullYear());
										setMois(now.getMonth());
									},
									children: "Aujourd'hui"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => changerMois(1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground",
						children: JOURS.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: j }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 grid grid-cols-7 gap-0.5 sm:gap-1",
						children: cases.map((jour, i) => {
							if (jour === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `v${i}`);
							const d = iso(annee, mois, jour);
							const evts = parJour.get(d) ?? [];
							const premierEvt = evts[0];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("min-w-0 overflow-hidden rounded-lg border border-border/50 p-0.5 text-left sm:rounded-xl sm:p-1 sm:min-h-16", d === today && "border-primary/60 bg-primary/10"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										if (!premierEvt) return;
										setEditing(premierEvt.candidature);
										setOpen(true);
									},
									className: "flex aspect-square w-full flex-col items-center justify-center gap-1 sm:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] leading-none text-muted-foreground",
										children: jour
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex items-center gap-0.5",
										children: evts.slice(0, 3).map((e, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full border", COULEURS[e.type]) }, k))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden sm:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: jour
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 flex flex-col gap-0.5",
										children: [evts.slice(0, 2).map((e, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setEditing(e.candidature);
												setOpen(true);
											},
											className: cn("truncate rounded-md border px-1 py-0.5 text-[9.5px] font-medium", COULEURS[e.type]),
											title: e.titre || `${e.type} — ${e.candidature.entreprise}`,
											children: e.titre || e.candidature.entreprise || e.type
										}, k)), evts.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9.5px] text-muted-foreground",
											children: ["+", evts.length - 2]
										})]
									})]
								})]
							}, d);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-card pop-in p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-3 inline-flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }), " À venir"]
					}),
					aVenir.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "Aucune échéance à venir."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: aVenir.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setEditing(e.candidature);
								setOpen(true);
							},
							className: "flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-2.5 text-left transition-colors hover:bg-accent/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-lg border px-2 py-1 text-[10.5px] font-semibold", COULEURS[e.type]),
									children: e.type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-[13.5px] font-medium",
										children: e.titre || e.candidature.entreprise
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-xs text-muted-foreground",
										children: e.titre ? e.candidature.entreprise || e.candidature.poste : e.candidature.poste
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-xs text-muted-foreground",
									children: formatDate(e.date)
								})
							]
						}) }, i))
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidatureSheet, {
			open,
			onOpenChange: setOpen,
			value: editing,
			profil,
			onSave: async (c) => {
				await save(c);
				setOpen(false);
			}
		})]
	});
}
//#endregion
export { CalendrierPage as component };
