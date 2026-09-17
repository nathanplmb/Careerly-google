import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Plus, Bt as CalendarClock, U as LoaderCircle, Y as Layers, kt as CircleAlert, m as Trash2, mt as ExternalLink, nt as GripVertical, wt as Clock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as isDeadlineOverdue, D as emptyCandidature, E as addDays, F as statutToWorkflowStepKey, I as todayIso, L as transitionWorkflowStep, _ as AlertDialogDescription, b as AlertDialogTitle, f as useProfil, g as AlertDialogContent, h as AlertDialogCancel, k as formatDate, l as useCandidatures, m as AlertDialogAction, p as AlertDialog, v as AlertDialogFooter, w as STATUTS_OPPORTUNITE, x as CandidatureSheet, y as AlertDialogHeader } from "./router-D-SxcmZd.mjs";
import { G as Button, l as AppShell } from "./router-D-SxcmZd2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunites-Cz60Egjv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/opportunites.tsx?tsr-split=component";
var ACCENTS_PANNEAUX = {
	Sauvegardée: {
		dot: "oklch(0.68 0.18 290)",
		border: "color-mix(in oklab, oklch(0.68 0.18 290) 25%, var(--border))"
	},
	"À préparer": {
		dot: "oklch(0.70 0.16 230)",
		border: "color-mix(in oklab, oklch(0.70 0.16 230) 25%, var(--border))"
	},
	"À étudier": {
		dot: "oklch(0.75 0.15 65)",
		border: "color-mix(in oklab, oklch(0.75 0.15 65) 25%, var(--border))"
	},
	"À candidater": {
		dot: "oklch(0.72 0.17 150)",
		border: "color-mix(in oklab, oklch(0.72 0.17 150) 25%, var(--border))"
	}
};
function OpportunitesPage() {
	const { user, authLoading, items, patch, save, remove, syncing } = useCandidatures();
	const profil = useProfil(user);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [viewMode, setViewMode] = (0, import_react.useState)("all");
	const [draggedId, setDraggedId] = (0, import_react.useState)(null);
	const [dragOverColumn, setDragOverColumn] = (0, import_react.useState)(null);
	const [candidateToDelete, setCandidateToDelete] = (0, import_react.useState)(null);
	const today = todayIso();
	const overdueItems = (0, import_react.useMemo)(() => items.filter((c) => isDeadlineOverdue(c, today)), [items, today]);
	const colonnes = (0, import_react.useMemo)(() => {
		const sourceItems = viewMode === "overdue" ? items.filter((c) => isDeadlineOverdue(c, today)) : items;
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
		items,
		viewMode,
		today
	]);
	const urgentes = (0, import_react.useMemo)(() => items.filter((c) => (c.dateLimite || c.applicationDeadline) && (c.dateLimite || c.applicationDeadline) >= today && (c.dateLimite || c.applicationDeadline) <= addDays(today, 7)).sort((a, b) => (a.dateLimite || a.applicationDeadline || "").localeCompare(b.dateLimite || b.applicationDeadline || "")), [items, today]);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Pipeline",
		title: "Opportunités",
		subtitle: "Visualisez et organisez votre pipeline en 4 espaces de travail",
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		headerExtra: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			onClick: () => {
				setEditing(emptyCandidature());
				setOpen(true);
			},
			className: "shadow-xs",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une opportunité" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 19
		}, this),
		actions: authLoading || syncing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-1.5 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin text-primary" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 125,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "hidden sm:inline",
				children: "Synchronisation…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 124,
			columnNumber: 54
		}, this) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
						"aria-label": "Contrôles du pipeline",
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/60 p-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setViewMode("all"),
								className: `flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${viewMode === "all" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 15
									}, this),
									"Toutes les colonnes",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `rounded-full px-1.5 py-0.2 text-[10px] font-bold ${viewMode === "all" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`,
										children: items.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setViewMode("overdue"),
								className: `flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${viewMode === "overdue" ? "bg-rose-600 text-white shadow-xs" : overdueItems.length > 0 ? "text-rose-500 hover:bg-rose-500/10 dark:text-rose-400" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 15
									}, this),
									"Deadlines dépassées",
									overdueItems.length > 0 && /* @__PURE__ */ (void 0)("span", {
										className: `rounded-full px-1.5 py-0.2 text-[10px] font-bold ${viewMode === "overdue" ? "bg-white/25 text-white" : "bg-rose-500/15 text-rose-600 dark:text-rose-400"}`,
										children: overdueItems.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 43
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 11
						}, this), viewMode === "overdue" && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 text-xs",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-muted-foreground",
								children: "Affichage filtré : opportunités expirées non envoyées"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setViewMode("all"),
								className: "font-semibold text-primary hover:underline",
								children: "Tout réafficher"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 38
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 9
					}, this),
					viewMode === "all" && overdueItems.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "pop-in flex flex-col justify-between gap-2.5 rounded-xl border border-rose-500/25 bg-rose-500/[0.04] p-3 shadow-xs sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)("span", { className: "flex size-2 rounded-full bg-rose-500 shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-semibold text-foreground",
								children: [
									overdueItems.length,
									" opportunité",
									overdueItems.length > 1 ? "s" : "",
									" nécessite",
									overdueItems.length > 1 ? "nt" : "",
									" votre attention"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[11px] text-muted-foreground",
								children: overdueItems.length > 1 ? "Plusieurs dates limites de candidature sont dépassées sans envoi." : "Une date limite de candidature est dépassée sans envoi enregistré."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setViewMode("overdue"),
							className: "h-7 shrink-0 self-start border-rose-500/30 text-xs font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 sm:self-auto",
							children: "Voir les retards"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 59
					}, this),
					viewMode === "all" && urgentes.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "pop-in flex flex-col gap-2 rounded-xl border border-border/60 bg-card/40 px-3.5 py-2.5 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (void 0)(CalendarClock, { className: "size-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 182,
								columnNumber: 15
							}, this), "Deadlines dans les 7 jours"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: urgentes.map((c) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => ouvrir(c),
								className: "press inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-foreground transition-colors hover:bg-primary/20",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-primary",
										children: c.entreprise
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground/60",
										children: "•"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 190,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground",
										children: formatDate(c.dateLimite || c.applicationDeadline)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 191,
										columnNumber: 19
									}, this)
								]
							}, c.id, true, {
								fileName: _jsxFileName,
								lineNumber: 186,
								columnNumber: 34
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 55
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5",
						children: colonnes.map(({ statut, liste }, i) => {
							const isColumnHovered = dragOverColumn === statut;
							const accent = ACCENTS_PANNEAUX[statut] || {
								dot: "var(--primary)",
								border: "var(--border)"
							};
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
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
								className: `pop-in flex h-[480px] flex-col rounded-2xl border transition-all duration-200 lg:h-[520px] ${isColumnHovered ? "border-primary/60 bg-primary/[0.03] ring-2 ring-primary/40 shadow-md" : "border-border/60 bg-card/45 shadow-xs hover:border-border/80"}`,
								style: { animationDelay: `${i * 40}ms` },
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
									className: "flex shrink-0 items-center justify-between border-b border-border/50 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "size-2.5 shrink-0 rounded-full shadow-xs",
											style: { backgroundColor: accent.dot }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 233,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
											className: "text-sm font-bold tracking-tight text-foreground",
											children: statut
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 236,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 232,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-muted/60 px-2 py-0.5 text-xs font-semibold text-muted-foreground",
										children: liste.length
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 240,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 overflow-y-auto p-3.5 space-y-2.5",
									children: [liste.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `flex h-full min-h-[160px] flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center text-xs transition-colors ${isColumnHovered ? "border-primary/50 bg-primary/5 text-primary" : "border-border/50 text-muted-foreground"}`,
										children: isColumnHovered ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold",
											children: [
												"Déposer ici pour passer en « ",
												statut,
												" »"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 248,
											columnNumber: 42
										}, this) : viewMode === "overdue" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Aucune deadline dépassée dans ce panneau." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 250,
											columnNumber: 60
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Aucune opportunité dans ce panneau." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 250,
											columnNumber: 117
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 41
									}, this) : liste.map((c) => {
										const isOverdue = isDeadlineOverdue(c, today);
										const isBeingDragged = draggedId === c.id;
										return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
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
											className: `group relative rounded-xl border p-3 transition-all duration-150 cursor-grab active:cursor-grabbing ${isBeingDragged ? "opacity-40 ring-2 ring-primary border-primary scale-[0.98]" : isOverdue ? "border-rose-500/40 bg-card/90 hover:border-rose-500 shadow-xs" : "border-border/60 bg-card/75 hover:bg-card hover:border-border hover:shadow-xs"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-start justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														onClick: () => ouvrir(c),
														className: "block min-w-0 flex-1 cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
															className: "truncate text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary",
															children: c.entreprise || "Entreprise inconnue"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 265,
															columnNumber: 31
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
															className: "truncate text-[13.5px] font-semibold text-foreground",
															children: c.poste || "Poste sans titre"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 268,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 264,
														columnNumber: 29
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex shrink-0 items-center gap-0.5",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															title: "Glisser pour déplacer",
															className: "cursor-grab p-1 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/70",
															children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GripVertical, { className: "size-3.5" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 275,
																columnNumber: 33
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 274,
															columnNumber: 31
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
															type: "button",
															"aria-label": `Supprimer l'opportunité ${c.poste}`,
															title: "Supprimer cette opportunité",
															onClick: (e) => {
																e.stopPropagation();
																setCandidateToDelete(c);
															},
															className: "rounded-md p-1 text-muted-foreground opacity-70 transition-all hover:bg-destructive/10 hover:text-destructive focus:opacity-100 sm:opacity-0 group-hover:opacity-100",
															children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 281,
																columnNumber: 33
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 277,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 273,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 263,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "mt-2 flex flex-wrap items-center gap-1.5",
													children: [
														isOverdue && /* @__PURE__ */ (void 0)("span", {
															className: "inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400",
															children: [
																/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 289,
																	columnNumber: 33
																}, this),
																"Deadline dépassée (",
																formatDate(c.applicationDeadline || c.dateLimite),
																")"
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 288,
															columnNumber: 43
														}, this),
														c.contractType && /* @__PURE__ */ (void 0)("span", {
															className: "rounded-md bg-primary/10 px-2 py-0.5 text-[10.5px] font-medium text-primary",
															children: c.contractType
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 295,
															columnNumber: 48
														}, this),
														c.duration && /* @__PURE__ */ (void 0)("span", {
															className: "rounded-md bg-muted px-1.5 py-0.5 text-[10.5px] text-muted-foreground",
															children: c.duration
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 299,
															columnNumber: 44
														}, this),
														Array.isArray(c.companyMetrics) && c.companyMetrics.length > 0 && /* @__PURE__ */ (void 0)("span", {
															className: "rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400",
															children: [
																c.companyMetrics.length,
																" métrique",
																c.companyMetrics.length > 1 ? "s" : ""
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 303,
															columnNumber: 96
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 287,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-center gap-2 truncate",
														children: [
															c.lieu && /* @__PURE__ */ (void 0)("span", {
																className: "truncate",
																children: c.lieu
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 312,
																columnNumber: 42
															}, this),
															c.lieu && (c.dateLimite || c.applicationDeadline) && /* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 313,
																columnNumber: 85
															}, this),
															!isOverdue && (c.dateLimite || c.applicationDeadline) && /* @__PURE__ */ (void 0)("span", {
																className: (c.dateLimite || c.applicationDeadline) <= addDays(today, 7) ? "inline-flex items-center gap-1 font-medium text-primary" : "inline-flex items-center gap-1",
																children: [/* @__PURE__ */ (void 0)(Clock, { className: "size-3 shrink-0" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 315,
																	columnNumber: 37
																}, this), formatDate(c.dateLimite || c.applicationDeadline)]
															}, void 0, true, {
																fileName: _jsxFileName,
																lineNumber: 314,
																columnNumber: 89
															}, this)
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 311,
														columnNumber: 29
													}, this), c.lien && /* @__PURE__ */ (void 0)("a", {
														href: c.lien,
														target: "_blank",
														rel: "noreferrer",
														onClick: (e) => e.stopPropagation(),
														className: "inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-primary hover:underline",
														children: ["Offre ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 321,
															columnNumber: 39
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 320,
														columnNumber: 40
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 310,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "mt-2 flex flex-wrap gap-1 border-t border-border/40 pt-1.5",
													children: STATUTS_OPPORTUNITE.filter((s) => s !== statut).slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
														type: "button",
														onClick: (e) => {
															e.stopPropagation();
															handleMoveToStatut(c, s);
														},
														className: "rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-foreground",
														children: ["→ ", s]
													}, s, true, {
														fileName: _jsxFileName,
														lineNumber: 327,
														columnNumber: 107
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 326,
													columnNumber: 27
												}, this)
											]
										}, c.id, true, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 24
										}, this);
									}), isColumnHovered && liste.length > 0 && /* @__PURE__ */ (void 0)("div", {
										className: "rounded-xl border border-dashed border-primary/50 bg-primary/5 py-2.5 text-center text-xs font-medium text-primary animate-pulse",
										children: [
											"Déposer ici pour passer en « ",
											statut,
											" »"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 338,
										columnNumber: 59
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 17
								}, this)]
							}, statut, true, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 18
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
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
						lineNumber: 353,
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
							" » ainsi que ses événements associés et notes de suivi seront définitivement supprimés."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 356,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 352,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
						className: "text-xs",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 365,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						className: "bg-destructive text-xs font-semibold text-destructive-foreground hover:bg-destructive/90",
						onClick: handleConfirmDelete,
						children: "Supprimer définitivement"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 366,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 364,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 351,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 348,
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
				lineNumber: 374,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 115,
		columnNumber: 10
	}, this);
}
//#endregion
export { OpportunitesPage as component };
