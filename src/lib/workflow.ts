/**
 * Module Workflow de Candidature — NACORA
 * Gestion du lifecycle d'une opportunité :
 * Sauvegardée -> À préparer -> Candidature envoyée -> Relance -> Entretien -> Deuxième entretien -> Offre reçue -> Acceptée / Refusée
 */

import { todayIso, type Statut } from "./candidatures";

export type WorkflowStepKey =
  | "saved"
  | "to_prepare"
  | "application_sent"
  | "follow_up"
  | "interview"
  | "second_interview"
  | "offer_received"
  | "accepted"
  | "rejected";

export interface WorkflowEvent {
  id: string;
  type: WorkflowStepKey;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  note?: string;
  channel?: string; // ex: JobTeaser, LinkedIn, Site entreprise, Email...
  interviewType?: string; // ex: Visio, Présentiel, Téléphone
  interlocuteur?: string; // Nom du contact recruteur
  interlocuteurEmail?: string;
  interlocuteurPhone?: string;
  location?: string;
  createdAt?: string;
}

export interface WorkflowStepConfig {
  key: WorkflowStepKey;
  label: string;
  shortLabel: string;
  statutLabel: Statut;
  category: "opportunite" | "demarche" | "entretien" | "decision";
  description: string;
  defaultActionLabel: string;
  nextStepKey?: WorkflowStepKey;
  isTerminal?: boolean;
  terminalType?: "success" | "failure";
  badgeColor: string;
}

export const WORKFLOW_STEPS_CONFIG: readonly WorkflowStepConfig[] = [
  {
    key: "saved",
    label: "Sauvegardée",
    shortLabel: "Sauvegardée",
    statutLabel: "Sauvegardée",
    category: "opportunite",
    description: "Opportunité ajoutée et conservée dans NACORA",
    defaultActionLabel: "Préparer ma candidature",
    nextStepKey: "to_prepare",
    badgeColor: "bg-muted text-muted-foreground border-border",
  },
  {
    key: "to_prepare",
    label: "À préparer",
    shortLabel: "À préparer",
    statutLabel: "À préparer",
    category: "opportunite",
    description: "Ciblage, adaptation du CV et préparation des arguments",
    defaultActionLabel: "Marquer comme envoyée",
    nextStepKey: "application_sent",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    key: "application_sent",
    label: "Candidature envoyée",
    shortLabel: "Envoyée",
    statutLabel: "Candidature envoyée",
    category: "demarche",
    description: "Dossier de candidature transmis à l'entreprise",
    defaultActionLabel: "Planifier une relance",
    nextStepKey: "follow_up",
    badgeColor: "bg-accent text-accent-foreground border-primary/30",
  },
  {
    key: "follow_up",
    label: "Relance",
    shortLabel: "Relance",
    statutLabel: "Relancée",
    category: "demarche",
    description: "Relance planifiée ou effectuée auprès du recruteur",
    defaultActionLabel: "Ajouter un entretien",
    nextStepKey: "interview",
    badgeColor: "bg-primary/20 text-primary border-primary/40",
  },
  {
    key: "interview",
    label: "Entretien",
    shortLabel: "Entretien 1",
    statutLabel: "Entretien",
    category: "entretien",
    description: "Premier entretien de recrutement (RH / Manager)",
    defaultActionLabel: "Programmer un 2e entretien",
    nextStepKey: "second_interview",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    key: "second_interview",
    label: "Deuxième entretien",
    shortLabel: "Entretien 2",
    statutLabel: "Deuxième entretien",
    category: "entretien",
    description:
      "Entretien approfondi, technique ou rencontre avec la direction",
    defaultActionLabel: "Marquer offre reçue",
    nextStepKey: "offer_received",
    badgeColor: "bg-emerald-500/25 text-emerald-400 border-emerald-500/40",
  },
  {
    key: "offer_received",
    label: "Offre reçue",
    shortLabel: "Offre reçue",
    statutLabel: "Offre reçue",
    category: "decision",
    description: "Proposition d'embauche ou contrat de travail reçu",
    defaultActionLabel: "Marquer comme acceptée",
    nextStepKey: "accepted",
    badgeColor: "bg-emerald-500/30 text-emerald-300 border-emerald-500/50",
  },
  {
    key: "accepted",
    label: "Acceptée",
    shortLabel: "Acceptée",
    statutLabel: "Acceptée",
    category: "decision",
    description: "Offre acceptée et contrat validé !",
    defaultActionLabel: "Offre acceptée",
    isTerminal: true,
    terminalType: "success",
    badgeColor:
      "bg-emerald-500/30 text-emerald-300 border-emerald-400/60 font-semibold",
  },
  {
    key: "rejected",
    label: "Refusée",
    shortLabel: "Refusée",
    statutLabel: "Refusée",
    category: "decision",
    description: "Candidature déclinée ou non retenue",
    defaultActionLabel: "Candidature clôturée",
    isTerminal: true,
    terminalType: "failure",
    badgeColor: "bg-destructive/15 text-destructive border-destructive/30",
  },
] as const;

