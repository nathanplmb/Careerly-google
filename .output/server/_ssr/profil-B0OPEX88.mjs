import { a as __toESM } from "../_runtime.mjs";
import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as GraduationCap, Ct as CircleAlert, Dt as ChevronDown, E as Save, G as Layers, I as MapPin, It as BookOpen, K as Languages, L as Mail, Mt as Building2, Nt as Briefcase, O as RefreshCw, Ot as Check, P as MessageSquareQuote, Q as HeartHandshake, Rt as Award, St as CircleCheck, U as Linkedin, V as LoaderCircle, W as Lightbulb, Z as Heart, _t as Copy, at as FileText, ct as FileCode, d as TriangleAlert, et as Globe, f as TrendingUp, g as Target, gt as Cpu, ht as DollarSign, i as WandSparkles, j as Phone, k as Plus, kt as Calendar, mt as Download, n as X, p as Trash2, q as Key, r as Wrench, rt as Flame, s as UserRound, tt as Github, u as Upload, ut as Eye, v as Sparkles, vt as Compass, wt as ChevronUp, x as ShieldAlert, y as SlidersHorizontal, zt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { J as NIVEAUX_COMPETENCE, X as completionCv, Y as NIVEAUX_LANGUE, Z as cvStructureEnTexte, a as Dialog, at as nouvelleCompetence, ct as nouvelleLangue, d as Textarea, dt as Button, et as loadProfil, f as Label, ft as cn, it as nouvelleCertification, l as DialogHeader, lt as saveProfilLocal, nt as nouveauBenevolat, o as DialogContent, ot as nouvelleExperience, p as Input$1, q as CRITERES, rt as nouveauProjet, s as DialogDescription, st as nouvelleFormation, tt as normaliserCvStructure, u as DialogTitle } from "./router-Dma1Qf70.mjs";
import { t as AppShell } from "./AppShell-SgP4smEW.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BVo--1gP.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as createServerFn } from "./server-BocG72bt.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-ke1QXT9x.mjs";
import { n as fetchProfil, r as saveProfilCloud, t as createSsrRpc } from "./profil-cloud-S5cI0mqh.mjs";
import { n as calculerCompletudeProfil, t as Badge } from "./profil-completion-Bp54MqOb.mjs";
import { t as Progress } from "./progress-cTKs2o6Y.mjs";
import { t as useSession } from "./useSession-87MHA6rb.mjs";
import { c as texteErreurIA, s as profilEnTexte } from "./match-run-CFvAPahz.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BAFTKIAY.mjs";
import { n as extraireTexteFichier, t as TYPES_ACCEPTES } from "./cv-fichier-BFa0B9CM.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-B0OPEX88.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var Input = object({
	cv: string().min(50),
	profil: string().optional()
});
var analyserCv = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("f31cec66ab6270632e857c072556e946de1cb08cff5fad1e7ad30363aeb8101e"));
/** Hash djb2 simple, identique dans l'esprit à celui du moteur de match. */
function hashTexte(texte) {
	let h = 5381;
	const t = texte.replace(/\s+/g, " ").trim().toLowerCase();
	for (let i = 0; i < t.length; i++) h = (h << 5) + h + t.charCodeAt(i) | 0;
	return (h >>> 0).toString(36);
}
function niveauCV(score) {
	if (score >= 80) return {
		label: "Excellent CV",
		badge: "border-primary/40 bg-primary/10 text-primary"
	};
	if (score >= 65) return {
		label: "Bon CV, quelques ajustements",
		badge: "border-primary/30 bg-primary/5 text-primary"
	};
	if (score >= 45) return {
		label: "À retravailler",
		badge: "border-amber-500/40 bg-amber-500/10 text-amber-600"
	};
	return {
		label: "Refonte conseillée",
		badge: "border-destructive/30 bg-destructive/10 text-destructive"
	};
}
function labelPriorite(p) {
	return p === "haute" ? "Prioritaire" : p === "moyenne" ? "Important" : "Bonus";
}
var _jsxFileName$16 = "/app/applet/src/components/CvAnalyseDialog.tsx";
var CHAMPS = [
	{
		cle: "competences",
		label: "Compétences",
		source: "competences"
	},
	{
		cle: "logiciels",
		label: "Logiciels / outils",
		source: "logiciels"
	},
	{
		cle: "langues",
		label: "Langues",
		source: "langues"
	},
	{
		cle: "niveauAnglais",
		label: "Niveau d'anglais",
		source: "niveauAnglais"
	},
	{
		cle: "experiences",
		label: "Expériences",
		source: "experiences"
	},
	{
		cle: "formation",
		label: "Formation",
		source: "formation"
	},
	{
		cle: "ecole",
		label: "École",
		source: "ecole"
	},
	{
		cle: "niveau",
		label: "Niveau",
		source: "niveau"
	},
	{
		cle: "metiers",
		label: "Métiers visés",
		source: "metiers"
	},
	{
		cle: "domaines",
		label: "Domaines",
		source: "domaines"
	},
	{
		cle: "localisation",
		label: "Localisation",
		source: "localisation"
	}
];
function videStructure(cv) {
	if (!cv) return true;
	return cv.experiences.length === 0 && cv.formations.length === 0 && cv.competences.length === 0 && cv.certifications.length === 0;
}
function structureDetectee(brut) {
	if (!brut) return null;
	const s = normaliserCvStructure(brut);
	if (videStructure(s) && !s.titre && !s.accroche && s.langues.length === 0) return null;
	return s;
}
function CvAnalyseDialog({ open, onOpenChange, profil, cv, onSaveCv, onAppliquerProfil }) {
	const lancerAnalyseCv = useServerFn(analyserCv);
	const [texte, setTexte] = (0, import_react.useState)(cv?.texte ?? "");
	const [analyse, setAnalyse] = (0, import_react.useState)(cv?.analyse ?? null);
	const [genereLe, setGenereLe] = (0, import_react.useState)(cv?.genereLe ?? null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [lecture, setLecture] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [autoRemplis, setAutoRemplis] = (0, import_react.useState)([]);
	const inputRef = (0, import_react.useRef)(null);
	const obsolete = Boolean(analyse && cv && hashTexte(texte) !== cv.hash);
	const lireFichier = async (file) => {
		setErreur(null);
		setLecture(true);
		try {
			const t = await extraireTexteFichier(file);
			setTexte(t);
		} catch (e) {
			setErreur(e instanceof Error ? e.message : "Lecture du fichier impossible.");
		} finally {
			setLecture(false);
		}
	};
	const lancer = async () => {
		if (texte.trim().length < 50) {
			setErreur("Le texte du CV est trop court pour être analysé.");
			return;
		}
		setLoading(true);
		setErreur(null);
		setAutoRemplis([]);
		try {
			const { modele, ...a } = await lancerAnalyseCv({ data: {
				cv: texte,
				profil: profilEnTexte(profil)
			} });
			const etat = {
				texte,
				analyse: a,
				genereLe: (/* @__PURE__ */ new Date()).toISOString(),
				hash: hashTexte(texte),
				modele
			};
			setAnalyse(a);
			setGenereLe(etat.genereLe);
			onSaveCv(etat);
			const d = a.profilDetecte;
			const patch = {};
			const remplis = [];
			for (const c of CHAMPS) {
				const valeur = (d?.[c.source] ?? "").trim();
				const actuel = String(profil[c.cle] ?? "").trim();
				if (valeur && !actuel) {
					patch[c.cle] = valeur;
					remplis.push(c.label);
				}
			}
			const structure = structureDetectee(a.cvStructure);
			if (structure && videStructure(profil.cvStructure)) {
				patch.cvStructure = structure;
				remplis.push("CV détaillé (expériences, formations, compétences…)");
			}
			if (remplis.length > 0) {
				setAutoRemplis(remplis);
				onAppliquerProfil(patch);
			}
		} catch (e) {
			setErreur(texteErreurIA(e));
		} finally {
			setLoading(false);
		}
	};
	const detecte = analyse?.profilDetecte;
	const champsDetectes = detecte ? CHAMPS.filter((c) => (detecte[c.source] ?? "").trim().length > 0) : [];
	const appliquer = () => {
		if (!detecte) return;
		const patch = {};
		for (const c of champsDetectes) patch[c.cle] = detecte[c.source].trim();
		const structure = structureDetectee(analyse?.cvStructure);
		const labels = champsDetectes.map((c) => c.label);
		if (structure) {
			patch.cvStructure = structure;
			labels.push("CV détaillé");
		}
		onAppliquerProfil(patch);
		setAutoRemplis(labels);
	};
	const niveau = analyse ? niveauCV(analyse.global) : null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-h-[90vh] max-w-3xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5 text-primary" }, void 0, false, {
					fileName: _jsxFileName$16,
					lineNumber: 205,
					columnNumber: 13
				}, this), " Analyser mon CV"]
			}, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 204,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, { children: "Déposez votre CV (PDF, .docx, .txt) ou collez son contenu : l'IA le note, vous donne des axes d'amélioration et peut pré-remplir votre profil." }, void 0, false, {
				fileName: _jsxFileName$16,
				lineNumber: 207,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 203,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDrag(true);
						},
						onDragLeave: () => setDrag(false),
						onDrop: (e) => {
							e.preventDefault();
							setDrag(false);
							const f = e.dataTransfer.files?.[0];
							if (f) lireFichier(f);
						},
						className: cn("flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition", drag ? "border-primary bg-primary/5" : "border-border"),
						children: [
							lecture ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin text-primary" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 233,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 235,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: ["Glissez votre CV ici ou", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "link",
									className: "px-1",
									onClick: () => inputRef.current?.click(),
									children: "choisissez un fichier"
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 239,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 237,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "PDF, DOCX, TXT, Markdown ou RTF — 20 Mo maximum."
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 247,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								ref: inputRef,
								type: "file",
								accept: TYPES_ACCEPTES,
								className: "hidden",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (f) lireFichier(f);
									e.target.value = "";
								}
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 250,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 215,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 265,
									columnNumber: 15
								}, this), " Texte du CV"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 264,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 8,
								value: texte,
								onChange: (e) => setTexte(e.target.value),
								placeholder: "Collez ici le contenu de votre CV…"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 267,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: [texte.trim().length, " caractères"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 273,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 263,
						columnNumber: 11
					}, this),
					erreur && /* @__PURE__ */ (void 0)("p", {
						className: "flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
						children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 280,
							columnNumber: 15
						}, this), erreur]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 279,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: genereLe && `Dernière analyse le ${new Date(genereLe).toLocaleDateString("fr-FR", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric"
							})}`
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 286,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: lancer,
							disabled: loading || lecture,
							children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 300,
								columnNumber: 19
							}, this), " Analyse en cours…"] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 299,
								columnNumber: 17
							}, this) : analyse ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 304,
								columnNumber: 19
							}, this), " Ré-analyser"] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 303,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 308,
								columnNumber: 19
							}, this), " Analyser mon CV"] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 307,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 297,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 285,
						columnNumber: 11
					}, this),
					obsolete && /* @__PURE__ */ (void 0)("p", {
						className: "flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm text-primary",
						children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 316,
							columnNumber: 15
						}, this), "Le texte a changé depuis la dernière analyse : relancez-la."]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 315,
						columnNumber: 13
					}, this),
					analyse && niveau && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-5 border-t pt-5",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-end gap-4",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-4xl font-semibold text-primary",
									children: [analyse.global, /* @__PURE__ */ (void 0)("span", {
										className: "text-lg text-muted-foreground",
										children: [" ", "/ 100"]
									}, void 0, true, {
										fileName: _jsxFileName$16,
										lineNumber: 327,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$16,
									lineNumber: 325,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: cn("mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium", niveau.badge),
									children: niveau.label
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 332,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$16,
									lineNumber: 324,
									columnNumber: 17
								}, this), analyse.resume && /* @__PURE__ */ (void 0)("p", {
									className: "max-w-md text-sm text-muted-foreground",
									children: analyse.resume
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 342,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 323,
								columnNumber: 15
							}, this),
							analyse.scores?.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: analyse.scores.map((s, i) => /* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-baseline justify-between text-sm",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-medium",
											children: s.critere
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 353,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground",
											children: [s.score, " %"]
										}, void 0, true, {
											fileName: _jsxFileName$16,
											lineNumber: 354,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$16,
										lineNumber: 352,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)(Progress, {
										value: s.score,
										className: "mt-1.5 h-1.5"
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 358,
										columnNumber: 23
									}, this),
									s.explication && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: s.explication
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 360,
										columnNumber: 25
									}, this)
								] }, i, true, {
									fileName: _jsxFileName$16,
									lineNumber: 351,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 349,
								columnNumber: 17
							}, this),
							analyse.pointsForts?.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 372,
									columnNumber: 21
								}, this), " Points forts"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 371,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "mt-2 space-y-1.5",
								children: analyse.pointsForts.map((p, i) => /* @__PURE__ */ (void 0)("li", {
									className: "flex gap-2 text-sm",
									children: [/* @__PURE__ */ (void 0)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" }, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 378,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("span", { children: p }, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 379,
										columnNumber: 25
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$16,
									lineNumber: 377,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 375,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 370,
								columnNumber: 17
							}, this),
							analyse.aCorriger?.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "flex items-center gap-2 text-sm font-medium",
								children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 text-destructive" }, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 389,
									columnNumber: 21
								}, this), " À améliorer"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 388,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "mt-2 space-y-2",
								children: analyse.aCorriger.map((c, i) => /* @__PURE__ */ (void 0)("li", {
									className: "rounded-lg border p-3",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-medium",
											children: c.titre
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 396,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: cn("rounded-full border px-2 py-0.5 text-[11px]", c.priorite === "haute" ? "border-destructive/30 bg-destructive/10 text-destructive" : c.priorite === "moyenne" ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"),
											children: labelPriorite(c.priorite)
										}, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 397,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$16,
										lineNumber: 395,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: c.conseil
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 410,
										columnNumber: 25
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$16,
									lineNumber: 394,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 392,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 387,
								columnNumber: 17
							}, this),
							analyse.reformulations?.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-medium",
								children: "Reformulations proposées"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 421,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "mt-2 space-y-2",
								children: analyse.reformulations.map((r, i) => /* @__PURE__ */ (void 0)("li", {
									className: "rounded-lg border bg-muted/40 p-3 text-sm",
									children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground line-through",
										children: r.avant
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 430,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 font-medium text-foreground",
										children: r.apres
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 433,
										columnNumber: 25
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$16,
									lineNumber: 426,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 424,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 420,
								columnNumber: 17
							}, this),
							analyse.motsClesManquants?.length > 0 && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Mots-clés manquants"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 444,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								children: analyse.motsClesManquants.map((m, i) => /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs text-destructive",
									children: m
								}, i, false, {
									fileName: _jsxFileName$16,
									lineNumber: 449,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 447,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 443,
								columnNumber: 17
							}, this),
							champsDetectes.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "rounded-lg border p-3",
								children: [
									/* @__PURE__ */ (void 0)("h4", {
										className: "flex items-center gap-2 text-sm font-medium",
										children: [/* @__PURE__ */ (void 0)(WandSparkles, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName$16,
											lineNumber: 463,
											columnNumber: 21
										}, this), " Profil détecté"]
									}, void 0, true, {
										fileName: _jsxFileName$16,
										lineNumber: 462,
										columnNumber: 19
									}, this),
									autoRemplis.length > 0 && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 p-2 text-[11px] text-primary",
										children: [
											/* @__PURE__ */ (void 0)(CircleCheck, { className: "mt-px size-3.5 shrink-0" }, void 0, false, {
												fileName: _jsxFileName$16,
												lineNumber: 467,
												columnNumber: 23
											}, this),
											"Profil complété automatiquement : ",
											autoRemplis.join(", "),
											"."
										]
									}, void 0, true, {
										fileName: _jsxFileName$16,
										lineNumber: 466,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("ul", {
										className: "mt-2 space-y-1.5",
										children: champsDetectes.map((c) => /* @__PURE__ */ (void 0)("li", {
											className: "text-xs",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-medium",
												children: [c.label, " : "]
											}, void 0, true, {
												fileName: _jsxFileName$16,
												lineNumber: 475,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: detecte[c.source]
											}, void 0, false, {
												fileName: _jsxFileName$16,
												lineNumber: 476,
												columnNumber: 25
											}, this)]
										}, c.cle, true, {
											fileName: _jsxFileName$16,
											lineNumber: 474,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 472,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "outline",
										className: "mt-3",
										onClick: appliquer,
										children: "Écraser tout le profil avec le CV"
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 482,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: "Les champs vides ont déjà été remplis automatiquement. Ce bouton remplace aussi les champs que vous aviez saisis."
									}, void 0, false, {
										fileName: _jsxFileName$16,
										lineNumber: 490,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 461,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: "Analyse générée par l'IA à partir du texte de votre CV : vérifiez toujours les suggestions avant de les appliquer."
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 497,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 322,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 214,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$16,
			lineNumber: 202,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$16,
		lineNumber: 201,
		columnNumber: 5
	}, this);
}
var _jsxFileName$15 = "/app/applet/src/components/profil/ProfilHeaderCard.tsx";
function ProfilHeaderCard({ profil, bilan, onOpenCvModal, onOpenSummaryIaModal, onOpenOptimizerModal, onSelectTab, saving }) {
	const nomAffiche = profil.prenom || profil.nom ? `${profil.prenom} ${profil.nom}`.trim() : "Candidat";
	const initiales = (profil.prenom?.[0] || "") + (profil.nom?.[0] || "") || profil.ecole?.[0] || "C";
	const titrePro = profil.titre || profil.cvStructure?.titre || [profil.formation, profil.ecole].filter(Boolean).join(" @ ") || "Profil Candidat";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "glass-card relative overflow-hidden p-6 sm:p-7 space-y-6 border-purple-500/20 bg-gradient-to-br from-card/90 via-card/70 to-purple-950/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-purple-500/15 blur-3xl" }, void 0, false, {
				fileName: _jsxFileName$15,
				lineNumber: 54,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-indigo-500/10 blur-3xl" }, void 0, false, {
				fileName: _jsxFileName$15,
				lineNumber: 55,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start gap-4 sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-xl font-bold text-white shadow-lg shadow-purple-600/30 border border-purple-400/30",
						children: [profil.photoUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: profil.photoUrl,
							alt: nomAffiche,
							className: "size-full rounded-2xl object-cover"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 63,
							columnNumber: 15
						}, this) : initiales.toUpperCase(), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-background text-[10px]",
							children: "✓"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 71,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 61,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl truncate",
									children: nomAffiche
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 78,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "outline",
									className: `text-xs font-semibold px-2.5 py-0.5 ${bilan.badgeColor}`,
									children: bilan.label
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 81,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 77,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs sm:text-sm font-medium text-purple-300",
								children: titrePro
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 89,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2 pt-1",
								children: [
									profil.contrats && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-xs font-medium text-purple-200",
										children: ["🎯 ", profil.contrats]
									}, void 0, true, {
										fileName: _jsxFileName$15,
										lineNumber: 95,
										columnNumber: 17
									}, this),
									profil.localisation && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
										children: ["📍 ", profil.localisation]
									}, void 0, true, {
										fileName: _jsxFileName$15,
										lineNumber: 100,
										columnNumber: 17
									}, this),
									profil.modeTravail && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300",
										children: ["💻 ", profil.modeTravail]
									}, void 0, true, {
										fileName: _jsxFileName$15,
										lineNumber: 105,
										columnNumber: 17
									}, this),
									profil.dateDebut && /* @__PURE__ */ (void 0)("span", {
										className: "inline-flex items-center rounded-lg bg-secondary/80 border border-border/50 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground",
										children: ["⏱️ Dispo : ", profil.dateDebut]
									}, void 0, true, {
										fileName: _jsxFileName$15,
										lineNumber: 110,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 93,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 76,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$15,
					lineNumber: 60,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: onOpenSummaryIaModal,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 125,
								columnNumber: 13
							}, this), "Profil IA (Synthèse)"]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 120,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onOpenOptimizerModal,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-purple-300 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 135,
								columnNumber: 13
							}, this), "Optimiser mon profil"]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 129,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onOpenCvModal,
							className: "gap-1.5 border-border/60 hover:bg-card/80 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 145,
								columnNumber: 13
							}, this), "Importer CV"]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 139,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$15,
					lineNumber: 119,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$15,
				lineNumber: 58,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-background/50 p-4 sm:p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs",
								children: "⚡"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 155,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-bold text-foreground block",
								children: [
									"Niveau de complétude du profil (",
									bilan.nbComplets,
									"/",
									bilan.nbTotal,
									" rubriques complètes)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 159,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground",
								children: "Plus votre profil est riche, plus le Match IA et le Coach d'entretien sont précis."
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 163,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 158,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 154,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
							children: [bilan.score, "% complet"]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 170,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 153,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
						value: bilan.score,
						className: "h-2 bg-secondary"
					}, void 0, false, {
						fileName: _jsxFileName$15,
						lineNumber: 175,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2 pt-1",
						children: bilan.categories?.map((cat) => {
							const isComplet = cat.statut === "complet";
							const isAmeliorer = cat.statut === "a_ameliorer";
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => onSelectTab(cat.tab),
								className: `flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${isComplet ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : isAmeliorer ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
								children: [isComplet ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3 text-emerald-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 197,
									columnNumber: 19
								}, this) : isAmeliorer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-3 text-amber-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 199,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-muted-foreground/50 shrink-0" }, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 201,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: cat.nom }, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 203,
									columnNumber: 17
								}, this)]
							}, cat.id, true, {
								fileName: _jsxFileName$15,
								lineNumber: 184,
								columnNumber: 15
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$15,
						lineNumber: 178,
						columnNumber: 9
					}, this),
					bilan.suggestions.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3 pt-2 border-t border-border/40 text-xs",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-purple-400 font-bold shrink-0",
								children: "💡 Conseil IA :"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 213,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-muted-foreground truncate",
								children: bilan.suggestions[0].titre
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 216,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 212,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => onSelectTab(bilan.suggestions[0].tab),
							className: "text-xs font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 shrink-0",
							children: [
								"Compléter (+",
								bilan.suggestions[0].gain,
								" pts)",
								/* @__PURE__ */ (void 0)(ArrowUpRight, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 226,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 220,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 211,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$15,
				lineNumber: 152,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$15,
		lineNumber: 52,
		columnNumber: 5
	}, this);
}
var _jsxFileName$14 = "/app/applet/src/components/profil/ProfilIdentityTab.tsx";
function ProfilIdentityTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const updateCvField = (field, val) => {
		onChange({ cvStructure: {
			...cv,
			[field]: val
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 40,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 39,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Identité & Positionnement"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 43,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vos informations visibles et votre titre professionnel principal"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 46,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 42,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 38,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Prénom *"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 54,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.prenom,
								onChange: (e) => {
									onChange({ prenom: e.target.value });
									updateCvField("prenom", e.target.value);
								},
								placeholder: "Ex : Lucas, Sarah..."
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 55,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 53,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Nom *"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 66,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.nom,
								onChange: (e) => {
									onChange({ nom: e.target.value });
									updateCvField("nom", e.target.value);
								},
								placeholder: "Ex : Dupont, Martin..."
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 67,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 65,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 52,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Titre professionnel / Accroche cible *"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 79,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.titre || cv?.titre || "",
								onChange: (e) => {
									onChange({ titre: e.target.value });
									updateCvField("titre", e.target.value);
								},
								placeholder: "Ex : Étudiant M1 PGE @ NEOMA | Recherche Stage Bras Droit / Product Manager (6 mois)"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 82,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "💡 Ce titre oriente immédiatement le matching IA et apparaît en en-tête de vos candidatures."
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 90,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 78,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Photo de profil (URL)"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 98,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.photoUrl || cv?.photoUrl || "",
									onChange: (e) => {
										onChange({ photoUrl: e.target.value });
										updateCvField("photoUrl", e.target.value);
									},
									placeholder: "https://mon-image.jpg ou avatar..."
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 102,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 101,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 97,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Permis de conduire"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 114,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.permis || cv?.permis || "",
								onChange: (e) => {
									onChange({ permis: e.target.value });
									updateCvField("permis", e.target.value);
								},
								placeholder: "Ex : Permis B, Véhiculé(e)..."
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 117,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 113,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 96,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 133,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 132,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Coordonnées & Mobilité géographique"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 136,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Pour vous contacter et évaluer le critère de localisation"
						}, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 139,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 135,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 131,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 148,
									columnNumber: 15
								}, this), " Email de contact"]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 147,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								type: "email",
								value: profil.emailContact || cv?.email || "",
								onChange: (e) => {
									onChange({ emailContact: e.target.value });
									updateCvField("email", e.target.value);
								},
								placeholder: "votre.email@etudiant.fr"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 150,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 146,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 163,
									columnNumber: 15
								}, this), " Téléphone"]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 162,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								type: "tel",
								value: profil.telephone || cv?.telephone || "",
								onChange: (e) => {
									onChange({ telephone: e.target.value });
									updateCvField("telephone", e.target.value);
								},
								placeholder: "+33 6 12 34 56 78"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 165,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 161,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 145,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Ville actuelle"
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 179,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.localisation || cv?.ville || "",
									onChange: (e) => {
										onChange({ localisation: e.target.value });
										updateCvField("ville", e.target.value);
									},
									placeholder: "Ex : Paris, Lyon, Rouen, Reims..."
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 182,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 178,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Pays"
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 193,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.pays || cv?.pays || "France",
									onChange: (e) => {
										onChange({ pays: e.target.value });
										updateCvField("pays", e.target.value);
									},
									placeholder: "Ex : France, Royaume-Uni..."
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 194,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 192,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Mobilité géographique"
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 205,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.mobilite,
									onChange: (e) => onChange({ mobilite: e.target.value }),
									placeholder: "Ex : Île-de-France, France entière, International..."
								}, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 208,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 204,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 177,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 130,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$14,
							lineNumber: 221,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 220,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Liens & Réseaux Professionnels"
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 224,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "LinkedIn, portfolio de projets, profil GitHub ou site personnel"
					}, void 0, false, {
						fileName: _jsxFileName$14,
						lineNumber: 227,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$14,
						lineNumber: 223,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 219,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-3.5 text-blue-400" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 236,
									columnNumber: 15
								}, this), " Profil LinkedIn"]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 235,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.linkedin || cv?.linkedin || "",
								onChange: (e) => {
									onChange({ linkedin: e.target.value });
									updateCvField("linkedin", e.target.value);
								},
								placeholder: "linkedin.com/in/nom-prenom"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 238,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 234,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 250,
									columnNumber: 15
								}, this), " Portfolio / Site"]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 249,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.portfolio || cv?.portfolio || "",
								onChange: (e) => {
									onChange({ portfolio: e.target.value });
									updateCvField("portfolio", e.target.value);
								},
								placeholder: "https://mon-portfolio.fr"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 252,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 248,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$14,
									lineNumber: 264,
									columnNumber: 15
								}, this), " Profil GitHub / Code"]
							}, void 0, true, {
								fileName: _jsxFileName$14,
								lineNumber: 263,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: profil.github || cv?.github || "",
								onChange: (e) => {
									onChange({ github: e.target.value });
									updateCvField("github", e.target.value);
								},
								placeholder: "github.com/mon-pseudo"
							}, void 0, false, {
								fileName: _jsxFileName$14,
								lineNumber: 266,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$14,
							lineNumber: 262,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$14,
					lineNumber: 233,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$14,
				lineNumber: 218,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$14,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
var _jsxFileName$13 = "/app/applet/src/components/profil/ProfilTagSuggestions.tsx";
function ProfilTagSuggestions({ label = "Suggestions rapides", tags, currentValue, onSelectTag }) {
	const currentLower = currentValue.toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5 pt-1",
		children: [label && /* @__PURE__ */ (void 0)("span", {
			className: "text-[11px] font-medium text-muted-foreground",
			children: [label, " :"]
		}, void 0, true, {
			fileName: _jsxFileName$13,
			lineNumber: 21,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-1.5",
			children: tags.map((tag) => {
				const isSelected = currentLower.includes(tag.toLowerCase());
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => onSelectTag(tag),
					className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${isSelected ? "border border-primary/40 bg-primary/10 font-medium text-primary shadow-xs" : "border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted/80 hover:text-foreground"}`,
					children: [isSelected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3 text-primary" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 40,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3 opacity-60" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 42,
						columnNumber: 17
					}, this), tag]
				}, tag, true, {
					fileName: _jsxFileName$13,
					lineNumber: 29,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName$13,
			lineNumber: 25,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$13,
		lineNumber: 19,
		columnNumber: 5
	}, this);
}
var _jsxFileName$12 = "/app/applet/src/components/profil/ProfilObjectivesTab.tsx";
var CONTRATS_OPTIONS = [
	"Stage",
	"Alternance",
	"CDI",
	"CDD",
	"VIE",
	"Graduate Program",
	"Freelance"
];
var MODES_TRAVAIL = [
	{
		id: "hybride",
		label: "Hybride (Télétravail + Bureau)",
		icone: "🏢"
	},
	{
		id: "full_remote",
		label: "100% Télétravail / Full Remote",
		icone: "💻"
	},
	{
		id: "presentiel",
		label: "Présentiel complet",
		icone: "👥"
	},
	{
		id: "indifferent",
		label: "Indifférent",
		icone: "✨"
	}
];
var ENVIRONNEMENTS_OPTIONS = [
	"Grand groupe",
	"Scale-up",
	"Startup",
	"Cabinet de conseil",
	"Banque / Finance",
	"PME / ETI",
	"Secteur public / ONG",
	"Tech / SaaS"
];
var PRIORITES_OPTIONS = [
	"Missions apprenantes & formatrices",
	"Mentorat & Management bienveillant",
	"Perspectives de recrutement (CDI à la clé)",
	"Rémunération attractive / Bonus",
	"Culture d'entreprise & Équilibre de vie",
	"Impact écologique / RSE",
	"Exposition internationale",
	"Autonomie & Prise de décision"
];
function ProfilObjectivesTab({ profil, onChange }) {
	const [nouveauMetier, setNouveauMetier] = (0, import_react.useState)("");
	const [nouveauDomaine, setNouveauDomaine] = (0, import_react.useState)("");
	const [nouvelleEntreprise, setNouvelleEntreprise] = (0, import_react.useState)("");
	const environnements = profil.environnements ?? ["Grand groupe", "Scale-up"];
	const priorites = profil.prioritesRecherche ?? ["Missions apprenantes & formatrices", "Mentorat & Management bienveillant"];
	const toggleEnvironnement = (env) => {
		onChange({ environnements: environnements.includes(env) ? environnements.filter((e) => e !== env) : [...environnements, env] });
	};
	const togglePriorite = (prio) => {
		onChange({ prioritesRecherche: priorites.includes(prio) ? priorites.filter((p) => p !== prio) : [...priorites, prio] });
	};
	const ajouterTag = (val, champ, reset) => {
		const trim = val.trim();
		if (!trim) return;
		const current = profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : [];
		if (!current.includes(trim)) {
			current.push(trim);
			onChange({ [champ]: current.join(", ") });
		}
		reset();
	};
	const retirerTag = (tag, champ) => {
		const next = (profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : []).filter((t) => t !== tag);
		onChange({ [champ]: next.join(", ") });
	};
	const metiersList = (profil.metiers || "").split(",").map((s) => s.trim()).filter(Boolean);
	const domainesList = (profil.domaines || "").split(",").map((s) => s.trim()).filter(Boolean);
	const entreprisesList = (profil.entreprisesCiblees || "").split(",").map((s) => s.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 147,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 146,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Métiers & Secteurs Cibles"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 150,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Les intitulés de postes et domaines d'activité que le Match IA doit cibler en priorité"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 153,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 149,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 145,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Intitulés de postes / Métiers recherchés *"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 162,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50",
								children: [metiersList.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "secondary",
									className: "gap-1.5 bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs py-1 px-2.5",
									children: [m, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => retirerTag(m, "metiers"),
										className: "rounded-full hover:bg-purple-500/20 p-0.5 text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 178,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 173,
										columnNumber: 17
									}, this)]
								}, m, true, {
									fileName: _jsxFileName$12,
									lineNumber: 167,
									columnNumber: 15
								}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 min-w-[200px] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: nouveauMetier,
										onChange: (e) => setNouveauMetier(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" || e.key === ",") {
												e.preventDefault();
												ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier(""));
											}
										},
										placeholder: "Ajouter un métier (ex: Bras Droit, Chef de Produit, Analyste M&A...) et tapez Entrée",
										className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 183,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier("")),
										className: "h-6 px-2 text-xs text-purple-400",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 209,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 198,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 182,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 165,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
								categorie: "metiers",
								valeurActuelle: profil.metiers,
								onSelectSuggestion: (val) => {
									const current = profil.metiers ? profil.metiers.split(",").map((s) => s.trim()).filter(Boolean) : [];
									if (!current.includes(val)) onChange({ metiers: [...current, val].join(", ") });
								}
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 213,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 161,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Domaines / Secteurs d'activité"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 232,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50",
								children: [domainesList.map((d) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "secondary",
									className: "gap-1.5 bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 text-xs py-1 px-2.5",
									children: [d, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => retirerTag(d, "domaines"),
										className: "rounded-full hover:bg-indigo-500/20 p-0.5 text-muted-foreground hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 248,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 243,
										columnNumber: 17
									}, this)]
								}, d, true, {
									fileName: _jsxFileName$12,
									lineNumber: 237,
									columnNumber: 15
								}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 min-w-[200px] flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: nouveauDomaine,
										onChange: (e) => setNouveauDomaine(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" || e.key === ",") {
												e.preventDefault();
												ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine(""));
											}
										},
										placeholder: "Ajouter un secteur (ex: Tech / SaaS, Conseil, Finance, Luxe...) et tapez Entrée",
										className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 253,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine("")),
										className: "h-6 px-2 text-xs text-indigo-400",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 279,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 268,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 252,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 235,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
								categorie: "domaines",
								valeurActuelle: profil.domaines,
								onSelectSuggestion: (val) => {
									const current = profil.domaines ? profil.domaines.split(",").map((s) => s.trim()).filter(Boolean) : [];
									if (!current.includes(val)) onChange({ domaines: [...current, val].join(", ") });
								}
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 283,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 231,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Entreprises spécifiques ciblées (Dream Companies)"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 302,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-lg border border-border/60 bg-background/50",
							children: [entreprisesList.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1.5 bg-blue-500/15 text-blue-300 border border-blue-500/20 text-xs py-1 px-2.5",
								children: [e, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(e, "entreprisesCiblees"),
									className: "rounded-full hover:bg-blue-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 318,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 313,
									columnNumber: 17
								}, this)]
							}, e, true, {
								fileName: _jsxFileName$12,
								lineNumber: 307,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[200px] flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: nouvelleEntreprise,
									onChange: (e) => setNouvelleEntreprise(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === ",") {
											e.preventDefault();
											ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise(""));
										}
									},
									placeholder: "Ex : L'Oréal, BNP Paribas, Doctolib, BCG, Alan... et tapez Entrée",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 323,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise("")),
									className: "h-6 px-2 text-xs text-blue-400",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 349,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 338,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 322,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 305,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 301,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 144,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 360,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 359,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Type de contrat & Calendrier de recherche"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 363,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Format de la mission, dates de disponibilité et durée souhaitée"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 366,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 362,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 358,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Type de contrat recherché *"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 374,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: CONTRATS_OPTIONS.map((c) => {
								const selected = (profil.contrats || "").includes(c);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => {
										const current = (profil.contrats || "").split(",").map((s) => s.trim()).filter(Boolean);
										onChange({ contrats: (selected ? current.filter((x) => x !== c) : [...current, c]).join(", ") || "Stage" });
									},
									className: `rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${selected ? "border-purple-500/40 bg-purple-500/20 text-purple-200 shadow-xs" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/80 hover:text-foreground"}`,
									children: [selected && /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 inline mr-1" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 400,
										columnNumber: 32
									}, this), c]
								}, c, true, {
									fileName: _jsxFileName$12,
									lineNumber: 381,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 377,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 373,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 411,
										columnNumber: 15
									}, this), " Date de début souhaitée"]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 410,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.dateDebut,
									onChange: (e) => onChange({ dateDebut: e.target.value }),
									placeholder: "Ex : Janvier 2026, Septembre..."
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 413,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 409,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Durée souhaitée"
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 421,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.duree,
									onChange: (e) => onChange({ duree: e.target.value }),
									placeholder: "Ex : 6 mois, 12 à 24 mois..."
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 424,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 420,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DollarSign, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 433,
										columnNumber: 15
									}, this), " Rémunération min."]
								}, void 0, true, {
									fileName: _jsxFileName$12,
									lineNumber: 432,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: profil.remuneration,
									onChange: (e) => onChange({ remuneration: e.target.value }),
									placeholder: "Ex : 1200 €/mois, 45k€..."
								}, void 0, false, {
									fileName: _jsxFileName$12,
									lineNumber: 436,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$12,
								lineNumber: 431,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 408,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Mode de travail préféré"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 446,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: MODES_TRAVAIL.map((m) => {
								const selected = (profil.modeTravail || "hybride") === m.id;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => onChange({
										modeTravail: m.id,
										teletravail: m.label
									}),
									className: `flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${selected ? "border-purple-500/40 bg-purple-500/15 text-purple-200" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-base",
										children: m.icone
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 465,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold",
										children: m.label
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 466,
										columnNumber: 19
									}, this)]
								}, m.id, true, {
									fileName: _jsxFileName$12,
									lineNumber: 453,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 449,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 445,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 357,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 478,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 477,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Environnements & Critères Prioritaires"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 481,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "La taille de structure et les valeurs qui comptent le plus pour vous"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 484,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 480,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 476,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Types de structures privilégiées"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 493,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: ENVIRONNEMENTS_OPTIONS.map((env) => {
								const selected = environnements.includes(env);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => toggleEnvironnement(env),
									className: `rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${selected ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [selected && /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 inline mr-1" }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 510,
										columnNumber: 32
									}, this), env]
								}, env, true, {
									fileName: _jsxFileName$12,
									lineNumber: 500,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 496,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 492,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Vos priorités absolues dans une opportunité"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 520,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: PRIORITES_OPTIONS.map((prio) => {
								const selected = priorites.includes(prio);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => togglePriorite(prio),
									className: `flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${selected ? "border-purple-500/40 bg-purple-500/15 text-purple-200 font-semibold" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `size-3.5 rounded-full border flex items-center justify-center ${selected ? "border-purple-400 bg-purple-500 text-white" : "border-muted-foreground/40"}`,
										children: selected && /* @__PURE__ */ (void 0)(Check, { className: "size-2.5" }, void 0, false, {
											fileName: _jsxFileName$12,
											lineNumber: 540,
											columnNumber: 34
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 537,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: prio }, void 0, false, {
										fileName: _jsxFileName$12,
										lineNumber: 542,
										columnNumber: 19
									}, this)]
								}, prio, true, {
									fileName: _jsxFileName$12,
									lineNumber: 527,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 523,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 519,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 475,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4 border-purple-500/30 bg-gradient-to-br from-purple-500/5 via-card/60 to-indigo-500/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-purple-500/20 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 554,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 553,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground flex items-center gap-2",
							children: ["Ce que je recherche vraiment", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]",
								children: "Booster IA"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 559,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 557,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Expliquez avec vos propres mots ce qui vous motive, vos ambitions et le type d'équipe idéale"
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 563,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$12,
							lineNumber: 556,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 552,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value: profil.rechercheVraie || "",
						onChange: (e) => onChange({ rechercheVraie: e.target.value }),
						rows: 4,
						placeholder: "Ex : Je recherche un stage où je serai au contact direct de la direction ou des fondateurs, avec une vraie autonomie sur les sujets opérationnels. J'aimerais particulièrement travailler sur le lancement de nouveaux produits ou l'expansion internationale, dans une ambiance bienveillante mais stimulante...",
						className: "text-xs leading-relaxed border-purple-500/20 bg-background/50 focus-visible:ring-purple-500"
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 570,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "✨ Ce paragraphe est directement injecté dans le contexte du Match IA, de la rédaction des lettres de motivation, des messages LinkedIn et du Coach d'entretien."
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 577,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 551,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 142,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/ui/switch.tsx";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") }, void 0, false, {
		fileName: _jsxFileName$11,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Switch.displayName = Switch$1.displayName;
var _jsxFileName$10 = "/app/applet/src/components/profil/ProfilEducationTab.tsx";
function ProfilEducationTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const formations = cv?.formations || [];
	const [expandedIndex, setExpandedIndex] = (0, import_react.useState)(0);
	const updateFormations = (nouvellesFormations) => {
		const primary = nouvellesFormations[0];
		onChange({
			formation: primary?.diplome || profil.formation,
			ecole: primary?.etablissement || profil.ecole,
			niveau: primary?.niveau || profil.niveau,
			cvStructure: {
				...cv,
				formations: nouvellesFormations
			}
		});
	};
	const handleAjouter = () => {
		const updated = [nouvelleFormation(), ...formations];
		updateFormations(updated);
		setExpandedIndex(0);
	};
	const handleSupprimer = (index) => {
		const updated = formations.filter((_, i) => i !== index);
		updateFormations(updated);
		if (expandedIndex === index) setExpandedIndex(null);
	};
	const handleModifier = (index, patch) => {
		const updated = formations.map((f, i) => i === index ? {
			...f,
			...patch
		} : f);
		updateFormations(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 85,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 84,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Parcours Académique & Diplômes (",
							formations.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 88,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Renseignez vos écoles, masters, spécialisations et cours clés valorisables"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 91,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 87,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 83,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouter,
					className: "gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 103,
						columnNumber: 11
					}, this), "Ajouter une formation"]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 98,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 82,
				columnNumber: 7
			}, this),
			formations.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card p-10 text-center space-y-3",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400",
						children: /* @__PURE__ */ (void 0)(GraduationCap, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 111,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 110,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Aucune formation renseignée"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 113,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto",
						children: "Ajoutez votre cursus actuel (école de commerce, d'ingénieurs, université...) pour enrichir votre profil."
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 116,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						size: "sm",
						variant: "outline",
						onClick: handleAjouter,
						className: "gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 126,
							columnNumber: 13
						}, this), "Ajouter ma formation principale"]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 120,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$10,
				lineNumber: 109,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: formations.map((f, idx) => {
					const isExpanded = expandedIndex === idx;
					const titreAffiche = f.diplome || f.etablissement || `Formation #${idx + 1}`;
					const sousTitre = [
						f.etablissement,
						f.specialisation,
						f.periode || (f.anneeDebut ? `${f.anneeDebut} - ${f.enCours ? "En cours" : f.anneeFin || ""}` : "")
					].filter(Boolean).join(" • ");
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-card overflow-hidden border border-border/70 transition-all hover:border-indigo-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => setExpandedIndex(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-card/40 hover:bg-card/70 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 font-bold text-xs",
									children: idx + 1
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 160,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-sm font-bold text-foreground truncate",
										children: titreAffiche
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 164,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: sousTitre || "Détails à renseigner"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 167,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 163,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 159,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [
									f.enCours && /* @__PURE__ */ (void 0)(Badge, {
										className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]",
										children: "En cours"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 175,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: (e) => {
											e.stopPropagation();
											handleSupprimer(idx);
										},
										className: "h-7 w-7 p-0 text-muted-foreground hover:text-rose-400",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 188,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 179,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: isExpanded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 192,
											columnNumber: 23
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 194,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 190,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 173,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 155,
							columnNumber: 15
						}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 bg-background/30 space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Établissement / École / Université *"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 205,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Input$1, {
											value: f.etablissement,
											onChange: (e) => handleModifier(idx, { etablissement: e.target.value }),
											placeholder: "Ex : NEOMA Business School, Sorbonne..."
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 208,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 204,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Diplôme / Programme *"
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 218,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Input$1, {
											value: f.diplome,
											onChange: (e) => handleModifier(idx, { diplome: e.target.value }),
											placeholder: "Ex : Master Grande École, Bachelor..."
										}, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 221,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 217,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 203,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Niveau d'études"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 233,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: f.niveau || "",
												onChange: (e) => handleModifier(idx, { niveau: e.target.value }),
												placeholder: "Ex : M1, M2, Bac+5..."
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 236,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 232,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Spécialisation / Majeure"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 246,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: f.specialisation || "",
												onChange: (e) => handleModifier(idx, { specialisation: e.target.value }),
												placeholder: "Ex : Finance d'entreprise, Marketing Digital..."
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 249,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 245,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Mention / Grade"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 261,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: f.mention || "",
												onChange: (e) => handleModifier(idx, { mention: e.target.value }),
												placeholder: "Ex : Très bien, Major de promotion..."
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 264,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 260,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 231,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Ville / Campus"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 276,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: f.ville || "",
												onChange: (e) => handleModifier(idx, { ville: e.target.value }),
												placeholder: "Ex : Paris, Reims, Rouen..."
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 279,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 275,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Période / Année"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 289,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: f.periode || "",
												onChange: (e) => handleModifier(idx, { periode: e.target.value }),
												placeholder: "Ex : 2023 - 2026, Sept 2024 - Présent"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 292,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 288,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3 pt-6",
											children: [/* @__PURE__ */ (void 0)(Switch, {
												checked: Boolean(f.enCours),
												onCheckedChange: (c) => handleModifier(idx, { enCours: c })
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 302,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-foreground cursor-pointer",
												children: "Formation en cours"
											}, void 0, false, {
												fileName: _jsxFileName$10,
												lineNumber: 308,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$10,
											lineNumber: 301,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 274,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(BookOpen, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$10,
											lineNumber: 317,
											columnNumber: 23
										}, this), "Matières clés & Cours importants (séparés par des virgules)"]
									}, void 0, true, {
										fileName: _jsxFileName$10,
										lineNumber: 316,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Input$1, {
										value: (f.coursImportants || []).join(", "),
										onChange: (e) => handleModifier(idx, { coursImportants: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex : Analyse financière approfondie, Stratégie d'entreprise, Business Analytics, Négociation..."
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 321,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 315,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Projet académique majeur / Thèse / Mémoire (Optionnel)"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 336,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Textarea, {
										rows: 2,
										value: f.description || "",
										onChange: (e) => handleModifier(idx, { description: e.target.value }),
										placeholder: "Ex : Réalisation d'une étude d'opportunité de marché pour une startup fintech, soutenance devant un jury professionnel...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 339,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 335,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 202,
							columnNumber: 17
						}, this)]
					}, f.id || idx, true, {
						fileName: _jsxFileName$10,
						lineNumber: 150,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 133,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 80,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/app/applet/src/components/profil/ProfilExperiencesTab.tsx";
function ProfilExperiencesTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const experiences = cv?.experiences || [];
	const [expandedIndex, setExpandedIndex] = (0, import_react.useState)(0);
	const updateExperiences = (nouvellesExp) => {
		nouvellesExp[0];
		onChange({
			experiences: nouvellesExp.map((e) => `${e.poste} chez ${e.entreprise} (${e.periode || "Période"}) : ${e.description}`).join("\n\n") || profil.experiences,
			cvStructure: {
				...cv,
				experiences: nouvellesExp
			}
		});
	};
	const handleAjouter = () => {
		const updated = [nouvelleExperience(), ...experiences];
		updateExperiences(updated);
		setExpandedIndex(0);
	};
	const handleSupprimer = (index) => {
		const updated = experiences.filter((_, i) => i !== index);
		updateExperiences(updated);
		if (expandedIndex === index) setExpandedIndex(null);
	};
	const handleModifier = (index, patch) => {
		const updated = experiences.map((e, i) => i === index ? {
			...e,
			...patch
		} : e);
		updateExperiences(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 88,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 87,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Expériences Professionnelles (",
							experiences.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 91,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Stages, alternances, jobs et missions avec réalisations quantifiées (KPI)"
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 94,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 90,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 86,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouter,
					className: "gap-2 bg-purple-600 hover:bg-purple-500 text-white shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 106,
						columnNumber: 11
					}, this), "Ajouter une expérience"]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 101,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 85,
				columnNumber: 7
			}, this),
			experiences.length === 0 && /* @__PURE__ */ (void 0)("div", {
				className: "glass-card p-10 text-center space-y-3",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (void 0)(Briefcase, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 114,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 113,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h4", {
						className: "text-sm font-semibold text-foreground",
						children: "Aucune expérience enregistrée"
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 116,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto",
						children: "Ajoutez vos stages passés, alternances ou projets pour que l'IA valorise votre parcours dans vos lettres et candidatures."
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 119,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						size: "sm",
						variant: "outline",
						onClick: handleAjouter,
						className: "gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 129,
							columnNumber: 13
						}, this), "Ajouter ma première expérience"]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 123,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 112,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: experiences.map((exp, idx) => {
					const isExpanded = expandedIndex === idx;
					const titreAffiche = exp.poste || exp.entreprise || `Expérience #${idx + 1}`;
					const sousTitre = [
						exp.entreprise,
						exp.typeContrat || "Stage",
						exp.periode || (exp.enCours ? "En cours" : ""),
						exp.ville
					].filter(Boolean).join(" • ");
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-card overflow-hidden border border-border/70 transition-all hover:border-purple-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => setExpandedIndex(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-card/40 hover:bg-card/70 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 font-bold text-xs",
									children: idx + 1
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 161,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "text-sm font-bold text-foreground truncate",
											children: titreAffiche
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 166,
											columnNumber: 23
										}, this), exp.kpi && /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] hidden sm:inline-flex",
											children: "✨ KPI chiffré"
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 170,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 165,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: sousTitre || "Détails à renseigner"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 175,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 164,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 160,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [
									exp.enCours && /* @__PURE__ */ (void 0)(Badge, {
										className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]",
										children: "Poste actuel"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 183,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: (e) => {
											e.stopPropagation();
											handleSupprimer(idx);
										},
										className: "h-7 w-7 p-0 text-muted-foreground hover:text-rose-400",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 196,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 187,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: isExpanded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 200,
											columnNumber: 23
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 202,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 198,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 181,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 156,
							columnNumber: 15
						}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 bg-background/30 space-y-5",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Intitulé du poste *"
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 213,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Input$1, {
											value: exp.poste,
											onChange: (e) => handleModifier(idx, { poste: e.target.value }),
											placeholder: "Ex : Bras Droit du CEO, Analyste Financier, Chef de Projet..."
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 216,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 212,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Entreprise / Organisation *"
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 226,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Input$1, {
											value: exp.entreprise,
											onChange: (e) => handleModifier(idx, { entreprise: e.target.value }),
											placeholder: "Ex : LVMH, BNP Paribas, Swile, BCG..."
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 229,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 225,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 211,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Type de contrat"
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 241,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: exp.typeContrat || "Stage",
												onChange: (e) => handleModifier(idx, { typeContrat: e.target.value }),
												placeholder: "Ex : Stage, Alternance, CDI, Projet..."
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 244,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$9,
											lineNumber: 240,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Ville / Lieu"
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 254,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: exp.ville || "",
												onChange: (e) => handleModifier(idx, { ville: e.target.value }),
												placeholder: "Ex : Paris, Lyon, Londres, Remote..."
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 257,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$9,
											lineNumber: 253,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Période"
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 267,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Input$1, {
												value: exp.periode || "",
												onChange: (e) => handleModifier(idx, { periode: e.target.value }),
												placeholder: "Ex : Janv. 2024 - Juil. 2024 (6 mois)"
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 270,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$9,
											lineNumber: 266,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 239,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (void 0)(Switch, {
										checked: Boolean(exp.enCours),
										onCheckedChange: (c) => handleModifier(idx, { enCours: c })
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 281,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-foreground cursor-pointer",
										children: "J'occupe actuellement ce poste"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 287,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 280,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Missions & Responsabilités principales *"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 294,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Textarea, {
										rows: 3,
										value: exp.description || "",
										onChange: (e) => handleModifier(idx, { description: e.target.value }),
										placeholder: "Ex : • Pilotage des dashboards de performance et reporting hebdomadaire au CoDir\n• Coordination de 3 agences partenaires pour le lancement du nouveau produit\n• Analyse concurrentielle et benchmark sur 12 acteurs du marché...",
										className: "text-xs leading-relaxed"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 297,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 293,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs font-bold text-emerald-400 flex items-center gap-1.5",
												children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName$9,
													lineNumber: 312,
													columnNumber: 25
												}, this), "Réalisations clés & Indicateurs chiffrés (KPI)"]
											}, void 0, true, {
												fileName: _jsxFileName$9,
												lineNumber: 311,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(Badge, {
												className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]",
												children: "Boost ATS & Matching"
											}, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 315,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$9,
											lineNumber: 310,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)(Textarea, {
											rows: 2,
											value: exp.kpi || exp.realisationsCles || (exp.realisations ? exp.realisations.join("\n") : ""),
											onChange: (e) => handleModifier(idx, {
												kpi: e.target.value,
												realisationsCles: e.target.value,
												realisations: e.target.value.split("\n").filter(Boolean)
											}),
											placeholder: "Ex : • +32% d'acquisition de leads qualifiés en 3 mois\n• Gestion d'un budget marketing de 45k€ avec ROI de x3.4\n• Réduction de 20% du temps de traitement des dossiers",
											className: "text-xs text-emerald-200 placeholder:text-emerald-400/40 bg-background/50 border-emerald-500/20 focus-visible:ring-emerald-500"
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 319,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "💡 Les chiffres concrets (croissance, volumes, budgets, satisfaction) multiplient par 2 l'impact auprès des recruteurs."
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 338,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 309,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(Layers, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 348,
											columnNumber: 23
										}, this), "Outils, logiciels et compétences mobilisés (séparés par des virgules)"]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 347,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Input$1, {
										value: (exp.technologies || []).join(", "),
										onChange: (e) => handleModifier(idx, { technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex : Excel (VBA / TCD), Figma, SQL, Notion, Salesforce, Google Analytics..."
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 352,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 346,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 210,
							columnNumber: 17
						}, this)]
					}, exp.id || idx, true, {
						fileName: _jsxFileName$9,
						lineNumber: 151,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 136,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 83,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/profil/ProfilSkillsTab.tsx";
function ProfilSkillsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const competencesList = cv?.competences || [];
	const [nouvelleHardSkill, setNouvelleHardSkill] = (0, import_react.useState)("");
	const [niveauHardSkill, setNiveauHardSkill] = (0, import_react.useState)("Intermédiaire");
	const updateCompetences = (nouvelles) => {
		onChange({
			competences: nouvelles.map((c) => `${c.nom} (${c.niveau || "Intermédiaire"})`).join(", ") || profil.competences,
			cvStructure: {
				...cv,
				competences: nouvelles
			}
		});
	};
	const handleAjouterHardSkill = () => {
		if (!nouvelleHardSkill.trim()) return;
		const nc = {
			id: crypto.randomUUID(),
			nom: nouvelleHardSkill.trim(),
			niveau: niveauHardSkill,
			categorie: "Hard Skill"
		};
		updateCompetences([...competencesList, nc]);
		setNouvelleHardSkill("");
	};
	const handleSupprimerCompetence = (id) => {
		updateCompetences(competencesList.filter((c) => c.id !== id));
	};
	const handleModifierNiveau = (id, niveau) => {
		updateCompetences(competencesList.map((c) => c.id === id ? {
			...c,
			niveau
		} : c));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cpu, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 88,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 87,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: [
								"Hard Skills & Compétences Techniques (",
								competencesList.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 91,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Définissez votre niveau de maîtrise pour affiner le calcul de compatibilité du Match IA"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 94,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 90,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 86,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2 items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[240px] space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Compétence technique"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 104,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: nouvelleHardSkill,
									onChange: (e) => setNouvelleHardSkill(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											handleAjouterHardSkill();
										}
									},
									placeholder: "Ex : Modélisation financière, Python, SEO, Google Ads, UX Research..."
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 107,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 103,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-40 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Niveau"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 121,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: niveauHardSkill,
									onValueChange: (v) => setNiveauHardSkill(v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "text-xs h-10",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 127,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 126,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n, false, {
										fileName: _jsxFileName$8,
										lineNumber: 131,
										columnNumber: 19
									}, this)) }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 129,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 122,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 120,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								onClick: handleAjouterHardSkill,
								className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white h-10 px-4 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 144,
									columnNumber: 13
								}, this), "Ajouter"]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 139,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 102,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
						categorie: "competences",
						valeurActuelle: profil.competences,
						onSelectSuggestion: (nom) => {
							if (!competencesList.some((c) => c.nom.toLowerCase() === nom.toLowerCase())) {
								const nc = {
									id: crypto.randomUUID(),
									nom,
									niveau: "Intermédiaire",
									categorie: "Hard Skill"
								};
								updateCompetences([...competencesList, nc]);
							}
						}
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 149,
						columnNumber: 9
					}, this),
					competencesList.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-2",
						children: competencesList.map((comp) => /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/60 p-2.5 px-3 transition-colors hover:border-purple-500/30",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-xs font-semibold text-foreground truncate",
									children: comp.nom
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 178,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] text-purple-400 font-medium",
									children: comp.niveau || "Intermédiaire"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 181,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 177,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (void 0)(Select, {
									value: comp.niveau || "Intermédiaire",
									onValueChange: (n) => handleModifierNiveau(comp.id, n),
									children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
										className: "h-6 w-20 text-[10px] px-1.5 border-border/60",
										children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 194,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 193,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n, false, {
										fileName: _jsxFileName$8,
										lineNumber: 198,
										columnNumber: 25
									}, this)) }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 196,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 187,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => handleSupprimerCompetence(comp.id),
									className: "h-6 w-6 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 211,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 205,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 186,
								columnNumber: 17
							}, this)]
						}, comp.id, true, {
							fileName: _jsxFileName$8,
							lineNumber: 173,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 171,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 85,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 224,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 223,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Logiciels & Outils du Quotidien"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 227,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Outils bureautiques, design, analytics, développement et CRM"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 230,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 226,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 222,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Logiciels maîtrisés (séparés par des virgules)"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 237,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
							value: profil.logiciels,
							onChange: (e) => onChange({ logiciels: e.target.value }),
							placeholder: "Ex : Excel (RechercheX, TCD, VBA), Figma, Notion, Salesforce, Google Analytics, PowerBI, SQL, Slack..."
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 240,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 236,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
						categorie: "logiciels",
						valeurActuelle: profil.logiciels,
						onSelectSuggestion: (val) => {
							const current = profil.logiciels ? profil.logiciels.split(",").map((s) => s.trim()).filter(Boolean) : [];
							if (!current.includes(val)) onChange({ logiciels: [...current, val].join(", ") });
						}
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 247,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 221,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 268,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 267,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Soft Skills & Savoir-être"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 271,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Qualités humaines et relationnelles valorisées en entretien"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 274,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 270,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 266,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Vos atouts relationnels et méthodes de travail"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 281,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
						value: (cv?.softSkills || []).join(", "),
						onChange: (e) => onChange({ cvStructure: {
							...cv,
							softSkills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
						} }),
						placeholder: "Ex : Aisance relationnelle, Esprit d'analyse, Rigueur, Leadership, Autonomie, Adaptabilité, Esprit d'équipe..."
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 284,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 280,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 265,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 83,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/components/profil/ProfilLanguagesCertifsTab.tsx";
function ProfilLanguagesCertifsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const languesList = cv?.langues || [];
	const certifsList = cv?.certifications || [];
	const [nouvelleLangueNom, setNouvelleLangueNom] = (0, import_react.useState)("");
	const [niveauLangueSelect, setNiveauLangueSelect] = (0, import_react.useState)("Courant (C1)");
	const [scoreOfficiel, setScoreOfficiel] = (0, import_react.useState)("");
	const updateLangues = (nouvelles) => {
		onChange({
			langues: nouvelles.map((l) => `${l.langue} (${l.niveau || "Courant"})`).join(", ") || profil.langues,
			cvStructure: {
				...cv,
				langues: nouvelles
			}
		});
	};
	const updateCertifications = (nouvelles) => {
		onChange({ cvStructure: {
			...cv,
			certifications: nouvelles
		} });
	};
	const handleAjouterLangue = () => {
		if (!nouvelleLangueNom.trim()) return;
		const nl = {
			id: crypto.randomUUID(),
			langue: nouvelleLangueNom.trim(),
			niveau: niveauLangueSelect,
			score: scoreOfficiel.trim() || void 0
		};
		updateLangues([...languesList, nl]);
		setNouvelleLangueNom("");
		setScoreOfficiel("");
	};
	const handleSupprimerLangue = (id) => {
		updateLangues(languesList.filter((l) => l.id !== id));
	};
	const handleAjouterCertif = () => {
		const nc = nouvelleCertification();
		updateCertifications([...certifsList, nc]);
	};
	const handleSupprimerCertif = (id) => {
		updateCertifications(certifsList.filter((c) => c.id !== id));
	};
	const handleModifierCertif = (id, patch) => {
		updateCertifications(certifsList.map((c) => c.id === id ? {
			...c,
			...patch
		} : c));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 111,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 110,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Langues Maîtrisées (",
							languesList.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 114,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Évaluez votre niveau sur l'échelle CECRL et mentionnez vos scores officiels (TOEIC, TOEFL...)"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 117,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 113,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 109,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-4 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Langue"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 127,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: nouvelleLangueNom,
								onChange: (e) => setNouvelleLangueNom(e.target.value),
								placeholder: "Ex : Anglais, Espagnol, Allemand, Chinois..."
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 128,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 126,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau CECRL"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 136,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: niveauLangueSelect,
								onValueChange: (v) => setNiveauLangueSelect(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 144,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 143,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_LANGUE.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: n,
									className: "text-xs",
									children: n
								}, n, false, {
									fileName: _jsxFileName$7,
									lineNumber: 148,
									columnNumber: 19
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 146,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 139,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 135,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							onClick: handleAjouterLangue,
							className: "gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white h-10 px-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 161,
								columnNumber: 13
							}, this), "Ajouter"]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 156,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 125,
					columnNumber: 9
				}, this),
				languesList.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-2.5 sm:grid-cols-2 pt-2",
					children: languesList.map((lang) => /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/60 p-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-0.5 min-w-0",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "font-semibold text-xs text-foreground block truncate",
								children: lang.langue
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 175,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-indigo-400 font-medium",
									children: lang.niveau
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 179,
									columnNumber: 21
								}, this), lang.score && /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground",
									children: ["Score : ", lang.score]
								}, void 0, true, {
									fileName: _jsxFileName$7,
									lineNumber: 183,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 178,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 174,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => handleSupprimerLangue(lang.id),
							className: "h-7 w-7 p-0 text-muted-foreground hover:text-rose-400",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 196,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 190,
							columnNumber: 17
						}, this)]
					}, lang.id, true, {
						fileName: _jsxFileName$7,
						lineNumber: 170,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 168,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 108,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 209,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 208,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: [
								"Certifications & Accréditations (",
								certifsList.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 212,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "AMF, Bloomberg, Google, CFA, AWS, HubSpot, Microsoft, Scrum..."
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 215,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 211,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 207,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						onClick: handleAjouterCertif,
						className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 226,
							columnNumber: 13
						}, this), "Ajouter une certification"]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 221,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 206,
					columnNumber: 9
				}, this),
				certifsList.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "text-center py-6 text-xs text-muted-foreground space-y-2",
					children: [/* @__PURE__ */ (void 0)("p", { children: "Aucune certification ajoutée pour le moment." }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 233,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-[11px]",
						children: "💡 Les certifications professionnelles attestent de vos compétences opérationnelles dès le premier tri."
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 234,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 232,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3",
					children: certifsList.map((cert) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
								value: cert.nom,
								onChange: (e) => handleModifierCertif(cert.id, { nom: e.target.value }),
								placeholder: "Nom de la certification (ex: Certification AMF, Google Data Analytics...)",
								className: "text-xs font-semibold"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 248,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => handleSupprimerCertif(cert.id),
								className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 262,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 256,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 247,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: cert.emetteur || "",
									onChange: (e) => handleModifierCertif(cert.id, { emetteur: e.target.value }),
									placeholder: "Organisme (ex: Google, CFA Institute, Bloomberg...)",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 267,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: cert.annee || "",
									onChange: (e) => handleModifierCertif(cert.id, { annee: e.target.value }),
									placeholder: "Année / Date d'obtention (ex: 2024)",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 275,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
									value: cert.url || "",
									onChange: (e) => handleModifierCertif(cert.id, { url: e.target.value }),
									placeholder: "Lien / URL de vérification (optionnel)",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 283,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 266,
							columnNumber: 15
						}, this)]
					}, cert.id, true, {
						fileName: _jsxFileName$7,
						lineNumber: 243,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 241,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 205,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 106,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/profil/ProfilProjectsEngagementsTab.tsx";
function ProfilProjectsEngagementsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const projets = cv?.projets || [];
	const benevolats = cv?.benevolats || [];
	cv?.distinctions;
	const updateProjets = (nouv) => {
		onChange({ cvStructure: {
			...cv,
			projets: nouv
		} });
	};
	const updateBenevolats = (nouv) => {
		onChange({ cvStructure: {
			...cv,
			benevolats: nouv
		} });
	};
	const handleAjouterProjet = () => {
		updateProjets([nouveauProjet(), ...projets]);
	};
	const handleSupprimerProjet = (id) => {
		updateProjets(projets.filter((p) => p.id !== id));
	};
	const handleModifierProjet = (id, patch) => {
		updateProjets(projets.map((p) => p.id === id ? {
			...p,
			...patch
		} : p));
	};
	const handleAjouterBenevolat = () => {
		updateBenevolats([nouveauBenevolat(), ...benevolats]);
	};
	const handleSupprimerBenevolat = (id) => {
		updateBenevolats(benevolats.filter((b) => b.id !== id));
	};
	const handleModifierBenevolat = (id, patch) => {
		updateBenevolats(benevolats.map((b) => b.id === id ? {
			...b,
			...patch
		} : b));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lightbulb, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 97,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 96,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Projets Personnels, Freelance & Hackathons (",
									projets.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 100,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Applications créées, études de cas, business plans ou projets concrets"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 103,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 99,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 95,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterProjet,
							className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 115,
								columnNumber: 13
							}, this), "Ajouter un projet"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 110,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 94,
						columnNumber: 9
					}, this),
					projets.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun projet renseigné. Les projets concrets prouvent vos compétences pratiques !"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 121,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: projets.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
										value: p.titre,
										onChange: (e) => handleModifierProjet(p.id, { titre: e.target.value }),
										placeholder: "Nom du projet (ex: Lancement d'un e-commerce, Hackathon IA...)",
										className: "text-xs font-semibold"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 134,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerProjet(p.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 148,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 142,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 133,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											value: p.role || "",
											onChange: (e) => handleModifierProjet(p.id, { role: e.target.value }),
											placeholder: "Votre rôle (ex: Lead Product, Développeur...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 153,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											value: p.periode || "",
											onChange: (e) => handleModifierProjet(p.id, { periode: e.target.value }),
											placeholder: "Période (ex: 2024, 3 mois...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 161,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
											value: p.url || "",
											onChange: (e) => handleModifierProjet(p.id, { url: e.target.value }),
											placeholder: "Lien / Demo (ex: github.com/...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 169,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 152,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									value: p.description || "",
									onChange: (e) => handleModifierProjet(p.id, { description: e.target.value }),
									placeholder: "Description du projet, contexte et résultats obtenus...",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 179,
									columnNumber: 15
								}, this)
							]
						}, p.id, true, {
							fileName: _jsxFileName$6,
							lineNumber: 129,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 127,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeartHandshake, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 198,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 197,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Associations Étudiantes & Engagements (",
									benevolats.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 201,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Mandats BDE, Junior-Entreprise, pôle humanitaire, clubs sportifs..."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 204,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 200,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 196,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterBenevolat,
							className: "gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 216,
								columnNumber: 13
							}, this), "Ajouter un engagement"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 211,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 195,
						columnNumber: 9
					}, this),
					benevolats.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun engagement associatif renseigné."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 222,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: benevolats.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
										value: b.organisation,
										onChange: (e) => handleModifierBenevolat(b.id, { organisation: e.target.value }),
										placeholder: "Nom de l'association / Organisation (ex: Junior Entreprise, BDE...)",
										className: "text-xs font-semibold"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 234,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerBenevolat(b.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 250,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 244,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 233,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
										value: b.role,
										onChange: (e) => handleModifierBenevolat(b.id, { role: e.target.value }),
										placeholder: "Rôle / Mandat (ex: Vice-Président, Trésorier, Chef de projet...)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 255,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
										value: b.periode || "",
										onChange: (e) => handleModifierBenevolat(b.id, { periode: e.target.value }),
										placeholder: "Période (ex: 2023 - 2024)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 263,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 254,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									value: b.description || "",
									onChange: (e) => handleModifierBenevolat(b.id, { description: e.target.value }),
									placeholder: "Réalisations : gestion de budget, organisation d'événements (nb de participants)...",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 273,
									columnNumber: 15
								}, this)
							]
						}, b.id, true, {
							fileName: _jsxFileName$6,
							lineNumber: 229,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 227,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 194,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 291,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 290,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Centres d'intérêt & Passions Authentiques"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 294,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sports, musique, voyages, lectures, centres de curiosité personnelle"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 297,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 293,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 289,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
					value: (cv?.centresInteret || []).join(", "),
					onChange: (e) => onChange({ cvStructure: {
						...cv,
						centresInteret: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
					} }),
					placeholder: "Ex : Course à pied (Semi-marathon de Paris), Piano jazz (10 ans de pratique), Voyages en autonomie, Échecs...",
					className: "text-xs"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 304,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 288,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/profil/ProfilPreferencesTab.tsx";
var NIVEAUX_IMPORTANCE = [
	{
		value: "Très important",
		label: "Très important (x2)",
		color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
	},
	{
		value: "Important",
		label: "Important (x1.5)",
		color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
	},
	{
		value: "Moyen",
		label: "Moyen (x1)",
		color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
	},
	{
		value: "Faible",
		label: "Faible (x0.5)",
		color: "text-muted-foreground bg-secondary border-border/50"
	}
];
var LABELS_CRITERES = {
	missions: {
		label: "Intérêt & Richesse des missions",
		desc: "Adéquation avec votre projet professionnel et complexité des tâches",
		icon: "🎯"
	},
	secteur: {
		label: "Secteur d'activité",
		desc: "Affinité avec l'industrie, le produit ou le domaine de l'entreprise",
		icon: "🏢"
	},
	localisation: {
		label: "Localisation & Temps de trajet",
		desc: "Proximité géographique et facilité d'accès au lieu de travail",
		icon: "📍"
	},
	remuneration: {
		label: "Rémunération & Gratification",
		desc: "Montant mensuel, primes, tickets resto et avantages",
		icon: "💰"
	},
	teletravail: {
		label: "Politique de Télétravail",
		desc: "Flexibilité du rythme de travail (hybride, remote)",
		icon: "💻"
	},
	"taille entreprise": {
		label: "Taille d'entreprise & Culture",
		desc: "Scale-up, Grand groupe, Startup, dynamique d'équipe",
		icon: "👥"
	}
};
function ProfilPreferencesTab({ profil, onChange }) {
	const criteres = profil.criteres || {};
	const preferences = profil.preferences || profil.cvStructure?.preferences || {};
	const handleImportanceChange = (critere, value) => {
		onChange({ criteres: {
			...criteres,
			[critere]: value
		} });
	};
	const handlePreferencesChange = (patch) => {
		const nextPrefs = {
			...preferences,
			...patch
		};
		onChange({
			preferences: nextPrefs,
			cvStructure: {
				...profil.cvStructure,
				preferences: {
					...profil.cvStructure.preferences,
					...nextPrefs
				}
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 border-b border-border/50 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 129,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 128,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: "Pondération des Critères de Matching"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 132,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Ajustez l'importance de chaque critère dans le calcul du Score IA de correspondance"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 135,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 131,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 127,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: CRITERES.map((c) => {
					const info = LABELS_CRITERES[c] || {
						label: c,
						desc: "",
						icon: "📌"
					};
					const currentImportance = criteres[c] || "Important";
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 p-3.5 px-4 transition-colors hover:border-purple-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-lg",
								children: info.icon
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 158,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-0.5 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-xs font-bold text-foreground",
									children: info.label
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 160,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground truncate",
									children: info.desc
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 163,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 159,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 157,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "shrink-0 flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: currentImportance,
								onValueChange: (val) => handleImportanceChange(c, val),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "h-8 w-44 text-xs font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 177,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 176,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_IMPORTANCE.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: n.value,
									className: "text-xs font-medium",
									children: n.label
								}, n.value, false, {
									fileName: _jsxFileName$5,
									lineNumber: 181,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 179,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 170,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 169,
							columnNumber: 17
						}, this)]
					}, c, true, {
						fileName: _jsxFileName$5,
						lineNumber: 153,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 142,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 126,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-card p-5 sm:p-6 space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 border-b border-border/50 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 202,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 201,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: "Critères Non Négociables & Secteurs à Éviter"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 205,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground",
					children: "Permet à l'IA d'écarter ou de déclasser automatiquement les offres incompatibles"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 208,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 204,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 200,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Secteurs ou types d'entreprises à éviter"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 217,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
						value: (preferences.secteursAEviter || []).join(", "),
						onChange: (e) => handlePreferencesChange({ secteursAEviter: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
						placeholder: "Ex : Tabac, Armement, Grande distribution, Téléprospection...",
						className: "text-xs"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 220,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 216,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Critères rédhibitoires / Non négociables"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 236,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
						value: (preferences.criteresNonNegociables || []).join(", "),
						onChange: (e) => handlePreferencesChange({ criteresNonNegociables: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
						placeholder: "Ex : Pas de stage non rémunéré, Déplacements max 1j/semaine, Localisation Île-de-France uniquement...",
						className: "text-xs"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 239,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 235,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 215,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 199,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 124,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/CvBuilder.tsx";
function Champ({ label, value, onChange, placeholder, className, type }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("grid min-w-0 gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 68,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
			value,
			type,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 69,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
function Bloc({ icone: Icone, titre, compte, onAjouter, labelAjout, children, defaultOpen }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen ?? true);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "glass-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setOpen((o) => !o),
				className: "flex min-w-0 items-center gap-3 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icone, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 106,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 105,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block truncate text-sm font-semibold",
							children: titre
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 109,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block text-xs text-muted-foreground",
							children: [
								compte,
								" élément",
								compte > 1 ? "s" : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 112,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 116,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 100,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onAjouter,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 124,
						columnNumber: 11
					}, this),
					" ",
					labelAjout
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 123,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 99,
			columnNumber: 7
		}, this), open && /* @__PURE__ */ (void 0)("div", {
			className: "grid gap-4 border-t border-border/60 p-4 sm:p-5",
			children
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 128,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 98,
		columnNumber: 5
	}, this);
}
function Carte({ titre, sousTitre, onSupprimer, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "rounded-2xl border border-border/60 bg-card/40 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-3 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "truncate text-sm font-medium",
					children: titre || "Nouvel élément"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 151,
					columnNumber: 11
				}, this), sousTitre && /* @__PURE__ */ (void 0)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: sousTitre
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 155,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 150,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "icon",
				variant: "ghost",
				className: "size-8 text-muted-foreground hover:text-destructive",
				onClick: onSupprimer,
				"aria-label": "Supprimer",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 167,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 160,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 149,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-3",
			children
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 170,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 148,
		columnNumber: 5
	}, this);
}
function ListePuces({ label, valeurs, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
					className: "text-xs text-muted-foreground",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 189,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-7 px-2 text-xs",
					onClick: () => onChange([...valeurs, ""]),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 196,
						columnNumber: 11
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 190,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 188,
				columnNumber: 7
			}, this),
			valeurs.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground",
				children: "Aucune ligne pour l'instant."
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 200,
				columnNumber: 9
			}, this),
			valeurs.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input$1, {
					value: v,
					placeholder,
					onChange: (e) => {
						const next = [...valeurs];
						next[i] = e.target.value;
						onChange(next);
					}
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 206,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "icon",
					variant: "ghost",
					className: "size-8 shrink-0 text-muted-foreground hover:text-destructive",
					onClick: () => onChange(valeurs.filter((_, j) => j !== i)),
					"aria-label": "Retirer",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 222,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 215,
					columnNumber: 11
				}, this)]
			}, i, true, {
				fileName: _jsxFileName$4,
				lineNumber: 205,
				columnNumber: 9
			}, this))
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 187,
		columnNumber: 5
	}, this);
}
var ONGLETS = [
	{
		id: "identite",
		label: "Identité",
		icone: UserRound
	},
	{
		id: "experiences",
		label: "Expériences",
		icone: Briefcase
	},
	{
		id: "formations",
		label: "Formations",
		icone: GraduationCap
	},
	{
		id: "competences",
		label: "Compétences & langues",
		icone: Wrench
	},
	{
		id: "realisations",
		label: "Certifs & projets",
		icone: Award
	},
	{
		id: "engagements",
		label: "Engagements",
		icone: Heart
	}
];
function CvBuilder({ value, onChange }) {
	const [onglet, setOnglet] = (0, import_react.useState)("identite");
	const set = (patch) => onChange({
		...value,
		...patch
	});
	const maj = (cle, index, patch) => {
		const next = value[cle].map((x, i) => i === index ? {
			...x,
			...patch
		} : x);
		set({ [cle]: next });
	};
	const retirer = (cle, index) => {
		const liste = value[cle];
		set({ [cle]: liste.filter((_, i) => i !== index) });
	};
	const completion = completionCv(value);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 268,
								columnNumber: 13
							}, this), " Complétion de votre CV"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 267,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm font-semibold text-primary",
							children: [completion, " %"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 270,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 266,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
						value: completion,
						className: "mt-3 h-2"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 274,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Plus votre CV est détaillé, plus le Match IA et la préparation aux entretiens sont précis."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 275,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 265,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1",
				children: ONGLETS.map((o) => {
					const Icone = o.icone;
					const actif = onglet === o.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setOnglet(o.id),
						className: cn("flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition", actif ? "border-primary/40 bg-primary/15 text-primary" : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icone, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 296,
								columnNumber: 15
							}, this),
							" ",
							o.label
						]
					}, o.id, true, {
						fileName: _jsxFileName$4,
						lineNumber: 285,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 280,
				columnNumber: 7
			}, this),
			onglet === "identite" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)("section", {
				className: "glass-card p-4 sm:p-5",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (void 0)(UserRound, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 308,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 307,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("h3", {
						className: "text-sm font-semibold",
						children: "En-tête du CV"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 310,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 306,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Titre du CV",
							value: value.titre,
							onChange: (v) => set({ titre: v }),
							placeholder: "Étudiant M1 — Marketing digital"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 313,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Ville",
							value: value.ville,
							onChange: (v) => set({ ville: v }),
							placeholder: "Paris"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 319,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Email",
							value: value.email,
							onChange: (v) => set({ email: v }),
							placeholder: "prenom.nom@email.com"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 325,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Téléphone",
							value: value.telephone,
							onChange: (v) => set({ telephone: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 331,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "LinkedIn",
							value: value.linkedin,
							onChange: (v) => set({ linkedin: v }),
							placeholder: "linkedin.com/in/…"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 336,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Portfolio / site",
							value: value.portfolio,
							onChange: (v) => set({ portfolio: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 342,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Permis / mobilité",
							value: value.permis,
							onChange: (v) => set({ permis: v }),
							placeholder: "Permis B, véhiculé"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 347,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Accroche"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 354,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Textarea, {
								rows: 3,
								value: value.accroche,
								onChange: (e) => set({ accroche: e.target.value }),
								placeholder: "2 à 3 phrases sur votre projet et votre valeur ajoutée."
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 357,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 353,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 312,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 305,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 303,
				columnNumber: 9
			}, this),
			onglet === "experiences" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)(Bloc, {
				icone: Briefcase,
				titre: "Expériences",
				compte: value.experiences.length,
				labelAjout: "Expérience",
				onAjouter: () => set({ experiences: [...value.experiences, nouvelleExperience()] }),
				children: [value.experiences.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ajoutez vos stages, alternances, jobs et missions."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 383,
					columnNumber: 15
				}, this), value.experiences.map((e, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: e.poste,
					sousTitre: [e.entreprise, e.lieu].filter(Boolean).join(" · "),
					onSupprimer: () => retirer("experiences", i),
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Poste",
									value: e.poste,
									onChange: (v) => maj("experiences", i, { poste: v })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 395,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Entreprise",
									value: e.entreprise,
									onChange: (v) => maj("experiences", i, { entreprise: v })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 400,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Lieu",
									value: e.lieu,
									onChange: (v) => maj("experiences", i, { lieu: v })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 405,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Type de contrat",
									value: e.contrat,
									onChange: (v) => maj("experiences", i, { contrat: v }),
									placeholder: "Stage, alternance, CDD…"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 410,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Début",
									value: e.debut,
									onChange: (v) => maj("experiences", i, { debut: v }),
									placeholder: "09/2024"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 416,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Fin",
									value: e.fin,
									onChange: (v) => maj("experiences", i, { fin: v }),
									placeholder: "02/2025"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 422,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 394,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (void 0)(Switch, {
								checked: e.enCours,
								onCheckedChange: (v) => maj("experiences", i, { enCours: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 430,
								columnNumber: 19
							}, this), "Poste actuel"]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 429,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Contexte / missions"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 439,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Textarea, {
								rows: 3,
								value: e.description,
								onChange: (ev) => maj("experiences", i, { description: ev.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 442,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 438,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(ListePuces, {
							label: "Réalisations (une par ligne)",
							valeurs: e.realisations,
							placeholder: "Augmenté le taux d'ouverture de 18 %",
							onChange: (v) => maj("experiences", i, { realisations: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 450,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(ListePuces, {
							label: "Compétences mobilisées",
							valeurs: e.competences,
							placeholder: "Excel avancé",
							onChange: (v) => maj("experiences", i, { competences: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 456,
							columnNumber: 17
						}, this)
					]
				}, e.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 388,
					columnNumber: 15
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 373,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 370,
				columnNumber: 9
			}, this),
			onglet === "formations" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)(Bloc, {
				icone: GraduationCap,
				titre: "Formations",
				compte: value.formations.length,
				labelAjout: "Formation",
				onAjouter: () => set({ formations: [...value.formations, nouvelleFormation()] }),
				children: value.formations.map((f, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: f.diplome,
					sousTitre: f.etablissement,
					onSupprimer: () => retirer("formations", i),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Diplôme",
								value: f.diplome,
								onChange: (v) => maj("formations", i, { diplome: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 489,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Établissement",
								value: f.etablissement,
								onChange: (v) => maj("formations", i, { etablissement: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 494,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lieu",
								value: f.lieu,
								onChange: (v) => maj("formations", i, { lieu: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 499,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Mention",
								value: f.mention,
								onChange: (v) => maj("formations", i, { mention: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 504,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Début",
								value: f.debut,
								onChange: (v) => maj("formations", i, { debut: v }),
								placeholder: "2023"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 509,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Fin",
								value: f.fin,
								onChange: (v) => maj("formations", i, { fin: v }),
								placeholder: "2026"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 515,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 488,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Spécialisations, cours clés, projets"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 523,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 2,
							value: f.details,
							onChange: (ev) => maj("formations", i, { details: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 526,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 522,
						columnNumber: 17
					}, this)]
				}, f.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 482,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 472,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 469,
				columnNumber: 9
			}, this),
			onglet === "competences" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Bloc, {
				icone: Wrench,
				titre: "Compétences",
				compte: value.competences.length,
				labelAjout: "Compétence",
				onAjouter: () => set({ competences: [...value.competences, nouvelleCompetence()] }),
				children: value.competences.map((c, i) => /* @__PURE__ */ (void 0)("div", {
					className: "grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Compétence",
							value: c.nom,
							onChange: (v) => maj("competences", i, { nom: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 558,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Catégorie",
							value: c.categorie,
							onChange: (v) => maj("competences", i, { categorie: v }),
							placeholder: "Technique, logiciel, soft skill…"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 563,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 570,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Select, {
								value: c.niveau,
								onValueChange: (v) => maj("competences", i, { niveau: v }),
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 580,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 579,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
									value: n,
									children: n
								}, n, false, {
									fileName: _jsxFileName$4,
									lineNumber: 584,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 582,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 573,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 569,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "icon",
							variant: "ghost",
							className: "size-9 text-muted-foreground hover:text-destructive",
							onClick: () => retirer("competences", i),
							"aria-label": "Supprimer",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 598,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 591,
							columnNumber: 17
						}, this)
					]
				}, c.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 554,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 544,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)(Bloc, {
				icone: Languages,
				titre: "Langues",
				compte: value.langues.length,
				labelAjout: "Langue",
				onAjouter: () => set({ langues: [...value.langues, nouvelleLangue()] }),
				children: value.langues.map((l, i) => /* @__PURE__ */ (void 0)("div", {
					className: "grid items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]",
					children: [
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Langue",
							value: l.nom,
							onChange: (v) => maj("langues", i, { nom: v })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 619,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 625,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Select, {
								value: l.niveau,
								onValueChange: (v) => maj("langues", i, { niveau: v }),
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 635,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 634,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_LANGUE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
									value: n,
									children: n
								}, n, false, {
									fileName: _jsxFileName$4,
									lineNumber: 639,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 637,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 628,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 624,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Certification",
							value: l.certification,
							onChange: (v) => maj("langues", i, { certification: v }),
							placeholder: "TOEIC 900"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 646,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "icon",
							variant: "ghost",
							className: "size-9 text-muted-foreground hover:text-destructive",
							onClick: () => retirer("langues", i),
							"aria-label": "Supprimer",
							children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 659,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 652,
							columnNumber: 17
						}, this)
					]
				}, l.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 615,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 605,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 541,
				columnNumber: 9
			}, this),
			onglet === "realisations" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Bloc, {
				icone: Award,
				titre: "Certifications & diplômes complémentaires",
				compte: value.certifications.length,
				labelAjout: "Certification",
				onAjouter: () => set({ certifications: [...value.certifications, nouvelleCertification()] }),
				children: value.certifications.map((c, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: c.nom,
					sousTitre: c.organisme,
					onSupprimer: () => retirer("certifications", i),
					children: /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Intitulé",
								value: c.nom,
								onChange: (v) => maj("certifications", i, { nom: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 693,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Organisme",
								value: c.organisme,
								onChange: (v) => maj("certifications", i, { organisme: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 698,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Date d'obtention",
								value: c.date,
								onChange: (v) => maj("certifications", i, { date: v }),
								placeholder: "06/2025"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 703,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Identifiant / score",
								value: c.identifiant,
								onChange: (v) => maj("certifications", i, { identifiant: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 709,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lien",
								value: c.lien,
								onChange: (v) => maj("certifications", i, { lien: v }),
								className: "sm:col-span-2"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 716,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 692,
						columnNumber: 17
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName$4,
					lineNumber: 686,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 671,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)(Bloc, {
				icone: Lightbulb,
				titre: "Projets",
				compte: value.projets.length,
				labelAjout: "Projet",
				onAjouter: () => set({ projets: [...value.projets, nouveauProjet()] }),
				children: value.projets.map((p, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: p.nom,
					sousTitre: p.role,
					onSupprimer: () => retirer("projets", i),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Nom du projet",
								value: p.nom,
								onChange: (v) => maj("projets", i, { nom: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 745,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Votre rôle",
								value: p.role,
								onChange: (v) => maj("projets", i, { role: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 750,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Période",
								value: p.periode,
								onChange: (v) => maj("projets", i, { periode: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 755,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lien",
								value: p.lien,
								onChange: (v) => maj("projets", i, { lien: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 760,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 744,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 767,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 3,
							value: p.description,
							onChange: (ev) => maj("projets", i, { description: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 770,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 766,
						columnNumber: 17
					}, this)]
				}, p.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 738,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 728,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 668,
				columnNumber: 9
			}, this),
			onglet === "engagements" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)(Bloc, {
				icone: Heart,
				titre: "Engagements & centres d'intérêt",
				compte: value.benevolats.length + value.interets.length,
				labelAjout: "Engagement",
				onAjouter: () => set({ benevolats: [...value.benevolats, nouveauBenevolat()] }),
				children: [value.benevolats.map((b, i) => /* @__PURE__ */ (void 0)(Carte, {
					titre: b.role,
					sousTitre: b.organisation,
					onSupprimer: () => retirer("benevolats", i),
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Rôle",
								value: b.role,
								onChange: (v) => maj("benevolats", i, { role: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 804,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Organisation",
								value: b.organisation,
								onChange: (v) => maj("benevolats", i, { organisation: v })
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 809,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Période",
								value: b.periode,
								onChange: (v) => maj("benevolats", i, { periode: v }),
								className: "sm:col-span-2"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 814,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 803,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 822,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 2,
							value: b.description,
							onChange: (ev) => maj("benevolats", i, { description: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 825,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 821,
						columnNumber: 17
					}, this)]
				}, b.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 797,
					columnNumber: 15
				}, this)), /* @__PURE__ */ (void 0)(ListePuces, {
					label: "Centres d'intérêt",
					valeurs: value.interets,
					placeholder: "Course à pied, photographie…",
					onChange: (v) => set({ interets: v })
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 835,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 787,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 785,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 264,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/profil/ProfilDocumentsTab.tsx";
function ProfilDocumentsTab({ profil, onChange, onOpenCvModal }) {
	const [modeVue, setModeVue] = (0, import_react.useState)("editeur");
	const [copie, setCopie] = (0, import_react.useState)(false);
	const cv = normaliserCvStructure(profil.cvStructure);
	const texteCv = cvStructureEnTexte(cv);
	const copierTexte = () => {
		navigator.clipboard.writeText(texteCv);
		setCopie(true);
		toast.success("Texte complet du profil copié dans le presse-papier !");
		setTimeout(() => setCopie(false), 2e3);
	};
	const exporterJson = () => {
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profil, null, 2));
		const downloadAnchor = document.createElement("a");
		downloadAnchor.setAttribute("href", dataStr);
		downloadAnchor.setAttribute("download", `careerly-profil-${(profil.nom || "candidat").toLowerCase()}.json`);
		document.body.appendChild(downloadAnchor);
		downloadAnchor.click();
		downloadAnchor.remove();
		toast.success("Profil exporté au format JSON !");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-card/60 to-indigo-500/10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold",
								children: "Source de vérité Careerly"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 61,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 60,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-purple-400" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 66,
								columnNumber: 13
							}, this), "CV Structuré & Export de données"]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 65,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground max-w-xl",
							children: "Importez un CV existant pour extraire automatiquement les informations ou téléchargez votre profil pour l'utiliser sur d'autres plateformes."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 69,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 59,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						onClick: onOpenCvModal,
						className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 82,
							columnNumber: 13
						}, this), "Importer un CV (PDF / Word)"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 77,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: exporterJson,
						className: "gap-1.5 border-border/70 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 92,
							columnNumber: 13
						}, this), "Exporter JSON"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 86,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 76,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 58,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: modeVue === "editeur" ? "secondary" : "ghost",
						onClick: () => setModeVue("editeur"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 107,
							columnNumber: 13
						}, this), "Éditeur structuré avancé"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 101,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: modeVue === "texte" ? "secondary" : "ghost",
						onClick: () => setModeVue("texte"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 116,
							columnNumber: 13
						}, this), "Aperçu Texte IA (Contexte injecté)"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 110,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 100,
					columnNumber: 9
				}, this), modeVue === "texte" && /* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					variant: "outline",
					onClick: copierTexte,
					className: "gap-1.5 text-xs h-8",
					children: [copie ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 129,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 131,
						columnNumber: 15
					}, this), copie ? "Copié" : "Copier le texte"]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 122,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			modeVue === "editeur" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvBuilder, {
				value: cv,
				onChange: (nouvCv) => onChange({ cvStructure: nouvCv })
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 139,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-card p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 146,
						columnNumber: 13
					}, this), "Voici exactement les données transmises au modèle IA lors de l'analyse d'offres et de la génération de candidatures."]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 145,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
					className: "font-mono text-xs text-muted-foreground/90 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto bg-background/50 p-4 rounded-xl border border-border/50",
					children: texteCv || "Profil vide pour le moment."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 150,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 144,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
var SyntheseInput = object({ profilTexte: string().min(5) });
var genererSyntheseProfil = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => SyntheseInput.parse(data)).handler(createSsrRpc("9352f6eabe68edbb75492c4f24a9cec674afb6ae0ff47c5892bf1cb413aa97a5"));
var OptimiserInput = object({ profilTexte: string().min(5) });
var optimiserProfilIA = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => OptimiserInput.parse(data)).handler(createSsrRpc("b0aeaa7fd503b52f35234669d03a865dd7908c6c61f462822bccace20eb59efe"));
var _jsxFileName$2 = "/app/applet/src/components/profil/ProfilSummaryIAModal.tsx";
function ProfilSummaryIAModal({ open, onOpenChange, profil, onUpdateProfil }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [copiedPitch, setCopiedPitch] = (0, import_react.useState)(false);
	const synthese = profil.syntheseIa || profil.cvStructure?.syntheseIa || null;
	const handleGenerer = async () => {
		setLoading(true);
		try {
			const res = await genererSyntheseProfil({ data: { profilTexte: profilEnTexte(profil) } });
			onUpdateProfil({
				syntheseIa: res,
				cvStructure: {
					...profil.cvStructure,
					syntheseIa: res
				}
			});
			toast.success("Fiche Profil IA actualisée avec succès !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de la génération de la synthèse IA.");
		} finally {
			setLoading(false);
		}
	};
	const copyPitch = () => {
		if (!synthese?.pitchEntretien) return;
		navigator.clipboard.writeText(synthese.pitchEntretien);
		setCopiedPitch(true);
		toast.success("Pitch d'entretien copié dans le presse-papier !");
		setTimeout(() => setCopiedPitch(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "space-y-2 text-left",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 87,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 86,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
								className: "text-xl font-bold text-foreground",
								children: "Ce que Careerly sait de moi"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 90,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "La vision stratégique synthétisée par l'IA à partir de l'ensemble de votre profil."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 93,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 89,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 85,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleGenerer,
							disabled: loading,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 107,
								columnNumber: 15
							}, this), synthese ? "Réactualiser" : "Générer la synthèse"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 100,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 84,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 83,
					columnNumber: 9
				}, this),
				!synthese && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-12 text-center space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 118,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 117,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "max-w-md mx-auto space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: "Aucune synthèse générée pour le moment"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 121,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "Cliquez sur le bouton ci-dessous pour laisser Careerly analyser vos études, expériences, compétences et critères afin d'établir votre diagnostic de positionnement."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 124,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 120,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							onClick: handleGenerer,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 134,
								columnNumber: 15
							}, this), "Créer ma synthèse IA"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 130,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 116,
					columnNumber: 11
				}, this),
				loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-16 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse",
							children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "size-6 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 143,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 142,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Analyse globale de votre profil par l'IA..."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 145,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Extraction des forces clés, positionnement stratégique et pitch d'accroche"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 148,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 141,
					columnNumber: 11
				}, this),
				synthese && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6 pt-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5 space-y-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (void 0)(Badge, {
										className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold px-2.5 py-0.5",
										children: "Positionnement Professionnel"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 160,
										columnNumber: 17
									}, this), synthese.actualiseLe && /* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] text-muted-foreground",
										children: [
											"Mis à jour le",
											" ",
											new Date(synthese.actualiseLe).toLocaleDateString("fr-FR")
										]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 164,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 159,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold text-foreground",
									children: synthese.titrePro || profil.titre || "Candidat à fort potentiel"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 170,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: synthese.resumeGlobal
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 175,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 158,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400",
									children: [/* @__PURE__ */ (void 0)(Flame, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 184,
										columnNumber: 19
									}, this), "Vos 3 forces clés"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 183,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("ul", {
									className: "space-y-2",
									children: synthese.forcesCles?.map((force, i) => /* @__PURE__ */ (void 0)("li", {
										className: "flex items-start gap-2 text-xs text-foreground/90",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400 mt-0.5",
											children: i + 1
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 193,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", { children: force }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 196,
											columnNumber: 23
										}, this)]
									}, i, true, {
										fileName: _jsxFileName$2,
										lineNumber: 189,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 187,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 182,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400",
									children: [/* @__PURE__ */ (void 0)(Award, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 204,
										columnNumber: 19
									}, this), "Domaines d'expertise"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 203,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-1.5",
									children: synthese.domainesExpertise?.map((dom, i) => /* @__PURE__ */ (void 0)("span", {
										className: "rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300",
										children: dom
									}, i, false, {
										fileName: _jsxFileName$2,
										lineNumber: 209,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 207,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 202,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 181,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400",
								children: [/* @__PURE__ */ (void 0)(Target, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 223,
									columnNumber: 17
								}, this), "Type de poste & Environnement idéal"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 222,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-foreground/90 leading-relaxed",
								children: synthese.typePosteIdeal
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 226,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 221,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 p-4 sm:p-5 space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300",
									children: [/* @__PURE__ */ (void 0)(MessageSquareQuote, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 235,
										columnNumber: 19
									}, this), "Pitch d'accroche pour vos entretiens (30s)"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 234,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: copyPitch,
									className: "h-7 gap-1.5 px-2 text-xs text-purple-300 hover:bg-purple-500/20",
									children: [copiedPitch ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 245,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 247,
										columnNumber: 21
									}, this), copiedPitch ? "Copié" : "Copier"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 238,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 233,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-foreground italic leading-relaxed bg-background/40 p-3 rounded-lg border border-purple-500/20",
								children: [
									"« ",
									synthese.pitchEntretien,
									" »"
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 252,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 232,
							columnNumber: 13
						}, this),
						synthese.pointsVigilance?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400",
								children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 261,
									columnNumber: 19
								}, this), "Axes de vigilance identifiés"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 260,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "space-y-1.5",
								children: synthese.pointsVigilance.map((pv, i) => /* @__PURE__ */ (void 0)("li", {
									className: "text-xs text-muted-foreground flex items-start gap-2",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-amber-400 mt-0.5",
										children: "•"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 270,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: pv }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 271,
										columnNumber: 23
									}, this)]
								}, i, true, {
									fileName: _jsxFileName$2,
									lineNumber: 266,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 264,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 259,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 156,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 82,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 81,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/profil/ProfilOptimizerModal.tsx";
function ProfilOptimizerModal({ open, onOpenChange, profil, onNavigateTab }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [audit, setAudit] = (0, import_react.useState)(null);
	const handleLancerAudit = async () => {
		setLoading(true);
		try {
			const res = await optimiserProfilIA({ data: { profilTexte: profilEnTexte(profil) } });
			setAudit(res);
			toast.success("Audit d'optimisation IA terminé !");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erreur lors de l'audit IA du profil.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-w-3xl max-h-[88vh] overflow-y-auto p-6 sm:p-7 border-purple-500/20 bg-background/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "space-y-2 text-left",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 70,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 69,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
								className: "text-xl font-bold text-foreground",
								children: "Optimiser mon profil avec l'IA"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 73,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
								className: "text-xs text-muted-foreground",
								children: "Audit ATS & Recruteur : recommandations concrètes STAR, KPI chiffrés et mots-clés stratégiques."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 76,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 72,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 68,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: handleLancerAudit,
							disabled: loading,
							className: "gap-2 border-purple-500/30 hover:bg-purple-500/10 text-xs shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 90,
								columnNumber: 15
							}, this), audit ? "Ré-auditer" : "Lancer l'audit"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 83,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 67,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 66,
					columnNumber: 9
				}, this),
				!audit && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-12 text-center space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (void 0)(TrendingUp, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 101,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "max-w-md mx-auto space-y-1.5",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-sm font-semibold text-foreground",
								children: "Audit de valorisation & compatibilité recruteurs"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 104,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "L'IA analyse vos descriptions d'expériences, la pertinence de vos compétences et la précision de vos objectifs pour vous donner des conseils d'impact immédiat."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 107,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 103,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							onClick: handleLancerAudit,
							className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
							children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 117,
								columnNumber: 15
							}, this), "Auditer et valoriser mon profil"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 113,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 99,
					columnNumber: 11
				}, this),
				loading && /* @__PURE__ */ (void 0)("div", {
					className: "py-16 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 animate-pulse",
							children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "size-6 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 126,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 125,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Audit approfondi en cours..."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 128,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vérification des mots-clés ATS, structure STAR et valorisation chiffrée"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 131,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 124,
					columnNumber: 11
				}, this),
				audit && !loading && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6 pt-2",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 sm:p-5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "space-y-1.5 flex-1",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs",
											children: "Score Qualité du Profil"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 144,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 143,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("h3", {
										className: "text-sm font-bold text-foreground",
										children: "Diagnostic stratégique de vos candidatures"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 148,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: audit.syntheseStrategique
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 151,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 142,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-background/80 px-5 py-3 shrink-0 shadow-inner",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
									children: [audit.scoreQualite, "/100"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 157,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] uppercase font-bold tracking-wider text-muted-foreground",
									children: "Niveau d'impact"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 160,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 156,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 141,
							columnNumber: 13
						}, this),
						audit.motsClesRecommandes?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-border/60 bg-card/60 p-4 space-y-2.5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400",
								children: [/* @__PURE__ */ (void 0)(Key, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 170,
									columnNumber: 19
								}, this), "Mots-clés stratégiques à intégrer dans votre profil"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 169,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap gap-2",
								children: audit.motsClesRecommandes.map((mot, i) => /* @__PURE__ */ (void 0)("span", {
									className: "rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300",
									children: ["+ ", mot]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 175,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 173,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 168,
							columnNumber: 15
						}, this),
						audit.axesAmelioration?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 text-purple-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 190,
									columnNumber: 19
								}, this), "Axes d'amélioration prioritaires"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3",
								children: audit.axesAmelioration.map((axe, i) => /* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-border/70 bg-card/70 p-4 space-y-2.5 transition-all hover:border-purple-500/30",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between gap-2",
											children: /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-bold text-foreground",
													children: axe.rubrique
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 201,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(Badge, {
													variant: "outline",
													className: `text-[10px] font-semibold ${axe.impact === "fort" ? "bg-rose-500/10 text-rose-400 border-rose-500/30" : axe.impact === "moyen" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30"}`,
													children: ["Impact ", axe.impact]
												}, void 0, true, {
													fileName: _jsxFileName$1,
													lineNumber: 204,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 200,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 199,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)("strong", {
												className: "text-foreground font-medium",
												children: ["Constat :", " "]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 220,
												columnNumber: 25
											}, this), axe.constat]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 219,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-foreground/90 font-medium",
											children: [/* @__PURE__ */ (void 0)("strong", {
												className: "text-purple-400",
												children: ["Conseil IA :", " "]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 227,
												columnNumber: 25
											}, this), axe.recommandation]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 226,
											columnNumber: 23
										}, this),
										axe.exempleConcret && /* @__PURE__ */ (void 0)("div", {
											className: "rounded-lg bg-background/50 border border-purple-500/15 p-2.5 text-xs italic text-muted-foreground",
											children: [
												"💡",
												" ",
												/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold text-foreground/80",
													children: ["Exemple :", " "]
												}, void 0, true, {
													fileName: _jsxFileName$1,
													lineNumber: 236,
													columnNumber: 27
												}, this),
												"« ",
												axe.exempleConcret,
												" »"
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 234,
											columnNumber: 25
										}, this)
									]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 195,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 193,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 15
						}, this),
						audit.conseilsStarKpi?.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("h4", {
								className: "text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Lightbulb, { className: "size-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 252,
									columnNumber: 19
								}, this), "Transformation STAR & KPI chiffrés (Avant / Après)"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 251,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-3",
								children: audit.conseilsStarKpi.map((kpi, i) => /* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-border/70 bg-card/70 p-4 space-y-3",
									children: [
										/* @__PURE__ */ (void 0)("h5", {
											className: "text-xs font-bold text-foreground",
											children: kpi.titre
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 261,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid gap-2 sm:grid-cols-2",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5 space-y-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-bold uppercase text-rose-400 tracking-wider",
													children: "Formulation standard"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 266,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-muted-foreground line-through",
													children: kpi.avant
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 269,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 265,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 space-y-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-[10px] font-bold uppercase text-emerald-400 tracking-wider",
													children: "Formulation impact & KPI"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 274,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-emerald-300 font-medium",
													children: kpi.apres
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 277,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 273,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 264,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground",
											children: kpi.explication
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 282,
											columnNumber: 23
										}, this)
									]
								}, i, true, {
									fileName: _jsxFileName$1,
									lineNumber: 257,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 255,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 250,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 139,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 65,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/profil.tsx?tsr-split=component";
function ProfilPage() {
	const { user, loading: authLoading } = useSession();
	const [profil, setProfil] = (0, import_react.useState)(() => loadProfil());
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [cvOpen, setCvOpen] = (0, import_react.useState)(false);
	const [summaryIaOpen, setSummaryIaOpen] = (0, import_react.useState)(false);
	const [optimizerOpen, setOptimizerOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("recherche");
	const [, startTransition] = (0, import_react.useTransition)();
	const profilRef = (0, import_react.useRef)(profil);
	profilRef.current = profil;
	const bilan = (0, import_react.useMemo)(() => calculerCompletudeProfil(profil), [profil]);
	(0, import_react.useEffect)(() => {
		if (authLoading || !user?.id) return;
		let cancelled = false;
		(async () => {
			try {
				const cloud = await fetchProfil();
				if (!cancelled && cloud) setProfil((local) => {
					return {
						...local,
						...cloud,
						cvStructure: normaliserCvStructure(cloud.cvStructure || local.cvStructure)
					};
				});
			} catch {}
		})();
		return () => {
			cancelled = true;
		};
	}, [user?.id, authLoading]);
	const updateProfil = (0, import_react.useCallback)((patch) => {
		setProfil((prev) => {
			const next = {
				...prev,
				...patch
			};
			saveProfilLocal(next);
			return next;
		});
	}, []);
	const enregistrer = (0, import_react.useCallback)(async () => {
		setSaving(true);
		const p = profilRef.current;
		saveProfilLocal(p);
		if (user?.id) try {
			const saved = await saveProfilCloud(p, user.id);
			setProfil(saved);
			toast.success("Profil synchronisé dans votre espace Careerly !");
		} catch {
			toast.error("Enregistré localement (connexion cloud temporairement indisponible).");
		} finally {
			setSaving(false);
		}
		else {
			setSaving(false);
			toast.success("Profil sauvegardé dans votre navigateur.");
		}
	}, [user?.id]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "s") {
				e.preventDefault();
				enregistrer();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [enregistrer]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Career Profile",
		title: "Mon Profil Candidat",
		subtitle: "La source de vérité Careerly pour le Match IA, l'analyse de CV, la rédaction d'emails et le coaching d'entretien.",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setSummaryIaOpen(true),
					className: "hidden sm:inline-flex border-purple-500/30 hover:bg-purple-500/10 text-purple-300 gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 13
					}, this), "Profil IA"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setOptimizerOpen(true),
					className: "hidden md:inline-flex border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-300 gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 13
					}, this), "Optimiser IA"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: enregistrer,
					disabled: saving,
					className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs font-semibold",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 23
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 69
					}, this), "Enregistrer"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 115,
			columnNumber: 207
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-6xl space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilHeaderCard, {
					profil,
					bilan,
					onOpenCvModal: () => setCvOpen(true),
					onOpenSummaryIaModal: () => setSummaryIaOpen(true),
					onOpenOptimizerModal: () => setOptimizerOpen(true),
					onSelectTab: (tab) => {
						startTransition(() => setActiveTab(tab));
					},
					saving
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
					value: activeTab,
					onValueChange: setActiveTab,
					className: "grid gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "overflow-x-auto pb-1",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
								className: "inline-flex w-full min-w-[760px] justify-start p-1 sm:w-auto bg-card/60 border border-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "recherche",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-3.5 text-purple-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 142,
											columnNumber: 17
										}, this), "Ma recherche"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "identite",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-3.5 text-purple-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 17
										}, this), "Identité & Contact"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 146,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "formation",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "size-3.5 text-indigo-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 152,
											columnNumber: 17
										}, this), "Formations"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "experiences",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-3.5 text-purple-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 157,
											columnNumber: 17
										}, this), "Expériences & KPI"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 156,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "competences",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-3.5 text-emerald-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 162,
											columnNumber: 17
										}, this), "Compétences"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 161,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "langues",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "size-3.5 text-indigo-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 167,
											columnNumber: 17
										}, this), "Langues & Certifs"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 166,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "engagements",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lightbulb, { className: "size-3.5 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 172,
											columnNumber: 17
										}, this), "Projets & Asso"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 171,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "preferences",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-3.5 text-purple-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 17
										}, this), "Critères"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 176,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
										value: "documents",
										className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "size-3.5 text-blue-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 182,
											columnNumber: 17
										}, this), "CV & Documents"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "recherche",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilObjectivesTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "identite",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilIdentityTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "formation",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilEducationTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "experiences",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilExperiencesTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "competences",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilSkillsTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "langues",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilLanguagesCertifsTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "engagements",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilProjectsEngagementsTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "preferences",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilPreferencesTab, {
								profil,
								onChange: updateProfil
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 224,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
							value: "documents",
							className: "focus-visible:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilDocumentsTab, {
								profil,
								onChange: updateProfil,
								onOpenCvModal: () => setCvOpen(true)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 text-emerald-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Profil synchronisé sur votre compte cloud Supabase. Raccourci :",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("kbd", {
										className: "rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground",
										children: "Ctrl + S"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 241,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 text-blue-400 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Enregistré localement. Connectez-vous pour synchroniser vos données sur tous vos appareils." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: enregistrer,
								disabled: saving,
								size: "sm",
								className: "gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold",
								children: [saving ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 25
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 71
								}, this), "Sauvegarder mon profil"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilSummaryIAModal, {
				open: summaryIaOpen,
				onOpenChange: setSummaryIaOpen,
				profil,
				onUpdateProfil: updateProfil
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 263,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilOptimizerModal, {
				open: optimizerOpen,
				onOpenChange: setOptimizerOpen,
				profil,
				onNavigateTab: (tab) => {
					setOptimizerOpen(false);
					startTransition(() => setActiveTab(tab));
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 266,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvAnalyseDialog, {
				open: cvOpen,
				onOpenChange: setCvOpen,
				profil,
				cv: profil.cv ?? null,
				onSaveCv: (cv) => {
					const next = {
						...profil,
						cv
					};
					updateProfil(next);
					if (user?.id) saveProfilCloud(next, user.id).catch(() => void 0);
				},
				onAppliquerProfil: (patch) => {
					const next = {
						...profil,
						...patch
					};
					updateProfil(next);
					if (user?.id) saveProfilCloud(next, user.id).catch(() => void 0);
					toast.success("Profil mis à jour automatiquement depuis le CV !");
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 272,
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
export { ProfilPage as component };
