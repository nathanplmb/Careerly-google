import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STATUTS } from "./candidatures-CZEj3mXa.mjs";
import { o as loadContactsLocal } from "./contacts-BJIEa8pT.mjs";
import { t as Input } from "./label-CmIE8x5o.mjs";
import { At as Briefcase, B as LoaderCircle, H as Linkedin, I as Mail, S as Search, a as Users, bt as ChevronRight, k as Phone, kt as Building2 } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./useSession-B4uaWKjb.mjs";
import { t as CenterModal } from "./modal-BFs0E2x2.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-DGd6aJB4.mjs";
import { t as useCandidatures } from "./useCandidatures-ChiYtpVv.mjs";
import { t as useProfil } from "./useProfil-7Z3e6ezo.mjs";
import { n as fetchContacts } from "./contacts-cloud-dBFwL0C4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entreprises-DDx3KQPC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STYLES = {
	"Sauvegardée": "bg-muted/50 text-muted-foreground border-border/50",
	"À préparer": "bg-primary/10 text-primary border-primary/20",
	"À étudier": "bg-muted text-foreground border-border",
	"À candidater": "bg-primary/10 text-primary border-primary/20",
	"Candidature envoyée": "bg-accent text-accent-foreground border-primary/20",
	"Relancée": "bg-primary/15 text-primary border-primary/30",
	"Entretien": "bg-success/15 text-success border-success/30",
	"Deuxième entretien": "bg-success/25 text-success border-success/40",
	"Offre reçue": "bg-success/20 text-success border-success/40",
	"Acceptée": "bg-success/30 text-success border-success/50 font-bold",
	"Refusée": "bg-destructive/10 text-destructive border-destructive/25",
	"Sans réponse": "bg-warning/15 text-warning border-warning/30",
	"Clôturée": "bg-muted/30 text-muted-foreground border-border/30"
};
function StatutBadge({ statut }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[statut]}`,
		children: statut
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Suivi",
		title: "Entreprises",
		subtitle: `${groupes.length} entreprise(s) suivie(s)`,
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-5 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: recherche,
					onChange: (e) => setRecherche(e.target.value),
					placeholder: "Rechercher une entreprise…",
					className: "pl-9"
				})]
			}),
			groupes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "glass-card p-8 text-center text-sm text-muted-foreground",
				children: [
					"Aucune entreprise pour l'instant. Ajoutez une opportunité depuis",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/opportunites",
						className: "text-primary hover:underline",
						children: "vos opportunités"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: groupes.map((g, i) => {
					const avancement = g.candidatures.reduce((best, c) => STATUTS.indexOf(c.statut) > STATUTS.indexOf(best) ? c.statut : best, g.candidatures[0]?.statut ?? "À candidater");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDetail(g),
						className: "glass-card pop-in flex min-w-0 flex-col gap-3 p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_60px_-30px_rgba(124,92,255,0.7)]",
						style: { animationDelay: `${Math.min(i, 10) * 45}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "truncate text-[15px] font-semibold",
										children: g.nom
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											g.candidatures.length,
											" candidature(s) · ",
											g.contacts.length,
											" ",
											"contact(s)"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: g.candidatures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatutBadge, { statut: avancement })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary",
								children: ["Ouvrir la fiche entreprise ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
							})
						]
					}, g.nom + i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterModal, {
				open: !!detail,
				onOpenChange: (o) => !o && setDetail(null),
				size: "xl",
				title: detail?.nom ?? "",
				description: detail ? `${detail.candidatures.length} candidature(s) · ${detail.contacts.length} contact(s)` : void 0,
				children: detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3.5" }), " Candidatures"]
						}),
						detail.candidatures.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Aucune candidature pour cette entreprise."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: detail.candidatures.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setEditing(c);
									setOpen(true);
									setDetail(null);
								},
								className: "flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/60 bg-card/40 px-3.5 py-3 text-left transition hover:border-primary/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm font-medium",
										children: c.poste || "Poste non renseigné"
									}), c.lieu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: c.lieu
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatutBadge, { statut: c.statut })
								})]
							}) }, c.id))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), " Contacts"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contacts",
								className: "text-xs font-medium text-primary hover:underline",
								children: "Gérer les contacts"
							})]
						}),
						detail.contacts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Aucun contact enregistré pour cette entreprise."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2 sm:grid-cols-2",
							children: detail.contacts.map((ct) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-2xl border border-border/60 bg-card/40 p-3.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: ct.nom
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [ct.poste, ct.type].filter(Boolean).join(" · ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap gap-3 text-xs",
										children: [
											ct.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `mailto:${ct.email}`,
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), " Écrire"]
											}),
											ct.telephone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `tel:${ct.telephone}`,
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), " Appeler"]
											}),
											ct.linkedin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: ct.linkedin.startsWith("http") ? ct.linkedin : `https://${ct.linkedin}`,
												target: "_blank",
												rel: "noreferrer",
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "size-3.5" }), " LinkedIn"]
											})
										]
									})
								]
							}, ct.id))
						})
					] })]
				})
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
export { EntreprisesPage as component };
