import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/useSession";
import {
  deleteEntrepriseCloud,
  fetchEntreprises,
  upsertEntreprise,
  batchUpsertEntreprises,
} from "@/lib/entreprises-cloud";
import {
  emptyEntreprise,
  findMatchingEntreprise,
  hasPersistentData,
  loadEntreprisesLocal,
  normalizeCompanyName,
  saveEntreprisesLocal,
  shouldKeepEntrepriseAfterOpportunityDeleted,
  syncEntrepriseFromOpportunity,
  syncEntrepriseFromContact,
  type Entreprise,
} from "@/lib/entreprises";
import type { Candidature } from "@/lib/candidatures";
import type { Contact } from "@/lib/contacts";

// Shared in-memory cache and listeners for instant tab switching
let memoryCacheEntreprises: Entreprise[] | null = null;
let hasLoadedCloudEntreprises = false;
const entrepriseListeners = new Set<(items: Entreprise[]) => void>();

function notifyEntrepriseChange(newItems: Entreprise[]) {
  memoryCacheEntreprises = newItems;
  saveEntreprisesLocal(newItems);
  entrepriseListeners.forEach((listener) => listener(newItems));
}

export function useEntreprises() {
  const { user, loading: authLoading } = useSession();
  const userId = user?.id;
  const isCloudUser = Boolean(userId);

  const [entreprises, setEntreprises] = useState<Entreprise[]>(() => {
    if (memoryCacheEntreprises !== null) return memoryCacheEntreprises;
    if (typeof window !== "undefined") {
      const local = loadEntreprisesLocal();
      memoryCacheEntreprises = local;
      return local;
    }
    return [];
  });
  const [loading, setLoading] = useState(
    () =>
      memoryCacheEntreprises === null || memoryCacheEntreprises.length === 0,
  );

  const entreprisesRef = useRef<Entreprise[]>([]);
  entreprisesRef.current = entreprises;

  useEffect(() => {
    const handleSync = (items: Entreprise[]) => {
      setEntreprises(items);
      setLoading(false);
    };
    entrepriseListeners.add(handleSync);
    return () => {
      entrepriseListeners.delete(handleSync);
    };
  }, []);

  // Chargement initial (Cloud ou Local)
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    if (!isCloudUser || !userId) {
      const local = memoryCacheEntreprises ?? loadEntreprisesLocal();
      notifyEntrepriseChange(local);
      setLoading(false);
      return;
    }

    if (hasLoadedCloudEntreprises && memoryCacheEntreprises) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const cloud = await fetchEntreprises(userId);
        if (!cancelled) {
          hasLoadedCloudEntreprises = true;
          if (cloud.length > 0) {
            notifyEntrepriseChange(cloud);
          } else {
            const local = memoryCacheEntreprises ?? loadEntreprisesLocal();
            notifyEntrepriseChange(local);
          }
        }
      } catch (err) {
        console.warn("Échec récupération entreprises cloud, repli local:", err);
        if (!cancelled) {
          const local = memoryCacheEntreprises ?? loadEntreprisesLocal();
          notifyEntrepriseChange(local);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isCloudUser, userId, authLoading]);

  // Sauvegarde persistante (Cloud + Local)
  const saveEntreprise = useCallback(
    async (e: Entreprise): Promise<Entreprise> => {
      let saved = e;
      if (isCloudUser && userId) {
        try {
          saved = await upsertEntreprise(e, userId);
        } catch (err) {
          console.warn("Échec sauvegarde entreprise Firestore:", err);
        }
      }
      setEntreprises((prev) => {
        const exists = prev.some((item) => item.id === e.id);
        const next = exists
          ? prev.map((item) => (item.id === e.id ? saved : item))
          : [saved, ...prev];
        saveEntreprisesLocal(next);
        return next;
      });
      return saved;
    },
    [isCloudUser, userId],
  );

  // Suppression manuelle sécurisée d'une entreprise
  const removeEntreprise = useCallback(
    async (id: string): Promise<void> => {
      setEntreprises((prev) => {
        const next = prev.filter((item) => item.id !== id);
        saveEntreprisesLocal(next);
        return next;
      });
      if (isCloudUser && userId) {
        try {
          await deleteEntrepriseCloud(id, userId);
        } catch (err) {
          console.warn("Échec suppression entreprise Firestore:", err);
        }
      }
    },
    [isCloudUser, userId],
  );

  // Retourne toutes les opportunités réellement liées à une entreprise
  const getOpportunitiesForEntreprise = useCallback(
    (e: Entreprise, candidatures: Candidature[]): Candidature[] => {
      return candidatures.filter((c) => {
        if (c.companyId && c.companyId === e.id) return true;
        const norm = normalizeCompanyName(
          c.companyName || c.company || c.entreprise,
        );
        return norm === e.normalizedName;
      });
    },
    [],
  );

  // Retourne tous les contacts réellement liés à une entreprise
  const getContactsForEntreprise = useCallback(
    (e: Entreprise, contacts: Contact[]): Contact[] => {
      return contacts.filter((ct) => {
        if (ct.candidatureId && ct.candidatureId === e.id) return true;
        if ((ct as unknown as { companyId?: string }).companyId === e.id)
          return true;
        if (ct.entreprise) {
          const match = findMatchingEntreprise({ nom: ct.entreprise }, [e]);
          if (match) return true;
        }
        return false;
      });
    },
    [],
  );

  /**
   * Synchronisation automatique intelligente :
   * - Pour chaque opportunité ET chaque contact réseau, s'assure qu'une entreprise existe et est enrichie.
   * - Rattache `companyId` si absent.
   * - Ne supprime jamais les données manuelles utilisateur.
   */
  const syncWithOpportunites = useCallback(
    async (
      candidatures: Candidature[],
      contacts: Contact[] = [],
    ): Promise<{
      updatedEntreprises: Entreprise[];
      patchedCandidatures: Candidature[];
    }> => {
      let currentList = [...entreprisesRef.current];
      const patchedCands: Candidature[] = [];
      const toUpsert: Entreprise[] = [];
      let anyChanged = false;

      // 1. Synchronisation à partir des opportunités
      for (const opp of candidatures) {
        const oppNom = opp.companyName || opp.company || opp.entreprise || "";
        if (!oppNom.trim()) continue;

        const { entreprise, isNew, hasChanged } = syncEntrepriseFromOpportunity(
          opp,
          currentList,
        );

        if (isNew) {
          currentList = [entreprise, ...currentList];
          anyChanged = true;
          toUpsert.push(entreprise);
        } else if (hasChanged) {
          currentList = currentList.map((item) =>
            item.id === entreprise.id ? entreprise : item,
          );
          anyChanged = true;
          toUpsert.push(entreprise);
        }

        // Si l'opportunité n'a pas encore son companyId renseigné, on le lui associe
        if (opp.companyId !== entreprise.id) {
          patchedCands.push({
            ...opp,
            companyId: entreprise.id,
          });
        }
      }

      // 2. Synchronisation à partir des contacts (LinkedIn ou manuels)
      for (const ct of contacts) {
        const compName = ct.entreprise?.trim();
        if (!compName) continue;

        const res = syncEntrepriseFromContact(ct, currentList);
        if (!res) continue;

        const { entreprise, isNew, hasChanged } = res;

        if (isNew) {
          currentList = [entreprise, ...currentList];
          anyChanged = true;
          toUpsert.push(entreprise);
        } else if (hasChanged) {
          currentList = currentList.map((item) =>
            item.id === entreprise.id ? entreprise : item,
          );
          anyChanged = true;
          toUpsert.push(entreprise);
        }
      }

      if (anyChanged) {
        setEntreprises(currentList);
        saveEntreprisesLocal(currentList);
        if (isCloudUser && userId && toUpsert.length > 0) {
          void batchUpsertEntreprises(toUpsert, userId);
        }
      }

      return {
        updatedEntreprises: currentList,
        patchedCandidatures: patchedCands,
      };
    },
    [isCloudUser, userId],
  );

  /**
   * Gestion de la suppression d'une opportunité :
   * Applique la règle stricte :
   * - Supprime l'opportunité
   * - Recalcule les opportunités de l'entreprise
   * - Si restantes > 0 -> conserve l'entreprise
   * - Sinon vérifie données persistantes (contacts, notes, coordonnées, etc.)
   * - Si persistantes -> conserve
   * - Sinon nettoie l'entreprise vide
   */
  const handleOpportunityDeleted = useCallback(
    async (
      deletedOpp: Candidature,
      remainingOpportunities: Candidature[],
      contacts: Contact[] = [],
    ) => {
      const targetCompany = findMatchingEntreprise(
        {
          companyId: deletedOpp.companyId,
          nom:
            deletedOpp.companyName ||
            deletedOpp.company ||
            deletedOpp.entreprise,
        },
        entreprises,
      );

      if (!targetCompany) return;

      const shouldKeep = shouldKeepEntrepriseAfterOpportunityDeleted(
        targetCompany,
        remainingOpportunities,
        contacts,
      );

      if (!shouldKeep) {
        await removeEntreprise(targetCompany.id);
      }
    },
    [entreprises, removeEntreprise],
  );

  return {
    entreprises,
    loading: loading || authLoading,
    saveEntreprise,
    removeEntreprise,
    getOpportunitiesForEntreprise,
    getContactsForEntreprise,
    syncWithOpportunites,
    handleOpportunityDeleted,
  };
}
