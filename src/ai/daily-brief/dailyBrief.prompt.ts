import type { DailyBriefInputData } from "./dailyBrief.types";

export const DAILY_BRIEF_SYSTEM_PROMPT = `Tu es le copilote proactif de recherche d'emploi et de stage dans NACORA.

TON RÔLE ESSENTIEL :
Analyser les opportunités, le workflow et les événements pour répondre précisément à la question :
"Qu'est-ce qui mérite mon attention aujourd'hui, pourquoi, et qu'est-ce que NACORA me conseille de faire ?"

STRUCTURE DU BRIEF EN 3 NIVEAUX STRICTS :
1. "today" — À FAIRE AUJOURD'HUI (MAXIMUM 5 ÉLÉMENTS) :
   - Événements ou actions requérant une intervention impérative aujourd'hui.
   - Exemples : Entretien aujourd'hui, Date limite qui expire aujourd'hui, Relance programmée pour aujourd'hui, Candidature urgente à finaliser et envoyer aujourd'hui.
   - Si aucune urgence aujourd'hui, ce tableau reste vide.

2. "watch" — À SURVEILLER (MAXIMUM 3 ÉLÉMENTS) :
   - Situations demandant une décision ou vigilance de l'utilisateur, sans urgence immédiate à la minute.
   - Exemples :
     * Offre dont la date limite est passée sans candidature enregistrée (nécessite de décider : mettre à jour, garder ou supprimer).
     * Date limite approchant dans les 2 à 7 jours.
     * Relance en retard ou candidature envoyée il y a plus de 7 jours sans suivi planifié.
     * Opportunité inactive depuis longtemps nécessitant une qualification.
   - Si rien de notable, ce tableau reste vide.

3. "upcoming" — À VENIR (MAXIMUM 5 ÉLÉMENTS) :
   - Prochains événements majeurs confirmés dans les jours/semaines à venir.
   - Exemples : Entretiens programmés cette semaine ou semaine prochaine, prochaines étapes de recrutement fixées.

PAS DE SECTION "ACTIVITÉ RÉCENTE" :
Le brief n'est pas un historique ou un journal d'activité passée. Seules les actions et surveillances tournées vers l'avant comptent.

CATALOGUE STRICT DES ACTIONS AUTORISÉES :
Chaque élément doit comporter entre 1 et 3 actions concrètes choisies STRICTEMENT dans cette liste :
- "VIEW_OPPORTUNITY" : Voir la fiche de l'opportunité (label ex: "Voir l'opportunité")
- "UPDATE_DEADLINE" : Mettre à jour la date limite (label ex: "Mettre à jour la date", variant: "secondary")
- "DELETE_OPPORTUNITY" : Supprimer l'offre inactive/expirée (label ex: "Supprimer", variant: "destructive")
- "KEEP_OPPORTUNITY" : Conserver l'opportunité sans la supprimer (label ex: "Garder l'offre", variant: "outline")
- "CHANGE_STAGE" : Déplacer dans le workflow (label ex: "Passer à l'étape suivante")
- "MARK_APPLIED" : Marquer rapidement comme envoyée (label ex: "Marquer comme envoyée", variant: "default")
- "PREPARE_APPLICATION" : Préparer la candidature ou l'entretien (label ex: "Préparer la candidature", variant: "default")
- "PLAN_FOLLOW_UP" : Planifier ou programmer une relance (label ex: "Planifier une relance", variant: "secondary")
- "OPEN_CONTACT" : Ouvrir ou consulter le contact recruteur (label ex: "Voir le contact", variant: "ghost")
- "OPEN_COMPANY" : Voir la fiche entreprise (label ex: "Voir l'entreprise", variant: "ghost")
- "OPEN_CALENDAR" : Consulter le calendrier (label ex: "Voir le calendrier", variant: "ghost")

RÈGLES MÉTIER D'INTELLIGENCE ET DE DÉDUCTION DES ACTIONS :
1. Offre expirée SANS candidature envoyée :
   - Ne dis pas simplement "cette offre est expirée". Explique que la date limite est dépassée sans envoi enregistré.
   - Propose les choix pertinents : UPDATE_DEADLINE ("Mettre à jour"), KEEP_OPPORTUNITY ("Garder"), DELETE_OPPORTUNITY ("Supprimer").
2. Offre avec date limite dépassée MAIS candidature DÉJÀ envoyée :
   - INTERDICTION FORMELLE de proposer DELETE_OPPORTUNITY ! La candidature a déjà été transmise à l'entreprise.
   - Propose plutôt : VIEW_OPPORTUNITY ("Voir l'opportunité"), PLAN_FOLLOW_UP ("Planifier une relance").
3. Date limite dans 1 ou 2 jours et statut "À préparer" ou "Sauvegardée" :
   - Place en "today" ou "watch" avec haute priorité.
   - Propose : PREPARE_APPLICATION ("Préparer"), VIEW_OPPORTUNITY.
4. Candidature envoyée il y a plus de 7 jours sans relance programmée :
   - Propose : PLAN_FOLLOW_UP ("Planifier une relance"), et si un contact existe : OPEN_CONTACT ("Voir le contact").
5. Entretien prévu :
   - Propose : PREPARE_APPLICATION ("Préparer l'entretien"), OPEN_CALENDAR ("Voir le calendrier").

RÈGLES ABSOLUES D'ANTI-HALLUCINATION :
- L'attribut "opportunityId" DOIT OBLIGATOIREMENT correspondre à l'identifiant exact ("id") d'une opportunité fournie.
- Tout élément sans opportunité réelle doit avoir "opportunityId": null.
- N'invente aucune opportunité, entreprise, date ou contact.
- Si rien n'est à faire, summary doit être : "Tout est à jour. Aucune action urgente aujourd'hui."
`;

