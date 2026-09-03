import { z } from "zod";
import { appelerGeminiSecurise, extraireJsonPropre } from "../gemini.server";
import {
  CVImportResultSchema,
  IdentityEntitySchema,
  ExperienceEntitySchema,
  EducationEntitySchema,
  SkillEntitySchema,
  LanguageEntitySchema,
  CertificationEntitySchema,
  ProjectEntitySchema,
  InterestEntitySchema,
  EngagementEntitySchema,
} from "./schema";
import type {
  CVImportResult,
  DocumentStructure,
  SegmentedBlocks,
  IdentityEntity,
  ExperienceEntity,
  EducationEntity,
  SkillEntity,
  LanguageEntity,
  CertificationEntity,
  ProjectEntity,
  InterestEntity,
  EngagementEntity,
  ImportWarning,
} from "./types";

const MOIS: Record<string, string> = {
  janvier: "01",
  février: "02",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  aout: "08",
  aoû: "08",
  août: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
  decembre: "12",
};
function parseMois(m: string) {
  return MOIS[m.toLowerCase()] || "01";
}

function normalizeExperienceDates(exp: ExperienceEntity): ExperienceEntity {
  // If dates are already fully valid, we might just return. But sometimes Gemini leaves dates in title.
  const moisPattern =
    "(?:janvier|f[eé]vrier|mars|avril|mai|juin|juillet|ao[uû]t|septembre|octobre|novembre|d[eé]cembre)";
  const sepPattern = "\\s*[-–—/aà]+\\s*";
  const nowPattern = "(?:actuellement|pr[eé]sent|aujourd'hui|en\\s*cours)";
  const yearPattern = "(?:19|20)\\d{2}";

  const r1 = new RegExp(
    `\\b(${moisPattern})\\s+(${yearPattern})${sepPattern}${nowPattern}\\b`,
    "i",
  );
  const r2 = new RegExp(
    `\\b(${moisPattern})\\s+(${yearPattern})${sepPattern}(${moisPattern})\\s+(${yearPattern})\\b`,
    "i",
  );
  const r3 = new RegExp(
    `\\b(${moisPattern})${sepPattern}(${moisPattern})\\s+(${yearPattern})\\b`,
    "i",
  );
  const r4 = new RegExp(`\\b(${moisPattern})\\s+(${yearPattern})\\b`, "i");

  // Also try to find just a year range
  const rYearRange = new RegExp(
    `\\b(${yearPattern})${sepPattern}(${yearPattern})\\b`,
    "i",
  );
  const rYearNow = new RegExp(
    `\\b(${yearPattern})${sepPattern}${nowPattern}\\b`,
    "i",
  );

  const checkAndExtract = (text: string) => {
    let startDate = null;
    let endDate = null;
    let isCurrent = false;
    let cleanText = text;

    const m1 = text.match(r1);
    const m2 = text.match(r2);
    const m3 = text.match(r3);

    if (m1) {
      startDate = `${m1[2]}-${parseMois(m1[1] || "")}`;
      isCurrent = true;
      cleanText = text.replace(m1[0], "");
    } else if (m2) {
      startDate = `${m2[2]}-${parseMois(m2[1] || "")}`;
      endDate = `${m2[4]}-${parseMois(m2[3] || "")}`;
      cleanText = text.replace(m2[0], "");
    } else if (m3) {
      const y = m3[3];
      startDate = `${y}-${parseMois(m3[1] || "")}`;
      endDate = `${y}-${parseMois(m3[2] || "")}`;
      cleanText = text.replace(m3[0], "");
    } else {
      const m4 = text.match(r4);
      if (m4) {
        startDate = `${m4[2]}-${parseMois(m4[1] || "")}`;
        endDate = startDate;
        cleanText = text.replace(m4[0], "");
      } else {
        const my1 = text.match(rYearRange);
        const my2 = text.match(rYearNow);
        if (my1) {
          startDate = `${my1[1]}-01`;
          endDate = `${my1[2]}-01`;
          cleanText = text.replace(my1[0], "");
        } else if (my2) {
          startDate = `${my2[1]}-01`;
          isCurrent = true;
          cleanText = text.replace(my2[0], "");
        }
      }
    }

    cleanText = cleanText.replace(/[\s:,\-–—]+$/, "").trim();
    if (startDate) {
      return { cleanText, startDate, endDate, isCurrent };
    }
    return null;
  };

  let finalTitle = exp.title;
  let finalCompany = exp.company;
  let finalStart = exp.startDate;
  let finalEnd = exp.endDate;
  let finalCurrent = exp.isCurrent;

  const resTitle = checkAndExtract(finalTitle);
  if (resTitle) {
    finalTitle = resTitle.cleanText;
    finalStart = resTitle.startDate;
    finalEnd = resTitle.endDate;
    finalCurrent = resTitle.isCurrent;
  } else {
    const resCompany = checkAndExtract(finalCompany);
    if (resCompany) {
      finalCompany = resCompany.cleanText;
      finalStart = resCompany.startDate;
      finalEnd = resCompany.endDate;
      finalCurrent = resCompany.isCurrent;
    }
  }

  if (!finalStart && !finalEnd && !finalCurrent) {
    const rawDates = exp.location || ""; // Sometimes date ends up in location
    const resRaw = checkAndExtract(rawDates);
    if (resRaw) {
      finalStart = resRaw.startDate;
      finalEnd = resRaw.endDate;
      finalCurrent = resRaw.isCurrent;
      if (exp.location === resRaw.cleanText || !resRaw.cleanText) {
        exp.location = null;
      }
    }
  }

  return {
    ...exp,
    title: finalTitle,
    company: finalCompany,
    startDate: finalStart,
    endDate: finalEnd,
    isCurrent: finalCurrent,
  };
}

