import type {
  OpportunityCompanyMetric,
  OpportunityLanguage,
} from "@/ai/opportunity/opportunity.types";
import {
  buildInitialWorkflowEvents,
  extractDatesFromWorkflowEvents,
  statutToWorkflowStepKey,
  type WorkflowEvent,
  type WorkflowStepKey,
} from "./workflow";

export const STATUTS_OPPORTUNITE = [
  "Sauvegardée",
  "À préparer",
  "À étudier",
  "À candidater",
] as const;

export const STATUTS_CANDIDATURE = [
  "Candidature envoyée",
  "Relancée",
  "Entretien",
  "Deuxième entretien",
  "Offre reçue",
  "Acceptée",
  "Refusée",
  "Sans réponse",
  "Clôturée",
] as const;

export const STATUTS = [
  ...STATUTS_OPPORTUNITE,
  ...STATUTS_CANDIDATURE,
] as const;

export type Statut = (typeof STATUTS)[number];
export type StatutOpportunite = (typeof STATUTS_OPPORTUNITE)[number];
export type StatutCandidature = (typeof STATUTS_CANDIDATURE)[number];

export const PRIORITES = ["Haute", "Moyenne", "Faible"] as const;
export type Priorite = (typeof PRIORITES)[number];
/** "auto" = priorité calculée par l'app, sinon priorité choisie manuellement. */
export type PrioriteChoix = Priorite | "auto";

export const SOURCES = [
  "LinkedIn",
  "Welcome to the Jungle",
  "JobTeaser",
  "Indeed",
  "Site entreprise",
  "Candidature spontanée",
  "Réseau",
  "École",
  "Autre",
] as const;
export type Source = (typeof SOURCES)[number];

/** Codes de recommandation (les anciennes analyses peuvent contenir un libellé libre). */

export type Preparation = {
  pourquoiEntreprise: string;
  pourquoiPoste: string;
  notes: string;
  questionsRH?: string;
};

export function emptyPreparation(): Preparation {
  return {
    pourquoiEntreprise: "",
    pourquoiPoste: "",
    notes: "",
  };
}

export type WorkflowStepId = "offre" | "pitch" | "contact" | "interview";

export type WorkflowProgress = {
  currentStep: WorkflowStepId;
  completedSteps: WorkflowStepId[];
  lastUpdated?: string;
};

export type MatchScore = {
  global: number;
  explication: string;
  criteres?: { critere: string; score: number }[];
};

export type Candidature = {
  match?: MatchScore;
  id: string;
  entreprise: string;
  poste: string;
  statut: Statut;
  lieu: string;
  lien: string;
  contact: string;
  dateEnvoi: string; // yyyy-mm-dd
  dateRelance: string;
  dateDernierContact: string;
  dateLimite: string; // date limite pour postuler
  commentaire: string;
  missions: string;
  profilRecherche: string;
  modalites: string;
  detail: string;
  // V2.1
  priorite: PrioriteChoix;
  source: string;
  secteur: string;
  archive: boolean;
  preparation: Preparation;
  workflowProgress?: WorkflowProgress;

  // Opportunity Intelligence V2 - Données extraites de l'offre
  title?: string;
  company?: string;
  location?: string;
  country?: string | null;
  contractType?: string | null;
  duration?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  salary?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string | null;
  remotePolicy?: string | null;
  remoteDetails?: string | null;
  applicationDeadline?: string | null;
  jobFunction?: string | null;
  educationLevel?: string | null;
  sourceUrl?: string | null;

  missionsList?: string[];
  responsibilities?: string[];

  requiredSkills?: string[];
  preferredSkills?: string[];
  tools?: string[];
  requiredLanguages?: OpportunityLanguage[];
  preferredLanguages?: OpportunityLanguage[];
  qualities?: string[];
  experienceRequirements?: string | null;
  educationRequirements?: string[];

  companyName?: string | null;
  companyDescription?: string | null;
  companySector?: string | null;
  companySize?: string | null;
  companyLocation?: string | null;
  companyWebsite?: string | null;
  companyContext?: string[];
  companyPartners?: string[];
  companyMetrics?: OpportunityCompanyMetric[];

  recruitmentProcess?: string[];
  applicationMethod?: string | null;
  applicationRequirements?: string[];

  benefits?: string[];

  sourceType?: string | null;
  sourceName?: string | null;
  sourcePublishedAt?: string | null;
  extractedAt?: string | null;

  // Suivi & Workflow NACORA
  status?: Statut;
  appliedAt?: string | null;
  followUpDate?: string | null;
  lastContactDate?: string | null;
  personalNotes?: string;

  // Workflow de Candidature V2
  currentWorkflowStep?: WorkflowStepKey;
  workflowEvents?: WorkflowEvent[];
  savedAt?: string | null;
  preparedAt?: string | null;
  interviewDate?: string | null;
  secondInterviewDate?: string | null;
  offerReceivedAt?: string | null;
  acceptedAt?: string | null;
  rejectedAt?: string | null;
};

