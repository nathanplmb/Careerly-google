import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  writeBatch,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/integrations/firebase/client";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import {
  emptyPreparation,
  normalizeCandidature,
  type Candidature,
  type MatchScore,
  type Preparation,
  type PrioriteChoix,
} from "./candidatures";
import type { WorkflowEvent, WorkflowStepKey } from "./workflow";

type Row = Record<string, unknown> & {
  id: string;
  entreprise: string;
  poste: string;
  statut: string;
  lieu: string;
  lien: string;
  contact: string;
  date_envoi: string | null;
  date_relance: string | null;
  date_dernier_contact: string | null;
  date_limite: string | null;
  commentaire: string;
  detail: string;
  priorite?: string | null;
  source?: string | null;
  secteur?: string | null;
  archive?: boolean | null;
  match?: unknown;
  preparation?: unknown;
  current_workflow_step?: string | null;
  workflow_events?: unknown;
  saved_at?: string | null;
  prepared_at?: string | null;
  interview_date?: string | null;
  second_interview_date?: string | null;
  offer_received_at?: string | null;
  accepted_at?: string | null;
  rejected_at?: string | null;
};

/**
 * Nettoie récursivement un objet pour Firestore en remplaçant undefined par null
 * car Firestore refuse strictement les valeurs undefined.
 */
function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) {
    return null as unknown as T;
  }
  if (data === null || typeof data !== "object") {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForFirestore(item)) as unknown as T;
  }
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (value === undefined) {
      clean[key] = null;
    } else {
      clean[key] = sanitizeForFirestore(value);
    }
  }
  return clean as unknown as T;
}

