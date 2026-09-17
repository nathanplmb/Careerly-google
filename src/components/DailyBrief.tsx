import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  Calendar,
  CalendarPlus,
  CalendarX,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  addDays,
  formatDate,
  todayIso,
  type Candidature,
} from "@/lib/candidatures";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  BriefActionId,
  BriefItem,
  DailyBriefInputData,
  OpportunityInputForBrief,
} from "@/ai/daily-brief/dailyBrief.types";
import {
  generateDeterministicDailyBrief,
  simplifyJobTitle,
} from "@/ai/daily-brief/dailyBrief.deterministic";

type DailyBriefProps = {
  items: Candidature[];
  userPrenom?: string;
  onOuvrir?: (
    item: Candidature,
    tab?: "offre" | "profil" | "entreprise" | "workflow",
  ) => void;
  onPatch?: (id: string, partial: Partial<Candidature>) => void;
  onRemove?: (id: string) => void;
  ready?: boolean;
};

/**
 * Palette sémantique sobre et élégante (accents subtils par catégorie) :
 * - CANDIDATURE : Violet (border, dot, badge, action directe)
 * - RELANCE : Bleu (border, dot, badge, action directe)
 * - ENTRETIEN : Orange / Ambre (border, dot, badge, action directe)
 * - DEADLINE : Rouge / Rose (border, dot, badge, action directe)
 * - OPPORTUNITÉ : Vert (border, dot, badge, action directe)
 */
function getCategoryVisuals(item: BriefItem) {
  const rawCat = (item.category || "").toLowerCase();
  const type = (item.type || "").toLowerCase();

  // 1. DEADLINE (Rouge / Rose)
  if (rawCat === "urgent" || type === "deadline") {
    return {
      label: item.categoryLabel || "DEADLINE",
      labelClass: "text-rose-400 font-semibold tracking-wider",
      dotClass: "bg-rose-500",
      borderAccentClass: "border-l-rose-500/80",
      ctaClass:
        "bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 border-rose-500/35",
    };
  }

  // 2. ENTRETIEN (Orange / Ambre)
  if (rawCat === "entretien" || type === "entretien") {
    return {
      label: item.categoryLabel || "ENTRETIEN",
      labelClass: "text-amber-400 font-semibold tracking-wider",
      dotClass: "bg-amber-500",
      borderAccentClass: "border-l-amber-500/80",
      ctaClass:
        "bg-amber-500/15 text-amber-200 hover:bg-amber-500/25 border-amber-500/35",
    };
  }

  // 3. RELANCE (Bleu / Ciel)
  if (rawCat === "relance" || type === "relance") {
    return {
      label: item.categoryLabel || "RELANCE",
      labelClass: "text-sky-400 font-semibold tracking-wider",
      dotClass: "bg-sky-500",
      borderAccentClass: "border-l-sky-500/80",
      ctaClass:
        "bg-sky-500/15 text-sky-200 hover:bg-sky-500/25 border-sky-500/35",
    };
  }

  // 4. DÉCISION / PROPOSITION (Ambre)
  if (rawCat === "decision") {
    return {
      label: item.categoryLabel || "DÉCISION",
      labelClass: "text-amber-400 font-semibold tracking-wider",
      dotClass: "bg-amber-500",
      borderAccentClass: "border-l-amber-500/80",
      ctaClass:
        "bg-amber-500/15 text-amber-200 hover:bg-amber-500/25 border-amber-500/35",
    };
  }

  // 5. OPPORTUNITÉ (Vert / Émeraude)
  if (type === "opportunite" || item.categoryLabel === "OPPORTUNITÉ") {
    return {
      label: item.categoryLabel || "OPPORTUNITÉ",
      labelClass: "text-emerald-400 font-semibold tracking-wider",
      dotClass: "bg-emerald-500",
      borderAccentClass: "border-l-emerald-500/80",
      ctaClass:
        "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 border-emerald-500/35",
    };
  }

  // 6. CANDIDATURE / PRÉPARATION (Violet)
  return {
    label: item.categoryLabel || "CANDIDATURE",
    labelClass: "text-purple-400 font-semibold tracking-wider",
    dotClass: "bg-purple-500",
    borderAccentClass: "border-l-purple-500/80",
    ctaClass:
      "bg-purple-500/15 text-purple-200 hover:bg-purple-500/25 border-purple-500/35",
  };
}

