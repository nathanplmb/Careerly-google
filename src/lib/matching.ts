/**
 * Moteur de correspondance — partie client-safe.
 * Libellés, niveaux, empreintes (hash) et calcul de priorité.
 * Volontairement générique : réutilisable plus tard par le CV Analyzer.
 */
import {
  addDays,
  todayIso,
  type Candidature,
  type MatchScore,
  type Priorite,
  type Recommandation,
} from "./candidatures";
import type { Profil } from "./profil";

export type NiveauMatch = {
  cle: "excellent" | "tres-bon" | "interessant" | "faible";
  label: string;
  /** classes tailwind (tokens sémantiques uniquement) */
  badge: string;
  barre: string;
};

export function niveauMatch(score: number): NiveauMatch {
  if (score >= 85)
    return {
      cle: "excellent",
      label: "Excellent match",
      badge: "border-primary/40 bg-primary/15 text-primary",
      barre: "bg-primary",
    };
  if (score >= 70)
    return {
      cle: "tres-bon",
      label: "Très bon match",
      badge: "border-primary/25 bg-primary/10 text-primary",
      barre: "bg-primary/80",
    };
  if (score >= 50)
    return {
      cle: "interessant",
      label: "Match intéressant",
      badge: "border-muted-foreground/25 bg-muted text-foreground",
      barre: "bg-muted-foreground/60",
    };
  return {
    cle: "faible",
    label: "Match faible",
    badge: "border-destructive/30 bg-destructive/10 text-destructive",
    barre: "bg-destructive/70",
  };
}

const RECO_LABELS: Record<string, string> = {
  postuler: "Postulez",
  postuler_si_interet: "Postulez si l'entreprise vous intéresse",
  secondaire: "Opportunité secondaire",
  peu_prioritaire: "Peu prioritaire",
};

export function labelRecommandation(r: Recommandation | undefined): string {
  if (!r) return "—";
  return RECO_LABELS[r] ?? r;
}

/** Hash stable et court (djb2) — sert à détecter un profil / une offre modifiés. */
export function hash(value: string): string {
  let h = 5381;
  for (let i = 0; i < value.length; i++)
    h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

export function profilHash(p: Profil | null): string {
  if (!p) return "";
  return hash(JSON.stringify(p));
}

export function offreHash(c: Candidature): string {
  return hash(
    [c.entreprise, c.poste, c.lieu, c.secteur, c.detail, c.commentaire].join(
      "|",
    ),
  );
}

/** L'analyse existe-t-elle et correspond-elle toujours au profil / à l'offre ? */
export function matchObsolete(c: Candidature, profil: Profil | null): boolean {
  const m = c.match;
  if (!m) return false;
  if (!m.profilHash && !m.offreHash) return false;
  if (m.profilHash && profil && m.profilHash !== profilHash(profil))
    return true;
  if (m.offreHash && m.offreHash !== offreHash(c)) return true;
  return false;
}

const STATUT_POIDS: Record<string, number> = {
  "J'ai un entretien": 25,
  "J'ai postulé": 5,
  "J'ai relancé": 5,
  "Je vais postuler": 10,
  "Je n'ai pas reçu de réponse": -5,
  "J'ai reçu une réponse négative": -60,
};

/**
 * Priorité automatique : score de match + deadline + statut + fraîcheur du contact.
 * Renvoie null si aucune information exploitable.
 */
export function prioriteAuto(c: Candidature): Priorite {
  const today = todayIso();
  let points = 0;

  const score = c.match?.global;
  if (typeof score === "number") points += (score - 50) * 0.8; // -40 … +40

  if (c.dateLimite) {
    if (c.dateLimite < today) points -= 30;
    else if (c.dateLimite <= addDays(today, 3)) points += 30;
    else if (c.dateLimite <= addDays(today, 7)) points += 20;
    else if (c.dateLimite <= addDays(today, 14)) points += 8;
  }

  points += STATUT_POIDS[c.statut] ?? 0;

  if (c.dateRelance && c.dateRelance <= today && c.statut === "J'ai postulé")
    points += 15;

  if (c.archive) points -= 50;

  if (points >= 20) return "Haute";
  if (points >= -5) return "Moyenne";
  return "Faible";
}

/** Priorité effective : choix manuel s'il existe, sinon calcul automatique. */
export function prioriteEffective(c: Candidature): Priorite {
  return c.priorite === "auto" ? prioriteAuto(c) : c.priorite;
}

export function scoreOuNull(m: MatchScore | null | undefined): number | null {
  return m && typeof m.global === "number" ? m.global : null;
}

export const MENTION_TRANSPARENCE =
  "Le score repose sur la correspondance entre votre profil (formation, compétences, expériences, préférences) et les critères identifiés dans l'offre. C'est une aide à la décision, pas une prédiction de recrutement.";
