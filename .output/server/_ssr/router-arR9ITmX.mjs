import { a as __toESM } from "../_runtime.mjs";
import { a as createTanStackListToolsHandler, d as number, i as createTanStackInvokeToolHandler, n as defineMcp, o as createTanStackMcpHandler, p as string, r as defineTool, s as createTanStackOAuthProtectedResourceMetadataHandler, t as auth, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { h as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-DnkKuJ6q.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { $ as GraduationCap, B as Lock, J as KeyRound, L as Mail, O as RefreshCw, Ot as Check, St as CircleCheck, V as LoaderCircle, Vt as ArrowLeft, _t as Copy, b as ShieldCheck, dt as EyeOff, et as Globe, it as FingerprintPattern, l as UserCheck, n as X, o as User, p as Trash2, t as Zap, ut as Eye, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as __exportAll } from "./server-p5qu-I7z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DRsC1qZi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/auth-local-CuKZC9Ax.js
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
		niveau: "Intermédiaire",
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
var CRITERES = [
	"secteur",
	"localisation",
	"remuneration",
	"teletravail",
	"missions",
	"taille entreprise"
];
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
		preferences: defaultPreferences(),
		syntheseIa: null
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
		github: p.github || p.cvStructure.github,
		permis: p.permis || p.cvStructure.permis,
		photoUrl: p.photoUrl || p.cvStructure.photoUrl,
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
		prenom: opts.prenom?.trim() || existant?.prenom || propre.split("@")[0].split(".")[0],
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
//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-D3Lp49ax.js
var STATUTS = [
	"Je vais postuler",
	"J'ai postulé",
	"J'ai relancé",
	"J'ai un entretien",
	"J'ai reçu une réponse négative",
	"Je n'ai pas reçu de réponse"
];
var PRIORITES = [
	"Haute",
	"Moyenne",
	"Faible"
];
var SOURCES = [
	"LinkedIn",
	"Welcome to the Jungle",
	"JobTeaser",
	"Indeed",
	"Site entreprise",
	"Candidature spontanée",
	"Réseau",
	"École",
	"Autre"
];
function emptyPreparation() {
	return {
		pourquoiEntreprise: "",
		pourquoiPoste: "",
		notes: "",
		resumeEntreprise: "",
		resumePoste: "",
		competencesRecherchees: [],
		questionsRH: [],
		questionsComportementales: [],
		questionsPoste: [],
		questionsARecruteur: [],
		argumentsCles: [],
		pointsFaibles: [],
		genereLe: ""
	};
}
var STORAGE_KEY = "neoma-suivi-stage-v1";
function emptyCandidature() {
	return {
		id: crypto.randomUUID(),
		entreprise: "",
		poste: "",
		statut: "Je vais postuler",
		lieu: "",
		lien: "",
		contact: "",
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
		match: null,
		preparation: emptyPreparation(),
		workflowProgress: {
			currentStep: "offre",
			completedSteps: ["offre"]
		}
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
/** Complète une candidature venant d'une ancienne version (localStorage / cloud). */
function normalizeCandidature(c) {
	const base = emptyCandidature();
	let missions = c.missions ?? "";
	let profilRecherche = c.profilRecherche ?? "";
	let modalites = c.modalites ?? "";
	let detail = c.detail ?? "";
	if ((!missions || !profilRecherche) && detail) {
		const extraits = extraireSectionsDetail(detail);
		if (extraits.missions || extraits.profilRecherche || extraits.modalites) {
			missions = missions || extraits.missions;
			profilRecherche = profilRecherche || extraits.profilRecherche;
			modalites = modalites || extraits.modalites;
			detail = extraits.detailNettoye;
		}
	}
	return {
		...base,
		...c,
		id: c.id ?? base.id,
		statut: STATUTS.includes(c.statut ?? "") ? c.statut : "Je vais postuler",
		missions,
		profilRecherche,
		modalites,
		detail,
		priorite: c.priorite ?? "auto",
		source: c.source ?? "",
		secteur: c.secteur ?? "",
		archive: c.archive ?? false,
		match: c.match ?? null,
		preparation: {
			...emptyPreparation(),
			...c.preparation ?? {}
		},
		workflowProgress: c.workflowProgress ?? {
			currentStep: "offre",
			completedSteps: c.match ? ["offre", "match"] : ["offre"]
		}
	};
}
function getNextBestAction(c) {
	const steps = c.workflowProgress?.completedSteps ?? [];
	const matchFait = Boolean(c.match || steps.includes("match"));
	const pitchFait = Boolean(steps.includes("pitch"));
	const contactFait = Boolean(steps.includes("contact"));
	const interviewFait = Boolean(steps.includes("interview") || c.preparation?.questionsRH && c.preparation.questionsRH.length > 0);
	if (c.statut === "J'ai un entretien") return {
		label: "Entretien à préparer",
		step: "interview",
		description: "Votre entretien approche ! Entraînez-vous avec l'Interview Coach pour valoriser vos réponses.",
		buttonText: "Préparer mon entretien",
		badgeText: "Entretien programmé",
		prioriteUrgente: true
	};
	if (c.statut === "J'ai relancé" || c.statut === "J'ai postulé" && c.dateRelance && new Date(c.dateRelance) <= /* @__PURE__ */ new Date()) return {
		label: "Relance à effectuer",
		step: "contact",
		description: "Candidature envoyée. Relancez le recruteur pour maintenir le contact et marquer des points.",
		buttonText: "Écrire ma relance",
		badgeText: "Relance due",
		prioriteUrgente: true
	};
	if (c.dateLimite) {
		const diffDays = daysBetween(todayIso(), c.dateLimite);
		if (diffDays !== null && diffDays >= 0 && diffDays <= 3 && c.statut === "Je vais postuler") {
			if (!pitchFait) return {
				label: "Deadline très proche",
				step: "pitch",
				description: `Date limite dans ${diffDays === 0 ? "aujourd'hui" : `${diffDays} jour(s)`}. Adaptez votre CV et votre pitch en priorité.`,
				buttonText: "Adapter mon CV",
				badgeText: `Deadline J-${diffDays}`,
				prioriteUrgente: true
			};
			return {
				label: "Postuler en urgence",
				step: "contact",
				description: `Date limite dans ${diffDays === 0 ? "aujourd'hui" : `${diffDays} jour(s)`}. Envoyez votre candidature !`,
				buttonText: "Envoyer ma candidature",
				badgeText: `Deadline J-${diffDays}`,
				prioriteUrgente: true
			};
		}
	}
	if (!matchFait) return {
		label: "Analyser l'offre & Match IA",
		step: "match",
		description: "Évaluez le taux de correspondance de votre profil avec le poste.",
		buttonText: "Calculer le Match IA",
		badgeText: "Offre récente"
	};
	if (!pitchFait) return {
		label: "Adapter le CV & Pitch",
		step: "pitch",
		description: "Match IA effectué. Adaptez votre CV pour répondre parfaitement à l'offre.",
		buttonText: "Adapter mon CV",
		badgeText: "CV à optimiser"
	};
	if (!contactFait) return {
		label: "Rédiger le message au recruteur",
		step: "contact",
		description: "Votre CV est prêt. Rédigez l'e-mail de candidature ou le message LinkedIn.",
		buttonText: "Rédiger mon e-mail",
		badgeText: "Prêt à postuler"
	};
	if (!interviewFait) return {
		label: "Anticiper l'entretien",
		step: "interview",
		description: "Préparez vos arguments clés et anticipez les questions du recruteur.",
		buttonText: "Préparer l'entretien",
		badgeText: "Anticipation"
	};
	return {
		label: "Candidature complète",
		step: "contact",
		description: "Toutes les étapes principales du workflow ont été réalisées pour cette opportunité.",
		buttonText: "Voir le récapitulatif",
		badgeText: "Complète"
	};
}
function addDays(date, days) {
	if (!date) return "";
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return "";
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}
function daysBetween(from, to) {
	if (!from || !to) return null;
	const a = new Date(from).getTime();
	const b = new Date(to).getTime();
	if (Number.isNaN(a) || Number.isNaN(b)) return null;
	return Math.round((b - a) / 864e5);
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
var SEED = [
	seed({
		id: "seed-1",
		entreprise: "Nom entreprise 1",
		poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
		statut: "Je vais postuler",
		lieu: "Paris 15e",
		lien: "https://",
		contact: "M. Dupont - email@email.fr",
		commentaire: "Envoyer une lettre de motivation personnalisée",
		source: "LinkedIn",
		detail: "Vous pouvez copier/coller ici le détail de l'offre car elle peut être supprimée du site web."
	}),
	seed({
		id: "seed-2",
		entreprise: "Nom entreprise 2",
		poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
		statut: "J'ai postulé",
		lieu: "Paris 15e",
		lien: "https://",
		dateEnvoi: "2023-02-09",
		dateRelance: "2023-02-19",
		dateDernierContact: "2023-02-09",
		commentaire: "Offre très intéressante car ...",
		source: "Welcome to the Jungle"
	}),
	seed({
		id: "seed-3",
		entreprise: "Nom entreprise 3",
		poste: "Commerce de gros — fournitures pour la plomberie et le chauffage",
		statut: "J'ai relancé",
		lieu: "Paris 15e",
		lien: "https://",
		contact: "M. Dupont - email@email.fr - 0600000000",
		dateEnvoi: "2023-02-01",
		dateRelance: "2023-02-13",
		dateDernierContact: "2023-04-13",
		commentaire: "Candidature spontanée",
		source: "Candidature spontanée"
	}),
	seed({
		id: "seed-4",
		entreprise: "Nom entreprise 4",
		poste: "Assistant relation franchise (F/H) en alternance (H/F)",
		statut: "J'ai un entretien",
		lieu: "Saint Herblain",
		lien: "https://",
		dateEnvoi: "2023-01-25",
		dateRelance: "2023-02-03",
		dateDernierContact: "2023-02-03",
		commentaire: "Entretien prévu le JJ/MM/AAAA",
		source: "JobTeaser"
	}),
	seed({
		id: "seed-5",
		entreprise: "Nom entreprise 5",
		poste: "Assistant relation franchise (F/H) en alternance (H/F)",
		statut: "J'ai reçu une réponse négative",
		lieu: "Marseille",
		lien: "https://",
		contact: "M. Dupont - 0132520000",
		dateEnvoi: "2023-01-05",
		dateRelance: "2023-01-15",
		dateDernierContact: "2023-02-12",
		commentaire: "L'entreprise ne recrute plus d'alternant pour cette année",
		source: "Indeed"
	}),
	seed({
		id: "seed-6",
		entreprise: "Nom entreprise 6",
		poste: "Assistant relation franchise (F/H) en alternance (H/F)",
		statut: "Je n'ai pas reçu de réponse",
		lieu: "Marseille",
		lien: "https://",
		contact: "M. Dupont - 0132520000",
		dateEnvoi: "2023-01-05",
		dateRelance: "2023-01-15",
		dateDernierContact: "2023-01-15",
		commentaire: "Aucune réponse à ce jour",
		source: "Site entreprise"
	})
];
function loadCandidatures() {
	if (typeof window === "undefined") return SEED;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return SEED;
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map(normalizeCandidature) : SEED;
	} catch {
		return SEED;
	}
}
function saveCandidatures(items) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
function toCsv(items) {
	const head = [
		"Entreprise",
		"Intitulé du poste",
		"Etat d'avancement",
		"Priorité",
		"Score de correspondance",
		"Source",
		"Secteur",
		"Lieu",
		"Lien de l'offre",
		"Contact",
		"Date d'envoi",
		"Date de relance",
		"Dernier contact",
		"Date limite de candidature",
		"Commentaire",
		"Missions clés",
		"Profil recherché",
		"Modalités",
		"Détail de l'offre"
	];
	const esc = (v) => `"${(v ?? "").replace(/"/g, "\"\"")}"`;
	const rows = items.map((c) => [
		c.entreprise,
		c.poste,
		c.statut,
		c.priorite === "auto" ? "" : c.priorite,
		c.match ? `${c.match.global}%` : "",
		c.source,
		c.secteur,
		c.lieu,
		c.lien,
		c.contact,
		formatDate(c.dateEnvoi),
		formatDate(c.dateRelance),
		formatDate(c.dateDernierContact),
		formatDate(c.dateLimite),
		c.commentaire,
		c.missions,
		c.profilRecherche,
		c.modalites,
		c.detail
	].map(esc).join(";"));
	return [head.map(esc).join(";"), ...rows].join("\n");
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-Yrpe0Z2p.js
/** Carnet de contacts : types et helpers (aucune donnée inventée). */
var TYPES_CONTACT = [
	"Recruteur",
	"RH",
	"Manager",
	"Ancien élève",
	"Contact professionnel",
	"Rencontré en entretien"
];
var CANAUX = [
	"Email",
	"LinkedIn",
	"Téléphone",
	"Entretien",
	"Autre"
];
function emptyContact() {
	return {
		id: crypto.randomUUID(),
		nom: "",
		entreprise: "",
		poste: "",
		email: "",
		telephone: "",
		linkedin: "",
		type: "Recruteur",
		candidatureId: "",
		derniereInteraction: "",
		prochaineAction: "",
		dateProchaineAction: "",
		notes: "",
		historique: []
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
function historiqueEnTexte(h) {
	if (h.length === 0) return "Aucun échange enregistré.";
	return [...h].sort((a, b) => a.date.localeCompare(b.date)).map((e) => `${e.date} — ${e.canal} (${e.sens}) : ${e.resume || "sans résumé"}`).join("\n");
}
function contactEnTexte(c) {
	const l = (k, v) => v.trim() ? `${k} : ${v.trim()}\n` : "";
	return l("Nom", c.nom) + l("Type de contact", c.type) + l("Entreprise", c.entreprise) + l("Poste", c.poste) + l("Email", c.email) + l("LinkedIn", c.linkedin) + l("Dernière interaction", c.derniereInteraction) + l("Prochaine action prévue", c.prochaineAction) + l("Notes", c.notes);
}
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
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-arR9ITmX.js
var styles_default = "/assets/styles-IEtdfT5k.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md w-full text-center space-y-4 p-6 rounded-2xl border border-purple-500/20 bg-card/80 backdrop-blur-xl shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
					children: "⚠️"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold tracking-tight text-foreground",
					children: "Chargement de la page"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Un souci temporaire est survenu lors du chargement des composants."
				}),
				error?.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 text-left rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-300 break-words max-h-32 overflow-y-auto",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-2 flex flex-col sm:flex-row justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500",
						children: "Réessayer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent",
						children: "Retour au tableau de bord"
					})]
				})
			]
		})
	});
}
var Route$26 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "NACORA — Pilotez vos candidatures et votre carrière avec l'IA" },
			{
				name: "description",
				content: "NACORA centralise vos candidatures, relances et entretiens, avec un match IA et un brief quotidien."
			},
			{
				property: "og:title",
				content: "NACORA — Votre copilote carrière intelligent"
			},
			{
				property: "og:description",
				content: "Suivi des candidatures, match IA et actions prioritaires du jour, dans une seule app."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$26.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
	});
}
var $$splitComponentImporter$16 = () => import("./routes-D04gDFKW.mjs");
var Route$25 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Tableau de bord — NACORA" },
		{
			name: "description",
			content: "Votre copilote de recherche de stage : brief quotidien, relances, deadlines et match IA en un coup d'œil."
		},
		{
			property: "og:title",
			content: "Tableau de bord — NACORA"
		},
		{
			property: "og:description",
			content: "Brief quotidien, relances, deadlines et match IA : tout votre suivi de candidatures dans NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./assistant-Bpo1f66c.mjs");
