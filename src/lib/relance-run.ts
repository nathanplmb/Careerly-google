/** Orchestration client de la relance IA : contexte réel -> IA -> message. */
import { genererRelance } from "./relance.functions";
import { offreEnTexte, profilEnTexte } from "./match-run";
import {
  contactEnTexte,
  historiqueEnTexte,
  LIBELLES_RELANCE,
} from "./contacts";
import type { Contact, TypeRelance } from "./contacts";
import type { Candidature } from "./candidatures";
import type { Profil } from "./profil";

export type MessageRelance = {
  objet: string;
  message: string;
  conseils: string[];
};

export async function lancerRelance(
  contact: Contact,
  type: TypeRelance,
  profil: Profil | null,
  candidature: Candidature | null,
  consigne: string,
): Promise<MessageRelance> {
  const r = await genererRelance({
    data: {
      typeRelance: LIBELLES_RELANCE[type],
      contact: contactEnTexte(contact),
      profil: profil ? profilEnTexte(profil) : "",
      offre: candidature ? offreEnTexte(candidature) : "",
      historique: historiqueEnTexte(contact.historique),
      consigne,
    },
  });
  return {
    objet: (r.objet ?? "").trim(),
    message: (r.message ?? "").trim(),
    conseils: (r.conseils ?? [])
      .map((c) => c.trim())
      .filter(Boolean)
      .slice(0, 3),
  };
}
