import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/useSession";
import {
  emptyContact,
  enrichContactWithoutLoss,
  findMatchingContact,
  loadContactsLocal,
  saveContactsLocal,
  type Contact,
} from "@/lib/contacts";
import {
  batchUpsertContacts,
  deleteContact as deleteContactCloud,
  fetchContacts,
  upsertContact as upsertContactCloud,
} from "@/lib/contacts-cloud";
import type { Candidature } from "@/lib/candidatures";
import type { Entreprise } from "@/lib/entreprises";

// Shared in-memory cache and listeners for instant tab switching
let memoryCacheContacts: Contact[] | null = null;
let hasLoadedCloudContacts = false;
const contactListeners = new Set<(items: Contact[]) => void>();

function notifyContactChange(newItems: Contact[]) {
  memoryCacheContacts = newItems;
  saveContactsLocal(newItems);
  contactListeners.forEach((listener) => listener(newItems));
}

export function useContacts() {
  const { user, loading: authLoading } = useSession();
  const userId = user?.id;
  const isCloudUser = Boolean(userId);

  const [contacts, setContacts] = useState<Contact[]>(() => {
    if (memoryCacheContacts !== null) return memoryCacheContacts;
    if (typeof window !== "undefined") {
      const local = loadContactsLocal();
      memoryCacheContacts = local;
      return local;
    }
    return [];
  });
  const [loading, setLoading] = useState(
    () => memoryCacheContacts === null || memoryCacheContacts.length === 0,
  );

  useEffect(() => {
    const handleSync = (items: Contact[]) => {
      setContacts(items);
      setLoading(false);
    };
    contactListeners.add(handleSync);
    return () => {
      contactListeners.delete(handleSync);
    };
  }, []);

  // Chargement initial (Cloud ou Local)
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    if (!isCloudUser || !userId) {
      const local = memoryCacheContacts ?? loadContactsLocal();
      notifyContactChange(local);
      setLoading(false);
      return;
    }

    if (hasLoadedCloudContacts && memoryCacheContacts) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const cloud = await fetchContacts(userId);
        if (!cancelled) {
          hasLoadedCloudContacts = true;
          if (cloud.length > 0) {
            notifyContactChange(cloud);
          } else {
            const local = memoryCacheContacts ?? loadContactsLocal();
            notifyContactChange(local);
            if (local.length > 0) {
              void batchUpsertContacts(local, userId);
            }
          }
        }
      } catch (err) {
        console.warn("Échec récupération contacts cloud, repli local:", err);
        if (!cancelled) {
          const local = memoryCacheContacts ?? loadContactsLocal();
          notifyContactChange(local);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isCloudUser, userId]);

  /**
   * Sauvegarde ou mise à jour d'un contact
   */
  const saveContact = useCallback(
    async (contactToSave: Contact): Promise<Contact> => {
      const now = new Date().toISOString();
      const updated: Contact = {
        ...contactToSave,
        updatedAt: now,
        nom: contactToSave.nom || contactToSave.fullName || "Sans nom",
      };

      setContacts((prev) => {
        const exists = prev.some((c) => c.id === updated.id);
        const next = exists
          ? prev.map((c) => (c.id === updated.id ? updated : c))
          : [updated, ...prev];
        saveContactsLocal(next);
        return next;
      });

      if (isCloudUser && userId) {
        try {
          await upsertContactCloud(updated, userId);
        } catch (err) {
          console.warn("Échec synchronisation Firestore contact:", err);
        }
      }

      return updated;
    },
    [isCloudUser, userId],
  );

  /**
   * Suppression sécurisée d'un contact :
   * Ne supprime JAMAIS l'entreprise ni les opportunités associées !
   */
  const deleteContactById = useCallback(
    async (id: string): Promise<void> => {
      setContacts((prev) => {
        const next = prev.filter((item) => item.id !== id);
        saveContactsLocal(next);
        return next;
      });

      if (isCloudUser && userId) {
        try {
          await deleteContactCloud(id, userId);
        } catch (err) {
          console.warn("Échec suppression contact Firestore:", err);
        }
      }
    },
    [isCloudUser, userId],
  );

  /**
   * Import par lot avec gestion intelligente des doublons et enrichissement
   */
  const batchImportContacts = useCallback(
    async (
      incomingList: Partial<Contact>[],
      resolutions?: Record<string, "merge" | "both" | "skip">,
    ): Promise<{ total: number; imported: number; updated: number }> => {
      let importedCount = 0;
      let updatedCount = 0;

      const currentContacts = [...contacts];
      const contactsToPersist: Contact[] = [];

      for (let i = 0; i < incomingList.length; i++) {
        const incoming = incomingList[i];
        const matchResult = findMatchingContact(incoming, currentContacts);
        const userChoice = resolutions?.[incoming.id || `idx_${i}`];

        if (matchResult && userChoice !== "both") {
          if (userChoice === "skip") {
            continue; // Ignorer ce contact
          }
          // Par défaut ou choix "merge" : enrichir sans perte
          const enriched = enrichContactWithoutLoss(
            matchResult.contact,
            incoming,
            incoming.source || "imported",
          );

          // Remplacer dans currentContacts
          const idx = currentContacts.findIndex((c) => c.id === enriched.id);
          if (idx !== -1) {
            currentContacts[idx] = enriched;
          }
          contactsToPersist.push(enriched);
          updatedCount++;
        } else {
          // Nouveau contact ou choix explicite "both" (créer doublon séparé)
          const newContact: Contact = {
            ...emptyContact(incoming.nom || incoming.fullName),
            ...incoming,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Contact;

          currentContacts.push(newContact);
          contactsToPersist.push(newContact);
          importedCount++;
        }
      }

      setContacts([...currentContacts]);
      saveContactsLocal(currentContacts);

      if (isCloudUser && userId && contactsToPersist.length > 0) {
        try {
          await batchUpsertContacts(contactsToPersist, userId);
        } catch (err) {
          console.warn("Échec sauvegarde par lot Firestore:", err);
        }
      }

      return {
        total: incomingList.length,
        imported: importedCount,
        updated: updatedCount,
      };
    },
    [contacts, isCloudUser, userId],
  );

  /**
   * Retourne les opportunités rattachées à un contact
   */
  const getOpportunitiesForContact = useCallback(
    (contact: Contact, candidatures: Candidature[]): Candidature[] => {
      const linkedIds = new Set(contact.candidatureIds || []);
      if (contact.candidatureId) linkedIds.add(contact.candidatureId);

      return candidatures.filter((cand) => {
        if (linkedIds.has(cand.id)) return true;
        if (cand.contactId && cand.contactId === contact.id) return true;
        return false;
      });
    },
    [],
  );

  /**
   * Trouve l'entreprise liée à un contact
   */
  const getEntrepriseForContact = useCallback(
    (contact: Contact, entreprises: Entreprise[]): Entreprise | null => {
      if (contact.companyId) {
        const direct = entreprises.find((e) => e.id === contact.companyId);
        if (direct) return direct;
      }
      if (contact.entreprise) {
        const norm = contact.entreprise.trim().toLowerCase();
        const found = entreprises.find(
          (e) =>
            e.nom.trim().toLowerCase() === norm || e.normalizedName === norm,
        );
        if (found) return found;
      }
      return null;
    },
    [],
  );

  return {
    contacts,
    loading,
    saveContact,
    deleteContactById,
    batchImportContacts,
    getOpportunitiesForContact,
    getEntrepriseForContact,
  };
}
