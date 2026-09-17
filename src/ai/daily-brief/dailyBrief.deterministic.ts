import {
  type DailyBriefData,
  type DailyBriefInputData,
  type BriefItem,
  type BriefActionItem,
} from "./dailyBrief.types";

/**
 * Nettoyage et raccourcissement des intitulés de postes pour le Daily Brief.
 * Supprime les mentions redondantes (ex: "(H/F)", "- Stage...", "- CDI...", durées).
 */
export function simplifyJobTitle(title?: string | null): string {
  if (!title) return "";
  let clean = title.trim();

  // Supprime les mentions de parité (H/F), (H/F/X), (F/H), [H/F], etc.
  clean = clean.replace(/\s*\([HhFfMmXx/+\s-]+\)/g, "");
  clean = clean.replace(/\s*\[[HhFfMmXx/+\s-]+\]/g, "");

  // Supprime les suffixes contractuels ou géographiques après un tiret ou slash
  clean = clean.replace(
    /\s*[-–—|/]\s*(stage|internship|intern|cdd|cdi|alternance|apprentissage|graduate program|full-?time|part-?time|remote|paris|france|h\/f|f\/h|h\/f\/x)[\s\S]*$/i,
    "",
  );

  // Supprime les parenthèses de type (Stage 6 mois), (CDI), (Alternance)
  clean = clean.replace(
    /\s*\((?:stage|internship|cdd|cdi|alternance|apprentissage|durée|\d+\s*mois)[\s\S]*?\)/i,
    "",
  );

  // Supprime les fins de type " - 6 mois"
  clean = clean.replace(/\s*[-–—|/]\s*\d+[\s\S]*$/i, "");

  clean = clean.trim();
  if (clean.length > 34) {
    clean = clean.slice(0, 34).trim() + "…";
  }
  return clean || title.trim();
}

/**
 * Calcul déterministe de la différence en jours entre deux dates ISO (YYYY-MM-DD).
 * Renvoie target - current (ex: si target = demain, diff = 1).
 */
