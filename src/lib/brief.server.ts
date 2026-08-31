import { z } from "zod";
import {
  appelerGeminiSecurise,
  GEMINI_MODEL,
  extraireJsonPropre,
} from "./gemini.server";
import { fallbackGenererBrief } from "./ai-fallbacks";

const BriefSchema = z.object({
  resume: z.string().catch("Priorités du jour"),
  elements: z
    .array(
      z.object({
        id: z.string().catch(""),
        titre: z.string().catch(""),
        raison: z.string().catch(""),
      }),
    )
    .catch([]),
  recommandations: z.array(z.string()).catch([]),
});

export type BriefIA = z.infer<typeof BriefSchema>;

const SYSTEM_INSTRUCTION = `Tu es le conseiller carrière quotidien d'un étudiant qui cherche un stage. Tu réponds à la question : « Qu'est-ce que je dois faire aujourd'hui ? ».

RÈGLES ABSOLUES :
- Tu ne disposes QUE de la liste de faits fournie. N'invente JAMAIS une date, une deadline, un entretien, une entreprise ou une action absente de cette liste.
- Chaque élément renvoyé doit reprendre EXACTEMENT un identifiant "id" présent dans les faits. N'invente aucun id, n'en fusionne aucun.
- "raison" doit reformuler le fait correspondant sans ajouter d'information nouvelle (une phrase courte et concrète, dates reprises telles quelles).
- "titre" : impératif court et actionnable (ex : « Relancer Michelin »).
- Classe par urgence réelle : dates limites dépassées ou imminentes, relances dues, entretiens, opportunités à fort match, fiches à compléter.
- Renvoie au maximum 6 éléments, les plus prioritaires.
- "resume" : 1 à 2 phrases donnant la priorité du jour. S'il n'y a aucun fait, dis-le simplement.
- "recommandations" : 0 à 3 conseils personnalisés basés uniquement sur les faits et le profil (rythme de candidatures, secteurs, compétences à mettre en avant). Aucun conseil générique creux.
- Réponds en français, en vouvoyant, au format JSON strict.`;

export async function genererBriefIA(entree: {
  faits: string;
  profil: string;
}): Promise<BriefIA> {
  const userPrompt = `=== PROFIL DU CANDIDAT ===
${entree.profil.slice(0, 6000) || "Profil non renseigné."}

=== FAITS DU JOUR (source unique de vérité) ===
${entree.faits.slice(0, 12000)}`;

  try {
    const text = await appelerGeminiSecurise({
      contents: userPrompt,
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    });

    const parsed = extraireJsonPropre<BriefIA>(text);
    return BriefSchema.parse(parsed);
  } catch (error) {
    console.warn("[genererBriefIA] Repli intelligent activé:", error);
    return fallbackGenererBrief(entree);
  }
}

export const MODELE_BRIEF = GEMINI_MODEL;
