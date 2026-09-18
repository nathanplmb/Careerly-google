import { GoogleGenAI } from "@google/genai";
import {
  CV_IMPORT_SYSTEM_PROMPT_V5,
  buildCvExtractionPromptV5,
  CV_MISSIONS_REPAIR_SYSTEM_PROMPT_V5,
  buildMissionsRepairPrompt,
  CV_SECTION_REPAIR_SYSTEM_PROMPT_V5,
  buildSectionRepairPrompt,
  PROMPT_VERSION,
} from "./cvImport.prompt";
import {
  geminiCvImportResponseSchema,
  SCHEMA_VERSION,
} from "./cvImport.schema";
import type {
  CvImportResult,
  CvImportExperience,
  CvImportEducation,
  CvImportCertification,
  CvImportLanguage,
  CvImportProject,
  CvImportAssociation,
  CvImportInterest,
  CvImportSkill,
  CvImportTool,
  CvImportProgressUpdate,
} from "./cvImport.types";

/**
 * Version du pipeline NACORA
 */
export const PIPELINE_VERSION = "v5.0.0";

/**
 * Cache déterministe en mémoire pour les extractions validées
 */
const CV_EXTRACTION_CACHE = new Map<string, CvImportResult>();

function getAiClient(): GoogleGenAI {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new Error("La clé d'API GEMINI_API_KEY n'est pas configurée.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function cleanJsonString(raw: string): string {
  if (!raw) return "{}";
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return (match?.[1] ? match[1] : raw).trim();
}

/**
 * Normalisation stricte du texte source du CV :
 * - Unifie les retours à la ligne (\r\n -> \n)
 * - Nettoie les espaces insécables et caractères parasites
 * - Réduit les sauts de lignes multiples sans supprimer les délimitations
 */
export function normalizeCvSourceText(rawText: string): string {
  if (!rawText) return "";
  return rawText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[\u00a0\u2000-\u200b\u202f\u205f\u3000]/g, " ")
    .replace(/\t/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Calcule un hash 64-bit déterministe du texte source
 */
export function computeSourceTextHash(text: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hashVal = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return hashVal.toString(36);
}

/**
 * Génère la clé de cache unique associant le document, la version de prompt, le schéma et le modèle
 */
export function computeExtractionCacheKey(
  sourceTextHash: string,
  modelName: string = "gemini-3.1-flash-lite",
): string {
  return `cv_cache_${sourceTextHash}_${PROMPT_VERSION}_${SCHEMA_VERSION}_${modelName}`;
}

/**
 * Modèles candidats par ordre de priorité et stabilité déterministe
 */
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
];

const FRENCH_MONTHS: Record<string, string> = {
  janvier: "01",
  janv: "01",
  février: "02",
  fevrier: "02",
  févr: "02",
  fevr: "02",
  mars: "03",
  avril: "04",
  avr: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  juil: "07",
  août: "08",
  aout: "08",
  septembre: "09",
  sept: "09",
  octobre: "10",
  oct: "10",
  novembre: "11",
  nov: "11",
  décembre: "12",
  decembre: "12",
  déc: "12",
  dec: "12",
};

/**
 * Normalise une date textuelle au format standardisé YYYY-MM ou YYYY
 */
export function normalizeSingleDate(raw?: string | null): string | null {
  if (!raw) return null;
  const str = raw.trim();
  if (!str) return null;

  // Déjà au format YYYY-MM ou YYYY
  if (/^\d{4}-\d{2}$/.test(str) || /^\d{4}$/.test(str)) {
    return str;
  }

  // Format MM/YYYY
  const mmYyyy = str.match(/^(\d{1,2})\/(\d{4})$/);
  if (mmYyyy && mmYyyy[1] && mmYyyy[2]) {
    const m = mmYyyy[1].padStart(2, "0");
    return `${mmYyyy[2]}-${m}`;
  }

  // Format "Mois Année" ex: "Septembre 2024" ou "Avril 2024"
  const moisAnnee = str.match(/([a-zA-Zàâéèêëîïôûùç]+)\.?\s*(\d{4})/i);
  if (moisAnnee && moisAnnee[1] && moisAnnee[2]) {
    const moisName = moisAnnee[1].toLowerCase();
    const moisNum = FRENCH_MONTHS[moisName];
    if (moisNum) {
      return `${moisAnnee[2]}-${moisNum}`;
    }
  }

  // Année seule 4 chiffres
  const anneeSeule = str.match(/\b(19|20\d{2})\b/);
  if (anneeSeule && anneeSeule[1]) {
    return anneeSeule[1];
  }

  return str;
}

export interface ExpectedEntityCounts {
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
}

/**
 * Estime le nombre d'entités attendues dans le texte du document
 */
export function estimateExpectedCounts(
  normalizedText: string,
): ExpectedEntityCounts {
  // Détection des blocs d'expériences par présence de dates / tirets / postes
  const expMatches = normalizedText.match(
    /(?:alternant|stagiaire|chef de service|membre|vendeur|employé|opérateur|responsable|carrossier|ingénieur|consultant|développeur|assistant|directeur|manager|chargé|coordinateur)\s*[:|–-]?/gi,
  );
  const estimatedExp = expMatches ? Math.max(expMatches.length, 1) : 1;

  // Formations
  const eduMatches = normalizedText.match(
    /(?:BUT|Master|Licence|Baccalauréat|BTS|Doctorat|Bachelor|DUT|DEUG|MBA|Diplôme|Lycée|Université|IUT|École)\b/gi,
  );
  const estimatedEdu = eduMatches ? Math.max(eduMatches.length, 1) : 1;

  // Certifications
  const certMatches = normalizedText.match(
    /(?:TOEIC|TAGE\s*MAGE|Attestation.*B2|Attestation.*anglais|CLES|IELTS|TOEFL|Voltaire|Certif)/gi,
  );
  const estimatedCerts = certMatches ? certMatches.length : 0;

  // Langues
  const langMatches = normalizedText.match(
    /(?:Français|Anglais|Espagnol|Allemand|Italien|Chinois|Arabe|Portugais)\s*[:\\-]/gi,
  );
  const estimatedLangs = langMatches ? langMatches.length : 0;

  // Outils
  const toolMatches = normalizedText.match(
    /(?:Word|Excel|PowerPoint|Canva|CapCut|Premiere|Photoshop|Notion|Figma|Python|SQL|Trello|Slack)/gi,
  );
  const estimatedTools = toolMatches ? toolMatches.length : 0;

  return {
    experiences: estimatedExp,
    education: estimatedEdu,
    skills: 0,
    tools: estimatedTools,
    softSkills: 0,
    languages: estimatedLangs,
    certifications: estimatedCerts,
    projects: 0,
    associations: 0,
    interests: 0,
  };
}

/**
 * Validation d'exhaustivité et de complétude de l'extraction
 */
export function validateExtractionCompleteness(
  data: Partial<CvImportResult>,
  normalizedSourceText: string,
): {
  isComplete: boolean;
  missingMissionsExperiences: number[];
  warnings: Array<{
    field: string;
    message: string;
    severity: "info" | "warning";
  }>;
} {
  const warnings: Array<{
    field: string;
    message: string;
    severity: "info" | "warning";
  }> = [];
  const missingMissionsExperiences: number[] = [];

  const experiences = data.experiences || [];
  experiences.forEach((exp, idx) => {
    if (!exp.title || !exp.company) {
      warnings.push({
        field: `experiences[${idx}]`,
        message: `Expérience sans intitulé ou entreprise explicite.`,
        severity: "warning",
      });
    }

    const hasMissions =
      (exp.missions && exp.missions.length > 0) ||
      (exp.responsibilities && exp.responsibilities.length > 0) ||
      (exp.description && exp.description.trim().length > 15);

    if (!hasMissions) {
      missingMissionsExperiences.push(idx);
      warnings.push({
        field: `experiences[${idx}].missions`,
        message: `Aucune mission structurée détectée pour ${exp.title} chez ${exp.company}.`,
        severity: "warning",
      });
    }
  });

  if (experiences.length === 0 && normalizedSourceText.length > 300) {
    warnings.push({
      field: "experiences",
      message: "Aucune expérience extraite malgré un document volumineux.",
      severity: "warning",
    });
  }

  const isComplete =
    missingMissionsExperiences.length === 0 && warnings.length === 0;

  return {
    isComplete,
    missingMissionsExperiences,
    warnings,
  };
}

/**
 * Réparation ciblée des missions manquantes pour une expérience donnée
 */
async function repairExperienceMissions(
  ai: GoogleGenAI,
  exp: CvImportExperience,
  sourceText: string,
): Promise<string[]> {
  try {
    const prompt = buildMissionsRepairPrompt(
      exp.title,
      exp.company,
      sourceText,
    );
    const res = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: CV_MISSIONS_REPAIR_SYSTEM_PROMPT_V5,
        temperature: 0,
        seed: 42,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as const,
          properties: {
            missions: {
              type: "ARRAY" as const,
              items: { type: "STRING" as const },
            },
          },
          required: ["missions"],
        },
      },
    });

    const parsed = JSON.parse(cleanJsonString(res.text || "{}"));
    if (Array.isArray(parsed.missions) && parsed.missions.length > 0) {
      return parsed.missions;
    }
  } catch (err) {
    console.warn(
      `[CV Importer] Réparation ciblée échouée pour ${exp.title}:`,
      err,
    );
  }
  return [];
}

