import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, auth, isFirebaseConfigured } from "@/integrations/firebase/client";
import { getComptesEnregistres, getCompteActif } from "./auth-local";

export interface AdminUserRecord {
  id: string; // Firebase UID
  email: string;
  prenom?: string;
  nom?: string;
  titre?: string;
  ecole?: string;
  formation?: string;
  localisation?: string;
  photoUrl?: string;
  provider: "google" | "email" | "demo" | "inconnu";
  emailVerified: boolean;
  creeLe: string; // ISO string ou date lisible
  dernierAccesLe: string; // ISO string ou date lisible
  statut: "actif" | "incomplet" | "sans_activite";
  // Métriques d'activité
  stats: {
    candidaturesCount: number;
    contactsCount: number;
    entreprisesCount: number;
    tauxCompletionProfil: number; // 0 à 100%
  };
  source: "firestore" | "local" | "auth";
}

export interface AdminUserDetails extends AdminUserRecord {
  candidatures: Array<{
    id: string;
    poste: string;
    entreprise: string;
    statut: string;
    datePostulation?: string;
    updatedAt?: string;
  }>;
  contacts: Array<{
    id: string;
    nom: string;
    entreprise?: string;
    poste?: string;
    email?: string;
    telephone?: string;
  }>;
  entreprises: Array<{
    id: string;
    nom: string;
    secteur?: string;
    siteWeb?: string;
  }>;
  sessionInfo: {
    tokenExpirationEstimate: string;
    authProvider: string;
    isCurrentSession: boolean;
    isSuperAdmin: boolean;
    lastSignInTime?: string;
    creationTime?: string;
  };
}

export interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  googleUsers: number;
  emailUsers: number;
  totalCandidatures: number;
  totalContacts: number;
  totalEntreprises: number;
  tauxMoyenCompletion: number;
}

/**
 * Vérifie si un UID possède les droits administrateurs dans Firestore (/admins/{uid}).
 */
export async function checkIsAdmin(uid?: string): Promise<boolean> {
  if (!uid || !isFirebaseConfigured()) return false;
  try {
    const snap = await getDoc(doc(db, "admins", uid));
    return snap.exists();
  } catch (err) {
    console.warn("Échec vérification statut admin:", err);
    return false;
  }
}

/**
 * Initialise le rôle administrateur dans Firestore pour le compte propriétaire prédéfini (nathpa1423@gmail.com).
 * Les règles de sécurité firestore.rules autorisent cette création pour ce compte authentifié.
 */
export async function bootstrapAdminAccount(
  uid: string,
  email: string,
): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      message: "Firebase n'est pas initialisé dans cet environnement.",
    };
  }
  if (email.toLowerCase() !== "nathpa1423@gmail.com") {
    return {
      success: false,
      message:
        "Seul le compte nathpa1423@gmail.com est habilité à s'auto-initialiser comme super-administrateur.",
    };
  }

  try {
    const adminRef = doc(db, "admins", uid);
    await setDoc(
      adminRef,
      {
        user_id: uid,
        email: email.toLowerCase(),
        role: "super_admin",
        creeLe: new Date().toISOString(),
        initialisePar: "self_bootstrap",
      },
      { merge: true },
    );

    return {
      success: true,
      message: "Rôle administrateur activé avec succès dans Firestore.",
    };
  } catch (err: unknown) {
    console.error("Erreur lors de l'initialisation admin:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Impossible d'écrire dans la collection admins: ${msg}`,
    };
  }
}

/**
 * Calcule le taux de complétion d'un profil (0 à 100%)
 */
function calculerCompletion(data: Record<string, unknown>): number {
  const champs = [
    data["prenom"],
    data["nom"],
    data["titre"] || data["formation"],
    data["ecole"],
    data["localisation"],
    data["competences"],
    data["experiences"],
    data["cv"],
  ];
  const remplis = champs.filter((c) =>
    Boolean(c && String(c).trim().length > 0),
  );
  return Math.round((remplis.length / champs.length) * 100);
}

/**
 * Récupère tous les utilisateurs enregistrés pour la vue d'administration.
 */