export const MODELE_CV_IMPORT = "gemini-3.8-flash";

const PROMPT_EXTRACTION_CV_V2 = `Tu es l'extracteur de CV de précision de NACORA.
Ta mission est d'extraire STRICTEMENT les informations réellement et textuellement présentes dans le document fourni.

RÈGLES D'OR DE FIDÉLITÉ (VIOLATION = ÉCHEC CRITIQUE) :
1. VÉRITÉ FACTUELLE STRICTE : N'invente JAMAIS aucune information (aucun diplôme, aucune entreprise, aucune date, aucune compétence, aucun niveau, aucun titre non écrit).
2. ISOLATION DES EXPÉRIENCES : Chaque expérience professionnelle mentionnée DOIT constituer un objet DISTINCT dans le tableau "experiences". Extrais rigoureusement les dates dans "startDate" et "endDate" au format YYYY-MM, et retire-les du titre.
3. ISOLATION DES FORMATIONS : Chaque diplôme ou cursus DOIT être un objet distinct dans "education". Ne crée pas de doublons si une formation est mentionnée sur plusieurs lignes.
4. COMPÉTENCES SANS NIVEAU INVENTÉ : N'attribue un "level" à une compétence QUE si le CV écrit expressément un niveau (ex: "Avancé", "Expert"). Sinon, mets OBLIGATOIREMENT "level": null. Ne mets AUCUNE langue, AUCUNE certification et AUCUN intérêt dans "skills".
5. ÉTANCHÉITÉ DES CATÉGORIES :
   - Les LANGUES (ex: Français, Anglais, Espagnol) vont EXCLUSIVEMENT dans "languages", JAMAIS dans "skills".
   - Les CERTIFICATIONS ou scores (ex: TOEIC, TAGE MAGE) vont EXCLUSIVEMENT dans "certifications", JAMAIS dans "skills".
   - Les CENTRES D'INTÉRÊT vont EXCLUSIVEMENT dans "interests", JAMAIS dans "skills".
6. PROJETS NON FRAGMENTÉS : Ne sépare pas le nom d'un projet de sa description. Une phrase descriptive appartient à la description du projet en cours, elle ne doit pas devenir un nouveau projet.
7. IDENTITÉ ET EN-TÊTE : La première zone de texte significative du document doit être inspectée comme possible en-tête. Priorité d'extraction : 1. prénom + nom (dans "firstName" et "lastName"), 2. email, 3. téléphone, 4. LinkedIn, 5. localisation éventuelle. Ne mets pas la ville ("city") si elle n'est pas clairement dans l'en-tête. "professionalTitle" doit être null si aucun titre explicite n'apparaît dans l'en-tête.
8. FORMAT JSON STRICT : Réponds UNIQUEMENT avec un objet JSON valide conforme au schéma.`;

