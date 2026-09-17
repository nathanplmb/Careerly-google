import { o as __toESM } from "../_runtime.mjs";
import { a as createTanStackListToolsHandler, f as boolean, h as string, i as createTanStackInvokeToolHandler, m as object, n as defineMcp, o as createTanStackMcpHandler, p as number, r as defineTool, s as createTanStackOAuthProtectedResourceMetadataHandler, t as auth } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-DlNPIy5Y.mjs";
import { R as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as createServerFn, n as __exportAll } from "./server-WJa-_0402.mjs";
import { A as Plus, C as Search, D as RefreshCw, Dt as CircleX, E as RotateCcw, F as PenLine, Ft as ChartColumn, G as Linkedin, Ht as Building2, I as MessageSquare, It as Calendar, M as Phone, Ot as CircleCheck, P as Pen, Pt as Check, Q as Info, R as MapPin, U as LoaderCircle, Ut as Briefcase, W as ListOrdered, X as Languages, _ as Smartphone, a as Users, d as Upload, f as TriangleAlert, g as Sparkles, ht as Euro, jt as ChevronRight, kt as CircleAlert, lt as FileText, m as Trash2, mt as ExternalLink, n as X, o as User, ot as GitFork, qt as ArrowRight, v as SlidersHorizontal, wt as Clock, xt as Copy, z as Mail } from "../_libs/lucide-react.mjs";
import { a as fetchProfil, c as Select, d as SelectTrigger, f as SelectValue, l as SelectContent, n as createSsrRpc, r as Textarea, s as Label, t as Badge, u as SelectItem } from "./createSsrRpc-JPKLwWjw.mjs";
import "../_libs/firebase.mjs";
import { a as setDoc, i as query, o as collection, r as getDocs, s as doc, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-GF5R-Jcs.mjs";
import { l as extraireOpportuniteHeuristique } from "./opportunity.heuristic-CrGCH1C0.mjs";
import { i as Trigger, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { D as saveProfilLocal, F as cn, M as Input, N as Button, P as buttonVariants, _ as loadProfil, d as db, g as isFirebaseConfigured, n as AppShell, r as useSession, s as auth$1 } from "./router-CeQVKm6O2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-BUNdMwUV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$6 = "/app/applet/src/components/ui/tabs.tsx";
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$6,
	lineNumber: 42,
	columnNumber: 3
}, void 0));
TabsContent.displayName = Content.displayName;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-DCx-yZu6.js
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
		country: c.country ?? c["pays"] ?? base.country,
		contractType: c.contractType ?? c["contract_type"] ?? c["typeContrat"] ?? base.contractType,
		duration: c.duration ?? c["duree"] ?? c["contract_duration"] ?? base.duration,
		startDate: c.startDate ?? c["start_date"] ?? c["dateDebut"] ?? base.startDate,
		endDate: c.endDate ?? c["end_date"] ?? c["dateFin"] ?? base.endDate,
		salary: c.salary ?? c["salaire"] ?? base.salary,
		salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : typeof c["salary_min"] === "number" ? c["salary_min"] : base.salaryMin,
		salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : typeof c["salary_max"] === "number" ? c["salary_max"] : base.salaryMax,
		salaryCurrency: c.salaryCurrency ?? c["salary_currency"] ?? base.salaryCurrency,
		remotePolicy: c.remotePolicy ?? c["remote_policy"] ?? c["teletravail"] ?? base.remotePolicy,
		remoteDetails: c.remoteDetails ?? c["remote_details"] ?? base.remoteDetails,
		jobFunction: c.jobFunction ?? c["job_function"] ?? base.jobFunction,
		educationLevel: c.educationLevel ?? c["education_level"] ?? base.educationLevel,
		responsibilities: Array.isArray(c.responsibilities) ? c.responsibilities : base.responsibilities,
		requiredSkills,
		preferredSkills,
		tools,
		requiredLanguages: Array.isArray(c.requiredLanguages) ? c.requiredLanguages : Array.isArray(c["required_languages"]) ? c["required_languages"] : base.requiredLanguages,
		preferredLanguages: Array.isArray(c.preferredLanguages) ? c.preferredLanguages : Array.isArray(c["preferred_languages"]) ? c["preferred_languages"] : base.preferredLanguages,
		qualities,
		experienceRequirements: c.experienceRequirements ?? c["experience_requirements"] ?? base.experienceRequirements,
		educationRequirements: Array.isArray(c.educationRequirements) ? c.educationRequirements : Array.isArray(c["education_requirements"]) ? c["education_requirements"] : base.educationRequirements,
		parentCompany: c.parentCompany ?? c.groupName ?? c["parent_company"] ?? c["group_name"] ?? base.parentCompany,
		groupName: c.groupName ?? c.parentCompany ?? c["group_name"] ?? c["parent_company"] ?? base.groupName,
		companyDescription: c.companyDescription ?? c["company_description"] ?? base.companyDescription,
		companySector: c.companySector ?? c.secteur ?? c["company_sector"] ?? base.companySector,
		companySize: c.companySize ?? c["company_size"] ?? base.companySize,
		companyLocation: c.companyLocation ?? c["company_location"] ?? base.companyLocation,
		companyWebsite: c.companyWebsite ?? c["company_website"] ?? base.companyWebsite,
		companyContext: Array.isArray(c.companyContext) ? c.companyContext : Array.isArray(c["company_context"]) ? c["company_context"] : base.companyContext,
		companyPartners: Array.isArray(c.companyPartners) ? c.companyPartners : Array.isArray(c["company_partners"]) ? c["company_partners"] : base.companyPartners,
		companyMetrics: Array.isArray(c.companyMetrics) ? c.companyMetrics : Array.isArray(c["company_metrics"]) ? c["company_metrics"] : base.companyMetrics,
		recruitmentProcess: Array.isArray(c.recruitmentProcess) ? c.recruitmentProcess : Array.isArray(c["recruitment_process"]) ? c["recruitment_process"] : base.recruitmentProcess,
		applicationMethod: c.applicationMethod ?? c["application_method"] ?? base.applicationMethod,
		applicationRequirements: Array.isArray(c.applicationRequirements) ? c.applicationRequirements : Array.isArray(c["application_requirements"]) ? c["application_requirements"] : base.applicationRequirements,
		benefits: Array.isArray(c.benefits) ? c.benefits : Array.isArray(c["avantages"]) ? c["avantages"] : base.benefits,
		sourceType: c.sourceType ?? c["source_type"] ?? base.sourceType,
		sourceName: c.sourceName ?? c.source ?? c["source_name"] ?? base.sourceName,
		sourcePublishedAt: c.sourcePublishedAt ?? c["source_published_at"] ?? base.sourcePublishedAt,
		extractedAt: c.extractedAt ?? c["extracted_at"] ?? base.extractedAt
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
		metricsCount: safe.companyMetrics?.length ?? 0,
		missionsCount: safe.missionsList?.length ?? 0,
		skillsCount: safe.requiredSkills?.length ?? 0
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
var LEGACY_CAREERLY_STORAGE_KEY = "careerly_candidatures_v1";
function getStorageKey(userId) {
	return userId ? `nacora_${userId}_candidatures_v1` : "nacora_guest_candidatures_v1";
}
function loadCandidatures(userId) {
	if (typeof window === "undefined") return [];
	try {
		const key = getStorageKey(userId);
		const raw = window.localStorage.getItem(key);
		if (raw) {
			const parsed = JSON.parse(raw);
			return Array.isArray(parsed) ? parsed.map(normalizeCandidature) : [];
		}
		if (userId) {
			const oldRaw = window.localStorage.getItem(LEGACY_CAREERLY_STORAGE_KEY);
			if (oldRaw) {
				const parsed = JSON.parse(oldRaw);
				const list = Array.isArray(parsed) ? parsed.map(normalizeCandidature) : [];
				if (list.length > 0) {
					window.localStorage.setItem(key, JSON.stringify(list));
					window.localStorage.removeItem(LEGACY_CAREERLY_STORAGE_KEY);
					return list;
				}
			}
		}
		return [];
	} catch {
		return [];
	}
}
function saveCandidatures(items, userId) {
	if (typeof window === "undefined") return;
	try {
		const key = getStorageKey(userId);
		window.localStorage.setItem(key, JSON.stringify(items));
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
function getContactInitials(c) {
	const name = getContactFullName(c);
	if (!name || name === "Sans nom") return "??";
	const words = name.trim().split(/\s+/).filter(Boolean);
	const firstWord = words[0];
	if (!firstWord) return "??";
	if (words.length === 1) return firstWord.slice(0, 2).toUpperCase();
	const lastWord = words[words.length - 1] || "";
	return ((firstWord[0] || "") + (lastWord[0] || "")).toUpperCase() || "??";
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
	const firstOppId = merged.candidatureIds[0];
	if (!merged.candidatureId && firstOppId) merged.candidatureId = firstOppId;
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
	const firstRow = rows[0];
	if (!firstRow) return contacts;
	const headerRow = firstRow.map((h) => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim());
	const idxFirstName = headerRow.findIndex((h) => h.includes("first") || h.includes("prenom"));
	const idxLastName = headerRow.findIndex((h) => h.includes("last") || h.includes("nom") && !h.includes("prenom"));
	const idxUrl = headerRow.findIndex((h) => h.includes("url") || h.includes("profil") || h.includes("linkedin"));
	const idxEmail = headerRow.findIndex((h) => h.includes("email") || h.includes("mail") || h.includes("courriel"));
	const idxCompany = headerRow.findIndex((h) => h.includes("company") || h.includes("entreprise") || h.includes("societe"));
	const idxPosition = headerRow.findIndex((h) => h.includes("position") || h.includes("poste") || h.includes("titre") || h.includes("job"));
	for (let r = 1; r < rows.length; r++) {
		const row = rows[r];
		if (!row) continue;
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
	if (emailMatch && emailMatch[1] && emailMatch[0]) {
		result.email = emailMatch[1];
		text = text.replace(emailMatch[0], " ");
	}
	const phoneMatch = text.match(/(\+?\d[\d\s.\-()]{7,}\d)/);
	if (phoneMatch && phoneMatch[1] && phoneMatch[0]) {
		result.telephone = phoneMatch[1].trim();
		result.phone = result.telephone;
		text = text.replace(phoneMatch[0], " ");
	}
	const roleMatch = text.match(/\(([^)]+)\)/);
	if (roleMatch && roleMatch[1] && roleMatch[0]) {
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
function getContactsStorageKey(userId) {
	return userId ? `nacora_${userId}_contacts_v1` : "nacora_guest_contacts_v1";
}
function loadContactsLocal(userId) {
	if (typeof window === "undefined") return [];
	try {
		const key = getContactsStorageKey(userId);
		const raw = window.localStorage.getItem(key);
		if (raw) return JSON.parse(raw);
		if (userId) {
			const oldRaw = window.localStorage.getItem(CONTACTS_STORAGE_KEY);
			if (oldRaw) {
				const parsed = JSON.parse(oldRaw);
				if (Array.isArray(parsed) && parsed.length > 0) {
					window.localStorage.setItem(key, JSON.stringify(parsed));
					window.localStorage.removeItem(CONTACTS_STORAGE_KEY);
					return parsed;
				}
			}
		}
		return [];
	} catch {
		return [];
	}
}
function saveContactsLocal(items, userId) {
	if (typeof window === "undefined") return;
	try {
		const key = getContactsStorageKey(userId);
		window.localStorage.setItem(key, JSON.stringify(items));
	} catch {}
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/CandidatureSheet-B1hWIw61.js
var _jsxFileName$4$1 = "/app/applet/src/components/ui/modal.tsx";
var TAILLES = {
	sm: "sm:max-w-md",
	md: "sm:max-w-lg",
	lg: "sm:max-w-2xl",
	xl: "sm:max-w-3xl"
};
/** Fenêtre centrale NACORA : en-tête fixe, contenu défilant, actions en bas. */
function CenterModal({ open, onOpenChange, title, description, children, footer, size = "lg", className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: cn("flex max-h-[88svh] w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-3xl border-border/60 bg-card/95 p-0 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl", TAILLES[size], className),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "shrink-0 space-y-1 border-b border-border/50 px-5 py-4 pr-12 text-left sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
						className: "text-base sm:text-lg",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName$4$1,
						lineNumber: 52,
						columnNumber: 11
					}, this), description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
						className: "truncate",
						children: description
					}, void 0, false, {
						fileName: _jsxFileName$4$1,
						lineNumber: 54,
						columnNumber: 13
					}, this) : null]
				}, void 0, true, {
					fileName: _jsxFileName$4$1,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: cn("min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6", bodyClassName),
					children
				}, void 0, false, {
					fileName: _jsxFileName$4$1,
					lineNumber: 60,
					columnNumber: 9
				}, this),
				footer ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "shrink-0 border-t border-border/50 bg-background/40 px-5 py-3.5 sm:px-6",
					children: footer
				}, void 0, false, {
					fileName: _jsxFileName$4$1,
					lineNumber: 70,
					columnNumber: 11
				}, this) : null
			]
		}, void 0, true, {
			fileName: _jsxFileName$4$1,
			lineNumber: 44,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4$1,
		lineNumber: 43,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3$1 = "/app/applet/src/components/ui/alert-dialog.tsx";
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 17,
	columnNumber: 3
}, void 0));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 33,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 34,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$3$1,
	lineNumber: 32,
	columnNumber: 3
}, void 0));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 50,
	columnNumber: 3
}, void 0);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 64,
	columnNumber: 3
}, void 0);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 78,
	columnNumber: 3
}, void 0));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 90,
	columnNumber: 3
}, void 0));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$3$1,
	lineNumber: 115,
	columnNumber: 3
}, void 0));
AlertDialogCancel.displayName = Cancel.displayName;
var ExtraireOpportuniteInput = object({
	text: string().min(10, "Le texte de l'offre doit contenir au moins 10 caractères."),
	url: string().optional()
});
var extraireOpportuniteServerFn = createServerFn({ method: "POST" }).validator((data) => ExtraireOpportuniteInput.parse(data)).handler(createSsrRpc("a8546a28c65e51fb3ecf9b7f6df5ff54e8d3e0bde77d5c2290b5d284fcc08ab9"));
var _jsxFileName$2$1 = "/app/applet/src/components/opportunity/OpportunityFieldEditors.tsx";
function TagListEditor({ label, items, onChange, placeholder = "Ajouter...", badgeClassName = "bg-primary/10 text-primary border-primary/20", emptyText = "Non renseigné" }) {
	const [inputVal, setInputVal] = (0, import_react.useState)("");
	const handleAdd = () => {
		const trimmed = inputVal.trim();
		if (!trimmed) return;
		if (!items.includes(trimmed)) onChange([...items, trimmed]);
		setInputVal("");
	};
	const handleRemove = (index) => {
		onChange(items.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: [
						label,
						" (",
						items.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 46,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 45,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-muted/20 border border-border/40",
				children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted-foreground/60 italic self-center px-1",
					children: emptyText
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 53,
					columnNumber: 11
				}, this) : items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: `text-xs py-1 px-2.5 flex items-center gap-1.5 font-medium transition-all ${badgeClassName}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item }, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 63,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => handleRemove(idx),
						className: "text-muted-foreground hover:text-destructive transition-colors focus:outline-none",
						title: "Supprimer",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 70,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 64,
						columnNumber: 15
					}, this)]
				}, idx, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 58,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 51,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: inputVal,
					onChange: (e) => setInputVal(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					},
					placeholder,
					className: "h-8 text-xs bg-background"
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 78,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: handleAdd,
					disabled: !inputVal.trim(),
					className: "h-8 px-2.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 98,
						columnNumber: 11
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 90,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 77,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 44,
		columnNumber: 5
	}, this);
}
function MetricsEditor({ metrics, onChange }) {
	const [label, setLabel] = (0, import_react.useState)("");
	const [value, setValue] = (0, import_react.useState)("");
	const handleAdd = () => {
		if (!label.trim() || !value.trim()) return;
		onChange([...metrics, {
			label: label.trim(),
			value: value.trim()
		}]);
		setLabel("");
		setValue("");
	};
	const handleRemove = (index) => {
		onChange(metrics.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 128,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Chiffres clés & Métriques (",
					metrics.length,
					")"
				] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 129,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 127,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
				children: metrics.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "col-span-full py-3 px-4 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground/60 italic",
					children: "Aucun chiffre clé détecté dans l'offre."
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 134,
					columnNumber: 11
				}, this) : metrics.map((m, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative group p-3 rounded-xl border border-border/60 bg-card/60 shadow-xs flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => handleRemove(idx),
							className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$2$1,
								lineNumber: 148,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 143,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-base font-bold text-primary truncate pr-4",
							children: m.value
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 150,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[11px] text-muted-foreground truncate",
							children: m.label
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 153,
							columnNumber: 15
						}, this)
					]
				}, idx, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 139,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 132,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						placeholder: "Métrique (ex: Utilisateurs)",
						value: label,
						onChange: (e) => setLabel(e.target.value),
						className: "h-8 text-xs flex-1 bg-background"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 162,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						placeholder: "Valeur (ex: 400 000)",
						value,
						onChange: (e) => setValue(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleAdd();
							}
						},
						className: "h-8 text-xs w-32 bg-background"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 168,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: handleAdd,
						disabled: !label.trim() || !value.trim(),
						className: "h-8 px-2.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 188,
							columnNumber: 11
						}, this), " Ajouter"]
					}, void 0, true, {
						fileName: _jsxFileName$2$1,
						lineNumber: 180,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 161,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 126,
		columnNumber: 5
	}, this);
}
function LanguagesEditor({ requiredLanguages, preferredLanguages, onChangeRequired, onChangePreferred }) {
	const [newLang, setNewLang] = (0, import_react.useState)("");
	const [newNiveau, setNewNiveau] = (0, import_react.useState)("");
	const [isObligatoire, setIsObligatoire] = (0, import_react.useState)(true);
	const handleAdd = () => {
		if (!newLang.trim()) return;
		const item = {
			langue: newLang.trim(),
			niveau: newNiveau.trim() || void 0,
			obligatoire: isObligatoire
		};
		if (isObligatoire) onChangeRequired([...requiredLanguages, item]);
		else onChangePreferred([...preferredLanguages, item]);
		setNewLang("");
		setNewNiveau("");
	};
	const total = requiredLanguages.length + preferredLanguages.length;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 233,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Langues (",
					total,
					")"
				] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 234,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 232,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2 p-2.5 rounded-xl bg-muted/20 border border-border/40 min-h-[42px]",
				children: total === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted-foreground/60 italic self-center px-1",
					children: "Non renseigné (aucune langue explicitement requise dans l'offre)"
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 239,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [requiredLanguages.map((l, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "text-xs py-1 px-2.5 flex items-center gap-1.5 bg-destructive/10 text-destructive border-destructive/30 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: l.langue }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 250,
							columnNumber: 17
						}, this),
						l.niveau && /* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] opacity-80",
							children: [
								"(",
								l.niveau,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2$1,
							lineNumber: 252,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[9px] uppercase font-bold tracking-tight bg-destructive/20 px-1 rounded",
							children: "Requis"
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 254,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => onChangeRequired(requiredLanguages.filter((_, i) => i !== idx)),
							className: "hover:opacity-75 focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$2$1,
								lineNumber: 266,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 257,
							columnNumber: 17
						}, this)
					]
				}, `req-${idx}`, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 245,
					columnNumber: 15
				}, this)), preferredLanguages.map((l, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					variant: "outline",
					className: "text-xs py-1 px-2.5 flex items-center gap-1.5 bg-lilac/10 text-lilac border-lilac/30 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: l.langue }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 276,
							columnNumber: 17
						}, this),
						l.niveau && /* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] opacity-80",
							children: [
								"(",
								l.niveau,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2$1,
							lineNumber: 278,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[9px] uppercase font-bold tracking-tight bg-lilac/20 px-1 rounded",
							children: "Atout"
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 280,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => onChangePreferred(preferredLanguages.filter((_, i) => i !== idx)),
							className: "hover:opacity-75 focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$2$1,
								lineNumber: 292,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 283,
							columnNumber: 17
						}, this)
					]
				}, `pref-${idx}`, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 271,
					columnNumber: 15
				}, this))] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 243,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 237,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						placeholder: "Langue (ex: Anglais)",
						value: newLang,
						onChange: (e) => setNewLang(e.target.value),
						className: "h-8 text-xs flex-1 bg-background"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 301,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						placeholder: "Niveau (ex: Courant, C1)",
						value: newNiveau,
						onChange: (e) => setNewNiveau(e.target.value),
						className: "h-8 text-xs w-32 bg-background"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 307,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						size: "sm",
						variant: isObligatoire ? "default" : "secondary",
						onClick: () => setIsObligatoire(!isObligatoire),
						className: "h-8 text-[11px] px-2",
						children: isObligatoire ? "Obligatoire" : "Atout"
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 313,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: handleAdd,
						disabled: !newLang.trim(),
						className: "h-8 px-2.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 330,
							columnNumber: 11
						}, this), " Ajouter"]
					}, void 0, true, {
						fileName: _jsxFileName$2$1,
						lineNumber: 322,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 300,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 231,
		columnNumber: 5
	}, this);
}
function ProcessStepsEditor({ steps, onChange }) {
	const [stepInput, setStepInput] = (0, import_react.useState)("");
	const handleAdd = () => {
		if (!stepInput.trim()) return;
		onChange([...steps, stepInput.trim()]);
		setStepInput("");
	};
	const handleRemove = (index) => {
		onChange(steps.filter((_, i) => i !== index));
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ListOrdered, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 361,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
					"Étapes du recrutement (",
					steps.length,
					")"
				] }, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 362,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 360,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-1.5",
				children: steps.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-2.5 px-3 rounded-xl bg-muted/20 border border-border/40 text-xs text-muted-foreground/60 italic",
					children: "Non renseigné dans l'offre."
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 367,
					columnNumber: 11
				}, this) : steps.map((st, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between p-2 px-3 rounded-lg border border-border/50 bg-card/60 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "size-5 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center",
							children: idx + 1
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 377,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium",
							children: st
						}, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 380,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2$1,
						lineNumber: 376,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => handleRemove(idx),
						className: "text-muted-foreground hover:text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$2$1,
							lineNumber: 387,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 382,
						columnNumber: 15
					}, this)]
				}, idx, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 372,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2$1,
				lineNumber: 365,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					placeholder: "Nouvelle étape (ex: 3. Entretien avec le Head of Marketing)",
					value: stepInput,
					onChange: (e) => setStepInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAdd();
						}
					},
					className: "h-8 text-xs bg-background flex-1"
				}, void 0, false, {
					fileName: _jsxFileName$2$1,
					lineNumber: 395,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: handleAdd,
					disabled: !stepInput.trim(),
					className: "h-8 px-2.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
						fileName: _jsxFileName$2$1,
						lineNumber: 415,
						columnNumber: 11
					}, this), " Ajouter"]
				}, void 0, true, {
					fileName: _jsxFileName$2$1,
					lineNumber: 407,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2$1,
				lineNumber: 394,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2$1,
		lineNumber: 359,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1$1 = "/app/applet/src/components/workflow/WorkflowTab.tsx";
function WorkflowTab({ candidature, onChange }) {
	const currentStepKey = candidature.currentWorkflowStep || statutToWorkflowStepKey(candidature.statut);
	const currentConfig = getWorkflowStepConfig(currentStepKey);
	const events = Array.isArray(candidature.workflowEvents) ? candidature.workflowEvents : [];
	const [changeStepModalOpen, setChangeStepModalOpen] = (0, import_react.useState)(false);
	const [selectedTargetStep, setSelectedTargetStep] = (0, import_react.useState)(currentStepKey);
	const [stepDate, setStepDate] = (0, import_react.useState)(todayIso());
	const [stepNote, setStepNote] = (0, import_react.useState)("");
	const [stepChannel, setStepChannel] = (0, import_react.useState)(candidature.source || "JobTeaser");
	const [stepInterviewType, setStepInterviewType] = (0, import_react.useState)("Visio (Teams, Meet, Zoom)");
	const [stepInterlocuteur, setStepInterlocuteur] = (0, import_react.useState)(candidature.contact || "");
	const [editingEvent, setEditingEvent] = (0, import_react.useState)(null);
	const [editDate, setEditDate] = (0, import_react.useState)("");
	const [editNote, setEditNote] = (0, import_react.useState)("");
	const [editChannel, setEditChannel] = (0, import_react.useState)("");
	const [editInterviewType, setEditInterviewType] = (0, import_react.useState)("");
	const [editInterlocuteur, setEditInterlocuteur] = (0, import_react.useState)("");
	const [customEventModalOpen, setCustomEventModalOpen] = (0, import_react.useState)(false);
	const [customEventType, setCustomEventType] = (0, import_react.useState)(currentStepKey);
	const [customEventDate, setCustomEventDate] = (0, import_react.useState)(todayIso());
	const [customEventNote, setCustomEventNote] = (0, import_react.useState)("");
	const openChangeStepModal = (targetKey) => {
		const key = targetKey || currentConfig.nextStepKey || currentStepKey;
		setSelectedTargetStep(key);
		const targetConfig = getWorkflowStepConfig(key);
		setStepDate(todayIso());
		setStepNote(targetConfig.description);
		setStepChannel(candidature.source || "JobTeaser");
		setStepInterviewType("Visio (Teams, Meet, Zoom)");
		setStepInterlocuteur(candidature.contact || "");
		setChangeStepModalOpen(true);
	};
	const handleConfirmChangeStep = () => {
		const targetConfig = getWorkflowStepConfig(selectedTargetStep);
		onChange(transitionWorkflowStep(candidature, selectedTargetStep, {
			date: stepDate || todayIso(),
			note: stepNote.trim() || targetConfig.description,
			channel: selectedTargetStep === "application_sent" ? stepChannel : void 0,
			interviewType: selectedTargetStep === "interview" || selectedTargetStep === "second_interview" ? stepInterviewType : void 0,
			interlocuteur: selectedTargetStep === "interview" || selectedTargetStep === "second_interview" ? stepInterlocuteur.trim() || void 0 : void 0
		}));
		setChangeStepModalOpen(false);
		toast.success(`Étape mise à jour : ${targetConfig.label}`);
	};
	const handleQuickAdvance = () => {
		if (!currentConfig.nextStepKey) {
			openChangeStepModal();
			return;
		}
		openChangeStepModal(currentConfig.nextStepKey);
	};
	const handleOpenEditEvent = (evt) => {
		setEditingEvent(evt);
		setEditDate(evt.date);
		setEditNote(evt.note || "");
		setEditChannel(evt.channel || "");
		setEditInterviewType(evt.interviewType || "Visio (Teams, Meet, Zoom)");
		setEditInterlocuteur(evt.interlocuteur || "");
	};
	const handleSaveEditEvent = () => {
		if (!editingEvent) return;
		const patch = { workflowEvents: events.map((e) => {
			if (e.id === editingEvent.id) return {
				...e,
				date: editDate,
				note: editNote.trim(),
				channel: editChannel.trim() || void 0,
				interviewType: editInterviewType.trim() || void 0,
				interlocuteur: editInterlocuteur.trim() || void 0
			};
			return e;
		}) };
		if (editingEvent.type === "application_sent") {
			patch.dateEnvoi = editDate;
			patch.appliedAt = editDate;
		} else if (editingEvent.type === "follow_up") {
			patch.dateRelance = editDate;
			patch.followUpDate = editDate;
		} else if (editingEvent.type === "interview") patch.interviewDate = editDate;
		onChange(patch);
		setEditingEvent(null);
		toast.success("Événement mis à jour.");
	};
	const handleDeleteEvent = (eventId, eventType) => {
		if (eventType === "saved" && events.length === 1) {
			toast.error("L'étape initiale 'Sauvegardée' ne peut pas être supprimée.");
			return;
		}
		const updatedEvents = events.filter((e) => e.id !== eventId);
		let newStep = currentStepKey;
		if (currentStepKey === eventType) {
			const remainingTypes = updatedEvents.map((e) => e.type);
			const orderedRemaining = WORKFLOW_STEPS_CONFIG.filter((s) => remainingTypes.includes(s.key));
			newStep = orderedRemaining.length > 0 ? orderedRemaining[orderedRemaining.length - 1]?.key || "saved" : "saved";
		}
		onChange({
			workflowEvents: updatedEvents,
			currentWorkflowStep: newStep,
			statut: workflowStepKeyToStatut(newStep),
			status: workflowStepKeyToStatut(newStep)
		});
		toast.success("Événement supprimé.");
	};
	const handleAddCustomEvent = () => {
		const newEvent = {
			id: `custom-evt-${Date.now()}`,
			type: customEventType,
			date: customEventDate || todayIso(),
			note: customEventNote.trim() || "Note d'avancement",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		onChange({ workflowEvents: [...events, newEvent].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) });
		setCustomEventModalOpen(false);
		toast.success("Note ajoutée au journal.");
	};
	const currentStepIndex = WORKFLOW_STEPS_CONFIG.findIndex((s) => s.key === currentStepKey);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Étape actuelle du workflow"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 259,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: `text-xs px-2.5 py-0.5 font-semibold ${currentConfig.badgeColor}`,
								children: currentConfig.label
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 262,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 258,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-foreground font-medium",
							children: currentConfig.description
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 269,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 257,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 flex-wrap",
						children: [currentConfig.nextStepKey && /* @__PURE__ */ (void 0)(Button, {
							size: "sm",
							className: "gap-1.5 font-semibold text-xs h-9 shadow-xs",
							onClick: handleQuickAdvance,
							children: [/* @__PURE__ */ (void 0)("span", { children: currentConfig.defaultActionLabel }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 282,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 283,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 277,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							className: "gap-1.5 text-xs h-9",
							onClick: () => openChangeStepModal(),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 293,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Changer d'étape" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 294,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 287,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 275,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 256,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1.5 pt-1 border-t border-border/40",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Progression du processus" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 302,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-foreground",
							children: currentConfig.isTerminal ? currentConfig.terminalType === "success" ? "Offre acceptée" : "Candidature refusée" : `Étape ${Math.max(1, currentStepIndex + 1)} sur 8`
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 303,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 301,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-1.5 w-full bg-muted/60 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `h-full transition-all duration-300 ${currentConfig.key === "accepted" ? "bg-emerald-500 w-full" : currentConfig.key === "rejected" ? "bg-destructive w-full" : "bg-primary"}`,
							style: { width: currentConfig.isTerminal ? "100%" : `${Math.min(100, Math.max(12, (currentStepIndex + 1) / 8 * 100))}%` }
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 312,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 311,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 300,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 255,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-muted/15 border border-border/60 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 334,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: "Timeline de la candidature"
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 335,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 333,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Cliquez sur une étape pour changer ou ajuster les détails"
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 339,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 332,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative pl-3 sm:pl-4 space-y-6 before:absolute before:left-[19px] sm:before:left-[23px] before:top-3 before:bottom-3 before:w-0.5 before:bg-border/70",
					children: WORKFLOW_STEPS_CONFIG.map((step, idx) => {
						const isCurrent = step.key === currentStepKey;
						const matchingEvents = events.filter((e) => e.type === step.key);
						const hasEvent = matchingEvents.length > 0;
						const latestEvent = matchingEvents[matchingEvents.length - 1];
						let dotStyle = "border-muted-foreground/30 bg-background text-muted-foreground";
						let dotIcon = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-1.5 rounded-full bg-muted-foreground/40" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 355,
							columnNumber: 15
						}, this);
						if (isCurrent) {
							if (step.key === "accepted") {
								dotStyle = "border-emerald-500 bg-emerald-500 text-white ring-4 ring-emerald-500/20";
								dotIcon = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 stroke-[2.5]" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 362,
									columnNumber: 27
								}, this);
							} else if (step.key === "rejected") {
								dotStyle = "border-destructive bg-destructive text-white ring-4 ring-destructive/20";
								dotIcon = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 366,
									columnNumber: 27
								}, this);
							} else {
								dotStyle = "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20";
								dotIcon = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-2 rounded-full bg-white animate-pulse" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 371,
									columnNumber: 19
								}, this);
							}
						} else if (hasEvent) {
							dotStyle = "border-primary/60 bg-primary/10 text-primary";
							dotIcon = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 376,
								columnNumber: 25
							}, this);
						}
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative flex items-start gap-3 sm:gap-4 group",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => openChangeStepModal(step.key),
								title: `Passer à l'étape : ${step.label}`,
								className: `relative z-10 flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${dotStyle}`,
								children: dotIcon
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 385,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `flex-1 rounded-xl p-3 sm:p-3.5 transition-colors border ${isCurrent ? "bg-card border-primary/40 shadow-xs ring-1 ring-primary/20" : hasEvent ? "bg-card/70 border-border/70 hover:bg-card" : "bg-transparent border-transparent hover:bg-card/40 opacity-70 hover:opacity-100"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => openChangeStepModal(step.key),
													className: "text-left font-semibold text-sm hover:text-primary transition-colors cursor-pointer",
													children: step.label
												}, void 0, false, {
													fileName: _jsxFileName$1$1,
													lineNumber: 406,
													columnNumber: 23
												}, this),
												isCurrent && /* @__PURE__ */ (void 0)(Badge, {
													variant: "secondary",
													className: "text-[10px] px-2 py-0 font-semibold bg-primary/15 text-primary border-primary/20",
													children: "Actuelle"
												}, void 0, false, {
													fileName: _jsxFileName$1$1,
													lineNumber: 415,
													columnNumber: 25
												}, this),
												latestEvent?.date && /* @__PURE__ */ (void 0)("span", {
													className: "text-xs text-muted-foreground flex items-center gap-1 font-mono",
													children: [/* @__PURE__ */ (void 0)(Calendar, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName$1$1,
														lineNumber: 425,
														columnNumber: 27
													}, this), formatDate(latestEvent.date)]
												}, void 0, true, {
													fileName: _jsxFileName$1$1,
													lineNumber: 424,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1$1,
											lineNumber: 405,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1.5",
											children: [hasEvent && latestEvent && /* @__PURE__ */ (void 0)(Button, {
												variant: "ghost",
												size: "icon",
												className: "size-7 text-muted-foreground hover:text-foreground",
												onClick: () => handleOpenEditEvent(latestEvent),
												title: "Modifier la date ou note",
												children: /* @__PURE__ */ (void 0)(Pen, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName$1$1,
													lineNumber: 441,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 434,
												columnNumber: 25
											}, this), !isCurrent && /* @__PURE__ */ (void 0)(Button, {
												variant: "ghost",
												size: "sm",
												className: "h-7 text-xs px-2 text-muted-foreground hover:text-primary",
												onClick: () => openChangeStepModal(step.key),
												children: [/* @__PURE__ */ (void 0)("span", { children: "Définir" }, void 0, false, {
													fileName: _jsxFileName$1$1,
													lineNumber: 452,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$1$1,
													lineNumber: 453,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1$1,
												lineNumber: 446,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1$1,
											lineNumber: 432,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 404,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: latestEvent?.note || step.description
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 460,
										columnNumber: 19
									}, this),
									hasEvent && latestEvent && /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-border/40",
										children: [
											latestEvent.channel && /* @__PURE__ */ (void 0)(Badge, {
												variant: "outline",
												className: "text-[10px] px-2 py-0 bg-muted/40 font-medium",
												children: ["Canal : ", latestEvent.channel]
											}, void 0, true, {
												fileName: _jsxFileName$1$1,
												lineNumber: 468,
												columnNumber: 25
											}, this),
											latestEvent.interviewType && /* @__PURE__ */ (void 0)(Badge, {
												variant: "outline",
												className: "text-[10px] px-2 py-0 bg-muted/40 font-medium",
												children: ["Format : ", latestEvent.interviewType]
											}, void 0, true, {
												fileName: _jsxFileName$1$1,
												lineNumber: 476,
												columnNumber: 25
											}, this),
											latestEvent.interlocuteur && /* @__PURE__ */ (void 0)(Badge, {
												variant: "outline",
												className: "text-[10px] px-2 py-0 bg-muted/40 font-medium flex items-center gap-1",
												children: [/* @__PURE__ */ (void 0)(User, { className: "size-2.5" }, void 0, false, {
													fileName: _jsxFileName$1$1,
													lineNumber: 488,
													columnNumber: 27
												}, this), latestEvent.interlocuteur]
											}, void 0, true, {
												fileName: _jsxFileName$1$1,
												lineNumber: 484,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 466,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 395,
								columnNumber: 17
							}, this)]
						}, step.key, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 380,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 344,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 331,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 505,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "workflowContactInput",
								className: "text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer",
								children: "Contact recruteur / Interlocuteur"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 506,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 504,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] text-muted-foreground",
							children: "Coordonnées des interlocuteurs du recrutement"
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 513,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 503,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "workflowContactInput",
						value: candidature.contact || "",
						onChange: (e) => onChange({ contact: e.target.value }),
						placeholder: "ex: Sophie Durand (RH) — s.durand@entreprise.com — 06 12 34 56 78",
						className: "text-xs bg-background h-9"
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 518,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Ces coordonnées restent attachées à cette opportunité et sont réutilisées pour vos relances et convocations d'entretien."
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 525,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 502,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "size-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 535,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "workflowNotesInput",
							className: "text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer",
							children: "Notes personnelles & Impressions"
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 536,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 534,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] text-muted-foreground",
						children: "Vos notes privées (non générées par l'IA)"
					}, void 0, false, {
						fileName: _jsxFileName$1$1,
						lineNumber: 543,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 533,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					id: "workflowNotesInput",
					rows: 4,
					value: candidature.personalNotes || candidature.commentaire || "",
					onChange: (e) => onChange({
						personalNotes: e.target.value,
						commentaire: e.target.value
					}),
					placeholder: "Notez ici vos impressions sur l'équipe, questions à poser en entretien, fourchette de salaire discutée, retours...",
					className: "text-xs bg-background resize-y leading-relaxed"
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 548,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 532,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 sm:p-5 rounded-2xl bg-muted/15 border border-border/60 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 567,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-bold uppercase tracking-wider text-foreground",
							children: [
								"Journal des événements (",
								events.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 568,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 566,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						className: "h-7 text-xs gap-1",
						onClick: () => {
							setCustomEventType(currentStepKey);
							setCustomEventDate(todayIso());
							setCustomEventNote("");
							setCustomEventModalOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 583,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une entrée" }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 584,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1$1,
						lineNumber: 572,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 565,
					columnNumber: 9
				}, this), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground py-2",
					children: "Aucun événement pour le moment."
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 589,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2",
					children: events.map((evt) => {
						const cfg = getWorkflowStepConfig(evt.type);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-3 p-2.5 rounded-xl bg-card border border-border/50 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: `text-[10px] px-2 py-0 shrink-0 ${cfg.badgeColor}`,
										children: cfg.label
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 602,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-muted-foreground shrink-0 text-[11px]",
										children: formatDate(evt.date)
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 608,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-foreground truncate font-medium",
										children: evt.note || cfg.description
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 611,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 601,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-muted-foreground hover:text-foreground",
									onClick: () => handleOpenEditEvent(evt),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 623,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 617,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-7 text-muted-foreground hover:text-destructive",
									onClick: () => handleDeleteEvent(evt.id, evt.type),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 631,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 625,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 616,
								columnNumber: 19
							}, this)]
						}, evt.id, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 597,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$1$1,
					lineNumber: 593,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1$1,
				lineNumber: 564,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: changeStepModalOpen,
				onOpenChange: setChangeStepModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 646,
								columnNumber: 15
							}, this), "Changer l'étape du workflow"]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 645,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs",
							children: "Sélectionnez la nouvelle étape pour faire progresser cette opportunité. Vous pouvez revenir en arrière à tout moment."
						}, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 649,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 644,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Choisir une étape :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 658,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-2 sm:grid-cols-3 gap-1.5",
										children: WORKFLOW_STEPS_CONFIG.map((step) => {
											const isSelected = selectedTargetStep === step.key;
											return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => {
													setSelectedTargetStep(step.key);
													setStepNote(step.description);
												},
												className: `px-2.5 py-2 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${isSelected ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30" : "border-border hover:bg-muted/40 text-foreground"}`,
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "truncate",
														children: step.label
													}, void 0, false, {
														fileName: _jsxFileName$1$1,
														lineNumber: 679,
														columnNumber: 25
													}, this), isSelected && /* @__PURE__ */ (void 0)(Check, { className: "size-3 shrink-0 ml-1" }, void 0, false, {
														fileName: _jsxFileName$1$1,
														lineNumber: 681,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$1$1,
													lineNumber: 678,
													columnNumber: 23
												}, this)
											}, step.key, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 665,
												columnNumber: 21
											}, this);
										})
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 661,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 657,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "stepDateInput",
										className: "text-xs font-semibold",
										children: "Date de l'événement :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 692,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "stepDateInput",
										type: "date",
										value: stepDate,
										onChange: (e) => setStepDate(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 695,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 691,
									columnNumber: 13
								}, this),
								selectedTargetStep === "application_sent" && /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "stepChannelSelect",
										className: "text-xs font-semibold",
										children: "Canal d'envoi :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 707,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: stepChannel,
										onValueChange: setStepChannel,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "stepChannelSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 718,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 714,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: CHANNELS_COMMUNICATION.map((ch) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: ch,
											className: "text-xs",
											children: ch
										}, ch, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 722,
											columnNumber: 23
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 720,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 713,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 706,
									columnNumber: 15
								}, this),
								(selectedTargetStep === "interview" || selectedTargetStep === "second_interview") && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "stepInterviewTypeSelect",
										className: "text-xs font-semibold",
										children: "Format de l'entretien :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 735,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: stepInterviewType,
										onValueChange: setStepInterviewType,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "stepInterviewTypeSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 749,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 745,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: TYPES_ENTRETIEN.map((t) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: t,
											className: "text-xs",
											children: t
										}, t, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 753,
											columnNumber: 25
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 751,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 741,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 734,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "stepInterlocuteurInput",
										className: "text-xs font-semibold",
										children: "Interlocuteur (optionnel) :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 762,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "stepInterlocuteurInput",
										value: stepInterlocuteur,
										onChange: (e) => setStepInterlocuteur(e.target.value),
										placeholder: "ex: Sophie Durand (Talent Acquisition)",
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 768,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 761,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 733,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "stepNoteInput",
										className: "text-xs font-semibold",
										children: "Commentaire / Note d'étape :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 781,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "stepNoteInput",
										value: stepNote,
										onChange: (e) => setStepNote(e.target.value),
										placeholder: "ex: Dossier envoyé via le formulaire recruteur",
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 784,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 780,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 655,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setChangeStepModalOpen(false),
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 795,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								className: "gap-1 font-semibold",
								onClick: handleConfirmChangeStep,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valider l'étape" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 807,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 808,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1$1,
								lineNumber: 802,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 794,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 643,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1$1,
				lineNumber: 642,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: Boolean(editingEvent),
				onOpenChange: (open) => !open && setEditingEvent(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pen, { className: "size-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName$1$1,
									lineNumber: 822,
									columnNumber: 15
								}, this),
								"Modifier l'événement :",
								" ",
								editingEvent ? getWorkflowStepConfig(editingEvent.type).label : ""
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 821,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 820,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "editDateInput",
										className: "text-xs font-semibold",
										children: "Date :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 832,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "editDateInput",
										type: "date",
										value: editDate,
										onChange: (e) => setEditDate(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 835,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 831,
									columnNumber: 13
								}, this),
								editingEvent?.type === "application_sent" && /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "editChannelSelect",
										className: "text-xs font-semibold",
										children: "Canal :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 846,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: editChannel,
										onValueChange: setEditChannel,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "editChannelSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 857,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 853,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: CHANNELS_COMMUNICATION.map((ch) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: ch,
											className: "text-xs",
											children: ch
										}, ch, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 861,
											columnNumber: 23
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 859,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 852,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 845,
									columnNumber: 15
								}, this),
								(editingEvent?.type === "interview" || editingEvent?.type === "second_interview") && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "editInterviewTypeSelect",
										className: "text-xs font-semibold",
										children: "Format :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 874,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Select, {
										value: editInterviewType,
										onValueChange: setEditInterviewType,
										children: [/* @__PURE__ */ (void 0)(SelectTrigger, {
											id: "editInterviewTypeSelect",
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 888,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 884,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: TYPES_ENTRETIEN.map((t) => /* @__PURE__ */ (void 0)(SelectItem, {
											value: t,
											className: "text-xs",
											children: t
										}, t, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 892,
											columnNumber: 25
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 890,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 880,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 873,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "editInterlocuteurInput",
										className: "text-xs font-semibold",
										children: "Interlocuteur :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 901,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "editInterlocuteurInput",
										value: editInterlocuteur,
										onChange: (e) => setEditInterlocuteur(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 907,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 900,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 872,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "editNoteInput",
										className: "text-xs font-semibold",
										children: "Note / Détails :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 918,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "editNoteInput",
										value: editNote,
										onChange: (e) => setEditNote(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 921,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 917,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 830,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setEditingEvent(null),
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 931,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: handleSaveEditEvent,
								children: "Enregistrer"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 938,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 930,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 819,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1$1,
				lineNumber: 815,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: customEventModalOpen,
				onOpenChange: setCustomEventModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 953,
								columnNumber: 15
							}, this), "Ajouter une entrée au journal"]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 952,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1$1,
							lineNumber: 951,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Type d'étape :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 960,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
										value: customEventType,
										onValueChange: (v) => setCustomEventType(v),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
											className: "text-xs bg-background",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$1$1,
												lineNumber: 966,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 965,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: WORKFLOW_STEPS_CONFIG.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: s.key,
											className: "text-xs",
											children: s.label
										}, s.key, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 970,
											columnNumber: 21
										}, this)) }, void 0, false, {
											fileName: _jsxFileName$1$1,
											lineNumber: 968,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1$1,
										lineNumber: 961,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 959,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Date :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 979,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "date",
										value: customEventDate,
										onChange: (e) => setCustomEventDate(e.target.value),
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 980,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 978,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs font-semibold",
										children: "Détail ou note :"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 989,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: customEventNote,
										onChange: (e) => setCustomEventNote(e.target.value),
										placeholder: "ex: Rappel téléphonique avec le RH",
										className: "text-xs bg-background"
									}, void 0, false, {
										fileName: _jsxFileName$1$1,
										lineNumber: 990,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1$1,
									lineNumber: 988,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 958,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setCustomEventModalOpen(false),
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 1e3,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: handleAddCustomEvent,
								children: "Ajouter"
							}, void 0, false, {
								fileName: _jsxFileName$1$1,
								lineNumber: 1007,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1$1,
							lineNumber: 999,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1$1,
					lineNumber: 950,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1$1,
				lineNumber: 946,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1$1,
		lineNumber: 253,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/CandidatureSheet.tsx";
function CandidatureSheet({ open, onOpenChange, value, onSave, onDelete, existingItems, onOpenExisting, initialTab = "offre" }) {
	const [form, setForm] = (0, import_react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("menu");
	const [pastedText, setPastedText] = (0, import_react.useState)("");
	const [optionalUrl, setOptionalUrl] = (0, import_react.useState)("");
	const [analyzing, setAnalyzing] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [duplicateMatch, setDuplicateMatch] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)(initialTab);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open && value) {
			const normalized = normalizeCandidature(value);
			setForm(normalized);
			setErrorMsg(null);
			setDuplicateMatch(null);
			setActiveTab(initialTab || "offre");
			if (!value.entreprise && !value.poste) {
				setMode("menu");
				setPastedText("");
				setOptionalUrl("");
			} else {
				setMode("form");
				if (value.detail) setPastedText(value.detail);
				if (value.lien) setOptionalUrl(value.lien);
			}
			setAnalyzing(false);
		}
	}, [open, value]);
	if (!form) return null;
	const set = (partial) => {
		setForm((prev) => prev ? normalizeCandidature({
			...prev,
			...partial
		}) : prev);
	};
	const setPrep = (partial) => setForm((prev) => prev ? {
		...prev,
		preparation: {
			...prev.preparation ?? emptyPreparation(),
			...partial
		}
	} : prev);
	const handleAnalyze = async () => {
		if (!pastedText.trim() || pastedText.trim().length < 15) {
			setErrorMsg("Veuillez coller le texte de l'offre (au moins 15 caractères).");
			return;
		}
		setAnalyzing(true);
		setErrorMsg(null);
		let extracted = null;
		let fallbackUsed = false;
		try {
			extracted = await extraireOpportuniteServerFn({ data: {
				text: pastedText,
				url: optionalUrl.trim() || void 0
			} });
		} catch (serverFnErr) {
			console.warn("[CandidatureSheet] Échec createServerFn, tentative via endpoint Vercel /api/extraire-opportunite:", serverFnErr);
			try {
				const res = await fetch("/api/extraire-opportunite", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						text: pastedText,
						url: optionalUrl.trim() || void 0
					})
				});
				if (res.ok) extracted = await res.json();
				else throw new Error(`API HTTP ${res.status}`);
			} catch (apiErr) {
				console.warn("[CandidatureSheet] Échec de l'endpoint distant, activation du moteur heuristique déterministe:", apiErr);
				extracted = extraireOpportuniteHeuristique(pastedText, optionalUrl.trim() || void 0);
				fallbackUsed = true;
			}
		}
		if (!extracted) {
			extracted = extraireOpportuniteHeuristique(pastedText, optionalUrl.trim() || void 0);
			fallbackUsed = true;
		}
		try {
			const missionsList = Array.isArray(extracted.missions) ? extracted.missions : [];
			const missionsStr = missionsList.length > 0 ? missionsList.map((m) => `• ${m}`).join("\n") : typeof extracted.missions === "string" ? extracted.missions : form.missions;
			const updated = normalizeCandidature({
				...form,
				...extracted,
				contractType: extracted.contractType ?? null,
				applicationDeadline: extracted.applicationDeadline ?? null,
				dateLimite: extracted.applicationDeadline || "",
				source: extracted.source || form.source || "Autre",
				missions: missionsStr,
				missionsList: missionsList.length > 0 ? missionsList : form.missionsList,
				detail: pastedText,
				lien: optionalUrl.trim() || extracted.sourceUrl || form.lien,
				sourceUrl: optionalUrl.trim() || extracted.sourceUrl || form.sourceUrl,
				statut: form.statut || "Sauvegardée",
				status: form.status || form.statut || "Sauvegardée"
			});
			const duplicate = findPotentialDuplicate(updated, existingItems || loadCandidatures());
			if (duplicate) setDuplicateMatch(duplicate);
			console.info("[OPPORTUNITY PREVIEW] Données prêtes pour affichage dans le formulaire:", {
				poste: updated.poste,
				entreprise: updated.entreprise,
				contractType: updated.contractType,
				duration: updated.duration,
				startDate: updated.startDate,
				metricsCount: updated.companyMetrics?.length || 0,
				missionsCount: updated.missionsList?.length || 0,
				skillsCount: updated.requiredSkills?.length || 0,
				companyMetrics: updated.companyMetrics,
				extractionMethod: extracted._extractionMethod || (fallbackUsed ? "heuristic" : "ai"),
				modelUsed: extracted._modelUsed
			});
			setForm(updated);
			setMode("form");
			if (fallbackUsed || extracted._extractionMethod === "heuristic") setErrorMsg("Analyse effectuée via le moteur heuristique de secours. Vous pouvez affiner ou compléter les champs.");
		} catch (normalizeErr) {
			console.error("Erreur lors de la normalisation de l'offre extraite :", normalizeErr);
			setErrorMsg("Une erreur est survenue lors de l'application des données. Veuillez vérifier les champs.");
		} finally {
			setAnalyzing(false);
		}
	};
	const handleOpenDuplicate = () => {
		if (duplicateMatch) {
			if (onOpenExisting) onOpenExisting(duplicateMatch);
			else setForm(normalizeCandidature(duplicateMatch));
			setDuplicateMatch(null);
		}
	};
	const handleIgnoreDuplicate = () => {
		setDuplicateMatch(null);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		size: "xl",
		className: "max-w-4xl",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: mode === "menu" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ajouter une opportunité" }, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 315,
				columnNumber: 13
			}, this) : mode === "paste" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-primary" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 318,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Extraire l'offre avec l'IA" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 319,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 317,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-4 text-primary" }, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 323,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "truncate max-w-[400px]",
						children: form.poste || "Nouvelle opportunité"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 324,
						columnNumber: 15
					}, this),
					form.entreprise && /* @__PURE__ */ (void 0)("span", {
						className: "text-xs font-normal text-muted-foreground",
						children: ["chez ", form.entreprise]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 328,
						columnNumber: 17
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 322,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 313,
			columnNumber: 9
		}, this),
		description: mode === "menu" ? "Choisissez comment renseigner les informations de l'offre." : mode === "paste" ? "Collez le texte brut copié depuis un site d'emploi ou une annonce." : "Vérifiez et ajustez les données extraites avant d'enregistrer.",
		children: [
			mode === "menu" && /* @__PURE__ */ (void 0)("div", {
				className: "p-6 grid gap-3 max-w-lg mx-auto py-8",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "text-center mb-4",
						children: [/* @__PURE__ */ (void 0)("h3", {
							className: "font-semibold text-base mb-1",
							children: "Comment souhaitez-vous ajouter cette opportunité ?"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 348,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "L'Opportunity Intelligence de NACORA extrait automatiquement l'entreprise, les missions, les compétences, métriques et modalités."
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 351,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 347,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						variant: "outline",
						className: "h-20 justify-start gap-4 p-4 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all text-left",
						onClick: () => setMode("paste"),
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "bg-primary/10 text-primary p-3 rounded-xl",
							children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 364,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 363,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-semibold text-sm",
									children: "Coller le texte de l'offre (IA)"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 368,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(Badge, {
									className: "bg-primary/20 text-primary border-none text-[10px] py-0 px-1.5",
									children: "Recommandé"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 371,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 367,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: "Copiez-collez l'annonce entière depuis LinkedIn, JobTeaser, WTTJ, etc."
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 375,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 366,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 358,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "relative my-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (void 0)("span", { className: "w-full border-t border-border/50" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 384,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 383,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "relative flex justify-center text-[11px] uppercase",
							children: /* @__PURE__ */ (void 0)("span", {
								className: "bg-card px-3 text-muted-foreground font-medium",
								children: "Ou"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 387,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 386,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 382,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						className: "h-14 justify-start gap-3 border border-border/60 hover:bg-muted/30",
						onClick: () => setMode("form"),
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "bg-muted text-muted-foreground p-2 rounded-lg",
							children: /* @__PURE__ */ (void 0)(PenLine, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 399,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 398,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-sm",
								children: "Saisie manuelle"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 402,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Remplir vous-même les champs un par un"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 403,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 401,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 393,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 346,
				columnNumber: 9
			}, this),
			mode === "paste" && /* @__PURE__ */ (void 0)("div", {
				className: "p-6 flex flex-col gap-4",
				children: [
					errorMsg && /* @__PURE__ */ (void 0)("div", {
						className: "p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2.5",
						children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 416,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", { children: errorMsg }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 417,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 415,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (void 0)(Label, {
							htmlFor: "optionalUrl",
							className: "text-xs font-semibold",
							children: "Lien internet de l'offre (facultatif)"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 422,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Input, {
							id: "optionalUrl",
							placeholder: "https://...",
							value: optionalUrl,
							onChange: (e) => setOptionalUrl(e.target.value),
							disabled: analyzing,
							className: "text-xs h-9 bg-background"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 425,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 421,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "space-y-1.5 flex-1 flex flex-col",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "rawOfferText",
								className: "text-xs font-semibold",
								children: "Texte brut de l'offre d'emploi / stage *"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 437,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "text-[11px] text-muted-foreground",
								children: [pastedText.length, " caractères"]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 440,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 436,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							id: "rawOfferText",
							placeholder: "Collez ici l'intégralité de l'offre : intitulé, missions, profil recherché, à propos de l'entreprise, avantages, etc...",
							className: "h-64 resize-none font-mono text-xs leading-relaxed bg-background/50 border-border/60",
							value: pastedText,
							onChange: (e) => {
								setPastedText(e.target.value);
								if (errorMsg) setErrorMsg(null);
							},
							disabled: analyzing
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 444,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 435,
						columnNumber: 11
					}, this),
					analyzing && /* @__PURE__ */ (void 0)("div", {
						className: "py-4 px-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3 animate-pulse",
						children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-5 animate-spin text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 459,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "text-xs space-y-0.5",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-foreground",
								children: "Opportunity Intelligence en cours d'analyse..."
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 461,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground",
								children: "Extraction des missions, compétences obligatoires/atouts, métriques et processus."
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 464,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 460,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 458,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3 pt-2 border-t border-border/50",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setMode("menu"),
							disabled: analyzing,
							children: "Retour"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 473,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setMode("form"),
								disabled: analyzing,
								className: "text-xs text-muted-foreground",
								children: "Passer en saisie manuelle"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 482,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								disabled: !pastedText.trim() || analyzing,
								onClick: handleAnalyze,
								className: "gap-2 px-5",
								children: [analyzing ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 498,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(Sparkles, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 500,
									columnNumber: 19
								}, this), "Extraire avec l'IA"]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 491,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 481,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 472,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 413,
				columnNumber: 9
			}, this),
			mode === "form" && /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-col h-[75vh] max-h-[820px] min-h-[500px]",
				children: [
					duplicateMatch && /* @__PURE__ */ (void 0)("div", {
						className: "m-4 mb-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "size-4 text-amber-500 shrink-0" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 516,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-amber-700 dark:text-amber-400",
									children: "Cette opportunité semble déjà exister dans NACORA :"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 518,
									columnNumber: 19
								}, this),
								" ",
								/* @__PURE__ */ (void 0)("span", {
									className: "font-medium text-foreground",
									children: [
										duplicateMatch.entreprise,
										" — ",
										duplicateMatch.poste
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 521,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 517,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 515,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [/* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "outline",
								className: "h-7 text-xs border-amber-500/40 text-amber-700 dark:text-amber-300",
								onClick: handleOpenDuplicate,
								children: "Ouvrir l'existante"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 527,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "ghost",
								className: "h-7 text-xs text-muted-foreground hover:text-foreground",
								onClick: handleIgnoreDuplicate,
								children: "Conserver celle-ci"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 535,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 526,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 514,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "px-5 py-3 border-b border-border/50 bg-muted/15 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-bold text-sm sm:text-base text-foreground",
									children: form.poste || "Poste sans titre"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 551,
									columnNumber: 17
								}, this), form.entreprise && /* @__PURE__ */ (void 0)(Badge, {
									variant: "secondary",
									className: "font-semibold text-xs",
									children: form.entreprise
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 555,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 550,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
								children: [
									form.contractType && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 563,
												columnNumber: 21
											}, this),
											" ",
											form.contractType
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 562,
										columnNumber: 19
									}, this),
									form.duration && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (void 0)(Clock, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 568,
												columnNumber: 21
											}, this),
											" ",
											form.duration
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 567,
										columnNumber: 19
									}, this),
									form.lieu && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (void 0)(MapPin, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 573,
												columnNumber: 21
											}, this),
											" ",
											form.lieu
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 572,
										columnNumber: 19
									}, this),
									form.remotePolicy && /* @__PURE__ */ (void 0)(Badge, {
										variant: "outline",
										className: "text-[10px] py-0",
										children: form.remotePolicy
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 577,
										columnNumber: 19
									}, this),
									form.salary ? /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium",
										children: [
											/* @__PURE__ */ (void 0)(Euro, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 583,
												columnNumber: 21
											}, this),
											" ",
											form.salary
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 582,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] text-muted-foreground/60 italic",
										children: "Salaire non renseigné"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 586,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 560,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 549,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								className: "h-7 text-xs gap-1.5",
								onClick: () => setMode("paste"),
								children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 600,
									columnNumber: 17
								}, this), " Ré-extraire"]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 594,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 593,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 548,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(Tabs, {
						value: activeTab,
						onValueChange: (v) => setActiveTab(v),
						className: "flex-1 flex flex-col min-h-0",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "border-b px-5 bg-card",
							children: /* @__PURE__ */ (void 0)(TabsList, {
								className: "w-full justify-start h-10 p-0 bg-transparent gap-4",
								children: [
									/* @__PURE__ */ (void 0)(TabsTrigger, {
										value: "offre",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold",
										children: "Offre & Missions"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 615,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(TabsTrigger, {
										value: "profil",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold",
										children: "Profil & Recrutement"
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 621,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(TabsTrigger, {
										value: "entreprise",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold",
										children: [
											"Entreprise (",
											form.companyMetrics?.length || 0,
											" métriques)"
										]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 627,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(TabsTrigger, {
										value: "workflow",
										className: "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)(GitFork, { className: "size-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 637,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Workflow" }, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 638,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 633,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 614,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 613,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex-1 overflow-y-auto p-5 sm:p-6 space-y-6",
							children: [
								/* @__PURE__ */ (void 0)(TabsContent, {
									value: "offre",
									className: "mt-0 space-y-5 data-[state=inactive]:hidden",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5 sm:col-span-2",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "titleInput",
														className: "text-xs font-semibold",
														children: "Intitulé exact du poste *"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 651,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "titleInput",
														value: form.poste,
														onChange: (e) => set({
															poste: e.target.value,
															title: e.target.value
														}),
														placeholder: "ex: Stage – Marketing & Engagement Utilisateurs (Application Mobile)",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 657,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 650,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "companyInput",
														className: "text-xs font-semibold",
														children: "Entreprise *"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 669,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "companyInput",
														value: form.entreprise,
														onChange: (e) => set({
															entreprise: e.target.value,
															company: e.target.value,
															companyName: e.target.value
														}),
														placeholder: "ex: EXO",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 675,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 668,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "contractTypeInput",
														className: "text-xs font-semibold",
														children: "Type de contrat"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 691,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "contractTypeInput",
														value: form.contractType || "",
														onChange: (e) => set({ contractType: e.target.value }),
														placeholder: "ex: Stage, CDI, Alternance (Non renseigné si vide)",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 697,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 690,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "durationInput",
														className: "text-xs font-semibold",
														children: "Durée"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 707,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "durationInput",
														value: form.duration || "",
														onChange: (e) => set({ duration: e.target.value }),
														placeholder: "ex: 3 à 6 mois, 6 mois",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 713,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 706,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "locationInput",
														className: "text-xs font-semibold",
														children: "Lieu / Localisation"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 723,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "locationInput",
														value: form.lieu,
														onChange: (e) => set({
															lieu: e.target.value,
															location: e.target.value
														}),
														placeholder: "ex: Paris, France",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 729,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 722,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "startDateInput",
														className: "text-xs font-semibold",
														children: "Date de début"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 741,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "startDateInput",
														value: form.startDate || "",
														onChange: (e) => set({ startDate: e.target.value }),
														placeholder: "ex: Dès que possible, Septembre 2026",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 747,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 740,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "applicationDeadlineInput",
														className: "text-xs font-semibold",
														children: "Date limite de candidature"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 757,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "applicationDeadlineInput",
														type: "date",
														value: form.dateLimite || form.applicationDeadline || "",
														onChange: (e) => set({
															dateLimite: e.target.value,
															applicationDeadline: e.target.value
														}),
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 763,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 756,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "remotePolicyInput",
														className: "text-xs font-semibold",
														children: "Télétravail (Politique & Détails)"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 778,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "remotePolicyInput",
														value: form.remoteDetails ? `${form.remotePolicy || "Partiel"} — ${form.remoteDetails}` : form.remotePolicy || "",
														onChange: (e) => set({ remotePolicy: e.target.value }),
														placeholder: "ex: Partiel — 1 jour de télétravail par semaine",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 784,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 777,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "salaryInput",
														className: "text-xs font-semibold",
														children: "Rémunération / Salaire"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 798,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "salaryInput",
														value: form.salary || "",
														onChange: (e) => set({ salary: e.target.value }),
														placeholder: "ex: Selon profil, 1200€ / mois (Non renseigné)",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 804,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 797,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5 sm:col-span-2",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "sourceUrlInput",
														className: "text-xs font-semibold",
														children: "Lien source de l'offre"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 814,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)("div", {
														className: "flex gap-2",
														children: [/* @__PURE__ */ (void 0)(Input, {
															id: "sourceUrlInput",
															value: form.lien || form.sourceUrl || "",
															onChange: (e) => set({
																lien: e.target.value,
																sourceUrl: e.target.value
															}),
															placeholder: "https://...",
															className: "bg-background text-xs flex-1"
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 821,
															columnNumber: 23
														}, this), (form.lien || form.sourceUrl) && /* @__PURE__ */ (void 0)(Button, {
															variant: "outline",
															size: "sm",
															asChild: true,
															className: "h-9 px-3 shrink-0",
															children: /* @__PURE__ */ (void 0)("a", {
																href: form.lien || form.sourceUrl || "#",
																target: "_blank",
																rel: "noreferrer",
																children: /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3.5" }, void 0, false, {
																	fileName: _jsxFileName$5,
																	lineNumber: 845,
																	columnNumber: 29
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName$5,
																lineNumber: 840,
																columnNumber: 27
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 834,
															columnNumber: 25
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 820,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 813,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 649,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-3 pt-4 border-t border-border/40",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center justify-between",
													children: /* @__PURE__ */ (void 0)(Label, {
														htmlFor: "missionsTextarea",
														className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
														children: [
															"Missions clés & Responsabilités (",
															form.missionsList?.length || 0,
															")"
														]
													}, void 0, true, {
														fileName: _jsxFileName$5,
														lineNumber: 856,
														columnNumber: 21
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 855,
													columnNumber: 19
												}, this),
												form.missionsList && form.missionsList.length > 0 ? /* @__PURE__ */ (void 0)("div", {
													className: "space-y-2",
													children: form.missionsList.map((m, idx) => /* @__PURE__ */ (void 0)("div", {
														className: "flex items-start gap-2.5 p-2.5 rounded-xl border border-border/50 bg-card/60 text-xs leading-relaxed",
														children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5 text-primary mt-0.5 shrink-0" }, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 872,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("span", {
															className: "flex-1",
															children: m
														}, void 0, false, {
															fileName: _jsxFileName$5,
															lineNumber: 873,
															columnNumber: 27
														}, this)]
													}, idx, true, {
														fileName: _jsxFileName$5,
														lineNumber: 868,
														columnNumber: 25
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 866,
													columnNumber: 21
												}, this) : null,
												/* @__PURE__ */ (void 0)("div", {
													className: "space-y-1.5",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "text-[11px] text-muted-foreground",
														children: "Modifier la liste des missions (une par ligne) :"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 880,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Textarea, {
														id: "missionsTextarea",
														rows: 4,
														value: typeof form.missions === "string" ? form.missions : Array.isArray(form.missions) ? form.missions.join("\n") : "",
														onChange: (e) => {
															const val = e.target.value || "";
															const list = val.split("\n").map((line) => line.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean);
															set({
																missions: val,
																missionsList: list
															});
														},
														placeholder: "• Mission 1\n• Mission 2",
														className: "bg-background text-xs font-mono"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 883,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 879,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 854,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "pt-4 border-t border-border/40",
											children: /* @__PURE__ */ (void 0)(TagListEditor, {
												label: "Avantages & Environnement",
												items: form.benefits || [],
												onChange: (items) => set({ benefits: items }),
												placeholder: "Ajouter un avantage (ex: 1j télétravail, Teambuilding, etc.)...",
												badgeClassName: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
												emptyText: "Aucun avantage spécifié dans l'offre."
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 909,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 908,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 645,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(TabsContent, {
									value: "profil",
									className: "mt-0 space-y-6 data-[state=inactive]:hidden",
									children: [
										/* @__PURE__ */ (void 0)(TagListEditor, {
											label: "Compétences indispensables / requises",
											items: form.requiredSkills || [],
											onChange: (items) => set({ requiredSkills: items }),
											placeholder: "ex: Analyse de données, Gestion de projet...",
											badgeClassName: "bg-primary/10 text-primary border-primary/30",
											emptyText: "Aucune compétence obligatoire distincte identifiée."
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 925,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(TagListEditor, {
											label: "Compétences appréciées (Atouts)",
											items: form.preferredSkills || [],
											onChange: (items) => set({ preferredSkills: items }),
											placeholder: "ex: Connaissance de l'écosystème mobile...",
											badgeClassName: "bg-lilac/10 text-lilac border-lilac/30",
											emptyText: "Aucune compétence secondaire identifiée."
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 934,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(TagListEditor, {
											label: "Outils, Logiciels & Plateformes",
											items: form.tools || [],
											onChange: (items) => set({ tools: items }),
											placeholder: "ex: TikTok, Instagram, Notion, Excel, Figma...",
											badgeClassName: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
											emptyText: "Aucun outil spécifique identifié."
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 943,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(TagListEditor, {
											label: "Qualités humaines & Soft skills",
											items: form.qualities || [],
											onChange: (items) => set({ qualities: items }),
											placeholder: "ex: Créativité, Rigueur, Curiosité, Esprit d'équipe...",
											badgeClassName: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
											emptyText: "Aucune qualité spécifique listée."
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 952,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(LanguagesEditor, {
											requiredLanguages: form.requiredLanguages || [],
											preferredLanguages: form.preferredLanguages || [],
											onChangeRequired: (req) => set({ requiredLanguages: req }),
											onChangePreferred: (pref) => set({ preferredLanguages: pref })
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 961,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid gap-4 sm:grid-cols-2 pt-4 border-t border-border/40",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "eduReqInput",
													className: "text-xs font-semibold",
													children: "Formation & Diplômes acceptés"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 972,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)(Input, {
													id: "eduReqInput",
													value: form.educationRequirements?.join(" ; ") || form.educationLevel || "",
													onChange: (e) => set({
														educationLevel: e.target.value,
														educationRequirements: e.target.value.split(";").map((s) => s.trim()).filter(Boolean)
													}),
													placeholder: "ex: Master, MSc ou PGE ; Bac+3, Bachelor",
													className: "bg-background text-xs"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 978,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 971,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "expReqInput",
													className: "text-xs font-semibold",
													children: "Expérience requise"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 1e3,
													columnNumber: 21
												}, this), /* @__PURE__ */ (void 0)(Input, {
													id: "expReqInput",
													value: form.experienceRequirements || "",
													onChange: (e) => set({ experienceRequirements: e.target.value }),
													placeholder: "ex: Débutant accepté, 1 an minimum...",
													className: "bg-background text-xs"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 1006,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 999,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 970,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "pt-4 border-t border-border/40 space-y-4",
											children: [/* @__PURE__ */ (void 0)(ProcessStepsEditor, {
												steps: form.recruitmentProcess || [],
												onChange: (steps) => set({ recruitmentProcess: steps })
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 1020,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)(TagListEditor, {
												label: "Documents demandés & Éléments différenciants",
												items: form.applicationRequirements || [],
												onChange: (items) => set({ applicationRequirements: items }),
												placeholder: "ex: Message court, CV, TikTok/jeu facultatif...",
												badgeClassName: "bg-card text-foreground border-border",
												emptyText: "Non renseigné."
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 1025,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 1019,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 921,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(TabsContent, {
									value: "entreprise",
									className: "mt-0 space-y-6 data-[state=inactive]:hidden",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)(Label, {
												htmlFor: "companyDescInput",
												className: "text-xs font-semibold",
												children: "Description de l'entreprise"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 1044,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)(Textarea, {
												id: "companyDescInput",
												rows: 3,
												value: form.companyDescription || "",
												onChange: (e) => set({ companyDescription: e.target.value }),
												placeholder: "Présentation des activités, de la mission et de la vision...",
												className: "bg-background text-xs leading-relaxed"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 1050,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 1043,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "compParentInput",
														className: "text-xs font-semibold",
														children: "Groupe / Maison mère"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1064,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "compParentInput",
														value: form.parentCompany || form.groupName || "",
														onChange: (e) => set({
															parentCompany: e.target.value,
															groupName: e.target.value
														}),
														placeholder: "ex: Groupe BPCE (si filiale)",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1070,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 1063,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "compSectorInput",
														className: "text-xs font-semibold",
														children: "Secteur d'activité"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1085,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "compSectorInput",
														value: form.secteur || form.companySector || "",
														onChange: (e) => set({
															secteur: e.target.value,
															companySector: e.target.value
														}),
														placeholder: "ex: Loisirs / Culture / Sports, Tech...",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1091,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 1084,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "compSizeInput",
														className: "text-xs font-semibold",
														children: "Taille de l'entreprise"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1106,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "compSizeInput",
														value: form.companySize || "",
														onChange: (e) => set({ companySize: e.target.value }),
														placeholder: "ex: 20 employés, Start-up...",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1112,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 1105,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "compLocInput",
														className: "text-xs font-semibold",
														children: "Siège / Bureaux"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1122,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "compLocInput",
														value: form.companyLocation || "",
														onChange: (e) => set({ companyLocation: e.target.value }),
														placeholder: "ex: Paris 2e, France",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1128,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 1121,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "grid gap-1.5",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "compWebInput",
														className: "text-xs font-semibold",
														children: "Site web officiel"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1138,
														columnNumber: 21
													}, this), /* @__PURE__ */ (void 0)(Input, {
														id: "compWebInput",
														value: form.companyWebsite || "",
														onChange: (e) => set({ companyWebsite: e.target.value }),
														placeholder: "https://... (Non renseigné si absent)",
														className: "bg-background text-xs"
													}, void 0, false, {
														fileName: _jsxFileName$5,
														lineNumber: 1144,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$5,
													lineNumber: 1137,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 1062,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(MetricsEditor, {
											metrics: form.companyMetrics || [],
											onChange: (metrics) => set({ companyMetrics: metrics })
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 1154,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(TagListEditor, {
											label: "Contexte de croissance & Faits marquants",
											items: form.companyContext || [],
											onChange: (items) => set({ companyContext: items }),
											placeholder: "ex: Levée de fonds de 1 M€, 1 000 000 € de cadeaux distribués...",
											badgeClassName: "bg-primary/10 text-primary border-primary/20",
											emptyText: "Aucun fait de contexte spécifique détecté."
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 1159,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)(TagListEditor, {
											label: "Partenaires & Clients cités",
											items: form.companyPartners || [],
											onChange: (items) => set({ companyPartners: items }),
											placeholder: "ex: Nike, Garmin, Feed, Gymshark...",
											badgeClassName: "bg-card text-foreground border-border",
											emptyText: "Aucun partenaire cité dans l'offre."
										}, void 0, false, {
											fileName: _jsxFileName$5,
											lineNumber: 1168,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 1039,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(TabsContent, {
									value: "workflow",
									className: "mt-0 space-y-6 data-[state=inactive]:hidden",
									children: [/* @__PURE__ */ (void 0)(WorkflowTab, {
										candidature: form,
										onChange: (patch) => set(patch)
									}, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 1183,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-4",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (void 0)("h4", {
												className: "text-xs font-bold uppercase tracking-wider text-foreground",
												children: "Préparation de candidature (Arguments)"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 1191,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] text-muted-foreground",
												children: "Pour préparer vos entretiens et lettres"
											}, void 0, false, {
												fileName: _jsxFileName$5,
												lineNumber: 1194,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 1190,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "prepEnt",
													className: "text-xs font-semibold",
													children: "Pourquoi cette entreprise ?"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 1201,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(Textarea, {
													id: "prepEnt",
													rows: 3,
													value: form.preparation?.pourquoiEntreprise || "",
													onChange: (e) => setPrep({ pourquoiEntreprise: e.target.value }),
													placeholder: "Alignement avec vos valeurs, secteur, produits que vous utilisez...",
													className: "text-xs bg-background resize-y"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 1207,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 1200,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "grid gap-1.5",
												children: [/* @__PURE__ */ (void 0)(Label, {
													htmlFor: "prepPoste",
													className: "text-xs font-semibold",
													children: "Pourquoi ce poste ?"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 1220,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(Textarea, {
													id: "prepPoste",
													rows: 3,
													value: form.preparation?.pourquoiPoste || "",
													onChange: (e) => setPrep({ pourquoiPoste: e.target.value }),
													placeholder: "Missions clés, compétences que vous souhaitez développer, impact attendu...",
													className: "text-xs bg-background resize-y"
												}, void 0, false, {
													fileName: _jsxFileName$5,
													lineNumber: 1226,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$5,
												lineNumber: 1219,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$5,
											lineNumber: 1199,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 1189,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 1179,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 643,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 606,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-3 p-4 border-t border-border/50 bg-card",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => onOpenChange(false),
								className: "text-xs",
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 1246,
								columnNumber: 15
							}, this), onDelete && form?.id && existingItems?.some((i) => i.id === form.id) && /* @__PURE__ */ (void 0)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setDeleteDialogOpen(true),
								className: "text-xs text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5",
								children: [/* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1263,
									columnNumber: 21
								}, this), "Supprimer"]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 1257,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 1245,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								disabled: isSaving,
								onClick: async () => {
									const safeToSave = validerIntegriteCandidature(form, form);
									console.info("[OPPORTUNITY SAVE] Objet envoyé lors de l'enregistrement:", {
										poste: safeToSave.poste,
										entreprise: safeToSave.entreprise,
										contractType: safeToSave.contractType,
										duration: safeToSave.duration,
										startDate: safeToSave.startDate,
										metricsCount: safeToSave.companyMetrics?.length || 0,
										missionsCount: safeToSave.missionsList?.length || 0,
										skillsCount: safeToSave.requiredSkills?.length || 0,
										companyMetrics: safeToSave.companyMetrics
									});
									setIsSaving(true);
									try {
										await onSave(safeToSave);
										onOpenChange(false);
									} catch (saveErr) {
										console.error("[OPPORTUNITY SAVE FAILED]", saveErr);
									} finally {
										setIsSaving(false);
									}
								},
								className: "gap-2 px-6 text-xs font-semibold",
								children: [isSaving ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1302,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 1304,
									columnNumber: 19
								}, this), isSaving ? "Enregistrement en cours…" : "Enregistrer l'opportunité"]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 1270,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 1269,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 1244,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 511,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
				open: deleteDialogOpen,
				onOpenChange: setDeleteDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, {
					className: "bg-card border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, {
						className: "text-foreground",
						children: "Supprimer cette opportunité ?"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 1318,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, {
						className: "text-muted-foreground text-sm",
						children: [
							"Cette action est irréversible. L'opportunité «",
							" ",
							form?.poste || "Sans titre",
							" » chez «",
							" ",
							form?.entreprise || "Entreprise inconnue",
							" » ainsi que tous ses événements et notes de suivi seront définitivement supprimés."
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 1321,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 1317,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
						className: "text-xs",
						children: "Annuler"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 1329,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-semibold",
						onClick: () => {
							if (form?.id && onDelete) {
								onDelete(form.id);
								onOpenChange(false);
							}
							setDeleteDialogOpen(false);
						},
						children: "Supprimer"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 1330,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 1328,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 1316,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 1315,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 307,
		columnNumber: 5
	}, this);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CeQVKm6O.js
var styles_default = "/assets/styles-CcoDo_E5.css";
var _jsxFileName$4 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
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
var _jsxFileName$3 = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 30,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 29,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 21,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
		const msg = error?.message || "";
		if (msg.includes("Importing a module script failed") || msg.includes("Failed to fetch dynamically imported module") || msg.includes("error loading dynamically imported module")) {
			const key = "chunk_reload_attempted";
			const lastAttempt = sessionStorage.getItem(key);
			const now = Date.now();
			if (!lastAttempt || now - Number(lastAttempt) > 1e4) {
				sessionStorage.setItem(key, String(now));
				window.location.reload();
			}
		}
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md w-full text-center space-y-4 p-6 rounded-2xl border border-purple-500/20 bg-card/80 backdrop-blur-xl shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400",
					children: "⚠️"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 68,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-lg font-bold tracking-tight text-foreground",
					children: "Mise à jour de l'application"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 71,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Une nouvelle version de l'application est disponible ou un module n'a pas pu être chargé."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 74,
					columnNumber: 9
				}, this),
				error?.message && /* @__PURE__ */ (void 0)("div", {
					className: "p-3 text-left rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-300 break-words max-h-32 overflow-y-auto",
					children: error.message
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 80,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-2 flex flex-col sm:flex-row justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							window.location.reload();
						},
						className: "inline-flex items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-purple-500",
						children: "Recharger la page"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 86,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent",
						children: "Retour au tableau de bord"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 94,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 85,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 67,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 66,
		columnNumber: 5
	}, this);
}
var Route$24 = createRootRouteWithContext()({
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
		],
		scripts: [{ children: `try{if(typeof window!=="undefined"){window.process=window.process||{env:{NODE_ENV:"development",TSS_ROUTER_BASEPATH:""}};window.global=window.global||window;}}catch(e){}` }]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "fr",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: { __html: `try{if(typeof window!=="undefined"){window.process=window.process||{env:{NODE_ENV:"development",TSS_ROUTER_BASEPATH:""}};window.global=window.global||window;}}catch(e){}` } }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 167,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 172,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 166,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 176,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 174,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 165,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$24.useRouteContext();
	(0, import_react.useEffect)(() => {
		const handleChunkError = (message) => {
			if (message.includes("Importing a module script failed") || message.includes("Failed to fetch dynamically imported module") || message.includes("error loading dynamically imported module") || message.includes("Unable to preload CSS")) {
				console.warn("Dynamic import issue detected:", message);
				const key = "chunk_reload_count";
				if (Number(sessionStorage.getItem(key) || "0") < 1) {
					sessionStorage.setItem(key, "1");
					console.warn("Stale dynamic chunk detected. Reloading page once for fresh assets...");
					window.location.reload();
				} else toast.error("Mise à jour disponible", {
					description: "Un composant n'a pas pu être chargé. Cliquez pour rafraîchir.",
					action: {
						label: "Rafraîchir",
						onClick: () => {
							sessionStorage.removeItem(key);
							window.location.reload();
						}
					},
					duration: 8e3
				});
			}
		};
		const handlePreloadError = (e) => {
			console.warn("Preload error detected, reloading page...", e);
			handleChunkError("Failed to fetch dynamically imported module");
		};
		const handleWindowError = (event) => {
			if (event.message) handleChunkError(event.message);
		};
		const handleUnhandledRejection = (event) => {
			const reason = event.reason;
			const msg = reason instanceof Error ? reason.message : typeof reason === "string" ? reason : "";
			if (msg) handleChunkError(msg);
		};
		window.addEventListener("vite:preloadError", handlePreloadError);
		window.addEventListener("error", handleWindowError);
		window.addEventListener("unhandledrejection", handleUnhandledRejection);
		return () => {
			window.removeEventListener("vite:preloadError", handlePreloadError);
			window.removeEventListener("error", handleWindowError);
			window.removeEventListener("unhandledrejection", handleUnhandledRejection);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 261,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 262,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 259,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$11 = () => import("./routes-CT0B1DVF.mjs");
var Route$23 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Accueil — NACORA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin-BAJ9y4nV.mjs");
var Route$22 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Administration & Gestion des Comptes — NACORA" }, {
		name: "description",
		content: "Console d'administration sécurisée des utilisateurs, sessions et données NACORA."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./auth-DCtSQxtL.mjs");
var Route$21 = createFileRoute("/auth")({
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
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./calendrier-Cous1qA3.mjs");
var Route$20 = createFileRoute("/calendrier")({
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./candidatures-BkI2XC82.mjs");
var Route$19 = createFileRoute("/candidatures")({
	beforeLoad: () => {
		throw redirect({ to: "/opportunites" });
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var _jsxFileName$2 = "/app/applet/src/components/ContactSheet.tsx";
function ContactSheet({ open, onOpenChange, contact, candidatures, entreprises = [], profil, onSave, onDelete, onOpenCandidature }) {
	const [draft, setDraft] = (0, import_react.useState)(contact);
	const [typeRelance, setTypeRelance] = (0, import_react.useState)("relance_candidature");
	const [consigne, setConsigne] = (0, import_react.useState)("");
	const [chargement, setChargement] = (0, import_react.useState)(false);
	const [erreur, setErreur] = (0, import_react.useState)(null);
	const [resultat, setResultat] = (0, import_react.useState)(null);
	const [confirmDeleteOpen, setConfirmDeleteOpen] = (0, import_react.useState)(false);
	const [ref, setRef] = (0, import_react.useState)(contact.id);
	if (ref !== contact.id) {
		setRef(contact.id);
		setDraft(contact);
		setResultat(null);
		setErreur(null);
	}
	const set = (patch) => setDraft((c) => ({
		...c,
		...patch
	}));
	const linkedCandidatures = (0, import_react.useMemo)(() => {
		const ids = new Set(draft.candidatureIds || []);
		if (draft.candidatureId) ids.add(draft.candidatureId);
		return candidatures.filter((c) => ids.has(c.id) || c.contactId && c.contactId === draft.id);
	}, [
		candidatures,
		draft.candidatureIds,
		draft.candidatureId,
		draft.id
	]);
	const generer = async () => {
		setChargement(true);
		setErreur(null);
		try {
			await new Promise((r) => setTimeout(r, 600));
			const targetOpp = linkedCandidatures[0];
			const jobTitle = targetOpp?.poste || draft.poste || "votre opportunité";
			const compName = targetOpp?.companyName || targetOpp?.company || draft.entreprise || "votre entreprise";
			const subject = `Suivi de candidature — ${jobTitle} chez ${compName}`;
			const body = `Bonjour ${draft.nom || ""},\n\nJ'espère que vous allez bien.\n\nJe me permets de revenir vers vous concernant ma candidature pour le poste de ${jobTitle} au sein de ${compName}.\n\nToujours particulièrement enthousiaste à l'idée de rejoindre vos équipes et de contribuer à vos projets, je reste à votre entière disposition pour tout échange complémentaire.\n\nEn vous remerciant pour votre temps et votre attention,\n\nBien cordialement,\n${profil?.prenom || ""} ${profil?.nom || ""}`;
			setResultat({
				objet: subject,
				message: body,
				conseils: [
					"Personnalisez avec un point précis abordé lors de votre dernier échange.",
					"Restez concis et professionnel.",
					"Envoyez de préférence le matin entre 9h et 11h."
				]
			});
		} catch {
			setErreur("Erreur lors de la génération de la relance.");
		} finally {
			setChargement(false);
		}
	};
	const copier = async (texte) => {
		try {
			await navigator.clipboard.writeText(texte);
			toast.success("Copié dans le presse-papier.");
		} catch {
			toast.error("Copie impossible sur cet appareil.");
		}
	};
	const handleSelectCompany = (val) => {
		if (val === "custom") {
			set({ companyId: null });
			return;
		}
		const found = entreprises.find((e) => e.id === val);
		if (found) set({
			companyId: found.id,
			entreprise: found.nom
		});
	};
	const handleLinkOpportunity = (candidatureId) => {
		if (candidatureId === "aucune") {
			set({
				candidatureId: "",
				candidatureIds: []
			});
			return;
		}
		const currentIds = new Set(draft.candidatureIds || []);
		currentIds.add(candidatureId);
		const opp = candidatures.find((c) => c.id === candidatureId);
		set({
			candidatureId,
			candidatureIds: Array.from(currentIds),
			entreprise: draft.entreprise || opp?.companyName || opp?.company || opp?.entreprise || "",
			companyId: draft.companyId || opp?.companyId || null
		});
	};
	const handleUnlinkOpportunity = (candId) => {
		const next = (draft.candidatureIds || []).filter((id) => id !== candId);
		set({
			candidatureIds: next,
			candidatureId: draft.candidatureId === candId ? next[0] || "" : draft.candidatureId
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CenterModal, {
		open,
		onOpenChange,
		title: getContactFullName(draft) || "Nouveau contact",
		description: [draft.poste, draft.entreprise].filter(Boolean).join(" — ") || "Ajoutez les informations du contact.",
		footer: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between gap-2",
			children: [onDelete ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "ghost",
				className: "text-destructive hover:bg-destructive/10 text-xs",
				onClick: () => setConfirmDeleteOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4 mr-1.5" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 221,
					columnNumber: 17
				}, this), " Supprimer le contact"]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 216,
				columnNumber: 15
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 224,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => onOpenChange(false),
					className: "text-xs",
					children: "Annuler"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 227,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					size: "sm",
					onClick: () => {
						onSave(draft);
						onOpenChange(false);
					},
					className: "text-xs font-semibold",
					children: "Enregistrer"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 235,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 226,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 214,
			columnNumber: 11
		}, this),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
			defaultValue: "infos",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "infos",
							className: "flex-1 text-xs",
							children: "Fiche"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 251,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "opportunites",
							className: "flex-1 text-xs",
							children: [
								"Opportunités (",
								linkedCandidatures.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 254,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "historique",
							className: "flex-1 text-xs",
							children: [
								"Historique (",
								draft.historique.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 257,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
							value: "relance",
							className: "flex-1 text-xs",
							children: "Relance IA"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 260,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 250,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "infos",
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "sm:col-span-2 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-muted-foreground",
								children: "Source(s) :"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 269,
								columnNumber: 15
							}, this), (draft.sources && draft.sources.length > 0 ? draft.sources : [draft.source || "manual"]).map((src) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-foreground",
								children: [
									src === "phone" && /* @__PURE__ */ (void 0)(Smartphone, { className: "size-3 text-emerald-500" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 279,
										columnNumber: 21
									}, this),
									src === "linkedin" && /* @__PURE__ */ (void 0)(Linkedin, { className: "size-3 text-[#0A66C2]" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 282,
										columnNumber: 21
									}, this),
									src === "opportunity" && /* @__PURE__ */ (void 0)(Briefcase, { className: "size-3 text-primary" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 285,
										columnNumber: 21
									}, this),
									SOURCE_LABELS[src] || src
								]
							}, src, true, {
								fileName: _jsxFileName$2,
								lineNumber: 274,
								columnNumber: 17
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 268,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Nom complet"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 293,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.nom,
								onChange: (e) => set({
									nom: e.target.value,
									fullName: e.target.value
								}),
								placeholder: "Ex : Sophie Durand",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 294,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 292,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Type de contact"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 305,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: draft.type,
								onValueChange: (v) => set({ type: v }),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 311,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 310,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									className: "text-xs",
									children: t
								}, t, false, {
									fileName: _jsxFileName$2,
									lineNumber: 315,
									columnNumber: 21
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 313,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 306,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 304,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Entreprise"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 324,
								columnNumber: 15
							}, this), entreprises.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: draft.companyId || (draft.entreprise ? "custom" : "empty"),
									onValueChange: handleSelectCompany,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "text-xs",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Sélectionner une entreprise..." }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 334,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 333,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "empty",
											className: "text-xs",
											children: "Aucune entreprise"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 337,
											columnNumber: 23
										}, this),
										entreprises.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: e.id,
											className: "text-xs",
											children: e.nom
										}, e.id, false, {
											fileName: _jsxFileName$2,
											lineNumber: 341,
											columnNumber: 25
										}, this)),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "custom",
											className: "text-xs text-muted-foreground",
											children: "Saisir un autre nom..."
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 345,
											columnNumber: 23
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 336,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 327,
									columnNumber: 19
								}, this), (!draft.companyId || draft.companyId === "custom") && /* @__PURE__ */ (void 0)(Input, {
									value: draft.entreprise,
									onChange: (e) => set({ entreprise: e.target.value }),
									placeholder: "Nom personnalisé de l'entreprise",
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 354,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 326,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.entreprise,
								onChange: (e) => set({ entreprise: e.target.value }),
								placeholder: "Ex : PwC France",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 363,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 323,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Poste / Rôle"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 373,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.poste,
								onChange: (e) => set({
									poste: e.target.value,
									jobTitle: e.target.value
								}),
								placeholder: "Ex : Responsable Recrutement Tech",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 374,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 372,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Email"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 385,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "email",
								value: draft.email,
								onChange: (e) => set({ email: e.target.value }),
								placeholder: "sophie.durand@entreprise.com",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 386,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 384,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Téléphone"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 396,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.telephone,
								onChange: (e) => set({
									telephone: e.target.value,
									phone: e.target.value
								}),
								placeholder: "06 12 34 56 78",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 397,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 395,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Profil LinkedIn"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 408,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.linkedin,
								onChange: (e) => set({
									linkedin: e.target.value,
									linkedinUrl: e.target.value
								}),
								placeholder: "https://www.linkedin.com/in/sophie-durand",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 409,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 407,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Dernière interaction"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 420,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "date",
								value: draft.derniereInteraction,
								onChange: (e) => set({ derniereInteraction: e.target.value }),
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 421,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 419,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Date de la prochaine action"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 430,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "date",
								value: draft.dateProchaineAction,
								onChange: (e) => set({ dateProchaineAction: e.target.value }),
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 431,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 429,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Prochaine action"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 440,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: draft.prochaineAction,
								onChange: (e) => set({ prochaineAction: e.target.value }),
								placeholder: "Relancer par email, envoyer un remerciement…",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 441,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 439,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Notes personnelles"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 450,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 3,
								value: draft.notes,
								onChange: (e) => set({ notes: e.target.value }),
								placeholder: "Informations utiles, affinités, recommandations...",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 451,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 449,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 266,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "opportunites",
					className: "mt-4 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: [
								"Opportunités rattachées (",
								linkedCandidatures.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 465,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Ce contact peut être associé à une ou plusieurs offres d'emploi."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 468,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 464,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-48 sm:w-60",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: "none",
								onValueChange: handleLinkOpportunity,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs h-8",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "+ Lier une opportunité" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 477,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 476,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "none",
									disabled: true,
									className: "text-xs",
									children: "Choisir une offre..."
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 480,
									columnNumber: 21
								}, this), candidatures.filter((c) => !linkedCandidatures.some((lc) => lc.id === c.id)).map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: c.id,
									className: "text-xs",
									children: [
										c.companyName || c.company || c.entreprise || "Sans nom",
										" ",
										"— ",
										c.poste || "poste"
									]
								}, c.id, true, {
									fileName: _jsxFileName$2,
									lineNumber: 488,
									columnNumber: 25
								}, this))] }, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 479,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 475,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 474,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 463,
						columnNumber: 13
					}, this), linkedCandidatures.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground",
						children: "Aucune opportunité actuellement rattachée à ce contact."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 502,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: linkedCandidatures.map((opp) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-foreground truncate",
									children: opp.poste || "Poste non précisé"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 513,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-muted-foreground text-[11px] truncate",
									children: [opp.companyName || opp.company || opp.entreprise || "Entreprise", opp.lieu ? ` · ${opp.lieu}` : ""]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 516,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 512,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary",
										children: opp.currentStage || opp.statut || "Offre"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 526,
										columnNumber: 23
									}, this),
									onOpenCandidature && /* @__PURE__ */ (void 0)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => onOpenCandidature(opp.id),
										className: "h-7 px-2 text-[11px] gap-1",
										children: ["Voir ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 536,
											columnNumber: 32
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 530,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "ghost",
										size: "sm",
										onClick: () => handleUnlinkOpportunity(opp.id),
										className: "h-7 px-2 text-destructive hover:bg-destructive/10 text-[11px]",
										children: "Détacher"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 539,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 525,
								columnNumber: 21
							}, this)]
						}, opp.id, true, {
							fileName: _jsxFileName$2,
							lineNumber: 508,
							columnNumber: 19
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 506,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 462,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "historique",
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => set({ historique: [nouvelEchange(), ...draft.historique] }),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 564,
								columnNumber: 15
							}, this), " Ajouter un échange"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 556,
							columnNumber: 13
						}, this),
						draft.historique.length === 0 && /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground py-4 text-center",
							children: "Aucun échange enregistré pour l'instant."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 568,
							columnNumber: 15
						}, this),
						draft.historique.map((e, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-2.5 rounded-xl border border-border/60 bg-card/40 p-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-2 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											type: "date",
											value: e.date,
											onChange: (ev) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													date: ev.target.value
												};
												set({ historique: h });
											},
											className: "text-xs"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 579,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: e.canal,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													canal: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 598,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 597,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: CANAUX.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: c,
												className: "text-xs",
												children: c
											}, c, false, {
												fileName: _jsxFileName$2,
												lineNumber: 602,
												columnNumber: 25
											}, this)) }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 600,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 589,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
											value: e.sens,
											onValueChange: (v) => {
												const h = [...draft.historique];
												h[i] = {
													...e,
													sens: v
												};
												set({ historique: h });
											},
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
													fileName: _jsxFileName$2,
													lineNumber: 617,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 616,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "Envoyé",
												className: "text-xs",
												children: "Envoyé"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 620,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "Reçu",
												className: "text-xs",
												children: "Reçu"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 623,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName$2,
												lineNumber: 619,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 608,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 578,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									rows: 2,
									placeholder: "Résumé de l'échange",
									value: e.resume,
									onChange: (ev) => {
										const h = [...draft.historique];
										h[i] = {
											...e,
											resume: ev.target.value
										};
										set({ historique: h });
									},
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 629,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "sm",
									className: "justify-self-end text-destructive hover:bg-destructive/10 text-xs h-7",
									onClick: () => set({ historique: draft.historique.filter((x) => x.id !== e.id) }),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5 mr-1" }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 650,
										columnNumber: 19
									}, this), " Supprimer cet échange"]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 640,
									columnNumber: 17
								}, this)
							]
						}, e.id, true, {
							fileName: _jsxFileName$2,
							lineNumber: 574,
							columnNumber: 15
						}, this))
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 555,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
					value: "relance",
					className: "mt-4 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Type de message"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 659,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: typeRelance,
								onValueChange: (v) => setTypeRelance(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "text-xs",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 665,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 664,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES_RELANCE.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									className: "text-xs",
									children: LIBELLES_RELANCE[t]
								}, t, false, {
									fileName: _jsxFileName$2,
									lineNumber: 669,
									columnNumber: 21
								}, this)) }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 667,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 660,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 658,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Consigne complémentaire (facultatif)"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 677,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								rows: 2,
								value: consigne,
								onChange: (e) => setConsigne(e.target.value),
								placeholder: "Ex : mentionner ma disponibilité à partir de janvier.",
								className: "text-xs"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 680,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 676,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "L'IA s'appuie sur votre profil, l'entreprise et l'historique enregistré pour rédiger un message sur-mesure."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 688,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: () => void generer(),
							disabled: chargement || !draft.nom,
							className: "text-xs gap-1.5",
							children: chargement ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-3.5 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 699,
								columnNumber: 19
							}, this), " Rédaction…"] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 698,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 703,
								columnNumber: 19
							}, this), " Relancer avec l'IA"] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 702,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 692,
							columnNumber: 13
						}, this),
						erreur && /* @__PURE__ */ (void 0)("p", {
							className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive",
							children: erreur
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 709,
							columnNumber: 15
						}, this),
						resultat && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 rounded-xl border border-border/60 bg-card/40 p-3 text-xs",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
									children: "Objet"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 717,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "font-semibold text-foreground text-xs",
									children: resultat.objet
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 720,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 716,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)(Textarea, {
									rows: 8,
									value: resultat.message,
									onChange: (e) => setResultat({
										...resultat,
										message: e.target.value
									}),
									className: "text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 724,
									columnNumber: 17
								}, this),
								resultat.conseils.length > 0 && /* @__PURE__ */ (void 0)("ul", {
									className: "list-disc space-y-0.5 pl-4 text-[11px] text-muted-foreground",
									children: resultat.conseils.map((c) => /* @__PURE__ */ (void 0)("li", { children: c }, c, false, {
										fileName: _jsxFileName$2,
										lineNumber: 735,
										columnNumber: 23
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 733,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => void copier(`${resultat.objet}\n\n${resultat.message}`),
											className: "text-xs h-8 gap-1.5",
											children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 748,
												columnNumber: 21
											}, this), " Copier"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 740,
											columnNumber: 19
										}, this),
										draft.email && /* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											asChild: true,
											className: "text-xs h-8",
											children: /* @__PURE__ */ (void 0)("a", {
												href: `mailto:${draft.email}?subject=${encodeURIComponent(resultat.objet)}&body=${encodeURIComponent(resultat.message)}`,
												children: "Ouvrir dans l'email"
											}, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 757,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 751,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => set({ historique: [{
												...nouvelEchange(),
												resume: `${LIBELLES_RELANCE[typeRelance]} — ${resultat.objet}`
											}, ...draft.historique] }),
											className: "text-xs h-8",
											children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName$2,
												lineNumber: 782,
												columnNumber: 21
											}, this), " Ajouter à l'historique"]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 766,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 739,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 715,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 657,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 249,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 205,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, {
		open: confirmDeleteOpen,
		onOpenChange: setConfirmDeleteOpen,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, {
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2.5 text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 796,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, {
					className: "text-base font-semibold",
					children: "Supprimer ce contact ?"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 797,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 795,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, {
				className: "text-xs space-y-2 mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
					"Êtes-vous sûr de vouloir supprimer",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: getContactFullName(draft) }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 804,
						columnNumber: 17
					}, this),
					" ?"
				] }, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 802,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-lg border border-border/80 bg-muted/50 p-2.5 flex items-start gap-2 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "size-4 text-primary shrink-0 mt-0.5" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 807,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Protection des données :" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 809,
							columnNumber: 19
						}, this),
						" Cette suppression ne supprimera ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ni l'entreprise" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 810,
							columnNumber: 30
						}, this),
						" (",
						draft.entreprise || "non spécifiée",
						")",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ni les opportunités associées" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 812,
							columnNumber: 19
						}, this),
						" (",
						linkedCandidatures.length,
						" offre(s))."
					] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 808,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 806,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 801,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 794,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, {
				className: "text-xs",
				children: "Annuler"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 819,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
				onClick: () => {
					if (onDelete) onDelete(draft);
					setConfirmDeleteOpen(false);
					onOpenChange(false);
				},
				className: "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-semibold",
				children: "Confirmer la suppression"
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 820,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 818,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 793,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 792,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 204,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/ContactImportModal.tsx";
function ContactImportModal({ open, onOpenChange, existingContacts, onImportComplete }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("vcf");
	const [step, setStep] = (0, import_react.useState)("upload");
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [parsedItems, setParsedItems] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const resetState = () => {
		setStep("upload");
		setFileName("");
		setParsedItems([]);
		setSearchQuery("");
		setIsProcessing(false);
		setDragOver(false);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};
	const handleClose = (isOpen) => {
		if (!isOpen) resetState();
		onOpenChange(isOpen);
	};
	const processFileContent = (content, name, isVcf) => {
		try {
			setIsProcessing(true);
			const rawList = isVcf ? parseVCardString(content) : parseLinkedInCsv(content);
			if (rawList.length === 0) {
				toast.error("Aucun contact valide n'a pu être extrait de ce fichier. Vérifiez le format.");
				setIsProcessing(false);
				return;
			}
			const items = rawList.map((c, index) => {
				const match = findMatchingContact(c, existingContacts);
				return {
					id: `item_${index}_${crypto.randomUUID()}`,
					contact: c,
					match,
					selected: true,
					resolution: match ? "merge" : "both"
				};
			});
			setFileName(name);
			setParsedItems(items);
			setStep("preview");
		} catch (err) {
			console.error(err);
			toast.error("Erreur lors de l'analyse du fichier.");
		} finally {
			setIsProcessing(false);
		}
	};
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const isVcf = activeTab === "vcf" || file.name.toLowerCase().endsWith(".vcf") || file.name.toLowerCase().endsWith(".vcard");
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			processFileContent(text, file.name, isVcf);
		};
		reader.onerror = () => {
			toast.error("Impossible de lire ce fichier.");
		};
		reader.readAsText(file);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (!file) return;
		const isVcf = activeTab === "vcf" || file.name.toLowerCase().endsWith(".vcf") || file.name.toLowerCase().endsWith(".vcard");
		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result;
			processFileContent(text, file.name, isVcf);
		};
		reader.readAsText(file);
	};
	const filteredItems = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return parsedItems;
		const q = searchQuery.toLowerCase();
		return parsedItems.filter((it) => {
			const name = getContactFullName(it.contact).toLowerCase();
			const comp = getContactCompany(it.contact).toLowerCase();
			const email = (it.contact.email || "").toLowerCase();
			const phone = (it.contact.telephone || "").toLowerCase();
			return name.includes(q) || comp.includes(q) || email.includes(q) || phone.includes(q);
		});
	}, [parsedItems, searchQuery]);
	const stats = (0, import_react.useMemo)(() => {
		const total = parsedItems.length;
		const selected = parsedItems.filter((i) => i.selected && i.resolution !== "skip").length;
		const duplicates = parsedItems.filter((i) => Boolean(i.match)).length;
		return {
			total,
			selected,
			duplicates,
			news: total - duplicates
		};
	}, [parsedItems]);
	const toggleSelectAll = () => {
		const newSelected = !filteredItems.every((i) => i.selected);
		setParsedItems((prev) => prev.map((item) => filteredItems.some((fi) => fi.id === item.id) ? {
			...item,
			selected: newSelected
		} : item));
	};
	const setItemResolution = (id, resolution) => {
		setParsedItems((prev) => prev.map((it) => it.id === id ? {
			...it,
			resolution
		} : it));
	};
	const handleConfirmImport = async () => {
		const activeSelected = parsedItems.filter((item) => item.selected && item.resolution !== "skip");
		if (activeSelected.length === 0) {
			toast.warning("Aucun contact sélectionné pour l'import.");
			return;
		}
		setIsProcessing(true);
		try {
			const contactsToImport = activeSelected.map((item) => item.contact);
			const resolutions = {};
			for (const item of parsedItems) if (!item.selected || item.resolution === "skip") resolutions[item.contact.id || ""] = "skip";
			else resolutions[item.contact.id || ""] = item.resolution;
			const res = await onImportComplete(contactsToImport, resolutions);
			toast.success(`${res.imported} nouveau(x) contact(s) importé(s), ${res.updated} enrichi(s) sans perte !`);
			handleClose(false);
		} catch (err) {
			console.error(err);
			toast.error("Erreur lors de la validation de l'import.");
		} finally {
			setIsProcessing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background border-border/80 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
				className: "px-6 pt-6 pb-4 border-b border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 259,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 258,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-xl font-bold tracking-tight text-foreground",
							children: "Importer des contacts"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 262,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Importez vos contacts depuis votre téléphone (vCard) ou votre réseau LinkedIn (CSV)."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 265,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 261,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 257,
						columnNumber: 13
					}, this), step === "preview" && /* @__PURE__ */ (void 0)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setStep("upload"),
						className: "text-xs gap-1.5",
						children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 278,
							columnNumber: 17
						}, this), " Changer de fichier"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 272,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 256,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 255,
				columnNumber: 9
			}, this), step === "upload" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-6 space-y-6 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-3 p-1 rounded-xl bg-muted/60 border border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("vcf"),
							className: `flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg font-medium text-xs transition-all ${activeTab === "vcf" ? "bg-background text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "size-4 text-emerald-500" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 297,
								columnNumber: 17
							}, this), "Carnet Téléphone (.vcf)"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 288,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveTab("linkedin"),
							className: `flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg font-medium text-xs transition-all ${activeTab === "linkedin" ? "bg-background text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4 text-[#0A66C2]" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 309,
								columnNumber: 17
							}, this), "Export LinkedIn (.csv)"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 300,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 287,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragOver(true);
						},
						onDragLeave: () => setDragOver(false),
						onDrop: handleDrop,
						onClick: () => fileInputRef.current?.click(),
						className: `relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${dragOver ? "border-primary bg-primary/5 scale-[0.99]" : "border-border/80 hover:border-primary/60 bg-card/40 hover:bg-card/70"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								ref: fileInputRef,
								type: "file",
								accept: activeTab === "vcf" ? ".vcf,.vcard" : ".csv",
								onChange: handleFileChange,
								className: "hidden"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 329,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-14 place-items-center rounded-2xl bg-muted/80 text-foreground mb-4 shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-7 text-primary" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 337,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 336,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold text-sm text-foreground text-center",
								children: "Cliquez pour choisir un fichier ou glissez-le ici"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 339,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground mt-1 text-center",
								children: activeTab === "vcf" ? "Fichiers .vcf ou .vcard (export iPhone, Android, Google Contacts)" : "Fichier .csv (export officiel des relations LinkedIn)"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 342,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 348,
									columnNumber: 17
								}, this), "Détection automatique des doublons & enrichissement sans perte"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 347,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 315,
						columnNumber: 13
					}, this),
					activeTab === "vcf" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-900 dark:text-emerald-300",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "size-4 shrink-0 mt-0.5 text-emerald-500" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 357,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold",
									children: "Comment exporter vos contacts téléphone ?"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 359,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "list-disc list-inside space-y-0.5 text-emerald-800/90 dark:text-emerald-400/90 text-[11px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "iPhone (iOS) :" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 364,
											columnNumber: 25
										}, this), " Ouvrez l'app Contacts > Listes > Maintenez \"Tous les contacts\" > Exporter (.vcf)."] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 363,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Android / Google :" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 369,
											columnNumber: 25
										}, this), " Allez sur contacts.google.com > Exporter > Format vCard (pour contacts iOS / vCard)."] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 368,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Mac / Outlook :" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 374,
											columnNumber: 25
										}, this), " Fichier > Exporter vCard."] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 373,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 362,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 358,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 356,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 355,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-sky-900 dark:text-sky-300",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Linkedin, { className: "size-4 shrink-0 mt-0.5 text-[#0A66C2]" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 384,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold",
									children: "Comment exporter vos relations LinkedIn ?"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 386,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
									className: "list-decimal list-inside space-y-0.5 text-sky-800/90 dark:text-sky-400/90 text-[11px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Sur LinkedIn, cliquez sur votre photo de profil (Vous) > ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Préférences et confidentialité" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 392,
												columnNumber: 30
											}, this),
											"."
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 390,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Menu de gauche :",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Confidentialité des données" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 396,
												columnNumber: 25
											}, this),
											" >",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Obtenir une copie de vos données" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 397,
												columnNumber: 25
											}, this),
											"."
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 394,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Cochez uniquement ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "\"Relations\"" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 400,
												columnNumber: 43
											}, this),
											" puis cliquez sur \"Demander les archives\"."
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 399,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
											"Téléchargez le fichier .zip reçu par email, décompressez-le et glissez le fichier",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: "Connections.csv" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 406,
												columnNumber: 25
											}, this),
											" ci-dessus."
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 403,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 389,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 385,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 383,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 382,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 285,
				columnNumber: 11
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 flex flex-col min-h-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-6 py-3.5 bg-muted/30 border-b border-border/60 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-semibold text-foreground",
									children: ["Fichier : ", fileName]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 420,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 423,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1 text-primary font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 425,
											columnNumber: 19
										}, this),
										" ",
										stats.selected,
										" /",
										" ",
										stats.total,
										" sélectionnés"
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 424,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 428,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 430,
											columnNumber: 19
										}, this),
										" ",
										stats.news,
										" nouveaux"
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 429,
									columnNumber: 17
								}, this),
								stats.duplicates > 0 && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-muted-foreground",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 434,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium",
									children: [
										/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 436,
											columnNumber: 23
										}, this),
										" ",
										stats.duplicates,
										" ",
										"doublons détectés"
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 435,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 433,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 419,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative flex-1 sm:w-60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 445,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									placeholder: "Filtrer les contacts...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "h-8 pl-8 text-xs bg-background"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 446,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 444,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: toggleSelectAll,
								className: "h-8 text-xs shrink-0",
								children: "Tout cocher / décocher"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 453,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 443,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 418,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 overflow-y-auto divide-y divide-border/60 px-6",
						children: filteredItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "py-12 text-center text-xs text-muted-foreground",
							children: "Aucun contact ne correspond à votre recherche."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 467,
							columnNumber: 17
						}, this) : filteredItems.map((item) => {
							const fullName = getContactFullName(item.contact);
							const company = getContactCompany(item.contact);
							const job = getContactJobTitle(item.contact);
							const isDup = Boolean(item.match);
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${!item.selected || item.resolution === "skip" ? "opacity-50" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start sm:items-center gap-3 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "checkbox",
										checked: item.selected && item.resolution !== "skip",
										onChange: (e) => {
											const checked = e.target.checked;
											setParsedItems((prev) => prev.map((i) => i.id === item.id ? {
												...i,
												selected: checked,
												resolution: checked ? isDup ? "merge" : "both" : "skip"
											} : i));
										},
										className: "size-4 rounded border-border text-primary focus:ring-primary mt-1 sm:mt-0"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 487,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
													className: "font-semibold text-xs text-foreground truncate",
													children: fullName
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 513,
													columnNumber: 29
												}, this),
												company && /* @__PURE__ */ (void 0)("span", {
													className: "rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-foreground",
													children: company
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 517,
													columnNumber: 31
												}, this),
												job && /* @__PURE__ */ (void 0)("span", {
													className: "text-[11px] text-muted-foreground truncate",
													children: job
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 522,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 512,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground",
											children: [
												item.contact.email && /* @__PURE__ */ (void 0)("span", { children: item.contact.email }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 530,
													columnNumber: 31
												}, this),
												item.contact.telephone && /* @__PURE__ */ (void 0)("span", { children: item.contact.telephone }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 533,
													columnNumber: 31
												}, this),
												item.contact.linkedin && /* @__PURE__ */ (void 0)("span", {
													className: "text-primary truncate max-w-xs",
													children: item.contact.linkedin
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 536,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 528,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 511,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 486,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 self-end sm:self-center shrink-0",
									children: isDup && /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400",
											children: [
												/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 549,
													columnNumber: 31
												}, this),
												" Doublon (",
												item.match?.reason,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 548,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: item.resolution,
											onChange: (e) => setItemResolution(item.id, e.target.value),
											className: "h-7 rounded-lg border border-border/80 bg-background px-2 text-[11px] text-foreground focus:ring-1 focus:ring-primary",
											children: [
												/* @__PURE__ */ (void 0)("option", {
													value: "merge",
													children: "Fusionner sans perte"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 563,
													columnNumber: 31
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "both",
													children: "Créer en double"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 566,
													columnNumber: 31
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "skip",
													children: "Ignorer"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 567,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 553,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 547,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 545,
									columnNumber: 23
								}, this)]
							}, item.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 478,
								columnNumber: 21
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 465,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 bg-muted/40 border-t border-border/60 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "size-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 581,
								columnNumber: 17
							}, this), "Vos données existantes (notes, historiques) ne seront jamais écrasées."]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 580,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => handleClose(false),
								className: "text-xs",
								children: "Annuler"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 586,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								size: "sm",
								onClick: handleConfirmImport,
								disabled: isProcessing || stats.selected === 0,
								className: "text-xs font-semibold gap-1.5 bg-primary text-primary-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 600,
										columnNumber: 19
									}, this),
									"Importer ",
									stats.selected,
									" contact(s)"
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 594,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 585,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 579,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 416,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 254,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 253,
		columnNumber: 5
	}, this);
}
/** Profil courant : cloud si connecté (avec repli local), sinon local. */
function useProfil(user) {
	const [profil, setProfil] = (0, import_react.useState)(null);
	const userId = user?.id;
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const local = loadProfil(userId);
		setProfil(local);
		if (!userId) return;
		fetchProfil(userId).then((cloud) => {
			if (!cancelled && cloud) {
				setProfil(cloud);
				saveProfilLocal(cloud, userId);
			}
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [userId]);
	return profil;
}
function sanitizeForFirestore$2(obj) {
	if (obj === null || obj === void 0) return null;
	if (Array.isArray(obj)) return obj.map((item) => sanitizeForFirestore$2(item)).filter((item) => item !== void 0);
	if (typeof obj !== "object") return obj;
	const clean = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value === void 0) continue;
		clean[key] = sanitizeForFirestore$2(value);
	}
	return clean;
}
function toContact(r) {
	const base = emptyContact();
	const rawObj = r;
	const candIds = Array.isArray(r.candidature_ids) ? r.candidature_ids : Array.isArray(r.candidatureIds) ? r.candidatureIds : r.candidature_id || r.candidatureId ? [r.candidature_id || r.candidatureId || ""] : [];
	const validSources = (Array.isArray(r.sources) ? r.sources : r.source ? [r.source] : ["manual"]).filter((s) => Boolean(s));
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
		source: r.source || validSources[0] || "manual",
		sources: validSources.length > 0 ? validSources : ["manual"],
		isManual: r.is_manual ?? r.isManual ?? true,
		createdAt: r.created_at || r.createdAt || base.createdAt,
		updatedAt: r.updated_at || r.updatedAt || base.updatedAt
	};
}
function toRow$2(c, userId) {
	return sanitizeForFirestore$2({
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
	if (isFirebaseConfigured() && userId) try {
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
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data.map(toContact);
	}
	return [];
}
async function upsertContact(c, userId) {
	const row = toRow$2(c, userId);
	if (isFirebaseConfigured() && userId) try {
		const docRef = doc(db, "users", userId, "contacts", row.id);
		await setDoc(docRef, row, { merge: true });
		return toContact(row);
	} catch (e) {
		console.warn("Firestore upsertContact error:", e);
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
	if (isFirebaseConfigured() && userId) try {
		await Promise.all(contactsList.map(async (c) => {
			const row = toRow$2(c, userId);
			const docRef = doc(db, "users", userId, "contacts", row.id);
			await setDoc(docRef, row, { merge: true });
		}));
		return contactsList;
	} catch (e) {
		console.warn("Firestore batchUpsertContacts error:", e);
	}
	if (isSupabaseConfigured()) {
		const rows = contactsList.map((c) => toRow$2(c, userId));
		const { data, error } = await supabase.from("contacts").upsert(rows);
		if (error) throw error;
		if (Array.isArray(data)) return data.map(toContact);
	}
	return contactsList;
}
async function deleteContact(id, userId) {
	if (isFirebaseConfigured() && userId) try {
		const docRef = doc(db, "users", userId, "contacts", id);
		await deleteDoc(docRef);
		return;
	} catch (e) {
		console.warn("Firestore deleteContact error:", e);
	}
	if (isSupabaseConfigured()) {
		const { error } = await supabase.from("contacts").delete().eq("id", id);
		if (error) throw error;
	}
}
function useContacts() {
	const { user, firebaseUser, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(firebaseUser?.uid && firebaseUser.uid === userId);
	const [contacts, setContacts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			setContacts(loadContactsLocal(userId));
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
						saveContactsLocal(cloud, userId);
					} else {
						const local = loadContactsLocal(userId);
						setContacts(local);
					}
				}
			} catch (err) {
				console.warn("Échec récupération contacts cloud, repli local:", err);
				if (!cancelled) setContacts(loadContactsLocal(userId));
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
				saveContactsLocal(next, userId);
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
				saveContactsLocal(next, userId);
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
				if (!incoming) continue;
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
						...emptyContact(incoming.nom || incoming.fullName || ""),
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
			saveContactsLocal(currentContacts, userId);
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
/**
* Nettoie récursivement un objet pour Firestore en remplaçant undefined par null
* car Firestore refuse strictement les valeurs undefined.
*/
function sanitizeForFirestore$1(data) {
	if (data === void 0) return null;
	if (data === null || typeof data !== "object") return data;
	if (Array.isArray(data)) return data.map((item) => sanitizeForFirestore$1(item));
	const clean = {};
	for (const [key, value] of Object.entries(data)) if (value === void 0) clean[key] = null;
	else clean[key] = sanitizeForFirestore$1(value);
	return clean;
}
function toCandidature(r) {
	const match = r.match && typeof r.match === "object" && "global" in r.match ? r.match : null;
	const prepRaw = r.preparation ?? {};
	const preparation = {
		...emptyPreparation(),
		...prepRaw
	};
	const rawObj = r;
	const rawEvents = r.workflow_events || rawObj["workflowEvents"] || [];
	const rawStep = r.current_workflow_step || rawObj["currentWorkflowStep"];
	return normalizeCandidature({
		...rawObj,
		id: r.id,
		entreprise: r.entreprise ?? rawObj["company"] ?? "",
		poste: r.poste ?? rawObj["title"] ?? "",
		statut: r.statut,
		currentStage: rawObj["currentStage"] || rawObj["current_stage"] || r.statut || rawObj["status"] || "",
		currentWorkflowStep: rawStep,
		workflowEvents: Array.isArray(rawEvents) ? rawEvents : void 0,
		savedAt: r.saved_at ?? rawObj["savedAt"],
		preparedAt: r.prepared_at ?? rawObj["preparedAt"],
		interviewDate: r.interview_date ?? rawObj["interviewDate"],
		secondInterviewDate: r.second_interview_date ?? rawObj["secondInterviewDate"],
		offerReceivedAt: r.offer_received_at ?? rawObj["offerReceivedAt"],
		acceptedAt: r.accepted_at ?? rawObj["acceptedAt"],
		rejectedAt: r.rejected_at ?? rawObj["rejectedAt"],
		lieu: r.lieu ?? rawObj["location"] ?? "",
		lien: r.lien ?? rawObj["sourceUrl"] ?? "",
		contact: r.contact ?? "",
		dateEnvoi: r.date_envoi ?? rawObj["appliedAt"] ?? "",
		dateRelance: r.date_relance ?? rawObj["followUpDate"] ?? "",
		dateDernierContact: r.date_dernier_contact ?? rawObj["lastContactDate"] ?? "",
		dateLimite: r.date_limite ?? rawObj["applicationDeadline"] ?? "",
		commentaire: r.commentaire ?? rawObj["personalNotes"] ?? "",
		missions: rawObj["missions"] || prepRaw["missions"] || "",
		profilRecherche: rawObj["profilRecherche"] || prepRaw["profilRecherche"] || "",
		modalites: rawObj["modalites"] || prepRaw["modalites"] || "",
		detail: r.detail ?? "",
		priorite: r.priorite || "auto",
		source: r.source ?? rawObj["sourceName"] ?? "",
		secteur: r.secteur ?? rawObj["companySector"] ?? "",
		archive: r.archive ?? false,
		match,
		preparation,
		contractType: rawObj["contractType"] || rawObj["contract_type"] || null,
		duration: rawObj["duration"] || rawObj["duree"] || null,
		startDate: rawObj["startDate"] || rawObj["start_date"] || null,
		endDate: rawObj["endDate"] || rawObj["end_date"] || null,
		salary: rawObj["salary"] || rawObj["salaire"] || null,
		salaryMin: typeof rawObj["salaryMin"] === "number" ? rawObj["salaryMin"] : typeof rawObj["salary_min"] === "number" ? rawObj["salary_min"] : null,
		salaryMax: typeof rawObj["salaryMax"] === "number" ? rawObj["salaryMax"] : typeof rawObj["salary_max"] === "number" ? rawObj["salary_max"] : null,
		salaryCurrency: rawObj["salaryCurrency"] || rawObj["salary_currency"] || null,
		remotePolicy: rawObj["remotePolicy"] || rawObj["remote_policy"] || null,
		remoteDetails: rawObj["remoteDetails"] || rawObj["remote_details"] || null,
		jobFunction: rawObj["jobFunction"] || rawObj["job_function"] || null,
		educationLevel: rawObj["educationLevel"] || rawObj["education_level"] || null,
		missionsList: Array.isArray(rawObj["missionsList"]) ? rawObj["missionsList"] : Array.isArray(rawObj["missions_list"]) ? rawObj["missions_list"] : [],
		responsibilities: Array.isArray(rawObj["responsibilities"]) ? rawObj["responsibilities"] : [],
		requiredSkills: Array.isArray(rawObj["requiredSkills"]) ? rawObj["requiredSkills"] : Array.isArray(rawObj["required_skills"]) ? rawObj["required_skills"] : [],
		preferredSkills: Array.isArray(rawObj["preferredSkills"]) ? rawObj["preferredSkills"] : Array.isArray(rawObj["preferred_skills"]) ? rawObj["preferred_skills"] : [],
		tools: Array.isArray(rawObj["tools"]) ? rawObj["tools"] : [],
		requiredLanguages: Array.isArray(rawObj["requiredLanguages"]) ? rawObj["requiredLanguages"] : Array.isArray(rawObj["required_languages"]) ? rawObj["required_languages"] : [],
		preferredLanguages: Array.isArray(rawObj["preferredLanguages"]) ? rawObj["preferredLanguages"] : Array.isArray(rawObj["preferred_languages"]) ? rawObj["preferred_languages"] : [],
		qualities: Array.isArray(rawObj["qualities"]) ? rawObj["qualities"] : [],
		experienceRequirements: rawObj["experienceRequirements"] || rawObj["experience_requirements"] || null,
		educationRequirements: Array.isArray(rawObj["educationRequirements"]) ? rawObj["educationRequirements"] : Array.isArray(rawObj["education_requirements"]) ? rawObj["education_requirements"] : [],
		companyId: rawObj["companyId"] || rawObj["company_id"] || null,
		contactId: rawObj["contactId"] || rawObj["contact_id"] || null,
		contactIds: Array.isArray(rawObj["contactIds"]) ? rawObj["contactIds"] : Array.isArray(rawObj["contact_ids"]) ? rawObj["contact_ids"] : [],
		companyDescription: rawObj["companyDescription"] || rawObj["company_description"] || null,
		companySector: rawObj["companySector"] || rawObj["company_sector"] || null,
		companySize: rawObj["companySize"] || rawObj["company_size"] || null,
		companyLocation: rawObj["companyLocation"] || rawObj["company_location"] || null,
		companyWebsite: rawObj["companyWebsite"] || rawObj["company_website"] || null,
		companyContext: Array.isArray(rawObj["companyContext"]) ? rawObj["companyContext"] : Array.isArray(rawObj["company_context"]) ? rawObj["company_context"] : [],
		companyPartners: Array.isArray(rawObj["companyPartners"]) ? rawObj["companyPartners"] : Array.isArray(rawObj["company_partners"]) ? rawObj["company_partners"] : [],
		companyMetrics: Array.isArray(rawObj["companyMetrics"]) ? rawObj["companyMetrics"] : Array.isArray(rawObj["company_metrics"]) ? rawObj["company_metrics"] : [],
		recruitmentProcess: Array.isArray(rawObj["recruitmentProcess"]) ? rawObj["recruitmentProcess"] : Array.isArray(rawObj["recruitment_process"]) ? rawObj["recruitment_process"] : [],
		applicationMethod: rawObj["applicationMethod"] || rawObj["application_method"] || null,
		applicationRequirements: Array.isArray(rawObj["applicationRequirements"]) ? rawObj["applicationRequirements"] : Array.isArray(rawObj["application_requirements"]) ? rawObj["application_requirements"] : [],
		benefits: Array.isArray(rawObj["benefits"]) ? rawObj["benefits"] : Array.isArray(rawObj["avantages"]) ? rawObj["avantages"] : [],
		sourceType: rawObj["sourceType"] || rawObj["source_type"] || null,
		sourceName: rawObj["sourceName"] || rawObj["source_name"] || null,
		sourcePublishedAt: rawObj["sourcePublishedAt"] || rawObj["source_published_at"] || null,
		extractedAt: rawObj["extractedAt"] || rawObj["extracted_at"] || null
	});
}
function isUuid(id) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}
function toRow$1(c, userId) {
	return sanitizeForFirestore$1({
		id: isUuid(c.id) ? c.id : c.id || crypto.randomUUID(),
		user_id: userId,
		companyId: c.companyId || null,
		company_id: c.companyId || null,
		entreprise: c.entreprise,
		company: c.entreprise,
		poste: c.poste,
		title: c.poste,
		statut: c.statut,
		status: c.statut,
		current_stage: c.currentStage || c.statut || null,
		currentStage: c.currentStage || c.statut || null,
		lieu: c.lieu,
		location: c.lieu,
		lien: c.lien,
		sourceUrl: c.lien,
		contact: c.contact,
		date_envoi: c.dateEnvoi || null,
		appliedAt: c.dateEnvoi || null,
		date_relance: c.dateRelance || null,
		followUpDate: c.dateRelance || null,
		date_dernier_contact: c.dateDernierContact || null,
		lastContactDate: c.dateDernierContact || null,
		date_limite: c.dateLimite || null,
		applicationDeadline: c.dateLimite || null,
		commentaire: c.commentaire,
		personalNotes: c.commentaire,
		detail: c.detail,
		priorite: c.priorite,
		source: c.source,
		sourceName: c.source,
		secteur: c.secteur,
		companySector: c.secteur,
		archive: c.archive,
		match: c.match ?? {},
		preparation: {
			...c.preparation,
			missions: c.missions,
			profilRecherche: c.profilRecherche,
			modalites: c.modalites
		},
		current_workflow_step: c.currentWorkflowStep || null,
		currentWorkflowStep: c.currentWorkflowStep || null,
		workflow_events: c.workflowEvents || [],
		workflowEvents: c.workflowEvents || [],
		saved_at: c.savedAt || null,
		savedAt: c.savedAt || null,
		prepared_at: c.preparedAt || null,
		preparedAt: c.preparedAt || null,
		interview_date: c.interviewDate || null,
		interviewDate: c.interviewDate || null,
		second_interview_date: c.secondInterviewDate || null,
		secondInterviewDate: c.secondInterviewDate || null,
		offer_received_at: c.offerReceivedAt || null,
		offerReceivedAt: c.offerReceivedAt || null,
		accepted_at: c.acceptedAt || null,
		acceptedAt: c.acceptedAt || null,
		rejected_at: c.rejectedAt || null,
		rejectedAt: c.rejectedAt || null,
		country: c.country || null,
		contractType: c.contractType || null,
		contract_type: c.contractType || null,
		duration: c.duration || null,
		duree: c.duration || null,
		startDate: c.startDate || null,
		start_date: c.startDate || null,
		endDate: c.endDate || null,
		end_date: c.endDate || null,
		salary: c.salary || null,
		salaire: c.salary || null,
		salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : null,
		salary_min: typeof c.salaryMin === "number" ? c.salaryMin : null,
		salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : null,
		salary_max: typeof c.salaryMax === "number" ? c.salaryMax : null,
		salaryCurrency: c.salaryCurrency || null,
		salary_currency: c.salaryCurrency || null,
		remotePolicy: c.remotePolicy || null,
		remote_policy: c.remotePolicy || null,
		remoteDetails: c.remoteDetails || null,
		remote_details: c.remoteDetails || null,
		jobFunction: c.jobFunction || null,
		job_function: c.jobFunction || null,
		educationLevel: c.educationLevel || null,
		education_level: c.educationLevel || null,
		missionsList: c.missionsList || [],
		missions_list: c.missionsList || [],
		responsibilities: c.responsibilities || [],
		requiredSkills: c.requiredSkills || [],
		required_skills: c.requiredSkills || [],
		preferredSkills: c.preferredSkills || [],
		preferred_skills: c.preferredSkills || [],
		tools: c.tools || [],
		requiredLanguages: c.requiredLanguages || [],
		required_languages: c.requiredLanguages || [],
		preferredLanguages: c.preferredLanguages || [],
		preferred_languages: c.preferredLanguages || [],
		qualities: c.qualities || [],
		experienceRequirements: c.experienceRequirements || null,
		experience_requirements: c.experienceRequirements || null,
		educationRequirements: c.educationRequirements || [],
		education_requirements: c.educationRequirements || [],
		contactId: c.contactId || null,
		contact_id: c.contactId || null,
		contactIds: Array.isArray(c.contactIds) ? c.contactIds : [],
		contact_ids: Array.isArray(c.contactIds) ? c.contactIds : [],
		companyDescription: c.companyDescription || null,
		company_description: c.companyDescription || null,
		companySize: c.companySize || null,
		company_size: c.companySize || null,
		companyLocation: c.companyLocation || null,
		company_location: c.companyLocation || null,
		companyWebsite: c.companyWebsite || null,
		company_website: c.companyWebsite || null,
		companyContext: c.companyContext || [],
		company_context: c.companyContext || [],
		companyPartners: c.companyPartners || [],
		company_partners: c.companyPartners || [],
		companyMetrics: c.companyMetrics || [],
		company_metrics: c.companyMetrics || [],
		recruitmentProcess: c.recruitmentProcess || [],
		recruitment_process: c.recruitmentProcess || [],
		applicationMethod: c.applicationMethod || null,
		application_method: c.applicationMethod || null,
		applicationRequirements: c.applicationRequirements || [],
		application_requirements: c.applicationRequirements || [],
		benefits: c.benefits || [],
		avantages: c.benefits || [],
		sourceType: c.sourceType || null,
		source_type: c.sourceType || null,
		sourcePublishedAt: c.sourcePublishedAt || null,
		source_published_at: c.sourcePublishedAt || null,
		extractedAt: c.extractedAt || null,
		extracted_at: c.extractedAt || null
	});
}
async function fetchCandidatures(userId) {
	const effectiveUserId = userId || auth$1.currentUser?.uid;
	console.info("[OPPORTUNITY LOAD START]", {
		userId: effectiveUserId,
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (!effectiveUserId) return [];
	if (isFirebaseConfigured() && auth$1.currentUser) {
		if (auth$1.currentUser.uid === effectiveUserId) try {
			const colRef = collection(db, "users", effectiveUserId, "candidatures");
			const snap = await getDocs(query(colRef));
			const list = [];
			snap.forEach((docSnap) => {
				const cand = toCandidature({
					id: docSnap.id,
					...docSnap.data()
				});
				list.push(cand);
			});
			console.info(`[OPPORTUNITY LOAD SUCCESS] ${list.length} opportunités chargées depuis Firestore`, list.map((c) => ({
				id: c.id,
				poste: c.poste,
				entreprise: c.entreprise,
				contractType: c.contractType,
				duration: c.duration,
				metricsCount: c.companyMetrics?.length || 0
			})));
			return list;
		} catch (e) {
			console.warn("[OPPORTUNITY LOAD WARN] Firestore fetchCandidatures indisponible:", e?.message || e);
			return [];
		}
	}
	if (isSupabaseConfigured()) try {
		const { data, error } = await supabase.from("candidatures").select("*").order("created_at", { ascending: false });
		if (error) {
			console.warn("[OPPORTUNITY LOAD WARN] Supabase fetch error:", error);
			return [];
		}
		const list = data.map(toCandidature);
		console.info(`[OPPORTUNITY LOAD SUCCESS] ${list.length} opportunités chargées depuis Supabase`);
		return list;
	} catch {
		return [];
	}
	console.info("[OPPORTUNITY LOAD LOCAL] Utilisation du stockage local sécurisé.");
	return [];
}
async function upsertCandidature(c, userId) {
	const effectiveUserId = userId || auth$1.currentUser?.uid;
	if (!effectiveUserId) return c;
	console.info("[OPPORTUNITY SAVE START]", {
		id: c.id,
		poste: c.poste,
		entreprise: c.entreprise,
		userId: effectiveUserId
	});
	const row = toRow$1(c, effectiveUserId);
	console.info("[OPPORTUNITY SAVE PAYLOAD]", {
		id: row["id"],
		entreprise: row["entreprise"],
		poste: row["poste"],
		contractType: row["contractType"],
		duration: row["duration"],
		startDate: row["startDate"],
		metricsCount: Array.isArray(row["companyMetrics"]) ? row["companyMetrics"].length : 0,
		missionsCount: Array.isArray(row["missionsList"]) ? row["missionsList"].length : 0,
		skillsCount: Array.isArray(row["requiredSkills"]) ? row["requiredSkills"].length : 0
	});
	if (isFirebaseConfigured() && auth$1.currentUser && auth$1.currentUser.uid === effectiveUserId) try {
		const docRef = doc(db, "users", effectiveUserId, "candidatures", row["id"]);
		await setDoc(docRef, row, { merge: true });
		const saved = toCandidature(row);
		console.info("[OPPORTUNITY SAVE SUCCESS] Enregistrement Firestore confirmé avec succès:", {
			id: saved.id,
			entreprise: saved.entreprise,
			poste: saved.poste,
			metricsCount: saved.companyMetrics?.length || 0
		});
		return saved;
	} catch (e) {
		console.warn("[OPPORTUNITY SAVE WARN] Échec écriture Firestore setDoc:", e?.message || e);
		return c;
	}
	if (isSupabaseConfigured()) try {
		const { data, error } = await supabase.from("candidatures").upsert(row).select().single();
		if (error) {
			console.warn("[OPPORTUNITY SAVE WARN] Supabase upsert error:", error);
			return c;
		}
		const saved = toCandidature(data);
		console.info("[OPPORTUNITY SAVE SUCCESS] Enregistrement Supabase confirmé:", { id: saved.id });
		return saved;
	} catch {
		return c;
	}
	console.info("[OPPORTUNITY SAVE LOCAL FALLBACK] Enregistrement sans cloud configuré.");
	return c;
}
async function deleteCandidature(id, userId) {
	const effectiveUserId = userId || auth$1.currentUser?.uid;
	if (!effectiveUserId) return;
	if (isFirebaseConfigured() && auth$1.currentUser && auth$1.currentUser.uid === effectiveUserId) try {
		const docRef = doc(db, "users", effectiveUserId, "candidatures", id);
		await deleteDoc(docRef);
		return;
	} catch (e) {
		console.warn("Firestore deleteCandidature notice:", e?.message || e);
	}
	if (isSupabaseConfigured()) try {
		const { error } = await supabase.from("candidatures").delete().eq("id", id);
		if (error) throw error;
	} catch {}
}
var STORAGE_KEY_ENTREPRISES = "careerly-entreprises-v1";
var KNOWN_ALIASES = {
	pricewaterhousecoopers: "pwc",
	pwc: "pwc",
	"ernst & young": "ey",
	"ernst and young": "ey",
	ey: "ey",
	kpmg: "kpmg",
	deloitte: "deloitte",
	mckinsey: "mckinsey",
	"mckinsey & company": "mckinsey",
	bcg: "bcg",
	"boston consulting group": "bcg",
	bain: "bain",
	"bain & company": "bain",
	bnp: "bnp paribas",
	"bnp paribas": "bnp paribas",
	sg: "societe generale",
	"societe generale": "societe generale",
	dassault: "dassault systemes",
	"dassault systemes": "dassault systemes",
	lvmh: "lvmh",
	"moet hennessy": "lvmh",
	generali: "generali",
	"generali italia": "generali"
};
/**
* Normalise le nom d'une entreprise pour éviter les faux doublons
* (en retirant les formes juridiques, la ponctuation, les accents et variantes régionales).
*/
function normalizeCompanyName(name) {
	if (!name) return "";
	let s = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	s = s.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");
	s = s.replace(/\b(sas|sarl|sa|inc|ltd|llc|gmbh|corp|corporation|group|groupe|holding|holdings|france|paris|europe|international|emea|global)\b/gi, " ");
	s = s.replace(/\s+/g, " ").trim();
	const alias = KNOWN_ALIASES[s];
	if (alias) return alias;
	return s;
}
/**
* Extrait le nom de domaine racine (ex: 'pwc' depuis 'https://careers.pwc.fr/jobs')
* en ignorant les plateformes d'emploi généralistes.
*/
function extractRootDomain(urlOrDomain) {
	if (!urlOrDomain) return null;
	try {
		let host = urlOrDomain.trim().toLowerCase();
		if (host.includes("://")) host = new URL(host).hostname;
		host = host.replace(/^(www\.|careers\.|jobs\.|recrutement\.)/, "");
		if (host.includes("linkedin.com") || host.includes("indeed.com") || host.includes("welcomekit.co") || host.includes("welcometothejungle.com") || host.includes("hellowork.com") || host.includes("glassdoor.com") || host.includes("google.com")) return null;
		const parts = host.split(".");
		if (parts.length >= 2 && parts[0]) return parts[0];
		return host;
	} catch {
		return null;
	}
}
/**
* Recherche une entreprise existante correspondante sans fusion hasardeuse.
*/
function findMatchingEntreprise(target, entreprises) {
	if (target.companyId) {
		const direct = entreprises.find((e) => e.id === target.companyId);
		if (direct) return direct;
	}
	const norm = normalizeCompanyName(target.nom || target.entreprise || "");
	if (!norm) return null;
	const exactNorm = entreprises.find((e) => e.normalizedName === norm);
	if (exactNorm) return exactNorm;
	const targetDomain = extractRootDomain(target.siteWeb) || extractRootDomain(target.lien);
	if (targetDomain) {
		const domainMatch = entreprises.find((e) => {
			const eDomain = extractRootDomain(e.siteWeb);
			return Boolean(eDomain && eDomain === targetDomain);
		});
		if (domainMatch) return domainMatch;
	}
	return entreprises.find((e) => {
		if (!e.normalizedName) return false;
		if (norm.length >= 4 && e.normalizedName.length >= 4) {
			if (e.normalizedName.startsWith(`${norm} `) || norm.startsWith(`${e.normalizedName} `)) return true;
		}
		return false;
	}) || null;
}
function emptyEntreprise(nom) {
	const displayNom = nom?.trim() || "";
	return {
		id: crypto.randomUUID(),
		nom: displayNom,
		normalizedName: normalizeCompanyName(displayNom),
		description: null,
		secteur: null,
		taille: null,
		siege: null,
		siteWeb: null,
		chiffresCles: [],
		contexte: [],
		partenaires: [],
		logoUrl: null,
		notes: "",
		contactRH: "",
		telephone: "",
		email: "",
		linkedin: "",
		tags: [],
		isFavorite: false,
		manualFields: [],
		isManual: false,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
/**
* Crée ou enrichit intelligemment une fiche entreprise depuis les données
* d'une opportunité, tout en respectant strictement la règle :
* DONNÉES UTILISATEUR > DONNÉES IA.
*/
function syncEntrepriseFromOpportunity(opp, entreprises) {
	const oppNom = opp.companyName || opp.company || opp.entreprise || "Entreprise";
	const existing = findMatchingEntreprise({
		companyId: opp.companyId,
		nom: oppNom,
		siteWeb: opp.companyWebsite,
		lien: opp.lien
	}, entreprises);
	if (!existing) return {
		entreprise: {
			id: opp.companyId || crypto.randomUUID(),
			nom: oppNom,
			normalizedName: normalizeCompanyName(oppNom),
			description: opp.companyDescription || null,
			secteur: opp.companySector || opp.secteur || null,
			taille: opp.companySize || null,
			siege: opp.companyLocation || opp.lieu || null,
			siteWeb: opp.companyWebsite || null,
			chiffresCles: Array.isArray(opp.companyMetrics) ? opp.companyMetrics.map((m) => `${m.label} : ${m.value}`) : [],
			contexte: Array.isArray(opp.companyContext) ? opp.companyContext : [],
			partenaires: Array.isArray(opp.companyPartners) ? opp.companyPartners : [],
			logoUrl: null,
			notes: "",
			contactRH: "",
			telephone: "",
			email: "",
			linkedin: "",
			tags: [],
			isFavorite: false,
			manualFields: [],
			isManual: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		isNew: true,
		hasChanged: true
	};
	const manualFields = existing.manualFields || [];
	let hasChanged = false;
	const updated = { ...existing };
	if (!manualFields.includes("description") && (!updated.description || opp.companyDescription && opp.companyDescription.length > updated.description.length)) {
		if (opp.companyDescription && opp.companyDescription !== updated.description) {
			updated.description = opp.companyDescription;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("secteur") && !updated.secteur && (opp.companySector || opp.secteur)) {
		const newSec = opp.companySector || opp.secteur || null;
		if (newSec && newSec !== updated.secteur) {
			updated.secteur = newSec;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("taille") && !updated.taille && opp.companySize) {
		if (opp.companySize !== updated.taille) {
			updated.taille = opp.companySize;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("siege") && !updated.siege && (opp.companyLocation || opp.lieu)) {
		const newSiege = opp.companyLocation || opp.lieu || null;
		if (newSiege && newSiege !== updated.siege) {
			updated.siege = newSiege;
			hasChanged = true;
		}
	}
	if (!manualFields.includes("siteWeb") && !updated.siteWeb && (opp.companyWebsite || opp.lien)) {
		const newWeb = opp.companyWebsite || opp.lien || null;
		if (newWeb && newWeb !== updated.siteWeb) {
			updated.siteWeb = newWeb;
			hasChanged = true;
		}
	}
	if (Array.isArray(opp.companyMetrics) && opp.companyMetrics.length > 0) {
		const currentMetrics = new Set(updated.chiffresCles || []);
		const initialSize = currentMetrics.size;
		for (const m of opp.companyMetrics) currentMetrics.add(`${m.label} : ${m.value}`);
		if (currentMetrics.size > initialSize) {
			updated.chiffresCles = Array.from(currentMetrics);
			hasChanged = true;
		}
	}
	if (Array.isArray(opp.companyContext) && opp.companyContext.length > 0) {
		const currentContext = new Set(updated.contexte || []);
		const initialSize = currentContext.size;
		for (const ctx of opp.companyContext) currentContext.add(ctx);
		if (currentContext.size > initialSize) {
			updated.contexte = Array.from(currentContext);
			hasChanged = true;
		}
	}
	if (Array.isArray(opp.companyPartners) && opp.companyPartners.length > 0) {
		const currentPartners = new Set(updated.partenaires || []);
		const initialSize = currentPartners.size;
		for (const p of opp.companyPartners) currentPartners.add(p);
		if (currentPartners.size > initialSize) {
			updated.partenaires = Array.from(currentPartners);
			hasChanged = true;
		}
	}
	if (hasChanged) {
		updated.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		return {
			entreprise: updated,
			isNew: false,
			hasChanged: true
		};
	}
	return {
		entreprise: existing,
		isNew: false,
		hasChanged: false
	};
}
/**
* Vérifie si une entreprise possède des données persistantes utiles à préserver
* même si toutes ses opportunités ont été supprimées :
* - contacts associés ;
* - notes personnelles ;
* - modifications manuelles par l'utilisateur ;
* - coordonnées saisies (téléphone, email, linkedin, contact RH) ;
* - favoris ou tags.
*/
function hasPersistentData(entreprise, contacts = []) {
	if (contacts.some((ct) => {
		if (ct.candidatureId && ct.candidatureId === entreprise.id) return true;
		if (ct.entreprise) return normalizeCompanyName(ct.entreprise) === entreprise.normalizedName || ct.entreprise.trim().toLowerCase() === entreprise.nom.trim().toLowerCase();
		return false;
	})) return true;
	if (typeof entreprise.notes === "string" && entreprise.notes.trim().length > 0) return true;
	if (entreprise.isManual) return true;
	if (Array.isArray(entreprise.manualFields) && entreprise.manualFields.length > 0) return true;
	if (entreprise.contactRH && entreprise.contactRH.trim().length > 0 || entreprise.email && entreprise.email.trim().length > 0 || entreprise.telephone && entreprise.telephone.trim().length > 0 || entreprise.linkedin && entreprise.linkedin.trim().length > 0) return true;
	if (entreprise.isFavorite) return true;
	if (Array.isArray(entreprise.tags) && entreprise.tags.length > 0) return true;
	return false;
}
/**
* Détermine si une entreprise doit être conservée lors de la suppression d'une opportunité.
* Règle de protection : en cas de doute, on CONSERVE toujours l'entreprise.
*/
function shouldKeepEntrepriseAfterOpportunityDeleted(entreprise, remainingOpportunities, contacts = []) {
	if (remainingOpportunities.some((opp) => {
		if (opp.companyId && opp.companyId === entreprise.id) return true;
		return normalizeCompanyName(opp.companyName || opp.company || opp.entreprise) === entreprise.normalizedName;
	})) return true;
	return hasPersistentData(entreprise, contacts);
}
function getEntreprisesStorageKey(userId) {
	return userId ? `nacora_${userId}_entreprises_v1` : "nacora_guest_entreprises_v1";
}
function loadEntreprisesLocal(userId) {
	if (typeof window === "undefined") return [];
	try {
		const key = getEntreprisesStorageKey(userId);
		let raw = localStorage.getItem(key);
		if (!raw && userId) {
			const oldRaw = localStorage.getItem(STORAGE_KEY_ENTREPRISES);
			if (oldRaw) {
				localStorage.setItem(key, oldRaw);
				localStorage.removeItem(STORAGE_KEY_ENTREPRISES);
				raw = oldRaw;
			}
		}
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) return parsed;
		return [];
	} catch (err) {
		console.warn("Échec lecture localStorage entreprises:", err);
		return [];
	}
}
function saveEntreprisesLocal(items, userId) {
	if (typeof window === "undefined") return;
	try {
		const key = getEntreprisesStorageKey(userId);
		localStorage.setItem(key, JSON.stringify(items));
	} catch (err) {
		console.warn("Échec écriture localStorage entreprises:", err);
	}
}
/** Nettoie récursivement pour Firestore en remplaçant undefined par null */
function sanitizeForFirestore(data) {
	if (data === void 0) return null;
	if (data === null || typeof data !== "object") return data;
	if (Array.isArray(data)) return data.map((item) => sanitizeForFirestore(item));
	const clean = {};
	for (const [key, value] of Object.entries(data)) clean[key] = value === void 0 ? null : sanitizeForFirestore(value);
	return clean;
}
function toEntreprise(r) {
	const base = emptyEntreprise(r.nom || "");
	return {
		...base,
		id: r.id,
		nom: r.nom || base.nom,
		normalizedName: r.normalizedName || base.normalizedName,
		description: r.description ?? null,
		secteur: r.secteur ?? null,
		taille: r.taille ?? null,
		siege: r.siege ?? null,
		siteWeb: r.siteWeb ?? null,
		chiffresCles: Array.isArray(r.chiffresCles) ? r.chiffresCles : [],
		contexte: Array.isArray(r.contexte) ? r.contexte : [],
		partenaires: Array.isArray(r.partenaires) ? r.partenaires : [],
		logoUrl: r.logoUrl ?? null,
		notes: r.notes ?? "",
		contactRH: r.contactRH ?? "",
		telephone: r.telephone ?? "",
		email: r.email ?? "",
		linkedin: r.linkedin ?? "",
		tags: Array.isArray(r.tags) ? r.tags : [],
		isFavorite: Boolean(r.isFavorite),
		manualFields: Array.isArray(r.manualFields) ? r.manualFields : [],
		isManual: Boolean(r.isManual),
		createdAt: r.createdAt || base.createdAt,
		updatedAt: r.updatedAt || base.updatedAt
	};
}
function toRow(e, userId) {
	return sanitizeForFirestore({
		id: e.id || crypto.randomUUID(),
		user_id: userId,
		nom: e.nom,
		normalizedName: e.normalizedName,
		description: e.description ?? null,
		secteur: e.secteur ?? null,
		taille: e.taille ?? null,
		siege: e.siege ?? null,
		siteWeb: e.siteWeb ?? null,
		chiffresCles: e.chiffresCles || [],
		contexte: e.contexte || [],
		partenaires: e.partenaires || [],
		logoUrl: e.logoUrl ?? null,
		notes: e.notes || "",
		contactRH: e.contactRH || "",
		telephone: e.telephone || "",
		email: e.email || "",
		linkedin: e.linkedin || "",
		tags: e.tags || [],
		isFavorite: Boolean(e.isFavorite),
		manualFields: e.manualFields || [],
		isManual: Boolean(e.isManual),
		createdAt: e.createdAt,
		updatedAt: e.updatedAt
	});
}
async function fetchEntreprises(userId) {
	const effectiveUserId = userId || auth$1.currentUser?.uid;
	if (isFirebaseConfigured() && effectiveUserId) try {
		const colRef = collection(db, "users", effectiveUserId, "entreprises");
		const snap = await getDocs(query(colRef));
		const list = [];
		snap.forEach((docSnap) => {
			list.push(toEntreprise({
				id: docSnap.id,
				...docSnap.data()
			}));
		});
		return list;
	} catch (e) {
		console.warn("Firestore fetchEntreprises error:", e);
	}
	return [];
}
async function upsertEntreprise(e, userId) {
	if (isFirebaseConfigured() && userId) try {
		const row = toRow(e, userId);
		const docRef = doc(db, "users", userId, "entreprises", e.id);
		await setDoc(docRef, row, { merge: true });
		return toEntreprise(row);
	} catch (err) {
		console.warn("Firestore upsertEntreprise error:", err);
	}
	return e;
}
async function deleteEntrepriseCloud(id, userId) {
	if (isFirebaseConfigured() && userId) try {
		const docRef = doc(db, "users", userId, "entreprises", id);
		await deleteDoc(docRef);
	} catch (err) {
		console.warn("Firestore deleteEntreprise error:", err);
	}
}
/**
* Synchronise l'entreprise correspondante lors de l'enregistrement d'une opportunité.
* Crée ou enrichit la fiche entreprise et retourne son companyId.
*/
async function syncOpportunityCompanyOnSave(c, userId) {
	if (!(c.companyName || c.company || c.entreprise || "").trim()) return null;
	try {
		let list = loadEntreprisesLocal();
		if (userId) {
			const cloudList = await fetchEntreprises(userId).catch(() => []);
			if (cloudList.length > 0) list = cloudList;
		}
		const { entreprise, isNew } = syncEntrepriseFromOpportunity(c, list);
		saveEntreprisesLocal(isNew ? [entreprise, ...list] : list.map((item) => item.id === entreprise.id ? entreprise : item));
		if (userId) upsertEntreprise(entreprise, userId);
		return entreprise.id;
	} catch (err) {
		console.warn("Échec synchronisation entreprise lors de la sauvegarde :", err);
		return null;
	}
}
/**
* Gère le cycle de vie de l'entreprise lors de la suppression d'une opportunité :
* - SI l'entreprise a encore d'autres opportunités -> conservée.
* - SI 0 opportunité restante mais données persistantes (contacts, notes, coordonnées, favoris) -> conservée.
* - SI 0 opportunité et totalement vide (aucune donnée manuelle) -> supprimée automatiquement.
*/
async function syncOpportunityCompanyOnDelete(deletedItem, remainingItems, userId) {
	const oppNom = deletedItem.companyName || deletedItem.company || deletedItem.entreprise || "";
	if (!oppNom.trim() && !deletedItem.companyId) return;
	try {
		let list = loadEntreprisesLocal();
		if (userId) {
			const cloudList = await fetchEntreprises(userId).catch(() => []);
			if (cloudList.length > 0) list = cloudList;
		}
		const matched = findMatchingEntreprise({
			companyId: deletedItem.companyId,
			nom: oppNom
		}, list);
		if (!matched) return;
		let contacts = loadContactsLocal();
		if (userId) {
			const cloudContacts = await fetchContacts(userId).catch(() => []);
			if (cloudContacts.length > 0) contacts = cloudContacts;
		}
		if (!shouldKeepEntrepriseAfterOpportunityDeleted(matched, remainingItems, contacts)) {
			saveEntreprisesLocal(list.filter((e) => e.id !== matched.id));
			if (userId) deleteEntrepriseCloud(matched.id, userId);
		}
	} catch (err) {
		console.warn("Échec vérification nettoyage entreprise:", err);
	}
}
/**
* Synchronisation intelligente de contact lors de l'enregistrement d'une opportunité :
* - Si contactId est déjà lié, associe l'entreprise et ajoute l'opportunité dans ses candidatureIds.
* - Si du texte est présent dans c.contact, le parse et le déduplique/enrichit ou crée un contact propre.
*/
async function syncOpportunityContactOnSave(opp, companyId, userId) {
	try {
		let contacts = loadContactsLocal();
		if (userId) {
			const cloud = await fetchContacts(userId).catch(() => []);
			if (cloud.length > 0) contacts = cloud;
		}
		const companyName = opp.companyName || opp.company || opp.entreprise || "";
		if (opp.contactId) {
			const existing = contacts.find((c) => c.id === opp.contactId);
			if (existing) {
				const oppIds = new Set(existing.candidatureIds || []);
				if (existing.candidatureId) oppIds.add(existing.candidatureId);
				oppIds.add(opp.id);
				const updatedContact = {
					...existing,
					candidatureIds: Array.from(oppIds),
					candidatureId: existing.candidatureId || opp.id,
					companyId: companyId || existing.companyId,
					entreprise: existing.entreprise || companyName,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				};
				saveContactsLocal(contacts.map((c) => c.id === updatedContact.id ? updatedContact : c));
				if (userId) upsertContact(updatedContact, userId);
				return updatedContact.id;
			}
		}
		const rawContactText = (opp.contact || "").trim();
		if (!rawContactText) return null;
		const parsed = parseRawContactInput(rawContactText);
		const parsedName = (parsed.nom || "").trim();
		if (!parsedName && !parsed.email && !parsed.telephone) return null;
		const candidateTarget = {
			...parsed,
			entreprise: companyName,
			companyId: companyId || void 0
		};
		const match = findMatchingContact(candidateTarget, contacts);
		if (match) {
			const enriched = enrichContactWithoutLoss(match.contact, {
				...candidateTarget,
				candidatureId: opp.id,
				candidatureIds: [opp.id]
			}, "opportunity");
			saveContactsLocal(contacts.map((c) => c.id === enriched.id ? enriched : c));
			if (userId) upsertContact(enriched, userId);
			return enriched.id;
		} else {
			const newContact = {
				...emptyContact(parsedName || "Contact opportunité"),
				...candidateTarget,
				id: crypto.randomUUID(),
				entreprise: companyName,
				companyId: companyId || null,
				candidatureId: opp.id,
				candidatureIds: [opp.id],
				source: "opportunity",
				sources: ["opportunity"],
				tags: ["Opportunité"],
				isManual: false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			saveContactsLocal([newContact, ...contacts]);
			if (userId) upsertContact(newContact, userId);
			return newContact.id;
		}
	} catch (err) {
		console.warn("Échec synchronisation contact opportunité:", err);
		return null;
	}
}
/**
* Détachement sécurisé d'un contact lors de la suppression d'une opportunité :
* Ne supprime JAMAIS le contact ! Retire uniquement l'ID de l'opportunité de son historique.
*/
async function syncOpportunityContactOnDelete(deletedOpp, userId) {
	try {
		let contacts = loadContactsLocal();
		if (userId) {
			const cloud = await fetchContacts(userId).catch(() => []);
			if (cloud.length > 0) contacts = cloud;
		}
		let modified = false;
		const updatedContacts = contacts.map((ct) => {
			if (!(ct.candidatureId === deletedOpp.id || ct.candidatureIds && ct.candidatureIds.includes(deletedOpp.id))) return ct;
			modified = true;
			const nextCandIds = (ct.candidatureIds || []).filter((id) => id !== deletedOpp.id);
			return {
				...ct,
				candidatureIds: nextCandIds,
				candidatureId: ct.candidatureId === deletedOpp.id ? nextCandIds[0] || "" : ct.candidatureId,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
		});
		if (modified) {
			saveContactsLocal(updatedContacts);
			if (userId) batchUpsertContacts(updatedContacts, userId);
		}
	} catch (err) {
		console.warn("Échec détachement contact lors de la suppression d'opportunité:", err);
	}
}
/**
* Migration prudente des opportunités existantes sans companyId :
* Rattache l'identifiant d'entreprise et enrichit la base sans rien écraser.
*/
async function migrateExistingOpportunities(loadedItems, userId) {
	try {
		let list = loadEntreprisesLocal();
		if (userId) {
			const cloud = await fetchEntreprises(userId).catch(() => []);
			if (cloud.length > 0) list = cloud;
		}
		let modifiedEntreprises = false;
		let modifiedOpportunities = false;
		const updatedItems = loadedItems.map((c) => {
			if (!(c.companyName || c.company || c.entreprise || "").trim()) return c;
			const { entreprise, isNew } = syncEntrepriseFromOpportunity(c, list);
			if (isNew) {
				list = [entreprise, ...list];
				modifiedEntreprises = true;
				if (userId) upsertEntreprise(entreprise, userId);
			}
			if (c.companyId !== entreprise.id) {
				modifiedOpportunities = true;
				return {
					...c,
					companyId: entreprise.id
				};
			}
			return c;
		});
		if (modifiedEntreprises) saveEntreprisesLocal(list);
		return modifiedOpportunities ? updatedItems : loadedItems;
	} catch (err) {
		console.warn("Échec migration des opportunités existantes:", err);
		return loadedItems;
	}
}
var hasHydrated = false;
var memoryCache = null;
var currentCacheUserId = void 0;
var listeners = /* @__PURE__ */ new Set();
function notifyCandidatureChange(newItems, userId) {
	memoryCache = newItems;
	currentCacheUserId = userId;
	saveCandidatures(newItems, userId);
	listeners.forEach((listener) => listener(newItems));
}
/**
* Fusionne les candidatures cloud et locales de façon strictement cloisonnée par utilisateur.
*/
function mergeCloudAndLocalCandidatures(cloudItems, localItems, userId) {
	if (localItems.length === 0) return cloudItems;
	if (cloudItems.length === 0) return localItems;
	const cloudMap = /* @__PURE__ */ new Map();
	cloudItems.forEach((c) => cloudMap.set(c.id, c));
	const missingInCloud = [];
	const merged = [];
	localItems.forEach((local) => {
		const cloud = cloudMap.get(local.id);
		if (!cloud) {
			missingInCloud.push(local);
			merged.push(local);
		} else {
			const localDate = local.savedAt || local.appliedAt || "";
			const cloudDate = cloud.savedAt || cloud.appliedAt || "";
			if (localDate && (!cloudDate || localDate > cloudDate)) merged.push(local);
			else merged.push(cloud);
			cloudMap.delete(local.id);
		}
	});
	cloudMap.forEach((c) => merged.push(c));
	if (userId && missingInCloud.length > 0) missingInCloud.forEach((item) => {
		upsertCandidature(item, userId).catch(() => void 0);
	});
	return merged;
}
/**
* Source unique des candidatures : cloud si connecté, navigateur sinon.
* Partagé par toutes les pages (dashboard, opportunités, calendrier, entreprises…).
*/
function useCandidatures() {
	const { user, firebaseUser, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(firebaseUser?.uid && firebaseUser.uid === userId);
	const [items, setItems] = (0, import_react.useState)(() => {
		if (!hasHydrated) return [];
		if (currentCacheUserId === userId && memoryCache !== null) return memoryCache;
		return loadCandidatures(userId);
	});
	const [ready, setReady] = (0, import_react.useState)(() => hasHydrated);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const handleSync = (updatedItems) => {
			setItems(updatedItems);
		};
		listeners.add(handleSync);
		return () => {
			listeners.delete(handleSync);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (currentCacheUserId !== userId) {
			currentCacheUserId = userId;
			const userItems = loadCandidatures(userId);
			memoryCache = userItems;
			setItems(userItems);
		}
	}, [userId]);
	(0, import_react.useEffect)(() => {
		if (!hasHydrated) {
			hasHydrated = true;
			currentCacheUserId = userId;
			const initial = loadCandidatures(userId);
			memoryCache = initial;
			setItems(initial);
			setReady(true);
		}
	}, [userId]);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			migrateExistingOpportunities(loadCandidatures(userId), userId).then((migrated) => {
				if (!cancelled) {
					notifyCandidatureChange(migrated, userId);
					setReady(true);
				}
			});
			return;
		}
		setSyncing(true);
		(async () => {
			try {
				console.info("[OPPORTUNITY LOAD SYNC START]", { userId });
				const cloud = await fetchCandidatures(userId);
				if (!cancelled) {
					const migrated = await migrateExistingOpportunities(mergeCloudAndLocalCandidatures(cloud, loadCandidatures(userId), userId), userId);
					console.info("[OPPORTUNITY LOAD SYNC APPLIED]", { count: migrated.length });
					notifyCandidatureChange(migrated, userId);
				}
			} catch (err) {
				console.warn("[OPPORTUNITY LOAD SYNC FAILED, USING CACHE]", err);
				if (!cancelled) notifyCandidatureChange(await migrateExistingOpportunities(loadCandidatures(userId), userId), userId);
			} finally {
				if (!cancelled) {
					setSyncing(false);
					setReady(true);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		isCloudUser,
		userId,
		authLoading
	]);
	(0, import_react.useEffect)(() => {
		if (!isCloudUser || !userId) return;
		const refresh = () => {
			if (document.visibilityState !== "visible") return;
			fetchCandidatures(userId).then((cloud) => {
				return migrateExistingOpportunities(mergeCloudAndLocalCandidatures(cloud, loadCandidatures(userId), userId), userId);
			}).then((migrated) => {
				notifyCandidatureChange(migrated, userId);
			}).catch(() => void 0);
		};
		window.addEventListener("focus", refresh);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.removeEventListener("focus", refresh);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [isCloudUser, userId]);
	(0, import_react.useEffect)(() => {
		if (ready) saveCandidatures(items, userId);
	}, [
		items,
		ready,
		userId
	]);
	const pushCloud = (0, import_react.useCallback)((c) => {
		if (!isCloudUser || !userId) return;
		upsertCandidature(c, userId).catch(() => toast.error("Enregistrement en ligne impossible."));
	}, [isCloudUser, userId]);
	return {
		user,
		authLoading,
		items,
		setItems,
		ready,
		syncing,
		patch: (0, import_react.useCallback)((id, p) => {
			const currentList = memoryCache ?? items;
			const current = currentList.find((c) => c.id === id);
			if (!current) return;
			const next = {
				...current,
				...p
			};
			pushCloud(next);
			notifyCandidatureChange(currentList.map((c) => c.id === id ? next : c), userId);
		}, [
			items,
			pushCloud,
			userId
		]),
		remove: (0, import_react.useCallback)((id) => {
			const currentList = memoryCache ?? items;
			const toDelete = currentList.find((p) => p.id === id);
			const next = currentList.filter((p) => p.id !== id);
			notifyCandidatureChange(next, userId);
			if (toDelete) {
				syncOpportunityCompanyOnDelete(toDelete, next, userId);
				syncOpportunityContactOnDelete(toDelete, userId);
			}
			if (isCloudUser && userId) deleteCandidature(id, userId).catch(() => toast.error("Suppression en ligne impossible."));
			toast.success("Opportunité supprimée.");
		}, [
			isCloudUser,
			items,
			userId
		]),
		save: (0, import_react.useCallback)(async (c) => {
			console.info("[OPPORTUNITY HOOK SAVE START]", {
				id: c.id,
				poste: c.poste,
				entreprise: c.entreprise
			});
			const linkedCompanyId = await syncOpportunityCompanyOnSave(c, userId);
			let toSave = linkedCompanyId ? {
				...c,
				companyId: linkedCompanyId
			} : c;
			const linkedContactId = await syncOpportunityContactOnSave(toSave, toSave.companyId || null, userId);
			if (linkedContactId) toSave = {
				...toSave,
				contactId: linkedContactId,
				contactIds: Array.from(/* @__PURE__ */ new Set([...toSave.contactIds || [], linkedContactId]))
			};
			let saved = toSave;
			if (isCloudUser && userId) try {
				saved = await upsertCandidature(toSave, userId);
				console.info("[OPPORTUNITY HOOK SAVE CLOUD SUCCESS]", { id: saved.id });
			} catch (err) {
				console.error("[OPPORTUNITY HOOK SAVE CLOUD ERROR] Sauvegarde Firestore échouée, conservation en local:", err);
				toast.error("Sauvegarde locale effectuée (erreur réseau avec la base en ligne).");
			}
			const currentList = memoryCache ?? items;
			const next = currentList.some((p) => p.id === toSave.id) ? currentList.map((p) => p.id === toSave.id ? saved : p) : [saved, ...currentList];
			notifyCandidatureChange(next, userId);
			console.info("[OPPORTUNITY HOOK STATE UPDATED]", { totalCount: next.length });
			return saved;
		}, [
			isCloudUser,
			items,
			userId
		]),
		pushCloud
	};
}
function useEntreprises() {
	const { user, firebaseUser, loading: authLoading } = useSession();
	const userId = user?.id;
	const isCloudUser = Boolean(firebaseUser?.uid && firebaseUser.uid === userId);
	const [entreprises, setEntreprises] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const entreprisesRef = (0, import_react.useRef)([]);
	entreprisesRef.current = entreprises;
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		let cancelled = false;
		if (!isCloudUser || !userId) {
			setEntreprises(loadEntreprisesLocal(userId));
			setLoading(false);
			return;
		}
		setLoading(true);
		(async () => {
			try {
				const cloud = await fetchEntreprises(userId);
				if (!cancelled) {
					if (cloud.length > 0) {
						setEntreprises(cloud);
						saveEntreprisesLocal(cloud, userId);
					} else {
						const local = loadEntreprisesLocal(userId);
						setEntreprises(local);
					}
				}
			} catch (err) {
				console.warn("Échec récupération entreprises cloud, repli local:", err);
				if (!cancelled) setEntreprises(loadEntreprisesLocal(userId));
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [
		isCloudUser,
		userId,
		authLoading
	]);
	const saveEntreprise = (0, import_react.useCallback)(async (e) => {
		let saved = e;
		if (isCloudUser && userId) try {
			saved = await upsertEntreprise(e, userId);
		} catch (err) {
			console.warn("Échec sauvegarde entreprise Firestore:", err);
		}
		setEntreprises((prev) => {
			const next = prev.some((item) => item.id === e.id) ? prev.map((item) => item.id === e.id ? saved : item) : [saved, ...prev];
			saveEntreprisesLocal(next, userId);
			return next;
		});
		return saved;
	}, [isCloudUser, userId]);
	const removeEntreprise = (0, import_react.useCallback)(async (id) => {
		setEntreprises((prev) => {
			const next = prev.filter((item) => item.id !== id);
			saveEntreprisesLocal(next, userId);
			return next;
		});
		if (isCloudUser && userId) try {
			await deleteEntrepriseCloud(id, userId);
		} catch (err) {
			console.warn("Échec suppression entreprise Firestore:", err);
		}
	}, [isCloudUser, userId]);
	const getOpportunitiesForEntreprise = (0, import_react.useCallback)((e, candidatures) => {
		return candidatures.filter((c) => {
			if (c.companyId && c.companyId === e.id) return true;
			return normalizeCompanyName(c.companyName || c.company || c.entreprise) === e.normalizedName;
		});
	}, []);
	const getContactsForEntreprise = (0, import_react.useCallback)((e, contacts) => {
		return contacts.filter((ct) => {
			if (ct.candidatureId && ct.candidatureId === e.id) return true;
			if (ct.entreprise) return normalizeCompanyName(ct.entreprise) === e.normalizedName || ct.entreprise.trim().toLowerCase() === e.nom.trim().toLowerCase();
			return false;
		});
	}, []);
	/**
	* Synchronisation automatique intelligente :
	* - Pour chaque opportunité, s'assure qu'une entreprise existe et est enrichie.
	* - Rattache `companyId` si absent.
	* - Ne supprime jamais les données manuelles utilisateur.
	*/
	const syncWithOpportunites = (0, import_react.useCallback)(async (candidatures, contacts = []) => {
		let currentList = [...entreprisesRef.current];
		const patchedCands = [];
		let anyChanged = false;
		for (const opp of candidatures) {
			if (!(opp.companyName || opp.company || opp.entreprise || "").trim()) continue;
			const { entreprise, isNew, hasChanged } = syncEntrepriseFromOpportunity(opp, currentList);
			if (isNew) {
				currentList = [entreprise, ...currentList];
				anyChanged = true;
				if (isCloudUser && userId) upsertEntreprise(entreprise, userId);
			} else if (hasChanged) {
				currentList = currentList.map((item) => item.id === entreprise.id ? entreprise : item);
				anyChanged = true;
				if (isCloudUser && userId) upsertEntreprise(entreprise, userId);
			}
			if (opp.companyId !== entreprise.id) patchedCands.push({
				...opp,
				companyId: entreprise.id
			});
		}
		if (anyChanged) {
			setEntreprises(currentList);
			saveEntreprisesLocal(currentList, userId);
		}
		return {
			updatedEntreprises: currentList,
			patchedCandidatures: patchedCands
		};
	}, [isCloudUser, userId]);
	/**
	* Gestion de la suppression d'une opportunité :
	* Applique la règle stricte :
	* - Supprime l'opportunité
	* - Recalcule les opportunités de l'entreprise
	* - Si restantes > 0 -> conserve l'entreprise
	* - Sinon vérifie données persistantes (contacts, notes, coordonnées, etc.)
	* - Si persistantes -> conserve
	* - Sinon nettoie l'entreprise vide
	*/
	const handleOpportunityDeleted = (0, import_react.useCallback)(async (deletedOpp, remainingOpportunities, contacts = []) => {
		const targetCompany = findMatchingEntreprise({
			companyId: deletedOpp.companyId,
			nom: deletedOpp.companyName || deletedOpp.company || deletedOpp.entreprise
		}, entreprises);
		if (!targetCompany) return;
		if (!shouldKeepEntrepriseAfterOpportunityDeleted(targetCompany, remainingOpportunities, contacts)) await removeEntreprise(targetCompany.id);
	}, [entreprises, removeEntreprise]);
	return {
		entreprises,
		loading: loading || authLoading,
		saveEntreprise,
		removeEntreprise,
		getOpportunitiesForEntreprise,
		getContactsForEntreprise,
		syncWithOpportunites,
		handleOpportunityDeleted
	};
}
var _jsxFileName = "/app/applet/src/routes/contacts.tsx";
var Route$18 = createFileRoute("/contacts")({
	head: () => ({ meta: [
		{ title: "Contacts — NACORA" },
		{
			name: "description",
			content: "Gérez vos recruteurs, RH, managers et relations LinkedIn/téléphone, suivez vos échanges et synchronisez vos opportunités."
		},
		{
			property: "og:title",
			content: "Contacts — NACORA"
		},
		{
			property: "og:description",
			content: "Carnet de contacts professionnels synchronisé avec vos opportunités et entreprises cibles."
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
	component: ContactsPage
});
function ContactsPage() {
	const { user, loading: authLoading } = useSession();
	const profil = useProfil(user);
	const { contacts, loading: contactsLoading, saveContact, deleteContactById, batchImportContacts, getOpportunitiesForContact } = useContacts();
	const { items: candidatures, save: saveCandidature } = useCandidatures();
	const { entreprises } = useEntreprises();
	const [recherche, setRecherche] = (0, import_react.useState)("");
	const [filtreType, setFiltreType] = (0, import_react.useState)("tous");
	const [filtreSource, setFiltreSource] = (0, import_react.useState)("all");
	const [filtreRelation, setFiltreRelation] = (0, import_react.useState)("all");
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	const [selectedContact, setSelectedContact] = (0, import_react.useState)(() => emptyContact());
	const [importModalOpen, setImportModalOpen] = (0, import_react.useState)(false);
	const [editingOpp, setEditingOpp] = (0, import_react.useState)(null);
	const [oppSheetOpen, setOppSheetOpen] = (0, import_react.useState)(false);
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: contacts.length,
			withOpps: contacts.filter((c) => getOpportunitiesForContact(c, candidatures).length > 0).length,
			withCompany: contacts.filter((c) => Boolean(c.companyId || c.entreprise)).length,
			fromPhone: contacts.filter((c) => c.sources?.includes("phone") || c.source === "phone").length,
			fromLinkedin: contacts.filter((c) => c.sources?.includes("linkedin") || c.source === "linkedin").length
		};
	}, [
		contacts,
		candidatures,
		getOpportunitiesForContact
	]);
	const liste = (0, import_react.useMemo)(() => {
		const q = recherche.trim().toLowerCase();
		return contacts.filter((c) => {
			if (filtreType !== "tous" && c.type !== filtreType) return false;
			if (filtreSource !== "all") {
				if (!(c.sources && c.sources.length > 0 ? c.sources : [c.source || "manual"]).includes(filtreSource)) return false;
			}
			const opps = getOpportunitiesForContact(c, candidatures);
			if (filtreRelation === "with_opps" && opps.length === 0) return false;
			if (filtreRelation === "without_opps" && opps.length > 0) return false;
			if (filtreRelation === "with_company" && !c.companyId && !c.entreprise) return false;
			if (q) {
				const fullName = getContactFullName(c).toLowerCase();
				const company = getContactCompany(c).toLowerCase();
				const job = getContactJobTitle(c).toLowerCase();
				const email = (c.email || "").toLowerCase();
				const phone = (c.telephone || "").toLowerCase();
				const notes = (c.notes || "").toLowerCase();
				return fullName.includes(q) || company.includes(q) || job.includes(q) || email.includes(q) || phone.includes(q) || notes.includes(q);
			}
			return true;
		});
	}, [
		contacts,
		recherche,
		filtreType,
		filtreSource,
		filtreRelation,
		candidatures,
		getOpportunitiesForContact
	]);
	const handleOpenNew = () => {
		setSelectedContact(emptyContact());
		setSheetOpen(true);
	};
	const handleOpenContact = (c) => {
		setSelectedContact(c);
		setSheetOpen(true);
	};
	const handleSaveContact = async (c) => {
		await saveContact(c);
		setSheetOpen(false);
	};
	const handleDeleteContact = async (c) => {
		await deleteContactById(c.id);
		setSheetOpen(false);
	};
	const handleOpenOpportunity = (candidatureId) => {
		const opp = candidatures.find((x) => x.id === candidatureId);
		if (opp) {
			setEditingOpp(opp);
			setOppSheetOpen(true);
		}
	};
	const getInitials = (contact) => {
		return getContactInitials(contact);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, {
		eyebrow: "Réseau professionnel",
		title: "Contacts",
		subtitle: "Recruteurs, RH, managers et anciens élèves synchronisés avec vos opportunités et entreprises",
		actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: () => setImportModalOpen(true),
				className: "gap-1.5 text-xs h-9 font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-3.5 text-primary" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 230,
					columnNumber: 13
				}, this), " Importer"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 225,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				onClick: handleOpenNew,
				className: "gap-1.5 text-xs h-9 font-semibold bg-primary text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 236,
					columnNumber: 13
				}, this), " Nouveau contact"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 232,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 224,
			columnNumber: 9
		}, this),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium",
									children: "Total Contacts"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-2xl font-bold tracking-tight text-foreground",
								children: stats.total
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: "Carnet professionnel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium",
									children: "Avec opportunité"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "size-4 text-emerald-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-2xl font-bold tracking-tight text-foreground",
								children: stats.withOpps
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400",
								children: "Liaison active avec offres"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium",
									children: "Rattachés Entreprises"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 271,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-4 text-sky-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 272,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-2xl font-bold tracking-tight text-foreground",
								children: stats.withCompany
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: "Entreprises cibles"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 277,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium",
									children: "Imports Réseau"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-1 flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-2xl font-bold tracking-tight text-foreground",
									children: stats.fromPhone + stats.fromLinkedin
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-muted-foreground",
									children: [
										"(",
										stats.fromPhone,
										" tél. / ",
										stats.fromLinkedin,
										" in)"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 291,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 287,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: "VCard & LinkedIn CSV"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 242,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6 space-y-3",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: recherche,
							onChange: (e) => setRecherche(e.target.value),
							placeholder: "Rechercher par nom, entreprise, poste, email, notes...",
							className: "pl-9 h-10 text-xs bg-card/60 backdrop-blur-sm"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 306,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 304,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreType,
								onValueChange: setFiltreType,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-40 sm:w-44 h-10 text-xs bg-card/60",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Type" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 317,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 316,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "tous",
									className: "text-xs",
									children: "Tous les rôles"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 320,
									columnNumber: 17
								}, this), TYPES_CONTACT.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: t,
									className: "text-xs",
									children: t
								}, t, false, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 19
								}, this))] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreSource,
								onValueChange: (v) => setFiltreSource(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-36 sm:w-40 h-10 text-xs bg-card/60",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Source" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 336,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 335,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "all",
										className: "text-xs",
										children: "Toutes sources"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 339,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "phone",
										className: "text-xs",
										children: "Téléphone (vCard)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 342,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "linkedin",
										className: "text-xs",
										children: "LinkedIn"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 345,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "opportunity",
										className: "text-xs",
										children: "Opportunité"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "manual",
										className: "text-xs",
										children: "Manuel"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 351,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: filtreRelation,
								onValueChange: (v) => setFiltreRelation(v),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "w-40 sm:w-44 h-10 text-xs bg-card/60",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Liaison" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "all",
										className: "text-xs",
										children: "Toutes liaisons"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 365,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "with_opps",
										className: "text-xs",
										children: "Avec opportunité(s)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 368,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "without_opps",
										className: "text-xs",
										children: "Sans opportunité"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 371,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "with_company",
										className: "text-xs",
										children: "Lié à une entreprise"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 374,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 357,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 303,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 302,
				columnNumber: 7
			}, this),
			contactsLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-center p-12 text-sm text-muted-foreground gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-4 animate-spin text-primary" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 386,
					columnNumber: 11
				}, this), " Chargement de vos contacts…"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 385,
				columnNumber: 9
			}, this) : liste.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border/80 bg-card/40 p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-3",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 393,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 392,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold text-sm text-foreground",
						children: recherche || filtreType !== "tous" || filtreSource !== "all" || filtreRelation !== "all" ? "Aucun contact ne correspond à ces critères" : "Votre carnet de contacts est encore vide"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 395,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground max-w-md mx-auto",
						children: recherche || filtreType !== "tous" || filtreSource !== "all" || filtreRelation !== "all" ? "Essayez de modifier votre recherche ou réinitialisez les filtres." : "Importez vos contacts depuis votre téléphone (vCard) ou LinkedIn (CSV) pour alimenter vos opportunités en un clic."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 403,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-5 flex items-center justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setImportModalOpen(true),
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 418,
								columnNumber: 15
							}, this), " Importer vCard / LinkedIn"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 412,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							onClick: handleOpenNew,
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 426,
								columnNumber: 15
							}, this), " Nouveau contact"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 421,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 411,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 391,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: liste.map((c, i) => {
					const fullName = getContactFullName(c);
					const company = getContactCompany(c);
					const jobTitle = getContactJobTitle(c);
					const initials = getInitials(c);
					const opps = getOpportunitiesForContact(c, candidatures);
					const sources = c.sources && c.sources.length > 0 ? c.sources : [c.source || "manual"];
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-xl transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => handleOpenContact(c),
									className: "flex items-start gap-3 min-w-0 text-left flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-primary font-bold text-sm shadow-sm border border-primary/10",
										children: initials
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 458,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "truncate font-semibold text-sm text-foreground group-hover:text-primary transition-colors",
												children: fullName || "Sans nom"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 462,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "truncate text-xs text-muted-foreground mt-0.5",
												children: jobTitle || "Poste non précisé"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 465,
												columnNumber: 25
											}, this),
											company && /* @__PURE__ */ (void 0)("span", {
												className: "mt-1 inline-flex items-center gap-1 rounded-md bg-muted/80 px-2 py-0.5 text-[11px] font-medium text-foreground",
												children: [/* @__PURE__ */ (void 0)(Building2, { className: "size-3 text-muted-foreground" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 470,
													columnNumber: 29
												}, this), company]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 469,
												columnNumber: 27
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 453,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col items-end gap-1.5 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
										children: c.type
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 478,
										columnNumber: 23
									}, this), sources.map((src) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] text-muted-foreground",
										title: `Source: ${SOURCE_LABELS[src] || src}`,
										children: [
											src === "phone" && /* @__PURE__ */ (void 0)(Smartphone, { className: "size-3 text-emerald-500" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 490,
												columnNumber: 29
											}, this),
											src === "linkedin" && /* @__PURE__ */ (void 0)(Linkedin, { className: "size-3 text-[#0A66C2]" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 493,
												columnNumber: 29
											}, this),
											src === "opportunity" && /* @__PURE__ */ (void 0)(Briefcase, { className: "size-3 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 496,
												columnNumber: 29
											}, this)
										]
									}, src, true, {
										fileName: _jsxFileName,
										lineNumber: 484,
										columnNumber: 25
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 477,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 452,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3.5 space-y-1.5 text-xs text-muted-foreground",
								children: [
									c.email && /* @__PURE__ */ (void 0)("a", {
										href: `mailto:${c.email}`,
										onClick: (e) => e.stopPropagation(),
										className: "flex items-center gap-2 truncate hover:text-foreground transition-colors",
										children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-3.5 text-muted-foreground/80 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 511,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "truncate",
											children: c.email
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 512,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 23
									}, this),
									c.telephone && /* @__PURE__ */ (void 0)("a", {
										href: `tel:${c.telephone}`,
										onClick: (e) => e.stopPropagation(),
										className: "flex items-center gap-2 truncate hover:text-foreground transition-colors",
										children: [/* @__PURE__ */ (void 0)(Phone, { className: "size-3.5 text-muted-foreground/80 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 521,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", { children: c.telephone }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 522,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 516,
										columnNumber: 23
									}, this),
									c.linkedin && /* @__PURE__ */ (void 0)("a", {
										href: c.linkedin.startsWith("http") ? c.linkedin : `https://${c.linkedin}`,
										target: "_blank",
										rel: "noreferrer",
										onClick: (e) => e.stopPropagation(),
										className: "inline-flex items-center gap-2 truncate text-[#0A66C2] hover:underline",
										children: [
											/* @__PURE__ */ (void 0)(Linkedin, { className: "size-3.5 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 537,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "truncate",
												children: "Profil LinkedIn"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 538,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)(ExternalLink, { className: "size-2.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 539,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 526,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 504,
								columnNumber: 19
							}, this),
							opps.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "mt-3 pt-3 border-t border-border/50",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (void 0)(Briefcase, { className: "size-3 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 548,
											columnNumber: 25
										}, this),
										opps.length,
										" opportunité",
										opps.length > 1 ? "s" : "",
										" ",
										"liée",
										opps.length > 1 ? "s" : "",
										" :"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 547,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-1",
									children: [opps.slice(0, 2).map((opp) => /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => handleOpenOpportunity(opp.id),
										className: "w-full flex items-center justify-between gap-2 rounded-lg bg-muted/40 hover:bg-muted/70 px-2 py-1 text-left text-[11px] transition-colors",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "truncate font-medium text-foreground",
											children: opp.poste || "Offre"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 560,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "shrink-0 text-[10px] text-primary",
											children: opp.currentStage || opp.statut
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 563,
											columnNumber: 29
										}, this)]
									}, opp.id, true, {
										fileName: _jsxFileName,
										lineNumber: 554,
										columnNumber: 27
									}, this)), opps.length > 2 && /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => handleOpenContact(c),
										className: "text-[10px] text-primary hover:underline block pt-0.5",
										children: [
											"+",
											opps.length - 2,
											" autre(s) opportunité(s)..."
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 569,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 552,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 21
							}, this),
							c.prochaineAction && /* @__PURE__ */ (void 0)("div", {
								className: "mt-3 rounded-lg border border-primary/20 bg-primary/5 p-2 text-[11px] text-primary",
								children: [
									/* @__PURE__ */ (void 0)("strong", {
										className: "font-semibold",
										children: "Action : "
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 584,
										columnNumber: 23
									}, this),
									c.prochaineAction,
									c.dateProchaineAction ? ` (${c.dateProchaineAction})` : ""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 583,
								columnNumber: 21
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 450,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 pt-2 flex items-center justify-between border-t border-border/40 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground",
								children: [
									c.historique?.length || 0,
									" échange",
									c.historique?.length > 1 ? "s" : ""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 595,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => handleOpenContact(c),
								className: "h-7 px-2 text-xs text-primary font-medium hover:underline",
								children: "Ouvrir la fiche"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 599,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 594,
							columnNumber: 17
						}, this)]
					}, c.id, true, {
						fileName: _jsxFileName,
						lineNumber: 446,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 432,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactSheet, {
				open: sheetOpen,
				onOpenChange: setSheetOpen,
				contact: selectedContact,
				candidatures,
				entreprises,
				profil,
				onSave: (c) => void handleSaveContact(c),
				onDelete: (c) => void handleDeleteContact(c),
				onOpenCandidature: handleOpenOpportunity
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 615,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContactImportModal, {
				open: importModalOpen,
				onOpenChange: setImportModalOpen,
				existingContacts: contacts,
				onImportComplete: async (contactsToImport, resolutions) => {
					return await batchImportContacts(contactsToImport, resolutions);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 628,
				columnNumber: 7
			}, this),
			editingOpp && /* @__PURE__ */ (void 0)(CandidatureSheet, {
				value: editingOpp,
				profil,
				open: oppSheetOpen,
				onOpenChange: (v) => {
					setOppSheetOpen(v);
					if (!v) setEditingOpp(null);
				},
				onSave: async (patch) => {
					const updated = {
						...editingOpp,
						...patch
					};
					setEditingOpp(updated);
					await saveCandidature(updated);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 639,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 219,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$6 = () => import("./documents-DY17dRw9.mjs");
var Route$17 = createFileRoute("/documents")({
	head: () => ({ meta: [{ title: "Documents — NACORA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./entreprises-bZWeykyP.mjs");
var Route$16 = createFileRoute("/entreprises")({
	head: () => ({ meta: [
		{ title: "Entreprises — NACORA" },
		{
			name: "description",
			content: "Toutes vos entreprises cibles : opportunités liées, contacts réseau, notes stratégiques et informations clés."
		},
		{
			property: "og:title",
			content: "Entreprises — NACORA"
		},
		{
			property: "og:description",
			content: "Gestion centralisée et synchronisée de vos entreprises cibles, opportunités et contacts."
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./import-zO2tZhxh.mjs");
var Route$15 = createFileRoute("/import")({
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
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
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
var Route$14 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$3 = () => import("./opportunites-BxpjOOQ5.mjs");
var Route$13 = createFileRoute("/opportunites")({
	head: () => ({ meta: [
		{ title: "Opportunités — NACORA" },
		{
			name: "description",
			content: "Votre pipeline d'opportunités en 4 espaces : sauvegardées, à préparer, à étudier et à candidater."
		},
		{
			property: "og:title",
			content: "Opportunités — NACORA"
		},
		{
			property: "og:description",
			content: "Tableau de bord pipeline en 4 panneaux avec glisser-déposer et alertes de deadlines."
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
var $$splitComponentImporter$2 = () => import("./parametres-Bg7dG7Ow.mjs");
var Route$12 = createFileRoute("/parametres")({
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profil-8VYImJL_.mjs");
var Route$11 = createFileRoute("/profil")({
	head: () => ({ meta: [
		{ title: "Mon Profil — Dossier Candidat Central NACORA" },
		{
			name: "description",
			content: "Le dossier candidat central de NACORA : source de vérité pour le Match IA, l'optimiseur de CV, les simulations d'entretien et l'assistant de candidature."
		},
		{
			property: "og:title",
			content: "Mon Profil — Dossier Candidat Central NACORA"
		},
		{
			property: "og:description",
			content: "Votre dossier candidat central est la source de vérité pour tous les moteurs d'intelligence artificielle de NACORA."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$10 = createFileRoute("/.mcp/list-tools")({ server: { handlers: { ANY: createTanStackListToolsHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$9 = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true,
	forwardedHostTrustedByPlatform: true
}) } } });
var $$splitErrorComponentImporter = () => import("../_._lovable.oauth.consent-Cpkpi9xW.mjs");
var $$splitComponentImporter = () => import("../_._lovable.oauth.consent-6Z-R51EK.mjs");
var Route$8 = createFileRoute("/.lovable/oauth/consent")({
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
var Route$7 = createFileRoute("/.mcp/invoke-tool/$tool")({ server: { handlers: { ANY: createTanStackInvokeToolHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$6 = createFileRoute("/api/account/delete-me")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { executeCascadeAccountDeletion, verifyAuthToken } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const decoded = await verifyAuthToken(token);
		if (!decoded || !decoded.uid) return new Response(JSON.stringify({ error: "Jeton d'authentification invalide ou expiré." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const targetUid = decoded.uid;
		const result = await executeCascadeAccountDeletion({
			targetUid,
			requesterUid: targetUid,
			isSelfDeletion: true
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/account/delete-me:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: msg }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$5 = createFileRoute("/api/admin/delete-user")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { executeCascadeAccountDeletion, verifyIsAdmin } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const adminCheck = await verifyIsAdmin(token);
		if (!adminCheck || !adminCheck.isAdmin) return new Response(JSON.stringify({ error: "Accès refusé. Privilèges administrateur requis." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json().catch(() => ({}));
		if (!body.targetUid) return new Response(JSON.stringify({ error: "Paramètre 'targetUid' requis." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const result = await executeCascadeAccountDeletion({
			targetUid: body.targetUid,
			requesterUid: adminCheck.uid,
			isSelfDeletion: false
		});
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/admin/delete-user:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: msg }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$4 = createFileRoute("/api/admin/diagnose")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { searchAndDiagnoseUser, verifyIsAdmin } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const adminCheck = await verifyIsAdmin(token);
		if (!adminCheck || !adminCheck.isAdmin) return new Response(JSON.stringify({ error: "Accès refusé. Privilèges administrateur requis." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json().catch(() => ({}));
		if (!body.query) return new Response(JSON.stringify({ error: "Paramètre de recherche 'query' manquant." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const diagnosedUser = await searchAndDiagnoseUser(body.query);
		return new Response(JSON.stringify({
			found: Boolean(diagnosedUser),
			user: diagnosedUser
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/admin/diagnose:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: `Erreur serveur: ${msg}` }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$3 = createFileRoute("/api/admin/revoke-tokens")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { getAdminAuth, getAdminFirestore, verifyIsAdmin } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const adminCheck = await verifyIsAdmin(token);
		if (!adminCheck || !adminCheck.isAdmin) return new Response(JSON.stringify({ error: "Accès refusé. Privilèges administrateur requis." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json().catch(() => ({}));
		if (!body.targetUid) return new Response(JSON.stringify({ error: "Paramètre 'targetUid' requis." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await getAdminAuth().revokeRefreshTokens(body.targetUid);
		await getAdminFirestore().collection("audit_logs").add({
			action: "ADMIN_REVOKE_SESSIONS",
			targetUid: body.targetUid,
			requesterUid: adminCheck.uid,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}).catch(() => {});
		return new Response(JSON.stringify({
			success: true,
			message: "Toutes les sessions actives et jetons de rafraîchissement ont été révoqués pour cet utilisateur."
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/admin/revoke-tokens:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: `Erreur serveur: ${msg}` }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$2 = createFileRoute("/api/admin/set-role")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { getAdminAuth, getAdminFirestore, SUPER_ADMIN_EMAIL, verifyIsAdmin } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const adminCheck = await verifyIsAdmin(token);
		if (!adminCheck || !adminCheck.isAdmin) return new Response(JSON.stringify({ error: "Accès refusé. Privilèges administrateur requis." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json().catch(() => ({}));
		if (!body.targetUid || typeof body.isAdmin !== "boolean") return new Response(JSON.stringify({ error: "Paramètres 'targetUid' et 'isAdmin' requis." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const auth = getAdminAuth();
		const db = getAdminFirestore();
		const targetUser = await auth.getUser(body.targetUid).catch(() => null);
		const targetEmail = (targetUser?.email || "").toLowerCase();
		if (targetEmail === SUPER_ADMIN_EMAIL && !body.isAdmin) return new Response(JSON.stringify({ error: "Impossible de révoquer le rôle du super-administrateur principal." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!body.isAdmin) {
			const currentAdminsSnap = await db.collection("admins").get();
			if (currentAdminsSnap.docs.some((d) => d.id === body.targetUid) && currentAdminsSnap.size <= 1) return new Response(JSON.stringify({ error: "Impossible de révoquer le dernier administrateur actif du système." }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		if (body.isAdmin) await db.collection("admins").doc(body.targetUid).set({
			user_id: body.targetUid,
			email: targetEmail || "",
			role: targetEmail === SUPER_ADMIN_EMAIL ? "super_admin" : "admin",
			promuPar: adminCheck.uid,
			promuLe: (/* @__PURE__ */ new Date()).toISOString()
		}, { merge: true });
		else await db.collection("admins").doc(body.targetUid).delete();
		if (targetUser) {
			const currentClaims = targetUser.customClaims || {};
			await auth.setCustomUserClaims(body.targetUid, {
				...currentClaims,
				admin: body.isAdmin
			});
		}
		await db.collection("audit_logs").add({
			action: body.isAdmin ? "ADMIN_ROLE_GRANTED" : "ADMIN_ROLE_REVOKED",
			targetUid: body.targetUid,
			targetEmail,
			requesterUid: adminCheck.uid,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}).catch(() => {});
		return new Response(JSON.stringify({
			success: true,
			isAdmin: body.isAdmin,
			message: body.isAdmin ? `Rôle administrateur accordé avec succès à ${targetEmail || body.targetUid}.` : `Rôle administrateur retiré avec succès pour ${targetEmail || body.targetUid}.`
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/admin/set-role:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: `Erreur serveur: ${msg}` }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route$1 = createFileRoute("/api/admin/toggle-status")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { getAdminAuth, getAdminFirestore, SUPER_ADMIN_EMAIL, verifyIsAdmin } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const adminCheck = await verifyIsAdmin(token);
		if (!adminCheck || !adminCheck.isAdmin) return new Response(JSON.stringify({ error: "Accès refusé. Privilèges administrateur requis." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const body = await request.json().catch(() => ({}));
		if (!body.targetUid || typeof body.disabled !== "boolean") return new Response(JSON.stringify({ error: "Paramètres 'targetUid' et 'disabled' requis." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const auth = getAdminAuth();
		const targetUser = await auth.getUser(body.targetUid);
		if ((targetUser.email || "").toLowerCase() === SUPER_ADMIN_EMAIL) return new Response(JSON.stringify({ error: "Impossible de désactiver le compte super-administrateur principal." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		await auth.updateUser(body.targetUid, { disabled: body.disabled });
		if (body.disabled) await auth.revokeRefreshTokens(body.targetUid).catch(() => {});
		await getAdminFirestore().collection("audit_logs").add({
			action: body.disabled ? "ADMIN_DISABLE_USER" : "ADMIN_ENABLE_USER",
			targetUid: body.targetUid,
			targetEmail: targetUser.email,
			requesterUid: adminCheck.uid,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}).catch(() => {});
		return new Response(JSON.stringify({
			success: true,
			disabled: body.disabled,
			message: body.disabled ? `Le compte ${targetUser.email || body.targetUid} a été désactivé et ses sessions révoquées.` : `Le compte ${targetUser.email || body.targetUid} a été réactivé avec succès.`
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/admin/toggle-status:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: `Erreur serveur: ${msg}` }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var Route = createFileRoute("/api/admin/users")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const { listAllUsersAdmin, verifyIsAdmin } = await import("./firebase-admin.server-8Vmfk0mT.mjs");
		const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
		if (!token) return new Response(JSON.stringify({ error: "Jeton d'authentification manquant." }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const adminCheck = await verifyIsAdmin(token);
		if (!adminCheck || !adminCheck.isAdmin) return new Response(JSON.stringify({ error: "Accès refusé. Privilèges administrateur requis." }), {
			status: 403,
			headers: { "Content-Type": "application/json" }
		});
		const data = await listAllUsersAdmin();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Erreur API /api/admin/users:", err);
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: `Erreur serveur: ${msg}` }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var rootRouteChildren = {
	IndexRoute: Route$23.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$24
	}),
	AdminRoute: Route$22.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$24
	}),
	AuthRoute: Route$21.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$24
	}),
	CalendrierRoute: Route$20.update({
		id: "/calendrier",
		path: "/calendrier",
		getParentRoute: () => Route$24
	}),
	CandidaturesRoute: Route$19.update({
		id: "/candidatures",
		path: "/candidatures",
		getParentRoute: () => Route$24
	}),
	ContactsRoute: Route$18.update({
		id: "/contacts",
		path: "/contacts",
		getParentRoute: () => Route$24
	}),
	DocumentsRoute: Route$17.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => Route$24
	}),
	EntreprisesRoute: Route$16.update({
		id: "/entreprises",
		path: "/entreprises",
		getParentRoute: () => Route$24
	}),
	ImportRoute: Route$15.update({
		id: "/import",
		path: "/import",
		getParentRoute: () => Route$24
	}),
	McpRoute: Route$14.update({
		id: "/mcp",
		path: "/mcp",
		getParentRoute: () => Route$24
	}),
	OpportunitesRoute: Route$13.update({
		id: "/opportunites",
		path: "/opportunites",
		getParentRoute: () => Route$24
	}),
	ParametresRoute: Route$12.update({
		id: "/parametres",
		path: "/parametres",
		getParentRoute: () => Route$24
	}),
	ProfilRoute: Route$11.update({
		id: "/profil",
		path: "/profil",
		getParentRoute: () => Route$24
	}),
	Char91DotmcpChar93ListToolsRoute: Route$10.update({
		id: "/.mcp/list-tools",
		path: "/.mcp/list-tools",
		getParentRoute: () => Route$24
	}),
	Char91DotwellKnownChar93OauthProtectedResourceRoute: Route$9.update({
		id: "/.well-known/oauth-protected-resource",
		path: "/.well-known/oauth-protected-resource",
		getParentRoute: () => Route$24
	}),
	DotlovableOauthConsentRoute: Route$8.update({
		id: "/.lovable/oauth/consent",
		path: "/.lovable/oauth/consent",
		getParentRoute: () => Route$24
	}),
	Char91DotmcpChar93InvokeToolToolRoute: Route$7.update({
		id: "/.mcp/invoke-tool/$tool",
		path: "/.mcp/invoke-tool/$tool",
		getParentRoute: () => Route$24
	}),
	ApiAccountDeleteMeRoute: Route$6.update({
		id: "/api/account/delete-me",
		path: "/api/account/delete-me",
		getParentRoute: () => Route$24
	}),
	ApiAdminDeleteUserRoute: Route$5.update({
		id: "/api/admin/delete-user",
		path: "/api/admin/delete-user",
		getParentRoute: () => Route$24
	}),
	ApiAdminDiagnoseRoute: Route$4.update({
		id: "/api/admin/diagnose",
		path: "/api/admin/diagnose",
		getParentRoute: () => Route$24
	}),
	ApiAdminRevokeTokensRoute: Route$3.update({
		id: "/api/admin/revoke-tokens",
		path: "/api/admin/revoke-tokens",
		getParentRoute: () => Route$24
	}),
	ApiAdminSetRoleRoute: Route$2.update({
		id: "/api/admin/set-role",
		path: "/api/admin/set-role",
		getParentRoute: () => Route$24
	}),
	ApiAdminToggleStatusRoute: Route$1.update({
		id: "/api/admin/toggle-status",
		path: "/api/admin/toggle-status",
		getParentRoute: () => Route$24
	}),
	ApiAdminUsersRoute: Route.update({
		id: "/api/admin/users",
		path: "/api/admin/users",
		getParentRoute: () => Route$24
	})
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
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
export { isDeadlineOverdue as A, TabsList as B, STATUTS as C, emptyCandidature as D, addDays as E, statutToWorkflowStepKey as F, todayIso as I, transitionWorkflowStep as L, loadContactsLocal as M, saveCandidatures as N, emptyContact as O, saveContactsLocal as P, Tabs as R, CenterModal as S, TYPES_CONTACT as T, TabsTrigger as V, AlertDialogDescription as _, fetchContacts as a, AlertDialogTitle as b, upsertContact as c, useEntreprises as d, useProfil as f, AlertDialogContent as g, AlertDialogCancel as h, emptyEntreprise as i, loadCandidatures as j, formatDate as k, useCandidatures as l, AlertDialogAction as m, Route$21 as n, getRouter as o, AlertDialog as p, Route$8 as r, router_exports as s, ContactSheet as t, useContacts as u, AlertDialogFooter as v, STATUTS_OPPORTUNITE as w, CandidatureSheet as x, AlertDialogHeader as y, TabsContent as z };