function calculateDaysDiff(
  current: string,
  target?: string | null,
): number | null {
  if (!target) return null;
  const c = new Date(current.slice(0, 10) + "T00:00:00");
  const t = new Date(target.slice(0, 10) + "T00:00:00");
  if (isNaN(c.getTime()) || isNaN(t.getTime())) return null;
  const diffTime = t.getTime() - c.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Moteur déterministe pour le Daily Brief de NACORA.
 *
 * Principes stricts de la secrétaire de carrière :
 * 1. 1 à 3 actions maximum (jamais de remplissage artificiel).
 * 2. Nom de l'entreprise prioritaire + poste court simplifié.
 * 3. Ton humain, concis, direct et professionnel.
 * 4. Une action principale claire + menu d'actions secondaires contextuelles.
 * 5. Zéro information inventée.
 */
export function generateDeterministicDailyBrief(
  input: DailyBriefInputData,
  isFallback = false,
): DailyBriefData {
  const { userPrenom, currentDate, opportunities, calendarEvents = [] } = input;

  const greeting = userPrenom ? `Bonjour ${userPrenom}.` : "Bonjour.";

  type ScoredCandidate = BriefItem & { score: number };
  const candidates: ScoredCandidate[] = [];

  const closedStatuses = [
    "Refus",
    "Refusée",
    "Sans suite",
    "Offre refusée",
    "Archive",
  ];
  const activeStatuses = [
    "Sauvegardée",
    "À préparer",
    "À étudier",
    "À candidater",
    "Candidature envoyée",
    "Relancée",
    "Entretien",
    "Deuxième entretien",
    "Offre reçue",
  ];

  for (const opp of opportunities) {
    if (opp.archive) continue;

    const company = (opp.entreprise || "Opportunité").trim();
    const shortRole = simplifyJobTitle(opp.poste || opp.titre);
    const deadline = opp.applicationDeadline || opp.dateLimite;
    const relance = opp.followUpDate || opp.dateRelance;
    const entretien = opp.interviewDate || opp.secondInterviewDate;
    const isClosed = closedStatuses.includes(opp.statut);
    const isActive = activeStatuses.includes(opp.statut);
    const contactName = opp.contactNom?.trim() || "";
    const hasContact = Boolean(opp.hasContact || contactName);

    const isApplied =
      opp.statut === "Candidature envoyée" ||
      opp.statut === "Relancée" ||
      opp.statut === "Entretien" ||
      opp.statut === "Deuxième entretien" ||
      opp.statut === "Offre reçue";

    const isReadyToSend =
      opp.statut === "À candidater" || Boolean(opp.preparedAt);

    // ==========================================
    // 1. ENTRETIENS (AUJOURD'HUI & DEMAIN & PROCHE)
    // ==========================================
    if (entretien && isActive) {
      const diff = calculateDaysDiff(currentDate, entretien);
      if (diff === 0) {
        const primaryAction: BriefActionItem = {
          id: "PREPARE_APPLICATION",
          label: "Préparer l'entretien →",
          variant: "default",
        };
        const secondaryActions: BriefActionItem[] = [
          { id: "VIEW_NOTES", label: "Voir mes notes" },
          { id: "OPEN_CALENDAR", label: "Voir dans l'agenda" },
          { id: "VIEW_OPPORTUNITY", label: "Voir la candidature" },
          { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
        ];

        candidates.push({
          id: `entretien-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          category: "entretien",
          categoryLabel: "ENTRETIEN",
          title: company,
          company,
          shortRole,
          date: entretien,
          dateContext: "Aujourd'hui",
          priority: "high",
          message: "Votre entretien a lieu aujourd'hui.",
          reason: "Entretien prévu aujourd'hui",
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: "prepare",
          score: 125,
        });
      } else if (diff === 1) {
        const primaryAction: BriefActionItem = {
          id: "PREPARE_APPLICATION",
          label: "Préparer l'entretien →",
          variant: "default",
        };
        const secondaryActions: BriefActionItem[] = [
          { id: "VIEW_NOTES", label: "Voir mes notes" },
          { id: "OPEN_CALENDAR", label: "Voir dans l'agenda" },
          { id: "VIEW_OPPORTUNITY", label: "Voir la candidature" },
          { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
        ];

        candidates.push({
          id: `entretien-demain-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          category: "entretien",
          categoryLabel: "ENTRETIEN",
          title: company,
          company,
          shortRole,
          date: entretien,
          dateContext: "Demain",
          priority: "high",
          message: "Votre entretien est demain.",
          reason: "Entretien prévu demain",
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: "prepare",
          score: 115,
        });
      } else if (diff !== null && diff >= 2 && diff <= 4) {
        const primaryAction: BriefActionItem = {
          id: "PREPARE_APPLICATION",
          label: "Préparer l'entretien →",
          variant: "default",
        };
        const secondaryActions: BriefActionItem[] = [
          { id: "VIEW_NOTES", label: "Voir mes notes" },
          { id: "OPEN_CALENDAR", label: "Voir dans l'agenda" },
          { id: "VIEW_OPPORTUNITY", label: "Voir la candidature" },
          { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
        ];

        candidates.push({
          id: `entretien-proche-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          category: "entretien",
          categoryLabel: "ENTRETIEN",
          title: company,
          company,
          shortRole,
          date: entretien,
          dateContext: `Dans ${diff} jours`,
          priority: "high",
          message: "Votre entretien approche.",
          reason: `Entretien prévu dans ${diff} jours`,
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: "prepare",
          score: 95,
        });
      }
    }

    // ==========================================
    // 2. DEADLINES (AUJOURD'HUI & DEMAIN & PROCHES & DÉPASSÉES)
    // ==========================================
    if (deadline && !isClosed && !isApplied) {
      const diff = calculateDaysDiff(currentDate, deadline);

      if (diff === 0) {
        // Deadline AUJOURD'HUI
        const primaryAction: BriefActionItem = isReadyToSend
          ? {
              id: "APPLY_NOW",
              label: `Postuler chez ${company} →`,
              variant: "default",
            }
          : {
              id: "PREPARE_APPLICATION",
              label: "Finaliser ma candidature →",
              variant: "default",
            };

        const secondaryActions: BriefActionItem[] = [
          { id: "DEADLINE_EXTEND_7", label: "+7 jours" },
          { id: "DEADLINE_EXTEND_14", label: "+14 jours" },
          { id: "UPDATE_DEADLINE", label: "Modifier la date" },
          { id: "DEADLINE_REMOVE", label: "Supprimer la deadline" },
          { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        ];

        candidates.push({
          id: `deadline-today-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          category: "urgent",
          categoryLabel: "DEADLINE",
          title: company,
          company,
          shortRole,
          date: deadline,
          dateContext: "Aujourd'hui",
          priority: "high",
          message: "La deadline est aujourd'hui.",
          reason: "Date limite aujourd'hui non transmise",
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: isReadyToSend ? "view_opportunity" : "prepare",
          score: 118,
        });
      } else if (diff === 1) {
        // Deadline DEMAIN
        const primaryAction: BriefActionItem = isReadyToSend
          ? {
              id: "APPLY_NOW",
              label: `Postuler chez ${company} →`,
              variant: "default",
            }
          : {
              id: "PREPARE_APPLICATION",
              label: "Finaliser ma candidature →",
              variant: "default",
            };

        const secondaryActions: BriefActionItem[] = [
          { id: "DEADLINE_EXTEND_7", label: "+7 jours" },
          { id: "DEADLINE_EXTEND_14", label: "+14 jours" },
          { id: "UPDATE_DEADLINE", label: "Modifier la date" },
          { id: "DEADLINE_REMOVE", label: "Supprimer la deadline" },
          { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        ];

        candidates.push({
          id: `deadline-demain-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          category: "urgent",
          categoryLabel: "DEADLINE",
          title: company,
          company,
          shortRole,
          date: deadline,
          dateContext: "Demain",
          priority: "high",
          message: "La deadline est demain.",
          reason: "Date limite demain non transmise",
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: isReadyToSend ? "view_opportunity" : "prepare",
          score: 104,
        });
      } else if (diff !== null && diff >= 2 && diff <= 3) {
        // Deadline dans 2 à 3 jours
        const primaryAction: BriefActionItem = {
          id: "PREPARE_APPLICATION",
          label: "Finaliser ma candidature →",
          variant: "default",
        };
        const secondaryActions: BriefActionItem[] = [
          { id: "DEADLINE_EXTEND_7", label: "+7 jours" },
          { id: "DEADLINE_EXTEND_14", label: "+14 jours" },
          { id: "UPDATE_DEADLINE", label: "Modifier la date" },
          { id: "DEADLINE_REMOVE", label: "Supprimer la deadline" },
          { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        ];

        candidates.push({
          id: `deadline-urgent-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          category: "urgent",
          categoryLabel: "DEADLINE",
          title: company,
          company,
          shortRole,
          date: deadline,
          dateContext: `Dans ${diff} jours`,
          priority: "high",
          message: "La deadline approche.",
          reason: `Date limite dans ${diff} jours`,
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: "prepare",
          score: 91 - diff,
        });
      } else if (diff !== null && diff < 0 && isActive) {
        // Deadline DÉPASSÉE sans envoi enregistré -> Arbitrage
        const primaryAction: BriefActionItem = {
          id: "UPDATE_DEADLINE",
          label: "Mettre à jour la deadline →",
          variant: "default",
        };
        const secondaryActions: BriefActionItem[] = [
          { id: "DEADLINE_EXTEND_7", label: "+7 jours" },
          { id: "DEADLINE_EXTEND_14", label: "+14 jours" },
          { id: "UPDATE_DEADLINE", label: "Modifier la date" },
          { id: "DEADLINE_REMOVE", label: "Supprimer la deadline" },
          { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        ];

        candidates.push({
          id: `deadline-expired-${opp.id}`,
          opportunityId: opp.id,
          type: "deadline",
          category: "decision",
          categoryLabel: "DEADLINE",
          title: company,
          company,
          shortRole,
          date: deadline,
          dateContext: "Échue",
          priority: "high",
          message: "Cette offre est arrivée à échéance.",
          reason: "Date limite dépassée sans candidature transmise",
          primaryAction,
          secondaryActions,
          recommendedActions: [primaryAction, ...secondaryActions],
          actionLabel: primaryAction.label,
          actionType: "update_deadline",
          score: 93,
        });
      }
    }

    // ==========================================
    // 3. PROPOSITION / OFFRE REÇUE
    // ==========================================
    if (
      opp.statut === "Offre reçue" &&
      !candidates.some((t) => t.opportunityId === opp.id)
    ) {
      const primaryAction: BriefActionItem = {
        id: "VIEW_OPPORTUNITY",
        label: "Analyser la proposition →",
        variant: "default",
      };
      const secondaryActions: BriefActionItem[] = [
        { id: "VIEW_NOTES", label: "Voir mes notes" },
        { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
      ];

      candidates.push({
        id: `offer-${opp.id}`,
        opportunityId: opp.id,
        type: "opportunite",
        category: "decision",
        categoryLabel: "PROPOSITION",
        title: company,
        company,
        shortRole,
        date: null,
        dateContext: "Offre reçue",
        priority: "high",
        message: "Proposition reçue. Analysez les conditions.",
        reason: "Proposition d'embauche reçue",
        primaryAction,
        secondaryActions,
        recommendedActions: [primaryAction, ...secondaryActions],
        actionLabel: primaryAction.label,
        actionType: "view_opportunity",
        score: 96,
      });
    }

    // ==========================================
    // 4. RELANCES (PROGRAMMÉE, RETARD, OU 7+ JOURS SANS RÉPONSE)
    // ==========================================
    if (
      (opp.statut === "Candidature envoyée" || opp.statut === "Relancée") &&
      !candidates.some((t) => t.opportunityId === opp.id)
    ) {
      if (relance) {
        const wasRelancedToday =
          opp.statut === "Relancée" &&
          (opp.dateRelance === currentDate || opp.followUpDate === currentDate);

        if (!wasRelancedToday) {
          const diff = calculateDaysDiff(currentDate, relance);

          if (diff === 0) {
            const primaryAction: BriefActionItem = {
              id: "GENERATE_EMAIL",
              label: "Préparer la relance →",
              variant: "default",
            };
            const secondaryActions: BriefActionItem[] = [
              { id: "GENERATE_EMAIL", label: "Générer l'email" },
              ...(hasContact
                ? [{ id: "OPEN_CONTACT" as const, label: "Voir le contact" }]
                : []),
              { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
              { id: "PLAN_TOMORROW", label: "Planifier" },
              { id: "MARK_FOLLOW_UP", label: "Marquer comme relancée" },
            ];

            candidates.push({
              id: `relance-today-${opp.id}`,
              opportunityId: opp.id,
              type: "relance",
              category: "relance",
              categoryLabel: "RELANCE",
              title: company,
              company,
              shortRole,
              date: relance,
              dateContext: "Aujourd'hui",
              priority: "high",
              message: "Votre relance est programmée aujourd'hui.",
              reason: "Relance programmée pour aujourd'hui",
              primaryAction,
              secondaryActions,
              recommendedActions: [primaryAction, ...secondaryActions],
              actionLabel: primaryAction.label,
              actionType: "follow_up",
              score: 94,
            });
          } else if (diff !== null && diff < 0) {
            const retard = Math.abs(diff);
            const primaryAction: BriefActionItem = {
              id: "GENERATE_EMAIL",
              label: "Préparer la relance →",
              variant: "default",
            };
            const secondaryActions: BriefActionItem[] = [
              { id: "GENERATE_EMAIL", label: "Générer l'email" },
              ...(hasContact
                ? [{ id: "OPEN_CONTACT" as const, label: "Voir le contact" }]
                : []),
              { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
              { id: "PLAN_TOMORROW", label: "Planifier" },
              { id: "MARK_FOLLOW_UP", label: "Marquer comme relancée" },
            ];

            candidates.push({
              id: `relance-retard-${opp.id}`,
              opportunityId: opp.id,
              type: "relance",
              category: "relance",
              categoryLabel: "RELANCE",
              title: company,
              company,
              shortRole,
              date: relance,
              dateContext: `Il y a ${retard} jours`,
              priority: "high",
              message: "Vous n'avez pas encore reçu de réponse.",
              reason: `Relance en retard de ${retard} jours`,
              primaryAction,
              secondaryActions,
              recommendedActions: [primaryAction, ...secondaryActions],
              actionLabel: primaryAction.label,
              actionType: "follow_up",
              score: 90,
            });
          }
        }
      } else if (opp.statut === "Candidature envoyée" && opp.appliedAt) {
        const diffApplied = calculateDaysDiff(opp.appliedAt, currentDate);
        if (diffApplied !== null && diffApplied >= 7) {
          const timeStr = `${diffApplied} jours`;
          const primaryAction: BriefActionItem = {
            id: "GENERATE_EMAIL",
            label: "Préparer la relance →",
            variant: "default",
          };
          const secondaryActions: BriefActionItem[] = [
            { id: "GENERATE_EMAIL", label: "Générer l'email" },
            ...(hasContact
              ? [{ id: "OPEN_CONTACT" as const, label: "Voir le contact" }]
              : []),
            { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
            { id: "PLAN_TOMORROW", label: "Planifier" },
            { id: "MARK_FOLLOW_UP", label: "Marquer comme relancée" },
          ];

          candidates.push({
            id: `relance-suggest-${opp.id}`,
            opportunityId: opp.id,
            type: "relance",
            category: "relance",
            categoryLabel: "RELANCE",
            title: company,
            company,
            shortRole,
            date: opp.appliedAt,
            dateContext: `Il y a ${timeStr}`,
            priority: "medium",
            message: "Toujours pas de réponse reçue.",
            reason: "Candidature envoyée depuis 7+ jours sans relance",
            primaryAction,
            secondaryActions,
            recommendedActions: [primaryAction, ...secondaryActions],
            actionLabel: primaryAction.label,
            actionType: "follow_up",
            score: 86,
          });
        }
      }
    }

    // ==========================================
    // 5. CANDIDATURE PRÊTE À ENVOYER (DOSSIER PRÊT)
    // ==========================================
    if (
      (opp.statut === "À candidater" || opp.isPrepared) &&
      !isApplied &&
      !candidates.some((t) => t.opportunityId === opp.id)
    ) {
      const primaryAction: BriefActionItem = {
        id: "APPLY_NOW",
        label: `Postuler chez ${company} →`,
        variant: "default",
      };

      const secondaryActions: BriefActionItem[] = [
        { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        { id: "OPEN_COMPANY", label: "Ouvrir l'entreprise" },
        { id: "UPDATE_DEADLINE", label: "Modifier la deadline" },
        { id: "VIEW_NOTES", label: "Voir les notes" },
        { id: "PLAN_TOMORROW", label: "Planifier" },
        { id: "PLAN_LATER", label: "Reporter" },
      ];

      const readyIndex = candidates.filter((c) =>
        c.id.startsWith("ready-"),
      ).length;
      const readyMessages = [
        "Votre candidature est prête à partir.",
        "Votre dossier est prêt.",
        "Tout est prêt pour l'envoi.",
      ];

      candidates.push({
        id: `ready-${opp.id}`,
        opportunityId: opp.id,
        type: "preparation",
        category: "action",
        categoryLabel: "CANDIDATURE",
        title: company,
        company,
        shortRole,
        date: null,
        dateContext: "Dossier prêt",
        priority: "high",
        message: readyMessages[readyIndex % readyMessages.length],
        reason: "Candidature préparée prête à l'envoi",
        primaryAction,
        secondaryActions,
        recommendedActions: [primaryAction, ...secondaryActions],
        actionLabel: primaryAction.label,
        actionType: "view_opportunity",
        score: 82,
      });
    }

    // ==========================================
    // 6. OPPORTUNITÉ À ÉTUDIER
    // ==========================================
    if (
      opp.statut === "À étudier" &&
      !candidates.some((t) => t.opportunityId === opp.id)
    ) {
      const primaryAction: BriefActionItem = {
        id: "ANALYZE_OFFER",
        label: "Analyser l'offre →",
        variant: "default",
      };
      const secondaryActions: BriefActionItem[] = [
        { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
        { id: "PREPARE_APPLICATION", label: "Préparer la candidature" },
        { id: "PLAN_LATER", label: "Planifier pour plus tard" },
      ];

      candidates.push({
        id: `study-${opp.id}`,
        opportunityId: opp.id,
        type: "opportunite",
        category: "action",
        categoryLabel: "OPPORTUNITÉ",
        title: company,
        company,
        shortRole,
        date: null,
        dateContext: "À étudier",
        priority: "medium",
        message: "Cette opportunité est à étudier.",
        reason: "Opportunité en phase d'étude",
        primaryAction,
        secondaryActions,
        recommendedActions: [primaryAction, ...secondaryActions],
        actionLabel: primaryAction.label,
        actionType: "analyze",
        score: 77,
      });
    }

    // ==========================================
    // 7. PRÉPARATION EN COURS OU À FAIRE
    // ==========================================
    if (
      opp.statut === "À préparer" &&
      !candidates.some((t) => t.opportunityId === opp.id)
    ) {
      const primaryAction: BriefActionItem = {
        id: "PREPARE_APPLICATION",
        label: "Préparer la candidature →",
        variant: "default",
      };
      const secondaryActions: BriefActionItem[] = [
        { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        { id: "OPEN_COMPANY", label: "Ouvrir l'entreprise" },
        { id: "UPDATE_DEADLINE", label: "Modifier la deadline" },
        { id: "VIEW_NOTES", label: "Voir les notes" },
        { id: "PLAN_TOMORROW", label: "Planifier" },
        { id: "PLAN_LATER", label: "Reporter" },
      ];

      const prepIndex = candidates.filter((c) =>
        c.id.startsWith("prep-"),
      ).length;
      const prepMessages = [
        "Votre candidature est à préparer.",
        "Votre dossier est prêt à finaliser.",
        "Cette opportunité attend vos arguments.",
      ];

      candidates.push({
        id: `prep-${opp.id}`,
        opportunityId: opp.id,
        type: "preparation",
        category: "action",
        categoryLabel: "CANDIDATURE",
        title: company,
        company,
        shortRole,
        date: null,
        dateContext: "À préparer",
        priority: "medium",
        message: prepMessages[prepIndex % prepMessages.length],
        reason: "Préparation en cours à finaliser",
        primaryAction,
        secondaryActions,
        recommendedActions: [primaryAction, ...secondaryActions],
        actionLabel: primaryAction.label,
        actionType: "prepare",
        score: opp.hasArguments ? 76 : 75,
      });
    }

    // ==========================================
    // 8. OPPORTUNITÉ RÉCEMMENT SAUVEGARDÉE
    // ==========================================
    if (
      opp.statut === "Sauvegardée" &&
      !candidates.some((t) => t.opportunityId === opp.id)
    ) {
      const diffSaved = opp.savedAt
        ? calculateDaysDiff(opp.savedAt, currentDate)
        : null;

      const isStalled = diffSaved !== null && diffSaved >= 4;

      const primaryAction: BriefActionItem = {
        id: "PREPARE_APPLICATION",
        label: "Préparer la candidature →",
        variant: "default",
      };
      const secondaryActions: BriefActionItem[] = [
        { id: "VIEW_OPPORTUNITY", label: "Voir l'offre" },
        { id: "ANALYZE_OFFER", label: "Analyser l'offre" },
        { id: "OPEN_COMPANY", label: "Voir l'entreprise" },
        { id: "PLAN_LATER", label: "Planifier pour plus tard" },
      ];

      const savedIndex = candidates.filter((c) =>
        c.id.startsWith("saved-"),
      ).length;
      const savedMessages = [
        "Cette offre vient d'être ajoutée.",
        "Cette opportunité attend d'être préparée.",
        "Offre enregistrée dans vos opportunités.",
      ];

      candidates.push({
        id: `saved-${opp.id}`,
        opportunityId: opp.id,
        type: "opportunite",
        category: "action",
        categoryLabel: "OPPORTUNITÉ",
        title: company,
        company,
        shortRole,
        date: null,
        dateContext: isStalled
          ? `Ajoutée il y a ${diffSaved} j`
          : "Enregistrée",
        priority: isStalled ? "medium" : "low",
        message: isStalled
          ? "Cette opportunité attend d'être préparée."
          : savedMessages[savedIndex % savedMessages.length],
        reason: isStalled
          ? "Opportunité en sommeil"
          : "Opportunité récemment sauvegardée",
        primaryAction,
        secondaryActions,
        recommendedActions: [primaryAction, ...secondaryActions],
        actionLabel: primaryAction.label,
        actionType: "prepare",
        score: isStalled ? 65 : 55,
      });
    }
  }

  // ==========================================
  // 9. ÉVÉNEMENTS DU CALENDRIER
  // ==========================================
  for (const ev of calendarEvents) {
    const diff = calculateDaysDiff(currentDate, ev.date);
    if (
      (diff === 0 || diff === 1) &&
      !candidates.some((t) => t.date === ev.date && t.title.includes(ev.titre))
    ) {
      const isToday = diff === 0;
      const comp = ev.entreprise || ev.titre;
      const primaryAction: BriefActionItem = {
        id: "OPEN_CALENDAR",
        label: "Voir dans l'agenda →",
        variant: "default",
      };

      candidates.push({
        id: `cal-${ev.date}-${ev.titre}`,
        opportunityId: ev.opportunityId || null,
        type: "entretien",
        category: "entretien",
        categoryLabel: "CALENDRIER",
        title: comp,
        company: comp,
        shortRole: null,
        date: ev.date,
        dateContext: isToday ? "Aujourd'hui" : "Demain",
        priority: "high",
        message: `${ev.type || "Événement"} prévu ${isToday ? "aujourd'hui" : "demain"}.`,
        reason: `Événement agenda ${isToday ? "aujourd'hui" : "demain"}`,
        primaryAction,
        secondaryActions: [],
        recommendedActions: [primaryAction],
        actionLabel: primaryAction.label,
        actionType: "view_calendar",
        score: isToday ? 105 : 97,
      });
    }
  }

  // ==========================================
  // TRI DÉTERMINISTE PAR SCORE ET APPLICATION STRICTE DU MAXIMUM DE 3 ACTIONS
  // ==========================================
  const sortedToday = candidates
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.date && b.date) return a.date.localeCompare(b.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.company.localeCompare(b.company);
    })
    .slice(0, 3)
    .map(({ score: _, ...item }) => item);

  const count = sortedToday.length;
  let summary = "";

  if (count === 0) {
    summary = "Tout est à jour. Aucune action urgente pour le moment.";
  } else if (count === 1) {
    summary = "Une action mérite votre attention aujourd'hui.";
  } else if (count === 2) {
    summary = "2 actions nécessitent votre attention.";
  } else {
    summary = "3 actions nécessitent votre attention.";
  }

  return {
    greeting,
    summary,
    today: sortedToday,
    watch: [],
    upcoming: [],
    recent: [],
    generatedAt: new Date().toISOString(),
    isFallback,
  };
}
