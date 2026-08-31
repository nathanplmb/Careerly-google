export type AiWorkflowStep =
  "offre" | "match" | "pitch" | "contact" | "interview";

export type AiOffreData = {
  texte: string;
  entreprise: string;
  poste: string;
  lieu: string;
  lien: string;
  dateLimite: string;
  missions: string;
  profilRecherche: string;
  secteur: string;
  priorite: string;
  contactRecruteur: string;
  candidatureIdLiee?: string;
};

export type AiMatchResult = {
  global: number;
  competences: number;
  experience: number;
  formation: number;
  synthese: string;
  pointsForts: string[];
  pointsVigilance: string[];
  competencesManquantes: string[];
  recommandations: string[];
};

export type AiPitchResult = {
  pitchAccroche: string;
  lettreMotivation: string;
  pointsAValoriser: string[];
  motsClesAInserer: string[];
};

export type AiContactResult = {
  emailCandidature: string;
  emailRelance: string;
  noteLinkedin: string;
  messageLinkedin: string;
  conseilsApproche: string[];
};

export type AiInterviewResult = {
  questions: { question: string; categorie: string; pistes: string[] }[];
  argumentsCles: string[];
  pointsFaibles: string[];
  questionsARecruteur: string[];
};

export type AiHistoryItem = {
  id: string;
  type: "offre" | "match" | "pitch" | "contact" | "interview" | "tri";
  titre: string;
  sousTitre?: string;
  date: string;
  apercu: string;
  offreData?: Partial<AiOffreData>;
  matchData?: Partial<AiMatchResult>;
  pitchData?: Partial<AiPitchResult>;
  contactData?: Partial<AiContactResult>;
  interviewData?: Partial<AiInterviewResult>;
};

const STORAGE_KEY = "careerly_ai_history_v1";

export function getAiHistory(): AiHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAiHistoryItem(
  item: Omit<AiHistoryItem, "id" | "date"> & { id?: string },
): AiHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getAiHistory();
    const newItem: AiHistoryItem = {
      ...item,
      id:
        item.id || `ai_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
    };
    // Keep max 20 items, unique by ID
    const filtered = current.filter((h) => h.id !== newItem.id);
    const updated = [newItem, ...filtered].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteAiHistoryItem(id: string): AiHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getAiHistory();
    const updated = current.filter((h) => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearAiHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