function toCandidature(r: Row): Candidature {
  const match =
    r.match && typeof r.match === "object" && "global" in (r.match as object)
      ? (r.match as MatchScore)
      : null;
  const prepRaw = (r.preparation as Record<string, unknown> | null) ?? {};
  const preparation = {
    ...emptyPreparation(),
    ...(prepRaw as Partial<Preparation>),
  };
  const rawObj = r as Record<string, unknown>;
  const rawEvents = (r.workflow_events ||
    rawObj["workflowEvents"] ||
    []) as WorkflowEvent[];
  const rawStep = (r.current_workflow_step ||
    rawObj["currentWorkflowStep"]) as WorkflowStepKey;

  const cand = normalizeCandidature({
    ...rawObj,
    id: r.id,
    entreprise: r.entreprise ?? (rawObj["company"] as string) ?? "",
    poste: r.poste ?? (rawObj["title"] as string) ?? "",
    statut: r.statut,
    currentStage:
      (rawObj["currentStage"] as string) ||
      (rawObj["current_stage"] as string) ||
      r.statut ||
      (rawObj["status"] as string) ||
      "",
    currentWorkflowStep: rawStep,
    workflowEvents: Array.isArray(rawEvents) ? rawEvents : undefined,
    savedAt: (r.saved_at ?? rawObj["savedAt"]) as string,
    preparedAt: (r.prepared_at ?? rawObj["preparedAt"]) as string,
    interviewDate: (r.interview_date ?? rawObj["interviewDate"]) as string,
    secondInterviewDate: (r.second_interview_date ??
      rawObj["secondInterviewDate"]) as string,
    offerReceivedAt: (r.offer_received_at ??
      rawObj["offerReceivedAt"]) as string,
    acceptedAt: (r.accepted_at ?? rawObj["acceptedAt"]) as string,
    rejectedAt: (r.rejected_at ?? rawObj["rejectedAt"]) as string,
    lieu: r.lieu ?? (rawObj["location"] as string) ?? "",
    lien: r.lien ?? (rawObj["sourceUrl"] as string) ?? "",
    contact: r.contact ?? "",
    dateEnvoi: r.date_envoi ?? (rawObj["appliedAt"] as string) ?? "",
    dateRelance: r.date_relance ?? (rawObj["followUpDate"] as string) ?? "",
    dateDernierContact:
      r.date_dernier_contact ?? (rawObj["lastContactDate"] as string) ?? "",
    dateLimite:
      r.date_limite ?? (rawObj["applicationDeadline"] as string) ?? "",
    commentaire: r.commentaire ?? (rawObj["personalNotes"] as string) ?? "",
    missions:
      (rawObj["missions"] as string) || (prepRaw["missions"] as string) || "",
    profilRecherche:
      (rawObj["profilRecherche"] as string) ||
      (prepRaw["profilRecherche"] as string) ||
      "",
    modalites:
      (rawObj["modalites"] as string) || (prepRaw["modalites"] as string) || "",
    detail: r.detail ?? "",
    priorite: (r.priorite as PrioriteChoix) || "auto",
    source: r.source ?? (rawObj["sourceName"] as string) ?? "",
    secteur: r.secteur ?? (rawObj["companySector"] as string) ?? "",
    archive: r.archive ?? false,
    match,
    preparation,

    // Champs Opportunity V2
    contractType:
      (rawObj["contractType"] as string) ||
      (rawObj["contract_type"] as string) ||
      null,
    duration:
      (rawObj["duration"] as string) || (rawObj["duree"] as string) || null,
    startDate:
      (rawObj["startDate"] as string) ||
      (rawObj["start_date"] as string) ||
      null,
    endDate:
      (rawObj["endDate"] as string) || (rawObj["end_date"] as string) || null,
    salary:
      (rawObj["salary"] as string) || (rawObj["salaire"] as string) || null,
    salaryMin:
      typeof rawObj["salaryMin"] === "number"
        ? (rawObj["salaryMin"] as number)
        : typeof rawObj["salary_min"] === "number"
          ? (rawObj["salary_min"] as number)
          : null,
    salaryMax:
      typeof rawObj["salaryMax"] === "number"
        ? (rawObj["salaryMax"] as number)
        : typeof rawObj["salary_max"] === "number"
          ? (rawObj["salary_max"] as number)
          : null,
    salaryCurrency:
      (rawObj["salaryCurrency"] as string) ||
      (rawObj["salary_currency"] as string) ||
      null,
    remotePolicy:
      (rawObj["remotePolicy"] as string) ||
      (rawObj["remote_policy"] as string) ||
      null,
    remoteDetails:
      (rawObj["remoteDetails"] as string) ||
      (rawObj["remote_details"] as string) ||
      null,
    jobFunction:
      (rawObj["jobFunction"] as string) ||
      (rawObj["job_function"] as string) ||
      null,
    educationLevel:
      (rawObj["educationLevel"] as string) ||
      (rawObj["education_level"] as string) ||
      null,

    missionsList: Array.isArray(rawObj["missionsList"])
      ? (rawObj["missionsList"] as string[])
      : Array.isArray(rawObj["missions_list"])
        ? (rawObj["missions_list"] as string[])
        : [],
    responsibilities: Array.isArray(rawObj["responsibilities"])
      ? (rawObj["responsibilities"] as string[])
      : [],
    requiredSkills: Array.isArray(rawObj["requiredSkills"])
      ? (rawObj["requiredSkills"] as string[])
      : Array.isArray(rawObj["required_skills"])
        ? (rawObj["required_skills"] as string[])
        : [],
    preferredSkills: Array.isArray(rawObj["preferredSkills"])
      ? (rawObj["preferredSkills"] as string[])
      : Array.isArray(rawObj["preferred_skills"])
        ? (rawObj["preferred_skills"] as string[])
        : [],
    tools: Array.isArray(rawObj["tools"]) ? (rawObj["tools"] as string[]) : [],
    requiredLanguages: Array.isArray(rawObj["requiredLanguages"])
      ? (rawObj["requiredLanguages"] as Array<{
          language: string;
          level?: string;
        }>)
      : Array.isArray(rawObj["required_languages"])
        ? (rawObj["required_languages"] as Array<{
            language: string;
            level?: string;
          }>)
        : [],
    preferredLanguages: Array.isArray(rawObj["preferredLanguages"])
      ? (rawObj["preferredLanguages"] as Array<{
          language: string;
          level?: string;
        }>)
      : Array.isArray(rawObj["preferred_languages"])
        ? (rawObj["preferred_languages"] as Array<{
            language: string;
            level?: string;
          }>)
        : [],
    qualities: Array.isArray(rawObj["qualities"])
      ? (rawObj["qualities"] as string[])
      : [],
    experienceRequirements:
      (rawObj["experienceRequirements"] as string) ||
      (rawObj["experience_requirements"] as string) ||
      null,
    educationRequirements: Array.isArray(rawObj["educationRequirements"])
      ? (rawObj["educationRequirements"] as string[])
      : Array.isArray(rawObj["education_requirements"])
        ? (rawObj["education_requirements"] as string[])
        : [],

    companyId:
      (rawObj["companyId"] as string) ||
      (rawObj["company_id"] as string) ||
      null,
    contactId:
      (rawObj["contactId"] as string) ||
      (rawObj["contact_id"] as string) ||
      null,
    contactIds: Array.isArray(rawObj["contactIds"])
      ? (rawObj["contactIds"] as string[])
      : Array.isArray(rawObj["contact_ids"])
        ? (rawObj["contact_ids"] as string[])
        : [],

    companyDescription:
      (rawObj["companyDescription"] as string) ||
      (rawObj["company_description"] as string) ||
      null,
    companySector:
      (rawObj["companySector"] as string) ||
      (rawObj["company_sector"] as string) ||
      null,
    companySize:
      (rawObj["companySize"] as string) ||
      (rawObj["company_size"] as string) ||
      null,
    companyLocation:
      (rawObj["companyLocation"] as string) ||
      (rawObj["company_location"] as string) ||
      null,
    companyWebsite:
      (rawObj["companyWebsite"] as string) ||
      (rawObj["company_website"] as string) ||
      null,
    companyContext: Array.isArray(rawObj["companyContext"])
      ? (rawObj["companyContext"] as string[])
      : Array.isArray(rawObj["company_context"])
        ? (rawObj["company_context"] as string[])
        : [],
    companyPartners: Array.isArray(rawObj["companyPartners"])
      ? (rawObj["companyPartners"] as string[])
      : Array.isArray(rawObj["company_partners"])
        ? (rawObj["company_partners"] as string[])
        : [],
    companyMetrics: Array.isArray(rawObj["companyMetrics"])
      ? (rawObj["companyMetrics"] as Array<{
          label: string;
          value: string;
          context?: string;
        }>)
      : Array.isArray(rawObj["company_metrics"])
        ? (rawObj["company_metrics"] as Array<{
            label: string;
            value: string;
            context?: string;
          }>)
        : [],

    recruitmentProcess: Array.isArray(rawObj["recruitmentProcess"])
      ? (rawObj["recruitmentProcess"] as string[])
      : Array.isArray(rawObj["recruitment_process"])
        ? (rawObj["recruitment_process"] as string[])
        : [],
    applicationMethod:
      (rawObj["applicationMethod"] as string) ||
      (rawObj["application_method"] as string) ||
      null,
    applicationRequirements: Array.isArray(rawObj["applicationRequirements"])
      ? (rawObj["applicationRequirements"] as string[])
      : Array.isArray(rawObj["application_requirements"])
        ? (rawObj["application_requirements"] as string[])
        : [],

    benefits: Array.isArray(rawObj["benefits"])
      ? (rawObj["benefits"] as string[])
      : Array.isArray(rawObj["avantages"])
        ? (rawObj["avantages"] as string[])
        : [],

    sourceType:
      (rawObj["sourceType"] as string) ||
      (rawObj["source_type"] as string) ||
      null,
    sourceName:
      (rawObj["sourceName"] as string) ||
      (rawObj["source_name"] as string) ||
      null,
    sourcePublishedAt:
      (rawObj["sourcePublishedAt"] as string) ||
      (rawObj["source_published_at"] as string) ||
      null,
    extractedAt:
      (rawObj["extractedAt"] as string) ||
      (rawObj["extracted_at"] as string) ||
      null,
  } as Partial<Candidature>);

  return cand;
}

