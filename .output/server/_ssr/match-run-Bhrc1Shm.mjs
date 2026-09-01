import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { r as createServerFn } from "./server-vg2yPy0D.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BzNacVbR.mjs";
import { m as normaliserCvStructure, o as cvStructureEnTexte } from "./auth-local-B6tKCByM.mjs";
import { t as createSsrRpc } from "./profil-cloud-GRdvg22b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-run-Bhrc1Shm.js
var Input = object({
	profil: string().min(1),
	offre: string().min(10)
});
var analyserCorrespondance = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => Input.parse(data)).handler(createSsrRpc("2896e34e239084a572794632bb40835f08ef389cdd202ac616d7b85426bd61ef"));
function niveauMatch(score) {
	if (score >= 85) return {
		cle: "excellent",
		label: "Excellent match",
		badge: "border-primary/40 bg-primary/15 text-primary",
		barre: "bg-primary"
	};
	if (score >= 70) return {
		cle: "tres-bon",
		label: "Très bon match",
		badge: "border-primary/25 bg-primary/10 text-primary",
		barre: "bg-primary/80"
	};
	if (score >= 50) return {
		cle: "interessant",
		label: "Match intéressant",
		badge: "border-muted-foreground/25 bg-muted text-foreground",
		barre: "bg-muted-foreground/60"
	};
	return {
		cle: "faible",
		label: "Match faible",
		badge: "border-destructive/30 bg-destructive/10 text-destructive",
		barre: "bg-destructive/70"
	};
}
var RECO_LABELS = {
	postuler: "Postulez",
	postuler_si_interet: "Postulez si l'entreprise vous intéresse",
	secondaire: "Opportunité secondaire",
	peu_prioritaire: "Peu prioritaire"
};
function labelRecommandation(r) {
	if (!r) return "—";
	return RECO_LABELS[r] ?? r;
}
/** Hash stable et court (djb2) — sert à détecter un profil / une offre modifiés. */
function hash(value) {
	let h = 5381;
	for (let i = 0; i < value.length; i++) h = (h << 5) + h + value.charCodeAt(i) | 0;
	return (h >>> 0).toString(36);
}
function profilHash(p) {
	if (!p) return "";
	return hash(JSON.stringify(p));
}
function offreHash(c) {
	return hash([
		c.entreprise,
		c.poste,
		c.lieu,
		c.secteur,
		c.detail,
		c.commentaire
	].join("|"));
}
/** L'analyse existe-t-elle et correspond-elle toujours au profil / à l'offre ? */
function matchObsolete(c, profil) {
	const m = c.match;
	if (!m) return false;
	if (!m.profilHash && !m.offreHash) return false;
	if (m.profilHash && profil && m.profilHash !== profilHash(profil)) return true;
	if (m.offreHash && m.offreHash !== offreHash(c)) return true;
	return false;
}
/** Orchestration côté client : construit les entrées, appelle l'IA, renvoie un MatchScore. */
var ligne = (label, v) => {
	if (typeof v === "string") {
		const s = v.trim();
		return s ? `${label} : ${s}\n` : "";
	}
	if (v !== null && v !== void 0 && typeof v !== "object") {
		const s = String(v).trim();
		return s ? `${label} : ${s}\n` : "";
	}
	return "";
};
function profilEnTexte(p) {
	const criteres = Object.entries(p.criteres ?? {}).map(([k, v]) => `${k} (${v})`).join(", ");
	const envs = (p.environnements ?? []).join(", ");
	const priorites = (p.prioritesRecherche ?? []).join(", ");
	const prefs = p.preferences;
	const prefsTxt = prefs ? [
		prefs.secteursPrivilegies?.length ? `Secteurs privilégiés: ${prefs.secteursPrivilegies.join(", ")}` : "",
		prefs.secteursAEviter?.length ? `Secteurs à éviter: ${prefs.secteursAEviter.join(", ")}` : "",
		prefs.entreprisesCibles?.length ? `Entreprises cibles: ${prefs.entreprisesCibles.join(", ")}` : "",
		prefs.taillesEntreprise?.length ? `Tailles d'entreprise: ${prefs.taillesEntreprise.join(", ")}` : "",
		prefs.criteresNonNegociables?.length ? `Critères non négociables: ${prefs.criteresNonNegociables.join(", ")}` : ""
	].filter(Boolean).join(" | ") : "";
	return ligne("Prénom / Nom", `${p.prenom} ${p.nom}`) + ligne("Titre professionnel", p.titre || p.cvStructure?.titre || "") + ligne("Formation actuelle", p.formation) + ligne("École / Université", p.ecole) + ligne("Niveau d'études", p.niveau) + ligne("Localisation actuelle", [p.localisation, p.pays].filter(Boolean).join(", ")) + ligne("Mobilité géographique", p.mobilite) + ligne("Type de contrat recherché", p.contrats) + ligne("Domaines / Secteurs visés", p.domaines) + ligne("Métiers ciblés", p.metiers) + ligne("Entreprises ciblées", p.entreprisesCiblees) + ligne("Ce que le candidat recherche vraiment (Aspirations)", p.rechercheVraie || "") + ligne("Environnements d'entreprise préférés", envs) + ligne("Priorités de recherche", priorites) + ligne("Préférences & Critères clés", prefsTxt) + ligne("Mode de travail souhaité", p.modeTravail || p.teletravail || "") + ligne("Rémunération / Gratification souhaitée", p.remuneration) + ligne("Date de début souhaitée", p.dateDebut) + ligne("Durée souhaitée", p.duree) + ligne("Critères prioritaires", criteres) + ligne("Compétences déclarées", p.competences) + ligne("Logiciels / Outils déclarés", p.logiciels) + ligne("Langues", p.langues) + ligne("Niveau d'anglais", p.niveauAnglais) + ligne("Expériences résumées", p.experiences) + ligne("Détail du parcours (Expériences, Formations, Projets, Certifications)", cvStructureEnTexte(normaliserCvStructure(p.cvStructure)));
}
function offreEnTexte(c) {
	return ligne("Entreprise", c.entreprise) + ligne("Intitulé du poste", c.poste) + ligne("Lieu", c.lieu) + ligne("Secteur", c.secteur) + ligne("Source", c.source) + ligne("Date limite de candidature", c.dateLimite) + ligne("Missions clés", c.missions) + ligne("Profil & Compétences recherchés", c.profilRecherche) + ligne("Modalités", c.modalites) + ligne("Commentaire & Conseils", c.commentaire) + ligne("Détails supplémentaires", c.detail);
}
function offreAnalysable(c) {
	return offreEnTexte(c).trim().length >= 30;
}
async function lancerAnalyse(c, profil) {
	const analyse = await analyserCorrespondance({ data: {
		profil: profilEnTexte(profil),
		offre: offreEnTexte(c)
	} });
	return {
		global: analyse.global,
		details: analyse.details,
		pointsForts: analyse.pointsForts ?? [],
		vigilance: analyse.vigilance ?? [],
		competencesManquantes: analyse.competences?.nonRenseignees ?? [],
		competences: analyse.competences,
		recommandation: analyse.recommandation,
		explication: analyse.explication ?? "",
		confiance: analyse.confiance,
		confianceRaison: analyse.confianceRaison ?? "",
		genereLe: (/* @__PURE__ */ new Date()).toISOString(),
		profilHash: profilHash(profil),
		offreHash: offreHash(c),
		modele: analyse.modele
	};
}
//#endregion
export { offreAnalysable as a, niveauMatch as i, lancerAnalyse as n, offreEnTexte as o, matchObsolete as r, profilEnTexte as s, labelRecommandation as t };
