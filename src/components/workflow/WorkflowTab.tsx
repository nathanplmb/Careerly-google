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
    const newStatut = targetConfig.statutLabel;

    // Créer ou mettre à jour l'événement lié
    const newEvent: WorkflowEvent = {
      id: `evt-${selectedTargetStep}-${Date.now()}`,
      type: selectedTargetStep,
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
      createdAt: new Date().toISOString(),
    };

    // Mettre à jour la liste des événements
    // Si un événement de même type existait déjà, on le remplace ou on l'ajoute
    const otherEvents = events.filter((e) => e.type !== selectedTargetStep);
    const updatedEvents = [...otherEvents, newEvent].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    // Mettre à jour les champs synchronisés
    const patch: Partial<Candidature> = {
      currentWorkflowStep: selectedTargetStep,
      statut: newStatut,
      status: newStatut,
      workflowEvents: updatedEvents,
    };

    // Synchronisation des dates dérivées
    if (selectedTargetStep === "saved") {
      patch.savedAt = stepDate;
    } else if (selectedTargetStep === "to_prepare") {
      patch.preparedAt = stepDate;
    } else if (selectedTargetStep === "application_sent") {
      patch.appliedAt = stepDate;
      patch.dateEnvoi = stepDate;
      if (stepChannel) patch.source = stepChannel;
    } else if (selectedTargetStep === "follow_up") {
      patch.followUpDate = stepDate;
      patch.dateRelance = stepDate;
    } else if (selectedTargetStep === "interview") {
      patch.interviewDate = stepDate;
      patch.dateDernierContact = stepDate;
      patch.lastContactDate = stepDate;
      if (stepInterlocuteur.trim()) patch.contact = stepInterlocuteur.trim();
    } else if (selectedTargetStep === "second_interview") {
      patch.secondInterviewDate = stepDate;
      patch.dateDernierContact = stepDate;
      patch.lastContactDate = stepDate;
      if (stepInterlocuteur.trim()) patch.contact = stepInterlocuteur.trim();
    } else if (selectedTargetStep === "offer_received") {
      patch.offerReceivedAt = stepDate;
    } else if (selectedTargetStep === "accepted") {
      patch.acceptedAt = stepDate;
    } else if (selectedTargetStep === "rejected") {
      patch.rejectedAt = stepDate;
    }

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
          ? orderedRemaining[orderedRemaining.length - 1].key
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
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Étape actuelle du workflow
              </span>
              <Badge
                variant="outline"
                className={`text-xs px-2.5 py-0.5 font-semibold ${currentConfig.badgeColor}`}
              >
                {currentConfig.label}
              </Badge>
            </div>
            <p className="text-sm text-foreground font-medium">
              {currentConfig.description}
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center gap-2 flex-wrap">
            {currentConfig.nextStepKey && (
              <Button
                size="sm"
                className="gap-1.5 font-semibold text-xs h-9 shadow-xs"
                onClick={handleQuickAdvance}
              >
                <span>{currentConfig.defaultActionLabel}</span>
                <ArrowRight className="size-3.5" />
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-9"
              onClick={() => openChangeStepModal()}
            >
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
              <span>Changer d'étape</span>
            </Button>
          </div>
        </div>

        {/* Barre de progression visuelle discrète */}
        <div className="space-y-1.5 pt-1 border-t border-border/40">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Progression du processus</span>
            <span className="font-medium text-foreground">
              {currentConfig.isTerminal
                ? currentConfig.terminalType === "success"
                  ? "Offre acceptée"
                  : "Candidature refusée"
                : `Étape ${Math.max(1, currentStepIndex + 1)} sur 8`}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                currentConfig.key === "accepted"
                  ? "bg-emerald-500 w-full"
                  : currentConfig.key === "rejected"
                    ? "bg-destructive w-full"
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

      {/* 2. TIMELINE VERTICALE DU WORKFLOW */}
      <div className="p-4 sm:p-5 rounded-2xl bg-muted/15 border border-border/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Timeline de la candidature
            </h4>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Cliquez sur une étape pour changer ou ajuster les détails
          </span>
        </div>

        <div className="relative pl-3 sm:pl-4 space-y-6 before:absolute before:left-[19px] sm:before:left-[23px] before:top-3 before:bottom-3 before:w-0.5 before:bg-border/70">
          {WORKFLOW_STEPS_CONFIG.map((step, idx) => {
            const isCurrent = step.key === currentStepKey;
            const matchingEvents = events.filter((e) => e.type === step.key);
            const hasEvent = matchingEvents.length > 0;
            const latestEvent = matchingEvents[matchingEvents.length - 1];

            // État de l'étape
            let dotStyle =
              "border-muted-foreground/30 bg-background text-muted-foreground";
            let dotIcon = (
              <span className="size-1.5 rounded-full bg-muted-foreground/40" />
            );

            if (isCurrent) {
              if (step.key === "accepted") {
                dotStyle =
                  "border-emerald-500 bg-emerald-500 text-white ring-4 ring-emerald-500/20";
                dotIcon = <Check className="size-3.5 stroke-[2.5]" />;
              } else if (step.key === "rejected") {
                dotStyle =
                  "border-destructive bg-destructive text-white ring-4 ring-destructive/20";
                dotIcon = <XCircle className="size-3.5" />;
              } else {
                dotStyle =
                  "border-primary bg-primary text-primary-foreground ring-4 ring-primary/20";
                dotIcon = (
                  <div className="size-2 rounded-full bg-white animate-pulse" />
                );
              }
            } else if (hasEvent) {
              dotStyle = "border-primary/60 bg-primary/10 text-primary";
              dotIcon = <Check className="size-3" />;
            }

            return (
              <div
                key={step.key}
                className="relative flex items-start gap-3 sm:gap-4 group"
              >
                {/* Pastille sur la ligne verticale */}
                <button
                  type="button"
                  onClick={() => openChangeStepModal(step.key)}
                  title={`Passer à l'étape : ${step.label}`}
                  className={`relative z-10 flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 cursor-pointer ${dotStyle}`}
                >
                  {dotIcon}
                </button>

                {/* Contenu de l'étape */}
                <div
                  className={`flex-1 rounded-xl p-3 sm:p-3.5 transition-colors border ${
                    isCurrent
                      ? "bg-card border-primary/40 shadow-xs ring-1 ring-primary/20"
                      : hasEvent
                        ? "bg-card/70 border-border/70 hover:bg-card"
                        : "bg-transparent border-transparent hover:bg-card/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => openChangeStepModal(step.key)}
                        className="text-left font-semibold text-sm hover:text-primary transition-colors cursor-pointer"
                      >
                        {step.label}
                      </button>

                      {isCurrent && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-2 py-0 font-semibold bg-primary/15 text-primary border-primary/20"
                        >
                          Actuelle
                        </Badge>
                      )}

                      {latestEvent?.date && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                          <Calendar className="size-3" />
                          {formatDate(latestEvent.date)}
                        </span>
                      )}
                    </div>

                    {/* Actions de l'étape */}
                    <div className="flex items-center gap-1.5">
                      {hasEvent && latestEvent && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground hover:text-foreground"
                          onClick={() => handleOpenEditEvent(latestEvent)}
                          title="Modifier la date ou note"
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                      )}

                      {!isCurrent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs px-2 text-muted-foreground hover:text-primary"
                          onClick={() => openChangeStepModal(step.key)}
                        >
                          <span>Définir</span>
                          <ChevronRight className="size-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Description ou Détails de l'événement */}
                  <p className="text-xs text-muted-foreground mt-1">
                    {latestEvent?.note || step.description}
                  </p>

                  {/* Badges contextuels selon l'étape */}
                  {hasEvent && latestEvent && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-border/40">
                      {latestEvent.channel && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0 bg-muted/40 font-medium"
                        >
                          Canal : {latestEvent.channel}
                        </Badge>
                      )}
                      {latestEvent.interviewType && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0 bg-muted/40 font-medium"
                        >
                          Format : {latestEvent.interviewType}
                        </Badge>
                      )}
                      {latestEvent.interlocuteur && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0 bg-muted/40 font-medium flex items-center gap-1"
                        >
                          <User className="size-2.5" />
                          {latestEvent.interlocuteur}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT RECRUTEUR & INTERLOCUTEUR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="size-4 text-primary" />
            <Label
              htmlFor="workflowContactInput"
              className="text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer"
            >
              Contact recruteur / Interlocuteur
            </Label>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Coordonnées des interlocuteurs du recrutement
          </span>
        </div>

        <Input
          id="workflowContactInput"
          value={candidature.contact || ""}
          onChange={(e) => onChange({ contact: e.target.value })}
          placeholder="ex: Sophie Durand (RH) — s.durand@entreprise.com — 06 12 34 56 78"
          className="text-xs bg-background h-9"
        />
        <p className="text-[11px] text-muted-foreground">
          Ces coordonnées restent attachées à cette opportunité et sont
          réutilisées pour vos relances et convocations d'entretien.
        </p>
      </div>

      {/* 4. NOTES PERSONNELLES & IMPRESSIONS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4 text-primary" />
            <Label
              htmlFor="workflowNotesInput"
              className="text-xs font-bold uppercase tracking-wider text-foreground cursor-pointer"
            >
              Notes personnelles & Impressions
            </Label>
          </div>
          <span className="text-[11px] text-muted-foreground">
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
          className="text-xs bg-background resize-y leading-relaxed"
        />
      </div>

      {/* 5. HISTORIQUE DÉTAILLÉ DU JOURNAL DU WORKFLOW */}
      <div className="p-4 sm:p-5 rounded-2xl bg-muted/15 border border-border/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-muted-foreground" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Journal des événements ({events.length})
            </h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1"
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
          <p className="text-xs text-muted-foreground py-2">
            Aucun événement pour le moment.
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((evt) => {
              const cfg = getWorkflowStepConfig(evt.type);
              return (
                <div
                  key={evt.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-card border border-border/50 text-xs"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0 shrink-0 ${cfg.badgeColor}`}
                    >
                      {cfg.label}
                    </Badge>
                    <span className="font-mono text-muted-foreground shrink-0 text-[11px]">
                      {formatDate(evt.date)}
                    </span>
                    <span className="text-foreground truncate font-medium">
                      {evt.note || cfg.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-foreground"
                      onClick={() => handleOpenEditEvent(evt)}
                    >
                      <Edit2 className="size-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-destructive"
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-primary" />
              Changer l'étape du workflow
            </DialogTitle>
            <DialogDescription className="text-xs">
              Sélectionnez la nouvelle étape pour faire progresser cette
              opportunité. Vous pouvez revenir en arrière à tout moment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Grille des 9 étapes */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
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
                          : "border-border hover:bg-muted/40 text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{step.label}</span>
                        {isSelected && (
                          <Check className="size-3 shrink-0 ml-1" />
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
