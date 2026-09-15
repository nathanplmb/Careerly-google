import type {
  OpportunityCompanyMetric,
  OpportunityExtractedData,
} from "./opportunity.types";

/**
 * Nettoyage approfondi du texte d'une offre.
 * Élimine le bruit de navigation web et d'accessibilité (ex: "Aller au contenu", "Passer au contenu"),
 * les menus, cookies, boutons de partage et balises HTML élémentaires.
 */
export function cleanOfferText(raw: string): string {
  if (!raw) return "";

  // 1. Normalisation Unicode et suppression de balises HTML
  const normalized = raw
    .replace(/\u00a0/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\r\n/g, "\n");

  const lines = normalized.split("\n");
  const cleanedLines: string[] = [];

  const noiseRegex =
    /^(?:aller au contenu|passer au contenu|passer directement au contenu|skip to (?:main )?content|menu|navigation|accueil|home|connexion|se connecter|s'inscrire|inscription|mon compte|espace candidat|recherche|rechercher|fermer|close|cookies?|politique (?:de |des )?cookies?|mentions légales|cgu|confidentialité|postuler(?:\s+(?:à|a)\s+l'offre|\s+maintenant)?|candidater|partager(?:\s+l'offre|\s+sur\s+linkedin|\s+cette\s+offre)?|imprimer|print|voir moins|voir plus|career center|retour aux offres|retour|suivez-nous|suivre l'entreprise)\s*[:.\-–]?$/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (
        cleanedLines.length > 0 &&
        cleanedLines[cleanedLines.length - 1] !== ""
      ) {
        cleanedLines.push("");
      }
      continue;
    }

    // Filtre les lignes parasites de navigation web
    if (trimmed.length < 80 && noiseRegex.test(trimmed)) {
      continue;
    }

    // Filtre les faux liens markdown d'accessibilité (ex: [Aller au contenu](#main))
    if (
      /^\[(?:Aller au contenu|Skip to content|Passer au contenu)\]/i.test(
        trimmed,
      )
    ) {
      continue;
    }

    cleanedLines.push(trimmed);
  }

  return cleanedLines.join("\n").trim();
}

/**
 * Liste des faux positifs d'intitulé de poste interdits (bruit de scraping / accessibilité)
 */
export const SUSPICIOUS_TITLES = [
  "aller au contenu",
  "passer au contenu",
  "skip to content",
  "menu",
  "accueil",
  "home",
  "connexion",
  "se connecter",
  "inscription",
  "recherche",
  "rechercher",
  "fermer",
  "navigation",
  "cookie",
  "cookies",
  "mentions légales",
  "postuler",
  "partager",
  "partager l'offre",
  "partager cette offre",
  "voir moins",
  "career center",
  "retour",
  "imprimer",
  "sans titre",
  "offre",
  "job",
  "poste sans titre",
  "poste",
  "candidature",
];

export function isSuspiciousTitle(title: string | null | undefined): boolean {
  if (!title) return true;
  const lower = title.trim().toLowerCase();
  if (lower.length < 3) return true;
  if (
    SUSPICIOUS_TITLES.some(
      (st) =>
        lower === st || lower.startsWith(st + " ") || lower.endsWith(" " + st),
    )
  ) {
    return true;
  }
  if (
    /^(?:aller|passer|cliquer|fermer|partager|se connecter|postuler)\b/i.test(
      lower,
    )
  ) {
    return true;
  }
  return false;
}

/**
 * Recherche déterministe d'un véritable intitulé de poste dans le texte source
 */
