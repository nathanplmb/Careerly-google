import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Plus, C as Search, G as Linkedin, Ht as Building2, M as Phone, N as Pencil, R as MapPin, U as LoaderCircle, Ut as Briefcase, a as Users, et as Heart, it as Globe, jt as ChevronRight, m as Trash2, mt as ExternalLink, u as UserCheck, z as Mail } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as STATUTS, D as emptyCandidature, O as emptyContact, S as CenterModal, _ as AlertDialogDescription, b as AlertDialogTitle, d as useEntreprises, f as useProfil, g as AlertDialogContent, h as AlertDialogCancel, i as emptyEntreprise, l as useCandidatures, m as AlertDialogAction, p as AlertDialog, t as ContactSheet, u as useContacts, v as AlertDialogFooter, x as CandidatureSheet, y as AlertDialogHeader } from "./router-Chlelb_S.mjs";
import { G as Button, W as Input, i as Textarea, l as AppShell } from "./router-Chlelb_S2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entreprises-CwOJcp10.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/StatutBadge.tsx";
var STYLES = {
	Sauvegardée: "bg-muted/50 text-muted-foreground border-border/50",
	"À préparer": "bg-primary/10 text-primary border-primary/20",
	"À étudier": "bg-muted text-foreground border-border",
	"À candidater": "bg-primary/10 text-primary border-primary/20",
	"Candidature envoyée": "bg-accent text-accent-foreground border-primary/20",
	Relancée: "bg-primary/15 text-primary border-primary/30",
	Entretien: "bg-success/15 text-success border-success/30",
	"Deuxième entretien": "bg-success/25 text-success border-success/40",
	"Offre reçue": "bg-success/20 text-success border-success/40",
	Acceptée: "bg-success/30 text-success border-success/50 font-bold",
	Refusée: "bg-destructive/10 text-destructive border-destructive/25",
	"Sans réponse": "bg-warning/15 text-warning border-warning/30",
	Clôturée: "bg-muted/30 text-muted-foreground border-border/30"
};
function StatutBadge({ statut }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[statut]}`,
		children: statut
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/entreprises.tsx?tsr-split=component";
function EntreprisesPage() {
	const { user, authLoading, items: candidatures, save, remove } = useCandidatures();
	const { entreprises, loading: loadingEntreprises, saveEntreprise, removeEntreprise, getOpportunitiesForEntreprise, getContactsForEntreprise, syncWithOpportunites } = useEntreprises();
	const { contacts, saveContact, deleteContactById } = useContacts();
	const profil = useProfil(user);
	const [recherche, setRecherche] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("alpha");
	const [selectedEntreprise, setSelectedEntreprise] = (0, import_react.useState)(null);
	const [editingOpp, setEditingOpp] = (0, import_react.useState)(null);
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [selectedContact, setSelectedContact] = (0, import_react.useState)(null);
	const [contactSheetOpen, setContactSheetOpen] = (0, import_react.useState)(false);
	const [newCompanyModalOpen, setNewCompanyModalOpen] = (0, import_react.useState)(false);
	const [newCompanyForm, setNewCompanyForm] = (0, import_react.useState)({
		nom: "",
		secteur: "",
		siege: "",
		siteWeb: "",
		notes: ""
	});
	const [deleteConfirmTarget, setDeleteConfirmTarget] = (0, import_react.useState)(null);
	const [notesDraft, setNotesDraft] = (0, import_react.useState)("");
	const [isEditingNotes, setIsEditingNotes] = (0, import_react.useState)(false);
	const lastSyncHashRef = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		if (candidatures.length > 0 && !loadingEntreprises) {
			const syncKey = `${candidatures.length}:${candidatures.map((c) => c.id).join(",")}:${contacts.length}`;
			if (lastSyncHashRef.current !== syncKey) {
				lastSyncHashRef.current = syncKey;
				syncWithOpportunites(candidatures, contacts);
			}
		}
	}, [
		candidatures,
		contacts,
		loadingEntreprises,
		syncWithOpportunites
	]);
	(0, import_react.useEffect)(() => {
		if (selectedEntreprise) {
			setNotesDraft(selectedEntreprise.notes || "");
			setIsEditingNotes(false);
		}
	}, [selectedEntreprise]);
	const enrichedEntreprises = (0, import_react.useMemo)(() => {
		return entreprises.map((e) => {
			const opps = getOpportunitiesForEntreprise(e, candidatures);
			const cts = getContactsForEntreprise(e, contacts);
			const bestStatut = opps.reduce((best, c) => STATUTS.indexOf(c.statut) > STATUTS.indexOf(best) ? c.statut : best, opps[0]?.statut ?? "Sauvegardée");
			return {
				...e,
				opportunites: opps,
				contactsCount: cts.length,
				contactsList: cts,
				bestStatut
			};
		});
	}, [
		entreprises,
		candidatures,
		contacts,
		getOpportunitiesForEntreprise,
		getContactsForEntreprise
	]);
	const filteredEntreprises = (0, import_react.useMemo)(() => {
		const q = recherche.trim().toLowerCase();
		return enrichedEntreprises.filter((e) => {
			if (q) {
				const matchNom = e.nom.toLowerCase().includes(q);
				const matchSecteur = Boolean(e.secteur?.toLowerCase().includes(q));
				const matchSiege = Boolean(e.siege?.toLowerCase().includes(q));
				if (!matchNom && !matchSecteur && !matchSiege) return false;
			}
			if (filter === "with_opps" && e.opportunites.length === 0) return false;
			if (filter === "with_contacts" && e.contactsCount === 0) return false;
			if (filter === "favorites" && !e.isFavorite) return false;
			return true;
		}).sort((a, b) => {
			if (sort === "opps") return b.opportunites.length - a.opportunites.length;
			if (sort === "recent") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
			return a.nom.localeCompare(b.nom, "fr");
		});
	}, [
		enrichedEntreprises,
		recherche,
		filter,
		sort
	]);
	const handleToggleFavorite = async (e, ent) => {
		e.stopPropagation();
		const updated = {
			...ent,
			isFavorite: !ent.isFavorite,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		await saveEntreprise(updated);
		if (selectedEntreprise?.id === ent.id) setSelectedEntreprise(updated);
		toast.success(updated.isFavorite ? `${ent.nom} ajoutée à vos favoris` : `${ent.nom} retirée de vos favoris`);
	};
	const handleSaveNotes = async () => {
		if (!selectedEntreprise) return;
		const manualFields = new Set(selectedEntreprise.manualFields || []);
		manualFields.add("notes");
		const updated = {
			...selectedEntreprise,
			notes: notesDraft,
			manualFields: Array.from(manualFields),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		await saveEntreprise(updated);
		setSelectedEntreprise(updated);
		setIsEditingNotes(false);
		toast.success("Notes de l'entreprise enregistrées.");
	};
	const handleCreateManualCompany = async (e) => {
		e.preventDefault();
		if (!newCompanyForm.nom.trim()) {
			toast.error("Veuillez renseigner le nom de l'entreprise.");
			return;
		}
		const newEnt = {
			...emptyEntreprise(newCompanyForm.nom),
			secteur: newCompanyForm.secteur.trim() || null,
			siege: newCompanyForm.siege.trim() || null,
			siteWeb: newCompanyForm.siteWeb.trim() || null,
			notes: newCompanyForm.notes.trim() || "",
			isManual: true,
			manualFields: [
				"nom",
				"secteur",
				"siege",
				"siteWeb",
				"notes"
			].filter((k) => Boolean(newCompanyForm[k]))
		};
		await saveEntreprise(newEnt);
		setNewCompanyModalOpen(false);
		setNewCompanyForm({
			nom: "",
			secteur: "",
			siege: "",
			siteWeb: "",
			notes: ""
		});
		toast.success(`Entreprise ${newEnt.nom} créée.`);
	};
	const handleConfirmDeleteEntreprise = async () => {
		if (!deleteConfirmTarget) return;
		await removeEntreprise(deleteConfirmTarget.id);
		if (selectedEntreprise?.id === deleteConfirmTarget.id) setSelectedEntreprise(null);
		setDeleteConfirmTarget(null);
		toast.success("Entreprise supprimée de votre suivi.");
	};
	const handleAddOpportunityForCompany = (ent) => {
		const opp = emptyCandidature();
		opp.companyId = ent.id;
		opp.entreprise = ent.nom;
		opp.company = ent.nom;
		opp.companyName = ent.nom;
		opp.companySector = ent.secteur || null;
		opp.secteur = ent.secteur || "";
		opp.companyLocation = ent.siege || null;
		opp.lieu = ent.siege || "";
		opp.companyWebsite = ent.siteWeb || null;
		setEditingOpp(opp);
		setSheetOpen(true);
	};
	const activeOppsCount = candidatures.filter((c) => c.statut !== "Clôturée" && c.statut !== "Archivée").length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Suivi",
		title: "Entreprises",
		subtitle: `${entreprises.length} entreprise(s) suivie(s) · ${activeOppsCount} opportunité(s)`,
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [authLoading || loadingEntreprises ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 230,
				columnNumber: 48
			}, this) : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				type: "button",
				size: "sm",
				onClick: () => setNewCompanyModalOpen(true),
				className: "rounded-xl shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1.5 size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 232,
					columnNumber: 13
				}, this), " Nouvelle entreprise"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 231,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 229,
			columnNumber: 160
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative w-full max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						value: recherche,
						onChange: (e) => setRecherche(e.target.value),
						placeholder: "Rechercher par nom, secteur, siège…",
						className: "rounded-xl pl-9"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 237,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center rounded-xl border border-border/60 bg-card/60 p-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setFilter("all"),
								className: `rounded-lg px-2.5 py-1 transition ${filter === "all" ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
								children: [
									"Toutes (",
									enrichedEntreprises.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setFilter("with_opps"),
								className: `rounded-lg px-2.5 py-1 transition ${filter === "with_opps" ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
								children: "Opportunités"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setFilter("with_contacts"),
								className: `rounded-lg px-2.5 py-1 transition ${filter === "with_contacts" ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
								children: "Contacts"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setFilter("favorites"),
								className: `inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition ${filter === "favorites" ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-3 fill-current" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 15
								}, this), " Favoris"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 244,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "alpha",
								children: "A-Z"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "opps",
								children: "Plus d'opportunités"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "recent",
								children: "Modifié récemment"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 236,
				columnNumber: 7
			}, this),
			filteredEntreprises.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card flex flex-col items-center justify-center p-12 text-center",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mb-3 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (void 0)(Building2, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 270,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-semibold",
						children: "Aucune entreprise trouvée"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "mt-1 max-w-md text-sm text-muted-foreground",
						children: recherche || filter !== "all" ? "Aucune entreprise ne correspond à vos filtres actuels." : "Vos entreprises sont alimentées automatiquement dès que vous sauvegardez une opportunité, ou vous pouvez en créer une manuellement."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 274,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mt-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							onClick: () => setNewCompanyModalOpen(true),
							className: "rounded-xl",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "mr-1.5 size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 15
							}, this), " Créer une entreprise"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 278,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Link, {
							to: "/opportunites",
							children: /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "outline",
								className: "rounded-xl",
								children: "Voir les opportunités"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 269,
				columnNumber: 44
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredEntreprises.map((e, i) => {
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						role: "button",
						tabIndex: 0,
						onClick: () => setSelectedEntreprise(e),
						onKeyDown: (ev) => {
							if (ev.key === "Enter" || ev.key === " ") {
								ev.preventDefault();
								setSelectedEntreprise(e);
							}
						},
						className: "glass-card pop-in group relative flex min-w-0 cursor-pointer flex-col gap-3.5 p-5 text-left transition hover:border-primary/40 hover:shadow-[0_20px_50px_-30px_rgba(124,92,255,0.4)]",
						style: { animationDelay: `${Math.min(i, 12) * 35}ms` },
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary font-semibold text-sm border border-primary/20",
										children: e.nom.slice(0, 2).toUpperCase()
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 303,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
											className: "truncate text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors",
											children: e.nom
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 307,
											columnNumber: 21
										}, this), (e.secteur || e.siege) && /* @__PURE__ */ (void 0)("p", {
											className: "truncate text-xs text-muted-foreground mt-0.5",
											children: [e.secteur, e.siege].filter(Boolean).join(" · ")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 310,
											columnNumber: 48
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 306,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 302,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: (ev) => handleToggleFavorite(ev, e),
									title: e.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris",
									className: "shrink-0 p-1 text-muted-foreground/60 hover:text-amber-500 transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `size-4 ${e.isFavorite ? "fill-amber-500 text-amber-500" : ""}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 317,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 301,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-3.5 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 324,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "font-semibold text-foreground",
												children: e.opportunites.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 325,
												columnNumber: 19
											}, this),
											" ",
											"opportunité",
											e.opportunites.length > 1 ? "s" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 323,
										columnNumber: 17
									}, this),
									e.contactsCount > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground",
										children: [
											/* @__PURE__ */ (void 0)(Users, { className: "size-3.5 text-sky-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 332,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("strong", {
												className: "font-semibold text-foreground",
												children: e.contactsCount
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 333,
												columnNumber: 21
											}, this),
											" ",
											"contact",
											e.contactsCount > 1 ? "s" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 331,
										columnNumber: 41
									}, this),
									e.opportunites.length > 0 && /* @__PURE__ */ (void 0)("div", {
										className: "ml-auto",
										children: /* @__PURE__ */ (void 0)(StatutBadge, { statut: e.bestStatut }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 340,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 339,
										columnNumber: 47
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 15
							}, this),
							e.notes ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "line-clamp-2 text-xs italic text-muted-foreground/90 bg-primary/5 rounded-lg px-2.5 py-1.5 border border-primary/10",
								children: [
									"\"",
									e.notes,
									"\""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 345,
								columnNumber: 26
							}, this) : e.chiffresCles && e.chiffresCles.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-xs text-muted-foreground/80",
								children: ["⭐ ", e.chiffresCles[0]]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 70
							}, this) : null,
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1 text-primary font-medium group-hover:underline",
									children: ["Ouvrir la fiche ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 35
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 353,
									columnNumber: 17
								}, this), e.siteWeb && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground/70",
									children: [/* @__PURE__ */ (void 0)(Globe, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 357,
										columnNumber: 21
									}, this), " Web"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 356,
									columnNumber: 31
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 352,
								columnNumber: 15
							}, this)
						]
					}, e.id, true, {
						fileName: _jsxFileName,
						lineNumber: 292,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 290,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
				open: Boolean(selectedEntreprise),
				onOpenChange: (o) => !o && setSelectedEntreprise(null),
				size: "xl",
				title: selectedEntreprise ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between gap-3 w-full pr-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary font-bold text-sm",
							children: selectedEntreprise.nom.slice(0, 2).toUpperCase()
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 369,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate",
							children: selectedEntreprise.nom
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 372,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 368,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: (ev) => handleToggleFavorite(ev, selectedEntreprise),
						className: "shrink-0 p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground",
						title: selectedEntreprise.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `size-5 ${selectedEntreprise.isFavorite ? "fill-amber-500 text-amber-500" : ""}` }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 375,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 374,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 367,
					columnNumber: 147
				}, this) : "",
				description: selectedEntreprise ? [
					selectedEntreprise.secteur,
					selectedEntreprise.siege,
					selectedEntreprise.taille
				].filter(Boolean).join(" · ") : void 0,
				children: selectedEntreprise && (() => {
					const opps = getOpportunitiesForEntreprise(selectedEntreprise, candidatures);
					const cts = getContactsForEntreprise(selectedEntreprise, contacts);
					return /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-6 p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center gap-3 text-xs",
								children: [
									selectedEntreprise.siteWeb && /* @__PURE__ */ (void 0)("a", {
										href: selectedEntreprise.siteWeb.startsWith("http") ? selectedEntreprise.siteWeb : `https://${selectedEntreprise.siteWeb}`,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-primary hover:underline",
										children: [
											/* @__PURE__ */ (void 0)(Globe, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 385,
												columnNumber: 23
											}, this),
											"Site officiel",
											/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 387,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 50
									}, this),
									selectedEntreprise.siege && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground",
										children: [/* @__PURE__ */ (void 0)(MapPin, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 390,
											columnNumber: 23
										}, this), selectedEntreprise.siege]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 48
									}, this),
									selectedEntreprise.secteur && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground",
										children: [/* @__PURE__ */ (void 0)(Building2, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 394,
											columnNumber: 23
										}, this), selectedEntreprise.secteur]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 50
									}, this),
									selectedEntreprise.taille && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-muted-foreground",
										children: [/* @__PURE__ */ (void 0)(Users, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 398,
											columnNumber: 23
										}, this), selectedEntreprise.taille]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 397,
										columnNumber: 49
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "ml-auto",
										children: /* @__PURE__ */ (void 0)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => handleAddOpportunityForCompany(selectedEntreprise),
											className: "h-8 rounded-lg text-xs",
											children: [/* @__PURE__ */ (void 0)(Plus, { className: "mr-1 size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 404,
												columnNumber: 23
											}, this), " Opportunité pour cette entreprise"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 403,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 402,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 17
							}, this),
							selectedEntreprise.description && /* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border/50 bg-card/40 p-4 text-xs leading-relaxed text-muted-foreground",
								children: [/* @__PURE__ */ (void 0)("strong", {
									className: "block font-medium text-foreground mb-1",
									children: "À propos de l'entreprise"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 412,
									columnNumber: 21
								}, this), selectedEntreprise.description]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 411,
								columnNumber: 52
							}, this),
							selectedEntreprise.chiffresCles && selectedEntreprise.chiffresCles.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Chiffres clés & repères"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 420,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap gap-2",
								children: selectedEntreprise.chiffresCles.map((metric, idx) => /* @__PURE__ */ (void 0)("span", {
									className: "rounded-lg border border-border/60 bg-card/60 px-2.5 py-1 text-xs text-foreground font-medium",
									children: metric
								}, idx, false, {
									fileName: _jsxFileName,
									lineNumber: 424,
									columnNumber: 79
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 423,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 419,
								columnNumber: 99
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border/60 bg-card/40 p-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "mb-2 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (void 0)("h4", {
										className: "inline-flex items-center gap-1.5 text-xs font-semibold text-foreground",
										children: [/* @__PURE__ */ (void 0)(Pencil, { className: "size-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 434,
											columnNumber: 23
										}, this), " Notes stratégiques & remarques"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 433,
										columnNumber: 21
									}, this), !isEditingNotes ? /* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => setIsEditingNotes(true),
										className: "h-7 text-xs text-primary",
										children: "Modifier"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 437,
										columnNumber: 40
									}, this) : null]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 432,
									columnNumber: 19
								}, this), isEditingNotes ? /* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)(Textarea, {
										rows: 3,
										value: notesDraft,
										onChange: (e) => setNotesDraft(e.target.value),
										placeholder: "Ex: Entreprise en forte croissance IA, contacté lors du forum Neoma, relancer en avril…",
										className: "text-xs resize-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 443,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (void 0)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											onClick: () => {
												setNotesDraft(selectedEntreprise.notes || "");
												setIsEditingNotes(false);
											},
											className: "h-7 text-xs",
											children: "Annuler"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Button, {
											type: "button",
											size: "sm",
											onClick: handleSaveNotes,
											className: "h-7 text-xs rounded-lg",
											children: "Enregistrer la note"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 451,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 444,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 442,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground whitespace-pre-wrap",
									children: selectedEntreprise.notes ? selectedEntreprise.notes : "Aucune note personnelle. Cliquez sur modifier pour consigner des informations stratégiques."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 455,
									columnNumber: 30
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 431,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "mb-3 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("h4", {
									className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: [
										/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 464,
											columnNumber: 23
										}, this),
										" ",
										"Opportunités associées (",
										opps.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 463,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => handleAddOpportunityForCompany(selectedEntreprise),
									className: "h-7 text-xs text-primary hover:underline",
									children: "+ Ajouter"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 467,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 462,
								columnNumber: 19
							}, this), opps.length === 0 ? /* @__PURE__ */ (void 0)("p", {
								className: "rounded-xl border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground",
								children: "Aucune opportunité rattachée pour le moment."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 472,
								columnNumber: 40
							}, this) : /* @__PURE__ */ (void 0)("div", {
								className: "grid gap-2",
								children: opps.map((opp) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										setEditingOpp(opp);
										setSheetOpen(true);
									},
									className: "group flex w-full flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-border/60 bg-card/60 p-3.5 text-left transition hover:border-primary/40 hover:bg-card/90",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors",
											children: opp.poste || "Opportunité sans titre"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 480,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
											children: [
												opp.contractType && /* @__PURE__ */ (void 0)("span", { children: opp.contractType }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 484,
													columnNumber: 52
												}, this),
												opp.duration && /* @__PURE__ */ (void 0)("span", { children: ["· ", opp.duration] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 485,
													columnNumber: 48
												}, this),
												opp.lieu && /* @__PURE__ */ (void 0)("span", { children: ["· ", opp.lieu] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 486,
													columnNumber: 44
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 483,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 479,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(StatutBadge, { statut: opp.statut }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 491,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-4 text-muted-foreground group-hover:text-primary transition-colors" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 492,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 490,
										columnNumber: 27
									}, this)]
								}, opp.id, true, {
									fileName: _jsxFileName,
									lineNumber: 475,
									columnNumber: 40
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 474,
								columnNumber: 28
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "mb-3 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("h4", {
									className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: [
										/* @__PURE__ */ (void 0)(Users, { className: "size-3.5 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 502,
											columnNumber: 23
										}, this),
										" Contacts de l'entreprise (",
										cts.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 501,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => {
											setSelectedContact({
												...emptyContact(),
												companyId: selectedEntreprise.id,
												entreprise: selectedEntreprise.nom
											});
											setContactSheetOpen(true);
										},
										className: "h-7 text-xs text-primary hover:underline",
										children: "+ Ajouter un contact"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Link, {
										to: "/contacts",
										className: "text-xs font-medium text-muted-foreground hover:text-foreground",
										children: "Voir tout"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 516,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 505,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 500,
								columnNumber: 19
							}, this), cts.length === 0 ? /* @__PURE__ */ (void 0)("p", {
								className: "rounded-xl border border-dashed border-border/60 p-4 text-center text-xs text-muted-foreground",
								children: "Aucun contact réseau enregistré pour cette entreprise."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 522,
								columnNumber: 39
							}, this) : /* @__PURE__ */ (void 0)("div", {
								className: "grid gap-2.5 sm:grid-cols-2",
								children: cts.map((ct) => /* @__PURE__ */ (void 0)("div", {
									onClick: () => {
										setSelectedContact(ct);
										setContactSheetOpen(true);
									},
									className: "rounded-2xl border border-border/60 bg-card/60 p-3.5 text-xs cursor-pointer hover:border-primary/50 hover:bg-card/80 transition-all",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
											className: "font-semibold text-foreground",
											children: ct.nom
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 531,
											columnNumber: 31
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground text-[11px]",
											children: [ct.poste, ct.type].filter(Boolean).join(" · ")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 534,
											columnNumber: 31
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 530,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "grid size-6 place-items-center rounded-lg bg-sky-500/10 text-sky-400 text-[11px]",
											children: /* @__PURE__ */ (void 0)(UserCheck, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 539,
												columnNumber: 31
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 538,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 529,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "mt-2.5 flex flex-wrap gap-2 text-[11px]",
										children: [
											ct.email && /* @__PURE__ */ (void 0)("a", {
												href: `mailto:${ct.email}`,
												onClick: (e) => e.stopPropagation(),
												className: "inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground hover:text-primary",
												children: [
													/* @__PURE__ */ (void 0)(Mail, { className: "size-3 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 545,
														columnNumber: 33
													}, this),
													" ",
													"Email"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 544,
												columnNumber: 42
											}, this),
											ct.telephone && /* @__PURE__ */ (void 0)("a", {
												href: `tel:${ct.telephone}`,
												onClick: (e) => e.stopPropagation(),
												className: "inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground hover:text-primary",
												children: [
													/* @__PURE__ */ (void 0)(Phone, { className: "size-3 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 549,
														columnNumber: 33
													}, this),
													" ",
													"Appeler"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 548,
												columnNumber: 46
											}, this),
											ct.linkedin && /* @__PURE__ */ (void 0)("a", {
												href: ct.linkedin.startsWith("http") ? ct.linkedin : `https://${ct.linkedin}`,
												target: "_blank",
												rel: "noreferrer",
												onClick: (e) => e.stopPropagation(),
												className: "inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-foreground hover:text-primary",
												children: [
													/* @__PURE__ */ (void 0)(Linkedin, { className: "size-3 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 553,
														columnNumber: 33
													}, this),
													" ",
													"Profil"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 552,
												columnNumber: 45
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 543,
										columnNumber: 27
									}, this)]
								}, ct.id, true, {
									fileName: _jsxFileName,
									lineNumber: 525,
									columnNumber: 38
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 524,
								columnNumber: 28
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 499,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-4 border-t border-border/40 pt-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Dernière mise à jour le",
										" ",
										new Date(selectedEntreprise.updatedAt).toLocaleDateString("fr-FR")
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 563,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setDeleteConfirmTarget(selectedEntreprise),
									className: "h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive",
									children: [/* @__PURE__ */ (void 0)(Trash2, { className: "mr-1.5 size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 568,
										columnNumber: 21
									}, this), " Supprimer l'entreprise"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 567,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 562,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 381,
						columnNumber: 16
					}, this);
				})()
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 367,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
				open: newCompanyModalOpen,
				onOpenChange: setNewCompanyModalOpen,
				size: "md",
				title: "Nouvelle entreprise cible",
				description: "Créez une fiche entreprise pour organiser vos opportunités et contacts",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleCreateManualCompany,
					className: "grid gap-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-foreground",
								children: ["Nom de l'entreprise ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-destructive",
									children: "*"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 583,
									columnNumber: 35
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 582,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								required: true,
								value: newCompanyForm.nom,
								onChange: (e) => setNewCompanyForm((prev) => ({
									...prev,
									nom: e.target.value
								})),
								placeholder: "Ex: PwC, Danone, LVMH, Doctolib…",
								className: "rounded-xl"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 585,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 581,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Secteur d'activité"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 593,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: newCompanyForm.secteur,
									onChange: (e) => setNewCompanyForm((prev) => ({
										...prev,
										secteur: e.target.value
									})),
									placeholder: "Ex: Conseil, Luxe, Tech…",
									className: "rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 596,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 592,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Siège / Ville"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 602,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: newCompanyForm.siege,
									onChange: (e) => setNewCompanyForm((prev) => ({
										...prev,
										siege: e.target.value
									})),
									placeholder: "Ex: Neuilly-sur-Seine, Paris…",
									className: "rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 605,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 601,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 591,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Site web officiel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 613,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: newCompanyForm.siteWeb,
								onChange: (e) => setNewCompanyForm((prev) => ({
									...prev,
									siteWeb: e.target.value
								})),
								placeholder: "https://entreprise.com",
								className: "rounded-xl"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 616,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 612,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Notes personnelles"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 623,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 3,
								value: newCompanyForm.notes,
								onChange: (e) => setNewCompanyForm((prev) => ({
									...prev,
									notes: e.target.value
								})),
								placeholder: "Remarques, contact initial, forum...",
								className: "rounded-xl text-xs resize-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 626,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 622,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setNewCompanyModalOpen(false),
								className: "rounded-xl",
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 633,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								className: "rounded-xl",
								children: "Enregistrer l'entreprise"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 636,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 632,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 580,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 579,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
				open: Boolean(deleteConfirmTarget),
				onOpenChange: (o) => !o && setDeleteConfirmTarget(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, {
					className: "rounded-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, { children: [
						"Supprimer ",
						deleteConfirmTarget?.nom,
						" ?"
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 649,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, {
						className: "text-xs leading-relaxed",
						children: deleteConfirmTarget && getOpportunitiesForEntreprise(deleteConfirmTarget, candidatures).length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
							"Cette entreprise est actuellement liée à",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: [
								getOpportunitiesForEntreprise(deleteConfirmTarget, candidatures).length,
								" ",
								"opportunité(s)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 655,
								columnNumber: 19
							}, this),
							".",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 660,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 661,
								columnNumber: 19
							}, this),
							"La suppression de l'entreprise détachera ces opportunités sans les effacer de votre suivi."
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 653,
							columnNumber: 117
						}, this) : "Cette entreprise sera retirée de votre suivi. Ses contacts associés seront conservés dans votre carnet d'adresses."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 652,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 648,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
						className: "rounded-xl",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 668,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						onClick: handleConfirmDeleteEntreprise,
						className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90",
						children: "Supprimer"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 671,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 667,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 647,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 646,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CandidatureSheet, {
				open: sheetOpen,
				onOpenChange: setSheetOpen,
				value: editingOpp,
				profil,
				onSave: async (c) => {
					await save(c);
					setSheetOpen(false);
				},
				onDelete: (id) => {
					remove(id);
					setSheetOpen(false);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 681,
				columnNumber: 7
			}, this),
			selectedContact && /* @__PURE__ */ (void 0)(ContactSheet, {
				open: contactSheetOpen,
				onOpenChange: setContactSheetOpen,
				contact: selectedContact,
				candidatures,
				entreprises,
				profil,
				onSave: async (c) => {
					await saveContact(c);
					setContactSheetOpen(false);
				},
				onDelete: async (c) => {
					await deleteContactById(c.id);
					setContactSheetOpen(false);
				},
				onOpenCandidature: (candidatureId) => {
					const opp = candidatures.find((x) => x.id === candidatureId);
					if (opp) {
						setEditingOpp(opp);
						setSheetOpen(true);
					}
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 692,
				columnNumber: 27
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 229,
		columnNumber: 10
	}, this);
}
//#endregion
export { EntreprisesPage as component };
