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
    /^(?:aller au contenu|passer au contenu|passer directement au contenu|skip to (?:main )?content|menu|navigation|accueil|home|connexion|se connecter|s'inscrire|inscription|mon compte|espace candidat|recherche|rechercher|fermer|close|cookies?|politique (?:de |des )?cookies?|mentions légales|cgu|confidentialité|postuler(?:\s+(?:à|a)\s+l'offre|\s+maintenant)?|candidater|partager(?:\s+l'offre|\s+sur\s+linkedin|\s+cette\s+offre)?|imprimer|print|voir moins|voir plus|career center|empowered by jobteaser|offres|événements|evenements|entreprises|toolbox|offre de la semaine|offres similaires|retour aux offres|retour|suivez-nous|suivre l'entreprise)\s*[:.\-–]?$/i;

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
  "empowered by jobteaser",
  "retour",
  "imprimer",
  "sans titre",
  "offre",
  "job",
  "poste sans titre",
  "poste",
  "candidature",
  "comité d'entreprise",
  "restaurant d'entreprise",
  "fondation d'entreprise",
  "grande entreprise",
  "pme",
  "start-up",
  "startup",
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
      cleanLine.length <= 90 &&
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
 * Termes interdits pour un nom d'entreprise
 */
const INVALID_COMPANY_NAMES = [
  "comité d'entreprise",
  "comite d'entreprise",
  "restaurant d'entreprise",
  "fondation d'entreprise",
  "création d'entreprise",
  "creation d'entreprise",
  "taille de l'entreprise",
  "secteur d'entreprise",
  "grande entreprise",
  "pme",
  "eti",
  "start-up",
  "startup",
  "menu",
  "recherche",
  "accueil",
  "connexion",
  "postuler",
  "candidater",
  "career center",
  "jobteaser",
  "toolbox",
  "offres",
  "événements",
  "evenements",
  "entreprises",
];

function isInvalidCompany(name: string | null | undefined): boolean {
  if (!name) return true;
  const lower = name.trim().toLowerCase();
  if (lower.length < 2 || lower.length > 50) return true;
  if (
    INVALID_COMPANY_NAMES.some(
      (bad) =>
        lower === bad ||
        lower.startsWith(bad + " ") ||
        lower.endsWith(" " + bad),
    )
  ) {
    return true;
  }
  if (
    /\b(?:employés|salariés|collaborateurs|postuler|candidature)\b/i.test(lower)
  ) {
    return true;
  }
  return false;
}

/**
 * Extrait le groupe d'appartenance / société mère si mentionné dans le texte
 */
