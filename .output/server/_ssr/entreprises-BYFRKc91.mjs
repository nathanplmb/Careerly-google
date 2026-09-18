import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { D as useContacts, L as STATUTS, Ut as Button, X as emptyCandidature, Z as emptyContact, a as Textarea, p as AppShell, s as Input } from "./profil-cloud-Z6f0Jbed.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Gt as Building2, It as ChevronRight, Kt as Briefcase, M as Pencil, W as LoaderCircle, X as LayoutGrid, a as Users, ct as Globe, g as Table, it as Heart, k as Plus, p as Trash2, q as Linkedin, w as Search, z as MapPin } from "../_libs/lucide-react.mjs";
import { S as StatutBadge, _ as AlertDialogFooter, a as emptyEntreprise, b as CandidatureSheet, c as ContactImportModal, f as AlertDialog, g as AlertDialogDescription, h as AlertDialogContent, i as useCandidatures, l as ContactSheet, m as AlertDialogCancel, o as useProfil, p as AlertDialogAction, r as useEntreprises, s as ContactCard, v as AlertDialogHeader, x as CenterModal, y as AlertDialogTitle } from "./router-cEuEJGYQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/entreprises-BYFRKc91.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/entreprises.tsx?tsr-split=component";
function EntreprisesPage() {
	const { user, authLoading, items: candidatures, save, remove } = useCandidatures();
	const { entreprises, loading: loadingEntreprises, saveEntreprise, removeEntreprise, getOpportunitiesForEntreprise, getContactsForEntreprise, syncWithOpportunites } = useEntreprises();
	const { contacts, saveContact, deleteContactById, batchImportContacts } = useContacts();
	const [importModalOpen, setImportModalOpen] = (0, import_react.useState)(false);
	const profil = useProfil(user);
	const [recherche, setRecherche] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("alpha");
	const [viewMode, setViewMode] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem("nacora_entreprises_view_mode") ?? "grid";
		return "grid";
	});
	(0, import_react.useEffect)(() => {
		localStorage.setItem("nacora_entreprises_view_mode", viewMode);
	}, [viewMode]);
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
		if (!loadingEntreprises && (candidatures.length > 0 || contacts.length > 0)) {
			const syncKey = `${candidatures.length}:${candidatures.map((c) => c.id).join(",")}:${contacts.length}:${contacts.map((c) => `${c.id}_${c.entreprise}`).join(",")}`;
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
				const matchContact = e.contactsList.some((c) => c.prenom?.toLowerCase().includes(q) || c.nom?.toLowerCase().includes(q) || c.poste?.toLowerCase().includes(q) || c.entreprise?.toLowerCase().includes(q));
				if (!matchNom && !matchSecteur && !matchSiege && !matchContact) return false;
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
		title: "Entreprises",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [
				authLoading || loadingEntreprises ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 244,
					columnNumber: 48
				}, this) : null,
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					size: "sm",
					onClick: () => setImportModalOpen(true),
					className: "rounded-xl shadow-sm bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-3.5 text-white" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 13
					}, this), "Importer contacts LinkedIn"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 245,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					size: "sm",
					onClick: () => setNewCompanyModalOpen(true),
					className: "rounded-xl shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "mr-1.5 size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 13
					}, this), " Nouvelle entreprise"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 249,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 243,
			columnNumber: 49
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 256,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Suivies :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: entreprises.length }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Favoris prioritaires :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: enrichedEntreprises.filter((e) => e.isFavorite).length }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-indigo-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 268,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Opportunités liées :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: activeOppsCount }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-foreground border border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground font-medium",
								children: "Contacts réseau :"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: contacts.length }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 274,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 254,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative w-full max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 286,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						value: recherche,
						onChange: (e) => setRecherche(e.target.value),
						placeholder: "Rechercher par entreprise, secteur, siège ou contact…",
						className: "pl-10 h-10 text-xs"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 285,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setFilter("all"),
									className: `rounded-lg px-2.5 py-1 transition cursor-pointer ${filter === "all" ? "bg-primary text-white font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"Toutes (",
										enrichedEntreprises.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 293,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setFilter("with_opps"),
									className: `rounded-lg px-2.5 py-1 transition cursor-pointer ${filter === "with_opps" ? "bg-primary text-white font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"Opportunités (",
										enrichedEntreprises.filter((e) => e.opportunites.length > 0).length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setFilter("with_contacts"),
									className: `rounded-lg px-2.5 py-1 transition cursor-pointer ${filter === "with_contacts" ? "bg-primary text-white font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [
										"Contacts (",
										enrichedEntreprises.filter((e) => e.contactsCount > 0).length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setFilter("favorites"),
									className: `inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition cursor-pointer ${filter === "favorites" ? "bg-primary text-white font-semibold shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-3 fill-current" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 306,
										columnNumber: 15
									}, this), " Favoris"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 305,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 292,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "rounded-xl border border-white/10 bg-black/20 backdrop-blur-md px-3 py-1.5 h-10 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "alpha",
									children: "A-Z"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "opps",
									children: "Plus d'opportunités"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "recent",
									children: "Modifié récemment"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 314,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-1 h-10",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setViewMode("grid"),
								title: "Vue Grille",
								className: `rounded-lg p-1.5 transition-colors cursor-pointer ${viewMode === "grid" ? "bg-primary text-white font-medium shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-white/10"}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutGrid, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 320,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 319,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setViewMode("table"),
								title: "Vue Tableau",
								className: `rounded-lg p-1.5 transition-colors cursor-pointer ${viewMode === "table" ? "bg-primary text-white font-medium shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-white/10"}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 290,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 284,
				columnNumber: 7
			}, this),
			filteredEntreprises.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "rounded-2xl border border-dashed border-border/80 bg-card/40 flex flex-col items-center justify-center p-12 text-center",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mb-3 grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (void 0)(Building2, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 332,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 331,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-semibold",
						children: "Aucune entreprise trouvée"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "mt-1 max-w-md text-sm text-muted-foreground",
						children: recherche || filter !== "all" ? "Aucune entreprise ne correspond à vos filtres actuels." : "Vos entreprises sont alimentées automatiquement dès que vous sauvegardez une opportunité, ou vous pouvez en créer une manuellement."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 335,
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
								lineNumber: 340,
								columnNumber: 15
							}, this), " Créer une entreprise"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 339,
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
								lineNumber: 343,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 342,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 338,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 330,
				columnNumber: 44
			}, this),
			viewMode === "table" && filteredEntreprises.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "overflow-hidden rounded-2xl border border-border/60 bg-card/50",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (void 0)("table", {
						className: "w-full border-collapse text-left text-sm",
						children: [/* @__PURE__ */ (void 0)("thead", {
							className: "border-b border-border/60 bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (void 0)("tr", { children: [
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4",
									children: "Nom"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 356,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4",
									children: "Secteur"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 357,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4",
									children: "Localisation"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4 text-center",
									children: "Opportunités"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 359,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4 text-center",
									children: "Contacts"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 360,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4",
									children: "Dernier Statut"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "px-6 py-4 text-right",
									children: "Actions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 355,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 354,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("tbody", {
							className: "divide-y divide-border/40",
							children: filteredEntreprises.map((e) => /* @__PURE__ */ (void 0)("tr", {
								className: "hover:bg-muted/10 transition-colors cursor-pointer",
								onClick: () => setSelectedEntreprise(e),
								children: [
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground font-semibold text-xs border border-border/50",
												children: e.nom.slice(0, 2).toUpperCase()
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 369,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-semibold text-foreground hover:text-primary transition-colors",
												children: e.nom
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 372,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 368,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 367,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4 text-muted-foreground font-medium",
										children: e.secteur || "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 377,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4 text-muted-foreground font-medium",
										children: e.siege || "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 380,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4 text-center",
										children: /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center justify-center rounded-lg bg-muted px-2 py-0.5 text-xs font-semibold text-foreground border border-border/60",
											children: e.opportunites.length
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 384,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4 text-center",
										children: /* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center justify-center rounded-lg bg-sky-500/10 px-2 py-0.5 text-xs font-bold text-sky-500 border border-sky-500/20",
											children: e.contactsCount
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 389,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 388,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4",
										children: e.opportunites.length > 0 ? /* @__PURE__ */ (void 0)(StatutBadge, { statut: e.bestStatut }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 394,
											columnNumber: 52
										}, this) : /* @__PURE__ */ (void 0)("span", {
											className: "text-xs text-muted-foreground/60 italic",
											children: "Aucune"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 394,
											columnNumber: 92
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "px-6 py-4 text-right",
										onClick: (ev) => ev.stopPropagation(),
										children: /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: (ev) => handleToggleFavorite(ev, e),
												className: "p-1.5 text-muted-foreground hover:text-amber-500 rounded-lg hover:bg-muted/30 transition-all",
												children: /* @__PURE__ */ (void 0)(Heart, { className: `size-4 ${e.isFavorite ? "fill-amber-500 text-amber-500" : ""}` }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 401,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 400,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Button, {
												size: "sm",
												variant: "ghost",
												onClick: () => setSelectedEntreprise(e),
												className: "h-8 text-xs text-muted-foreground hover:text-foreground font-semibold px-2",
												children: "Fiche →"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 403,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 399,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 398,
										columnNumber: 21
									}, this)
								]
							}, e.id, true, {
								fileName: _jsxFileName,
								lineNumber: 366,
								columnNumber: 47
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 365,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 353,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 352,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 351,
				columnNumber: 66
			}, this),
			viewMode === "grid" && filteredEntreprises.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filteredEntreprises.map((e, i) => {
					return /* @__PURE__ */ (void 0)("div", {
						role: "button",
						tabIndex: 0,
						onClick: () => setSelectedEntreprise(e),
						onKeyDown: (ev) => {
							if (ev.key === "Enter" || ev.key === " ") {
								ev.preventDefault();
								setSelectedEntreprise(e);
							}
						},
						className: "glass-card-interactive group relative flex min-w-0 cursor-pointer flex-col gap-3.5 p-5 text-left",
						style: { animationDelay: `${Math.min(i, 12) * 35}ms` },
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-start gap-3 min-w-0",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-foreground font-semibold text-sm border border-white/15 backdrop-blur-md shadow-xs",
										children: e.nom.slice(0, 2).toUpperCase()
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 428,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (void 0)("h2", {
											className: "truncate text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors",
											children: e.nom
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 432,
											columnNumber: 23
										}, this), (e.secteur || e.siege) && /* @__PURE__ */ (void 0)("p", {
											className: "truncate text-xs text-muted-foreground mt-0.5",
											children: [e.secteur, e.siege].filter(Boolean).join(" · ")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 435,
											columnNumber: 50
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 431,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 427,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: (ev) => handleToggleFavorite(ev, e),
									title: e.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris",
									className: "shrink-0 p-1 text-muted-foreground/60 hover:text-amber-400 transition-colors cursor-pointer",
									children: /* @__PURE__ */ (void 0)(Heart, { className: `size-4 ${e.isFavorite ? "fill-amber-400 text-amber-400" : ""}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 442,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 441,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 426,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: `inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 ${e.opportunites.length > 0 ? "border-primary/30 bg-primary/10 text-primary font-medium" : "border-border/60 bg-card/60 text-muted-foreground/60"}`,
										children: [
											/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 449,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("strong", {
												className: "font-semibold text-foreground",
												children: e.opportunites.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 450,
												columnNumber: 21
											}, this),
											" ",
											"opportunité",
											e.opportunites.length > 1 ? "s" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 448,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: `inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 ${e.contactsCount > 0 ? "border-sky-500/30 bg-sky-500/10 text-sky-400 font-medium" : "border-border/60 bg-card/60 text-muted-foreground/60"}`,
										children: [
											/* @__PURE__ */ (void 0)(Users, { className: "size-3.5 text-sky-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 457,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("strong", {
												className: "font-semibold text-foreground",
												children: e.contactsCount
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 458,
												columnNumber: 21
											}, this),
											" ",
											"contact",
											e.contactsCount > 1 ? "s" : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 456,
										columnNumber: 19
									}, this),
									e.opportunites.length === 0 && e.contactsCount > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "ml-auto inline-flex items-center gap-1 rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-400",
										children: "Réseau"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 464,
										columnNumber: 74
									}, this),
									e.opportunites.length > 0 && /* @__PURE__ */ (void 0)("div", {
										className: "ml-auto",
										children: /* @__PURE__ */ (void 0)(StatutBadge, { statut: e.bestStatut }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 469,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 49
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 447,
								columnNumber: 17
							}, this),
							e.notes ? /* @__PURE__ */ (void 0)("p", {
								className: "line-clamp-2 text-xs italic text-muted-foreground bg-muted/30 rounded-lg px-2.5 py-1.5 border border-border/50",
								children: [
									"\"",
									e.notes,
									"\""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 474,
								columnNumber: 28
							}, this) : e.chiffresCles && e.chiffresCles.length > 0 ? /* @__PURE__ */ (void 0)("p", {
								className: "truncate text-xs text-muted-foreground/80",
								children: ["⭐ ", e.chiffresCles[0]]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 476,
								columnNumber: 72
							}, this) : null,
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 text-muted-foreground group-hover:text-foreground font-semibold transition-colors",
									children: [
										"Ouvrir la fiche",
										" ",
										/* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5 text-muted-foreground/80 group-hover:text-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 484,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 482,
									columnNumber: 19
								}, this), e.siteWeb && /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground/70",
									children: [/* @__PURE__ */ (void 0)(Globe, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 487,
										columnNumber: 23
									}, this), " Web"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 486,
									columnNumber: 33
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 481,
								columnNumber: 17
							}, this)
						]
					}, e.id, true, {
						fileName: _jsxFileName,
						lineNumber: 417,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 415,
				columnNumber: 65
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
				open: Boolean(selectedEntreprise),
				onOpenChange: (o) => !o && setSelectedEntreprise(null),
				size: "full",
				title: selectedEntreprise ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between gap-3 w-full pr-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/15 border border-indigo-500/35 text-indigo-100 font-bold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]",
							children: selectedEntreprise.nom.slice(0, 2).toUpperCase()
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate",
							children: selectedEntreprise.nom
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 502,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 498,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: (ev) => handleToggleFavorite(ev, selectedEntreprise),
						className: "shrink-0 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/12 text-muted-foreground transition-all cursor-pointer",
						title: selectedEntreprise.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `size-5 ${selectedEntreprise.isFavorite ? "fill-amber-500 text-amber-500" : ""}` }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 505,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 504,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 497,
					columnNumber: 149
				}, this) : "",
				description: selectedEntreprise ? [
					selectedEntreprise.secteur,
					selectedEntreprise.siege,
					selectedEntreprise.taille
				].filter(Boolean).join(" · ") : void 0,
				children: selectedEntreprise && (() => {
					const opps = getOpportunitiesForEntreprise(selectedEntreprise, candidatures);
					const cts = getContactsForEntreprise(selectedEntreprise, contacts);
					opps.length;
					selectedEntreprise.notes;
					opps.length;
					const hasDetails = !!(selectedEntreprise.siteWeb || selectedEntreprise.siege || selectedEntreprise.secteur || selectedEntreprise.taille);
					cts.length;
					return /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col gap-6 p-5 sm:p-6",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 shadow-sm w-full text-xs",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight",
											children: "Opp."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 520,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-bold text-primary",
											children: opps.length
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 523,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											onClick: () => handleAddOpportunityForCompany(selectedEntreprise),
											className: "text-primary hover:text-white p-1 rounded hover:bg-white/10 transition-colors",
											title: "Ajouter une opportunité",
											children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 527,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 526,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 519,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", { className: "h-3 w-px bg-white/10" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 530,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight",
										children: "Contacts"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 532,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-sm font-bold text-sky-400",
										children: cts.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 535,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 531,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", { className: "h-3 w-px bg-white/10" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 539,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight",
											children: "Notes"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 541,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-bold text-indigo-400",
											children: selectedEntreprise.notes ? 1 : 0
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 544,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											onClick: () => setIsEditingNotes(true),
											className: "text-indigo-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors",
											title: "Modifier les notes",
											children: /* @__PURE__ */ (void 0)(Pencil, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 548,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 547,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 540,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 518,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-8",
							children: [
								selectedEntreprise.description && /* @__PURE__ */ (void 0)("div", {
									className: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-xs leading-relaxed text-muted-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
									children: [/* @__PURE__ */ (void 0)("strong", {
										className: "block font-medium text-foreground mb-2 text-sm",
										children: "À propos de l'entreprise"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 557,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-muted-foreground/90",
										children: selectedEntreprise.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 560,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 556,
									columnNumber: 54
								}, this),
								hasDetails && /* @__PURE__ */ (void 0)("div", {
									className: "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-x-12 gap-y-4 text-xs",
										children: [
											selectedEntreprise.siteWeb && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight",
												children: "Site internet"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 569,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("a", {
												href: selectedEntreprise.siteWeb.startsWith("http") ? selectedEntreprise.siteWeb : `https://${selectedEntreprise.siteWeb}`,
												target: "_blank",
												rel: "noreferrer",
												className: "inline-flex items-center gap-1.5 font-bold text-blue-400 hover:text-blue-300 transition-colors break-all",
												children: [/* @__PURE__ */ (void 0)(Globe, { className: "size-3.5 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 573,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("span", { children: selectedEntreprise.siteWeb }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 574,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 572,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 568,
												columnNumber: 56
											}, this),
											selectedEntreprise.siege && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight",
												children: "Siège"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 579,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1.5 font-bold text-foreground",
												children: [/* @__PURE__ */ (void 0)(MapPin, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 583,
													columnNumber: 31
												}, this), selectedEntreprise.siege]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 582,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 578,
												columnNumber: 54
											}, this),
											selectedEntreprise.secteur && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight",
												children: "Secteur"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 589,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1.5 font-bold text-foreground",
												children: [/* @__PURE__ */ (void 0)(Building2, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 593,
													columnNumber: 31
												}, this), selectedEntreprise.secteur]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 592,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 588,
												columnNumber: 56
											}, this),
											selectedEntreprise.taille && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
												className: "text-muted-foreground font-medium mb-1.5 uppercase text-[10px] tracking-tight",
												children: "Taille"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 599,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1.5 font-bold text-foreground",
												children: [/* @__PURE__ */ (void 0)(Users, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 603,
													columnNumber: 31
												}, this), selectedEntreprise.taille]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 602,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 598,
												columnNumber: 55
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 567,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 566,
									columnNumber: 34
								}, this),
								selectedEntreprise.chiffresCles && selectedEntreprise.chiffresCles.length > 0 && /* @__PURE__ */ (void 0)("div", {
									className: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]",
									children: [/* @__PURE__ */ (void 0)("h4", {
										className: "mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70",
										children: "Repères stratégiques"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 612,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-2.5",
										children: selectedEntreprise.chiffresCles.map((metric, idx) => /* @__PURE__ */ (void 0)("span", {
											className: "rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-foreground font-medium backdrop-blur-md shadow-sm",
											children: metric
										}, idx, false, {
											fileName: _jsxFileName,
											lineNumber: 616,
											columnNumber: 81
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 615,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 611,
									columnNumber: 101
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-5",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between gap-2 border-b border-white/5 pb-2",
										children: [/* @__PURE__ */ (void 0)("h4", {
											className: "inline-flex items-center gap-2 text-sm font-semibold text-foreground",
											children: [
												/* @__PURE__ */ (void 0)(Users, { className: "size-4 text-sky-400" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 626,
													columnNumber: 25
												}, this),
												"Contacts réseau (",
												cts.length,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 625,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => {
												setSelectedContact({
													...emptyContact(),
													companyId: selectedEntreprise.id,
													entreprise: selectedEntreprise.nom
												});
												setContactSheetOpen(true);
											},
											className: "h-8 text-xs gap-1.5 rounded-lg border-white/10 bg-white/5 hover:bg-white/10",
											children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 637,
												columnNumber: 25
											}, this), " Ajouter un contact"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 629,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 21
									}, this), cts.length === 0 ? /* @__PURE__ */ (void 0)("div", {
										className: "rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center",
										children: [/* @__PURE__ */ (void 0)(Users, { className: "size-8 text-muted-foreground/20 mx-auto mb-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 642,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-muted-foreground",
											children: "Aucun contact réseau rattaché."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 643,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 641,
										columnNumber: 41
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
										children: cts.map((ct) => /* @__PURE__ */ (void 0)(ContactCard, {
											contact: ct,
											candidatures,
											hideCompanyTag: true,
											onOpenDetails: (contact) => {
												setSelectedContact(contact);
												setContactSheetOpen(true);
											},
											onOpenMessageIa: (contact) => {
												setSelectedContact(contact);
												setContactSheetOpen(true);
											},
											onOpenOpportunity: (oppId) => {
												setSelectedCandidatureId(oppId);
												setSheetOpen(true);
											}
										}, ct.id, false, {
											fileName: _jsxFileName,
											lineNumber: 647,
											columnNumber: 40
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 646,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 623,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-8 border-t border-border/40 pt-6 flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Dernière mise à jour le",
											" ",
											new Date(selectedEntreprise.updatedAt).toLocaleDateString("fr-FR")
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 662,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => setDeleteConfirmTarget(selectedEntreprise),
										className: "h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive",
										children: [/* @__PURE__ */ (void 0)(Trash2, { className: "mr-1.5 size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 667,
											columnNumber: 23
										}, this), " Supprimer l'entreprise"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 666,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 661,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 554,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 516,
						columnNumber: 16
					}, this);
				})()
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 497,
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
									lineNumber: 683,
									columnNumber: 35
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 682,
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
								lineNumber: 685,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 681,
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
									lineNumber: 693,
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
									lineNumber: 696,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 692,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Siège / Ville"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 702,
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
									lineNumber: 705,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 701,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 691,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Site web officiel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 713,
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
								lineNumber: 716,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 712,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Notes personnelles"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 723,
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
								lineNumber: 726,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 722,
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
								lineNumber: 733,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								className: "rounded-xl",
								children: "Enregistrer l'entreprise"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 736,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 732,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 680,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 679,
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
						lineNumber: 749,
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
								lineNumber: 755,
								columnNumber: 19
							}, this),
							".",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 760,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 761,
								columnNumber: 19
							}, this),
							"La suppression de l'entreprise détachera ces opportunités sans les effacer de votre suivi."
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 753,
							columnNumber: 117
						}, this) : "Cette entreprise sera retirée de votre suivi. Ses contacts associés seront conservés dans votre carnet d'adresses."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 752,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 748,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
						className: "rounded-xl",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 768,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						onClick: handleConfirmDeleteEntreprise,
						className: "rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90",
						children: "Supprimer"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 771,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 767,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 747,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 746,
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
				lineNumber: 781,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactImportModal, {
				open: importModalOpen,
				onOpenChange: setImportModalOpen,
				existingContacts: contacts,
				userSchool: profil?.ecole || profil?.formation,
				userTargetSector: profil?.posteCible || profil?.metierCible,
				onImportComplete: async (incoming, resolutions) => {
					return await batchImportContacts(incoming, resolutions);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 792,
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
				lineNumber: 799,
				columnNumber: 27
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 243,
		columnNumber: 10
	}, this);
}
//#endregion
export { EntreprisesPage as component };
