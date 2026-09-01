//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-ck14d0Ow.js
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
}), seed({
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
}), seed({
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
}), seed({
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
}), seed({
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
}), seed({
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
export { daysBetween as a, formatDate as c, normalizeCandidature as d, saveCandidatures as f, addDays as i, getNextBestAction as l, todayIso as m, SOURCES as n, emptyCandidature as o, toCsv as p, STATUTS as r, emptyPreparation as s, PRIORITES as t, loadCandidatures as u };
