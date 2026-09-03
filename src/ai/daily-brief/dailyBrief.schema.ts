import { z } from "zod";

export const BriefPriorityZodEnum = z.enum(["high", "medium", "low"]);
export const BriefActionTypeZodEnum = z.enum([
  "view_opportunity",
  "view_calendar",
  "prepare",
  "follow_up",
]);
export const BriefItemTypeZodEnum = z.enum([
  "deadline",
  "relance",
  "entretien",
  "preparation",
  "opportunite",
  "autre",
]);

export const BriefItemZodSchema = z.object({
  id: z.string().default(""),
  opportunityId: z.string().nullable().optional(),
  type: BriefItemTypeZodEnum.default("autre"),
  title: z.string().default("Action requise"),
  company: z.string().default(""),
  date: z.string().nullable().optional(),
  dateContext: z.string().nullable().optional(),
  priority: BriefPriorityZodEnum.default("medium"),
  message: z.string().default(""),
  actionLabel: z.string().default("Voir l'opportunité"),
  actionType: BriefActionTypeZodEnum.default("view_opportunity"),
});

export const DailyBriefZodSchema = z.object({
  greeting: z.string().default("Bonjour"),
  summary: z.string().default("Voici votre point d'avancement du jour."),
  today: z.array(BriefItemZodSchema).default([]),
  watch: z.array(BriefItemZodSchema).default([]),
  upcoming: z.array(BriefItemZodSchema).default([]),
  recent: z.array(BriefItemZodSchema).default([]),
});

export const OpportunityInputZodSchema = z.object({
  id: z.string(),
  entreprise: z.string().default(""),
  poste: z.string().default(""),
  statut: z.string().default(""),
  lieu: z.string().optional(),
  applicationDeadline: z.string().nullable().optional(),
  dateLimite: z.string().nullable().optional(),
  appliedAt: z.string().nullable().optional(),
  dateEnvoi: z.string().nullable().optional(),
  followUpDate: z.string().nullable().optional(),
  dateRelance: z.string().nullable().optional(),
  lastContactDate: z.string().nullable().optional(),
  interviewDate: z.string().nullable().optional(),
  secondInterviewDate: z.string().nullable().optional(),
  currentWorkflowStep: z.string().nullable().optional(),
  savedAt: z.string().nullable().optional(),
  preparedAt: z.string().nullable().optional(),
  offerReceivedAt: z.string().nullable().optional(),
  acceptedAt: z.string().nullable().optional(),
  rejectedAt: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  archive: z.boolean().optional(),
});

export const CalendarEventInputZodSchema = z.object({
  date: z.string(),
  titre: z.string(),
  type: z.string(),
  entreprise: z.string().optional(),
  opportunityId: z.string().optional(),
});

export const DailyBriefInputZodSchema = z.object({
  userPrenom: z.string().optional(),
  currentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format date invalide YYYY-MM-DD"),
  opportunities: z.array(OpportunityInputZodSchema).default([]),
  calendarEvents: z.array(CalendarEventInputZodSchema).optional(),
});

const geminiBriefItemSchema = {
  type: "OBJECT" as const,
  properties: {
    id: {
      type: "STRING" as const,
      description: "Identifiant de l'opportunité associée (ou id unique)",
    },
    opportunityId: {
      type: "STRING" as const,
      description: "ID de l'opportunité dans NACORA",
    },
    type: {
      type: "STRING" as const,
      description:
        "deadline, relance, entretien, preparation, opportunite, autre",
    },
    title: {
      type: "STRING" as const,
      description:
        "Titre court de l'action ou de l'échéance (ex: Relancer Revolut, Deadline EXO, Entretien visio)",
    },
    company: {
      type: "STRING" as const,
      description: "Nom de l'entreprise concernée",
    },
    date: {
      type: "STRING" as const,
      description:
        "Date exacte associée au format YYYY-MM-DD si applicable, sinon null",
    },
    dateContext: {
      type: "STRING" as const,
      description:
        "Contexte temporel ultra-court (ex: Aujourd'hui, Dans 2 jours, Prévue aujourd'hui, Dépassée, Ajoutée hier)",
    },
    priority: {
      type: "STRING" as const,
      description: "high, medium, ou low",
    },
    message: {
      type: "STRING" as const,
      description:
        "Explication courte, factuelle et actionnable en une seule phrase sans jargon",
    },
    actionLabel: {
      type: "STRING" as const,
      description:
        "Libellé direct du bouton (ex: Voir l'opportunité, Voir le calendrier, Planifier la relance)",
    },
    actionType: {
      type: "STRING" as const,
      description: "view_opportunity, view_calendar, prepare, follow_up",
    },
  },
  required: [
    "id",
    "type",
    "title",
    "company",
    "priority",
    "message",
    "actionLabel",
    "actionType",
  ],
};

export const geminiDailyBriefResponseSchema = {
  type: "OBJECT" as const,
  properties: {
    greeting: {
      type: "STRING" as const,
      description:
        "Salutation chaleureuse personnalisée avec le prénom fourni (ex: Bonjour Nathan)",
    },
    summary: {
      type: "STRING" as const,
      description:
        "Phrase de synthèse globale résumant les priorités de la journée",
    },
    today: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "Actions prioritaires à faire aujourd'hui (urgences, deadlines du jour, relances du jour, entretiens du jour - maximum 5 éléments)",
    },
    watch: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "Éléments à surveiller (deadlines dans les 2 à 7 jours, relances en retard - maximum 3 éléments)",
    },
    upcoming: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "Événements à venir (entretiens futurs, prochaines étapes - maximum 5 éléments)",
    },
    recent: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "Activité récente (opportunités récemment sauvegardées ou préparées - maximum 5 éléments)",
    },
  },
  required: ["greeting", "summary", "today", "watch", "upcoming", "recent"],
};
