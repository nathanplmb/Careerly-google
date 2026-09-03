import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CenterModal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  STATUTS,
  STATUTS_OPPORTUNITE,
  STATUTS_CANDIDATURE,
  emptyPreparation,
  normalizeCandidature,
  findPotentialDuplicate,
  loadCandidatures,
  type Candidature,
  type Statut,
} from "@/lib/candidatures";
import {
  Sparkles,
  Loader2,
  FileText,
  PenLine,
  AlertTriangle,
  Building2,
  Briefcase,
  MapPin,
  Clock,
  Euro,
  ExternalLink,
  GraduationCap,
  Calendar,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Globe,
  Users,
} from "lucide-react";
import { extraireOpportuniteServerFn } from "@/ai/opportunity/opportunity.server-fn";
import {
  TagListEditor,
  MetricsEditor,
  LanguagesEditor,
  ProcessStepsEditor,
} from "@/components/opportunity/OpportunityFieldEditors";
import { WorkflowTab } from "./workflow/WorkflowTab";
import { GitFork } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Candidature | null;
  onSave: (c: Candidature) => void;
  profil?: any;
  existingItems?: Candidature[];
  onOpenExisting?: (c: Candidature) => void;
};

export function CandidatureSheet({
  open,
  onOpenChange,
  value,
  onSave,
  existingItems,
  onOpenExisting,
}: Props) {
  const [form, setForm] = useState<Candidature | null>(null);
  const [mode, setMode] = useState<"menu" | "paste" | "form">("menu");
  const [pastedText, setPastedText] = useState("");
  const [optionalUrl, setOptionalUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [duplicateMatch, setDuplicateMatch] = useState<Candidature | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<
    "offre" | "profil" | "entreprise" | "workflow"
  >("offre");

  useEffect(() => {
    if (open && value) {
      const normalized = normalizeCandidature(value);
      setForm(normalized);
      setErrorMsg(null);
      setDuplicateMatch(null);
      setActiveTab("offre");

      // Si c'est une toute nouvelle opportunité vierge -> afficher le menu
      if (!value.entreprise && !value.poste) {
        setMode("menu");
        setPastedText("");
        setOptionalUrl("");
      } else {
        setMode("form");
        if (value.detail) setPastedText(value.detail);
        if (value.lien) setOptionalUrl(value.lien);
      }
      setAnalyzing(false);
    }
  }, [open, value]);

  if (!form) return null;

  const set = (partial: Partial<Candidature>) => {
    setForm((prev) =>
      prev ? normalizeCandidature({ ...prev, ...partial }) : prev,
    );
  };

  const setPrep = (partial: Partial<NonNullable<Candidature["preparation"]>>) =>
    setForm((prev) =>
      prev
        ? {
            ...prev,
            preparation: {
              ...(prev.preparation ?? emptyPreparation()),
              ...partial,
            },
          }
        : prev,
    );

  const handleAnalyze = async () => {
    if (!pastedText.trim() || pastedText.trim().length < 15) {
      setErrorMsg(
        "Veuillez coller le texte de l'offre (au moins 15 caractères).",
      );
      return;
    }
    setAnalyzing(true);
    setErrorMsg(null);

    try {
      const extracted = await extraireOpportuniteServerFn({
        data: {
          text: pastedText,
          url: optionalUrl.trim() || undefined,
        },
      });

      // Construction du formulaire enrichi
      const missionsList = Array.isArray(extracted.missions)
        ? extracted.missions
        : [];
      const missionsStr =
        missionsList.length > 0
          ? missionsList.map((m) => `• ${m}`).join("\n")
          : typeof extracted.missions === "string"
            ? extracted.missions
            : form.missions;

      const updated = normalizeCandidature({
        ...form,
        ...extracted,
        missions: missionsStr,
        missionsList:
          missionsList.length > 0 ? missionsList : form.missionsList,
        detail: pastedText,
        lien: optionalUrl.trim() || extracted.sourceUrl || form.lien,
        sourceUrl: optionalUrl.trim() || extracted.sourceUrl || form.sourceUrl,
        // Conserver le statut existant ou "Sauvegardée" si nouveau
        statut: form.statut || "Sauvegardée",
        status: form.status || form.statut || "Sauvegardée",
      });

      // Vérification des doublons
      const allItems = existingItems || loadCandidatures();
      const duplicate = findPotentialDuplicate(updated, allItems);
      if (duplicate) {
        setDuplicateMatch(duplicate);
      }

      setForm(updated);
      setMode("form");
    } catch (err: any) {
      console.error("Erreur lors de l'extraction de l'offre :", err);
      let message = err?.message || "Impossible d'extraire l'offre avec l'IA.";
      if (
        message.includes("503") ||
        message.includes("high demand") ||
        message.includes("UNAVAILABLE")
      ) {
        message =
          "Les serveurs de l'IA connaissent un pic de demande temporaire. Veuillez patienter quelques instants et réessayer.";
      } else if (
        message.includes("429") ||
        message.includes("RESOURCE_EXHAUSTED")
      ) {
        message =
          "Limite de requêtes atteinte temporairement. Veuillez réessayer dans quelques secondes.";
      }
      setErrorMsg(message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleOpenDuplicate = () => {
    if (duplicateMatch) {
      if (onOpenExisting) {
        onOpenExisting(duplicateMatch);
      } else {
        setForm(normalizeCandidature(duplicateMatch));
      }
      setDuplicateMatch(null);
    }
  };

  const handleIgnoreDuplicate = () => {
    setDuplicateMatch(null);
  };

  return (
    <CenterModal
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      className="max-w-4xl"
      title={
        <div className="flex items-center gap-2">
          {mode === "menu" ? (
            <span>Ajouter une opportunité</span>
          ) : mode === "paste" ? (
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <span>Extraire l'offre avec l'IA</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-primary" />
              <span className="truncate max-w-[400px]">
                {form.poste || "Nouvelle opportunité"}
              </span>
              {form.entreprise && (
                <span className="text-xs font-normal text-muted-foreground">
                  chez {form.entreprise}
                </span>
              )}
            </div>
          )}
        </div>
      }
      description={
        mode === "menu"
          ? "Choisissez comment renseigner les informations de l'offre."
          : mode === "paste"
            ? "Collez le texte brut copié depuis un site d'emploi ou une annonce."
            : "Vérifiez et ajustez les données extraites avant d'enregistrer."
      }
    >
      {/* MODE MENU INITIAL */}
      {mode === "menu" && (
        <div className="p-6 grid gap-3 max-w-lg mx-auto py-8">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-base mb-1">
              Comment souhaitez-vous ajouter cette opportunité ?
            </h3>
            <p className="text-xs text-muted-foreground">
              L'Opportunity Intelligence de NACORA extrait automatiquement
              l'entreprise, les missions, les compétences, métriques et
              modalités.
            </p>
          </div>

          <Button
            variant="outline"
            className="h-20 justify-start gap-4 p-4 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all text-left"
            onClick={() => setMode("paste")}
          >
            <div className="bg-primary/10 text-primary p-3 rounded-xl">
              <Sparkles className="size-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">
                  Coller le texte de l'offre (IA)
                </p>
                <Badge className="bg-primary/20 text-primary border-none text-[10px] py-0 px-1.5">
                  Recommandé
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Copiez-collez l'annonce entière depuis LinkedIn, JobTeaser,
                WTTJ, etc.
              </p>
            </div>
          </Button>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-card px-3 text-muted-foreground font-medium">
                Ou
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="h-14 justify-start gap-3 border border-border/60 hover:bg-muted/30"
            onClick={() => setMode("form")}
          >
            <div className="bg-muted text-muted-foreground p-2 rounded-lg">
              <PenLine className="size-4" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Saisie manuelle</p>
              <p className="text-[11px] text-muted-foreground">
                Remplir vous-même les champs un par un
              </p>
            </div>
          </Button>
        </div>
      )}

      {/* MODE PASTE TEXTE DE L'OFFRE */}
      {mode === "paste" && (
        <div className="p-6 flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-start gap-2.5">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="optionalUrl" className="text-xs font-semibold">
              Lien internet de l'offre (facultatif)
            </Label>
            <Input
              id="optionalUrl"
              placeholder="https://..."
              value={optionalUrl}
              onChange={(e) => setOptionalUrl(e.target.value)}
              disabled={analyzing}
              className="text-xs h-9 bg-background"
            />
          </div>

          <div className="space-y-1.5 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <Label htmlFor="rawOfferText" className="text-xs font-semibold">
                Texte brut de l'offre d'emploi / stage *
              </Label>
              <span className="text-[11px] text-muted-foreground">
                {pastedText.length} caractères
              </span>
            </div>
            <Textarea
              id="rawOfferText"
              placeholder="Collez ici l'intégralité de l'offre : intitulé, missions, profil recherché, à propos de l'entreprise, avantages, etc..."
              className="h-64 resize-none font-mono text-xs leading-relaxed bg-background/50 border-border/60"
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              disabled={analyzing}
            />
          </div>

          {analyzing && (
            <div className="py-4 px-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3 animate-pulse">
              <Loader2 className="size-5 animate-spin text-primary shrink-0" />
              <div className="text-xs space-y-0.5">
                <p className="font-semibold text-foreground">
                  Opportunity Intelligence en cours d'analyse...
                </p>
                <p className="text-muted-foreground">
                  Extraction des missions, compétences obligatoires/atouts,
                  métriques et processus.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMode("menu")}
              disabled={analyzing}
            >
              Retour
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode("form")}
                disabled={analyzing}
                className="text-xs text-muted-foreground"
              >
                Passer en saisie manuelle
              </Button>
              <Button
                size="sm"
                disabled={!pastedText.trim() || analyzing}
                onClick={handleAnalyze}
                className="gap-2 px-5"
              >
                {analyzing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                Extraire avec l'IA
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODE FORMULAIRE & VÉRIFICATION DES DONNÉES */}
      {mode === "form" && (
        <div className="flex flex-col h-[75vh] max-h-[820px] min-h-[500px]">
          {/* BANNIÈRE DOUBLON SI DÉTECTÉ */}
          {duplicateMatch && (
            <div className="m-4 mb-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="size-4 text-amber-500 shrink-0" />
                <div>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Cette opportunité semble déjà exister dans NACORA :
                  </span>{" "}
                  <span className="font-medium text-foreground">
                    {duplicateMatch.entreprise} — {duplicateMatch.poste}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-amber-500/40 text-amber-700 dark:text-amber-300"
                  onClick={handleOpenDuplicate}
                >
                  Ouvrir l'existante
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={handleIgnoreDuplicate}
                >
                  Conserver celle-ci
                </Button>
              </div>
            </div>
          )}

          {/* CARTE RÉCAPITULATIVE DE L'OFFRE EN HAUT */}
          <div className="px-5 py-3 border-b border-border/50 bg-muted/15 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-foreground">
                  {form.poste || "Poste sans titre"}
                </h4>
                {form.entreprise && (
                  <Badge variant="secondary" className="font-semibold text-xs">
                    {form.entreprise}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {form.contractType && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="size-3" /> {form.contractType}
                  </span>
                )}
                {form.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {form.duration}
                  </span>
                )}
                {form.lieu && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" /> {form.lieu}
                  </span>
                )}
                {form.remotePolicy && (
                  <Badge variant="outline" className="text-[10px] py-0">
                    {form.remotePolicy}
                  </Badge>
                )}
                {form.salary ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <Euro className="size-3" /> {form.salary}
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground/60 italic">
                    Salaire non renseigné
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5"
                onClick={() => setMode("paste")}
              >
                <RotateCcw className="size-3" /> Ré-extraire
              </Button>
            </div>
          </div>

          {/* ONGLETS DE NAVIGATION */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="border-b px-5 bg-card">
              <TabsList className="w-full justify-start h-10 p-0 bg-transparent gap-4">
                <TabsTrigger
                  value="offre"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold"
                >
                  Offre & Missions
                </TabsTrigger>
                <TabsTrigger
                  value="profil"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold"
                >
                  Profil & Recrutement
                </TabsTrigger>
                <TabsTrigger
                  value="entreprise"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold"
                >
                  Entreprise ({form.companyMetrics?.length || 0} métriques)
                </TabsTrigger>
                <TabsTrigger
                  value="workflow"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                >
                  <GitFork className="size-3.5 text-primary" />
                  <span>Workflow</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* TAB 1: OFFRE & MISSIONS */}
              <TabsContent
                value="offre"
                className="mt-0 space-y-5 data-[state=inactive]:hidden"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5 sm:col-span-2">
                    <Label
                      htmlFor="titleInput"
                      className="text-xs font-semibold"
                    >
                      Intitulé exact du poste *
                    </Label>
                    <Input
                      id="titleInput"
                      value={form.poste}
                      onChange={(e) =>
                        set({ poste: e.target.value, title: e.target.value })
                      }
                      placeholder="ex: Stage – Marketing & Engagement Utilisateurs (Application Mobile)"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="companyInput"
                      className="text-xs font-semibold"
                    >
                      Entreprise *
                    </Label>
                    <Input
                      id="companyInput"
                      value={form.entreprise}
                      onChange={(e) =>
                        set({
                          entreprise: e.target.value,
                          company: e.target.value,
                          companyName: e.target.value,
                        })
                      }
                      placeholder="ex: EXO"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="contractTypeInput"
                      className="text-xs font-semibold"
                    >
                      Type de contrat
                    </Label>
                    <Input
                      id="contractTypeInput"
                      value={form.contractType || ""}
                      onChange={(e) => set({ contractType: e.target.value })}
                      placeholder="ex: Stage, CDI, Alternance (Non renseigné si vide)"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="durationInput"
                      className="text-xs font-semibold"
                    >
                      Durée
                    </Label>
                    <Input
                      id="durationInput"
                      value={form.duration || ""}
                      onChange={(e) => set({ duration: e.target.value })}
                      placeholder="ex: 3 à 6 mois, 6 mois"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="locationInput"
                      className="text-xs font-semibold"
                    >
                      Lieu / Localisation
                    </Label>
                    <Input
                      id="locationInput"
                      value={form.lieu}
                      onChange={(e) =>
                        set({ lieu: e.target.value, location: e.target.value })
                      }
                      placeholder="ex: Paris, France"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="startDateInput"
                      className="text-xs font-semibold"
                    >
                      Date de début
                    </Label>
                    <Input
                      id="startDateInput"
                      value={form.startDate || ""}
                      onChange={(e) => set({ startDate: e.target.value })}
                      placeholder="ex: Dès que possible, Septembre 2026"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="applicationDeadlineInput"
                      className="text-xs font-semibold"
                    >
                      Date limite de candidature
                    </Label>
                    <Input
                      id="applicationDeadlineInput"
                      type="date"
                      value={form.dateLimite || form.applicationDeadline || ""}
                      onChange={(e) =>
                        set({
                          dateLimite: e.target.value,
                          applicationDeadline: e.target.value,
                        })
                      }
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="remotePolicyInput"
                      className="text-xs font-semibold"
                    >
                      Télétravail (Politique & Détails)
                    </Label>
                    <Input
                      id="remotePolicyInput"
                      value={
                        form.remoteDetails
                          ? `${form.remotePolicy || "Partiel"} — ${form.remoteDetails}`
                          : form.remotePolicy || ""
                      }
                      onChange={(e) => set({ remotePolicy: e.target.value })}
                      placeholder="ex: Partiel — 1 jour de télétravail par semaine"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="salaryInput"
                      className="text-xs font-semibold"
                    >
                      Rémunération / Salaire
                    </Label>
                    <Input
                      id="salaryInput"
                      value={form.salary || ""}
                      onChange={(e) => set({ salary: e.target.value })}
                      placeholder="ex: Selon profil, 1200€ / mois (Non renseigné)"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5 sm:col-span-2">
                    <Label
                      htmlFor="sourceUrlInput"
                      className="text-xs font-semibold"
                    >
                      Lien source de l'offre
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="sourceUrlInput"
                        value={form.lien || form.sourceUrl || ""}
                        onChange={(e) =>
                          set({
                            lien: e.target.value,
                            sourceUrl: e.target.value,
                          })
                        }
                        placeholder="https://..."
                        className="bg-background text-xs flex-1"
                      />
                      {(form.lien || form.sourceUrl) && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-9 px-3 shrink-0"
                        >
                          <a
                            href={form.lien || form.sourceUrl || "#"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink className="size-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* MISSIONS SECTION */}
                <div className="space-y-3 pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="missionsTextarea"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Missions clés & Responsabilités (
                      {form.missionsList?.length || 0})
                    </Label>
                  </div>

                  {form.missionsList && form.missionsList.length > 0 ? (
                    <div className="space-y-2">
                      {form.missionsList.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-border/50 bg-card/60 text-xs leading-relaxed"
                        >
                          <CheckCircle2 className="size-3.5 text-primary mt-0.5 shrink-0" />
                          <span className="flex-1">{m}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="space-y-1.5">
                    <span className="text-[11px] text-muted-foreground">
                      Modifier la liste des missions (une par ligne) :
                    </span>
                    <Textarea
                      id="missionsTextarea"
                      rows={4}
                      value={
                        typeof form.missions === "string"
                          ? form.missions
                          : Array.isArray(form.missions)
                            ? (form.missions as string[]).join("\n")
                            : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value || "";
                        const list = val
                          .split("\n")
                          .map((line) => line.replace(/^[•\-*]\s*/, "").trim())
                          .filter(Boolean);
                        set({ missions: val, missionsList: list });
                      }}
                      placeholder="• Mission 1&#10;• Mission 2"
                      className="bg-background text-xs font-mono"
                    />
                  </div>
                </div>

                {/* AVANTAGES SECTION */}
                <div className="pt-4 border-t border-border/40">
                  <TagListEditor
                    label="Avantages & Environnement"
                    items={form.benefits || []}
                    onChange={(items) => set({ benefits: items })}
                    placeholder="Ajouter un avantage (ex: 1j télétravail, Teambuilding, etc.)..."
                    badgeClassName="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                    emptyText="Aucun avantage spécifié dans l'offre."
                  />
                </div>
              </TabsContent>

              {/* TAB 2: PROFIL RECHERCHÉ & RECRUTEMENT */}
              <TabsContent
                value="profil"
                className="mt-0 space-y-6 data-[state=inactive]:hidden"
              >
                <TagListEditor
                  label="Compétences indispensables / requises"
                  items={form.requiredSkills || []}
                  onChange={(items) => set({ requiredSkills: items })}
                  placeholder="ex: Analyse de données, Gestion de projet..."
                  badgeClassName="bg-primary/10 text-primary border-primary/30"
                  emptyText="Aucune compétence obligatoire distincte identifiée."
                />

                <TagListEditor
                  label="Compétences appréciées (Atouts)"
                  items={form.preferredSkills || []}
                  onChange={(items) => set({ preferredSkills: items })}
                  placeholder="ex: Connaissance de l'écosystème mobile..."
                  badgeClassName="bg-lilac/10 text-lilac border-lilac/30"
                  emptyText="Aucune compétence secondaire identifiée."
                />

                <TagListEditor
                  label="Outils, Logiciels & Plateformes"
                  items={form.tools || []}
                  onChange={(items) => set({ tools: items })}
                  placeholder="ex: TikTok, Instagram, Notion, Excel, Figma..."
                  badgeClassName="bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30"
                  emptyText="Aucun outil spécifique identifié."
                />

                <TagListEditor
                  label="Qualités humaines & Soft skills"
                  items={form.qualities || []}
                  onChange={(items) => set({ qualities: items })}
                  placeholder="ex: Créativité, Rigueur, Curiosité, Esprit d'équipe..."
                  badgeClassName="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                  emptyText="Aucune qualité spécifique listée."
                />

                <LanguagesEditor
                  requiredLanguages={form.requiredLanguages || []}
                  preferredLanguages={form.preferredLanguages || []}
                  onChangeRequired={(req) => set({ requiredLanguages: req })}
                  onChangePreferred={(pref) =>
                    set({ preferredLanguages: pref })
                  }
                />

                <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-border/40">
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="eduReqInput"
                      className="text-xs font-semibold"
                    >
                      Formation & Diplômes acceptés
                    </Label>
                    <Input
                      id="eduReqInput"
                      value={
                        form.educationRequirements?.join(" ; ") ||
                        form.educationLevel ||
                        ""
                      }
                      onChange={(e) =>
                        set({
                          educationLevel: e.target.value,
                          educationRequirements: e.target.value
                            .split(";")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="ex: Master, MSc ou PGE ; Bac+3, Bachelor"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="expReqInput"
                      className="text-xs font-semibold"
                    >
                      Expérience requise
                    </Label>
                    <Input
                      id="expReqInput"
                      value={form.experienceRequirements || ""}
                      onChange={(e) =>
                        set({ experienceRequirements: e.target.value })
                      }
                      placeholder="ex: Débutant accepté, 1 an minimum..."
                      className="bg-background text-xs"
                    />
                  </div>
                </div>

                {/* PROCESSUS DE RECRUTEMENT */}
                <div className="pt-4 border-t border-border/40 space-y-4">
                  <ProcessStepsEditor
                    steps={form.recruitmentProcess || []}
                    onChange={(steps) => set({ recruitmentProcess: steps })}
                  />

                  <TagListEditor
                    label="Documents demandés & Éléments différenciants"
                    items={form.applicationRequirements || []}
                    onChange={(items) =>
                      set({ applicationRequirements: items })
                    }
                    placeholder="ex: Message court, CV, TikTok/jeu facultatif..."
                    badgeClassName="bg-card text-foreground border-border"
                    emptyText="Non renseigné."
                  />
                </div>
              </TabsContent>

              {/* TAB 3: ENTREPRISE & MÉTRIQUES */}
              <TabsContent
                value="entreprise"
                className="mt-0 space-y-6 data-[state=inactive]:hidden"
              >
                <div className="space-y-1.5">
                  <Label
                    htmlFor="companyDescInput"
                    className="text-xs font-semibold"
                  >
                    Description de l'entreprise
                  </Label>
                  <Textarea
                    id="companyDescInput"
                    rows={3}
                    value={form.companyDescription || ""}
                    onChange={(e) =>
                      set({ companyDescription: e.target.value })
                    }
                    placeholder="Présentation des activités, de la mission et de la vision..."
                    className="bg-background text-xs leading-relaxed"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="compSectorInput"
                      className="text-xs font-semibold"
                    >
                      Secteur d'activité
                    </Label>
                    <Input
                      id="compSectorInput"
                      value={form.secteur || form.companySector || ""}
                      onChange={(e) =>
                        set({
                          secteur: e.target.value,
                          companySector: e.target.value,
                        })
                      }
                      placeholder="ex: Loisirs / Culture / Sports, Tech..."
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="compSizeInput"
                      className="text-xs font-semibold"
                    >
                      Taille de l'entreprise
                    </Label>
                    <Input
                      id="compSizeInput"
                      value={form.companySize || ""}
                      onChange={(e) => set({ companySize: e.target.value })}
                      placeholder="ex: 20 employés, Start-up..."
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="compLocInput"
                      className="text-xs font-semibold"
                    >
                      Siège / Bureaux
                    </Label>
                    <Input
                      id="compLocInput"
                      value={form.companyLocation || ""}
                      onChange={(e) => set({ companyLocation: e.target.value })}
                      placeholder="ex: Paris 2e, France"
                      className="bg-background text-xs"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label
                      htmlFor="compWebInput"
                      className="text-xs font-semibold"
                    >
                      Site web officiel
                    </Label>
                    <Input
                      id="compWebInput"
                      value={form.companyWebsite || ""}
                      onChange={(e) => set({ companyWebsite: e.target.value })}
                      placeholder="https://... (Non renseigné si absent)"
                      className="bg-background text-xs"
                    />
                  </div>
                </div>

                <MetricsEditor
                  metrics={form.companyMetrics || []}
                  onChange={(metrics) => set({ companyMetrics: metrics })}
                />

                <TagListEditor
                  label="Contexte de croissance & Faits marquants"
                  items={form.companyContext || []}
                  onChange={(items) => set({ companyContext: items })}
                  placeholder="ex: Levée de fonds de 1 M€, 1 000 000 € de cadeaux distribués..."
                  badgeClassName="bg-primary/10 text-primary border-primary/20"
                  emptyText="Aucun fait de contexte spécifique détecté."
                />

                <TagListEditor
                  label="Partenaires & Clients cités"
                  items={form.companyPartners || []}
                  onChange={(items) => set({ companyPartners: items })}
                  placeholder="ex: Nike, Garmin, Feed, Gymshark..."
                  badgeClassName="bg-card text-foreground border-border"
                  emptyText="Aucun partenaire cité dans l'offre."
                />
              </TabsContent>

              {/* TAB 4: WORKFLOW DE CANDIDATURE */}
              <TabsContent
                value="workflow"
                className="mt-0 space-y-6 data-[state=inactive]:hidden"
              >
                <WorkflowTab
                  candidature={form}
                  onChange={(patch) => set(patch)}
                />

                {/* PRÉPARATION DE CANDIDATURE (ARGUMENTS) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Préparation de candidature (Arguments)
                    </h4>
                    <span className="text-[11px] text-muted-foreground">
                      Pour préparer vos entretiens et lettres
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label
                        htmlFor="prepEnt"
                        className="text-xs font-semibold"
                      >
                        Pourquoi cette entreprise ?
                      </Label>
                      <Textarea
                        id="prepEnt"
                        rows={3}
                        value={form.preparation?.pourquoiEntreprise || ""}
                        onChange={(e) =>
                          setPrep({ pourquoiEntreprise: e.target.value })
                        }
                        placeholder="Alignement avec vos valeurs, secteur, produits que vous utilisez..."
                        className="text-xs bg-background resize-y"
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <Label
                        htmlFor="prepPoste"
                        className="text-xs font-semibold"
                      >
                        Pourquoi ce poste ?
                      </Label>
                      <Textarea
                        id="prepPoste"
                        rows={3}
                        value={form.preparation?.pourquoiPoste || ""}
                        onChange={(e) =>
                          setPrep({ pourquoiPoste: e.target.value })
                        }
                        placeholder="Missions clés, compétences que vous souhaitez développer, impact attendu..."
                        className="text-xs bg-background resize-y"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          {/* BARRE D'ACTIONS INFÉRIEURE */}
          <div className="flex items-center justify-between gap-3 p-4 border-t border-border/50 bg-card">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Annuler
            </Button>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  onSave(form);
                  onOpenChange(false);
                }}
                className="gap-2 px-6 text-xs font-semibold"
              >
                <CheckCircle2 className="size-4" />
                Enregistrer l'opportunité
              </Button>
            </div>
          </div>
        </div>
      )}
    </CenterModal>
  );
}