export type Opportunity = Candidature;

export const STORAGE_KEY = "neoma-suivi-stage-v1";

export function emptyCandidature(): Candidature {
  return {
    id: crypto.randomUUID(),
    entreprise: "",
    poste: "",
    statut: "Sauvegardée",
    lieu: "",
    lien: "",
    contact: "",
    dateEnvoi: "",
    dateRelance: "",
    dateDernierContact: "",
    dateLimite: "",
    commentaire: "",
    missions: "",
    profilRecherche: "",
    modalites: "",
    detail: "",
    priorite: "auto",
    source: "",
    secteur: "",
    archive: false,
    preparation: emptyPreparation(),
    workflowProgress: {
      currentStep: "offre",
      completedSteps: ["offre"],
    },

    title: "",
    company: "",
    location: "",
    country: null,
    contractType: null,
    duration: null,
    startDate: null,
    endDate: null,
    salary: null,
    salaryMin: null,
    salaryMax: null,
    salaryCurrency: null,
    remotePolicy: null,
    remoteDetails: null,
    applicationDeadline: null,
    jobFunction: null,
    educationLevel: null,
    sourceUrl: null,

    missionsList: [],
    responsibilities: [],

    requiredSkills: [],
    preferredSkills: [],
    tools: [],
    requiredLanguages: [],
    preferredLanguages: [],
    qualities: [],
    experienceRequirements: null,
    educationRequirements: [],

    companyName: null,
    companyDescription: null,
    companySector: null,
    companySize: null,
    companyLocation: null,
    companyWebsite: null,
    companyContext: [],
    companyPartners: [],
    companyMetrics: [],

    recruitmentProcess: [],
    applicationMethod: null,
    applicationRequirements: [],

    benefits: [],

    sourceType: null,
    sourceName: null,
    sourcePublishedAt: null,
    extractedAt: null,

    status: "Sauvegardée",
    appliedAt: null,
    followUpDate: null,
    lastContactDate: null,
    personalNotes: "",

    currentWorkflowStep: "saved",
    workflowEvents: [
      {
        id: crypto.randomUUID(),
        type: "saved",
        date: todayIso(),
        note: "Opportunité ajoutée à NACORA",
        createdAt: new Date().toISOString(),
      },
    ],
    savedAt: todayIso(),
    preparedAt: null,
    interviewDate: null,
    secondInterviewDate: null,
    offerReceivedAt: null,
    acceptedAt: null,
    rejectedAt: null,
  };
}