function isUuid(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
}

function toRow(c: Candidature, userId: string): Record<string, unknown> {
  const cleanId = isUuid(c.id) ? c.id : c.id || crypto.randomUUID();

  const row = {
    id: cleanId,
    user_id: userId,
    companyId: c.companyId || null,
    company_id: c.companyId || null,
    entreprise: c.entreprise,
    company: c.entreprise,
    poste: c.poste,
    title: c.poste,
    statut: c.statut,
    status: c.statut,
    current_stage: c.currentStage || c.statut || null,
    currentStage: c.currentStage || c.statut || null,
    lieu: c.lieu,
    location: c.lieu,
    lien: c.lien,
    sourceUrl: c.lien,
    contact: c.contact,
    date_envoi: c.dateEnvoi || null,
    appliedAt: c.dateEnvoi || null,
    date_relance: c.dateRelance || null,
    followUpDate: c.dateRelance || null,
    date_dernier_contact: c.dateDernierContact || null,
    lastContactDate: c.dateDernierContact || null,
    date_limite: c.dateLimite || null,
    applicationDeadline: c.dateLimite || null,
    commentaire: c.commentaire,
    personalNotes: c.commentaire,
    detail: c.detail,
    priorite: c.priorite,
    source: c.source,
    sourceName: c.source,
    secteur: c.secteur,
    companySector: c.secteur,
    archive: c.archive,
    match: (c.match ?? {}) as never,
    preparation: {
      ...c.preparation,
      missions: c.missions,
      profilRecherche: c.profilRecherche,
      modalites: c.modalites,
    } as never,
    current_workflow_step: c.currentWorkflowStep || null,
    currentWorkflowStep: c.currentWorkflowStep || null,
    workflow_events: c.workflowEvents || [],
    workflowEvents: c.workflowEvents || [],
    saved_at: c.savedAt || null,
    savedAt: c.savedAt || null,
    prepared_at: c.preparedAt || null,
    preparedAt: c.preparedAt || null,
    interview_date: c.interviewDate || null,
    interviewDate: c.interviewDate || null,
    second_interview_date: c.secondInterviewDate || null,
    secondInterviewDate: c.secondInterviewDate || null,
    offer_received_at: c.offerReceivedAt || null,
    offerReceivedAt: c.offerReceivedAt || null,
    accepted_at: c.acceptedAt || null,
    acceptedAt: c.acceptedAt || null,
    rejected_at: c.rejectedAt || null,
    rejectedAt: c.rejectedAt || null,

    // Opportunity Intelligence V2
    country: c.country || null,
    contractType: c.contractType || null,
    contract_type: c.contractType || null,
    duration: c.duration || null,
    duree: c.duration || null,
    startDate: c.startDate || null,
    start_date: c.startDate || null,
    endDate: c.endDate || null,
    end_date: c.endDate || null,
    salary: c.salary || null,
    salaire: c.salary || null,
    salaryMin: typeof c.salaryMin === "number" ? c.salaryMin : null,
    salary_min: typeof c.salaryMin === "number" ? c.salaryMin : null,
    salaryMax: typeof c.salaryMax === "number" ? c.salaryMax : null,
    salary_max: typeof c.salaryMax === "number" ? c.salaryMax : null,
    salaryCurrency: c.salaryCurrency || null,
    salary_currency: c.salaryCurrency || null,
    remotePolicy: c.remotePolicy || null,
    remote_policy: c.remotePolicy || null,
    remoteDetails: c.remoteDetails || null,
    remote_details: c.remoteDetails || null,
    jobFunction: c.jobFunction || null,
    job_function: c.jobFunction || null,
    educationLevel: c.educationLevel || null,
    education_level: c.educationLevel || null,

    missionsList: c.missionsList || [],
    missions_list: c.missionsList || [],
    responsibilities: c.responsibilities || [],
    requiredSkills: c.requiredSkills || [],
    required_skills: c.requiredSkills || [],
    preferredSkills: c.preferredSkills || [],
    preferred_skills: c.preferredSkills || [],
    tools: c.tools || [],
    requiredLanguages: c.requiredLanguages || [],
    required_languages: c.requiredLanguages || [],
    preferredLanguages: c.preferredLanguages || [],
    preferred_languages: c.preferredLanguages || [],
    qualities: c.qualities || [],
    experienceRequirements: c.experienceRequirements || null,
    experience_requirements: c.experienceRequirements || null,
    educationRequirements: c.educationRequirements || [],
    education_requirements: c.educationRequirements || [],

    companyId: c.companyId || null,
    company_id: c.companyId || null,
    contactId: c.contactId || null,
    contact_id: c.contactId || null,
    contactIds: Array.isArray(c.contactIds) ? c.contactIds : [],
    contact_ids: Array.isArray(c.contactIds) ? c.contactIds : [],

    companyDescription: c.companyDescription || null,
    company_description: c.companyDescription || null,
    companySize: c.companySize || null,
    company_size: c.companySize || null,
    companyLocation: c.companyLocation || null,
    company_location: c.companyLocation || null,
    companyWebsite: c.companyWebsite || null,
    company_website: c.companyWebsite || null,
    companyContext: c.companyContext || [],
    company_context: c.companyContext || [],
    companyPartners: c.companyPartners || [],
    company_partners: c.companyPartners || [],
    companyMetrics: c.companyMetrics || [],
    company_metrics: c.companyMetrics || [],

    recruitmentProcess: c.recruitmentProcess || [],
    recruitment_process: c.recruitmentProcess || [],
    applicationMethod: c.applicationMethod || null,
    application_method: c.applicationMethod || null,
    applicationRequirements: c.applicationRequirements || [],
    application_requirements: c.applicationRequirements || [],

    benefits: c.benefits || [],
    avantages: c.benefits || [],

    sourceType: c.sourceType || null,
    source_type: c.sourceType || null,
    sourcePublishedAt: c.sourcePublishedAt || null,
    source_published_at: c.sourcePublishedAt || null,
    extractedAt: c.extractedAt || null,
    extracted_at: c.extractedAt || null,
  };

  return sanitizeForFirestore(row);
}

