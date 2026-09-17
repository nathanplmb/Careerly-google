export type BriefPriority = "high" | "medium" | "low";

/**
 * Catalogue exhaustif des actions autorisées pour le Daily Brief.
 * L'IA et le moteur déterministe ne peuvent recommander que des actions de ce catalogue.
 */
export type BriefActionId =
  | "VIEW_OPPORTUNITY"
  | "UPDATE_DEADLINE"
  | "VERIFY_DEADLINE"
  | "DEADLINE_EXTEND_7"
  | "DEADLINE_EXTEND_14"
  | "DEADLINE_REMOVE"
  | "DELETE_OPPORTUNITY"
  | "KEEP_OPPORTUNITY"
  | "CHANGE_STAGE"
  | "MARK_APPLIED"
  | "MARK_FOLLOW_UP"
  | "PREPARE_APPLICATION"
  | "CONTINUE_APPLICATION"
  | "PREPARE_INTERVIEW"
  | "PLAN_FOLLOW_UP"
  | "GENERATE_EMAIL"
  | "VIEW_NOTES"
  | "ANALYZE_OFFER"
  | "APPLY_NOW"
  | "PLAN_TOMORROW"
  | "PLAN_LATER"
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

export type BriefCategory =
  "urgent" | "action" | "relance" | "entretien" | "decision" | "watch";

export type BriefItem = {
  id: string;
  opportunityId?: string | null;
  type: BriefItemType;
  category?: BriefCategory | string;
  categoryLabel?: string;
  title: string;
  company: string;
  shortRole?: string | null;
  date?: string | null;
  dateContext?: string | null;
  priority: BriefPriority;
  message: string;
  reason?: string;
  primaryAction?: BriefActionItem;
  secondaryActions?: BriefActionItem[];
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
  lien?: string | null;
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
  hasArguments?: boolean;
  isPrepared?: boolean;
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