export function extractParentCompanyAndGroup(sourceText: string): {
  parentCompany: string | null;
  groupName: string | null;
} {
  // Ex: "Natixis CIB fait partie du Groupe BPCE."
  // Ex: "filiale du Groupe Crédit Agricole"
  // Ex: "au sein du groupe BPCE"
  // Ex: "appartenant au groupe L'Oréal"
  const groupMatch =
    sourceText.match(
      /(?:fait partie du|filiale du|au sein du|membre du|appartenant au)\s+([Gg]roupe\s+[A-Za-zÀ-ÿ0-9&'\s-]+?)(?:\.|\n|,|;|\s+qui|\s+et\s+)/i,
    ) || sourceText.match(/\b([Gg]roupe\s+[A-ZÀ-ÿ0-9][A-Za-zÀ-ÿ0-9&'-]+)\b/i);

  if (groupMatch && groupMatch[1]) {
    const rawGroup = groupMatch[1].trim();
    if (
      rawGroup.length >= 3 &&
      rawGroup.length <= 40 &&
      !isInvalidCompany(rawGroup)
    ) {
      return { parentCompany: rawGroup, groupName: rawGroup };
    }
  }

  return { parentCompany: null, groupName: null };
}

/**
 * Dissocie rigoureusement le nom d'entreprise, la taille/effectif et le secteur
 * afin d'éliminer définitivement les faux positifs tels que "15 k employésBanque"
 * ou "comité d'entreprise" ou "BPCE" quand l'entité est Natixis.
 */
export function sanitizeCompanyAndMetrics(
  rawCompany: string | null | undefined,
  sourceText: string,
): {
  cleanCompany: string;
  extractedSize?: string;
  extractedSector?: string;
  extractedMetric?: OpportunityCompanyMetric;
  parentCompany?: string | null;
  groupName?: string | null;
} {
  const comp = (rawCompany || "").trim();

  // Extraction du groupe
  const { parentCompany, groupName } = extractParentCompanyAndGroup(sourceText);

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

    const remainingAfter = comp.replace(headcountRegex, "").trim();
    if (remainingAfter.length >= 3 && remainingAfter.length <= 40) {
      extractedSector = remainingAfter;
    }
  }

  // Vérifie si le nom d'entreprise passé en entrée est valide
  if (comp && !isInvalidCompany(comp) && !matchHeadcount && comp.length >= 2) {
    return {
      cleanCompany: comp,
      extractedSize,
      extractedSector,
      extractedMetric,
      parentCompany,
      groupName,
    };
  }

  const lines = sourceText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // 1. Détection structurelle type JobTeaser / job boards :
  // Une ligne courte après le lieu/titre, immédiatement suivie de "Grande entreprise", "PME", "Start-up", ou "\d+ k? employés"
  for (let i = 0; i < Math.min(lines.length, 25); i++) {
    const line = lines[i];
    if (!line) continue;
    const nextLine = lines[i + 1] || "";
    const nextNextLine = lines[i + 2] || "";
    const isFollowedBySizeCategory =
      /^(?:grande entreprise|pme|eti|start-up|startup|scale-up)$/i.test(
        nextLine,
      );
    const isFollowedByHeadcount =
      headcountRegex.test(nextLine) || headcountRegex.test(nextNextLine);

    if (isFollowedBySizeCategory || isFollowedByHeadcount) {
      const candidate = line.replace(/^[#*•\-\s]+/, "").trim();
      if (
        !isInvalidCompany(candidate) &&
        !isSuspiciousTitle(candidate) &&
        candidate.length >= 2 &&
        candidate.length <= 40
      ) {
        return {
          cleanCompany: candidate,
          extractedSize: isFollowedBySizeCategory ? nextLine : extractedSize,
          extractedSector,
          extractedMetric,
          parentCompany,
          groupName,
        };
      }
    }
  }

  // 2. Détection après ancre "Plus d'infos sur l'entreprise" ou "À propos de"
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (
      /^(?:plus d'infos sur l'entreprise|à propos de l'entreprise|l'entreprise|à propos de)\s*:?$/i.test(
        line,
      )
    ) {
      const candidate = lines[i + 1]?.replace(/^[#*•\-\s]+/, "").trim();
      if (
        candidate &&
        !isInvalidCompany(candidate) &&
        !isSuspiciousTitle(candidate) &&
        candidate.length <= 40
      ) {
        return {
          cleanCompany: candidate,
          extractedSize,
          extractedSector,
          extractedMetric,
          parentCompany,
          groupName,
        };
      }
    }
  }

  // 3. Recherche avec préfixe strict (ex: "Entreprise : Natixis", "Société : Alan")
  const prefixRegex =
    /(?:nom de l'entreprise|société|societe|employeur)\s*[:\-–]\s*([^\n\r,;:–—]{2,35})/i;
  for (const line of lines) {
    if (!line) continue;
    const m = line.match(prefixRegex);
    if (m && m[1]) {
      const cand = m[1].trim();
      if (!isInvalidCompany(cand) && !isSuspiciousTitle(cand)) {
        return {
          cleanCompany: cand,
          extractedSize,
          extractedSector,
          extractedMetric,
          parentCompany,
          groupName,
        };
      }
    }
  }

  return {
    cleanCompany: "",
    extractedSize,
    extractedSector,
    extractedMetric,
    parentCompany,
    groupName,
  };
}

/**
 * Extrait exhaustivement les missions confiées
 */
export function extractMissionsBlock(text: string): string[] {
  const missions: string[] = [];
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let inMissions = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Fin du bloc missions si une autre section commence
    if (
      inMissions &&
      /^(?:profil recherché|profil|votre profil|compétences|qui êtes-vous|prérequis|formation|avantages|conditions|processus de recrutement|à propos|plus d'infos)\s*:?/i.test(
        line,
      )
    ) {
      break;
    }

    // Détection de l'ancre de début des missions
    if (
      /^(?:en collaboration avec[^:]*,\s*)?(?:vos\s+)?missions(?:\s+principales)?(?:\s+seront)?\s*:?$/i.test(
        line,
      ) ||
      /(?:vos\s+missions\s+principales\s+seront|missions\s+confiées|au\s+quotidien\s*,?\s*vos\s+missions)/i.test(
        line,
      )
    ) {
      inMissions = true;
      continue;
    }

    if (inMissions) {
      const cleanLine = line.replace(/^[•\-*–—\d.]+\s*/, "").trim();
      if (
        cleanLine.length >= 20 &&
        !isSuspiciousTitle(cleanLine) &&
        !cleanLine.toLowerCase().startsWith("avantages") &&
        !cleanLine.toLowerCase().startsWith("profil")
      ) {
        missions.push(cleanLine);
      }
    }
  }

  // Fallback : si aucune ancre de section, chercher les puces significatives
  if (missions.length === 0) {
    for (const line of lines) {
      if (!line) continue;
      if (/^[•*]\s*(.+)/.test(line)) {
        const bullet = line.replace(/^[•*]\s*/, "").trim();
        if (
          bullet.length >= 25 &&
          bullet.length <= 350 &&
          !isSuspiciousTitle(bullet) &&
          !bullet.toLowerCase().includes("indemnité de stage") &&
          !bullet.toLowerCase().includes("remboursement du titre")
        ) {
          missions.push(bullet);
        }
      }
    }
  }

  return missions;
}

/**
 * Extrait exhaustivement les avantages (benefits)
 */
export function extractBenefitsBlock(text: string): string[] {
  const benefits: string[] = [];
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let inBenefits = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    if (
      inBenefits &&
      /^(?:plus d'infos|à propos|processus|contact|postuler|entreprise|conditions)\s*:?/i.test(
        line,
      )
    ) {
      break;
    }

    if (
      /^avantages\s*:?$/i.test(line) ||
      /^(?:nos\s+avantages|ce\s+que\s+nous\s+offrons|package|bénéfices)\s*:?$/i.test(
        line,
      )
    ) {
      inBenefits = true;
      continue;
    }

    if (inBenefits) {
      const cleanLine = line.replace(/^[•\-*–—]+\s*/, "").trim();
      if (
        cleanLine.length >= 3 &&
        cleanLine.length <= 150 &&
        !cleanLine.toLowerCase().startsWith("plus d'infos") &&
        !cleanLine.toLowerCase().startsWith("à propos")
      ) {
        benefits.push(cleanLine);
      }
    }
  }

  return benefits;
}

/**
 * Extrait les métriques clés de l'entreprise
 */
export function extractCompanyMetrics(
  text: string,
): OpportunityCompanyMetric[] {
  const metrics: OpportunityCompanyMetric[] = [];

  // Effectif
  const hcMatch = text.match(
    /(\d+(?:\s*k|\s*000)?)\s*(employés|salariés|collaborateurs)/i,
  );
  if (hcMatch && hcMatch[1] && hcMatch[2]) {
    metrics.push({
      label: "Effectif",
      value: `${hcMatch[1].trim()} ${hcMatch[2].toLowerCase()}`,
    });
  }

  // Utilisateurs / Clients / Abonnés
  const userMatch = text.match(
    /(\d{1,3}(?:\s\d{3})+|\d+\s*000)\s*(utilisateurs|membres|clients|abonn[ée]s|salles\s+partenaires)/i,
  );
  if (userMatch && userMatch[1] && userMatch[2]) {
    metrics.push({
      label: userMatch[2].charAt(0).toUpperCase() + userMatch[2].slice(1),
      value: userMatch[1].trim(),
    });
  }

  // Levée de fonds
  const fundMatch = text.match(
    /(\d+(?:[.,]\d+)?\s*(?:M€|k€|millions?\s*d'euros?))\s*(?:de\s+lev[ée]e|lev[ée]s?|de\s+chiffre\s+d'affaires)/i,
  );
  if (fundMatch && fundMatch[1]) {
    metrics.push({
      label: "Levée de fonds",
      value: fundMatch[1].trim(),
    });
  }

  return metrics;
}

/**
 * Extrait les compétences, outils et technologies
 */
export function extractSkillsAndTools(text: string): {
  requiredSkills: string[];
  preferredSkills: string[];
  tools: string[];
} {
  const allTech = [
    "Python",
    "Generative AI",
    "LLM",
    "RAG",
    "LangChain",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "scikit-learn",
    "XGBoost",
    "PyTorch",
    "TensorFlow",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "SQL",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
    "Git",
    "Excel",
    "PowerBI",
    "Tableau",
    "Figma",
  ];

  const tools: string[] = [];
  const requiredSkills: string[] = [];
  const preferredSkills: string[] = [];

  for (const tech of allTech) {
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`\\b${escaped}\\b`, "i").test(text)) {
      tools.push(tech);
    }
  }

  // Compétences mentionnées comme atouts / plus
  const plusMatch = text.match(
    /([^\n.]+?(?:seront\s+un\s+plus|est\s+un\s+plus|atout))/i,
  );
  if (plusMatch && plusMatch[1]) {
    const plusText = plusMatch[1];
    for (const tech of allTech) {
      const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\b${escaped}\\b`, "i").test(plusText)) {
        preferredSkills.push(tech);
      }
    }
  }

  for (const t of tools) {
    if (!preferredSkills.includes(t)) {
      requiredSkills.push(t);
    }
  }

  return { requiredSkills, preferredSkills, tools };
}

/**
 * Extrait les qualités humaines / soft skills
 */
export function extractQualities(text: string): string[] {
  const candidateQualities = [
    { pattern: /\bcurieu[sx]\b/i, label: "Curiosité" },
    { pattern: /\bautonome[s]?\b/i, label: "Autonomie" },
    { pattern: /\bproactif[s]?\b/i, label: "Proactivité" },
    { pattern: /\borienté[s]?\s+solutions\b/i, label: "Orientation solutions" },
    { pattern: /\btravail\s+en\s+[ée]quipe\b/i, label: "Travail en équipe" },
    { pattern: /\bcommunication\b|\bcommuniquer\b/i, label: "Communication" },
    { pattern: /\brigueur\b|\brigoureu[sx]\b/i, label: "Rigueur" },
    { pattern: /\badaptabilité\b|\badaptable\b/i, label: "Adaptabilité" },
    { pattern: /\besprit\s+critique\b/i, label: "Esprit critique" },
  ];

  const result: string[] = [];
  for (const q of candidateQualities) {
    if (q.pattern.test(text)) {
      result.push(q.label);
    }
  }
  return result;
}

/**
 * Extrait la formation et les diplômes requis
 */
export function extractEducationRequirements(text: string): {
  educationLevel: string | null;
  educationRequirements: string[];
} {
  const reqs: string[] = [];
  let educationLevel: string | null = null;

  if (/\bbac\s*\+\s*5\b/i.test(text)) {
    educationLevel = "Bac +5";
    reqs.push("Bac +5");
  } else if (/\bbac\s*\+\s*4\b/i.test(text)) {
    educationLevel = "Bac +4";
    reqs.push("Bac +4");
  } else if (/\bbac\s*\+\s*3\b/i.test(text)) {
    educationLevel = "Bac +3";
    reqs.push("Bac +3");
  }

  if (
    /\b(?:dipl[ôo]me\s+universitaire|école\s+d'ingénieur|ecole\s+d'ingenieur)\b/i.test(
      text,
    )
  ) {
    reqs.push("Diplôme universitaire ou école d'ingénieur");
  }

  if (/\bspécialisation\s+en\s+([^\n.,;]+)/i.test(text)) {
    const m = text.match(/\bspécialisation\s+en\s+([^\n.,;]+)/i);
    if (m && m[1]) {
      reqs.push(`Spécialisation ${m[1].trim()}`);
    }
  }

  return { educationLevel, educationRequirements: reqs };
}

/**
 * Dictionnaire de correspondance des mois pour la conversion de dates textuelles en ISO YYYY-MM-DD
 */
export const FRENCH_MONTHS_MAP: Record<string, string> = {
  janvier: "01",
  "janv.": "01",
  janv: "01",
  january: "01",
  jan: "01",
  février: "02",
  fevrier: "02",
  "févr.": "02",
  fevr: "02",
  february: "02",
  feb: "02",
  mars: "03",
  march: "03",
  mar: "03",
  avril: "04",
  "avr.": "04",
  avr: "04",
  april: "04",
  apr: "04",
  mai: "05",
  may: "05",
  juin: "06",
  june: "06",
  jun: "06",
  juillet: "07",
  "juil.": "07",
  juil: "07",
  july: "07",
  jul: "07",
  août: "08",
  aout: "08",
  august: "08",
  aug: "08",
  septembre: "09",
  "sept.": "09",
  sept: "09",
  september: "09",
  sep: "09",
  octobre: "10",
  "oct.": "10",
  oct: "10",
  october: "10",
  novembre: "11",
  "nov.": "11",
  nov: "11",
  november: "11",
  décembre: "12",
  decembre: "12",
  "déc.": "12",
  dec: "12",
  december: "12",
};

/**
 * Liste des formulations explicites indiquant l'absence de date limite.
 * Dans tous ces cas : applicationDeadline = null
 */
export const NO_DEADLINE_PATTERNS = [
  /pas\s+de\s+date\s+limite(?:\s+de\s+candidature)?/i,
  /aucune\s+date\s+limite(?:\s+de\s+candidature)?/i,
  /sans\s+date\s+limite(?:\s+de\s+candidature)?/i,
  /pas\s+de\s+deadline(?:\s+de\s+candidature)?/i,
  /aucune\s+deadline/i,
  /sans\s+deadline/i,
  /no\s+application\s+deadline/i,
  /no\s+deadline/i,
  /open\s+until\s+filled/i,
  /until\s+(?:the\s+)?position\s+is\s+filled/i,
  /until\s+(?:the\s+)?offer\s+is\s+removed/i,
  /tant\s+que\s+l['’]offre\s+est\s+en\s+ligne/i,
  /offre\s+ouverte\s+jusqu['’][àa]\s+retrait/i,
  /candidatures\s+ouvertes\s+jusqu['’][àa]\s+nouvel\s+ordre/i,
  /au\s+fil\s+de\s+l['’]eau/i,
  /non\s+sp[ée]cifi[ée]e?/i,
];

export function hasNoDeadlineIndication(text: string): boolean {
  if (!text) return false;
  return NO_DEADLINE_PATTERNS.some((p) => p.test(text));
}

/**
 * Détecte si le format ou sigle VIE est explicitement stipulé dans le texte de l'offre.
 * NE JAMAIS déduire « VIE » simplement parce que l'offre est internationale ou à l'étranger.
 */
export function isExplicitVie(text: string): boolean {
  if (!text) return false;

  // 1. Mentions textuelles explicites et non ambiguës
  if (
    /\bvolontariat\s+international\s+en\s+entreprise\b/i.test(text) ||
    /\binternational\s+corporate\s+volunteer(?:ing)?\b/i.test(text) ||
    /\bv\.i\.e\.?\b/i.test(text)
  ) {
    return true;
  }

  // 2. Mentions avec étiquette de contrat ou préposition
  if (
    /(?:contrat|type\s+de\s+contrat|statut|formule)\s*[:\-–]?\s*v\.?i\.?e\b/i.test(
      text,
    ) ||
    /(?:mission|poste|candidature|offre\s+de)\s+(?:en\s+)?v\.?i\.?e\b/i.test(
      text,
    ) ||
    /^\s*v\.?i\.?e\s*[-–:]/im.test(text) ||
    /[-–|/]\s*v\.?i\.?e\s*[-–|/]/i.test(text) ||
    /\bv\.?i\.?e\s*[-–]\s*\w+/i.test(text)
  ) {
    return true;
  }

  // 3. Sigle VIE en majuscules (ex: "VIE - Business Developer", "en VIE à Madrid")
  // En filtrant les faux positifs liés au mot français courant "vie" ("qualité de vie", "cadre de vie", etc.)
  if (/\bVIE\b/.test(text)) {
    if (/\bVIE\s*[-–:]/.test(text) || /[-–]\s*VIE\b/.test(text)) {
      return true;
    }
    const isFalsePositiveVie =
      /(?:qualit[ée]|cadre|mode|style|cycle|fin|donner|projet|bassin|lieu)\s+de\s+VIE\b/i.test(
        text,
      ) ||
      /\bVIE\s+(?:professionnelle|personnelle|priv[ée]e|associative|scolaire|[ée]tudiante|pro\b|perso\b)/i.test(
        text,
      );

    if (!isFalsePositiveVie) {
      return true;
    }
  }

  return false;
}

/**
 * Détermine si le poste s'inscrit dans un contexte de stage / internship
 */
export function isStageContext(text: string, title?: string): boolean {
  if (title && /\b(?:stage|stagiaire|internship|intern)\b/i.test(title)) {
    return true;
  }
  if (!text) return false;
  const headerText = text.slice(0, 600);
  if (/\b(?:stage|stagiaire|internship|intern)\b/i.test(headerText)) {
    return true;
  }
  if (
    /(?:type\s+de\s+contrat|contrat)\s*[:\-–]?\s*(?:stage|internship)\b/i.test(
      text,
    ) ||
    /\b(?:stage|internship)\s*[-–:]/i.test(text) ||
    /\b(?:stage|internship)\s+de\s+\d+/i.test(text) ||
    /\b(?:stage|internship)\s+\d+\s*(?:[àa]\s*\d+\s*)?mois\b/i.test(text) ||
    /\b(?:convention\s+de\s+stage|sujet\s+de\s+stage|offre\s+de\s+stage)\b/i.test(
      text,
    ) ||
    /\b(?:end-of-studies\s+internship|stage\s+de\s+fin\s+d['’]études?)\b/i.test(
      text,
    ) ||
    /\bstage\s+au\s+sein\b/i.test(text)
  ) {
    return true;
  }
  return false;
}

/**
 * Résolution déterministe du type de contrat avec ordre de priorité strict :
 * 1. Stage / Internship
 * 2. Alternance / Apprenticeship
 * 3. VIE (uniquement si explicitement mentionné)
 * 4. CDI / CDD / Freelance / Intérim
 */
export function resolveOpportunityContractType(
  rawAiType: string | null | undefined,
  text: string,
  title?: string,
): string | null {
  const explicitVie = isExplicitVie(text);
  const stagePresent = isStageContext(text, title);
  const alternancePresent =
    /\b(alternance|alternant|apprentissage|apprenti|contrat\s+de\s+pro(?:fessionnalisation)?)\b/i.test(
      (title ? title + " " : "") + text.slice(0, 1000),
    );

  // RÈGLE 1 PRIORITAIRE : Stage / Internship
  if (stagePresent) {
    if (explicitVie) {
      return "VIE";
    }
    return "Stage";
  }

  // RÈGLE 2 : Alternance
  if (alternancePresent) {
    if (explicitVie) {
      return "VIE";
    }
    return "Alternance";
  }

  // RÈGLE 3 : VIE (explicitement mentionné uniquement)
  if (explicitVie) {
    return "VIE";
  }

  // Si l'IA a retourné "VIE" mais que VIE n'est PAS explicite : REJET IMPÉRATIF
  let candidate = rawAiType ? rawAiType.trim() : null;
  if (candidate && candidate.toUpperCase() === "VIE") {
    candidate = null;
  }

  if (candidate) {
    const lower = candidate.toLowerCase();
    if (lower === "stage" || lower === "internship") return "Stage";
    if (lower === "alternance" || lower === "apprentissage")
      return "Alternance";
    if (lower === "cdd") return "CDD";
    if (lower === "cdi") return "CDI";
    if (lower === "freelance" || lower === "indépendant") return "Freelance";
    if (lower === "intérim" || lower === "interim") return "Intérim";
  }

  // Analyse textuelle complémentaire
  if (/\b(cdd|contrat\s+[àa]\s+dur[ée]e\s+d[ée]termin[ée]e)\b/i.test(text)) {
    return "CDD";
  }
  if (/\b(cdi|contrat\s+[àa]\s+dur[ée]e\s+ind[ée]termin[ée]e)\b/i.test(text)) {
    return "CDI";
  }
  if (/\b(freelance|ind[ée]pendant)\b/i.test(text)) {
    return "Freelance";
  }
  if (/\b(int[ée]rim|interim)\b/i.test(text)) {
    return "Intérim";
  }

  return candidate || null;
}

/**
 * Extrait une date limite explicite présente dans le texte de l'offre et la formate en ISO YYYY-MM-DD.
 * Renvoie null si aucune date explicite n'est présente ou si une formulation d'absence de deadline est accolée.
 */
export function extractExplicitDeadlineFromText(text: string): string | null {
  if (!text) return null;

  const anchorMatch = text.match(
    /(?:date\s+limite(?:\s+de\s+candidature|\s+de\s+d[ée]p[ôo]t)?|deadline|cl[ôo]ture\s+des\s+candidatures|candidatures?\s+jusqu['’]au)\s*[:\-–]?\s*([^\n\r.]+)/i,
  );
  if (anchorMatch && anchorMatch[1]) {
    const candidateSegment = anchorMatch[1].trim();
    if (hasNoDeadlineIndication(candidateSegment)) {
      return null;
    }

    // 1. Date ISO (ex: 2026-09-30)
    const isoMatch = candidateSegment.match(
      /\b(202\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/,
    );
    if (isoMatch && isoMatch[1] && isoMatch[2] && isoMatch[3]) {
      return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    }

    // 2. Date textuelle (ex: 30 septembre 2026, 15 octobre 2026)
    const textualMatch = candidateSegment.match(
      /\b([0-2]?\d|3[01])\s+([a-zA-ZÀ-ÿ.]+)\s+(202\d)\b/,
    );
    if (textualMatch && textualMatch[1] && textualMatch[2] && textualMatch[3]) {
      const day = textualMatch[1].padStart(2, "0");
      const monthStr = textualMatch[2].toLowerCase().replace(/\.$/, "");
      const month = FRENCH_MONTHS_MAP[monthStr];
      const year = textualMatch[3];
      if (month) return `${year}-${month}-${day}`;
    }

    // 3. Date chiffrée (ex: 15/10/2026 ou 15-10-2026)
    const numMatch = candidateSegment.match(
      /\b([0-2]?\d|3[01])[/.-](0[1-9]|1[0-2])[/.-](202\d)\b/,
    );
    if (numMatch && numMatch[1] && numMatch[2] && numMatch[3]) {
      const day = numMatch[1].padStart(2, "0");
      const month = numMatch[2].padStart(2, "0");
      const year = numMatch[3];
      return `${year}-${month}-${day}`;
    }
  }

  // Candidatures jusqu'au JJ/MM/AAAA n'importe où dans le texte
  const directMatch = text.match(
    /candidatures?\s+jusqu['’]au\s+([0-2]?\d|3[01])[/.-](0[1-9]|1[0-2])[/.-](202\d)/i,
  );
  if (directMatch && directMatch[1] && directMatch[2] && directMatch[3]) {
    const day = directMatch[1].padStart(2, "0");
    const month = directMatch[2].padStart(2, "0");
    const year = directMatch[3];
    return `${year}-${month}-${day}`;
  }

  return null;
}

/**
 * Validation et résolution stricte de la date limite selon le protocole en 4 étapes :
 * ÉTAPE 1 : Chercher une date limite explicite dans le texte.
 * ÉTAPE 2 : Si aucune date explicite n'existe, rechercher une formulation indiquant l'absence de deadline.
 * ÉTAPE 3 : Si absence de deadline détectée : applicationDeadline = null.
 * ÉTAPE 4 : Si aucune information n'est trouvée : applicationDeadline = null.
 * NE JAMAIS faire : applicationDeadline = today comme fallback.
 */
export function resolveApplicationDeadline(
  rawAiDeadline: string | null | undefined,
  text: string,
): string | null {
  // ÉTAPE 1 : Date limite explicite présente dans le texte
  const explicitTextDeadline = extractExplicitDeadlineFromText(text);

  // ÉTAPE 2 & 3 : Formulations indiquant l'absence de date limite
  const hasNoDeadline = hasNoDeadlineIndication(text);
  if (hasNoDeadline && !explicitTextDeadline) {
    return null;
  }

  if (explicitTextDeadline) {
    return explicitTextDeadline;
  }

  // ÉTAPE 4 : Vérification de la proposition renvoyée par l'IA
  if (rawAiDeadline && typeof rawAiDeadline === "string") {
    const trimmed = rawAiDeadline.trim();
    if (
      !trimmed ||
      trimmed.toLowerCase() === "null" ||
      trimmed.toLowerCase() === "undefined"
    ) {
      return null;
    }

    if (hasNoDeadlineIndication(trimmed)) {
      return null;
    }

    // Protection anti-hallucination : Ne JAMAIS utiliser la date du jour (aujourd'hui) comme deadline arbitraire
    const today = new Date().toISOString().slice(0, 10);
    if (trimmed === today) {
      const todayYear = today.slice(0, 4);
      const todayMonth = today.slice(5, 7);
      const todayDay = today.slice(8, 10);
      const todayFrNum = `${todayDay}/${todayMonth}/${todayYear}`;
      const hasTodayInText =
        text.includes(today) ||
        text.includes(todayFrNum) ||
        (text.toLowerCase().includes("date limite") &&
          text.includes(todayDay) &&
          text.includes(todayYear));

      if (!hasTodayInText) {
        return null;
      }
    }

    // S'assurer que le texte de l'offre comporte au moins une notion de date limite
    const hasDeadlineMention =
      /(?:date\s+limite|deadline|cl[ôo]ture\s+des\s+candidatures|candidatures?\s+jusqu['’]au|candidater\s+avant)/i.test(
        text,
      );

    if (!hasDeadlineMention) {
      return null;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      return trimmed;
    }
  }

  return null;
}

/**
 * Extraction heuristique déterministe de secours (offline / fallback réseau).
 * Intègre les mêmes garde-fous stricts que l'IA contre "Aller au contenu", "15 k employésBanque"
 * et garantit l'extraction exhaustive des missions, compétences, avantages et métriques.
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
      if (!isSuspiciousTitle(line) && line.length >= 5 && line.length <= 80) {
        title = line.replace(/^[#*•\-\s]+/, "").trim();
        break;
      }
    }
  }

  if (isSuspiciousTitle(title)) {
    title = "";
  }

  // 2. Détection de l'entreprise et groupe
  const companySanitized = sanitizeCompanyAndMetrics(null, cleanedText);
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
          "jobteaser",
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

  // 4. Type de contrat (Stage > Alternance > VIE explicite > CDD > CDI > Freelance)
  const contractType = resolveOpportunityContractType(null, cleanedText, title);

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
    /\b(\d{2,3}(?:\s?[–-]\s?\d{2,3})?\s?[kK]€|\d{2,3}\s?000\s?€|\d{3,4}\s?€(?:\s*\/\s*(?:mois|an))?)\b/i,
  );
  if (salMatch && !salMatch[0].toLowerCase().includes("non renseigné")) {
    salary = salMatch[0].trim();
  }

  // 8. Dates
  let startDate: string | null = null;
  const startMatch = cleanedText.match(
    /(?:date\s+de\s+d[ée]but|d[ée]but|d[èe]s\s+le|d[ée]marrage)\s*[:\-–]?\s*([a-zA-ZÀ-ÿ0-9\s]+?(?:\d{4}|d[èe]s\s+que\s+possible|imm[ée]diat))\b/i,
  );
  if (startMatch && startMatch[1]) {
    startDate = startMatch[1].trim();
  }

  let sourcePublishedAt: string | null = null;
  const pubMatch = cleanedText.match(
    /(?:publi[ée]e\s+le|date\s+de\s+publication)\s*[:\-–]?\s*(\d{1,2}\s+[a-zA-ZÀ-ÿ]+\s+\d{4}|\d{4}-\d{2}-\d{2})/i,
  );
  if (pubMatch && pubMatch[1]) {
    sourcePublishedAt = pubMatch[1].trim();
  }

  // Date limite : validation stricte anti-hallucination selon les 4 étapes
  const applicationDeadline = resolveApplicationDeadline(null, cleanedText);

  // 9. Missions, Avantages, Métriques
  const missions = extractMissionsBlock(cleanedText);
  const benefits = extractBenefitsBlock(cleanedText);
  const companyMetrics = extractCompanyMetrics(cleanedText);

  // 10. Compétences, Outils, Qualités, Formation, Langues
  const { requiredSkills, preferredSkills, tools } =
    extractSkillsAndTools(cleanedText);
  const qualities = extractQualities(cleanedText);
  const { educationLevel, educationRequirements } =
    extractEducationRequirements(cleanedText);

  const requiredLanguages = [];
  if (
    /fluent\s+in\s+english|anglais\s+courant|ma[îi]trise\s+de\s+l'anglais/i.test(
      cleanedText,
    )
  ) {
    requiredLanguages.push({
      langue: "Anglais",
      niveau: "Courant / Fluent (C1-C2)",
      obligatoire: true,
    });
  }

  return {
    title: title || "Poste sans titre",
    poste: title || "Poste sans titre",
    company: company || "Entreprise inconnue",
    entreprise: company || "Entreprise inconnue",
    parentCompany: companySanitized.parentCompany || null,
    groupName: companySanitized.groupName || null,
    location: location || "",
    lieu: location || "",
    country: "France",
    contractType,
    typeContrat: contractType,
    duration,
    startDate,
    sourcePublishedAt,
    applicationDeadline,
    remotePolicy,
    salary,
    source: optionalUrl ? "Lien externe" : "Texte brut",
    sourceUrl: optionalUrl?.trim() || null,
    missions,
    responsibilities: [],
    requiredSkills,
    preferredSkills,
    tools,
    requiredLanguages,
    preferredLanguages: [],
    qualities,
    educationLevel,
    educationRequirements,
    companyName: company || null,
    companySize: companySanitized.extractedSize || null,
    companySector: companySanitized.extractedSector || null,
    companyContext: [],
    companyPartners: [],
    companyMetrics,
    recruitmentProcess: [],
    applicationRequirements: [],
    benefits,
    sourceType: "job_board",
    sourceName: optionalUrl ? "Lien externe" : "Texte brut",
    extractedAt: new Date().toISOString(),
    _extractionMethod: "heuristic",
    _modelUsed: "heuristic-fallback",
  };
}
