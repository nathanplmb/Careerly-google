import { o as __toESM } from "../_runtime.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-6jjz1ame.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { j as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-DnJLdVIu.mjs";
import { t as ClassifyContactsBatchInputZodSchema } from "./contactImport.schema-CabBof2c.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { c as setPersistence, i as getAuth, n as browserLocalPersistence, o as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { a as setDoc, c as doc, i as query, l as getFirestore, n as getDoc, o as writeBatch, r as getDocs, s as collection, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ft as ChevronUp, Gt as Building2, Ht as CalendarDays, It as ChevronRight, L as MessageSquare, Lt as ChevronLeft, Ot as Coins, R as Menu, Rt as ChevronDown, S as Settings, T as ScanLine, Yt as Bell, _ as Sparkles, a as Users, i as WandSparkles, k as Plus, m as Target, mt as FileText, n as X, q as Linkedin, rt as House, s as UserRound, u as Upload, vt as Eye, w as Search, yt as EyeOff, zt as Check } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as Root$1, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BWDoBwEQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$8 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-35 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] select-none", {
	variants: {
		variant: {
			default: "bg-gradient-to-b from-[#EC0040] to-[#D81A45] text-white border border-white/25 shadow-[0_4px_16px_rgba(216,26,69,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110 hover:shadow-[0_6px_22px_rgba(216,26,69,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5",
			vibrant: "bg-gradient-to-b from-[#EC0040] to-[#D81A45] text-white border border-white/25 shadow-[0_4px_16px_rgba(216,26,69,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110 hover:shadow-[0_6px_22px_rgba(216,26,69,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5",
			destructive: "bg-destructive/90 text-destructive-foreground border border-destructive/30 shadow-[0_4px_14px_rgba(240,68,56,0.3)] hover:bg-destructive hover:brightness-105 hover:-translate-y-0.5",
			outline: "border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 text-foreground backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/20 hover:text-foreground hover:-translate-y-0.5",
			secondary: "bg-secondary/70 backdrop-blur-md text-secondary-foreground hover:bg-secondary/90 border border-white/10 shadow-xs hover:-translate-y-0.5",
			bordeaux: "bg-[#780328]/35 text-[#FEC9D5] border border-[#780328]/60 backdrop-blur-md hover:bg-[#780328]/50 shadow-xs hover:-translate-y-0.5",
			soft: "bg-primary/15 text-primary hover:bg-primary/25 border border-primary/25 backdrop-blur-md shadow-xs hover:-translate-y-0.5",
			ghost: "text-muted-foreground hover:bg-white/8 dark:hover:bg-white/8 hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline px-0 py-0 h-auto font-medium"
		},
		size: {
			default: "h-9.5 px-4 py-2 text-sm",
			sm: "h-8 rounded-lg px-3 text-xs",
			lg: "h-11 rounded-xl px-6 text-base font-semibold",
			xl: "h-12 rounded-2xl px-7 text-base font-semibold",
			icon: "h-9.5 w-9.5 rounded-xl",
			"icon-sm": "h-8 w-8 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 56,
		columnNumber: 7
	}, void 0);
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-DQAKdqn5.js
var firebase_applet_config_default = {
	projectId: "gen-lang-client-0123496230",
	appId: "1:360920894139:web:6ebd7ef6db5f923ec1b79e",
	apiKey: "AIzaSyC_qw3XRjp878tSvrhpvjFbDMsACACHCgM",
	authDomain: "gen-lang-client-0123496230.firebaseapp.com",
	firestoreDatabaseId: "ai-studio-careerly-bd20bde2-4371-4508-bd76-92ed8eef5be1",
	storageBucket: "gen-lang-client-0123496230.firebasestorage.app",
	messagingSenderId: "360920894139",
	measurementId: "",
	oAuthClientId: "360920894139-jfok6gia67e80tpied3u3oh4alkacc3f.apps.googleusercontent.com",
	recaptchaSiteKey: ""
};
var firebaseConfig = {
	apiKey: firebase_applet_config_default.apiKey || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	}["VITE_FIREBASE_API_KEY"],
	authDomain: firebase_applet_config_default.authDomain || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	}["VITE_FIREBASE_AUTH_DOMAIN"],
	projectId: firebase_applet_config_default.projectId || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	}["VITE_FIREBASE_PROJECT_ID"],
	storageBucket: firebase_applet_config_default.storageBucket || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	}["VITE_FIREBASE_STORAGE_BUCKET"],
	messagingSenderId: firebase_applet_config_default.messagingSenderId || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	}["VITE_FIREBASE_MESSAGING_SENDER_ID"],
	appId: firebase_applet_config_default.appId || {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "qthnoiooyawmntqdbqgo"
	}["VITE_FIREBASE_APP_ID"]
};
var app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
var auth = getAuth(app);
if (typeof window !== "undefined") setPersistence(auth, browserLocalPersistence).catch((error) => {
	console.warn("Configuration persistance Firebase Auth:", error);
});
var db = firebase_applet_config_default.firestoreDatabaseId && firebase_applet_config_default.firestoreDatabaseId !== "(default)" ? getFirestore(app, firebase_applet_config_default.firestoreDatabaseId) : getFirestore(app);
function isFirebaseConfigured() {
	return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}