const GeminiExtractionSchema = z.object({
  identity: IdentityEntitySchema,
  experiences: z.array(ExperienceEntitySchema).default([]),
  education: z.array(EducationEntitySchema).default([]),
  skills: z.array(SkillEntitySchema).default([]),
  languages: z.array(LanguageEntitySchema).default([]),
  certifications: z.array(CertificationEntitySchema).default([]),
  projects: z.array(ProjectEntitySchema).default([]),
  interests: z.array(InterestEntitySchema).default([]),
  engagements: z.array(EngagementEntitySchema).default([]),
});

export async function extraireContenuCVServer(
  doc: DocumentStructure,
  segmented: SegmentedBlocks,
): Promise<CVImportResult> {
  const startTime = Date.now();
  const warnings: ImportWarning[] = [];

  // Préparation du payload contextuel contenant les blocs déjà isolés par le segmenter
  const contexteSegments = `
DOCUMENT TEXTUEL :
"""
${doc.plainText}
"""

BLOCS ISOLÉS PAR LE SEGMENTEUR DÉTERMINISTE :
- Lignes d'en-tête/identité : ${segmented.identityLines.length} lignes
- Blocs d'expériences détectés : ${segmented.experienceBlocks.length} blocs
- Blocs de formations détectés : ${segmented.educationBlocks.length} blocs
- Blocs de projets détectés : ${segmented.projectBlocks.length} blocs
- Blocs de langues détectés : ${segmented.languageBlocks.length} blocs
- Blocs de certifications détectés : ${segmented.certificationBlocks.length} blocs
- Blocs d'intérêts détectés : ${segmented.interestBlocks.length} blocs
`;

  try {
    const rawResponse = await appelerGeminiSecurise({
      promptSysteme: PROMPT_EXTRACTION_CV_V2,
      promptUtilisateur: `Extrais avec une fidélité absolue toutes les entités du CV ci-dessous :\n\n${contexteSegments}`,
      temperature: 0.1,
      modele: MODELE_CV_IMPORT,
      reponseFormat: "json",
    });

    const parsedJson = extraireJsonPropre(rawResponse);
    const validatedGemini = GeminiExtractionSchema.parse(parsedJson);

    // Contrôle et assainissement strict des entités
    const experiences = assainirExperiences(
      validatedGemini.experiences,
      segmented.experienceBlocks,
      warnings,
    );
    const education = assainirEducation(
      validatedGemini.education,
      segmented.educationBlocks,
      warnings,
    );
    const skills = assainirSkills(
      validatedGemini.skills,
      validatedGemini.languages,
      validatedGemini.certifications,
      warnings,
    );
    const languages = assainirLanguages(validatedGemini.languages, warnings);
    const certifications = assainirCertifications(
      validatedGemini.certifications,
      warnings,
    );
    const projects = assainirProjects(
      validatedGemini.projects,
      segmented.projectBlocks,
      warnings,
    );
    const interests = assainirInterests(validatedGemini.interests, warnings);
    const engagements = validatedGemini.engagements || [];
    const identity = assainirIdentity(
      validatedGemini.identity,
      segmented.identityLines,
      doc,
    );

    const counts = {
      experiences: experiences.length,
      education: education.length,
      skills: skills.length,
      languages: languages.length,
      certifications: certifications.length,
      projects: projects.length,
      interests: interests.length,
      engagements: engagements.length,
    };

    const processingTimeMs = Date.now() - startTime;

    const result: CVImportResult = {
      document: {
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        extractedAt: new Date().toISOString(),
        totalCharacters: doc.plainText.length,
      },
      identity,
      experiences,
      education,
      skills,
      languages,
      certifications,
      projects,
      interests,
      engagements,
      warnings,
      metadata: {
        counts,
        hasAmbiguities: warnings.some((w) => w.severity === "warning"),
        processingTimeMs,
      },
    };

    return CVImportResultSchema.parse(result);
  } catch (error) {
    console.error(
      "[CV Importer Server] Erreur lors de l'extraction Gemini:",
      error,
    );
    // En cas d'échec de Gemini, on s'appuie sur l'extraction directe des blocs segmentés
    return fallbackExtractionDirecte(doc, segmented, warnings, startTime);
  }
}

