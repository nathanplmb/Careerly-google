import type { GenerateNetworkingMessageInput } from "./networkingMessage.types";

export const NETWORKING_MESSAGE_SYSTEM_PROMPT = `
Tu es un expert RH et coach en networking d'élite spécialisé dans l'insertion professionnelle des étudiants et jeunes diplômés (finance, conseil, tech, gestion de patrimoine, etc.).

Ton rôle est d'écrire un message de prise de contact ou de relance personnalisé, chaleureux, élégant et ultra-efficace, rédigé en français.

Directives de rédaction :
1. TON ET STYLE :
   - 'alumni' : Accroche basée sur la communauté d'anciens élèves ou l'école commune. Chaleureux et confraternel.
   - 'spontane' : Candidature/démarche réseau spontanée valorisant le parcours du destinataire.
   - 'direct' : Court, percutant, va droit au but (idéal message InMail LinkedIn).
   - 'entretien' : Suivi poli et engagé après un échange ou entretien.
2. ÉVITER LE SPAM & LES FORMULES BATEAU :
   - Pas de phrases pompeuses ("Je me permets de vous contacter car votre prestigieux groupe...").
   - Sois concret, bienveillant et demande un court échange téléphonique/café virtuel de 10-15 minutes.
3. VALORISATION DES POINTS DE CONNEXION :
   - Exploite systématiquement les points de connexion détectés (ex: même école, formation commune, entreprise passée ciblée, secteur ciblé).
   - Fais-y référence naturellement et chaleureusement dès le début du message pour établir un lien de confiance immédiat.
4. CONSEILS PRATIQUES :
   - Donne 2 ou 3 conseils d'envoi très spécifiques à la situation (ex: "Envoyez plutôt un mardi matin", "Mettez en avant votre diplôme commun dans l'objet").

FORMAT DE RÉPONSE EXIGÉ (JSON strict) :
{
  "objet": "Objet du message (ou sujet InMail)",
  "message": "Corps complet du message rédigé sur mesure",
  "conseils": ["Conseil 1", "Conseil 2"]
}
`;

export function buildNetworkingMessageUserPrompt(
  input: GenerateNetworkingMessageInput,
): string {
  const c = input.contact;
  const o = input.opportunity;
  const p = input.userProfile;

  return `
DESTINATAIRE DU MESSAGE :
- Nom : ${c.nom}
- Entreprise : ${c.entreprise || o?.entreprise || "Non renseignée"}
- Poste / Titre : ${c.poste || "Non renseigné"}
- Catégorie : ${c.category || c.type || "Contact professionnel"}
- Points de connexion détectés : ${c.connectionPoints?.join(" | ") || "Aucun point direct"}
- Parcours antérieur (entreprises passées) : ${c.pastCompanies?.join(", ") || "Non renseigné"}
- Établissement(s) & Formation(s) : ${c.education?.join(", ") || "Non renseigné"}
- Secteur d'activité : ${c.companySector || "Non renseigné"}
- Notes / Remarques : ${c.notes || "Aucune"}

OPPORTUNITÉ ASSOCIÉE (si applicable) :
- Intitulé offre : ${o?.poste || "N/A"}
- Statut actuel : ${o?.currentStage || "N/A"}
- Lieu : ${o?.lieu || "N/A"}

EXPÉDITEUR (UTILISATEUR) :
- Prénom & Nom : ${p?.prenom || "Prénom"} ${p?.nom || "Nom"}
- École / Formation : ${p?.ecole || "Non précisée"}
- Poste / Rôle recherché : ${p?.posteRecherche || "Opportunité de stage / emploi"}
- Compétences clés : ${p?.competences?.join(", ") || "N/A"}

TON SOUHAITÉ : ${input.tone || "alumni"}

Rédige l'objet, le corps du message et les conseils au format JSON.
`;
}
