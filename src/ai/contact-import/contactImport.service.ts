import { appelerGeminiSecurise, extraireJsonPropre } from "@/lib/gemini.server";
import {
  CONTACT_IMPORT_SYSTEM_PROMPT,
  buildContactImportUserPrompt,
} from "./contactImport.prompt";
import type {
  ClassifyContactsBatchInput,
  ClassifyContactsBatchResult,
  ContactClassificationOutput,
} from "./contactImport.types";

const VALID_CATEGORIES = [
  "Recruteur / RH",
  "Alumni",
  "Étudiant / en recherche",
  "Professionnel du secteur ciblé",
  "Professionnel hors secteur ciblé",
  "Autre",
] as const;

function normalizeCategory(
  cat: string | undefined,
): ContactClassificationOutput["category"] {
  if (!cat) return "Autre";
  const str = String(cat).trim();
  if (VALID_CATEGORIES.includes(str as (typeof VALID_CATEGORIES)[number])) {
    return str as ContactClassificationOutput["category"];
  }

  const lower = str.toLowerCase();
  if (
    lower.includes("recrute") ||
    lower.includes("rh") ||
    lower.includes("talent") ||
    lower.includes("hr")
  ) {
    return "Recruteur / RH";
  }
  if (lower.includes("alumn")) {
    return "Alumni";
  }
  if (
    lower.includes("étudiant") ||
    lower.includes("etudiant") ||
    lower.includes("recherche") ||
    lower.includes("stagiaire") ||
    lower.includes("alternant")
  ) {
    return "Étudiant / en recherche";
  }
  if (
    lower.includes("du secteur") ||
    lower.includes("ciblé") ||
    lower.includes("cible")
  ) {
    return "Professionnel du secteur ciblé";
  }
  if (lower.includes("hors secteur") || lower.includes("autre secteur")) {
    return "Professionnel hors secteur ciblé";
  }
  return "Autre";
}

export async function classifyContactsBatchIA(
  input: ClassifyContactsBatchInput,
): Promise<ClassifyContactsBatchResult> {
  if (!input.contacts || input.contacts.length === 0) {
    return { classifications: [] };
  }

  try {
    const promptUtilisateur = buildContactImportUserPrompt(input);

    const rawResult = await appelerGeminiSecurise({
      promptSysteme: CONTACT_IMPORT_SYSTEM_PROMPT,
      promptUtilisateur,
      reponseFormat: "json",
      temperature: 0.2,
    });

    const jsonClean = extraireJsonPropre(rawResult);
    let parsed: Record<string, unknown> | unknown[];
    try {
      parsed = JSON.parse(jsonClean);
    } catch (parseErr) {
      console.warn(
        "[ContactImportService] Impossible de parser le JSON retourné par Gemini:",
        jsonClean,
        parseErr,
      );
      return { classifications: [] };
    }

    let rawList: Record<string, unknown>[] = [];
    if (Array.isArray(parsed)) {
      rawList = parsed as Record<string, unknown>[];
    } else if (parsed && typeof parsed === "object") {
      const obj = parsed as Record<string, unknown>;
      if (Array.isArray(obj.classifications)) {
        rawList = obj.classifications as Record<string, unknown>[];
      } else if (Array.isArray(obj.classified)) {
        rawList = obj.classified as Record<string, unknown>[];
      } else if (Array.isArray(obj.results)) {
        rawList = obj.results as Record<string, unknown>[];
      } else if (Array.isArray(obj.contacts)) {
        rawList = obj.contacts as Record<string, unknown>[];
      } else if (Array.isArray(obj.data)) {
        rawList = obj.data as Record<string, unknown>[];
      }
    }

    const classifications: ContactClassificationOutput[] = rawList.map(
      (item, idx) => {
        const fallbackInput = input.contacts[idx];
        const id = String(item.id || fallbackInput?.id || `contact_${idx}`);
        const normalizedCompany = String(
          item.normalizedCompany ||
            item.company ||
            fallbackInput?.entreprise ||
            "",
        );
        const companyMatchedWithExisting = item.companyMatchedWithExisting
          ? String(item.companyMatchedWithExisting)
          : undefined;
        const normalizedFunction = String(
          item.normalizedFunction ||
            item.function ||
            item.poste ||
            fallbackInput?.poste ||
            "",
        );
        const normalizedLevel = String(
          item.normalizedLevel || item.level || "",
        );
        const category = normalizeCategory(
          typeof item.category === "string" ? item.category : undefined,
        );

        let categoryConfidence =
          typeof item.categoryConfidence === "number"
            ? item.categoryConfidence
            : 80;
        if (categoryConfidence > 0 && categoryConfidence <= 1) {
          categoryConfidence = Math.round(categoryConfidence * 100);
        }
        categoryConfidence = Math.min(100, Math.max(0, categoryConfidence));

        const pastCompanies = Array.isArray(item.pastCompanies)
          ? item.pastCompanies
              .map((c: unknown) => String(c).trim())
              .filter(Boolean)
          : [];
        const education = Array.isArray(item.education)
          ? item.education.map((e: unknown) => String(e).trim()).filter(Boolean)
          : [];
        const companySector =
          typeof item.companySector === "string"
            ? item.companySector.trim()
            : "";
        const explanation =
          typeof item.explanation === "string" ? item.explanation.trim() : "";

        return {
          id,
          normalizedCompany,
          companyMatchedWithExisting,
          normalizedFunction,
          normalizedLevel,
          category,
          categoryConfidence,
          pastCompanies,
          education,
          companySector,
          explanation,
        };
      },
    );

    return { classifications };
  } catch (err) {
    console.error(
      "[ContactImportService] Erreur lors de la classification des contacts:",
      err,
    );
    return { classifications: [] };
  }
}