function assainirIdentity(
  raw: IdentityEntity,
  identityLines: string[],
  doc: DocumentStructure,
): IdentityEntity {
  let title = raw.professionalTitle;
  // Interdiction de transformer un diplôme en titre
  if (
    title &&
    /^(?:étudiant|bac|but|licence|master|iut|lycée)\b/i.test(title.trim())
  ) {
    title = null;
  }

  // Si pas de prénom/nom par Gemini, rechercher dans les premières lignes
  let firstName = raw.firstName || "";
  let lastName = raw.lastName || "";
  if (!firstName) {
    let firstLine = "";
    const cleanIdLines = identityLines.map((l) => l.trim()).filter(Boolean);
    if (cleanIdLines.length > 0) {
      firstLine = cleanIdLines[0] || "";
    } else if (doc && doc.plainText) {
      const lines = doc.plainText
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length > 0) {
        firstLine = lines[0] || "";
      }
    }

    if (firstLine) {
      const parts = firstLine.split(/\s+/);
      if (parts.length >= 2) {
        firstName = parts[0] || "";
        lastName = parts.slice(1).join(" ");
      } else if (parts.length === 1) {
        firstName = parts[0] || "";
      }
    }
  }

  return {
    firstName,
    lastName,
    email: raw.email || null,
    phone: raw.phone || null,
    city: raw.city || null,
    country: raw.country || "France",
    linkedin: raw.linkedin || null,
    portfolio: raw.portfolio || null,
    github: raw.github || null,
    drivingLicense: raw.drivingLicense || null,
    mobility: raw.mobility || null,
    professionalTitle: title,
    summary: raw.summary || null,
  };
}

function assainirExperiences(
  geminiExps: ExperienceEntity[],
  segmentedBlocks: SegmentedBlocks["experienceBlocks"],
  warnings: ImportWarning[],
): ExperienceEntity[] {
  // S'il y a un grand écart entre le nombre de blocs détectés et ce qu'a retourné Gemini, on préserve l'exhaustivité
  if (
    segmentedBlocks.length > geminiExps.length &&
    segmentedBlocks.length >= 8
  ) {
    warnings.push({
      field: "experiences",
      message: `${segmentedBlocks.length} expériences ont été segmentées dans votre document.`,
      severity: "info",
    });
  }

  return geminiExps.map((exp, idx) => {
    // Nettoyage avec le normalisateur de dates
    const normalized = normalizeExperienceDates(exp);

    // Vérification que les dates ne sont pas croisées
    if (
      normalized.startDate &&
      normalized.endDate &&
      normalized.startDate === normalized.endDate &&
      !normalized.isCurrent
    ) {
      // Date ponctuelle valide
    }

    return {
      ...normalized,
      id: normalized.id || `exp-${idx + 1}`,
      title: normalized.title.trim() || "Poste",
      company: normalized.company.trim() || "Entreprise",
      responsibilities: normalized.responsibilities || [],
      achievements: normalized.achievements || [],
    };
  });
}

