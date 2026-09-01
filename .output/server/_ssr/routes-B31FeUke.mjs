import { o as __toESM } from "../_runtime.mjs";
import { f as object, m as performance_default, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as supabase } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-DDzEUEFj.mjs";
import { $ as GraduationCap, Bt as Bell, D as RefreshCw, Ht as ArrowRight, L as Mail, Lt as Briefcase, Nt as CalendarDays, Ot as ChevronRight, Pt as CalendarClock, R as LogOut, Ut as ArrowLeft, V as LoaderCircle, _ as Star, a as Users, at as FingerprintPattern, b as Settings, c as UserPlus, d as TriangleAlert, i as WandSparkles, j as Pencil, jt as Check, kt as ChevronLeft, l as UserCheck, m as Timer, pt as ExternalLink, s as UserRound, u as Upload, v as Sparkles, x as Send, z as LogIn, zt as Bot } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-JIGp6MTc.mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import "../_libs/firebase.mjs";
import { c as signOut } from "../_libs/firebase__auth.mjs";
import { f as isFirebaseConfigured, l as getCompteActif, r as auth, w as setCompteActif } from "./auth-local-B6tKCByM.mjs";
import { t as createSsrRpc } from "./profil-cloud-GRdvg22b.mjs";
import { a as daysBetween, c as formatDate, i as addDays, l as getNextBestAction, m as todayIso, o as emptyCandidature } from "./candidatures-ck14d0Ow.mjs";
import { t as texteErreurIA } from "./ai-erreurs-B0Gxtc15.mjs";
import { a as offreAnalysable, i as niveauMatch, n as lancerAnalyse, r as matchObsolete, s as profilEnTexte } from "./match-run-Bhrc1Shm.mjs";
import { t as CenterModal } from "./modal-AsYCopxE.mjs";
import { t as CandidatureSheet } from "./CandidatureSheet-2s8UyStM.mjs";
import { t as useProfil } from "./useProfil-Vc3u7mk3.mjs";
import { t as useCandidatures } from "./useCandidatures-Cqc_s9SU.mjs";
import { a as verifyBiometric, i as enableBiometric, n as biometricSupported, r as disableBiometric, t as biometricEnabled } from "./biometric-CT0UcaTm.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-BJcYi82e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B31FeUke.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/** Daily Brief — faits calculés côté app (jamais inventés par l'IA). */
var label = (c) => `${c.entreprise || "Entreprise sans nom"} — ${c.poste || "poste non précisé"}`;
/** Construit la liste des faits du jour à partir des candidatures. */
function faitsDuJour(items, aujourdhui = todayIso()) {
	const faits = [];
	const dans7 = addDays(aujourdhui, 7);
	for (const c of items) {
		if (c.archive) continue;
		const base = {
			id: c.id,
			entreprise: c.entreprise,
			poste: c.poste,
			statut: c.statut,
			match: typeof c.match?.global === "number" ? c.match.global : null,
			lien: Boolean(c.lien)
		};
		if (c.dateLimite && c.statut === "Je vais postuler") {
			const reste = daysBetween(aujourdhui, c.dateLimite);
			if (reste !== null && reste < 0) faits.push({
				...base,
				categorie: "urgent",
				fait: `Date limite dépassée depuis ${Math.abs(reste)} j (${c.dateLimite}) chez ${label(c)}.`,
				action: "ouvrir"
			});
			else if (c.dateLimite <= dans7) faits.push({
				...base,
				categorie: "deadline",
				fait: `Date limite de candidature le ${c.dateLimite} (dans ${reste} j) chez ${label(c)}.`,
				action: "postuler"
			});
		}
		if (c.statut === "J'ai postulé" && c.dateRelance && c.dateRelance <= aujourdhui) {
			const depuis = c.dateEnvoi ? daysBetween(c.dateEnvoi, aujourdhui) : null;
			faits.push({
				...base,
				categorie: "relance",
				fait: `Relance prévue le ${c.dateRelance}${depuis !== null ? `, candidature envoyée il y a ${depuis} j` : ""} chez ${label(c)}.`,
				action: "relancer"
			});
		}
		if (c.statut === "J'ai un entretien") faits.push({
			...base,
			categorie: "entretien",
			fait: `Entretien en cours chez ${label(c)}${c.dateDernierContact ? ` (dernier contact le ${c.dateDernierContact})` : ""}.`,
			action: "ouvrir"
		});
		if (c.statut === "Je vais postuler" && base.match !== null && base.match >= 80) faits.push({
			...base,
			categorie: "opportunite",
			fait: `Match IA de ${base.match} % chez ${label(c)}, candidature pas encore envoyée.`,
			action: "postuler"
		});
		if (c.statut === "Je vais postuler") {
			const manques = [];
			if (!c.detail.trim()) manques.push("détail de l'offre");
			if (!c.lien.trim()) manques.push("lien de l'offre");
			if (!c.contact.trim()) manques.push("contact");
			if (!c.match) manques.push("analyse Match IA");
			if (manques.length > 0) faits.push({
				...base,
				categorie: "finaliser",
				fait: `Fiche incomplète chez ${label(c)} : ${manques.join(", ")} manquant(s).`,
				action: !c.match && c.detail.trim() ? "analyser" : "ouvrir"
			});
		}
	}
	const ordre = [
		"urgent",
		"deadline",
		"relance",
		"entretien",
		"opportunite",
		"finaliser"
	];
	return faits.sort((a, b) => ordre.indexOf(a.categorie) - ordre.indexOf(b.categorie));
}
/** Brief factuel sans IA (repli honnête si l'IA échoue). */
function briefDeRepli(faits) {
	const elements = faits.slice(0, 8).map((f) => ({
		id: f.id,
		categorie: f.categorie,
		titre: `${f.entreprise || "Candidature"} — ${titreAction(f.action)}`,
		raison: f.fait,
		action: f.action
	}));
	return {
		resume: elements.length ? `${elements.length} action${elements.length > 1 ? "s" : ""} à traiter aujourd'hui.` : "Rien d'urgent aujourd'hui.",
		elements,
		recommandations: [],
		genereLe: (/* @__PURE__ */ new Date()).toISOString(),
		repli: true
	};
}
function titreAction(a) {
	switch (a) {
		case "relancer": return "relancer";
		case "postuler": return "postuler";
		case "analyser": return "analyser avec l'IA";
		case "voir_offre": return "consulter l'offre";
		default: return "compléter la fiche";
	}
}
var CLE = "careerly-daily-brief-v1";
var CLE_AUTO = "careerly-daily-brief-auto";
/** Empreinte des faits du jour : tant qu'elle ne change pas, on réutilise le brief. */
function hashFaits(faits) {
	const t = faits.map((f) => `${f.id}|${f.categorie}|${f.statut}|${f.fait}`).sort().join("\n");
	let h = 5381;
	for (let i = 0; i < t.length; i++) h = (h << 5) + h + t.charCodeAt(i) | 0;
	return (h >>> 0).toString(36);
}
/**
* Renvoie le brief en cache s'il correspond exactement aux faits actuels,
* quelle que soit sa date : rien n'a changé, inutile de rappeler l'IA.
*/
function chargerBriefCache(hash) {
	try {
		const brut = window.localStorage.getItem(CLE);
		if (!brut) return null;
		const c = JSON.parse(brut);
		const cache = "brief" in c ? c : {
			brief: c,
			hash: ""
		};
		if (!cache.brief?.genereLe) return null;
		if (cache.hash && cache.hash === hash) return cache.brief;
		if (cache.brief.genereLe.slice(0, 10) === todayIso()) return cache.brief;
		return null;
	} catch {
		return null;
	}
}
function sauverBriefCache(b, hash) {
	try {
		window.localStorage.setItem(CLE, JSON.stringify({
			brief: b,
			hash
		}));
	} catch {}
}
/** Une seule génération automatique par jour, même en cas d'échec. */
function autoDejaTente() {
	try {
		return window.localStorage.getItem(CLE_AUTO) === todayIso();
	} catch {
		return true;
	}
}
function marquerAutoTente() {
	try {
		window.localStorage.setItem(CLE_AUTO, todayIso());
	} catch {}
}
var Input = object({
	faits: string().min(1),
	profil: string().optional()
});
var genererBrief = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Input.parse(data)).handler(createSsrRpc("75a504a229f5e3c0e0dba4175783b8f62dd4394c929a9350ed6741f047b60228"));
/** Orchestration client du Daily Brief : faits app -> IA -> brief validé. */
function faitsEnTexte(faits) {
	return faits.map((f, i) => `${i + 1}. id=${f.id} | catégorie=${f.categorie} | statut=${f.statut}${f.match !== null ? ` | match=${f.match}%` : ""}\n   ${f.fait}`).join("\n");
}
async function lancerBrief(items, profil) {
	const faits = faitsDuJour(items);
	if (faits.length === 0) return {
		resume: "Aucune action urgente aujourd'hui. Profitez-en pour repérer de nouvelles offres.",
		elements: [],
		recommandations: [],
		genereLe: (/* @__PURE__ */ new Date()).toISOString()
	};
	let ia;
	try {
		ia = await genererBrief({ data: {
			faits: faitsEnTexte(faits),
			profil: profil ? profilEnTexte(profil) : ""
		} });
	} catch (e) {
		throw e instanceof Error ? e : new Error(String(e ?? ""));
	}
	if (ia.quotaAtteint) throw new Error(ia.message);
	const parId = new Map(faits.map((f) => [f.id, f]));
	const vus = /* @__PURE__ */ new Set();
	const elements = [];
	for (const e of ia.elements ?? []) {
		const f = parId.get(e.id);
		if (!f || vus.has(e.id)) continue;
		vus.add(e.id);
		elements.push({
			id: f.id,
			categorie: f.categorie,
			titre: (e.titre || "").trim().slice(0, 90) || f.entreprise,
			raison: (e.raison || "").trim() || f.fait,
			action: f.action
		});
	}
	if (elements.length === 0) return briefDeRepli(faits);
	return {
		resume: (ia.resume || "").trim() || briefDeRepli(faits).resume,
		elements: elements.slice(0, 6),
		recommandations: (ia.recommandations ?? []).map((r) => r.trim()).filter(Boolean).slice(0, 3),
		genereLe: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var _jsxFileName$7 = "/app/applet/src/components/DailyBrief.tsx";
var META = {
	urgent: {
		libelle: "Urgent",
		icone: TriangleAlert,
		coin: Timer,
		tone: "var(--destructive)"
	},
	relance: {
		libelle: "Relance",
		icone: Bell,
		coin: Mail,
		tone: "var(--primary)"
	},
	entretien: {
		libelle: "Entretien",
		icone: UserRound,
		coin: CalendarDays,
		tone: "var(--warning)"
	},
	deadline: {
		libelle: "Deadline",
		icone: CalendarClock,
		coin: Timer,
		tone: "var(--success)"
	},
	opportunite: {
		libelle: "Opportunité",
		icone: Sparkles,
		coin: Star,
		tone: "var(--pink)"
	},
	finaliser: {
		libelle: "À finaliser",
		icone: Pencil,
		coin: Pencil,
		tone: "var(--lilac)"
	}
};
var ACTION_META = {
	relancer: {
		libelle: "Relancer avec l'IA",
		icone: WandSparkles
	},
	postuler: {
		libelle: "Marquer postulé",
		icone: Send
	},
	analyser: {
		libelle: "Voir l'analyse",
		icone: Sparkles
	},
	voir_offre: {
		libelle: "Voir l'offre",
		icone: ExternalLink
	},
	ouvrir: {
		libelle: "Préparer",
		icone: Pencil
	}
};
/** Découpe la raison en deux lignes courtes façon maquette. */
function lignes(raison) {
	const t = raison.trim();
	if (t.length <= 42) return [t];
	const coupe = t.lastIndexOf(" ", 42);
	const i = coupe > 18 ? coupe : 42;
	return [t.slice(0, i), t.slice(i).trim()];
}
function CartePriorite({ element, index, actif, onAgir }) {
	const meta = META[element.categorie];
	const action = ACTION_META[element.action];
	const Icone = meta.icone;
	const Coin = meta.coin;
	const BtnIcone = action.icone;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		style: {
			"--tone": meta.tone,
			animationDelay: `${index * 70}ms`
		},
		className: cn("tone-card pop-in flex min-h-[188px] w-[min(80vw,272px)] shrink-0 flex-col p-4 sm:min-h-[212px] sm:w-auto", actif && "ring-1 ring-[color-mix(in_oklab,var(--tone)_55%,transparent)]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "tone-chip size-7 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icone, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 149,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 148,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] font-bold uppercase tracking-[0.14em]",
						style: { color: "var(--tone)" },
						children: meta.libelle
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 151,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 147,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Coin, { className: "size-4 shrink-0 text-muted-foreground/70" }, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 158,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 146,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "mt-4 text-[17px] font-bold leading-tight tracking-tight",
				children: element.titre
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 161,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-1.5 space-y-0.5 text-[13px] leading-snug text-muted-foreground",
				children: lignes(element.raison).map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "line-clamp-2",
					children: l
				}, l, false, {
					fileName: _jsxFileName$7,
					lineNumber: 166,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 164,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: onAgir,
				className: "tone-btn mt-auto inline-flex w-fit items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BtnIcone, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 177,
					columnNumber: 9
				}, this), action.libelle]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 172,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 133,
		columnNumber: 5
	}, this);
}
function DailyBrief({ items, profil, pret, onPostuler, onRelancer, onOuvrir, onAnalyser }) {
	const [brief, setBrief] = (0, import_react.useState)(null);
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [page, setPage] = (0, import_react.useState)(0);
	const rangee = (0, import_react.useRef)(null);
	const faits = (0, import_react.useMemo)(() => faitsDuJour(items), [items]);
	const hash = (0, import_react.useMemo)(() => hashFaits(faits), [faits]);
	const [autoFait, setAutoFait] = (0, import_react.useState)(false);
	const cacheLu = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!pret || cacheLu.current) return;
		cacheLu.current = true;
		const cache = chargerBriefCache(hash);
		if (cache) {
			setBrief(cache);
			setAutoFait(true);
		}
	}, [pret, hash]);
	(0, import_react.useEffect)(() => {
		if (autoFait || !pret || brief || chargement || faits.length === 0) return;
		if (!cacheLu.current) return;
		setAutoFait(true);
		if (autoDejaTente()) return;
		marquerAutoTente();
		generer();
	}, [
		autoFait,
		pret,
		brief,
		chargement,
		faits.length
	]);
	const generer = async () => {
		setChargement(true);
		setErreur(null);
		try {
			const b = await lancerBrief(items, profil);
			setBrief(b);
			sauverBriefCache(b, hash);
			marquerAutoTente();
			setPage(0);
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setChargement(false);
		}
	};
	const navigate = useNavigate();
	const agir = (id, action) => {
		const c = items.find((i) => i.id === id);
		if (!c) return;
		if (action === "voir_offre" && c.lien) {
			window.open(c.lien, "_blank");
			return;
		}
		const nba = getNextBestAction(c);
		navigate({
			to: "/assistant",
			search: {
				oppId: c.id,
				step: nba.step
			}
		});
	};
	const elements = brief?.elements ?? [];
	const pages = Math.max(1, Math.ceil(elements.length / 4));
	const visibles = elements.slice(page * 4, page * 4 + 4);
	const glisser = (sens) => {
		setPage((p) => (p + sens + pages) % pages);
		rangee.current?.scrollTo({
			left: 0,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-3 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-[15px] font-bold tracking-tight",
					children: "Vos priorités"
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 271,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-0.5 hidden text-xs text-muted-foreground sm:block",
					children: brief ? brief.resume : faits.length > 0 ? `${faits.length} point${faits.length > 1 ? "s" : ""} détecté${faits.length > 1 ? "s" : ""} aujourd'hui` : "Aucune action urgente aujourd'hui."
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 274,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 270,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5",
					children: [pages > 1 && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("button", {
						type: "button",
						"aria-label": "Priorités précédentes",
						onClick: () => glisser(-1),
						className: "press grid size-8 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-colors hover:text-foreground",
						children: /* @__PURE__ */ (void 0)(ChevronLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 294,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 288,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						type: "button",
						"aria-label": "Priorités suivantes",
						onClick: () => glisser(1),
						className: "press grid size-8 place-items-center rounded-full border border-border/70 bg-card/60 text-muted-foreground transition-colors hover:text-foreground",
						children: /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 302,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 296,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 287,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-label": brief ? "Actualiser le brief" : "Générer mon brief",
						title: brief ? "Actualiser le brief" : "Générer mon brief",
						onClick: () => void generer(),
						disabled: chargement || !pret || faits.length === 0,
						className: "press grid size-8 place-items-center rounded-full border border-primary/40 bg-primary/12 text-primary transition-colors hover:bg-primary/20 disabled:opacity-50",
						children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 315,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 317,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 306,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 285,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 269,
				columnNumber: 7
			}, this),
			erreur && /* @__PURE__ */ (void 0)("p", {
				className: "mb-3 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
				children: erreur
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 324,
				columnNumber: 9
			}, this),
			chargement && !brief && /* @__PURE__ */ (void 0)("div", {
				className: "snap-row sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (void 0)("div", { className: "h-[188px] w-[min(80vw,272px)] shrink-0 animate-pulse rounded-2xl border border-border/50 bg-card/40 sm:h-[212px] sm:w-auto" }, i, false, {
					fileName: _jsxFileName$7,
					lineNumber: 332,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 330,
				columnNumber: 9
			}, this),
			!chargement && !brief && faits.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card flex items-center gap-3 p-5 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (void 0)("span", {
					className: "tone-chip size-9 shrink-0",
					children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 343,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 342,
					columnNumber: 11
				}, this), "Rien d'urgent aujourd'hui. Ajoutez une candidature pour alimenter votre brief."]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 341,
				columnNumber: 9
			}, this),
			visibles.length > 0 && /* @__PURE__ */ (void 0)("div", {
				ref: rangee,
				className: "snap-row sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4",
				children: visibles.map((e, i) => /* @__PURE__ */ (void 0)(CartePriorite, {
					element: e,
					index: i,
					actif: i === 0,
					onAgir: () => agir(e.id, e.action)
				}, e.id + e.categorie, false, {
					fileName: _jsxFileName$7,
					lineNumber: 356,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 351,
				columnNumber: 9
			}, this),
			pages > 1 && /* @__PURE__ */ (void 0)("div", {
				className: "mt-3 flex justify-center gap-1.5",
				children: Array.from({ length: pages }).map((_, i) => /* @__PURE__ */ (void 0)("button", {
					type: "button",
					"aria-label": `Page ${i + 1}`,
					onClick: () => setPage(i),
					className: cn("h-1.5 rounded-full transition-all", i === page ? "w-6 bg-primary" : "w-1.5 bg-border")
				}, i, false, {
					fileName: _jsxFileName$7,
					lineNumber: 370,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 368,
				columnNumber: 9
			}, this),
			brief && brief.recommandations.length > 0 && /* @__PURE__ */ (void 0)("details", {
				className: "glass-card mt-3 hidden p-3 sm:block",
				children: [/* @__PURE__ */ (void 0)("summary", {
					className: "cursor-pointer list-none text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground",
					children: [
						"Recommandations (",
						brief.recommandations.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 386,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("ul", {
					className: "mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground",
					children: brief.recommandations.map((r) => /* @__PURE__ */ (void 0)("li", { children: r }, r, false, {
						fileName: _jsxFileName$7,
						lineNumber: 391,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 389,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 385,
				columnNumber: 9
			}, this),
			brief?.repli && /* @__PURE__ */ (void 0)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: "Brief factuel généré sans IA."
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 398,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 268,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/AnimatedNumber.tsx";
function AnimatedNumber({ value, duration = 900 }) {
	const [display, setDisplay] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setDisplay(value);
			return;
		}
		const from = 0;
		const start = performance_default.now();
		let frame = 0;
		const tick = (now) => {
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			setDisplay(Math.round(from + (value - from) * eased));
			if (t < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [value, duration]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: display }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 33,
		columnNumber: 10
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/StatCard.tsx";
var TONES = {
	violet: "var(--primary)",
	lilac: "var(--lilac)",
	amber: "var(--warning)",
	emerald: "var(--success)"
};
/** Micro-courbe décorative lissée (sparkline). */
function Spark({ seed = 0 }) {
	const pts = [
		10,
		16,
		11,
		19,
		13,
		22,
		16,
		24
	].map((v, i) => (v + (seed * 5 + i * 7) % 8) % 24).map((v, i) => [i * 9, 26 - v]);
	const d = pts.map(([x, y], i) => {
		if (i === 0) return `M${x},${y}`;
		const [px, py] = pts[i - 1] ?? [0, 0];
		const cx = (px + x) / 2;
		return `C${cx},${py} ${cx},${y} ${x},${y}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
		viewBox: "0 0 64 28",
		className: "h-7 w-16 shrink-0 overflow-visible",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
			d,
			fill: "none",
			stroke: "var(--tone)",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 32,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 31,
		columnNumber: 5
	}, this);
}
function StatCard({ label, value, icon: Icon, index = 0, accent, delta, tone = "violet", suffix, to, search }) {
	const contenu = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		style: {
			"--tone": TONES[tone],
			animationDelay: `${index * 70}ms`
		},
		className: cn("tone-card pop-in relative overflow-hidden p-4", accent && "shadow-[0_0_44px_-18px_color-mix(in_oklab,var(--tone)_90%,transparent)]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "tone-chip size-10 shrink-0 rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 83,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 82,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "num text-[30px] font-extrabold leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatedNumber, { value }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 87,
							columnNumber: 13
						}, this), suffix]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 86,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 truncate text-[13px] text-muted-foreground",
						children: label
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 90,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 85,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 81,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2 flex items-end justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "truncate text-[11px] font-semibold",
					style: { color: "var(--tone)" },
					children: delta ?? ""
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 96,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Spark, { seed: index }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 102,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 95,
				columnNumber: 7
			}, this),
			to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "absolute right-3 top-3 size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 105,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 68,
		columnNumber: 5
	}, this);
	if (!to) return contenu;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to,
		search,
		className: "group block min-w-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: contenu
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 112,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/DashboardHighlights.tsx";
var BAR_COLORS = [
	"bg-primary",
	"bg-warning",
	"bg-lilac",
	"bg-success",
	"bg-chart-3",
	"bg-destructive"
];
function initiales(nom) {
	return nom.split(/\s+/).filter(Boolean).slice(0, 2).map((m) => m[0]?.toUpperCase()).join("") || "?";
}
/** Liste « Mes candidatures récentes ». */
function RecentCandidatures({ items, onOuvrir }) {
	const recentes = items.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card pop-in p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-[15px] font-bold",
				children: "Mes candidatures récentes"
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 39,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/",
				hash: "candidatures",
				className: "rounded-full bg-accent/50 px-3 py-1 text-[11.5px] font-medium text-muted-foreground transition-colors hover:text-foreground",
				children: "Voir tout"
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 40,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 38,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "flex flex-col",
			children: [recentes.length === 0 && /* @__PURE__ */ (void 0)("li", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: "Aucune candidature pour le moment."
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 51,
				columnNumber: 11
			}, this), recentes.map((c, i) => {
				const n = c.match ? niveauMatch(c.match.global) : null;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "pop-in",
					style: { animationDelay: `${i * 50}ms` },
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => onOuvrir(c),
						className: "flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-accent/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "grid size-9 shrink-0 place-items-center rounded-full bg-accent/60 text-[12px] font-bold",
								children: initiales(c.entreprise)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 68,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block truncate text-[13.5px] font-semibold",
									children: c.entreprise || "Sans nom"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 72,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block truncate text-[12px] text-muted-foreground",
									children: c.poste || "—"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 75,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 71,
								columnNumber: 17
							}, this),
							c.match && n && /* @__PURE__ */ (void 0)("span", {
								className: "hidden items-center gap-2 sm:flex",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: cn("num rounded-md border px-1.5 py-0.5 text-[12px] font-bold", n.badge),
									children: [c.match.global, "%"]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 81,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "hidden text-[12px] text-muted-foreground lg:block",
									children: n.label
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 89,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 80,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "hidden w-32 shrink-0 text-right md:block",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block truncate text-[11px] font-medium text-foreground",
									children: c.statut
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 95,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block truncate text-[11px] text-muted-foreground",
									children: formatDate(c.dateEnvoi) || "—"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 98,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 94,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4 shrink-0 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 102,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 63,
						columnNumber: 15
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName$4,
					lineNumber: 58,
					columnNumber: 13
				}, this);
			})]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 49,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 37,
		columnNumber: 5
	}, this);
}
/** Panneau « meilleur match » avec anneau de score et sous-critères. */
function MatchSpotlight({ candidature, onOuvrir }) {
	const match = candidature?.match ?? null;
	const score = match?.global ?? 0;
	const n = niveauMatch(score);
	const R = 52;
	const C = 2 * Math.PI * R;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card pop-in relative overflow-hidden p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 128,
				columnNumber: 7
			}, this),
			!candidature || !match ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex h-full min-h-48 flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "mb-3 size-6 text-primary" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 131,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-semibold",
						children: "Aucune analyse IA disponible"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 132,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-[12.5px] text-muted-foreground",
						children: "Lancez « Actualiser les matchs IA » pour découvrir vos meilleures opportunités."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 133,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 130,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center gap-5 text-center xl:flex-row xl:items-start xl:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative grid size-[120px] shrink-0 place-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
						viewBox: "0 0 120 120",
						className: "size-[120px] -rotate-90",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "60",
							cy: "60",
							r: R,
							fill: "none",
							strokeWidth: "10",
							className: "stroke-accent/60"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 142,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "60",
							cy: "60",
							r: R,
							fill: "none",
							strokeWidth: "10",
							strokeLinecap: "round",
							stroke: "var(--color-primary)",
							strokeDasharray: C,
							strokeDashoffset: C - C * score / 100,
							style: { transition: "stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)" }
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 150,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 141,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "absolute num text-3xl font-extrabold",
						children: [score, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-base",
							children: "%"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 167,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 165,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 140,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "flex items-center justify-center gap-1.5 text-[17px] font-bold xl:justify-start",
							children: [
								n.label,
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "✦"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 173,
									columnNumber: 25
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 172,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 line-clamp-2 text-[13px] text-muted-foreground",
							children: match.explication || `${candidature.poste} chez ${candidature.entreprise}`
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 175,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => onOuvrir(candidature),
							className: "press mt-3 inline-flex items-center gap-2 rounded-full gradient-hero px-4 py-2 text-[13px] font-semibold text-primary-foreground",
							children: "Voir l'analyse complète"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 179,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 171,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 139,
				columnNumber: 9
			}, this),
			match && match.details.length > 0 && /* @__PURE__ */ (void 0)("ul", {
				className: "mt-5 flex flex-col gap-2.5",
				children: match.details.slice(0, 6).map((d, i) => /* @__PURE__ */ (void 0)("li", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (void 0)("span", {
							className: "w-28 shrink-0 truncate text-[12.5px] text-muted-foreground",
							children: d.critere
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 194,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("span", {
							className: "h-1.5 flex-1 overflow-hidden rounded-full bg-accent/60",
							children: /* @__PURE__ */ (void 0)("span", {
								className: cn("block h-full rounded-full", BAR_COLORS[i % 6]),
								style: {
									width: `${Math.max(0, Math.min(100, d.score))}%`,
									transition: "width .8s cubic-bezier(.22,1,.36,1)"
								}
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 198,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 197,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("span", {
							className: "num w-9 shrink-0 text-right text-[12px] font-semibold",
							children: [d.score, "%"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 206,
							columnNumber: 15
						}, this)
					]
				}, d.critere, true, {
					fileName: _jsxFileName$4,
					lineNumber: 193,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 191,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 127,
		columnNumber: 5
	}, this);
}
/** Bandeau Careerly AI en bas du tableau de bord. */
function AiBar({ onCv, onEmail, onEntretien }) {
	const actions = [
		{
			label: "Analyser mon CV",
			onClick: onCv
		},
		{
			label: "Générer un email",
			onClick: onEmail
		},
		{
			label: "Préparer un entretien",
			onClick: onEntretien
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "ai-surface pop-in mt-6 flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "ai-pulse grid size-10 shrink-0 place-items-center rounded-2xl gradient-hero text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 236,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 235,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[15px] font-bold",
				children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-primary",
					children: "✦"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 240,
					columnNumber: 23
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 239,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-[12.5px] text-muted-foreground",
				children: "Votre copilote intelligent pour décrocher le bon poste."
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 242,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 238,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 234,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-2",
			children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: a.onClick,
				className: "press inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-[13px] font-medium transition-colors hover:border-primary/50 hover:text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-primary" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 255,
						columnNumber: 13
					}, this),
					" ",
					a.label
				]
			}, a.label, true, {
				fileName: _jsxFileName$4,
				lineNumber: 249,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 247,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 233,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/AccountMenu.tsx";
function AccountMenu({ user }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [bio, setBio] = (0, import_react.useState)(false);
	const [supported, setSupported] = (0, import_react.useState)(false);
	const localCompte = getCompteActif();
	const displayName = user?.user_metadata?.full_name || (localCompte?.prenom ? `${localCompte.prenom} ${localCompte.nom || ""}`.trim() : null) || user?.email?.split("@")[0] || "Mon compte";
	const initials = (localCompte?.prenom?.[0] || user?.email?.[0] || "U").toUpperCase();
	(0, import_react.useEffect)(() => {
		setSupported(biometricSupported());
		if (user?.id) setBio(biometricEnabled(user.id));
		else setBio(false);
	}, [user?.id]);
	const toggleBio = async () => {
		if (!user) return;
		if (bio) {
			disableBiometric(user.id);
			setBio(false);
			toast.success("Déverrouillage biométrique désactivé.");
			return;
		}
		try {
			await enableBiometric(user.id, user.email ?? "");
			setBio(true);
			toast.success("Déverrouillage biométrique activé sur cet appareil.");
		} catch {
			toast.error("Impossible d'activer la biométrie sur cet appareil.");
		}
	};
	const signOut$1 = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		setCompteActif(null);
		if (isFirebaseConfigured()) try {
			await signOut(auth);
		} catch {}
		try {
			await supabase.auth.signOut();
		} catch {}
		toast.success("Déconnexion réussie");
		navigate({
			to: "/auth",
			replace: true
		});
	};
	if (!user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
		asChild: true,
		size: "sm",
		variant: "outline",
		className: "gap-2 border-primary/30 hover:bg-primary/5",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/auth",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "size-4 text-primary" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 115,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Connexion" }, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 116,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 114,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 108,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			variant: "outline",
			size: "sm",
			className: "gap-2 border-border/80 hover:bg-accent px-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex size-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary",
				children: initials
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 130,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "max-w-28 truncate text-xs font-medium",
				children: displayName
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 133,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 125,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 124,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "end",
		className: "w-64 p-1.5 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "p-2 font-normal",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm font-semibold text-foreground truncate",
								children: displayName
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 142,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 146,
									columnNumber: 17
								}, this), " Connecté"]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 145,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 141,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: user.email
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 149,
							columnNumber: 13
						}, this),
						localCompte?.ecole && /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-muted-foreground/80 truncate",
							children: ["🎓 ", localCompte.ecole]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 153,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 140,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 139,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 160,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/parametres",
					className: "cursor-pointer gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 164,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Paramètres & Profil" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 165,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 163,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 162,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/auth",
					className: "cursor-pointer gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 171,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Changer de compte" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 172,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 170,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 169,
				columnNumber: 9
			}, this),
			supported && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				className: "cursor-pointer gap-2 text-xs",
				onSelect: (e) => {
					e.preventDefault();
					toggleBio();
				},
				children: [/* @__PURE__ */ (void 0)(FingerprintPattern, { className: "size-4 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 184,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("span", { children: bio ? "Désactiver la biométrie" : "Activer la biométrie" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 185,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 177,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 191,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				className: "cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive",
				onSelect: () => void signOut$1(),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 197,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Se déconnecter" }, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 198,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 193,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 138,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 123,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/Onboarding.tsx";
var ETAPES = [
	{
		titre: "Bienvenue sur NACORA 👋",
		texte: "NACORA est votre copilote de recherche de stage ou d'alternance : un seul endroit pour suivre vos candidatures, vos relances et vos entretiens.",
		points: [
			"Toutes vos candidatures centralisées",
			"Synchronisées sur tous vos appareils",
			"Un brief quotidien qui vous dit quoi faire"
		],
		icon: Sparkles
	},
	{
		titre: "Votre profil, la clé du match IA",
		texte: "Complétez votre profil (ou importez votre CV) : l'IA compare ensuite chaque offre à votre parcours et vous donne un score de compatibilité.",
		points: [
			"Analyse automatique de votre CV",
			"Score de match IA sur chaque offre",
			"Points forts et écarts détaillés"
		],
		icon: Bot
	},
	{
		titre: "Ajoutez vos offres en 10 secondes",
		texte: "Collez le texte d'une annonce : NACORA extrait l'entreprise, le poste, le lieu et la date limite de candidature automatiquement.",
		points: [
			"Extraction IA depuis une annonce",
			"Deadlines suivies et surlignées",
			"Statuts modifiables en un clic"
		],
		icon: CalendarClock
	},
	{
		titre: "Contacts, relances et entretiens",
		texte: "Gardez vos contacts recruteurs au chaud : l'IA rédige vos relances et prépare vos entretiens à votre place.",
		points: [
			"Messages de relance générés par l'IA",
			"Préparation d'entretien personnalisée",
			"Calendrier des deadlines et rendez-vous"
		],
		icon: Users
	},
	{
		titre: "Vous avez déjà commencé ailleurs ?",
		texte: "Importez votre tableau Excel/CSV, vos contacts et vos lettres de motivation : vous ne repartez jamais de zéro.",
		points: [
			"Import Excel / CSV avec détection des colonnes",
			"Import de contacts et de documents",
			"Export de votre agenda en .ics"
		],
		icon: Upload
	}
];
function cle(userId) {
	return `careerly.onboarding.${userId ?? "local"}`;
}
/** Indique si le tutoriel doit s'afficher automatiquement pour cet utilisateur. */
function useOnboarding(userId, pret) {
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!pret || typeof window === "undefined") return;
		if (window.localStorage.getItem(cle(userId)) === "vu") return;
		setOpen(true);
	}, [pret, userId]);
	const fermer = (v) => {
		if (!v && typeof window !== "undefined") window.localStorage.setItem(cle(userId), "vu");
		setOpen(v);
	};
	return {
		open,
		setOpen: fermer,
		ouvrir: () => setOpen(true)
	};
}
function Onboarding({ open, onOpenChange }) {
	const [i, setI] = (0, import_react.useState)(0);
	const etape = ETAPES[i] ?? ETAPES[0];
	const Icon = etape.icon;
	const dernier = i === ETAPES.length - 1;
	(0, import_react.useEffect)(() => {
		if (open) setI(0);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		size: "md",
		title: etape.titre,
		description: `Étape ${i + 1} sur ${ETAPES.length}`,
		footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex w-full items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => onOpenChange(false),
				className: "text-muted-foreground",
				children: "Passer"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 128,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setI(i - 1),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 139,
						columnNumber: 17
					}, this), " Retour"]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 138,
					columnNumber: 15
				}, this) : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: () => dernier ? onOpenChange(false) : setI(i + 1),
					children: dernier ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["C'est parti ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 148,
						columnNumber: 31
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 147,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Suivant ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 152,
						columnNumber: 27
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 151,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 142,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 136,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 127,
			columnNumber: 9
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "pop-in space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-6" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 162,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 161,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm leading-relaxed text-muted-foreground",
					children: etape.texte
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 164,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-2",
					children: etape.points.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 170,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: p }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 171,
							columnNumber: 15
						}, this)]
					}, p, true, {
						fileName: _jsxFileName$2,
						lineNumber: 169,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 167,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 pt-1",
					children: ETAPES.map((e, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						"aria-label": `Aller à l'étape ${idx + 1}`,
						onClick: () => setI(idx),
						className: `h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"}`
					}, e.titre, false, {
						fileName: _jsxFileName$2,
						lineNumber: 177,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 175,
					columnNumber: 9
				}, this)
			]
		}, i, true, {
			fileName: _jsxFileName$2,
			lineNumber: 160,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 120,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/BiometricLock.tsx";
var KEY = "neoma-biometrie-unlocked";
function useBiometricLock(userId, enabled) {
	const [unlocked, setUnlocked] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!userId || !enabled) {
			setUnlocked(true);
			return;
		}
		setUnlocked(window.sessionStorage.getItem(KEY) === userId);
	}, [userId, enabled]);
	const unlock = () => {
		if (userId) window.sessionStorage.setItem(KEY, userId);
		setUnlocked(true);
	};
	return {
		unlocked,
		unlock
	};
}
function BiometricLockScreen({ userId, onUnlock }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const tryUnlock = async () => {
		setLoading(true);
		setError("");
		try {
			await verifyBiometric(userId);
			onUnlock();
		} catch {
			setError("Vérification impossible. Réessayez.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "surface-card w-full max-w-sm p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FingerprintPattern, { className: "mx-auto size-10 text-primary" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-4 text-xl font-semibold",
					children: "Suivi verrouillé"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 54,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Déverrouillez avec votre empreinte ou votre visage pour accéder à vos candidatures."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 55,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "mt-6 w-full",
					onClick: () => void tryUnlock(),
					disabled: loading,
					children: [
						loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 22
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FingerprintPattern, {}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 61
						}, this),
						" ",
						"Déverrouiller"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 59,
					columnNumber: 9
				}, this),
				error && /* @__PURE__ */ (void 0)("p", {
					className: "mt-3 text-sm text-destructive",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 67,
					columnNumber: 19
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 52,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 51,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Index() {
	const { user, authLoading, items, ready, patch, save } = useCandidatures();
	const navigate = useNavigate();
	const profil = useProfil(user);
	const [bioOn, setBioOn] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [majMatchs, setMajMatchs] = (0, import_react.useState)(null);
	const { unlocked, unlock } = useBiometricLock(user?.id ?? null, bioOn);
	const tuto = useOnboarding(user?.id ?? null, ready && !authLoading);
	(0, import_react.useEffect)(() => {
		if (user?.id) setBioOn(biometricEnabled(user.id));
		else setBioOn(false);
	}, [user?.id]);
	const today = todayIso();
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
		try {
			const match = await lancerAnalyse(c, profil);
			patch(c.id, { match });
			toast.success(`Analyse terminée : ${match.global} / 100`);
		} catch (e) {
			toast.error(texteErreurIA(e));
		}
	};
	/** Ré-analyse les offres sans match ou dont le match est obsolète. */
	const rafraichirMatchs = async (opts) => {
		if (!profil || majMatchs) return;
		const cibles = items.filter((c) => offreAnalysable(c) && (!c.match || matchObsolete(c, profil)));
		if (cibles.length === 0) {
			if (!opts?.silencieux) toast.info("Tous les matchs IA sont à jour.");
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
		else if (!opts?.silencieux) toast.success(`${ok} match(s) IA mis à jour.`);
	};
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: items.length,
			envoyees: items.filter((c) => c.statut !== "Je vais postuler").length,
			entretiens: items.filter((c) => c.statut === "J'ai un entretien").length,
			limites: items.filter((c) => c.dateLimite && c.dateLimite >= today && c.dateLimite <= addDays(today, 7) && c.statut === "Je vais postuler").length,
			relances: items.filter((c) => c.dateRelance && c.dateRelance <= today && c.statut === "J'ai postulé").length
		};
	}, [items, today]);
	const scoreMoyen = (0, import_react.useMemo)(() => {
		const scores = items.map((c) => c.match?.global).filter((v) => !!v);
		if (!scores.length) return 0;
		return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
	}, [items]);
	const meilleurMatch = (0, import_react.useMemo)(() => {
		const avec = items.filter((c) => c.match);
		if (!avec.length) return null;
		return avec.reduce((a, b) => (b.match?.global ?? 0) > (a.match?.global ?? 0) ? b : a);
	}, [items]);
	if (user && bioOn && !unlocked) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BiometricLockScreen, {
		userId: user.id,
		onUnlock: unlock
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 145,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		onAdd: () => {
			setEditing(emptyCandidature());
			setOpen(true);
		},
		actions: authLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin opacity-70" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 150,
			columnNumber: 29
		}, this) : !user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccountMenu, { user: null }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 150,
			columnNumber: 94
		}, this) : null,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pop-in mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[15px] font-medium text-muted-foreground",
					suppressHydrationWarning: true,
					children: [
						"Bonjour ",
						profil?.prenom || user?.email?.split("@")[0] || "à vous",
						" 👋"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-1 text-2xl font-extrabold tracking-tight sm:text-[34px] sm:leading-tight",
					children: [
						"Voici ce qui mérite votre",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-gradient",
							children: "attention"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 11
						}, this),
						" aujourd'hui."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DailyBrief, {
				items,
				profil,
				pret: ready,
				onPostuler: marquerPostule,
				onRelancer: marquerRelance,
				onOuvrir: (c) => {
					setEditing(c);
					setOpen(true);
				},
				onAnalyser: (c) => void analyserLigne(c)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Candidatures",
						value: stats.total,
						icon: Briefcase,
						index: 0,
						tone: "violet",
						to: "/candidatures",
						delta: `${stats.envoyees} envoyées`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Entretiens",
						value: stats.entretiens,
						icon: Send,
						index: 1,
						tone: "lilac",
						to: "/candidatures",
						search: { statut: "J'ai un entretien" },
						delta: "en cours"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Relances à faire",
						value: stats.relances,
						icon: Bell,
						index: 2,
						tone: "amber",
						to: "/candidatures",
						search: { vue: "relances" },
						accent: stats.relances > 0,
						delta: `${stats.limites} deadline(s) < 7 j`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Score moyen",
						value: scoreMoyen,
						suffix: "%",
						icon: Sparkles,
						index: 3,
						tone: "emerald",
						to: "/assistant/match",
						delta: "match IA"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 166,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1.15fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RecentCandidatures, {
					items,
					onOuvrir: (c) => {
						setEditing(c);
						setOpen(true);
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 178,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MatchSpotlight, {
					candidature: meilleurMatch,
					onOuvrir: (c) => {
						setEditing(c);
						setOpen(true);
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 182,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-semibold",
					children: "Toutes vos candidatures"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 190,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Tableau complet avec filtres, tri, actions rapides et export."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 191,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 189,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							onClick: tuto.ouvrir,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 13
							}, this), " Revoir le tutoriel"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "secondary",
							disabled: !!majMatchs || !profil,
							onClick: () => void rafraichirMatchs(),
							children: majMatchs ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 17
								}, this),
								" Matchs IA ",
								majMatchs.fait,
								"/",
								majMatchs.total
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 26
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 17
							}, this), " Actualiser les matchs IA"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/candidatures",
								children: ["Ouvrir le tableau ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 33
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 188,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AiBar, {
				onCv: () => void navigate({ to: "/profil" }),
				onEmail: () => void navigate({ to: "/contacts" }),
				onEntretien: () => void navigate({ to: "/assistant/interview" })
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Onboarding, {
				open: tuto.open,
				onOpenChange: tuto.setOpen
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 223,
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
				lineNumber: 225,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
