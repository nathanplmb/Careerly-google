import { n as supabase, t as isSupabaseConfigured } from "./client-6jjz1ame.mjs";
import { a as getServerFnById, t as TSS_SERVER_FUNCTION } from "./server-vg2yPy0D.mjs";
import { c as doc, n as getDoc, o as setDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { c as emptyProfil, f as isFirebaseConfigured, m as normaliserCvStructure, s as db } from "./auth-local-B6tKCByM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-cloud-GRdvg22b.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function toProfil(r) {
	const base = emptyProfil();
	const cvStructure = normaliserCvStructure(r.cv_structure);
	return {
		...base,
		prenom: r.prenom ?? "",
		nom: r.nom ?? "",
		titre: cvStructure.titre || "",
		formation: r.formation ?? base.formation,
		ecole: r.ecole ?? base.ecole,
		niveau: r.niveau ?? base.niveau,
		localisation: r.localisation ?? "",
		pays: cvStructure.pays || "France",
		mobilite: r.mobilite ?? "",
		contrats: r.contrats ?? base.contrats,
		domaines: r.domaines ?? "",
		metiers: r.metiers ?? "",
		entreprisesCiblees: r.entreprises_ciblees ?? "",
		competences: r.competences ?? "",
		logiciels: r.logiciels ?? "",
		langues: r.langues ?? "",
		niveauAnglais: r.niveau_anglais ?? "",
		experiences: r.experiences ?? "",
		teletravail: r.teletravail ?? "",
		modeTravail: cvStructure.preferences?.teletravailPrefere || (r.teletravail?.includes("100%") ? "teletravail" : "hybride"),
		remuneration: r.remuneration ?? "",
		dateDebut: r.date_debut ?? "",
		duree: r.duree ?? "",
		rechercheVraie: cvStructure?.rechercheVraie || "",
		environnements: cvStructure?.environnements || ["Grand groupe", "Scale-up"],
		prioritesRecherche: cvStructure?.prioritesRecherche || ["Missions apprenantes", "Mentorat / Équipe"],
		emailContact: cvStructure.email || "",
		telephone: cvStructure.telephone || "",
		linkedin: cvStructure.linkedin || "",
		portfolio: cvStructure.portfolio || "",
		github: cvStructure.github || "",
		permis: cvStructure.permis || "",
		photoUrl: cvStructure.photoUrl || "",
		criteres: r.criteres ?? base.criteres,
		cv: r.cv ?? null,
		cvStructure,
		preferences: cvStructure.preferences,
		syntheseIa: cvStructure.syntheseIa
	};
}
function toRow(p, userId) {
	const cvStructure = normaliserCvStructure({
		...p.cvStructure,
		titre: p.titre || p.cvStructure.titre,
		email: p.emailContact || p.cvStructure.email,
		telephone: p.telephone || p.cvStructure.telephone,
		linkedin: p.linkedin || p.cvStructure.linkedin,
		portfolio: p.portfolio || p.cvStructure.portfolio,
		github: p.github || p.cvStructure.github,
		permis: p.permis || p.cvStructure.permis,
		photoUrl: p.photoUrl || p.cvStructure.photoUrl,
		ville: p.localisation || p.cvStructure.ville,
		pays: p.pays || p.cvStructure.pays,
		preferences: {
			...p.cvStructure.preferences,
			...p.preferences,
			teletravailPrefere: p.modeTravail || p.cvStructure.preferences?.teletravailPrefere || "hybride"
		},
		syntheseIa: p.syntheseIa || p.cvStructure.syntheseIa,
		...p.rechercheVraie ? { rechercheVraie: p.rechercheVraie } : {},
		...p.environnements ? { environnements: p.environnements } : {},
		...p.prioritesRecherche ? { prioritesRecherche: p.prioritesRecherche } : {}
	});
	return {
		user_id: userId,
		prenom: p.prenom,
		nom: p.nom,
		formation: p.formation,
		ecole: p.ecole,
		niveau: p.niveau,
		localisation: p.localisation,
		mobilite: p.mobilite,
		contrats: p.contrats,
		domaines: p.domaines,
		metiers: p.metiers,
		entreprises_ciblees: p.entreprisesCiblees,
		competences: p.competences,
		logiciels: p.logiciels,
		langues: p.langues,
		niveau_anglais: p.niveauAnglais,
		experiences: p.experiences,
		teletravail: p.teletravail,
		remuneration: p.remuneration,
		date_debut: p.dateDebut || null,
		duree: p.duree,
		criteres: p.criteres,
		cv: p.cv ?? null,
		cv_structure: cvStructure,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function fetchProfil(userId) {
	if (isFirebaseConfigured() && userId) try {
		const snap = await getDoc(doc(db, "profils", userId));
		if (snap.exists()) return toProfil(snap.data());
	} catch (e) {
		console.warn("Firestore fetchProfil error:", e);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("profils").select("*").maybeSingle();
		if (error) throw error;
		return data ? toProfil(data) : null;
	}
	return null;
}
async function saveProfilCloud(p, userId) {
	const rowData = toRow(p, userId);
	if (isFirebaseConfigured()) try {
		await setDoc(doc(db, "profils", userId), rowData, { merge: true });
		return toProfil(rowData);
	} catch (e) {
		console.warn("Firestore saveProfilCloud error:", e);
	}
	if (isSupabaseConfigured()) {
		const { data, error } = await supabase.from("profils").upsert(rowData, { onConflict: "user_id" }).select().single();
		if (error) throw error;
		return toProfil(data);
	}
	return p;
}
//#endregion
export { fetchProfil as n, saveProfilCloud as r, createSsrRpc as t };
