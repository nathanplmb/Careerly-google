import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronRight,
  ArrowRight,
  Edit2,
  Trash2,
  Plus,
  Send,
  MessageSquare,
  Phone,
  Video,
  User,
  Award,
  XCircle,
  AlertCircle,
  Building2,
  FileText,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import {
  WORKFLOW_STEPS_CONFIG,
  CHANNELS_COMMUNICATION,
  TYPES_ENTRETIEN,
  getWorkflowStepConfig,
  statutToWorkflowStepKey,
  workflowStepKeyToStatut,
  transitionWorkflowStep,
  type WorkflowEvent,
  type WorkflowStepKey,
  type WorkflowStepConfig,
} from "@/lib/workflow";
import {
  todayIso,
  formatDate,
  type Candidature,
  type Statut,
} from "@/lib/candidatures";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Props = {
  candidature: Candidature;
  onChange: (patch: Partial<Candidature>) => void;
};

export function WorkflowTab({ candidature, onChange }: Props) {
  const currentStepKey: WorkflowStepKey =
    candidature.currentWorkflowStep ||
    statutToWorkflowStepKey(candidature.statut);
  const currentConfig = getWorkflowStepConfig(currentStepKey);

  const events = Array.isArray(candidature.workflowEvents)
    ? candidature.workflowEvents
    : [];

  // Modal pour changer d'étape
  const [changeStepModalOpen, setChangeStepModalOpen] = useState(false);
  const [selectedTargetStep, setSelectedTargetStep] =
    useState<WorkflowStepKey>(currentStepKey);
  const [stepDate, setStepDate] = useState<string>(todayIso());
  const [stepNote, setStepNote] = useState<string>("");
  const [stepChannel, setStepChannel] = useState<string>(
    candidature.source || "JobTeaser",
  );
  const [stepInterviewType, setStepInterviewType] = useState<string>(
    "Visio (Teams, Meet, Zoom)",
  );
  const [stepInterlocuteur, setStepInterlocuteur] = useState<string>(
    candidature.contact || "",
  );

  // Modal pour modifier un événement existant
  const [editingEvent, setEditingEvent] = useState<WorkflowEvent | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editChannel, setEditChannel] = useState("");
  const [editInterviewType, setEditInterviewType] = useState("");
  const [editInterlocuteur, setEditInterlocuteur] = useState("");

  // Modal pour ajouter un événement personnalisé
  const [customEventModalOpen, setCustomEventModalOpen] = useState(false);
  const [customEventType, setCustomEventType] =
    useState<WorkflowStepKey>(currentStepKey);
  const [customEventDate, setCustomEventDate] = useState(todayIso());
  const [customEventNote, setCustomEventNote] = useState("");

  const openChangeStepModal = (targetKey?: WorkflowStepKey) => {
    const key = targetKey || currentConfig.nextStepKey || currentStepKey;
    setSelectedTargetStep(key);
    const targetConfig = getWorkflowStepConfig(key);
    setStepDate(todayIso());
    setStepNote(targetConfig.description);
    setStepChannel(candidature.source || "JobTeaser");
    setStepInterviewType("Visio (Teams, Meet, Zoom)");
    setStepInterlocuteur(candidature.contact || "");
    setChangeStepModalOpen(true);
  };

  const handleConfirmChangeStep = () => {
    const targetConfig = getWorkflowStepConfig(selectedTargetStep);

    const patch = transitionWorkflowStep(candidature, selectedTargetStep, {
      date: stepDate || todayIso(),
      note: stepNote.trim() || targetConfig.description,
      channel:
        selectedTargetStep === "application_sent" ? stepChannel : undefined,
      interviewType:
        selectedTargetStep === "interview" ||
        selectedTargetStep === "second_interview"
          ? stepInterviewType
          : undefined,
      interlocuteur:
        selectedTargetStep === "interview" ||
        selectedTargetStep === "second_interview"
          ? stepInterlocuteur.trim() || undefined
          : undefined,
    });

    onChange(patch);
    setChangeStepModalOpen(false);
    toast.success(`Étape mise à jour : ${targetConfig.label}`);
  };

  const handleQuickAdvance = () => {
    if (!currentConfig.nextStepKey) {
      openChangeStepModal();
      return;
    }
    openChangeStepModal(currentConfig.nextStepKey);
  };

  // Modification d'un événement existant
  const handleOpenEditEvent = (evt: WorkflowEvent) => {
    setEditingEvent(evt);
    setEditDate(evt.date);
    setEditNote(evt.note || "");
    setEditChannel(evt.channel || "");
    setEditInterviewType(evt.interviewType || "Visio (Teams, Meet, Zoom)");
    setEditInterlocuteur(evt.interlocuteur || "");
  };

  const handleSaveEditEvent = () => {
    if (!editingEvent) return;
    const updatedEvents = events.map((e) => {
      if (e.id === editingEvent.id) {
        return {
          ...e,
          date: editDate,
          note: editNote.trim(),
          channel: editChannel.trim() || undefined,
          interviewType: editInterviewType.trim() || undefined,
          interlocuteur: editInterlocuteur.trim() || undefined,
        };
      }
      return e;
    });

    const patch: Partial<Candidature> = {
      workflowEvents: updatedEvents,
    };

    // Si on a édité la date de l'étape actuelle ou de l'envoi
    if (editingEvent.type === "application_sent") {
      patch.dateEnvoi = editDate;
      patch.appliedAt = editDate;
    } else if (editingEvent.type === "follow_up") {
      patch.dateRelance = editDate;
      patch.followUpDate = editDate;
    } else if (editingEvent.type === "interview") {
      patch.interviewDate = editDate;
    }

    onChange(patch);
    setEditingEvent(null);
    toast.success("Événement mis à jour.");
  };

  const handleDeleteEvent = (eventId: string, eventType: WorkflowStepKey) => {
    if (eventType === "saved" && events.length === 1) {
      toast.error("L'étape initiale 'Sauvegardée' ne peut pas être supprimée.");
      return;
    }
    const updatedEvents = events.filter((e) => e.id !== eventId);
    let newStep = currentStepKey;
    if (currentStepKey === eventType) {
      // Trouver la dernière étape restante
      const remainingTypes = updatedEvents.map((e) => e.type);
      const orderedRemaining = WORKFLOW_STEPS_CONFIG.filter((s) =>
        remainingTypes.includes(s.key),
      );
      newStep =
        orderedRemaining.length > 0
          ? orderedRemaining[orderedRemaining.length - 1]?.key || "saved"
          : "saved";
    }

    const patch: Partial<Candidature> = {
      workflowEvents: updatedEvents,
      currentWorkflowStep: newStep,
      statut: workflowStepKeyToStatut(newStep),
      status: workflowStepKeyToStatut(newStep),
    };
    onChange(patch);
    toast.success("Événement supprimé.");
  };

  const handleAddCustomEvent = () => {
    const newEvent: WorkflowEvent = {
      id: `custom-evt-${Date.now()}`,
      type: customEventType,
      date: customEventDate || todayIso(),
      note: customEventNote.trim() || "Note d'avancement",
      createdAt: new Date().toISOString(),
    };
    const updatedEvents = [...events, newEvent].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    onChange({ workflowEvents: updatedEvents });
    setCustomEventModalOpen(false);
    toast.success("Note ajoutée au journal.");
  };

  // Trouver l'index de l'étape courante
  const currentStepIndex = WORKFLOW_STEPS_CONFIG.findIndex(
    (s) => s.key === currentStepKey,
  );

  return (
    <div className="space-y-6">
      {/* 1. CARTE PROÉMINENTE D'ÉTAPE ACTUELLE & ACTION RAPIDE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Étape actuelle du workflow
              </span>
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-0.5 font-bold bg-primary/10 text-primary border-primary/25"
              >
                {currentConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              {currentConfig.description}
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-2 flex-wrap">
            {currentConfig.nextStepKey && (
              <Button
                size="sm"
                className="gap-1.5 font-semibold text-xs h-9 shadow-xs bg-primary hover:bg-primary/95 text-white rounded-xl transition-colors"
                onClick={handleQuickAdvance}
              >
                <span>{currentConfig.defaultActionLabel}</span>
                <ArrowRight className="size-3.5" />
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-9 border-slate-800 text-slate-300 bg-slate-950/20 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
              onClick={() => openChangeStepModal()}
            >
              <SlidersHorizontal className="size-3.5 text-slate-400" />
              <span>Changer d'étape</span>
            </Button>
          </div>
        </div>

        {/* Barre de progression visuelle discrète */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800/40">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Progression du processus</span>
            <span className="font-medium text-slate-200">
              {currentConfig.isTerminal
                ? currentConfig.terminalType === "success"
                  ? "Offre acceptée"
                  : "Candidature refusée"
                : `Étape ${Math.max(1, currentStepIndex + 1)} sur 8`}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                currentConfig.key === "accepted"
                  ? "bg-emerald-500 w-full"
                  : currentConfig.key === "rejected"
                    ? "bg-rose-500 w-full"
                    : "bg-primary"
              }`}
              style={{
                width: currentConfig.isTerminal
                  ? "100%"
                  : `${Math.min(100, Math.max(12, ((currentStepIndex + 1) / 8) * 100))}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. PIPELINE HORIZONTAL / GRILLE COMPACTE DES 8 ÉTAPES DU WORKFLOW */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Pipeline de suivi ({WORKFLOW_STEPS_CONFIG.length} étapes)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            Cliquez sur n'importe quelle étape pour la définir ou l'ajuster
          </span>
        </div>

        {/* Grille compacte des 8 étapes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5">
          {WORKFLOW_STEPS_CONFIG.map((step, idx) => {
            const isCurrent = step.key === currentStepKey;
            const matchingEvents = events.filter((e) => e.type === step.key);
            const hasEvent = matchingEvents.length > 0;
            const latestEvent = matchingEvents[matchingEvents.length - 1];

            return (
              <div
                key={step.key}
                onClick={() => openChangeStepModal(step.key)}
                className={`relative p-3 rounded-xl border flex flex-col justify-between min-h-[100px] transition-all cursor-pointer group select-none ${
                  isCurrent
                    ? "bg-primary/10 border-primary text-white ring-1 ring-primary/30 shadow-xs"
                    : hasEvent
                      ? "bg-[#0d0f17] border-slate-800 text-slate-200 hover:border-slate-700"
                      : "bg-[#05060A]/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                }`}
              >
                {/* Header carte : Numéro & Badges */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md font-mono ${
                      isCurrent
                        ? "bg-primary text-white"
                        : hasEvent
                          ? "bg-muted text-muted-foreground"
                          : "bg-slate-900 text-slate-500"
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  {isCurrent ? (
                    <span className="size-2 rounded-full bg-primary animate-pulse" />
                  ) : hasEvent ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : null}
                </div>

                {/* Nom de l'étape */}
                <div className="space-y-0.5 my-auto">
                  <div
                    className={`text-xs font-bold leading-tight line-clamp-2 ${
                      isCurrent
                        ? "text-white"
                        : hasEvent
                          ? "text-slate-100"
                          : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {step.label}
                  </div>

                  {latestEvent?.date && (
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 pt-1">
                      <Calendar className="size-2.5 text-muted-foreground" />
                      {formatDate(latestEvent.date)}
                    </div>
                  )}
                </div>

                {/* Footer carte */}
                <div className="pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px]">
                  <span
                    className={`font-semibold ${
                      isCurrent
                        ? "text-primary"
                        : hasEvent
                          ? "text-emerald-400/80"
                          : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    {isCurrent ? "Actuelle" : hasEvent ? "Atteinte" : "À venir"}
                  </span>
                  <ChevronRight className="size-3 text-slate-600 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT RECRUTEUR & INTERLOCUTEUR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="size-4 text-primary" />
            <Label
              htmlFor="workflowContactInput"
              className="text-xs font-bold uppercase tracking-wider text-slate-300 cursor-pointer"
            >
              Contact recruteur / Interlocuteur
            </Label>
          </div>
          <span className="text-[11px] text-slate-400">
            Coordonnées des interlocuteurs du recrutement
          </span>
        </div>

        <Input
          id="workflowContactInput"
          value={candidature.contact || ""}
          onChange={(e) => onChange({ contact: e.target.value })}
          placeholder="ex: Sophie Durand (RH) — s.durand@entreprise.com — 06 12 34 56 78"
          className="text-xs bg-[#05060A] text-slate-100 border-slate-700/80 rounded-xl h-9"
        />
        <p className="text-[11px] text-slate-400">
          Ces coordonnées restent attachées à cette opportunité et sont
          réutilisées pour vos relances et convocations d'entretien.
        </p>
      </div>

      {/* 4. NOTES PERSONNELLES & IMPRESSIONS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10131F] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            <Label
              htmlFor="workflowNotesInput"
              className="text-xs font-bold uppercase tracking-wider text-slate-300 cursor-pointer"
            >
              Notes personnelles & Impressions
            </Label>
          </div>
          <span className="text-[11px] text-slate-400">
            Vos notes privées (non générées par l'IA)
          </span>
        </div>

        <Textarea
          id="workflowNotesInput"
          rows={4}
          value={candidature.personalNotes || candidature.commentaire || ""}
          onChange={(e) =>
            onChange({
              personalNotes: e.target.value,
              commentaire: e.target.value,
            })
          }
          placeholder="Notez ici vos impressions sur l'équipe, questions à poser en entretien, fourchette de salaire discutée, retours..."
          className="text-xs bg-[#05060A] text-slate-100 border-slate-700/80 rounded-xl resize-y leading-relaxed"
        />
      </div>

      {/* 5. HISTORIQUE DÉTAILLÉ DU JOURNAL DU WORKFLOW */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#10131F]/40 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-slate-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Journal des événements ({events.length})
            </h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1 border-slate-800 text-slate-300 bg-slate-950/20 hover:bg-slate-800 hover:text-white rounded-xl transition-colors"
            onClick={() => {
              setCustomEventType(currentStepKey);
              setCustomEventDate(todayIso());
              setCustomEventNote("");
              setCustomEventModalOpen(true);
            }}
          >
            <Plus className="size-3" />
            <span>Ajouter une entrée</span>
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="text-xs text-slate-500 py-2">
            Aucun événement pour le moment.
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((evt) => {
              const cfg = getWorkflowStepConfig(evt.type);
              return (
                <div
                  key={evt.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#08090D] border border-slate-800/80 text-xs text-slate-300"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0 shrink-0 ${cfg.badgeColor}`}
                    >
                      {cfg.label}
                    </Badge>
                    <span className="font-mono text-slate-500 shrink-0 text-[11px]">
                      {formatDate(evt.date)}
                    </span>
                    <span className="text-slate-200 truncate font-medium">
                      {evt.note || cfg.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-slate-400 hover:text-white"
                      onClick={() => handleOpenEditEvent(evt)}
                    >
                      <Edit2 className="size-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-slate-400 hover:text-rose-400"
                      onClick={() => handleDeleteEvent(evt.id, evt.type)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL : CHANGER D'ÉTAPE */}
      <Dialog open={changeStepModalOpen} onOpenChange={setChangeStepModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#0E111B] border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2 text-white">
              <SlidersHorizontal className="size-4 text-primary" />
              Changer l'étape du workflow
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Sélectionnez la nouvelle étape pour faire progresser cette
              opportunité. Vous pouvez revenir en arrière à tout moment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Grille des 9 étapes */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-300">
                Choisir une étape :
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {WORKFLOW_STEPS_CONFIG.map((step) => {
                  const isSelected = selectedTargetStep === step.key;
                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => {
                        setSelectedTargetStep(step.key);
                        setStepNote(step.description);
                      }}
                      className={`px-2.5 py-2 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary/30"
                          : "border-slate-800 bg-[#08090D] hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{step.label}</span>
                        {isSelected && (
                          <Check className="size-3 shrink-0 ml-1 text-primary" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date de l'étape */}
            <div className="grid gap-1.5">
              <Label htmlFor="stepDateInput" className="text-xs font-semibold">
                Date de l'événement :
              </Label>
              <Input
                id="stepDateInput"
                type="date"
                value={stepDate}
                onChange={(e) => setStepDate(e.target.value)}
                className="text-xs bg-background"
              />
            </div>

            {/* Champs contextuels selon l'étape */}
            {selectedTargetStep === "application_sent" && (
              <div className="grid gap-1.5">
                <Label
                  htmlFor="stepChannelSelect"
                  className="text-xs font-semibold"
                >
                  Canal d'envoi :
                </Label>
                <Select value={stepChannel} onValueChange={setStepChannel}>
                  <SelectTrigger
                    id="stepChannelSelect"
                    className="text-xs bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CHANNELS_COMMUNICATION.map((ch) => (
                      <SelectItem key={ch} value={ch} className="text-xs">
                        {ch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(selectedTargetStep === "interview" ||
              selectedTargetStep === "second_interview") && (
              <>
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="stepInterviewTypeSelect"
                    className="text-xs font-semibold"
                  >
                    Format de l'entretien :
                  </Label>
                  <Select
                    value={stepInterviewType}
                    onValueChange={setStepInterviewType}
                  >
                    <SelectTrigger
                      id="stepInterviewTypeSelect"
                      className="text-xs bg-background"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES_ENTRETIEN.map((t) => (
                        <SelectItem key={t} value={t} className="text-xs">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label
                    htmlFor="stepInterlocuteurInput"
                    className="text-xs font-semibold"
                  >
                    Interlocuteur (optionnel) :
                  </Label>
                  <Input
                    id="stepInterlocuteurInput"
                    value={stepInterlocuteur}
                    onChange={(e) => setStepInterlocuteur(e.target.value)}
                    placeholder="ex: Sophie Durand (Talent Acquisition)"
                    className="text-xs bg-background"
                  />
                </div>
              </>
            )}

            {/* Note / Commentaire */}
            <div className="grid gap-1.5">
              <Label htmlFor="stepNoteInput" className="text-xs font-semibold">
                Commentaire / Note d'étape :
              </Label>
              <Input
                id="stepNoteInput"
                value={stepNote}
                onChange={(e) => setStepNote(e.target.value)}
                placeholder="ex: Dossier envoyé via le formulaire recruteur"
                className="text-xs bg-background"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChangeStepModalOpen(false)}
            >
              Annuler
            </Button>
            <Button
              size="sm"
              className="gap-1 font-semibold"
              onClick={handleConfirmChangeStep}
            >
              <span>Valider l'étape</span>
              <Check className="size-3.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL : MODIFIER UN ÉVÉNEMENT */}
      <Dialog
        open={Boolean(editingEvent)}
        onOpenChange={(open) => !open && setEditingEvent(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Edit2 className="size-4 text-primary" />
              Modifier l'événement :{" "}
              {editingEvent
                ? getWorkflowStepConfig(editingEvent.type).label
                : ""}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="editDateInput" className="text-xs font-semibold">
                Date :
              </Label>
              <Input
                id="editDateInput"
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="text-xs bg-background"
              />
            </div>

            {editingEvent?.type === "application_sent" && (
              <div className="grid gap-1.5">
                <Label
                  htmlFor="editChannelSelect"
                  className="text-xs font-semibold"
                >
                  Canal :
                </Label>
                <Select value={editChannel} onValueChange={setEditChannel}>
                  <SelectTrigger
                    id="editChannelSelect"
                    className="text-xs bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CHANNELS_COMMUNICATION.map((ch) => (
                      <SelectItem key={ch} value={ch} className="text-xs">
                        {ch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(editingEvent?.type === "interview" ||
              editingEvent?.type === "second_interview") && (
              <>
                <div className="grid gap-1.5">
                  <Label
                    htmlFor="editInterviewTypeSelect"
                    className="text-xs font-semibold"
                  >
                    Format :
                  </Label>
                  <Select
                    value={editInterviewType}
                    onValueChange={setEditInterviewType}
                  >
                    <SelectTrigger
                      id="editInterviewTypeSelect"
                      className="text-xs bg-background"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES_ENTRETIEN.map((t) => (
                        <SelectItem key={t} value={t} className="text-xs">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label
                    htmlFor="editInterlocuteurInput"
                    className="text-xs font-semibold"
                  >
                    Interlocuteur :
                  </Label>
                  <Input
                    id="editInterlocuteurInput"
                    value={editInterlocuteur}
                    onChange={(e) => setEditInterlocuteur(e.target.value)}
                    className="text-xs bg-background"
                  />
                </div>
              </>
            )}

            <div className="grid gap-1.5">
              <Label htmlFor="editNoteInput" className="text-xs font-semibold">
                Note / Détails :
              </Label>
              <Input
                id="editNoteInput"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                className="text-xs bg-background"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingEvent(null)}
            >
              Annuler
            </Button>
            <Button size="sm" onClick={handleSaveEditEvent}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL : AJOUTER UNE ENTRÉE AU JOURNAL */}
      <Dialog
        open={customEventModalOpen}
        onOpenChange={setCustomEventModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Plus className="size-4 text-primary" />
              Ajouter une entrée au journal
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold">Type d'étape :</Label>
              <Select
                value={customEventType}
                onValueChange={(v) => setCustomEventType(v as WorkflowStepKey)}
              >
                <SelectTrigger className="text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WORKFLOW_STEPS_CONFIG.map((s) => (
                    <SelectItem key={s.key} value={s.key} className="text-xs">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold">Date :</Label>
              <Input
                type="date"
                value={customEventDate}
                onChange={(e) => setCustomEventDate(e.target.value)}
                className="text-xs bg-background"
              />
            </div>

            <div className="grid gap-1.5">
              <Label className="text-xs font-semibold">Détail ou note :</Label>
              <Input
                value={customEventNote}
                onChange={(e) => setCustomEventNote(e.target.value)}
                placeholder="ex: Rappel téléphonique avec le RH"
                className="text-xs bg-background"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCustomEventModalOpen(false)}
            >
              Annuler
            </Button>
            <Button size="sm" onClick={handleAddCustomEvent}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
