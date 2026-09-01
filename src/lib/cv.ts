/** Modèle et helpers du CV Intelligence Engine (Audit, Extraction, Comparaison 2-voies et Optimisation). */

import type {
  CvStructure,
  ExperienceCV,
  FormationCV,
  CompetenceCV,
  LangueCV,
  CertificationCV,
  ProjetCV,
  BenevolatCV,
} from "./cv-structure";

export type ScoreCV = {
  critere: string;
  score: number;
  explication: string;
};

export type CorrectionCV = {
  titre: string;
  conseil: string;
  priorite: "haute" | "moyenne" | "basse";
};

export type ReformulationCV = {
  avant: string;
  apres: string;
};

export type ProfilDetecte = {
  prenom?: string;
  nom?: string;
  titre?: string;
  email?: string;
  telephone?: string;
  localisation?: string;
  pays?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  permis?: string;
  accroche?: string;
  competences: string;
  logiciels: string;
  langues: string;
  niveauAnglais: string;
  experiences: string;
  formation: string;
  ecole: string;
  niveau: string;
  metiers: string;
  domaines: string;
};

/** Diff unitaire entre le CV importé et le Dossier Candidat Central NACORA */
export type CVDiffCategory =
  | "identite"
  | "experience"
  | "formation"
  | "competence"
  | "langue"
  | "certification"
  | "projet"
  | "engagement"
  | "preference";

export type CVDiffItem = {
  id: string;
  categorie: CVDiffCategory;
  titre: string;
  detail: string;
  valeurCv: string;
  valeurProfil: string;
  actionConseillee: "ajouter_au_profil" | "ajouter_au_cv" | "mettre_a_jour";
  selectionneParDefaut?: boolean;
  donneeBrute?: unknown;
};

export type CVProfilComparison = {
  tauxHarmonisation: number; // 0-100
  resumeHarmonisation: string;
  elementsDansCvSeulement: CVDiffItem[];
  elementsDansProfilSeulement: CVDiffItem[];
  differences: CVDiffItem[];
};

export type CVAtsConformiteRegle = {
  regle: string;
  valide: boolean;
  conseil: string;
};

export type CVAtsAudit = {
  scoreAts: number; // 0-100
  tauxPassageEstime: number; // 0-100
  lisibiliteSections: string;
  pointsDeVigilance: string[];
  motsClesDetectes: string[];
  motsClesManquants: string[];
  conformiteFormats: CVAtsConformiteRegle[];
};

export type CVReformulationStar = {
  poste: string;
  entreprise: string;
  avant: string;
  apres: string;
  explication: string;
  kpiSuggere?: string;
};

export type CVExperiencesAudit = {
  scoreStar: number; // 0-100
  scoreImpactChiffre: number; // 0-100
  scoreVerbesAction: number; // 0-100
  reformulationsStar: CVReformulationStar[];
  recommandationsMissions: string[];
};

export type CVCompetenceItem = {
  nom: string;
  categorie?: string;
  niveau?: string;
  statut: "maitrise" | "a_valoriser" | "a_acquerir";
};

export type CVCompetencesAudit = {
  hardSkills: CVCompetenceItem[];
  softSkills: string[];
  outils: string[];
  methodes: string[];
  conseilsGroupement: string;
};

export type CVOptimisationCiblee = {
  offreTitre: string;
  entrepriseCible: string;
  scoreAdequationOffre: number; // 0-100
  pointsFortsOffre: string[];
  pointsVigilanceOffre: string[];
  accrocheCiblee: string;
  motsClesOffreManquants: string[];
  ordreSectionsRecommande: string[];
  experiencesAValoriserPrioritairement: string[];
};

/** Moteur Complet CV Intelligence Engine */
export type AnalyseCV = {
  global: number;
  scores: ScoreCV[];
  pointsForts: string[];
  aCorriger: CorrectionCV[];
  reformulations: ReformulationCV[];
  motsClesManquants: string[];
  resume: string;
  profilDetecte: ProfilDetecte;
  cvStructure?: Partial<CvStructure> | null;
  // Champs enrichis V3 CV Intelligence
  mode?: "master" | "cible";
  comparaisonProfil?: CVProfilComparison;
  auditAts?: CVAtsAudit;
  auditExperiences?: CVExperiencesAudit;
  auditCompetences?: CVCompetencesAudit;
  optimisationCiblee?: CVOptimisationCiblee | null;
  cvMasterMarkdown?: string;
  cvCibleMarkdown?: string | null;
};

export type CvEtat = {
  texte: string;
  analyse: AnalyseCV;
  genereLe: string;
  hash: string;
  modele?: string | undefined;
  offreCiblee?: {
    titre: string;
    entreprise: string;
    texteOffre: string;
  } | null;
};

/** Hash djb2 simple, identique dans l'esprit à celui du moteur de match. */
export function hashTexte(texte: string): string {
  let h = 5381;
  const t = texte.replace(/\s+/g, " ").trim().toLowerCase();
  for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

export function cvObsolete(cv: CvEtat | null | undefined): boolean {
  if (!cv) return false;
  return hashTexte(cv.texte) !== cv.hash;
}

export function niveauCV(score: number): { label: string; badge: string; color: string } {
  if (score >= 80)
    return {
      label: "Excellent CV",
      badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      color: "#10b981",
    };
  if (score >= 65)
    return {
      label: "Bon CV, quelques ajustements",
      badge: "border-purple-500/30 bg-purple-500/10 text-purple-300",
      color: "#a855f7",
    };
  if (score >= 45)
    return {
      label: "À retravailler",
      badge: "border-amber-500/40 bg-amber-500/10 text-amber-400",
      color: "#f59e0b",
    };
  return {
    label: "Refonte conseillée",
    badge: "border-rose-500/40 bg-rose-500/10 text-rose-400",
    color: "#f43f5e",
  };
}

export function labelPriorite(p: CorrectionCV["priorite"]): string {
  return p === "haute"
    ? "Prioritaire"
    : p === "moyenne"
      ? "Important"
      : "Bonus";
}

export const MENTION_CV =
  "Analyse générée par le CV Intelligence Engine de NACORA à partir de vos données réelles. Vérifiez toujours les suggestions avant de les appliquer.";