/** Sépare intelligemment les blocs structurés (missions, profil, modalités) du texte brut de l'offre si présent. */
export function extraireSectionsDetail(detail: string): {
  missions: string;
  profilRecherche: string;
  modalites: string;
  detailNettoye: string;
} {
  if (!detail) {
    return {
      missions: "",
      profilRecherche: "",
      modalites: "",
      detailNettoye: "",
    };
  }

  const aMarqueurs =
    /🎯|\bMissions?\s*(?:cl[ée]s?|principales?)|\bProfil(?:\s*&|\s*et)?\s*Comp[ée]tences?|👤|\bModalit[ée]s?\s*:|ℹ️/i.test(
      detail,
    );

  if (!aMarqueurs) {
    return {
      missions: "",
      profilRecherche: "",
      modalites: "",
      detailNettoye: detail,
    };
  }

  let missions = "";
  let profilRecherche = "";
  let modalites = "";
  const autresLignes: string[] = [];

  const blocs = detail.split(
    /\n(?=(?:🎯|👤|ℹ️|\*{1,2}\s*(?:Missions?|Profil|Modalit[ée]s?)))/i,
  );

  for (const bloc of blocs) {
    const b = bloc.trim();
    if (!b) continue;

    if (/^(?:🎯|\*{0,2}\s*🎯|\*{0,2}\s*Missions?\s*cl[ée]s?)/i.test(b)) {
      missions = b
        .replace(
          /^(?:🎯\s*)?(?:\*{1,2})?Missions?\s*cl[ée]s?\s*:?(?:\*{1,2})?\s*\n?/i,
          "",
        )
        .trim();
    } else if (
      /^(?:👤|\*{0,2}\s*👤|\*{0,2}\s*Profil(?:\s*&|\s*et)?\s*Comp[ée]tences?)/i.test(
        b,
      )
    ) {
      profilRecherche = b
        .replace(
          /^(?:👤\s*)?(?:\*{1,2})?Profil(?:\s*&|\s*et)?\s*Comp[ée]tences?\s*(?:recherch[ée]s?)?\s*:?(?:\*{1,2})?\s*\n?/i,
          "",
        )
        .trim();
    } else if (/^(?:ℹ️|\*{0,2}\s*ℹ️|\*{0,2}\s*Modalit[ée]s?)/i.test(b)) {
      modalites = b
        .replace(
          /^(?:ℹ️\s*)?(?:\*{1,2})?Modalit[ée]s?\s*:?(?:\*{1,2})?\s*\n?/i,
          "",
        )
        .trim();
    } else {
      autresLignes.push(b);
    }
  }

  return {
    missions,
    profilRecherche,
    modalites,
    detailNettoye: autresLignes.join("\n\n").trim(),
  };
}

