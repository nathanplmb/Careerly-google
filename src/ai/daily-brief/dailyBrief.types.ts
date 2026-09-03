export type BriefPriority = "high" | "medium" | "low";

export type BriefActionType =
  "view_opportunity" | "view_calendar" | "prepare" | "follow_up";

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
  actionLabel: string;
  actionType: BriefActionType;
};

export type DailyBriefData = {
  greeting: string;
  summary: string;
  today: BriefItem[];
  watch: BriefItem[];
  upcoming: BriefItem[];
  recent: BriefItem[];
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
