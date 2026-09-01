import { z } from "zod";

export const SourceRefSchema = z
  .object({
    text: z.string().default(""),
    page: z.number().optional(),
    blockIndex: z.number().optional(),
  })
  .optional();

export const ImportWarningSchema = z.object({
  field: z.string(),
  message: z.string(),
  severity: z.enum(["info", "warning", "error"]).default("warning"),
});

export const IdentityEntitySchema = z.object({
  firstName: z.string().default(""),
  lastName: z.string().default(""),
  email: z.string().nullable().default(null),
  phone: z.string().nullable().default(null),
  city: z.string().nullable().default(null),
  country: z.string().nullable().default("France"),
  linkedin: z.string().nullable().default(null),
  portfolio: z.string().nullable().default(null),
  github: z.string().nullable().default(null),
  drivingLicense: z.string().nullable().default(null),
  mobility: z.string().nullable().default(null),
  professionalTitle: z.string().nullable().default(null),
  summary: z.string().nullable().default(null),
  source: SourceRefSchema,
});

export const ExperienceEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  title: z.string().default(""),
  company: z.string().default(""),
  location: z.string().nullable().default(null),
  contractType: z.string().nullable().default(null),
  startDate: z.string().nullable().default(null),
  endDate: z.string().nullable().default(null),
  isCurrent: z.boolean().default(false),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  tools: z.array(z.string()).optional().default([]),
  source: SourceRefSchema,
});

export const EducationEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  school: z.string().default(""),
  location: z.string().nullable().default(null),
  degree: z.string().default(""),
  specialization: z.string().nullable().default(null),
  mention: z.string().nullable().default(null),
  startDate: z.string().nullable().default(null),
  endDate: z.string().nullable().default(null),
  isCurrent: z.boolean().optional().default(false),
  courses: z.array(z.string()).optional().default([]),
  source: SourceRefSchema,
});

export const SkillCategoryEnum = z.enum([
  "Commercial",
  "Management",
  "Organisation",
  "Communication",
  "Digital",
  "Outils",
  "Technique",
  "Autre",
]);

export const SkillEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().default(""),
  category: SkillCategoryEnum.default("Autre"),
  level: z.string().nullable().default(null),
  source: SourceRefSchema,
});

export const LanguageEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().default(""),
  level: z.string().nullable().default(null),
  source: SourceRefSchema,
});

export const CertificationEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().default(""),
  score: z.string().nullable().default(null),
  date: z.string().nullable().default(null),
  organization: z.string().nullable().optional().default(null),
  source: SourceRefSchema,
});

export const ProjectEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().default(""),
  description: z.string().default(""),
  type: z.string().nullable().default(null),
  organization: z.string().nullable().default(null),
  date: z.string().nullable().default(null),
  technologies: z.array(z.string()).optional().default([]),
  source: SourceRefSchema,
});

export const InterestEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().default(""),
  description: z.string().nullable().default(null),
  source: SourceRefSchema,
});

export const EngagementEntitySchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  role: z.string().default(""),
  organization: z.string().default(""),
  date: z.string().nullable().default(null),
  description: z.string().default(""),
  source: SourceRefSchema,
});

export const CVImportResultSchema = z.object({
  document: z.object({
    fileName: z.string().default("CV"),
    fileSize: z.number().default(0),
    extractedAt: z.string().default(() => new Date().toISOString()),
    totalCharacters: z.number().default(0),
  }),
  identity: IdentityEntitySchema,
  experiences: z.array(ExperienceEntitySchema).default([]),
  education: z.array(EducationEntitySchema).default([]),
  skills: z.array(SkillEntitySchema).default([]),
  languages: z.array(LanguageEntitySchema).default([]),
  certifications: z.array(CertificationEntitySchema).default([]),
  projects: z.array(ProjectEntitySchema).default([]),
  interests: z.array(InterestEntitySchema).default([]),
  engagements: z.array(EngagementEntitySchema).default([]),
  warnings: z.array(ImportWarningSchema).default([]),
  metadata: z.object({
    counts: z.object({
      experiences: z.number().default(0),
      education: z.number().default(0),
      skills: z.number().default(0),
      languages: z.number().default(0),
      certifications: z.number().default(0),
      projects: z.number().default(0),
      interests: z.number().default(0),
      engagements: z.number().default(0),
    }),
    hasAmbiguities: z.boolean().default(false),
    processingTimeMs: z.number().default(0),
  }),
});
