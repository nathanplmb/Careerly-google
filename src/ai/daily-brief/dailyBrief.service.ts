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
  OpportunityInputForBrief,
} from "./dailyBrief.types";

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
  return (match ? match[1] : raw).trim();
}

const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

function calculateDaysDiff(fromIso: string, toIso: string): number | null {
  try {
    const from = new Date(fromIso);
    const to = new Date(toIso);
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;
    const diffTime = to.getTime() - from.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}

/**
 * Génère un Daily Brief factuel et déterministe basé strictement sur les règles métiers de NACORA.
 * Utilisé comme repli fiable en cas d'indisponibilité ou d'erreur de l'API IA.
 */
export function generateDeterministicDailyBrief(
  input: DailyBriefInputData,
  isFallback = false,
): DailyBriefData {
  const { userPrenom, currentDate, opportunities, calendarEvents = [] } = input;
  const prenom = userPrenom?.trim() ? userPrenom.trim() : "";
  const greeting = prenom ? `Bonjour ${prenom}` : "Bonjour";

  const today: BriefItem[] = [];
  const watch: BriefItem[] = [];
  const upcoming: BriefItem[] = [];
  const recent: BriefItem[] = [];

  const activeStatuses = [
    "Sauvegardée",
    "À préparer",
    "À étudier",
    "À candidater",
    "Candidature envoyée",
    "Relancée",
    "Entretien",
    "Deuxième entretien",
  ];

  const closedStatuses = ["Refusée", "Acceptée", "Clôturée", "Sans réponse"];

  for (const opp of opportunities) {
    if (opp.archive) continue;

    const deadline = opp.applicationDeadline || opp.dateLimite;
    const relance = opp.followUpDate || opp.dateRelance;
    const entretien = opp.interviewDate || opp.secondInterviewDate;
    const company = opp.entreprise || "Entreprise";
    const title = opp.poste || "Opportunité";
    const isClosed = closedStatuses.includes(opp.statut);
    const isActive = activeStatuses.includes(opp.statut);

    // 1. Entretien
    if (entretien && isActive) {
      const diff = calculateDaysDiff(currentDate, entretien);
      if (diff === 0) {
        today.push({
          id: `entretien-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          title: `Entretien — ${company}`,
          company,
          date: entretien,
          dateContext: "Aujourd'hui",
          priority: "high",
          message: `Entretien prévu aujourd'hui pour le poste de ${title}.`,
          actionLabel: "Voir l'opportunité",
          actionType: "view_opportunity",
        });
      } else if (diff !== null && diff > 0 && diff <= 30) {
        upcoming.push({
          id: `entretien-futur-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          title: `Entretien — ${company}`,
          company,
          date: entretien,
          dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
          priority: diff <= 3 ? "high" : "medium",
          message: `Entretien prévu le ${entretien} pour le poste de ${title}.`,
          actionLabel: "Voir le calendrier",
          actionType: "view_calendar",
        });
      }
    }

    // 2. Deadlines
    if (deadline && !isClosed) {
      const diff = calculateDaysDiff(currentDate, deadline);
      if (diff === 0) {
        today.push({
          id: `deadline-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          title: `Deadline aujourd'hui — ${company}`,
          company,
          date: deadline,
          dateContext: "Aujourd'hui",
          priority: "high",
          message: `La date limite pour postuler à ${title} expire aujourd'hui.`,
          actionLabel: "Voir l'opportunité",
          actionType: "view_opportunity",
        });
      } else if (diff !== null && diff > 0 && diff <= 7) {
        watch.push({
          id: `deadline-watch-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          title: `Deadline dans ${diff} jours — ${company}`,
          company,
          date: deadline,
          dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
          priority: diff <= 2 ? "high" : "medium",
          message: `Date limite de candidature fixée au ${deadline} pour ${title}.`,
          actionLabel: "Voir l'opportunité",
          actionType: "view_opportunity",
        });
      } else if (
        diff !== null &&
        diff < 0 &&
        isActive &&
        opp.statut !== "Candidature envoyée" &&
        opp.statut !== "Relancée"
      ) {
        watch.push({
          id: `deadline-overdue-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          title: `Deadline dépassée — ${company}`,
          company,
          date: deadline,
          dateContext: "Dépassée",
          priority: "medium",
          message: `La date limite du ${deadline} est passée pour ${title}.`,
          actionLabel: "Voir l'opportunité",
          actionType: "view_opportunity",
        });
      }
    }

    // 3. Relances
    if (
      relance &&
      (opp.statut === "Candidature envoyée" || opp.statut === "Relancée")
    ) {
      const diff = calculateDaysDiff(currentDate, relance);
      if (diff === 0) {
        today.push({
          id: `relance-${opp.id}`,
          opportunityId: opp.id,
          type: "relance",
          title: `Relancer ${company}`,
          company,
          date: relance,
          dateContext: "Prévue aujourd'hui",
          priority: "high",
          message: `Une relance est programmée aujourd'hui pour votre candidature à ${title}.`,
          actionLabel: "Voir l'opportunité",
          actionType: "view_opportunity",
        });
      } else if (diff !== null && diff < 0) {
        const joursRetard = Math.abs(diff);
        watch.push({
          id: `relance-retard-${opp.id}`,
          opportunityId: opp.id,
          type: "relance",
          title: `Relance en retard — ${company}`,
          company,
          date: relance,
          dateContext: `${joursRetard} j de retard`,
          priority: "high",
          message: `La relance pour ${title} était prévue le ${relance}.`,
          actionLabel: "Planifier la relance",
          actionType: "follow_up",
        });
      }
    }

    // 4. Candidatures à préparer
    if (
      opp.statut === "À préparer" &&
      !today.some((t) => t.opportunityId === opp.id)
    ) {
      today.push({
        id: `prep-${opp.id}`,
        opportunityId: opp.id,
        type: "preparation",
        title: `Préparer la candidature — ${company}`,
        company,
        date: null,
        dateContext: "À faire",
        priority: "medium",
        message: `Vous avez une candidature à préparer pour le poste de ${title}.`,
        actionLabel: "Voir l'opportunité",
        actionType: "view_opportunity",
      });
    }

    // 5. Activité récente (sauvegardée récemment)
    if (opp.savedAt) {
      const diff = calculateDaysDiff(opp.savedAt, currentDate);
      if (diff !== null && diff >= 0 && diff <= 3) {
        recent.push({
          id: `recent-${opp.id}`,
          opportunityId: opp.id,
          type: "opportunite",
          title: `Nouvelle opportunité — ${company}`,
          company,
          date: opp.savedAt,
          dateContext:
            diff === 0
              ? "Aujourd'hui"
              : diff === 1
                ? "Hier"
                : `Il y a ${diff} jours`,
          priority: "low",
          message: `Opportunité ${title} ajoutée récemment.`,
          actionLabel: "Voir l'opportunité",
          actionType: "view_opportunity",
        });
      }
    }
  }

  // Intégrer également les événements calendrier du jour ou à venir
  for (const ev of calendarEvents) {
    const diff = calculateDaysDiff(currentDate, ev.date);
    if (
      diff === 0 &&
      !today.some((t) => t.date === ev.date && t.title.includes(ev.titre))
    ) {
      today.push({
        id: `cal-today-${ev.date}-${ev.titre}`,
        opportunityId: ev.opportunityId,
        type: "entretien",
        title: ev.titre,
        company: ev.entreprise || "Calendrier",
        date: ev.date,
        dateContext: "Aujourd'hui",
        priority: "high",
        message: `${ev.type} : ${ev.titre} prévu aujourd'hui.`,
        actionLabel: "Voir le calendrier",
        actionType: "view_calendar",
      });
    } else if (
      diff !== null &&
      diff > 0 &&
      diff <= 14 &&
      !upcoming.some((u) => u.date === ev.date && u.title.includes(ev.titre))
    ) {
      upcoming.push({
        id: `cal-up-${ev.date}-${ev.titre}`,
        opportunityId: ev.opportunityId,
        type: "entretien",
        title: ev.titre,
        company: ev.entreprise || "Calendrier",
        date: ev.date,
        dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
        priority: diff <= 2 ? "high" : "medium",
        message: `${ev.type} prévu le ${ev.date}.`,
        actionLabel: "Voir le calendrier",
        actionType: "view_calendar",
      });
    }
  }

  const limitedToday = today.slice(0, 5);
  const limitedWatch = watch.slice(0, 3);
  const limitedUpcoming = upcoming.slice(0, 5);
  const limitedRecent = recent.slice(0, 5);

  let summary = "Voici ce qui mérite votre attention aujourd'hui.";
  if (
    limitedToday.length === 0 &&
    limitedWatch.length === 0 &&
    limitedUpcoming.length === 0
  ) {
    summary = "Tout est à jour. Aucune action urgente aujourd'hui.";
  } else if (limitedToday.length > 0) {
    summary = `Vous avez ${limitedToday.length} action${limitedToday.length > 1 ? "s" : ""} prioritaire${limitedToday.length > 1 ? "s" : ""} à mener aujourd'hui.`;
  }

  return {
    greeting,
    summary,
    today: limitedToday,
    watch: limitedWatch,
    upcoming: limitedUpcoming,
    recent: limitedRecent,
    generatedAt: new Date().toISOString(),
    isFallback,
  };
}

/**
 * Génère le Daily Brief en appelant l'IA Gemini avec cascade de modèles et schéma structuré.
 */
export async function generateDailyBriefIA(
  input: DailyBriefInputData,
): Promise<DailyBriefData> {
  // Si aucune clé Gemini n'est configurée, repli immédiat sur le générateur déterministe
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    console.info(
      "[Daily Brief] Pas de GEMINI_API_KEY trouvée, utilisation du brief déterministe.",
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
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
    const model = CANDIDATE_MODELS[attempt];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
          systemInstruction: DAILY_BRIEF_SYSTEM_PROMPT,
          temperature: 0.1,
          responseMimeType: "application/json",
          // @ts-expect-error GenAI SDK accepts responseSchema in config
          responseSchema: geminiDailyBriefResponseSchema,
        },
      });

      if (response.text) {
        rawJsonText = response.text;
        break;
      }
    } catch (err: unknown) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      lastError = errorObj;
      console.info(
        `[Daily Brief] Modèle ${model} temporairement indisponible (${attempt + 1}/${CANDIDATE_MODELS.length}), basculement automatique.`,
      );
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

    return {
      greeting: validated.greeting,
      summary: validated.summary,
      today: validated.today.slice(0, 5),
      watch: validated.watch.slice(0, 3),
      upcoming: validated.upcoming.slice(0, 5),
      recent: validated.recent.slice(0, 5),
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