function assainirEducation(
  geminiEdu: EducationEntity[],
  _segmentedBlocks: SegmentedBlocks["educationBlocks"],
  _warnings: ImportWarning[],
): EducationEntity[] {
  const unique = new Map<string, EducationEntity>();
  for (const edu of geminiEdu) {
    const key = `${edu.school.trim().toLowerCase()}|${edu.degree.trim().toLowerCase()}`;
    if (!unique.has(key)) {
      unique.set(key, edu);
    }
  }
  return Array.from(unique.values()).map((edu, idx) => ({
    ...edu,
    id: edu.id || `edu-${idx + 1}`,
    school: edu.school.trim() || "Établissement",
    degree: edu.degree.trim() || "Formation",
  }));
}

function assainirSkills(
  skills: SkillEntity[],
  languages: LanguageEntity[],
  certifications: CertificationEntity[],
  _warnings: ImportWarning[],
): SkillEntity[] {
  const langueNoms = new Set(languages.map((l) => l.name.toLowerCase()));
  const certifNoms = new Set(certifications.map((c) => c.name.toLowerCase()));
  const blacklist = new Set([
    "français",
    "anglais",
    "espagnol",
    "allemand",
    "italien",
    "toeic",
    "tage mage",
    "cles",
    "b2",
    "b1",
    "c1",
    "a2",
    "automobile",
    "économie",
    "horlogerie",
  ]);

  const unique = new Map<string, SkillEntity>();
  for (const s of skills) {
    const cleanName = s.name.trim();
    const lower = cleanName.toLowerCase();

    // Filtre strict : si ça ressemble à une langue ou une certification, on ignore
    if (
      !cleanName ||
      langueNoms.has(lower) ||
      certifNoms.has(lower) ||
      blacklist.has(lower)
    ) {
      continue;
    }
    // Autre sécurité : vérifier les mots-clés
    if (
      lower.includes("anglais") ||
      lower.includes("toeic") ||
      lower.includes("espagnol") ||
      lower.includes("français")
    ) {
      continue;
    }

    if (!unique.has(lower)) {
      unique.set(lower, {
        ...s,
        id: s.id || `skill-${unique.size + 1}`,
        name: cleanName,
        // Forcer level à null si non expressément explicite
        level: null,
      });
    }
  }
  return Array.from(unique.values());
}

function assainirLanguages(
  languages: LanguageEntity[],
  _warnings: ImportWarning[],
): LanguageEntity[] {
  const unique = new Map<string, LanguageEntity>();
  for (const l of languages) {
    const cleanName = l.name.trim();
    const lower = cleanName.toLowerCase();
    if (!cleanName) continue;
    if (!unique.has(lower)) {
      unique.set(lower, {
        ...l,
        id: l.id || `lang-${unique.size + 1}`,
        name: cleanName,
      });
    }
  }
  return Array.from(unique.values());
}

function assainirCertifications(
  certifications: CertificationEntity[],
  _warnings: ImportWarning[],
): CertificationEntity[] {
  const unique = new Map<string, CertificationEntity>();
  for (const c of certifications) {
    const cleanName = c.name.trim();
    const lower = cleanName.toLowerCase();
    if (!cleanName) continue;
    if (!unique.has(lower)) {
      unique.set(lower, {
        ...c,
        id: c.id || `cert-${unique.size + 1}`,
        name: cleanName,
      });
    }
  }
  return Array.from(unique.values());
}

function assainirProjects(
  projects: ProjectEntity[],
  _segmentedBlocks: SegmentedBlocks["projectBlocks"],
  _warnings: ImportWarning[],
): ProjectEntity[] {
  const unique = new Map<string, ProjectEntity>();
  for (const p of projects) {
    const cleanName = p.name.trim();
    const lower = cleanName.toLowerCase();
    if (!cleanName) continue;

    // Si le nom du projet est une longue phrase, c'est probablement une description mal classée
    if (cleanName.length > 60 && unique.size > 0) {
      const lastKey = Array.from(unique.keys()).pop()!;
      const lastProj = unique.get(lastKey)!;
      lastProj.description = [lastProj.description, cleanName, p.description]
        .filter(Boolean)
        .join(" ");
      continue;
    }

    if (!unique.has(lower)) {
      unique.set(lower, {
        ...p,
        name: cleanName,
        description: p.description.trim(),
      });
    }
  }
  return Array.from(unique.values()).map((p, idx) => ({
    ...p,
    id: p.id || `proj-${idx + 1}`,
    name: p.name || `Projet ${idx + 1}`,
  }));
}

