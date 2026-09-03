import { z } from "zod";

export const OpportunityMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const OpportunityLanguageSchema = z.object({
  langue: z.string(),
  niveau: z.string().optional().nullable(),
  obligatoire: z.boolean().optional().nullable(),
});

export const OpportunityExtractionZodSchema = z.object({
  // Informations principales
  title: z.string().default(""),
  company: z.string().default(""),
  location: z.string().default(""),
  country: z.string().nullable().optional(),
  contractType: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  salary: z.string().nullable().optional(),
  salaryMin: z.number().nullable().optional(),
  salaryMax: z.number().nullable().optional(),
  salaryCurrency: z.string().nullable().optional(),
  remotePolicy: z.string().nullable().optional(),
  remoteDetails: z.string().nullable().optional(),
  applicationDeadline: z.string().nullable().optional(),
  jobFunction: z.string().nullable().optional(),
  educationLevel: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  sourceUrl: z.string().nullable().optional(),

  // Missions
  missions: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),

  // Profil recherché
  requiredSkills: z.array(z.string()).default([]),
  preferredSkills: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  requiredLanguages: z.array(OpportunityLanguageSchema).default([]),
  preferredLanguages: z.array(OpportunityLanguageSchema).default([]),
  qualities: z.array(z.string()).default([]),
  experienceRequirements: z.string().nullable().optional(),
  educationRequirements: z.array(z.string()).default([]),

  // Entreprise
  companyName: z.string().nullable().optional(),
  companyDescription: z.string().nullable().optional(),
  companySector: z.string().nullable().optional(),
  companySize: z.string().nullable().optional(),
  companyLocation: z.string().nullable().optional(),
  companyWebsite: z.string().nullable().optional(),
  companyContext: z.array(z.string()).default([]),
  companyPartners: z.array(z.string()).default([]),
  companyMetrics: z.array(OpportunityMetricSchema).default([]),

  // Recrutement
  recruitmentProcess: z.array(z.string()).default([]),
  applicationMethod: z.string().nullable().optional(),
  applicationRequirements: z.array(z.string()).default([]),

  // Avantages
  benefits: z.array(z.string()).default([]),

  // Source & extraction
  sourceType: z.string().nullable().optional(),
  sourceName: z.string().nullable().optional(),
  sourcePublishedAt: z.string().nullable().optional(),
});

export type OpportunityExtractionRaw = z.infer<
  typeof OpportunityExtractionZodSchema
>;

/**
 * Gemini JSON schema for Type.OBJECT structured output
 */
