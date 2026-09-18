import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CenterModal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatutBadge } from "@/components/StatutBadge";
import {
  emptyPreparation,
  normalizeCandidature,
  validerIntegriteCandidature,
  findPotentialDuplicate,
  loadCandidatures,
  formatDate,
  type Candidature,
} from "@/lib/candidatures";
import {
  Sparkles,
  Loader2,
  PenLine,
  AlertTriangle,
  Building2,
  Briefcase,
  MapPin,
  Clock,
  Euro,
  ExternalLink,
  Calendar,
  CheckCircle2,
  RotateCcw,
  Trash2,
  FileText,
  Users,
  GitFork,
  User,
  Bookmark,
  Target,
  SlidersHorizontal,
  Edit3,
  Eye,
  Mail,
  Copy,
  Check,
  PhoneCall,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { extraireOpportuniteServerFn } from "@/ai/opportunity/opportunity.server-fn";
import { extraireOpportuniteHeuristique } from "@/ai/opportunity/opportunity.heuristic";
import type { OpportunityExtractedData } from "@/ai/opportunity/opportunity.types";
import {
  TagListEditor,
  MetricsEditor,
  LanguagesEditor,
  ProcessStepsEditor,
} from "@/components/opportunity/OpportunityFieldEditors";
import { WorkflowTab } from "./workflow/WorkflowTab";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Candidature | null;
  onSave: (c: Candidature) => void | Promise<unknown>;
  onDelete?: (id: string) => void;
  profil?: unknown;
  existingItems?: Candidature[];
  onOpenExisting?: (c: Candidature) => void;
  initialTab?: "offre" | "profil" | "entreprise" | "workflow";
};

