import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as Clock, D as RotateCcw, G as List, Gt as Building2, Pt as CircleAlert, Q as Layers, Ut as CalendarClock, W as LoaderCircle, bt as ExternalLink, dt as Funnel, k as Plus, ot as GripVertical, p as Trash2, tt as Kanban, w as Search, z as MapPin } from "../_libs/lucide-react.mjs";
import { Bt as todayIso, C as CandidatureSheet, G as AppShell, Ht as Button, Rt as statutToWorkflowStepKey, S as AlertDialogTitle, T as StatutBadge, Vt as transitionWorkflowStep, _ as AlertDialogCancel, at as STATUTS_OPPORTUNITE, b as AlertDialogFooter, ft as emptyCandidature, g as AlertDialogAction, h as AlertDialog, ht as formatDate, i as useCandidatures, o as useProfil, st as addDays, v as AlertDialogContent, x as AlertDialogHeader, y as AlertDialogDescription, yt as isDeadlineOverdue } from "./router-BFBvTUYb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunites-BFinow3h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/opportunites.tsx?tsr-split=component";
var ACCENTS_PANNEAUX = {
	Sauvegardée: {
		dot: "#71717a",
		bgBadge: "bg-zinc-500/10",
		textBadge: "text-zinc-400",
		borderHeader: "border-zinc-500/30"
	},
	"À préparer": {
		dot: "#f59e0b",
		bgBadge: "bg-amber-500/10",
		textBadge: "text-amber-400",
		borderHeader: "border-amber-500/30"
	},
	"À étudier": {
		dot: "#3b82f6",
		bgBadge: "bg-blue-500/10",
		textBadge: "text-blue-400",
		borderHeader: "border-blue-500/30"
	},
	"À candidater": {
		dot: "var(--primary)",
		bgBadge: "bg-primary/10",
		textBadge: "text-primary",
		borderHeader: "border-primary/30"
	}
};
function OpportunitesPage() {
	const { user, authLoading, items, patch, save, remove, syncing } = useCandidatures();
	const profil = useProfil(user);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [viewMode, setViewMode] = (0, import_react.useState)("all");
	const [displayLayout, setDisplayLayout] = (0, import_react.useState)("kanban");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [contractFilter, setContractFilter] = (0, import_react.useState)("all");
	const [draggedId, setDraggedId] = (0, import_react.useState)(null);
	const [dragOverColumn, setDragOverColumn] = (0, import_react.useState)(null);
	const [candidateToDelete, setCandidateToDelete] = (0, import_react.useState)(null);
	const today = todayIso();
	const filteredItems = (0, import_react.useMemo)(() => {
		return items.filter((c) => {
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase().trim();
				const matchEnterprise = (c.entreprise || "").toLowerCase().includes(q);
				const matchPoste = (c.poste || "").toLowerCase().includes(q);
				const matchLieu = (c.lieu || "").toLowerCase().includes(q);
				if (!matchEnterprise && !matchPoste && !matchLieu) return false;
			}
			if (contractFilter !== "all") {
				if ((c.contractType || "").toLowerCase() !== contractFilter.toLowerCase()) return false;
			}
			return true;
		});
	}, [
		items,
		searchQuery,
		contractFilter
	]);
	const overdueItems = (0, import_react.useMemo)(() => filteredItems.filter((c) => isDeadlineOverdue(c, today)), [filteredItems, today]);
	const availableContractTypes = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		items.forEach((c) => {
			if (c.contractType && c.contractType.trim()) set.add(c.contractType.trim());
		});
		return Array.from(set);
	}, [items]);
	const colonnes = (0, import_react.useMemo)(() => {
		const sourceItems = viewMode === "overdue" ? filteredItems.filter((c) => isDeadlineOverdue(c, today)) : filteredItems;
		return STATUTS_OPPORTUNITE.map((s) => ({
			statut: s,
			liste: sourceItems.filter((c) => {
				if (c.statut === s || c.currentStage === s) return true;
				if (s === "Sauvegardée" && c.currentWorkflowStep === "saved") return true;
				if (s === "À préparer" && c.currentWorkflowStep === "to_prepare") return true;
				return false;
			})
		}));
	}, [
		filteredItems,
		viewMode,
		today
	]);
	const urgentes = (0, import_react.useMemo)(() => filteredItems.filter((c) => (c.dateLimite || c.applicationDeadline) && (c.dateLimite || c.applicationDeadline) >= today && (c.dateLimite || c.applicationDeadline) <= addDays(today, 7)).sort((a, b) => (a.dateLimite || a.applicationDeadline || "").localeCompare(b.dateLimite || b.applicationDeadline || "")), [filteredItems, today]);
	const ouvrir = (c) => {
		setEditing(c);
		setOpen(true);
	};
	const handleMoveToStatut = (targetItem, targetStatut) => {
		if (targetItem.statut === targetStatut && targetItem.currentStage === targetStatut) return;
		const targetStepKey = statutToWorkflowStepKey(targetStatut);
		const patchData = transitionWorkflowStep(targetItem, targetStepKey);
		patch(targetItem.id, patchData);
		toast.success(`Opportunité déplacée vers « ${targetStatut} »`);
	};
	const handleDrop = (candidatureId, targetStatut) => {
		const targetItem = items.find((c) => c.id === candidatureId);
		if (!targetItem) return;
		handleMoveToStatut(targetItem, targetStatut);
	};
	const handleConfirmDelete = () => {
		if (!candidateToDelete) return;
		const id = candidateToDelete.id;
		const label = candidateToDelete.poste || candidateToDelete.entreprise || "l'opportunité";
		remove(id);
		setCandidateToDelete(null);
		if (editing?.id === id) {
			setOpen(false);
			setEditing(null);
		}
		toast.success(`« ${label} » a été supprimée.`);
	};
	const hasActiveFilters = searchQuery !== "" || contractFilter !== "all" || viewMode !== "all";
	const resetFilters = () => {
		setSearchQuery("");
		setContractFilter("all");
		setViewMode("all");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: "Vos Opportunités",
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => {
				setEditing(emptyCandidature());
				setOpen(true);
			},
			className: "shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4.5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 174,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Nouvelle opportunité" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 170,
			columnNumber: 19
		}, this),
		actions: authLoading || syncing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2 text-xs font-medium text-muted-foreground bg-card/60 px-3 py-1.5 rounded-xl border border-border/60",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "hidden sm:inline",
				children: "Synchronisation…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 176,
			columnNumber: 54
		}, this) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						"aria-label": "Filtres et modes d'affichage",
						className: "glass-panel flex flex-col gap-3.5 p-3.5 sm:p-4 shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-1 flex-wrap items-center gap-2.5 min-w-[260px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative flex-1 min-w-[200px]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 187,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "text",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											placeholder: "Filtrer par entreprise, poste, lieu…",
											className: "h-9.5 w-full rounded-xl bg-white/5 dark:bg-white/5 pl-9 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:bg-white/10 focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 188,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 186,
										columnNumber: 15
									}, this),
									availableContractTypes.length > 0 && /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Funnel, { className: "size-3.5 text-muted-foreground shrink-0 hidden sm:block" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 192,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: contractFilter,
											onChange: (e) => setContractFilter(e.target.value),
											className: "h-9.5 rounded-xl bg-white/5 dark:bg-white/5 px-3 text-xs font-normal text-foreground focus:outline-none backdrop-blur-md cursor-pointer transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]",
											children: [/* @__PURE__ */ (void 0)("option", {
												value: "all",
												className: "bg-[#12141C] text-foreground",
												children: "Tous les contrats"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 194,
												columnNumber: 21
											}, this), availableContractTypes.map((ct) => /* @__PURE__ */ (void 0)("option", {
												value: ct,
												className: "bg-[#12141C] text-foreground",
												children: ct
											}, ct, false, {
												fileName: _jsxFileName,
												lineNumber: 197,
												columnNumber: 55
											}, this))]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 191,
										columnNumber: 53
									}, this),
									hasActiveFilters && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: resetFilters,
										className: "inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline px-2.5 py-1.5 rounded-xl bg-primary/15 cursor-pointer transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
										children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 204,
											columnNumber: 19
										}, this), " Réinitialiser"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 203,
										columnNumber: 36
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1 rounded-xl bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setViewMode("all"),
										className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${viewMode === "all" ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]" : "text-muted-foreground hover:text-foreground"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 213,
												columnNumber: 19
											}, this),
											"Toutes",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `rounded-full px-1.5 py-0.2 text-[10px] font-mono ${viewMode === "all" ? "bg-white/15 text-foreground" : "bg-white/5 text-muted-foreground"}`,
												children: filteredItems.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 215,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setViewMode("overdue"),
										className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${viewMode === "overdue" ? "bg-destructive text-destructive-foreground font-semibold shadow-[0_2px_10px_rgba(240,68,56,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]" : overdueItems.length > 0 ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 221,
												columnNumber: 19
											}, this),
											"Retards",
											overdueItems.length > 0 && /* @__PURE__ */ (void 0)("span", {
												className: `rounded-full px-1.5 py-0.2 text-[10px] font-mono ${viewMode === "overdue" ? "bg-black/25 text-white" : "bg-destructive/20 text-destructive"}`,
												children: overdueItems.length
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 223,
												columnNumber: 47
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-0.5 rounded-xl bg-black/25 dark:bg-black/30 backdrop-blur-xl p-1 select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setDisplayLayout("kanban"),
										title: "Vue Kanban",
										className: `grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer ${displayLayout === "kanban" ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]" : "text-muted-foreground hover:text-foreground"}`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kanban, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 232,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 231,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setDisplayLayout("list"),
										title: "Vue Liste",
										className: `grid size-7.5 place-items-center rounded-lg transition-all cursor-pointer ${displayLayout === "list" ? "bg-white/15 dark:bg-white/15 text-foreground font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]" : "text-muted-foreground hover:text-foreground"}`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 235,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 9
					}, this),
					viewMode === "all" && overdueItems.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col justify-between gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 backdrop-blur-xl p-4 shadow-[0_8px_24px_rgba(240,68,56,0.15)] sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)("span", { className: "flex size-2.5 rounded-full bg-destructive shrink-0 shadow-[0_0_8px_rgba(240,68,56,0.8)]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-xs sm:text-sm font-semibold text-foreground",
								children: [
									overdueItems.length,
									" opportunité",
									overdueItems.length > 1 ? "s nécessitent" : " nécessite",
									" ",
									"votre attention"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: "La date limite de candidature est dépassée sans envoi enregistré."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setViewMode("overdue"),
							className: "shrink-0 border-destructive/40 text-xs font-semibold text-destructive hover:bg-destructive/20",
							children: "Afficher les retards"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 258,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 59
					}, this),
					viewMode === "all" && urgentes.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "glass-panel flex flex-col gap-2.5 p-4 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary",
							children: [/* @__PURE__ */ (void 0)(CalendarClock, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 15
							}, this), "Deadlines imminentes (7j)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: urgentes.map((c) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => ouvrir(c),
								className: "press inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/15 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:bg-primary/25 hover:border-primary/40 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "font-bold text-primary",
										children: c.entreprise
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 271,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground/60",
										children: "•"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 272,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground",
										children: formatDate(c.dateLimite || c.applicationDeadline)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 273,
										columnNumber: 19
									}, this)
								]
							}, c.id, true, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 34
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 55
					}, this),
					filteredItems.length === 0 && /* @__PURE__ */ (void 0)("div", {
						className: "glass-panel flex flex-col items-center justify-center border-dashed p-12 text-center",
						children: [
							/* @__PURE__ */ (void 0)(Building2, { className: "size-12 text-muted-foreground/50 mb-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("h3", {
								className: "text-base font-bold text-foreground",
								children: "Aucune opportunité trouvée"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md mt-1 mb-6",
								children: "Aucune candidature ne correspond à vos critères de recherche actuels."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								onClick: resetFilters,
								children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "size-4 mr-2" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 291,
									columnNumber: 15
								}, this), " Réinitialiser les filtres"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 290,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 281,
						columnNumber: 40
					}, this),
					filteredItems.length > 0 && displayLayout === "kanban" && /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-1 gap-4.5 md:grid-cols-2 lg:grid-cols-4",
						children: colonnes.map(({ statut, liste }) => {
							const isColumnHovered = dragOverColumn === statut;
							const accent = ACCENTS_PANNEAUX[statut] || {
								dot: "var(--primary)",
								bgBadge: "bg-secondary",
								textBadge: "text-foreground",
								borderHeader: "border-border"
							};
							return /* @__PURE__ */ (void 0)("section", {
								onDragOver: (e) => {
									e.preventDefault();
									e.dataTransfer.dropEffect = "move";
									if (dragOverColumn !== statut) setDragOverColumn(statut);
								},
								onDragLeave: (e) => {
									if (!e.currentTarget.contains(e.relatedTarget)) setDragOverColumn(null);
								},
								onDrop: (e) => {
									e.preventDefault();
									setDragOverColumn(null);
									const id = e.dataTransfer.getData("text/plain") || draggedId;
									if (id) handleDrop(id, statut);
									setDraggedId(null);
								},
								className: `flex min-h-[500px] flex-col rounded-2xl backdrop-blur-2xl transition-all duration-200 ${isColumnHovered ? "bg-white/[0.12] ring-2 ring-primary/50 border border-primary/40 shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_32px_rgba(216,26,69,0.25)]" : "glass-panel border-white/12 shadow-[0_12px_40px_-6px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.2)]"}`,
								children: [/* @__PURE__ */ (void 0)("header", {
									className: "flex shrink-0 items-center justify-between px-4 py-3.5 border-b border-white/10 bg-white/[0.04] backdrop-blur-md rounded-t-2xl",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "size-2.5 shrink-0 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]",
											style: { backgroundColor: accent.dot }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 330,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("h2", {
											className: "text-xs font-bold tracking-tight text-foreground uppercase",
											children: statut
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 333,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 329,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-white/10 border border-white/12 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-slate-300 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
										children: liste.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 337,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 328,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex-1 overflow-y-auto p-3 space-y-3",
									children: liste.length === 0 ? /* @__PURE__ */ (void 0)("div", {
										className: `flex h-full min-h-[140px] flex-col items-center justify-center rounded-xl p-4 text-center text-xs transition-all border border-dashed ${isColumnHovered ? "bg-primary/15 border-primary/40 text-primary font-medium" : "bg-white/[0.03] border-white/10 text-muted-foreground/60"}`,
										children: isColumnHovered ? /* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-xs",
											children: [
												"Déposer en « ",
												statut,
												" »"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 345,
											columnNumber: 44
										}, this) : viewMode === "overdue" ? /* @__PURE__ */ (void 0)("span", { children: "Aucun retard" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 347,
											columnNumber: 62
										}, this) : /* @__PURE__ */ (void 0)("span", { children: "Aucune opportunité" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 347,
											columnNumber: 90
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 344,
										columnNumber: 43
									}, this) : liste.map((c) => {
										const isOverdue = isDeadlineOverdue(c, today);
										return /* @__PURE__ */ (void 0)("article", {
											draggable: true,
											onDragStart: (e) => {
												e.dataTransfer.setData("text/plain", c.id);
												e.dataTransfer.effectAllowed = "move";
												setDraggedId(c.id);
											},
											onDragEnd: () => {
												setDraggedId(null);
												setDragOverColumn(null);
											},
											className: `group relative rounded-xl border p-3.5 transition-all duration-200 cursor-grab active:cursor-grabbing ${draggedId === c.id ? "opacity-35 ring-2 ring-primary border-primary scale-95" : isOverdue ? "border-destructive/40 bg-destructive/10 hover:border-destructive/70 hover:shadow-[0_8px_24px_rgba(240,68,56,0.25)]" : "glass-card-interactive shadow-sm hover:border-white/20"}`,
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-start justify-between gap-2",
													children: [/* @__PURE__ */ (void 0)("div", {
														onClick: () => ouvrir(c),
														className: "block min-w-0 flex-1 cursor-pointer",
														children: [/* @__PURE__ */ (void 0)("p", {
															className: "truncate text-[11px] font-medium text-muted-foreground transition-colors group-hover:text-foreground",
															children: c.entreprise || "Entreprise"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 362,
															columnNumber: 33
														}, this), /* @__PURE__ */ (void 0)("h3", {
															className: "truncate text-sm font-semibold text-foreground mt-0.5 tracking-tight",
															children: c.poste || "Poste sans titre"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 365,
															columnNumber: 33
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 361,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "flex shrink-0 items-center gap-0.5",
														children: [/* @__PURE__ */ (void 0)("span", {
															title: "Glisser pour déplacer",
															className: "cursor-grab p-1 text-muted-foreground/40 hover:text-muted-foreground",
															children: /* @__PURE__ */ (void 0)(GripVertical, { className: "size-3.5" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 372,
																columnNumber: 35
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 371,
															columnNumber: 33
														}, this), /* @__PURE__ */ (void 0)("button", {
															type: "button",
															"aria-label": `Supprimer ${c.poste}`,
															title: "Supprimer cette opportunité",
															onClick: (e) => {
																e.stopPropagation();
																setCandidateToDelete(c);
															},
															className: "rounded-lg p-1 text-muted-foreground/60 transition-all hover:bg-destructive/15 hover:text-destructive focus:opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer",
															children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 378,
																columnNumber: 35
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 374,
															columnNumber: 33
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 370,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 360,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "mt-2.5 flex flex-wrap items-center gap-1.5",
													children: [
														isOverdue && /* @__PURE__ */ (void 0)("span", {
															className: "inline-flex items-center gap-1 rounded-full border border-destructive/35 bg-destructive/15 px-2 py-0.5 text-[10px] font-medium text-destructive backdrop-blur-md",
															children: [
																/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-2.5" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 386,
																	columnNumber: 35
																}, this),
																"Expirée (",
																formatDate(c.applicationDeadline || c.dateLimite),
																")"
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 385,
															columnNumber: 45
														}, this),
														c.contractType && /* @__PURE__ */ (void 0)("span", {
															className: "rounded-lg bg-white/10 px-2 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-md",
															children: c.contractType
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 392,
															columnNumber: 50
														}, this),
														c.duration && /* @__PURE__ */ (void 0)("span", {
															className: "rounded-lg bg-white/7 px-2 py-0.5 text-[11px] text-slate-300 backdrop-blur-md",
															children: c.duration
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 396,
															columnNumber: 46
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 384,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "mt-3 flex items-center justify-between gap-1.5 text-xs text-muted-foreground border-t border-white/5 pt-2",
													children: [/* @__PURE__ */ (void 0)("div", {
														className: "flex items-center gap-2 truncate",
														children: [c.lieu && /* @__PURE__ */ (void 0)("span", {
															className: "inline-flex items-center gap-1 truncate text-[11px]",
															children: [/* @__PURE__ */ (void 0)(MapPin, { className: "size-3 shrink-0 text-muted-foreground/60" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 405,
																columnNumber: 37
															}, this), c.lieu]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 404,
															columnNumber: 44
														}, this), !isOverdue && (c.dateLimite || c.applicationDeadline) && /* @__PURE__ */ (void 0)("span", {
															className: (c.dateLimite || c.applicationDeadline) <= addDays(today, 7) ? "inline-flex items-center gap-1 font-semibold text-amber-400 text-[11px]" : "inline-flex items-center gap-1 text-[11px]",
															children: [/* @__PURE__ */ (void 0)(Clock, { className: "size-3 shrink-0" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 409,
																columnNumber: 39
															}, this), formatDate(c.dateLimite || c.applicationDeadline)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 408,
															columnNumber: 91
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 403,
														columnNumber: 31
													}, this), c.lien && /* @__PURE__ */ (void 0)("a", {
														href: c.lien,
														target: "_blank",
														rel: "noreferrer",
														onClick: (e) => e.stopPropagation(),
														className: "inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium text-primary hover:underline",
														children: ["Lien ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-2.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 415,
															columnNumber: 40
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 414,
														columnNumber: 42
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 402,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "mt-2.5 flex flex-wrap gap-1 border-t border-white/5 pt-2",
													children: STATUTS_OPPORTUNITE.filter((s) => s !== statut).slice(0, 3).map((s) => /* @__PURE__ */ (void 0)("button", {
														type: "button",
														onClick: (e) => {
															e.stopPropagation();
															handleMoveToStatut(c, s);
														},
														className: "rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:text-foreground cursor-pointer",
														children: ["→ ", s]
													}, s, true, {
														fileName: _jsxFileName,
														lineNumber: 421,
														columnNumber: 109
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 420,
													columnNumber: 29
												}, this)
											]
										}, c.id, true, {
											fileName: _jsxFileName,
											lineNumber: 351,
											columnNumber: 24
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 19
								}, this)]
							}, statut, true, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 18
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 68
					}, this),
					filteredItems.length > 0 && displayLayout === "list" && /* @__PURE__ */ (void 0)("div", {
						className: "glass-panel overflow-hidden shadow-md",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (void 0)("table", {
								className: "w-full text-left text-sm border-collapse",
								children: [/* @__PURE__ */ (void 0)("thead", { children: /* @__PURE__ */ (void 0)("tr", {
									className: "border-b border-white/10 bg-white/5 text-xs font-semibold text-muted-foreground backdrop-blur-md",
									children: [
										/* @__PURE__ */ (void 0)("th", {
											className: "px-5 py-3.5",
											children: "Entreprise & Poste"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-5 py-3.5",
											children: "Étape actuelle"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 442,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-5 py-3.5",
											children: "Contrat & Lieu"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 443,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-5 py-3.5",
											children: "Deadline"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 444,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("th", {
											className: "px-5 py-3.5 text-right",
											children: "Actions"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 440,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("tbody", {
									className: "divide-y divide-white/5",
									children: filteredItems.map((c) => {
										const isOverdue = isDeadlineOverdue(c, today);
										return /* @__PURE__ */ (void 0)("tr", {
											onClick: () => ouvrir(c),
											className: "group hover:bg-white/5 transition-colors cursor-pointer",
											children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "px-5 py-3.5",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "text-xs font-medium text-muted-foreground",
														children: c.entreprise || "Entreprise"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 453,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("p", {
														className: "text-sm font-semibold text-foreground mt-0.5",
														children: c.poste || "Poste sans titre"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 456,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 452,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-5 py-3.5",
													children: /* @__PURE__ */ (void 0)(StatutBadge, {
														statut: c.statut,
														size: "sm"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 461,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 460,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-5 py-3.5",
													children: /* @__PURE__ */ (void 0)("div", {
														className: "flex flex-col gap-0.5 text-xs text-muted-foreground",
														children: [/* @__PURE__ */ (void 0)("span", {
															className: "font-medium text-foreground",
															children: c.contractType || "—"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 465,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "text-[11px] text-muted-foreground/70",
															children: c.lieu || "Non spécifié"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 468,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 464,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 463,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-5 py-3.5",
													children: isOverdue ? /* @__PURE__ */ (void 0)("span", {
														className: "inline-flex items-center gap-1 text-xs font-medium text-destructive",
														children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 475,
															columnNumber: 31
														}, this), formatDate(c.applicationDeadline || c.dateLimite)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 474,
														columnNumber: 40
													}, this) : /* @__PURE__ */ (void 0)("span", {
														className: "text-xs text-muted-foreground font-mono",
														children: formatDate(c.applicationDeadline || c.dateLimite)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 477,
														columnNumber: 39
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 473,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "px-5 py-3.5 text-right",
													children: /* @__PURE__ */ (void 0)("div", {
														className: "flex items-center justify-end gap-1.5",
														onClick: (e) => e.stopPropagation(),
														children: [/* @__PURE__ */ (void 0)(Button, {
															variant: "outline",
															size: "sm",
															onClick: () => ouvrir(c),
															className: "h-8 px-3 text-xs",
															children: "Ouvrir"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 483,
															columnNumber: 29
														}, this), /* @__PURE__ */ (void 0)("button", {
															type: "button",
															onClick: () => setCandidateToDelete(c),
															className: "p-1.5 text-muted-foreground/60 hover:text-destructive rounded-lg hover:bg-destructive/15 transition-all cursor-pointer",
															title: "Supprimer",
															children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 487,
																columnNumber: 31
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 486,
															columnNumber: 29
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 482,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 481,
													columnNumber: 25
												}, this)
											]
										}, c.id, true, {
											fileName: _jsxFileName,
											lineNumber: 451,
											columnNumber: 24
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 448,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 438,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 437,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 436,
						columnNumber: 66
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 180,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
				open: Boolean(candidateToDelete),
				onOpenChange: (openDialog) => {
					if (!openDialog) setCandidateToDelete(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, {
					className: "border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, {
						className: "text-foreground",
						children: "Supprimer cette opportunité ?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 505,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, {
						className: "text-sm text-muted-foreground",
						children: [
							"Cette action est irréversible. L'opportunité «",
							" ",
							candidateToDelete?.poste || "Sans titre",
							" » chez «",
							" ",
							candidateToDelete?.entreprise || "Entreprise inconnue",
							" » sera définitivement supprimée."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 508,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 504,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
						className: "text-xs",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 516,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						className: "bg-destructive text-xs font-semibold text-destructive-foreground hover:bg-destructive/90",
						onClick: handleConfirmDelete,
						children: "Supprimer définitivement"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 517,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 515,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 503,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 500,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CandidatureSheet, {
				open,
				onOpenChange: setOpen,
				value: editing,
				profil,
				existingItems: items,
				onOpenExisting: (c) => {
					setEditing(c);
					setOpen(true);
				},
				onSave: async (c) => {
					await save(c);
					setOpen(false);
				},
				onDelete: (id) => {
					remove(id);
					setOpen(false);
					setEditing(null);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 525,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 167,
		columnNumber: 10
	}, this);
}
//#endregion
export { OpportunitesPage as component };
