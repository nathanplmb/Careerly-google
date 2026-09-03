import { z } from "zod";

export const CvImportIdentitySchema = z.object({
  firstName: z.string().trim().nullable().default(null),
  lastName: z.string().trim().nullable().default(null),
  professionalTitle: z.string().trim().nullable().default(null),
  email: z.string().trim().nullable().default(null),
  phone: z.string().trim().nullable().default(null),
  city: z.string().trim().nullable().default(null),
  postalCode: z.string().trim().nullable().default(null),
  country: z.string().trim().nullable().default("France"),
  drivingLicense: z.string().trim().nullable().default(null),
  mobility: z.string().trim().nullable().default(null),
  linkedin: z.string().trim().nullable().default(null),
  portfolio: z.string().trim().nullable().default(null),
  github: z.string().trim().nullable().default(null),
  website: z.string().trim().nullable().default(null),
});

export const CvImportSummarySchema = z.object({
  headline: z.string().trim().nullable().default(null),
  careerObjective: z.string().trim().nullable().default(null),
  shortBio: z.string().trim().nullable().default(null),
});

export const CvImportExperienceSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  title: z.string().trim().min(1, "L'intitulé du poste est requis"),
  company: z.string().trim().min(1, "Le nom de l'entreprise est requis"),
  location: z.string().trim().nullable().default(null),
  contractType: z.string().trim().nullable().default(null),
  startDate: z.string().trim().nullable().default(null),
  endDate: z.string().trim().nullable().default(null),
  isCurrent: z.boolean().default(false),
  description: z.string().trim().nullable().default(null),
  missions: z.array(z.string().trim()).default([]),
  responsibilities: z.array(z.string().trim()).default([]),
  achievements: z.array(z.string().trim()).default([]),
  results: z.array(z.string().trim()).default([]),
  quantifiedResults: z.array(z.string().trim()).optional().default([]),
  tools: z.array(z.string().trim()).default([]),
  skills: z.array(z.string().trim()).default([]),
  employmentType: z.string().trim().nullable().optional().default(null),
  sourceText: z.string().trim().nullable().optional().default(null),
});

export const CvImportEducationSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  degree: z.string().trim().min(1, "L'intitulé du diplôme est requis"),
  school: z.string().trim().min(1, "L'établissement est requis"),
  location: z.string().trim().nullable().default(null),
  specialization: z.string().trim().nullable().default(null),
  program: z.string().trim().nullable().optional().default(null),
  track: z.string().trim().nullable().optional().default(null),
  grade: z.string().trim().nullable().default(null),
  honors: z.string().trim().nullable().optional().default(null),
  startDate: z.string().trim().nullable().default(null),
  endDate: z.string().trim().nullable().default(null),
  graduationYear: z.string().trim().nullable().optional().default(null),
  isCurrent: z.boolean().default(false),
  keyCourses: z.array(z.string().trim()).default([]),
  options: z.array(z.string().trim()).optional().default([]),
  description: z.string().trim().nullable().optional().default(null),
  sourceText: z.string().trim().nullable().optional().default(null),
});

export const CvImportSkillSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
  category: z.string().trim().nullable().default(null),
  level: z.string().trim().nullable().default(null),
  relatedExperiences: z.array(z.string().trim()).optional().default([]),
  relatedProjects: z.array(z.string().trim()).optional().default([]),
});

export const CvImportToolSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
  category: z.string().trim().nullable().default(null),
  level: z.string().trim().nullable().default(null),
  relatedExperiences: z.array(z.string().trim()).optional().default([]),
  relatedProjects: z.array(z.string().trim()).optional().default([]),
});

export const CvImportSoftSkillSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
});

export const CvImportLanguageSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
  level: z.string().trim().nullable().default(null),
  associatedCertification: z
    .string()
    .trim()
    .nullable()
    .optional()
    .default(null),
  score: z.string().trim().nullable().optional().default(null),
  attestation: z.string().trim().nullable().optional().default(null),
  certifications: z
    .array(
      z.object({
        name: z.string().trim(),
        score: z.string().trim().nullable().optional().default(null),
        level: z.string().trim().nullable().optional().default(null),
      }),
    )
    .optional()
    .default([]),
});

export const CvImportCertificationSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
  organization: z.string().trim().nullable().default(null),
  issuer: z.string().trim().nullable().optional().default(null),
  score: z.string().trim().nullable().default(null),
  level: z.string().trim().nullable().optional().default(null),
  language: z.string().trim().nullable().optional().default(null),
  date: z.string().trim().nullable().default(null),
  validity: z.string().trim().nullable().optional().default(null),
  credentialId: z.string().trim().nullable().optional().default(null),
  description: z.string().trim().nullable().optional().default(null),
  sourceText: z.string().trim().nullable().optional().default(null),
});

