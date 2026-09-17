import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { N as Slot } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-DlNPIy5Y.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as House, A as Plus, C as Search, G as Linkedin, Gt as Bell, Ht as Building2, I as MessageSquare, L as Menu, Nt as ChevronDown, S as Settings, a as Users, c as UserRound, d as Upload, h as Target, i as WandSparkles, j as Plug, lt as FileText, n as X, w as ScanLine, y as Shield, z as Mail, zt as CalendarDays } from "../_libs/lucide-react.mjs";
import "../_libs/firebase.mjs";
import { c as setPersistence, i as getAuth, n as browserLocalPersistence, o as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import { c as getFirestore, n as getDoc, s as doc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as router_exports } from "./router-CeQVKm6O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-g9fq33f2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$3 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
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
		fileName: _jsxFileName$3,
		lineNumber: 48,
		columnNumber: 7
	}, void 0);
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/input-DanbVdXK.js
var _jsxFileName$2 = "/app/applet/src/components/ui/input.tsx";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Input.displayName = "Input";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-applet-config-wXbU7bJb.js
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
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/auth-local-D-V5eVSy.js
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
function getProfilStorageKey(userId) {
	return userId ? `nacora_${userId}_profil_v1` : "nacora_guest_profil_v1";
}
function loadProfil(userId) {
	if (typeof window === "undefined") return emptyProfil();
	try {
		const key = getProfilStorageKey(userId);
		let raw = window.localStorage.getItem(key);
		if (!raw && userId) {
			const oldRaw = window.localStorage.getItem(PROFIL_STORAGE_KEY);
			if (oldRaw) {
				window.localStorage.setItem(key, oldRaw);
				window.localStorage.removeItem(PROFIL_STORAGE_KEY);
				raw = oldRaw;
			}
		}
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
function saveProfilLocal(p, userId) {
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
	const key = getProfilStorageKey(userId);
	window.localStorage.setItem(key, JSON.stringify(payload));
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
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-Y8BClsf8.js
var _jsxFileName$1 = "/app/applet/src/components/Logo.tsx";
/** Logo NACORA officiel : utilise l'image du logo fourni par l'utilisateur avec l'icône orbite violette et la typographie NACORA au point violet. */
function Logo({ compact = false, className }) {
	if (compact) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("inline-flex items-center", className),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			src: "/nacora-mark.svg",
			alt: "NACORA Icon",
			className: "size-9 shrink-0 object-contain",
			referrerPolicy: "no-referrer"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 14,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 13,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("inline-flex items-center", className),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 380 90",
			className: "h-9 w-auto shrink-0 overflow-visible text-foreground dark:text-white",
			"aria-label": "NACORA Logo",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
					id: "nacora-logo-grad-main",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
							offset: "0%",
							stopColor: "#a855f7"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 39,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
							offset: "50%",
							stopColor: "#9333ea"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 40,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
							offset: "100%",
							stopColor: "#7c3aed"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 41,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 32,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 31,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
					transform: "translate(5, 5)",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "40",
							cy: "40",
							r: "30",
							stroke: "url(#nacora-logo-grad-main)",
							strokeWidth: "7",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 47,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "40",
							cy: "40",
							r: "13",
							fill: "url(#nacora-logo-grad-main)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 55,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "62",
							cy: "18",
							r: "8",
							fill: "url(#nacora-logo-grad-main)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 56,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", {
					transform: "translate(95, 5)",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: "M 8 60 V 20 L 38 60 V 20",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 62,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: "M 50 60 L 68 20 L 86 60 M 56 47 H 80",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 71,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: "M 134 27 C 127 19 108 19 101 27 C 91 37 91 43 101 53 C 108 61 127 61 134 53",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 80,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "162",
							cy: "40",
							r: "20",
							stroke: "currentColor",
							strokeWidth: "2.5",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 89,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
							cx: "162",
							cy: "40",
							r: "6",
							fill: "url(#nacora-logo-grad-main)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 97,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: "M 198 60 V 20 H 222 C 235 20 235 40 222 40 H 198 M 218 40 L 236 60",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 99,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
							d: "M 248 60 L 266 20 L 284 60 M 254 47 H 278",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 108,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 60,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 26,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 25,
		columnNumber: 5
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/useSession-l1KXLykY.js
/**
* Vérifie si un UID possède les droits administrateurs dans Firestore (/admins/{uid}).
*/
async function checkIsAdmin(uid) {
	if (!uid || !isFirebaseConfigured()) return false;
	try {
		return (await getDoc(doc(db, "admins", uid))).exists();
	} catch (err) {
		console.warn("Échec vérification statut admin:", err);
		return false;
	}
}
var _jsxFileName = "/app/applet/src/components/AppShell.tsx";
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
		label: "Entreprises",
		icon: Building2,
		to: "/entreprises"
	},
	{
		label: "Contacts",
		icon: Users,
		to: "/contacts"
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
		label: "Importer",
		icon: Upload,
		to: "/import"
	}
];
var STUDIO = [
	{
		label: "CV Optimizer",
		icon: ScanLine,
		to: "/profil",
		sub: true
	},
	{
		label: "Email Assistant",
		icon: Mail,
		to: "/contacts",
		sub: true
	},
	{
		label: "LinkedIn Assistant",
		icon: Linkedin,
		to: "/assistant/linkedin",
		sub: true
	},
	{
		label: "Interview Coach",
		icon: MessageSquare,
		to: "/assistant/interview",
		sub: true
	},
	{
		label: "Connecter une IA",
		icon: Plug,
		to: "/assistant/connect",
		sub: true
	}
];
var ASSISTANT = {
	label: "NACORA AI (Hub)",
	icon: WandSparkles,
	to: "/assistant"
};
var bientot = () => toast("Bientôt disponible dans NACORA.");
function NavRow({ item, active }) {
	const inner = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: "size-[18px] shrink-0" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "truncate",
		children: item.label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 87,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 5
	}, this);
	const klass = cn("group relative flex w-full items-center gap-3 rounded-xl py-2.5 text-[13.5px] font-medium transition-colors", item.sub ? "pl-4 pr-3 text-[13px]" : "px-3", active ? "bg-primary/15 text-foreground ring-1 ring-primary/35" : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground");
	return item.to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: item.to,
		className: klass,
		children: [active && /* @__PURE__ */ (void 0)("span", { className: "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 100,
			columnNumber: 9
		}, this), inner]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 98,
		columnNumber: 5
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 105,
		columnNumber: 5
	}, this);
}
function AppShell({ title, subtitle, eyebrow, headerExtra, actions, onAdd, onSearch, searchValue, children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [local, setLocal] = (0, import_react.useState)("");
	const value = searchValue ?? local;
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [isAdminUser, setIsAdminUser] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		async function check() {
			const fUser = auth.currentUser;
			const lUser = getCompteActif();
			const email = (fUser?.email || lUser?.email || "").toLowerCase();
			const uid = fUser?.uid || lUser?.id || "";
			if (email === "nathpa1423@gmail.com") {
				if (active) setIsAdminUser(true);
				return;
			}
			if (uid) {
				const isAdm = await checkIsAdmin(uid);
				if (active) setIsAdminUser(isAdm);
			}
		}
		check();
		const unsub = auth.onAuthStateChanged(() => {
			check();
		});
		return () => {
			active = false;
			unsub();
		};
	}, []);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background aurora-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: cn("fixed inset-0 z-50 md:hidden", menuOpen ? "pointer-events-auto" : "pointer-events-none"),
				"aria-hidden": !menuOpen,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					"aria-label": "Fermer le menu",
					onClick: () => setMenuOpen(false),
					className: cn("absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300", menuOpen ? "opacity-100" : "opacity-0")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: cn("absolute inset-y-0 left-0 flex w-[82%] max-w-[300px] flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-300 ease-out", menuOpen ? "translate-x-0" : "-translate-x-full"),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-[68px] shrink-0 items-center justify-between gap-2 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							"aria-label": "Fermer le menu",
							onClick: () => setMenuOpen(false),
							className: "grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 217,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 h-px bg-sidebar-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "✦"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
								item: ASSISTANT,
								active: pathname === "/assistant"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2",
								children: STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 h-px bg-sidebar-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: [
									isAdminUser && /* @__PURE__ */ (void 0)(NavRow, {
										item: {
											label: "Administration",
											icon: Shield,
											to: "/admin"
										},
										active: pathname === "/admin"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
										item: {
											label: "Paramètres",
											icon: Settings,
											to: "/parametres"
										},
										active: pathname === "/parametres"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
										item: {
											label: "Mon profil",
											icon: UserRound,
											to: "/profil"
										},
										active: pathname === "/profil"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 262,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 243,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 214,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 180,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-[72px] items-center px-5",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "flex-1 overflow-y-auto px-3 pb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-1",
								children: MAIN.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 15
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 278,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "my-4 h-px bg-sidebar-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 288,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mb-2 flex items-center gap-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
								children: ["NACORA AI ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-primary",
									children: "✦"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 291,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 290,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
								item: ASSISTANT,
								active: pathname === "/assistant"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 293,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-1 ml-5 flex flex-col gap-1 border-l border-sidebar-border pl-2",
								children: STUDIO.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavRow, {
									item,
									active: item.to === pathname
								}, item.label, false, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 15
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 277,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-3 pb-3",
						children: [
							isAdminUser && /* @__PURE__ */ (void 0)(Link, {
								to: "/admin",
								className: cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors mb-1", pathname === "/admin" ? "bg-primary/15 text-foreground ring-1 ring-primary/35 font-semibold" : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"),
								children: [/* @__PURE__ */ (void 0)(Shield, { className: "size-[18px] text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 15
								}, this), " Administration"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 307,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/parametres",
								className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "size-[18px]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 13
								}, this), " Paramètres"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/profil",
								className: "mt-2 flex items-center gap-3 rounded-2xl border border-sidebar-border bg-card/70 px-3 py-2.5 transition-colors hover:bg-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "grid size-9 shrink-0 place-items-center rounded-full gradient-hero text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserRound, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 332,
											columnNumber: 15
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 331,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "min-w-0 flex-1 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "block truncate text-[13px] font-semibold",
											children: "Mon compte"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 335,
											columnNumber: 15
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "block truncate text-[11px] text-muted-foreground",
											children: "Voir mon profil"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 338,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 334,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 342,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 305,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 272,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "md:pl-[248px]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "sticky top-0 z-30 border-b border-border/50 bg-background/75 backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto flex h-auto max-w-[1200px] flex-wrap items-center gap-3 px-4 py-3.5 sm:px-6 md:h-[72px] md:flex-nowrap md:py-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex w-full items-center gap-2 md:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setMenuOpen(true),
										"aria-label": "Ouvrir le menu",
										className: "press grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-card/60 text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 358,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 360,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: bientot,
										"aria-label": "Notifications",
										className: "relative ml-auto grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-[18px]" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 367,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
											children: "3"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 368,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 361,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 351,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative w-full min-w-0 sm:w-auto sm:flex-1 md:mx-auto md:max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 375,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value,
										onChange: (e) => onSearch ? onSearch(e.target.value) : setLocal(e.target.value),
										placeholder: "Rechercher une offre, une entreprise…",
										className: "h-10 w-full rounded-full border border-border/70 bg-card/60 pl-10 pr-4 sm:pr-14 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 376,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("kbd", {
										className: "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block",
										children: "⌘K"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: bientot,
								"aria-label": "Notifications",
								className: "relative hidden md:grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "size-[18px]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 395,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground",
									children: "3"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 13
							}, this),
							onAdd && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: onAdd,
								className: "press hidden shrink-0 items-center gap-2 rounded-full gradient-hero px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-[0_8px_24px_-12px_var(--color-primary)] sm:inline-flex",
								children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 407,
									columnNumber: 17
								}, this), " Ajouter une opportunité"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 402,
								columnNumber: 15
							}, this),
							actions && /* @__PURE__ */ (void 0)("div", {
								className: "flex shrink-0 flex-wrap items-center gap-2",
								children: actions
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 412,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 350,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 349,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "pop-in mx-auto max-w-[1200px] px-4 pb-28 pt-5 sm:px-6 sm:pt-6 md:pb-12",
					children: [title && /* @__PURE__ */ (void 0)("div", {
						className: "pop-in mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "min-w-0",
							children: [
								eyebrow && /* @__PURE__ */ (void 0)("p", {
									className: "mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary",
									children: eyebrow
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 424,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("h1", {
									className: "text-[22px] font-extrabold tracking-tight sm:text-[28px]",
									children: title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 428,
									columnNumber: 17
								}, this),
								subtitle && /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: subtitle
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 432,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 422,
							columnNumber: 15
						}, this), headerExtra && /* @__PURE__ */ (void 0)("div", {
							className: "flex w-full flex-wrap items-center gap-2 [&>*]:flex-1 sm:w-auto sm:[&>*]:flex-none",
							children: headerExtra
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 438,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 421,
						columnNumber: 13
					}, this), children]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 419,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 348,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-end justify-around px-2 pt-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/",
							label: "Accueil",
							icon: House,
							active: pathname === "/"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 451,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/opportunites",
							label: "Opportunités",
							icon: Target,
							active: pathname === "/opportunites"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 457,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: onAdd ?? bientot,
							"aria-label": "Ajouter une opportunité",
							className: "press -mt-6 grid size-14 shrink-0 place-items-center self-center rounded-full gradient-hero text-primary-foreground shadow-[0_10px_30px_-10px_var(--color-primary)]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 469,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 463,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/calendrier",
							label: "Calendrier",
							icon: CalendarDays,
							active: pathname === "/calendrier"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 471,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTab, {
							to: "/profil",
							label: "Profil",
							icon: UserRound,
							active: pathname === "/profil"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 477,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 450,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 449,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 178,
		columnNumber: 5
	}, this);
}
function MobileTab({ to, label, icon: Icon, active }) {
	const klass = cn("flex flex-1 flex-col items-center gap-1 py-2 text-[10.5px] font-medium transition-colors", active ? "text-primary" : "text-muted-foreground");
	const inner = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-[19px]" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 506,
		columnNumber: 7
	}, this), label] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 505,
		columnNumber: 5
	}, this);
	return to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 511,
		columnNumber: 5
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: bientot,
		className: klass,
		children: inner
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 515,
		columnNumber: 5
	}, this);
}
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
//#endregion
export { supprimerCompteEnregistre as A, nouvelleExperience as C, saveProfilLocal as D, reinitialiserMotDePasseLocal as E, cn as F, Input as M, Button as N, setCompteActif as O, buttonVariants as P, nouvelleCompetence as S, nouvelleLangue as T, loadProfil as _, NIVEAUX_COMPETENCE as a, nouveauProjet as b, completionCv as c, db as d, emptyProfil as f, isFirebaseConfigured as g, inscrireUtilisateurLocal as h, Logo as i, firebase_applet_config_default as j, simulerConnexionDemo as k, connecterUtilisateurLocal as l, getComptesEnregistres as m, AppShell as n, NIVEAUX_LANGUE as o, getCompteActif as p, useSession as r, auth as s, router_exports as t, cvStructureEnTexte as u, normaliserCvStructure as v, nouvelleFormation as w, nouvelleCertification as x, nouveauBenevolat as y };
