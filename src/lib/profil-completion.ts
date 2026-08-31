import type { Profil } from "./profil";

export type SuggestionCompletude = {
  id: string;
  titre: string;
  tab: string;
  gain: number;
};

export type BilanCompletude = {
  score: number;
  label: string;
  badgeColor: string;
  suggestions: SuggestionCompletude[];
};

export function calculerCompletudeProfil(p: Profil): BilanCompletude {
  let score = 0;
  const suggestions: SuggestionCompletude[] = [];

  // Identité & Formation (25 points)
  if (p.prenom.trim() && p.nom.trim()) {
    score += 10;
  } else {
    suggestions.push({
      id: "identite",
      titre: "Renseigner votre prénom et nom",
      tab: "formation",
      gain: 10,
    });
  }

  if (p.formation.trim() || p.ecole.trim()) {
    score += 15;
  } else {
    suggestions.push({
      id: "formation",
      titre: "Préciser votre école et formation",
      tab: "formation",
      gain: 15,
    });
  }

  // Recherche & Objectifs (25 points)
  if (p.metiers.trim()) {
    score += 10;
  } else {
    suggestions.push({
      id: "metiers",
      titre: "Ajouter vos métiers cibles",
      tab: "recherche",
      gain: 10,
    });
  }

  if (p.domaines.trim() || p.entreprisesCiblees.trim()) {
    score += 10;
  } else {
    suggestions.push({
      id: "domaines",
      titre: "Indiquer vos secteurs ou entreprises visés",
      tab: "recherche",
      gain: 10,
    });
  }

  if (p.localisation.trim() || p.mobilite.trim()) {
    score += 5;
  } else {
    suggestions.push({
      id: "localisation",
      titre: "Définir votre localisation souhaitée",
      tab: "recherche",
      gain: 5,
    });
  }

  // Compétences & Outils (25 points)
  if (p.competences.trim()) {
    score += 10;
  } else {
    suggestions.push({
      id: "competences",
      titre: "Lister vos compétences clés",
      tab: "competences",
      gain: 10,
    });
  }

  if (p.logiciels.trim()) {
    score += 8;
  } else {
    suggestions.push({
      id: "logiciels",
      titre: "Ajouter les logiciels maîtrisés",
      tab: "competences",
      gain: 8,
    });
  }

  if (p.langues.trim() || p.niveauAnglais.trim()) {
    score += 7;
  } else {
    suggestions.push({
      id: "langues",
      titre: "Indiquer votre niveau de langues",
      tab: "competences",
      gain: 7,
    });
  }

  // CV Structuré ou Critères (25 points)
  const cv = p.cvStructure;
  const aCvDetails =
    (cv?.experiences?.length ?? 0) > 0 ||
    (cv?.formations?.length ?? 0) > 0 ||
    (cv?.competences?.length ?? 0) > 0 ||
    Boolean(p.experiences?.trim());

  if (aCvDetails) {
    score += 15;
  } else {
    suggestions.push({
      id: "cv",
      titre: "Remplir votre CV structuré ou vos expériences",
      tab: "cv",
      gain: 15,
    });
  }

  if (p.criteres && Object.keys(p.criteres).length >= 3) {
    score += 10;
  } else {
    suggestions.push({
      id: "criteres",
      titre: "Ajuster vos priorités de matching",
      tab: "criteres",
      gain: 10,
    });
  }

  const scoreFinal = Math.min(100, score);

  let label = "Profil initial";
  let badgeColor =
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
  if (scoreFinal >= 90) {
    label = "Profil Expert • Matching IA maximal";
    badgeColor =
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  } else if (scoreFinal >= 70) {
    label = "Profil Avancé • Matching optimisé";
    badgeColor =
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  } else if (scoreFinal >= 45) {
    label = "Profil Intermédiaire";
    badgeColor =
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
  }

  return {
    score: scoreFinal,
    label,
    badgeColor,
    suggestions: suggestions.slice(0, 3),
  };
}
