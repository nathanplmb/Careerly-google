import { m as todayIso } from "./candidatures-ck14d0Ow.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts--GCSJljy.js
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
export { contactEnTexte as a, loadContactsLocal as c, TYPES_RELANCE as i, nouvelEchange as l, LIBELLES_RELANCE as n, emptyContact as o, TYPES_CONTACT as r, historiqueEnTexte as s, CANAUX as t, saveContactsLocal as u };
