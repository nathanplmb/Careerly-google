import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { TRI_VIDE, type TriIa } from "./tri-ia";
import { fallbackTrierTexte } from "./ai-fallbacks";

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
  const systemInstruction = `Tu es l'assistant IA intelligent de tri et d'organisation pour étudiants et candidats (stages/alternances).
On te donne un texte brut quelconque : annonce, e-mail, notes, liste d'entreprises, message LinkedIn, copier-coller de tableau, compte-rendu…
Tu analyses méthodiquement le contenu pour TOUT structurer sans rien inventer.
Date du jour : ${aujourdhui}. Toutes les dates doivent être au format AAAA-MM-JJ.

Classe en trois familles (JSON strict) :
1. candidatures : chaque offre / opportunité / entreprise ciblée.
   - entreprise : nom propre de l'entreprise réelle (pas le job board).
   - poste : intitulé propre du poste.
   - statut : "Je vais postuler", "J'ai postulé", "J'ai relancé", "J'ai un entretien", "J'ai reçu une réponse négative", "Je n'ai pas reçu de réponse".
   - source : "JobTeaser", "LinkedIn", "Welcome to the Jungle", "Indeed", "Site entreprise", "Candidature spontanée", "Réseau", "École", "Autre".
   - secteur : "Tech & IA", "Conseil & Stratégie", "Finance & Banque", "Luxe & Cosmétiques", "Audit & Contrôle de gestion", "Marketing & Communication", "Santé & Pharma", "Industrie & Énergie", "E-commerce & Retail", "RH & Recrutement", "Droit & Juridique", "Agroalimentaire", "Immobilier & BTP", "Autre".
   - dateLimite : date limite AAAA-MM-JJ ; dateEnvoi : date d'envoi si mentionnée.
   - commentaire : conseil stratégique ou rappel (max 140 car).
   - detail : résumé synthétique et très concis (missions clés, profil requis, modalités).
2. contacts : chaque interlocuteur identifié (recruteur, RH, manager, tuteur, contact réseau).
   - nom, entreprise, poste, email, telephone, linkedin.
   - type : "Recruteur", "RH", "Manager", "Ancien élève", "Contact professionnel", "Rencontré en entretien".
   - notes : informations utiles issues du texte.
3. echeances : chaque jalon ou date clé (date limite, relance, date d'entretien).
   - nature : "limite", "relance", "entretien", "autre".

resume : Synthèse de 1 à 2 phrases décrivant clairement ce qui a été détecté et extrait.`;

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
    console.warn("[trierTexte] Repli intelligent activé:", error);
    return fallbackTrierTexte(texte, aujourdhui);
  }
}
