//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-0RcN-a4_.js
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
		detail: "",
		priorite: "auto",
		source: "",
		secteur: "",
		archive: false,
		match: null,
		preparation: emptyPreparation()
	};
}
/** Complète une candidature venant d'une ancienne version (localStorage / cloud). */
function normalizeCandidature(c) {
	const base = emptyCandidature();
	return {
		...base,
		...c,
		id: c.id ?? base.id,
		statut: STATUTS.includes(c.statut ?? "") ? c.statut : "Je vais postuler",
		priorite: c.priorite ?? "auto",
		source: c.source ?? "",
		secteur: c.secteur ?? "",
		archive: c.archive ?? false,
		match: c.match ?? null,
		preparation: {
			...emptyPreparation(),
			...c.preparation ?? {}
		}
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
		c.detail
	].map(esc).join(";"));
	return [head.map(esc).join(";"), ...rows].join("\n");
}
//#endregion
export { STORAGE_KEY as a, emptyCandidature as c, loadCandidatures as d, normalizeCandidature as f, todayIso as h, STATUTS as i, emptyPreparation as l, toCsv as m, SEED as n, addDays as o, saveCandidatures as p, SOURCES as r, daysBetween as s, PRIORITES as t, formatDate as u };