export async function fetchAllUsersForAdmin(): Promise<{
  users: AdminUserRecord[];
  metrics: AdminMetrics;
}> {
  const usersMap = new Map<string, AdminUserRecord>();

  // 1. Charger les profils depuis Firestore /profils
  if (isFirebaseConfigured()) {
    try {
      const snap = await getDocs(collection(db, "profils"));
      for (const docSnap of snap.docs) {
        const d = docSnap.data();
        const uid = docSnap.id;
        const completion = calculerCompletion(d);

        // Compter les sous-collections de cet utilisateur
        let candCount = 0;
        let contCount = 0;
        let entCount = 0;

        try {
          const cSnap = await getDocs(
            collection(db, "users", uid, "candidatures"),
          );
          candCount = cSnap.size;
        } catch {
          // Ignorer si vide
        }

        try {
          const ctSnap = await getDocs(
            collection(db, "users", uid, "contacts"),
          );
          contCount = ctSnap.size;
        } catch {
          // Ignorer si vide
        }

        try {
          const eSnap = await getDocs(
            collection(db, "users", uid, "entreprises"),
          );
          entCount = eSnap.size;
        } catch {
          // Ignorer si vide
        }

        const email = (d["email"] ||
          d["emailContact"] ||
          "Non disponible") as string;
        let provider: AdminUserRecord["provider"] = "inconnu";
        if (d["provider"] === "google" || email.includes("@gmail.com"))
          provider = "google";
        else if (d["provider"] === "email") provider = "email";
        else if (d["provider"] === "demo") provider = "demo";

        const creeLe = (d["createdAt"] ||
          d["updated_at"] ||
          "Non disponible") as string;
        const dernierAccesLe = (d["dernierAccesLe"] ||
          d["updated_at"] ||
          "Non disponible") as string;

        let statut: AdminUserRecord["statut"] = "actif";
        if (completion < 40 && candCount === 0) statut = "incomplet";
        else if (candCount === 0 && contCount === 0) statut = "sans_activite";

        usersMap.set(uid, {
          id: uid,
          email,
          prenom: (d["prenom"] as string) || undefined,
          nom: (d["nom"] as string) || undefined,
          titre: (d["titre"] as string) || undefined,
          ecole: (d["ecole"] as string) || undefined,
          formation: (d["formation"] as string) || undefined,
          localisation: (d["localisation"] as string) || undefined,
          photoUrl: (d["photoUrl"] as string) || undefined,
          provider,
          emailVerified: Boolean(email && email !== "Non disponible"),
          creeLe,
          dernierAccesLe,
          statut,
          stats: {
            candidaturesCount: candCount,
            contactsCount: contCount,
            entreprisesCount: entCount,
            tauxCompletionProfil: completion,
          },
          source: "firestore",
        });
      }
    } catch (err) {
      console.warn("Erreur lecture collection profils dans Firestore:", err);
    }
  }

  // 2. Fusionner avec les utilisateurs enregistrés localement
  try {
    const localList = getComptesEnregistres();
    for (const u of localList) {
      if (!usersMap.has(u.id)) {
        usersMap.set(u.id, {
          id: u.id,
          email: u.email || "Non disponible",
          prenom: u.prenom,
          nom: u.nom,
          ecole: u.ecole,
          provider: (u.provider as AdminUserRecord["provider"]) || "email",
          emailVerified: false,
          creeLe: u.creeLe || "Non disponible",
          dernierAccesLe: u.dernierAccesLe || "Non disponible",
          statut: "actif",
          stats: {
            candidaturesCount: 0,
            contactsCount: 0,
            entreprisesCount: 0,
            tauxCompletionProfil: u.prenom && u.nom ? 50 : 25,
          },
          source: "local",
        });
      }
    }
  } catch {
    // Ignorer
  }

  // Si l'utilisateur actuel est connecté dans Firebase Auth mais n'était pas dans la liste
  if (auth.currentUser) {
    const fUser = auth.currentUser;
    if (!usersMap.has(fUser.uid)) {
      const parts = (fUser.displayName || "").split(" ");
      usersMap.set(fUser.uid, {
        id: fUser.uid,
        email: fUser.email || "Non disponible",
        prenom: parts[0] || undefined,
        nom: parts.slice(1).join(" ") || undefined,
        photoUrl: fUser.photoURL || undefined,
        provider:
          fUser.providerData[0]?.providerId === "google.com"
            ? "google"
            : "email",
        emailVerified: fUser.emailVerified,
        creeLe: fUser.metadata.creationTime || new Date().toISOString(),
        dernierAccesLe:
          fUser.metadata.lastSignInTime || new Date().toISOString(),
        statut: "actif",
        stats: {
          candidaturesCount: 0,
          contactsCount: 0,
          entreprisesCount: 0,
          tauxCompletionProfil: 60,
        },
        source: "auth",
      });
    }
  }

  const users = Array.from(usersMap.values()).sort((a, b) => {
    const dateA = new Date(
      a.dernierAccesLe === "Non disponible" ? a.creeLe : a.dernierAccesLe,
    ).getTime();
    const dateB = new Date(
      b.dernierAccesLe === "Non disponible" ? b.creeLe : b.dernierAccesLe,
    ).getTime();
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
  });

  // Calcul des métriques globales
  let totalCands = 0;
  let totalConts = 0;
  let totalEnts = 0;
  let sumCompletion = 0;
  let googleCount = 0;
  let emailCount = 0;
  let activeCount = 0;

  for (const u of users) {
    totalCands += u.stats.candidaturesCount;
    totalConts += u.stats.contactsCount;
    totalEnts += u.stats.entreprisesCount;
    sumCompletion += u.stats.tauxCompletionProfil;
    if (u.provider === "google") googleCount++;
    else emailCount++;
    if (u.statut === "actif") activeCount++;
  }

  const metrics: AdminMetrics = {
    totalUsers: users.length,
    activeUsers: activeCount,
    googleUsers: googleCount,
    emailUsers: emailCount,
    totalCandidatures: totalCands,
    totalContacts: totalConts,
    totalEntreprises: totalEnts,
    tauxMoyenCompletion:
      users.length > 0 ? Math.round(sumCompletion / users.length) : 0,
  };

  return { users, metrics };
}

