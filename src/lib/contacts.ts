/** Carnet de contacts : types et helpers (aucune donnée inventée). */
import { todayIso } from "./candidatures";

export const TYPES_CONTACT = [
  "Recruteur",
  "RH",
  "Manager",
  "Ancien élève",
  "Contact professionnel",
  "Rencontré en entretien",
] as const;
export type TypeContact = (typeof TYPES_CONTACT)[number];

export const CANAUX = [
  "Email",
  "LinkedIn",
  "Téléphone",
  "Entretien",
  "Autre",
] as const;
export type Canal = (typeof CANAUX)[number];

export type Echange = {
  id: string;
  date: string;
  canal: Canal;
  sens: "Envoyé" | "Reçu";
  resume: string;
};

export type Contact = {
  id: string;
  nom: string;
  entreprise: string;
  poste: string;
  email: string;
  telephone: string;
  linkedin: string;
  type: TypeContact;
  candidatureId: string;
  derniereInteraction: string;
  prochaineAction: string;
  dateProchaineAction: string;
  notes: string;
  historique: Echange[];
};

export function emptyContact(): Contact {
  return {
    id: crypto.randomUUID(),
    nom: "",
    entreprise: "",
    poste: "",
    email: "",
    telephone: "",
    linkedin: "",
    type: "Recruteur",
    candidatureId: "",
    derniereInteraction: "",
    prochaineAction: "",
    dateProchaineAction: "",
    notes: "",
    historique: [],
  };
}

export function nouvelEchange(): Echange {
  return {
    id: crypto.randomUUID(),
    date: todayIso(),
    canal: "Email",
    sens: "Envoyé",
    resume: "",
  };
}

export const TYPES_RELANCE = [
  "relance_candidature",
  "apres_entretien",
  "prise_contact",
  "renseignements",
  "remerciement",
  "reseau_ancien_eleve",
  "relance_sans_reponse",
] as const;
export type TypeRelance = (typeof TYPES_RELANCE)[number];

export const LIBELLES_RELANCE: Record<TypeRelance, string> = {
  relance_candidature: "Relance de candidature",
  apres_entretien: "Suivi après entretien",
  prise_contact: "Prise de contact spontanée",
  renseignements: "Demande de renseignements",
  remerciement: "Remerciement après entretien",
  reseau_ancien_eleve: "Mise en relation (ancien élève)",
  relance_sans_reponse: "Relance sans réponse",
};

export function historiqueEnTexte(h: Echange[]): string {
  if (h.length === 0) return "Aucun échange enregistré.";
  return [...h]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (e) =>
        `${e.date} — ${e.canal} (${e.sens}) : ${e.resume || "sans résumé"}`,
    )
    .join("\n");
}

export function contactEnTexte(c: Contact): string {
  const l = (k: string, v: string) => (v.trim() ? `${k} : ${v.trim()}\n` : "");
  return (
    l("Nom", c.nom) +
    l("Type de contact", c.type) +
    l("Entreprise", c.entreprise) +
    l("Poste", c.poste) +
    l("Email", c.email) +
    l("LinkedIn", c.linkedin) +
    l("Dernière interaction", c.derniereInteraction) +
    l("Prochaine action prévue", c.prochaineAction) +
    l("Notes", c.notes)
  );
}
