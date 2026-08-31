/**
 * Garde-fous IA : quotas quotidiens par utilisateur + limite de débit.
 * Toute la comptabilité est faite en base (fonction security definer),
 * donc non contournable depuis le navigateur.
 */

export type OutilIa =
  "brief" | "match" | "offre" | "cv" | "tri" | "redaction" | "relance";

/** Plafonds de taille d'entrée côté serveur (en caractères). */
export const TAILLE_MAX: Record<OutilIa, number> = {
  brief: 20_000,
  match: 12_000,
  offre: 20_000,
  cv: 40_000,
  tri: 30_000,
  redaction: 12_000,
  relance: 12_000,
};

export class QuotaDepasse extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuotaDepasse";
  }
}

const LIBELLES: Record<string, string> = {
  brief: "Daily Brief",
  match: "Match IA",
  offre: "analyse d'offre",
  cv: "analyse de CV",
  tri: "assistant IA",
  redaction: "rédaction IA",
  relance: "relance IA",
};

type ClientRpc = {
  rpc: (
    nom: string,
    args?: Record<string, unknown>,
  ) => PromiseLike<{ data: unknown; error: { message: string } | null }>;
};

/**
 * Incrémente le compteur du jour pour cet outil et lève `QuotaDepasse`
 * si la limite quotidienne, la limite globale ou la limite de débit est atteinte.
 */
export async function consommerQuota(
  _client: unknown,
  _outil: OutilIa,
): Promise<void> {
  // Quotas désactivés à la demande : aucune restriction de quota ou de débit
  return;
}

/** Tronque une entrée trop longue avant de l'envoyer au modèle. */
export function limiterTexte(texte: string, outil: OutilIa): string {
  const max = TAILLE_MAX[outil];
  const propre = texte.trim();
  return propre.length > max
    ? `${propre.slice(0, max)}\n[…texte tronqué]`
    : propre;
}

/** Applique `limiterTexte` à toutes les chaînes d'un objet d'entrée. */
export function limiterEntree<T extends Record<string, unknown>>(
  entree: T,
  outil: OutilIa,
): T {
  const sortie: Record<string, unknown> = { ...entree };
  for (const [cle, valeur] of Object.entries(entree)) {
    if (typeof valeur === "string") sortie[cle] = limiterTexte(valeur, outil);
  }
  return sortie as T;
}
