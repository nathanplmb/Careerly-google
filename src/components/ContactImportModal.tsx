import { useState, useRef, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  FileText,
  Smartphone,
  Linkedin,
  AlertCircle,
  CheckCircle2,
  Users,
  Search,
  Check,
  RefreshCw,
  Sparkles,
  Info,
} from "lucide-react";
import {
  parseVCardString,
  parseLinkedInCsv,
  findMatchingContact,
  getContactFullName,
  getContactCompany,
  getContactJobTitle,
  type Contact,
  type DuplicateMatchReason,
} from "@/lib/contacts";
import { toast } from "sonner";

interface ContactImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingContacts: Contact[];
  onImportComplete: (
    contactsToImport: Partial<Contact>[],
    resolutions: Record<string, "merge" | "both" | "skip">,
  ) => Promise<{ total: number; imported: number; updated: number }>;
}

type ParsedItem = {
  id: string;
  contact: Partial<Contact>;
  match: { contact: Contact; reason: DuplicateMatchReason } | null;
  selected: boolean;
  resolution: "merge" | "both" | "skip";
};

export function ContactImportModal({
  open,
  onOpenChange,
  existingContacts,
  onImportComplete,
}: ContactImportModalProps) {
  const [activeTab, setActiveTab] = useState<"vcf" | "linkedin">("vcf");
  const [step, setStep] = useState<"upload" | "preview">("upload");
  const [fileName, setFileName] = useState("");
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetState = () => {
    setStep("upload");
    setFileName("");
    setParsedItems([]);
    setSearchQuery("");
    setIsProcessing(false);
    setDragOver(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetState();
    }
    onOpenChange(isOpen);
  };

  const processFileContent = (
    content: string,
    name: string,
    isVcf: boolean,
  ) => {
    try {
      setIsProcessing(true);
      const rawList = isVcf
        ? parseVCardString(content)
        : parseLinkedInCsv(content);

      if (rawList.length === 0) {
        toast.error(
          "Aucun contact valide n'a pu être extrait de ce fichier. Vérifiez le format.",
        );
        setIsProcessing(false);
        return;
      }

      const items: ParsedItem[] = rawList.map((c, index) => {
        const match = findMatchingContact(c, existingContacts);
        return {
          id: `item_${index}_${crypto.randomUUID()}`,
          contact: c,
          match,
          selected: true,
          resolution: match ? "merge" : "both",
        };
      });

      setFileName(name);
      setParsedItems(items);
      setStep("preview");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'analyse du fichier.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVcf =
      activeTab === "vcf" ||
      file.name.toLowerCase().endsWith(".vcf") ||
      file.name.toLowerCase().endsWith(".vcard");

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processFileContent(text, file.name, isVcf);
    };
    reader.onerror = () => {
      toast.error("Impossible de lire ce fichier.");
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const isVcf =
      activeTab === "vcf" ||
      file.name.toLowerCase().endsWith(".vcf") ||
      file.name.toLowerCase().endsWith(".vcard");

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processFileContent(text, file.name, isVcf);
    };
    reader.readAsText(file);
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return parsedItems;
    const q = searchQuery.toLowerCase();
    return parsedItems.filter((it) => {
      const name = getContactFullName(it.contact).toLowerCase();
      const comp = getContactCompany(it.contact).toLowerCase();
      const email = (it.contact.email || "").toLowerCase();
      const phone = (it.contact.telephone || "").toLowerCase();
      return (
        name.includes(q) ||
        comp.includes(q) ||
        email.includes(q) ||
        phone.includes(q)
      );
    });
  }, [parsedItems, searchQuery]);

  const stats = useMemo(() => {
    const total = parsedItems.length;
    const selected = parsedItems.filter(
      (i) => i.selected && i.resolution !== "skip",
    ).length;
    const duplicates = parsedItems.filter((i) => Boolean(i.match)).length;
    const news = total - duplicates;
    return { total, selected, duplicates, news };
  }, [parsedItems]);

  const toggleSelectAll = () => {
    const areAllSelected = filteredItems.every((i) => i.selected);
    const newSelected = !areAllSelected;
    setParsedItems((prev) =>
      prev.map((item) =>
        filteredItems.some((fi) => fi.id === item.id)
          ? { ...item, selected: newSelected }
          : item,
      ),
    );
  };

  const setItemResolution = (
    id: string,
    resolution: "merge" | "both" | "skip",
  ) => {
    setParsedItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, resolution } : it)),
    );
  };

  const handleConfirmImport = async () => {
    const activeSelected = parsedItems.filter(
      (item) => item.selected && item.resolution !== "skip",
    );
    if (activeSelected.length === 0) {
      toast.warning("Aucun contact sélectionné pour l'import.");
      return;
    }

    setIsProcessing(true);
    try {
      const contactsToImport = activeSelected.map((item) => item.contact);
      const resolutions: Record<string, "merge" | "both" | "skip"> = {};
      for (const item of parsedItems) {
        if (!item.selected || item.resolution === "skip") {
          resolutions[item.contact.id || ""] = "skip";
        } else {
          resolutions[item.contact.id || ""] = item.resolution;
        }
      }

      const res = await onImportComplete(contactsToImport, resolutions);
      toast.success(
        `${res.imported} nouveau(x) contact(s) importé(s), ${res.updated} enrichi(s) sans perte !`,
      );
      handleClose(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la validation de l'import.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background border-border/80 shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Users className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                  Importer des contacts
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Importez vos contacts depuis votre téléphone (vCard) ou votre
                  réseau LinkedIn (CSV).
                </DialogDescription>
              </div>
            </div>
            {step === "preview" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep("upload")}
                className="text-xs gap-1.5"
              >
                <RefreshCw className="size-3.5" /> Changer de fichier
              </Button>
            )}
          </div>
        </DialogHeader>

        {step === "upload" ? (
          <div className="p-6 space-y-6 overflow-y-auto">
            {/* Onglets de source */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-muted/60 border border-border/60">
              <button
                type="button"
                onClick={() => setActiveTab("vcf")}
                className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg font-medium text-xs transition-all ${
                  activeTab === "vcf"
                    ? "bg-background text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="size-4 text-emerald-500" />
                Carnet Téléphone (.vcf)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("linkedin")}
                className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg font-medium text-xs transition-all ${
                  activeTab === "linkedin"
                    ? "bg-background text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Linkedin className="size-4 text-[#0A66C2]" />
                Export LinkedIn (.csv)
              </button>
            </div>

            {/* Zone de Drag & Drop */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                dragOver
                  ? "border-primary bg-primary/5 scale-[0.99]"
                  : "border-border/80 hover:border-primary/60 bg-card/40 hover:bg-card/70"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={activeTab === "vcf" ? ".vcf,.vcard" : ".csv"}
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="grid size-14 place-items-center rounded-2xl bg-muted/80 text-foreground mb-4 shadow-sm">
                <Upload className="size-7 text-primary" />
              </div>
              <p className="font-semibold text-sm text-foreground text-center">
                Cliquez pour choisir un fichier ou glissez-le ici
              </p>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {activeTab === "vcf"
                  ? "Fichiers .vcf ou .vcard (export iPhone, Android, Google Contacts)"
                  : "Fichier .csv (export officiel des relations LinkedIn)"}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground">
                <Sparkles className="size-3 text-amber-500" />
                Détection automatique des doublons & enrichissement sans perte
              </div>
            </div>

            {/* Consignes pédagogiques */}
            {activeTab === "vcf" ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-emerald-900 dark:text-emerald-300">
                <div className="flex items-start gap-2.5">
                  <Smartphone className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      Comment exporter vos contacts téléphone ?
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-emerald-800/90 dark:text-emerald-400/90 text-[11px]">
                      <li>
                        <strong>iPhone (iOS) :</strong> Ouvrez l'app Contacts
                        &gt; Listes &gt; Maintenez "Tous les contacts" &gt;
                        Exporter (.vcf).
                      </li>
                      <li>
                        <strong>Android / Google :</strong> Allez sur
                        contacts.google.com &gt; Exporter &gt; Format vCard
                        (pour contacts iOS / vCard).
                      </li>
                      <li>
                        <strong>Mac / Outlook :</strong> Fichier &gt; Exporter
                        vCard.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-sky-900 dark:text-sky-300">
                <div className="flex items-start gap-2.5">
                  <Linkedin className="size-4 shrink-0 mt-0.5 text-[#0A66C2]" />
                  <div className="space-y-1">
                    <p className="font-semibold">
                      Comment exporter vos relations LinkedIn ?
                    </p>
                    <ol className="list-decimal list-inside space-y-0.5 text-sky-800/90 dark:text-sky-400/90 text-[11px]">
                      <li>
                        Sur LinkedIn, cliquez sur votre photo de profil (Vous)
                        &gt; <strong>Préférences et confidentialité</strong>.
                      </li>
                      <li>
                        Menu de gauche :{" "}
                        <strong>Confidentialité des données</strong> &gt;{" "}
                        <strong>Obtenir une copie de vos données</strong>.
                      </li>
                      <li>
                        Cochez uniquement <strong>"Relations"</strong> puis
                        cliquez sur "Demander les archives".
                      </li>
                      <li>
                        Téléchargez le fichier .zip reçu par email,
                        décompressez-le et glissez le fichier{" "}
                        <code>Connections.csv</code> ci-dessus.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Étape Aperçu & Validation */
          <div className="flex-1 flex flex-col min-h-0">
            {/* Barre de métriques et recherche */}
            <div className="px-6 py-3.5 bg-muted/30 border-b border-border/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-foreground">
                  Fichier : {fileName}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="inline-flex items-center gap-1 text-primary font-medium">
                  <Users className="size-3.5" /> {stats.selected} /{" "}
                  {stats.total} sélectionnés
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="size-3.5" /> {stats.news} nouveaux
                </span>
                {stats.duplicates > 0 && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                      <AlertCircle className="size-3.5" /> {stats.duplicates}{" "}
                      doublons détectés
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="Filtrer les contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-8 text-xs bg-background"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSelectAll}
                  className="h-8 text-xs shrink-0"
                >
                  Tout cocher / décocher
                </Button>
              </div>
            </div>

            {/* Liste scrollable des contacts détectés */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/60 px-6">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  Aucun contact ne correspond à votre recherche.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const fullName = getContactFullName(item.contact);
                  const company = getContactCompany(item.contact);
                  const job = getContactJobTitle(item.contact);
                  const isDup = Boolean(item.match);

                  return (
                    <div
                      key={item.id}
                      className={`py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        !item.selected || item.resolution === "skip"
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={item.selected && item.resolution !== "skip"}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setParsedItems((prev) =>
                              prev.map((i) =>
                                i.id === item.id
                                  ? {
                                      ...i,
                                      selected: checked,
                                      resolution: checked
                                        ? isDup
                                          ? "merge"
                                          : "both"
                                        : "skip",
                                    }
                                  : i,
                              ),
                            );
                          }}
                          className="size-4 rounded border-border text-primary focus:ring-primary mt-1 sm:mt-0"
                        />

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-xs text-foreground truncate">
                              {fullName}
                            </p>
                            {company && (
                              <span className="rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-foreground">
                                {company}
                              </span>
                            )}
                            {job && (
                              <span className="text-[11px] text-muted-foreground truncate">
                                {job}
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                            {item.contact.email && (
                              <span>{item.contact.email}</span>
                            )}
                            {item.contact.telephone && (
                              <span>{item.contact.telephone}</span>
                            )}
                            {item.contact.linkedin && (
                              <span className="text-primary truncate max-w-xs">
                                {item.contact.linkedin}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Résolution doublon si existant */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {isDup && (
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                              <AlertCircle className="size-3" /> Doublon (
                              {item.match?.reason})
                            </span>

                            <select
                              value={item.resolution}
                              onChange={(e) =>
                                setItemResolution(
                                  item.id,
                                  e.target.value as "merge" | "both" | "skip",
                                )
                              }
                              className="h-7 rounded-lg border border-border/80 bg-background px-2 text-[11px] text-foreground focus:ring-1 focus:ring-primary"
                            >
                              <option value="merge">
                                Fusionner sans perte
                              </option>
                              <option value="both">Créer en double</option>
                              <option value="skip">Ignorer</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pied de page avec bouton d'action */}
            <div className="p-4 bg-muted/40 border-t border-border/60 flex items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Info className="size-3.5 text-primary" />
                Vos données existantes (notes, historiques) ne seront jamais
                écrasées.
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClose(false)}
                  className="text-xs"
                >
                  Annuler
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirmImport}
                  disabled={isProcessing || stats.selected === 0}
                  className="text-xs font-semibold gap-1.5 bg-primary text-primary-foreground"
                >
                  <Check className="size-3.5" />
                  Importer {stats.selected} contact(s)
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
