import {
  loadCandidatures,
  saveCandidatures,
  type Candidature,
} from "./candidatures";
import { loadContactsLocal, saveContactsLocal, type Contact } from "./contacts";
import { loadProfil, saveProfilLocal, type Profil } from "./profil";
import {
  getCompteActif,
  setCompteActif,
  type UtilisateurLocal,
} from "./auth-local";

export interface PaquetSynchronisation {
  version: number;
  date: string;
  source: string;
  compte?: UtilisateurLocal | null;
  profil: Profil;
  candidatures: Candidature[];
  contacts: Contact[];
}

/**
 * Génère un code de transfert complet et autonome (pour transférer tout le compte entre Preview et Vercel en 1 clic)
 */
export function genererCodeTransfert(): string {
  const paquet: PaquetSynchronisation = {
    version: 1,
    date: new Date().toISOString(),
    source: typeof window !== "undefined" ? window.location.origin : "careerly",
    compte: getCompteActif(),
    profil: loadProfil(),
    candidatures: loadCandidatures(),
    contacts: loadContactsLocal(),
  };

  const json = JSON.stringify(paquet);
  // Encodage base64 UTF-8 sécurisé
  const base64 = btoa(
    encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    ),
  );
  return `CAREERLY_SYNC_${base64}`;
}

/**
 * Applique un code de transfert sur la plateforme active
 */
export function appliquerCodeTransfert(code: string): {
  success: boolean;
  message: string;
  candidaturesCount: number;
  contactsCount: number;
} {
  try {
    let nettoye = code.trim();
    if (nettoye.startsWith("CAREERLY_SYNC_")) {
      nettoye = nettoye.replace("CAREERLY_SYNC_", "");
    }

    const decodedJson = decodeURIComponent(
      Array.prototype.map
        .call(atob(nettoye), (c: string) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const paquet = JSON.parse(decodedJson) as PaquetSynchronisation;

    if (!paquet || typeof paquet !== "object") {
      throw new Error("Format de données de synchronisation invalide.");
    }

    // 1. Sauvegarder le profil
    if (paquet.profil) {
      saveProfilLocal(paquet.profil);
    }

    // 2. Sauvegarder les candidatures
    let candidaturesCount = 0;
    if (Array.isArray(paquet.candidatures)) {
      saveCandidatures(paquet.candidatures);
      candidaturesCount = paquet.candidatures.length;
    }

    // 3. Sauvegarder les contacts
    let contactsCount = 0;
    if (Array.isArray(paquet.contacts)) {
      saveContactsLocal(paquet.contacts);
      contactsCount = paquet.contacts.length;
    }

    // 4. Mettre à jour le compte actif si présent
    if (paquet.compte) {
      setCompteActif(paquet.compte);
    }

    // Dispatcher les événements pour recharger les hooks
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("careerly_candidatures_change"));
      window.dispatchEvent(new Event("careerly_auth_change"));
      window.dispatchEvent(new Event("storage"));
    }

    return {
      success: true,
      message: "Synchronisation effectuée avec succès !",
      candidaturesCount,
      contactsCount,
    };
  } catch (err: unknown) {
    const msg =
      err instanceof Error
        ? err.message
        : "Code de synchronisation incorrect ou corrompu.";
    return {
      success: false,
      message: msg,
      candidaturesCount: 0,
      contactsCount: 0,
    };
  }
}