/** Complète une candidature / opportunité venant du localStorage, cloud ou de l'extraction IA. */
export function normalizeCandidature(c: Partial<Candidature>): Candidature {
  const base = emptyCandidature();
  let missions = "";
  if (typeof c.missions === "string") {
    missions = c.missions;
  } else if (Array.isArray(c.missions)) {
    missions = (c.missions as unknown[])
      .map((m) => String(m ?? "").trim())
      .filter(Boolean)
      .map((m) => `• ${m}`)
      .join("\n");
  }

  let profilRecherche =
    typeof c.profilRecherche === "string" ? c.profilRecherche : "";
  let modalites = typeof c.modalites === "string" ? c.modalites : "";
  let detail = typeof c.detail === "string" ? c.detail : "";

  // Rétrocompatibilité : si les champs dédiés sont vides mais detail contient les sections structurées
  if ((!missions || !profilRecherche) && detail) {
    const extraits = extraireSectionsDetail(detail);
    if (extraits.missions || extraits.profilRecherche || extraits.modalites) {
      missions = missions || extraits.missions;
      profilRecherche = profilRecherche || extraits.profilRecherche;
      modalites = modalites || extraits.modalites;
      detail = extraits.detailNettoye;
    }
  }

  // Synchronisation des alias titre / poste
  const poste = c.poste || c.title || base.poste;
  const title = c.title || c.poste || base.title;

  // Synchronisation des alias entreprise / company
  const entreprise =
    c.entreprise || c.company || c.companyName || base.entreprise;
  const company = c.company || c.companyName || c.entreprise || base.company;
  const companyName =
    c.companyName || c.company || c.entreprise || base.companyName;

  // Synchronisation localisation
  const lieu = c.lieu || c.location || base.lieu;
  const location = c.location || c.lieu || base.location;

  // Synchronisation lien source
  const lien = c.lien || c.sourceUrl || base.lien;
  const sourceUrl = c.sourceUrl || c.lien || base.sourceUrl;

  // Synchronisation dates de suivi
  const dateLimite = c.dateLimite || c.applicationDeadline || base.dateLimite;
  const applicationDeadline = c.applicationDeadline || c.dateLimite || null;

  const dateEnvoi = c.dateEnvoi || c.appliedAt || base.dateEnvoi;
  const appliedAt = c.appliedAt || c.dateEnvoi || null;

  const dateRelance = c.dateRelance || c.followUpDate || base.dateRelance;
  const followUpDate = c.followUpDate || c.dateRelance || null;

  const dateDernierContact =
    c.dateDernierContact || c.lastContactDate || base.dateDernierContact;
  const lastContactDate = c.lastContactDate || c.dateDernierContact || null;

  const commentaire = c.commentaire || c.personalNotes || base.commentaire;
  const personalNotes = c.personalNotes || c.commentaire || base.personalNotes;

  // Statut
  const statutRaw = c.statut || c.status || base.statut;
  const statut = (STATUTS as readonly string[]).includes(statutRaw)
    ? (statutRaw as Statut)
    : "Sauvegardée";

  // Missions en liste ou texte
  const missionsList: string[] =
    Array.isArray(c.missionsList) && c.missionsList.length > 0
      ? (c.missionsList as unknown[])
          .map((m) => String(m ?? "").trim())
          .filter(Boolean)
      : Array.isArray(c.missions) && (c.missions as unknown[]).length > 0
        ? (c.missions as unknown[])
            .map((m) => String(m ?? "").trim())
            .filter(Boolean)
        : typeof missions === "string" && missions.trim().length > 0
          ? missions
              .split("\n")
              .map((m) => m.replace(/^[•\-*]\s*/, "").trim())
              .filter(Boolean)
          : [];

  if (!missions && missionsList.length > 0) {
    missions = missionsList.map((m) => `• ${m}`).join("\n");
  }

  // Profil
  const requiredSkills = Array.isArray(c.requiredSkills)
    ? c.requiredSkills
    : [];
  const preferredSkills = Array.isArray(c.preferredSkills)
    ? c.preferredSkills
    : [];
  const tools = Array.isArray(c.tools) ? c.tools : [];
  const qualities = Array.isArray(c.qualities) ? c.qualities : [];

  if (!profilRecherche && (requiredSkills.length > 0 || tools.length > 0)) {
    const parts: string[] = [];
    if (requiredSkills.length > 0)
      parts.push(`Compétences requises : ${requiredSkills.join(", ")}`);
    if (preferredSkills.length > 0)
      parts.push(`Compétences appréciées : ${preferredSkills.join(", ")}`);
    if (tools.length > 0) parts.push(`Outils : ${tools.join(", ")}`);
    if (qualities.length > 0) parts.push(`Qualités : ${qualities.join(", ")}`);
    profilRecherche = parts.join("\n");
  }

  // Migration & réconciliation du Workflow de Candidature
  const initialWorkflow = buildInitialWorkflowEvents({
    statut,
    savedAt: c.savedAt || c.extractedAt || dateEnvoi,
    appliedAt,
    dateEnvoi,
    followUpDate,
    dateRelance,
    interviewDate: c.interviewDate || dateDernierContact,
    secondInterviewDate: c.secondInterviewDate,
    dateDernierContact,
    offerReceivedAt: c.offerReceivedAt,
    acceptedAt: c.acceptedAt,
    rejectedAt: c.rejectedAt,
    contact: c.contact,
    source: c.source || c.sourceName,
    personalNotes,
    commentaire,
  });

  const workflowEvents: WorkflowEvent[] =
    Array.isArray(c.workflowEvents) && c.workflowEvents.length > 0
      ? c.workflowEvents
      : initialWorkflow.events;

  const currentWorkflowStep: WorkflowStepKey =
    c.currentWorkflowStep ||
    initialWorkflow.currentStep ||
    statutToWorkflowStepKey(statut);

  const syncedDates = extractDatesFromWorkflowEvents(workflowEvents);

  return {
    ...base,
    ...c,
    id: c.id ?? base.id,
    entreprise,
    company,
    companyName,
    poste,
    title,
    statut,
    status: statut,
    currentWorkflowStep,
    workflowEvents,
    lieu,
    location,
    lien,
    sourceUrl,
    dateLimite,
    applicationDeadline,
    dateEnvoi: dateEnvoi || syncedDates.appliedAt || "",
    appliedAt: appliedAt || syncedDates.appliedAt || null,
    dateRelance: dateRelance || syncedDates.followUpDate || "",
    followUpDate: followUpDate || syncedDates.followUpDate || null,
    dateDernierContact: dateDernierContact || syncedDates.lastContactDate || "",
    lastContactDate: lastContactDate || syncedDates.lastContactDate || null,
    savedAt: c.savedAt || syncedDates.savedAt || base.savedAt,
    preparedAt: c.preparedAt || syncedDates.preparedAt || null,
    interviewDate: c.interviewDate || syncedDates.interviewDate || null,
    secondInterviewDate:
      c.secondInterviewDate || syncedDates.secondInterviewDate || null,
    offerReceivedAt: c.offerReceivedAt || syncedDates.offerReceivedAt || null,
    acceptedAt: c.acceptedAt || syncedDates.acceptedAt || null,
    rejectedAt: c.rejectedAt || syncedDates.rejectedAt || null,
    commentaire,
    personalNotes,
    missions,
    missionsList,
    profilRecherche,
    modalites,
    detail,
    priorite: c.priorite ?? "auto",
    source: c.source ?? c.sourceName ?? "",
    secteur: c.secteur ?? c.companySector ?? "",
    archive: c.archive ?? false,
    preparation: { ...emptyPreparation(), ...(c.preparation ?? {}) },
    workflowProgress: c.workflowProgress ?? {
      currentStep: "offre",
      completedSteps: ["offre"],
    },

    country: c.country ?? base.country,
    contractType: c.contractType ?? base.contractType,
    duration: c.duration ?? base.duration,
    startDate: c.startDate ?? base.startDate,
    endDate: c.endDate ?? base.endDate,
    salary: c.salary ?? base.salary,
    salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : base.salaryMin,
    salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : base.salaryMax,
    salaryCurrency: c.salaryCurrency ?? base.salaryCurrency,
    remotePolicy: c.remotePolicy ?? base.remotePolicy,
    remoteDetails: c.remoteDetails ?? base.remoteDetails,
    jobFunction: c.jobFunction ?? base.jobFunction,
    educationLevel: c.educationLevel ?? base.educationLevel,

    responsibilities: Array.isArray(c.responsibilities)
      ? c.responsibilities
      : base.responsibilities,
    requiredSkills,
    preferredSkills,
    tools,
    requiredLanguages: Array.isArray(c.requiredLanguages)
      ? c.requiredLanguages
      : base.requiredLanguages,
    preferredLanguages: Array.isArray(c.preferredLanguages)
      ? c.preferredLanguages
      : base.preferredLanguages,
    qualities,
    experienceRequirements:
      c.experienceRequirements ?? base.experienceRequirements,
    educationRequirements: Array.isArray(c.educationRequirements)
      ? c.educationRequirements
      : base.educationRequirements,

    companyDescription: c.companyDescription ?? base.companyDescription,
    companySector: c.companySector ?? c.secteur ?? base.companySector,
    companySize: c.companySize ?? base.companySize,
    companyLocation: c.companyLocation ?? base.companyLocation,
    companyWebsite: c.companyWebsite ?? base.companyWebsite,
    companyContext: Array.isArray(c.companyContext)
      ? c.companyContext
      : base.companyContext,
    companyPartners: Array.isArray(c.companyPartners)
      ? c.companyPartners
      : base.companyPartners,
    companyMetrics: Array.isArray(c.companyMetrics)
      ? c.companyMetrics
      : base.companyMetrics,

    recruitmentProcess: Array.isArray(c.recruitmentProcess)
      ? c.recruitmentProcess
      : base.recruitmentProcess,
    applicationMethod: c.applicationMethod ?? base.applicationMethod,
    applicationRequirements: Array.isArray(c.applicationRequirements)
      ? c.applicationRequirements
      : base.applicationRequirements,

    benefits: Array.isArray(c.benefits) ? c.benefits : base.benefits,

    sourceType: c.sourceType ?? base.sourceType,
    sourceName: c.sourceName ?? c.source ?? base.sourceName,
    sourcePublishedAt: c.sourcePublishedAt ?? base.sourcePublishedAt,
    extractedAt: c.extractedAt ?? base.extractedAt,
  };
}

