import { _ as todayIso } from "./candidatures-CZEj3mXa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-BJIEa8pT.js
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
export { emptyContact as a, saveContactsLocal as c, TYPES_RELANCE as i, LIBELLES_RELANCE as n, loadContactsLocal as o, TYPES_CONTACT as r, nouvelEchange as s, CANAUX as t };
