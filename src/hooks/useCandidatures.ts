import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/useSession";
import {
  deleteCandidature,
  fetchCandidatures,
  upsertCandidature,
} from "@/lib/candidatures-cloud";
import {
  loadCandidatures,
  saveCandidatures,
  type Candidature,
} from "@/lib/candidatures";
import {
  findMatchingEntreprise,
  loadEntreprisesLocal,
  saveEntreprisesLocal,
  shouldKeepEntrepriseAfterOpportunityDeleted,
  syncEntrepriseFromOpportunity,
  type Entreprise,
} from "@/lib/entreprises";
import {
  deleteEntrepriseCloud,
  fetchEntreprises,
  upsertEntreprise,
} from "@/lib/entreprises-cloud";
import {
  emptyContact,
  enrichContactWithoutLoss,
  findMatchingContact,
  loadContactsLocal,
  parseRawContactInput,
  saveContactsLocal,
  type Contact,
} from "@/lib/contacts";
import {
  batchUpsertContacts,
  fetchContacts,
  upsertContact as upsertContactCloud,
} from "@/lib/contacts-cloud";

/**
 * Synchronise l'entreprise correspondante lors de l'enregistrement d'une opportunité.
 * Crée ou enrichit la fiche entreprise et retourne son companyId.
 */
async function syncOpportunityCompanyOnSave(
  c: Candidature,
  userId?: string,
): Promise<string | null> {
  const oppNom = c.companyName || c.company || c.entreprise || "";
  if (!oppNom.trim()) return null;

  try {
    let list = loadEntreprisesLocal();
    if (userId) {
      const cloudList = await fetchEntreprises(userId).catch(() => []);
      if (cloudList.length > 0) list = cloudList;
    }

    const { entreprise, isNew } = syncEntrepriseFromOpportunity(c, list);

    const nextList = isNew
      ? [entreprise, ...list]
      : list.map((item) => (item.id === entreprise.id ? entreprise : item));

    saveEntreprisesLocal(nextList);
    if (userId) {
      void upsertEntreprise(entreprise, userId);
    }
    return entreprise.id;
  } catch (err) {
    console.warn(
      "Échec synchronisation entreprise lors de la sauvegarde :",
      err,
    );
    return null;
  }
}

/**
 * Gère le cycle de vie de l'entreprise lors de la suppression d'une opportunité :
 * - SI l'entreprise a encore d'autres opportunités -> conservée.
 * - SI 0 opportunité restante mais données persistantes (contacts, notes, coordonnées, favoris) -> conservée.
 * - SI 0 opportunité et totalement vide (aucune donnée manuelle) -> supprimée automatiquement.
 */
async function syncOpportunityCompanyOnDelete(
  deletedItem: Candidature,
  remainingItems: Candidature[],
  userId?: string,
) {
  const oppNom =
    deletedItem.companyName ||
    deletedItem.company ||
    deletedItem.entreprise ||
    "";
  if (!oppNom.trim() && !deletedItem.companyId) return;

  try {
    let list = loadEntreprisesLocal();
    if (userId) {
      const cloudList = await fetchEntreprises(userId).catch(() => []);
      if (cloudList.length > 0) list = cloudList;
    }

    const matched = findMatchingEntreprise(
      {
        companyId: deletedItem.companyId,
        nom: oppNom,
      },
      list,
    );

    if (!matched) return;

    let contacts = loadContactsLocal();
    if (userId) {
      const cloudContacts = await fetchContacts(userId).catch(() => []);
      if (cloudContacts.length > 0) contacts = cloudContacts;
    }

    const shouldKeep = shouldKeepEntrepriseAfterOpportunityDeleted(
      matched,
      remainingItems,
      contacts,
    );

    if (!shouldKeep) {
      const nextList = list.filter((e) => e.id !== matched.id);
      saveEntreprisesLocal(nextList);
      if (userId) {
        void deleteEntrepriseCloud(matched.id, userId);
      }
    }
  } catch (err) {
    console.warn("Échec vérification nettoyage entreprise:", err);
  }
}

/**
 * Synchronisation intelligente de contact lors de l'enregistrement d'une opportunité :
 * - Si contactId est déjà lié, associe l'entreprise et ajoute l'opportunité dans ses candidatureIds.
 * - Si du texte est présent dans c.contact, le parse et le déduplique/enrichit ou crée un contact propre.
 */