/**
 * Détection des doublons d'opportunité dans NACORA
 * Compare raisonnablement URL, entreprise, titre, localisation
 */
export function findPotentialDuplicate(
  candidate: Partial<Candidature>,
  existingList: Candidature[],
): Candidature | null {
  if (!existingList || existingList.length === 0) return null;

  const normalizeStr = (s?: string | null) =>
    (s || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  const cUrl = (candidate.lien || candidate.sourceUrl || "").trim();
  const cEnt = normalizeStr(candidate.entreprise || candidate.company);
  const cPos = normalizeStr(candidate.poste || candidate.title);

  for (const item of existingList) {
    if (candidate.id && item.id === candidate.id) continue;

    const iUrl = (item.lien || item.sourceUrl || "").trim();
    // 1. URL identique
    if (
      cUrl &&
      iUrl &&
      cUrl.length > 12 &&
      (cUrl === iUrl || cUrl.split("?")[0] === iUrl.split("?")[0])
    ) {
      return item;
    }

    const iEnt = normalizeStr(item.entreprise || item.company);
    const iPos = normalizeStr(item.poste || item.title);

    // 2. Même entreprise et titre très proche
    if (
      cEnt &&
      iEnt &&
      (cEnt === iEnt || cEnt.includes(iEnt) || iEnt.includes(cEnt))
    ) {
      if (
        cPos &&
        iPos &&
        (cPos === iPos || cPos.includes(iPos) || iPos.includes(cPos))
      ) {
        return item;
      }
    }
  }

  return null;
}

export type NextBestAction = {
  label: string;
  step: WorkflowStepId;
  description: string;
  buttonText: string;
  badgeText: string;
  prioriteUrgente?: boolean;
};

export function getNextBestAction(c: Candidature): NextBestAction {
  const steps = c.workflowProgress?.completedSteps ?? [];
  const pitchFait = Boolean(steps.includes("pitch"));
  const contactFait = Boolean(steps.includes("contact"));
  const interviewFait = Boolean(
    steps.includes("interview") ||
    (c.preparation?.questionsRH && c.preparation.questionsRH.length > 0),
  );

  // 1. Entretien programmé
  if (c.statut === "Entretien") {
    return {
      label: "Entretien à préparer",
      step: "interview",
      description:
        "Votre entretien approche ! Entraînez-vous avec l'Interview Coach pour valoriser vos réponses.",
      buttonText: "Préparer mon entretien",
      badgeText: "Entretien programmé",
      prioriteUrgente: true,
    };
  }

  // 2. Relance à effectuer
  if (
    c.statut === "Relancée" ||
    (c.statut === "Candidature envoyée" &&
      c.dateRelance &&
      new Date(c.dateRelance) <= new Date())
  ) {
    return {
      label: "Relance à effectuer",
      step: "contact",
      description:
        "Candidature envoyée. Relancez le recruteur pour maintenir le contact et marquer des points.",
      buttonText: "Écrire ma relance",
      badgeText: "Relance due",
      prioriteUrgente: true,
    };
  }

  // 3. Deadline très proche
  if (c.dateLimite) {
    const diffDays = daysBetween(todayIso(), c.dateLimite);
    if (
      diffDays !== null &&
      diffDays >= 0 &&
      diffDays <= 3 &&
      c.statut === "À candidater"
    ) {
      if (!pitchFait) {
        return {
          label: "Deadline très proche",
          step: "pitch",
          description: `Date limite dans ${diffDays === 0 ? "aujourd'hui" : `${diffDays} jour(s)`}. Adaptez votre CV et votre pitch en priorité.`,
          buttonText: "Adapter mon CV",
          badgeText: `Deadline J-${diffDays}`,
          prioriteUrgente: true,
        };
      }
      return {
        label: "Postuler en urgence",
        step: "contact",
        description: `Date limite dans ${diffDays === 0 ? "aujourd'hui" : `${diffDays} jour(s)`}. Envoyez votre candidature !`,
        buttonText: "Envoyer ma candidature",
        badgeText: `Deadline J-${diffDays}`,
        prioriteUrgente: true,
      };
    }
  }

  // 4. Progression séquentielle du workflow

  if (!pitchFait) {
    return {
      label: "Adapter le CV & Pitch",
      step: "pitch",
      description: "Adaptez votre CV pour répondre parfaitement à l'offre.",
      buttonText: "Adapter mon CV",
      badgeText: "CV à optimiser",
    };
  }

  if (!contactFait) {
    return {
      label: "Rédiger le message au recruteur",
      step: "contact",
      description:
        "Votre CV est prêt. Rédigez l'e-mail de candidature ou le message LinkedIn.",
      buttonText: "Rédiger mon e-mail",
      badgeText: "Prêt à postuler",
    };
  }

  if (!interviewFait) {
    return {
      label: "Anticiper l'entretien",
      step: "interview",
      description:
        "Préparez vos arguments clés et anticipez les questions du recruteur.",
      buttonText: "Préparer l'entretien",
      badgeText: "Anticipation",
    };
  }

  return {
    label: "Candidature complète",
    step: "contact",
    description:
      "Toutes les étapes principales du workflow ont été réalisées pour cette opportunité.",
    buttonText: "Voir le récapitulatif",
    badgeText: "Complète",
  };
}

export function addDays(date: string, days: number): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number | null {
  if (!from || !to) return null;
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / 86400000);
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(date: string): string {
  if (!date) return "—";
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return "—";
  return `${d}/${m}/${y}`;
}

const seed = (c: Partial<Candidature>): Candidature => normalizeCandidature(c);

export const SEED: Candidature[] = [
  seed({
    id: "seed-1",
    entreprise: "Nom entreprise 1",
    poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
    statut: "Sauvegardée",
    lieu: "Paris 15e",
    lien: "https://",
    contact: "M. Dupont - email@email.fr",
    commentaire: "Envoyer une lettre de motivation personnalisée",
    source: "LinkedIn",
    detail:
      "Vous pouvez copier/coller ici le détail de l'offre car elle peut être supprimée du site web.",
  }),
  seed({
    id: "seed-2",
    entreprise: "Nom entreprise 2",
    poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
    statut: "Candidature envoyée",
    lieu: "Paris 15e",
    lien: "https://",
    dateEnvoi: "2023-02-09",
    dateRelance: "2023-02-19",
    dateDernierContact: "2023-02-09",
    commentaire: "Offre très intéressante car ...",
    source: "Welcome to the Jungle",
  }),
  seed({
    id: "seed-3",
    entreprise: "Nom entreprise 3",
    poste: "Commerce de gros — fournitures pour la plomberie et le chauffage",
    statut: "Relancée",
    lieu: "Paris 15e",
    lien: "https://",
    contact: "M. Dupont - email@email.fr - 0600000000",
    dateEnvoi: "2023-02-01",
    dateRelance: "2023-02-13",
    dateDernierContact: "2023-04-13",
    commentaire: "Candidature spontanée",
    source: "Candidature spontanée",
  }),
  seed({
    id: "seed-4",
    entreprise: "Nom entreprise 4",
    poste: "Assistant relation franchise (F/H) en alternance (H/F)",
    statut: "Entretien",
    lieu: "Saint Herblain",
    lien: "https://",
    dateEnvoi: "2023-01-25",
    dateRelance: "2023-02-03",
    dateDernierContact: "2023-02-03",
    commentaire: "Entretien prévu le JJ/MM/AAAA",
    source: "JobTeaser",
  }),
  seed({
    id: "seed-5",
    entreprise: "Nom entreprise 5",
    poste: "Assistant relation franchise (F/H) en alternance (H/F)",
    statut: "Refusée",
    lieu: "Marseille",
    lien: "https://",
    contact: "M. Dupont - 0132520000",
    dateEnvoi: "2023-01-05",
    dateRelance: "2023-01-15",
    dateDernierContact: "2023-02-12",
    commentaire: "L'entreprise ne recrute plus d'alternant pour cette année",
    source: "Indeed",
  }),
  seed({
    id: "seed-6",
    entreprise: "Nom entreprise 6",
    poste: "Assistant relation franchise (F/H) en alternance (H/F)",
    statut: "Sans réponse",
    lieu: "Marseille",
    lien: "https://",
    contact: "M. Dupont - 0132520000",
    dateEnvoi: "2023-01-05",
    dateRelance: "2023-01-15",
    dateDernierContact: "2023-01-15",
    commentaire: "Aucune réponse à ce jour",
    source: "Site entreprise",
  }),
];

export function loadCandidatures(): Candidature[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<Candidature>[];
    return Array.isArray(parsed) ? parsed.map(normalizeCandidature) : [];
  } catch {
    return [];
  }
}

export function saveCandidatures(items: Candidature[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function toCsv(items: Candidature[]): string {
  const head = [
    "Entreprise",
    "Intitulé du poste",
    "Etat d'avancement",
    "Priorité",
    "Source",
    "Secteur",
    "Lieu",
    "Lien de l'offre",
    "Contact",
    "Date d'envoi",
    "Date de relance",
    "Dernier contact",
    "Date limite de candidature",
    "Commentaire",
    "Missions clés",
    "Profil recherché",
    "Modalités",
    "Détail de l'offre",
  ];
  const esc = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const rows = items.map((c) =>
    [
      c.entreprise,
      c.poste,
      c.statut,
      c.priorite === "auto" ? "" : c.priorite,
      c.source,
      c.secteur,
      c.lieu,
      c.lien,
      c.contact,
      formatDate(c.dateEnvoi),
      formatDate(c.dateRelance),
      formatDate(c.dateDernierContact),
      formatDate(c.dateLimite),
      c.commentaire,
      c.missions,
      c.profilRecherche,
      c.modalites,
      c.detail,
    ]
      .map(esc)
      .join(";"),
  );
  return [head.map(esc).join(";"), ...rows].join("\n");
}
