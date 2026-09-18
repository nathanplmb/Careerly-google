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
  emptyContact,
  type Contact,
  type Echange,
  type TypeContact,
} from "./contacts";

type Row = {
  id: string;
  nom: string | null;
  first_name?: string | null;
  firstName?: string | null;
  last_name?: string | null;
  lastName?: string | null;
  full_name?: string | null;
  fullName?: string | null;
  entreprise: string | null;
  company_id?: string | null;
  companyId?: string | null;
  poste: string | null;
  job_title?: string | null;
  jobTitle?: string | null;
  email: string | null;
  telephone: string | null;
  phone?: string | null;
  linkedin: string | null;
  linkedin_url?: string | null;
  linkedinUrl?: string | null;
  location?: string | null;
  avatar_url?: string | null;
  avatarUrl?: string | null;
  type: string | null;
  tags?: string[] | null;
  candidature_id: string | null;
  candidatureId?: string | null;
  candidature_ids?: string[] | null;
  candidatureIds?: string[] | null;
  derniere_interaction: string | null;
  prochaine_action: string | null;
  date_prochaine_action: string | null;
  notes: string | null;
  historique: unknown;
  source?: string | null;
  sources?: string[] | null;
  is_manual?: boolean | null;
  isManual?: boolean | null;
  created_at?: string | null;
  createdAt?: string | null;
  updated_at?: string | null;
  updatedAt?: string | null;
};

function sanitizeForFirestore<T>(obj: T): T {
  if (obj === null || obj === undefined) return null as unknown as T;
  if (Array.isArray(obj)) {
    return obj
      .map((item) => sanitizeForFirestore(item))
      .filter((item) => item !== undefined) as unknown as T;
  }
  if (typeof obj !== "object") return obj;

  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (value === undefined) {
      continue;
    }
    clean[key] = sanitizeForFirestore(value);
  }
  return clean as unknown as T;
}

function toContact(r: Row): Contact {
  const base = emptyContact();
  const rawObj = r as Record<string, unknown>;

  const candIds = Array.isArray(r.candidature_ids)
    ? r.candidature_ids
    : Array.isArray(r.candidatureIds)
      ? r.candidatureIds
      : r.candidature_id || r.candidatureId
        ? [r.candidature_id || r.candidatureId || ""]
        : [];

  const rawSources = Array.isArray(r.sources)
    ? (r.sources as Contact["source"][])
    : r.source
      ? [r.source as Contact["source"]]
      : ["manual"];

  const rawTags = Array.isArray(r.tags)
    ? r.tags
    : Array.isArray(rawObj["tags"])
      ? (rawObj["tags"] as string[])
      : [];

  const firstName = r.first_name || r.firstName || "";
  const lastName = r.last_name || r.lastName || "";
  const fullName =
    r.full_name ||
    r.fullName ||
    r.nom ||
    [firstName, lastName].filter(Boolean).join(" ") ||
    "";

  return {
    ...base,
    id: r.id,
    nom: fullName || r.nom || "Sans nom",
    firstName,
    lastName,
    fullName,
    entreprise: r.entreprise ?? "",
    companyId: r.company_id || r.companyId || null,
    poste: r.poste ?? r.job_title ?? r.jobTitle ?? "",
    jobTitle: r.job_title ?? r.jobTitle ?? r.poste ?? "",
    email: r.email ?? "",
    telephone: r.telephone ?? r.phone ?? "",
    phone: r.phone ?? r.telephone ?? "",
    linkedin: r.linkedin ?? r.linkedin_url ?? r.linkedinUrl ?? "",
    linkedinUrl: r.linkedin_url ?? r.linkedinUrl ?? r.linkedin ?? "",
    location: r.location ?? "",
    avatarUrl: r.avatar_url ?? r.avatarUrl ?? null,
    type: (r.type as TypeContact) || "Recruteur",
    tags: rawTags,
    candidatureId: r.candidature_id ?? r.candidatureId ?? candIds[0] ?? "",
    candidatureIds: candIds.filter(Boolean),
    derniereInteraction: r.derniere_interaction ?? "",
    prochaineAction: r.prochaine_action ?? "",
    dateProchaineAction: r.date_prochaine_action ?? "",
    notes: r.notes ?? "",
    historique: Array.isArray(r.historique) ? (r.historique as Echange[]) : [],
    source: (r.source as Contact["source"]) || rawSources[0] || "manual",
    sources: rawSources as Contact["source"][],
    isManual: r.is_manual ?? r.isManual ?? true,
    createdAt: r.created_at || r.createdAt || base.createdAt,
    updatedAt: r.updated_at || r.updatedAt || base.updatedAt,
  };
}

