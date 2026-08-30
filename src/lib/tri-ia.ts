/** Assistant IA universel : types partagés client/serveur pour le tri automatique. */
import {
  emptyCandidature,
  type Candidature,
  type Statut,
  STATUTS,
} from "./candidatures";
import {
  emptyContact,
  type Contact,
  type TypeContact,
  TYPES_CONTACT,
} from "./contacts";

export type CandidatureExtraite = {
  entreprise: string;
  poste: string;
  statut: string;
  lieu: string;
  lien: string;
  source: string;
  secteur: string;
  dateLimite: string;
  dateEnvoi: string;
  commentaire: string;
  detail: string;
};

export type ContactExtrait = {
  nom: string;
  entreprise: string;
  poste: string;
  email: string;
  telephone: string;
  linkedin: string;
  type: string;
  notes: string;
};

export type EcheanceExtraite = {
  entreprise: string;
  titre: string;
  date: string;
  nature: string; // "limite" | "relance" | "entretien" | "autre"
};

export type TriIa = {
  resume: string;
  candidatures: CandidatureExtraite[];
  contacts: ContactExtrait[];
  echeances: EcheanceExtraite[];
};

export const TRI_VIDE: TriIa = {
  resume: "",
  candidatures: [],
  contacts: [],
  echeances: [],
};

export function estDateIso(v: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(v ?? "");
}

function nettoyerDate(v: string): string {
  return estDateIso(v) ? v : "";
}

export function versCandidature(e: CandidatureExtraite): Candidature {
  const statut = (STATUTS as readonly string[]).includes(e.statut)
    ? (e.statut as Statut)
    : "Je vais postuler";
  return {
    ...emptyCandidature(),
    entreprise: e.entreprise.trim(),
    poste: e.poste.trim(),
    statut,
    lieu: e.lieu.trim(),
    lien: e.lien.trim(),
    source: e.source.trim(),
    secteur: e.secteur.trim(),
    dateLimite: nettoyerDate(e.dateLimite),
    dateEnvoi: nettoyerDate(e.dateEnvoi),
    commentaire: e.commentaire.trim(),
    detail: e.detail.trim(),
  };
}

export function versContact(e: ContactExtrait): Contact {
  const type = (TYPES_CONTACT as readonly string[]).includes(e.type)
    ? (e.type as TypeContact)
    : "Recruteur";
  return {
    ...emptyContact(),
    nom: e.nom.trim(),
    entreprise: e.entreprise.trim(),
    poste: e.poste.trim(),
    email: e.email.trim(),
    telephone: e.telephone.trim(),
    linkedin: e.linkedin.trim(),
    type,
    notes: e.notes.trim(),
  };
}

const norm = (v: string) => v.trim().toLowerCase();

/** Retrouve la candidature déjà présente correspondant à une entreprise citée. */
export function trouverCandidature(
  items: Candidature[],
  entreprise: string,
): Candidature | undefined {
  const e = norm(entreprise);
  if (!e) return undefined;
  return items.find(
    (c) => norm(c.entreprise) === e || norm(c.entreprise).includes(e),
  );
}

/** Applique une échéance à une candidature existante (date limite, relance, entretien). */
export function appliquerEcheance(
  c: Candidature,
  e: EcheanceExtraite,
): Partial<Candidature> | null {
  const date = nettoyerDate(e.date);
  if (!date) return null;
  const nature = norm(e.nature);
  if (nature.includes("limite")) return { dateLimite: date };
  if (nature.includes("relance")) return { dateRelance: date };
  if (nature.includes("entretien"))
    return { statut: "J'ai un entretien", dateDernierContact: date };
  return {
    commentaire: `${c.commentaire ? `${c.commentaire} · ` : ""}${e.titre} (${date})`,
  };
}
