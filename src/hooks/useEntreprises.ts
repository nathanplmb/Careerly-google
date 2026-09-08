import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "@/hooks/useSession";
import {
  deleteEntrepriseCloud,
  fetchEntreprises,
  upsertEntreprise,
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
  type Entreprise,
} from "@/lib/entreprises";
import type { Candidature } from "@/lib/candidatures";
import type { Contact } from "@/lib/contacts";

export function useEntreprises() {
  const { user, loading: authLoading } = useSession();
  const userId = user?.id;
  const isCloudUser = Boolean(userId);

  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial (Cloud ou Local)
  useEffect(() => {
    if (authLoading) return;
    let cancelled = false;

    if (!isCloudUser || !userId) {
      setEntreprises(loadEntreprisesLocal());
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const cloud = await fetchEntreprises(userId);
        if (!cancelled) {
          if (cloud.length > 0) {
            setEntreprises(cloud);
            saveEntreprisesLocal(cloud);
          } else {
            // Repli local ou migration initiale
            const local = loadEntreprisesLocal();
            setEntreprises(local);
          }
        }
      } catch (err) {
        console.warn("Échec récupération entreprises cloud, repli local:", err);
        if (!cancelled) {
          setEntreprises(loadEntreprisesLocal());
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
        if (ct.entreprise) {
          return (
            normalizeCompanyName(ct.entreprise) === e.normalizedName ||
            ct.entreprise.trim().toLowerCase() === e.nom.trim().toLowerCase()
          );
        }
        return false;
      });
    },
    [],
  );

  /**
   * Synchronisation automatique intelligente :
   * - Pour chaque opportunité, s'assure qu'une entreprise existe et est enrichie.
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
      let currentList = [...entreprises];
      const patchedCands: Candidature[] = [];

      for (const opp of candidatures) {
        const oppNom = opp.companyName || opp.company || opp.entreprise || "";
        if (!oppNom.trim()) continue;

        const { entreprise, isNew } = syncEntrepriseFromOpportunity(
          opp,
          currentList,
        );

        if (isNew) {
          currentList = [entreprise, ...currentList];
          if (isCloudUser && userId) {
            void upsertEntreprise(entreprise, userId);
          }
        } else {
          currentList = currentList.map((item) =>
            item.id === entreprise.id ? entreprise : item,
          );
          if (isCloudUser && userId) {
            void upsertEntreprise(entreprise, userId);
          }
        }

        // Si l'opportunité n'a pas encore son companyId renseigné, on le lui associe
        if (opp.companyId !== entreprise.id) {
          patchedCands.push({
            ...opp,
            companyId: entreprise.id,
          });
        }
      }

      setEntreprises(currentList);
      saveEntreprisesLocal(currentList);

      return {
        updatedEntreprises: currentList,
        patchedCandidatures: patchedCands,
      };
    },
    [entreprises, isCloudUser, userId],
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