export function extractCleanJobTitle(text: string): string | null {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // 1. Cherche avec préfixe explicite
  const explicitRegex =
    /(?:intitulé(?: du poste)?|titre(?: du poste)?|poste(?: recherché)?|job title|offre d'emploi|intitulé)\s*[:\-–]\s*([^\n\r.]+)/i;
  for (const line of lines) {
    const m = line.match(explicitRegex);
    if (m && m[1]) {
      const cand = m[1].replace(/^[#*•\-\s]+/, "").trim();
      if (!isSuspiciousTitle(cand) && cand.length > 3) {
        return cand;
      }
    }
  }

  // 2. Cherche une ligne portant des mots-clés typiques de poste
  const jobKeywordsRegex =
    /\b(?:stage|alternance|stagiaire|alternant|développeur|developpeur|ingénieur|ingenieur|lead dev|tech lead|architecte|consultant|manager|chef de projet|product owner|product manager|data scientist|data engineer|devops|designer|commercial|business developer|bras droit|analyste|chargé de|charge de|auditeur|comptable)\b/i;
  for (const line of lines.slice(0, 15)) {
    const cleanLine = line.replace(/^[#*•\-\s]+/, "").trim();
    if (
      cleanLine.length >= 4 &&
      cleanLine.length <= 80 &&
      jobKeywordsRegex.test(cleanLine)
    ) {
      if (!isSuspiciousTitle(cleanLine)) {
        return cleanLine;
      }
    }
  }

  return null;
}

/**
 * Dissocie rigoureusement le nom d'entreprise, la taille/effectif et le secteur
 * afin d'éliminer définitivement les faux positifs tels que "15 k employésBanque".
 */
export function sanitizeCompanyAndMetrics(
  rawCompany: string | null | undefined,
  sourceText: string,
): {
  cleanCompany: string;
  extractedSize?: string;
  extractedSector?: string;
  extractedMetric?: OpportunityCompanyMetric;
} {
  const comp = (rawCompany || "").trim();

  // Détection de l'effectif ou taille mélangée
  const headcountRegex =
    /(\d+(?:\s*(?:k|kilo|000))?\s*(?:employés|salariés|collaborateurs|personnes|agents))/i;
  const matchHeadcount = comp.match(headcountRegex);

  let extractedSize: string | undefined = undefined;
  let extractedSector: string | undefined = undefined;
  let extractedMetric: OpportunityCompanyMetric | undefined = undefined;

  if (matchHeadcount && matchHeadcount[1]) {
    extractedSize = matchHeadcount[1].trim();
    extractedMetric = {
      label: "Effectif",
      value: extractedSize,
    };

    // Cherche si un secteur est fusionné après l'effectif (ex: "Banque", "Assurance", "Tech")
    const remainingAfter = comp.replace(headcountRegex, "").trim();
    if (remainingAfter.length >= 3 && remainingAfter.length <= 40) {
      extractedSector = remainingAfter;
    }
  }

  // Vérifie si le nom d'entreprise est suspect
  const isSuspicious =
    !comp ||
    Boolean(matchHeadcount) ||
    /^(?:15\s*k|employés|salariés|menu|aller au contenu|connexion|entreprise\s*:|recherche)/i.test(
      comp,
    );

  if (!isSuspicious && comp.length >= 2) {
    return {
      cleanCompany: comp,
      extractedSize,
      extractedSector,
      extractedMetric,
    };
  }

  // Recherche du véritable nom de l'entreprise dans le texte source
  const searchRegex =
    /(?:chez|société|societe|entreprise|groupe|nom de l'entreprise)\s*[:\-–]?\s*([^\n\r,;:–—]{2,35})/gi;
  let match: RegExpExecArray | null;
  while ((match = searchRegex.exec(sourceText)) !== null) {
    const candidate = match[1]
      .split(/\s+(?:à|au|en|pour|recherche|recrute)\s+/i)[0]
      .replace(/[.,;:].*$/, "")
      .trim();
    if (
      candidate.length >= 2 &&
      !/^(?:recherche|recrute|notre|nos|une|un|ce|cette|\d+)/i.test(
        candidate,
      ) &&
      !candidate.toLowerCase().includes("employés") &&
      !headcountRegex.test(candidate)
    ) {
      return {
        cleanCompany: candidate,
        extractedSize,
        extractedSector,
        extractedMetric,
      };
    }
  }

  return {
    cleanCompany: isSuspicious ? "" : comp,
    extractedSize,
    extractedSector,
    extractedMetric,
  };
}

/**
 * Extraction heuristique déterministe de secours (offline / fallback réseau).
 * Intègre les mêmes garde-fous stricts que l'IA contre "Aller au contenu" et "15 k employésBanque".
 */
export function extraireOpportuniteHeuristique(
  rawText: string,
  optionalUrl?: string,
): OpportunityExtractedData {
  const cleanedText = cleanOfferText(rawText);
  const lines = cleanedText
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // 1. Détection du titre du poste avec validation
  let title = extractCleanJobTitle(cleanedText) || "";

  if (!title) {
    for (const line of lines) {
      if (!isSuspiciousTitle(line) && line.length >= 5 && line.length <= 70) {
        title = line.replace(/^[#*•\-\s]+/, "").trim();
        break;
      }
    }
  }

  if (isSuspiciousTitle(title)) {
    title = "";
  }

  // 2. Détection de l'entreprise
  let rawCompanyCandidate = "";
  const companyPrefixRegex =
    /(?:entreprise|société|societe|chez|company|employeur)\s*[:\-–]?\s*([^\n\r,;()]+)/i;
  for (const line of lines) {
    const m = line.match(companyPrefixRegex);
    if (m && m[1]) {
      rawCompanyCandidate = m[1].trim();
      break;
    }
  }

  const companySanitized = sanitizeCompanyAndMetrics(
    rawCompanyCandidate,
    cleanedText,
  );
  let company = companySanitized.cleanCompany;

  if (!company && optionalUrl) {
    try {
      const parsedUrl = new URL(optionalUrl);
      const host = parsedUrl.hostname.replace(/^www\./, "");
      const parts = host.split(".");
      if (
        parts.length >= 2 &&
        parts[0] &&
        ![
          "welcometothejungle",
          "linkedin",
          "indeed",
          "hellowork",
          "apec",
          "glassdoor",
        ].includes(parts[0].toLowerCase())
      ) {
        company = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
    } catch {
      // Ignorer URL invalide
    }
  }

  // 3. Détection de la localisation
  let location = "";
  const locRegex =
    /(?:lieu|localisation|ville|location)\s*[:\-–]?\s*([^\n\r,;()]+)/i;
  for (const line of lines) {
    const m = line.match(locRegex);
    if (m && m[1]) {
      location = m[1].trim();
      break;
    }
  }
  if (!location) {
    const commonCities = [
      "Paris",
      "Lyon",
      "Marseille",
      "Toulouse",
      "Bordeaux",
      "Nantes",
      "Lille",
      "Strasbourg",
      "Rennes",
      "Montpellier",
      "Nice",
      "Grenoble",
    ];
    for (const city of commonCities) {
      if (new RegExp(`\\b${city}\\b`, "i").test(cleanedText)) {
        location = city;
        break;
      }
    }
  }

  // 4. Type de contrat
  let contractType: string | null = null;
  if (/\b(?:stage|stagiaire|internship)\b/i.test(cleanedText)) {
    contractType = "Stage";
  } else if (
    /\b(?:alternance|apprentissage|contrat de pro)\b/i.test(cleanedText)
  ) {
    contractType = "Alternance";
  } else if (/\bCDD\b/i.test(cleanedText)) {
    contractType = "CDD";
  } else if (/\bCDI\b/i.test(cleanedText)) {
    contractType = "CDI";
  } else if (/\bfreelance\b/i.test(cleanedText)) {
    contractType = "Freelance";
  } else if (/\b(?:v\.?i\.?e)\b/i.test(cleanedText)) {
    contractType = "VIE";
  }

  // 5. Durée
  let duration: string | null = null;
  const durationMatch =
    cleanedText.match(
      /(?:durée(?:\s*du\s*(?:contrat|stage|poste))?|stage\s+de|alternance\s+de|mission\s+de|contrat\s+de)\s*[:–-]?\s*(\d+\s*(?:[àa]\s*\d+\s*)?(?:mois|semaines|ans?|jours?))\b/i,
    ) || cleanedText.match(/\b(\d+\s*(?:[àa]\s*\d+\s*)?mois)\b/i);
  if (durationMatch && durationMatch[1]) {
    duration = durationMatch[1].trim();
  }

  // 6. Télétravail
  let remotePolicy: string | null = null;
  if (
    /full\s*remote|100%\s*télétravail|télétravail\s*total/i.test(cleanedText)
  ) {
    remotePolicy = "Full remote";
  } else if (
    /hybride|partiel|télétravail\s*(?:partiel|possible|\d+\s*j)/i.test(
      cleanedText,
    )
  ) {
    remotePolicy = "Hybride";
  } else if (/présentiel/i.test(cleanedText)) {
    remotePolicy = "Présentiel";
  }

  // 7. Salaire
  let salary: string | null = null;
  const salMatch = cleanedText.match(
    /\b(\d{2,3}(?:\s?[–-]\s?\d{2,3})?\s?[kK]€?|\d{2,3}\s?000\s?€|\d{3,4}\s?€\s*\/\s*mois)\b/i,
  );
  if (salMatch) {
    salary = salMatch[0].trim();
  }

  // 8. Missions (lignes à puces)
  const missions: string[] = [];
  for (const line of lines) {
    if (/^[•\-*]\s*(.+)/.test(line)) {
      const bullet = line.replace(/^[•\-*]\s*/, "").trim();
      if (
        bullet.length > 10 &&
        bullet.length < 250 &&
        !isSuspiciousTitle(bullet)
      ) {
        missions.push(bullet);
      }
    }
  }

  // 9. Compétences
  const techKeywords = [
    "React",
    "Vue",
    "Angular",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "Spring",
    "Go",
    "C#",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Git",
    "Tailwind",
    "Figma",
    "Agile",
    "Scrum",
    "Excel",
    "PowerBI",
  ];
  const requiredSkills: string[] = [];
  for (const skill of techKeywords) {
    if (
      new RegExp(`\\b${skill.replace(".", "\\.")}\\b`, "i").test(cleanedText)
    ) {
      requiredSkills.push(skill);
    }
  }

  // Métriques
  const companyMetrics: OpportunityCompanyMetric[] = [];
  if (companySanitized.extractedMetric) {
    companyMetrics.push(companySanitized.extractedMetric);
  }

  return {
    title: title || "Poste sans titre",
    poste: title || "Poste sans titre",
    company: company || "Entreprise inconnue",
    entreprise: company || "Entreprise inconnue",
    location: location || "",
    lieu: location || "",
    country: "France",
    contractType,
    typeContrat: contractType,
    duration,
    remotePolicy,
    salary,
    source: optionalUrl ? "Lien externe" : "Texte brut",
    sourceUrl: optionalUrl?.trim() || null,
    missions: missions.slice(0, 8),
    responsibilities: [],
    requiredSkills: requiredSkills.slice(0, 10),
    preferredSkills: [],
    tools: [],
    requiredLanguages: [],
    preferredLanguages: [],
    qualities: [],
    educationRequirements: [],
    companyName: company || null,
    companySize: companySanitized.extractedSize || null,
    companySector: companySanitized.extractedSector || null,
    companyContext: [],
    companyPartners: [],
    companyMetrics,
    recruitmentProcess: [],
    applicationRequirements: [],
    benefits: [],
    sourceType: "job_board",
    sourceName: optionalUrl ? "Lien externe" : "Texte brut",
    extractedAt: new Date().toISOString(),
    _extractionMethod: "heuristic",
    _modelUsed: "heuristic-fallback",
  };
}
