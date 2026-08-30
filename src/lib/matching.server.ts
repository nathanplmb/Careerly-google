import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { messageErreurIA } from "./ai-gateway.server";

const AnalyseSchema = z.object({
  global: z.number(),
  confiance: z.number(),
  confianceRaison: z.string(),
  details: z.array(
    z.object({
      critere: z.string(),
      score: z.number(),
      explication: z.string(),
    }),
  ),
  pointsForts: z.array(z.string()),
  vigilance: z.array(z.string()),
  competences: z.object({
    correspondances: z.array(z.string()),
    aRenforcer: z.array(z.string()),
    nonRenseignees: z.array(z.string()),
  }),
  recommandation: z.enum([
    "postuler",
    "postuler_si_interet",
    "secondaire",
    "peu_prioritaire",
  ]),
  explication: z.string(),
});

export type AnalyseIA = z.infer<typeof AnalyseSchema>;

export type EntreeMatch = {
  profil: string;
  offre: string;
};

const SYSTEM_INSTRUCTION = `Tu es un conseiller carrière qui évalue la correspondance entre le profil d'un étudiant et une offre de stage/alternance.

RÈGLES ABSOLUES :
- Ne JAMAIS inventer une information absente du profil ou de l'offre.
- Une information absente n'est pas une absence de compétence : écris « Non renseigné dans votre profil ».
- Si beaucoup d'informations manquent, baisse la "confiance" (0-100) et explique pourquoi dans "confianceRaison".
- "details" doit couvrir les dimensions évaluables ("Compétences", "Formation", "Expérience", "Missions", "Localisation", "Langues", "Préférences").
- Chaque sous-score doit être justifié par une phrase concrète et factuelle.
- "global" est un entier 0-100 cohérent.
- pointsForts : 2 à 5 éléments réellement positifs. vigilance : 0 à 5 écarts réels.
- competences.correspondances = présentes des deux côtés ; aRenforcer = proches mais partielles ; nonRenseignees = demandées par l'offre mais absentes du profil.
- recommandation : "postuler", "postuler_si_interet", "secondaire", ou "peu_prioritaire".
- "explication" : 2 à 3 phrases justifiant la recommandation.
- Réponds intégralement en français au format JSON strict.`;

export async function analyserCorrespondanceIA(
  entree: EntreeMatch,
): Promise<AnalyseIA> {
  const userPrompt = `Compare ce profil et cette offre de stage :

=== PROFIL DU CANDIDAT ===
${entree.profil.slice(0, 8000)}

=== OFFRE DE STAGE ===
${entree.offre.slice(0, 12000)}`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    });

    const rawParsed = extraireJsonPropre<AnalyseIA>(text);
    return normalise(AnalyseSchema.parse(rawParsed));
  } catch (error) {
    console.error("[analyserCorrespondanceIA] Erreur Gemini:", error);
    throw new Error(messageErreurIA(error));
  }
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n || 0)));

function normalise(a: AnalyseIA): AnalyseIA {
  return {
    ...a,
    global: clamp(a.global),
    confiance: clamp(a.confiance),
    details: (a.details ?? []).map((d) => ({ ...d, score: clamp(d.score) })),
  };
}

export const MODELE_MATCH = GEMINI_MODEL;