/**
 * Récupère le détail complet d'un utilisateur pour le tiroir d'inspection administrateur.
 */
export async function fetchUserDetailsForAdmin(
  userRecord: AdminUserRecord,
): Promise<AdminUserDetails> {
  const candidatures: AdminUserDetails["candidatures"] = [];
  const contacts: AdminUserDetails["contacts"] = [];
  const entreprises: AdminUserDetails["entreprises"] = [];

  if (isFirebaseConfigured() && userRecord.source === "firestore") {
    try {
      const cSnap = await getDocs(
        collection(db, "users", userRecord.id, "candidatures"),
      );
      cSnap.forEach((docSnap) => {
        const d = docSnap.data();
        candidatures.push({
          id: docSnap.id,
          poste: (d["poste"] as string) || "Poste non spécifié",
          entreprise:
            (d["entreprise"] as string) ||
            (d["companyName"] as string) ||
            "Entreprise non spécifiée",
          statut: (d["statut"] as string) || "Non défini",
          datePostulation: (d["appliedAt"] ||
            d["savedAt"] ||
            d["dateCandidature"]) as string,
          updatedAt: d["updatedAt"] as string,
        });
      });
    } catch {
      // Ignorer
    }

    try {
      const ctSnap = await getDocs(
        collection(db, "users", userRecord.id, "contacts"),
      );
      ctSnap.forEach((docSnap) => {
        const d = docSnap.data();
        contacts.push({
          id: docSnap.id,
          nom: (d["nom"] as string) || "Contact sans nom",
          entreprise: d["entreprise"] as string,
          poste: d["poste"] as string,
          email: d["email"] as string,
          telephone: d["telephone"] as string,
        });
      });
    } catch {
      // Ignorer
    }

    try {
      const eSnap = await getDocs(
        collection(db, "users", userRecord.id, "entreprises"),
      );
      eSnap.forEach((docSnap) => {
        const d = docSnap.data();
        entreprises.push({
          id: docSnap.id,
          nom: (d["nom"] as string) || "Entreprise",
          secteur: d["secteur"] as string,
          siteWeb: d["siteWeb"] as string,
        });
      });
    } catch {
      // Ignorer
    }
  }

  const isCurrent = auth.currentUser?.uid === userRecord.id;
  const isSuper = userRecord.email.toLowerCase() === "nathpa1423@gmail.com";

  return {
    ...userRecord,
    candidatures,
    contacts,
    entreprises,
    sessionInfo: {
      tokenExpirationEstimate: isCurrent
        ? "1 heure (renouvelé automatiquement par Firebase)"
        : "Gérée par Firebase Auth",
      authProvider:
        userRecord.provider === "google"
          ? "Google Identity Platform (OAuth2 / OIDC)"
          : "Firebase Password Provider",
      isCurrentSession: isCurrent,
      isSuperAdmin: isSuper,
      lastSignInTime: userRecord.dernierAccesLe,
      creationTime: userRecord.creeLe,
    },
  };
}