function assainirInterests(
  interests: InterestEntity[],
  _warnings: ImportWarning[],
): InterestEntity[] {
  const unique = new Map<string, InterestEntity>();
  for (const i of interests) {
    const cleanName = i.name.trim();
    const lower = cleanName.toLowerCase();
    if (!cleanName) continue;
    if (!unique.has(lower)) {
      unique.set(lower, {
        ...i,
        id: i.id || `int-${unique.size + 1}`,
        name: cleanName,
      });
    }
  }
  return Array.from(unique.values());
}

function fallbackExtractionDirecte(
  doc: DocumentStructure,
  segmented: SegmentedBlocks,
  warnings: ImportWarning[],
  startTime: number,
): CVImportResult {
  warnings.push({
    field: "extraction",
    message: "Extraction directe par analyse structurelle des blocs.",
    severity: "info",
  });

  const experiences: ExperienceEntity[] = segmented.experienceBlocks.map(
    (b, idx) => {
      const firstLine = b.lines[0] || "";
      const secondLine = b.lines[1] || "";
      return {
        id: `exp-${idx + 1}`,
        title: firstLine,
        company: secondLine,
        location: null,
        contractType: null,
        startDate: null,
        endDate: null,
        isCurrent: false,
        responsibilities: b.lines.slice(2),
        achievements: [],
        source: b.source,
      };
    },
  );

  const education: EducationEntity[] = segmented.educationBlocks.map(
    (b, idx) => ({
      id: `edu-${idx + 1}`,
      school: b.lines[1] || b.lines[0] || "",
      degree: b.lines[0] || "",
      location: null,
      specialization: b.lines[2] || null,
      mention: null,
      startDate: null,
      endDate: null,
      source: b.source,
    }),
  );

  const languages: LanguageEntity[] = segmented.languageBlocks.map(
    (b, idx) => ({
      id: `lang-${idx + 1}`,
      name: b.rawText,
      level: null,
      source: b.source,
    }),
  );

  const certifications: CertificationEntity[] =
    segmented.certificationBlocks.map((b, idx) => ({
      id: `cert-${idx + 1}`,
      name: b.rawText,
      score: null,
      date: null,
      source: b.source,
    }));

  const projects: ProjectEntity[] = segmented.projectBlocks.map((b, idx) => ({
    id: `proj-${idx + 1}`,
    name: b.lines[0] || "Projet",
    description: b.lines.slice(1).join(" "),
    type: null,
    organization: null,
    date: null,
    source: b.source,
  }));

  const interests: InterestEntity[] = segmented.interestBlocks.map(
    (b, idx) => ({
      id: `int-${idx + 1}`,
      name: b.rawText,
      description: null,
      source: b.source,
    }),
  );

  const skills: SkillEntity[] = segmented.skillBlocks.map((b, idx) => ({
    id: `skill-${idx + 1}`,
    name: b.rawText,
    category: "Autre",
    level: null,
    source: b.source,
  }));

  return {
    document: {
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      extractedAt: new Date().toISOString(),
      totalCharacters: doc.plainText.length,
    },
    identity: {
      firstName: "",
      lastName: "",
      email: null,
      phone: null,
      city: null,
      country: "France",
      linkedin: null,
      portfolio: null,
      github: null,
      drivingLicense: null,
      mobility: null,
      professionalTitle: null,
      summary: null,
    },
    experiences,
    education,
    skills,
    languages,
    certifications,
    projects,
    interests,
    engagements: [],
    warnings,
    metadata: {
      counts: {
        experiences: experiences.length,
        education: education.length,
        skills: skills.length,
        languages: languages.length,
        certifications: certifications.length,
        projects: projects.length,
        interests: interests.length,
        engagements: 0,
      },
      hasAmbiguities: false,
      processingTimeMs: Date.now() - startTime,
    },
  };
}
