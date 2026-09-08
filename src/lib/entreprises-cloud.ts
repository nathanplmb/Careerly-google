import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db, isFirebaseConfigured, auth } from "@/integrations/firebase/client";
import { emptyEntreprise, type Entreprise } from "./entreprises";

type EntrepriseRow = {
  id: string;
  user_id?: string;
  nom: string;
  normalizedName?: string;
  description?: string | null;
  secteur?: string | null;
  taille?: string | null;
  siege?: string | null;
  siteWeb?: string | null;
  chiffresCles?: string[];
  contexte?: string[];
  partenaires?: string[];
  logoUrl?: string | null;
  notes?: string;
  contactRH?: string;
  telephone?: string;
  email?: string;
  linkedin?: string;
  tags?: string[];
  isFavorite?: boolean;
  manualFields?: string[];
  isManual?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/** Nettoie récursivement pour Firestore en remplaçant undefined par null */
function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) return null as unknown as T;
  if (data === null || typeof data !== "object") return data;
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeForFirestore(item)) as unknown as T;
  }
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    clean[key] = value === undefined ? null : sanitizeForFirestore(value);
  }
  return clean as T;
}

function toEntreprise(r: EntrepriseRow): Entreprise {
  const base = emptyEntreprise(r.nom || "");
  return {
    ...base,
    id: r.id,
    nom: r.nom || base.nom,
    normalizedName: r.normalizedName || base.normalizedName,
    description: r.description ?? null,
    secteur: r.secteur ?? null,
    taille: r.taille ?? null,
    siege: r.siege ?? null,
    siteWeb: r.siteWeb ?? null,
    chiffresCles: Array.isArray(r.chiffresCles) ? r.chiffresCles : [],
    contexte: Array.isArray(r.contexte) ? r.contexte : [],
    partenaires: Array.isArray(r.partenaires) ? r.partenaires : [],
    logoUrl: r.logoUrl ?? null,
    notes: r.notes ?? "",
    contactRH: r.contactRH ?? "",
    telephone: r.telephone ?? "",
    email: r.email ?? "",
    linkedin: r.linkedin ?? "",
    tags: Array.isArray(r.tags) ? r.tags : [],
    isFavorite: Boolean(r.isFavorite),
    manualFields: Array.isArray(r.manualFields) ? r.manualFields : [],
    isManual: Boolean(r.isManual),
    createdAt: r.createdAt || base.createdAt,
    updatedAt: r.updatedAt || base.updatedAt,
  };
}

function toRow(e: Entreprise, userId: string): Record<string, unknown> {
  const row: EntrepriseRow = {
    id: e.id || crypto.randomUUID(),
    user_id: userId,
    nom: e.nom,
    normalizedName: e.normalizedName,
    description: e.description ?? null,
    secteur: e.secteur ?? null,
    taille: e.taille ?? null,
    siege: e.siege ?? null,
    siteWeb: e.siteWeb ?? null,
    chiffresCles: e.chiffresCles || [],
    contexte: e.contexte || [],
    partenaires: e.partenaires || [],
    logoUrl: e.logoUrl ?? null,
    notes: e.notes || "",
    contactRH: e.contactRH || "",
    telephone: e.telephone || "",
    email: e.email || "",
    linkedin: e.linkedin || "",
    tags: e.tags || [],
    isFavorite: Boolean(e.isFavorite),
    manualFields: e.manualFields || [],
    isManual: Boolean(e.isManual),
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  };
  return sanitizeForFirestore(row) as Record<string, unknown>;
}

export async function fetchEntreprises(userId?: string): Promise<Entreprise[]> {
  const effectiveUserId = userId || auth.currentUser?.uid;
  if (isFirebaseConfigured() && effectiveUserId) {
    try {
      const colRef = collection(db, "users", effectiveUserId, "entreprises");
      const snap = await getDocs(query(colRef));
      const list: Entreprise[] = [];
      snap.forEach((docSnap) => {
        list.push(
          toEntreprise({ id: docSnap.id, ...docSnap.data() } as EntrepriseRow),
        );
      });
      return list;
    } catch (e) {
      console.warn("Firestore fetchEntreprises error:", e);
    }
  }
  return [];
}

export async function upsertEntreprise(
  e: Entreprise,
  userId: string,
): Promise<Entreprise> {
  if (isFirebaseConfigured() && userId) {
    try {
      const row = toRow(e, userId);
      const docRef = doc(db, "users", userId, "entreprises", e.id);
      await setDoc(docRef, row, { merge: true });
      return toEntreprise(row as unknown as EntrepriseRow);
    } catch (err) {
      console.warn("Firestore upsertEntreprise error:", err);
    }
  }
  return e;
}

export async function deleteEntrepriseCloud(
  id: string,
  userId: string,
): Promise<void> {
  if (isFirebaseConfigured() && userId) {
    try {
      const docRef = doc(db, "users", userId, "entreprises", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("Firestore deleteEntreprise error:", err);
    }
  }
}
