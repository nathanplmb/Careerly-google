export type ChatModelId =
  "gemini-3.5-flash" | "gemini-3.1-pro-preview" | "gemini-3.1-flash-lite";

export type ChatPersonaId =
  | "general_advisor"
  | "interview_coach"
  | "cv_expert"
  | "job_strategist"
  | "salary_negotiator"
  | "custom";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  modelUsed?: string;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  personaId: ChatPersonaId;
  customSystemInstruction?: string;
  modelId: ChatModelId;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface CandidateContextPayload {
  name?: string;
  titreVise?: string;
  competences?: string[];
  secteur?: string;
  formation?: string;
  experiences?: string;
  langues?: string[];
  localisation?: string;
  contrats?: string;
  remuneration?: string;
  objectifs?: string;
}

export interface ChatRequestPayload {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  modelId: ChatModelId;
  personaId: ChatPersonaId;
  customSystemInstruction?: string;
  candidateContext?: CandidateContextPayload;
}

export interface ChatResponsePayload {
  reply: string;
  modelUsed: string;
  timestamp: string;
}
