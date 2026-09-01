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
    nom: "Identité & Coordonnées",
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

  // 2. Objectifs & Ma Recherche (15 pts)
  const aMetiers = Boolean(p.metiers?.trim());
  const aDomaines = Boolean(p.domaines?.trim());
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
    id: "recherche",
    nom: "Ma recherche & Aspirations",
    tab: "recherche",
    statut: statRecherche,
    points: ptsRecherche,
    maxPoints: 15,
    detail: aMetiers
      ? `${p.metiers} (${p.contrats || "Stage"})`
      : "Métiers cibles & type de contrat",
  });

  if (ptsRecherche < 13) {
    suggestions.push({
      id: "recherche_sug",
      titre: "Précisez vos aspirations dans « Ce que je recherche vraiment »",
      tab: "recherche",
      gain: 15 - ptsRecherche,
      conseil:
        "L'IA utilise ce texte pour personnaliser les lettres et recommander des opportunités uniques.",
    });
  }

  // 3. Formations & Études (15 pts)
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
    tab: "formation",
    statut: statFormation,
    points: ptsFormation,
    maxPoints: 15,
    detail:
      nbFormations > 0
        ? `${nbFormations} formation(s) enregistrée(s)`
        : p.formation || "Aucune formation",
  });

  if (ptsFormation < 13) {
    suggestions.push({
      id: "formation_sug",
      titre: "Détaillez vos formations, spécialisations et cours clés",
      tab: "formation",
      gain: 15 - ptsFormation,
      conseil:
        "Les recruteurs et le Match IA accordent une forte valeur aux matières clés et projets académiques.",
    });
  }

  // 4. Expériences Professionnelles (20 pts)
  const nbExp = cv?.experiences?.length ?? 0;
  const aExpSimple = Boolean(p.experiences?.trim());
  let ptsExp = 0;

  if (nbExp >= 2) {
    const aRealisationsCles = cv.experiences.some(
      (e) =>
        e.kpi?.trim() ||
        e.realisationsCles?.trim() ||
        e.realisations.length > 0,
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
    tab: "experiences",
    statut: statExp,
    points: ptsExp,
    maxPoints: 20,
    detail:
      nbExp > 0
        ? `${nbExp} expérience(s) structurée(s)`
        : aExpSimple
          ? "Texte brut saisi"
          : "Aucune expérience",
  });

  if (ptsExp < 16) {
    suggestions.push({
      id: "exp_sug",
      titre: "Ajoutez vos réalisations chiffrées (KPI) dans vos expériences",
      tab: "experiences",
      gain: 20 - ptsExp,
      conseil:
        "Les bullets d'impact (ex: '+25% de conversion', '10 000 utilisateurs') boostent radicalement le score ATS.",
    });
  }

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

  if (ptsLangues < 4) {
    suggestions.push({
      id: "langues_sug",
      titre:
        "Indiquez votre niveau d'anglais et certifications (TOEIC, IELTS...)",
      tab: "langues",
      gain: 5 - ptsLangues,
      conseil:
        "Un score officiel (ex: TOEIC 900+) est un atout déterminant pour les recruteurs.",
    });
  }

  // 7. Certifications & Projets (5 pts)
  const nbCertifs = cv?.certifications?.length ?? 0;
  const nbProjets = cv?.projets?.length ?? 0;
  let ptsProjets = 0;
  if (nbCertifs > 0 && nbProjets > 0) ptsProjets = 5;
  else if (nbCertifs > 0 || nbProjets > 0) ptsProjets = 3;

  const statProjets: StatutCategorie =
    ptsProjets >= 5 ? "complet" : ptsProjets >= 2 ? "a_ameliorer" : "manquant";

  categories.push({
    id: "projets",
    nom: "Certifications & Projets",
    tab: "projets",
    statut: statProjets,
    points: ptsProjets,
    maxPoints: 5,
    detail: `${nbCertifs} certif(s) • ${nbProjets} projet(s)`,
  });

  if (ptsProjets < 4) {
    suggestions.push({
      id: "projets_sug",
      titre: "Ajoutez vos projets personnels, hackathons ou certifications",
      tab: "projets",
      gain: 5 - ptsProjets,
      conseil:
        "Les projets concrets prouvent vos compétences pratiques bien avant l'entretien.",
    });
  }

  // 8. Engagements & Distinctions (5 pts)
  const nbBenevolat = cv?.benevolats?.length ?? 0;
  const nbDistinctions = cv?.distinctions?.length ?? 0;
  let ptsEngagements = 0;
  if (nbBenevolat > 0 || nbDistinctions > 0) ptsEngagements = 5;

  const statEngagements: StatutCategorie =
    ptsEngagements >= 5 ? "complet" : "a_ameliorer";

  categories.push({
    id: "engagements",
    nom: "Associations & Distinctions",
    tab: "engagements",
    statut: statEngagements,
    points: ptsEngagements,
    maxPoints: 5,
    detail: `${nbBenevolat} engagement(s) • ${nbDistinctions} distinction(s)`,
  });

  // 9. Préférences & Critères (5 pts)
  const nbCriteres = Object.keys(p.criteres ?? {}).length;
  const aPrefs = Boolean(
    p.preferences?.secteursPrivilegies?.length ||
    p.preferences?.taillesEntreprise?.length,
  );
  let ptsPrefs = 0;
  if (nbCriteres >= 4 || aPrefs) ptsPrefs = 5;
  else if (nbCriteres >= 1) ptsPrefs = 3;

  const statPrefs: StatutCategorie =
    ptsPrefs >= 4 ? "complet" : ptsPrefs >= 2 ? "a_ameliorer" : "manquant";

  categories.push({
    id: "preferences",
    nom: "Critères & Préférences",
    tab: "preferences",
    statut: statPrefs,
    points: ptsPrefs,
    maxPoints: 5,
    detail: `${nbCriteres} critère(s) pondéré(s)`,
  });

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
