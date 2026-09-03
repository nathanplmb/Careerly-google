import type { DetectedSection, RawEntityBlock, SegmentedBlocks } from "./types";

const DATE_RANGE_REGEX =
  /(?:(?:janv|f[eé]vr|mars|avr|mai|juin|juil|ao[uû]t|sept|oct|nov|d[eé]c)\.?\s*\d{4}|\d{4})\s*(?:[–—\-\/]|(?:[aà]|au)\s*)\s*(?:(?:janv|f[eé]vr|mars|avr|mai|juin|juil|ao[uû]t|sept|oct|nov|d[eé]c)\.?\s*\d{4}|\d{4}|aujourd['’]hui|actuellement|en cours|présent)/i;

const SINGLE_DATE_OR_YEAR_REGEX =
  /\b(?:19|20)\d{2}(?:\s*[-–—\/]\s*(?:19|20)\d{2})?\b/;

export function segmentBlocks(sections: DetectedSection[]): SegmentedBlocks {
  const identityLines: string[] = [];
  const experienceBlocks: RawEntityBlock[] = [];
  const educationBlocks: RawEntityBlock[] = [];
  const skillBlocks: RawEntityBlock[] = [];
  const languageBlocks: RawEntityBlock[] = [];
  const certificationBlocks: RawEntityBlock[] = [];
  const projectBlocks: RawEntityBlock[] = [];
  const interestBlocks: RawEntityBlock[] = [];
  const engagementBlocks: RawEntityBlock[] = [];
  const otherBlocks: RawEntityBlock[] = [];

  for (const section of sections) {
    switch (section.type) {
      case "IDENTITE":
      case "CONTACT":
      case "PROFIL":
      case "OBJECTIF":
        identityLines.push(...section.lines);
        break;

      case "EXPERIENCES":
        experienceBlocks.push(
          ...segmentMultiLineBlocks(section, isExperienceBoundary),
        );
        break;

      case "FORMATION":
        educationBlocks.push(
          ...segmentMultiLineBlocks(section, isEducationBoundary),
        );
        break;

      case "COMPETENCES":
        skillBlocks.push(...segmentSkillBlocks(section));
        break;

      case "LANGUES":
        languageBlocks.push(...segmentSimpleListBlocks(section));
        break;

      case "CERTIFICATIONS":
        certificationBlocks.push(...segmentSimpleListBlocks(section));
        break;

      case "PROJETS":
        projectBlocks.push(
          ...segmentMultiLineBlocks(section, isProjectBoundary),
        );
        break;

      case "CENTRES_INTERET":
        interestBlocks.push(...segmentSimpleListBlocks(section));
        break;

      case "ENGAGEMENTS":
      case "BENEVOLAT":
        engagementBlocks.push(
          ...segmentMultiLineBlocks(section, isEngagementBoundary),
        );
        break;

      default:
        otherBlocks.push({
          sectionType: section.type,
          rawText: section.lines.join("\n"),
          lines: section.lines,
          source: {
            text: section.lines.slice(0, 3).join("\n"),
            page: section.pageNumber,
          },
        });
        break;
    }
  }

  return {
    identityLines,
    experienceBlocks,
    educationBlocks,
    skillBlocks,
    languageBlocks,
    certificationBlocks,
    projectBlocks,
    interestBlocks,
    engagementBlocks,
    otherBlocks,
  };
}

/**
 * Détecte si une ligne commence une nouvelle expérience.
 */
function isExperienceBoundary(
  line: string,
  _prevLine: string | null,
  accumulatedLines: string[],
): boolean {
  if (accumulatedLines.length === 0) return true;

  // Si la ligne commence par une puce de description (-, •, *), elle appartient au bloc en cours
  if (/^[\s•\-\*–—\t]/.test(line)) {
    return false;
  }

  // Si la ligne contient une plage de dates explicite
  if (DATE_RANGE_REGEX.test(line)) {
    return true;
  }

  // Si la ligne précédente était une date ou un titre et que cette ligne est courte et distincte
  const isUpperOrTitle = /^[A-Z0-9À-ÖØ-ß]/.test(line);
  const containsSeparator =
    line.includes("—") ||
    line.includes("–") ||
    line.includes(" | ") ||
    line.includes(" - ");
  const containsRoleKeyword =
    /\b(stage|alternan|responsable|assistant|charg[eé]|directeur|chef|consultant|d[eé]veloppeur|manager|membre|ing[eé]nieur|vendeur|op[eé]rateur|carrossier|employ[eé])\b/i.test(
      line,
    );

  if (
    isUpperOrTitle &&
    (containsSeparator || containsRoleKeyword) &&
    accumulatedLines.length >= 2
  ) {
    return true;
  }

  return false;
}

/**
 * Détecte si une ligne commence une nouvelle formation.
 */
function isEducationBoundary(
  line: string,
  _prevLine: string | null,
  accumulatedLines: string[],
): boolean {
  if (accumulatedLines.length === 0) return true;
  if (/^[\s•\-\*–—\t]/.test(line)) return false;

  if (
    /\b(master|licence|bachelor|but|dut|bts|baccalaur[eé]at|bac|dipl[oô]me|doctorat|mba|classe\s+pr[eé]paratoire|cpge|école|lyc[eé]e|universit[eé]|iut|facult[eé])\b/i.test(
      line,
    )
  ) {
    return true;
  }

  if (SINGLE_DATE_OR_YEAR_REGEX.test(line) && accumulatedLines.length >= 2) {
    return true;
  }

  return false;
}

/**
 * Détecte si une ligne commence un nouveau projet.
 */
function isProjectBoundary(
  line: string,
  _prevLine: string | null,
  accumulatedLines: string[],
): boolean {
  if (accumulatedLines.length === 0) return true;
  if (/^[\s•\-\*–—\t]/.test(line)) return false;

  // Ligne numérotée ou contenant un nom de projet distinct
  if (/^(?:\d+[\.\)]|[•\-\*]\s+[A-Z])/.test(line)) return true;
  if (
    /^(?:projet|podcast|[eé]tude|strat[eé]gie|d[eé]veloppement)\b/i.test(line)
  )
    return true;

  return false;
}

function isEngagementBoundary(
  line: string,
  _prevLine: string | null,
  accumulatedLines: string[],
): boolean {
  if (accumulatedLines.length === 0) return true;
  if (/^[\s•\-\*–—\t]/.test(line)) return false;
  if (DATE_RANGE_REGEX.test(line)) return true;
  return false;
}

function segmentMultiLineBlocks(
  section: DetectedSection,
  boundaryFn: (
    line: string,
    prevLine: string | null,
    accumulatedLines: string[],
  ) => boolean,
): RawEntityBlock[] {
  const blocks: RawEntityBlock[] = [];
  let currentLines: string[] = [];

  for (let i = 0; i < section.lines.length; i++) {
    const line = section.lines[i] || "";
    const prevLine = i > 0 ? section.lines[i - 1] || "" : null;

    if (currentLines.length > 0 && boundaryFn(line, prevLine, currentLines)) {
      blocks.push({
        sectionType: section.type,
        rawText: currentLines.join("\n"),
        lines: [...currentLines],
        headerLine: currentLines[0] || "",
        source: {
          text: currentLines.slice(0, 2).join("\n"),
          page: section.pageNumber,
          blockIndex: blocks.length,
        },
      });
      currentLines = [];
    }

    currentLines.push(line);
  }

  if (currentLines.length > 0) {
    blocks.push({
      sectionType: section.type,
      rawText: currentLines.join("\n"),
      lines: [...currentLines],
      headerLine: currentLines[0] || "",
      source: {
        text: currentLines.slice(0, 2).join("\n"),
        page: section.pageNumber,
        blockIndex: blocks.length,
      },
    });
  }

  return blocks;
}

function segmentSimpleListBlocks(section: DetectedSection): RawEntityBlock[] {
  const blocks: RawEntityBlock[] = [];
  for (const line of section.lines) {
    const clean = line.replace(/^[\s•\-\*–—\t]+/, "").trim();
    if (!clean) continue;

    blocks.push({
      sectionType: section.type,
      rawText: clean,
      lines: [clean],
      source: {
        text: clean,
        page: section.pageNumber,
        blockIndex: blocks.length,
      },
    });
  }
  return blocks;
}

function segmentSkillBlocks(section: DetectedSection): RawEntityBlock[] {
  const blocks: RawEntityBlock[] = [];
  for (const line of section.lines) {
    const clean = line.replace(/^[\s•\-\*–—\t]+/, "").trim();
    if (!clean) continue;

    // Si la ligne contient des séparateurs (virgules, barres verticales, puces)
    if (clean.includes(",") || clean.includes("•") || clean.includes(" | ")) {
      const items = clean
        .split(/[,•|]/)
        .map((x) => x.trim())
        .filter(Boolean);
      for (const it of items) {
        blocks.push({
          sectionType: section.type,
          rawText: it,
          lines: [it],
          source: { text: it, page: section.pageNumber },
        });
      }
    } else {
      blocks.push({
        sectionType: section.type,
        rawText: clean,
        lines: [clean],
        source: { text: clean, page: section.pageNumber },
      });
    }
  }
  return blocks;
}
