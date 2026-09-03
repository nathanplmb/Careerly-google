import { n as supabase, t as isSupabaseConfigured } from "./client-DnkKuJ6q.mjs";
import "../_libs/firebase.mjs";
import { a as query, c as doc, i as getDocs, o as setDoc, s as collection, t as deleteDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { c as db, p as isFirebaseConfigured } from "./Logo-C8Jjp8M3.mjs";
import { a as emptyContact } from "./contacts-BJIEa8pT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-cloud-dBFwL0C4.js
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
		id: c.id || crypto.randomUUID(),
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
	const row = toRow(c, userId);
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
//#endregion
export { fetchContacts as n, upsertContact as r, deleteContact as t };
