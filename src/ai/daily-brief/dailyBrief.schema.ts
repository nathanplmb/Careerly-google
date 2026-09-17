import { z } from "zod";

export const BriefPriorityZodEnum = z.enum(["high", "medium", "low"]);

export const BriefActionIdZodEnum = z.enum([
  "VIEW_OPPORTUNITY",
  "UPDATE_DEADLINE",
  "DELETE_OPPORTUNITY",
  "KEEP_OPPORTUNITY",
  "CHANGE_STAGE",
  "MARK_APPLIED",
  "PREPARE_APPLICATION",
  "PLAN_FOLLOW_UP",
  "OPEN_CONTACT",
  "OPEN_COMPANY",
  "OPEN_CALENDAR",
  // Variantes minuscules acceptées par tolérance
  "view_opportunity",
  "update_deadline",
  "delete_opportunity",
  "keep_opportunity",
  "change_stage",
  "mark_applied",
  "prepare_application",
  "plan_follow_up",
  "open_contact",
  "open_company",
  "open_calendar",
  "view_calendar",
  "prepare",
  "follow_up",
]);

export const BriefActionVariantZodEnum = z.enum([
  "default",
  "secondary",
  "outline",
  "destructive",
  "ghost",
]);

export const BriefActionItemZodSchema = z.object({
  id: z.string(),
  label: z.string(),
  variant: BriefActionVariantZodEnum.optional().default("secondary"),
});

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
  category: z.string().optional(),
  categoryLabel: z.string().optional(),
  title: z.string().default("Action requise"),
  company: z.string().default(""),
  date: z.string().nullable().optional(),
  dateContext: z.string().nullable().optional(),
  priority: BriefPriorityZodEnum.default("medium"),
  message: z.string().default(""),
  recommendedActions: z.array(BriefActionItemZodSchema).default([]),
  actionLabel: z.string().optional(),
  actionType: z.string().optional(),
});

export const DailyBriefZodSchema = z.object({
  greeting: z.string().default("Bonjour"),
  summary: z.string().default("Voici votre point d'avancement du jour."),
  today: z.array(BriefItemZodSchema).default([]),
  watch: z.array(BriefItemZodSchema).default([]),
  upcoming: z.array(BriefItemZodSchema).default([]),
  recent: z.array(BriefItemZodSchema).optional().default([]),
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
  contactNom: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  contactRole: z.string().nullable().optional(),
  hasContact: z.boolean().optional(),
  companyId: z.string().nullable().optional(),
  keepAcknowledgedAt: z.string().nullable().optional(),
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

const geminiBriefActionSchema = {
  type: "OBJECT" as const,
  properties: {
    id: {
      type: "STRING" as const,
      description:
        "Identifiant de l'action autorisée parmi : VIEW_OPPORTUNITY, UPDATE_DEADLINE, DELETE_OPPORTUNITY, KEEP_OPPORTUNITY, CHANGE_STAGE, MARK_APPLIED, PREPARE_APPLICATION, PLAN_FOLLOW_UP, OPEN_CONTACT, OPEN_COMPANY, OPEN_CALENDAR",
    },
    label: {
      type: "STRING" as const,
      description:
        "Libellé court du bouton d'action (ex: Mettre à jour, Garder, Supprimer, Préparer, Planifier la relance)",
    },
    variant: {
      type: "STRING" as const,
      description: "default, secondary, outline, destructive, ghost",
    },
  },
  required: ["id", "label"],
};

const geminiBriefItemSchema = {
  type: "OBJECT" as const,
  properties: {
    id: {
      type: "STRING" as const,
      description: "Identifiant unique de la recommandation",
    },
    opportunityId: {
      type: "STRING" as const,
      description:
        "ID exact de l'opportunité dans NACORA (doit exister dans les données fournies)",
    },
    type: {
      type: "STRING" as const,
      description:
        "deadline, relance, entretien, preparation, opportunite, autre",
    },
    category: {
      type: "STRING" as const,
      description: "urgent, action, relance, decision, watch",
    },
    categoryLabel: {
      type: "STRING" as const,
      description: "URGENT, À FAIRE, RELANCE, À DÉCIDER, À SURVEILLER",
    },
    title: {
      type: "STRING" as const,
      description:
        "Titre concis (ex: EXO — Deadline dépassée, Dassault — Entretien jeudi)",
    },
    company: {
      type: "STRING" as const,
      description: "Nom de l'entreprise",
    },
    date: {
      type: "STRING" as const,
      description: "Date exacte YYYY-MM-DD si applicable, sinon null",
    },
    dateContext: {
      type: "STRING" as const,
      description:
        "Contexte temporel direct (ex: Aujourd'hui, Dépassée, Dans 2 jours, Jeudi 14h)",
    },
    priority: {
      type: "STRING" as const,
      description: "high, medium, ou low",
    },
    message: {
      type: "STRING" as const,
      description:
        "Une seule phrase directe, factuelle et claire expliquant la situation sans fioritures",
    },
    recommendedActions: {
      type: "ARRAY" as const,
      items: geminiBriefActionSchema,
      description:
        "1 à 3 actions concrètes et adaptées à la situation issues du catalogue autorisé",
    },
  },
  required: [
    "id",
    "type",
    "title",
    "company",
    "priority",
    "message",
    "recommendedActions",
  ],
};

export const geminiDailyBriefResponseSchema = {
  type: "OBJECT" as const,
  properties: {
    greeting: {
      type: "STRING" as const,
      description: "Salutation personnalisée courte (ex: Bonjour Nathan)",
    },
    summary: {
      type: "STRING" as const,
      description:
        "Une seule phrase résumant l'état du jour ou 'Tout est à jour. Aucune action urgente aujourd'hui.' si calme",
    },
    today: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "À FAIRE AUJOURD'HUI : actions prioritaires requises aujourd'hui (maximum 5 éléments)",
    },
    watch: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "À SURVEILLER : éléments nécessitant attention/décision sans urgence immédiate (maximum 3 éléments)",
    },
    upcoming: {
      type: "ARRAY" as const,
      items: geminiBriefItemSchema,
      description:
        "À VENIR : événements confirmés des prochains jours (maximum 5 éléments)",
    },
  },
  required: ["greeting", "summary", "today", "watch", "upcoming"],
};
