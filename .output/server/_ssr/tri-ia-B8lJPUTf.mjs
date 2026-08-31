import { c as emptyCandidature, i as STATUTS } from "./candidatures-0RcN-a4_.mjs";
import { o as emptyContact, r as TYPES_CONTACT } from "./contacts-CCWhJU1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tri-ia-B8lJPUTf.js
/** Assistant IA universel : types partagés client/serveur pour le tri automatique. */
var TRI_VIDE = {
	resume: "",
	candidatures: [],
	contacts: [],
	echeances: []
};
function estDateIso(v) {
	return /^\d{4}-\d{2}-\d{2}$/.test(v ?? "");
}
function nettoyerDate(v) {
	return estDateIso(v) ? v : "";
}
function versCandidature(e) {
	const statut = STATUTS.includes(e.statut) ? e.statut : "Je vais postuler";
	return {
		...emptyCandidature(),
		entreprise: e.entreprise.trim(),
		poste: e.poste.trim(),
		statut,
		lieu: e.lieu.trim(),
		lien: e.lien.trim(),
		source: e.source.trim(),
		secteur: e.secteur.trim(),
		dateLimite: nettoyerDate(e.dateLimite),
		dateEnvoi: nettoyerDate(e.dateEnvoi),
		commentaire: e.commentaire.trim(),
		detail: e.detail.trim()
	};
}
function versContact(e) {
	const type = TYPES_CONTACT.includes(e.type) ? e.type : "Recruteur";
	return {
		...emptyContact(),
		nom: e.nom.trim(),
		entreprise: e.entreprise.trim(),
		poste: e.poste.trim(),
		email: e.email.trim(),
		telephone: e.telephone.trim(),
		linkedin: e.linkedin.trim(),
		type,
		notes: e.notes.trim()
	};
}
var norm = (v) => v.trim().toLowerCase();
/** Retrouve la candidature déjà présente correspondant à une entreprise citée. */
function trouverCandidature(items, entreprise) {
	const e = norm(entreprise);
	if (!e) return void 0;
	return items.find((c) => norm(c.entreprise) === e || norm(c.entreprise).includes(e));
}
/** Applique une échéance à une candidature existante (date limite, relance, entretien). */
function appliquerEcheance(c, e) {
	const date = nettoyerDate(e.date);
	if (!date) return null;
	const nature = norm(e.nature);
	if (nature.includes("limite")) return { dateLimite: date };
	if (nature.includes("relance")) return { dateRelance: date };
	if (nature.includes("entretien")) return {
		statut: "J'ai un entretien",
		dateDernierContact: date
	};
	return { commentaire: `${c.commentaire ? `${c.commentaire} · ` : ""}${e.titre} (${date})` };
}
//#endregion
export { versContact as a, versCandidature as i, appliquerEcheance as n, trouverCandidature as r, TRI_VIDE as t };
