/**
 * Types TypeScript du module CV Importer V2 de NACORA.
 * Architecture déterministe, traçable et sans données fictives.
 */

export type SectionType =
  | "IDENTITE"
  | "PROFIL"
  | "OBJECTIF"
  | "EXPERIENCES"
  | "FORMATION"
  | "COMPETENCES"
  | "LANGUES"
  | "CERTIFICATIONS"
  | "PROJETS"
  | "CENTRES_INTERET"
  | "ENGAGEMENTS"
  | "BENEVOLAT"
  | "CONTACT"
  | "AUTRES";

export interface TextBlockItem {
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  page?: number;
}

export interface DocumentPage {
  pageNumber: number;
  blocks: TextBlockItem[];
  text: string;
}

export interface DocumentStructure {
  fileName: string;
  fileSize: number;
  fileType: "pdf" | "docx" | "txt" | "rtf" | "autre";
  pages: DocumentPage[];
  plainText: string;
}

export interface DetectedSection {
  type: SectionType;
  rawHeader: string;
  confidence: number;
  lines: string[];
  startIndex: number;
  endIndex: number;
  pageNumber?: number;
}

export interface SourceRef {
  text: string;
  page?: number;
  blockIndex?: number;
}

export interface ImportWarning {
  field: string;
  message: string;
  severity: "info" | "warning" | "error";
}

export interface RawEntityBlock {
  sectionType: SectionType;
  rawText: string;
  lines: string[];
  headerLine?: string;
  source?: SourceRef;
}

export interface SegmentedBlocks {
  identityLines: string[];
  experienceBlocks: RawEntityBlock[];
  educationBlocks: RawEntityBlock[];
  skillBlocks: RawEntityBlock[];
  languageBlocks: RawEntityBlock[];
  certificationBlocks: RawEntityBlock[];
  projectBlocks: RawEntityBlock[];
  interestBlocks: RawEntityBlock[];
  engagementBlocks: RawEntityBlock[];
  otherBlocks: RawEntityBlock[];
}

export interface IdentityEntity {
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  linkedin: string | null;
  portfolio: string | null;
  github: string | null;
  drivingLicense: string | null;
  mobility: string | null;
  professionalTitle: string | null;
  summary: string | null;
  source?: SourceRef;
}

export interface ExperienceEntity {
  id: string;
  title: string;
  company: string;
  location: string | null;
  contractType: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  responsibilities: string[];
  achievements: string[];
  tools?: string[];
  source?: SourceRef;
}

export interface EducationEntity {
  id: string;
  school: string;
  location: string | null;
  degree: string;
  specialization: string | null;
  mention: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent?: boolean;
  courses?: string[];
  source?: SourceRef;
}

export interface SkillEntity {
  id: string;
  name: string;
  category:
    | "Commercial"
    | "Management"
    | "Organisation"
    | "Communication"
    | "Digital"
    | "Outils"
    | "Technique"
    | "Autre";
  level: string | null;
  source?: SourceRef;
}

export interface LanguageEntity {
  id: string;
  name: string;
  level: string | null;
  source?: SourceRef;
}

export interface CertificationEntity {
  id: string;
  name: string;
  score: string | null;
  date: string | null;
  organization?: string | null;
  source?: SourceRef;
}

export interface ProjectEntity {
  id: string;
  name: string;
  description: string;
  type: string | null;
  organization: string | null;
  date: string | null;
  technologies?: string[];
  source?: SourceRef;
}

export interface InterestEntity {
  id: string;
  name: string;
  description: string | null;
  source?: SourceRef;
}

export interface EngagementEntity {
  id: string;
  role: string;
  organization: string;
  date: string | null;
  description: string;
  source?: SourceRef;
}

export interface CVImportResult {
  document: {
    fileName: string;
    fileSize: number;
    extractedAt: string;
    totalCharacters: number;
  };
  identity: IdentityEntity;
  experiences: ExperienceEntity[];
  education: EducationEntity[];
  skills: SkillEntity[];
  languages: LanguageEntity[];
  certifications: CertificationEntity[];
  projects: ProjectEntity[];
  interests: InterestEntity[];
  engagements: EngagementEntity[];
  warnings: ImportWarning[];
  metadata: {
    counts: {
      experiences: number;
      education: number;
      skills: number;
      languages: number;
      certifications: number;
      projects: number;
      interests: number;
      engagements: number;
    };
    hasAmbiguities: boolean;
    processingTimeMs: number;
  };
}

export type CVImportFlowStatus =
  | "idle"
  | "uploading"
  | "reading"
  | "segmenting"
  | "analyzing"
  | "validating"
  | "preview"
  | "diff"
  | "confirmed"
  | "error";

export interface DiffItem<T> {
  entityType:
    | "identity"
    | "experience"
    | "education"
    | "skill"
    | "language"
    | "certification"
    | "project"
    | "interest";
  status: "new" | "identical" | "conflict";
  imported: T;
  existing?: T;
  description: string;
  selected: boolean;
}

export interface ProfileDiff {
  experiences: DiffItem<ExperienceEntity>[];
  education: DiffItem<EducationEntity>[];
  skills: DiffItem<SkillEntity>[];
  languages: DiffItem<LanguageEntity>[];
  certifications: DiffItem<CertificationEntity>[];
  projects: DiffItem<ProjectEntity>[];
  interests: DiffItem<InterestEntity>[];
  identityChangedFields: {
    field: string;
    label: string;
    imported: string | null;
    existing: string | null;
    selected: boolean;
  }[];
}
