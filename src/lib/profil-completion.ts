import type { Profil } from "./profil";

export type StatutCategorie = "complet" | "a_ameliorer" | "manquant";

export type CategorieEvaluation = {
  id: string;
  nom: string;
  tab: string;
  statut: StatutCategorie;
  points: number;
  maxPoints: number;
  detail: string;
};

export type SuggestionCompletude = {
  id: string;
  titre: string;
  tab: string;
  gain: number;
  conseil: string;
};

export type BilanCompletude = {
  score: number;
  label: string;
  badgeColor: string;
  categories: CategorieEvaluation[];
  suggestions: SuggestionCompletude[];
  nbComplets: number;
  nbTotal: number;
};

export function calculerCompletudeProfil(p: Profil): BilanCompletude {
  const cv = p.cvStructure;
  const categories: CategorieEvaluation[] = [];
  const suggestions: SuggestionCompletude[] = [];

  // 1. Identité & Coordonnées (15 pts)
  const aNom = Boolean(p.prenom?.trim() && p.nom?.trim());
  const aContact = Boolean(
    (p.emailContact || cv?.email)?.trim() &&
    (p.telephone || cv?.telephone)?.trim(),
  );
  const aTitre = Boolean((p.titre || cv?.titre)?.trim());
  const aLoc = Boolean((p.localisation || cv?.ville)?.trim());

  let ptsIdentite = 0;
  if (aNom) ptsIdentite += 6;
  if (aContact) ptsIdentite += 4;
  if (aTitre) ptsIdentite += 3;
  if (aLoc) ptsIdentite += 2;

  const statIdentite: StatutCategorie =
    ptsIdentite >= 13
      ? "complet"
      : ptsIdentite >= 6
        ? "a_ameliorer"
        : "manquant";

  categories.push({
    id: "identite",
    nom: "Identité & Contact",
    tab: "identite",
    statut: statIdentite,
    points: ptsIdentite,
    maxPoints: 15,
    detail:
      aNom && aTitre
        ? `${p.prenom} ${p.nom} • ${p.titre || cv?.titre}`
        : "Nom, titre & contacts à compléter",
  });

  if (ptsIdentite < 13) {
    suggestions.push({
      id: "identite_sug",
      titre: "Ajoutez votre titre professionnel et coordonnées complètes",
      tab: "identite",
      gain: 15 - ptsIdentite,
      conseil:
        "Un titre précis (ex: 'Étudiant PGE M1 | Recherche de stage Bras Droit') oriente directement les propositions de l'IA.",
    });
  }

  // 2. Objectifs & Préférences (15 pts)
  const aMetiers = Boolean(
    p.metiers?.trim() || p.preferences?.metiersPrivilegies?.length,
  );
  const aDomaines = Boolean(
    p.domaines?.trim() || p.preferences?.secteursPrivilegies?.length,
  );
  const aContrat = Boolean(p.contrats?.trim());
  const aAspirations = Boolean(p.rechercheVraie?.trim());
  const aDispo = Boolean(p.dateDebut?.trim() || p.duree?.trim());

  let ptsRecherche = 0;
  if (aMetiers) ptsRecherche += 5;
  if (aDomaines) ptsRecherche += 3;
  if (aContrat) ptsRecherche += 2;
  if (aAspirations) ptsRecherche += 3;
  if (aDispo) ptsRecherche += 2;

  const statRecherche: StatutCategorie =
    ptsRecherche >= 13
      ? "complet"
      : ptsRecherche >= 6
        ? "a_ameliorer"
        : "manquant";

  categories.push({
    id: "preferences",
    nom: "Objectifs & Préférences",
    tab: "preferences",
    statut: statRecherche,
    points: ptsRecherche,
    maxPoints: 15,
    detail: aMetiers
      ? `${p.metiers || p.preferences?.metiersPrivilegies?.join(", ")} (${p.contrats || "Stage"})`
      : "Métiers cibles & type de contrat",
  });

  if (ptsRecherche < 13) {
    suggestions.push({
      id: "recherche_sug",
      titre: "Précisez vos aspirations dans « Ce que je recherche vraiment »",
      tab: "preferences",
      gain: 15 - ptsRecherche,
      conseil:
        "L'IA utilise ce texte pour personnaliser les lettres et recommander des opportunités uniques.",
    });
  }

  // 3. Expériences Professionnelles (20 pts)
  const nbExp = cv?.experiences?.length ?? 0;
  const aExpSimple = Boolean(p.experiences?.trim());
  let ptsExp = 0;

  if (nbExp >= 2) {
    const aRealisationsCles = cv.experiences.some(
      (e) =>
        e.kpi?.trim() ||
        e.realisationsCles?.trim() ||
        (e.realisations && e.realisations.length > 0),
    );
    ptsExp = aRealisationsCles ? 20 : 16;
  } else if (nbExp === 1) {
    const e = cv.experiences?.[0];
    ptsExp =
      e?.kpi ||
      e?.realisationsCles ||
      (e?.realisations && e.realisations.length > 0)
        ? 15
        : 10;
  } else if (aExpSimple) {
    ptsExp = 8;
  }

  const statExp: StatutCategorie =
    ptsExp >= 16 ? "complet" : ptsExp >= 8 ? "a_ameliorer" : "manquant";

  categories.push({
    id: "experiences",
    nom: "Expériences professionnelles",
    tab: "parcours",
    statut: statExp,
    points: ptsExp,
    maxPoints: 20,
    detail:
      nbExp > 0
        ? `${nbExp} expérience(s) enregistrée(s)`
        : aExpSimple
          ? "Texte brut saisi"
          : "Aucune expérience",
  });

  if (ptsExp < 16) {
    suggestions.push({
      id: "exp_sug",
      titre: "Ajoutez vos réalisations chiffrées (KPI) dans vos expériences",
      tab: "parcours",
      gain: 20 - ptsExp,
      conseil:
        "Les bullets d'impact (ex: '+25% de conversion', '10 000 utilisateurs') boostent radicalement le score ATS.",
    });
  }

  // 4. Formations & Études (15 pts)
  const nbFormations = cv?.formations?.length ?? 0;
  const aFormationSimple = Boolean(p.formation?.trim() || p.ecole?.trim());
  let ptsFormation = 0;

  if (nbFormations >= 2) ptsFormation = 15;
  else if (nbFormations === 1) {
    const f = cv.formations?.[0];
    ptsFormation =
      f?.specialisation || (f?.coursImportants && f.coursImportants.length > 0)
        ? 14
        : 11;
  } else if (aFormationSimple) {
    ptsFormation = 8;
  }

  const statFormation: StatutCategorie =
    ptsFormation >= 13
      ? "complet"
      : ptsFormation >= 6
        ? "a_ameliorer"
        : "manquant";

  categories.push({
    id: "formation",
    nom: "Études & Formations",
    tab: "parcours",
    statut: statFormation,
    points: ptsFormation,
    maxPoints: 15,
    detail:
      nbFormations > 0
        ? `${nbFormations} formation(s) enregistrée(s)`
        : p.formation || "Aucune formation",
  });

  // 5. Compétences & Outils (15 pts)
  const nbCompStruct = cv?.competences?.length ?? 0;
  const aCompBrut = Boolean(p.competences?.trim() || p.logiciels?.trim());
  let ptsComp = 0;

  if (nbCompStruct >= 8) ptsComp = 15;
  else if (nbCompStruct >= 4) ptsComp = 12;
  else if (nbCompStruct > 0) ptsComp = 8;
  else if (aCompBrut) ptsComp = 7;

  const statComp: StatutCategorie =
    ptsComp >= 12 ? "complet" : ptsComp >= 6 ? "a_ameliorer" : "manquant";

  categories.push({
    id: "competences",
    nom: "Compétences & Outils",
    tab: "competences",
    statut: statComp,
    points: ptsComp,
    maxPoints: 15,
    detail:
      nbCompStruct > 0
        ? `${nbCompStruct} compétence(s) qualifiée(s)`
        : aCompBrut
          ? "Compétences saisies en texte"
          : "Aucune compétence",
  });

  if (ptsComp < 12) {
    suggestions.push({
      id: "comp_sug",
      titre: "Qualifiez vos Hard Skills, Outils et Méthodes avec leur niveau",
      tab: "competences",
      gain: 15 - ptsComp,
      conseil:
        "Sélectionnez votre niveau (Débutant à Expert) pour un calcul de compatibilité ultra précis.",
    });
  }

  // 6. Langues (5 pts)
  const nbLangues = cv?.langues?.length ?? 0;
  const aLangueBrut = Boolean(p.langues?.trim() || p.niveauAnglais?.trim());
  let ptsLangues = 0;

  if (nbLangues >= 2) ptsLangues = 5;
  else if (nbLangues === 1) ptsLangues = 4;
  else if (aLangueBrut) ptsLangues = 3;

  const statLangues: StatutCategorie =
    ptsLangues >= 4 ? "complet" : ptsLangues >= 2 ? "a_ameliorer" : "manquant";

  categories.push({
    id: "langues",
    nom: "Langues",
    tab: "langues",
    statut: statLangues,
    points: ptsLangues,
    maxPoints: 5,
    detail:
      nbLangues > 0
        ? `${nbLangues} langue(s) avec niveau CECRL`
        : aLangueBrut
          ? "Langues déclarées"
          : "Non renseigné",
  });

  // 7. Certifications Professionnelles (5 pts)
  const nbCertifs = cv?.certifications?.length ?? 0;
  let ptsCertifs = 0;
  if (nbCertifs >= 2) ptsCertifs = 5;
  else if (nbCertifs === 1) ptsCertifs = 4;

  const statCertifs: StatutCategorie =
    ptsCertifs >= 4 ? "complet" : ptsCertifs >= 2 ? "a_ameliorer" : "manquant";

  categories.push({
    id: "certifications",
    nom: "Certifications",
    tab: "certifications",
    statut: statCertifs,
    points: ptsCertifs,
    maxPoints: 5,
    detail:
      nbCertifs > 0
        ? `${nbCertifs} certification(s) validée(s)`
        : "AMF, Bloomberg, Google, AWS...",
  });

  // 8. Projets & Engagements (5 pts)
  const nbProjets = cv?.projets?.length ?? 0;
  const nbBenevolat = cv?.benevolats?.length ?? 0;
  const nbDistinctions = cv?.distinctions?.length ?? 0;
  let ptsProjets = 0;
  if (nbProjets > 0 || nbBenevolat > 0 || nbDistinctions > 0) ptsProjets = 5;

  const statProjets: StatutCategorie =
    ptsProjets >= 5 ? "complet" : "a_ameliorer";

  categories.push({
    id: "projets",
    nom: "Projets & Engagements",
    tab: "projets",
    statut: statProjets,
    points: ptsProjets,
    maxPoints: 5,
    detail: `${nbProjets} projet(s) • ${nbBenevolat} engagement(s)`,
  });

  // 9. Documents & CV (5 pts)
  const aCv = Boolean(p.cv || cv?.documents?.length);
  const ptsDocs = aCv ? 5 : 0;
  const statDocs: StatutCategorie = aCv ? "complet" : "manquant";

  categories.push({
    id: "documents",
    nom: "Documents & CV",
    tab: "documents",
    statut: statDocs,
    points: ptsDocs,
    maxPoints: 5,
    detail: aCv ? "CV principal disponible" : "Aucun document importé",
  });

  if (!aCv) {
    suggestions.push({
      id: "doc_sug",
      titre: "Importez votre CV PDF pour extraction automatique des données",
      tab: "documents",
      gain: 5,
      conseil:
        "L'importation de CV pré-remplit instantanément l'ensemble de votre dossier candidat.",
    });
  }

  const totalPoints = categories.reduce((sum, c) => sum + c.points, 0);
  const scoreFinal = Math.min(100, Math.max(0, totalPoints));

  let label = "Profil Découverte";
  let badgeColor =
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";

  if (scoreFinal >= 90) {
    label = "Profil Master • Matching IA optimal";
    badgeColor =
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  } else if (scoreFinal >= 75) {
    label = "Profil Avancé • Forte visibilité";
    badgeColor =
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
  } else if (scoreFinal >= 50) {
    label = "Profil Intermédiaire";
    badgeColor =
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  }

  const nbComplets = categories.filter((c) => c.statut === "complet").length;

  return {
    score: scoreFinal,
    label,
    badgeColor,
    categories,
    suggestions: suggestions.sort((a, b) => b.gain - a.gain).slice(0, 4),
    nbComplets,
    nbTotal: categories.length,
  };
}
