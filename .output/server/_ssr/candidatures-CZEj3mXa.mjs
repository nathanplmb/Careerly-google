//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-CZEj3mXa.js
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
	return WORKFLOW_STEPS_CONFIG.find((s) => s.key === key) || WORKFLOW_STEPS_CONFIG[0];
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
	if (s.includes("envoy") || s.includes("postul") || s.includes("candidat")) return "application_sent";
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
		return matches[matches.length - 1].date;
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
		companyName: null,
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
		entreprise,
		company,
		companyName,
		poste,
		title,
		statut,
		status: statut,
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
		country: c.country ?? base.country,
		contractType: c.contractType ?? base.contractType,
		duration: c.duration ?? base.duration,
		startDate: c.startDate ?? base.startDate,
		endDate: c.endDate ?? base.endDate,
		salary: c.salary ?? base.salary,
		salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : base.salaryMin,
		salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : base.salaryMax,
		salaryCurrency: c.salaryCurrency ?? base.salaryCurrency,
		remotePolicy: c.remotePolicy ?? base.remotePolicy,
		remoteDetails: c.remoteDetails ?? base.remoteDetails,
		jobFunction: c.jobFunction ?? base.jobFunction,
		educationLevel: c.educationLevel ?? base.educationLevel,
		responsibilities: Array.isArray(c.responsibilities) ? c.responsibilities : base.responsibilities,
		requiredSkills,
		preferredSkills,
		tools,
		requiredLanguages: Array.isArray(c.requiredLanguages) ? c.requiredLanguages : base.requiredLanguages,
		preferredLanguages: Array.isArray(c.preferredLanguages) ? c.preferredLanguages : base.preferredLanguages,
		qualities,
		experienceRequirements: c.experienceRequirements ?? base.experienceRequirements,
		educationRequirements: Array.isArray(c.educationRequirements) ? c.educationRequirements : base.educationRequirements,
		companyDescription: c.companyDescription ?? base.companyDescription,
		companySector: c.companySector ?? c.secteur ?? base.companySector,
		companySize: c.companySize ?? base.companySize,
		companyLocation: c.companyLocation ?? base.companyLocation,
		companyWebsite: c.companyWebsite ?? base.companyWebsite,
		companyContext: Array.isArray(c.companyContext) ? c.companyContext : base.companyContext,
		companyPartners: Array.isArray(c.companyPartners) ? c.companyPartners : base.companyPartners,
		companyMetrics: Array.isArray(c.companyMetrics) ? c.companyMetrics : base.companyMetrics,
		recruitmentProcess: Array.isArray(c.recruitmentProcess) ? c.recruitmentProcess : base.recruitmentProcess,
		applicationMethod: c.applicationMethod ?? base.applicationMethod,
		applicationRequirements: Array.isArray(c.applicationRequirements) ? c.applicationRequirements : base.applicationRequirements,
		benefits: Array.isArray(c.benefits) ? c.benefits : base.benefits,
		sourceType: c.sourceType ?? base.sourceType,
		sourceName: c.sourceName ?? c.source ?? base.sourceName,
		sourcePublishedAt: c.sourcePublishedAt ?? base.sourcePublishedAt,
		extractedAt: c.extractedAt ?? base.extractedAt
	};
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
function loadCandidatures() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map(normalizeCandidature) : [];
	} catch {
		return [];
	}
}
function saveCandidatures(items) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
//#endregion
export { todayIso as _, TYPES_ENTRETIEN as a, emptyCandidature as c, formatDate as d, getWorkflowStepConfig as f, statutToWorkflowStepKey as g, saveCandidatures as h, STATUTS_OPPORTUNITE as i, emptyPreparation as l, normalizeCandidature as m, STATUTS as n, WORKFLOW_STEPS_CONFIG as o, loadCandidatures as p, STATUTS_CANDIDATURE as r, addDays as s, CHANNELS_COMMUNICATION as t, findPotentialDuplicate as u, workflowStepKeyToStatut as v };
