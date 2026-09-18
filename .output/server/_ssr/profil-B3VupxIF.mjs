import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { $ as emptyProfil, Ct as nouvelleCertification, Dt as nouvelleLangue, Et as nouvelleFormation, F as NIVEAUX_LANGUE, G as completionCv, Gt as cn, J as cvStructureEnTexte, O as useSession, P as NIVEAUX_COMPETENCE, Pt as saveProfilLocal, S as createSsrRpc, Tt as nouvelleExperience, Ut as Button, _t as loadProfil, a as Textarea, bt as nouveauBenevolat, c as Select, d as SelectTrigger, f as SelectValue, i as Badge, l as SelectContent, n as saveProfilCloud, o as Label, p as AppShell, r as Progress, s as Input, t as fetchProfil, u as SelectItem, vt as normaliserCvStructure, wt as nouvelleCompetence, xt as nouveauProjet } from "./profil-cloud-BuRN1ITj.mjs";
import { r as createServerFn } from "./server-O3Hnh0sN.mjs";
import { d as number, f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Languages, A as Phone, B as Mail, Ct as Download, Dt as Compass, E as Save, Et as Copy, Ft as ChevronUp, J as Link2, Kt as Briefcase, Nt as CircleCheck, Pt as CircleAlert, Q as Layers, Rt as ChevronDown, St as Earth, Tt as Cpu, Vt as Calendar, W as LoaderCircle, Wt as Building, Xt as Award, Y as Lightbulb, Z as LayoutDashboard, Zt as ArrowRight, _ as Sparkles, _t as FileCode, a as Users, at as HeartHandshake, bt as ExternalLink, ct as Globe, d as TriangleAlert, f as TrendingUp, ft as FolderDot, it as Heart, jt as ClipboardType, k as Plus, kt as CloudUpload, lt as Github, m as Target, mt as FileText, n as X, p as Trash2, q as Linkedin, r as Wrench, s as UserRound, st as GraduationCap, vt as Eye, w as Search, wt as DollarSign, z as MapPin, zt as Check } from "../_libs/lucide-react.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Ba8nBP8w.mjs";
import { n as extraireTexteFichier } from "./cv-fichier-D34sT6gG.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-B3VupxIF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function calculerCompletudeProfil(p) {
	const cv = p.cvStructure;
	const categories = [];
	const suggestions = [];
	const aNom = Boolean(p.prenom?.trim() && p.nom?.trim());
	const aContact = Boolean((p.emailContact || cv?.email)?.trim() && (p.telephone || cv?.telephone)?.trim());
	const aTitre = Boolean((p.titre || cv?.titre)?.trim());
	const aLoc = Boolean((p.localisation || cv?.ville)?.trim());
	let ptsIdentite = 0;
	if (aNom) ptsIdentite += 6;
	if (aContact) ptsIdentite += 4;
	if (aTitre) ptsIdentite += 3;
	if (aLoc) ptsIdentite += 2;
	const statIdentite = ptsIdentite >= 13 ? "complet" : ptsIdentite >= 6 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "identite",
		nom: "Identité & Contact",
		tab: "identite",
		statut: statIdentite,
		points: ptsIdentite,
		maxPoints: 15,
		detail: aNom && aTitre ? `${p.prenom} ${p.nom} • ${p.titre || cv?.titre}` : "Nom, titre & contacts à compléter"
	});
	if (ptsIdentite < 13) suggestions.push({
		id: "identite_sug",
		titre: "Ajoutez votre titre professionnel et coordonnées complètes",
		tab: "identite",
		gain: 15 - ptsIdentite,
		conseil: "Un titre précis (ex: 'Étudiant PGE M1 | Recherche de stage Bras Droit') oriente directement les propositions de l'IA."
	});
	const aMetiers = Boolean(p.metiers?.trim() || p.preferences?.metiersPrivilegies?.length);
	const aDomaines = Boolean(p.domaines?.trim() || p.preferences?.secteursPrivilegies?.length);
	const aContrat = Boolean(p.contrats?.trim());
	const aAspirations = Boolean(p.rechercheVraie?.trim());
	const aDispo = Boolean(p.dateDebut?.trim() || p.duree?.trim());
	let ptsRecherche = 0;
	if (aMetiers) ptsRecherche += 5;
	if (aDomaines) ptsRecherche += 3;
	if (aContrat) ptsRecherche += 2;
	if (aAspirations) ptsRecherche += 3;
	if (aDispo) ptsRecherche += 2;
	const statRecherche = ptsRecherche >= 13 ? "complet" : ptsRecherche >= 6 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "preferences",
		nom: "Objectifs & Préférences",
		tab: "preferences",
		statut: statRecherche,
		points: ptsRecherche,
		maxPoints: 15,
		detail: aMetiers ? `${p.metiers || p.preferences?.metiersPrivilegies?.join(", ")} (${p.contrats || "Stage"})` : "Métiers cibles & type de contrat"
	});
	if (ptsRecherche < 13) suggestions.push({
		id: "recherche_sug",
		titre: "Précisez vos aspirations dans « Ce que je recherche vraiment »",
		tab: "preferences",
		gain: 15 - ptsRecherche,
		conseil: "L'IA utilise ce texte pour personnaliser les lettres et recommander des opportunités uniques."
	});
	const nbExp = cv?.experiences?.length ?? 0;
	const aExpSimple = Boolean(p.experiences?.trim());
	let ptsExp = 0;
	if (nbExp >= 2) ptsExp = cv.experiences.some((e) => e.kpi?.trim() || e.realisationsCles?.trim() || e.realisations && e.realisations.length > 0) ? 20 : 16;
	else if (nbExp === 1) {
		const e = cv.experiences?.[0];
		ptsExp = e?.kpi || e?.realisationsCles || e?.realisations && e.realisations.length > 0 ? 15 : 10;
	} else if (aExpSimple) ptsExp = 8;
	const statExp = ptsExp >= 16 ? "complet" : ptsExp >= 8 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "experiences",
		nom: "Expériences professionnelles",
		tab: "parcours",
		statut: statExp,
		points: ptsExp,
		maxPoints: 20,
		detail: nbExp > 0 ? `${nbExp} expérience(s) enregistrée(s)` : aExpSimple ? "Texte brut saisi" : "Aucune expérience"
	});
	if (ptsExp < 16) suggestions.push({
		id: "exp_sug",
		titre: "Ajoutez vos réalisations chiffrées (KPI) dans vos expériences",
		tab: "parcours",
		gain: 20 - ptsExp,
		conseil: "Les bullets d'impact (ex: '+25% de conversion', '10 000 utilisateurs') boostent radicalement le score ATS."
	});
	const nbFormations = cv?.formations?.length ?? 0;
	const aFormationSimple = Boolean(p.formation?.trim() || p.ecole?.trim());
	let ptsFormation = 0;
	if (nbFormations >= 2) ptsFormation = 15;
	else if (nbFormations === 1) {
		const f = cv.formations?.[0];
		ptsFormation = f?.specialisation || f?.coursImportants && f.coursImportants.length > 0 ? 14 : 11;
	} else if (aFormationSimple) ptsFormation = 8;
	const statFormation = ptsFormation >= 13 ? "complet" : ptsFormation >= 6 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "formation",
		nom: "Études & Formations",
		tab: "parcours",
		statut: statFormation,
		points: ptsFormation,
		maxPoints: 15,
		detail: nbFormations > 0 ? `${nbFormations} formation(s) enregistrée(s)` : p.formation || "Aucune formation"
	});
	const nbCompStruct = cv?.competences?.length ?? 0;
	const aCompBrut = Boolean(p.competences?.trim() || p.logiciels?.trim());
	let ptsComp = 0;
	if (nbCompStruct >= 8) ptsComp = 15;
	else if (nbCompStruct >= 4) ptsComp = 12;
	else if (nbCompStruct > 0) ptsComp = 8;
	else if (aCompBrut) ptsComp = 7;
	const statComp = ptsComp >= 12 ? "complet" : ptsComp >= 6 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "competences",
		nom: "Compétences & Outils",
		tab: "competences",
		statut: statComp,
		points: ptsComp,
		maxPoints: 15,
		detail: nbCompStruct > 0 ? `${nbCompStruct} compétence(s) qualifiée(s)` : aCompBrut ? "Compétences saisies en texte" : "Aucune compétence"
	});
	if (ptsComp < 12) suggestions.push({
		id: "comp_sug",
		titre: "Qualifiez vos Hard Skills, Outils et Méthodes avec leur niveau",
		tab: "competences",
		gain: 15 - ptsComp,
		conseil: "Sélectionnez votre niveau (Débutant à Expert) pour un calcul de compatibilité ultra précis."
	});
	const nbLangues = cv?.langues?.length ?? 0;
	const aLangueBrut = Boolean(p.langues?.trim() || p.niveauAnglais?.trim());
	let ptsLangues = 0;
	if (nbLangues >= 2) ptsLangues = 5;
	else if (nbLangues === 1) ptsLangues = 4;
	else if (aLangueBrut) ptsLangues = 3;
	const statLangues = ptsLangues >= 4 ? "complet" : ptsLangues >= 2 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "langues",
		nom: "Langues",
		tab: "langues",
		statut: statLangues,
		points: ptsLangues,
		maxPoints: 5,
		detail: nbLangues > 0 ? `${nbLangues} langue(s) avec niveau CECRL` : aLangueBrut ? "Langues déclarées" : "Non renseigné"
	});
	const nbCertifs = cv?.certifications?.length ?? 0;
	let ptsCertifs = 0;
	if (nbCertifs >= 2) ptsCertifs = 5;
	else if (nbCertifs === 1) ptsCertifs = 4;
	const statCertifs = ptsCertifs >= 4 ? "complet" : ptsCertifs >= 2 ? "a_ameliorer" : "manquant";
	categories.push({
		id: "certifications",
		nom: "Certifications",
		tab: "certifications",
		statut: statCertifs,
		points: ptsCertifs,
		maxPoints: 5,
		detail: nbCertifs > 0 ? `${nbCertifs} certification(s) validée(s)` : "AMF, Bloomberg, Google, AWS..."
	});
	const nbProjets = cv?.projets?.length ?? 0;
	const nbBenevolat = cv?.benevolats?.length ?? 0;
	const nbDistinctions = cv?.distinctions?.length ?? 0;
	let ptsProjets = 0;
	if (nbProjets > 0 || nbBenevolat > 0 || nbDistinctions > 0) ptsProjets = 5;
	const statProjets = ptsProjets >= 5 ? "complet" : "a_ameliorer";
	categories.push({
		id: "projets",
		nom: "Projets & Engagements",
		tab: "projets",
		statut: statProjets,
		points: ptsProjets,
		maxPoints: 5,
		detail: `${nbProjets} projet(s) • ${nbBenevolat} engagement(s)`
	});
	const aCv = Boolean(p.cv || cv?.documents?.length);
	const ptsDocs = aCv ? 5 : 0;
	const statDocs = aCv ? "complet" : "manquant";
	categories.push({
		id: "documents",
		nom: "Documents & CV",
		tab: "documents",
		statut: statDocs,
		points: ptsDocs,
		maxPoints: 5,
		detail: aCv ? "CV principal disponible" : "Aucun document importé"
	});
	if (!aCv) suggestions.push({
		id: "doc_sug",
		titre: "Importez votre CV PDF pour extraction automatique des données",
		tab: "documents",
		gain: 5,
		conseil: "L'importation de CV pré-remplit instantanément l'ensemble de votre dossier candidat."
	});
	const totalPoints = categories.reduce((sum, c) => sum + c.points, 0);
	const scoreFinal = Math.min(100, Math.max(0, totalPoints));
	let label = "Profil Découverte";
	let badgeColor = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
	if (scoreFinal >= 90) {
		label = "Profil Master • Matching IA optimal";
		badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
	} else if (scoreFinal >= 75) {
		label = "Profil Avancé • Forte visibilité";
		badgeColor = "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
	} else if (scoreFinal >= 50) {
		label = "Profil Intermédiaire";
		badgeColor = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
	}
	const nbComplets = categories.filter((c) => c.statut === "complet").length;
	return {
		score: scoreFinal,
		label,
		badgeColor,
		categories,
		suggestions: suggestions.sort((a, b) => b.gain - a.gain).slice(0, 4),
		nbComplets,
		nbTotal: categories.length
	};
}
var _jsxFileName$17 = "/app/applet/src/components/profil/ProfilOverviewTab.tsx";
function ProfilOverviewTab({ profil, bilan, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-2xl border border-border bg-card/60 relative overflow-hidden p-6 sm:p-7 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-7 items-center justify-center rounded-lg bg-zinc-500/10 text-zinc-400 font-bold text-xs",
								children: "⚡"
							}, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 26,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-base sm:text-lg font-bold text-foreground",
								children: "Score de Complétude du Dossier"
							}, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 29,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 25,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								bilan.nbComplets,
								" sur ",
								bilan.nbTotal,
								" rubriques complétées avec succès."
							]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 33,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$17,
						lineNumber: 24,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							className: `text-xs font-semibold px-3 py-1 ${bilan.badgeColor}`,
							children: bilan.label
						}, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 40,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-2xl font-black text-foreground",
							children: [bilan.score, "%"]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 46,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$17,
						lineNumber: 39,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$17,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
					value: bilan.score,
					className: "h-2.5 bg-secondary"
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 52,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2",
					children: bilan.categories.map((cat) => {
						const isComplet = cat.statut === "complet";
						const isAmeliorer = cat.statut === "a_ameliorer";
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => onNavigate(cat.tab),
							className: `flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${isComplet ? "border-emerald-500/25 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/10" : isAmeliorer ? "border-amber-500/25 bg-amber-500/5 text-amber-300 hover:bg-amber-500/10" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 pr-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium block truncate",
									children: cat.nom
								}, void 0, false, {
									fileName: _jsxFileName$17,
									lineNumber: 74,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground truncate block",
									children: [
										cat.points,
										"/",
										cat.maxPoints,
										" pts"
									]
								}, void 0, true, {
									fileName: _jsxFileName$17,
									lineNumber: 77,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$17,
								lineNumber: 73,
								columnNumber: 17
							}, this), isComplet ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5 text-emerald-400 shrink-0" }, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 82,
								columnNumber: 19
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-3.5 text-amber-400 shrink-0" }, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 84,
								columnNumber: 19
							}, this)]
						}, cat.id, true, {
							fileName: _jsxFileName$17,
							lineNumber: 61,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 55,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$17,
			lineNumber: 22,
			columnNumber: 7
		}, this), bilan.suggestions.length > 0 && /* @__PURE__ */ (void 0)("div", {
			className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-4",
			children: [/* @__PURE__ */ (void 0)("h4", {
				className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
				children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "size-4 text-muted-foreground/80" }, void 0, false, {
					fileName: _jsxFileName$17,
					lineNumber: 96,
					columnNumber: 13
				}, this), "Actions Prioritaires pour Maximiser votre Score"]
			}, void 0, true, {
				fileName: _jsxFileName$17,
				lineNumber: 95,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: bilan.suggestions.map((sug) => /* @__PURE__ */ (void 0)("div", {
					onClick: () => onNavigate(sug.tab),
					className: "group flex flex-col justify-between p-4 rounded-2xl border border-border/70 bg-card/60 hover:bg-card/90 hover:border-muted-foreground/30 transition-all cursor-pointer space-y-2.5",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-bold text-foreground group-hover:text-foreground transition-colors",
								children: sug.titre
							}, void 0, false, {
								fileName: _jsxFileName$17,
								lineNumber: 109,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)(Badge, {
								className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] shrink-0",
								children: [
									"+",
									sug.gain,
									" pts"
								]
							}, void 0, true, {
								fileName: _jsxFileName$17,
								lineNumber: 112,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$17,
							lineNumber: 108,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-muted-foreground leading-relaxed",
							children: sug.conseil
						}, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 116,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$17,
						lineNumber: 107,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-1 text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-1 duration-150",
						children: [/* @__PURE__ */ (void 0)("span", { children: "Compléter cette rubrique" }, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 122,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$17,
							lineNumber: 123,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$17,
						lineNumber: 121,
						columnNumber: 17
					}, this)]
				}, sug.id, true, {
					fileName: _jsxFileName$17,
					lineNumber: 102,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$17,
				lineNumber: 100,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$17,
			lineNumber: 94,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$17,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
var _jsxFileName$16 = "/app/applet/src/components/profil/ProfilIdentityTab.tsx";
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
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 40,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 39,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Identité & Positionnement"
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 43,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Vos informations visibles et votre titre professionnel principal"
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 46,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 42,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$16,
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
								fileName: _jsxFileName$16,
								lineNumber: 54,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.prenom,
								onChange: (e) => {
									onChange({ prenom: e.target.value });
									updateCvField("prenom", e.target.value);
								},
								placeholder: "Ex : Lucas, Sarah..."
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 55,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 53,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Nom *"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 66,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.nom,
								onChange: (e) => {
									onChange({ nom: e.target.value });
									updateCvField("nom", e.target.value);
								},
								placeholder: "Ex : Dupont, Martin..."
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 67,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 65,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$16,
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
								fileName: _jsxFileName$16,
								lineNumber: 79,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.titre || cv?.titre || "",
								onChange: (e) => {
									onChange({ titre: e.target.value });
									updateCvField("titre", e.target.value);
								},
								placeholder: "Ex : Étudiant M1 PGE @ NEOMA | Recherche Stage Bras Droit / Product Manager (6 mois)"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 82,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "💡 Ce titre oriente immédiatement le matching IA et apparaît en en-tête de vos candidatures."
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 90,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$16,
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
								fileName: _jsxFileName$16,
								lineNumber: 98,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.photoUrl || cv?.photoUrl || "",
									onChange: (e) => {
										onChange({ photoUrl: e.target.value });
										updateCvField("photoUrl", e.target.value);
									},
									placeholder: "https://mon-image.jpg ou avatar..."
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 102,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 101,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 97,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Permis de conduire"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 114,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.permis || cv?.permis || "",
								onChange: (e) => {
									onChange({ permis: e.target.value });
									updateCvField("permis", e.target.value);
								},
								placeholder: "Ex : Permis B, Véhiculé(e)..."
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 117,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 113,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 96,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 133,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 132,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Coordonnées & Mobilité géographique"
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 136,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Pour vous contacter et évaluer le critère de localisation"
						}, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 139,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 135,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$16,
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
									fileName: _jsxFileName$16,
									lineNumber: 148,
									columnNumber: 15
								}, this), " Email de contact"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 147,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "email",
								value: profil.emailContact || cv?.email || "",
								onChange: (e) => {
									onChange({ emailContact: e.target.value });
									updateCvField("email", e.target.value);
								},
								placeholder: "votre.email@etudiant.fr"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 150,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 146,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 163,
									columnNumber: 15
								}, this), " Téléphone"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 162,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "tel",
								value: profil.telephone || cv?.telephone || "",
								onChange: (e) => {
									onChange({ telephone: e.target.value });
									updateCvField("telephone", e.target.value);
								},
								placeholder: "+33 6 12 34 56 78"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 165,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 161,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$16,
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
									fileName: _jsxFileName$16,
									lineNumber: 179,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.localisation || cv?.ville || "",
									onChange: (e) => {
										onChange({ localisation: e.target.value });
										updateCvField("ville", e.target.value);
									},
									placeholder: "Ex : Paris, Lyon, Rouen, Reims..."
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 182,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 178,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Pays"
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 193,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.pays || cv?.pays || "France",
									onChange: (e) => {
										onChange({ pays: e.target.value });
										updateCvField("pays", e.target.value);
									},
									placeholder: "Ex : France, Royaume-Uni..."
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 194,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 192,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Mobilité géographique"
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 205,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.mobilite,
									onChange: (e) => onChange({ mobilite: e.target.value }),
									placeholder: "Ex : Île-de-France, France entière, International..."
								}, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 208,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 204,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 177,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 130,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$16,
							lineNumber: 221,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 220,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Liens & Réseaux Professionnels"
					}, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 224,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "LinkedIn, portfolio de projets, profil GitHub ou site personnel"
					}, void 0, false, {
						fileName: _jsxFileName$16,
						lineNumber: 227,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$16,
						lineNumber: 223,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$16,
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
									fileName: _jsxFileName$16,
									lineNumber: 236,
									columnNumber: 15
								}, this), " Profil LinkedIn"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 235,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.linkedin || cv?.linkedin || "",
								onChange: (e) => {
									onChange({ linkedin: e.target.value });
									updateCvField("linkedin", e.target.value);
								},
								placeholder: "linkedin.com/in/nom-prenom"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 238,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 234,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 250,
									columnNumber: 15
								}, this), " Portfolio / Site"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 249,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.portfolio || cv?.portfolio || "",
								onChange: (e) => {
									onChange({ portfolio: e.target.value });
									updateCvField("portfolio", e.target.value);
								},
								placeholder: "https://mon-portfolio.fr"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 252,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 248,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Github, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$16,
									lineNumber: 264,
									columnNumber: 15
								}, this), " Profil GitHub / Code"]
							}, void 0, true, {
								fileName: _jsxFileName$16,
								lineNumber: 263,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.github || cv?.github || "",
								onChange: (e) => {
									onChange({ github: e.target.value });
									updateCvField("github", e.target.value);
								},
								placeholder: "github.com/mon-pseudo"
							}, void 0, false, {
								fileName: _jsxFileName$16,
								lineNumber: 266,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$16,
							lineNumber: 262,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$16,
					lineNumber: 233,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$16,
				lineNumber: 218,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$16,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
var _jsxFileName$15 = "/app/applet/src/components/profil/ProfilObjectivesTab.tsx";
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
		label: "Hybride",
		desc: "Télétravail + Bureau",
		icone: "🏢"
	},
	{
		id: "full_remote",
		label: "100% Remote",
		desc: "Télétravail complet",
		icone: "💻"
	},
	{
		id: "presentiel",
		label: "Présentiel",
		desc: "Sur site",
		icone: "👥"
	},
	{
		id: "indifferent",
		label: "Indifférent",
		desc: "Flexible",
		icone: "✨"
	}
];
function ProfilObjectivesTab({ profil, onChange }) {
	const [nouveauMetier, setNouveauMetier] = (0, import_react.useState)("");
	const [nouveauDomaine, setNouveauDomaine] = (0, import_react.useState)("");
	const [nouvelleEntreprise, setNouvelleEntreprise] = (0, import_react.useState)("");
	const ajouterTag = (val, champ, reset) => {
		const trim = val.trim();
		if (!trim) return;
		const current = profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : [];
		if (!current.some((c) => c.toLowerCase() === trim.toLowerCase())) {
			current.push(trim);
			onChange({ [champ]: current.join(", ") });
		}
		if (reset) reset();
	};
	const retirerTag = (tag, champ) => {
		const next = (profil[champ] ? profil[champ].split(",").map((s) => s.trim()).filter(Boolean) : []).filter((t) => t.toLowerCase() !== tag.toLowerCase().trim());
		onChange({ [champ]: next.join(", ") });
	};
	const metiersList = (profil.metiers || "").split(",").map((s) => s.trim()).filter(Boolean);
	const domainesList = (profil.domaines || "").split(",").map((s) => s.trim()).filter(Boolean);
	const entreprisesList = (profil.entreprisesCiblees || "").split(",").map((s) => s.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 111,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 110,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Postes & Secteurs ciblés"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 114,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Les intitulés et domaines recherchés pour le Match IA"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 117,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 113,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 109,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Intitulés de postes / Métiers recherchés *"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 125,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-purple-500/50 transition-colors",
							children: [metiersList.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-purple-500/15 text-purple-200 border border-purple-500/30 text-xs py-1 px-2.5 rounded-lg",
								children: [m, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(m, "metiers"),
									className: "rounded-full hover:bg-purple-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 141,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 136,
									columnNumber: 17
								}, this)]
							}, m, true, {
								fileName: _jsxFileName$15,
								lineNumber: 130,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[180px] flex items-center gap-2",
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
									placeholder: metiersList.length === 0 ? "Ex : Bras Droit CEO, Chef de Projet, Data Analyst... (Entrée)" : "Ajouter un autre intitulé...",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 146,
									columnNumber: 15
								}, this), nouveauMetier && /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouveauMetier, "metiers", () => setNouveauMetier("")),
									className: "h-6 px-2 text-xs text-purple-400",
									children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 177,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 166,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 145,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 128,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 124,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Domaines / Secteurs d'activité"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 186,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-indigo-500/50 transition-colors",
							children: [domainesList.map((d) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-indigo-500/15 text-indigo-200 border border-indigo-500/30 text-xs py-1 px-2.5 rounded-lg",
								children: [d, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(d, "domaines"),
									className: "rounded-full hover:bg-indigo-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 202,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 197,
									columnNumber: 17
								}, this)]
							}, d, true, {
								fileName: _jsxFileName$15,
								lineNumber: 191,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[180px] flex items-center gap-2",
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
									placeholder: domainesList.length === 0 ? "Ex : Tech & SaaS, Finance, Conseil, Luxe... (Entrée)" : "Ajouter un secteur...",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 207,
									columnNumber: 15
								}, this), nouveauDomaine && /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouveauDomaine, "domaines", () => setNouveauDomaine("")),
									className: "h-6 px-2 text-xs text-indigo-400",
									children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 238,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 227,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 206,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 189,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 185,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Entreprises spécifiques ciblées (Optionnel)"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 247,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-1.5 min-h-[38px] p-2 rounded-xl border border-border/70 bg-background/50 focus-within:border-blue-500/50 transition-colors",
							children: [entreprisesList.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-blue-500/15 text-blue-200 border border-blue-500/30 text-xs py-1 px-2.5 rounded-lg",
								children: [e, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => retirerTag(e, "entreprisesCiblees"),
									className: "rounded-full hover:bg-blue-500/20 p-0.5 text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 263,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 258,
									columnNumber: 17
								}, this)]
							}, e, true, {
								fileName: _jsxFileName$15,
								lineNumber: 252,
								columnNumber: 15
							}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-[180px] flex items-center gap-2",
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
									placeholder: "Ex : L'Oréal, BNP Paribas, Doctolib, BCG... (Entrée)",
									className: "w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 268,
									columnNumber: 15
								}, this), nouvelleEntreprise && /* @__PURE__ */ (void 0)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => ajouterTag(nouvelleEntreprise, "entreprisesCiblees", () => setNouvelleEntreprise("")),
									className: "h-6 px-2 text-xs text-blue-400",
									children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 295,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 284,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 267,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 250,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 246,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$15,
				lineNumber: 108,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/40 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 307,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 306,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Contrat & Disponibilité"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 310,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Type de contrat, calendrier et rythme de travail"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 313,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 309,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 305,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Type de contrat recherché *"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 321,
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
									className: `rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${selected ? "border-purple-500/50 bg-purple-500/20 text-purple-200 shadow-xs" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card hover:text-foreground"}`,
									children: [selected && /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 inline mr-1" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 347,
										columnNumber: 32
									}, this), c]
								}, c, true, {
									fileName: _jsxFileName$15,
									lineNumber: 328,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 324,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 320,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 358,
										columnNumber: 15
									}, this), " Date de début souhaitée"]
								}, void 0, true, {
									fileName: _jsxFileName$15,
									lineNumber: 357,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.dateDebut || "",
									onChange: (e) => onChange({ dateDebut: e.target.value }),
									placeholder: "Ex : Dès que possible, Septembre 2026...",
									className: "text-xs rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 360,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 356,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-medium text-muted-foreground",
									children: "Durée souhaitée"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 369,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.duree || "",
									onChange: (e) => onChange({ duree: e.target.value }),
									placeholder: "Ex : 6 mois, 1 an...",
									className: "text-xs rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 372,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 368,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-medium text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DollarSign, { className: "size-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$15,
										lineNumber: 382,
										columnNumber: 15
									}, this), " Rémunération min."]
								}, void 0, true, {
									fileName: _jsxFileName$15,
									lineNumber: 381,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: profil.remuneration || "",
									onChange: (e) => onChange({ remuneration: e.target.value }),
									placeholder: "Ex : 1 200 €/mois, 45 k€...",
									className: "text-xs rounded-xl"
								}, void 0, false, {
									fileName: _jsxFileName$15,
									lineNumber: 385,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$15,
								lineNumber: 380,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 355,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2 pt-1 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs font-medium text-foreground",
							children: "Mode de travail préféré"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 396,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2 grid-cols-2 sm:grid-cols-4",
							children: MODES_TRAVAIL.map((m) => {
								const selected = (profil.modeTravail || "hybride") === m.id;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => onChange({
										modeTravail: m.id,
										teletravail: m.label
									}),
									className: `flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${selected ? "border-purple-500/50 bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/30" : "border-border/60 bg-card/40 text-muted-foreground hover:bg-card/70 hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-base",
											children: m.icone
										}, void 0, false, {
											fileName: _jsxFileName$15,
											lineNumber: 415,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-semibold text-foreground",
											children: m.label
										}, void 0, false, {
											fileName: _jsxFileName$15,
											lineNumber: 416,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-muted-foreground",
											children: m.desc
										}, void 0, false, {
											fileName: _jsxFileName$15,
											lineNumber: 419,
											columnNumber: 19
										}, this)
									]
								}, m.id, true, {
									fileName: _jsxFileName$15,
									lineNumber: 403,
									columnNumber: 17
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 399,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 395,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$15,
				lineNumber: 304,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-5 sm:p-6 space-y-4 rounded-2xl border border-purple-500/20 bg-card/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-purple-500/20 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 433,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 432,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground flex items-center gap-2",
							children: ["Ce que je recherche vraiment", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]",
								children: "Booster IA"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 438,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 436,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Décrivez librement vos attentes et le type d'équipe idéal pour guider l'IA"
						}, void 0, false, {
							fileName: _jsxFileName$15,
							lineNumber: 442,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 435,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 431,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value: profil.rechercheVraie || "",
						onChange: (e) => onChange({ rechercheVraie: e.target.value }),
						rows: 3,
						placeholder: "Ex : Je recherche une opportunité avec une forte autonomie sur des projets stratégiques. Une équipe bienveillante, axée sur l'apprentissage et avec des perspectives de recrutement...",
						className: "text-xs leading-relaxed border-purple-500/20 bg-background/50 focus-visible:ring-purple-500 rounded-xl"
					}, void 0, false, {
						fileName: _jsxFileName$15,
						lineNumber: 449,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/40",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs font-medium text-foreground",
								children: "Secteurs à éviter"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 459,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.secteursEviter || "",
								onChange: (e) => onChange({ secteursEviter: e.target.value }),
								placeholder: "Ex : Tabac, Armement, Grande distribution...",
								className: "text-xs rounded-xl border-border/70"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 462,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 458,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs font-medium text-foreground",
								children: "Critères rédhibitoires"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 476,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: profil.redhibitoires || "",
								onChange: (e) => onChange({ redhibitoires: e.target.value }),
								placeholder: "Ex : Pas de présentiel à plus d'1h de trajet...",
								className: "text-xs rounded-xl border-border/70"
							}, void 0, false, {
								fileName: _jsxFileName$15,
								lineNumber: 479,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$15,
							lineNumber: 475,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$15,
						lineNumber: 457,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$15,
				lineNumber: 430,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$15,
		lineNumber: 106,
		columnNumber: 5
	}, this);
}
var _jsxFileName$14 = "/app/applet/src/components/ui/switch.tsx";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") }, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$14,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Switch.displayName = Switch$1.displayName;
var _jsxFileName$13 = "/app/applet/src/components/profil/ProfilJourneyTab.tsx";
var TYPES_CONTRAT = [
	"Stage",
	"Alternance",
	"CDI",
	"CDD",
	"Freelance",
	"VIE",
	"Graduate Program",
	"Projet",
	"Autre"
];
var NIVEAUX_ETUDES = [
	"Bac +1",
	"Bac +2 (BTS / DUT / Prépa)",
	"Bac +3 (Licence / Bachelor)",
	"Bac +4 (Master 1)",
	"Bac +5 (Master 2 / PGE / Ingénieur)",
	"Mastère Spécialisé / MBA",
	"Doctorat / PhD"
];
function formatPeriodeAffichee(debut, fin, enCours) {
	const d = debut?.trim() || "";
	const f = fin?.trim() || "";
	if (enCours || !f && d) return d ? `${d} - Aujourd'hui` : "En cours";
	if (d && f) return `${d} - ${f}`;
	if (d) return d;
	if (f) return f;
	return "";
}
function ProfilJourneyTab({ profil, onChange }) {
	const [subView, setSubView] = (0, import_react.useState)("experiences");
	const cv = profil.cvStructure;
	const experiences = cv?.experiences || [];
	const formations = cv?.formations || [];
	const [expandedExp, setExpandedExp] = (0, import_react.useState)(0);
	const [expandedForm, setExpandedForm] = (0, import_react.useState)(0);
	const updateExperiences = (nouvellesExp) => {
		onChange({ cvStructure: {
			...cv,
			experiences: nouvellesExp
		} });
	};
	const handleAjouterExp = () => {
		const ne = nouvelleExperience();
		updateExperiences([ne, ...experiences]);
		setExpandedExp(0);
	};
	const handleSupprimerExp = (index) => {
		const updated = experiences.filter((_, i) => i !== index);
		updateExperiences(updated);
		if (expandedExp === index) setExpandedExp(null);
	};
	const handleModifierExp = (index, patch) => {
		const updated = experiences.map((exp, i) => i === index ? {
			...exp,
			...patch
		} : exp);
		updateExperiences(updated);
	};
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
	const handleAjouterForm = () => {
		const nf = nouvelleFormation();
		updateFormations([nf, ...formations]);
		setExpandedForm(0);
	};
	const handleSupprimerForm = (index) => {
		const updated = formations.filter((_, i) => i !== index);
		updateFormations(updated);
		if (expandedForm === index) setExpandedForm(null);
	};
	const handleModifierForm = (index, patch) => {
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
				className: "rounded-2xl border border-border/60 bg-card/40 p-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setSubView("experiences"),
						className: `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${subView === "experiences" ? "bg-card text-foreground shadow-xs border border-border/80 text-purple-300" : "text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-3.5 text-purple-400" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 169,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Expériences professionnelles" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 170,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "text-[10px] bg-purple-500/15 text-purple-300 px-1.5 py-0",
								children: experiences.length
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 171,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 160,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setSubView("formations"),
						className: `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${subView === "formations" ? "bg-card text-foreground shadow-xs border border-border/80 text-indigo-300" : "text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "size-3.5 text-indigo-400" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 188,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Formations & Diplômes" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 189,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "secondary",
								className: "text-[10px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0",
								children: formations.length
							}, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 190,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 179,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 159,
					columnNumber: 9
				}, this), subView === "experiences" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouterExp,
					className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 205,
						columnNumber: 13
					}, this), "Ajouter une expérience"]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 200,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouterForm,
					className: "gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 214,
						columnNumber: 13
					}, this), "Ajouter une formation"]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 209,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 158,
				columnNumber: 7
			}, this),
			subView === "experiences" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [experiences.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "rounded-2xl border border-border/60 bg-card/40 p-10 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (void 0)(Briefcase, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 226,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 225,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Aucune expérience professionnelle enregistrée"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 228,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: "Ajoutez vos stages, alternances, jobs ou projets phares pour enrichir votre dossier."
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 231,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							onClick: handleAjouterExp,
							className: "gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 241,
								columnNumber: 17
							}, this), "Ajouter une première expérience"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 235,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 224,
					columnNumber: 13
				}, this), experiences.map((exp, idx) => {
					const isExpanded = expandedExp === idx;
					const titreAffiche = exp.poste || exp.entreprise || `Expérience #${idx + 1}`;
					const sousTitre = [
						exp.entreprise,
						exp.contrat || exp.typeContrat,
						exp.lieu
					].filter(Boolean).join(" • ");
					const dates = formatPeriodeAffichee(exp.debut, exp.fin, exp.enCours);
					return /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-border/60 bg-card/40 overflow-hidden transition-all",
						children: [/* @__PURE__ */ (void 0)("div", {
							onClick: () => setExpandedExp(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 font-bold text-xs",
									children: ["#", experiences.length - idx]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 275,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-bold text-foreground truncate",
											children: titreAffiche
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 280,
											columnNumber: 25
										}, this), exp.enCours && /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-[10px] py-0",
											children: "En cours"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 284,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 279,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											sousTitre,
											" ",
											dates && `• ${dates}`
										]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 289,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 278,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 274,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: (e) => {
										e.stopPropagation();
										handleSupprimerExp(idx);
									},
									className: "size-8 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 305,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 296,
									columnNumber: 21
								}, this), isExpanded ? /* @__PURE__ */ (void 0)(ChevronUp, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 308,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 310,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 295,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 270,
							columnNumber: 17
						}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 space-y-4 bg-background/40",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Intitulé du poste *"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 320,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: exp.poste,
											onChange: (e) => handleModifierExp(idx, { poste: e.target.value }),
											placeholder: "Ex: Bras Droit CEO, Consultant Junior..."
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 323,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 319,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Entreprise / Organisation *"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 333,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: exp.entreprise,
											onChange: (e) => handleModifierExp(idx, { entreprise: e.target.value }),
											placeholder: "Ex: Qonto, BCG, LVMH, BNP Paribas..."
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 336,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 332,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 318,
									columnNumber: 21
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
												fileName: _jsxFileName$13,
												lineNumber: 350,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Select, {
												value: exp.contrat || exp.typeContrat || "Stage",
												onValueChange: (val) => handleModifierExp(idx, {
													contrat: val,
													typeContrat: val
												}),
												children: [/* @__PURE__ */ (void 0)(SelectTrigger, { children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$13,
													lineNumber: 363,
													columnNumber: 29
												}, this) }, void 0, false, {
													fileName: _jsxFileName$13,
													lineNumber: 362,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: TYPES_CONTRAT.map((t) => /* @__PURE__ */ (void 0)(SelectItem, {
													value: t,
													children: t
												}, t, false, {
													fileName: _jsxFileName$13,
													lineNumber: 367,
													columnNumber: 31
												}, this)) }, void 0, false, {
													fileName: _jsxFileName$13,
													lineNumber: 365,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$13,
												lineNumber: 353,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 349,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Date de début"
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 376,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: exp.debut,
												onChange: (e) => handleModifierExp(idx, { debut: e.target.value }),
												placeholder: "Ex: 01/2024 ou Janvier 2024"
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 379,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 375,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Date de fin"
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 389,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: exp.fin,
												disabled: exp.enCours,
												onChange: (e) => handleModifierExp(idx, { fin: e.target.value }),
												placeholder: exp.enCours ? "Poste actuel" : "Ex: 06/2024 ou Juin 2024"
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 392,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 388,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 348,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between pt-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Switch, {
											checked: exp.enCours,
											onCheckedChange: (c) => handleModifierExp(idx, {
												enCours: c,
												fin: c ? "" : exp.fin
											})
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 409,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs text-foreground font-medium",
											children: "Poste actuel / En cours"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 418,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 408,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "w-1/2",
										children: /* @__PURE__ */ (void 0)(Input, {
											value: exp.lieu,
											onChange: (e) => handleModifierExp(idx, { lieu: e.target.value }),
											placeholder: "Lieu (ex: Paris, France)",
											className: "h-8 text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 424,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 423,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 407,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Missions & Responsabilités"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 438,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "Utilisez des verbes d'action"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 441,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 437,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Textarea, {
										rows: 3,
										value: exp.description,
										onChange: (e) => handleModifierExp(idx, { description: e.target.value }),
										placeholder: "• Gestion et pilotage de 3 chantiers transverses...\n• Analyse quantitative de 15 opportunités de marché...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 445,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 436,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-purple-300 flex items-center gap-1.5",
											children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "size-3.5 text-purple-400" }, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 462,
												columnNumber: 27
											}, this), "Réalisations Chiffrées & KPI d'impact (ATS Booster)"]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 461,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] text-purple-400 font-medium",
											children: "+20 pts Matching IA"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 465,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 460,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: exp.kpi || exp.realisationsCles || "",
										onChange: (e) => handleModifierExp(idx, {
											kpi: e.target.value,
											realisationsCles: e.target.value
										}),
										placeholder: "Ex: +32% de taux d'ouverture email, 450k€ de budget géré, 12 audits réalisés...",
										className: "text-xs bg-background/80 border-purple-500/30"
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 469,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 459,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Outils & Compétences mobilisés dans ce poste"
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 484,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: exp.competences?.join(", ") || "",
										onChange: (e) => handleModifierExp(idx, { competences: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex: Notion, SQL, Excel, Figma, Analyse financière...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 487,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 483,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 317,
							columnNumber: 19
						}, this)]
					}, exp.id, true, {
						fileName: _jsxFileName$13,
						lineNumber: 265,
						columnNumber: 15
					}, this);
				})]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 222,
				columnNumber: 9
			}, this),
			subView === "formations" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [formations.length === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "rounded-2xl border border-border/60 bg-card/40 p-10 text-center space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (void 0)(GraduationCap, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 515,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 514,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Aucune formation enregistrée"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 517,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground max-w-sm mx-auto",
							children: "Ajoutez votre école, université, master ou classe préparatoire."
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 520,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							variant: "outline",
							onClick: handleAjouterForm,
							className: "gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 529,
								columnNumber: 17
							}, this), "Ajouter une formation"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 523,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 513,
					columnNumber: 13
				}, this), formations.map((f, idx) => {
					const isExpanded = expandedForm === idx;
					const titreAffiche = f.diplome || f.etablissement || `Formation #${idx + 1}`;
					const sousTitre = [
						f.etablissement,
						f.specialisation || f.parcours,
						f.mention ? `Mention ${f.mention}` : f.niveau
					].filter(Boolean).join(" • ");
					const dates = formatPeriodeAffichee(f.debut, f.fin, f.enCours);
					return /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-border/60 bg-card/40 overflow-hidden transition-all",
						children: [/* @__PURE__ */ (void 0)("div", {
							onClick: () => setExpandedForm(isExpanded ? null : idx),
							className: "flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-bold text-xs",
									children: "🎓"
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 560,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-sm font-bold text-foreground truncate",
											children: titreAffiche
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 565,
											columnNumber: 25
										}, this), f.enCours && /* @__PURE__ */ (void 0)(Badge, {
											className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 text-[10px] py-0",
											children: "En cours"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 569,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 564,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											sousTitre,
											" ",
											dates && `• ${dates}`
										]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 574,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 563,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 559,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: (e) => {
										e.stopPropagation();
										handleSupprimerForm(idx);
									},
									className: "size-8 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 590,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 581,
									columnNumber: 21
								}, this), isExpanded ? /* @__PURE__ */ (void 0)(ChevronUp, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 593,
									columnNumber: 23
								}, this) : /* @__PURE__ */ (void 0)(ChevronDown, { className: "size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$13,
									lineNumber: 595,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$13,
								lineNumber: 580,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 555,
							columnNumber: 17
						}, this), isExpanded && /* @__PURE__ */ (void 0)("div", {
							className: "p-4 sm:p-6 border-t border-border/50 space-y-4 bg-background/40",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Établissement / École *"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 605,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.etablissement,
											onChange: (e) => handleModifierForm(idx, { etablissement: e.target.value }),
											placeholder: "Ex: NEOMA Business School, HEC Paris, Dauphine..."
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 608,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 604,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs font-medium text-foreground",
											children: "Intitulé du Diplôme / Cursus *"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 620,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.diplome,
											onChange: (e) => handleModifierForm(idx, { diplome: e.target.value }),
											placeholder: "Ex: Programme Grande École (PGE), Master 2 Finance..."
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 623,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 619,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 603,
									columnNumber: 21
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
												fileName: _jsxFileName$13,
												lineNumber: 637,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Select, {
												value: f.niveau || "Bac +5 (Master 2 / PGE / Ingénieur)",
												onValueChange: (val) => handleModifierForm(idx, { niveau: val }),
												children: [/* @__PURE__ */ (void 0)(SelectTrigger, { children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$13,
													lineNumber: 649,
													columnNumber: 29
												}, this) }, void 0, false, {
													fileName: _jsxFileName$13,
													lineNumber: 648,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_ETUDES.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
													value: n,
													children: n
												}, n, false, {
													fileName: _jsxFileName$13,
													lineNumber: 653,
													columnNumber: 31
												}, this)) }, void 0, false, {
													fileName: _jsxFileName$13,
													lineNumber: 651,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$13,
												lineNumber: 640,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 636,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Spécialisation / Majeure"
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 662,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: f.specialisation || "",
												onChange: (e) => handleModifierForm(idx, { specialisation: e.target.value }),
												placeholder: "Ex: Corporate Finance, Strategy, Data..."
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 665,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 661,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												className: "text-xs text-muted-foreground",
												children: "Mention / Distinctions"
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 677,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Input, {
												value: f.mention || "",
												onChange: (e) => handleModifierForm(idx, { mention: e.target.value }),
												placeholder: "Ex: Mention Très Bien, Major de promo..."
											}, void 0, false, {
												fileName: _jsxFileName$13,
												lineNumber: 680,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$13,
											lineNumber: 676,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 635,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Date de début"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 694,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.debut,
											onChange: (e) => handleModifierForm(idx, { debut: e.target.value }),
											placeholder: "Ex: 2022"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 697,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 693,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Date de fin / Promo"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 707,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Input, {
											value: f.fin,
											onChange: (e) => handleModifierForm(idx, { fin: e.target.value }),
											placeholder: "Ex: 2026 (Promo 2026)"
										}, void 0, false, {
											fileName: _jsxFileName$13,
											lineNumber: 710,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$13,
										lineNumber: 706,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 692,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Cours clés & Projets académiques valorisables"
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 722,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: f.coursImportants?.join(", ") || "",
										onChange: (e) => handleModifierForm(idx, { coursImportants: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Ex: Modélisation financière LBO, Stratégie M&A, Machine Learning appliqué, Droit des affaires...",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$13,
										lineNumber: 725,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$13,
									lineNumber: 721,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 602,
							columnNumber: 19
						}, this)]
					}, f.id, true, {
						fileName: _jsxFileName$13,
						lineNumber: 550,
						columnNumber: 15
					}, this);
				})]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 511,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$13,
		lineNumber: 156,
		columnNumber: 5
	}, this);
}
var _jsxFileName$12 = "/app/applet/src/components/profil/ProfilTagSuggestions.tsx";
var DEFAULT_CATEGORY_TAGS = {
	metiers: [
		"Bras Droit CEO",
		"Consultant Stratégie & Management",
		"Chef de Projet / PMO",
		"Product Manager / PO",
		"Data Analyst / BI",
		"Chargé d'Affaires M&A / Private Equity",
		"Business Developer B2B",
		"Contrôleur de Gestion Junior",
		"Auditeur Financier Junior",
		"Growth Marketer / Acquisition",
		"Consultant RSE / ESG",
		"Customer Success Manager"
	],
	domaines: [
		"Tech, SaaS & IA",
		"Banque d'Investissement & Finance",
		"Conseil en Stratégie & Organisation",
		"Luxe, Mode & Beauté",
		"Santé, Pharma & Biotech",
		"Énergie, Climat & CleanTech",
		"E-commerce & Grande Consommation",
		"Immobilier & PropTech",
		"Aéronautique, Défense & Industrie",
		"Impact, Climat & ESS"
	],
	competences: [
		"Modélisation financière",
		"Analyse de données",
		"Gestion de projet Agile / Scrum",
		"Prospection & Négociation B2B",
		"Pitch & Présentation Exécutive",
		"Audit financier & Comptabilité",
		"Stratégie Go-to-Market",
		"SEO / SEA & Growth",
		"Reporting & Tableaux de bord",
		"Étude de marché & Benchmark"
	],
	logiciels: [
		"Excel (TCD, RechercheX, VBA)",
		"Power BI",
		"SQL",
		"Python (Pandas, Numpy)",
		"Figma",
		"Notion",
		"Salesforce CRM",
		"HubSpot",
		"Google Analytics 4",
		"Tableau Software",
		"Jira / Confluence",
		"Canva"
	],
	soft_skills: [
		"Rigueur & Esprit d'analyse",
		"Leadership & Esprit d'équipe",
		"Adaptabilité & Polyvalence",
		"Aisance relationnelle",
		"Autonomie & Proactivité",
		"Sens de l'écoute & Empathie",
		"Résolution de problèmes complexes"
	],
	entreprises: [
		"McKinsey & Company",
		"Boston Consulting Group (BCG)",
		"Bain & Company",
		"BNP Paribas",
		"Société Générale",
		"L'Oréal",
		"LVMH",
		"Kering",
		"TotalEnergies",
		"Airbus",
		"Doctolib",
		"Qonto",
		"Alan"
	],
	contrats: [
		"Stage de fin d'études (6 mois)",
		"Stage de césure (6 mois)",
		"Alternance (12 mois)",
		"Alternance (24 mois)",
		"Premier CDI",
		"VIE (Volontariat International)"
	]
};
function ProfilTagSuggestions({ label = "Suggestions rapides", tags, categorie, currentValue, valeurActuelle, onSelectTag, onSelectSuggestion }) {
	const currentStr = String(currentValue ?? valeurActuelle ?? "").toLowerCase();
	const availableTags = tags && tags.length > 0 ? tags : categorie && DEFAULT_CATEGORY_TAGS[categorie] ? DEFAULT_CATEGORY_TAGS[categorie] : [];
	if (availableTags.length === 0) return null;
	const handleSelect = (tag) => {
		if (onSelectTag) onSelectTag(tag);
		if (onSelectSuggestion) onSelectSuggestion(tag);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5 pt-1",
		children: [label && /* @__PURE__ */ (void 0)("span", {
			className: "text-[11px] font-medium text-muted-foreground",
			children: [label, " :"]
		}, void 0, true, {
			fileName: _jsxFileName$12,
			lineNumber: 143,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap gap-1.5",
			children: availableTags.map((tag) => {
				const isSelected = currentStr.includes(tag.toLowerCase());
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => handleSelect(tag),
					className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all ${isSelected ? "border border-primary/40 bg-primary/10 font-medium text-primary shadow-xs" : "border border-border/60 bg-muted/40 text-muted-foreground hover:border-primary/30 hover:bg-muted/80 hover:text-foreground"}`,
					children: [isSelected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3 text-primary" }, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 162,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3 opacity-60" }, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 164,
						columnNumber: 17
					}, this), tag]
				}, tag, true, {
					fileName: _jsxFileName$12,
					lineNumber: 151,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName$12,
			lineNumber: 147,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$12,
		lineNumber: 141,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/profil/ProfilSkillsTab.tsx";
function ProfilSkillsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const allCompetences = cv?.competences || [];
	const hardSkillsList = allCompetences.filter((c) => c.typeCategorie !== "soft" && c.categorie !== "Soft Skill" && c.categorie !== "Comportemental");
	const softSkillsList = allCompetences.filter((c) => c.typeCategorie === "soft" || c.categorie === "Soft Skill" || c.categorie === "Comportemental");
	const [nouvelleHardSkill, setNouvelleHardSkill] = (0, import_react.useState)("");
	const [niveauHardSkill, setNiveauHardSkill] = (0, import_react.useState)("Intermédiaire");
	const updateHardSkills = (nouvelles) => {
		const merged = [...nouvelles, ...softSkillsList];
		onChange({
			competences: nouvelles.map((c) => `${c.nom} (${c.niveau || "Intermédiaire"})`).join(", ") || profil.competences,
			cvStructure: {
				...cv,
				competences: merged
			}
		});
	};
	const handleAjouterHardSkill = () => {
		if (!nouvelleHardSkill.trim()) return;
		const nc = {
			id: crypto.randomUUID(),
			nom: nouvelleHardSkill.trim(),
			niveau: niveauHardSkill,
			categorie: "Hard Skill",
			typeCategorie: "hard"
		};
		updateHardSkills([...hardSkillsList, nc]);
		setNouvelleHardSkill("");
	};
	const handleSupprimerCompetence = (id) => {
		updateHardSkills(hardSkillsList.filter((c) => c.id !== id));
	};
	const handleModifierNiveau = (id, niveau) => {
		updateHardSkills(hardSkillsList.map((c) => c.id === id ? {
			...c,
			niveau
		} : c));
	};
	const handleSoftSkillsChange = (val) => {
		const newSofts = val.split(",").map((s) => s.trim()).filter(Boolean).map((nom) => {
			return softSkillsList.find((s) => s.nom.toLowerCase() === nom.toLowerCase()) || {
				id: crypto.randomUUID(),
				nom,
				niveau: "Avancé",
				categorie: "Soft Skill",
				typeCategorie: "soft"
			};
		});
		onChange({ cvStructure: {
			...cv,
			competences: [...hardSkillsList, ...newSofts]
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cpu, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 129,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 128,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: [
								"Hard Skills & Compétences Techniques (",
								hardSkillsList.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 132,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Définissez votre niveau de maîtrise pour affiner le calcul de compatibilité du Match IA"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 135,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 131,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 127,
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
									fileName: _jsxFileName$11,
									lineNumber: 145,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
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
									fileName: _jsxFileName$11,
									lineNumber: 148,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 144,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-40 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Niveau"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 162,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: niveauHardSkill,
									onValueChange: (v) => setNiveauHardSkill(v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "text-xs h-10",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 168,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 167,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n, false, {
										fileName: _jsxFileName$11,
										lineNumber: 172,
										columnNumber: 19
									}, this)) }, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 170,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$11,
									lineNumber: 163,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 161,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								onClick: handleAjouterHardSkill,
								className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white h-10 px-4 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 185,
									columnNumber: 13
								}, this), "Ajouter"]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 180,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 143,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfilTagSuggestions, {
						categorie: "competences",
						valeurActuelle: profil.competences,
						onSelectSuggestion: (nom) => {
							if (!hardSkillsList.some((c) => c.nom.toLowerCase() === nom.toLowerCase())) {
								const nc = {
									id: crypto.randomUUID(),
									nom,
									niveau: "Intermédiaire",
									categorie: "Hard Skill"
								};
								updateHardSkills([...hardSkillsList, nc]);
							}
						}
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 190,
						columnNumber: 9
					}, this),
					hardSkillsList.length > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 pt-2",
						children: hardSkillsList.map((comp) => /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-card/60 p-2.5 px-3 transition-colors hover:border-purple-500/30",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "block text-xs font-semibold text-foreground truncate",
									children: comp.nom
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 219,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] text-purple-400 font-medium",
									children: comp.niveau || "Intermédiaire"
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 222,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 218,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (void 0)(Select, {
									value: comp.niveau || "Intermédiaire",
									onValueChange: (n) => handleModifierNiveau(comp.id, n),
									children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
										className: "h-6 w-20 text-[10px] px-1.5 border-border/60",
										children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName$11,
											lineNumber: 235,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 234,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
										value: n,
										className: "text-xs",
										children: n
									}, n, false, {
										fileName: _jsxFileName$11,
										lineNumber: 239,
										columnNumber: 25
									}, this)) }, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 237,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$11,
									lineNumber: 228,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => handleSupprimerCompetence(comp.id),
									className: "h-6 w-6 p-0 text-muted-foreground hover:text-rose-400",
									children: /* @__PURE__ */ (void 0)(X, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$11,
										lineNumber: 252,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$11,
									lineNumber: 246,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$11,
								lineNumber: 227,
								columnNumber: 17
							}, this)]
						}, comp.id, true, {
							fileName: _jsxFileName$11,
							lineNumber: 214,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 212,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 126,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$11,
								lineNumber: 265,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 264,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Logiciels & Outils du Quotidien"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 268,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Outils bureautiques, design, analytics, développement et CRM"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 271,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$11,
							lineNumber: 267,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 263,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Logiciels maîtrisés (séparés par des virgules)"
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 278,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: profil.logiciels,
							onChange: (e) => onChange({ logiciels: e.target.value }),
							placeholder: "Ex : Excel (RechercheX, TCD, VBA), Figma, Notion, Salesforce, Google Analytics, PowerBI, SQL, Slack..."
						}, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 281,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 277,
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
						fileName: _jsxFileName$11,
						lineNumber: 288,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 262,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 309,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 308,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Soft Skills & Savoir-être"
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 312,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Qualités humaines et relationnelles valorisées en entretien"
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 315,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$11,
						lineNumber: 311,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 307,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Vos atouts relationnels et méthodes de travail"
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 322,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						value: softSkillsList.map((c) => c.nom).join(", "),
						onChange: (e) => handleSoftSkillsChange(e.target.value),
						placeholder: "Ex : Aisance relationnelle, Esprit d'analyse, Rigueur, Leadership, Autonomie, Adaptabilité, Esprit d'équipe..."
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 325,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$11,
					lineNumber: 321,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 306,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 124,
		columnNumber: 5
	}, this);
}
var _jsxFileName$10 = "/app/applet/src/components/profil/ProfilLanguagesTab.tsx";
var NIVEAUX_LANGUES = [
	{
		value: "Langue maternelle",
		label: "Langue maternelle",
		desc: "Natif"
	},
	{
		value: "C2",
		label: "C2 (Bilingue)",
		desc: "Aisance totale et fluide"
	},
	{
		value: "C1",
		label: "C1 (Courant)",
		desc: "Capacité à négocier et travailler"
	},
	{
		value: "B2",
		label: "B2 (Professionnel)",
		desc: "Autonomie en réunion et à l'écrit"
	},
	{
		value: "B1",
		label: "B1 (Intermédiaire)",
		desc: "Compréhension et échanges simples"
	},
	{
		value: "A2",
		label: "A2 (Élémentaire)",
		desc: "Bases élémentaires"
	},
	{
		value: "A1",
		label: "A1 (Débutant)",
		desc: "Premières notions"
	}
];
var SUGGESTIONS_LANGUES = [
	"Anglais",
	"Français",
	"Espagnol",
	"Allemand",
	"Italien",
	"Mandarin",
	"Arabe",
	"Portugais",
	"Japonais",
	"Russe"
];
function ProfilLanguagesTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const langues = cv?.langues || [];
	const [nouvelleLangueNom, setNouvelleLangueNom] = (0, import_react.useState)("");
	const [nouveauNiveau, setNouveauNiveau] = (0, import_react.useState)("B2");
	const [nouvelleCertif, setNouvelleCertif] = (0, import_react.useState)("");
	const [nouveauScore, setNouveauScore] = (0, import_react.useState)("");
	const updateLangues = (nouvellesLangues) => {
		const anglaisItem = nouvellesLangues.find((l) => l.nom.toLowerCase().includes("anglais"));
		onChange({
			langues: nouvellesLangues.map((l) => `${l.nom} (${l.niveau})`).join(", "),
			niveauAnglais: anglaisItem?.niveau || profil.niveauAnglais,
			cvStructure: {
				...cv,
				langues: nouvellesLangues
			}
		});
	};
	const handleAjouterLangue = () => {
		const nom = nouvelleLangueNom.trim();
		if (!nom) return;
		const nl = {
			id: crypto.randomUUID(),
			nom,
			niveau: nouveauNiveau,
			certification: nouvelleCertif.trim() || void 0,
			score: nouveauScore.trim() || void 0
		};
		updateLangues([...langues, nl]);
		setNouvelleLangueNom("");
		setNouvelleCertif("");
		setNouveauScore("");
	};
	const handleSupprimerLangue = (id) => {
		updateLangues(langues.filter((l) => l.id !== id));
	};
	const handleModifierNiveau = (id, niveau) => {
		updateLangues(langues.map((l) => l.id === id ? {
			...l,
			niveau
		} : l));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Earth, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 129,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 128,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Langues & Niveaux CECRL (",
							langues.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 132,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Précisez vos langues de travail, niveaux d'aisance et scores certifiés"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 135,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 131,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 127,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Suggestions rapides :"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 144,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5",
						children: SUGGESTIONS_LANGUES.map((sug) => {
							const alreadyAdded = langues.some((l) => l.nom.toLowerCase() === sug.toLowerCase());
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setNouvelleLangueNom(sug),
								disabled: alreadyAdded,
								className: `text-xs px-2.5 py-1 rounded-lg border transition-all ${alreadyAdded ? "opacity-40 cursor-not-allowed border-border/50 text-muted-foreground" : "border-border/70 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-foreground"}`,
								children: ["+ ", sug]
							}, sug, true, {
								fileName: _jsxFileName$10,
								lineNumber: 153,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 147,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 143,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-4 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-foreground font-medium",
								children: "Langue *"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 174,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouvelleLangueNom,
								onChange: (e) => setNouvelleLangueNom(e.target.value),
								placeholder: "Ex: Anglais, Espagnol...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 177,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 173,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-foreground font-medium",
								children: "Niveau CECRL"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 186,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: nouveauNiveau,
								onValueChange: (val) => setNouveauNiveau(val),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$10,
										lineNumber: 194,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 193,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_LANGUES.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: n.value,
									className: "text-xs",
									children: n.label
								}, n.value, false, {
									fileName: _jsxFileName$10,
									lineNumber: 198,
									columnNumber: 19
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 196,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$10,
								lineNumber: 189,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 185,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Certif & Score (optionnel)"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 207,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauScore,
								onChange: (e) => setNouveauScore(e.target.value),
								placeholder: "Ex: TOEIC 945, IELTS 7.5...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 210,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 206,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterLangue,
							disabled: !nouvelleLangueNom.trim(),
							className: "gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs h-10 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 224,
								columnNumber: 13
							}, this), "Ajouter la langue"]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 218,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 172,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 126,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-3",
			children: [langues.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground text-center py-6 rounded-2xl border border-border/60 bg-card/40",
				children: "Aucune langue enregistrée. L'anglais et votre langue maternelle sont essentiels pour le Match IA."
			}, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 233,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: langues.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border/60 bg-card/40 p-4 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-bold text-foreground truncate",
								children: l.nom
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 247,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "text-[10px] bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
								children: l.niveau
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 250,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 246,
							columnNumber: 17
						}, this), (l.certification || l.score || l.attestation) && /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-1.5 pt-0.5",
							children: [
								l.certification && /* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-purple-300 font-medium bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20",
									children: [l.certification, l.score ? ` : ${l.score}` : ""]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 260,
									columnNumber: 23
								}, this),
								!l.certification && l.score && /* @__PURE__ */ (void 0)("span", {
									className: "text-[11px] text-purple-300 font-medium",
									children: ["🏆 ", l.score]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 266,
									columnNumber: 23
								}, this),
								l.attestation && /* @__PURE__ */ (void 0)("span", {
									className: "text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20",
									children: ["✓ ", l.attestation]
								}, void 0, true, {
									fileName: _jsxFileName$10,
									lineNumber: 271,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 258,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 245,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: l.niveau,
							onValueChange: (val) => handleModifierNiveau(l.id, val),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "h-7 w-28 text-[11px] border-border/60",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
									fileName: _jsxFileName$10,
									lineNumber: 287,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 286,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: NIVEAUX_LANGUES.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
								value: n.value,
								className: "text-xs",
								children: n.label
							}, n.value, false, {
								fileName: _jsxFileName$10,
								lineNumber: 291,
								columnNumber: 23
							}, this)) }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 289,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$10,
							lineNumber: 280,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => handleSupprimerLangue(l.id),
							className: "size-7 p-0 text-muted-foreground hover:text-rose-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$10,
								lineNumber: 308,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$10,
							lineNumber: 302,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$10,
						lineNumber: 279,
						columnNumber: 15
					}, this)]
				}, l.id, true, {
					fileName: _jsxFileName$10,
					lineNumber: 241,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$10,
				lineNumber: 239,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 231,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 124,
		columnNumber: 5
	}, this);
}
var _jsxFileName$9 = "/app/applet/src/components/profil/ProfilCertificationsTab.tsx";
var SUGGESTIONS_CERTIFS = [
	"AMF (Autorité des Marchés Financiers)",
	"CFA Level 1",
	"Bloomberg Market Concepts (BMC)",
	"AWS Certified Cloud Practitioner",
	"Google Analytics Certification",
	"Google Cloud Digital Leader",
	"Microsoft Excel Expert (MO-201)",
	"Scrum Master (PSM I)",
	"HubSpot Inbound Marketing",
	"SQL / DataCamp Data Analyst"
];
function ProfilCertificationsTab({ profil, onChange }) {
	const cv = profil.cvStructure;
	const certifs = cv?.certifications || [];
	const [nouveauNom, setNouveauNom] = (0, import_react.useState)("");
	const [nouvelOrganisme, setNouvelOrganisme] = (0, import_react.useState)("");
	const [nouvelleDate, setNouvelleDate] = (0, import_react.useState)("");
	const [nouveauLien, setNouveauLien] = (0, import_react.useState)("");
	const [nouveauIdentifiant, setNouveauIdentifiant] = (0, import_react.useState)("");
	const updateCertifs = (nouvellesCertifs) => {
		onChange({ cvStructure: {
			...cv,
			certifications: nouvellesCertifs
		} });
	};
	const handleAjouterCertif = () => {
		const nom = nouveauNom.trim();
		if (!nom) return;
		const nc = {
			id: crypto.randomUUID(),
			nom,
			organisme: nouvelOrganisme.trim() || "",
			date: nouvelleDate.trim() || "",
			lien: nouveauLien.trim() || "",
			identifiant: nouveauIdentifiant.trim() || ""
		};
		updateCertifs([nc, ...certifs]);
		setNouveauNom("");
		setNouvelOrganisme("");
		setNouvelleDate("");
		setNouveauLien("");
		setNouveauIdentifiant("");
	};
	const handleSupprimerCertif = (id) => {
		updateCertifs(certifs.filter((c) => c.id !== id));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 96,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 95,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: [
							"Certifications Professionnelles & Accréditations (",
							certifs.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 99,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Valorisez vos diplômes certifiants, certifications tech, finance, marketing ou cloud"
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 103,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 98,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 94,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs text-muted-foreground",
						children: "Certifications reconnues :"
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 112,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-1.5",
						children: SUGGESTIONS_CERTIFS.map((sug) => {
							const alreadyAdded = certifs.some((c) => c.nom || "".toLowerCase() === sug.toLowerCase());
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setNouveauNom(sug),
								disabled: alreadyAdded,
								className: `text-xs px-2.5 py-1 rounded-lg border transition-all ${alreadyAdded ? "opacity-40 cursor-not-allowed border-border/50 text-muted-foreground" : "border-border/70 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-foreground"}`,
								children: ["+ ", sug]
							}, sug, true, {
								fileName: _jsxFileName$9,
								lineNumber: 121,
								columnNumber: 17
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 115,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 111,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-foreground font-medium",
								children: "Intitulé de la Certification *"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 142,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauNom,
								onChange: (e) => setNouveauNom(e.target.value),
								placeholder: "Ex: Certification AMF, AWS Solutions Architect...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 145,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 141,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Organisme émetteur"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 154,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouvelOrganisme,
								onChange: (e) => setNouvelOrganisme(e.target.value),
								placeholder: "Ex: Autorité des Marchés Financiers, Amazon Web Services...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 157,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 153,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Date d'obtention"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 166,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouvelleDate,
								onChange: (e) => setNouvelleDate(e.target.value),
								placeholder: "Ex: Mars 2024 ou 2024",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 169,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 165,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Numéro / ID de licence"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 178,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauIdentifiant,
								onChange: (e) => setNouveauIdentifiant(e.target.value),
								placeholder: "Ex: AMF-2024-98421",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 181,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 177,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Lien de vérification (Badge / URL)"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 190,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: nouveauLien,
								onChange: (e) => setNouveauLien(e.target.value),
								placeholder: "https://credly.com/...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 193,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 189,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: handleAjouterCertif,
					disabled: !nouveauNom.trim(),
					className: "gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 208,
						columnNumber: 11
					}, this), "Ajouter la certification"]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 202,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 93,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-3",
			children: [certifs.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground text-center py-6 rounded-2xl border border-border/60 bg-card/40",
				children: "Aucune certification enregistrée. Une certification officielle apporte une crédibilité immédiate à votre profil !"
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 216,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: certifs.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border/60 bg-card/40 p-4 flex flex-col justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 232,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 231,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-bold text-foreground",
									children: c.nom || ""
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 234,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 230,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => handleSupprimerCertif(c.id),
								className: "size-6 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 245,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 239,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 229,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 text-xs text-muted-foreground",
							children: [
								c.organisme && /* @__PURE__ */ (void 0)("p", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Building, { className: "size-3 text-muted-foreground/70" }, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 252,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: c.organisme }, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 253,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 251,
									columnNumber: 21
								}, this),
								c.date && /* @__PURE__ */ (void 0)("p", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Calendar, { className: "size-3 text-muted-foreground/70" }, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 258,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", { children: ["Obtenu en : ", c.date] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 259,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 257,
									columnNumber: 21
								}, this),
								c.score && /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-1.5 text-xs text-purple-300 font-semibold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 w-fit",
									children: [/* @__PURE__ */ (void 0)("span", { children: ["Score obtenu : ", c.score] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 264,
										columnNumber: 23
									}, this), c.niveau && /* @__PURE__ */ (void 0)("span", { children: [
										"(",
										c.niveau,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 265,
										columnNumber: 36
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 263,
									columnNumber: 21
								}, this),
								!c.score && c.niveau && /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-1.5 text-xs text-cyan-300 font-medium",
									children: /* @__PURE__ */ (void 0)("span", { children: ["Niveau attesté : ", c.niveau] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 270,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 269,
									columnNumber: 21
								}, this),
								c.identifiant && /* @__PURE__ */ (void 0)("p", {
									className: "text-[11px] font-mono text-purple-300",
									children: ["ID : ", c.identifiant]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 274,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 249,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 228,
						columnNumber: 15
					}, this), c.lien && /* @__PURE__ */ (void 0)("a", {
						href: c.lien,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300",
						children: [/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 288,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Vérifier l'authenticité" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 289,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 282,
						columnNumber: 17
					}, this)]
				}, c.id, true, {
					fileName: _jsxFileName$9,
					lineNumber: 224,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 222,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 214,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/profil/ProfilProjectsEngagementsTab.tsx";
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
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lightbulb, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 97,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$8,
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
								fileName: _jsxFileName$8,
								lineNumber: 100,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Applications créées, études de cas, business plans ou projets concrets"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 103,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 99,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 95,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterProjet,
							className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 115,
								columnNumber: 13
							}, this), "Ajouter un projet"]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 110,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 94,
						columnNumber: 9
					}, this),
					projets.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun projet renseigné. Les projets concrets prouvent vos compétences pratiques !"
					}, void 0, false, {
						fileName: _jsxFileName$8,
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
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: p.nom || "",
										onChange: (e) => handleModifierProjet(p.id, { nom: e.target.value }),
										placeholder: "Nom du projet (ex: Lancement d'un e-commerce, Hackathon IA...)",
										className: "text-xs font-semibold"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 134,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerProjet(p.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 148,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 142,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 133,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: p.role || "",
											onChange: (e) => handleModifierProjet(p.id, { role: e.target.value }),
											placeholder: "Votre rôle (ex: Lead Product, Développeur...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 153,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: p.periode || "",
											onChange: (e) => handleModifierProjet(p.id, { periode: e.target.value }),
											placeholder: "Période (ex: 2024, 3 mois...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 161,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											value: p.lien || "",
											onChange: (e) => handleModifierProjet(p.id, { lien: e.target.value }),
											placeholder: "Lien / Demo (ex: github.com/...)",
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 169,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 152,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: p.contexte || "",
										onChange: (e) => handleModifierProjet(p.id, { contexte: e.target.value }),
										placeholder: "Cadre / Contexte (ex: BUT Techniques de Commercialisation...)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 180,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: (p.technologies || p.outils || []).join(", "),
										onChange: (e) => handleModifierProjet(p.id, {
											technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
											outils: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
										}),
										placeholder: "Technologies & outils (ex: Canva, CapCut...)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 188,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 179,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									value: p.description || "",
									onChange: (e) => handleModifierProjet(p.id, { description: e.target.value }),
									placeholder: "Description du projet, contexte et résultats obtenus...",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 207,
									columnNumber: 15
								}, this)
							]
						}, p.id, true, {
							fileName: _jsxFileName$8,
							lineNumber: 129,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 127,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeartHandshake, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 226,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 225,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Associations Étudiantes & Engagements (",
									benevolats.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 229,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Mandats BDE, Junior-Entreprise, pôle humanitaire, clubs sportifs..."
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 232,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 228,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 224,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleAjouterBenevolat,
							className: "gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 244,
								columnNumber: 13
							}, this), "Ajouter un engagement"]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 239,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 223,
						columnNumber: 9
					}, this),
					benevolats.length === 0 && /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Aucun engagement associatif renseigné."
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 250,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: benevolats.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border/70 bg-card/50 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.organisation,
										onChange: (e) => handleModifierBenevolat(b.id, { organisation: e.target.value }),
										placeholder: "Nom de l'association / Organisation (ex: Junior Entreprise, BDE...)",
										className: "text-xs font-semibold"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 262,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => handleSupprimerBenevolat(b.id),
										className: "h-8 w-8 p-0 text-muted-foreground hover:text-rose-400 shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 278,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 272,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 261,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.role,
										onChange: (e) => handleModifierBenevolat(b.id, { role: e.target.value }),
										placeholder: "Rôle / Mandat (ex: Vice-Président, Trésorier, Chef de projet...)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 283,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.periode || "",
										onChange: (e) => handleModifierBenevolat(b.id, { periode: e.target.value }),
										placeholder: "Période (ex: 2023 - 2024)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 291,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 282,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: b.equipe || "",
										onChange: (e) => handleModifierBenevolat(b.id, { equipe: e.target.value }),
										placeholder: "Équipe / Management (ex: Management 24 membres)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 302,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: (b.outils || []).join(", "),
										onChange: (e) => handleModifierBenevolat(b.id, { outils: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }),
										placeholder: "Outils mobilisés (ex: Canva, Premiere...)",
										className: "text-xs"
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 310,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 301,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									value: b.description || "",
									onChange: (e) => handleModifierBenevolat(b.id, { description: e.target.value }),
									placeholder: "Réalisations : gestion de budget, organisation d'événements (nb de participants)...",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 325,
									columnNumber: 15
								}, this)
							]
						}, b.id, true, {
							fileName: _jsxFileName$8,
							lineNumber: 257,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 255,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 222,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 border-b border-border/50 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 343,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 342,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold text-foreground",
						children: "Centres d'intérêt & Passions Authentiques"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 346,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sports, musique, voyages, lectures, centres de curiosité personnelle"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 349,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 345,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 341,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: (cv?.interets || []).join(", "),
					onChange: (e) => onChange({ cvStructure: {
						...cv,
						interets: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
					} }),
					placeholder: "Ex : Course à pied (Semi-marathon de Paris), Piano jazz (10 ans de pratique), Voyages en autonomie, Échecs...",
					className: "text-xs"
				}, void 0, false, {
					fileName: _jsxFileName$8,
					lineNumber: 356,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 340,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/components/CvBuilder.tsx";
function Champ({ label, value, onChange, placeholder, className, type }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("grid min-w-0 gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 68,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			value,
			type,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 69,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
function Bloc({ icone: Icone, titre, compte, onAjouter, labelAjout, children, defaultOpen }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen ?? true);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "rounded-2xl border border-border/60 bg-card/40 overflow-hidden",
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
							fileName: _jsxFileName$7,
							lineNumber: 106,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 105,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "block truncate text-sm font-semibold",
							children: titre
						}, void 0, false, {
							fileName: _jsxFileName$7,
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
							fileName: _jsxFileName$7,
							lineNumber: 112,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180") }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 116,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 100,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onAjouter,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 124,
						columnNumber: 11
					}, this),
					" ",
					labelAjout
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 123,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 99,
			columnNumber: 7
		}, this), open && /* @__PURE__ */ (void 0)("div", {
			className: "grid gap-4 border-t border-border/60 p-4 sm:p-5",
			children
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 128,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
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
					fileName: _jsxFileName$7,
					lineNumber: 151,
					columnNumber: 11
				}, this), sousTitre && /* @__PURE__ */ (void 0)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: sousTitre
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 155,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 150,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "icon",
				variant: "ghost",
				className: "size-8 text-muted-foreground hover:text-destructive",
				onClick: onSupprimer,
				"aria-label": "Supprimer",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 167,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 160,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 149,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-3",
			children
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 170,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
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
					fileName: _jsxFileName$7,
					lineNumber: 189,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-7 px-2 text-xs",
					onClick: () => onChange([...valeurs, ""]),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 196,
						columnNumber: 11
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 190,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 188,
				columnNumber: 7
			}, this),
			valeurs.length === 0 && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-muted-foreground",
				children: "Aucune ligne pour l'instant."
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 200,
				columnNumber: 9
			}, this),
			valeurs.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: v,
					placeholder,
					onChange: (e) => {
						const next = [...valeurs];
						next[i] = e.target.value;
						onChange(next);
					}
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 206,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "icon",
					variant: "ghost",
					className: "size-8 shrink-0 text-muted-foreground hover:text-destructive",
					onClick: () => onChange(valeurs.filter((_, j) => j !== i)),
					"aria-label": "Retirer",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 222,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 215,
					columnNumber: 11
				}, this)]
			}, i, true, {
				fileName: _jsxFileName$7,
				lineNumber: 205,
				columnNumber: 9
			}, this))
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
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
				className: "rounded-2xl border border-border/60 bg-card/40 p-4 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 268,
								columnNumber: 13
							}, this), " Complétion de votre CV"]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 267,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm font-semibold text-primary",
							children: [completion, " %"]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 270,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 266,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
						value: completion,
						className: "mt-3 h-2"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 274,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Plus votre CV est détaillé, plus le Match IA et la préparation aux entretiens sont précis."
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 275,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 296,
								columnNumber: 15
							}, this),
							" ",
							o.label
						]
					}, o.id, true, {
						fileName: _jsxFileName$7,
						lineNumber: 285,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 280,
				columnNumber: 7
			}, this),
			onglet === "identite" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (void 0)("section", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-4 sm:p-5",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "grid size-9 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (void 0)(UserRound, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 308,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 307,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("h3", {
						className: "text-sm font-semibold",
						children: "En-tête du CV"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 310,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$7,
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
							fileName: _jsxFileName$7,
							lineNumber: 313,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Ville",
							value: value.ville,
							onChange: (v) => set({ ville: v }),
							placeholder: "Paris"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 319,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Email",
							value: value.email,
							onChange: (v) => set({ email: v }),
							placeholder: "prenom.nom@email.com"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 325,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Téléphone",
							value: value.telephone,
							onChange: (v) => set({ telephone: v })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 331,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "LinkedIn",
							value: value.linkedin,
							onChange: (v) => set({ linkedin: v }),
							placeholder: "linkedin.com/in/…"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 336,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Portfolio / site",
							value: value.portfolio,
							onChange: (v) => set({ portfolio: v })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 342,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Permis / mobilité",
							value: value.permis,
							onChange: (v) => set({ permis: v }),
							placeholder: "Permis B, véhiculé"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 347,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Accroche"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 354,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Textarea, {
								rows: 3,
								value: value.accroche,
								onChange: (e) => set({ accroche: e.target.value }),
								placeholder: "2 à 3 phrases sur votre projet et votre valeur ajoutée."
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 357,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 353,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$7,
					lineNumber: 312,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 305,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$7,
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
					fileName: _jsxFileName$7,
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
									fileName: _jsxFileName$7,
									lineNumber: 395,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Entreprise",
									value: e.entreprise,
									onChange: (v) => maj("experiences", i, { entreprise: v })
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 400,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Lieu",
									value: e.lieu,
									onChange: (v) => maj("experiences", i, { lieu: v })
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 405,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Type de contrat",
									value: e.contrat,
									onChange: (v) => maj("experiences", i, { contrat: v }),
									placeholder: "Stage, alternance, CDD…"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 410,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Début",
									value: e.debut,
									onChange: (v) => maj("experiences", i, { debut: v }),
									placeholder: "09/2024"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 416,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Champ, {
									label: "Fin",
									value: e.fin,
									onChange: (v) => maj("experiences", i, { fin: v }),
									placeholder: "02/2025"
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 422,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 394,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (void 0)(Switch, {
								checked: e.enCours,
								onCheckedChange: (v) => maj("experiences", i, { enCours: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 430,
								columnNumber: 19
							}, this), "Poste actuel"]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 429,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Contexte / missions"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 439,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Textarea, {
								rows: 3,
								value: e.description,
								onChange: (ev) => maj("experiences", i, { description: ev.target.value })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 442,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 438,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(ListePuces, {
							label: "Réalisations (une par ligne)",
							valeurs: e.realisations,
							placeholder: "Augmenté le taux d'ouverture de 18 %",
							onChange: (v) => maj("experiences", i, { realisations: v })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 450,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(ListePuces, {
							label: "Compétences mobilisées",
							valeurs: e.competences,
							placeholder: "Excel avancé",
							onChange: (v) => maj("experiences", i, { competences: v })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 456,
							columnNumber: 17
						}, this)
					]
				}, e.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 388,
					columnNumber: 15
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 373,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 489,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Établissement",
								value: f.etablissement,
								onChange: (v) => maj("formations", i, { etablissement: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 494,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lieu",
								value: f.lieu,
								onChange: (v) => maj("formations", i, { lieu: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 499,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Mention",
								value: f.mention,
								onChange: (v) => maj("formations", i, { mention: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 504,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Début",
								value: f.debut,
								onChange: (v) => maj("formations", i, { debut: v }),
								placeholder: "2023"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 509,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Fin",
								value: f.fin,
								onChange: (v) => maj("formations", i, { fin: v }),
								placeholder: "2026"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 515,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 488,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Spécialisations, cours clés, projets"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 523,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 2,
							value: f.details,
							onChange: (ev) => maj("formations", i, { details: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 526,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 522,
						columnNumber: 17
					}, this)]
				}, f.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 482,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 472,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$7,
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
							fileName: _jsxFileName$7,
							lineNumber: 558,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Catégorie",
							value: c.categorie,
							onChange: (v) => maj("competences", i, { categorie: v }),
							placeholder: "Technique, logiciel, soft skill…"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 563,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 570,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Select, {
								value: c.niveau,
								onValueChange: (v) => maj("competences", i, { niveau: v }),
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 580,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 579,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_COMPETENCE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
									value: n,
									children: n
								}, n, false, {
									fileName: _jsxFileName$7,
									lineNumber: 584,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 582,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 573,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 598,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 591,
							columnNumber: 17
						}, this)
					]
				}, c.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 554,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
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
							fileName: _jsxFileName$7,
							lineNumber: 619,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid min-w-0 gap-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								className: "text-xs text-muted-foreground",
								children: "Niveau"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 625,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Select, {
								value: l.niveau,
								onValueChange: (v) => maj("langues", i, { niveau: v }),
								children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
									className: "min-w-0",
									children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 635,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 634,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: NIVEAUX_LANGUE.map((n) => /* @__PURE__ */ (void 0)(SelectItem, {
									value: n,
									children: n
								}, n, false, {
									fileName: _jsxFileName$7,
									lineNumber: 639,
									columnNumber: 25
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$7,
									lineNumber: 637,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$7,
								lineNumber: 628,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 624,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Champ, {
							label: "Certification",
							value: l.certification || "",
							onChange: (v) => maj("langues", i, { certification: v }),
							placeholder: "TOEIC 900"
						}, void 0, false, {
							fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 659,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 652,
							columnNumber: 17
						}, this)
					]
				}, l.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 615,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 605,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 693,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Organisme",
								value: c.organisme,
								onChange: (v) => maj("certifications", i, { organisme: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 698,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Date d'obtention",
								value: c.date,
								onChange: (v) => maj("certifications", i, { date: v }),
								placeholder: "06/2025"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 703,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Identifiant / score",
								value: c.identifiant,
								onChange: (v) => maj("certifications", i, { identifiant: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 709,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lien",
								value: c.lien,
								onChange: (v) => maj("certifications", i, { lien: v }),
								className: "sm:col-span-2"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 716,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 692,
						columnNumber: 17
					}, this)
				}, c.id, false, {
					fileName: _jsxFileName$7,
					lineNumber: 686,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 745,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Votre rôle",
								value: p.role,
								onChange: (v) => maj("projets", i, { role: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 750,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Période",
								value: p.periode,
								onChange: (v) => maj("projets", i, { periode: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 755,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Lien",
								value: p.lien,
								onChange: (v) => maj("projets", i, { lien: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 760,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 744,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 767,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 3,
							value: p.description,
							onChange: (ev) => maj("projets", i, { description: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 770,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 766,
						columnNumber: 17
					}, this)]
				}, p.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 738,
					columnNumber: 15
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 728,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$7,
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
								fileName: _jsxFileName$7,
								lineNumber: 804,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Organisation",
								value: b.organisation,
								onChange: (v) => maj("benevolats", i, { organisation: v })
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 809,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)(Champ, {
								label: "Période",
								value: b.periode,
								onChange: (v) => maj("benevolats", i, { periode: v }),
								className: "sm:col-span-2"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 814,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 803,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-xs text-muted-foreground",
							children: "Description"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 822,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							rows: 2,
							value: b.description,
							onChange: (ev) => maj("benevolats", i, { description: ev.target.value })
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 825,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 821,
						columnNumber: 17
					}, this)]
				}, b.id, true, {
					fileName: _jsxFileName$7,
					lineNumber: 797,
					columnNumber: 15
				}, this)), /* @__PURE__ */ (void 0)(ListePuces, {
					label: "Centres d'intérêt",
					valeurs: value.interets,
					placeholder: "Course à pied, photographie…",
					onChange: (v) => set({ interets: v })
				}, void 0, false, {
					fileName: _jsxFileName$7,
					lineNumber: 835,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 787,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 785,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 264,
		columnNumber: 5
	}, this);
}
var _jsxFileName$6 = "/app/applet/src/components/cv-import/CvUpload.tsx";
var ACCEPTED_CV_EXTENSIONS = ".pdf,.docx,.txt,.md,.rtf";
function CvUpload({ onFileSelected, onTextSelected, disabled }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("file");
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const [pastedText, setPastedText] = (0, import_react.useState)("");
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const handleFile = (file) => {
		setError(null);
		const ext = file.name.split(".").pop()?.toLowerCase();
		if (![
			"pdf",
			"docx",
			"txt",
			"rtf",
			"md"
		].includes(ext || "")) {
			setError("Format non pris en charge. Veuillez sélectionner un fichier PDF, DOCX ou TXT.");
			return;
		}
		if (file.size > 20971520) {
			setError("Le fichier dépasse la taille maximale autorisée (20 Mo).");
			return;
		}
		setSelectedFile(file);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		if (disabled) return;
		const file = e.dataTransfer.files[0];
		if (file) handleFile(file);
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		if (!disabled) setIsDragging(true);
	};
	const handleDragLeave = () => {
		setIsDragging(false);
	};
	const handleStartFileAnalysis = () => {
		if (selectedFile) onFileSelected(selectedFile);
	};
	const handleStartTextAnalysis = () => {
		const trimmed = pastedText.trim();
		if (trimmed.length < 40) {
			setError("Le texte collé est trop court pour être analysé (minimum 40 caractères).");
			return;
		}
		setError(null);
		onTextSelected(trimmed);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold tracking-tight text-foreground",
					children: "Importer mon CV"
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 86,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground max-w-md mx-auto",
					children: "Déposez votre CV ou collez son texte pour en extraire fidèlement toutes les informations."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 89,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 85,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "inline-flex p-1 rounded-xl bg-card border border-border/60 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => {
							setActiveTab("file");
							setError(null);
						},
						className: `flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "file" ? "bg-purple-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudUpload, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 110,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Importer un fichier" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 111,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 98,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => {
							setActiveTab("text");
							setError(null);
						},
						className: `flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "text" ? "bg-purple-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardType, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 125,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Coller le texte" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 126,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 113,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 97,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 96,
				columnNumber: 7
			}, this),
			error && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400",
				children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0" }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 133,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 134,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 132,
				columnNumber: 9
			}, this),
			activeTab === "file" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					onDrop: handleDrop,
					onDragOver: handleDragOver,
					onDragLeave: handleDragLeave,
					onClick: () => inputRef.current?.click(),
					className: `relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${isDragging ? "border-purple-500 bg-purple-500/10 scale-[0.99]" : "border-border/80 bg-card/50 hover:bg-card hover:border-purple-500/50"} ${disabled ? "opacity-50 pointer-events-none" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							ref: inputRef,
							type: "file",
							accept: ACCEPTED_CV_EXTENSIONS,
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) handleFile(f);
							}
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 151,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "size-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudUpload, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 163,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 162,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm font-semibold text-foreground mb-1",
							children: [
								"Glissez-déposez votre CV ici, ou",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-purple-400 underline underline-offset-4",
									children: "parcourez vos fichiers"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 168,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 166,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Formats acceptés : PDF ou DOCX (Max 20 Mo)"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 172,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 140,
					columnNumber: 11
				}, this), selectedFile && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between p-4 rounded-xl bg-card border border-purple-500/30 shadow-sm animate-in fade-in slide-in-from-bottom-2",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "size-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0",
							children: /* @__PURE__ */ (void 0)(FileText, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 181,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 180,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-sm font-medium text-foreground truncate",
								children: selectedFile.name
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 184,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									(selectedFile.size / 1048576).toFixed(2),
									" Mo •",
									" ",
									selectedFile.name.split(".").pop()?.toUpperCase()
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 187,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 183,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 179,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)(Button, {
						onClick: (e) => {
							e.stopPropagation();
							handleStartFileAnalysis();
						},
						disabled,
						className: "bg-purple-600 hover:bg-purple-500 text-white gap-2 text-xs font-semibold px-4 shadow-lg shadow-purple-600/20",
						children: [/* @__PURE__ */ (void 0)("span", { children: "Analyser mon CV" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 202,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 203,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 194,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 178,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 139,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						rows: 10,
						value: pastedText,
						onChange: (e) => setPastedText(e.target.value),
						placeholder: "Collez ici l'intégralité du texte de votre CV (coordonnées, expériences professionnelles, formations, compétences, langues, certifications, etc.)...",
						className: "resize-none font-mono text-xs bg-card/60 border-border/80 p-4 focus-visible:ring-purple-500",
						disabled
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 211,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-between items-center mt-2 px-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [pastedText.length, " caractères"] }, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 220,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Minimum 40 caractères requis" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 221,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 219,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 210,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: handleStartTextAnalysis,
						disabled: disabled || pastedText.trim().length < 40,
						className: "bg-purple-600 hover:bg-purple-500 text-white gap-2 text-xs font-semibold px-5 shadow-lg shadow-purple-600/20",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Analyser ce texte" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 231,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 232,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 226,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 225,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 209,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 84,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/cv-import/CvAnalysisProgress.tsx";
function CvAnalysisProgress({ status }) {
	const steps = [
		{
			id: "reading",
			label: "Lecture de votre CV...",
			icon: FileText,
			activeStatus: ["reading"],
			completedStatus: [
				"identifying",
				"structuring",
				"verifying",
				"preview"
			]
		},
		{
			id: "identifying",
			label: "Identification des informations...",
			icon: Search,
			activeStatus: ["identifying"],
			completedStatus: [
				"structuring",
				"verifying",
				"preview"
			]
		},
		{
			id: "structuring",
			label: "Structuration de votre profil...",
			icon: Layers,
			activeStatus: ["structuring"],
			completedStatus: ["verifying", "preview"]
		},
		{
			id: "verifying",
			label: "Vérification des données...",
			icon: CircleCheck,
			activeStatus: ["verifying"],
			completedStatus: ["preview"]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-xl font-bold tracking-tight text-foreground",
				children: "Analyse en cours..."
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 43,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground",
				children: "Le moteur NACORA extrait fidèlement les informations de votre CV."
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 46,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 42,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-xs mx-auto space-y-6",
			children: steps.map((step, idx) => {
				const isActive = step.activeStatus.includes(status);
				const isCompleted = step.completedStatus.includes(status);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `flex items-center gap-4 transition-opacity duration-500 ${!isActive && !isCompleted ? "opacity-40" : "opacity-100"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `relative flex size-10 items-center justify-center rounded-full border-2 shrink-0 transition-colors duration-500 ${isActive ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-sm shadow-purple-500/20" : isCompleted ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" : "border-border/50 bg-card text-muted-foreground"}`,
						children: [isActive ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 74,
							columnNumber: 19
						}, this) : isCompleted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 76,
							columnNumber: 19
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(step.icon, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 78,
							columnNumber: 19
						}, this), idx !== steps.length - 1 && /* @__PURE__ */ (void 0)("div", { className: `absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 transition-colors duration-500 ${isCompleted ? "bg-emerald-500/40" : "bg-border/40"}` }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 81,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 64,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: `text-sm font-medium ${isActive ? "text-purple-400 font-semibold" : isCompleted ? "text-foreground" : "text-muted-foreground"}`,
						children: step.label
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 90,
						columnNumber: 17
					}, this) }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 89,
						columnNumber: 15
					}, this)]
				}, step.id, true, {
					fileName: _jsxFileName$5,
					lineNumber: 58,
					columnNumber: 13
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 51,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 41,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/ui/scroll-area.tsx";
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 15,
			columnNumber: 5
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollBar, {}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 18,
			columnNumber: 5
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Corner, {}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 19,
			columnNumber: 5
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$4,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 41,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 28,
	columnNumber: 3
}, void 0));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var _jsxFileName$3 = "/app/applet/src/components/cv-import/CvImportPreview.tsx";
function CvImportPreview({ result: initialResult, onConfirm, onCancel, isSubmitting = false }) {
	const [data, setData] = (0, import_react.useState)(initialResult);
	const handleDeleteExperience = (id) => {
		setData((prev) => ({
			...prev,
			experiences: prev.experiences.filter((e) => e.id !== id)
		}));
	};
	const handleDeleteEducation = (id) => {
		setData((prev) => ({
			...prev,
			education: prev.education.filter((e) => e.id !== id)
		}));
	};
	const handleDeleteSkill = (id) => {
		setData((prev) => ({
			...prev,
			skills: prev.skills.filter((s) => s.id !== id)
		}));
	};
	const handleDeleteTool = (id) => {
		setData((prev) => ({
			...prev,
			tools: prev.tools.filter((t) => t.id !== id)
		}));
	};
	const handleDeleteLanguage = (id) => {
		setData((prev) => ({
			...prev,
			languages: prev.languages.filter((l) => l.id !== id)
		}));
	};
	const handleDeleteCertification = (id) => {
		setData((prev) => ({
			...prev,
			certifications: prev.certifications.filter((c) => c.id !== id)
		}));
	};
	const handleDeleteProject = (id) => {
		setData((prev) => ({
			...prev,
			projects: prev.projects.filter((p) => p.id !== id)
		}));
	};
	const handleDeleteAssociation = (id) => {
		setData((prev) => ({
			...prev,
			associations: prev.associations.filter((a) => a.id !== id)
		}));
	};
	const handleDeleteInterest = (id) => {
		setData((prev) => ({
			...prev,
			interests: prev.interests.filter((i) => i.id !== id)
		}));
	};
	const detectedCorrelations = data.correlations?.languagesAndCertifications || [];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6 animate-in fade-in zoom-in-95 duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border/80 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-lg font-bold tracking-tight text-foreground",
						children: "Aperçu de l'extraction de votre CV"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 116,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "bg-primary/10 text-primary border-primary/20 text-xs",
						children: "Extraction Complète"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 119,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 115,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Toutes les missions, chiffres, formations, corrélations et objets riches sont préservés sans troncature ni résumé."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 126,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 114,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 self-end sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: onCancel,
						className: "text-xs h-8",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 133,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						disabled: isSubmitting,
						onClick: () => onConfirm(data),
						className: "bg-purple-600 hover:bg-purple-500 text-white text-xs h-8 gap-2 shadow-sm shadow-purple-600/30",
						children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 149,
							columnNumber: 17
						}, this), "Enregistrement persistant..."] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 148,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 154,
							columnNumber: 17
						}, this), "Importer dans mon profil"] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 153,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 141,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 132,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 113,
				columnNumber: 7
			}, this),
			detectedCorrelations.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2 font-semibold text-emerald-400",
					children: [/* @__PURE__ */ (void 0)(Link2, { className: "size-4 shrink-0" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 166,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: [
						"Corrélations certifiées et scores rattachés (",
						detectedCorrelations.length,
						")"
					] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 167,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 165,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1",
					children: detectedCorrelations.map((corr, idx) => /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between p-2 rounded-lg bg-card/60 border border-emerald-500/20",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-foreground",
									children: corr.language
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 179,
									columnNumber: 19
								}, this),
								corr.level && /* @__PURE__ */ (void 0)(Badge, {
									variant: "outline",
									className: "text-[10px] py-0",
									children: corr.level
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 183,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 187,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("span", {
									className: "text-muted-foreground font-medium",
									children: corr.certificationName
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 188,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 178,
							columnNumber: 17
						}, this), corr.score && /* @__PURE__ */ (void 0)(Badge, {
							className: "bg-emerald-500/20 text-emerald-300 font-mono text-[10px]",
							children: corr.score
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 193,
							columnNumber: 19
						}, this)]
					}, idx, true, {
						fileName: _jsxFileName$3,
						lineNumber: 174,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 172,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 164,
				columnNumber: 9
			}, this),
			data.audit.warnings && data.audit.warnings.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400 space-y-1.5",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2 font-semibold",
					children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 shrink-0" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 207,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Remarques sur le document" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 208,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 206,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("ul", {
					className: "list-disc pl-5 space-y-0.5",
					children: data.audit.warnings.map((w, idx) => /* @__PURE__ */ (void 0)("li", { children: w.message }, idx, false, {
						fileName: _jsxFileName$3,
						lineNumber: 212,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 210,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 205,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollArea, {
				className: "h-[600px] rounded-xl border border-border/70 p-4 bg-background/50",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6 pr-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "p-4 rounded-xl bg-card border border-border/70 space-y-3 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Identité & Coordonnées"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 223,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: "Nom complet"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 228,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-foreground",
											children: [
												data.identity.firstName,
												" ",
												data.identity.lastName
											]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 231,
											columnNumber: 17
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 227,
											columnNumber: 15
										}, this),
										data.identity.professionalTitle && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: "Titre professionnel"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 238,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-foreground",
											children: data.identity.professionalTitle
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 241,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 237,
											columnNumber: 17
										}, this),
										data.identity.email && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: "Email"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 249,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-foreground",
											children: data.identity.email
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 252,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 248,
											columnNumber: 17
										}, this),
										data.identity.phone && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: "Téléphone"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 260,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-foreground",
											children: data.identity.phone
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 263,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 259,
											columnNumber: 17
										}, this),
										data.identity.city && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: "Localisation"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 271,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-foreground",
											children: [data.identity.city, data.identity.postalCode ? ` (${data.identity.postalCode})` : ""]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 274,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 270,
											columnNumber: 17
										}, this),
										data.identity.drivingLicense && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: "Permis & Mobilité"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 285,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-medium text-foreground",
											children: [data.identity.drivingLicense, data.identity.mobility ? ` • ${data.identity.mobility}` : ""]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 288,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 284,
											columnNumber: 17
										}, this),
										data.identity.linkedin && /* @__PURE__ */ (void 0)("div", {
											className: "truncate",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground block text-[11px]",
												children: "LinkedIn"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 299,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-mono text-purple-400 truncate block",
												children: data.identity.linkedin
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 302,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 298,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 226,
									columnNumber: 13
								}, this),
								data.summary.shortBio && /* @__PURE__ */ (void 0)("div", {
									className: "mt-2 pt-2 border-t border-border/30 text-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[11px] mb-1",
										children: "Accroche / Résumé"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 311,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground/90 italic bg-background/50 p-2 rounded-lg border border-border/30",
										children: [
											"\"",
											data.summary.shortBio,
											"\""
										]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 314,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 310,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 222,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-4 text-blue-400" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 325,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"Expériences professionnelles (",
										data.experiences.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 326,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 324,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 323,
								columnNumber: 13
							}, this), data.experiences.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground italic",
								children: "Aucune expérience professionnelle détectée."
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 333,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: data.experiences.map((exp) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "group relative p-3.5 rounded-xl bg-card border border-border/70 hover:border-border transition-all space-y-2.5 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
													className: "font-bold text-sm text-foreground",
													children: exp.title
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 346,
													columnNumber: 27
												}, this), exp.contractType && /* @__PURE__ */ (void 0)(Badge, {
													variant: "secondary",
													className: "text-[10px] py-0 px-1.5 font-normal",
													children: exp.contractType
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 350,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 345,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2 text-xs text-muted-foreground mt-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "flex items-center gap-1 font-medium text-foreground/90",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building, { className: "size-3 text-muted-foreground" }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 360,
														columnNumber: 29
													}, this), exp.company]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 359,
													columnNumber: 27
												}, this), exp.location && /* @__PURE__ */ (void 0)("span", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (void 0)(MapPin, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 365,
														columnNumber: 31
													}, this), exp.location]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 364,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 358,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 344,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1.5 font-mono",
													children: [
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 374,
															columnNumber: 27
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: exp.startDate || "Date non précisée" }, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 375,
															columnNumber: 27
														}, this),
														(exp.endDate || exp.isCurrent) && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 378,
															columnNumber: 31
														}, this), /* @__PURE__ */ (void 0)("span", { children: exp.endDate || (exp.isCurrent ? "Aujourd'hui" : "") }, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 379,
															columnNumber: 31
														}, this)] }, void 0, true, {
															fileName: _jsxFileName$3,
															lineNumber: 377,
															columnNumber: 29
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 373,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => handleDeleteExperience(exp.id),
													className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity p-1",
													title: "Supprimer cette expérience",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 393,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 387,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 372,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 343,
											columnNumber: 21
										}, this),
										exp.description && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-foreground/80 italic",
											children: exp.description
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 399,
											columnNumber: 23
										}, this),
										exp.missions && exp.missions.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block",
												children: [
													"Missions & Responsabilités (",
													exp.missions.length,
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 407,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("ul", {
												className: "list-disc pl-4 space-y-1 text-xs text-muted-foreground",
												children: exp.missions.map((m, i) => /* @__PURE__ */ (void 0)("li", { children: m }, i, false, {
													fileName: _jsxFileName$3,
													lineNumber: 412,
													columnNumber: 29
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 410,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 406,
											columnNumber: 23
										}, this),
										(exp.results && exp.results.length > 0 || exp.achievements && exp.achievements.length > 0) && /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1 pt-1",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block",
												children: "Résultats & Réalisations chiffrées"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 422,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex flex-wrap gap-1.5",
												children: (exp.results?.length ? exp.results : exp.achievements).map((res, i) => /* @__PURE__ */ (void 0)(Badge, {
													variant: "outline",
													className: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-xs py-0.5",
													children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3 mr-1" }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 435,
														columnNumber: 31
													}, this), res]
												}, i, true, {
													fileName: _jsxFileName$3,
													lineNumber: 430,
													columnNumber: 29
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 425,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 421,
											columnNumber: 23
										}, this),
										exp.tools && exp.tools.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-wrap gap-1 pt-1",
											children: exp.tools.map((tool, i) => /* @__PURE__ */ (void 0)(Badge, {
												variant: "outline",
												className: "text-[10px] py-0 bg-background/50 text-muted-foreground",
												children: tool
											}, i, false, {
												fileName: _jsxFileName$3,
												lineNumber: 447,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 445,
											columnNumber: 23
										}, this)
									]
								}, exp.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 339,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 337,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 322,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "size-4 text-purple-400" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 467,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"Formations & Diplômes (",
										data.education.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 468,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 466,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 465,
								columnNumber: 13
							}, this), data.education.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground italic",
								children: "Aucune formation détectée."
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 473,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: data.education.map((edu) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "group relative p-3.5 rounded-xl bg-card border border-border/70 hover:border-border transition-all space-y-1.5 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
													className: "font-bold text-sm text-foreground",
													children: edu.degree
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 486,
													columnNumber: 27
												}, this), edu.grade && /* @__PURE__ */ (void 0)(Badge, {
													variant: "outline",
													className: "text-[10px] text-purple-400 border-purple-500/20 py-0",
													children: edu.grade
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 490,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 485,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-xs text-muted-foreground mt-0.5 font-medium",
												children: [edu.school, edu.location ? ` • ${edu.location}` : ""]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 498,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 484,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "text-xs text-muted-foreground whitespace-nowrap font-mono",
													children: [
														edu.startDate || "",
														edu.startDate && edu.endDate ? " → " : "",
														edu.endDate || (edu.isCurrent ? "En cours" : "")
													]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 505,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => handleDeleteEducation(edu.id),
													className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity p-1",
													title: "Supprimer cette formation",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 517,
														columnNumber: 27
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 511,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 504,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 483,
											columnNumber: 21
										}, this),
										edu.track && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs font-medium text-purple-400/90",
											children: ["Parcours : ", edu.track]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 523,
											columnNumber: 23
										}, this),
										edu.specialization && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground",
											children: ["Spécialisation : ", edu.specialization]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 529,
											columnNumber: 23
										}, this),
										edu.keyCourses && edu.keyCourses.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-wrap gap-1 pt-1",
											children: edu.keyCourses.map((c, i) => /* @__PURE__ */ (void 0)(Badge, {
												variant: "secondary",
												className: "text-[10px] py-0",
												children: c
											}, i, false, {
												fileName: _jsxFileName$3,
												lineNumber: 537,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 535,
											columnNumber: 23
										}, this)
									]
								}, edu.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 479,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 477,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 464,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-b border-border/50 pb-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-4 text-emerald-400" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 559,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"Certifications & Tests (",
											data.certifications.length,
											")"
										] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 560,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 558,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 557,
									columnNumber: 15
								}, this), data.certifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "Aucune certification détectée."
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 567,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: data.certifications.map((cert) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "group flex justify-between items-center p-2.5 rounded-lg bg-card border border-border/60 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-foreground",
												children: cert.name
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 579,
												columnNumber: 27
											}, this), cert.language && /* @__PURE__ */ (void 0)(Badge, {
												variant: "outline",
												className: "text-[9px] py-0 text-muted-foreground",
												children: cert.language
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 583,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 578,
											columnNumber: 25
										}, this), cert.organization && /* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block text-[11px]",
											children: cert.organization
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 592,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 577,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [cert.score && /* @__PURE__ */ (void 0)(Badge, {
												variant: "secondary",
												className: "font-mono text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
												children: cert.score
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 600,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => handleDeleteCertification(cert.id),
												className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity",
												title: "Supprimer",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 613,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 607,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 598,
											columnNumber: 23
										}, this)]
									}, cert.id, true, {
										fileName: _jsxFileName$3,
										lineNumber: 573,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 571,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 556,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-b border-border/50 pb-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4 text-teal-400" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 626,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"Langues parlées (",
											data.languages.length,
											")"
										] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 627,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 625,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 624,
									columnNumber: 15
								}, this), data.languages.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground italic",
									children: "Aucune langue détectée."
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 632,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: data.languages.map((lang) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "group flex justify-between items-center p-2.5 rounded-lg bg-card border border-border/60 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-foreground",
												children: lang.name
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 643,
												columnNumber: 25
											}, this),
											lang.associatedCertification && /* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground block text-[11px]",
												children: [
													"Test : ",
													lang.associatedCertification,
													lang.score ? ` (${lang.score})` : ""
												]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 647,
												columnNumber: 27
											}, this),
											lang.attestation && /* @__PURE__ */ (void 0)("span", {
												className: "text-teal-400/80 block text-[10px]",
												children: ["✓ ", lang.attestation]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 653,
												columnNumber: 27
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 642,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [lang.level && /* @__PURE__ */ (void 0)(Badge, {
												variant: "outline",
												className: "bg-teal-500/10 text-teal-300 border-teal-500/20 font-medium",
												children: lang.level
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 660,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => handleDeleteLanguage(lang.id),
												className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 transition-opacity",
												title: "Supprimer",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 673,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 667,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 658,
											columnNumber: 23
										}, this)]
									}, lang.id, true, {
										fileName: _jsxFileName$3,
										lineNumber: 638,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 636,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 623,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 554,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-b border-border/50 pb-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cpu, { className: "size-4 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 689,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"Outils & Logiciels (",
											data.tools.length,
											")"
										] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 690,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 688,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 687,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5",
									children: data.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "secondary",
										className: "group bg-card hover:border-cyan-500/30 text-foreground text-xs py-1 px-2.5 font-normal flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: tool.name }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 701,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => handleDeleteTool(tool.id),
											className: "opacity-40 group-hover:opacity-100 hover:text-red-400",
											children: "×"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 702,
											columnNumber: 21
										}, this)]
									}, tool.id, true, {
										fileName: _jsxFileName$3,
										lineNumber: 696,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 694,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 686,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-b border-border/50 pb-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wrench, { className: "size-4 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 718,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"Compétences métier (",
											data.skills.length,
											")"
										] }, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 719,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 717,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 716,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap gap-1.5",
									children: data.skills.map((skill) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "secondary",
										className: "group bg-card hover:border-amber-500/30 text-foreground text-xs py-1 px-2.5 font-normal flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: skill.name }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 730,
												columnNumber: 21
											}, this),
											skill.level && /* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] text-muted-foreground",
												children: [
													"(",
													skill.level,
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 732,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => handleDeleteSkill(skill.id),
												className: "opacity-40 group-hover:opacity-100 hover:text-red-400",
												children: "×"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 736,
												columnNumber: 21
											}, this)
										]
									}, skill.id, true, {
										fileName: _jsxFileName$3,
										lineNumber: 725,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 723,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 715,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 684,
							columnNumber: 11
						}, this),
						data.projects.length > 0 && /* @__PURE__ */ (void 0)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-2",
								children: /* @__PURE__ */ (void 0)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(FolderDot, { className: "size-4 text-pink-400" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 754,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										"Projets & Réalisations (",
										data.projects.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 755,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 753,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 752,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: data.projects.map((proj) => /* @__PURE__ */ (void 0)("div", {
									className: "group p-3.5 rounded-xl bg-card border border-border/60 text-xs space-y-1.5",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-start gap-2",
											children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [/* @__PURE__ */ (void 0)("h4", {
													className: "font-semibold text-sm text-foreground",
													children: proj.name
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 768,
													columnNumber: 27
												}, this), proj.type && /* @__PURE__ */ (void 0)(Badge, {
													variant: "outline",
													className: "text-[10px] py-0",
													children: proj.type
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 772,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 767,
												columnNumber: 25
											}, this), proj.context && /* @__PURE__ */ (void 0)("p", {
												className: "text-[11px] text-pink-400 font-medium mt-0.5",
												children: ["Cadre : ", proj.context]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 781,
												columnNumber: 27
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 766,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => handleDeleteProject(proj.id),
												className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 p-1",
												children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 792,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 787,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 765,
											columnNumber: 21
										}, this),
										proj.description && /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground",
											children: proj.description
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 797,
											columnNumber: 23
										}, this),
										proj.tools && proj.tools.length > 0 && /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-wrap gap-1 pt-1",
											children: proj.tools.map((t, i) => /* @__PURE__ */ (void 0)(Badge, {
												variant: "secondary",
												className: "text-[10px] py-0",
												children: t
											}, i, false, {
												fileName: _jsxFileName$3,
												lineNumber: 805,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 803,
											columnNumber: 23
										}, this)
									]
								}, proj.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 761,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 759,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 751,
							columnNumber: 13
						}, this),
						data.associations.length > 0 && /* @__PURE__ */ (void 0)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-2",
								children: /* @__PURE__ */ (void 0)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Users, { className: "size-4 text-violet-400" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 826,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										"Engagements associatifs (",
										data.associations.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 827,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 825,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 824,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: data.associations.map((asso) => /* @__PURE__ */ (void 0)("div", {
									className: "group p-3.5 rounded-xl bg-card border border-border/60 text-xs space-y-1.5",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-start gap-2",
											children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2 flex-wrap",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold text-sm text-foreground",
													children: asso.organization
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 842,
													columnNumber: 27
												}, this), asso.teamSize && /* @__PURE__ */ (void 0)(Badge, {
													className: "bg-violet-500/20 text-violet-300 text-[10px] py-0",
													children: asso.teamSize
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 846,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 841,
												columnNumber: 25
											}, this), asso.role && /* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground block text-[11px] font-medium mt-0.5",
												children: ["Rôle : ", asso.role]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 852,
												columnNumber: 27
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 840,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => handleDeleteAssociation(asso.id),
												className: "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 p-1",
												children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 862,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 857,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 839,
											columnNumber: 21
										}, this),
										asso.description && /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground",
											children: asso.description
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 867,
											columnNumber: 23
										}, this),
										asso.missions && asso.missions.length > 0 && /* @__PURE__ */ (void 0)("ul", {
											className: "list-disc pl-4 space-y-0.5 text-muted-foreground text-[11px]",
											children: asso.missions.map((m, i) => /* @__PURE__ */ (void 0)("li", { children: m }, i, false, {
												fileName: _jsxFileName$3,
												lineNumber: 875,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 873,
											columnNumber: 23
										}, this)
									]
								}, asso.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 835,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 833,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 823,
							columnNumber: 13
						}, this),
						data.interests.length > 0 && /* @__PURE__ */ (void 0)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-2",
								children: /* @__PURE__ */ (void 0)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Heart, { className: "size-4 text-rose-400" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 890,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: [
										"Centres d'intérêt (",
										data.interests.length,
										")"
									] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 891,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 889,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 888,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2",
								children: data.interests.map((int) => /* @__PURE__ */ (void 0)("div", {
									className: "group p-2.5 rounded-lg bg-card border border-border/60 text-xs flex justify-between items-start gap-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "font-semibold text-foreground",
										children: int.name
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 902,
										columnNumber: 23
									}, this), int.subtopics && int.subtopics.length > 0 ? /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap gap-1 mt-1",
										children: int.subtopics.map((st, i) => /* @__PURE__ */ (void 0)(Badge, {
											variant: "outline",
											className: "text-[10px] py-0 text-muted-foreground",
											children: st
										}, i, false, {
											fileName: _jsxFileName$3,
											lineNumber: 908,
											columnNumber: 29
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 906,
										columnNumber: 25
									}, this) : int.details ? /* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground block text-[11px] mt-0.5",
										children: int.details
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 918,
										columnNumber: 25
									}, this) : null] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 901,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => handleDeleteInterest(int.id),
										className: "opacity-0 group-hover:opacity-100 hover:text-red-400 text-muted-foreground",
										children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 928,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 923,
										columnNumber: 21
									}, this)]
								}, int.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 897,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 895,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 887,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 220,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 219,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 111,
		columnNumber: 5
	}, this);
}
var ImportCVInput = object({
	doc: object({
		fileName: string().optional(),
		fileSize: number().optional(),
		fileType: string().optional(),
		plainText: string().min(20)
	}).optional(),
	text: string().min(20).optional()
});
var extraireCvServeur = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => ImportCVInput.parse(data)).handler(createSsrRpc("47e694db27267631b2b10d89ba6fbeadb11f0a43861158b1191494d12c917b28"));
/**
* Normalise une chaîne pour comparaison sans casse ni accents.
*/
function normalizeStr(val) {
	if (!val) return "";
	return val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
}
/**
* Fusionne fidèlement le résultat de l'extraction CV V4 avec le profil utilisateur existant.
* - Conservation exhaustive de toutes les entités et de leurs détails riches.
* - Respect des fonctions/périodes distinctes au sein d'une même organisation (aucun écrasement).
* - Maintien des corrélations (langues, certifications, scores, attestations).
* - Ne supprime jamais les informations existantes du profil.
*/
function mergeCvImportWithProfil(result, currentProfil) {
	const existingCv = currentProfil?.cvStructure || {
		titre: "",
		accroche: "",
		email: "",
		telephone: "",
		linkedin: "",
		portfolio: "",
		github: "",
		permis: "",
		photoUrl: "",
		ville: "",
		pays: "France",
		experiences: [],
		formations: [],
		competences: [],
		langues: [],
		certifications: [],
		projets: [],
		interets: [],
		benevolats: []
	};
	const prenom = currentProfil?.prenom || result.identity.firstName || "";
	const nom = currentProfil?.nom || result.identity.lastName || "";
	const emailContact = currentProfil?.emailContact || result.identity.email || "";
	const telephone = currentProfil?.telephone || result.identity.phone || "";
	const localisation = currentProfil?.localisation || (result.identity.city ? `${result.identity.city}${result.identity.postalCode ? ` (${result.identity.postalCode})` : ""}` : "");
	const titre = currentProfil?.titre || result.identity.professionalTitle || result.summary.headline || "";
	const mobilite = currentProfil?.mobilite || result.identity.mobility || "";
	const permis = existingCv.permis || result.identity.drivingLicense || "";
	const existingExpKeys = new Set((existingCv.experiences || []).map((e) => `${normalizeStr(e.poste)}_${normalizeStr(e.entreprise)}_${normalizeStr(e.debut || e.periode || "")}`));
	const newExperiences = [];
	for (const exp of result.experiences) {
		const key = `${normalizeStr(exp.title)}_${normalizeStr(exp.company)}_${normalizeStr(exp.startDate || "")}`;
		if (!existingExpKeys.has(key)) {
			const allMissions = [...exp.missions || [], ...exp.responsibilities || []];
			const uniqueMissions = Array.from(new Set(allMissions.filter(Boolean)));
			const allResults = [
				...exp.achievements || [],
				...exp.results || [],
				...exp.quantifiedResults || []
			];
			const uniqueResults = Array.from(new Set(allResults.filter(Boolean)));
			const isCurrent = Boolean(exp.isCurrent || exp.endDate && (exp.endDate.toLowerCase().includes("aujourd") || exp.endDate.toLowerCase().includes("cours") || exp.endDate.toLowerCase().includes("actuel")));
			const cleanFin = exp.endDate && /actuel|cours|aujourd/i.test(exp.endDate) ? "" : exp.endDate || "";
			const missionsDescription = uniqueMissions.length > 0 ? uniqueMissions.map((m) => m.startsWith("•") ? m : `• ${m}`).join("\n") : "";
			const finalDescription = exp.description ? missionsDescription && !exp.description.includes("•") ? `${exp.description}\n\n${missionsDescription}` : exp.description : missionsDescription;
			const kpiStr = uniqueResults.join(" • ");
			newExperiences.push({
				id: exp.id || Math.random().toString(36).slice(2, 10),
				poste: exp.title,
				entreprise: exp.company,
				lieu: exp.location || "",
				ville: exp.location || "",
				contrat: exp.contractType || "",
				typeContrat: exp.contractType || "",
				debut: exp.startDate || "",
				fin: cleanFin,
				periode: exp.startDate ? `${exp.startDate}${cleanFin ? ` - ${cleanFin}` : isCurrent ? " - Aujourd'hui" : ""}` : "",
				enCours: isCurrent,
				description: finalDescription,
				missions: uniqueMissions,
				responsabilites: uniqueMissions,
				realisations: uniqueResults,
				resultats: uniqueResults,
				quantifiedResults: exp.quantifiedResults || [],
				kpi: kpiStr || void 0,
				realisationsCles: kpiStr || void 0,
				competences: exp.skills || [],
				outils: exp.tools || [],
				sourceText: exp.sourceText || void 0
			});
			existingExpKeys.add(key);
		}
	}
	const mergedExperiences = [...existingCv.experiences || [], ...newExperiences];
	const existingEduKeys = new Set((existingCv.formations || []).map((f) => `${normalizeStr(f.diplome)}_${normalizeStr(f.etablissement)}_${normalizeStr(f.debut || "")}`));
	const newFormations = [];
	for (const edu of result.education) {
		const key = `${normalizeStr(edu.degree)}_${normalizeStr(edu.school)}_${normalizeStr(edu.startDate || "")}`;
		if (!existingEduKeys.has(key)) {
			newFormations.push({
				id: edu.id || Math.random().toString(36).slice(2, 10),
				diplome: edu.degree,
				etablissement: edu.school,
				lieu: edu.location || "",
				specialisation: edu.specialization || void 0,
				parcours: edu.track || void 0,
				track: edu.track || void 0,
				mention: edu.grade || edu.honors || "",
				debut: edu.startDate || "",
				fin: edu.endDate || "",
				enCours: edu.isCurrent,
				coursImportants: edu.keyCourses || [],
				options: edu.options || [],
				details: edu.description || "",
				sourceText: edu.sourceText || void 0
			});
			existingEduKeys.add(key);
		}
	}
	const mergedFormations = [...existingCv.formations || [], ...newFormations];
	const existingSkillNames = new Set((existingCv.competences || []).map((c) => normalizeStr(c.nom)));
	const newCompetences = [];
	for (const s of result.skills) {
		const norm = normalizeStr(s.name);
		if (norm && !existingSkillNames.has(norm)) {
			newCompetences.push({
				id: s.id || Math.random().toString(36).slice(2, 10),
				nom: s.name,
				categorie: s.category || "Métier",
				typeCategorie: "hard",
				niveau: mapNiveau(s.level)
			});
			existingSkillNames.add(norm);
		}
	}
	for (const t of result.tools) {
		const norm = normalizeStr(t.name);
		if (norm && !existingSkillNames.has(norm)) {
			newCompetences.push({
				id: t.id || Math.random().toString(36).slice(2, 10),
				nom: t.name,
				categorie: t.category || "Outil",
				typeCategorie: "outil",
				niveau: mapNiveau(t.level)
			});
			existingSkillNames.add(norm);
		}
	}
	for (const ss of result.softSkills) {
		const norm = normalizeStr(ss.name);
		if (norm && !existingSkillNames.has(norm)) {
			newCompetences.push({
				id: ss.id || Math.random().toString(36).slice(2, 10),
				nom: ss.name,
				categorie: "Comportemental",
				typeCategorie: "soft",
				niveau: "Avancé"
			});
			existingSkillNames.add(norm);
		}
	}
	const mergedCompetences = [...existingCv.competences || [], ...newCompetences];
	const existingLangNames = new Set((existingCv.langues || []).map((l) => normalizeStr(l.nom)));
	const newLangues = [];
	for (const l of result.languages) {
		const norm = normalizeStr(l.name);
		if (norm && !existingLangNames.has(norm)) {
			newLangues.push({
				id: l.id || Math.random().toString(36).slice(2, 10),
				nom: l.name,
				niveau: mapNiveauLangue(l.level),
				certification: l.associatedCertification || "",
				score: l.score || void 0,
				attestation: l.attestation || void 0,
				certificationsAssociees: (l.certifications || []).map((c) => ({
					nom: c.name,
					score: c.score || void 0,
					niveau: c.level || void 0
				}))
			});
			existingLangNames.add(norm);
		}
	}
	const mergedLangues = [...existingCv.langues || [], ...newLangues];
	const existingCertNames = new Set((existingCv.certifications || []).map((c) => normalizeStr(c.nom)));
	const newCertifications = [];
	for (const c of result.certifications) {
		const norm = normalizeStr(c.name);
		if (norm && !existingCertNames.has(norm)) {
			newCertifications.push({
				id: c.id || Math.random().toString(36).slice(2, 10),
				nom: c.name,
				organisme: c.organization || c.issuer || "",
				date: c.date || "",
				score: c.score || void 0,
				niveau: c.level || void 0,
				langue: c.language || void 0,
				description: c.description || void 0,
				identifiant: c.credentialId || "",
				lien: "",
				sourceText: c.sourceText || void 0
			});
			existingCertNames.add(norm);
		}
	}
	const mergedCertifications = [...existingCv.certifications || [], ...newCertifications];
	const existingProjNames = new Set((existingCv.projets || []).map((p) => normalizeStr(p.nom)));
	const newProjets = [];
	for (const p of result.projects) {
		const norm = normalizeStr(p.name);
		if (norm && !existingProjNames.has(norm)) {
			newProjets.push({
				id: p.id || Math.random().toString(36).slice(2, 10),
				nom: p.name,
				description: p.description,
				role: p.role || p.type || "Projet",
				type: p.type || "autre",
				contexte: p.context || void 0,
				periode: p.date || (p.startDate ? `${p.startDate}${p.endDate ? ` - ${p.endDate}` : ""}` : ""),
				debut: p.startDate || "",
				fin: p.endDate || "",
				objectif: p.objective || void 0,
				missions: p.missions || p.responsibilities || [],
				responsabilites: p.responsibilities || p.missions || [],
				realisations: p.achievements || p.results || [],
				resultats: p.results || p.achievements || [],
				technologies: p.tools || [],
				outils: p.tools || [],
				competences: p.skills || [],
				collaborateurs: p.collaborators || [],
				lien: p.url || "",
				sourceText: p.sourceText || void 0
			});
			existingProjNames.add(norm);
		}
	}
	const mergedProjets = [...existingCv.projets || [], ...newProjets];
	const existingAssoKeys = new Set((existingCv.benevolats || []).map((b) => `${normalizeStr(b.organisation)}_${normalizeStr(b.role)}_${normalizeStr(b.debut || b.periode || "")}`));
	const newBenevolats = [];
	for (const a of result.associations) {
		const key = `${normalizeStr(a.organization)}_${normalizeStr(a.role)}_${normalizeStr(a.startDate || a.date || "")}`;
		if (!existingAssoKeys.has(key)) {
			newBenevolats.push({
				id: a.id || Math.random().toString(36).slice(2, 10),
				organisation: a.organization,
				role: a.role || "Bénévole",
				periode: a.date || (a.startDate ? `${a.startDate}${a.endDate ? ` - ${a.endDate}` : a.isCurrent ? " - Aujourd'hui" : ""}` : ""),
				debut: a.startDate || a.date || "",
				fin: a.endDate || "",
				enCours: a.isCurrent,
				description: a.description || "",
				missions: a.missions || a.responsibilities || [],
				responsabilites: a.responsibilities || a.missions || [],
				realisations: a.achievements || a.results || [],
				resultats: a.results || a.achievements || [],
				equipe: a.teamSize || void 0,
				budget: a.budget || void 0,
				outils: a.tools || [],
				competences: a.skills || [],
				sourceText: a.sourceText || void 0
			});
			existingAssoKeys.add(key);
		}
	}
	const mergedBenevolats = [...existingCv.benevolats || [], ...newBenevolats];
	const existingInterets = new Set((existingCv.interets || []).map((i) => normalizeStr(i)));
	const newInterets = [];
	const interetsDetailles = existingCv.interetsDetailles || [];
	for (const i of result.interests) {
		const norm = normalizeStr(i.name);
		if (norm && !existingInterets.has(norm)) {
			const formattedLabel = i.subtopics && i.subtopics.length > 0 ? `${i.name} (${i.subtopics.join(", ")})` : i.details ? `${i.name} (${i.details})` : i.name;
			newInterets.push(formattedLabel);
			existingInterets.add(norm);
			interetsDetailles.push({
				nom: i.name,
				categorie: i.category || void 0,
				description: i.description || void 0,
				sousThemes: i.subtopics || [],
				details: i.details || void 0,
				sourceText: i.sourceText || void 0
			});
		}
	}
	const mergedInterets = [...existingCv.interets || [], ...newInterets];
	const updatedCvStructure = {
		...existingCv,
		titre: titre || existingCv.titre || "",
		accroche: result.summary.shortBio || existingCv.accroche || "",
		email: emailContact || existingCv.email || "",
		telephone: telephone || existingCv.telephone || "",
		ville: result.identity.city || existingCv.ville || "",
		pays: result.identity.country || existingCv.pays || "France",
		permis: permis || existingCv.permis || "",
		linkedin: result.identity.linkedin || existingCv.linkedin || "",
		portfolio: result.identity.portfolio || existingCv.portfolio || "",
		github: result.identity.github || existingCv.github || "",
		experiences: mergedExperiences,
		formations: mergedFormations,
		competences: mergedCompetences,
		langues: mergedLangues,
		certifications: mergedCertifications,
		projets: mergedProjets,
		benevolats: mergedBenevolats,
		interets: mergedInterets,
		interetsDetailles
	};
	const hardSkillsStr = mergedCompetences.filter((c) => c.typeCategorie === "hard" || c.categorie === "Métier" || c.categorie === "Compétence" || c.categorie === "Hard Skill").map((c) => c.nom).join(", ");
	const outilsStr = mergedCompetences.filter((c) => c.typeCategorie === "outil" || c.categorie === "Outil" || c.categorie === "Logiciel").map((c) => c.nom).join(", ");
	const languesStr = mergedLangues.map((l) => `${l.nom} (${l.niveau}${l.score ? ` - ${l.certification ? `${l.certification} ` : ""}${l.score}` : ""})`).join(", ");
	const niveauAnglais = mergedLangues.find((l) => {
		const n = normalizeStr(l.nom);
		return n.includes("anglais") || n.includes("english");
	})?.niveau || result.languages.find((l) => normalizeStr(l.name).includes("anglais"))?.level || currentProfil?.niveauAnglais || "B2";
	const primaryFormation = mergedFormations[0];
	const formationTitle = primaryFormation?.diplome || currentProfil?.formation || "";
	const ecoleName = primaryFormation?.etablissement || currentProfil?.ecole || "";
	let niveauEtudes = currentProfil?.niveau || "";
	if (!niveauEtudes && primaryFormation?.diplome) {
		const d = primaryFormation.diplome.toLowerCase();
		if (d.includes("master") || d.includes("ingénieur") || d.includes("mba") || d.includes("bac +5")) niveauEtudes = "Bac +5 (Master / Diplôme d'Ingénieur / Mastère)";
		else if (d.includes("but") || d.includes("licence") || d.includes("bachelor") || d.includes("bac +3")) niveauEtudes = "Bac +3 (Licence / BUT / Bachelor)";
		else if (d.includes("bts") || d.includes("dut") || d.includes("deust") || d.includes("bac +2")) niveauEtudes = "Bac +2 (BTS / DUT / CPGE)";
		else if (d.includes("bac") || d.includes("lycée")) niveauEtudes = "Baccalauréat";
	}
	const experiencesResume = mergedExperiences.map((e) => `${e.poste} chez ${e.entreprise} (${e.periode || e.debut || ""})`).join(" ; ");
	return {
		prenom,
		nom,
		emailContact,
		telephone,
		localisation,
		pays: result.identity.country || currentProfil?.pays || "France",
		titre,
		mobilite,
		permis,
		formation: formationTitle,
		ecole: ecoleName,
		niveau: niveauEtudes || currentProfil?.niveau || "Bac +3 (Licence / BUT / Bachelor)",
		competences: hardSkillsStr || currentProfil?.competences || "",
		logiciels: outilsStr || currentProfil?.logiciels || "",
		langues: languesStr || currentProfil?.langues || "",
		niveauAnglais: niveauAnglais || currentProfil?.niveauAnglais || "B2",
		experiences: experiencesResume || currentProfil?.experiences || "",
		cvStructure: updatedCvStructure
	};
}
function mapNiveau(level) {
	if (!level) return "Intermédiaire";
	const l = level.toLowerCase();
	if (l.includes("notion")) return "Notions";
	if (l.includes("débutant") || l.includes("debutant")) return "Débutant";
	if (l.includes("expert")) return "Expert";
	if (l.includes("avancé") || l.includes("avance")) return "Avancé";
	return "Intermédiaire";
}
function mapNiveauLangue(level) {
	if (!level) return "B2";
	const l = level.toLowerCase();
	if (l.includes("maternelle") || l.includes("natif")) return "Langue maternelle";
	if (l.includes("c2")) return "C2";
	if (l.includes("c1") || l.includes("courant")) return "C1";
	if (l.includes("b2")) return "B2";
	if (l.includes("b1")) return "B1";
	if (l.includes("a2")) return "A2";
	if (l.includes("a1") || l.includes("notions") || l.includes("débutant")) return "A1";
	return "B2";
}
var _jsxFileName$2 = "/app/applet/src/components/cv-import/CvImporter.tsx";
function CvImporter({ existingProfil, onImportComplete, onCancel }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [result, setResult] = (0, import_react.useState)(null);
	const [isPersisting, setIsPersisting] = (0, import_react.useState)(false);
	const importMutation = useMutation({
		mutationFn: async ({ file, text }) => {
			let rawText = text || "";
			if (file) {
				setStatus("reading");
				rawText = await extraireTexteFichier(file);
			}
			setStatus("identifying");
			await new Promise((resolve) => setTimeout(resolve, 500));
			setStatus("structuring");
			const extractionResult = await extraireCvServeur({ data: { text: rawText } });
			setStatus("verifying");
			await new Promise((resolve) => setTimeout(resolve, 400));
			return extractionResult;
		},
		onSuccess: (data) => {
			setResult(data);
			setStatus("preview");
		},
		onError: (err) => {
			console.error(err);
			toast.error(err instanceof Error ? err.message : "Une erreur est survenue lors de l'analyse du CV.");
			setStatus("error");
		}
	});
	const handleConfirm = async (finalData) => {
		setIsPersisting(true);
		try {
			const patch = mergeCvImportWithProfil(finalData, existingProfil);
			await Promise.resolve(onImportComplete(patch));
			const countExp = finalData.experiences.length;
			const countEdu = finalData.education.length;
			toast.success(`CV importé avec succès ! (${countExp} expérience${countExp > 1 ? "s" : ""}, ${countEdu} formation${countEdu > 1 ? "s" : ""})`);
		} catch (e) {
			console.error(e);
			toast.error("Erreur lors de l'intégration des données au profil.");
		} finally {
			setIsPersisting(false);
		}
	};
	const handleFileSelected = (file) => {
		setStatus("reading");
		importMutation.mutate({ file });
	};
	const handleTextSelected = (text) => {
		setStatus("reading");
		importMutation.mutate({ text });
	};
	const isProcessing = [
		"reading",
		"identifying",
		"structuring",
		"verifying"
	].includes(status);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "w-full",
		children: status === "idle" || status === "error" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvUpload, {
			onFileSelected: handleFileSelected,
			onTextSelected: handleTextSelected,
			disabled: importMutation.isPending
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 108,
			columnNumber: 9
		}, this) : isProcessing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvAnalysisProgress, { status }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 114,
			columnNumber: 9
		}, this) : status === "preview" && result ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvImportPreview, {
			result,
			onConfirm: handleConfirm,
			onCancel,
			isSubmitting: isPersisting
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 116,
			columnNumber: 9
		}, this) : null
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 106,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/profil/ProfilDocumentsTab.tsx";
function ProfilDocumentsTab({ profil, onChange }) {
	const [modeVue, setModeVue] = (0, import_react.useState)("editeur");
	const [copie, setCopie] = (0, import_react.useState)(false);
	const [showImporter, setShowImporter] = (0, import_react.useState)(false);
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
				className: "rounded-2xl border border-purple-500/20 bg-card/40 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs font-semibold",
								children: "Source de vérité NACORA"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 64,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 63,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-purple-400" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 69,
								columnNumber: 13
							}, this), "CV Structuré & Import / Export"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 68,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground max-w-xl",
							children: "Importez un CV existant (PDF, Word ou texte collé) pour extraire automatiquement et fidèlement toutes vos informations dans votre profil NACORA."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 72,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 62,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						onClick: () => setShowImporter(true),
						className: "gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs shadow-sm shadow-purple-600/30",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudUpload, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 85,
							columnNumber: 13
						}, this), "Importer un CV"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 80,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "outline",
						onClick: exporterJson,
						className: "gap-1.5 border-border/70 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 94,
							columnNumber: 13
						}, this), "Exporter JSON"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 88,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 79,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 61,
				columnNumber: 7
			}, this),
			showImporter && /* @__PURE__ */ (void 0)("div", {
				className: "rounded-2xl border border-purple-500/30 bg-card/50 p-6 shadow-xl relative animate-in fade-in slide-in-from-top-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex justify-between items-center mb-4 pb-3 border-b border-border/50",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)("span", {
							className: "flex size-7 rounded-lg bg-purple-500/20 text-purple-400 items-center justify-center",
							children: /* @__PURE__ */ (void 0)(CloudUpload, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 106,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 105,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-sm font-bold text-foreground",
							children: "Module CV Importer IA"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 109,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Extraction exhaustive sans perte, compatible PDF, DOCX et texte."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 112,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 108,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 104,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setShowImporter(false),
						className: "size-8 text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (void 0)(X, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 124,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 118,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 103,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(CvImporter, {
					existingProfil: profil,
					onImportComplete: (patch) => {
						onChange(patch);
						setShowImporter(false);
					},
					onCancel: () => setShowImporter(false)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 128,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 102,
				columnNumber: 9
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
							fileName: _jsxFileName$1,
							lineNumber: 148,
							columnNumber: 13
						}, this), "Éditeur structuré avancé"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 142,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: modeVue === "texte" ? "secondary" : "ghost",
						onClick: () => setModeVue("texte"),
						className: "gap-1.5 text-xs h-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 157,
							columnNumber: 13
						}, this), "Aperçu Texte IA (Contexte injecté)"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 151,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 141,
					columnNumber: 9
				}, this), modeVue === "texte" && /* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					variant: "outline",
					onClick: copierTexte,
					className: "gap-1.5 text-xs h-8",
					children: [copie ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 170,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 172,
						columnNumber: 15
					}, this), copie ? "Copié" : "Copier le texte"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 163,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 140,
				columnNumber: 7
			}, this),
			modeVue === "editeur" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CvBuilder, {
				value: cv,
				onChange: (nouvCv) => onChange({ cvStructure: nouvCv })
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 180,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border/60 bg-card/40 p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground border-b border-border/50 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 187,
						columnNumber: 13
					}, this), "Voici exactement les données transmises au modèle IA lors de l'analyse d'offres et de la génération de candidatures."]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 186,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
					className: "font-mono text-xs text-muted-foreground/90 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto bg-background/50 p-4 rounded-xl border border-border/50",
					children: texteCv || "Profil vide pour le moment."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 191,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 185,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 59,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/profil.tsx?tsr-split=component";
function ProfilPage() {
	const { user, loading: authLoading } = useSession();
	const [profil, setProfil] = (0, import_react.useState)(emptyProfil);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [lastSavedTime, setLastSavedTime] = (0, import_react.useState)(null);
	const [cvOpen, setCvOpen] = (0, import_react.useState)(false);
	const [summaryIaOpen, setSummaryIaOpen] = (0, import_react.useState)(false);
	const [optimizerOpen, setOptimizerOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("apercu");
	const [, startTransition] = (0, import_react.useTransition)();
	const profilRef = (0, import_react.useRef)(profil);
	profilRef.current = profil;
	const bilan = (0, import_react.useMemo)(() => calculerCompletudeProfil(profil), [profil]);
	(0, import_react.useEffect)(() => {
		const local = loadProfil();
		setProfil(local);
	}, []);
	(0, import_react.useEffect)(() => {
		if (authLoading || !user?.id) return;
		let cancelled = false;
		(async () => {
			try {
				const cloud = await fetchProfil(user.id);
				if (!cancelled && cloud) setProfil((local) => ({
					...local,
					...cloud,
					cvStructure: normaliserCvStructure(cloud.cvStructure || local.cvStructure)
				}));
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
			if (user?.id) saveProfilCloud(next, user.id).catch((err) => {
				console.warn("Auto-save cloud profil:", err);
			});
			return next;
		});
		setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		}));
	}, [user?.id]);
	const enregistrer = (0, import_react.useCallback)(async () => {
		setSaving(true);
		const p = profilRef.current;
		saveProfilLocal(p);
		if (user?.id) try {
			const saved = await saveProfilCloud(p, user.id);
			setProfil(saved);
			setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}));
			toast.success("Dossier candidat synchronisé dans le Cloud !");
		} catch (err) {
			console.error("Erreur sauvegarde cloud profil:", err);
			setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}));
			toast.info("Profil sauvegardé localement (hors-ligne).");
		} finally {
			setSaving(false);
		}
		else {
			setSaving(false);
			setLastSavedTime((/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}));
			toast.success("Profil sauvegardé avec succès dans votre navigateur !");
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
	const handleSelectTab = (tabId) => {
		startTransition(() => {
			setActiveTab(tabId);
		});
	};
	const handleNavigateFromSuggestions = (targetTab) => {
		if (targetTab === "preferences" || targetTab === "recherche") handleSelectTab("objectifs");
		else if (targetTab === "experiences" || targetTab === "formation" || targetTab === "parcours") handleSelectTab("parcours");
		else if (targetTab === "langues") handleSelectTab("langues");
		else if (targetTab === "certifications") handleSelectTab("certifications");
		else if (targetTab === "projets" || targetTab === "engagements") handleSelectTab("engagements");
		else if (targetTab === "identite") handleSelectTab("identite");
		else if (targetTab === "competences") handleSelectTab("competences");
		else if (targetTab === "documents") handleSelectTab("documents");
		else handleSelectTab("apercu");
	};
	const CATEGORIES = (0, import_react.useMemo)(() => [
		{
			id: "apercu",
			label: "Aperçu & IA",
			icon: LayoutDashboard,
			colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
			subtitle: `${bilan.score}% complété`,
			isComplete: bilan.score >= 80
		},
		{
			id: "identite",
			label: "Identité",
			icon: UserRound,
			colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
			subtitle: profil.prenom && profil.nom ? `${profil.prenom} ${profil.nom}` : "À compléter",
			isComplete: Boolean(profil.prenom && profil.nom && (profil.emailContact || profil.telephone))
		},
		{
			id: "objectifs",
			label: "Objectifs",
			icon: Target,
			colorClass: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
			subtitle: profil.metiers?.split(",")[0]?.trim() || profil.contrats?.split(",")[0]?.trim() || "Postes & Cibles",
			isComplete: Boolean(profil.metiers || profil.contrats)
		},
		{
			id: "parcours",
			label: "Parcours",
			icon: Briefcase,
			colorClass: "bg-purple-500/15 text-purple-400 border-purple-500/25",
			subtitle: `${profil.cvStructure?.experiences?.length || 0} exp • ${profil.cvStructure?.formations?.length || 0} diplômes`,
			isComplete: (profil.cvStructure?.experiences?.length || 0) > 0 && (profil.cvStructure?.formations?.length || 0) > 0
		},
		{
			id: "competences",
			label: "Compétences",
			icon: Wrench,
			colorClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
			subtitle: `${profil.cvStructure?.competences?.length || 0} skills & outils`,
			isComplete: (profil.cvStructure?.competences?.length || 0) > 0
		},
		{
			id: "langues",
			label: "Langues",
			icon: Languages,
			colorClass: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
			subtitle: `${profil.cvStructure?.langues?.length || 0} langue(s)`,
			isComplete: (profil.cvStructure?.langues?.length || 0) > 0
		},
		{
			id: "certifications",
			label: "Certifications",
			icon: Award,
			colorClass: "bg-amber-500/15 text-amber-400 border-amber-500/25",
			subtitle: `${profil.cvStructure?.certifications?.length || 0} certif(s)`,
			isComplete: (profil.cvStructure?.certifications?.length || 0) > 0
		},
		{
			id: "engagements",
			label: "Projets & Asso",
			icon: Lightbulb,
			colorClass: "bg-rose-500/15 text-rose-400 border-rose-500/25",
			subtitle: `${(profil.cvStructure?.projets?.length || 0) + (profil.cvStructure?.benevolats?.length || 0)} projet(s)`,
			isComplete: (profil.cvStructure?.projets?.length || 0) > 0 || (profil.cvStructure?.benevolats?.length || 0) > 0
		},
		{
			id: "documents",
			label: "Documents",
			icon: FileCode,
			colorClass: "bg-blue-500/15 text-blue-400 border-blue-500/25",
			subtitle: profil.cv ? "CV analysé" : "Importer un CV",
			isComplete: Boolean(profil.cv)
		}
	], [profil, bilan]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		title: "Mon Profil",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [saving && /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 230,
				columnNumber: 22
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: enregistrer,
				size: "sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "mr-2 size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 232,
					columnNumber: 13
				}, this), "Enregistrer"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 231,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 229,
			columnNumber: 48
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex gap-5 flex-col lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "w-full lg:w-72 shrink-0 flex flex-col gap-2",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => handleSelectTab(c.id),
					className: `flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${activeTab === c.id ? "bg-white/12 border border-white/20 text-foreground font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl" : "bg-white/4 border border-white/6 hover:bg-white/8 hover:border-white/12 text-muted-foreground backdrop-blur-md"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `p-2.5 rounded-xl border backdrop-blur-md shadow-xs ${c.colorClass}`,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(c.icon, { className: "size-4 shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-semibold text-xs text-foreground truncate",
								children: c.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-muted-foreground truncate mt-0.5",
								children: c.subtitle
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 15
					}, this), c.isComplete && /* @__PURE__ */ (void 0)(Check, { className: "size-4 text-emerald-400 shrink-0 ml-2 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 32
					}, this)]
				}, c.id, true, {
					fileName: _jsxFileName,
					lineNumber: 238,
					columnNumber: 32
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 237,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 glass-panel p-6 sm:p-8 min-h-[520px] shadow-lg",
				children: [
					activeTab === "apercu" && /* @__PURE__ */ (void 0)(ProfilOverviewTab, {
						profil,
						bilan,
						onNavigate: handleNavigateFromSuggestions
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 38
					}, this),
					activeTab === "identite" && /* @__PURE__ */ (void 0)(ProfilIdentityTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 40
					}, this),
					activeTab === "objectifs" && /* @__PURE__ */ (void 0)(ProfilObjectivesTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 41
					}, this),
					activeTab === "parcours" && /* @__PURE__ */ (void 0)(ProfilJourneyTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 40
					}, this),
					activeTab === "competences" && /* @__PURE__ */ (void 0)(ProfilSkillsTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 43
					}, this),
					activeTab === "langues" && /* @__PURE__ */ (void 0)(ProfilLanguagesTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 39
					}, this),
					activeTab === "certifications" && /* @__PURE__ */ (void 0)(ProfilCertificationsTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 46
					}, this),
					activeTab === "engagements" && /* @__PURE__ */ (void 0)(ProfilProjectsEngagementsTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 43
					}, this),
					activeTab === "documents" && /* @__PURE__ */ (void 0)(ProfilDocumentsTab, {
						profil,
						onChange: updateProfil
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 41
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 256,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 236,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 229,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProfilPage as component };