/**
 * Hiérarchie d'affichage propre : Entreprise · Rôle court ou contexte temporel
 * Exemples :
 * - JobTeaser · AI Growth Ops
 * - Theodo FinTech · demain à 14h
 * - L'Oréal · il y a 8 jours
 * - Decathlon · dans 2 jours
 */
function getActionHeadline(
  item: BriefItem,
  company: string,
  shortRole?: string | null,
): { company: string; detail?: string } {
  const type = (item.type || "").toLowerCase();
  const rawCat = (item.category || "").toLowerCase();

  // Relance : L'Oréal · il y a 8 jours
  if (type === "relance" || rawCat === "relance") {
    return {
      company,
      detail: item.dateContext
        ? item.dateContext.toLowerCase()
        : shortRole || undefined,
    };
  }

  // Entretien : Theodo FinTech · demain à 14h
  if (type === "entretien" || rawCat === "entretien") {
    return {
      company,
      detail: item.dateContext
        ? item.dateContext.toLowerCase()
        : shortRole || undefined,
    };
  }

  // Deadline : Decathlon · dans 2 jours
  if (type === "deadline" || rawCat === "urgent") {
    return {
      company,
      detail: item.dateContext
        ? item.dateContext.toLowerCase()
        : shortRole || undefined,
    };
  }

  // Candidature / Opportunité : JobTeaser · AI Growth Ops
  return {
    company,
    detail: shortRole || undefined,
  };
}

/**
 * Génération du sous-titre dynamique et contextuel pour le Daily Brief.
 */
function getDynamicSubtitle(actions: BriefItem[]): string {
  const count = actions.length;
  if (count === 0) {
    return "Rien d'urgent aujourd'hui.";
  }

  const deadlines = actions.filter((a) => a.type === "deadline");
  const entretiens = actions.filter((a) => a.type === "entretien");
  const relances = actions.filter((a) => a.type === "relance");
  const candidatures = actions.filter((a) => a.type === "preparation");

  if (count === 1) {
    if (entretiens.length === 1 && entretiens[0]) {
      const e = entretiens[0];
      if (e.dateContext === "Aujourd'hui") {
        return "Votre entretien a lieu aujourd'hui.";
      }
      if (e.dateContext === "Demain") {
        return "Votre entretien approche demain.";
      }
      return "Une préparation d'entretien mérite votre attention.";
    }
    if (deadlines.length === 1 && deadlines[0]) {
      const d = deadlines[0];
      if (d.dateContext === "Échue") {
        return "Une date limite est arrivée à échéance.";
      }
      if (d.dateContext === "Aujourd'hui" || d.dateContext === "Demain") {
        return "Une échéance approche à grands pas.";
      }
      return "Une échéance approche.";
    }
    if (relances.length === 1) {
      return "Une relance mérite d'être effectuée.";
    }
    if (candidatures.length === 1 && candidatures[0]) {
      if (candidatures[0].dateContext === "Dossier prêt") {
        return "Votre candidature est prête à partir.";
      }
      return "Une chose mérite votre attention aujourd'hui.";
    }
    return "Une chose mérite votre attention aujourd'hui.";
  }

  if (count === 2) {
    if (deadlines.length === 2) {
      return "2 échéances approchent.";
    }
    if (entretiens.length >= 1 && deadlines.length >= 1) {
      return "Un entretien et une échéance nécessitent votre attention.";
    }
    if (relances.length === 2) {
      return "2 relances sont à effectuer.";
    }
    return "2 actions nécessitent votre attention.";
  }

  // count === 3
  if (deadlines.length >= 2) {
    return "Plusieurs échéances approchent.";
  }
  return "3 actions nécessitent votre attention.";
}

