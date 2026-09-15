export type BriefPriority = "high" | "medium" | "low";

/**
 * Catalogue exhaustif des actions autorisées pour le Daily Brief.
 * L'IA et le moteur déterministe ne peuvent recommander que des actions de ce catalogue.
 */
export type BriefActionId =
  | "VIEW_OPPORTUNITY"
  | "UPDATE_DEADLINE"
  | "DELETE_OPPORTUNITY"
  | "KEEP_OPPORTUNITY"
  | "CHANGE_STAGE"
  | "MARK_APPLIED"
  | "PREPARE_APPLICATION"
  | "PLAN_FOLLOW_UP"
  | "OPEN_CONTACT"
  | "OPEN_COMPANY"
  | "OPEN_CALENDAR";

export type BriefActionVariant =
  "default" | "secondary" | "outline" | "destructive" | "ghost";

export type BriefActionItem = {
  id: BriefActionId;
  label: string;
  variant?: BriefActionVariant;
};

export type BriefItemType =
  | "deadline"
  | "relance"
  | "entretien"
  | "preparation"
  | "opportunite"
  | "autre";

export type BriefItem = {
  id: string;
  opportunityId?: string | null;
  type: BriefItemType;
  title: string;
  company: string;
  date?: string | null;
  dateContext?: string | null;
  priority: BriefPriority;
  message: string;
  recommendedActions: BriefActionItem[];
  // Rétrocompatibilité
  actionLabel?: string;
  actionType?: string;
};

export type DailyBriefData = {
  greeting: string;
  summary: string;
  today: BriefItem[]; // Max 5
  watch: BriefItem[]; // Max 3
  upcoming: BriefItem[]; // Max 5
  recent?: BriefItem[]; // Déprécié, conservé pour rétrocompatibilité
  generatedAt: string;
  isFallback?: boolean;
};

export type OpportunityInputForBrief = {
  id: string;
  entreprise: string;
  poste: string;
  statut: string;
  lieu?: string;
  applicationDeadline?: string | null;
  dateLimite?: string | null;
  appliedAt?: string | null;
  dateEnvoi?: string | null;
  followUpDate?: string | null;
  dateRelance?: string | null;
  lastContactDate?: string | null;
  interviewDate?: string | null;
  secondInterviewDate?: string | null;
  currentWorkflowStep?: string | null;
  savedAt?: string | null;
  preparedAt?: string | null;
  offerReceivedAt?: string | null;
  acceptedAt?: string | null;
  rejectedAt?: string | null;
  notes?: string | null;
  archive?: boolean;
  // Contexte contact et entreprise enrichi
  contactNom?: string | null;
  contactEmail?: string | null;
  contactRole?: string | null;
  hasContact?: boolean;
  companyId?: string | null;
  keepAcknowledgedAt?: string | null;
};

export type CalendarEventInputForBrief = {
  date: string;
  titre: string;
  type: string;
  entreprise?: string;
  opportunityId?: string;
};

export type DailyBriefInputData = {
  userPrenom?: string;
  currentDate: string; // Format ISO YYYY-MM-DD
  opportunities: OpportunityInputForBrief[];
  calendarEvents?: CalendarEventInputForBrief[];
};
