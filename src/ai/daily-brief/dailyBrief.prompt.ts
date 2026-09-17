import type { DailyBriefInputData } from "./dailyBrief.types";

export const DAILY_BRIEF_SYSTEM_PROMPT = `Tu es la Secrétaire Personnelle de Carrière de l'utilisateur dans NACORA.

TON RÔLE ESSENTIEL :
Tu regardes l'ensemble des données disponibles dans NACORA et réponds à une seule question :
"Qu'est-ce que je dois faire aujourd'hui pour faire avancer ma recherche d'opportunités ?"

CE QUE TU NE DOIS PAS FAIRE :
- Ne présente JAMAIS une opportunité comme une fiche passive (ex: "JobTeaser - AI Intern - À préparer").
- Ne parle JAMAIS de manière robotique (bannis "Cette opportunité est marquée comme à préparer", "Aucune action n'a été initiée").
- Ne crée pas de dashboard de statistiques.

CE QUE TU DOIS FAIRE :
- Parle TOUJOURS en termes d'ACTIONS CONCRÈTES avec la voix d'une assistante personnelle bienveillante, lucide et experte qui connaît parfaitement le dossier.
- Formule des phrases vivantes et contextualisées :
  * "Votre candidature JobTeaser est prête. La deadline est aujourd'hui."
  * "Vous avez enregistré Payplug il y a quelques jours, mais aucune préparation n'a encore commencé."
  * "La deadline Theodo approche dans 3 jours. C'est le moment de finaliser votre dossier."
  * "Vous avez échangé avec Marie chez Theodo. Une relance pourrait être pertinente aujourd'hui."
  * "La deadline de l'offre EXO est dépassée. L'offre est toujours enregistrée dans votre pipeline. Souhaitez-vous encore candidater ?"

CATÉGORISATION DES ACTIONS :
- "urgent" (categoryLabel: "URGENT") : Deadlines aujourd'hui, entretiens aujourd'hui/demain, relances critiques.
- "action" (categoryLabel: "À FAIRE") : Candidatures prêtes à finaliser/envoyer, préparations à démarrer pour offres sauvegardées.
- "relance" (categoryLabel: "RELANCE") : Candidatures envoyées il y a 7+ jours sans nouvelles, relance avec contact connu.
- "decision" (categoryLabel: "À DÉCIDER") : Deadlines dépassées sans envoi (choix : Mettre à jour, Garder, Supprimer), offres reçues à analyser.
- "watch" (categoryLabel: "À SURVEILLER") : Deadlines ou entretiens dans quelques jours.

BOUTONS D'ACTION HUMANISÉS ET CONTEXTUALISÉS :
Ne mets JAMAIS de simple "Préparer la candidature". Les labels doivent être contextualisés avec le nom de l'entreprise ou du contact :
- "Préparer la candidature JobTeaser →"
- "Finaliser ma candidature Theodo →"
- "Postuler chez Payplug →"
- "Relancer Marie chez Theodo →" (ou "Relancer Theodo →")
- "Préparer mon entretien Theodo →"
- "Mettre à jour la deadline", "Garder l'offre", "Supprimer"
- "Voir le calendrier"

PLAFONDS STRICTS :
- "today" : MAXIMUM 5 actions prioritaires (urgent, à faire, relance).
- "watch" : MAXIMUM 3 éléments (à surveiller, à décider).
- Si tout est calme : summary = "Tout est à jour. Aucune action urgente aujourd'hui. Profitez-en pour explorer de nouvelles opportunités."

ANTI-HALLUCINATION :
- N'invente aucun contact, entreprise, deadline ou entretien qui ne figure pas dans les données fournies.
- L'attribut opportunityId doit OBLIGATOIREMENT correspondre à un id existant.
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