function getActionIcon(actionId: BriefActionId) {
  switch (actionId) {
    case "GENERATE_EMAIL":
      return <Mail className="size-3.5" />;
    case "OPEN_CONTACT":
      return <User className="size-3.5" />;
    case "OPEN_COMPANY":
      return <Building2 className="size-3.5" />;
    case "OPEN_CALENDAR":
      return <Calendar className="size-3.5" />;
    case "VIEW_OPPORTUNITY":
    case "APPLY_NOW":
      return <ExternalLink className="size-3.5" />;
    case "VIEW_NOTES":
    case "ANALYZE_OFFER":
      return <FileText className="size-3.5" />;
    case "DEADLINE_EXTEND_7":
    case "DEADLINE_EXTEND_14":
      return <CalendarPlus className="size-3.5" />;
    case "DEADLINE_REMOVE":
      return <CalendarX className="size-3.5" />;
    case "UPDATE_DEADLINE":
    case "VERIFY_DEADLINE":
    case "PLAN_TOMORROW":
    case "PLAN_LATER":
      return <Clock className="size-3.5" />;
    case "KEEP_OPPORTUNITY":
    case "MARK_APPLIED":
    case "MARK_FOLLOW_UP":
      return <Check className="size-3.5" />;
    case "DELETE_OPPORTUNITY":
      return <Trash2 className="size-3.5" />;
    case "PREPARE_APPLICATION":
    case "CONTINUE_APPLICATION":
    case "PREPARE_INTERVIEW":
      return <Sparkles className="size-3.5" />;
    default:
      return <ArrowRight className="size-3.5" />;
  }
}

