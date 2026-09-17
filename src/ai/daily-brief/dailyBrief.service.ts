import { GoogleGenAI } from "@google/genai";
import {
  DAILY_BRIEF_SYSTEM_PROMPT,
  buildDailyBriefUserPrompt,
} from "./dailyBrief.prompt";
import {
  DailyBriefZodSchema,
  geminiDailyBriefResponseSchema,
} from "./dailyBrief.schema";
import type {
  DailyBriefData,
  DailyBriefInputData,
  BriefItem,
  BriefActionId,
} from "./dailyBrief.types";
import { generateDeterministicDailyBrief } from "./dailyBrief.deterministic";

export { generateDeterministicDailyBrief } from "./dailyBrief.deterministic";

function getAiClient(): GoogleGenAI {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("La clé d'API GEMINI_API_KEY n'est pas configurée.");
  }
  return new GoogleGenAI({
    apiKey,
  });
}

function cleanJsonString(raw: string): string {
  if (!raw) return "{}";
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return (match?.[1] ? match[1] : raw).trim();
}

const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash",
];

const VALID_ACTIONS_MAP: Record<string, BriefActionId> = {
  VIEW_OPPORTUNITY: "VIEW_OPPORTUNITY",
  UPDATE_DEADLINE: "UPDATE_DEADLINE",
  DELETE_OPPORTUNITY: "DELETE_OPPORTUNITY",
  KEEP_OPPORTUNITY: "KEEP_OPPORTUNITY",
  CHANGE_STAGE: "CHANGE_STAGE",
  MARK_APPLIED: "MARK_APPLIED",
  PREPARE_APPLICATION: "PREPARE_APPLICATION",
  PLAN_FOLLOW_UP: "PLAN_FOLLOW_UP",
  OPEN_CONTACT: "OPEN_CONTACT",
  OPEN_COMPANY: "OPEN_COMPANY",
  OPEN_CALENDAR: "OPEN_CALENDAR",
  // Variantes courantes
  view_opportunity: "VIEW_OPPORTUNITY",
  update_deadline: "UPDATE_DEADLINE",
  delete_opportunity: "DELETE_OPPORTUNITY",
  keep_opportunity: "KEEP_OPPORTUNITY",
  change_stage: "CHANGE_STAGE",
  mark_applied: "MARK_APPLIED",
  prepare_application: "PREPARE_APPLICATION",
  plan_follow_up: "PLAN_FOLLOW_UP",
  open_contact: "OPEN_CONTACT",
  open_company: "OPEN_COMPANY",
  open_calendar: "OPEN_CALENDAR",
  view_calendar: "OPEN_CALENDAR",
  prepare: "PREPARE_APPLICATION",
  follow_up: "PLAN_FOLLOW_UP",
};

/**
 * Filtre et assainit les éléments retournés par l'IA pour garantir :
 * - Aucun opportunityId inventé ou halluciné (Test 19)
 * - Actions conformes au catalogue autorisé
 */
function sanitizeBriefItems(
  items: any[],
  validOpportunityIds: Set<string>,
): BriefItem[] {
  const result: BriefItem[] = [];

  for (const item of items) {
    if (!item) continue;

    // Si un opportunityId est spécifié, il DOIT obligatoirement exister parmi les opportunités réelles
    if (item.opportunityId && !validOpportunityIds.has(item.opportunityId)) {
      console.warn(
        `[Daily Brief] Rejet de la recommandation "${item.title}" : opportunityId inexistant "${item.opportunityId}".`,
      );
      continue;
    }

    // Normalisation des actions recommandées
    const sanitizedActions = (item.recommendedActions || [])
      .map((action) => {
        const canonicalId = VALID_ACTIONS_MAP[action.id];
        if (!canonicalId) return null;
        return {
          id: canonicalId,
          label: action.label || "Voir",
          variant: action.variant || "secondary",
        };
      })
      .filter((a): a is NonNullable<typeof a> => a !== null);

    // Si aucune action n'a été spécifiée ou toutes invalides, fournir une action par défaut
    if (sanitizedActions.length === 0) {
      if (item.actionType === "view_calendar" || item.type === "entretien") {
        sanitizedActions.push({
          id: "OPEN_CALENDAR",
          label: "Voir le calendrier",
          variant: "secondary",
        });
      } else {
        sanitizedActions.push({
          id: "VIEW_OPPORTUNITY",
          label: "Voir l'opportunité",
          variant: "default",
        });
      }
    }

    result.push({
      ...item,
      recommendedActions: sanitizedActions,
      actionLabel: item.actionLabel || sanitizedActions[0]?.label || "Voir",
      actionType: item.actionType || "view_opportunity",
    });
  }

  return result;
}

