/** Orchestration côté client : construit les entrées, appelle l'IA, renvoie un MatchScore. */
import { analyserCorrespondance } from "./matching.functions";
import { offreHash, profilHash } from "./matching";
import type { Candidature, MatchScore } from "./candidatures";
import type { Profil } from "./profil";
import { cvStructureEnTexte, normaliserCvStructure } from "./cv-structure";

const ligne = (label: string, v: string) =>
  v?.trim() ? `${label} : ${v.trim()}\n` : "";

export function profilEnTexte(p: Profil): string {
  const criteres = Object.entries(p.criteres ?? {})
    .map(([k, v]) => `${k} (${v})`)
    .join(", ");
  return (
    ligne("Prénom/Nom", `${p.prenom} ${p.nom}`) +
    ligne("Formation", p.formation) +
    ligne("École", p.ecole) +
    ligne("Niveau d'études", p.niveau) +
    ligne("Localisation actuelle", p.localisation) +
    ligne("Mobilité géographique", p.mobilite) +
    ligne("Type de contrat recherché", p.contrats) +
    ligne("Domaines visés", p.domaines) +
    ligne("Métiers visés", p.metiers) +
    ligne("Entreprises ciblées", p.entreprisesCiblees) +
    ligne("Compétences", p.competences) +
    ligne("Logiciels / outils", p.logiciels) +
    ligne("Langues", p.langues) +
    ligne("Niveau d'anglais", p.niveauAnglais) +
    ligne("Expériences", p.experiences) +
    ligne("Télétravail souhaité", p.teletravail) +
    ligne("Rémunération souhaitée", p.remuneration) +
    ligne("Date de début souhaitée", p.dateDebut) +
    ligne("Durée souhaitée", p.duree) +
    ligne("Critères prioritaires", criteres) +
    ligne(
      "CV détaillé",
      cvStructureEnTexte(normaliserCvStructure(p.cvStructure)),
    )
  );
}

export function offreEnTexte(c: Candidature): string {
  return (
    ligne("Entreprise", c.entreprise) +
    ligne("Intitulé du poste", c.poste) +
    ligne("Lieu", c.lieu) +
    ligne("Secteur", c.secteur) +
    ligne("Source", c.source) +
    ligne("Date limite de candidature", c.dateLimite) +
    ligne("Commentaire", c.commentaire) +
    ligne("Détail de l'offre", c.detail)
  );
}

export function offreAnalysable(c: Candidature): boolean {
  return offreEnTexte(c).trim().length >= 30;
}

export async function lancerAnalyse(
  c: Candidature,
  profil: Profil,
): Promise<MatchScore> {
  const analyse = await analyserCorrespondance({
    data: { profil: profilEnTexte(profil), offre: offreEnTexte(c) },
  });

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
    genereLe: new Date().toISOString(),
    profilHash: profilHash(profil),
    offreHash: offreHash(c),
    modele: analyse.modele,
  };
}