export async function fetchCandidatures(
  userId?: string,
): Promise<Candidature[]> {
  console.info("[OPPORTUNITY LOAD START]", {
    userId,
    timestamp: new Date().toISOString(),
  });

  if (isFirebaseConfigured() && userId) {
    try {
      const colRef = collection(db, "users", userId, "candidatures");
      const snap = await getDocs(query(colRef));
      const list: Candidature[] = [];
      snap.forEach((docSnap) => {
        const cand = toCandidature({
          id: docSnap.id,
          ...docSnap.data(),
        } as Row);
        list.push(cand);
      });
      console.info(
        `[OPPORTUNITY LOAD SUCCESS] ${list.length} opportunités chargées depuis Firestore`,
        list.map((c) => ({
          id: c.id,
          poste: c.poste,
          entreprise: c.entreprise,
          contractType: c.contractType,
          duration: c.duration,
          metricsCount: c.companyMetrics?.length || 0,
        })),
      );
      return list;
    } catch (e) {
      console.error(
        "[OPPORTUNITY LOAD ERROR] Firestore fetchCandidatures error:",
        e,
      );
      throw e;
    }
  }

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("candidatures")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[OPPORTUNITY LOAD ERROR] Supabase fetch error:", error);
      throw error;
    }
    const list = (data as unknown as Row[]).map(toCandidature);
    console.info(
      `[OPPORTUNITY LOAD SUCCESS] ${list.length} opportunités chargées depuis Supabase`,
    );
    return list;
  }

  console.info(
    "[OPPORTUNITY LOAD EMPTY] Ni Firestore ni Supabase n'est configuré.",
  );
  return [];
}