export const CHANNELS_COMMUNICATION = [
  "JobTeaser",
  "LinkedIn",
  "Welcome to the Jungle",
  "Indeed",
  "Site entreprise",
  "Email direct",
  "Candidature spontanée",
  "Réseau / Recommandation",
  "Autre",
] as const;

export const TYPES_ENTRETIEN = [
  "Visio (Teams, Meet, Zoom)",
  "Présentiel",
  "Téléphonique",
  "Autre",
] as const;

/** Retrouve la configuration d'une étape par sa clé. */
export function getWorkflowStepConfig(
  key: WorkflowStepKey,
): WorkflowStepConfig {
  const found = WORKFLOW_STEPS_CONFIG.find((s) => s.key === key);
  return found || WORKFLOW_STEPS_CONFIG[0];
}

/** Convertit un statut texte en clé d'étape du workflow. */
export function statutToWorkflowStepKey(
  statut?: string | null,
): WorkflowStepKey {
  if (!statut) return "saved";
  const s = statut.trim().toLowerCase();

  if (
    s.includes("refus") ||
    s.includes("clôtur") ||
    s.includes("sans réponse")
  ) {
    return "rejected";
  }
  if (s.includes("accept")) {
    return "accepted";
  }
  if (s.includes("offre")) {
    return "offer_received";
  }
  if (
    s.includes("deuxième") ||
    s.includes("2e entretien") ||
    s.includes("second")
  ) {
    return "second_interview";
  }
  if (s.includes("entretien")) {
    return "interview";
  }
  if (s.includes("relanc")) {
    return "follow_up";
  }
  if (s.includes("envoy") || s.includes("postul") || s.includes("candidat")) {
    return "application_sent";
  }
  if (s.includes("prépar") || s.includes("étudier")) {
    return "to_prepare";
  }
  return "saved";
}

/** Convertit une clé d'étape en Statut officiel NACORA. */
export function workflowStepKeyToStatut(key: WorkflowStepKey): Statut {
  const config = getWorkflowStepConfig(key);
  return config.statutLabel;
}

/**
 * Migration transparente : garantit qu'une opportunité existante dispose
 * toujours d'une liste d'événements et d'une étape actuelle cohérentes.
 */
