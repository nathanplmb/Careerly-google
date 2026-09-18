import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { classifyContactsBatchServerFn } from "@/ai/contact-import/contactImport.server-fn";
import { useContacts } from "@/hooks/useContacts";
import {
  getContactFullName,
  computeContactRelevance,
  type Contact,
} from "@/lib/contacts";

type ContactImportContextType = {
  isImporting: boolean;
  current: number;
  total: number;
  percentage: number;
  statusLabel: string;
  startBackgroundImport: (
    itemsToImport: Partial<Contact>[],
    resolutions?: Record<string, "merge" | "both" | "skip">,
    userSchool?: string,
    userTargetSector?: string,
  ) => Promise<void>;
  cancelImport: () => void;
};

const ContactImportContext = createContext<
  ContactImportContextType | undefined
>(undefined);

export function ContactImportProvider({ children }: { children: ReactNode }) {
  const { batchImportContacts, saveContact } = useContacts();

  const [isImporting, setIsImporting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [statusLabel, setStatusLabel] = useState("");
  const [cancelRequested, setCancelRequested] = useState(false);

  const cancelImport = useCallback(() => {
    setCancelRequested(true);
    setIsImporting(false);
    toast.info("Import en arrière-plan annulé.");
  }, []);

  const startBackgroundImport = useCallback(
    async (
      itemsToImport: Partial<Contact>[],
      resolutions?: Record<string, "merge" | "both" | "skip">,
      userSchool?: string,
      userTargetSector?: string,
    ) => {
      if (itemsToImport.length === 0) return;

      setIsImporting(true);
      setCancelRequested(false);
      setTotal(itemsToImport.length);
      setCurrent(0);
      setStatusLabel("Enregistrement initial des contacts...");

      // 1. Sauvegarde/Fusion initiale immédiate
      try {
        const importRes = await batchImportContacts(itemsToImport, resolutions);
        toast.success(
          `${importRes.imported} contact(s) ajouté(s), ${importRes.updated} fusionné(s). Lancement de la classification IA en arrière-plan...`,
        );
      } catch (err) {
        console.error("Erreur import initial:", err);
      }

      // 2. Traitement IA par lot en arrière-plan
      const BATCH_SIZE = 10;
      let processed = 0;

      for (let i = 0; i < itemsToImport.length; i += BATCH_SIZE) {
        if (cancelRequested) break;

        const chunk = itemsToImport.slice(i, i + BATCH_SIZE);
        const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(itemsToImport.length / BATCH_SIZE);

        setStatusLabel(
          `Classification IA (Lot ${batchNumber}/${totalBatches})...`,
        );

        try {
          const res = await classifyContactsBatchServerFn({
            data: {
              contacts: chunk.map((c) => ({
                id: c.id || "",
                fullName: getContactFullName(c) || c.nom || "",
                jobTitle: c.poste || "",
                company: c.entreprise || "",
              })),
              userSchool: userSchool || "",
              userTargetSector: userTargetSector || "",
            },
          });

          const classifications =
            res?.classifications ||
            (
              res as unknown as {
                classified?: typeof res.classifications;
              }
            )?.classified ||
            [];

          if (classifications.length > 0) {
            const mapById = new Map(
              classifications.map((item) => [item.id, item]),
            );

            for (const item of chunk) {
              if (!item.id) continue;
              const classification = mapById.get(item.id);
              if (classification) {
                const updatedRole =
                  classification.normalizedFunction ||
                  classification.normalizedRole ||
                  item.poste ||
                  "";
                const updatedCompany =
                  classification.normalizedCompany || item.entreprise || "";
                const updatedLevel =
                  classification.normalizedLevel ||
                  classification.hierarchicalLevel ||
                  "";

                const candidateContact: Contact = {
                  ...(item as Contact),
                  nom: getContactFullName(item) || item.nom || "Contact",
                  poste: updatedRole,
                  entreprise: updatedCompany,
                  category: classification.category,
                  normalizedFunction: updatedRole,
                  normalizedLevel: updatedLevel,
                  pastCompanies:
                    classification.pastCompanies || item.pastCompanies || [],
                  education: classification.education || item.education || [],
                  companySector:
                    classification.companySector || item.companySector || "",
                  tags: Array.from(
                    new Set(
                      [
                        ...(item.tags || []),
                        classification.category,
                        updatedLevel,
                        "LinkedIn IA",
                      ].filter(Boolean),
                    ),
                  ),
                };

                // Calcul du score de pertinence et des points de connexion
                const scoring = computeContactRelevance(candidateContact, [], {
                  school: userSchool,
                  targetSectors: userTargetSector
                    ? [userTargetSector]
                    : undefined,
                });

                candidateContact.relevanceScore = scoring.score;
                candidateContact.connectionPoints = scoring.connectionPoints;

                await saveContact(candidateContact);
              }
            }
          }
        } catch (err) {
          console.warn("Échec traitement lot IA:", err);
        }

        processed = Math.min(i + BATCH_SIZE, itemsToImport.length);
        setCurrent(processed);
      }

      setIsImporting(false);
      setStatusLabel("");
      toast.success(
        `Classification IA terminée ! ${itemsToImport.length} contact(s) qualifié(s).`,
      );
    },
    [batchImportContacts, saveContact, cancelRequested],
  );

  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <ContactImportContext.Provider
      value={{
        isImporting,
        current,
        total,
        percentage,
        statusLabel,
        startBackgroundImport,
        cancelImport,
      }}
    >
      {children}
    </ContactImportContext.Provider>
  );
}

export function useContactImport() {
  const ctx = useContext(ContactImportContext);
  if (!ctx) {
    throw new Error(
      "useContactImport must be used within a ContactImportProvider",
    );
  }
  return ctx;
}