/**
 * Génère le Daily Brief en appelant l'IA Gemini avec cascade de modèles et schéma structuré.
 */
export async function generateDailyBriefIA(
  input: DailyBriefInputData,
): Promise<DailyBriefData> {
  const validOpportunityIds = new Set(
    input.opportunities.map((o) => o.id).filter(Boolean),
  );

  // Si aucune clé Gemini n'est configurée, repli immédiat sur le générateur déterministe
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    console.info(
      "[Daily Brief] Pas de GEMINI_API_KEY trouvée, utilisation du brief déterministe certifié.",
    );
    return generateDeterministicDailyBrief(input, true);
  }

  let ai: GoogleGenAI;
  try {
    ai = getAiClient();
  } catch (err) {
    console.warn("[Daily Brief] Erreur d'initialisation du client IA:", err);
    return generateDeterministicDailyBrief(input, true);
  }

  const userPrompt = buildDailyBriefUserPrompt(input);
  let rawJsonText: string | null = null;

  for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
    const model = CANDIDATE_MODELS[attempt] || "gemini-3.1-flash-lite";
    try {
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction: DAILY_BRIEF_SYSTEM_PROMPT,
          temperature: 0.0, // Température nulle pour fidélité déterministe absolue
          responseMimeType: "application/json",
          responseSchema: geminiDailyBriefResponseSchema,
        },
      });

      if (response.text) {
        rawJsonText = response.text;
        break;
      }
    } catch (err: unknown) {
      console.info(
        `[Daily Brief] Modèle ${model} temporairement indisponible (${attempt + 1}/${CANDIDATE_MODELS.length}), basculement automatique.`,
      );
      const errMsg = err instanceof Error ? err.message : String(err);
      const isTransient =
        errMsg.includes("503") ||
        errMsg.includes("high demand") ||
        errMsg.includes("UNAVAILABLE") ||
        errMsg.includes("429") ||
        errMsg.includes("RESOURCE_EXHAUSTED");
      if (isTransient && attempt < CANDIDATE_MODELS.length - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 250 * (attempt + 1)),
        );
      }
    }
  }

  if (!rawJsonText) {
    console.info(
      "[Daily Brief] Modèles IA distants indisponibles, utilisation du moteur déterministe certifié.",
    );
    return generateDeterministicDailyBrief(input, true);
  }

  try {
    const cleaned = cleanJsonString(rawJsonText);
    const parsed = JSON.parse(cleaned);
    const validated = DailyBriefZodSchema.parse(parsed);

    // Assainissement strict et anti-hallucination
    const safeToday = sanitizeBriefItems(
      validated.today || [],
      validOpportunityIds,
    ).slice(0, 5);

    const safeWatch = sanitizeBriefItems(
      validated.watch || [],
      validOpportunityIds,
    ).slice(0, 3);

    const safeUpcoming = sanitizeBriefItems(
      validated.upcoming || [],
      validOpportunityIds,
    ).slice(0, 5);

    let summary = validated.summary;
    if (
      safeToday.length === 0 &&
      safeWatch.length === 0 &&
      safeUpcoming.length === 0
    ) {
      summary = "Tout est à jour. Aucune action urgente aujourd'hui.";
    }

    return {
      greeting: validated.greeting,
      summary,
      today: safeToday,
      watch: safeWatch,
      upcoming: safeUpcoming,
      recent: [],
      generatedAt: new Date().toISOString(),
      isFallback: false,
    };
  } catch (parseErr) {
    console.warn(
      "[Daily Brief] Erreur de validation de la réponse IA, basculement vers le mode déterministe:",
      parseErr,
    );
    return generateDeterministicDailyBrief(input, true);
  }
}
