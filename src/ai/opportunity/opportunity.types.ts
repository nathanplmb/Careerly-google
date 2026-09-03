export interface OpportunityCompanyMetric {
  label: string;
  value: string;
}

export interface OpportunityLanguage {
  langue: string;
  niveau?: string;
  obligatoire?: boolean;
}

export interface OpportunityExtractedData {
  // Informations principales
  title: string;
  company: string;
  location: string;
  country?: string | null;
  contractType?: string | null;
  // Alias de compatibilité français
  poste?: string;
  entreprise?: string;
  lieu?: string;
  typeContrat?: string | null;
  duration?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  salary?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string | null;
  remotePolicy?: string | null;
  remoteDetails?: string | null;
  applicationDeadline?: string | null;
  jobFunction?: string | null;
  educationLevel?: string | null;
  source?: string | null;
  sourceUrl?: string | null;

  // Missions
  missions: string[];
  responsibilities: string[];

  // Profil recherché
  requiredSkills: string[];
  preferredSkills: string[];
  tools: string[];
  requiredLanguages: OpportunityLanguage[];
  preferredLanguages: OpportunityLanguage[];
  qualities: string[];
  experienceRequirements?: string | null;
  educationRequirements: string[];

  // Entreprise
  companyName?: string | null;
  companyDescription?: string | null;
  companySector?: string | null;
  companySize?: string | null;
  companyLocation?: string | null;
  companyWebsite?: string | null;
  companyContext: string[];
  companyPartners: string[];
  companyMetrics: OpportunityCompanyMetric[];

  // Recrutement
  recruitmentProcess: string[];
  applicationMethod?: string | null;
  applicationRequirements: string[];

  // Avantages
  benefits: string[];

  // Source & Métadonnées d'extraction
  sourceType?: string | null;
  sourceName?: string | null;
  sourcePublishedAt?: string | null;
  extractedAt?: string | null;
}

export interface OpportunityIntelligence extends OpportunityExtractedData {
  // Suivi NACORA (géré par l'utilisateur / application, jamais déduit par l'IA)
  status: string;
  appliedAt?: string | null;
  followUpDate?: string | null;
  lastContactDate?: string | null;
  personalNotes?: string;
}
