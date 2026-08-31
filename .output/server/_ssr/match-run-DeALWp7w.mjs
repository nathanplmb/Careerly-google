import { f as object, p as string } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
import { C as normaliserCvStructure, S as cvStructureEnTexte } from "./router-AVT1AZP0.mjs";
import { r as createServerFn } from "./server-D8ETlJSB.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CU_jJy1z.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CkNRMsgU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-run-DeALWp7w.js
var Input = object({
	profil: string().min(1),
	offre: string().min(10)
});
var analyserCorrespondance = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => Input.parse(data)).handler(createSsrRpc("2896e34e239084a572794632bb40835f08ef389cdd202ac616d7b85426bd61ef"));
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
var ligne = (label, v) => v?.trim() ? `${label} : ${v.trim()}\n` : "";
function profilEnTexte(p) {
	const criteres = Object.entries(p.criteres ?? {}).map(([k, v]) => `${k} (${v})`).join(", ");
	return ligne("Prénom/Nom", `${p.prenom} ${p.nom}`) + ligne("Formation", p.formation) + ligne("École", p.ecole) + ligne("Niveau d'études", p.niveau) + ligne("Localisation actuelle", p.localisation) + ligne("Mobilité géographique", p.mobilite) + ligne("Type de contrat recherché", p.contrats) + ligne("Domaines visés", p.domaines) + ligne("Métiers visés", p.metiers) + ligne("Entreprises ciblées", p.entreprisesCiblees) + ligne("Compétences", p.competences) + ligne("Logiciels / outils", p.logiciels) + ligne("Langues", p.langues) + ligne("Niveau d'anglais", p.niveauAnglais) + ligne("Expériences", p.experiences) + ligne("Télétravail souhaité", p.teletravail) + ligne("Rémunération souhaitée", p.remuneration) + ligne("Date de début souhaitée", p.dateDebut) + ligne("Durée souhaitée", p.duree) + ligne("Critères prioritaires", criteres) + ligne("CV détaillé", cvStructureEnTexte(normaliserCvStructure(p.cvStructure)));
}
function offreEnTexte(c) {
	return ligne("Entreprise", c.entreprise) + ligne("Intitulé du poste", c.poste) + ligne("Lieu", c.lieu) + ligne("Secteur", c.secteur) + ligne("Source", c.source) + ligne("Date limite de candidature", c.dateLimite) + ligne("Commentaire", c.commentaire) + ligne("Détail de l'offre", c.detail);
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
