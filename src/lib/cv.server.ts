import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { messageErreurIA } from "./ai-gateway.server";

const AnalyseSchema = z.object({
  global: z.number(),
  scores: z.array(
    z.object({
      critere: z.string(),
      score: z.number(),
      explication: z.string(),
    }),
  ),
  pointsForts: z.array(z.string()),
  aCorriger: z.array(
    z.object({
      titre: z.string(),
      conseil: z.string(),
      priorite: z.enum(["haute", "moyenne", "basse"]),
    }),
  ),
  reformulations: z.array(
    z.object({
      avant: z.string(),
      apres: z.string(),
    }),
  ),
  motsClesManquants: z.array(z.string()),
  resume: z.string(),
  profilDetecte: z.object({
    competences: z.string(),
    logiciels: z.string(),
    langues: z.string(),
    niveauAnglais: z.string(),
    experiences: z.string(),
    formation: z.string(),
    ecole: z.string(),
    niveau: z.string(),
    metiers: z.string(),
    domaines: z.string(),
    localisation: z.string(),
  }),
  cvStructure: z.object({
    titre: z.string(),
    accroche: z.string(),
    email: z.string(),
    telephone: z.string(),
    ville: z.string(),
    linkedin: z.string(),
    portfolio: z.string(),
    permis: z.string(),
    experiences: z.array(
      z.object({
        poste: z.string(),
        entreprise: z.string(),
        lieu: z.string(),
        contrat: z.string(),
        debut: z.string(),
        fin: z.string(),
        enCours: z.boolean(),
        description: z.string(),
        realisations: z.array(z.string()),
        competences: z.array(z.string()),
      }),
    ),
    formations: z.array(
      z.object({
        diplome: z.string(),
        etablissement: z.string(),
        lieu: z.string(),
        debut: z.string(),
        fin: z.string(),
        mention: z.string(),
        details: z.string(),
      }),
    ),
    certifications: z.array(
      z.object({
        nom: z.string(),
        organisme: z.string(),
        date: z.string(),
        identifiant: z.string(),
        lien: z.string(),
      }),
    ),
    projets: z.array(
      z.object({
        nom: z.string(),
        role: z.string(),
        periode: z.string(),
        description: z.string(),
        lien: z.string(),
      }),
    ),
    competences: z.array(
      z.object({
        nom: z.string(),
        categorie: z.string(),
        niveau: z.enum(["Notions", "Intermédiaire", "Avancé", "Expert"]),
      }),
    ),
    langues: z.array(
      z.object({
        nom: z.string(),
        niveau: z.enum([
          "A1",
          "A2",
          "B1",
          "B2",
          "C1",
          "C2",
          "Langue maternelle",
        ]),
        certification: z.string(),
      }),
    ),
    benevolats: z.array(
      z.object({
        role: z.string(),
        organisation: z.string(),
        periode: z.string(),
        description: z.string(),
      }),
    ),
    interets: z.array(z.string()),
  }),
});

export type AnalyseCvIA = z.infer<typeof AnalyseSchema>;

const SYSTEM_INSTRUCTION = `Tu es un coach carrière spécialisé dans les CV d'étudiants qui cherchent un stage ou une alternance.

RÈGLES ABSOLUES :
- Ne JAMAIS inventer une information absente du CV. Si une information manque, laisse la chaîne vide ("") ou tableau vide ([]).
- Réponds intégralement en français, en vouvoyant le candidat.
- Ta réponse DOIT être un JSON valide respectant scrupuleusement la structure demandée :
  * "scores" : exactement 4 entrées, dans cet ordre ("Clarté et structure", "Impact et résultats chiffrés", "Adéquation avec le projet (stage M1 PGE)", "Mots-clés et lisibilité ATS"), avec score 0-100 et explication factuelle.
  * "global" : entier 0-100 cohérent.
  * "pointsForts" : 2 à 5 atouts réels.
  * "aCorriger" : 3 à 6 axes d'amélioration avec "titre", "conseil", "priorite" ("haute"|"moyenne"|"basse").
  * "reformulations" : 3 à 6 puces réécrites ("avant", "apres").
  * "motsClesManquants" : liste des mots clés pertinents absents.
  * "resume" : 2 à 3 phrases de synthèse.
  * "profilDetecte" : résumé profil textuel.
  * "cvStructure" : extraction structurée (experiences, formations, certifications, projets, competences, langues, benevolats, interets).`;

export async function analyserCvIA(entree: {
  cv: string;
  profil?: string;
}): Promise<AnalyseCvIA> {
  const userPrompt = `Analyse ce CV d'étudiant selon les directives :

=== TEXTE DU CV ===
${entree.cv.slice(0, 16000)}
${
  entree.profil?.trim()
    ? `\n=== PROJET / PROFIL DÉCLARÉ PAR LE CANDIDAT ===\n${entree.profil.slice(0, 6000)}`
    : ""
}`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    });

    const rawParsed = extraireJsonPropre<AnalyseCvIA>(text);
    return normalise(AnalyseSchema.parse(rawParsed));
  } catch (error) {
    console.error("[analyserCvIA] Erreur Gemini:", error);
    throw new Error(messageErreurIA(error));
  }
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n || 0)));

function normalise(a: AnalyseCvIA): AnalyseCvIA {
  return {
    ...a,
    global: clamp(a.global),
    scores: (a.scores ?? []).map((s) => ({ ...s, score: clamp(s.score) })),
  };
}

export const MODELE_CV = GEMINI_MODEL;
