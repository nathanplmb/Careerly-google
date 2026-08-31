import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Plus, P as MapPin, St as ArrowDownUp, T as RefreshCw, _ as Sparkles, at as CloudOff, b as Send, dt as ChevronDown, f as Trash2, ft as Check, k as Pencil, mt as CalendarClock, nt as EllipsisVertical, o as User, rt as Download, tt as ExternalLink, vt as Bell, w as RotateCcw, x as Search, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { j as Button, o as Input, r as Route$21 } from "./router-WcHZLW5p.mjs";
import { t as AppShell } from "./AppShell-CtCpxTdT.mjs";
import { c as emptyCandidature, h as todayIso, i as STATUTS, m as toCsv, o as addDays, u as formatDate } from "./candidatures-0RcN-a4_.mjs";
import { t as useCandidatures } from "./useCandidatures-hl-bBqH6.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { t as useProfil } from "./useProfil-DVAoJvSn.mjs";
import { a as offreAnalysable, i as niveauMatch, n as lancerAnalyse, r as matchObsolete } from "./match-run-r33f9orm.mjs";
import { t as MatchBadge } from "./MatchBadge-CPAhh90R.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-BVTdzn43.mjs";
import { t as ImportIaDialog } from "./ImportIaDialog-Dik-HWvQ.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DemMJ4FS.mjs";
import { t as StatutBadge } from "./StatutBadge-CD_GFVpP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-Bg-D2Nug.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatutQuickSelect({ statut, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		"aria-label": "Changer le statut",
		className: "inline-flex items-center gap-1 rounded-full outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatutBadge, { statut }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-muted-foreground" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "start",
		className: "w-64",
		children: STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onSelect: () => onChange(s),
			className: "gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: `size-4 ${s === statut ? "opacity-100" : "opacity-0"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: s
			})]
		}, s))
	})] });
}
/** Carte candidature : format compact, lisible sur mobile comme sur desktop. */
function CandidatureCard({ c, index = 0, profil, analyse, onStatut, onOuvrir, onPostuler, onRelancer, onAnalyser, onSupprimer }) {
	const today = todayIso();
	const limiteDepassee = !!c.dateLimite && c.dateLimite < today;
	const limiteProche = !!c.dateLimite && !limiteDepassee && c.dateLimite <= addDays(today, 7);
	const relanceDue = !!c.dateRelance && c.dateRelance <= today && c.statut === "J'ai postulé";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "glass-card pop-in flex min-w-0 flex-col gap-3 p-4 transition-colors hover:border-primary/40",
		style: { animationDelay: `${Math.min(index, 12) * 40}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex min-w-0 items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onOuvrir,
					className: "min-w-0 flex-1 text-left",
					"aria-label": `Ouvrir ${c.entreprise}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[15px] font-bold leading-tight",
						children: c.entreprise || "Sans entreprise"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 line-clamp-2 text-[13px] text-muted-foreground",
						children: c.poste || "Poste non précisé"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Plus d'actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					className: "w-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onSelect: onOuvrir,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " Modifier"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onSelect: onPostuler,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), " Marquer postulé (relance J+10)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onSelect: onRelancer,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), " Marquer relancé"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onSelect: onAnalyser,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Analyser avec l'IA"]
						}),
						c.lien ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: c.lien,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " Voir l'offre"]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onSelect: onSupprimer,
							className: "text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Supprimer"]
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatutQuickSelect, {
					statut: c.statut,
					onChange: onStatut
				}), analyse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Analyse…"]
				}) : c.match ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onAnalyser,
					title: "Ré-analyser avec l'IA",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchBadge, {
						match: c.match,
						obsolete: matchObsolete(c, profil)
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: onAnalyser,
					className: "h-7 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Analyser"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground",
				children: [
					c.lieu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "inline-flex min-w-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: c.lieu
						})]
					}) : null,
					c.contact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "inline-flex min-w-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: c.contact
						})]
					}) : null,
					c.dateEnvoi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Envoyée le ", formatDate(c.dateEnvoi)] }) : null
				]
			}),
			(c.dateLimite || relanceDue) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [c.dateLimite ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${limiteDepassee ? "bg-destructive/15 text-destructive" : limiteProche ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }),
						limiteDepassee ? "Expirée le " : "Limite ",
						formatDate(c.dateLimite)
					]
				}) : null, relanceDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] px-2 py-1 text-[11px] font-semibold text-[var(--warning)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }), " Relance à faire"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex gap-2 pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "flex-1",
						onClick: onPostuler,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), " Postulé"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						className: "flex-1",
						onClick: onRelancer,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }), " Relancé"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onOuvrir,
						"aria-label": "Modifier",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
					})
				]
			})
		]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Suivi",
		title: "Mes candidatures",
		subtitle: `${items.length} opportunité(s) suivie(s)`,
		searchValue: search,
		onSearch: setSearch,
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 sm:min-w-56",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Rechercher une entreprise, un poste, une ville…",
							className: "pl-9"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filtre,
						onValueChange: setFiltre,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-56",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "tous",
							children: "Tous les statuts"
						}), STATUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							children: s
						}, s))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filtreLieu,
						onValueChange: setFiltreLieu,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "tous",
							children: "Tous les lieux"
						}), lieux.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: l,
							children: l
						}, l))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filtreMatch,
						onValueChange: setFiltreMatch,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-48",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "tous",
								children: "Tous les matchs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "excellent",
								children: "Excellent match"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "tres-bon",
								children: "Très bon match"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "interessant",
								children: "Match intéressant"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "faible",
								children: "Match faible"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "aucun",
								children: "Non analysé"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: vue,
						onValueChange: setVue,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-48",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "toutes",
								children: "Toutes les candidatures"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "relances",
								children: "Relances à faire"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "deadlines",
								children: "Deadlines < 7 jours"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: triValeur,
						onValueChange: (v) => {
							const [k, sens] = v.split(":");
							setSortKey(k);
							setSortAsc(sens === "asc");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
							className: "sm:w-56",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownUp, { className: "size-4 shrink-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TRIS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: `${t.cle}:${t.asc ? "asc" : "desc"}`,
							children: t.libelle
						}, t.libelle)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Réinitialiser"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => setIaOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Analyser une offre (IA)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						disabled: !!majMatchs || !profil,
						onClick: () => void rafraichirMatchs(),
						children: majMatchs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }),
							" Matchs IA ",
							majMatchs.fait,
							"/",
							majMatchs.total
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), " Actualiser les matchs IA"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Export CSV"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							setEditing(emptyCandidature());
							setOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Ajouter"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-xs text-muted-foreground",
				children: [
					filtered.length,
					" candidature(s) affichée(s) sur ",
					items.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidatureCard, {
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
				}, c.id))
			}),
			filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-card mt-3 p-10 text-center text-sm text-muted-foreground",
				children: "Aucune candidature ne correspond à votre recherche."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground",
				children: syncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }), " Synchronisation en cours…"] }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Vos candidatures sont synchronisées sur votre compte ",
					user.email,
					"."
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "size-3.5" }),
					" Données enregistrées uniquement dans ce navigateur —",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "text-primary hover:underline",
						children: "créez un compte"
					}),
					" ",
					"pour y accéder partout."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportIaDialog, {
				open: iaOpen,
				onOpenChange: setIaOpen,
				onResult: (c) => {
					setEditing(c);
					setOpen(true);
				}
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
export { CandidaturesPage as component };