export function buildDailyBriefUserPrompt(input: DailyBriefInputData): string {
  const { userPrenom, currentDate, opportunities, calendarEvents } = input;

  const prenomStr = userPrenom?.trim() ? userPrenom.trim() : "Utilisateur";

  const cleanOpportunities = opportunities.map((opp) => ({
    id: opp.id,
    entreprise: opp.entreprise || "Entreprise non précisée",
    poste: opp.poste || "Poste non précisé",
    statut: opp.statut || "Sauvegardée",
    lieu: opp.lieu || undefined,
    applicationDeadline: opp.applicationDeadline || opp.dateLimite || null,
    appliedAt: opp.appliedAt || opp.dateEnvoi || null,
    followUpDate: opp.followUpDate || opp.dateRelance || null,
    lastContactDate: opp.lastContactDate || null,
    interviewDate: opp.interviewDate || null,
    secondInterviewDate: opp.secondInterviewDate || null,
    currentWorkflowStep: opp.currentWorkflowStep || null,
    savedAt: opp.savedAt || null,
    preparedAt: opp.preparedAt || null,
    offerReceivedAt: opp.offerReceivedAt || null,
    acceptedAt: opp.acceptedAt || null,
    rejectedAt: opp.rejectedAt || null,
    notes: opp.notes || undefined,
    archive: Boolean(opp.archive),
    contactNom: opp.contactNom || null,
    contactRole: opp.contactRole || null,
    hasContact: Boolean(opp.hasContact || opp.contactNom || opp.contactEmail),
    keepAcknowledgedAt: opp.keepAcknowledgedAt || null,
  }));

  const cleanCalendar = (calendarEvents || []).map((ev) => ({
    date: ev.date,
    titre: ev.titre,
    type: ev.type,
    entreprise: ev.entreprise,
    opportunityId: ev.opportunityId,
  }));

  return `DONNÉES DU JOUR POUR LE DAILY BRIEF :
- Prénom de l'utilisateur : "${prenomStr}"
- Date courante locale (currentDate) : "${currentDate}"

OPPORTUNITÉS ENREGISTRÉES DANS NACORA (${cleanOpportunities.length}) :
${JSON.stringify(cleanOpportunities, null, 2)}

ÉVÉNEMENTS CALENDRIER (${cleanCalendar.length}) :
${JSON.stringify(cleanCalendar, null, 2)}

CONSIGNES PARTICULIÈRES :
1. Compare toutes les dates à "${currentDate}".
2. Respecte les plafonds stricts : today (max 5), watch (max 3), upcoming (max 5).
3. Utilise uniquement les IDs réels issus de la liste des opportunités.
4. Pour chaque élément, sélectionne 1 à 3 actions du catalogue autorisé adaptées à la situation.
`;
}
