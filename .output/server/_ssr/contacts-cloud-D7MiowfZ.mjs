import { n as supabase } from "./client-DnkKuJ6q.mjs";
import { o as emptyContact } from "./contacts-CCWhJU1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-cloud-D7MiowfZ.js
function toContact(r) {
	return {
		...emptyContact(),
		id: r.id,
		nom: r.nom ?? "",
		entreprise: r.entreprise ?? "",
		poste: r.poste ?? "",
		email: r.email ?? "",
		telephone: r.telephone ?? "",
		linkedin: r.linkedin ?? "",
		type: r.type || "Recruteur",
		candidatureId: r.candidature_id ?? "",
		derniereInteraction: r.derniere_interaction ?? "",
		prochaineAction: r.prochaine_action ?? "",
		dateProchaineAction: r.date_prochaine_action ?? "",
		notes: r.notes ?? "",
		historique: Array.isArray(r.historique) ? r.historique : []
	};
}
function toRow(c, userId) {
	return {
		id: c.id,
		user_id: userId,
		nom: c.nom,
		entreprise: c.entreprise,
		poste: c.poste,
		email: c.email,
		telephone: c.telephone,
		linkedin: c.linkedin,
		type: c.type,
		candidature_id: c.candidatureId || null,
		derniere_interaction: c.derniereInteraction || null,
		prochaine_action: c.prochaineAction,
		date_prochaine_action: c.dateProchaineAction || null,
		notes: c.notes,
		historique: c.historique
	};
}
async function fetchContacts() {
	const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data.map(toContact);
}
async function upsertContact(c, userId) {
	const { data, error } = await supabase.from("contacts").upsert(toRow(c, userId)).select().single();
	if (error) throw error;
	return toContact(data);
}
async function deleteContact(id) {
	const { error } = await supabase.from("contacts").delete().eq("id", id);
	if (error) throw error;
}
//#endregion
export { fetchContacts as n, upsertContact as r, deleteContact as t };
