import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as Route$21 } from "./router-DNaWCfYI.mjs";
import { t as Button } from "./button-DDzEUEFj.mjs";
import { At as ChevronDown, Bt as Bell, D as RefreshCw, E as RotateCcw, I as MapPin, O as Plus, Pt as CalendarClock, S as Search, St as CloudOff, V as LoaderCircle, Wt as ArrowDownUp, gt as Download, j as Pencil, jt as Check, mt as EllipsisVertical, o as User, p as Trash2, pt as ExternalLink, v as Sparkles, x as Send } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { s as Input } from "./dialog-B3Jp4UDR.mjs";
import { c as formatDate, i as addDays, m as todayIso, o as emptyCandidature, p as toCsv, r as STATUTS } from "./candidatures-ck14d0Ow.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as offreAnalysable, i as niveauMatch, n as lancerAnalyse, r as matchObsolete } from "./match-run-CVvUCz6E.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-BqqfhG9v.mjs";
import { t as useProfil } from "./useProfil-Batqat5N.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { t as MatchBadge } from "./MatchBadge-DYQ5Ndxo.mjs";
import { t as ImportIaDialog } from "./ImportIaDialog-lfrLZkNA.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BJcYi82e.mjs";
import { t as StatutBadge } from "./StatutBadge-B9ErESh7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-CR4BHLqZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/StatutQuickSelect.tsx";
function StatutQuickSelect({ statut, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		"aria-label": "Changer le statut",
		className: "inline-flex items-center gap-1 rounded-full outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatutBadge, { statut }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 23,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 24,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 19,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "start",
		className: "w-64",
		children: STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
			onSelect: () => onChange(s),
			className: "gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: `size-4 ${s === statut ? "opacity-100" : "opacity-0"}` }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 33,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "text-sm",
				children: s
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 36,
				columnNumber: 13
			}, this)]
		}, s, true, {
			fileName: _jsxFileName$2,
			lineNumber: 28,
			columnNumber: 11
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 26,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 18,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/CandidatureCard.tsx";
/** Carte candidature : format compact, lisible sur mobile comme sur desktop. */
function CandidatureCard({ c, index = 0, profil, analyse, onStatut, onOuvrir, onPostuler, onRelancer, onAnalyser, onSupprimer }) {
	const today = todayIso();
	const limiteDepassee = !!c.dateLimite && c.dateLimite < today;
	const limiteProche = !!c.dateLimite && !limiteDepassee && c.dateLimite <= addDays(today, 7);
	const relanceDue = !!c.dateRelance && c.dateRelance <= today && c.statut === "J'ai postulé";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "glass-card pop-in flex min-w-0 flex-col gap-3 p-4 transition-colors hover:border-primary/40",
		style: { animationDelay: `${Math.min(index, 12) * 40}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "flex min-w-0 items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: onOuvrir,
					className: "min-w-0 flex-1 text-left",
					"aria-label": `Ouvrir ${c.entreprise}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "truncate text-[15px] font-bold leading-tight",
						children: c.entreprise || "Sans entreprise"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 79,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-0.5 line-clamp-2 text-[13px] text-muted-foreground",
						children: c.poste || "Poste non précisé"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 82,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 73,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Plus d'actions",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EllipsisVertical, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 90,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 89,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 88,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
					align: "end",
					className: "w-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							onSelect: onOuvrir,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 95,
								columnNumber: 15
							}, this), " Modifier"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 94,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							onSelect: onPostuler,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 98,
								columnNumber: 15
							}, this), " Marquer postulé (relance J+10)"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 97,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							onSelect: onRelancer,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 101,
								columnNumber: 15
							}, this), " Marquer relancé"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							onSelect: onAnalyser,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 104,
								columnNumber: 15
							}, this), " Analyser avec l'IA"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 103,
							columnNumber: 13
						}, this),
						c.lien ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: c.lien,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 109,
									columnNumber: 19
								}, this), " Voir l'offre"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 108,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 107,
							columnNumber: 15
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 113,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
							onSelect: onSupprimer,
							className: "text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 118,
								columnNumber: 15
							}, this), " Supprimer"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 114,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 93,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 87,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 72,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatutQuickSelect, {
					statut: c.statut,
					onChange: onStatut
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 125,
					columnNumber: 9
				}, this), analyse ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 128,
						columnNumber: 13
					}, this), " Analyse…"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 127,
					columnNumber: 11
				}, this) : c.match ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: onAnalyser,
					title: "Ré-analyser avec l'IA",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MatchBadge, {
						match: c.match,
						obsolete: matchObsolete(c, profil)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 136,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 131,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: onAnalyser,
					className: "h-7 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 145,
						columnNumber: 13
					}, this), " Analyser"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 139,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 124,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground",
				children: [
					c.lieu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "inline-flex min-w-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-3.5 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 153,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate",
							children: c.lieu
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 154,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 152,
						columnNumber: 11
					}, this) : null,
					c.contact ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "inline-flex min-w-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-3.5 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 159,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate",
							children: c.contact
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 160,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 158,
						columnNumber: 11
					}, this) : null,
					c.dateEnvoi ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: ["Envoyée le ", formatDate(c.dateEnvoi)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 163,
						columnNumber: 24
					}, this) : null
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 150,
				columnNumber: 7
			}, this),
			(c.dateLimite || relanceDue) && /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-wrap gap-2",
				children: [c.dateLimite ? /* @__PURE__ */ (void 0)("span", {
					className: `inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${limiteDepassee ? "bg-destructive/15 text-destructive" : limiteProche ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
					children: [
						/* @__PURE__ */ (void 0)(CalendarClock, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 178,
							columnNumber: 15
						}, this),
						limiteDepassee ? "Expirée le " : "Limite ",
						formatDate(c.dateLimite)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 169,
					columnNumber: 13
				}, this) : null, relanceDue ? /* @__PURE__ */ (void 0)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] px-2 py-1 text-[11px] font-semibold text-[var(--warning)]",
					children: [/* @__PURE__ */ (void 0)(Bell, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 185,
						columnNumber: 15
					}, this), " Relance à faire"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 184,
					columnNumber: 13
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 167,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-auto flex gap-2 pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "secondary",
						className: "flex-1",
						onClick: onPostuler,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 198,
							columnNumber: 11
						}, this), " Postulé"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 192,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "secondary",
						className: "flex-1",
						onClick: onRelancer,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 206,
							columnNumber: 11
						}, this), " Relancé"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 200,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onOuvrir,
						"aria-label": "Modifier",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 214,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 208,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 191,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 68,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/candidatures.tsx?tsr-split=component";
function CandidaturesPage() {
	const recherche = Route$21.useSearch();
	const { user, authLoading, items, setItems, syncing, patch, remove, save } = useCandidatures();
	const profil = useProfil(user);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filtre, setFiltre] = (0, import_react.useState)(recherche.statut ?? "tous");
	const [vue, setVue] = (0, import_react.useState)(recherche.vue ?? "toutes");
	const [filtreLieu, setFiltreLieu] = (0, import_react.useState)("tous");
	const [filtreMatch, setFiltreMatch] = (0, import_react.useState)("tous");
	const [analyseId, setAnalyseId] = (0, import_react.useState)(null);
	const [majMatchs, setMajMatchs] = (0, import_react.useState)(null);
	const [sortKey, setSortKey] = (0, import_react.useState)("dateEnvoi");
	const [sortAsc, setSortAsc] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [iaOpen, setIaOpen] = (0, import_react.useState)(false);
	const today = todayIso();
	const lieux = (0, import_react.useMemo)(() => Array.from(new Set(items.map((c) => c.lieu).filter(Boolean))).sort(), [items]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		const list = items.filter((c) => {
			const okStatut = filtre === "tous" || c.statut === filtre;
			const okLieu = filtreLieu === "tous" || c.lieu === filtreLieu;
			const okSearch = !q || [
				c.entreprise,
				c.poste,
				c.lieu,
				c.contact,
				c.commentaire
			].join(" ").toLowerCase().includes(q);
			const score = c.match?.global;
			const okMatch = filtreMatch === "tous" || (filtreMatch === "aucun" ? typeof score !== "number" : typeof score === "number" && niveauMatch(score).cle === filtreMatch);
			const okVue = vue === "toutes" || (vue === "relances" ? !!c.dateRelance && c.dateRelance <= today && c.statut === "J'ai postulé" : vue === "deadlines" ? !!c.dateLimite && c.dateLimite >= today && c.dateLimite <= addDays(today, 7) : true);
			return okStatut && okLieu && okSearch && okMatch && okVue;
		});
		const dir = sortAsc ? 1 : -1;
		return [...list].sort((a, b) => {
			if (sortKey === "statut") return (STATUTS.indexOf(a.statut) - STATUTS.indexOf(b.statut)) * dir;
			if (sortKey === "match") return ((a.match?.global ?? -1) - (b.match?.global ?? -1)) * dir;
			const av = a[sortKey] ?? "";
			const bv = b[sortKey] ?? "";
			if (!av && bv) return 1;
			if (av && !bv) return -1;
			return av.localeCompare(bv, "fr", { numeric: true }) * dir;
		});
	}, [
		items,
		search,
		filtre,
		filtreLieu,
		filtreMatch,
		vue,
		today,
		sortKey,
		sortAsc
	]);
	const TRIS = [
		{
			cle: "dateEnvoi",
			libelle: "Plus récentes",
			asc: false
		},
		{
			cle: "dateEnvoi",
			libelle: "Plus anciennes",
			asc: true
		},
		{
			cle: "dateLimite",
			libelle: "Date limite proche",
			asc: true
		},
		{
			cle: "match",
			libelle: "Meilleur match IA",
			asc: false
		},
		{
			cle: "entreprise",
			libelle: "Entreprise (A→Z)",
			asc: true
		},
		{
			cle: "poste",
			libelle: "Poste (A→Z)",
			asc: true
		},
		{
			cle: "statut",
			libelle: "État d'avancement",
			asc: true
		},
		{
			cle: "dateRelance",
			libelle: "Relance la plus urgente",
			asc: true
		}
	];
	const triValeur = `${sortKey}:${sortAsc ? "asc" : "desc"}`;
	const marquerPostule = (c) => patch(c.id, {
		statut: "J'ai postulé",
		dateEnvoi: today,
		dateRelance: addDays(today, 10),
		dateDernierContact: today
	});
	const marquerRelance = (c) => patch(c.id, {
		statut: "J'ai relancé",
		dateRelance: c.dateRelance || today,
		dateDernierContact: today
	});
	const analyserLigne = async (c) => {
		if (!profil) {
			toast.error("Complétez d'abord votre profil pour lancer l'analyse.");
			return;
		}
		if (!offreAnalysable(c)) {
			toast.error("Ajoutez le détail de l'offre avant de lancer l'analyse.");
			return;
		}
		setAnalyseId(c.id);
		try {
			const match = await lancerAnalyse(c, profil);
			patch(c.id, { match });
			toast.success(`Analyse terminée : ${match.global} / 100`);
		} catch (e) {
			toast.error(texteErreurIA(e));
		} finally {
			setAnalyseId(null);
		}
	};
	const rafraichirMatchs = async () => {
		if (!profil || majMatchs) return;
		const cibles = items.filter((c) => offreAnalysable(c) && (!c.match || matchObsolete(c, profil)));
		if (cibles.length === 0) {
			toast.info("Tous les matchs IA sont à jour.");
			return;
		}
		setMajMatchs({
			fait: 0,
			total: cibles.length
		});
		let erreurs = 0;
		let messageErreur = "";
		for (const [i, c] of cibles.entries()) {
			try {
				const match = await lancerAnalyse(c, profil);
				patch(c.id, { match });
			} catch (e) {
				erreurs += 1;
				messageErreur = texteErreurIA(e);
				if (/crédit|quota|limite|connectez-vous|indisponible|désactiv/i.test(messageErreur)) {
					setMajMatchs({
						fait: i + 1,
						total: cibles.length
					});
					break;
				}
			}
			setMajMatchs({
				fait: i + 1,
				total: cibles.length
			});
		}
		setMajMatchs(null);
		const ok = cibles.length - erreurs;
		if (erreurs && ok === 0) toast.error(messageErreur || "Mise à jour des matchs IA impossible.");
		else if (erreurs) toast.warning(`${ok} match(s) mis à jour, ${erreurs} en échec.`);
		else toast.success(`${ok} match(s) IA mis à jour.`);
	};
	const exportCsv = () => {
		const blob = new Blob(["﻿" + toCsv(items)], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "careerly-candidatures.csv";
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Suivi",
		title: "Mes candidatures",
		subtitle: `${items.length} opportunité(s) suivie(s)`,
		searchValue: search,
		onSearch: setSearch,
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 202,
			columnNumber: 29
		}, this) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative flex-1 sm:min-w-56",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Rechercher une entreprise, un poste, une ville…",
							className: "pl-9"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: filtre,
						onValueChange: setFiltre,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							className: "sm:w-56",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "tous",
							children: "Tous les statuts"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 13
						}, this), STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: s,
							children: s
						}, s, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 31
						}, this))] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: filtreLieu,
						onValueChange: setFiltreLieu,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							className: "sm:w-44",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: "tous",
							children: "Tous les lieux"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 224,
							columnNumber: 13
						}, this), lieux.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: l,
							children: l
						}, l, false, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 29
						}, this))] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: filtreMatch,
						onValueChange: setFiltreMatch,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							className: "sm:w-48",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "tous",
								children: "Tous les matchs"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "excellent",
								children: "Excellent match"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "tres-bon",
								children: "Très bon match"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "interessant",
								children: "Match intéressant"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "faible",
								children: "Match faible"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "aucun",
								children: "Non analysé"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: vue,
						onValueChange: setVue,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							className: "sm:w-48",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 245,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "toutes",
								children: "Toutes les candidatures"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "relances",
								children: "Relances à faire"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: "deadlines",
								children: "Deadlines < 7 jours"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
						value: triValeur,
						onValueChange: (v) => {
							const [k, sens] = v.split(":");
							setSortKey(k);
							setSortAsc(sens === "asc");
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
							className: "sm:w-56",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDownUp, { className: "size-4 shrink-0 opacity-70" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 259,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 260,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 258,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TRIS.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
							value: `${t.cle}:${t.asc ? "asc" : "desc"}`,
							children: t.libelle
						}, t.libelle, false, {
							fileName: _jsxFileName,
							lineNumber: 263,
							columnNumber: 28
						}, this)) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						onClick: () => {
							setSearch("");
							setFiltre("tous");
							setFiltreLieu("tous");
							setFiltreMatch("tous");
							setVue("toutes");
							setSortKey("dateEnvoi");
							setSortAsc(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 277,
							columnNumber: 11
						}, this), " Réinitialiser"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						onClick: () => setIaOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 11
						}, this), " Analyser une offre (IA)"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "secondary",
						disabled: !!majMatchs || !profil,
						onClick: () => void rafraichirMatchs(),
						children: majMatchs ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 15
							}, this),
							" Matchs IA ",
							majMatchs.fait,
							"/",
							majMatchs.total
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 283,
							columnNumber: 24
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 15
						}, this), " Actualiser les matchs IA"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 291,
							columnNumber: 11
						}, this), " Export CSV"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 290,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => {
							setEditing(emptyCandidature());
							setOpen(true);
						},
						className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 297,
							columnNumber: 11
						}, this), " Ajouter"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 293,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						filtered.length,
						" candidature(s) affichée(s) sur ",
						items.length
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 302,
					columnNumber: 9
				}, this), items.length > 0 && /* @__PURE__ */ (void 0)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => {
						if (window.confirm("Êtes-vous sûr de vouloir supprimer TOUTES vos candidatures ? Cette action est irréversible.")) {
							items.forEach((c) => remove(c.id));
							toast.success("Toutes les candidatures ont été supprimées.");
						}
					},
					className: "h-7 px-2 text-xs text-muted-foreground hover:text-destructive",
					children: "Tout effacer"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 306,
					columnNumber: 30
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 301,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((c, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CandidatureCard, {
					c,
					index: i,
					profil,
					analyse: analyseId === c.id,
					onStatut: (s) => patch(c.id, { statut: s }),
					onOuvrir: () => {
						setEditing(c);
						setOpen(true);
					},
					onPostuler: () => marquerPostule(c),
					onRelancer: () => marquerRelance(c),
					onAnalyser: () => void analyserLigne(c),
					onSupprimer: () => remove(c.id)
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 317,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 316,
				columnNumber: 7
			}, this),
			filtered.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card mt-3 space-y-4 p-10 text-center text-sm text-muted-foreground",
				children: items.length === 0 ? /* @__PURE__ */ (void 0)("div", {
					className: "mx-auto max-w-md space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-xl font-bold text-purple-400",
							children: "🎯"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 327,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-base font-bold text-foreground",
							children: "Aucune candidature pour le moment"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 330,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Votre tableau de bord est prêt. Ajoutez votre première offre ou importez une fiche de poste via l'assistant IA."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 333,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center justify-center gap-2 pt-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								onClick: () => {
									setEditing(emptyCandidature());
									setOpen(true);
								},
								className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-semibold text-white",
								children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 19
								}, this), " Ajouter une candidature"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setIaOpen(true),
								className: "gap-1.5 border-purple-500/30 text-xs text-purple-300",
								children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 345,
									columnNumber: 19
								}, this), " Analyser une offre (IA)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 326,
					columnNumber: 33
				}, this) : "Aucune candidature ne correspond à vos filtres actuels."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 33
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground",
				children: syncing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 353,
					columnNumber: 13
				}, this), " Synchronisation en cours…"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 352,
					columnNumber: 20
				}, this) : user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
					"Vos candidatures sont synchronisées sur votre compte ",
					user.email,
					"."
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 355,
					columnNumber: 24
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudOff, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 358,
						columnNumber: 13
					}, this),
					" Données enregistrées uniquement dans ce navigateur —",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						className: "text-primary hover:underline",
						children: "créez un compte"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 360,
						columnNumber: 13
					}, this),
					" ",
					"pour y accéder partout."
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 357,
					columnNumber: 17
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 351,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImportIaDialog, {
				open: iaOpen,
				onOpenChange: setIaOpen,
				onResult: (c) => {
					setEditing(c);
					setOpen(true);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 367,
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
				lineNumber: 372,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 199,
		columnNumber: 10
	}, this);
}
//#endregion
export { CandidaturesPage as component };