export async function upsertCandidature(
  c: Candidature,
  userId: string,
): Promise<Candidature> {
  console.info("[OPPORTUNITY SAVE START]", {
    id: c.id,
    poste: c.poste,
    entreprise: c.entreprise,
    userId,
  });
  const row = toRow(c, userId);
  console.info("[OPPORTUNITY SAVE PAYLOAD]", {
    id: row.id,
    entreprise: row.entreprise,
    poste: row.poste,
    contractType: row.contractType,
    duration: row.duration,
    startDate: row.startDate,
    metricsCount: Array.isArray(row.companyMetrics)
      ? (row.companyMetrics as unknown[]).length
      : 0,
    missionsCount: Array.isArray(row.missionsList)
      ? (row.missionsList as unknown[]).length
      : 0,
    skillsCount: Array.isArray(row.requiredSkills)
      ? (row.requiredSkills as unknown[]).length
      : 0,
  });

  if (isFirebaseConfigured() && userId) {
    try {
      const docRef = doc(db, "users", userId, "candidatures", row.id as string);
      await setDoc(docRef, row, { merge: true });
      const saved = toCandidature(row as unknown as Row);
      console.info(
        "[OPPORTUNITY SAVE SUCCESS] Enregistrement Firestore confirmé avec succès:",
        {
          id: saved.id,
          entreprise: saved.entreprise,
          poste: saved.poste,
          metricsCount: saved.companyMetrics?.length || 0,
        },
      );
      return saved;
    } catch (e) {
      console.error(
        "[OPPORTUNITY SAVE ERROR] Échec écriture Firestore setDoc:",
        e,
      );
      throw e;
    }
  }

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("candidatures")
      .upsert(row as unknown as Record<string, unknown>)
      .select()
      .single();
    if (error) {
      console.error("[OPPORTUNITY SAVE ERROR] Supabase upsert error:", error);
      throw error;
    }
    const saved = toCandidature(data as unknown as Row);
    console.info(
      "[OPPORTUNITY SAVE SUCCESS] Enregistrement Supabase confirmé:",
      { id: saved.id },
    );
    return saved;
  }

  console.info(
    "[OPPORTUNITY SAVE LOCAL FALLBACK] Enregistrement sans cloud configuré.",
  );
  return c;
}

