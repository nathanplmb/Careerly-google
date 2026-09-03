/**
 * Types TypeScript stricts pour le module indépendant CV Importer IA de NACORA (V4).
 * Garantie d'exhaustivité et de fidélité absolue au document source :
 * - Conservation exhaustive du contenu détaillé (missions, responsabilités, chiffres)
 * - Corrélations entre les données (langues <-> certifications <-> scores)
 * - Objets riches (projets, associations, centres d'intérêt avec sous-thèmes)
 * - Auditabilité avec sourceText
 */

export interface CvImportIdentity {
  firstName: string | null;
  lastName: string | null;
  professionalTitle: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  drivingLicense: string | null;
  mobility: string | null;
  linkedin: string | null;
  portfolio: string | null;
  github: string | null;
  website: string | null;
}

export interface CvImportSummary {
  headline: string | null;
  careerObjective: string | null;
  shortBio: string | null;
}

export interface CvImportExperience {
  id: string;
  title: string;
  company: string;
  location: string | null;
  contractType: string | null; // Stage, Alternance, CDI, CDD, Freelance, etc.
  startDate: string | null; // Format YYYY-MM ou YYYY
  endDate: string | null; // Format YYYY-MM ou YYYY
  isCurrent: boolean;
  description: string | null;
  missions: string[]; // Liste exhaustive de toutes les missions
  responsibilities: string[]; // Responsabilités détaillées
  achievements: string[]; // Réalisations clés
  results: string[]; // Résultats chiffrés, pourcentages, KPIs
  quantifiedResults?: string[];
  tools: string[]; // Outils ou technologies spécifiques au poste
  skills: string[]; // Compétences mobilisées lors du poste
  employmentType?: string | null;
  sourceText?: string | null;
}

export interface CvImportEducation {
  id: string;
  degree: string; // Ex: BUT Techniques de Commercialisation, Master Finance
  school: string; // Ex: IUT de Toulon, Université Paris 1
  location: string | null;
  specialization: string | null; // Ex: Majeure Finance d'entreprise
  program?: string | null;
  track?: string | null; // Ex: Parcours stratégie de marque et événementiel
  grade: string | null; // Ex: Mention Bien
  honors?: string | null;
  startDate: string | null;
  endDate: string | null;
  graduationYear?: string | null;
  isCurrent: boolean;
  keyCourses: string[]; // Matières clés mentionnées
  options?: string[];
  description?: string | null;
  sourceText?: string | null;
}

export interface CvImportSkill {
  id: string;
  name: string; // Compétence métier / savoir-faire (ex: Prospection commerciale)
  category?: string | null;
  level: string | null; // Strictement si précisé dans le document, sinon null
  relatedExperiences?: string[];
  relatedProjects?: string[];
}

export interface CvImportTool {
  id: string;
  name: string; // Outil / logiciel (ex: Canva, Excel, Notion, Python)
  category?: string | null; // Ex: Bureautique, Design, Programmation
  level: string | null;
  relatedExperiences?: string[];
  relatedProjects?: string[];
}

export interface CvImportSoftSkill {
  id: string;
  name: string; // Qualité comportementale (ex: Aisance relationnelle, Esprit d'équipe)
}

export interface CvImportLanguage {
  id: string;
  name: string; // Ex: Français, Anglais, Espagnol (JAMAIS un score de test)
  level: string | null; // Ex: Langue maternelle, Bilingue, C1, B2, B1/B2, Courant
  associatedCertification?: string | null; // Ex: "TOEIC"
  score?: string | null; // Ex: "745/990"
  attestation?: string | null; // Ex: "Attestation de niveau d'anglais B2"
  certifications?: Array<{
    name: string;
    score?: string | null;
    level?: string | null;
  }>;
}

export interface CvImportCertification {
  id: string;
  name: string; // Ex: TOEIC, TAGE MAGE, Certification AMF, CLES B2
  organization: string | null; // Ex: ETS Global, FNEGE
  issuer?: string | null;
  score: string | null; // Ex: 745/990, 337/600
  level?: string | null; // Ex: B2
  language?: string | null; // Langue reliée (ex: "Anglais")
  date: string | null; // Date ou année d'obtention
  validity?: string | null;
  credentialId?: string | null;
  description?: string | null;
  sourceText?: string | null;
}

export interface CvImportProject {
  id: string;
  name: string; // Ex: Podcast Gamberge, Vinocoffrets
  type: string | null; // Ex: Académique, Personnel, Entrepreneuriat, Étude de cas
  context: string | null; // Ex: BUT Techniques de Commercialisation
  organization?: string | null;
  school?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  date: string | null;
  description: string;
  objective?: string | null;
  role?: string | null;
  missions: string[];
  responsibilities: string[];
  achievements: string[];
  results: string[];
  tools: string[];
  skills: string[];
  collaborators?: string[];
  url: string | null;
  sourceText?: string | null;
}

export interface CvImportAssociation {
  id: string;
  organization: string; // Ex: PRO.TE.CO
  role: string | null; // Ex: Chef de service Communication & Médias, Membre actif
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
  date: string | null;
  description: string | null;
  missions: string[];
  responsibilities: string[];
  achievements: string[];
  results: string[];
  teamSize?: string | null; // Ex: "Management 24 membres"
  budget?: string | null;
  tools: string[];
  skills: string[];
  sourceText?: string | null;
}

export interface CvImportInterest {
  id: string;
  name: string; // Ex: Automobile, Horlogerie, Économie
  category?: string | null;
  description?: string | null;
  subtopics: string[]; // Ex: ["F1", "WEC"] pour Automobile
  activities?: string[];
  details: string | null;
  sourceText?: string | null;
}

export interface CvImportCorrelations {
  languagesAndCertifications: Array<{
    language: string;
    level?: string | null;
    certificationName: string;
    score?: string | null;
    attestation?: string | null;
  }>;
  experienceSkillsAndTools: Array<{
    experienceTitle: string;
    company: string;
    skills: string[];
    tools: string[];
  }>;
  projectSkillsAndTools: Array<{
    projectName: string;
    context?: string | null;
    skills: string[];
    tools: string[];
  }>;
}

export interface CvImportAuditReport {
  rawTextLength: number;
  detectedCounts: {
    experiences: number;
    education: number;
    skills: number;
    tools: number;
    softSkills: number;
    languages: number;
    certifications: number;
    projects: number;
    associations: number;
    interests: number;
  };
  completenessCheckPassed: boolean;
  warnings: Array<{
    field: string;
    message: string;
    severity: "info" | "warning";
  }>;
  processingTimeMs: number;
}

export interface CvImportResult {
  identity: CvImportIdentity;
  summary: CvImportSummary;
  experiences: CvImportExperience[];
  education: CvImportEducation[];
  skills: CvImportSkill[];
  tools: CvImportTool[];
  softSkills: CvImportSoftSkill[];
  languages: CvImportLanguage[];
  certifications: CvImportCertification[];
  projects: CvImportProject[];
  associations: CvImportAssociation[];
  interests: CvImportInterest[];
  correlations?: CvImportCorrelations;
  audit: CvImportAuditReport;
  rawText: string;
}

export type CvImportStep =
  | "idle"
  | "reading"
  | "identifying"
  | "structuring"
  | "verifying"
  | "preview"
  | "error";