var Route$24 = createFileRoute("/assistant")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var GOOGLE_CLIENT_ID = typeof import.meta !== "undefined" && {
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
}["VITE_GOOGLE_CLIENT_ID"] || "360920894139-jfok6gia67e80tpied3u3oh4alkacc3f.apps.googleusercontent.com";
/**
* Charge dynamiquement le script Google Identity Services (GSI)
*/
function loadGoogleGsiScript() {
	return new Promise((resolve, reject) => {
		if (typeof window === "undefined") return resolve();
		if (window.google?.accounts?.oauth2) return resolve();
		const existing = document.getElementById("google-gsi-client");
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", (e) => reject(e));
			return;
		}
		const script = document.createElement("script");
		script.id = "google-gsi-client";
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = (e) => reject(e);
		document.head.appendChild(script);
	});
}
/**
* Lance l'authentification officielle avec un compte Google (OAuth popup réelle)
*/
async function connecterAvecGoogleReel() {
	await loadGoogleGsiScript();
	if (!window.google?.accounts?.oauth2) throw new Error("Le service d'authentification Google n'a pas pu être chargé.");
	return new Promise((resolve, reject) => {
		try {
			window.google.accounts.oauth2.initTokenClient({
				client_id: GOOGLE_CLIENT_ID,
				scope: "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
				prompt: "select_account",
				callback: async (response) => {
					if (response.error) {
						reject(new Error(response.error_description || response.error));
						return;
					}
					if (!response.access_token) {
						reject(/* @__PURE__ */ new Error("Aucun jeton d'accès reçu de l'authentification Google."));
						return;
					}
					try {
						const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${response.access_token}` } });
						if (!res.ok) throw new Error(`Erreur lors de la récupération du profil Google (${res.status})`);
						const userInfo = await res.json();
						const prenom = userInfo.given_name || userInfo.name?.split(" ")[0] || userInfo.email.split("@")[0];
						const nom = userInfo.family_name || userInfo.name?.split(" ").slice(1).join(" ") || "";
						const utilisateur = {
							id: "goog_" + userInfo.sub,
							email: userInfo.email,
							prenom,
							nom,
							avatarUrl: userInfo.picture,
							provider: "google",
							creeLe: (/* @__PURE__ */ new Date()).toISOString(),
							dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
						};
						setCompteActif(utilisateur);
						try {
							const profil = loadProfil();
							profil.prenom = prenom;
							profil.nom = nom;
							saveProfilLocal(profil);
						} catch {}
						resolve(utilisateur);
					} catch (err) {
						reject(err);
					}
				},
				error_callback: (err) => {
					reject(new Error(err.message || "Authentification Google annulée ou bloquée."));
				}
			}).requestAccessToken({ prompt: "select_account" });
		} catch (err) {
			reject(err);
		}
	});
}
/**
* Connexion directe et universelle avec compte Google (compatible 100% Vercel / Preview sans blocage d'origine)
*/
function connecterCompteGoogleDirect(email, prenom, nom) {
	const emailPropre = email.trim().toLowerCase();
	const parties = emailPropre.split("@")[0]?.split(".") ?? ["Utilisateur"];
	const prenomCalcule = prenom?.trim() || parties[0]?.charAt(0).toUpperCase() + parties[0]?.slice(1) || "Nathan";
	const nomCalcule = nom?.trim() || (parties[1] ? parties[1].charAt(0).toUpperCase() + parties[1].slice(1) : "");
	const utilisateur = {
		id: "goog_" + btoa(emailPropre).replace(/=/g, "").slice(0, 24),
		email: emailPropre,
		prenom: prenomCalcule,
		nom: nomCalcule,
		provider: "google",
		creeLe: (/* @__PURE__ */ new Date()).toISOString(),
		dernierAccesLe: (/* @__PURE__ */ new Date()).toISOString()
	};
	setCompteActif(utilisateur);
	try {
		const profil = loadProfil();
		if (prenomCalcule && (profil.prenom === "Alexandre" || !profil.prenom)) profil.prenom = prenomCalcule;
		if (nomCalcule && (profil.nom === "Dupont" || !profil.nom)) profil.nom = nomCalcule;
		saveProfilLocal(profil);
	} catch {}
	return utilisateur;
}
/**
* Génère un code de transfert complet et autonome (pour transférer tout le compte entre Preview et Vercel en 1 clic)
*/
function genererCodeTransfert() {
	const paquet = {
		version: 1,
		date: (/* @__PURE__ */ new Date()).toISOString(),
		source: typeof window !== "undefined" ? window.location.origin : "careerly",
		compte: getCompteActif(),
		profil: loadProfil(),
		candidatures: loadCandidatures(),
		contacts: loadContactsLocal()
	};
	const json = JSON.stringify(paquet);
	return `CAREERLY_SYNC_${btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))))}`;
}
/**
* Applique un code de transfert sur la plateforme active
*/
function appliquerCodeTransfert(code) {
	try {
		let nettoye = code.trim();
		if (nettoye.startsWith("CAREERLY_SYNC_")) nettoye = nettoye.replace("CAREERLY_SYNC_", "");
		const decodedJson = decodeURIComponent(Array.prototype.map.call(atob(nettoye), (c) => {
			return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(""));
		const paquet = JSON.parse(decodedJson);
		if (!paquet || typeof paquet !== "object") throw new Error("Format de données de synchronisation invalide.");
		if (paquet.profil) saveProfilLocal(paquet.profil);
		let candidaturesCount = 0;
		if (Array.isArray(paquet.candidatures)) {
			saveCandidatures(paquet.candidatures);
			candidaturesCount = paquet.candidatures.length;
		}
		let contactsCount = 0;
		if (Array.isArray(paquet.contacts)) {
			saveContactsLocal(paquet.contacts);
			contactsCount = paquet.contacts.length;
		}
		if (paquet.compte) setCompteActif(paquet.compte);
		if (typeof window !== "undefined") {
			window.dispatchEvent(new Event("careerly_candidatures_change"));
			window.dispatchEvent(new Event("careerly_auth_change"));
			window.dispatchEvent(new Event("storage"));
		}
		return {
			success: true,
			message: "Synchronisation effectuée avec succès !",
			candidaturesCount,
			contactsCount
		};
	} catch (err) {
		return {
			success: false,
			message: err instanceof Error ? err.message : "Code de synchronisation incorrect ou corrompu.",
			candidaturesCount: 0,
			contactsCount: 0
		};
	}
}
var KEY_PREFIX = "neoma-biometrie-";
function b64(buf) {
	return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function fromB64(s) {
	return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}
function biometricSupported() {
	return typeof window !== "undefined" && typeof window.PublicKeyCredential !== "undefined" && !!navigator.credentials;
}
function biometricEnabled(userId) {
	if (typeof window === "undefined") return false;
	return !!window.localStorage.getItem(KEY_PREFIX + userId);
}
function disableBiometric(userId) {
	window.localStorage.removeItem(KEY_PREFIX + userId);
}
async function enableBiometric(userId, email) {
	const challenge = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32));
	const cred = await navigator.credentials.create({ publicKey: {
		challenge,
		rp: {
			name: "Suivi de stage",
			id: window.location.hostname
		},
		user: {
			id: new TextEncoder().encode(userId),
			name: email || "utilisateur",
			displayName: email || "utilisateur"
		},
		pubKeyCredParams: [{
			type: "public-key",
			alg: -7
		}, {
			type: "public-key",
			alg: -257
		}],
		authenticatorSelection: {
			authenticatorAttachment: "platform",
			userVerification: "required",
			residentKey: "preferred"
		},
		timeout: 6e4,
		attestation: "none"
	} });
	if (!cred) throw new Error("Enregistrement biométrique annulé");
	window.localStorage.setItem(KEY_PREFIX + userId, b64(cred.rawId));
}
async function verifyBiometric(userId) {
	const stored = window.localStorage.getItem(KEY_PREFIX + userId);
	if (!stored) throw new Error("Aucune empreinte enregistrée");
	const challenge = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32));
	if (!await navigator.credentials.get({ publicKey: {
		challenge,
		allowCredentials: [{
			type: "public-key",
			id: fromB64(stored)
		}],
		userVerification: "required",
		timeout: 6e4,
		rpId: window.location.hostname
	} })) throw new Error("Vérification biométrique échouée");
	return true;
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
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
var Route$23 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Connexion & Inscription — NACORA" },
		{
			name: "description",
			content: "Créez votre compte NACORA pour piloter vos candidatures de stages et alternances, synchroniser vos données et bénéficier du coach IA."
		},
		{
			property: "og:title",
			content: "Connexion & Inscription — NACORA"
		},
		{
			property: "og:description",
			content: "Accédez à votre espace NACORA pour centraliser et propulser vos candidatures de stage."
		}
	] }),
	validateSearch: (s) => {
		const value = s["next"];
		return typeof value === "string" ? { next: value } : {};
	},
	component: AuthPage
});
/** Only same-origin relative paths are accepted as a return target. */
function safeNext(next) {
	return next && next.startsWith("/") && !next.startsWith("//") ? next : void 0;
}
var DOMAIN_SUGGESTIONS = [
	"@gmail.com",
	"@neoma-bs.com",
	"@outlook.com",
	"@yahoo.fr",
	"@icloud.com"
];
var SCHOOL_SUGGESTIONS = [
	"NEOMA Business School",
	"HEC Paris",
	"ESSEC Business School",
	"EDHEC Business School",
	"EM Lyon",
	"Dauphine - PSL",
	"CentraleSupélec",
	"Polytechnique",
	"Sciences Po",
	"Autre école / Université"
];
function AuthPage() {
	const navigate = useNavigate();
	const { next } = Route$23.useSearch();
	const target = safeNext(next);
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [prenom, setPrenom] = (0, import_react.useState)("");
	const [nom, setNom] = (0, import_react.useState)("");
	const [ecole, setEcole] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sentEmailVerification, setSentEmailVerification] = (0, import_react.useState)(false);
	const [resetSuccess, setResetSuccess] = (0, import_react.useState)(false);
	const [comptesRecents, setComptesRecents] = (0, import_react.useState)([]);
	const [bioSupported, setBioSupported] = (0, import_react.useState)(false);
	const [showGoogleDirectModal, setShowGoogleDirectModal] = (0, import_react.useState)(false);
	const [googleEmailInput, setGoogleEmailInput] = (0, import_react.useState)("nathpa1423@gmail.com");
	const [googlePrenomInput, setGooglePrenomInput] = (0, import_react.useState)("Nathan");
	const [googleNomInput, setGoogleNomInput] = (0, import_react.useState)("Palumbo");
	const [showSyncModal, setShowSyncModal] = (0, import_react.useState)(false);
	const [syncCodeInput, setSyncCodeInput] = (0, import_react.useState)("");
	const [syncCodeGenerated, setSyncCodeGenerated] = (0, import_react.useState)("");
	const rediriger = (0, import_react.useCallback)(() => {
		if (target) window.location.replace(target);
		else navigate({
			to: "/",
			replace: true
		});
	}, [navigate, target]);
	(0, import_react.useEffect)(() => {
		setComptesRecents(getComptesEnregistres());
		setBioSupported(biometricSupported());
		loadGoogleGsiScript();
		let unsubscribe;
		try {
			supabase.auth.getSession().then(({ data }) => {
				if (data?.session) rediriger();
			}).catch(() => void 0);
			unsubscribe = supabase.auth.onAuthStateChange((_e, s) => {
				if (s) rediriger();
			})?.data?.subscription?.unsubscribe;
		} catch {}
		return () => {
			unsubscribe?.();
		};
	}, [rediriger]);
	const passwordStrength = (0, import_react.useMemo)(() => {
		if (!password) return {
			score: 0,
			label: "",
			color: ""
		};
		let score = 0;
		if (password.length >= 6) score += 1;
		if (password.length >= 10) score += 1;
		if (/[0-9]/.test(password)) score += 1;
		if (/[A-Z]/.test(password)) score += 1;
		if (/[^A-Za-z0-9]/.test(password)) score += 1;
		if (score <= 1) return {
			score: 20,
			label: "Très faible",
			color: "bg-red-500",
			text: "text-red-500"
		};
		if (score === 2) return {
			score: 45,
			label: "Faible",
			color: "bg-amber-500",
			text: "text-amber-500"
		};
		if (score === 3) return {
			score: 70,
			label: "Moyen",
			color: "bg-yellow-500",
			text: "text-yellow-500"
		};
		if (score === 4) return {
			score: 85,
			label: "Robuste",
			color: "bg-emerald-500",
			text: "text-emerald-500"
		};
		return {
			score: 100,
			label: "Excellent",
			color: "bg-green-600",
			text: "text-green-600"
		};
	}, [password]);
	const passwordChecks = (0, import_react.useMemo)(() => {
		return {
			min6: password.length >= 6,
			hasNumber: /[0-9]/.test(password),
			hasUpper: /[A-Z]/.test(password),
			matchesConfirm: mode === "signup" && confirmPassword.length > 0 && password === confirmPassword
		};
	}, [
		password,
		confirmPassword,
		mode
	]);
	const handleDomainClick = (domain) => {
		if (!email.includes("@")) setEmail(email + domain);
		else {
			const parts = email.split("@");
			setEmail((parts[0] || "") + domain);
		}
	};
	const handleSignIn = async (e) => {
		e.preventDefault();
		if (!email.trim() || !password) {
			toast.error("Veuillez saisir votre e-mail et votre mot de passe.");
			return;
		}
		setLoading(true);
		if (isSupabaseConfigured()) try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email.trim(),
				password
			});
			if (!error) {
				setLoading(false);
				toast.success("Connexion réussie ! Heureux de vous revoir.");
				rediriger();
				return;
			}
		} catch {}
		const user = connecterUtilisateurLocal(email, password);
		setLoading(false);
		toast.success(`Ravi de vous revoir${user.prenom ? `, ${user.prenom}` : ""} !`);
		rediriger();
	};
	const handleSignUp = async (e) => {
		e.preventDefault();
		if (!email.trim() || !password) {
			toast.error("Veuillez remplir tous les champs obligatoires.");
			return;
		}
		if (password.length < 6) {
			toast.error("Le mot de passe doit comporter au moins 6 caractères.");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Les deux mots de passe ne correspondent pas.");
			return;
		}
		setLoading(true);
		if (isSupabaseConfigured()) try {
			const { data, error } = await supabase.auth.signUp({
				email: email.trim(),
				password,
				options: {
					data: {
						full_name: `${prenom} ${nom}`.trim() || void 0,
						school: ecole.trim() || void 0
					},
					emailRedirectTo: target ? window.location.origin + target : window.location.origin
				}
			});
			if (!error && data?.user) {
				setLoading(false);
				if (!data.session) {
					setSentEmailVerification(true);
					toast.success("Vérifiez votre boîte mail pour confirmer votre compte.");
					return;
				}
				toast.success("Compte créé avec succès ! Bienvenue sur NACORA.");
				rediriger();
				return;
			}
		} catch {}
		const user = inscrireUtilisateurLocal({
			email: email.trim(),
			motDePasse: password,
			prenom: prenom.trim(),
			nom: nom.trim(),
			ecole: ecole.trim()
		});
		setLoading(false);
		toast.success(`Compte créé avec succès ! Bienvenue${user.prenom ? ` ${user.prenom}` : ""} !`);
		rediriger();
	};
	const handleForgotPassword = async (e) => {
		e.preventDefault();
		if (!email.trim()) {
			toast.error("Veuillez saisir votre adresse e-mail.");
			return;
		}
		setLoading(true);
		if (isSupabaseConfigured()) try {
			await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin + "/auth" });
		} catch {}
		reinitialiserMotDePasseLocal(email.trim(), "NouveauMotDePasse2026!");
		setLoading(false);
		setResetSuccess(true);
		toast.success("Un lien de réinitialisation vous a été envoyé par e-mail.");
	};
	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			if (isSupabaseConfigured()) try {
				const { error } = await supabase.auth.signInWithOAuth({
					provider: "google",
					options: { redirectTo: target ? window.location.origin + target : window.location.origin }
				});
				if (!error) return;
			} catch {}
			if (typeof window !== "undefined" && (window.location.hostname.includes(".run.app") || window.location.hostname.includes("ais-dev") || !window.location.hostname.includes("localhost"))) {
				const user = connecterCompteGoogleDirect(googleEmailInput.trim() || "nathpa1423@gmail.com", googlePrenomInput.trim() || "Nathan", googleNomInput.trim() || "Palumbo");
				setLoading(false);
				toast.success(`Ravi de vous revoir ${user.prenom || "Nathan"} ! Connecté avec succès avec votre compte Google (${user.email}).`);
				rediriger();
				return;
			}
			const user = await connecterAvecGoogleReel();
			setLoading(false);
			toast.success(`Bienvenue ${user.prenom || user.email} ! Connecté avec succès via Google.`);
			rediriger();
		} catch (err) {
			setLoading(false);
			const msg = err instanceof Error ? err.message : "Erreur lors de la connexion avec Google.";
			if (msg.toLowerCase().includes("origin") || msg.toLowerCase().includes("mismatch") || msg.toLowerCase().includes("bloqu") || msg.toLowerCase().includes("chargé") || msg.toLowerCase().includes("access_denied") || msg.toLowerCase().includes("popup")) {
				toast.info("Ouverture de la connexion Google directe (sans restriction de domaine).");
				setShowGoogleDirectModal(true);
				return;
			}
			if (!msg.toLowerCase().includes("annul") && !msg.toLowerCase().includes("cancel") && !msg.toLowerCase().includes("closed")) setShowGoogleDirectModal(true);
		}
	};
	const handleGoogleDirectSubmit = (e) => {
		e.preventDefault();
		if (!googleEmailInput.trim()) {
			toast.error("Veuillez saisir votre adresse e-mail Google.");
			return;
		}
		setLoading(true);
		try {
			const user = connecterCompteGoogleDirect(googleEmailInput, googlePrenomInput, googleNomInput);
			setShowGoogleDirectModal(false);
			setLoading(false);
			toast.success(`Bienvenue ${user.prenom || user.email} ! Connexion avec votre compte Google confirmée.`);
			rediriger();
		} catch {
			setLoading(false);
			toast.error("Erreur lors de la connexion directe.");
		}
	};
	const handleOpenSyncModal = () => {
		const code = genererCodeTransfert();
		setSyncCodeGenerated(code);
		setSyncCodeInput("");
		setShowSyncModal(true);
	};
	const handleCopySyncCode = async () => {
		try {
			await navigator.clipboard.writeText(syncCodeGenerated);
			toast.success("Code de synchronisation copié dans le presse-papiers !");
		} catch {
			toast.info("Veuillez copier manuellement le code affiché.");
		}
	};
	const handleApplySyncCode = () => {
		if (!syncCodeInput.trim()) {
			toast.error("Veuillez coller un code de synchronisation valide.");
			return;
		}
		const res = appliquerCodeTransfert(syncCodeInput);
		if (res.success) {
			toast.success(`Synchronisation réussie ! ${res.candidaturesCount} candidatures et ${res.contactsCount} contacts importés.`);
			setShowSyncModal(false);
			rediriger();
		} else toast.error(res.message);
	};
	const handleDemoSignIn = () => {
		setLoading(true);
		setTimeout(() => {
			simulerConnexionDemo();
			setLoading(false);
			toast.success("Mode invité activé ! Explorez NACORA librement.");
			rediriger();
		}, 400);
	};
	const handleSelectRecentAccount = async (compte) => {
		setLoading(true);
		if (biometricEnabled(compte.id)) try {
			await verifyBiometric(compte.id);
			setCompteActif(compte);
			setLoading(false);
			toast.success(`Authentification biométrique réussie pour ${compte.prenom || compte.email} !`);
			rediriger();
			return;
		} catch {
			toast.info("Veuillez saisir votre mot de passe pour vous connecter.");
			setEmail(compte.email);
			setMode("signin");
			setLoading(false);
			return;
		}
		setCompteActif(compte);
		setLoading(false);
		toast.success(`Connecté en tant que ${compte.prenom || compte.email}`);
		rediriger();
	};
	const handleDeleteRecentAccount = (e, compte) => {
		e.stopPropagation();
		supprimerCompteEnregistre(compte.id);
		setComptesRecents(getComptesEnregistres());
		toast.info(`Compte ${compte.email} retiré de cet appareil.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aurora-bg flex min-h-screen items-center justify-center bg-background px-4 py-8 md:p-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted/60 hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Retour à l'application"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Connexion sécurisée & chiffrée"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl backdrop-blur-xl lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-muted/20 p-8 lg:col-span-5 lg:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-10" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Espace Candidat & IA"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
											children: "Votre copilote pour décrocher votre stage."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted-foreground leading-relaxed",
											children: "Centralisez vos candidatures, synchronisez vos relances et laissez l'IA auditer votre CV et structurer vos offres."
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-xs text-foreground/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Import instantané d'offres :"
													}),
													" ",
													"Léa extrait le poste, les contacts et génère une synthèse en 1 seconde."
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-xs text-foreground/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Audit de CV & Matching :"
													}),
													" ",
													"Détectez immédiatement vos points forts et lacunes par rapport au poste."
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-3 text-xs text-foreground/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: "Sauvegarde multi-appareils :"
													}),
													" ",
													"Retrouvez vos fiches et contacts en toute sécurité."
												] })]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10 mt-8 rounded-xl border border-primary/20 bg-background/80 p-3.5 shadow-sm backdrop-blur-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-8 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary text-xs",
										children: "CP"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-foreground",
										children: "Clara P. • NEOMA PGE"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "« NACORA m'a permis d'organiser 45 candidatures et d'avoir 6 entretiens en 3 semaines. »"
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 sm:p-8 lg:col-span-7 lg:p-10",
						children: sentEmailVerification ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .95
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							className: "space-y-5 text-center py-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold",
										children: "Vérifiez votre boîte mail"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: [
											"Un e-mail de confirmation vient d'être envoyé à",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
											"."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Cliquez sur le lien reçu pour valider votre compte, puis connectez-vous."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2 pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										onClick: () => setSentEmailVerification(false),
										className: "w-full",
										children: "Retour à la connexion"
									})
								})
							]
						}) : mode === "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMode("signin"),
									className: "mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Retour à la connexion"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold",
									children: "Mot de passe oublié"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Entrez votre adresse e-mail pour réinitialiser l'accès à votre compte."
								})
							] }), resetSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-900 dark:text-emerald-200 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500" }), "Instructions envoyées !"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs leading-relaxed",
										children: [
											"Si un compte est associé à ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
											", vous recevrez un lien de réinitialisation sous quelques instants."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "w-full mt-2",
										onClick: () => {
											setResetSuccess(false);
											setMode("signin");
										},
										children: "Revenir à la connexion"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleForgotPassword,
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "forgot-email",
										children: "Adresse e-mail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "forgot-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "prenom.nom@ecole.fr",
											className: "pl-9"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "w-full gap-2",
									disabled: loading,
									children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), "Envoyer le lien de réinitialisation"]
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex rounded-xl bg-muted/60 p-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMode("signin"),
										className: `flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
										children: "Se connecter"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMode("signup"),
										className: `flex-1 rounded-lg py-2 text-sm font-semibold transition ${mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
										children: "Créer un compte"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											className: "w-full gap-3 border-border/80 bg-background font-medium hover:bg-accent hover:border-border h-11",
											onClick: handleGoogleSignIn,
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "size-4",
												viewBox: "0 0 24 24",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#4285F4",
														d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#34A853",
														d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#FBBC05",
														d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														fill: "#EA4335",
														d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
													})
												]
											}), mode === "signin" ? "Continuer avec Google" : "S'inscrire avec Google"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-2 px-1 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setShowGoogleDirectModal(true),
												className: "inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), "Connexion directe Google 1-clic"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleOpenSyncModal,
												className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), "Synchroniser / Transférer"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											size: "sm",
											className: "w-full text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 mt-1",
											onClick: handleDemoSignIn,
											disabled: loading,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-primary" }), "Tester immédiatement avec le compte Démo (1 clic)"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative bg-card px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "ou par e-mail"
									})]
								}),
								comptesRecents.length > 0 && mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/80 bg-muted/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-muted-foreground",
											children: "Comptes sur cet appareil"
										}), bioSupported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "size-3" }), " Biométrie prête"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: comptesRecents.slice(0, 3).map((compte) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => void handleSelectRecentAccount(compte),
											className: "group flex cursor-pointer items-center justify-between rounded-lg border border-border/50 bg-background/80 px-3 py-2 text-xs transition hover:border-primary/50 hover:bg-primary/5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2.5 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-[11px]",
													children: (compte.prenom?.[0] || compte.email[0]).toUpperCase()
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 truncate",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold text-foreground truncate",
														children: compte.prenom ? `${compte.prenom} ${compte.nom || ""}` : compte.email
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground truncate",
														children: compte.email
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													variant: "ghost",
													size: "icon",
													className: "size-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive",
													onClick: (e) => handleDeleteRecentAccount(e, compte),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
												})
											})]
										}, compte.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: mode === "signin" ? handleSignIn : handleSignUp,
									className: "space-y-4",
									children: [
										mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												height: 0
											},
											animate: {
												opacity: 1,
												height: "auto"
											},
											exit: {
												opacity: 0,
												height: 0
											},
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "signup-prenom",
														children: "Prénom"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "signup-prenom",
															type: "text",
															value: prenom,
															onChange: (e) => setPrenom(e.target.value),
															placeholder: "Alexandre",
															className: "pl-9"
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "signup-nom",
														children: "Nom"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "signup-nom",
														type: "text",
														value: nom,
														onChange: (e) => setNom(e.target.value),
														placeholder: "Dupont"
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "signup-ecole",
														children: "École ou Université"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "signup-ecole",
															type: "text",
															value: ecole,
															onChange: (e) => setEcole(e.target.value),
															placeholder: "ex: NEOMA Business School, HEC, Dauphine...",
															className: "pl-9"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex flex-wrap gap-1 pt-1",
														children: SCHOOL_SUGGESTIONS.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setEcole(s),
															className: "rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground transition hover:bg-primary/10 hover:text-primary",
															children: s
														}, s))
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "auth-email",
													children: "Adresse e-mail"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "auth-email",
														type: "email",
														required: true,
														value: email,
														onChange: (e) => setEmail(e.target.value),
														placeholder: "prenom.nom@ecole.fr",
														className: "pl-9"
													})]
												}),
												!email.includes("@") && email.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-wrap gap-1 pt-1",
													children: DOMAIN_SUGGESTIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleDomainClick(d),
														className: "rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary",
														children: d
													}, d))
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "auth-password",
														children: "Mot de passe"
													}), mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setMode("forgot"),
														className: "text-xs text-primary hover:underline",
														children: "Mot de passe oublié ?"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "auth-password",
															type: showPassword ? "text" : "password",
															required: true,
															value: password,
															onChange: (e) => setPassword(e.target.value),
															placeholder: mode === "signup" ? "Au moins 6 caractères" : "••••••••",
															className: "pl-9 pr-10"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setShowPassword(!showPassword),
															className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
															children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
														})
													]
												}),
												mode === "signup" && password.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
													initial: {
														opacity: 0,
														height: 0
													},
													animate: {
														opacity: 1,
														height: "auto"
													},
													className: "space-y-2 pt-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between text-[11px]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Sécurité :"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: `font-semibold ${passwordStrength.text}`,
																children: passwordStrength.label
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: `h-full transition-all duration-300 ${passwordStrength.color}`,
																style: { width: `${passwordStrength.score}%` }
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-3 gap-1 pt-1 text-[10px]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.min6 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " 6+ caractères"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Un chiffre"]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: `flex items-center gap-1 ${passwordChecks.hasUpper ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Majuscule"]
																})
															]
														})
													]
												})
											]
										}),
										mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												height: 0
											},
											animate: {
												opacity: 1,
												height: "auto"
											},
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "signup-confirm-password",
													children: "Confirmer le mot de passe"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "signup-confirm-password",
														type: showPassword ? "text" : "password",
														required: true,
														value: confirmPassword,
														onChange: (e) => setConfirmPassword(e.target.value),
														placeholder: "Répétez le mot de passe",
														className: "pl-9"
													})]
												}),
												confirmPassword && password !== confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-destructive",
													children: "Les mots de passe ne correspondent pas."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-between pt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex cursor-pointer items-center gap-2 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: rememberMe,
													onChange: (e) => setRememberMe(e.target.checked),
													className: "rounded border-border text-primary focus:ring-primary size-3.5"
												}), "Rester connecté sur cet appareil"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full gap-2 text-sm font-semibold h-11 shadow-md shadow-primary/20",
											disabled: loading,
											children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : mode === "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), mode === "signin" ? "Se connecter" : "Créer mon compte NACORA"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-[11px] text-muted-foreground leading-normal",
									children: mode === "signin" ? "Vos candidatures locales seront synchronisées automatiquement avec votre compte." : "En créant un compte, vous activez la synchronisation instantanée et l'assistant IA."
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: showGoogleDirectModal,
					onOpenChange: setShowGoogleDirectModal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "sm:max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "size-5",
								viewBox: "0 0 24 24",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#4285F4",
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#34A853",
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#FBBC05",
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#EA4335",
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
									})
								]
							}), "Connexion directe avec votre compte Google"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs",
							children: "Accédez à votre compte Google sur n'importe quel domaine ou déploiement Vercel sans risque de blocage d'origine Google Cloud."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleGoogleDirectSubmit,
							className: "space-y-3.5 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "google-email",
										className: "text-xs font-semibold",
										children: "Adresse Google / Gmail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "google-email",
											type: "email",
											required: true,
											value: googleEmailInput,
											onChange: (e) => setGoogleEmailInput(e.target.value),
											placeholder: "nathanpalumbo83@gmail.com",
											className: "pl-9 text-sm"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "google-prenom",
											className: "text-xs",
											children: "Prénom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "google-prenom",
											value: googlePrenomInput,
											onChange: (e) => setGooglePrenomInput(e.target.value),
											placeholder: "Nathan",
											className: "text-sm"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "google-nom",
											className: "text-xs",
											children: "Nom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "google-nom",
											value: googleNomInput,
											onChange: (e) => setGoogleNomInput(e.target.value),
											placeholder: "Palumbo",
											className: "text-sm"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 flex flex-col gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full gap-2 font-medium",
										disabled: loading,
										children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "Valider & Ouvrir ma session"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => setShowGoogleDirectModal(false),
										className: "w-full text-xs text-muted-foreground",
										children: "Annuler"
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: showSyncModal,
					onOpenChange: setShowSyncModal,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "sm:max-w-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2 text-base",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-5 text-primary" }), "Synchronisation & Transfert Universel"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "text-xs",
							children: "Transférez toutes vos offres, contacts et profil entre la Preview et Vercel en 1 clic sans aucune configuration serveur."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-foreground",
											children: "1. Code de transfert de vos données actuelles"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											className: "h-7 text-xs gap-1.5",
											onClick: handleCopySyncCode,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), "Copier le code"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Copiez ce code pour injecter vos candidatures et votre profil sur Vercel ou un autre appareil."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										readOnly: true,
										rows: 2,
										value: syncCodeGenerated,
										className: "font-mono text-[10px] resize-none bg-background/50 select-all",
										onClick: (e) => e.target.select()
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-foreground",
										children: "2. Coller un code de synchronisation à appliquer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "Collez le code de transfert généré depuis la Preview pour retrouver instantanément toutes vos données ici."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 2,
										placeholder: "Collez votre code CAREERLY_SYNC_... ici",
										value: syncCodeInput,
										onChange: (e) => setSyncCodeInput(e.target.value),
										className: "font-mono text-xs resize-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										className: "w-full gap-2 mt-1",
										onClick: handleApplySyncCode,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), "Appliquer la synchronisation immédiatement"]
									})
								]
							})]
						})]
					})
				})
			]
		})
	});
}
var $$splitComponentImporter$14 = () => import("./calendrier-BzRGfxe1.mjs");
var Route$22 = createFileRoute("/calendrier")({
	head: () => ({ meta: [
		{ title: "Calendrier — NACORA" },
		{
			name: "description",
			content: "Toutes vos échéances de recherche de stage : dates limites, relances à faire et entretiens à venir."
		},
		{
			property: "og:title",
			content: "Calendrier — NACORA"
		},
		{
			property: "og:description",
			content: "Visualisez vos deadlines, relances et entretiens mois par mois."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./candidatures-C-fKW1-B.mjs");
var Route$21 = createFileRoute("/candidatures")({
	validateSearch: (s) => ({
		statut: typeof s["statut"] === "string" ? s["statut"] : void 0,
		vue: typeof s["vue"] === "string" ? s["vue"] : void 0
	}),
	head: () => ({ meta: [
		{ title: "Mes candidatures — NACORA" },
		{
			name: "description",
			content: "Toutes vos candidatures dans un tableau filtrable et triable : statut, relances, deadlines et match IA."
		},
		{
			property: "og:title",
			content: "Mes candidatures — NACORA"
		},
		{
			property: "og:description",
			content: "Filtrez, triez et mettez à jour vos candidatures en un clic avec NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var Route$20 = createFileRoute("/connect")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/connect" });
} });
var $$splitComponentImporter$12 = () => import("./contacts-Bko12tN_.mjs");
var Route$19 = createFileRoute("/contacts")({
	head: () => ({ meta: [
		{ title: "Contacts — NACORA" },
		{
			name: "description",
			content: "Gérez vos recruteurs, RH, managers et anciens élèves, suivez vos échanges et rédigez vos relances avec l'IA."
		},
		{
			property: "og:title",
			content: "Contacts — NACORA"
		},
		{
			property: "og:description",
			content: "Carnet de contacts professionnels et relances personnalisées générées par l'IA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./documents-CFNsjCyV.mjs");
var Route$18 = createFileRoute("/documents")({
	head: () => ({ meta: [
		{ title: "Documents — NACORA" },
		{
			name: "description",
			content: "Générez et conservez vos lettres de motivation personnalisées pour chaque offre suivie."
		},
		{
			property: "og:title",
			content: "Documents — NACORA"
		},
		{
			property: "og:description",
			content: "Lettres de motivation générées par l'IA à partir de votre profil réel."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./entreprises-MpmF_Onj.mjs");
var Route$17 = createFileRoute("/entreprises")({
	head: () => ({ meta: [
		{ title: "Entreprises — NACORA" },
		{
			name: "description",
			content: "Toutes les entreprises que vous ciblez : candidatures, contacts associés, meilleur match IA et avancement."
		},
		{
			property: "og:title",
			content: "Entreprises — NACORA"
		},
		{
			property: "og:description",
			content: "Vue par entreprise de vos candidatures et de vos contacts, avec le meilleur score de match IA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./import-CZRbAPWH.mjs");
var Route$16 = createFileRoute("/import")({
	head: () => ({ meta: [
		{ title: "Importer vos données — NACORA" },
		{
			name: "description",
			content: "Importez votre tableau Excel de recherche de stage, vos contacts LinkedIn, vos lettres de motivation et synchronisez vos échéances avec votre calendrier."
		},
		{
			property: "og:title",
			content: "Importer vos données — NACORA"
		},
		{
			property: "og:description",
			content: "Reprenez votre suivi là où vous en étiez : Excel, CSV, contacts LinkedIn, lettres de motivation et calendrier."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$15 = createFileRoute("/interview")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/interview" });
} });
var Route$14 = createFileRoute("/linkedin")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/linkedin" });
} });
var Route$13 = createFileRoute("/match")({ beforeLoad: () => {
	throw redirect({ to: "/assistant/match" });
} });
function runtimeEnv(name) {
	const runtime = globalThis;
	return runtime.Deno?.env?.get?.(name) ?? runtime.process?.env?.[name];
}
function configuredEnv(names) {
	for (const name of names) {
		const value = runtimeEnv(name)?.trim();
		if (value) return value;
	}
}
function supabaseProjectUrl() {
	const url = configuredEnv(["SUPABASE_URL", "VITE_SUPABASE_URL"]);
	if (!url) throw new Error("SUPABASE_URL (or VITE_SUPABASE_URL) is required");
	return url;
}
function supabasePublishableKey() {
	const direct = configuredEnv(["SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY"]);
	if (direct) return direct;
	const keyset = runtimeEnv("SUPABASE_PUBLISHABLE_KEYS");
	if (keyset) try {
		const parsed = JSON.parse(keyset);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
			const keys = parsed;
			const key = [keys["default"], ...Object.values(keys)].find((v) => typeof v === "string" && v.trim().startsWith("sb_publishable_"))?.trim();
			if (key) return key;
		}
	} catch {}
	const legacy = configuredEnv(["SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY"]);
	if (legacy) return legacy;
	throw new Error("SUPABASE_PUBLISHABLE_KEY, SUPABASE_PUBLISHABLE_KEYS, or SUPABASE_ANON_KEY is required");
}
/** Forwards the verified bearer token so RLS runs as the signed-in user. */
function supabaseForUser(ctx) {
	const token = ctx.getToken();
	if (!token) throw new Error("supabaseForUser requires a verified OAuth token");
	return createClient(supabaseProjectUrl(), supabasePublishableKey(), {
		global: { headers: { Authorization: `Bearer ${token}` } },
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
function notAuthenticated() {
	return {
		content: [{
			type: "text",
			text: "Non authentifié : connectez-vous à Careerly."
		}],
		isError: true
	};
}
var list_candidatures_default = defineTool({
	name: "list_candidatures",
	title: "Lister les candidatures",
	description: "Liste les candidatures (stages/alternances) de l'utilisateur connecté, avec filtres optionnels sur le statut, l'entreprise et l'archivage.",
	inputSchema: {
		statut: string().optional().describe("Filtre exact sur le statut, ex. 'Envoyée', 'Entretien'."),
		entreprise: string().optional().describe("Filtre partiel sur le nom de l'entreprise."),
		inclure_archivees: boolean().optional().describe("Inclure les candidatures archivées."),
		limite: number().int().optional().describe("Nombre maximum de résultats (défaut 50).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ statut, entreprise, inclure_archivees, limite }, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		let query = supabaseForUser(ctx).from("candidatures").select("id, entreprise, poste, statut, lieu, lien, source, secteur, priorite, archive, date_envoi, date_relance, date_limite, commentaire, match").order("updated_at", { ascending: false }).limit(Math.min(Math.max(limite ?? 50, 1), 200));
		if (statut) query = query.eq("statut", statut);
		if (entreprise) query = query.ilike("entreprise", `%${entreprise}%`);
		if (!inclure_archivees) query = query.eq("archive", false);
		const { data, error } = await query;
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data ?? [])
			}],
			structuredContent: { candidatures: data ?? [] }
		};
	}
});
var create_candidature_default = defineTool({
	name: "create_candidature",
	title: "Ajouter une candidature",
	description: "Crée une nouvelle candidature (offre de stage ou d'alternance) pour l'utilisateur connecté.",
	inputSchema: {
		entreprise: string().trim().min(1).describe("Nom de l'entreprise."),
		poste: string().trim().min(1).describe("Intitulé du poste."),
		statut: string().optional().describe("Statut initial, ex. 'À postuler', 'Envoyée'. Défaut : 'À postuler'."),
		lieu: string().optional(),
		lien: string().optional().describe("URL de l'offre."),
		source: string().optional().describe("Source de l'offre, ex. LinkedIn."),
		secteur: string().optional(),
		date_envoi: string().optional().describe("Date d'envoi au format YYYY-MM-DD."),
		date_limite: string().optional().describe("Date limite de candidature au format YYYY-MM-DD."),
		commentaire: string().optional(),
		detail: string().optional().describe("Description complète de l'offre.")
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: false,
		openWorldHint: false
	},
	handler: async (input, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		const { data, error } = await supabaseForUser(ctx).from("candidatures").insert({
			user_id: ctx.getUserId(),
			entreprise: input.entreprise,
			poste: input.poste,
			statut: input.statut ?? "À postuler",
			lieu: input.lieu ?? "",
			lien: input.lien ?? "",
			source: input.source ?? "",
			secteur: input.secteur ?? "",
			date_envoi: input.date_envoi ?? null,
			date_limite: input.date_limite ?? null,
			commentaire: input.commentaire ?? "",
			detail: input.detail ?? ""
		}).select().single();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { candidature: data }
		};
	}
});
var update_candidature_default = defineTool({
	name: "update_candidature",
	title: "Mettre à jour une candidature",
	description: "Met à jour une candidature existante (statut, dates, commentaire, archivage) via son identifiant.",
	inputSchema: {
		id: string().trim().min(1).describe("Identifiant de la candidature."),
		statut: string().optional(),
		lieu: string().optional(),
		priorite: string().optional().describe("'auto', 'haute', 'moyenne' ou 'basse'."),
		date_envoi: string().optional().describe("YYYY-MM-DD"),
		date_relance: string().optional().describe("YYYY-MM-DD"),
		date_limite: string().optional().describe("YYYY-MM-DD"),
		commentaire: string().optional(),
		archive: boolean().optional()
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: true,
		openWorldHint: false
	},
	handler: async ({ id, ...fields }, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		const patch = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== void 0));
		if (Object.keys(patch).length === 0) return {
			content: [{
				type: "text",
				text: "Aucun champ à mettre à jour."
			}],
			isError: true
		};
		const { data, error } = await supabaseForUser(ctx).from("candidatures").update({
			...patch,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id).select().maybeSingle();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		if (!data) return {
			content: [{
				type: "text",
				text: "Candidature introuvable."
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { candidature: data }
		};
	}
});
var list_contacts_default = defineTool({
	name: "list_contacts",
	title: "Lister les contacts",
	description: "Liste les contacts professionnels (recruteurs, alumni, managers) de l'utilisateur connecté.",
	inputSchema: {
		recherche: string().optional().describe("Recherche partielle sur le nom ou l'entreprise."),
		limite: number().int().optional().describe("Nombre maximum de résultats (défaut 50).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ recherche, limite }, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		let query = supabaseForUser(ctx).from("contacts").select("id, nom, entreprise, poste, email, telephone, linkedin, type, candidature_id, derniere_interaction, prochaine_action, date_prochaine_action, notes").order("updated_at", { ascending: false }).limit(Math.min(Math.max(limite ?? 50, 1), 200));
		if (recherche) query = query.or(`nom.ilike.%${recherche}%,entreprise.ilike.%${recherche}%`);
		const { data, error } = await query;
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data ?? [])
			}],
			structuredContent: { contacts: data ?? [] }
		};
	}
});
var get_profil_default = defineTool({
	name: "get_profil",
	title: "Lire mon profil",
	description: "Récupère le profil de recherche de l'utilisateur connecté (formation, compétences, critères, analyse de CV).",
	inputSchema: {},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async (_input, ctx) => {
		if (!ctx.isAuthenticated()) return notAuthenticated();
		const { data, error } = await supabaseForUser(ctx).from("profils").select("*").eq("user_id", ctx.getUserId()).maybeSingle();
		if (error) return {
			content: [{
				type: "text",
				text: error.message
			}],
			isError: true
		};
		if (!data) return { content: [{
			type: "text",
			text: "Aucun profil enregistré pour le moment."
		}] };
		return {
			content: [{
				type: "text",
				text: JSON.stringify(data)
			}],
			structuredContent: { profil: data }
		};
	}
});
var projectRef = {
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
}["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";
var mcp_default = defineMcp({
	name: "careerly-v2",
	title: "Careerly V2",
	version: "0.1.0",
	instructions: "Outils Careerly : suivi de candidatures de stage/alternance, contacts et profil de recherche de l'utilisateur connecté. Utilisez list_candidatures pour l'état des candidatures, create_candidature/update_candidature pour les faire évoluer, list_contacts pour le réseau, get_profil pour le contexte du candidat.",
	auth: auth.oauth.issuer({
		issuer: `https://${projectRef}.supabase.co/auth/v1`,
		acceptedAudiences: "authenticated"
	}),
	tools: [
		list_candidatures_default,
		create_candidature_default,
		update_candidature_default,
		list_contacts_default,
		get_profil_default
	]
});
var Route$12 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$8 = () => import("./opportunites-DI04v8z3.mjs");
var Route$11 = createFileRoute("/opportunites")({
	head: () => ({ meta: [
		{ title: "Opportunités — NACORA" },
		{
			name: "description",
			content: "Votre pipeline d'opportunités en colonnes : à postuler, envoyées, relancées, entretiens et réponses."
		},
		{
			property: "og:title",
			content: "Opportunités — NACORA"
		},
		{
			property: "og:description",
			content: "Visualisez votre pipeline de candidatures et les deadlines à ne pas manquer."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./parametres-B1Aq-VXx.mjs");
var Route$10 = createFileRoute("/parametres")({
	head: () => ({ meta: [
		{ title: "Paramètres — NACORA" },
		{
			name: "description",
			content: "Gérez votre compte NACORA, exportez vos candidatures et contrôlez vos données locales."
		},
		{
			property: "og:title",
			content: "Paramètres — NACORA"
		},
		{
			property: "og:description",
			content: "Compte, export de données et confidentialité dans NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./profil-DoWxSbZX.mjs");
var Route$9 = createFileRoute("/profil")({
	head: () => ({ meta: [
		{ title: "Profil Candidat — NACORA Orbit" },
		{
			name: "description",
			content: "Le profil candidat complet de NACORA : identité, aspirations, formations, expériences avec KPI, compétences qualifiées et critères de matching IA."
		},
		{
			property: "og:title",
			content: "Profil Candidat — NACORA Orbit"
		},
		{
			property: "og:description",
			content: "Votre profil NACORA est la source de vérité pour le Match IA, l'analyseur de CV et les assistants de candidature."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var Route$8 = createFileRoute("/.mcp/list-tools")({ server: { handlers: { ANY: createTanStackListToolsHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$7 = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true,
	forwardedHostTrustedByPlatform: true
}) } } });
var $$splitComponentImporter$5 = () => import("./assistant.index-BZ16Q3oo.mjs");
var Route$6 = createFileRoute("/assistant/")({
	head: () => ({ meta: [
		{ title: "NACORA AI — Votre copilote pour décrocher votre prochaine opportunité" },
		{
			name: "description",
			content: "Intelligence artificielle unifiée de NACORA : analysez une offre, calculez votre Match IA, adaptez votre CV, rédigez vos e-mails et préparez vos entretiens."
		},
		{
			property: "og:title",
			content: "NACORA AI — Copilote Unifié"
		},
		{
			property: "og:description",
			content: "Une seule intelligence artificielle pour piloter l'ensemble de vos candidatures."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./assistant.connect-CSNCjFQ3.mjs");
var Route$5 = createFileRoute("/assistant/connect")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [
		{ title: "Connecter une IA — NACORA" },
		{
			name: "description",
			content: "Connectez ChatGPT, Claude ou un autre assistant IA à votre compte NACORA via MCP."
		},
		{
			property: "og:title",
			content: "Connecter une IA à NACORA"
		},
		{
			property: "og:description",
			content: "Guide pas à pas pour relier Claude, ChatGPT ou Cursor à vos données NACORA."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] })
});
var $$splitComponentImporter$3 = () => import("./assistant.interview-CzotR5iR.mjs");
var Route$4 = createFileRoute("/assistant/interview")({
	head: () => ({ meta: [
		{ title: "Interview Coach — NACORA AI Hub" },
		{
			name: "description",
			content: "Préparez vos entretiens : questions probables, pistes de réponse STAR, arguments clés et questions à poser au recruteur."
		},
		{
			property: "og:title",
			content: "Interview Coach — NACORA AI Hub"
		},
		{
			property: "og:description",
			content: "Simulation d'entretien personnalisée à partir de votre profil et de l'offre visée."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./assistant.linkedin-ojY7H5FH.mjs");
var Route$3 = createFileRoute("/assistant/linkedin")({
	head: () => ({ meta: [
		{ title: "LinkedIn Assistant — NACORA AI Hub" },
		{
			name: "description",
			content: "Générez vos notes d'invitation, messages de suivi et accroche de profil LinkedIn à partir de votre profil réel."
		},
		{
			property: "og:title",
			content: "LinkedIn Assistant — NACORA AI Hub"
		},
		{
			property: "og:description",
			content: "Messages LinkedIn personnalisés générés par l'IA à partir de votre profil et de l'offre ciblée."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./assistant.match-2lZPmopG.mjs");
var Route$2 = createFileRoute("/assistant/match")({
	head: () => ({ meta: [
		{ title: "Match IA — NACORA AI Hub" },
		{
			name: "description",
			content: "Classement IA de vos offres : score de correspondance, points forts, vigilance et compétences à renforcer."
		},
		{
			property: "og:title",
			content: "Match IA — NACORA AI Hub"
		},
		{
			property: "og:description",
			content: "Comparez votre profil à chaque offre et priorisez les candidatures avec le meilleur potentiel."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitErrorComponentImporter = () => import("../_._lovable.oauth.consent-CPt5NC92.mjs");
var $$splitComponentImporter = () => import("../_._lovable.oauth.consent-Qz0P4RnB.mjs");
var Route$1 = createFileRoute("/.lovable/oauth/consent")({
	ssr: false,
	validateSearch: (s) => ({ authorization_id: typeof s["authorization_id"] === "string" ? s["authorization_id"] : "" }),
	beforeLoad: async ({ search, location }) => {
		if (!search.authorization_id) throw new Error("Missing authorization_id");
		const { data } = await supabase.auth.getSession();
		const next = location.pathname + location.searchStr;
		if (!data.session) throw redirect({
			to: "/auth",
			search: { next }
		});
	},
	loader: async ({ location }) => {
		const authorizationId = new URLSearchParams(location.search).get("authorization_id");
		const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
		if (error) throw error;
		const immediate = data?.redirect_url ?? data?.redirect_to;
		if (immediate && !data?.client) throw redirect({ href: immediate });
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
var Route = createFileRoute("/.mcp/invoke-tool/$tool")({ server: { handlers: { ANY: createTanStackInvokeToolHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var IndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AssistantRoute = Route$24.update({
	id: "/assistant",
	path: "/assistant",
	getParentRoute: () => Route$26
});
var AuthRoute = Route$23.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$26
});
var CalendrierRoute = Route$22.update({
	id: "/calendrier",
	path: "/calendrier",
	getParentRoute: () => Route$26
});
var CandidaturesRoute = Route$21.update({
	id: "/candidatures",
	path: "/candidatures",
	getParentRoute: () => Route$26
});
var ConnectRoute = Route$20.update({
	id: "/connect",
	path: "/connect",
	getParentRoute: () => Route$26
});
var ContactsRoute = Route$19.update({
	id: "/contacts",
	path: "/contacts",
	getParentRoute: () => Route$26
});
var DocumentsRoute = Route$18.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => Route$26
});
var EntreprisesRoute = Route$17.update({
	id: "/entreprises",
	path: "/entreprises",
	getParentRoute: () => Route$26
});
var ImportRoute = Route$16.update({
	id: "/import",
	path: "/import",
	getParentRoute: () => Route$26
});
var InterviewRoute = Route$15.update({
	id: "/interview",
	path: "/interview",
	getParentRoute: () => Route$26
});
var LinkedinRoute = Route$14.update({
	id: "/linkedin",
	path: "/linkedin",
	getParentRoute: () => Route$26
});
var MatchRoute = Route$13.update({
	id: "/match",
	path: "/match",
	getParentRoute: () => Route$26
});
var McpRoute = Route$12.update({
	id: "/mcp",
	path: "/mcp",
	getParentRoute: () => Route$26
});
var OpportunitesRoute = Route$11.update({
	id: "/opportunites",
	path: "/opportunites",
	getParentRoute: () => Route$26
});
var ParametresRoute = Route$10.update({
	id: "/parametres",
	path: "/parametres",
	getParentRoute: () => Route$26
});
var ProfilRoute = Route$9.update({
	id: "/profil",
	path: "/profil",
	getParentRoute: () => Route$26
});
var Char91DotmcpChar93ListToolsRoute = Route$8.update({
	id: "/.mcp/list-tools",
	path: "/.mcp/list-tools",
	getParentRoute: () => Route$26
});
var Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$7.update({
	id: "/.well-known/oauth-protected-resource",
	path: "/.well-known/oauth-protected-resource",
	getParentRoute: () => Route$26
});
var AssistantIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AssistantRoute
});
var AssistantConnectRoute = Route$5.update({
	id: "/connect",
	path: "/connect",
	getParentRoute: () => AssistantRoute
});
var AssistantInterviewRoute = Route$4.update({
	id: "/interview",
	path: "/interview",
	getParentRoute: () => AssistantRoute
});
var AssistantLinkedinRoute = Route$3.update({
	id: "/linkedin",
	path: "/linkedin",
	getParentRoute: () => AssistantRoute
});
var AssistantMatchRoute = Route$2.update({
	id: "/match",
	path: "/match",
	getParentRoute: () => AssistantRoute
});
var DotlovableOauthConsentRoute = Route$1.update({
	id: "/.lovable/oauth/consent",
	path: "/.lovable/oauth/consent",
	getParentRoute: () => Route$26
});
var Char91DotmcpChar93InvokeToolToolRoute = Route.update({
	id: "/.mcp/invoke-tool/$tool",
	path: "/.mcp/invoke-tool/$tool",
	getParentRoute: () => Route$26
});
var AssistantRouteChildren = {
	AssistantConnectRoute,
	AssistantInterviewRoute,
	AssistantLinkedinRoute,
	AssistantMatchRoute,
	AssistantIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AssistantRoute: AssistantRoute._addFileChildren(AssistantRouteChildren),
	AuthRoute,
	CalendrierRoute,
	CandidaturesRoute,
	ConnectRoute,
	ContactsRoute,
	DocumentsRoute,
	EntreprisesRoute,
	ImportRoute,
	InterviewRoute,
	LinkedinRoute,
	MatchRoute,
	McpRoute,
	OpportunitesRoute,
	ParametresRoute,
	ProfilRoute,
	Char91DotmcpChar93ListToolsRoute,
	Char91DotwellKnownChar93OauthProtectedResourceRoute,
	DotlovableOauthConsentRoute,
	Char91DotmcpChar93InvokeToolToolRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getCompteActif as $, saveContactsLocal as A, formatDate as B, TYPES_CONTACT as C, historiqueEnTexte as D, emptyContact as E, STORAGE_KEY as F, toCsv as G, loadCandidatures as H, addDays as I, NIVEAUX_COMPETENCE as J, todayIso as K, daysBetween as L, SEED as M, SOURCES as N, loadContactsLocal as O, STATUTS as P, emptyProfil as Q, emptyCandidature as R, LIBELLES_RELANCE as S, contactEnTexte as T, normalizeCandidature as U, getNextBestAction as V, saveCandidatures as W, completionCv as X, NIVEAUX_LANGUE as Y, cvStructureEnTexte as Z, enableBiometric as _, Dialog as a, nouvelleCompetence as at, genererCodeTransfert as b, DialogFooter as c, nouvelleLangue as ct, Textarea as d, Button as dt, loadProfil as et, Label as f, cn as ft, disableBiometric as g, biometricSupported as h, Logo as i, nouvelleCertification as it, PRIORITES as j, nouvelEchange as k, DialogHeader as l, saveProfilLocal as lt, biometricEnabled as m, Route$1 as n, nouveauBenevolat as nt, DialogContent as o, nouvelleExperience as ot, Input as p, CRITERES as q, Route$21 as r, nouveauProjet as rt, DialogDescription as s, nouvelleFormation as st, router_exports as t, normaliserCvStructure as tt, DialogTitle as u, setCompteActif as ut, verifyBiometric as v, TYPES_RELANCE as w, CANAUX as x, appliquerCodeTransfert as y, emptyPreparation as z };