function toRow(c: Contact, userId: string) {
  const row = {
    id: c.id || crypto.randomUUID(),
    user_id: userId,
    nom: c.nom || c.fullName || "Sans nom",
    first_name: c.firstName || null,
    firstName: c.firstName || null,
    last_name: c.lastName || null,
    lastName: c.lastName || null,
    full_name: c.fullName || c.nom || "Sans nom",
    fullName: c.fullName || c.nom || "Sans nom",
    entreprise: c.entreprise || "",
    company_id: c.companyId || null,
    companyId: c.companyId || null,
    poste: c.poste || c.jobTitle || "",
    job_title: c.jobTitle || c.poste || "",
    jobTitle: c.jobTitle || c.poste || "",
    email: c.email || "",
    telephone: c.telephone || c.phone || "",
    phone: c.telephone || c.phone || "",
    linkedin: c.linkedin || c.linkedinUrl || "",
    linkedin_url: c.linkedinUrl || c.linkedin || "",
    linkedinUrl: c.linkedinUrl || c.linkedin || "",
    location: c.location || "",
    avatar_url: c.avatarUrl || null,
    avatarUrl: c.avatarUrl || null,
    type: c.type || "Recruteur",
    tags: Array.isArray(c.tags) ? c.tags : [],
    candidature_id: c.candidatureId || c.candidatureIds?.[0] || null,
    candidatureId: c.candidatureId || c.candidatureIds?.[0] || null,
    candidature_ids: Array.isArray(c.candidatureIds) ? c.candidatureIds : [],
    candidatureIds: Array.isArray(c.candidatureIds) ? c.candidatureIds : [],
    derniere_interaction: c.derniereInteraction || null,
    prochaine_action: c.prochaineAction || "",
    date_prochaine_action: c.dateProchaineAction || null,
    notes: c.notes || "",
    historique: Array.isArray(c.historique) ? c.historique : [],
    source: c.source || c.sources?.[0] || "manual",
    sources: Array.isArray(c.sources) ? c.sources : ["manual"],
    is_manual: c.isManual ?? true,
    isManual: c.isManual ?? true,
    created_at: c.createdAt || new Date().toISOString(),
    createdAt: c.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return sanitizeForFirestore(row);
}

export async function fetchContacts(userId?: string): Promise<Contact[]> {
  if (isFirebaseConfigured() && userId) {
    try {
      const colRef = collection(db, "users", userId, "contacts");
      const snap = await getDocs(query(colRef));
      const list: Contact[] = [];
      snap.forEach((docSnap) => {
        list.push(toContact({ id: docSnap.id, ...docSnap.data() } as Row));
      });
      return list;
    } catch (e) {
      console.warn("Firestore fetchContacts error:", e);
    }
  }

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as unknown as Row[]).map(toContact);
  }

  return [];
}

export async function upsertContact(
  c: Contact,
  userId: string,
): Promise<Contact> {
  const row = toRow(c, userId);

  if (isFirebaseConfigured() && userId) {
    try {
      const docRef = doc(db, "users", userId, "contacts", row.id);
      await setDoc(docRef, row, { merge: true });
      return toContact(row as unknown as Row);
    } catch (e) {
      console.warn("Firestore upsertContact error:", e);
    }
  }

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("contacts")
      .upsert(row)
      .select()
      .single();
    if (error) throw error;
    return toContact(data as unknown as Row);
  }

  return c;
}

export async function batchUpsertContacts(
  contactsList: Contact[],
  userId: string,
): Promise<Contact[]> {
  if (!contactsList.length) return [];
  if (isFirebaseConfigured() && userId) {
    try {
      const CHUNK_SIZE = 250;
      for (let i = 0; i < contactsList.length; i += CHUNK_SIZE) {
        const chunk = contactsList.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);
        for (const c of chunk) {
          const row = toRow(c, userId);
          const docRef = doc(db, "users", userId, "contacts", row.id);
          batch.set(docRef, row, { merge: true });
        }
        await batch.commit();
      }
      return contactsList;
    } catch (e) {
      console.warn("Firestore batchUpsertContacts error:", e);
    }
  }

  if (isSupabaseConfigured()) {
    const rows = contactsList.map((c) => toRow(c, userId));
    const { data, error } = await supabase.from("contacts").upsert(rows);
    if (error) throw error;
    if (Array.isArray(data)) {
      return (data as unknown as Row[]).map(toContact);
    }
  }

  return contactsList;
}

export async function deleteContact(id: string, userId?: string) {
  if (isFirebaseConfigured() && userId) {
    try {
      const docRef = doc(db, "users", userId, "contacts", id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.warn("Firestore deleteContact error:", e);
    }
  }

  if (isSupabaseConfigured()) {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) throw error;
  }
}
