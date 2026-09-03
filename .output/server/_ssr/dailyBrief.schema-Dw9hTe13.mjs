import { c as _enum, f as object, l as array, p as string, u as boolean } from "../_libs/@lovable.dev/mcp-js+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dailyBrief.schema-Dw9hTe13.js
var BriefPriorityZodEnum = _enum([
	"high",
	"medium",
	"low"
]);
var BriefActionTypeZodEnum = _enum([
	"view_opportunity",
	"view_calendar",
	"prepare",
	"follow_up"
]);
var BriefItemTypeZodEnum = _enum([
	"deadline",
	"relance",
	"entretien",
	"preparation",
	"opportunite",
	"autre"
]);
var BriefItemZodSchema = object({
	id: string().default(""),
	opportunityId: string().nullable().optional(),
	type: BriefItemTypeZodEnum.default("autre"),
	title: string().default("Action requise"),
	company: string().default(""),
	date: string().nullable().optional(),
	dateContext: string().nullable().optional(),
	priority: BriefPriorityZodEnum.default("medium"),
	message: string().default(""),
	actionLabel: string().default("Voir l'opportunité"),
	actionType: BriefActionTypeZodEnum.default("view_opportunity")
});
var DailyBriefZodSchema = object({
	greeting: string().default("Bonjour"),
	summary: string().default("Voici votre point d'avancement du jour."),
	today: array(BriefItemZodSchema).default([]),
	watch: array(BriefItemZodSchema).default([]),
	upcoming: array(BriefItemZodSchema).default([]),
	recent: array(BriefItemZodSchema).default([])
});
var OpportunityInputZodSchema = object({
	id: string(),
	entreprise: string().default(""),
	poste: string().default(""),
	statut: string().default(""),
	lieu: string().optional(),
	applicationDeadline: string().nullable().optional(),
	dateLimite: string().nullable().optional(),
	appliedAt: string().nullable().optional(),
	dateEnvoi: string().nullable().optional(),
	followUpDate: string().nullable().optional(),
	dateRelance: string().nullable().optional(),
	lastContactDate: string().nullable().optional(),
	interviewDate: string().nullable().optional(),
	secondInterviewDate: string().nullable().optional(),
	currentWorkflowStep: string().nullable().optional(),
	savedAt: string().nullable().optional(),
	preparedAt: string().nullable().optional(),
	offerReceivedAt: string().nullable().optional(),
	acceptedAt: string().nullable().optional(),
	rejectedAt: string().nullable().optional(),
	notes: string().nullable().optional(),
	archive: boolean().optional()
});
var CalendarEventInputZodSchema = object({
	date: string(),
	titre: string(),
	type: string(),
	entreprise: string().optional(),
	opportunityId: string().optional()
});
var DailyBriefInputZodSchema = object({
	userPrenom: string().optional(),
	currentDate: string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format date invalide YYYY-MM-DD"),
	opportunities: array(OpportunityInputZodSchema).default([]),
	calendarEvents: array(CalendarEventInputZodSchema).optional()
});
var geminiBriefItemSchema = {
	type: "OBJECT",
	properties: {
		id: {
			type: "STRING",
			description: "Identifiant de l'opportunité associée (ou id unique)"
		},
		opportunityId: {
			type: "STRING",
			description: "ID de l'opportunité dans NACORA"
		},
		type: {
			type: "STRING",
			description: "deadline, relance, entretien, preparation, opportunite, autre"
		},
		title: {
			type: "STRING",
			description: "Titre court de l'action ou de l'échéance (ex: Relancer Revolut, Deadline EXO, Entretien visio)"
		},
		company: {
			type: "STRING",
			description: "Nom de l'entreprise concernée"
		},
		date: {
			type: "STRING",
			description: "Date exacte associée au format YYYY-MM-DD si applicable, sinon null"
		},
		dateContext: {
			type: "STRING",
			description: "Contexte temporel ultra-court (ex: Aujourd'hui, Dans 2 jours, Prévue aujourd'hui, Dépassée, Ajoutée hier)"
		},
		priority: {
			type: "STRING",
			description: "high, medium, ou low"
		},
		message: {
			type: "STRING",
			description: "Explication courte, factuelle et actionnable en une seule phrase sans jargon"
		},
		actionLabel: {
			type: "STRING",
			description: "Libellé direct du bouton (ex: Voir l'opportunité, Voir le calendrier, Planifier la relance)"
		},
		actionType: {
			type: "STRING",
			description: "view_opportunity, view_calendar, prepare, follow_up"
		}
	},
	required: [
		"id",
		"type",
		"title",
		"company",
		"priority",
		"message",
		"actionLabel",
		"actionType"
	]
};
var geminiDailyBriefResponseSchema = {
	type: "OBJECT",
	properties: {
		greeting: {
			type: "STRING",
			description: "Salutation chaleureuse personnalisée avec le prénom fourni (ex: Bonjour Nathan)"
		},
		summary: {
			type: "STRING",
			description: "Phrase de synthèse globale résumant les priorités de la journée"
		},
		today: {
			type: "ARRAY",
			items: geminiBriefItemSchema,
			description: "Actions prioritaires à faire aujourd'hui (urgences, deadlines du jour, relances du jour, entretiens du jour - maximum 5 éléments)"
		},
		watch: {
			type: "ARRAY",
			items: geminiBriefItemSchema,
			description: "Éléments à surveiller (deadlines dans les 2 à 7 jours, relances en retard - maximum 3 éléments)"
		},
		upcoming: {
			type: "ARRAY",
			items: geminiBriefItemSchema,
			description: "Événements à venir (entretiens futurs, prochaines étapes - maximum 5 éléments)"
		},
		recent: {
			type: "ARRAY",
			items: geminiBriefItemSchema,
			description: "Activité récente (opportunités récemment sauvegardées ou préparées - maximum 5 éléments)"
		}
	},
	required: [
		"greeting",
		"summary",
		"today",
		"watch",
		"upcoming",
		"recent"
	]
};
//#endregion
export { DailyBriefZodSchema as n, geminiDailyBriefResponseSchema as r, DailyBriefInputZodSchema as t };