export const geminiOpportunityResponseSchema = {
  type: "OBJECT" as const,
  properties: {
    title: {
      type: "STRING" as const,
      description:
        "Intitulé exact et complet du poste (ex: Stage – Marketing & Engagement Utilisateurs (Application Mobile))",
    },
    company: {
      type: "STRING" as const,
      description: "Nom de l'entreprise qui recrute (ex: EXO)",
    },
    location: {
      type: "STRING" as const,
      description: "Lieu du poste (ex: Paris, France)",
    },
    country: { type: "STRING" as const, description: "Pays (ex: France)" },
    contractType: {
      type: "STRING" as const,
      description:
        "Type de contrat (ex: Stage, CDI, Alternance, CDD, Freelance)",
    },
    duration: {
      type: "STRING" as const,
      description: "Durée du contrat (ex: 3 à 6 mois, 6 mois)",
    },
    startDate: {
      type: "STRING" as const,
      description:
        "Date de début indiquée (ex: Dès que possible, Septembre 2026)",
    },
    endDate: {
      type: "STRING" as const,
      description: "Date de fin si indiquée, sinon null",
    },
    salary: {
      type: "STRING" as const,
      description:
        "Salaire mentionné tel quel dans l'offre, sinon null (ne jamais inventer)",
    },
    salaryMin: {
      type: "NUMBER" as const,
      description: "Salaire minimum si mentionné en nombre, sinon null",
    },
    salaryMax: {
      type: "NUMBER" as const,
      description: "Salaire maximum si mentionné en nombre, sinon null",
    },
    salaryCurrency: {
      type: "STRING" as const,
      description: "Devise du salaire (EUR, USD, etc.)",
    },
    remotePolicy: {
      type: "STRING" as const,
      description:
        "Politique générale de télétravail (ex: Partiel, Total, Sur site, Non renseigné)",
    },
    remoteDetails: {
      type: "STRING" as const,
      description:
        "Détails précis du télétravail (ex: 1 jour de télétravail par semaine)",
    },
    applicationDeadline: {
      type: "STRING" as const,
      description:
        "Date limite de candidature au format ISO YYYY-MM-DD si présente (ex: 2026-09-04), sinon null",
    },
    jobFunction: {
      type: "STRING" as const,
      description:
        "Fonction ou métier principal (ex: Marketing & Webmarketing)",
    },
    educationLevel: {
      type: "STRING" as const,
      description:
        "Niveaux d'études demandés (ex: Master, MSc ou Programme Grande École; Bac+3, Bachelor)",
    },
    source: {
      type: "STRING" as const,
      description:
        "Plateforme ou source détectée (ex: JobTeaser, LinkedIn, Welcome to the Jungle)",
    },
    sourceUrl: {
      type: "STRING" as const,
      description: "URL de l'offre si présente dans le texte, sinon null",
    },

    missions: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Liste des missions distinctes à accomplir (extraire chaque mission séparément sans les transformer en compétences)",
    },
    responsibilities: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description: "Responsabilités ou périmètres d'action spécifiques",
    },

    requiredSkills: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description: "Compétences techniques obligatoires ou indispensables",
    },
    preferredSkills: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description: "Compétences facultatives, atouts ou 'un plus' apprécié",
    },
    tools: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Outils, logiciels ou plateformes mentionnés (ex: TikTok, Instagram, Ads, Notion, Excel, Figma)",
    },
    requiredLanguages: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          langue: { type: "STRING" as const },
          niveau: { type: "STRING" as const },
          obligatoire: { type: "BOOLEAN" as const },
        },
        required: ["langue"],
      },
      description:
        "Langues obligatoires explicitement mentionnées (ne pas inventer si non précisé)",
    },
    preferredLanguages: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          langue: { type: "STRING" as const },
          niveau: { type: "STRING" as const },
        },
        required: ["langue"],
      },
      description: "Langues mentionnées comme atout",
    },
    qualities: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Qualités personnelles, soft skills, traits de caractère recherchés (ex: créativité, organisation, ouverture d'esprit, force de proposition)",
    },
    experienceRequirements: {
      type: "STRING" as const,
      description:
        "Expérience requise mentionnée (ex: 2 ans d'expérience, Débutant accepté, etc.), null si rien",
    },
    educationRequirements: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Liste de tous les diplômes et niveaux explicitement acceptés (ex: Bac+3, Bachelor, Master, MSc, Programme Grande École)",
    },

    companyName: {
      type: "STRING" as const,
      description: "Nom de l'entreprise (ex: EXO)",
    },
    companyDescription: {
      type: "STRING" as const,
      description: "Description de l'activité de l'entreprise",
    },
    companySector: {
      type: "STRING" as const,
      description: "Secteur d'activité (ex: Loisirs / Culture / Sports)",
    },
    companySize: {
      type: "STRING" as const,
      description:
        "Taille de l'entreprise / effectif (ex: 20 employés, Start-up)",
    },
    companyLocation: {
      type: "STRING" as const,
      description: "Localisation du siège ou des bureaux",
    },
    companyWebsite: {
      type: "STRING" as const,
      description:
        "Site web officiel mentionné dans l'offre (null si absent, ne pas inventer)",
    },
    companyContext: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Faits de contexte de l'entreprise (ex: Levée de fonds de 1 M€, 400 000 utilisateurs, plus de 1 000 000 € de cadeaux distribués)",
    },
    companyPartners: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Partenaires ou clients mentionnés dans l'annonce (ex: Nike, Garmin, Feed, Nutripure, Aroma-Zone, Gymshark)",
    },
    companyMetrics: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          label: {
            type: "STRING" as const,
            description:
              "Nom de la métrique (ex: Utilisateurs, Abonnés Instagram, Salles partenaires, Levée de fonds)",
          },
          value: {
            type: "STRING" as const,
            description: "Valeur chiffrée (ex: 400 000, 75 000, 1 000, 1 M€)",
          },
        },
        required: ["label", "value"],
      },
      description: "Chiffres clés et métriques de l'entreprise",
    },

    recruitmentProcess: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Étapes du processus de recrutement dans l'ordre (ex: 1. Message court, 2. CV, 3. Appel téléphonique, 4. Entretien physique ou visio)",
    },
    applicationMethod: {
      type: "STRING" as const,
      description:
        "Mode de candidature (ex: Candidature simplifiée, Via le site, Email)",
    },
    applicationRequirements: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Documents ou éléments demandés ou différenciants (ex: CV, Message court, Élément différenciant facultatif : meme, TikTok, idée, jeu)",
    },

    benefits: {
      type: "ARRAY" as const,
      items: { type: "STRING" as const },
      description:
        "Avantages mentionnés (ex: Équipe jeune et dynamique, Teambuildings dans les salles partenaires, Petits-déjeuners réguliers, 1 jour de télétravail par semaine, Locaux au cœur de Paris 2e)",
    },

    sourceType: {
      type: "STRING" as const,
      description: "Type de source (ex: job_board, direct_site, email, text)",
    },
    sourceName: {
      type: "STRING" as const,
      description:
        "Nom de la source (ex: JobTeaser, LinkedIn, Welcome to the Jungle)",
    },
    sourcePublishedAt: {
      type: "STRING" as const,
      description:
        "Date de publication de l'offre au format YYYY-MM-DD si indiquée (ex: 2026-08-05), sinon null",
    },
  },
  required: ["title", "company", "missions", "requiredSkills", "qualities"],
};