var NIVEAUX_COMPETENCE = [
	"Débutant",
	"Notions",
	"Intermédiaire",
	"Avancé",
	"Expert"
];
var NIVEAUX_LANGUE = [
	"A1",
	"A2",
	"B1",
	"B2",
	"C1",
	"C2",
	"Langue maternelle"
];
function nouvelId() {
	return Math.random().toString(36).slice(2, 10);
}
function defaultPreferences() {
	return {
		secteursPrivilegies: [],
		secteursAEviter: [],
		metiersPrivilegies: [],
		entreprisesCibles: [],
		taillesEntreprise: ["Scale-up", "Grand groupe"],
		travailInternational: false,
		mobiliteGeo: "France entière & Télétravail",
		teletravailPrefere: "hybride",
		salaireMin: "",
		criteresNonNegociables: []
	};
}
function emptyCvStructure() {
	return {
		titre: "",
		accroche: "",
		email: "",
		telephone: "",
		ville: "",
		pays: "France",
		linkedin: "",
		portfolio: "",
		github: "",
		permis: "",
		photoUrl: "",
		experiences: [],
		formations: [],
		certifications: [],
		projets: [],
		competences: [],
		langues: [],
		benevolats: [],
		distinctions: [],
		interets: [],
		preferences: defaultPreferences(),
		documents: [],
		syntheseIa: null
	};
}
function nouvelleExperience() {
	return {
		id: nouvelId(),
		poste: "",
		entreprise: "",
		lieu: "",
		contrat: "Stage",
		debut: "",
		fin: "",
		enCours: false,
		description: "",
		missions: [],
		responsabilites: [],
		realisations: [],
		competences: [],
		outils: [],
		kpi: "",
		realisationsCles: ""
	};
}
function nouvelleFormation() {
	return {
		id: nouvelId(),
		diplome: "",
		etablissement: "",
		lieu: "",
		debut: "",
		fin: "",
		enCours: false,
		mention: "",
		specialisation: "",
		coursImportants: [],
		projets: [],
		resultats: "",
		details: ""
	};
}
function nouvelleCertification() {
	return {
		id: nouvelId(),
		nom: "",
		organisme: "",
		date: "",
		dateExpiration: "",
		identifiant: "",
		lien: "",
		competencesAssociees: []
	};
}
function nouveauProjet() {
	return {
		id: nouvelId(),
		nom: "",
		role: "",
		type: "personnel",
		periode: "",
		description: "",
		technologies: [],
		competences: [],
		resultats: [],
		lien: ""
	};
}
function nouvelleCompetence() {
	return {
		id: nouvelId(),
		nom: "",
		categorie: "Compétence",
		typeCategorie: "hard",
		niveau: "Notions",
		anneesExperience: ""
	};
}
function nouvelleLangue() {
	return {
		id: nouvelId(),
		nom: "",
		niveau: "B2",
		certification: "",
		score: ""
	};
}
function nouveauBenevolat() {
	return {
		id: nouvelId(),
		role: "",
		organisation: "",
		periode: "",
		description: "",
		responsabilites: [],
		realisations: [],
		competences: []
	};
}
function nouvelleDistinction() {
	return {
		id: nouvelId(),
		titre: "",
		organisme: "",
		date: "",
		description: ""
	};
}
/** Normalise et fusionne une structure partielle avec le modèle complet enrichi. */
function normaliserCvStructure(brut) {
	const base = emptyCvStructure();
	if (!brut || typeof brut !== "object") return base;
	const liste = (v, defaut) => Array.isArray(v) ? v.map((x) => ({
		...defaut(),
		...x,
		id: x?.id ?? nouvelId()
	})) : [];
	return {
		...base,
		...brut,
		pays: brut.pays ?? base.pays,
		github: brut.github ?? "",
		photoUrl: brut.photoUrl ?? "",
		experiences: liste(brut.experiences, nouvelleExperience).map((e) => ({
			...e,
			missions: Array.isArray(e.missions) ? e.missions : [],
			responsabilites: Array.isArray(e.responsabilites) ? e.responsabilites : [],
			realisations: Array.isArray(e.realisations) ? e.realisations : [],
			resultats: Array.isArray(e.resultats) ? e.resultats : [],
			quantifiedResults: Array.isArray(e.quantifiedResults) ? e.quantifiedResults : [],
			competences: Array.isArray(e.competences) ? e.competences : [],
			outils: Array.isArray(e.outils) ? e.outils : []
		})),
		formations: liste(brut.formations, nouvelleFormation).map((f) => ({
			...f,
			specialisation: f.specialisation ?? f.parcours ?? "",
			parcours: f.parcours ?? f.specialisation ?? "",
			track: f.track ?? "",
			mention: f.mention ?? "",
			coursImportants: Array.isArray(f.coursImportants) ? f.coursImportants : [],
			options: Array.isArray(f.options) ? f.options : [],
			projets: Array.isArray(f.projets) ? f.projets : []
		})),
		certifications: liste(brut.certifications, nouvelleCertification).map((c) => ({
			...c,
			score: c.score ?? "",
			niveau: c.niveau ?? "",
			langue: c.langue ?? "",
			competencesAssociees: Array.isArray(c.competencesAssociees) ? c.competencesAssociees : []
		})),
		projets: liste(brut.projets, nouveauProjet).map((p) => ({
			...p,
			missions: Array.isArray(p.missions) ? p.missions : [],
			responsabilites: Array.isArray(p.responsabilites) ? p.responsabilites : [],
			realisations: Array.isArray(p.realisations) ? p.realisations : [],
			technologies: Array.isArray(p.technologies) ? p.technologies : [],
			outils: Array.isArray(p.outils) ? p.outils : [],
			competences: Array.isArray(p.competences) ? p.competences : [],
			collaborateurs: Array.isArray(p.collaborateurs) ? p.collaborateurs : []
		})),
		competences: liste(brut.competences, nouvelleCompetence),
		langues: liste(brut.langues, nouvelleLangue).map((l) => ({
			...l,
			certification: l.certification ?? "",
			score: l.score ?? "",
			attestation: l.attestation ?? "",
			certificationsAssociees: Array.isArray(l.certificationsAssociees) ? l.certificationsAssociees : []
		})),
		benevolats: liste(brut.benevolats, nouveauBenevolat).map((b) => ({
			...b,
			missions: Array.isArray(b.missions) ? b.missions : [],
			responsabilites: Array.isArray(b.responsabilites) ? b.responsabilites : [],
			realisations: Array.isArray(b.realisations) ? b.realisations : [],
			competences: Array.isArray(b.competences) ? b.competences : [],
			outils: Array.isArray(b.outils) ? b.outils : [],
			equipe: b.equipe ?? "",
			budget: b.budget ?? ""
		})),
		distinctions: liste(brut.distinctions, nouvelleDistinction),
		interets: Array.isArray(brut.interets) ? brut.interets.filter(Boolean) : [],
		interetsDetailles: Array.isArray(brut.interetsDetailles) ? brut.interetsDetailles : [],
		preferences: {
			...defaultPreferences(),
			...brut.preferences || {}
		},
		documents: Array.isArray(brut.documents) ? brut.documents : [],
		syntheseIa: brut.syntheseIa ?? null
	};
}
/** Taux de complétion global du CV structuré. */
function completionCv(cv) {
	const blocs = [
		Boolean(cv.titre || cv.accroche),
		Boolean(cv.email || cv.telephone),
		cv.experiences.length > 0,
		cv.formations.length > 0,
		cv.competences.length > 0,
		cv.langues.length > 0,
		cv.certifications.length > 0 || cv.projets.length > 0,
		cv.benevolats.length > 0 || cv.distinctions && cv.distinctions.length > 0,
		cv.interets.length > 0
	];
	return Math.round(blocs.filter(Boolean).length / blocs.length * 100);
}
/** Résumé texte enrichi utilisé par tous les moteurs IA (match, email, brief, interview...). */
function cvStructureEnTexte(cv) {
	const l = [];
	if (cv.titre) l.push(`Titre professionnel : ${cv.titre}`);
	if (cv.accroche) l.push(`Accroche / Profil : ${cv.accroche}`);
	if (cv.ville || cv.pays) l.push(`Localisation : ${[cv.ville, cv.pays].filter(Boolean).join(", ")}`);
	if (cv.permis) l.push(`Permis : ${cv.permis}`);
	if (cv.experiences.length > 0) {
		l.push("\n--- EXPÉRIENCES PROFESSIONNELLES ---");
		for (const e of cv.experiences) {
			const dates = `${e.debut}${e.enCours ? " → aujourd'hui" : e.fin ? ` → ${e.fin}` : ""}`;
			const missions = e.missions && e.missions.length ? ` Missions : ${e.missions.join(" ; ")}` : "";
			const real = e.realisations.length ? ` Réalisations : ${e.realisations.join(" ; ")}` : "";
			const kpis = e.kpi ? ` KPI / Impact : ${e.kpi}` : "";
			const cles = e.realisationsCles ? ` Réalisations clés : ${e.realisationsCles}` : "";
			const comp = e.competences.length ? ` Compétences : ${e.competences.join(", ")}` : "";
			const out = e.outils && e.outils.length ? ` Outils : ${e.outils.join(", ")}` : "";
			l.push(`• ${e.poste} chez ${e.entreprise} (${e.contrat}, ${dates}${e.lieu ? `, ${e.lieu}` : ""})\n  ${e.description}${missions}${real}${kpis}${cles}${comp}${out}`.trim());
		}
	}
	if (cv.formations.length > 0) {
		l.push("\n--- FORMATIONS & ÉTUDES ---");
		for (const f of cv.formations) {
			const dates = `${f.debut}${f.enCours ? " → en cours" : f.fin ? ` → ${f.fin}` : ""}`;
			const spec = f.specialisation ? ` Spécialisation : ${f.specialisation}.` : "";
			const ment = f.mention ? ` (${f.mention})` : "";
			const cours = f.coursImportants && f.coursImportants.length ? ` Cours clés : ${f.coursImportants.join(", ")}.` : "";
			const proj = f.projets && f.projets.length ? ` Projets : ${f.projets.join(", ")}.` : "";
			const res = f.resultats ? ` Distinctions : ${f.resultats}.` : "";
			l.push(`• ${f.diplome} — ${f.etablissement} (${dates}${f.lieu ? `, ${f.lieu}` : ""})${ment}\n  ${spec}${cours}${proj}${res} ${f.details}`.trim());
		}
	}
	if (cv.competences.length > 0) {
		l.push("\n--- COMPÉTENCES & OUTILS ---");
		const hards = cv.competences.filter((c) => c.typeCategorie === "hard" || !c.typeCategorie);
		const softs = cv.competences.filter((c) => c.typeCategorie === "soft");
		const outils = cv.competences.filter((c) => c.typeCategorie === "outil");
		const methodes = cv.competences.filter((c) => c.typeCategorie === "methode");
		if (hards.length) l.push(`Hard skills : ${hards.map((c) => `${c.nom} (${c.niveau})`).join(", ")}`);
		if (softs.length) l.push(`Soft skills : ${softs.map((c) => `${c.nom}`).join(", ")}`);
		if (outils.length) l.push(`Outils & Logiciels : ${outils.map((c) => `${c.nom} (${c.niveau})`).join(", ")}`);
		if (methodes.length) l.push(`Méthodologies : ${methodes.map((c) => `${c.nom}`).join(", ")}`);
	}
	if (cv.langues.length > 0) l.push(`Langues : ${cv.langues.map((x) => `${x.nom} (${x.niveau}${x.certification ? ` - Certif: ${x.certification}${x.score ? ` ${x.score}` : ""}` : ""})`).join(", ")}`);
	if (cv.certifications.length > 0) {
		l.push("\n--- CERTIFICATIONS ---");
		for (const c of cv.certifications) {
			const scoreStr = c.score ? `Score: ${c.score}, ` : "";
			const niveauStr = c.niveau ? `Niveau: ${c.niveau}, ` : "";
			const orgStr = c.organisme ? `${c.organisme}, ` : "";
			l.push(`• ${c.nom} (${orgStr}${scoreStr}${niveauStr}${c.date}${c.identifiant ? `, ID: ${c.identifiant}` : ""}${c.lien ? ` - ${c.lien}` : ""})`);
		}
	}
	if (cv.projets.length > 0) {
		l.push("\n--- PROJETS RÉALISÉS ---");
		for (const p of cv.projets) {
			const type = p.type ? ` [${p.type}]` : "";
			const tech = p.technologies && p.technologies.length ? ` Tech: ${p.technologies.join(", ")}` : "";
			const res = p.resultats ? ` Résultat: ${p.resultats}` : "";
			l.push(`• ${p.nom}${type} — Rôle : ${p.role} (${p.periode}). ${p.description}${tech}${res}${p.lien ? ` (Lien: ${p.lien})` : ""}`);
		}
	}
	if (cv.benevolats.length > 0) {
		l.push("\n--- ASSOCIATIONS & ENGAGEMENTS ---");
		for (const b of cv.benevolats) l.push(`• ${b.role} au sein de ${b.organisation} (${b.periode}). ${b.description}`);
	}
	if (cv.distinctions && cv.distinctions.length > 0) {
		l.push("\n--- DISTINCTIONS & RÉCOMPENSES ---");
		for (const d of cv.distinctions) l.push(`• ${d.titre} (${d.organisme}, ${d.date}) : ${d.description}`);
	}
	if (cv.interets.length > 0) l.push(`Centres d'intérêt & Passions : ${cv.interets.join(", ")}`);
	if (cv.syntheseIa) {
		l.push("\n--- SYNTHÈSE PROFIL IA (CAREERLY ORBIT) ---");
		l.push(`Pitch : ${cv.syntheseIa.pitchEntretien}`);
		if (cv.syntheseIa.forcesCles?.length) l.push(`Forces : ${cv.syntheseIa.forcesCles.join(" ; ")}`);
		if (cv.syntheseIa.typePosteIdeal) l.push(`Poste Idéal : ${cv.syntheseIa.typePosteIdeal}`);
	}
	return l.join("\n");
}
var PROFIL_STORAGE_KEY = "neoma-profil-v1";
function emptyProfil() {
	return {
		prenom: "",
		nom: "",
		titre: "",
		formation: "Programme Grande École",
		ecole: "",
		niveau: "M1",
		localisation: "",
		pays: "France",
		mobilite: "",
		contrats: "Stage",
		domaines: "",
		metiers: "",
		entreprisesCiblees: "",
		competences: "",
		logiciels: "",
		langues: "",
		niveauAnglais: "",
		experiences: "",
		teletravail: "",
		modeTravail: "hybride",
		remuneration: "",
		dateDebut: "",
		duree: "",
		rechercheVraie: "",
		environnements: ["Grand groupe", "Scale-up"],
		prioritesRecherche: [
			"Missions apprenantes",
			"Mentorat / Équipe",
			"Perspectives de recrutement"
		],
		emailContact: "",
		telephone: "",
		linkedin: "",
		portfolio: "",
		github: "",
		permis: "",
		photoUrl: "",
		criteres: {
			secteur: "Important",
			localisation: "Important",
			remuneration: "Moyen",
			teletravail: "Moyen",
			missions: "Très important"
		},
		cvStructure: emptyCvStructure(),
		cv: null,
		preferences: defaultPreferences()
	};
}
function loadProfil() {
	if (typeof window === "undefined") return emptyProfil();
	try {
		const raw = window.localStorage.getItem(PROFIL_STORAGE_KEY);
		if (!raw) return emptyProfil();
		const brut = JSON.parse(raw);
		const cvStruct = normaliserCvStructure(brut.cvStructure);
		return {
			...emptyProfil(),
			...brut,
			titre: brut.titre || cvStruct.titre || "",
			telephone: brut.telephone || cvStruct.telephone || "",
			emailContact: brut.emailContact || cvStruct.email || "",
			linkedin: brut.linkedin || cvStruct.linkedin || "",
			portfolio: brut.portfolio || cvStruct.portfolio || "",
			github: brut.github || cvStruct.github || "",
			permis: brut.permis || cvStruct.permis || "",
			photoUrl: brut.photoUrl || cvStruct.photoUrl || "",
			cvStructure: cvStruct
		};
	} catch {
		return emptyProfil();
	}
}
function saveProfilLocal(p) {
	if (typeof window === "undefined") return;
	const cvStructure = normaliserCvStructure({
		...p.cvStructure,
		titre: p.titre || p.cvStructure.titre,
		email: p.emailContact || p.cvStructure.email,
		telephone: p.telephone || p.cvStructure.telephone,
		linkedin: p.linkedin || p.cvStructure.linkedin,
		portfolio: p.portfolio || p.cvStructure.portfolio,
		github: p.github || p.cvStructure.github || "",
		permis: p.permis || p.cvStructure.permis,
		photoUrl: p.photoUrl || p.cvStructure.photoUrl || "",
		ville: p.localisation || p.cvStructure.ville
	});
	const payload = {
		...p,
		cvStructure
	};
	window.localStorage.setItem(PROFIL_STORAGE_KEY, JSON.stringify(payload));
}
var CLE_COMPTE_ACTIF = "careerly_compte_actif";
var CLE_COMPTES_ENREGISTRES = "careerly_comptes_enregistres";
function getCompteActif() {
	try {
		const raw = localStorage.getItem(CLE_COMPTE_ACTIF);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed && parsed.email === "etudiant.demo@gmail.com") {
			localStorage.removeItem(CLE_COMPTE_ACTIF);
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}
function setCompteActif(utilisateur) {
	try {
		if (utilisateur) {
			const majUtilisateur = {
				...utilisateur,
				dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
			};
			localStorage.setItem(CLE_COMPTE_ACTIF, JSON.stringify(majUtilisateur));
			const liste = getComptesEnregistres();
			const index = liste.findIndex((u) => u.email.toLowerCase() === utilisateur.email.toLowerCase());
			if (index >= 0) liste[index] = {
				...liste[index],
				...majUtilisateur
			};
			else liste.unshift(majUtilisateur);
			localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));
			try {
				const profilActuel = loadProfil();
				let changed = false;
				if (utilisateur.prenom && (profilActuel.prenom !== utilisateur.prenom || profilActuel.prenom === "Alexandre")) {
					profilActuel.prenom = utilisateur.prenom;
					changed = true;
				}
				if (utilisateur.nom && (profilActuel.nom !== utilisateur.nom || profilActuel.nom === "Dupont")) {
					profilActuel.nom = utilisateur.nom;
					changed = true;
				}
				if (utilisateur.ecole && !profilActuel.ecole) {
					profilActuel.ecole = utilisateur.ecole;
					changed = true;
				}
				if (changed) saveProfilLocal(profilActuel);
			} catch {}
		} else localStorage.removeItem(CLE_COMPTE_ACTIF);
		window.dispatchEvent(new Event("careerly_auth_change"));
	} catch {}
}
function getComptesEnregistres() {
	try {
		const raw = localStorage.getItem(CLE_COMPTES_ENREGISTRES);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return (Array.isArray(parsed) ? parsed : []).filter((u) => u.email !== "etudiant.demo@gmail.com");
	} catch {
		return [];
	}
}
function supprimerCompteEnregistre(idOuEmail) {
	try {
		const liste = getComptesEnregistres().filter((u) => u.id !== idOuEmail && u.email.toLowerCase() !== idOuEmail.toLowerCase());
		localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));
		const actif = getCompteActif();
		if (actif && (actif.id === idOuEmail || actif.email.toLowerCase() === idOuEmail.toLowerCase())) setCompteActif(null);
		else window.dispatchEvent(new Event("careerly_auth_change"));
	} catch {}
}
function inscrireUtilisateurLocal(opts) {
	const propre = opts.email.trim().toLowerCase();
	const existant = getComptesEnregistres().find((u) => u.email.toLowerCase() === propre);
	const utilisateur = {
		id: existant ? existant.id : "usr_" + Math.random().toString(36).substring(2, 9),
		email: propre,
		prenom: opts.prenom?.trim() || existant?.prenom || (propre.split("@")[0] || "").split(".")[0] || "",
		nom: opts.nom?.trim() || existant?.nom || "",
		ecole: opts.ecole?.trim() || existant?.ecole || "",
		motDePasseHash: opts.motDePasse ? btoa(opts.motDePasse) : void 0,
		provider: "email",
		creeLe: existant?.creeLe || (/* @__PURE__ */ new Date()).toISOString(),
		dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
	};
	setCompteActif(utilisateur);
	return utilisateur;
}
function connecterUtilisateurLocal(email, motDePasse) {
	const propre = email.trim().toLowerCase();
	const existant = getComptesEnregistres().find((u) => u.email.toLowerCase() === propre);
	if (existant) {
		if (motDePasse && !existant.motDePasseHash) existant.motDePasseHash = btoa(motDePasse);
		setCompteActif(existant);
		return existant;
	}
	return inscrireUtilisateurLocal({
		email: propre,
		motDePasse
	});
}
function reinitialiserMotDePasseLocal(email, nouveauMotDePasse) {
	const propre = email.trim().toLowerCase();
	const liste = getComptesEnregistres();
	const existant = liste.find((u) => u.email.toLowerCase() === propre);
	if (existant) {
		existant.motDePasseHash = btoa(nouveauMotDePasse);
		localStorage.setItem(CLE_COMPTES_ENREGISTRES, JSON.stringify(liste));
		const actif = getCompteActif();
		if (actif && actif.email.toLowerCase() === propre) setCompteActif(existant);
		return true;
	}
	return false;
}
function simulerConnexionDemo() {
	const utilisateur = {
		id: "demo_" + Math.random().toString(36).substring(2, 9),
		email: "invite.demo@careerly.app",
		prenom: "Thomas",
		nom: "Candidat",
		ecole: "Programme Grande École (M1)",
		provider: "demo",
		creeLe: (/* @__PURE__ */ new Date()).toISOString(),
		dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
	};
	setCompteActif(utilisateur);
	return utilisateur;
}
/**
* Module Workflow de Candidature — NACORA
* Gestion du lifecycle d'une opportunité :
* Sauvegardée -> À préparer -> Candidature envoyée -> Relance -> Entretien -> Deuxième entretien -> Offre reçue -> Acceptée / Refusée
*/
var WORKFLOW_STEPS_CONFIG = [
	{
		key: "saved",
		label: "Sauvegardée",
		shortLabel: "Sauvegardée",
		statutLabel: "Sauvegardée",
		category: "opportunite",
		description: "Opportunité ajoutée et conservée dans NACORA",
		defaultActionLabel: "Préparer ma candidature",
		nextStepKey: "to_prepare",
		badgeColor: "bg-muted text-muted-foreground border-border"
	},
	{
		key: "to_prepare",
		label: "À préparer",
		shortLabel: "À préparer",
		statutLabel: "À préparer",
		category: "opportunite",
		description: "Ciblage, adaptation du CV et préparation des arguments",
		defaultActionLabel: "Marquer comme envoyée",
		nextStepKey: "application_sent",
		badgeColor: "bg-primary/10 text-primary border-primary/20"
	},
	{
		key: "application_sent",
		label: "Candidature envoyée",
		shortLabel: "Envoyée",
		statutLabel: "Candidature envoyée",
		category: "demarche",
		description: "Dossier de candidature transmis à l'entreprise",
		defaultActionLabel: "Planifier une relance",
		nextStepKey: "follow_up",
		badgeColor: "bg-accent text-accent-foreground border-primary/30"
	},
	{
		key: "follow_up",
		label: "Relance",
		shortLabel: "Relance",
		statutLabel: "Relancée",
		category: "demarche",
		description: "Relance planifiée ou effectuée auprès du recruteur",
		defaultActionLabel: "Ajouter un entretien",
		nextStepKey: "interview",
		badgeColor: "bg-primary/20 text-primary border-primary/40"
	},
	{
		key: "interview",
		label: "Entretien",
		shortLabel: "Entretien 1",
		statutLabel: "Entretien",
		category: "entretien",
		description: "Premier entretien de recrutement (RH / Manager)",
		defaultActionLabel: "Programmer un 2e entretien",
		nextStepKey: "second_interview",
		badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
	},
	{
		key: "second_interview",
		label: "Deuxième entretien",
		shortLabel: "Entretien 2",
		statutLabel: "Deuxième entretien",
		category: "entretien",
		description: "Entretien approfondi, technique ou rencontre avec la direction",
		defaultActionLabel: "Marquer offre reçue",
		nextStepKey: "offer_received",
		badgeColor: "bg-emerald-500/25 text-emerald-400 border-emerald-500/40"
	},
	{
		key: "offer_received",
		label: "Offre reçue",
		shortLabel: "Offre reçue",
		statutLabel: "Offre reçue",
		category: "decision",
		description: "Proposition d'embauche ou contrat de travail reçu",
		defaultActionLabel: "Marquer comme acceptée",
		nextStepKey: "accepted",
		badgeColor: "bg-emerald-500/30 text-emerald-300 border-emerald-500/50"
	},
	{
		key: "accepted",
		label: "Acceptée",
		shortLabel: "Acceptée",
		statutLabel: "Acceptée",
		category: "decision",
		description: "Offre acceptée et contrat validé !",
		defaultActionLabel: "Offre acceptée",
		isTerminal: true,
		terminalType: "success",
		badgeColor: "bg-emerald-500/30 text-emerald-300 border-emerald-400/60 font-semibold"
	},
	{
		key: "rejected",
		label: "Refusée",
		shortLabel: "Refusée",
		statutLabel: "Refusée",
		category: "decision",
		description: "Candidature déclinée ou non retenue",
		defaultActionLabel: "Candidature clôturée",
		isTerminal: true,
		terminalType: "failure",
		badgeColor: "bg-destructive/15 text-destructive border-destructive/30"
	}
];
var CHANNELS_COMMUNICATION = [
	"JobTeaser",
	"LinkedIn",
	"Welcome to the Jungle",
	"Indeed",
	"Site entreprise",
	"Email direct",
	"Candidature spontanée",
	"Réseau / Recommandation",
	"Autre"
];
var TYPES_ENTRETIEN = [
	"Visio (Teams, Meet, Zoom)",
	"Présentiel",
	"Téléphonique",
	"Autre"
];
/** Retrouve la configuration d'une étape par sa clé. */
function getWorkflowStepConfig(key) {
	return WORKFLOW_STEPS_CONFIG.find((s) => s.key === key) ?? WORKFLOW_STEPS_CONFIG[0];
}
/** Convertit un statut texte en clé d'étape du workflow. */
function statutToWorkflowStepKey(statut) {
	if (!statut) return "saved";
	const s = statut.trim().toLowerCase();
	if (s.includes("refus") || s.includes("clôtur") || s.includes("sans réponse")) return "rejected";
	if (s.includes("accept")) return "accepted";
	if (s.includes("offre")) return "offer_received";
	if (s.includes("deuxième") || s.includes("2e entretien") || s.includes("second")) return "second_interview";
	if (s.includes("entretien")) return "interview";
	if (s.includes("relanc")) return "follow_up";
	if (s.includes("envoy") || s.includes("postul")) return "application_sent";
	if (s === "à candidater" || s.includes("candidater")) return "to_prepare";
	if (s.includes("candidat")) return "application_sent";
	if (s.includes("prépar") || s.includes("étudier")) return "to_prepare";
	return "saved";
}
/** Convertit une clé d'étape en Statut officiel NACORA. */
function workflowStepKeyToStatut(key) {
	return getWorkflowStepConfig(key).statutLabel;
}
/**
* Migration transparente : garantit qu'une opportunité existante dispose
* toujours d'une liste d'événements et d'une étape actuelle cohérentes.
*/
function buildInitialWorkflowEvents(params) {
	const currentStep = statutToWorkflowStepKey(params.statut);
	const events = [];
	const today = todayIso();
	const savedDate = params.savedAt || params.dateEnvoi || today;
	events.push({
		id: "evt-saved",
		type: "saved",
		date: savedDate,
		note: "Opportunité ajoutée à NACORA",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (currentStep === "to_prepare") events.push({
		id: "evt-prep",
		type: "to_prepare",
		date: today,
		note: "Préparation de la candidature en cours",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const sendDate = params.appliedAt || params.dateEnvoi;
	const isSentOrBeyond = [
		"application_sent",
		"follow_up",
		"interview",
		"second_interview",
		"offer_received",
		"accepted"
	].includes(currentStep);
	if (sendDate || isSentOrBeyond) events.push({
		id: "evt-applied",
		type: "application_sent",
		date: sendDate || savedDate,
		channel: params.source || "JobTeaser",
		note: "Candidature transmise à l'entreprise",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	const relanceDate = params.followUpDate || params.dateRelance;
	if (relanceDate || currentStep === "follow_up") events.push({
		id: "evt-followup",
		type: "follow_up",
		date: relanceDate || today,
		note: "Relance planifiée auprès de l'entreprise",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (currentStep === "interview" || currentStep === "second_interview" || currentStep === "offer_received" || currentStep === "accepted" || Boolean(params.interviewDate)) events.push({
		id: "evt-interview",
		type: "interview",
		date: params.interviewDate || params.dateDernierContact || today,
		interviewType: "Visio (Teams, Meet, Zoom)",
		interlocuteur: params.contact || void 0,
		note: "Premier échange de recrutement",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (currentStep === "second_interview" || params.secondInterviewDate) events.push({
		id: "evt-second-interview",
		type: "second_interview",
		date: params.secondInterviewDate || params.dateDernierContact || today,
		interviewType: "Visio (Teams, Meet, Zoom)",
		interlocuteur: params.contact || void 0,
		note: "Deuxième entretien approfondi",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (currentStep === "offer_received" || params.offerReceivedAt) events.push({
		id: "evt-offer",
		type: "offer_received",
		date: params.offerReceivedAt || today,
		note: "Proposition d'embauche reçue",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (currentStep === "accepted" || params.acceptedAt) events.push({
		id: "evt-accepted",
		type: "accepted",
		date: params.acceptedAt || today,
		note: "Offre acceptée et contrat validé",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (currentStep === "rejected" || params.rejectedAt) events.push({
		id: "evt-rejected",
		type: "rejected",
		date: params.rejectedAt || today,
		note: "Candidature non retenue",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	return {
		currentStep,
		events
	};
}
/** Synchronise les champs de dates dérivés d'après les événements du workflow. */
function extractDatesFromWorkflowEvents(events) {
	const getLatestDate = (type) => {
		const matches = events.filter((e) => e.type === type && e.date);
		if (!matches.length) return null;
		return matches[matches.length - 1]?.date ?? null;
	};
	const interviewDate = getLatestDate("interview");
	const secondInterviewDate = getLatestDate("second_interview");
	const followUpDate = getLatestDate("follow_up");
	const appliedAt = getLatestDate("application_sent");
	const lastContactDate = secondInterviewDate || interviewDate || followUpDate || appliedAt || null;
	return {
		savedAt: getLatestDate("saved"),
		preparedAt: getLatestDate("to_prepare"),
		appliedAt,
		followUpDate,
		interviewDate,
		secondInterviewDate,
		offerReceivedAt: getLatestDate("offer_received"),
		acceptedAt: getLatestDate("accepted"),
		rejectedAt: getLatestDate("rejected"),
		lastContactDate
	};
}
/**
* SOURCE UNIQUE DE VÉRITÉ POUR LES TRANSITIONS DE STATUT & KANBAN (Sections 3, 5, 6, 24, 25).
* Déplace une opportunité vers une nouvelle étape en mettant à jour en un seul endroit :
* - currentWorkflowStep (clé d'étape canonique)
* - currentStage (libellé d'étape visible, ex: "À préparer", "Candidature envoyée")
* - statut et status (compatibilité générale)
* - workflowEvents (ajout de l'événement daté et documenté)
* - dates spécifiques de l'étape (dateEnvoi, followUpDate, interviewDate, etc.)
*/
function transitionWorkflowStep(candidature, targetStepKey, options) {
	const targetConfig = getWorkflowStepConfig(targetStepKey);
	const newStatut = targetConfig.statutLabel;
	const stepDate = options?.date || todayIso();
	const currentStepKey = candidature.currentWorkflowStep || statutToWorkflowStepKey(candidature.currentStage || candidature.statut);
	const prevConfig = getWorkflowStepConfig(currentStepKey);
	const defaultNote = currentStepKey !== targetStepKey ? `Étape modifiée depuis « ${prevConfig.label} »` : targetConfig.description;
	const newEvent = {
		id: `evt-${targetStepKey}-${Date.now()}`,
		type: targetStepKey,
		date: stepDate,
		note: options?.note && options.note.trim() || defaultNote,
		channel: targetStepKey === "application_sent" ? options?.channel || candidature.source : void 0,
		interviewType: targetStepKey === "interview" || targetStepKey === "second_interview" ? options?.interviewType : void 0,
		interlocuteur: targetStepKey === "interview" || targetStepKey === "second_interview" ? options?.interlocuteur || candidature.contact : void 0,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const updatedEvents = [...(candidature.workflowEvents || []).filter((e) => e.type !== targetStepKey), newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	const patch = {
		currentWorkflowStep: targetStepKey,
		currentStage: targetConfig.statutLabel,
		statut: newStatut,
		status: newStatut,
		workflowEvents: updatedEvents
	};
	if (targetStepKey === "saved") patch.savedAt = stepDate;
	else if (targetStepKey === "to_prepare") patch.preparedAt = stepDate;
	else if (targetStepKey === "application_sent") {
		patch.appliedAt = stepDate;
		patch.dateEnvoi = stepDate;
		if (options?.channel) patch.source = options.channel;
	} else if (targetStepKey === "follow_up") {
		patch.followUpDate = stepDate;
		patch.dateRelance = stepDate;
	} else if (targetStepKey === "interview") {
		patch.interviewDate = stepDate;
		patch.dateDernierContact = stepDate;
		patch.lastContactDate = stepDate;
		if (options?.interlocuteur?.trim()) patch.contact = options.interlocuteur.trim();
	} else if (targetStepKey === "second_interview") {
		patch.secondInterviewDate = stepDate;
		patch.dateDernierContact = stepDate;
		patch.lastContactDate = stepDate;
		if (options?.interlocuteur?.trim()) patch.contact = options.interlocuteur.trim();
	} else if (targetStepKey === "offer_received") patch.offerReceivedAt = stepDate;
	else if (targetStepKey === "accepted") patch.acceptedAt = stepDate;
	else if (targetStepKey === "rejected") patch.rejectedAt = stepDate;
	return patch;
}
var STATUTS_OPPORTUNITE = [
	"Sauvegardée",
	"À préparer",
	"À étudier",
	"À candidater"
];
var STATUTS_CANDIDATURE = [
	"Candidature envoyée",
	"Relancée",
	"Entretien",
	"Deuxième entretien",
	"Offre reçue",
	"Acceptée",
	"Refusée",
	"Sans réponse",
	"Clôturée"
];
var STATUTS = [...STATUTS_OPPORTUNITE, ...STATUTS_CANDIDATURE];
function emptyPreparation() {
	return {
		pourquoiEntreprise: "",
		pourquoiPoste: "",
		notes: ""
	};
}
var STORAGE_KEY = "neoma-suivi-stage-v1";
function emptyCandidature() {
	return {
		id: crypto.randomUUID(),
		entreprise: "",
		poste: "",
		statut: "Sauvegardée",
		lieu: "",
		lien: "",
		contact: "",
		contactId: null,
		contactIds: [],
		dateEnvoi: "",
		dateRelance: "",
		dateDernierContact: "",
		dateLimite: "",
		commentaire: "",
		missions: "",
		profilRecherche: "",
		modalites: "",
		detail: "",
		priorite: "auto",
		source: "",
		secteur: "",
		archive: false,
		preparation: emptyPreparation(),
		workflowProgress: {
			currentStep: "offre",
			completedSteps: ["offre"]
		},
		title: "",
		company: "",
		location: "",
		country: null,
		contractType: null,
		duration: null,
		startDate: null,
		endDate: null,
		salary: null,
		salaryMin: null,
		salaryMax: null,
		salaryCurrency: null,
		remotePolicy: null,
		remoteDetails: null,
		applicationDeadline: null,
		jobFunction: null,
		educationLevel: null,
		sourceUrl: null,
		missionsList: [],
		responsibilities: [],
		requiredSkills: [],
		preferredSkills: [],
		tools: [],
		requiredLanguages: [],
		preferredLanguages: [],
		qualities: [],
		experienceRequirements: null,
		educationRequirements: [],
		companyId: null,
		companyName: null,
		parentCompany: null,
		groupName: null,
		companyDescription: null,
		companySector: null,
		companySize: null,
		companyLocation: null,
		companyWebsite: null,
		companyContext: [],
		companyPartners: [],
		companyMetrics: [],
		recruitmentProcess: [],
		applicationMethod: null,
		applicationRequirements: [],
		benefits: [],
		sourceType: null,
		sourceName: null,
		sourcePublishedAt: null,
		extractedAt: null,
		status: "Sauvegardée",
		appliedAt: null,
		followUpDate: null,
		lastContactDate: null,
		personalNotes: "",
		currentWorkflowStep: "saved",
		workflowEvents: [{
			id: crypto.randomUUID(),
			type: "saved",
			date: todayIso(),
			note: "Opportunité ajoutée à NACORA",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}],
		savedAt: todayIso(),
		preparedAt: null,
		interviewDate: null,
		secondInterviewDate: null,
		offerReceivedAt: null,
		acceptedAt: null,
		rejectedAt: null
	};
}
/** Sépare intelligemment les blocs structurés (missions, profil, modalités) du texte brut de l'offre si présent. */
function extraireSectionsDetail(detail) {
	if (!detail) return {
		missions: "",
		profilRecherche: "",
		modalites: "",
		detailNettoye: ""
	};
	if (!/🎯|\bMissions?\s*(?:cl[ée]s?|principales?)|\bProfil(?:\s*&|\s*et)?\s*Comp[ée]tences?|👤|\bModalit[ée]s?\s*:|ℹ️/i.test(detail)) return {
		missions: "",
		profilRecherche: "",
		modalites: "",
		detailNettoye: detail
	};
	let missions = "";
	let profilRecherche = "";
	let modalites = "";
	const autresLignes = [];
	const blocs = detail.split(/\n(?=(?:🎯|👤|ℹ️|\*{1,2}\s*(?:Missions?|Profil|Modalit[ée]s?)))/i);
	for (const bloc of blocs) {
		const b = bloc.trim();
		if (!b) continue;
		if (/^(?:🎯|\*{0,2}\s*🎯|\*{0,2}\s*Missions?\s*cl[ée]s?)/i.test(b)) missions = b.replace(/^(?:🎯\s*)?(?:\*{1,2})?Missions?\s*cl[ée]s?\s*:?(?:\*{1,2})?\s*\n?/i, "").trim();
		else if (/^(?:👤|\*{0,2}\s*👤|\*{0,2}\s*Profil(?:\s*&|\s*et)?\s*Comp[ée]tences?)/i.test(b)) profilRecherche = b.replace(/^(?:👤\s*)?(?:\*{1,2})?Profil(?:\s*&|\s*et)?\s*Comp[ée]tences?\s*(?:recherch[ée]s?)?\s*:?(?:\*{1,2})?\s*\n?/i, "").trim();
		else if (/^(?:ℹ️|\*{0,2}\s*ℹ️|\*{0,2}\s*Modalit[ée]s?)/i.test(b)) modalites = b.replace(/^(?:ℹ️\s*)?(?:\*{1,2})?Modalit[ée]s?\s*:?(?:\*{1,2})?\s*\n?/i, "").trim();
		else autresLignes.push(b);
	}
	return {
		missions,
		profilRecherche,
		modalites,
		detailNettoye: autresLignes.join("\n\n").trim()
	};
}
/** Complète une candidature / opportunité venant du localStorage, cloud ou de l'extraction IA. */
function normalizeCandidature(c) {
	const base = emptyCandidature();
	let missions = "";
	if (typeof c.missions === "string") missions = c.missions;
	else if (Array.isArray(c.missions)) missions = c.missions.map((m) => String(m ?? "").trim()).filter(Boolean).map((m) => `• ${m}`).join("\n");
	let profilRecherche = typeof c.profilRecherche === "string" ? c.profilRecherche : "";
	let modalites = typeof c.modalites === "string" ? c.modalites : "";
	let detail = typeof c.detail === "string" ? c.detail : "";
	if ((!missions || !profilRecherche) && detail) {
		const extraits = extraireSectionsDetail(detail);
		if (extraits.missions || extraits.profilRecherche || extraits.modalites) {
			missions = missions || extraits.missions;
			profilRecherche = profilRecherche || extraits.profilRecherche;
			modalites = modalites || extraits.modalites;
			detail = extraits.detailNettoye;
		}
	}
	const poste = c.poste || c.title || base.poste;
	const title = c.title || c.poste || base.title;
	const companyId = c.companyId || null;
	const entreprise = c.entreprise || c.company || c.companyName || base.entreprise;
	const company = c.company || c.companyName || c.entreprise || base.company;
	const companyName = c.companyName || c.company || c.entreprise || base.companyName;
	const lieu = c.lieu || c.location || base.lieu;
	const location = c.location || c.lieu || base.location;
	const lien = c.lien || c.sourceUrl || base.lien;
	const sourceUrl = c.sourceUrl || c.lien || base.sourceUrl;
	const dateLimite = c.dateLimite || c.applicationDeadline || base.dateLimite;
	const applicationDeadline = c.applicationDeadline || c.dateLimite || null;
	const dateEnvoi = c.dateEnvoi || c.appliedAt || base.dateEnvoi;
	const appliedAt = c.appliedAt || c.dateEnvoi || null;
	const dateRelance = c.dateRelance || c.followUpDate || base.dateRelance;
	const followUpDate = c.followUpDate || c.dateRelance || null;
	const dateDernierContact = c.dateDernierContact || c.lastContactDate || base.dateDernierContact;
	const lastContactDate = c.lastContactDate || c.dateDernierContact || null;
	const commentaire = c.commentaire || c.personalNotes || base.commentaire;
	const personalNotes = c.personalNotes || c.commentaire || base.personalNotes;
	c.contactEmail;
	c.contactPhone;
	const statutRaw = c.statut || c.status || base.statut;
	const statut = STATUTS.includes(statutRaw) ? statutRaw : "Sauvegardée";
	const missionsList = Array.isArray(c.missionsList) && c.missionsList.length > 0 ? c.missionsList.map((m) => String(m ?? "").trim()).filter(Boolean) : Array.isArray(c.missions) && c.missions.length > 0 ? c.missions.map((m) => String(m ?? "").trim()).filter(Boolean) : typeof missions === "string" && missions.trim().length > 0 ? missions.split("\n").map((m) => m.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean) : [];
	if (!missions && missionsList.length > 0) missions = missionsList.map((m) => `• ${m}`).join("\n");
	const requiredSkills = Array.isArray(c.requiredSkills) ? c.requiredSkills : [];
	const preferredSkills = Array.isArray(c.preferredSkills) ? c.preferredSkills : [];
	const tools = Array.isArray(c.tools) ? c.tools : [];
	const qualities = Array.isArray(c.qualities) ? c.qualities : [];
	if (!profilRecherche && (requiredSkills.length > 0 || tools.length > 0)) {
		const parts = [];
		if (requiredSkills.length > 0) parts.push(`Compétences requises : ${requiredSkills.join(", ")}`);
		if (preferredSkills.length > 0) parts.push(`Compétences appréciées : ${preferredSkills.join(", ")}`);
		if (tools.length > 0) parts.push(`Outils : ${tools.join(", ")}`);
		if (qualities.length > 0) parts.push(`Qualités : ${qualities.join(", ")}`);
		profilRecherche = parts.join("\n");
	}
	const initialWorkflow = buildInitialWorkflowEvents({
		statut,
		savedAt: c.savedAt || c.extractedAt || dateEnvoi,
		appliedAt,
		dateEnvoi,
		followUpDate,
		dateRelance,
		interviewDate: c.interviewDate || dateDernierContact,
		secondInterviewDate: c.secondInterviewDate,
		dateDernierContact,
		offerReceivedAt: c.offerReceivedAt,
		acceptedAt: c.acceptedAt,
		rejectedAt: c.rejectedAt,
		contact: c.contact,
		source: c.source || c.sourceName,
		personalNotes,
		commentaire
	});
	const workflowEvents = Array.isArray(c.workflowEvents) && c.workflowEvents.length > 0 ? c.workflowEvents : initialWorkflow.events;
	const currentWorkflowStep = c.currentWorkflowStep || initialWorkflow.currentStep || statutToWorkflowStepKey(statut);
	const syncedDates = extractDatesFromWorkflowEvents(workflowEvents);
	return {
		...base,
		...c,
		id: c.id ?? base.id,
		companyId: companyId || c.companyId || null,
		entreprise,
		company,
		companyName,
		poste,
		title,
		statut,
		status: statut,
		currentStage: c.currentStage || statut,
		currentWorkflowStep,
		workflowEvents,
		lieu,
		location,
		lien,
		sourceUrl,
		dateLimite,
		applicationDeadline,
		dateEnvoi: dateEnvoi || syncedDates.appliedAt || "",
		appliedAt: appliedAt || syncedDates.appliedAt || null,
		dateRelance: dateRelance || syncedDates.followUpDate || "",
		followUpDate: followUpDate || syncedDates.followUpDate || null,
		dateDernierContact: dateDernierContact || syncedDates.lastContactDate || "",
		lastContactDate: lastContactDate || syncedDates.lastContactDate || null,
		savedAt: c.savedAt || syncedDates.savedAt || base.savedAt,
		preparedAt: c.preparedAt || syncedDates.preparedAt || null,
		interviewDate: c.interviewDate || syncedDates.interviewDate || null,
		secondInterviewDate: c.secondInterviewDate || syncedDates.secondInterviewDate || null,
		offerReceivedAt: c.offerReceivedAt || syncedDates.offerReceivedAt || null,
		acceptedAt: c.acceptedAt || syncedDates.acceptedAt || null,
		rejectedAt: c.rejectedAt || syncedDates.rejectedAt || null,
		commentaire,
		personalNotes,
		missions,
		missionsList,
		profilRecherche,
		modalites,
		detail,
		priorite: c.priorite ?? "auto",
		source: c.source ?? c.sourceName ?? "",
		secteur: c.secteur ?? c.companySector ?? "",
		archive: c.archive ?? false,
		preparation: {
			...emptyPreparation(),
			...c.preparation ?? {}
		},
		workflowProgress: c.workflowProgress ?? {
			currentStep: "offre",
			completedSteps: ["offre"]
		},
		country: c.country ?? c.pays ?? base.country,
		contractType: c.contractType ?? c.contract_type ?? c.typeContrat ?? base.contractType,
		duration: c.duration ?? c.duree ?? c.contract_duration ?? base.duration,
		startDate: c.startDate ?? c.start_date ?? c.dateDebut ?? base.startDate,
		endDate: c.endDate ?? c.end_date ?? c.dateFin ?? base.endDate,
		salary: c.salary ?? c.salaire ?? base.salary,
		salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : typeof c.salary_min === "number" ? c.salary_min : base.salaryMin,
		salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : typeof c.salary_max === "number" ? c.salary_max : base.salaryMax,
		salaryCurrency: c.salaryCurrency ?? c.salary_currency ?? base.salaryCurrency,
		remotePolicy: c.remotePolicy ?? c.remote_policy ?? c.teletravail ?? base.remotePolicy,
		remoteDetails: c.remoteDetails ?? c.remote_details ?? base.remoteDetails,
		jobFunction: c.jobFunction ?? c.job_function ?? base.jobFunction,
		educationLevel: c.educationLevel ?? c.education_level ?? base.educationLevel,
		responsibilities: Array.isArray(c.responsibilities) ? c.responsibilities : base.responsibilities,
		requiredSkills,
		preferredSkills,
		tools,
		requiredLanguages: Array.isArray(c.requiredLanguages) ? c.requiredLanguages : Array.isArray(c.required_languages) ? c.required_languages : base.requiredLanguages,
		preferredLanguages: Array.isArray(c.preferredLanguages) ? c.preferredLanguages : Array.isArray(c.preferred_languages) ? c.preferred_languages : base.preferredLanguages,
		qualities,
		experienceRequirements: c.experienceRequirements ?? c.experience_requirements ?? base.experienceRequirements,
		educationRequirements: Array.isArray(c.educationRequirements) ? c.educationRequirements : Array.isArray(c.education_requirements) ? c.education_requirements : base.educationRequirements,
		parentCompany: c.parentCompany ?? c.groupName ?? c.parent_company ?? c.group_name ?? base.parentCompany,
		groupName: c.groupName ?? c.parentCompany ?? c.group_name ?? c.parent_company ?? base.groupName,
		companyDescription: c.companyDescription ?? c.company_description ?? base.companyDescription,
		companySector: c.companySector ?? c.secteur ?? c.company_sector ?? base.companySector,
		companySize: c.companySize ?? c.company_size ?? base.companySize,
		companyLocation: c.companyLocation ?? c.company_location ?? base.companyLocation,
		companyWebsite: c.companyWebsite ?? c.company_website ?? base.companyWebsite,
		companyContext: Array.isArray(c.companyContext) ? c.companyContext : Array.isArray(c.company_context) ? c.company_context : base.companyContext,
		companyPartners: Array.isArray(c.companyPartners) ? c.companyPartners : Array.isArray(c.company_partners) ? c.company_partners : base.companyPartners,
		companyMetrics: Array.isArray(c.companyMetrics) ? c.companyMetrics : Array.isArray(c.company_metrics) ? c.company_metrics : base.companyMetrics,
		recruitmentProcess: Array.isArray(c.recruitmentProcess) ? c.recruitmentProcess : Array.isArray(c.recruitment_process) ? c.recruitment_process : base.recruitmentProcess,
		applicationMethod: c.applicationMethod ?? c.application_method ?? base.applicationMethod,
		applicationRequirements: Array.isArray(c.applicationRequirements) ? c.applicationRequirements : Array.isArray(c.application_requirements) ? c.application_requirements : base.applicationRequirements,
		benefits: Array.isArray(c.benefits) ? c.benefits : Array.isArray(c.avantages) ? c.avantages : base.benefits,
		sourceType: c.sourceType ?? c.source_type ?? base.sourceType,
		sourceName: c.sourceName ?? c.source ?? c.source_name ?? base.sourceName,
		sourcePublishedAt: c.sourcePublishedAt ?? c.source_published_at ?? base.sourcePublishedAt,
		extractedAt: c.extractedAt ?? c.extracted_at ?? base.extractedAt
	};
}
/**
* Calcule si une opportunité a une deadline dépassée.
* Règle métier (Sections 8, 9, 10, 11, 12, 13) :
* - Une date limite de candidature existe (applicationDeadline ou dateLimite).
* - Cette date est strictement passée (< todayIso).
* - L'opportunité n'a pas encore été engagée/traitée (ex: encore en Sauvegardée ou À préparer).
* - Si elle est déjà en "Candidature envoyée", "Relance", "Entretien", "Deuxième entretien",
*   "Offre reçue", "Acceptée", "Refusée", elle reste dans son étape normale et n'apparaît JAMAIS
*   dans "Deadline dépassée".
* - Si applicationDeadline est absente / null, elle n'apparaît JAMAIS dans "Deadline dépassée".
*
* NOTE ARCHITECTURE :
* Deadline dépassée est un ÉTAT CALCULÉ et non un currentStage.
*/
function isDeadlineOverdue(c, today = todayIso()) {
	const deadlineRaw = (c.applicationDeadline || c.dateLimite || "").trim();
	if (!deadlineRaw) return false;
	const match = deadlineRaw.match(/^(\d{4}-\d{2}-\d{2})/);
	const deadlineDate = match ? match[1] : deadlineRaw.slice(0, 10);
	if (!deadlineDate || deadlineDate.length !== 10) return false;
	if (deadlineDate >= today) return false;
	const stage = (c.currentStage || c.statut || c.currentWorkflowStep || "").trim().toLowerCase();
	if (stage.includes("envoy") || stage.includes("postul") || stage.includes("relanc") || stage.includes("entretien") || stage.includes("offre") || stage.includes("accept") || stage.includes("refus") || stage.includes("sans réponse") || stage.includes("clôtur") || stage.includes("application_sent") || stage.includes("follow_up") || stage.includes("interview") || stage.includes("second_interview") || stage.includes("offer_received") || stage.includes("rejected")) return false;
	if (stage === "à candidater" && (c.dateEnvoi || c.appliedAt)) return false;
	return true;
}
/**
* Règle absolue (Section 14) : Aucune perte de données entre Preview et Sauvegarde.
* Compare l'état de prévisualisation et l'objet final destiné à la persistance,
* restaurant automatiquement toute information présente dans la prévisualisation.
*/
function validerIntegriteCandidature(preview, cible) {
	const safe = { ...cible };
	if (Array.isArray(preview.companyMetrics) && preview.companyMetrics.length > 0 && (!Array.isArray(safe.companyMetrics) || safe.companyMetrics.length === 0)) safe.companyMetrics = [...preview.companyMetrics];
	if (preview.contractType && !safe.contractType) safe.contractType = preview.contractType;
	if (preview.duration && !safe.duration) safe.duration = preview.duration;
	if (preview.startDate && !safe.startDate) safe.startDate = preview.startDate;
	if (preview.endDate && !safe.endDate) safe.endDate = preview.endDate;
	if (preview.salary && !safe.salary) safe.salary = preview.salary;
	if (Array.isArray(preview.missionsList) && preview.missionsList.length > 0 && (!Array.isArray(safe.missionsList) || safe.missionsList.length === 0)) safe.missionsList = [...preview.missionsList];
	if (Array.isArray(preview.requiredSkills) && preview.requiredSkills.length > 0 && (!Array.isArray(safe.requiredSkills) || safe.requiredSkills.length === 0)) safe.requiredSkills = [...preview.requiredSkills];
	if (Array.isArray(preview.tools) && preview.tools.length > 0 && (!Array.isArray(safe.tools) || safe.tools.length === 0)) safe.tools = [...preview.tools];
	if (Array.isArray(preview.qualities) && preview.qualities.length > 0 && (!Array.isArray(safe.qualities) || safe.qualities.length === 0)) safe.qualities = [...preview.qualities];
	if (Array.isArray(preview.companyContext) && preview.companyContext.length > 0 && (!Array.isArray(safe.companyContext) || safe.companyContext.length === 0)) safe.companyContext = [...preview.companyContext];
	if (Array.isArray(preview.companyPartners) && preview.companyPartners.length > 0 && (!Array.isArray(safe.companyPartners) || safe.companyPartners.length === 0)) safe.companyPartners = [...preview.companyPartners];
	if (Array.isArray(preview.benefits) && preview.benefits.length > 0 && (!Array.isArray(safe.benefits) || safe.benefits.length === 0)) safe.benefits = [...preview.benefits];
	if (Array.isArray(preview.recruitmentProcess) && preview.recruitmentProcess.length > 0 && (!Array.isArray(safe.recruitmentProcess) || safe.recruitmentProcess.length === 0)) safe.recruitmentProcess = [...preview.recruitmentProcess];
	if (Array.isArray(preview.applicationRequirements) && preview.applicationRequirements.length > 0 && (!Array.isArray(safe.applicationRequirements) || safe.applicationRequirements.length === 0)) safe.applicationRequirements = [...preview.applicationRequirements];
	if (preview.companyDescription && !safe.companyDescription) safe.companyDescription = preview.companyDescription;
	if (preview.companyWebsite && !safe.companyWebsite) safe.companyWebsite = preview.companyWebsite;
	console.info("[PREVIEW VALIDATION] Validation d'intégrité Preview <-> Sauvegarde réussie:", {
		poste: safe.poste,
		entreprise: safe.entreprise,
		contractType: safe.contractType,
		duration: safe.duration,
		startDate: safe.startDate,
		metricsCount: safe.companyMetrics.length,
		missionsCount: safe.missionsList.length,
		skillsCount: safe.requiredSkills.length
	});
	return safe;
}
/**
* Détection des doublons d'opportunité dans NACORA
* Compare raisonnablement URL, entreprise, titre, localisation
*/
function findPotentialDuplicate(candidate, existingList) {
	if (!existingList || existingList.length === 0) return null;
	const normalizeStr = (s) => (s || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
	const cUrl = (candidate.lien || candidate.sourceUrl || "").trim();
	const cEnt = normalizeStr(candidate.entreprise || candidate.company);
	const cPos = normalizeStr(candidate.poste || candidate.title);
	for (const item of existingList) {
		if (candidate.id && item.id === candidate.id) continue;
		const iUrl = (item.lien || item.sourceUrl || "").trim();
		if (cUrl && iUrl && cUrl.length > 12 && (cUrl === iUrl || cUrl.split("?")[0] === iUrl.split("?")[0])) return item;
		const iEnt = normalizeStr(item.entreprise || item.company);
		const iPos = normalizeStr(item.poste || item.title);
		if (cEnt && iEnt && (cEnt === iEnt || cEnt.includes(iEnt) || iEnt.includes(cEnt))) {
			if (cPos && iPos && (cPos === iPos || cPos.includes(iPos) || iPos.includes(cPos))) return item;
		}
	}
	return null;
}
function addDays(date, days) {
	if (!date) return "";
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return "";
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}
function todayIso() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function formatDate(date) {
	if (!date) return "—";
	const [y, m, d] = date.split("-");
	if (!y || !m || !d) return "—";
	return `${d}/${m}/${y}`;
}
var seed = (c) => normalizeCandidature(c);
seed({
	id: "seed-1",
	entreprise: "Nom entreprise 1",
	poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
	statut: "Sauvegardée",
	lieu: "Paris 15e",
	lien: "https://",
	contact: "M. Dupont - email@email.fr",
	commentaire: "Envoyer une lettre de motivation personnalisée",
	source: "LinkedIn",
	detail: "Vous pouvez copier/coller ici le détail de l'offre car elle peut être supprimée du site web."
}), seed({
	id: "seed-2",
	entreprise: "Nom entreprise 2",
	poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
	statut: "Candidature envoyée",
	lieu: "Paris 15e",
	lien: "https://",
	dateEnvoi: "2023-02-09",
	dateRelance: "2023-02-19",
	dateDernierContact: "2023-02-09",
	commentaire: "Offre très intéressante car ...",
	source: "Welcome to the Jungle"
}), seed({
	id: "seed-3",
	entreprise: "Nom entreprise 3",
	poste: "Commerce de gros — fournitures pour la plomberie et le chauffage",
	statut: "Relancée",
	lieu: "Paris 15e",
	lien: "https://",
	contact: "M. Dupont - email@email.fr - 0600000000",
	dateEnvoi: "2023-02-01",
	dateRelance: "2023-02-13",
	dateDernierContact: "2023-04-13",
	commentaire: "Candidature spontanée",
	source: "Candidature spontanée"
}), seed({
	id: "seed-4",
	entreprise: "Nom entreprise 4",
	poste: "Assistant relation franchise (F/H) en alternance (H/F)",
	statut: "Entretien",
	lieu: "Saint Herblain",
	lien: "https://",
	dateEnvoi: "2023-01-25",
	dateRelance: "2023-02-03",
	dateDernierContact: "2023-02-03",
	commentaire: "Entretien prévu le JJ/MM/AAAA",
	source: "JobTeaser"
}), seed({
	id: "seed-5",
	entreprise: "Nom entreprise 5",
	poste: "Assistant relation franchise (F/H) en alternance (H/F)",
	statut: "Refusée",
	lieu: "Marseille",
	lien: "https://",
	contact: "M. Dupont - 0132520000",
	dateEnvoi: "2023-01-05",
	dateRelance: "2023-01-15",
	dateDernierContact: "2023-02-12",
	commentaire: "L'entreprise ne recrute plus d'alternant pour cette année",
	source: "Indeed"
}), seed({
	id: "seed-6",
	entreprise: "Nom entreprise 6",
	poste: "Assistant relation franchise (F/H) en alternance (H/F)",
	statut: "Sans réponse",
	lieu: "Marseille",
	lien: "https://",
	contact: "M. Dupont - 0132520000",
	dateEnvoi: "2023-01-05",
	dateRelance: "2023-01-15",
	dateDernierContact: "2023-01-15",
	commentaire: "Aucune réponse à ce jour",
	source: "Site entreprise"
});
function getStorageKey(userId) {
	return userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY;
}
function loadCandidatures(userId) {
	if (typeof window === "undefined") return [];
	try {
		const key = getStorageKey(userId);
		let raw = window.localStorage.getItem(key);
		if (!raw && userId) raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map(normalizeCandidature) : [];
	} catch {
		return [];
	}
}
function saveCandidatures(items, userId) {
	if (typeof window === "undefined") return;
	try {
		const key = getStorageKey(userId);
		window.localStorage.setItem(key, JSON.stringify(items));
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch (err) {
		console.warn("Erreur écriture localStorage saveCandidatures:", err);
	}
}
/** Carnet de contacts : types, normalisation, déduplication et imports (vCard, LinkedIn, Opportunités). */
var TYPES_CONTACT = [
	"Recruteur",
	"RH",
	"Manager",
	"Ancien élève",
	"Contact professionnel",
	"Rencontré en entretien"
];
var CATEGORIES_CONTACT = [
	"Recruteur / RH",
	"Alumni",
	"Étudiant / en recherche",
	"Professionnel du secteur ciblé",
	"Professionnel hors secteur ciblé",
	"Autre"
];
function getCategoryBadgeStyle(category) {
	if (!category) return {
		bgClass: "bg-zinc-500/10",
		textClass: "text-zinc-400",
		borderClass: "border-zinc-500/20",
		fullClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
		dotClass: "bg-zinc-400"
	};
	const catLower = category.toLowerCase().trim();
	if (catLower.includes("recruteur") || catLower.includes("rh")) return {
		bgClass: "bg-emerald-500/15",
		textClass: "text-emerald-300",
		borderClass: "border-emerald-500/30",
		fullClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
		dotClass: "bg-emerald-400"
	};
	if (catLower.includes("alumni") || catLower.includes("ancien")) return {
		bgClass: "bg-sky-500/15",
		textClass: "text-sky-300",
		borderClass: "border-sky-500/30",
		fullClass: "bg-sky-500/15 text-sky-300 border-sky-500/30",
		dotClass: "bg-sky-400"
	};
	if (catLower.includes("étudiant") || catLower.includes("etudiant") || catLower.includes("recherche")) return {
		bgClass: "bg-purple-500/15",
		textClass: "text-purple-300",
		borderClass: "border-purple-500/30",
		fullClass: "bg-purple-500/15 text-purple-300 border-purple-500/30",
		dotClass: "bg-purple-400"
	};
	if (catLower.includes("hors secteur") || catLower.includes("hors") && catLower.includes("ciblé")) return {
		bgClass: "bg-slate-500/15",
		textClass: "text-slate-300",
		borderClass: "border-slate-500/30",
		fullClass: "bg-slate-500/15 text-slate-300 border-slate-500/30",
		dotClass: "bg-slate-400"
	};
	if (catLower.includes("secteur ciblé") || catLower.includes("ciblé")) return {
		bgClass: "bg-amber-500/15",
		textClass: "text-amber-300",
		borderClass: "border-amber-500/30",
		fullClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
		dotClass: "bg-amber-400"
	};
	return {
		bgClass: "bg-zinc-500/10",
		textClass: "text-zinc-400",
		borderClass: "border-zinc-500/20",
		fullClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
		dotClass: "bg-zinc-400"
	};
}
var SOURCE_LABELS = {
	manual: "Manuel",
	phone: "Téléphone",
	linkedin: "LinkedIn",
	opportunity: "Opportunité",
	imported: "Import"
};
var CANAUX = [
	"Email",
	"LinkedIn",
	"Téléphone",
	"Entretien",
	"Autre"
];
function emptyContact(nom) {
	const displayNom = (nom || "").trim();
	return {
		id: crypto.randomUUID(),
		nom: displayNom,
		firstName: "",
		lastName: "",
		fullName: displayNom,
		entreprise: "",
		companyId: null,
		poste: "",
		jobTitle: "",
		email: "",
		telephone: "",
		phone: "",
		linkedin: "",
		linkedinUrl: "",
		location: "",
		avatarUrl: null,
		type: "Recruteur",
		tags: [],
		candidatureId: "",
		candidatureIds: [],
		derniereInteraction: "",
		prochaineAction: "",
		dateProchaineAction: "",
		notes: "",
		historique: [],
		source: "manual",
		sources: ["manual"],
		isManual: true,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function nouvelEchange() {
	return {
		id: crypto.randomUUID(),
		date: todayIso(),
		canal: "Email",
		sens: "Envoyé",
		resume: ""
	};
}
function getContactFullName(c) {
	if (c.fullName && c.fullName.trim().length > 0) return c.fullName.trim();
	const parts = [c.firstName, c.lastName].filter(Boolean);
	if (parts.length > 0) return parts.join(" ").trim();
	if (c.nom && c.nom.trim().length > 0) return c.nom.trim();
	return "Sans nom";
}
function getContactCompany(c) {
	return (c.entreprise || "").trim();
}
function getContactJobTitle(c) {
	return (c.jobTitle || c.poste || "").trim();
}
function normalizeEmail(email) {
	if (!email) return "";
	return email.trim().toLowerCase();
}
function normalizePhone(phone) {
	if (!phone) return "";
	let clean = phone.replace(/[\s.\-()]/g, "");
	if (clean.startsWith("+33")) clean = "0" + clean.slice(3);
	else if (clean.startsWith("0033")) clean = "0" + clean.slice(4);
	return clean;
}
function normalizeLinkedInUrl(url) {
	if (!url) return "";
	let clean = url.trim().toLowerCase();
	clean = clean.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/|pub\/)?/, "");
	clean = clean.replace(/\/+$/, "");
	return clean;
}
function normalizePersonName(name) {
	if (!name) return "";
	return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ").trim();
}
function findMatchingContact(target, existingContacts) {
	const targetEmail = normalizeEmail(target.email);
	if (targetEmail) {
		const match = existingContacts.find((c) => normalizeEmail(c.email) === targetEmail);
		if (match) return {
			contact: match,
			reason: "email"
		};
	}
	const targetPhone = normalizePhone(target.telephone || target.phone);
	if (targetPhone && targetPhone.length >= 6) {
		const match = existingContacts.find((c) => {
			const p = normalizePhone(c.telephone || c.phone);
			return Boolean(p && p.length >= 6 && p === targetPhone);
		});
		if (match) return {
			contact: match,
			reason: "phone"
		};
	}
	const targetLinkedIn = normalizeLinkedInUrl(target.linkedinUrl || target.linkedin);
	if (targetLinkedIn && targetLinkedIn.length >= 3) {
		const match = existingContacts.find((c) => {
			const l = normalizeLinkedInUrl(c.linkedinUrl || c.linkedin);
			return Boolean(l && l.length >= 3 && l === targetLinkedIn);
		});
		if (match) return {
			contact: match,
			reason: "linkedin"
		};
	}
	const targetName = normalizePersonName(getContactFullName(target));
	const targetCompany = normalizePersonName(getContactCompany(target));
	if (targetName && targetCompany) {
		const match = existingContacts.find((c) => {
			const cName = normalizePersonName(getContactFullName(c));
			const cComp = normalizePersonName(getContactCompany(c));
			return cName === targetName && cComp === targetCompany;
		});
		if (match) return {
			contact: match,
			reason: "name_company"
		};
	}
	return null;
}
function getInitials(c) {
	const name = getContactFullName(c);
	if (!name) return "??";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function enrichContactWithoutLoss(existing, incoming, preferredSource = "imported") {
	const merged = { ...existing };
	if (!merged.firstName && incoming.firstName) merged.firstName = incoming.firstName;
	if (!merged.lastName && incoming.lastName) merged.lastName = incoming.lastName;
	if (!merged.nom && incoming.nom) merged.nom = incoming.nom;
	if (!merged.fullName && incoming.fullName) merged.fullName = incoming.fullName;
	if (!merged.nom) merged.nom = getContactFullName(merged);
	if (!merged.entreprise && incoming.entreprise) merged.entreprise = incoming.entreprise;
	if (!merged.companyId && incoming.companyId) merged.companyId = incoming.companyId;
	if (!merged.poste && (incoming.poste || incoming.jobTitle)) {
		merged.poste = incoming.poste || incoming.jobTitle || "";
		merged.jobTitle = merged.poste;
	}
	if (!merged.email && incoming.email) merged.email = incoming.email;
	if (!merged.telephone && (incoming.telephone || incoming.phone)) {
		merged.telephone = incoming.telephone || incoming.phone || "";
		merged.phone = merged.telephone;
	}
	if (!merged.linkedin && (incoming.linkedin || incoming.linkedinUrl)) {
		merged.linkedin = incoming.linkedin || incoming.linkedinUrl || "";
		merged.linkedinUrl = merged.linkedin;
	}
	if (!merged.location && incoming.location) merged.location = incoming.location;
	if (!merged.avatarUrl && incoming.avatarUrl) merged.avatarUrl = incoming.avatarUrl;
	if (!merged.category && incoming.category) merged.category = incoming.category;
	if (incoming.categoryConfidence !== void 0) merged.categoryConfidence = incoming.categoryConfidence;
	if (!merged.normalizedFunction && incoming.normalizedFunction) merged.normalizedFunction = incoming.normalizedFunction;
	if (!merged.normalizedLevel && incoming.normalizedLevel) merged.normalizedLevel = incoming.normalizedLevel;
	if (incoming.aiEnriched) merged.aiEnriched = true;
	if (incoming.pastCompanies?.length) merged.pastCompanies = Array.from(/* @__PURE__ */ new Set([...merged.pastCompanies || [], ...incoming.pastCompanies]));
	if (incoming.education?.length) merged.education = Array.from(/* @__PURE__ */ new Set([...merged.education || [], ...incoming.education]));
	if (!merged.companySector && incoming.companySector) merged.companySector = incoming.companySector;
	if (incoming.relevanceScore !== void 0) merged.relevanceScore = incoming.relevanceScore;
	if (incoming.connectionPoints?.length) merged.connectionPoints = Array.from(/* @__PURE__ */ new Set([...merged.connectionPoints || [], ...incoming.connectionPoints]));
	if (incoming.notes && incoming.notes.trim()) {
		if (!merged.notes) merged.notes = incoming.notes.trim();
		else if (!merged.notes.includes(incoming.notes.trim())) merged.notes = `${merged.notes.trim()}\n\n[Import ${(/* @__PURE__ */ new Date()).toLocaleDateString()}] ${incoming.notes.trim()}`;
	}
	const tagsSet = new Set(merged.tags || []);
	if (Array.isArray(incoming.tags)) {
		for (const t of incoming.tags) if (t && t.trim()) tagsSet.add(t.trim());
	}
	merged.tags = Array.from(tagsSet);
	const oppIdsSet = new Set(merged.candidatureIds || []);
	if (merged.candidatureId) oppIdsSet.add(merged.candidatureId);
	if (incoming.candidatureId) oppIdsSet.add(incoming.candidatureId);
	if (Array.isArray(incoming.candidatureIds)) {
		for (const id of incoming.candidatureIds) if (id) oppIdsSet.add(id);
	}
	merged.candidatureIds = Array.from(oppIdsSet);
	if (!merged.candidatureId && merged.candidatureIds.length > 0) merged.candidatureId = merged.candidatureIds[0];
	const sourcesSet = new Set(merged.sources || []);
	if (merged.source) sourcesSet.add(merged.source);
	if (incoming.source) sourcesSet.add(incoming.source);
	if (Array.isArray(incoming.sources)) for (const s of incoming.sources) sourcesSet.add(s);
	sourcesSet.add(preferredSource);
	merged.sources = Array.from(sourcesSet);
	merged.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
	return merged;
}
function parseVCardString(rawVcf) {
	const contacts = [];
	if (!rawVcf || typeof rawVcf !== "string") return contacts;
	const lines = rawVcf.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "").split(/\r?\n/);
	let inVcard = false;
	let current = {};
	let rawN = "";
	for (const rawLine of lines) {
		const line = rawLine.trim();
		if (!line) continue;
		if (/^BEGIN:VCARD/i.test(line)) {
			inVcard = true;
			current = {
				id: crypto.randomUUID(),
				source: "phone",
				sources: ["phone"],
				tags: ["Téléphone"],
				type: "Contact professionnel"
			};
			rawN = "";
			continue;
		}
		if (/^END:VCARD/i.test(line)) {
			if (inVcard) {
				if (!current.nom) {
					if (rawN) {
						const parts = rawN.split(";").map((p) => p.trim());
						const lastName = parts[0] || "";
						const firstName = parts[1] || "";
						current.lastName = lastName;
						current.firstName = firstName;
						current.nom = [firstName, lastName].filter(Boolean).join(" ");
					}
				}
				current.fullName = current.nom || "Sans nom";
				if (current.nom || current.email || current.telephone) contacts.push(current);
			}
			inVcard = false;
			continue;
		}
		if (!inVcard) continue;
		const colonIndex = line.indexOf(":");
		if (colonIndex === -1) continue;
		const propPart = line.slice(0, colonIndex).toUpperCase();
		let value = line.slice(colonIndex + 1).trim();
		value = value.replace(/\\,/g, ",").replace(/\\;/g, ";").replace(/\\n/gi, "\n");
		if (propPart.startsWith("FN")) {
			current.fullName = value;
			current.nom = value;
		} else if (propPart.startsWith("N")) {
			rawN = value;
			const parts = value.split(";").map((p) => p.trim());
			if (parts.length >= 2) {
				current.lastName = parts[0] || "";
				current.firstName = parts[1] || "";
				if (!current.nom) current.nom = [current.firstName, current.lastName].filter(Boolean).join(" ");
			}
		} else if (propPart.startsWith("EMAIL")) {
			if (!current.email) current.email = value;
		} else if (propPart.startsWith("TEL")) {
			if (!current.telephone) {
				current.telephone = value;
				current.phone = value;
			}
		} else if (propPart.startsWith("ORG")) {
			const orgParts = value.split(";").map((p) => p.trim()).filter(Boolean);
			if (orgParts.length > 0 && !current.entreprise) current.entreprise = orgParts[0];
		} else if (propPart.startsWith("TITLE") || propPart.startsWith("ROLE")) {
			if (!current.poste) {
				current.poste = value;
				current.jobTitle = value;
			}
		} else if (propPart.startsWith("ADR")) {
			const adrParts = value.split(";").map((p) => p.trim()).filter(Boolean);
			if (adrParts.length > 0 && !current.location) current.location = adrParts.join(", ");
		} else if (propPart.startsWith("URL")) {
			if (value.toLowerCase().includes("linkedin.com") && !current.linkedin) {
				current.linkedin = value;
				current.linkedinUrl = value;
			}
		} else if (propPart.startsWith("NOTE")) {
			if (!current.notes) current.notes = value;
		}
	}
	return contacts;
}
function parseCsvRows(text) {
	const rows = [];
	let currentRow = [];
	let currentField = "";
	let insideQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const nextChar = text[i + 1];
		if (insideQuotes) {
			if (char === "\"" && nextChar === "\"") {
				currentField += "\"";
				i++;
			} else if (char === "\"") insideQuotes = false;
			else currentField += char;
		} else if (char === "\"") insideQuotes = true;
		else if (char === "," || char === ";") {
			currentRow.push(currentField.trim());
			currentField = "";
		} else if (char === "\r") {} else if (char === "\n") {
			currentRow.push(currentField.trim());
			if (currentRow.some((f) => f.length > 0)) rows.push(currentRow);
			currentRow = [];
			currentField = "";
		} else currentField += char;
	}
	if (currentField || currentRow.length > 0) {
		currentRow.push(currentField.trim());
		if (currentRow.some((f) => f.length > 0)) rows.push(currentRow);
	}
	return rows;
}
function parseLinkedInCsv(rawCsv) {
	const contacts = [];
	if (!rawCsv || typeof rawCsv !== "string") return contacts;
	const rows = parseCsvRows(rawCsv);
	if (rows.length < 2) return contacts;
	let headerRowIndex = -1;
	let idxFirstName = -1;
	let idxLastName = -1;
	let idxUrl = -1;
	let idxEmail = -1;
	let idxCompany = -1;
	let idxPosition = -1;
	for (let r = 0; r < Math.min(rows.length, 15); r++) {
		const candidateRow = rows[r].map((h) => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim());
		const fn = candidateRow.findIndex((h) => h.includes("first") || h.includes("prenom"));
		const ln = candidateRow.findIndex((h) => h.includes("last") || h.includes("nom") && !h.includes("prenom"));
		const comp = candidateRow.findIndex((h) => h.includes("company") || h.includes("entreprise") || h.includes("societe") || h.includes("organization"));
		const pos = candidateRow.findIndex((h) => h.includes("position") || h.includes("poste") || h.includes("titre") || h.includes("job") || h.includes("title"));
		let matchesCount = 0;
		if (fn !== -1) matchesCount++;
		if (ln !== -1) matchesCount++;
		if (comp !== -1) matchesCount++;
		if (pos !== -1) matchesCount++;
		if (matchesCount >= 2) {
			headerRowIndex = r;
			idxFirstName = fn;
			idxLastName = ln;
			idxCompany = comp;
			idxPosition = pos;
			idxUrl = candidateRow.findIndex((h) => h.includes("url") || h.includes("profil") || h.includes("linkedin"));
			idxEmail = candidateRow.findIndex((h) => h.includes("email") || h.includes("mail") || h.includes("courriel"));
			break;
		}
	}
	if (headerRowIndex === -1) {
		headerRowIndex = 0;
		const headerRow = rows[0].map((h) => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim());
		idxFirstName = headerRow.findIndex((h) => h.includes("first") || h.includes("prenom"));
		idxLastName = headerRow.findIndex((h) => h.includes("last") || h.includes("nom") && !h.includes("prenom"));
		idxUrl = headerRow.findIndex((h) => h.includes("url") || h.includes("profil") || h.includes("linkedin"));
		idxEmail = headerRow.findIndex((h) => h.includes("email") || h.includes("mail") || h.includes("courriel"));
		idxCompany = headerRow.findIndex((h) => h.includes("company") || h.includes("entreprise") || h.includes("societe"));
		idxPosition = headerRow.findIndex((h) => h.includes("position") || h.includes("poste") || h.includes("titre") || h.includes("job"));
	}
	for (let r = headerRowIndex + 1; r < rows.length; r++) {
		const row = rows[r];
		const firstName = idxFirstName !== -1 ? row[idxFirstName] || "" : "";
		const lastName = idxLastName !== -1 ? row[idxLastName] || "" : "";
		const url = idxUrl !== -1 ? row[idxUrl] || "" : "";
		const email = idxEmail !== -1 ? row[idxEmail] || "" : "";
		const company = idxCompany !== -1 ? row[idxCompany] || "" : "";
		const position = idxPosition !== -1 ? row[idxPosition] || "" : "";
		const fullName = [firstName, lastName].filter(Boolean).join(" ");
		if (!fullName && !email && !company) continue;
		const contact = {
			id: crypto.randomUUID(),
			nom: fullName || "Contact LinkedIn",
			firstName,
			lastName,
			fullName: fullName || "Contact LinkedIn",
			entreprise: company,
			poste: position,
			jobTitle: position,
			email,
			linkedin: url,
			linkedinUrl: url,
			type: "Contact professionnel",
			source: "linkedin",
			sources: ["linkedin"],
			tags: ["LinkedIn"],
			notes: ""
		};
		contacts.push(contact);
	}
	return contacts;
}
function parseRawContactInput(raw) {
	const result = {
		nom: "",
		email: "",
		telephone: "",
		poste: ""
	};
	if (!raw || !raw.trim()) return result;
	let text = raw.trim();
	const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
	if (emailMatch) {
		result.email = emailMatch[1];
		text = text.replace(emailMatch[0], " ");
	}
	const phoneMatch = text.match(/(\+?\d[\d\s.\-()]{7,}\d)/);
	if (phoneMatch) {
		result.telephone = phoneMatch[1].trim();
		result.phone = result.telephone;
		text = text.replace(phoneMatch[0], " ");
	}
	const roleMatch = text.match(/\(([^)]+)\)/);
	if (roleMatch) {
		result.poste = roleMatch[1].trim();
		result.jobTitle = result.poste;
		text = text.replace(roleMatch[0], " ");
	}
	const cleanedParts = text.split(/[-–—·|;,]/).map((p) => p.trim()).filter(Boolean);
	if (cleanedParts.length > 0) {
		result.nom = cleanedParts[0];
		result.fullName = cleanedParts[0];
		if (cleanedParts.length > 1 && !result.poste) {
			result.poste = cleanedParts[1];
			result.jobTitle = cleanedParts[1];
		}
	}
	return result;
}
var TYPES_RELANCE = [
	"relance_candidature",
	"apres_entretien",
	"prise_contact",
	"renseignements",
	"remerciement",
	"reseau_ancien_eleve",
	"relance_sans_reponse"
];
var LIBELLES_RELANCE = {
	relance_candidature: "Relance de candidature",
	apres_entretien: "Suivi après entretien",
	prise_contact: "Prise de contact spontanée",
	renseignements: "Demande de renseignements",
	remerciement: "Remerciement après entretien",
	reseau_ancien_eleve: "Mise en relation (ancien élève)",
	relance_sans_reponse: "Relance sans réponse"
};
var CONTACTS_STORAGE_KEY = "careerly_contacts_v1";
function loadContactsLocal() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(CONTACTS_STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveContactsLocal(items) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(items));
	} catch {}
}
/**
* PONDÉRATION DU SCORE DE PERTINENCE NACORA (0 à 100%)
*
* 1. ÉTABLISSEMENT / FORMATION COMMUNE (Poids max : 30 pts)
*    - Même établissement/école (ex: IUT Clermont Auvergne / Montluçon) : +25 pts
*    - Même diplôme/spécialité (ex: Tech de Co / B.U.T. Techniques de Commercialisation) : +5 pts
*
* 2. CATÉGORIE DU CONTACT (Poids max : 30 pts)
*    - Recruteur / RH : +30 pts (contacts prioritaires pour le recrutement)
*    - Alumni : +25 pts (contacts réseau à fort taux de réponse)
*    - Professionnel du secteur ciblé : +20 pts
*    - Étudiant / en recherche : +10 pts
*    - Professionnel hors secteur ciblé : +5 pts
*    - Autre : 0 pt
*
* 3. CORRESPONDANCE SECTEUR CIBLÉ (Poids max : 20 pts)
*    - Secteur correspondant à la finance / fintech / gestion de patrimoine / banque / conseil : +20 pts
*
* 4. RACCORDEMENT OPPORTUNITÉ KANBAN (Poids max : 20 pts)
*    - Entreprise actuelle du contact correspondant à une opportunité active du Kanban : +20 pts
*    - Entreprise passée du contact correspondant à une opportunité active du Kanban : +10 pts
*
* 5. CONTACT DÉJÀ "CHAUD" / ÉCHANGES EXISTANTS (Bonus max : 10 pts)
*    - Au moins une interaction enregistrée dans l'historique : +10 pts
*
* SCORE FINAL = Math.min(100, Total des points)
*/
function computeContactRelevance(contact, candidatures = [], userCtx) {
	let score = 0;
	const connectionPoints = [];
	const rawSchool = (userCtx?.school || "IUT Clermont Auvergne").toLowerCase();
	const targetSectors = userCtx?.targetSectors?.length ? userCtx.targetSectors.map((s) => s.toLowerCase()) : [
		"finance",
		"fintech",
		"gestion de patrimoine",
		"banque",
		"conseil",
		"assurance",
		"investissement",
		"private equity",
		"m&a",
		"commercialisation"
	];
	const combinedEduText = `${(contact.education || []).join(" ").toLowerCase()} ${(contact.notes || "").toLowerCase()} ${contact.category === "Alumni" ? "alumni" : ""}`;
	const isSameSchool = combinedEduText.includes("iut clermont") || combinedEduText.includes("montluçon") || combinedEduText.includes("montlucon") || rawSchool.length > 3 && combinedEduText.includes(rawSchool);
	const isSameFormation = combinedEduText.includes("techniques de commercialisation") || combinedEduText.includes("tech de co") || combinedEduText.includes("b.u.t") || combinedEduText.includes("but tc");
	if (isSameSchool) {
		score += 25;
		connectionPoints.push("Même établissement : IUT Clermont Auvergne (Montluçon)");
		if (isSameFormation) {
			score += 5;
			connectionPoints.push("Même formation : Tech de Co (B.U.T.)");
		}
	} else if (isSameFormation) {
		score += 15;
		connectionPoints.push("Formation similaire : Techniques de Commercialisation");
	} else if (contact.category === "Alumni") {
		score += 20;
		connectionPoints.push("Alumni de ta formation");
	}
	switch (contact.category) {
		case "Recruteur / RH":
			score += 30;
			connectionPoints.push("Contact stratégique : Recruteur / RH");
			break;
		case "Alumni":
			if (!isSameSchool) score += 25;
			break;
		case "Professionnel du secteur ciblé":
			score += 20;
			break;
		case "Étudiant / en recherche":
			score += 10;
			break;
		case "Professionnel hors secteur ciblé": score += 5;
	}
	const contactSector = (contact.companySector || "").toLowerCase();
	const contactRole = (contact.poste || "").toLowerCase();
	if (targetSectors.some((sec) => contactSector.includes(sec) || contactRole.includes(sec))) {
		score += 20;
		const sectorLabel = contact.companySector || "Finance / Fintech / Gestion de patrimoine";
		connectionPoints.push(`Secteur ciblé : ${sectorLabel}`);
	}
	const currentCompany = (contact.entreprise || "").trim();
	const pastCompanies = contact.pastCompanies || [];
	const matchedKanbanCurrent = candidatures.find((c) => c.entreprise && currentCompany && (c.entreprise.toLowerCase().includes(currentCompany.toLowerCase()) || currentCompany.toLowerCase().includes(c.entreprise.toLowerCase())));
	if (matchedKanbanCurrent) {
		score += 20;
		connectionPoints.push(`Poste chez ${matchedKanbanCurrent.entreprise} (Opportunité dans ton Kanban)`);
	} else {
		const matchedKanbanPast = candidatures.find((c) => c.entreprise && pastCompanies.some((past) => past.toLowerCase().includes(c.entreprise.toLowerCase()) || c.entreprise.toLowerCase().includes(past.toLowerCase())));
		if (matchedKanbanPast) {
			score += 10;
			connectionPoints.push(`Ex-collaborateur de ${matchedKanbanPast.entreprise} (Entreprise visée)`);
		}
	}
	if (contact.historique && contact.historique.length > 0) {
		score += 10;
		connectionPoints.push(`${contact.historique.length} échange(s) déjà enregistré(s)`);
	}
	return {
		score: Math.min(100, Math.max(0, score)),
		connectionPoints: Array.from(new Set(connectionPoints))
	};
}
var _jsxFileName$7 = "/app/applet/src/components/Logo.tsx";
/** Logo NACORA officiel : affiche directement le fichier image PNG officiel sans altération ni recréation typographique. */
function Logo({ compact = false, className }) {
	if (compact) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
		src: "/branding/nacora-official-mark.png",
		alt: "NACORA",
		className: cn("h-8 w-8 shrink-0 object-contain", className),
		referrerPolicy: "no-referrer"
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 13,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
		src: "/branding/nacora-official-logo.png",
		alt: "NACORA",
		className: cn("h-8 w-auto shrink-0 object-contain", className),
		referrerPolicy: "no-referrer"
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-B41WKeTY.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var classifyContactsBatchServerFn = createServerFn({ method: "POST" }).validator((data) => ClassifyContactsBatchInputZodSchema.parse(data)).handler(createSsrRpc("5dce3a03db727f995b2906f56c8fff4642a6524d3c785429cbac717e581b9048"));
function useSession() {
	const [firebaseUser, setFirebaseUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [localUser, setLocalUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setLocalUser(getCompteActif());
		let unsubsFirebase;
		if (isFirebaseConfigured()) unsubsFirebase = onAuthStateChanged(auth, (fUser) => {
			setFirebaseUser(fUser);
			setLoading(false);
		});
		let unsubscribeSupabase;
		const handleLocalAuth = () => {
			setLocalUser(getCompteActif());
		};
		window.addEventListener("careerly_auth_change", handleLocalAuth);
		if (isSupabaseConfigured()) try {
			unsubscribeSupabase = supabase.auth.onAuthStateChange((_e, s) => {
				setSession(s);
				setLoading(false);
			})?.data?.subscription?.unsubscribe;
			supabase.auth.getSession().then(({ data }) => {
				setSession(data?.session ?? null);
				setLoading(false);
			}).catch(() => {
				setLoading(false);
			});
		} catch {
			setLoading(false);
		}
		else if (!isFirebaseConfigured()) setLoading(false);
		return () => {
			unsubsFirebase?.();
			unsubscribeSupabase?.();
			window.removeEventListener("careerly_auth_change", handleLocalAuth);
		};
	}, []);
	return {
		session,
		user: (0, import_react.useMemo)(() => {
			if (firebaseUser) return {
				id: firebaseUser.uid,
				email: firebaseUser.email ?? "",
				user_metadata: {
					full_name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Membre",
					avatar_url: firebaseUser.photoURL ?? void 0
				},
				app_metadata: { provider: "firebase" },
				aud: "authenticated",
				created_at: firebaseUser.metadata.creationTime ?? (/* @__PURE__ */ new Date()).toISOString()
			};
			if (session?.user) return session.user;
			if (localUser) return {
				id: localUser.id,
				email: localUser.email,
				user_metadata: { full_name: `${localUser.prenom ?? ""} ${localUser.nom ?? ""}`.trim() },
				app_metadata: {},
				aud: "authenticated",
				created_at: localUser.creeLe
			};
			return null;
		}, [
			firebaseUser,
			session?.user,
			localUser
		]),
		firebaseUser,
		loading
	};
}
var OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid,
			email: auth.currentUser?.email,
			emailVerified: auth.currentUser?.emailVerified,
			isAnonymous: auth.currentUser?.isAnonymous,
			tenantId: auth.currentUser?.tenantId,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) || []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
function sanitizeForFirestore$1(obj) {
	if (obj === null || obj === void 0) return null;
	if (Array.isArray(obj)) return obj.map((item) => sanitizeForFirestore$1(item)).filter((item) => item !== void 0);
	if (typeof obj !== "object") return obj;
	const clean = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value === void 0) continue;
		clean[key] = sanitizeForFirestore$1(value);
	}
	return clean;
}
function toContact(r) {
	const base = emptyContact();
	const rawObj = r;
	const candIds = Array.isArray(r.candidature_ids) ? r.candidature_ids : Array.isArray(r.candidatureIds) ? r.candidatureIds : r.candidature_id || r.candidatureId ? [r.candidature_id || r.candidatureId || ""] : [];
	const rawSources = Array.isArray(r.sources) ? r.sources : r.source ? [r.source] : ["manual"];
	const rawTags = Array.isArray(r.tags) ? r.tags : Array.isArray(rawObj["tags"]) ? rawObj["tags"] : [];
	const firstName = r.first_name || r.firstName || "";
	const lastName = r.last_name || r.lastName || "";
	const fullName = r.full_name || r.fullName || r.nom || [firstName, lastName].filter(Boolean).join(" ") || "";
	return {
		...base,
		id: r.id,
		nom: fullName || r.nom || "Sans nom",
		firstName,
		lastName,
		fullName,
		entreprise: r.entreprise ?? "",
		companyId: r.company_id || r.companyId || null,
		poste: r.poste ?? r.job_title ?? r.jobTitle ?? "",
		jobTitle: r.job_title ?? r.jobTitle ?? r.poste ?? "",
		email: r.email ?? "",
		telephone: r.telephone ?? r.phone ?? "",
		phone: r.phone ?? r.telephone ?? "",
		linkedin: r.linkedin ?? r.linkedin_url ?? r.linkedinUrl ?? "",
		linkedinUrl: r.linkedin_url ?? r.linkedinUrl ?? r.linkedin ?? "",
		location: r.location ?? "",
		avatarUrl: r.avatar_url ?? r.avatarUrl ?? null,
		type: r.type || "Recruteur",
		tags: rawTags,
		candidatureId: r.candidature_id ?? r.candidatureId ?? candIds[0] ?? "",
		candidatureIds: candIds.filter(Boolean),
		derniereInteraction: r.derniere_interaction ?? "",
		prochaineAction: r.prochaine_action ?? "",
		dateProchaineAction: r.date_prochaine_action ?? "",
		notes: r.notes ?? "",
		historique: Array.isArray(r.historique) ? r.historique : [],
		source: r.source || rawSources[0] || "manual",
		sources: rawSources,
		isManual: r.is_manual ?? r.isManual ?? true,
		createdAt: r.created_at || r.createdAt || base.createdAt,
		updatedAt: r.updated_at || r.updatedAt || base.updatedAt
	};
}
function toRow$1(c, userId) {
	return sanitizeForFirestore$1({
		id: c.id || crypto.randomUUID(),
		user_id: userId,
		nom: c.nom || c.fullName || "Sans nom",
		first_name: c.firstName || null,
		firstName: c.firstName || null,
		last_name: c.lastName || null,
		lastName: c.lastName || null,
		full_name: c.fullName || c.nom || "Sans nom",
		fullName: c.fullName || c.nom || "Sans nom",
		entreprise: c.entreprise || "",
		company_id: c.companyId || null,
		companyId: c.companyId || null,
		poste: c.poste || c.jobTitle || "",
		job_title: c.jobTitle || c.poste || "",
		jobTitle: c.jobTitle || c.poste || "",
		email: c.email || "",
		telephone: c.telephone || c.phone || "",
		phone: c.telephone || c.phone || "",
		linkedin: c.linkedin || c.linkedinUrl || "",
		linkedin_url: c.linkedinUrl || c.linkedin || "",
		linkedinUrl: c.linkedinUrl || c.linkedin || "",
		location: c.location || "",
		avatar_url: c.avatarUrl || null,
		avatarUrl: c.avatarUrl || null,
		type: c.type || "Recruteur",
		tags: Array.isArray(c.tags) ? c.tags : [],
		candidature_id: c.candidatureId || c.candidatureIds?.[0] || null,
		candidatureId: c.candidatureId || c.candidatureIds?.[0] || null,
		candidature_ids: Array.isArray(c.candidatureIds) ? c.candidatureIds : [],
		candidatureIds: Array.isArray(c.candidatureIds) ? c.candidatureIds : [],
		derniere_interaction: c.derniereInteraction || null,
		prochaine_action: c.prochaineAction || "",
		date_prochaine_action: c.dateProchaineAction || null,
		notes: c.notes || "",
		historique: Array.isArray(c.historique) ? c.historique : [],
		source: c.source || c.sources?.[0] || "manual",
		sources: Array.isArray(c.sources) ? c.sources : ["manual"],
		is_manual: c.isManual ?? true,
		isManual: c.isManual ?? true,
		created_at: c.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
		createdAt: c.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
async function fetchContacts(userId) {
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const colRef = collection(db, "users", userId, "contacts");
		const snap = await getDocs(query(colRef));
		const list = [];
		snap.forEach((docSnap) => {
			list.push(toContact({
				id: docSnap.id,
				...docSnap.data()
			}));
		});
		return list;
	} catch (e) {
		console.warn("Firestore fetchContacts error:", e);
		handleFirestoreError(e, OperationType.GET, `users/${userId}/contacts`);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data.map(toContact);
	}
	return [];
}
async function upsertContact(c, userId) {
	const row = toRow$1(c, userId);
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const docRef = doc(db, "users", userId, "contacts", row.id);
		await setDoc(docRef, row, { merge: true });
		return toContact(row);
	} catch (e) {
		console.warn("Firestore upsertContact error:", e);
		handleFirestoreError(e, OperationType.WRITE, `users/${userId}/contacts/${row.id}`);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("contacts").upsert(row).select().single();
		if (error) throw error;
		return toContact(data);
	}
	return c;
}
async function batchUpsertContacts(contactsList, userId) {
	if (!contactsList.length) return [];
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const CHUNK_SIZE = 250;
		for (let i = 0; i < contactsList.length; i += CHUNK_SIZE) {
			const chunk = contactsList.slice(i, i + CHUNK_SIZE);
			const batch = writeBatch(db);
			for (const c of chunk) {
				const row = toRow$1(c, userId);
				const docRef = doc(db, "users", userId, "contacts", row.id);
				batch.set(docRef, row, { merge: true });
			}
			await batch.commit();
		}
		return contactsList;
	} catch (e) {
		console.warn("Firestore batchUpsertContacts error:", e);
		handleFirestoreError(e, OperationType.WRITE, `users/${userId}/contacts`);
	}
	if (isSupabaseConfigured()) {
		const rows = contactsList.map((c) => toRow$1(c, userId));
		const { data, error } = await supabase.from("contacts").upsert(rows);
		if (error) throw error;
		if (Array.isArray(data)) return data.map(toContact);
	}
	return contactsList;
}
async function deleteContact(id, userId) {
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const docRef = doc(db, "users", userId, "contacts", id);
		await deleteDoc(docRef);
		return;
	} catch (e) {
		console.warn("Firestore deleteContact error:", e);
		handleFirestoreError(e, OperationType.DELETE, `users/${userId}/contacts/${id}`);
	}
	if (isSupabaseConfigured()) {
		const { error } = await supabase.from("contacts").delete().eq("id", id);
		if (error) throw error;
	}
}
function useContacts() {
	const { user, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(userId);
	const [contacts, setContacts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			setContacts(loadContactsLocal());
			setLoading(false);
			return;
		}
		setLoading(true);
		(async () => {
			try {
				const cloud = await fetchContacts(userId);
				if (!cancelled) {
					if (cloud.length > 0) {
						setContacts(cloud);
						saveContactsLocal(cloud);
					} else {
						const local = loadContactsLocal();
						setContacts(local);
						if (local.length > 0) batchUpsertContacts(local, userId);
					}
				}
			} catch (err) {
				console.warn("Échec récupération contacts cloud, repli local:", err);
				if (!cancelled) setContacts(loadContactsLocal());
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		authLoading,
		isCloudUser,
		userId
	]);
	return {
		contacts,
		loading,
		saveContact: (0, import_react.useCallback)(async (contactToSave) => {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const updated = {
				...contactToSave,
				updatedAt: now,
				nom: contactToSave.nom || contactToSave.fullName || "Sans nom"
			};
			setContacts((prev) => {
				const next = prev.some((c) => c.id === updated.id) ? prev.map((c) => c.id === updated.id ? updated : c) : [updated, ...prev];
				saveContactsLocal(next);
				return next;
			});
			if (isCloudUser && userId) try {
				await upsertContact(updated, userId);
			} catch (err) {
				console.warn("Échec synchronisation Firestore contact:", err);
			}
			return updated;
		}, [isCloudUser, userId]),
		deleteContactById: (0, import_react.useCallback)(async (id) => {
			setContacts((prev) => {
				const next = prev.filter((item) => item.id !== id);
				saveContactsLocal(next);
				return next;
			});
			if (isCloudUser && userId) try {
				await deleteContact(id, userId);
			} catch (err) {
				console.warn("Échec suppression contact Firestore:", err);
			}
		}, [isCloudUser, userId]),
		batchImportContacts: (0, import_react.useCallback)(async (incomingList, resolutions) => {
			let importedCount = 0;
			let updatedCount = 0;
			const currentContacts = [...contacts];
			const contactsToPersist = [];
			for (let i = 0; i < incomingList.length; i++) {
				const incoming = incomingList[i];
				const matchResult = findMatchingContact(incoming, currentContacts);
				const userChoice = resolutions?.[incoming.id || `idx_${i}`];
				if (matchResult && userChoice !== "both") {
					if (userChoice === "skip") continue;
					const enriched = enrichContactWithoutLoss(matchResult.contact, incoming, incoming.source || "imported");
					const idx = currentContacts.findIndex((c) => c.id === enriched.id);
					if (idx !== -1) currentContacts[idx] = enriched;
					contactsToPersist.push(enriched);
					updatedCount++;
				} else {
					const newContact = {
						...emptyContact(incoming.nom || incoming.fullName),
						...incoming,
						id: crypto.randomUUID(),
						createdAt: (/* @__PURE__ */ new Date()).toISOString(),
						updatedAt: (/* @__PURE__ */ new Date()).toISOString()
					};
					currentContacts.push(newContact);
					contactsToPersist.push(newContact);
					importedCount++;
				}
			}
			setContacts([...currentContacts]);
			saveContactsLocal(currentContacts);
			if (isCloudUser && userId && contactsToPersist.length > 0) try {
				await batchUpsertContacts(contactsToPersist, userId);
			} catch (err) {
				console.warn("Échec sauvegarde par lot Firestore:", err);
			}
			return {
				total: incomingList.length,
				imported: importedCount,
				updated: updatedCount
			};
		}, [
			contacts,
			isCloudUser,
			userId
		]),
		getOpportunitiesForContact: (0, import_react.useCallback)((contact, candidatures) => {
			const linkedIds = new Set(contact.candidatureIds || []);
			if (contact.candidatureId) linkedIds.add(contact.candidatureId);
			return candidatures.filter((cand) => {
				if (linkedIds.has(cand.id)) return true;
				if (cand.contactId && cand.contactId === contact.id) return true;
				return false;
			});
		}, []),
		getEntrepriseForContact: (0, import_react.useCallback)((contact, entreprises) => {
			if (contact.companyId) {
				const direct = entreprises.find((e) => e.id === contact.companyId);
				if (direct) return direct;
			}
			if (contact.entreprise) {
				const norm = contact.entreprise.trim().toLowerCase();
				const found = entreprises.find((e) => e.nom.trim().toLowerCase() === norm || e.normalizedName === norm);
				if (found) return found;
			}
			return null;
		}, [])
	};
}
var _jsxFileName$2$1 = "/app/applet/src/context/ContactImportContext.tsx";
var ContactImportContext = (0, import_react.createContext)(void 0);
function ContactImportProvider({ children }) {
	const { batchImportContacts, saveContact } = useContacts();
	const [isImporting, setIsImporting] = (0, import_react.useState)(false);
	const [current, setCurrent] = (0, import_react.useState)(0);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [statusLabel, setStatusLabel] = (0, import_react.useState)("");
	const [cancelRequested, setCancelRequested] = (0, import_react.useState)(false);
	const cancelImport = (0, import_react.useCallback)(() => {
		setCancelRequested(true);
		setIsImporting(false);
		toast.info("Import en arrière-plan annulé.");
	}, []);
	const startBackgroundImport = (0, import_react.useCallback)(async (itemsToImport, resolutions, userSchool, userTargetSector) => {
		if (itemsToImport.length === 0) return;
		setIsImporting(true);
		setCancelRequested(false);
		setTotal(itemsToImport.length);
		setCurrent(0);
		setStatusLabel("Enregistrement initial des contacts...");
		try {
			const importRes = await batchImportContacts(itemsToImport, resolutions);
			toast.success(`${importRes.imported} contact(s) ajouté(s), ${importRes.updated} fusionné(s). Lancement de la classification IA en arrière-plan...`);
		} catch (err) {
			console.error("Erreur import initial:", err);
		}
		const BATCH_SIZE = 10;
		let processed = 0;
		for (let i = 0; i < itemsToImport.length; i += BATCH_SIZE) {
			if (cancelRequested) break;
			const chunk = itemsToImport.slice(i, i + BATCH_SIZE);
			const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
			const totalBatches = Math.ceil(itemsToImport.length / BATCH_SIZE);
			setStatusLabel(`Classification IA (Lot ${batchNumber}/${totalBatches})...`);
			try {
				const res = await classifyContactsBatchServerFn({ data: {
					contacts: chunk.map((c) => ({
						id: c.id || "",
						fullName: getContactFullName(c) || c.nom || "",
						jobTitle: c.poste || "",
						company: c.entreprise || ""
					})),
					userSchool: userSchool || "",
					userTargetSector: userTargetSector || ""
				} });
				const classifications = res?.classifications || res?.classified || [];
				if (classifications.length > 0) {
					const mapById = new Map(classifications.map((item) => [item.id, item]));
					for (const item of chunk) {
						if (!item.id) continue;
						const classification = mapById.get(item.id);
						if (classification) {
							const updatedRole = classification.normalizedFunction || classification.normalizedRole || item.poste || "";
							const updatedCompany = classification.normalizedCompany || item.entreprise || "";
							const updatedLevel = classification.normalizedLevel || classification.hierarchicalLevel || "";
							const candidateContact = {
								...item,
								nom: getContactFullName(item) || item.nom || "Contact",
								poste: updatedRole,
								entreprise: updatedCompany,
								category: classification.category,
								normalizedFunction: updatedRole,
								normalizedLevel: updatedLevel,
								pastCompanies: classification.pastCompanies || item.pastCompanies || [],
								education: classification.education || item.education || [],
								companySector: classification.companySector || item.companySector || "",
								tags: Array.from(new Set([
									...item.tags || [],
									classification.category,
									updatedLevel,
									"LinkedIn IA"
								].filter(Boolean)))
							};
							const scoring = computeContactRelevance(candidateContact, [], {
								school: userSchool,
								targetSectors: userTargetSector ? [userTargetSector] : void 0
							});
							candidateContact.relevanceScore = scoring.score;
							candidateContact.connectionPoints = scoring.connectionPoints;
							await saveContact(candidateContact);
						}
					}
				}
			} catch (err) {
				console.warn("Échec traitement lot IA:", err);
			}
			processed = Math.min(i + BATCH_SIZE, itemsToImport.length);
			setCurrent(processed);
		}
		setIsImporting(false);
		setStatusLabel("");
		toast.success(`Classification IA terminée ! ${itemsToImport.length} contact(s) qualifié(s).`);
	}, [
		batchImportContacts,
		saveContact,
		cancelRequested
	]);
	const percentage = total > 0 ? Math.round(current / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactImportContext.Provider, {
		value: {
			isImporting,
			current,
			total,
			percentage,
			statusLabel,
			startBackgroundImport,
			cancelImport
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName$2$1,
		lineNumber: 195,
		columnNumber: 5
	}, this);
}
function useContactImport() {
	const ctx = (0, import_react.useContext)(ContactImportContext);
	if (!ctx) throw new Error("useContactImport must be used within a ContactImportProvider");
	return ctx;
}
var _jsxFileName$1$1 = "/app/applet/src/components/ui/tooltip.tsx";
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1$1,
	lineNumber: 19,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$1$1,
	lineNumber: 18,
	columnNumber: 3
}, void 0));
TooltipContent.displayName = Content2.displayName;
var _jsxFileName$6 = "/app/applet/src/components/AppShell.tsx";
var MAIN = [
	{
		label: "Accueil",
		icon: House,
		to: "/"
	},
	{
		label: "Opportunités",
		icon: Target,
		to: "/opportunites"
	},
	{
		label: "Calendrier",
		icon: CalendarDays,
		to: "/calendrier"
	},
	{
		label: "Documents",
		icon: FileText,
		to: "/documents"
	},
	{
		label: "Contacts",
		icon: Users,
		to: "/contacts"
	},
	{
		label: "Entreprises",
		icon: Building2,
		to: "/entreprises"
	},
	{
		label: "Importer",
		icon: Upload,
		to: "/import"
	}
];
var STUDIO = [
	{
		label: "Interview Coach",
		icon: MessageSquare,
		to: "/assistant",
		search: { persona: "interview_coach" }
	},
	{
		label: "LinkedIn & Réseau",
		icon: Linkedin,
		to: "/assistant",
		search: { persona: "job_strategist" }
	},
	{
		label: "Expert CV & Lettre",
		icon: ScanLine,
		to: "/assistant",
		search: { persona: "cv_expert" }
	},
	{
		label: "Négociation Salaire",
		icon: Coins,
		to: "/assistant",
		search: { persona: "salary_negotiator" }
	}
];
var ASSISTANT = {
	label: "NACORA AI (Hub)",
	icon: WandSparkles,
	to: "/assistant"
};
var bientot = () => toast("Bientôt disponible dans NACORA.");
function NavRow({ item, active, isCollapsed }) {
	const inner = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: cn("size-4 shrink-0 transition-all duration-200", active ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" : "text-zinc-400 group-hover:text-zinc-100") }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 104,
		columnNumber: 7
	}, this), !isCollapsed && /* @__PURE__ */ (void 0)("span", {
		className: cn("truncate transition-all duration-200 text-xs leading-tight tracking-tight", active ? "font-semibold text-white" : "font-normal text-zinc-400 group-hover:text-zinc-100"),
		children: item.label
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 113,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 103,
		columnNumber: 5
	}, this);
	const klass = cn("group relative flex items-center rounded-xl transition-all duration-200 cursor-pointer select-none", isCollapsed ? "justify-center size-9.5 p-0 mx-auto" : "w-full gap-2.5 px-3 py-2 min-h-[38px]", active ? "bg-gradient-to-r from-[#EC0040] to-[#D81A45] text-white font-medium border border-white/20 shadow-[0_4px_16px_rgba(216,26,69,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]" : "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/8 hover:backdrop-blur-md");
	const buttonOrLink = item.to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: item.to,
		search: item.search,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 138,
		columnNumber: 5
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 142,
		columnNumber: 5
	}, this);
	if (isCollapsed) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {
		delayDuration: 100,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipTrigger, {
			asChild: true,
			children: buttonOrLink
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 150,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipContent, {
			side: "right",
			className: "bg-card/90 backdrop-blur-xl text-zinc-100 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] font-medium text-xs px-3 py-1.5 rounded-xl",
			children: item.label
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 151,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 149,
		columnNumber: 7
	}, this);
	return buttonOrLink;
}
function AppShell({ title, subtitle, eyebrow, headerExtra, actions, onAdd, onSearch, searchValue, children }) {
	const { pathname, search } = useRouterState({ select: (s) => ({
		pathname: s.location.pathname,
		search: s.location.search
	}) });
	const importState = useContactImport();
	const isItemActive = (item) => {
		if (!item.to) return false;
		if (item.to === "/assistant") {
			if (item.search?.persona) return pathname === "/assistant" && search?.persona === item.search.persona;
			return pathname === "/assistant" && (!search?.persona || search.persona === "general_advisor");
		}
		return item.to === pathname;
	};
	const [local, setLocal] = (0, import_react.useState)("");
	const value = searchValue ?? local;
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [isCollapsed, setIsCollapsed] = (0, import_react.useState)(false);
	const [isHoveredExpanded, setIsHoveredExpanded] = (0, import_react.useState)(false);
	const [isHighContrast, setIsHighContrast] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const storedCollapsed = localStorage.getItem("nacora_sidebar_collapsed");
			setIsCollapsed(storedCollapsed === null ? true : storedCollapsed === "true");
			const checkContrast = () => {
				const active = localStorage.getItem("nacora_high_contrast") === "true";
				setIsHighContrast(active);
				if (active) document.documentElement.classList.add("high-contrast");
				else document.documentElement.classList.remove("high-contrast");
			};
			checkContrast();
			window.addEventListener("storage", checkContrast);
			window.addEventListener("nacora_contrast_changed", checkContrast);
			return () => {
				window.removeEventListener("storage", checkContrast);
				window.removeEventListener("nacora_contrast_changed", checkContrast);
			};
		}
	}, []);
	const toggleHighContrast = () => {
		const next = !isHighContrast;
		setIsHighContrast(next);
		localStorage.setItem("nacora_high_contrast", String(next));
		if (next) {
			document.documentElement.classList.add("high-contrast");
			toast.success("Mode Contraste Élevé activé !");
		} else {
			document.documentElement.classList.remove("high-contrast");
			toast.success("Mode Contraste Standard activé !");
		}
		window.dispatchEvent(new Event("nacora_contrast_changed"));
		window.dispatchEvent(new Event("storage"));
	};
	const isVisualCollapsed = isCollapsed && !isHoveredExpanded;
	const toggleSidebar = () => {
		const next = !isCollapsed;
		setIsCollapsed(next);
		localStorage.setItem("nacora_sidebar_collapsed", String(next));
	};
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [menuOpen]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative min-h-screen bg-background text-foreground overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pointer-events-none fixed inset-0 z-0 overflow-hidden saturate-50 opacity-50",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -top-32 left-[12%] h-[500px] w-[550px] rounded-full bg-gradient-to-br from-slate-600/10 via-indigo-600/8 to-transparent blur-[140px]" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 289,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-[22%] -right-24 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-rose-700/6 via-pink-800/4 to-transparent blur-[150px]" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 290,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-[58%] left-[4%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-slate-500/8 via-cyan-700/5 to-transparent blur-[140px]" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 291,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -bottom-28 right-[22%] h-[480px] w-[480px] rounded-full bg-gradient-to-tl from-purple-800/6 via-slate-700/5 to-transparent blur-[140px]" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 292,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 285,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: cn("fixed inset-0 z-50 md:hidden", menuOpen ? "pointer-events-auto" : "pointer-events-none"),
				"aria-hidden": !menuOpen,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					"aria-label": "Fermer le menu",
					onClick: () => setMenuOpen(false),
					className: cn("absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-200", menuOpen ? "opacity-100" : "opacity-0")
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 303,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: cn("absolute inset-y-0 left-0 flex w-[85%] max-w-[300px] flex-col border-r border-white/12 bg-[#0c0f1d]/90 backdrop-blur-3xl p-4 transition-transform duration-250 ease-out shadow-[0_24px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]", menuOpen ? "translate-x-0" : "-translate-x-full"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-12 shrink-0 items-center justify-between gap-2 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 319,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							"aria-label": "Fermer le menu",
							onClick: () => setMenuOpen(false),
							className: "grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 326,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 320,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 318,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "mt-4 flex-1 overflow-y-auto space-y-5 pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Navigation"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 332,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: isItemActive(item)
								}, item.label, false, {
									fileName: _jsxFileName$6,
									lineNumber: 337,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 335,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 331,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 border-t border-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mb-2 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "NACORA AI" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 348,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
										children: "Assistant"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 349,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 347,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
										item: ASSISTANT,
										active: isItemActive(ASSISTANT)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 354,
										columnNumber: 19
									}, this), STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
										item,
										active: isItemActive(item)
									}, item.label, false, {
										fileName: _jsxFileName$6,
										lineNumber: 356,
										columnNumber: 21
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 353,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 346,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 border-t border-white/10 flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item: {
										label: "Paramètres",
										icon: Settings,
										to: "/parametres"
									},
									active: pathname === "/parametres"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 366,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item: {
										label: "Mon profil",
										icon: UserRound,
										to: "/profil"
									},
									active: pathname === "/profil"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 374,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 365,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 330,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 312,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 296,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				onMouseEnter: () => setIsHoveredExpanded(true),
				onMouseLeave: () => setIsHoveredExpanded(false),
				className: cn("fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/12 bg-sidebar/75 backdrop-blur-3xl md:flex transition-all duration-250 shadow-[4px_0_35px_rgba(0,0,0,0.45),inset_-1px_0_0_rgba(255,255,255,0.06)]", isVisualCollapsed ? "w-[72px]" : "w-[254px]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: cn("flex h-[64px] items-center justify-between border-b border-white/10", isVisualCollapsed ? "px-2 justify-center" : "px-4"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, { compact: isVisualCollapsed }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 398,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: toggleSidebar,
							className: "grid size-7.5 place-items-center rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all cursor-pointer",
							"aria-label": isVisualCollapsed ? "Agrandir la barre latérale" : "Réduire la barre latérale",
							children: isVisualCollapsed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 410,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronLeft, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 412,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 399,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 392,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: cn("flex-1 overflow-y-auto pb-4 space-y-5", isVisualCollapsed ? "px-2 pt-3" : "px-3 pt-4"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [!isVisualCollapsed && /* @__PURE__ */ (void 0)("p", {
							className: "px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80",
							children: "Navigation"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 425,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col gap-1",
							children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
								item,
								active: isItemActive(item),
								isCollapsed: isVisualCollapsed
							}, item.label, false, {
								fileName: _jsxFileName$6,
								lineNumber: 431,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 429,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 423,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: isVisualCollapsed ? "pt-2" : "pt-2 border-t border-white/10",
							children: [!isVisualCollapsed && /* @__PURE__ */ (void 0)("p", {
								className: "mb-2 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80",
								children: [/* @__PURE__ */ (void 0)("span", { children: "NACORA AI" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 448,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full bg-primary/15 border border-primary/25 px-2 py-0.5 text-[10px] font-semibold text-primary",
									children: "Hub"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 449,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 447,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item: ASSISTANT,
									active: isItemActive(ASSISTANT),
									isCollapsed: isVisualCollapsed
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 455,
									columnNumber: 17
								}, this), STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: isItemActive(item),
									isCollapsed: isVisualCollapsed
								}, item.label, false, {
									fileName: _jsxFileName$6,
									lineNumber: 461,
									columnNumber: 19
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 454,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 441,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 417,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: cn("p-3 border-t border-white/10 flex flex-col gap-1", isVisualCollapsed ? "items-center px-2" : ""),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
							item: {
								label: "Paramètres",
								icon: Settings,
								to: "/parametres"
							},
							active: pathname === "/parametres",
							isCollapsed: isVisualCollapsed
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 479,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
							item: {
								label: "Mon profil",
								icon: UserRound,
								to: "/profil"
							},
							active: pathname === "/profil",
							isCollapsed: isVisualCollapsed
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 488,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 473,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 384,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: cn("relative z-10 flex flex-col min-h-screen transition-all duration-250", isCollapsed ? "md:pl-[72px]" : "md:pl-[254px]"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "sticky top-0 z-30 border-b border-white/12 bg-background/65 backdrop-blur-3xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.4),inset_0_-1px_0_0_rgba(255,255,255,0.06)]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto flex h-auto max-w-[1360px] flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:h-[64px] md:flex-nowrap md:py-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex w-full items-center gap-2.5 md:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setMenuOpen(true),
										"aria-label": "Ouvrir le menu",
										className: "press grid size-10 shrink-0 place-items-center rounded-xl border border-white/14 bg-white/6 text-foreground backdrop-blur-xl",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-4.5" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 517,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 511,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 519,
										columnNumber: 17
									}, this),
									importState.isImporting && /* @__PURE__ */ (void 0)("div", {
										className: "inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 px-2 py-1 text-[10px] font-semibold text-indigo-300",
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3 text-indigo-400 animate-spin" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 522,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", { children: [
											importState.current,
											"/",
											importState.total,
											" (",
											importState.percentage,
											"%)"
										] }, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 523,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 521,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "ml-auto flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: toggleHighContrast,
											"aria-label": "Améliorer le contraste",
											className: cn("grid size-10 shrink-0 place-items-center rounded-xl border transition-all", isHighContrast ? "border-primary bg-primary/15 text-primary" : "border-white/12 bg-white/6 text-muted-foreground"),
											children: isHighContrast ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4.5" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 542,
												columnNumber: 23
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4.5" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 544,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 530,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: bientot,
											"aria-label": "Notifications",
											className: "relative grid size-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6 text-muted-foreground transition-all hover:text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-4.5" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 553,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(216,26,69,0.8)]" }, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 554,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 547,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 529,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 510,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative w-full min-w-0 sm:w-auto sm:flex-1 md:max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 561,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value,
										onChange: (e) => onSearch ? onSearch(e.target.value) : setLocal(e.target.value),
										placeholder: "Rechercher une offre, une entreprise, un contact…",
										className: "h-10 w-full rounded-2xl border border-white/14 bg-white/6 dark:bg-white/6 pl-10 pr-12 text-sm text-foreground outline-none backdrop-blur-2xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-white/10 focus:ring-2 focus:ring-primary/25"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 562,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("kbd", {
										className: "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/12 bg-white/10 px-2 py-0.5 text-[10px] font-mono text-muted-foreground sm:block backdrop-blur-md",
										children: "⌘K"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 572,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 560,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "hidden md:flex items-center gap-2.5 shrink-0",
								children: [
									importState.isImporting && /* @__PURE__ */ (void 0)("div", {
										className: "inline-flex items-center gap-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 px-3 py-1.5 text-xs text-indigo-300 backdrop-blur-xl animate-pulse shadow-sm",
										title: importState.statusLabel || "Import et classification IA des contacts en cours...",
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-3.5 text-indigo-400 animate-spin" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 587,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-[11px]",
											children: [
												"Import IA : ",
												importState.current,
												"/",
												importState.total,
												" (",
												importState.percentage,
												"%)"
											]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 588,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 580,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: toggleHighContrast,
										"aria-label": "Améliorer le contraste",
										title: "Améliorer le contraste",
										className: cn("grid size-9.5 shrink-0 place-items-center rounded-xl border transition-all cursor-pointer backdrop-blur-md", isHighContrast ? "border-primary bg-primary/15 text-primary" : "border-white/12 bg-white/6 text-muted-foreground hover:text-foreground hover:bg-white/12"),
										children: isHighContrast ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 608,
											columnNumber: 21
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 610,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 595,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: bientot,
										"aria-label": "Notifications",
										className: "relative grid size-9.5 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/6 text-muted-foreground transition-all hover:text-foreground hover:bg-white/12 backdrop-blur-md cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 620,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(216,26,69,0.8)]" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 621,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 614,
										columnNumber: 17
									}, this),
									onAdd && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: onAdd,
										className: "press inline-flex h-9.5 items-center gap-2 rounded-xl bg-gradient-to-b from-[#EC0040] to-[#D81A45] px-4 text-xs font-semibold text-white border border-white/30 shadow-[0_6px_20px_rgba(216,26,69,0.45),inset_0_1px_1px_rgba(255,255,255,0.45)] hover:brightness-110 active:brightness-95 transition-all cursor-pointer",
										children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 630,
											columnNumber: 21
										}, this), " Nouvelle Opportunité"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 625,
										columnNumber: 19
									}, this),
									actions && /* @__PURE__ */ (void 0)("div", {
										className: "flex shrink-0 items-center gap-2",
										children: actions
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 635,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 578,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 508,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 507,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "flex-1 mx-auto w-full max-w-[1360px] px-4 py-5 sm:px-6 sm:py-6 pb-24 md:pb-10",
					children: [title && /* @__PURE__ */ (void 0)("div", {
						className: "mb-5 sm:mb-6 flex flex-wrap items-end justify-between gap-3 pb-3.5 border-b border-white/10",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "min-w-0 flex-1",
							children: [
								eyebrow && /* @__PURE__ */ (void 0)("p", {
									className: "mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary",
									children: eyebrow
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 649,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("h1", {
									className: "text-xl sm:text-2xl font-semibold tracking-tight text-foreground",
									children: title
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 653,
									columnNumber: 19
								}, this),
								subtitle && /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-xs sm:text-sm text-muted-foreground",
									children: subtitle
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 657,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 647,
							columnNumber: 17
						}, this), headerExtra && /* @__PURE__ */ (void 0)("div", {
							className: "flex w-full flex-wrap items-center gap-2 sm:w-auto",
							children: headerExtra
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 663,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 646,
						columnNumber: 15
					}, this), children]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 644,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 501,
				columnNumber: 9
			}, this),
			pathname !== "/assistant" && /* @__PURE__ */ (void 0)(Link, {
				to: "/assistant",
				className: "fixed bottom-20 right-4 z-30 flex items-center gap-2.5 rounded-full border border-white/20 bg-card/80 backdrop-blur-3xl px-4 py-2.5 text-xs font-semibold text-foreground shadow-[0_12px_36px_rgba(0,0,0,0.55),0_0_24px_rgba(216,26,69,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:border-primary/60 active:scale-95 md:bottom-6 md:right-6",
				title: "Ouvrir l'assistant IA Gemini",
				children: [
					/* @__PURE__ */ (void 0)("span", { className: "flex size-2 rounded-full bg-primary animate-pulse" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 680,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 681,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("span", {
						className: "tracking-tight",
						children: "NACORA AI"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 682,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 675,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "fixed inset-x-3 bottom-3 z-40 rounded-3xl border border-white/16 bg-[#0c0f1d]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-around px-2 py-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/opportunites",
							label: "Opportunités",
							icon: Target,
							active: pathname === "/opportunites"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 689,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/entreprises",
							label: "Entreprises",
							icon: Building2,
							active: pathname === "/entreprises"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 695,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: onAdd ?? bientot,
							"aria-label": "Ajouter une opportunité",
							className: "press -mt-5 grid size-11 shrink-0 place-items-center rounded-full bg-primary text-white shadow-sm transition-opacity",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 707,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 701,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/calendrier",
							label: "Calendrier",
							icon: CalendarDays,
							active: pathname === "/calendrier"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 709,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/profil",
							label: "Profil",
							icon: UserRound,
							active: pathname === "/profil"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 715,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 688,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 687,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 283,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 282,
		columnNumber: 5
	}, this);
}
function MobileTab({ to, label, icon: Icon, active }) {
	const klass = cn("flex flex-1 flex-col items-center gap-0.5 py-1 text-[10px] font-medium transition-colors select-none", active ? "text-primary" : "text-muted-foreground hover:text-foreground");
	const inner = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-4.5" }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 745,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: label }, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 746,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 744,
		columnNumber: 5
	}, this);
	return to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 750,
		columnNumber: 5
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 754,
		columnNumber: 5
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/select-By3qWUax.js
var _jsxFileName$5 = "/app/applet/src/components/ui/select.tsx";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger$1, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between whitespace-nowrap rounded-xl border border-white/12 bg-white/5 backdrop-blur-md px-3.5 py-2 text-sm text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] cursor-pointer data-[placeholder]:text-muted-foreground/60 transition-all hover:bg-white/8 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-40 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 opacity-60" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 29,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 28,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 19,
	columnNumber: 3
}, void 0));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 47,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 39,
	columnNumber: 3
}, void 0));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 64,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 56,
	columnNumber: 3
}, void 0));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[9.5rem] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-card/92 backdrop-blur-2xl text-popover-foreground shadow-[0_20px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.28)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton, {}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 86,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectViewport, {
			className: cn("p-1.5", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 87,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton, {}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 96,
			columnNumber: 7
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 75,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 74,
	columnNumber: 3
}, void 0));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectLabel$1, {
	ref,
	className: cn("px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 106,
	columnNumber: 3
}, void 0));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-pointer select-none items-center rounded-xl py-2 pl-2.5 pr-8 text-sm outline-none transition-all hover:bg-white/10 hover:text-foreground focus:bg-white/12 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-40", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute right-2.5 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4 text-primary" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 131,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 130,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 129,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemText, { children }, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 134,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$5,
	lineNumber: 121,
	columnNumber: 3
}, void 0));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 143,
	columnNumber: 3
}, void 0));
SelectSeparator.displayName = SelectSeparator$1.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/input-DQmS9xOQ.js
var _jsxFileName$4 = "/app/applet/src/components/ui/input.tsx";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
		type,
		className: cn("flex h-10 w-full rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md px-3.5 py-2 text-sm font-normal text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary/60 focus-visible:bg-white/8 focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Input.displayName = "Input";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/label-BO3ZCeYH.js
var _jsxFileName$3 = "/app/applet/src/components/ui/label.tsx";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3,
	lineNumber: 18,
	columnNumber: 3
}, void 0));
Label.displayName = Root.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-CsNxPMmK.js
var _jsxFileName$2 = "/app/applet/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-[100px] w-full rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md px-4 py-3 text-sm font-normal text-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary/60 focus-visible:bg-white/8 focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-40 leading-relaxed transition-all", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 10,
		columnNumber: 5
	}, void 0);
});
Textarea.displayName = "Textarea";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Dsyzrx5P.js
var _jsxFileName$1 = "/app/applet/src/components/ui/badge.tsx";
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-md transition-all select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]", {
	variants: { variant: {
		default: "border-primary/30 bg-primary/20 text-primary shadow-[0_0_10px_rgba(216,26,69,0.2)]",
		vibrant: "border-primary/40 bg-primary/25 text-white shadow-[0_0_12px_rgba(216,26,69,0.3)]",
		secondary: "border-white/10 bg-white/8 text-secondary-foreground",
		bordeaux: "border-[#780328]/40 bg-[#780328]/25 text-[#FEC9D5]",
		soft: "border-white/10 bg-white/5 text-muted-foreground",
		destructive: "border-destructive/30 bg-destructive/15 text-destructive",
		outline: "border-white/15 text-foreground bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CTficoHX.js
var _jsxFileName = "/app/applet/src/components/ui/progress.tsx";
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root$1, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-white/10 dark:bg-white/10 border border-white/5 shadow-inner", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Indicator, {
		className: "h-full w-full flex-1 liquid-bar transition-all duration-500 rounded-full",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
Progress.displayName = Root$1.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/profil-cloud-BKSU-WDL.js
function toProfil(r) {
	const base = emptyProfil();
	const cvStructure = normaliserCvStructure(r.cv_structure);
	return {
		...base,
		prenom: r.prenom ?? "",
		nom: r.nom ?? "",
		titre: cvStructure.titre || "",
		formation: r.formation ?? base.formation,
		ecole: r.ecole ?? base.ecole,
		niveau: r.niveau ?? base.niveau,
		localisation: r.localisation ?? "",
		pays: cvStructure.pays || "France",
		mobilite: r.mobilite ?? "",
		contrats: r.contrats ?? base.contrats,
		domaines: r.domaines ?? "",
		metiers: r.metiers ?? "",
		entreprisesCiblees: r.entreprises_ciblees ?? "",
		competences: r.competences ?? "",
		logiciels: r.logiciels ?? "",
		langues: r.langues ?? "",
		niveauAnglais: r.niveau_anglais ?? "",
		experiences: r.experiences ?? "",
		teletravail: r.teletravail ?? "",
		modeTravail: cvStructure.preferences?.teletravailPrefere || (r.teletravail?.includes("100%") ? "teletravail" : "hybride"),
		remuneration: r.remuneration ?? "",
		dateDebut: r.date_debut ?? "",
		duree: r.duree ?? "",
		rechercheVraie: cvStructure?.rechercheVraie || "",
		environnements: cvStructure?.environnements || ["Grand groupe", "Scale-up"],
		prioritesRecherche: cvStructure?.prioritesRecherche || ["Missions apprenantes", "Mentorat / Équipe"],
		emailContact: cvStructure.email || "",
		telephone: cvStructure.telephone || "",
		linkedin: cvStructure.linkedin || "",
		portfolio: cvStructure.portfolio || "",
		github: cvStructure.github || "",
		permis: cvStructure.permis || "",
		photoUrl: cvStructure.photoUrl || "",
		criteres: r.criteres ?? base.criteres,
		cv: r.cv ?? null,
		cvStructure,
		preferences: cvStructure.preferences || {}
	};
}
function toRow(p, userId) {
	const cvStructure = normaliserCvStructure({
		...p.cvStructure,
		titre: p.titre || p.cvStructure.titre,
		email: p.emailContact || p.cvStructure.email,
		telephone: p.telephone || p.cvStructure.telephone,
		linkedin: p.linkedin || p.cvStructure.linkedin,
		portfolio: p.portfolio || p.cvStructure.portfolio,
		github: p.github || p.cvStructure.github,
		permis: p.permis || p.cvStructure.permis,
		photoUrl: p.photoUrl || p.cvStructure.photoUrl,
		ville: p.localisation || p.cvStructure.ville,
		pays: p.pays || p.cvStructure.pays,
		preferences: {
			...p.cvStructure.preferences,
			...p.preferences,
			teletravailPrefere: p.modeTravail || p.cvStructure.preferences?.teletravailPrefere || "hybride"
		},
		...p.rechercheVraie ? { rechercheVraie: p.rechercheVraie } : {},
		...p.environnements ? { environnements: p.environnements } : {},
		...p.prioritesRecherche ? { prioritesRecherche: p.prioritesRecherche } : {}
	});
	return {
		user_id: userId,
		prenom: p.prenom,
		nom: p.nom,
		formation: p.formation,
		ecole: p.ecole,
		niveau: p.niveau,
		localisation: p.localisation,
		mobilite: p.mobilite,
		contrats: p.contrats,
		domaines: p.domaines,
		metiers: p.metiers,
		entreprises_ciblees: p.entreprisesCiblees,
		competences: p.competences,
		logiciels: p.logiciels,
		langues: p.langues,
		niveau_anglais: p.niveauAnglais,
		experiences: p.experiences,
		teletravail: p.teletravail,
		remuneration: p.remuneration,
		date_debut: p.dateDebut || null,
		duree: p.duree,
		criteres: p.criteres,
		cv: p.cv ?? null,
		cv_structure: cvStructure,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function sanitizeForFirestore(data) {
	return JSON.parse(JSON.stringify(data, (_, v) => v === void 0 ? null : v));
}
async function fetchProfil(userId) {
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		const snap = await getDoc(doc(db, "profils", userId));
		if (snap.exists()) return toProfil(snap.data());
	} catch (e) {
		console.warn("Firestore fetchProfil error:", e);
		handleFirestoreError(e, OperationType.GET, `profils/${userId}`);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("profils").select("*").maybeSingle();
		if (error) throw error;
		return data ? toProfil(data) : null;
	}
	return null;
}
async function saveProfilCloud(p, userId) {
	const rowData = sanitizeForFirestore(toRow(p, userId));
	if (isFirebaseConfigured() && userId && auth.currentUser && auth.currentUser.uid === userId) try {
		await setDoc(doc(db, "profils", userId), rowData, { merge: true });
		return toProfil(rowData);
	} catch (e) {
		console.error("Firestore saveProfilCloud error:", e);
		handleFirestoreError(e, OperationType.WRITE, `profils/${userId}`);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("profils").upsert(rowData, { onConflict: "user_id" }).select().single();
		if (error) throw error;
		return toProfil(data);
	}
	return p;
}
//#endregion
export { emptyProfil as $, CATEGORIES_CONTACT as A, parseVCardString as At, TYPES_ENTRETIEN as B, transitionWorkflowStep as Bt, fetchContacts as C, nouvelleCertification as Ct, useContacts as D, nouvelleLangue as Dt, useContactImport as E, nouvelleFormation as Et, NIVEAUX_LANGUE as F, setCompteActif as Ft, completionCv as G, cn as Gt, WORKFLOW_STEPS_CONFIG as H, workflowStepKeyToStatut as Ht, SOURCE_LABELS as I, simulerConnexionDemo as It, cvStructureEnTexte as J, computeContactRelevance as K, STATUTS as L, statutToWorkflowStepKey as Lt, LIBELLES_RELANCE as M, saveCandidatures as Mt, Logo as N, saveContactsLocal as Nt, useSession as O, parseLinkedInCsv as Ot, NIVEAUX_COMPETENCE as P, saveProfilLocal as Pt, emptyPreparation as Q, STATUTS_OPPORTUNITE as R, supprimerCompteEnregistre as Rt, createSsrRpc as S, nouvelEchange as St, upsertContact as T, nouvelleExperience as Tt, addDays as U, Button as Ut, TYPES_RELANCE as V, validerIntegriteCandidature as Vt, auth as W, buttonVariants as Wt, emptyCandidature as X, db as Y, emptyContact as Z, TooltipContent as _, loadProfil as _t, Textarea as a, getCompteActif as at, batchUpsertContacts as b, nouveauBenevolat as bt, Select as c, getContactFullName as ct, SelectTrigger as d, getWorkflowStepConfig as dt, enrichContactWithoutLoss as et, SelectValue as f, inscrireUtilisateurLocal as ft, Tooltip as g, loadContactsLocal as gt, OperationType as h, loadCandidatures as ht, Badge as i, getCategoryBadgeStyle as it, CHANNELS_COMMUNICATION as j, reinitialiserMotDePasseLocal as jt, CANAUX as k, parseRawContactInput as kt, SelectContent as l, getContactJobTitle as lt, ContactImportProvider as m, isFirebaseConfigured as mt, saveProfilCloud as n, findPotentialDuplicate as nt, Label as o, getComptesEnregistres as ot, AppShell as p, isDeadlineOverdue as pt, connecterUtilisateurLocal as q, Progress as r, formatDate as rt, Input as s, getContactCompany as st, fetchProfil as t, findMatchingContact as tt, SelectItem as u, getInitials as ut, TooltipProvider as v, normaliserCvStructure as vt, handleFirestoreError as w, nouvelleCompetence as wt, classifyContactsBatchServerFn as x, nouveauProjet as xt, TooltipTrigger as y, normalizeCandidature as yt, TYPES_CONTACT as z, todayIso as zt };
