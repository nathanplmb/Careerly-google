import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { n as cn } from "./button-DRsC1qZi.mjs";
import { r as getAuth } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { c as doc, l as getFirestore, r as getDocFromServer } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-C8Jjp8M3.js
var import_jsx_runtime = require_jsx_runtime();
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
		"DEV": false,
		"MODE": "production",
		"PROD": true,
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
		"DEV": false,
		"MODE": "production",
		"PROD": true,
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
		"DEV": false,
		"MODE": "production",
		"PROD": true,
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
		"DEV": false,
		"MODE": "production",
		"PROD": true,
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
		"DEV": false,
		"MODE": "production",
		"PROD": true,
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
		"DEV": false,
		"MODE": "production",
		"PROD": true,
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
var db = firebase_applet_config_default.firestoreDatabaseId && firebase_applet_config_default.firestoreDatabaseId !== "(default)" ? getFirestore(app, firebase_applet_config_default.firestoreDatabaseId) : getFirestore(app);
function isFirebaseConfigured() {
	return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}
async function testFirebaseConnection() {
	if (!isFirebaseConfigured()) return;
	try {
		await getDocFromServer(doc(db, "test", "connection"));
	} catch (error) {
		if (error instanceof Error && error.message.includes("offline")) console.warn("Firebase Firestore is currently offline.");
	}
}
if (typeof window !== "undefined") testFirebaseConnection().catch(() => {});
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
		resultats: "",
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
			competences: Array.isArray(e.competences) ? e.competences : [],
			outils: Array.isArray(e.outils) ? e.outils : []
		})),
		formations: liste(brut.formations, nouvelleFormation).map((f) => ({
			...f,
			coursImportants: Array.isArray(f.coursImportants) ? f.coursImportants : [],
			projets: Array.isArray(f.projets) ? f.projets : []
		})),
		certifications: liste(brut.certifications, nouvelleCertification).map((c) => ({
			...c,
			competencesAssociees: Array.isArray(c.competencesAssociees) ? c.competencesAssociees : []
		})),
		projets: liste(brut.projets, nouveauProjet).map((p) => ({
			...p,
			technologies: Array.isArray(p.technologies) ? p.technologies : [],
			competences: Array.isArray(p.competences) ? p.competences : []
		})),
		competences: liste(brut.competences, nouvelleCompetence),
		langues: liste(brut.langues, nouvelleLangue),
		benevolats: liste(brut.benevolats, nouveauBenevolat).map((b) => ({
			...b,
			responsabilites: Array.isArray(b.responsabilites) ? b.responsabilites : [],
			realisations: Array.isArray(b.realisations) ? b.realisations : [],
			competences: Array.isArray(b.competences) ? b.competences : []
		})),
		distinctions: liste(brut.distinctions, nouvelleDistinction),
		interets: Array.isArray(brut.interets) ? brut.interets.filter(Boolean) : [],
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
		for (const c of cv.certifications) l.push(`• ${c.nom} (${c.organisme}, ${c.date}${c.identifiant ? `, ID: ${c.identifiant}` : ""}${c.lien ? ` - ${c.lien}` : ""})`);
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
/** Logo NACORA officiel : utilise l'image du logo fourni par l'utilisateur avec l'icône orbite violette et la typographie NACORA au point violet. */
function Logo({ compact = false, className }) {
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/nacora-mark.svg",
			alt: "NACORA Icon",
			className: "size-9 shrink-0 object-contain",
			referrerPolicy: "no-referrer"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 380 90",
			className: "h-9 w-auto shrink-0 overflow-visible text-foreground dark:text-white",
			"aria-label": "NACORA Logo",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "nacora-logo-grad-main",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#a855f7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#9333ea"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#7c3aed"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(5, 5)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "40",
							cy: "40",
							r: "30",
							stroke: "url(#nacora-logo-grad-main)",
							strokeWidth: "7",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "40",
							cy: "40",
							r: "13",
							fill: "url(#nacora-logo-grad-main)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "62",
							cy: "18",
							r: "8",
							fill: "url(#nacora-logo-grad-main)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(95, 5)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 8 60 V 20 L 38 60 V 20",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 50 60 L 68 20 L 86 60 M 56 47 H 80",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 134 27 C 127 19 108 19 101 27 C 91 37 91 43 101 53 C 108 61 127 61 134 53",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "162",
							cy: "40",
							r: "20",
							stroke: "currentColor",
							strokeWidth: "2.5",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "162",
							cy: "40",
							r: "6",
							fill: "url(#nacora-logo-grad-main)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 198 60 V 20 H 222 C 235 20 235 40 222 40 H 198 M 218 40 L 236 60",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 248 60 L 266 20 L 284 60 M 254 47 H 278",
							stroke: "currentColor",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							fill: "none"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { reinitialiserMotDePasseLocal as C, supprimerCompteEnregistre as D, simulerConnexionDemo as E, nouvelleLangue as S, setCompteActif as T, nouveauProjet as _, completionCv as a, nouvelleExperience as b, db as c, getComptesEnregistres as d, inscrireUtilisateurLocal as f, nouveauBenevolat as g, normaliserCvStructure as h, auth as i, emptyProfil as l, loadProfil as m, NIVEAUX_COMPETENCE as n, connecterUtilisateurLocal as o, isFirebaseConfigured as p, NIVEAUX_LANGUE as r, cvStructureEnTexte as s, Logo as t, getCompteActif as u, nouvelleCertification as v, saveProfilLocal as w, nouvelleFormation as x, nouvelleCompetence as y };
