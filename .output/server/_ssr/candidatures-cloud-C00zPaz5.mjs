import { n as supabase, t as isSupabaseConfigured } from "./client-DnkKuJ6q.mjs";
import "../_libs/firebase.mjs";
import { a as query, c as doc, i as getDocs, o as setDoc, s as collection, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { c as db, p as isFirebaseConfigured } from "./Logo-C8Jjp8M3.mjs";
import { l as emptyPreparation, m as normalizeCandidature } from "./candidatures-CZEj3mXa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/candidatures-cloud-C00zPaz5.js
function toCandidature(r) {
	const match = r.match && typeof r.match === "object" && "global" in r.match ? r.match : null;
	const prepRaw = r.preparation ?? {};
	const preparation = {
		...emptyPreparation(),
		...prepRaw
	};
	const rawObj = r;
	const rawEvents = r.workflow_events || rawObj.workflowEvents || [];
	const rawStep = r.current_workflow_step || rawObj.currentWorkflowStep;
	return normalizeCandidature({
		id: r.id,
		entreprise: r.entreprise ?? "",
		poste: r.poste ?? "",
		statut: r.statut,
		currentWorkflowStep: rawStep,
		workflowEvents: Array.isArray(rawEvents) ? rawEvents : void 0,
		savedAt: r.saved_at ?? rawObj.savedAt,
		preparedAt: r.prepared_at ?? rawObj.preparedAt,
		interviewDate: r.interview_date ?? rawObj.interviewDate,
		secondInterviewDate: r.second_interview_date ?? rawObj.secondInterviewDate,
		offerReceivedAt: r.offer_received_at ?? rawObj.offerReceivedAt,
		acceptedAt: r.accepted_at ?? rawObj.acceptedAt,
		rejectedAt: r.rejected_at ?? rawObj.rejectedAt,
		lieu: r.lieu ?? "",
		lien: r.lien ?? "",
		contact: r.contact ?? "",
		dateEnvoi: r.date_envoi ?? "",
		dateRelance: r.date_relance ?? "",
		dateDernierContact: r.date_dernier_contact ?? "",
		dateLimite: r.date_limite ?? "",
		commentaire: r.commentaire ?? "",
		missions: prepRaw["missions"] ?? "",
		profilRecherche: prepRaw["profilRecherche"] ?? "",
		modalites: prepRaw["modalites"] ?? "",
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
		id: isUuid(c.id) ? c.id : c.id || crypto.randomUUID(),
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
		preparation: {
			...c.preparation,
			missions: c["missions"],
			profilRecherche: c["profilRecherche"],
			modalites: c["modalites"]
		},
		current_workflow_step: c.currentWorkflowStep || null,
		workflow_events: c.workflowEvents || [],
		saved_at: c.savedAt || null,
		prepared_at: c.preparedAt || null,
		interview_date: c.interviewDate || null,
		second_interview_date: c.secondInterviewDate || null,
		offer_received_at: c.offerReceivedAt || null,
		accepted_at: c.acceptedAt || null,
		rejected_at: c.rejectedAt || null
	};
}
async function fetchCandidatures(userId) {
	if (isFirebaseConfigured() && userId) try {
		const colRef = collection(db, "users", userId, "candidatures");
		const snap = await getDocs(query(colRef));
		const list = [];
		snap.forEach((docSnap) => {
			list.push(toCandidature({
				id: docSnap.id,
				...docSnap.data()
			}));
		});
		return list;
	} catch (e) {
		console.warn("Firestore fetchCandidatures error:", e);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("candidatures").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data.map(toCandidature);
	}
	return [];
}
async function upsertCandidature(c, userId) {
	const row = toRow(c, userId);
	if (isFirebaseConfigured() && userId) try {
		const docRef = doc(db, "users", userId, "candidatures", row.id);
		await setDoc(docRef, row, { merge: true });
		return toCandidature(row);
	} catch (e) {
		console.warn("Firestore upsertCandidature error:", e);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("candidatures").upsert(row).select().single();
		if (error) throw error;
		return toCandidature(data);
	}
	return c;
}
async function deleteCandidature(id, userId) {
	if (isFirebaseConfigured() && userId) try {
		const docRef = doc(db, "users", userId, "candidatures", id);
		await deleteDoc(docRef);
		return;
	} catch (e) {
		console.warn("Firestore deleteCandidature error:", e);
	}
	if (isSupabaseConfigured()) {
		const { error } = await supabase.from("candidatures").delete().eq("id", id);
		if (error) throw error;
	}
}
//#endregion
export { fetchCandidatures as n, upsertCandidature as r, deleteCandidature as t };
