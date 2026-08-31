import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { fallbackAnalyserCv } from "./ai-fallbacks";

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

const SYSTEM_INSTRUCTION = `Tu es l'assistant IA expert en recrutement de talents et audit de CV pour Grandes Écoles et cabinets de premier plan.
Tu réalises un audit rigoureux, bienveillant et orienté résultats du CV d'un étudiant.

RÈGLES D'EXCELLENCE :
- Rigueur factuelle : Ne JAMAIS inventer d'information absente du CV. Si un champ manque, chaîne vide ("") ou tableau vide ([]).
- Tu vouvoies le candidat et apportes des conseils immédiatement actionnables.
- Format JSON strict :
  * "scores" : 4 dimensions évaluées ("Clarté et structure", "Impact et résultats chiffrés", "Adéquation avec le projet professionnel", "Mots-clés et lisibilité ATS"), chacune avec score 0-100 et explication constructive.
  * "global" : note globale pondérée 0-100.
  * "pointsForts" : 3 à 5 forces distinctives identifiées dans le parcours.
  * "aCorriger" : 3 à 6 axes prioritaires avec titre percutant, conseil méthodologique (ex: méthode STAR, verbes d'action, métriques), et priorite ("haute"|"moyenne"|"basse").
  * "reformulations" : 3 à 6 puces concrètes réécrites ("avant" = extrait brut, "apres" = version musclée avec verbe d'action et impact).
  * "motsClesManquants" : liste des mots-clés et compétences recherchées par les recruteurs du secteur qui manquent.
  * "resume" : synthèse globale percutante en 2-3 phrases.
  * "profilDetecte" : synthèse structurée par champs pour pré-remplir le profil de l'étudiant.
  * "cvStructure" : parsing exhaustif (expériences, formations, certifications, projets, compétences, langues, bénévolats, centres d'intérêt).`;

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
    console.warn("[analyserCvIA] Repli intelligent activé:", error);
    return fallbackAnalyserCv(entree);
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