export const CvImportProjectSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
  type: z.string().trim().nullable().default(null),
  context: z.string().trim().nullable().optional().default(null),
  organization: z.string().trim().nullable().optional().default(null),
  school: z.string().trim().nullable().optional().default(null),
  startDate: z.string().trim().nullable().optional().default(null),
  endDate: z.string().trim().nullable().optional().default(null),
  date: z.string().trim().nullable().default(null),
  description: z.string().trim().default(""),
  objective: z.string().trim().nullable().optional().default(null),
  role: z.string().trim().nullable().optional().default(null),
  missions: z.array(z.string().trim()).default([]),
  responsibilities: z.array(z.string().trim()).default([]),
  achievements: z.array(z.string().trim()).default([]),
  results: z.array(z.string().trim()).default([]),
  tools: z.array(z.string().trim()).default([]),
  skills: z.array(z.string().trim()).default([]),
  collaborators: z.array(z.string().trim()).optional().default([]),
  url: z.string().trim().nullable().default(null),
  sourceText: z.string().trim().nullable().optional().default(null),
});

export const CvImportAssociationSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  organization: z.string().trim().min(1),
  role: z.string().trim().nullable().default(null),
  startDate: z.string().trim().nullable().optional().default(null),
  endDate: z.string().trim().nullable().optional().default(null),
  isCurrent: z.boolean().default(false),
  date: z.string().trim().nullable().default(null),
  description: z.string().trim().nullable().default(null),
  missions: z.array(z.string().trim()).default([]),
  responsibilities: z.array(z.string().trim()).default([]),
  achievements: z.array(z.string().trim()).default([]),
  results: z.array(z.string().trim()).default([]),
  teamSize: z.string().trim().nullable().optional().default(null),
  budget: z.string().trim().nullable().optional().default(null),
  tools: z.array(z.string().trim()).default([]),
  skills: z.array(z.string().trim()).default([]),
  sourceText: z.string().trim().nullable().optional().default(null),
});

export const CvImportInterestSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).slice(2, 10)),
  name: z.string().trim().min(1),
  category: z.string().trim().nullable().optional().default(null),
  description: z.string().trim().nullable().optional().default(null),
  subtopics: z.array(z.string().trim()).default([]),
  activities: z.array(z.string().trim()).optional().default([]),
  details: z.string().trim().nullable().default(null),
  sourceText: z.string().trim().nullable().optional().default(null),
});

export const CvImportCorrelationsSchema = z.object({
  languagesAndCertifications: z
    .array(
      z.object({
        language: z.string(),
        level: z.string().nullable().optional(),
        certificationName: z.string(),
        score: z.string().nullable().optional(),
        attestation: z.string().nullable().optional(),
      }),
    )
    .default([]),
  experienceSkillsAndTools: z
    .array(
      z.object({
        experienceTitle: z.string(),
        company: z.string(),
        skills: z.array(z.string()),
        tools: z.array(z.string()),
      }),
    )
    .default([]),
  projectSkillsAndTools: z
    .array(
      z.object({
        projectName: z.string(),
        context: z.string().nullable().optional(),
        skills: z.array(z.string()),
        tools: z.array(z.string()),
      }),
    )
    .default([]),
});

export const CvImportRawGeminiSchema = z.object({
  identity: CvImportIdentitySchema.default({}),
  summary: CvImportSummarySchema.default({}),
  experiences: z.array(CvImportExperienceSchema).default([]),
  education: z.array(CvImportEducationSchema).default([]),
  skills: z.array(CvImportSkillSchema).default([]),
  tools: z.array(CvImportToolSchema).default([]),
  softSkills: z.array(CvImportSoftSkillSchema).default([]),
  languages: z.array(CvImportLanguageSchema).default([]),
  certifications: z.array(CvImportCertificationSchema).default([]),
  projects: z.array(CvImportProjectSchema).default([]),
  associations: z.array(CvImportAssociationSchema).default([]),
  interests: z.array(CvImportInterestSchema).default([]),
  correlations: CvImportCorrelationsSchema.optional().default({
    languagesAndCertifications: [],
    experienceSkillsAndTools: [],
    projectSkillsAndTools: [],
  }),
});

export type CvImportRawGemini = z.infer<typeof CvImportRawGeminiSchema>;

/**
 * Schéma Zod principal pour le résultat complet
 */
export const cvImportResultSchema = CvImportRawGeminiSchema.extend({
  audit: z
    .object({
      rawTextLength: z.number().default(0),
      detectedCounts: z
        .object({
          experiences: z.number().default(0),
          education: z.number().default(0),
          skills: z.number().default(0),
          tools: z.number().default(0),
          softSkills: z.number().default(0),
          languages: z.number().default(0),
          certifications: z.number().default(0),
          projects: z.number().default(0),
          associations: z.number().default(0),
          interests: z.number().default(0),
        })
        .default({
          experiences: 0,
          education: 0,
          skills: 0,
          tools: 0,
          softSkills: 0,
          languages: 0,
          certifications: 0,
          projects: 0,
          associations: 0,
          interests: 0,
        }),
      completenessCheckPassed: z.boolean().default(true),
      warnings: z
        .array(
          z.object({
            field: z.string(),
            message: z.string(),
            severity: z.enum(["info", "warning"]).default("info"),
          }),
        )
        .default([]),
      processingTimeMs: z.number().default(0),
    })
    .default({}),
  rawText: z.string().default(""),
});

