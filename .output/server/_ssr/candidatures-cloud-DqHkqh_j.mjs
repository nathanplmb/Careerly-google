import { n as supabase } from "./client-DnkKuJ6q.mjs";
import { f as normalizeCandidature, l as emptyPreparation } from "./candidatures-0RcN-a4_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-cloud-DqHkqh_j.js
function toCandidature(r) {
	const match = r.match && typeof r.match === "object" && "global" in r.match ? r.match : null;
	const preparation = {
		...emptyPreparation(),
		...r.preparation ?? {}
	};
	return normalizeCandidature({
		id: r.id,
		entreprise: r.entreprise ?? "",
		poste: r.poste ?? "",
		statut: r.statut,
		lieu: r.lieu ?? "",
		lien: r.lien ?? "",
		contact: r.contact ?? "",
		dateEnvoi: r.date_envoi ?? "",
		dateRelance: r.date_relance ?? "",
		dateDernierContact: r.date_dernier_contact ?? "",
		dateLimite: r.date_limite ?? "",
		commentaire: r.commentaire ?? "",
		detail: r.detail ?? "",
		priorite: r.priorite || "auto",
		source: r.source ?? "",
		secteur: r.secteur ?? "",
		archive: r.archive ?? false,
		match,
		preparation
	});
}
function isUuid(id) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}
function toRow(c, userId) {
	return {
		id: isUuid(c.id) ? c.id : crypto.randomUUID(),
		user_id: userId,
		entreprise: c.entreprise,
		poste: c.poste,
		statut: c.statut,
		lieu: c.lieu,
		lien: c.lien,
		contact: c.contact,
		date_envoi: c.dateEnvoi || null,
		date_relance: c.dateRelance || null,
		date_dernier_contact: c.dateDernierContact || null,
		date_limite: c.dateLimite || null,
		commentaire: c.commentaire,
		detail: c.detail,
		priorite: c.priorite,
		source: c.source,
		secteur: c.secteur,
		archive: c.archive,
		match: c.match ?? {},
		preparation: c.preparation
	};
}
async function fetchCandidatures() {
	const { data, error } = await supabase.from("candidatures").select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return data.map(toCandidature);
}
async function upsertCandidature(c, userId) {
	const row = toRow(c, userId);
	const { data, error } = await supabase.from("candidatures").upsert(row).select().single();
	if (error) throw error;
	return toCandidature(data);
}
async function deleteCandidature(id) {
	const { error } = await supabase.from("candidatures").delete().eq("id", id);
	if (error) throw error;
}
async function insertManyCandidatures(items, userId) {
	if (items.length === 0) return [];
	const { data, error } = await supabase.from("candidatures").insert(items.map((c) => toRow(c, userId))).select();
	if (error) throw error;
	return data.map(toCandidature);
}
//#endregion
export { upsertCandidature as i, fetchCandidatures as n, insertManyCandidatures as r, deleteCandidature as t };
