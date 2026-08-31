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
  const envs = (p.environnements ?? []).join(", ");
  const priorites = (p.prioritesRecherche ?? []).join(", ");
  const prefs = p.preferences;
  const prefsTxt = prefs
    ? [
        prefs.secteursPrivilegies?.length ? `Secteurs privilégiés: ${prefs.secteursPrivilegies.join(", ")}` : "",
        prefs.secteursAEviter?.length ? `Secteurs à éviter: ${prefs.secteursAEviter.join(", ")}` : "",
        prefs.entreprisesCibles?.length ? `Entreprises cibles: ${prefs.entreprisesCibles.join(", ")}` : "",
        prefs.taillesEntreprise?.length ? `Tailles d'entreprise: ${prefs.taillesEntreprise.join(", ")}` : "",
        prefs.criteresNonNegociables?.length ? `Critères non négociables: ${prefs.criteresNonNegociables.join(", ")}` : "",
      ].filter(Boolean).join(" | ")
    : "";

  return (
    ligne("Prénom / Nom", `${p.prenom} ${p.nom}`) +
    ligne("Titre professionnel", p.titre || p.cvStructure?.titre || "") +
    ligne("Formation actuelle", p.formation) +
    ligne("École / Université", p.ecole) +
    ligne("Niveau d'études", p.niveau) +
    ligne("Localisation actuelle", [p.localisation, p.pays].filter(Boolean).join(", ")) +
    ligne("Mobilité géographique", p.mobilite) +
    ligne("Type de contrat recherché", p.contrats) +
    ligne("Domaines / Secteurs visés", p.domaines) +
    ligne("Métiers ciblés", p.metiers) +
    ligne("Entreprises ciblées", p.entreprisesCiblees) +
    ligne("Ce que le candidat recherche vraiment (Aspirations)", p.rechercheVraie || "") +
    ligne("Environnements d'entreprise préférés", envs) +
    ligne("Priorités de recherche", priorites) +
    ligne("Préférences & Critères clés", prefsTxt) +
    ligne("Mode de travail souhaité", p.modeTravail || p.teletravail || "") +
    ligne("Rémunération / Gratification souhaitée", p.remuneration) +
    ligne("Date de début souhaitée", p.dateDebut) +
    ligne("Durée souhaitée", p.duree) +
    ligne("Critères prioritaires", criteres) +
    ligne("Compétences déclarées", p.competences) +
    ligne("Logiciels / Outils déclarés", p.logiciels) +
    ligne("Langues", p.langues) +
    ligne("Niveau d'anglais", p.niveauAnglais) +
    ligne("Expériences résumées", p.experiences) +
    ligne(
      "Détail du parcours (Expériences, Formations, Projets, Certifications)",
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
    ligne("Missions clés", c.missions) +
    ligne("Profil & Compétences recherchés", c.profilRecherche) +
    ligne("Modalités", c.modalites) +
    ligne("Commentaire & Conseils", c.commentaire) +
    ligne("Détails supplémentaires", c.detail)
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
