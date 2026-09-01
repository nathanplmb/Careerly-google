/** Modèle et helpers de l'analyseur de CV par IA. */

import type { CvStructure } from "./cv-structure";

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
};

export type CvEtat = {
  texte: string;
  analyse: AnalyseCV;
  genereLe: string;
  hash: string;
  modele?: string | undefined;
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

export function niveauCV(score: number): { label: string; badge: string } {
  if (score >= 80)
    return {
      label: "Excellent CV",
      badge: "border-primary/40 bg-primary/10 text-primary",
    };
  if (score >= 65)
    return {
      label: "Bon CV, quelques ajustements",
      badge: "border-primary/30 bg-primary/5 text-primary",
    };
  if (score >= 45)
    return {
      label: "À retravailler",
      badge: "border-amber-500/40 bg-amber-500/10 text-amber-600",
    };
  return {
    label: "Refonte conseillée",
    badge: "border-destructive/30 bg-destructive/10 text-destructive",
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
  "Analyse générée par l'IA à partir du texte de votre CV : vérifiez toujours les suggestions avant de les appliquer.";