export function CandidatureSheet({
  open,
  onOpenChange,
  value,
  onSave,
  onDelete,
  existingItems,
  onOpenExisting,
  initialTab = "offre",
}: Props) {
  const [form, setForm] = useState<Candidature | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
  >(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (open && value) {
      const normalized = normalizeCandidature(value);
      setForm(normalized);
      setErrorMsg(null);
      setDuplicateMatch(null);
      setActiveTab(initialTab || "offre");

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
  }, [open, value, initialTab]);

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

    let extracted: OpportunityExtractedData | null = null;
    let fallbackUsed = false;

    try {
      extracted = await extraireOpportuniteServerFn({
        data: {
          text: pastedText,
          url: optionalUrl.trim() || undefined,
        },
      });
    } catch (serverFnErr: unknown) {
      console.warn(
        "[CandidatureSheet] Échec createServerFn, tentative via endpoint Vercel /api/extraire-opportunite:",
        serverFnErr,
      );
      try {
        const res = await fetch("/api/extraire-opportunite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: pastedText,
            url: optionalUrl.trim() || undefined,
          }),
        });
        if (res.ok) {
          extracted = (await res.json()) as OpportunityExtractedData;
        } else {
          throw new Error(`API HTTP ${res.status}`);
        }
      } catch (apiErr: unknown) {
        console.warn(
          "[CandidatureSheet] Échec de l'endpoint distant, activation du moteur heuristique déterministe:",
          apiErr,
        );
        extracted = extraireOpportuniteHeuristique(
          pastedText,
          optionalUrl.trim() || undefined,
        );
        fallbackUsed = true;
      }
    }

    if (!extracted) {
      extracted = extraireOpportuniteHeuristique(
        pastedText,
        optionalUrl.trim() || undefined,
      );
      fallbackUsed = true;
    }

    try {
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
        contractType: extracted.contractType ?? null,
        typeContrat: extracted.contractType ?? null,
        applicationDeadline: extracted.applicationDeadline ?? null,
        dateLimite: extracted.applicationDeadline || "",
        source: extracted.source || form.source || "Autre",
        missions: missionsStr,
        missionsList:
          missionsList.length > 0 ? missionsList : form.missionsList,
        detail: pastedText,
        lien: optionalUrl.trim() || extracted.sourceUrl || form.lien,
        sourceUrl: optionalUrl.trim() || extracted.sourceUrl || form.sourceUrl,
        statut: form.statut || "Sauvegardée",
        status: form.status || form.statut || "Sauvegardée",
      });

      const allItems = existingItems || loadCandidatures();
      const duplicate = findPotentialDuplicate(updated, allItems);
      if (duplicate) {
        setDuplicateMatch(duplicate);
      }

      setForm(updated);
      setMode("form");

      if (fallbackUsed || extracted._extractionMethod === "heuristic") {
        setErrorMsg(
          "Analyse effectuée via le moteur heuristique. Vous pouvez compléter les champs.",
        );
      }
    } catch (normalizeErr) {
      console.error(
        "Erreur lors de la normalisation de l'offre extraite :",
        normalizeErr,
      );
      setErrorMsg(
        "Une erreur est survenue lors de l'application des données. Veuillez vérifier les champs.",
      );
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

  const handleCancelEdit = () => {
    if (value) {
      setForm(normalizeCandidature(value));
    }
    setIsEditing(false);
  };

  const handleIgnoreDuplicate = () => {
    setDuplicateMatch(null);
  };

  return (
    <CenterModal
      open={open}
      onOpenChange={onOpenChange}
      size="full"
      className="max-w-[1720px] w-[97vw] lg:w-[96vw] max-h-[94vh] h-[94vh] p-0 overflow-hidden"
      bodyClassName="p-0 flex flex-col min-h-0 overflow-hidden"
      title={
        <div className="flex flex-col gap-2.5 w-full pr-8">
          {mode === "menu" ? (
            <span className="text-lg font-extrabold text-white">
              Nouvelle Opportunité
            </span>
          ) : mode === "paste" ? (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/30 text-primary">
                <Sparkles className="size-5" />
              </div>
              <div>
                <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider block">
                  Assistant IA NACORA
                </span>
                <span className="text-base font-bold text-white">
                  Analyse & Extraction Intelligente d'Offre
                </span>
              </div>
            </div>
          ) : (
            /* EN-TÊTE UNIQUE, COMPACT, ULTRA-ÉPURÉ ET SANS DOUBLONS (HIÉRARCHIE OPTIMISÉE) */
            <div className="flex flex-col gap-2.5 w-full">
              {/* LIGNE PRINCIPALE : Titre complet à gauche, Actions à droite */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full min-w-0">
                {/* Titre complet de l'opportunité (prioritaire et très contrasté) */}
                <h2 className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight break-words max-w-5xl flex-1 min-w-0">
                  {form.poste || "Opportunité sans titre"}
                </h2>

                {/* Actions d'administration compactes */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  {!isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-[11px] font-black gap-1.5 rounded-xl border-slate-800 text-slate-300 bg-slate-900/40 hover:bg-white/10 hover:border-white/20 transition-all"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="size-3.5" />
                        Modifier
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-[11px] font-bold gap-1.5 border-purple-500/30 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-all"
                        onClick={() => setMode("paste")}
                      >
                        <Sparkles className="size-3.5 text-purple-300" />
                        Ré-extraire avec l'IA
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-[11px] font-bold border-slate-800 text-slate-400 hover:text-white rounded-xl bg-slate-950/20"
                        onClick={() => onOpenChange(false)}
                      >
                        Fermer
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-[11px] font-black gap-1.5 rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                      onClick={handleCancelEdit}
                    >
                      <Eye className="size-3.5" />
                      Mode Consultation
                    </Button>
                  )}
                </div>
              </div>

              {/* LIGNE SECONDAIRE : Métadonnées élégantes et lisibles */}
              <div className="flex wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-300 border-t border-slate-800/20 pt-2">
                {/* Entreprise - Neutre en verre */}
                <span className="inline-flex items-center gap-1.5 bg-[#0d0f17] border border-slate-800/80 text-slate-200 font-bold text-[10px] uppercase px-2 py-0.5 rounded-md">
                  <Building2 className="size-3 text-slate-400" />
                  {form.entreprise || "Entreprise non spécifiée"}
                </span>

                {/* Contrat */}
                {form.contractType && (
                  <span className="inline-flex items-center gap-1 bg-[#0d0f17] border border-slate-800 text-slate-300 font-bold text-[10px] px-2 py-0.5 rounded-md">
                    <Briefcase className="size-3 text-slate-400" />
                    {form.contractType}
                  </span>
                )}

                {/* Localisation */}
                {form.lieu && (
                  <span className="inline-flex items-center gap-1 bg-[#0d0f17] border border-slate-800 text-slate-300 font-bold text-[10px] px-2 py-0.5 rounded-md">
                    <MapPin className="size-3 text-slate-400" />
                    {form.lieu}
                  </span>
                )}

                {/* Rémunération */}
                {form.salary && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                    <Euro className="size-3 text-emerald-400" />
                    {form.salary}
                  </span>
                )}

                {/* Durée */}
                {form.duration && (
                  <span className="inline-flex items-center gap-1 bg-[#0d0f17] border border-slate-800 text-slate-300 font-bold text-[10px] px-2 py-0.5 rounded-md">
                    <Clock className="size-3 text-slate-400" />
                    {form.duration}
                  </span>
                )}

                {/* Date de début */}
                {form.startDate && (
                  <span className="inline-flex items-center gap-1 bg-[#0d0f17] border border-slate-800 text-slate-300 font-semibold text-[10px] px-2 py-0.5 rounded-md">
                    <Calendar className="size-3 text-slate-400" />
                    Début : {form.startDate}
                  </span>
                )}

                {/* Deadline de candidature */}
                {(form.dateLimite || form.applicationDeadline) && (
                  <span className="inline-flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 text-rose-300 font-extrabold font-mono text-[10px] px-2 py-0.5 rounded-md">
                    <Calendar className="size-3 text-rose-400" />
                    DL :{" "}
                    {formatDate(
                      form.dateLimite || form.applicationDeadline || "",
                    )}
                  </span>
                )}

                {/* Statut actuel */}
                <StatutBadge statut={form.statut} size="xs" />
              </div>
            </div>
          )}
        </div>
      }
      description={
        mode === "menu"
          ? "Choisissez le mode d'ajout de votre opportunité."
          : mode === "paste"
            ? "Collez le texte brut de l'annonce d'emploi pour une extraction automatique."
            : undefined
      }
    >
      {/* MODE MENU INITIAL */}
      {mode === "menu" && (
        <div className="p-6 lg:p-8 grid gap-4 max-w-xl mx-auto py-12">
          <div className="text-center mb-4 space-y-1.5">
            <h3 className="font-extrabold text-xl text-white">
              Comment souhaitez-vous ajouter cette opportunité ?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              L'Assistant IA NACORA analyse et extrait automatiquement
              l'entreprise, les missions clés, compétences requises et
              modalités.
            </p>
          </div>

          <Button
            variant="outline"
            className="h-24 justify-start gap-4 p-4 border-primary/30 hover:border-primary/80 hover:bg-primary/10 transition-all text-left rounded-2xl cursor-pointer bg-slate-900/60"
            onClick={() => setMode("paste")}
          >
            <div className="bg-primary/15 text-primary p-3.5 rounded-2xl shrink-0">
              <Sparkles className="size-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-white">
                  Extraction Automatique par IA
                </p>
                <Badge className="bg-primary text-white border-none text-[10px] font-bold py-0.5 px-2">
                  Recommandé
                </Badge>
              </div>
              <p className="text-xs text-slate-300">
                Copiez-collez le texte de l'offre depuis LinkedIn, WTTJ,
                JobTeaser...
              </p>
            </div>
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-[#0A0C14] px-3 text-slate-400 font-bold">
                Ou
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="h-16 justify-start gap-4 border border-slate-800 hover:bg-slate-900/80 rounded-2xl cursor-pointer"
            onClick={() => setMode("form")}
          >
            <div className="bg-slate-800 text-slate-200 p-2.5 rounded-xl">
              <PenLine className="size-5" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white">Saisie Manuelle</p>
              <p className="text-xs text-slate-300">
                Renseigner manuellement les informations du poste
              </p>
            </div>
          </Button>
        </div>
      )}

      {/* MODE PASTE TEXTE DE L'OFFRE */}
      {mode === "paste" && (
        <div className="p-6 lg:p-8 flex flex-col gap-5 max-w-4xl mx-auto w-full">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-destructive/15 border border-destructive/30 text-xs text-destructive flex items-start gap-3 font-medium">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="optionalUrl"
              className="text-xs font-bold uppercase tracking-wider text-slate-200"
            >
              Lien web de l'offre (optionnel)
            </Label>
            <Input
              id="optionalUrl"
              placeholder="https://..."
              value={optionalUrl}
              onChange={(e) => setOptionalUrl(e.target.value)}
              disabled={analyzing}
              className="text-sm h-10 bg-[#08090E] text-slate-100 placeholder:text-slate-400 rounded-xl border-slate-700/80"
            />
          </div>

          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="rawOfferText"
                className="text-xs font-bold uppercase tracking-wider text-slate-200"
              >
                Texte brut de l'annonce d'emploi *
              </Label>
              <span className="text-xs font-semibold text-slate-400">
                {pastedText.length} caractères
              </span>
            </div>
            <Textarea
              id="rawOfferText"
              placeholder="Collez ici l'intégralité du texte de l'annonce (intitulé, missions, profil, entreprise...)"
              className="h-80 resize-none text-xs leading-relaxed bg-[#08090E] text-slate-100 placeholder:text-slate-400 border-slate-700/80 rounded-xl"
              value={pastedText}
              onChange={(e) => {
                setPastedText(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              disabled={analyzing}
            />
          </div>

          {analyzing && (
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3.5 animate-pulse">
              <Loader2 className="size-5 animate-spin text-primary shrink-0" />
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-white">
                  Analyse par l'IA en cours...
                </p>
                <p className="text-slate-300">
                  Extraction des missions, compétences requises, chiffres clés
                  et coordonnées.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMode("menu")}
              disabled={analyzing}
              className="border-slate-700 text-slate-200"
            >
              Retour
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode("form")}
                disabled={analyzing}
                className="text-xs text-slate-300 hover:text-white"
              >
                Saisie manuelle
              </Button>
              <Button
                size="sm"
                disabled={!pastedText.trim() || analyzing}
                onClick={handleAnalyze}
                className="gap-2 px-6 bg-primary hover:bg-primary/95 text-white font-semibold"
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

      {/* MODE FORMULAIRE & COCKPIT DOUBLE COLONNE SUR DESKTOP */}
      {mode === "form" && (
        <div className="flex flex-col h-full min-h-0 overflow-hidden bg-[#07080D]">
          {/* BANNIÈRE DOUBLON SI DÉTECTÉ */}
          {duplicateMatch && (
            <div className="mx-6 mt-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-amber-400">
                    Opportunité existante détectée :
                  </span>{" "}
                  <span className="font-semibold text-slate-100">
                    {duplicateMatch.entreprise} — {duplicateMatch.poste}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/20"
                  onClick={handleOpenDuplicate}
                >
                  Ouvrir l'existante
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-slate-400 hover:text-white"
                  onClick={handleIgnoreDuplicate}
                >
                  Conserver celle-ci
                </Button>
              </div>
            </div>
          )}

          {/* VRAIE STRUCTURE EN PLEINE LARGEUR DESKTOP (SANS COLONNE INDÉPENDANTE À DROITE) */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#07080D]">
            <Tabs
              value={activeTab}
              onValueChange={(v) =>
                setActiveTab(
                  v as "offre" | "profil" | "entreprise" | "workflow",
                )
              }
              className="flex-1 flex flex-col min-h-0"
            >
              {/* BARRE D'ONGLETS STYLISÉE NACORA */}
              <div className="border-b border-slate-800/80 px-4 lg:px-8 py-2.5 bg-[#0E111B] shrink-0">
                <TabsList className="w-full justify-start h-10 p-0 bg-transparent gap-2 overflow-x-auto">
                  <TabsTrigger
                    value="offre"
                    className="rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-sm backdrop-blur-md cursor-pointer"
                  >
                    Offre & Missions
                  </TabsTrigger>
                  <TabsTrigger
                    value="profil"
                    className="rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-sm backdrop-blur-md cursor-pointer"
                  >
                    Profil & Recrutement
                  </TabsTrigger>
                  <TabsTrigger
                    value="entreprise"
                    className="rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-sm backdrop-blur-md cursor-pointer"
                  >
                    Entreprise
                  </TabsTrigger>
                  <TabsTrigger
                    value="workflow"
                    className="rounded-xl px-4 py-2 text-xs font-extrabold transition-all text-slate-300 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-white/20 data-[state=active]:shadow-sm backdrop-blur-md cursor-pointer flex items-center gap-1.5"
                  >
                    <GitFork className="size-3.5" />
                    <span>Workflow & Suivi</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* CONTENU DÉFILANT DES ONGLETS */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
                {/* TAB 1: OFFRE & MISSIONS */}
                <TabsContent
                  value="offre"
                  className="mt-0 space-y-6 data-[state=inactive]:hidden"
                >
                  {!isEditing ? (
                    /* MODE CONSULTATION : GRID INTUITIVE À 2 COLONNES (PLEINE LARGEUR EXPLOITÉE) */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* COLONNE GAUCHE (8/12) : MISSIONS PRINCIPALES */}
                      <div className="lg:col-span-8 space-y-6">
                        <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 lg:p-6 space-y-4 shadow-md">
                          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                              <CheckCircle2 className="size-4 text-emerald-400" />{" "}
                              Missions Principales
                            </h3>
                            <Badge className="bg-white/10 text-slate-200 border-white/10 font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-lg">
                              {form.missionsList?.length || 0} missions
                              extraites
                            </Badge>
                          </div>

                          {form.missionsList && form.missionsList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {form.missionsList.map((m, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-4 rounded-xl border border-slate-800/90 bg-[#080A11] hover:border-slate-700/80 transition-all shadow-sm"
                                >
                                  <div className="flex items-center justify-center size-6 rounded-lg bg-white/10 border border-white/15 text-slate-200 font-mono text-[11px] font-bold shrink-0 mt-0.5">
                                    {String(idx + 1).padStart(2, "0")}
                                  </div>
                                  <p className="text-xs lg:text-sm text-slate-100 font-medium leading-relaxed flex-1">
                                    {m}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">
                              Aucune mission renseignée pour le moment.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* COLONNE DROITE (4/12) : CONTACTS & NOTES & AVANTAGES */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* CONTACT RH */}
                        <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-3 shadow-md">
                          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                            <Users className="size-4 text-sky-400" />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200 block">
                              Contact RH & Recruteur
                            </span>
                          </div>
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2.5 text-slate-200">
                              <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                                <User className="size-4 text-sky-400" />
                              </div>
                              <span className="font-bold text-white text-sm">
                                {form.contact || "Aucun contact spécifié"}
                              </span>
                            </div>
                            {form.contactEmail && (
                              <div className="flex items-center gap-2.5 text-slate-300">
                                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                                  <Mail className="size-4 text-slate-400" />
                                </div>
                                <a
                                  href={`mailto:${form.contactEmail}`}
                                  className="hover:underline text-sky-400 text-xs font-semibold"
                                >
                                  {form.contactEmail}
                                </a>
                              </div>
                            )}
                            {form.contactPhone && (
                              <div className="flex items-center gap-2.5 text-slate-300">
                                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                                  <PhoneCall className="size-4 text-slate-400" />
                                </div>
                                <span className="text-xs font-semibold text-slate-200">
                                  {form.contactPhone}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* AVANTAGES */}
                        <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 shadow-md">
                          <TagListEditor
                            label="Avantages & Environnement"
                            items={form.benefits || []}
                            onChange={(items) => set({ benefits: items })}
                            placeholder="Ajouter un avantage (ex: Télétravail 2j, Mutuelle...)"
                            badgeClassName="bg-emerald-500/20 text-emerald-200 border-emerald-500/40 font-bold"
                            emptyText="Aucun avantage spécifié."
                            isEditing={false}
                          />
                        </div>

                        {/* NOTES PRIVÉES */}
                        <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-3.5 shadow-md">
                          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                            <FileText className="size-4 text-amber-400" />
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-200 block">
                              Notes Personnelles & Privées
                            </span>
                          </div>
                          <p className="text-xs text-slate-100 font-medium leading-relaxed whitespace-pre-wrap italic">
                            {form.personalNotes ||
                              form.commentaire ||
                              "Aucune note privée renseignée pour le moment."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* MODE ÉDITION : FORMULAIRE BIEN CONSTRUIT AVEC MODIFICATIONS */
                    <div className="space-y-6">
                      {/* FORMULAIRE DE MODIFICATION DES PARAMÈTRES DE L'OFFRE (S'AFFICHE UNIQUEMENT EN MODE ÉDITION !) */}
                      <div className="rounded-2xl border border-primary/20 bg-[#10131F] p-5 lg:p-6 space-y-5 shadow-lg">
                        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                          <SlidersHorizontal className="size-4 text-primary" />
                          <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                            Modification des Informations Générales de l'Offre
                          </h3>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="grid gap-1.5 sm:col-span-2 lg:col-span-2">
                            <Label
                              htmlFor="titleInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Intitulé exact du poste *
                            </Label>
                            <Input
                              id="titleInput"
                              value={form.poste}
                              onChange={(e) =>
                                set({
                                  poste: e.target.value,
                                  title: e.target.value,
                                })
                              }
                              placeholder="ex: Lead Developer Frontend React"
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80 font-medium"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="companyInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
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
                              placeholder="ex: NACORA"
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80 font-medium"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="contractTypeInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Type de contrat
                            </Label>
                            <Input
                              id="contractTypeInput"
                              value={form.contractType || ""}
                              onChange={(e) =>
                                set({ contractType: e.target.value })
                              }
                              placeholder="ex: CDI, CDD, Stage..."
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="durationInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Durée / Temps de travail
                            </Label>
                            <Input
                              id="durationInput"
                              value={form.duration || ""}
                              onChange={(e) =>
                                set({ duration: e.target.value })
                              }
                              placeholder="ex: Temps plein (39h)"
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="locationInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Lieu / Localisation
                            </Label>
                            <Input
                              id="locationInput"
                              value={form.lieu}
                              onChange={(e) =>
                                set({
                                  lieu: e.target.value,
                                  location: e.target.value,
                                })
                              }
                              placeholder="ex: Paris, France (Hybride)"
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="startDateInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Date de début
                            </Label>
                            <Input
                              id="startDateInput"
                              value={form.startDate || ""}
                              onChange={(e) =>
                                set({ startDate: e.target.value })
                              }
                              placeholder="ex: Dès que possible"
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="applicationDeadlineInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Deadline de candidature
                            </Label>
                            <Input
                              id="applicationDeadlineInput"
                              type="date"
                              value={
                                form.dateLimite ||
                                form.applicationDeadline ||
                                ""
                              }
                              onChange={(e) =>
                                set({
                                  dateLimite: e.target.value,
                                  applicationDeadline: e.target.value,
                                })
                              }
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1.5">
                            <Label
                              htmlFor="salaryInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Rémunération / Salaire
                            </Label>
                            <Input
                              id="salaryInput"
                              value={form.salary || ""}
                              onChange={(e) => set({ salary: e.target.value })}
                              placeholder="ex: 48k€ - 58k€ / an"
                              className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1.5 sm:col-span-2 lg:col-span-3">
                            <Label
                              htmlFor="sourceUrlInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Lien source de l'annonce
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
                                className="bg-[#05060A] text-slate-100 text-sm h-10 rounded-xl border-slate-700/80 flex-1"
                              />
                              {(form.lien || form.sourceUrl) && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  asChild
                                  className="h-10 px-4 shrink-0 rounded-xl border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100"
                                >
                                  <a
                                    href={form.lien || form.sourceUrl || "#"}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <ExternalLink className="size-4 text-primary" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ÉDITION DES MISSIONS & DES CONTACTS & AVANTAGES */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* MISSIONS */}
                        <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-4">
                          <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-primary" />{" "}
                            Missions Principales (
                            {form.missionsList?.length || 0})
                          </h3>
                          <div className="space-y-2">
                            <Label
                              htmlFor="missionsTextarea"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Une mission par ligne :
                            </Label>
                            <Textarea
                              id="missionsTextarea"
                              rows={10}
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
                                  .map((line) =>
                                    line.replace(/^[•\-*0-9.]+\s*/, "").trim(),
                                  )
                                  .filter(Boolean);
                                set({ missions: val, missionsList: list });
                              }}
                              placeholder="01. Mission 1&#10;02. Mission 2"
                              className="bg-[#05060A] text-slate-100 text-xs leading-relaxed rounded-xl border-slate-700/80 placeholder:text-slate-500 h-64 resize-y"
                            />
                          </div>
                        </div>

                        {/* CONTACTS & AVANTAGES & NOTES */}
                        <div className="space-y-6">
                          <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-4">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                              Contacts RH & Recrutement
                            </span>
                            <div className="grid gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs font-semibold text-slate-300">
                                  Nom du contact
                                </Label>
                                <Input
                                  value={form.contact || ""}
                                  onChange={(e) =>
                                    set({ contact: e.target.value })
                                  }
                                  placeholder="Nom du contact RH..."
                                  className="text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-500 h-9 rounded-lg border-slate-700/80"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-semibold text-slate-300">
                                  Email du contact
                                </Label>
                                <Input
                                  value={form.contactEmail || ""}
                                  onChange={(e) =>
                                    set({ contactEmail: e.target.value })
                                  }
                                  placeholder="Email RH (ex: rh@entreprise.com)"
                                  className="text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-500 h-9 rounded-lg border-slate-700/80"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs font-semibold text-slate-300">
                                  Téléphone du contact
                                </Label>
                                <Input
                                  value={form.contactPhone || ""}
                                  onChange={(e) =>
                                    set({ contactPhone: e.target.value })
                                  }
                                  placeholder="Téléphone (ex: 06 12...)"
                                  className="text-xs bg-[#05060A] text-slate-100 placeholder:text-slate-500 h-9 rounded-lg border-slate-700/80"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5">
                            <TagListEditor
                              label="Avantages & Environnement de Travail"
                              items={form.benefits || []}
                              onChange={(items) => set({ benefits: items })}
                              placeholder="Ajouter un avantage (ex: Télétravail 2j, Mutuelle...)"
                              badgeClassName="bg-emerald-500/20 text-emerald-200 border-emerald-500/40 font-bold"
                              emptyText="Aucun avantage spécifié."
                              isEditing={true}
                            />
                          </div>

                          <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-5 space-y-2">
                            <Label className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground block">
                              Notes Personnelles & Commentaires
                            </Label>
                            <Textarea
                              rows={4}
                              value={
                                form.personalNotes || form.commentaire || ""
                              }
                              onChange={(e) =>
                                set({
                                  personalNotes: e.target.value,
                                  commentaire: e.target.value,
                                })
                              }
                              placeholder="Vos impressions, questions ou notes..."
                              className="text-xs bg-[#05060A] text-slate-100 resize-y rounded-xl border-slate-700/80"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* TAB 2: PROFIL & RECRUTEMENT */}
                <TabsContent
                  value="profil"
                  className="mt-0 space-y-5 data-[state=inactive]:hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* COLONNE GAUCHE PROFIL */}
                    <div className="space-y-5">
                      <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-4 lg:p-5 space-y-5">
                        <TagListEditor
                          label="Compétences indispensables / requises"
                          items={form.requiredSkills || []}
                          onChange={(items) => set({ requiredSkills: items })}
                          placeholder="ex: React, TypeScript, Tailwind..."
                          badgeClassName="bg-primary/20 text-foreground border-primary/30 font-semibold text-xs"
                          emptyText="Aucune compétence obligatoire identifiée."
                          isEditing={isEditing}
                        />

                        <TagListEditor
                          label="Compétences appréciées (Atouts)"
                          items={form.preferredSkills || []}
                          onChange={(items) => set({ preferredSkills: items })}
                          placeholder="ex: Next.js, GraphQL, Docker..."
                          badgeClassName="bg-indigo-500/10 text-indigo-300 border-indigo-500/20 font-bold text-xs"
                          emptyText="Aucune compétence secondaire."
                          isEditing={isEditing}
                        />
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-4 lg:p-5 space-y-5">
                        <TagListEditor
                          label="Qualités humaines & Soft skills"
                          items={form.qualities || []}
                          onChange={(items) => set({ qualities: items })}
                          placeholder="ex: Autonomie, Esprit d'équipe..."
                          badgeClassName="bg-amber-500/25 text-amber-100 border-amber-500/50 font-bold text-xs"
                          emptyText="Aucune qualité listée."
                          isEditing={isEditing}
                        />
                      </div>
                    </div>

                    {/* COLONNE DROITE PROFIL */}
                    <div className="space-y-5">
                      <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-4 lg:p-5 space-y-5">
                        <TagListEditor
                          label="Outils, Logiciels & Plateformes"
                          items={form.tools || []}
                          onChange={(items) => set({ tools: items })}
                          placeholder="ex: Figma, Git, Jira, Notion..."
                          badgeClassName="bg-sky-500/25 text-sky-100 border-sky-500/50 font-bold text-xs"
                          emptyText="Aucun outil spécifique."
                          isEditing={isEditing}
                        />

                        {!isEditing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                            <div className="p-3 rounded-xl bg-[#080A11] border border-slate-800 space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                                Formation & Diplômes
                              </span>
                              <span className="text-xs font-bold text-white block">
                                {form.educationRequirements?.join(" ; ") ||
                                  form.educationLevel ||
                                  "Non spécifié"}
                              </span>
                            </div>
                            <div className="p-3 rounded-xl bg-[#080A11] border border-slate-800 space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                                Expérience requise
                              </span>
                              <span className="text-xs font-bold text-white block">
                                {form.experienceRequirements || "Non spécifiée"}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                            <div className="grid gap-1">
                              <Label
                                htmlFor="eduReqInput"
                                className="text-xs font-bold uppercase tracking-wider text-slate-200"
                              >
                                Formation & Diplômes
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
                                placeholder="ex: Bac+5, École d'ingénieurs"
                                className="bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
                              />
                            </div>

                            <div className="grid gap-1">
                              <Label
                                htmlFor="expReqInput"
                                className="text-xs font-bold uppercase tracking-wider text-slate-200"
                              >
                                Expérience requise
                              </Label>
                              <Input
                                id="expReqInput"
                                value={form.experienceRequirements || ""}
                                onChange={(e) =>
                                  set({
                                    experienceRequirements: e.target.value,
                                  })
                                }
                                placeholder="ex: 3 à 5 ans"
                                className="bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-4 lg:p-5 space-y-5">
                        <LanguagesEditor
                          requiredLanguages={form.requiredLanguages || []}
                          preferredLanguages={form.preferredLanguages || []}
                          onChangeRequired={(req) =>
                            set({ requiredLanguages: req })
                          }
                          onChangePreferred={(pref) =>
                            set({ preferredLanguages: pref })
                          }
                          isEditing={isEditing}
                        />

                        <ProcessStepsEditor
                          steps={form.recruitmentProcess || []}
                          onChange={(steps) =>
                            set({ recruitmentProcess: steps })
                          }
                          isEditing={isEditing}
                        />

                        <TagListEditor
                          label="Documents demandés"
                          items={form.applicationRequirements || []}
                          onChange={(items) =>
                            set({ applicationRequirements: items })
                          }
                          placeholder="ex: CV, Lettre de motivation..."
                          badgeClassName="bg-slate-800 text-slate-100 border-slate-700 font-semibold"
                          emptyText="Non renseigné."
                          isEditing={isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 3: ENTREPRISE & MÉTRIQUES */}
                <TabsContent
                  value="entreprise"
                  className="mt-0 space-y-5 data-[state=inactive]:hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* GAUCHE ENTREPRISE */}
                    <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-4 lg:p-5 space-y-4">
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Building2 className="size-4 text-primary" /> Identité &
                        Présentation
                      </h3>

                      {!isEditing ? (
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-[#080A11] border border-slate-800 space-y-1.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                              Présentation de l'entreprise
                            </span>
                            <p className="text-xs text-slate-100 leading-relaxed font-medium whitespace-pre-wrap">
                              {form.companyDescription ||
                                "Aucune description renseignée."}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-[#080A11] border border-slate-800 space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                                Groupe / Maison mère
                              </span>
                              <span className="text-xs font-bold text-white block">
                                {form.parentCompany ||
                                  form.groupName ||
                                  "Non spécifié"}
                              </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#080A11] border border-slate-800 space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                                Secteur d'activité
                              </span>
                              <span className="text-xs font-bold text-white block">
                                {form.secteur ||
                                  form.companySector ||
                                  "Non spécifié"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="companyDescInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Présentation de l'entreprise
                            </Label>
                            <Textarea
                              id="companyDescInput"
                              rows={4}
                              value={form.companyDescription || ""}
                              onChange={(e) =>
                                set({ companyDescription: e.target.value })
                              }
                              placeholder="Activités, mission, valeurs..."
                              className="bg-[#05060A] text-slate-100 text-xs leading-relaxed rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="grid gap-1">
                              <Label
                                htmlFor="compParentInput"
                                className="text-xs font-bold uppercase tracking-wider text-slate-200"
                              >
                                Groupe / Maison mère
                              </Label>
                              <Input
                                id="compParentInput"
                                value={
                                  form.parentCompany || form.groupName || ""
                                }
                                onChange={(e) =>
                                  set({
                                    parentCompany: e.target.value,
                                    groupName: e.target.value,
                                  })
                                }
                                placeholder="ex: Groupe LVMH"
                                className="bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
                              />
                            </div>

                            <div className="grid gap-1">
                              <Label
                                htmlFor="compSectorInput"
                                className="text-xs font-bold uppercase tracking-wider text-slate-200"
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
                                placeholder="ex: SaaS B2B / Fintech"
                                className="bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {isEditing && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="grid gap-1">
                            <Label
                              htmlFor="compSizeInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Taille de l'effectif
                            </Label>
                            <Input
                              id="compSizeInput"
                              value={form.companySize || ""}
                              onChange={(e) =>
                                set({ companySize: e.target.value })
                              }
                              placeholder="ex: 50 à 200 salariés"
                              className="bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
                            />
                          </div>

                          <div className="grid gap-1">
                            <Label
                              htmlFor="compWebInput"
                              className="text-xs font-bold uppercase tracking-wider text-slate-200"
                            >
                              Site web officiel
                            </Label>
                            <Input
                              id="compWebInput"
                              value={form.companyWebsite || ""}
                              onChange={(e) =>
                                set({ companyWebsite: e.target.value })
                              }
                              placeholder="https://..."
                              className="bg-[#05060A] text-slate-100 text-sm h-9 rounded-xl border-slate-700/80"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* DROITE ENTREPRISE */}
                    <div className="rounded-2xl border border-slate-800 bg-[#10131F] p-4 lg:p-5 space-y-5">
                      <MetricsEditor
                        metrics={form.companyMetrics || []}
                        onChange={(metrics) => set({ companyMetrics: metrics })}
                        isEditing={isEditing}
                      />

                      <TagListEditor
                        label="Contexte de croissance & Faits marquants"
                        items={form.companyContext || []}
                        onChange={(items) => set({ companyContext: items })}
                        placeholder="ex: Levée de fonds de 5M€..."
                        badgeClassName="bg-primary/20 text-foreground border-primary/30 font-semibold"
                        emptyText="Aucun fait de contexte détecté."
                        isEditing={isEditing}
                      />

                      <TagListEditor
                        label="Partenaires & Clients cités"
                        items={form.companyPartners || []}
                        onChange={(items) => set({ companyPartners: items })}
                        placeholder="ex: Google, L'Oréal..."
                        badgeClassName="bg-slate-800 text-slate-100 border-slate-700 font-medium"
                        emptyText="Aucun partenaire cité."
                        isEditing={isEditing}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* TAB 4: WORKFLOW & SUIVI */}
                <TabsContent
                  value="workflow"
                  className="mt-0 space-y-5 data-[state=inactive]:hidden"
                >
                  <WorkflowTab
                    candidature={form}
                    onChange={(patch) => set(patch)}
                  />

                  {/* PRÉPARATION DE CANDIDATURE */}
                  <div className="p-4 lg:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary">
                        Préparation d'Entretiens & Arguments Stratégiques
                      </h4>
                      <span className="text-xs text-slate-400">
                        Notes et arguments pour vos échanges
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label
                          htmlFor="prepEnt"
                          className="text-xs font-bold uppercase tracking-wider text-slate-200"
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
                          placeholder="Alignement avec vos ambitions, culture d'entreprise..."
                          className="text-xs bg-[#05060A] text-slate-100 resize-y rounded-xl border-slate-700/80"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label
                          htmlFor="prepPoste"
                          className="text-xs font-bold uppercase tracking-wider text-slate-200"
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
                          placeholder="Missions clés, impact recherché, compétences..."
                          className="text-xs bg-[#05060A] text-slate-100 resize-y rounded-xl border-slate-700/80"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* BARRE D'ACTIONS INFÉRIEURE PERSISTANTE (PLEINE LARGEUR) */}
          <div className="flex items-center justify-between gap-3 px-6 lg:px-8 py-3.5 border-t border-slate-800/80 bg-[#0E111B] shrink-0">
            {!isEditing ? (
              /* ACTIONS MODE CONSULTATION */
              <>
                <div className="flex items-center gap-2">
                  {onDelete &&
                    form?.id &&
                    existingItems?.some((i) => i.id === form.id) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteDialogOpen(true)}
                        className="text-xs text-rose-400/90 hover:bg-rose-500/10 hover:text-rose-300 gap-1.5 font-bold rounded-xl"
                      >
                        <Trash2 className="size-4" />
                        Supprimer l'opportunité
                      </Button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-xs font-extrabold border-slate-800 text-slate-300 bg-slate-900/40 hover:bg-white/10 hover:border-white/20 rounded-xl px-4 h-9"
                  >
                    <Edit3 className="size-4 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMode("paste")}
                    className="text-xs font-bold border-purple-500/30 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl px-4 h-9 transition-all"
                  >
                    <Sparkles className="size-3.5 mr-1 text-purple-300" />
                    Ré-extraire avec l'IA
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onOpenChange(false)}
                    className="text-xs font-bold border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800 rounded-xl px-5 h-9"
                  >
                    Fermer
                  </Button>
                </div>
              </>
            ) : (
              /* ACTIONS MODE ÉDITION */
              <>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="text-xs font-bold border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white rounded-xl"
                  >
                    Annuler
                  </Button>
                  {onDelete &&
                    form?.id &&
                    existingItems?.some((i) => i.id === form.id) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteDialogOpen(true)}
                        className="text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 gap-1.5 font-bold rounded-xl"
                      >
                        <Trash2 className="size-4" />
                        Supprimer l'opportunité
                      </Button>
                    )}
                </div>

                <Button
                  size="sm"
                  disabled={isSaving}
                  onClick={async () => {
                    const safeToSave = validerIntegriteCandidature(form, form);
                    setIsSaving(true);
                    try {
                      await onSave(safeToSave);
                      setIsEditing(false);
                    } catch (saveErr) {
                      console.error("[OPPORTUNITY SAVE FAILED]", saveErr);
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                  className="gap-2 px-6 h-10 text-xs font-semibold bg-primary hover:bg-primary/95 text-white shadow-md rounded-xl cursor-pointer"
                >
                  {isSaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="size-4" />
                  )}
                  {isSaving ? "Enregistrement…" : "Enregistrer"}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#121625] border-slate-800 text-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white font-bold">
              Supprimer cette opportunité ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300 text-sm">
              Cette action est irréversible. L'opportunité «{" "}
              {form?.poste || "Sans titre"} » chez «{" "}
              {form?.entreprise || "Entreprise inconnue"} » ainsi que tout son
              historique seront définitivement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs font-bold border-slate-700 text-slate-200">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 text-white hover:bg-rose-700 text-xs font-bold"
              onClick={() => {
                if (form?.id && onDelete) {
                  onDelete(form.id);
                  onOpenChange(false);
                }
                setDeleteDialogOpen(false);
              }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CenterModal>
  );
}