export function buildInitialWorkflowEvents(params: {
  statut?: string | null;
  savedAt?: string | null;
  appliedAt?: string | null;
  dateEnvoi?: string | null;
  followUpDate?: string | null;
  dateRelance?: string | null;
  interviewDate?: string | null;
  secondInterviewDate?: string | null;
  dateDernierContact?: string | null;
  offerReceivedAt?: string | null;
  acceptedAt?: string | null;
  rejectedAt?: string | null;
  contact?: string | null;
  source?: string | null;
  personalNotes?: string | null;
  commentaire?: string | null;
}): { currentStep: WorkflowStepKey; events: WorkflowEvent[] } {
  const currentStep = statutToWorkflowStepKey(params.statut);
  const events: WorkflowEvent[] = [];
  const today = todayIso();

  // 1. Événement initial "Sauvegardée"
  const savedDate = params.savedAt || params.dateEnvoi || today;
  events.push({
    id: "evt-saved",
    type: "saved",
    date: savedDate,
    note: "Opportunité ajoutée à NACORA",
    createdAt: new Date().toISOString(),
  });

  // 2. Événement "À préparer" si statut actuel est to_prepare
  if (currentStep === "to_prepare") {
    events.push({
      id: "evt-prep",
      type: "to_prepare",
      date: today,
      note: "Préparation de la candidature en cours",
      createdAt: new Date().toISOString(),
    });
  }

  // 3. Événement "Candidature envoyée"
  const sendDate = params.appliedAt || params.dateEnvoi;
  const isSentOrBeyond = [
    "application_sent",
    "follow_up",
    "interview",
    "second_interview",
    "offer_received",
    "accepted",
  ].includes(currentStep);

  if (sendDate || isSentOrBeyond) {
    events.push({
      id: "evt-applied",
      type: "application_sent",
      date: sendDate || savedDate,
      channel: params.source || "JobTeaser",
      note: "Candidature transmise à l'entreprise",
      createdAt: new Date().toISOString(),
    });
  }

  // 4. Événement "Relance"
  const relanceDate = params.followUpDate || params.dateRelance;
  if (relanceDate || currentStep === "follow_up") {
    events.push({
      id: "evt-followup",
      type: "follow_up",
      date: relanceDate || today,
      note: "Relance planifiée auprès de l'entreprise",
      createdAt: new Date().toISOString(),
    });
  }

  // 5. Événement "Entretien"
  const hasInterview =
    currentStep === "interview" ||
    currentStep === "second_interview" ||
    currentStep === "offer_received" ||
    currentStep === "accepted" ||
    Boolean(params.interviewDate);

  if (hasInterview) {
    events.push({
      id: "evt-interview",
      type: "interview",
      date: params.interviewDate || params.dateDernierContact || today,
      interviewType: "Visio (Teams, Meet, Zoom)",
      interlocuteur: params.contact || undefined,
      note: "Premier échange de recrutement",
      createdAt: new Date().toISOString(),
    });
  }

  // 6. Événement "Deuxième entretien"
  if (currentStep === "second_interview" || params.secondInterviewDate) {
    events.push({
      id: "evt-second-interview",
      type: "second_interview",
      date: params.secondInterviewDate || params.dateDernierContact || today,
      interviewType: "Visio (Teams, Meet, Zoom)",
      interlocuteur: params.contact || undefined,
      note: "Deuxième entretien approfondi",
      createdAt: new Date().toISOString(),
    });
  }

  // 7. Événement "Offre reçue"
  if (currentStep === "offer_received" || params.offerReceivedAt) {
    events.push({
      id: "evt-offer",
      type: "offer_received",
      date: params.offerReceivedAt || today,
      note: "Proposition d'embauche reçue",
      createdAt: new Date().toISOString(),
    });
  }

  // 8. Événement "Acceptée"
  if (currentStep === "accepted" || params.acceptedAt) {
    events.push({
      id: "evt-accepted",
      type: "accepted",
      date: params.acceptedAt || today,
      note: "Offre acceptée et contrat validé",
      createdAt: new Date().toISOString(),
    });
  }

  // 9. Événement "Refusée"
  if (currentStep === "rejected" || params.rejectedAt) {
    events.push({
      id: "evt-rejected",
      type: "rejected",
      date: params.rejectedAt || today,
      note: "Candidature non retenue",
      createdAt: new Date().toISOString(),
    });
  }

  return { currentStep, events };
}

/** Synchronise les champs de dates dérivés d'après les événements du workflow. */
export function extractDatesFromWorkflowEvents(events: WorkflowEvent[]): {
  savedAt: string | null;
  preparedAt: string | null;
  appliedAt: string | null;
  followUpDate: string | null;
  interviewDate: string | null;
  secondInterviewDate: string | null;
  offerReceivedAt: string | null;
  acceptedAt: string | null;
  rejectedAt: string | null;
  lastContactDate: string | null;
} {
  const getLatestDate = (type: WorkflowStepKey): string | null => {
    const matches = events.filter((e) => e.type === type && e.date);
    if (!matches.length) return null;
    return matches[matches.length - 1].date;
  };

  const interviewDate = getLatestDate("interview");
  const secondInterviewDate = getLatestDate("second_interview");
  const followUpDate = getLatestDate("follow_up");
  const appliedAt = getLatestDate("application_sent");

  // Dernier contact calculé à partir des dates les plus récentes d'interaction
  const lastContactDate =
    secondInterviewDate || interviewDate || followUpDate || appliedAt || null;

  return {
    savedAt: getLatestDate("saved"),
    preparedAt: getLatestDate("to_prepare"),
    appliedAt,
    followUpDate,
    interviewDate,
    secondInterviewDate,
    offerReceivedAt: getLatestDate("offer_received"),
    acceptedAt: getLatestDate("accepted"),
    rejectedAt: getLatestDate("rejected"),
    lastContactDate,
  };
}
