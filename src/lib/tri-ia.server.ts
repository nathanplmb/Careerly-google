import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { messageErreurIA } from "./ai-gateway.server";
import { TRI_VIDE, type TriIa } from "./tri-ia";

const Schema = z.object({
  resume: z.string(),
  candidatures: z.array(
    z.object({
      entreprise: z.string(),
      poste: z.string(),
      statut: z.string(),
      lieu: z.string(),
      lien: z.string(),
      source: z.string(),
      secteur: z.string(),
      dateLimite: z.string(),
      dateEnvoi: z.string(),
      commentaire: z.string(),
      detail: z.string(),
    }),
  ),
  contacts: z.array(
    z.object({
      nom: z.string(),
      entreprise: z.string(),
      poste: z.string(),
      email: z.string(),
      telephone: z.string(),
      linkedin: z.string(),
      type: z.string(),
      notes: z.string(),
    }),
  ),
  echeances: z.array(
    z.object({
      entreprise: z.string(),
      titre: z.string(),
      date: z.string(),
      nature: z.string(),
    }),
  ),
});

export async function trierTexte(
  texte: string,
  aujourdhui: string,
): Promise<TriIa> {
  const systemInstruction = `Tu es l'assistant de tri de Careerly, une application de suivi de candidatures (stages/alternances).
On te donne un texte brut quelconque : annonce, e-mail, notes, liste d'entreprises, message LinkedIn, copier-coller de tableau, compte-rendu…
Tu dois TOUT classer automatiquement, sans rien inventer. Si une information n'est pas dans le texte, laisse la chaîne vide.
Date du jour : ${aujourdhui}. Toutes les dates doivent être au format AAAA-MM-JJ (convertis « vendredi prochain », « 15 sept » etc.).

Classe en trois familles (JSON strict) :
1. candidatures : chaque offre / opportunité / entreprise ciblée.
   - statut parmi exactement : "Je vais postuler", "J'ai postulé", "J'ai relancé", "J'ai un entretien", "J'ai reçu une réponse négative", "Je n'ai pas reçu de réponse" (par défaut "Je vais postuler").
   - source : LinkedIn, Welcome to the Jungle, JobTeaser, Indeed, Site entreprise, Candidature spontanée, Réseau, École, Autre.
   - dateLimite : date limite pour postuler ; dateEnvoi : date d'envoi de la candidature si déjà envoyée.
   - commentaire : une phrase utile (max 140 caractères) ; detail : résumé structuré (missions, profil, durée, rémunération).
2. contacts : chaque personne citée (recruteur, RH, manager, ancien élève…).
   - type parmi exactement : "Recruteur", "RH", "Manager", "Ancien élève", "Contact professionnel", "Rencontré en entretien".
   - notes : ce que le texte dit d'utile sur la personne ou l'échange.
3. echeances : chaque date importante (limite de candidature, relance à faire, entretien planifié).
   - nature parmi : "limite", "relance", "entretien", "autre" ; entreprise concernée si connue.

resume : 1 à 2 phrases décrivant ce que tu as trouvé et classé.`;

  const userPrompt = `Texte à classer :
"""
${texte.slice(0, 20000)}
"""`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction,
      responseMimeType: "application/json",
    });

    const parsed = extraireJsonPropre<Partial<TriIa>>(text);
    return { ...TRI_VIDE, ...parsed };
  } catch (error) {
    console.error("[trierTexte] Erreur Gemini:", error);
    throw new Error(messageErreurIA(error));
  }
}