async function syncOpportunityContactOnSave(
  opp: Candidature,
  companyId: string | null,
  userId?: string,
): Promise<string | null> {
  try {
    let contacts = loadContactsLocal();
    if (userId) {
      const cloud = await fetchContacts(userId).catch(() => []);
      if (cloud.length > 0) contacts = cloud;
    }

    const companyName = opp.companyName || opp.company || opp.entreprise || "";

    // Cas 1 : contactId explicite
    if (opp.contactId) {
      const existing = contacts.find((c) => c.id === opp.contactId);
      if (existing) {
        const oppIds = new Set(existing.candidatureIds || []);
        if (existing.candidatureId) oppIds.add(existing.candidatureId);
        oppIds.add(opp.id);

        const updatedContact: Contact = {
          ...existing,
          candidatureIds: Array.from(oppIds),
          candidatureId: existing.candidatureId || opp.id,
          companyId: companyId || existing.companyId,
          entreprise: existing.entreprise || companyName,
          updatedAt: new Date().toISOString(),
        };

        const nextContacts = contacts.map((c) =>
          c.id === updatedContact.id ? updatedContact : c,
        );
        saveContactsLocal(nextContacts);
        if (userId) void upsertContactCloud(updatedContact, userId);
        return updatedContact.id;
      }
    }

    // Cas 2 : texte saisi ou extrait dans opp.contact
    const rawContactText = (opp.contact || "").trim();
    if (!rawContactText) return null;

    const parsed = parseRawContactInput(rawContactText);
    const parsedName = (parsed.nom || "").trim();
    if (!parsedName && !parsed.email && !parsed.telephone) return null;

    const candidateTarget: Partial<Contact> = {
      ...parsed,
      entreprise: companyName,
      companyId: companyId || undefined,
    };

    const match = findMatchingContact(candidateTarget, contacts);

    if (match) {
      const enriched = enrichContactWithoutLoss(
        match.contact,
        {
          ...candidateTarget,
          candidatureId: opp.id,
          candidatureIds: [opp.id],
        },
        "opportunity",
      );

      const nextContacts = contacts.map((c) =>
        c.id === enriched.id ? enriched : c,
      );
      saveContactsLocal(nextContacts);
      if (userId) void upsertContactCloud(enriched, userId);
      return enriched.id;
    } else {
      const newContact: Contact = {
        ...emptyContact(parsedName || "Contact opportunité"),
        ...candidateTarget,
        id: crypto.randomUUID(),
        entreprise: companyName,
        companyId: companyId || null,
        candidatureId: opp.id,
        candidatureIds: [opp.id],
        source: "opportunity",
        sources: ["opportunity"],
        tags: ["Opportunité"],
        isManual: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const nextContacts = [newContact, ...contacts];
      saveContactsLocal(nextContacts);
      if (userId) void upsertContactCloud(newContact, userId);
      return newContact.id;
    }
  } catch (err) {
    console.warn("Échec synchronisation contact opportunité:", err);
    return null;
  }
}

/**
 * Détachement sécurisé d'un contact lors de la suppression d'une opportunité :
 * Ne supprime JAMAIS le contact ! Retire uniquement l'ID de l'opportunité de son historique.
 */
async function syncOpportunityContactOnDelete(
  deletedOpp: Candidature,
  userId?: string,
) {
  try {
    let contacts = loadContactsLocal();
    if (userId) {
      const cloud = await fetchContacts(userId).catch(() => []);
      if (cloud.length > 0) contacts = cloud;
    }

    let modified = false;
    const updatedContacts = contacts.map((ct) => {
      const hasId =
        ct.candidatureId === deletedOpp.id ||
        (ct.candidatureIds && ct.candidatureIds.includes(deletedOpp.id));
      if (!hasId) return ct;

      modified = true;
      const nextCandIds = (ct.candidatureIds || []).filter(
        (id) => id !== deletedOpp.id,
      );
      return {
        ...ct,
        candidatureIds: nextCandIds,
        candidatureId:
          ct.candidatureId === deletedOpp.id
            ? nextCandIds[0] || ""
            : ct.candidatureId,
        updatedAt: new Date().toISOString(),
      };
    });

    if (modified) {
      saveContactsLocal(updatedContacts);
      if (userId) {
        void batchUpsertContacts(updatedContacts, userId);
      }
    }
  } catch (err) {
    console.warn(
      "Échec détachement contact lors de la suppression d'opportunité:",
      err,
    );
  }
}

/**
 * Migration prudente des opportunités existantes sans companyId :
 * Rattache l'identifiant d'entreprise et enrichit la base sans rien écraser.
 */
async function migrateExistingOpportunities(
  loadedItems: Candidature[],
  userId?: string,
): Promise<Candidature[]> {
  try {
    let list = loadEntreprisesLocal();
    if (userId) {
      const cloud = await fetchEntreprises(userId).catch(() => []);
      if (cloud.length > 0) list = cloud;
    }

    let modifiedEntreprises = false;
    let modifiedOpportunities = false;

    const updatedItems = loadedItems.map((c) => {
      const nom = c.companyName || c.company || c.entreprise || "";
      if (!nom.trim()) return c;

      const { entreprise, isNew } = syncEntrepriseFromOpportunity(c, list);
      if (isNew) {
        list = [entreprise, ...list];
        modifiedEntreprises = true;
        if (userId) void upsertEntreprise(entreprise, userId);
      }

      if (c.companyId !== entreprise.id) {
        modifiedOpportunities = true;
        return {
          ...c,
          companyId: entreprise.id,
        };
      }
      return c;
    });

    if (modifiedEntreprises) {
      saveEntreprisesLocal(list);
    }

    return modifiedOpportunities ? updatedItems : loadedItems;
  } catch (err) {
    console.warn("Échec migration des opportunités existantes:", err);
    return loadedItems;
  }
}

/**
 * Source unique des candidatures : cloud si connecté, navigateur sinon.
 * Partagé par toutes les pages (dashboard, opportunités, calendrier, entreprises…).
 */
export function useCandidatures() {
  const { user, loading: authLoading } = useSession();
  const userId = user?.id;
  const isCloudUser = Boolean(userId);
  const [items, setItems] = useState<Candidature[]>([]);
  const [ready, setReady] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    if (!isCloudUser || !userId) {
      const localItems = loadCandidatures();
      void migrateExistingOpportunities(localItems).then((migrated) => {
        if (!cancelled) {
          setItems(migrated);
          saveCandidatures(migrated);
          setReady(true);
        }
      });
      return;
    }

    setReady(false);
    setSyncing(true);
    (async () => {
      try {
        const cloud = await fetchCandidatures(userId);
        if (!cancelled) {
          const migrated = await migrateExistingOpportunities(cloud, userId);
          setItems(migrated);
        }
      } catch (err) {
        console.warn("Firestore/cloud fetch error:", err);
        if (!cancelled) {
          const localItems = loadCandidatures();
          const migrated = await migrateExistingOpportunities(
            localItems,
            userId,
          );
          setItems(migrated);
        }
      } finally {
        if (!cancelled) {
          setSyncing(false);
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isCloudUser, userId, authLoading]);

  // Multi-appareils : on relit le cloud au retour sur l'onglet si connecté au cloud
  useEffect(() => {
    if (!isCloudUser || !userId) return;
    const refresh = () => {
      if (document.visibilityState !== "visible") return;
      void fetchCandidatures(userId)
        .then((cloud) => migrateExistingOpportunities(cloud, userId))
        .then(setItems)
        .catch(() => undefined);
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [isCloudUser, userId]);

  useEffect(() => {
    if (ready && !isCloudUser) saveCandidatures(items);
  }, [items, ready, isCloudUser]);

  const pushCloud = useCallback(
    (c: Candidature) => {
      if (!isCloudUser || !userId) return;
      void upsertCandidature(c, userId).catch(() =>
        toast.error("Enregistrement en ligne impossible."),
      );
    },
    [isCloudUser, userId],
  );

  const patch = useCallback(
    (id: string, p: Partial<Candidature>) => {
      setItems((prev) => {
        const current = prev.find((c) => c.id === id);
        if (!current) return prev;
        const next = { ...current, ...p };
        pushCloud(next);
        if (!isCloudUser) {
          saveCandidatures(prev.map((c) => (c.id === id ? next : c)));
        }
        return prev.map((c) => (c.id === id ? next : c));
      });
    },
    [pushCloud, isCloudUser],
  );

  const remove = useCallback(
    (id: string) => {
      setItems((prev) => {
        const toDelete = prev.find((p) => p.id === id);
        const next = prev.filter((p) => p.id !== id);
        saveCandidatures(next);

        if (toDelete) {
          void syncOpportunityCompanyOnDelete(toDelete, next, userId);
          void syncOpportunityContactOnDelete(toDelete, userId);
        }

        return next;
      });
      if (isCloudUser && userId) {
        void deleteCandidature(id, userId).catch(() =>
          toast.error("Suppression en ligne impossible."),
        );
      }
      toast.success("Opportunité supprimée.");
    },
    [isCloudUser, userId],
  );

  const save = useCallback(
    async (c: Candidature) => {
      // 1. Synchronisation automatique avec la fiche Entreprise
      const linkedCompanyId = await syncOpportunityCompanyOnSave(c, userId);
      let toSave = linkedCompanyId ? { ...c, companyId: linkedCompanyId } : c;

      // 2. Synchronisation automatique avec la fiche Contact
      const linkedContactId = await syncOpportunityContactOnSave(
        toSave,
        toSave.companyId || null,
        userId,
      );
      if (linkedContactId) {
        toSave = {
          ...toSave,
          contactId: linkedContactId,
          contactIds: Array.from(
            new Set([...(toSave.contactIds || []), linkedContactId]),
          ),
        };
      }

      let saved = toSave;
      if (isCloudUser && userId) {
        try {
          saved = await upsertCandidature(toSave, userId);
        } catch (err) {
          console.warn("Échec sauvegarde Firestore, repli local:", err);
        }
      }

      setItems((prev) => {
        const next = prev.some((p) => p.id === toSave.id)
          ? prev.map((p) => (p.id === toSave.id ? saved : p))
          : [saved, ...prev];
        saveCandidatures(next);
        return next;
      });
      return saved;
    },
    [isCloudUser, userId],
  );

  return {
    user,
    authLoading,
    items,
    setItems,
    ready,
    syncing,
    patch,
    remove,
    save,
    pushCloud,
  };
}