export function DailyBrief({
  items,
  userPrenom,
  onOuvrir,
  onPatch,
  onRemove,
  ready = true,
}: DailyBriefProps) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modales d'actions directes
  const [deadlineModalItem, setDeadlineModalItem] =
    useState<Candidature | null>(null);
  const [newDeadlineValue, setNewDeadlineValue] = useState("");

  const [deleteCandidate, setDeleteCandidate] = useState<Candidature | null>(
    null,
  );

  // Modale assistant d'email / relance
  const [emailModalData, setEmailModalData] = useState<{
    cand: Candidature;
    item: BriefItem;
  } | null>(null);

  // Préparation de l'entrée enrichie
  const inputData: DailyBriefInputData = useMemo(() => {
    // Recalcule la date du jour à chaque cycle de refresh
    void refreshTrigger;
    const currentDate = todayIso();

    const opps: OpportunityInputForBrief[] = items.map((c) => ({
      id: c.id,
      entreprise: c.entreprise || c.company || c.companyName || "",
      poste: c.poste || c.title || "",
      statut: c.statut || "Sauvegardée",
      lieu: c.lieu || c.location || undefined,
      lien: c.lien || null,
      applicationDeadline: c.applicationDeadline || c.dateLimite || null,
      dateLimite: c.dateLimite || c.applicationDeadline || null,
      appliedAt: c.appliedAt || c.dateEnvoi || null,
      dateEnvoi: c.dateEnvoi || c.appliedAt || null,
      followUpDate: c.followUpDate || c.dateRelance || null,
      dateRelance: c.dateRelance || c.followUpDate || null,
      lastContactDate: c.lastContactDate || c.dateDernierContact || null,
      interviewDate: c.interviewDate || null,
      secondInterviewDate: c.secondInterviewDate || null,
      currentWorkflowStep: c.currentWorkflowStep || null,
      savedAt: c.savedAt || null,
      preparedAt: c.preparedAt || null,
      offerReceivedAt: c.offerReceivedAt || null,
      acceptedAt: c.acceptedAt || null,
      rejectedAt: c.rejectedAt || null,
      notes: c.commentaire || c.personalNotes || null,
      hasArguments: Boolean(
        c.preparation?.pourquoiEntreprise?.trim() ||
        c.preparation?.pourquoiPoste?.trim() ||
        c.preparation?.notes?.trim(),
      ),
      isPrepared:
        Boolean(c.preparedAt) ||
        (Boolean(c.preparation?.pourquoiEntreprise?.trim()) &&
          Boolean(c.preparation?.pourquoiPoste?.trim())),
      hasContact: Boolean(c.contact),
      contactNom:
        c.contact && !c.contact.includes("@") && !c.contact.startsWith("http")
          ? c.contact
          : undefined,
      contactEmail:
        c.contact && c.contact.includes("@") ? c.contact : undefined,
      archive: Boolean(c.archive),
    }));

    return {
      userPrenom,
      currentDate,
      opportunities: opps,
    };
  }, [items, userPrenom, refreshTrigger]);

  // Génération déterministe immédiate et intelligente
  const brief = useMemo(() => {
    return generateDeterministicDailyBrief(inputData);
  }, [inputData]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Actions actualisées.");
    }, 220);
  };

  const handleExecuteAction = (actionId: BriefActionId, item: BriefItem) => {
    const cand = item.opportunityId
      ? items.find((c) => c.id === item.opportunityId)
      : null;

    switch (actionId) {
      case "VIEW_OPPORTUNITY":
      case "ANALYZE_OFFER":
        if (cand && onOuvrir) {
          onOuvrir(cand, "offre");
        } else {
          navigate({ to: "/opportunites" });
        }
        break;

      case "APPLY_NOW":
        if (cand && onPatch) {
          const now = todayIso();
          if (cand.lien && cand.lien.trim().startsWith("http")) {
            window.open(cand.lien, "_blank", "noopener,noreferrer");
          }
          onPatch(cand.id, {
            statut: "Candidature envoyée",
            dateEnvoi: now,
            appliedAt: now,
          });
          toast.success(`Candidature envoyée pour ${cand.entreprise}.`);
        } else if (cand && onOuvrir) {
          onOuvrir(cand, "workflow");
        } else {
          navigate({ to: "/opportunites" });
        }
        break;

      case "PREPARE_APPLICATION":
      case "CONTINUE_APPLICATION":
      case "PREPARE_INTERVIEW":
        if (cand && onOuvrir) {
          onOuvrir(cand, "workflow");
        } else {
          navigate({ to: "/opportunites" });
        }
        break;

      case "VIEW_NOTES":
        if (cand && onOuvrir) {
          onOuvrir(cand, "profil");
        } else {
          navigate({ to: "/opportunites" });
        }
        break;

      case "PLAN_FOLLOW_UP":
        if (cand && onOuvrir) {
          onOuvrir(cand, "workflow");
        } else {
          navigate({ to: "/opportunites" });
        }
        break;

      case "GENERATE_EMAIL":
        if (cand) {
          setEmailModalData({ cand, item });
        } else {
          toast.error("Opportunité introuvable.");
        }
        break;

      case "DEADLINE_EXTEND_7":
        if (cand && onPatch) {
          const base =
            cand.dateLimite || cand.applicationDeadline || todayIso();
          const nextDate = addDays(base, 7);
          onPatch(cand.id, {
            dateLimite: nextDate,
            applicationDeadline: nextDate,
          });
          toast.success(
            `Date limite prolongée au ${formatDate(nextDate)} pour ${cand.entreprise}.`,
          );
        }
        break;

      case "DEADLINE_EXTEND_14":
        if (cand && onPatch) {
          const base =
            cand.dateLimite || cand.applicationDeadline || todayIso();
          const nextDate = addDays(base, 14);
          onPatch(cand.id, {
            dateLimite: nextDate,
            applicationDeadline: nextDate,
          });
          toast.success(
            `Date limite prolongée au ${formatDate(nextDate)} pour ${cand.entreprise}.`,
          );
        }
        break;

      case "DEADLINE_REMOVE":
      case "KEEP_OPPORTUNITY":
        if (cand && onPatch) {
          onPatch(cand.id, {
            dateLimite: "",
            applicationDeadline: "",
          });
          toast.success(`Date limite supprimée pour ${cand.entreprise}.`);
        }
        break;

      case "UPDATE_DEADLINE":
      case "VERIFY_DEADLINE":
        if (cand) {
          setDeadlineModalItem(cand);
          setNewDeadlineValue(
            cand.dateLimite || cand.applicationDeadline || todayIso(),
          );
        } else {
          navigate({ to: "/opportunites" });
        }
        break;

      case "DELETE_OPPORTUNITY":
        if (cand) {
          setDeleteCandidate(cand);
        }
        break;

      case "MARK_APPLIED":
        if (cand && onPatch) {
          const now = todayIso();
          onPatch(cand.id, {
            statut: "Candidature envoyée",
            dateEnvoi: now,
            appliedAt: now,
          });
          toast.success(
            `Candidature marquée comme envoyée pour ${cand.entreprise}.`,
          );
        }
        break;

      case "MARK_FOLLOW_UP":
        if (cand && onPatch) {
          const now = todayIso();
          onPatch(cand.id, {
            statut: "Relancée",
            dateRelance: now,
            followUpDate: now,
          });
          toast.success(
            `Candidature marquée comme relancée auprès de ${cand.entreprise}.`,
          );
        }
        break;

      case "PLAN_TOMORROW":
        if (cand && onPatch) {
          const demain = addDays(todayIso(), 1);
          onPatch(cand.id, {
            followUpDate: demain,
            dateRelance: demain,
          });
          toast.success(
            `Rappel programmé pour demain pour ${cand.entreprise}.`,
          );
        }
        break;

      case "PLAN_LATER":
        if (cand && onPatch) {
          const dans3j = addDays(todayIso(), 3);
          onPatch(cand.id, {
            followUpDate: dans3j,
            dateRelance: dans3j,
          });
          toast.success(
            `Rappel programmé dans 3 jours pour ${cand.entreprise}.`,
          );
        }
        break;

      case "OPEN_CONTACT":
        navigate({ to: "/contacts" });
        break;

      case "OPEN_COMPANY":
        if (cand && onOuvrir) {
          onOuvrir(cand, "entreprise");
        } else {
          navigate({ to: "/entreprises" });
        }
        break;

      case "OPEN_CALENDAR":
        navigate({ to: "/calendrier" });
        break;

      default:
        if (cand && onOuvrir) {
          onOuvrir(cand, "offre");
        } else {
          navigate({ to: "/opportunites" });
        }
        break;
    }
  };

  const handleSaveNewDeadline = () => {
    if (deadlineModalItem && onPatch) {
      onPatch(deadlineModalItem.id, {
        dateLimite: newDeadlineValue,
        applicationDeadline: newDeadlineValue,
      });
      toast.success(
        newDeadlineValue
          ? `Date limite mise à jour pour ${deadlineModalItem.entreprise}.`
          : `Date limite supprimée pour ${deadlineModalItem.entreprise}.`,
      );
      setDeadlineModalItem(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate && onRemove) {
      onRemove(deleteCandidate.id);
      toast.success(`Opportunité ${deleteCandidate.entreprise} supprimée.`);
      setDeleteCandidate(null);
    }
  };

  const handleCopyEmail = (subject: string, body: string) => {
    const fullText = `Objet : ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText);
    toast.success("Email copié dans le presse-papier !");
  };

  const handleMarkFollowUpSent = () => {
    if (emailModalData && onPatch) {
      const now = todayIso();
      onPatch(emailModalData.cand.id, {
        statut: "Relancée",
        dateRelance: now,
        followUpDate: now,
      });
      toast.success(
        `Candidature marquée comme relancée auprès de ${emailModalData.cand.entreprise}.`,
      );
      setEmailModalData(null);
    }
  };

  if (!ready) {
    return null;
  }

  const actions = brief.today.slice(0, 3);
  const totalActions = actions.length;
  const dynamicSubtitle = getDynamicSubtitle(actions);

  return (
    <>
      <section
        id="daily-brief-module"
        className="rounded-xl border border-border/30 bg-card/25 p-5 sm:p-6 transition-all"
        suppressHydrationWarning
      >
        {/* En-tête sobre : Titre, nombre d'actions et actualisation */}
        <header className="flex items-start justify-between gap-4 pb-4 border-b border-border/25">
          <div>
            <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
              À faire aujourd'hui
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground font-normal">
              {totalActions === 0
                ? "Tout est à jour."
                : totalActions === 1
                  ? "1 action nécessite votre attention."
                  : `${totalActions} actions nécessitent votre attention.`}
            </p>
          </div>

          <Button
            id="daily-brief-refresh-button"
            variant="ghost"
            size="sm"
            disabled={isRefreshing}
            onClick={handleManualRefresh}
            className="h-8 gap-1.5 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-lg transition-colors shrink-0"
          >
            <RefreshCw
              className={cn(
                "size-3.5",
                isRefreshing && "animate-spin text-primary",
              )}
            />
            <span>Actualiser</span>
          </Button>
        </header>

        {/* État positif lorsque tout est à jour */}
        {totalActions === 0 ? (
          <div
            id="daily-brief-empty-state"
            className="py-10 text-center flex flex-col items-center justify-center gap-2.5"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="size-3.5" />
              <span>Tout est à jour</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm font-normal">
              Aucune action urgente pour le moment.
            </p>
            <Button
              id="daily-brief-see-opportunities"
              size="sm"
              variant="outline"
              onClick={() => navigate({ to: "/opportunites" })}
              className="mt-2 h-8 px-3 text-xs font-medium rounded-lg gap-1.5 border-border/60 hover:bg-accent/40"
            >
              <span>Voir mes opportunités</span>
              <ArrowRight className="size-3" />
            </Button>
          </div>
        ) : (
          /* Liste d'actions directes avec séparateurs épurés et accents sobres */
          <div
            id="daily-brief-actions-list"
            className="divide-y divide-border/25"
          >
            {actions.map((item) => {
              const cand = item.opportunityId
                ? items.find((c) => c.id === item.opportunityId)
                : null;
              const displayCompany =
                cand?.entreprise || item.company || "Entreprise";
              const shortRole =
                item.shortRole ||
                simplifyJobTitle(cand?.poste || cand?.title || null);
              const visuals = getCategoryVisuals(item);
              const headline = getActionHeadline(
                item,
                displayCompany,
                shortRole,
              );

              const primaryAction = item.primaryAction ||
                item.recommendedActions[0] || {
                  id: "VIEW_OPPORTUNITY",
                  label: item.actionLabel || "Agir →",
                };

              const secondaryActions = (
                item.secondaryActions && item.secondaryActions.length > 0
                  ? item.secondaryActions
                  : item.recommendedActions.slice(1)
              ).filter((sec) => sec.id !== primaryAction.id);

              return (
                <article
                  key={item.id}
                  id={`daily-brief-action-${item.id}`}
                  className={cn(
                    "py-5 first:pt-4 last:pb-2 border-l-2 pl-4 flex flex-col gap-2 transition-colors",
                    visuals.borderAccentClass,
                  )}
                >
                  {/* Ligne 1 : Type d'action (● CANDIDATURE) */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    <span
                      className={cn(
                        "size-2 rounded-full shrink-0",
                        visuals.dotClass,
                      )}
                    />
                    <span className={visuals.labelClass}>{visuals.label}</span>
                  </div>

                  {/* Ligne 2 : Entreprise · Rôle court ou contexte temporel */}
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="text-base sm:text-[17px] font-semibold tracking-tight text-foreground">
                      {headline.company}
                    </h3>
                    {headline.detail && (
                      <span className="text-xs sm:text-sm text-muted-foreground/85 font-normal">
                        · {headline.detail}
                      </span>
                    )}
                  </div>

                  {/* Ligne 3 : Phrase courte, directe et humaine */}
                  <p className="text-xs sm:text-[13.5px] text-muted-foreground font-normal leading-relaxed">
                    {item.message}
                  </p>

                  {/* Ligne 4 : Bouton principal d'action directe + Menu secondaire [ ••• ] */}
                  <div className="pt-1 flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleExecuteAction(primaryAction.id, item)
                      }
                      className={cn(
                        "h-8.5 px-3.5 text-xs font-medium gap-1.5 rounded-lg border transition-colors shadow-xs",
                        visuals.ctaClass,
                      )}
                    >
                      <span>{primaryAction.label}</span>
                    </Button>

                    {secondaryActions.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8.5 w-8.5 p-0 rounded-lg border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/40"
                            aria-label="Actions secondaires"
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-52 rounded-xl border border-border/60 bg-popover/95 p-1 backdrop-blur-md shadow-lg"
                        >
                          {secondaryActions.map((sec, sIdx) => (
                            <DropdownMenuItem
                              key={`${sec.id}-${sIdx}`}
                              onClick={() => handleExecuteAction(sec.id, item)}
                              className={cn(
                                "flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-accent/50",
                                sec.variant === "destructive" &&
                                  "text-rose-500 focus:text-rose-500 focus:bg-rose-500/10",
                              )}
                            >
                              {getActionIcon(sec.id)}
                              <span>{sec.label}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Modale d'assistant email de relance */}
      <Dialog
        open={Boolean(emailModalData)}
        onOpenChange={(open) => {
          if (!open) setEmailModalData(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="size-4 text-sky-500" />
              <span>Assistant Email — Relance</span>
            </DialogTitle>
            <DialogDescription>
              Modèle d'email personnalisé prêt à l'emploi pour{" "}
              <strong>{emailModalData?.cand.entreprise}</strong>.
            </DialogDescription>
          </DialogHeader>

          {emailModalData && (
            <div className="space-y-3.5 py-2">
              {(() => {
                const c = emailModalData.cand;
                const contactPrenom = c.contact
                  ? c.contact.split(" ")[0]
                  : "";
                const dateEnvStr = c.dateEnvoi ? formatDate(c.dateEnvoi) : "";

                const subject =
                  `Relance candidature — ${c.poste || "Candidature"} — ${userPrenom || ""}`.trim();
                const body = [
                  `Bonjour${contactPrenom ? " " + contactPrenom : ""},`,
                  "",
                  `Je me permets de revenir vers vous concernant ma candidature pour le poste de ${c.poste || "ce rôle"} chez ${c.entreprise}${dateEnvStr ? `, transmise le ${dateEnvStr}` : ""}.`,
                  "",
                  "Toujours vivement motivé(e) par cette opportunité et par les perspectives de vos équipes, je souhaitais savoir si vous aviez pu étudier mon profil ou si vous désiriez des précisions complémentaires.",
                  "",
                  "Je reste à votre entière disposition pour tout échange.",
                  "",
                  "Bien cordialement,",
                  userPrenom || "",
                ].join("\n");

                return (
                  <>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Objet
                      </Label>
                      <Input
                        readOnly
                        value={subject}
                        className="mt-1 font-mono text-xs bg-muted/30"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Corps de l'email
                      </Label>
                      <Textarea
                        readOnly
                        rows={7}
                        value={body}
                        className="mt-1 font-sans text-xs bg-muted/30 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyEmail(subject, body)}
                        className="gap-1.5 text-xs h-8"
                      >
                        <Copy className="size-3.5" />
                        <span>Copier l'email</span>
                      </Button>

                      <Button
                        type="button"
                        size="sm"
                        onClick={handleMarkFollowUpSent}
                        className="gap-1.5 text-xs h-8 bg-sky-600 hover:bg-sky-700 text-white"
                      >
                        <Check className="size-3.5" />
                        <span>Marquer comme relancée</span>
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEmailModalData(null)}
              className="text-xs"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modale d'édition rapide de date limite */}
      <Dialog
        open={Boolean(deadlineModalItem)}
        onOpenChange={(open) => {
          if (!open) setDeadlineModalItem(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mettre à jour la date limite</DialogTitle>
            <DialogDescription>
              {deadlineModalItem?.entreprise}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="quick-deadline-input" className="text-xs">
                Nouvelle date limite de candidature
              </Label>
              <Input
                id="quick-deadline-input"
                type="date"
                value={newDeadlineValue}
                onChange={(e) => setNewDeadlineValue(e.target.value)}
                className="mt-1.5"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Raccourcis :
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewDeadlineValue(addDays(todayIso(), 7))}
                className="h-6 rounded-md text-[11px]"
              >
                +7 jours
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNewDeadlineValue(addDays(todayIso(), 14))}
                className="h-6 rounded-md text-[11px]"
              >
                +14 jours
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setNewDeadlineValue("")}
                className="h-6 rounded-md text-[11px] text-muted-foreground"
              >
                Pas de deadline
              </Button>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeadlineModalItem(null)}
            >
              Annuler
            </Button>
            <Button size="sm" onClick={handleSaveNewDeadline}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation de suppression */}
      <AlertDialog
        open={Boolean(deleteCandidate)}
        onOpenChange={(open) => {
          if (!open) setDeleteCandidate(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette opportunité ?</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous vraiment supprimer l'opportunité{" "}
              <strong>{deleteCandidate?.entreprise}</strong> ? Cette action est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
