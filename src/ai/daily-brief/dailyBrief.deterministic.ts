import type {
  DailyBriefData,
  DailyBriefInputData,
  BriefItem,
  BriefActionItem,
} from "./dailyBrief.types";

export function calculateDaysDiff(
  fromIso: string,
  toIso: string,
): number | null {
  try {
    const from = new Date(fromIso);
    const to = new Date(toIso);
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;
    const diffTime = to.getTime() - from.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}

type ScoredBriefItem = BriefItem & { score: number };

/**
 * Moteur déterministe hybride basé sur les faits réels et les règles métiers de NACORA.
 * Déduit intelligemment les actions autorisées et priorise avec un score de pertinence.
 */
export function generateDeterministicDailyBrief(
  input: DailyBriefInputData,
  isFallback = false,
): DailyBriefData {
  const { userPrenom, currentDate, opportunities, calendarEvents = [] } = input;
  const prenom = userPrenom?.trim() ? userPrenom.trim() : "";
  const greeting = prenom ? `Bonjour ${prenom}` : "Bonjour";

  const todayCandidates: ScoredBriefItem[] = [];
  const watchCandidates: ScoredBriefItem[] = [];
  const upcomingCandidates: ScoredBriefItem[] = [];

  const activeStatuses = [
    "Sauvegardée",
    "À préparer",
    "À étudier",
    "À candidater",
    "Candidature envoyée",
    "Relancée",
    "Entretien",
    "Deuxième entretien",
  ];

  const closedStatuses = ["Refusée", "Acceptée", "Clôturée", "Sans réponse"];

  for (const opp of opportunities) {
    if (opp.archive) continue;

    const deadline = opp.applicationDeadline || opp.dateLimite;
    const relance = opp.followUpDate || opp.dateRelance;
    const entretien = opp.interviewDate || opp.secondInterviewDate;
    const company = opp.entreprise || "Entreprise";
    const title = opp.poste || "Opportunité";
    const isClosed = closedStatuses.includes(opp.statut);
    const isActive = activeStatuses.includes(opp.statut);
    const hasContact = Boolean(
      opp.hasContact || opp.contactNom || opp.contactEmail,
    );
    const isApplied =
      opp.statut === "Candidature envoyée" ||
      opp.statut === "Relancée" ||
      opp.statut === "Entretien" ||
      opp.statut === "Deuxième entretien";

    // 1. ENTRETIENS
    if (entretien && isActive) {
      const diff = calculateDaysDiff(currentDate, entretien);
      if (diff === 0) {
        todayCandidates.push({
          id: `entretien-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          title: `Entretien aujourd'hui — ${company}`,
          company,
          date: entretien,
          dateContext: "Aujourd'hui",
          priority: "high",
          message: `Entretien prévu aujourd'hui pour le poste de ${title}.`,
          recommendedActions: [
            {
              id: "VIEW_OPPORTUNITY",
              label: "Préparer l'entretien",
              variant: "default",
            },
            {
              id: "OPEN_CALENDAR",
              label: "Voir le calendrier",
              variant: "secondary",
            },
          ],
          actionLabel: "Préparer l'entretien",
          actionType: "view_opportunity",
          score: 100,
        });
      } else if (diff !== null && diff > 0 && diff <= 30) {
        upcomingCandidates.push({
          id: `entretien-futur-${opp.id}`,
          opportunityId: opp.id,
          type: "entretien",
          title: `Entretien — ${company}`,
          company,
          date: entretien,
          dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
          priority: diff <= 2 ? "high" : "medium",
          message: `Entretien prévu le ${entretien} pour ${title}.`,
          recommendedActions: [
            {
              id: "PREPARE_APPLICATION",
              label: "Préparer l'entretien",
              variant: "default",
            },
            {
              id: "OPEN_CALENDAR",
              label: "Voir le calendrier",
              variant: "secondary",
            },
            {
              id: "VIEW_OPPORTUNITY",
              label: "Voir l'opportunité",
              variant: "ghost",
            },
          ],
          actionLabel: "Voir le calendrier",
          actionType: "view_calendar",
          score: diff <= 3 ? 80 - diff : 40 - Math.min(diff, 20),
        });
      }
    }

    // 2. DEADLINES
    if (deadline && !isClosed) {
      const diff = calculateDaysDiff(currentDate, deadline);

      if (diff === 0) {
        // Expire AUJOURD'HUI
        if (!isApplied) {
          todayCandidates.push({
            id: `deadline-today-${opp.id}`,
            opportunityId: opp.id,
            type: "deadline",
            title: `Deadline aujourd'hui — ${company}`,
            company,
            date: deadline,
            dateContext: "Aujourd'hui",
            priority: "high",
            message: `La date limite pour postuler à ${title} expire aujourd'hui.`,
            recommendedActions: [
              {
                id: "VIEW_OPPORTUNITY",
                label: "Voir l'opportunité",
                variant: "default",
              },
              {
                id: "MARK_APPLIED",
                label: "Marquer envoyée",
                variant: "secondary",
              },
              {
                id: "UPDATE_DEADLINE",
                label: "Reporter",
                variant: "outline",
              },
            ],
            actionLabel: "Voir l'opportunité",
            actionType: "view_opportunity",
            score: 95,
          });
        }
      } else if (diff !== null && diff > 0 && diff <= 2) {
        // Deadline imminente (dans 1 ou 2 jours)
        if (!isApplied) {
          todayCandidates.push({
            id: `deadline-urgent-${opp.id}`,
            opportunityId: opp.id,
            type: "deadline",
            title: `Deadline ${diff === 1 ? "demain" : "dans 2 jours"} — ${company}`,
            company,
            date: deadline,
            dateContext: diff === 1 ? "Demain" : "Dans 2 jours",
            priority: "high",
            message: `Date limite fixée au ${deadline} pour ${title}. Finalisez votre candidature sans attendre.`,
            recommendedActions: [
              {
                id: "PREPARE_APPLICATION",
                label: "Finaliser la candidature",
                variant: "default",
              },
              {
                id: "VIEW_OPPORTUNITY",
                label: "Voir l'opportunité",
                variant: "secondary",
              },
            ],
            actionLabel: "Préparer la candidature",
            actionType: "prepare",
            score: 85 - diff,
          });
        }
      } else if (diff !== null && diff > 2 && diff <= 7) {
        // Deadline dans 3 à 7 jours -> À surveiller
        if (!isApplied) {
          watchCandidates.push({
            id: `deadline-watch-${opp.id}`,
            opportunityId: opp.id,
            type: "deadline",
            title: `Deadline dans ${diff} jours — ${company}`,
            company,
            date: deadline,
            dateContext: `Dans ${diff} jours`,
            priority: "medium",
            message: `Date limite fixée au ${deadline} pour le poste de ${title}.`,
            recommendedActions: [
              {
                id: "PREPARE_APPLICATION",
                label: "Préparer la candidature",
                variant: "default",
              },
              {
                id: "VIEW_OPPORTUNITY",
                label: "Voir l'opportunité",
                variant: "secondary",
              },
            ],
            actionLabel: "Voir l'opportunité",
            actionType: "view_opportunity",
            score: 60 - diff,
          });
        }
      } else if (diff !== null && diff < 0 && isActive) {
        // Deadline DÉPASSÉE
        if (!isApplied) {
          // Offre expirée SANS candidature envoyée -> Choix d'arbitrage
          watchCandidates.push({
            id: `deadline-expired-${opp.id}`,
            opportunityId: opp.id,
            type: "deadline",
            title: `Deadline dépassée — ${company}`,
            company,
            date: deadline,
            dateContext: "Dépassée",
            priority: "high",
            message: `La date limite du ${deadline} est passée sans candidature enregistrée. Que souhaitez-vous faire ?`,
            recommendedActions: [
              {
                id: "UPDATE_DEADLINE",
                label: "Mettre à jour",
                variant: "secondary",
              },
              {
                id: "KEEP_OPPORTUNITY",
                label: "Garder l'offre",
                variant: "outline",
              },
              {
                id: "DELETE_OPPORTUNITY",
                label: "Supprimer",
                variant: "destructive",
              },
            ],
            actionLabel: "Mettre à jour la date",
            actionType: "view_opportunity",
            score: 75,
          });
        } else {
          // Candidature DÉJÀ envoyée -> Ne JAMAIS proposer la suppression ! Proposer relance
          const actions: BriefActionItem[] = [
            {
              id: "VIEW_OPPORTUNITY",
              label: "Voir l'opportunité",
              variant: "secondary",
            },
            {
              id: "PLAN_FOLLOW_UP",
              label: "Planifier une relance",
              variant: "default",
            },
          ];
          if (hasContact) {
            actions.push({
              id: "OPEN_CONTACT",
              label: "Voir le contact",
              variant: "ghost",
            });
          }

          watchCandidates.push({
            id: `deadline-sent-followup-${opp.id}`,
            opportunityId: opp.id,
            type: "relance",
            title: `Suivi de candidature — ${company}`,
            company,
            date: deadline,
            dateContext: "En cours",
            priority: "medium",
            message: `La deadline de l'offre est passée. Votre candidature est transmise pour ${title}.`,
            recommendedActions: actions,
            actionLabel: "Planifier une relance",
            actionType: "follow_up",
            score: 55,
          });
        }
      }
    }

    // 3. RELANCES
    if (relance && (opp.statut === "Candidature envoyée" || opp.statut === "Relancée")) {
      const diff = calculateDaysDiff(currentDate, relance);

      if (diff === 0) {
        // Relance prévue AUJOURD'HUI
        const actions: BriefActionItem[] = [
          {
            id: "PLAN_FOLLOW_UP",
            label: "Faire la relance",
            variant: "default",
          },
          {
            id: "VIEW_OPPORTUNITY",
            label: "Voir l'opportunité",
            variant: "secondary",
          },
        ];
        if (hasContact) {
          actions.push({
            id: "OPEN_CONTACT",
            label: "Voir le contact",
            variant: "ghost",
          });
        }

        todayCandidates.push({
          id: `relance-today-${opp.id}`,
          opportunityId: opp.id,
          type: "relance",
          title: `Relance à faire — ${company}`,
          company,
          date: relance,
          dateContext: "Aujourd'hui",
          priority: "high",
          message: `Une relance est programmée aujourd'hui pour votre candidature à ${title}.`,
          recommendedActions: actions,
          actionLabel: "Faire la relance",
          actionType: "follow_up",
          score: 90,
        });
      } else if (diff !== null && diff < 0) {
        // Relance EN RETARD
        const joursRetard = Math.abs(diff);
        const actions: BriefActionItem[] = [
          {
            id: "PLAN_FOLLOW_UP",
            label: "Planifier la relance",
            variant: "default",
          },
          {
            id: "VIEW_OPPORTUNITY",
            label: "Voir l'opportunité",
            variant: "secondary",
          },
        ];
        if (hasContact) {
          actions.push({
            id: "OPEN_CONTACT",
            label: "Voir le contact",
            variant: "ghost",
          });
        }

        watchCandidates.push({
          id: `relance-retard-${opp.id}`,
          opportunityId: opp.id,
          type: "relance",
          title: `Relance en retard — ${company}`,
          company,
          date: relance,
          dateContext: `${joursRetard} j de retard`,
          priority: "high",
          message: `La relance pour ${title} était prévue le ${relance}. Contactez l'entreprise pour réactiver le dossier.`,
          recommendedActions: actions,
          actionLabel: "Planifier la relance",
          actionType: "follow_up",
          score: 78,
        });
      }
    } else if (
      (opp.statut === "Candidature envoyée" || opp.statut === "Relancée") &&
      !relance &&
      opp.appliedAt
    ) {
      // Candidature envoyée depuis plus de 7 jours SANS date de relance planifiée
      const diffApplied = calculateDaysDiff(opp.appliedAt, currentDate);
      if (diffApplied !== null && diffApplied >= 7) {
        const actions: BriefActionItem[] = [
          {
            id: "PLAN_FOLLOW_UP",
            label: "Planifier une relance",
            variant: "default",
          },
          {
            id: "VIEW_OPPORTUNITY",
            label: "Voir l'opportunité",
            variant: "secondary",
          },
        ];
        if (hasContact) {
          actions.push({
            id: "OPEN_CONTACT",
            label: "Voir le contact",
            variant: "ghost",
          });
        }

        watchCandidates.push({
          id: `relance-suggest-${opp.id}`,
          opportunityId: opp.id,
          type: "relance",
          title: `Relance suggérée — ${company}`,
          company,
          date: opp.appliedAt,
          dateContext: `Envoyée il y a ${diffApplied} j`,
          priority: "medium",
          message: `Candidature envoyée il y a ${diffApplied} jours sans relance programmée. Un suivi est recommandé.`,
          recommendedActions: actions,
          actionLabel: "Planifier une relance",
          actionType: "follow_up",
          score: 50,
        });
      }
    }

    // 4. CANDIDATURES EN COURS DE PRÉPARATION SANS DEADLINE
    if (
      opp.statut === "À préparer" &&
      !deadline &&
      !todayCandidates.some((t) => t.opportunityId === opp.id)
    ) {
      todayCandidates.push({
        id: `prep-${opp.id}`,
        opportunityId: opp.id,
        type: "preparation",
        title: `Candidature à préparer — ${company}`,
        company,
        date: null,
        dateContext: "En cours",
        priority: "medium",
        message: `Vous avez positionné ${title} comme candidature à préparer.`,
        recommendedActions: [
          {
            id: "PREPARE_APPLICATION",
            label: "Préparer la candidature",
            variant: "default",
          },
          {
            id: "VIEW_OPPORTUNITY",
            label: "Voir l'opportunité",
            variant: "secondary",
          },
        ],
        actionLabel: "Préparer",
        actionType: "view_opportunity",
        score: 45,
      });
    }
  }

  // 5. INTÉGRATION DES ÉVÉNEMENTS CALENDRIER
  for (const ev of calendarEvents) {
    const diff = calculateDaysDiff(currentDate, ev.date);
    if (
      diff === 0 &&
      !todayCandidates.some((t) => t.date === ev.date && t.title.includes(ev.titre))
    ) {
      todayCandidates.push({
        id: `cal-today-${ev.date}-${ev.titre}`,
        opportunityId: ev.opportunityId || null,
        type: "entretien",
        title: ev.titre,
        company: ev.entreprise || "Calendrier",
        date: ev.date,
        dateContext: "Aujourd'hui",
        priority: "high",
        message: `${ev.type} : ${ev.titre} prévu aujourd'hui.`,
        recommendedActions: [
          {
            id: "OPEN_CALENDAR",
            label: "Voir le calendrier",
            variant: "default",
          },
          ...(ev.opportunityId
            ? [
                {
                  id: "VIEW_OPPORTUNITY" as const,
                  label: "Voir l'opportunité",
                  variant: "secondary" as const,
                },
              ]
            : []),
        ],
        actionLabel: "Voir le calendrier",
        actionType: "view_calendar",
        score: 95,
      });
    } else if (
      diff !== null &&
      diff > 0 &&
      diff <= 14 &&
      !upcomingCandidates.some((u) => u.date === ev.date && u.title.includes(ev.titre))
    ) {
      upcomingCandidates.push({
        id: `cal-up-${ev.date}-${ev.titre}`,
        opportunityId: ev.opportunityId || null,
        type: "entretien",
        title: ev.titre,
        company: ev.entreprise || "Calendrier",
        date: ev.date,
        dateContext: diff === 1 ? "Demain" : `Dans ${diff} jours`,
        priority: diff <= 2 ? "high" : "medium",
        message: `${ev.type} prévu le ${ev.date}.`,
        recommendedActions: [
          {
            id: "OPEN_CALENDAR",
            label: "Voir le calendrier",
            variant: "secondary",
          },
        ],
        actionLabel: "Voir le calendrier",
        actionType: "view_calendar",
        score: 40 - Math.min(diff, 10),
      });
    }
  }

  // TRI PAR SCORE DE PERTINENCE DÉCROISSANT ET APPLICATION STRICTE DES PLAFONDS
  const sortedToday = todayCandidates
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score: _, ...item }) => item);

  const sortedWatch = watchCandidates
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _, ...item }) => item);

  const sortedUpcoming = upcomingCandidates
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score: _, ...item }) => item);

  // Synthèse intelligente concise
  let summary = "Voici ce qui mérite votre attention aujourd'hui.";
  if (
    sortedToday.length === 0 &&
    sortedWatch.length === 0 &&
    sortedUpcoming.length === 0
  ) {
    summary = "Tout est à jour. Aucune action urgente aujourd'hui.";
  } else if (sortedToday.length > 0) {
    summary = `Vous avez ${sortedToday.length} action${sortedToday.length > 1 ? "s" : ""} prioritaire${sortedToday.length > 1 ? "s" : ""} à mener aujourd'hui.`;
  } else if (sortedWatch.length > 0) {
    summary = `Aucune urgence immédiate, mais ${sortedWatch.length} point${sortedWatch.length > 1 ? "s" : ""} à surveiller.`;
  }

  return {
    greeting,
    summary,
    today: sortedToday,
    watch: sortedWatch,
    upcoming: sortedUpcoming,
    recent: [],
    generatedAt: new Date().toISOString(),
    isFallback,
  };
}

