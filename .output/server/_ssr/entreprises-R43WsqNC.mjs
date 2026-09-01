import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as Phone, It as Building2, L as Mail, Lt as Briefcase, Ot as ChevronRight, S as Search, U as Linkedin, V as LoaderCircle, a as Users } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { s as Input } from "./dialog-B3Jp4UDR.mjs";
import { r as STATUTS } from "./candidatures-ck14d0Ow.mjs";
import { t as CenterModal } from "./modal-AsYCopxE.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-BqqfhG9v.mjs";
import { t as useProfil } from "./useProfil-Batqat5N.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { t as MatchBadge } from "./MatchBadge-DYQ5Ndxo.mjs";
import { c as loadContactsLocal } from "./contacts--GCSJljy.mjs";
import { t as StatutBadge } from "./StatutBadge-B9ErESh7.mjs";
import { n as fetchContacts } from "./contacts-cloud--x0UJSDd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entreprises-R43WsqNC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/entreprises.tsx?tsr-split=component";
function EntreprisesPage() {
	const { user, authLoading, items, save } = useCandidatures();
	const profil = useProfil(user);
	const [contacts, setContacts] = (0, import_react.useState)([]);
	const [recherche, setRecherche] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [detail, setDetail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user?.id) {
			setContacts(loadContactsLocal());
			return;
		}
		fetchContacts().then(setContacts).catch(() => setContacts(loadContactsLocal()));
	}, [user?.id]);
	const groupes = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		const cle = (n) => n.trim().toLowerCase() || "sans-nom";
		for (const c of items) {
			const k = cle(c.entreprise);
			if (!map.has(k)) map.set(k, {
				nom: c.entreprise || "Entreprise non renseignée",
				candidatures: [],
				contacts: []
			});
			map.get(k).candidatures.push(c);
		}
		for (const ct of contacts) {
			const k = cle(ct.entreprise);
			if (!map.has(k)) map.set(k, {
				nom: ct.entreprise || "Entreprise non renseignée",
				candidatures: [],
				contacts: []
			});
			map.get(k).contacts.push(ct);
		}
		const q = recherche.trim().toLowerCase();
		return [...map.values()].filter((g) => !q || g.nom.toLowerCase().includes(q)).sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
	}, [
		items,
		contacts,
		recherche
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Suivi",
		title: "Entreprises",
		subtitle: `${groupes.length} entreprise(s) suivie(s)`,
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 134
		}, this) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative mb-5 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: recherche,
					onChange: (e) => setRecherche(e.target.value),
					placeholder: "Rechercher une entreprise…",
					className: "pl-9"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 7
			}, this),
			groupes.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "glass-card p-8 text-center text-sm text-muted-foreground",
				children: [
					"Aucune entreprise pour l'instant. Ajoutez une opportunité depuis",
					" ",
					/* @__PURE__ */ (void 0)(Link, {
						to: "/candidatures",
						className: "text-primary hover:underline",
						children: "vos candidatures"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 11
					}, this),
					"."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 74,
				columnNumber: 32
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: groupes.map((g, i) => {
					const meilleur = g.candidatures.map((c) => c.match?.global ?? -1).reduce((a, b) => Math.max(a, b), -1);
					const matchTop = g.candidatures.find((c) => (c.match?.global ?? -1) === meilleur)?.match ?? null;
					const avancement = g.candidatures.reduce((best, c) => STATUTS.indexOf(c.statut) > STATUTS.indexOf(best) ? c.statut : best, g.candidatures[0]?.statut ?? "Je vais postuler");
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setDetail(g),
						className: "glass-card pop-in flex min-w-0 flex-col gap-3 p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_rgba(124,92,255,0.7)]",
						style: { animationDelay: `${Math.min(i, 10) * 45}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 92,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 91,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
										className: "truncate text-[15px] font-semibold",
										children: g.nom
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 95,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											g.candidatures.length,
											" candidature(s) · ",
											g.contacts.length,
											" ",
											"contact(s)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [g.candidatures.length > 0 && /* @__PURE__ */ (void 0)(StatutBadge, { statut: avancement }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 47
								}, this), matchTop && /* @__PURE__ */ (void 0)(MatchBadge, { match: matchTop }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 30
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary",
								children: ["Ouvrir la fiche entreprise ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 44
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 15
							}, this)
						]
					}, g.nom + i, true, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 82,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
				open: !!detail,
				onOpenChange: (o) => !o && setDetail(null),
				size: "xl",
				title: detail?.nom ?? "",
				description: detail ? `${detail.candidatures.length} candidature(s) · ${detail.contacts.length} contact(s)` : void 0,
				children: detail && /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-5",
					children: [/* @__PURE__ */ (void 0)("section", { children: [
						/* @__PURE__ */ (void 0)("h3", {
							className: "mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
							children: [/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 17
							}, this), " Candidatures"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 15
						}, this),
						detail.candidatures.length === 0 && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-muted-foreground",
							children: "Aucune candidature pour cette entreprise."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 52
						}, this),
						/* @__PURE__ */ (void 0)("ul", {
							className: "grid gap-2",
							children: detail.candidatures.map((c) => /* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									setEditing(c);
									setOpen(true);
									setDetail(null);
								},
								className: "flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 bg-card/40 px-3.5 py-3 text-left transition hover:border-primary/40",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "block truncate text-sm font-medium",
										children: c.poste || "Poste non renseigné"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 134,
										columnNumber: 25
									}, this), c.lieu && /* @__PURE__ */ (void 0)("span", {
										className: "block text-xs text-muted-foreground",
										children: c.lieu
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 36
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(StatutBadge, { statut: c.statut }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 25
									}, this), c.match && /* @__PURE__ */ (void 0)(MatchBadge, { match: c.match }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 37
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 21
							}, this) }, c.id, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 47
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("section", { children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mb-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
								children: [/* @__PURE__ */ (void 0)(Users, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 19
								}, this), " Contacts"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Link, {
								to: "/contacts",
								className: "text-xs font-medium text-primary hover:underline",
								children: "Gérer les contacts"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 15
						}, this),
						detail.contacts.length === 0 && /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-muted-foreground",
							children: "Aucun contact enregistré pour cette entreprise."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 48
						}, this),
						/* @__PURE__ */ (void 0)("ul", {
							className: "grid gap-2 sm:grid-cols-2",
							children: detail.contacts.map((ct) => /* @__PURE__ */ (void 0)("li", {
								className: "rounded-2xl border border-border/60 bg-card/40 p-3.5",
								children: [
									/* @__PURE__ */ (void 0)("p", {
										className: "truncate text-sm font-medium",
										children: ct.nom
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 164,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [ct.poste, ct.type].filter(Boolean).join(" · ")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 165,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-2 flex flex-wrap gap-3 text-xs",
										children: [
											ct.email && /* @__PURE__ */ (void 0)("a", {
												href: `mailto:${ct.email}`,
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 170,
													columnNumber: 27
												}, this), " Écrire"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 169,
												columnNumber: 36
											}, this),
											ct.telephone && /* @__PURE__ */ (void 0)("a", {
												href: `tel:${ct.telephone}`,
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: [/* @__PURE__ */ (void 0)(Phone, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 173,
													columnNumber: 27
												}, this), " Appeler"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 172,
												columnNumber: 40
											}, this),
											ct.linkedin && /* @__PURE__ */ (void 0)("a", {
												href: ct.linkedin.startsWith("http") ? ct.linkedin : `https://${ct.linkedin}`,
												target: "_blank",
												rel: "noreferrer",
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: [/* @__PURE__ */ (void 0)(Linkedin, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 176,
													columnNumber: 27
												}, this), " LinkedIn"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 175,
												columnNumber: 39
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 21
									}, this)
								]
							}, ct.id, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 44
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 20
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 117,
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
				lineNumber: 185,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 68,
		columnNumber: 10
	}, this);
}
//#endregion
export { EntreprisesPage as component };