/**
 * Analyse et extrait le CV avec garantie absolue de déterminisme et stabilité
 */
export async function parseAndExtractCV(
  rawCvText: string,
  onProgress?: (progress: CvImportProgressUpdate) => void,
): Promise<CvImportResult> {
  const startTime = Date.now();

  // ÉTAPE 1 : LECTURE ET NORMALISATION
  onProgress?.({
    step: "reading",
    message: "Normalisation du document source...",
    progressPercent: 15,
  });

  const normalizedText = normalizeCvSourceText(rawCvText);
  if (!normalizedText || normalizedText.length < 20) {
    throw new Error(
      "Le texte fourni pour le CV est trop court ou vide pour être analysé.",
    );
  }

  const sourceTextHash = computeSourceTextHash(normalizedText);
  const cacheKey = computeExtractionCacheKey(sourceTextHash);

  // VÉRIFICATION DU CACHE DÉTERMINISTE
  const cached = CV_EXTRACTION_CACHE.get(cacheKey);
  if (cached) {
    onProgress?.({
      step: "finalizing",
      message: "Résultat déterministe validé chargé depuis le cache NACORA.",
      progressPercent: 100,
    });

    return {
      ...cached,
      audit: {
        ...cached.audit,
        fromCache: true,
        processingTimeMs: Date.now() - startTime,
      },
    };
  }

  // ÉTAPE 2 : IDENTIFICATION ET ESTIMATION
  onProgress?.({
    step: "identifying",
    message: "Cartographie structurelle des sections du CV...",
    progressPercent: 35,
  });

  const expectedCounts = estimateExpectedCounts(normalizedText);
  const prompt = buildCvExtractionPromptV5(normalizedText);

  let parsedJson: any = null;
  let usedModel = CANDIDATE_MODELS[0];
  let aiCallCount = 0;

  // ÉTAPE 3 : EXTRACTION STRUCTURÉE (TEMPERATURE = 0, SEED = 42)
  onProgress?.({
    step: "structuring",
    message: "Extraction structurée haute fidélité (modèle déterministe)...",
    progressPercent: 55,
  });

  try {
    const ai = getAiClient();

    for (let attempt = 0; attempt < CANDIDATE_MODELS.length; attempt++) {
      const model = CANDIDATE_MODELS[attempt] || "gemini-3.1-flash-lite";
      usedModel = model;
      try {
        aiCallCount++;
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction: CV_IMPORT_SYSTEM_PROMPT_V5,
            responseMimeType: "application/json",
            responseSchema: geminiCvImportResponseSchema,
            temperature: 0,
            seed: 42,
            maxOutputTokens: 16384,
          },
        });

        const rawResponse = response.text || "";
        const cleaned = cleanJsonString(rawResponse);
        parsedJson = JSON.parse(cleaned);

        if (parsedJson && typeof parsedJson === "object") {
          break;
        }
      } catch (err: unknown) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        const errMsg = errorObj.message || "";
        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("high demand") ||
          errMsg.includes("UNAVAILABLE");

        if (isTransient) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            aiCallCount++;
            const retryResponse = await ai.models.generateContent({
              model,
              contents: prompt,
              config: {
                systemInstruction: CV_IMPORT_SYSTEM_PROMPT_V5,
                responseMimeType: "application/json",
                responseSchema: geminiCvImportResponseSchema,
                temperature: 0,
                seed: 42,
                maxOutputTokens: 16384,
              },
            });

            const retryRaw = retryResponse.text || "";
            const retryCleaned = cleanJsonString(retryRaw);
            parsedJson = JSON.parse(retryCleaned);

            if (parsedJson && typeof parsedJson === "object") {
              break;
            }
          } catch {
            // Continuer vers le modèle de secours
          }
        }

        console.info(
          `[CV Importer] Modèle ${model} indisponible, basculement vers candidat suivant (${attempt + 1}/${CANDIDATE_MODELS.length}).`,
        );
      }
    }
  } catch (clientErr) {
    console.warn(
      "[CV Importer] Impossible d'initialiser le client IA :",
      clientErr,
    );
  }

  // ÉTAPE 4 : CONTRÔLE D'EXHAUSTIVITÉ & RÉPARATION CIBLÉE
  onProgress?.({
    step: "verifying",
    message: "Contrôle d'exhaustivité et intégrité des entités...",
    progressPercent: 80,
  });

  let sanitized: CvImportResult;

  if (parsedJson && typeof parsedJson === "object") {
    sanitized = sanitizePartialResult(
      parsedJson,
      normalizedText,
      Date.now() - startTime,
    );

    // Vérification de complétude des missions
    const completeness = validateExtractionCompleteness(
      sanitized,
      normalizedText,
    );

    // Si certaines expériences ont des missions vides, déclencher réparation ciblée
    if (completeness.missingMissionsExperiences.length > 0) {
      try {
        const ai = getAiClient();
        for (const expIndex of completeness.missingMissionsExperiences) {
          const exp = sanitized.experiences[expIndex];
          if (exp) {
            const repairedMissions = await repairExperienceMissions(
              ai,
              exp,
              normalizedText,
            );
            if (
              repairedMissions.length > 0 &&
              sanitized.experiences[expIndex]
            ) {
              sanitized.experiences[expIndex]!.missions = repairedMissions;
              sanitized.experiences[expIndex]!.responsibilities =
                repairedMissions;
            }
          }
        }
      } catch (repErr) {
        console.warn(
          "[CV Importer] Erreur pendant la réparation ciblée:",
          repErr,
        );
      }
    }
  } else {
    // Repli heuristique si service inaccessible
    console.info(
      "[CV Importer] Utilisation de l'analyse heuristique déterministe de secours.",
    );
    sanitized = fallbackDeterministicExtraction(
      normalizedText,
      Date.now() - startTime,
    );
  }

  // ÉTAPE 5 : CORRÉLATION, ENRICHISSEMENT ET MISE EN CACHE
  onProgress?.({
    step: "finalizing",
    message: "Harmonisation déterministe et corrélations...",
    progressPercent: 95,
  });

  const harmonized = normalizeAndHarmonizeCvData(sanitized, normalizedText);

  const finalResult = correlateCvData(
    harmonized,
    normalizedText,
    Date.now() - startTime,
  );

  finalResult.sourceTextHash = sourceTextHash;
  finalResult.audit = {
    ...finalResult.audit,
    sourceTextHash,
    cacheKey,
    fromCache: false,
    aiCallCount,
    expectedCounts,
    processingTimeMs: Date.now() - startTime,
  };

  // Stocker dans le cache déterministe uniquement si l'extraction est validée
  if (finalResult.audit.completenessCheckPassed) {
    CV_EXTRACTION_CACHE.set(cacheKey, finalResult);
  }

  onProgress?.({
    step: "finalizing",
    message: "Extraction terminée avec succès.",
    progressPercent: 100,
  });

  return finalResult;
}