/**
 * Schéma JSON strict pour l'API @google/genai
 */
export const geminiCvImportResponseSchema = {
  type: "OBJECT" as const,
  properties: {
    identity: {
      type: "OBJECT" as const,
      properties: {
        firstName: { type: "STRING" as const },
        lastName: { type: "STRING" as const },
        professionalTitle: { type: "STRING" as const },
        email: { type: "STRING" as const },
        phone: { type: "STRING" as const },
        city: { type: "STRING" as const },
        postalCode: { type: "STRING" as const },
        country: { type: "STRING" as const },
        drivingLicense: { type: "STRING" as const },
        mobility: { type: "STRING" as const },
        linkedin: { type: "STRING" as const },
        portfolio: { type: "STRING" as const },
        github: { type: "STRING" as const },
        website: { type: "STRING" as const },
      },
    },
    summary: {
      type: "OBJECT" as const,
      properties: {
        headline: { type: "STRING" as const },
        careerObjective: { type: "STRING" as const },
        shortBio: { type: "STRING" as const },
      },
    },
    experiences: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          title: { type: "STRING" as const },
          company: { type: "STRING" as const },
          location: { type: "STRING" as const },
          contractType: { type: "STRING" as const },
          startDate: { type: "STRING" as const },
          endDate: { type: "STRING" as const },
          isCurrent: { type: "BOOLEAN" as const },
          description: { type: "STRING" as const },
          missions: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          responsibilities: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          achievements: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          results: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          tools: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          skills: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          sourceText: { type: "STRING" as const },
        },
        required: ["title", "company"],
      },
    },
    education: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          degree: { type: "STRING" as const },
          school: { type: "STRING" as const },
          location: { type: "STRING" as const },
          specialization: { type: "STRING" as const },
          track: { type: "STRING" as const },
          grade: { type: "STRING" as const },
          honors: { type: "STRING" as const },
          startDate: { type: "STRING" as const },
          endDate: { type: "STRING" as const },
          isCurrent: { type: "BOOLEAN" as const },
          keyCourses: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          options: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          description: { type: "STRING" as const },
          sourceText: { type: "STRING" as const },
        },
        required: ["degree", "school"],
      },
    },
    skills: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
          category: { type: "STRING" as const },
          level: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
    tools: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
          category: { type: "STRING" as const },
          level: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
    softSkills: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
    languages: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
          level: { type: "STRING" as const },
          associatedCertification: { type: "STRING" as const },
          score: { type: "STRING" as const },
          attestation: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
    certifications: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
          organization: { type: "STRING" as const },
          score: { type: "STRING" as const },
          level: { type: "STRING" as const },
          language: { type: "STRING" as const },
          date: { type: "STRING" as const },
          description: { type: "STRING" as const },
          sourceText: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
    projects: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
          type: { type: "STRING" as const },
          context: { type: "STRING" as const },
          date: { type: "STRING" as const },
          startDate: { type: "STRING" as const },
          endDate: { type: "STRING" as const },
          description: { type: "STRING" as const },
          role: { type: "STRING" as const },
          missions: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          responsibilities: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          achievements: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          results: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          tools: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          skills: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          url: { type: "STRING" as const },
          sourceText: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
    associations: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          organization: { type: "STRING" as const },
          role: { type: "STRING" as const },
          date: { type: "STRING" as const },
          startDate: { type: "STRING" as const },
          endDate: { type: "STRING" as const },
          isCurrent: { type: "BOOLEAN" as const },
          description: { type: "STRING" as const },
          missions: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          responsibilities: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          achievements: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          results: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          teamSize: { type: "STRING" as const },
          tools: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          skills: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          sourceText: { type: "STRING" as const },
        },
        required: ["organization"],
      },
    },
    interests: {
      type: "ARRAY" as const,
      items: {
        type: "OBJECT" as const,
        properties: {
          name: { type: "STRING" as const },
          category: { type: "STRING" as const },
          description: { type: "STRING" as const },
          subtopics: {
            type: "ARRAY" as const,
            items: { type: "STRING" as const },
          },
          details: { type: "STRING" as const },
          sourceText: { type: "STRING" as const },
        },
        required: ["name"],
      },
    },
  },
  required: [
    "identity",
    "experiences",
    "education",
    "skills",
    "tools",
    "languages",
    "certifications",
  ],
};