export async function deleteCandidature(id: string, userId?: string) {
  if (isFirebaseConfigured() && userId) {
    try {
      const docRef = doc(db, "users", userId, "candidatures", id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.warn("Firestore deleteCandidature error:", e);
    }
  }

  if (isSupabaseConfigured()) {
    const { error } = await supabase.from("candidatures").delete().eq("id", id);
    if (error) throw error;
  }
}

export async function batchUpsertCandidatures(
  items: Candidature[],
  userId: string,
): Promise<Candidature[]> {
  if (items.length === 0) return items;

  if (isFirebaseConfigured() && userId) {
    try {
      const CHUNK_SIZE = 250;
      for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        const chunk = items.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);
        for (const item of chunk) {
          const row = toRow(item, userId);
          const docRef = doc(
            db,
            "users",
            userId,
            "candidatures",
            row.id as string,
          );
          batch.set(docRef, row, { merge: true });
        }
        await batch.commit();
      }
      return items;
    } catch (e) {
      console.warn("Firestore batchUpsertCandidatures error:", e);
    }
  }

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("candidatures")
      .upsert(
        items.map((c) => toRow(c, userId)) as unknown as Record<
          string,
          unknown
        >[],
      )
      .select();
    if (error) throw error;
    return (data as unknown as Row[]).map(toCandidature);
  }

  return items;
}

export async function insertManyCandidatures(
  items: Candidature[],
  userId: string,
): Promise<Candidature[]> {
  return batchUpsertCandidatures(items, userId);
}