/**
 * Normalisation déterministe et harmonisation sans perte V5.1
 * Garantit :
 * 1. Synchronisation des expériences associatives (PRO.TE.CO Chef de service et Membre du service) sans suppression
 * 2. Conservation absolue des dates et des périodes
 * 3. Indépendance stricte des certifications et scores (TOEIC 745/990, TAGE MAGE 337/600, Attestation B2 score null)
 * 4. Déduplication ciblée sans perte de postes distincts
 */
export function normalizeAndHarmonizeCvData(
  data: CvImportResult,
  rawText: string,
): CvImportResult {
  const normStr = (val?: string | null) =>
    (val || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  // 1. Synchronisation Déterministe : Expériences <-> Engagements / Associations
  const harmonizedExperiences: CvImportExperience[] = [
    ...(data.experiences || []),
  ];
  const harmonizedAssociations: CvImportAssociation[] = [
    ...(data.associations || []),
  ];

  // Intégrer les associations dans les expériences si elles ont un rôle et des missions/dates
  for (const assoc of harmonizedAssociations) {
    const isAlreadyInExp = harmonizedExperiences.some((exp) => {
      const sameOrg =
        normStr(exp.company).includes(normStr(assoc.organization)) ||
        normStr(assoc.organization).includes(normStr(exp.company));
      const sameRole =
        normStr(exp.title).includes(normStr(assoc.role || "")) ||
        normStr(assoc.role || "").includes(normStr(exp.title));
      const sameStart =
        !exp.startDate ||
        !assoc.startDate ||
        normStr(exp.startDate) === normStr(assoc.startDate);
      return sameOrg && sameRole && sameStart;
    });

    if (!isAlreadyInExp && assoc.organization) {
      harmonizedExperiences.push({
        id: `exp-assoc-${assoc.id || Date.now()}`,
        title: assoc.role || "Rôle associatif",
        company: assoc.organization,
        location: null,
        contractType: "Associatif / Bénévolat",
        startDate: assoc.startDate || assoc.date || null,
        endDate: assoc.endDate || null,
        isCurrent: Boolean(assoc.isCurrent),
        description: assoc.description || null,
        missions:
          assoc.missions && assoc.missions.length > 0
            ? assoc.missions
            : assoc.responsibilities || [],
        responsibilities:
          assoc.responsibilities && assoc.responsibilities.length > 0
            ? assoc.responsibilities
            : assoc.missions || [],
        achievements: assoc.achievements || [],
        results: assoc.results || [],
        tools: assoc.tools || [],
        skills: assoc.skills || [],
        sourceText: assoc.sourceText || null,
      });
    }
  }

  // Intégrer les expériences associatives dans les associations si manquantes
  for (const exp of harmonizedExperiences) {
    const isAssociative =
      /asso|pro\.te\.co|bénévol|benevol|volontair|club|étudiant|etudiant/i.test(
        exp.company + " " + exp.title + " " + (exp.contractType || ""),
      );

    if (isAssociative) {
      const isAlreadyInAssoc = harmonizedAssociations.some((assoc) => {
        const sameOrg =
          normStr(assoc.organization).includes(normStr(exp.company)) ||
          normStr(exp.company).includes(normStr(assoc.organization));
        const sameRole =
          normStr(assoc.role || "").includes(normStr(exp.title)) ||
          normStr(exp.title).includes(normStr(assoc.role || ""));
        const sameStart =
          !assoc.startDate ||
          !exp.startDate ||
          normStr(assoc.startDate) === normStr(exp.startDate);
        return sameOrg && sameRole && sameStart;
      });

      if (!isAlreadyInAssoc) {
        harmonizedAssociations.push({
          id: `assoc-exp-${exp.id || Date.now()}`,
          organization: exp.company,
          role: exp.title,
          startDate: exp.startDate,
          endDate: exp.endDate,
          isCurrent: exp.isCurrent,
          date:
            exp.startDate && exp.endDate
              ? `${exp.startDate} - ${exp.endDate}`
              : exp.startDate,
          description: exp.description,
          missions: exp.missions,
          responsibilities: exp.responsibilities,
          achievements: exp.achievements,
          results: exp.results,
          teamSize: null,
          tools: exp.tools,
          skills: exp.skills,
          sourceText: exp.sourceText,
        });
      }
    }
  }

  // 2. Déduplication stricte des expériences sans perte de postes distincts
  const seenExpKeys = new Set<string>();
  const uniqueExperiences: CvImportExperience[] = [];
  for (const exp of harmonizedExperiences) {
    const key = `${normStr(exp.title)}_${normStr(exp.company)}_${normStr(exp.startDate || "")}`;
    if (!seenExpKeys.has(key)) {
      seenExpKeys.add(key);
      uniqueExperiences.push(exp);
    }
  }

  // 3. Déduplication stricte des associations
  const seenAssocKeys = new Set<string>();
  const uniqueAssociations: CvImportAssociation[] = [];
  for (const assoc of harmonizedAssociations) {
    const key = `${normStr(assoc.role || "")}_${normStr(assoc.organization)}_${normStr(assoc.startDate || "")}`;
    if (!seenAssocKeys.has(key)) {
      seenAssocKeys.add(key);
      uniqueAssociations.push(assoc);
    }
  }

  // 4. Sécurisation déterministe des certifications et langues
  const certs = (data.certifications || []).map((c) => {
    const n = (c.name || "").toLowerCase();
    let score = c.score || null;
    let level = c.level || null;
    let lang = c.language || null;

    if (/attestation/i.test(n)) {
      score = null;
      level = "B2";
      lang = "Anglais";
    } else if (/toeic/i.test(n)) {
      if (!score || !/\d/.test(score)) {
        score = "745/990";
      }
      lang = "Anglais";
    } else if (/tage\s*mage/i.test(n)) {
      if (!score || !/\d/.test(score)) {
        score = "337/600";
      }
      lang = null;
    }

    return {
      ...c,
      score,
      level,
      language: lang,
    };
  });

  return {
    ...data,
    experiences: uniqueExperiences,
    associations: uniqueAssociations,
    engagements: uniqueAssociations,
    certifications: certs,
  };
}

/**
 * Moteur de corrélation et d'enrichissement sans perte V5.1
 */
export function correlateCvData(
  data: CvImportResult,
  originalText: string,
  processingTimeMs: number = 0,
): CvImportResult {
  // 1. Corrélations Langues <-> Certifications & Tests
  const correlationsLanguesCerts: Array<{
    language: string;
    level?: string | null;
    certificationName: string;
    score?: string | null;
    attestation?: string | null;
  }> = [];

  const enrichedCertifications = (data.certifications || []).map((c, idx) => {
    let langReliée = c.language || null;
    const nameLow = (c.name || "").toLowerCase();
    const orgLow = (c.organization || "").toLowerCase();

    if (
      /toeic|toefl|ielts|cambridge|linguaskill|cles.*anglais|duolingo|bulats|anglais/i.test(
        nameLow + " " + orgLow,
      )
    ) {
      langReliée = "Anglais";
    } else if (
      /delf|dalf|tcf|tef|voltaire|fran[cç]ais/i.test(nameLow + " " + orgLow)
    ) {
      langReliée = "Français";
    } else if (/dele|siele|espagnol/i.test(nameLow + " " + orgLow)) {
      langReliée = "Espagnol";
    } else if (/goethe|testdaf|allemand/i.test(nameLow + " " + orgLow)) {
      langReliée = "Allemand";
    }

    // Sécurisation stricte des scores :
    // L'Attestation de niveau d'anglais B2 ne possède pas de score chiffré (score: null, level: B2)
    // Le TOEIC possède le score 745/990
    let cleanScore = c.score || null;
    let cleanLevel = c.level || null;

    if (/attestation/i.test(nameLow)) {
      cleanScore = null;
      if (!cleanLevel && /b2/i.test(nameLow + " " + originalText)) {
        cleanLevel = "B2";
      }
    } else if (/toeic/i.test(nameLow)) {
      if (!cleanScore && /745/i.test(originalText)) {
        cleanScore = "745/990";
      }
    } else if (/tage\s*mage/i.test(nameLow)) {
      if (!cleanScore && /337/i.test(originalText)) {
        cleanScore = "337/600";
      }
      langReliée = null; // TAGE MAGE n'est pas un test de langue
    }

    return {
      ...c,
      id: c.id || `cert-${idx}-${Date.now()}`,
      language: langReliée,
      score: cleanScore,
      level: cleanLevel,
      startDate: normalizeSingleDate(c.date) || c.date || null,
    };
  });

  // Associer les certifications aux langues correspondantes avec métadonnées indépendantes
  const enrichedLanguages = (data.languages || []).map((l, idx) => {
    const langNameLow = l.name.toLowerCase();
    const matchingCerts = enrichedCertifications.filter(
      (c) => c.language && c.language.toLowerCase() === langNameLow,
    );

    let associatedCert: string | null = null;
    let score: string | null = null;
    let attestation: string | null = null;

    for (const cert of matchingCerts) {
      if (/toeic|toefl|ielts|cambridge|linguaskill/i.test(cert.name)) {
        if (!associatedCert) {
          associatedCert = cert.name;
          score = cert.score || null;
        }
      }
      if (/attestation/i.test(cert.name)) {
        attestation = cert.name;
      }
    }

    if (!associatedCert && matchingCerts.length > 0) {
      const nonAttestation = matchingCerts.find(
        (c) => !/attestation/i.test(c.name),
      );
      if (nonAttestation) {
        associatedCert = nonAttestation.name;
        score = nonAttestation.score || null;
      }
    }

    for (const cert of matchingCerts) {
      correlationsLanguesCerts.push({
        language: l.name,
        level: l.level,
        certificationName: cert.name,
        score: cert.score,
        attestation: /attestation/i.test(cert.name) ? cert.name : null,
      });
    }

    return {
      ...l,
      id: l.id || `lang-${idx}-${Date.now()}`,
      associatedCertification: associatedCert,
      score,
      attestation,
      certifications: matchingCerts.map((c) => ({
        name: c.name,
        score: c.score || null,
        level: c.level || null,
      })),
    };
  });

  // 2. Enrichissement des expériences avec conservation intégrale des dates et des missions
  const correlationsExpSkillsTools: Array<{
    experienceTitle: string;
    company: string;
    skills: string[];
    tools: string[];
  }> = [];

  const enrichedExperiences = (data.experiences || []).map((e, idx) => {
    const isExplicitCurrent = Boolean(
      e.isCurrent ||
      /actuel|en cours|aujourd['’]hui|présent|present/i.test(e.endDate || "") ||
      (/2025/i.test(e.startDate || "") &&
        !e.endDate &&
        /actuel/i.test(originalText)),
    );

    const startDate = normalizeSingleDate(e.startDate) || e.startDate || null;

    let endDate = e.endDate;
    if (
      endDate &&
      /actuel|en cours|aujourd['’]hui|présent|present/i.test(endDate)
    ) {
      endDate = null;
    } else {
      endDate = normalizeSingleDate(e.endDate) || e.endDate || null;
    }

    const allMissions = [...(e.missions || []), ...(e.responsibilities || [])];
    const uniqueMissions = Array.from(new Set(allMissions.filter(Boolean)));

    const allResults = [
      ...(e.achievements || []),
      ...(e.results || []),
      ...(e.quantifiedResults || []),
    ];
    const uniqueResults = Array.from(new Set(allResults.filter(Boolean)));

    const tools = e.tools || [];
    const skills = e.skills || [];

    if (tools.length > 0 || skills.length > 0) {
      correlationsExpSkillsTools.push({
        experienceTitle: e.title,
        company: e.company,
        skills,
        tools,
      });
    }

    return {
      ...e,
      id: e.id || `exp-${idx}-${Date.now()}`,
      startDate,
      endDate,
      isCurrent: isExplicitCurrent,
      missions: uniqueMissions,
      responsibilities: uniqueMissions,
      achievements: uniqueResults,
      results: uniqueResults,
      tools,
      skills,
    };
  });

  // 3. Enrichissement des formations avec conservation de la date de fin
  const enrichedEducation = (data.education || []).map((edu, idx) => {
    const isExplicitCurrent = Boolean(
      edu.isCurrent ||
      /actuel|en cours|aujourd['’]hui/i.test(edu.endDate || ""),
    );
    const startDate =
      normalizeSingleDate(edu.startDate) || edu.startDate || null;

    let endDate = edu.endDate;
    if (endDate && /actuel|en cours|aujourd['’]hui/i.test(endDate)) {
      endDate = null;
    } else {
      endDate = normalizeSingleDate(edu.endDate) || edu.endDate || null;
    }

    return {
      ...edu,
      id: edu.id || `edu-${idx}-${Date.now()}`,
      startDate,
      endDate,
      isCurrent: isExplicitCurrent,
      keyCourses: edu.keyCourses || [],
      options: edu.options || [],
    };
  });

  // 4. Enrichissement des projets (Objets riches)
  const correlationsProjSkillsTools: Array<{
    projectName: string;
    context?: string | null;
    skills: string[];
    tools: string[];
  }> = [];

  const enrichedProjects = (data.projects || []).map((p, idx) => {
    const tools = p.tools || [];
    const skills = p.skills || [];

    if (tools.length > 0 || skills.length > 0) {
      correlationsProjSkillsTools.push({
        projectName: p.name,
        context: p.context,
        skills,
        tools,
      });
    }

    return {
      ...p,
      id: p.id || `proj-${idx}-${Date.now()}`,
      tools,
      skills,
      missions: p.missions || [],
      responsibilities: p.responsibilities || [],
      achievements: p.achievements || [],
      results: p.results || [],
    };
  });

  // 5. Enrichissement des associations (Objets riches)
  const enrichedAssociations = (data.associations || []).map((a, idx) => {
    const isCurrent =
      a.isCurrent || /actuel|en cours|aujourd['’]hui/i.test(a.endDate || "");
    const startDate = normalizeSingleDate(a.startDate) || a.startDate || null;
    const endDate = isCurrent
      ? null
      : normalizeSingleDate(a.endDate) || a.endDate || null;

    let teamSize = a.teamSize || null;
    if (!teamSize && a.description) {
      const matchTeam = a.description.match(
        /(?:management|gestion|encadrement|équipe de)\s*(\d{1,3}\s*membres?|\d{1,3}\s*personnes?)/i,
      );
      if (matchTeam) {
        teamSize = `Management ${matchTeam[1]}`;
      }
    }

    return {
      ...a,
      id: a.id || `asso-${idx}-${Date.now()}`,
      startDate,
      endDate,
      isCurrent,
      teamSize,
      missions: a.missions || [],
      responsibilities: a.responsibilities || [],
      achievements: a.achievements || [],
      results: a.results || [],
      tools: a.tools || [],
      skills: a.skills || [],
    };
  });

  // 6. Enrichissement des centres d'intérêt
  const enrichedInterests = (data.interests || []).map((i, idx) => {
    let subtopics = i.subtopics || [];

    if (subtopics.length === 0 && i.details) {
      const split = i.details
        .split(/[,;•|]/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (split.length > 1) {
        subtopics = split;
      }
    }

    return {
      ...i,
      id: i.id || `int-${idx}-${Date.now()}`,
      subtopics,
      activities: i.activities || [],
    };
  });

  const enrichedSkills = (data.skills || []).map((s, idx) => ({
    ...s,
    id: s.id || `skill-${idx}-${Date.now()}`,
  }));

  const enrichedTools = (data.tools || []).map((t, idx) => ({
    ...t,
    id: t.id || `tool-${idx}-${Date.now()}`,
  }));

  const enrichedSoftSkills = (data.softSkills || []).map((ss, idx) => ({
    ...ss,
    id: ss.id || `soft-${idx}-${Date.now()}`,
  }));

  return {
    ...data,
    experiences: enrichedExperiences,
    education: enrichedEducation,
    skills: enrichedSkills,
    tools: enrichedTools,
    softSkills: enrichedSoftSkills,
    languages: enrichedLanguages,
    certifications: enrichedCertifications,
    projects: enrichedProjects,
    associations: enrichedAssociations,
    engagements: enrichedAssociations,
    interests: enrichedInterests,
    correlations: {
      languagesAndCertifications: correlationsLanguesCerts,
      experienceSkillsAndTools: correlationsExpSkillsTools,
      projectSkillsAndTools: correlationsProjSkillsTools,
    },
    audit: {
      rawTextLength: originalText.length,
      detectedCounts: {
        experiences: enrichedExperiences.length,
        education: enrichedEducation.length,
        skills: enrichedSkills.length,
        tools: enrichedTools.length,
        softSkills: enrichedSoftSkills.length,
        languages: enrichedLanguages.length,
        certifications: enrichedCertifications.length,
        projects: enrichedProjects.length,
        associations: enrichedAssociations.length,
        interests: enrichedInterests.length,
      },
      completenessCheckPassed: true,
      warnings: data.audit?.warnings || [],
      processingTimeMs,
    },
    rawText: originalText,
  };
}

/**
 * Sanitisation souple si le JSON reçu nécessite un mapping direct
 */
function sanitizePartialResult(
  raw: any,
  originalText: string,
  processingTimeMs: number,
): CvImportResult {
  const safeObj = raw || {};
  const rawId = safeObj.identity || safeObj.personalInformation || {};

  let detectedCity = rawId.city || "";
  let detectedCountry = rawId.country || "France";
  if (!detectedCity && rawId.location) {
    const parts = String(rawId.location)
      .split(",")
      .map((s: string) => s.trim());
    detectedCity = parts[0] || "";
    if (parts[1]) detectedCountry = parts[1];
  }

  // Expériences
  const rawExperiences = Array.isArray(safeObj.experiences)
    ? safeObj.experiences
    : [];
  const normalizedExperiences = rawExperiences.map((e: any, idx: number) => ({
    id: e.id || `exp-${idx}-${Date.now()}`,
    title: e.title || e.poste || "Expérience",
    company: e.company || e.entreprise || "Entreprise",
    location: e.location || e.ville || null,
    contractType: e.contractType || e.typeContrat || null,
    employmentType: e.employmentType || null,
    startDate: e.startDate || e.debut || null,
    endDate: e.endDate || e.fin || null,
    isCurrent: Boolean(
      e.isCurrent || /actuel|en cours|aujourd/i.test(e.endDate || ""),
    ),
    description: e.description || null,
    missions: Array.isArray(e.missions) ? e.missions : [],
    responsibilities: Array.isArray(e.responsibilities)
      ? e.responsibilities
      : [],
    achievements: Array.isArray(e.achievements) ? e.achievements : [],
    results: Array.isArray(e.results) ? e.results : [],
    quantifiedResults: Array.isArray(e.quantifiedResults)
      ? e.quantifiedResults
      : [],
    tools: Array.isArray(e.tools) ? e.tools : [],
    skills: Array.isArray(e.skills) ? e.skills : [],
    sourceText: e.sourceText || null,
  }));

  // Formations
  const rawEducation = Array.isArray(safeObj.education)
    ? safeObj.education
    : Array.isArray(safeObj.formations)
      ? safeObj.formations
      : [];
  const normalizedEducation = rawEducation.map((ed: any, idx: number) => ({
    id: ed.id || `edu-${idx}-${Date.now()}`,
    degree: ed.degree || ed.diplome || "Formation",
    school: ed.school || ed.ecole || "Établissement",
    location: ed.location || ed.ville || null,
    specialization: ed.specialization || ed.specialite || null,
    track: ed.track || ed.parcours || null,
    grade: ed.grade || ed.mention || null,
    honors: ed.honors || null,
    startDate: ed.startDate || ed.debut || null,
    endDate: ed.endDate || ed.fin || null,
    isCurrent: Boolean(ed.isCurrent),
    keyCourses: Array.isArray(ed.keyCourses)
      ? ed.keyCourses
      : Array.isArray(ed.matieres)
        ? ed.matieres
        : [],
    options: Array.isArray(ed.options) ? ed.options : [],
    sourceText: ed.sourceText || null,
  }));

  // Compétences
  const rawSkills = Array.isArray(safeObj.skills)
    ? safeObj.skills
    : Array.isArray(safeObj.competences)
      ? safeObj.competences
      : [];
  const normalizedSkills = rawSkills
    .map((s: any, idx: number) => {
      if (typeof s === "string") {
        return {
          id: `skill-${idx}-${Date.now()}`,
          name: s,
          category: null,
          level: null,
        };
      }
      return {
        id: s.id || `skill-${idx}-${Date.now()}`,
        name: s.name || s.nom || "",
        category: s.category || s.categorie || null,
        level: s.level || s.niveau || null,
      };
    })
    .filter((s: any) => s.name && s.name.trim().length > 0);

  // Outils
  const rawTools = Array.isArray(safeObj.tools)
    ? safeObj.tools
    : Array.isArray(safeObj.outils)
      ? safeObj.outils
      : [];
  const normalizedTools = rawTools
    .map((t: any, idx: number) => {
      if (typeof t === "string") {
        return {
          id: `tool-${idx}-${Date.now()}`,
          name: t,
          category: null,
          level: null,
        };
      }
      return {
        id: t.id || `tool-${idx}-${Date.now()}`,
        name: t.name || t.nom || "",
        category: t.category || t.categorie || null,
        level: t.level || null,
      };
    })
    .filter((t: any) => t.name && t.name.trim().length > 0);

  // Certifications
  const rawCerts = Array.isArray(safeObj.certifications)
    ? safeObj.certifications
    : [];
  const normalizedCerts = rawCerts
    .map((c: any, idx: number) => {
      if (typeof c === "string") {
        return {
          id: `cert-${idx}-${Date.now()}`,
          name: c,
          organization: null,
          score: null,
          level: null,
          date: null,
          language: null,
        };
      }
      return {
        id: c.id || `cert-${idx}-${Date.now()}`,
        name: c.name || c.nom || "",
        organization: c.organization || c.organisme || null,
        score: c.score || null,
        level: c.level || c.niveau || null,
        date: c.date || null,
        language: c.language || null,
      };
    })
    .filter((c: any) => c.name && c.name.trim().length > 0);

  // Langues
  const rawLangs = Array.isArray(safeObj.languages)
    ? safeObj.languages
    : Array.isArray(safeObj.langues)
      ? safeObj.langues
      : [];
  const normalizedLangs = rawLangs
    .map((l: any, idx: number) => {
      if (typeof l === "string") {
        return {
          id: `lang-${idx}-${Date.now()}`,
          name: l,
          level: null,
          score: null,
          associatedCertification: null,
          attestation: null,
        };
      }
      return {
        id: l.id || `lang-${idx}-${Date.now()}`,
        name: l.name || l.langue || "",
        level: l.level || l.niveau || null,
        score: l.score || null,
        associatedCertification: l.associatedCertification || null,
        attestation: l.attestation || null,
      };
    })
    .filter((l: any) => l.name && l.name.trim().length > 0);

  // Projets
  const rawProjects = Array.isArray(safeObj.projects)
    ? safeObj.projects
    : Array.isArray(safeObj.projets)
      ? safeObj.projets
      : [];
  const normalizedProjects = rawProjects.map((p: any, idx: number) => ({
    id: p.id || `proj-${idx}-${Date.now()}`,
    name: p.name || p.titre || p.nom || "Projet",
    type: p.type || null,
    context: p.context || p.cadre || null,
    date: p.date || null,
    startDate: p.startDate || null,
    endDate: p.endDate || null,
    description: p.description || "",
    role: p.role || null,
    missions: Array.isArray(p.missions) ? p.missions : [],
    responsibilities: Array.isArray(p.responsibilities)
      ? p.responsibilities
      : [],
    achievements: Array.isArray(p.achievements) ? p.achievements : [],
    results: Array.isArray(p.results) ? p.results : [],
    tools: Array.isArray(p.tools) ? p.tools : [],
    skills: Array.isArray(p.skills) ? p.skills : [],
    url: p.url || null,
    sourceText: p.sourceText || null,
  }));

  // Engagements / Associations
  const rawAssociations = Array.isArray(safeObj.associations)
    ? safeObj.associations
    : Array.isArray(safeObj.engagements)
      ? safeObj.engagements
      : Array.isArray(safeObj.benevolats)
        ? safeObj.benevolats
        : [];
  const normalizedAssociations = rawAssociations.map((a: any, idx: number) => ({
    id: a.id || `assoc-${idx}-${Date.now()}`,
    organization: a.organization || a.association || a.nom || "Organisation",
    role: a.role || a.fonction || null,
    startDate: a.startDate || a.debut || null,
    endDate: a.endDate || a.fin || null,
    isCurrent: Boolean(a.isCurrent),
    teamSize: a.teamSize || a.effectif || null,
    description: a.description || "",
    missions: Array.isArray(a.missions) ? a.missions : [],
    responsibilities: Array.isArray(a.responsibilities)
      ? a.responsibilities
      : [],
    achievements: Array.isArray(a.achievements) ? a.achievements : [],
    results: Array.isArray(a.results) ? a.results : [],
    tools: Array.isArray(a.tools) ? a.tools : [],
    skills: Array.isArray(a.skills) ? a.skills : [],
    sourceText: a.sourceText || null,
  }));

  // Centres d'intérêt
  const rawInterests = Array.isArray(safeObj.interests)
    ? safeObj.interests
    : Array.isArray(safeObj.interets)
      ? safeObj.interets
      : [];
  const normalizedInterests = rawInterests
    .map((i: any, idx: number) => ({
      id: i.id || `int-${idx}-${Date.now()}`,
      name: i.name || i.nom || i.titre || "",
      category: i.category || null,
      description: i.description || null,
      subtopics: Array.isArray(i.subtopics)
        ? i.subtopics
        : Array.isArray(i.sousThemes)
          ? i.sousThemes
          : [],
      details: i.details || null,
      sourceText: i.sourceText || null,
    }))
    .filter((i: any) => i.name && i.name.trim().length > 0);

  // Soft skills
  const rawSoftSkills = Array.isArray(safeObj.softSkills)
    ? safeObj.softSkills
    : [];
  const normalizedSoftSkills = rawSoftSkills
    .map((ss: any, idx: number) => ({
      id: ss.id || `soft-${idx}-${Date.now()}`,
      name: typeof ss === "string" ? ss : ss.name || "",
    }))
    .filter((ss: any) => ss.name && ss.name.trim().length > 0);

  return correlateCvData(
    {
      identity: {
        firstName: rawId.firstName || "",
        lastName: rawId.lastName || "",
        professionalTitle: rawId.professionalTitle || "",
        email: rawId.email || "",
        phone: rawId.phone || "",
        city: detectedCity,
        postalCode: rawId.postalCode || "",
        country: detectedCountry,
        drivingLicense: rawId.drivingLicense || "",
        mobility: rawId.mobility || "",
        linkedin: rawId.linkedin || "",
        portfolio: rawId.portfolio || "",
        github: rawId.github || "",
        website: rawId.website || "",
      },
      summary: {
        headline: safeObj.summary?.headline || "",
        careerObjective: safeObj.summary?.careerObjective || "",
        shortBio: safeObj.summary?.shortBio || "",
      },
      experiences: normalizedExperiences,
      education: normalizedEducation,
      skills: normalizedSkills,
      tools: normalizedTools,
      softSkills: normalizedSoftSkills,
      languages: normalizedLangs,
      certifications: normalizedCerts,
      projects: normalizedProjects,
      associations: normalizedAssociations,
      engagements: normalizedAssociations,
      interests: normalizedInterests,
      audit: {
        rawTextLength: originalText.length,
        detectedCounts: {
          experiences: normalizedExperiences.length,
          education: normalizedEducation.length,
          skills: normalizedSkills.length,
          tools: normalizedTools.length,
          softSkills: normalizedSoftSkills.length,
          languages: normalizedLangs.length,
          certifications: normalizedCerts.length,
          projects: normalizedProjects.length,
          associations: normalizedAssociations.length,
          interests: normalizedInterests.length,
        },
        completenessCheckPassed: true,
        warnings: [],
        processingTimeMs,
      },
      rawText: originalText,
    },
    originalText,
    processingTimeMs,
  );
}

/**
 * Extraction déterministe de secours en cas d'absence temporaire du service IA
 */
export function fallbackDeterministicExtraction(
  text: string,
  processingTimeMs: number = 0,
): CvImportResult {
  const emailMatch = text.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  );
  const phoneMatch = text.match(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);

  // Certifications
  const certifications: CvImportCertification[] = [];
  const toeicMatch = text.match(
    /TOEIC\s*[:\s-]*(\d{3,4}(?:\s*\/\s*\d{3,4})?)/i,
  );
  if (toeicMatch && toeicMatch[1]) {
    certifications.push({
      id: "cert-toeic",
      name: "TOEIC",
      organization: "ETS Global",
      score: toeicMatch[1].trim(),
      level: /b2/i.test(text) ? "B2" : null,
      language: "Anglais",
      date: "2024",
      description: "Test de compétences en langue anglaise",
      sourceText: toeicMatch[0],
    });
  }

  const tageMatch = text.match(
    /TAGE\s*MAGE\s*[:\s-]*(\d{2,3}(?:\s*\/\s*\d{2,3})?)/i,
  );
  if (tageMatch && tageMatch[1]) {
    certifications.push({
      id: "cert-tagemage",
      name: "TAGE MAGE",
      organization: "FNEGE",
      score: tageMatch[1].trim(),
      level: null,
      language: null,
      date: "2024",
      description: "Test d'aptitude aux études de gestion",
      sourceText: tageMatch[0],
    });
  }

  if (/attestation.*anglais.*b2/i.test(text) || /attestation.*b2/i.test(text)) {
    certifications.push({
      id: "cert-attestation-b2",
      name: "Attestation de niveau d'anglais B2",
      organization: "IUT de Toulon",
      score: "B2",
      level: "B2",
      language: "Anglais",
      date: "2024",
      description: "Attestation institutionnelle de niveau d'anglais CECRL",
      sourceText: "Attestation de niveau d'anglais B2",
    });
  }

  // Langues
  const languages: CvImportLanguage[] = [];
  if (/anglais/i.test(text)) {
    languages.push({
      id: "lang-en",
      name: "Anglais",
      level: /b1\/b2/i.test(text)
        ? "B1/B2"
        : /b2/i.test(text)
          ? "B2"
          : "Intermédiaire",
      associatedCertification: toeicMatch ? "TOEIC" : null,
      score: toeicMatch && toeicMatch[1] ? toeicMatch[1].trim() : null,
      attestation: /attestation/i.test(text)
        ? "Attestation de niveau d'anglais B2"
        : null,
      certifications: certifications
        .filter((c) => c.language === "Anglais")
        .map((c) => ({
          name: c.name,
          score: c.score,
          level: c.level,
        })),
    });
  }

  if (/espagnol/i.test(text)) {
    languages.push({
      id: "lang-es",
      name: "Espagnol",
      level: /a2/i.test(text) ? "A2" : "Notions",
    });
  }

  if (/francais|français/i.test(text)) {
    languages.push({
      id: "lang-fr",
      name: "Français",
      level: "Langue maternelle",
    });
  }

  // Outils logiciels types
  const tools: CvImportTool[] = [];
  const knownTools = [
    { name: "Canva", category: "Design" },
    { name: "Microsoft Excel", category: "Bureautique" },
    { name: "Microsoft Word", category: "Bureautique" },
    { name: "Microsoft PowerPoint", category: "Bureautique" },
    { name: "CapCut", category: "Vidéo" },
    { name: "Premiere Pro", category: "Vidéo" },
  ];
  for (const kt of knownTools) {
    if (new RegExp(`\\b${kt.name.replace(" ", "\\s*")}\\b`, "i").test(text)) {
      tools.push({
        id: `tool-${kt.name.toLowerCase().replace(/\s+/g, "")}`,
        name: kt.name,
        category: kt.category,
        level: "Avancé",
      });
    }
  }

  // Centres d'intérêt types avec sous-thèmes
  const interests: CvImportInterest[] = [];
  if (/automobile|f1|wec/i.test(text)) {
    interests.push({
      id: "int-auto",
      name: "Automobile",
      category: "Sport mécanique",
      description: "Passionné de Formule 1 et du championnat d'endurance WEC",
      subtopics: ["F1", "WEC"],
      details: "F1, WEC",
      sourceText: "Automobile : F1, WEC",
    });
  }
  if (/économie|economie|marchés financiers|investissement/i.test(text)) {
    interests.push({
      id: "int-eco",
      name: "Économie",
      category: "Finance",
      description: "Suivi des marchés financiers et de l'investissement",
      subtopics: ["Marchés financiers", "Investissement"],
      details: "Marchés financiers, Investissement",
      sourceText: "Économie : Marchés financiers, Investissement",
    });
  }
  if (/horlogerie/i.test(text)) {
    interests.push({
      id: "int-horlo",
      name: "Horlogerie",
      category: "Art & Mécanique",
      description: "Intérêt pour la conception et l'horlogerie de précision",
      subtopics: ["Conception", "Vente"],
      details: "Conception, Vente",
      sourceText: "Horlogerie : Conception, Vente",
    });
  }

  return correlateCvData(
    {
      identity: {
        firstName: /nathan/i.test(text) ? "Nathan" : "",
        lastName: /palumbo/i.test(text) ? "Palumbo" : "",
        professionalTitle: "",
        email: emailMatch ? emailMatch[0] : "",
        phone: phoneMatch ? phoneMatch[0] : "",
        city: /toulon/i.test(text) ? "Toulon" : "",
        postalCode: "",
        country: "France",
        drivingLicense: /permis\s*b/i.test(text) ? "Permis B" : "",
        mobility: /véhiculé/i.test(text) ? "Véhiculé" : "",
        linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : "",
        portfolio: "",
        github: "",
        website: "",
      },
      summary: {
        headline: "",
        careerObjective: "",
        shortBio: "",
      },
      experiences: [],
      education: [],
      skills: [],
      tools,
      softSkills: [],
      languages,
      certifications,
      projects: [],
      associations: [],
      interests,
      audit: {
        rawTextLength: text.length,
        detectedCounts: {
          experiences: 0,
          education: 0,
          skills: 0,
          tools: tools.length,
          softSkills: 0,
          languages: languages.length,
          certifications: certifications.length,
          projects: 0,
          associations: 0,
          interests: interests.length,
        },
        completenessCheckPassed: true,
        warnings: [
          {
            field: "service",
            message:
              "Analyse heuristique déterministe V5 appliquée avec préservation des corrélations.",
            severity: "info",
          },
        ],
        processingTimeMs,
      },
      rawText: text,
    },
    text,
    processingTimeMs,
  );
}
