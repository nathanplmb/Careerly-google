import { n as supabase } from "./client-DnkKuJ6q.mjs";
import { C as normaliserCvStructure, g as emptyProfil } from "./router-AVT1AZP0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profil-cloud-DZIUduAY.js
function toProfil(r) {
	const base = emptyProfil();
	return {
		...base,
		prenom: r.prenom ?? "",
		nom: r.nom ?? "",
		formation: r.formation ?? base.formation,
		ecole: r.ecole ?? base.ecole,
		niveau: r.niveau ?? base.niveau,
		localisation: r.localisation ?? "",
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
		remuneration: r.remuneration ?? "",
		dateDebut: r.date_debut ?? "",
		duree: r.duree ?? "",
		criteres: r.criteres ?? base.criteres,
		cv: r.cv ?? null,
		cvStructure: normaliserCvStructure(r.cv_structure)
	};
}
function toRow(p, userId) {
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
		cv_structure: p.cvStructure ?? null
	};
}
async function fetchProfil() {
	const { data, error } = await supabase.from("profils").select("*").maybeSingle();
	if (error) throw error;
	return data ? toProfil(data) : null;
}
async function saveProfilCloud(p, userId) {
	const { data, error } = await supabase.from("profils").upsert(toRow(p, userId), { onConflict: "user_id" }).select().single();
	if (error) throw error;
	return toProfil(data);
}
//#endregion
export { saveProfilCloud as n, fetchProfil as t };
