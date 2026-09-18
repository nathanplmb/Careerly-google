/** Carnet de contacts : types, normalisation, déduplication et imports (vCard, LinkedIn, Opportunités). */
import { todayIso } from "./candidatures";

export const TYPES_CONTACT = [
  "Recruteur",
  "RH",
  "Manager",
  "Ancien élève",
  "Contact professionnel",
  "Rencontré en entretien",
] as const;
export type TypeContact = (typeof TYPES_CONTACT)[number];

export const CATEGORIES_CONTACT = [
  "Recruteur / RH",
  "Alumni",
  "Étudiant / en recherche",
  "Professionnel du secteur ciblé",
  "Professionnel hors secteur ciblé",
  "Autre",
] as const;
export type CategoryContact = (typeof CATEGORIES_CONTACT)[number];

export function getCategoryBadgeStyle(category?: string): {
  bgClass: string;
  textClass: string;
  borderClass: string;
  fullClass: string;
  dotClass: string;
} {
  if (!category) {
    return {
      bgClass: "bg-zinc-500/10",
      textClass: "text-zinc-400",
      borderClass: "border-zinc-500/20",
      fullClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
      dotClass: "bg-zinc-400",
    };
  }

  const catLower = category.toLowerCase().trim();

  // Recruteur / RH : vert doux (plus stratégique)
  if (catLower.includes("recruteur") || catLower.includes("rh")) {
    return {
      bgClass: "bg-emerald-500/15",
      textClass: "text-emerald-300",
      borderClass: "border-emerald-500/30",
      fullClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      dotClass: "bg-emerald-400",
    };
  }

  // Alumni : bleu doux
  if (catLower.includes("alumni") || catLower.includes("ancien")) {
    return {
      bgClass: "bg-sky-500/15",
      textClass: "text-sky-300",
      borderClass: "border-sky-500/30",
      fullClass: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      dotClass: "bg-sky-400",
    };
  }

  // Étudiant / en recherche : violet/lavande doux
  if (
    catLower.includes("étudiant") ||
    catLower.includes("etudiant") ||
    catLower.includes("recherche")
  ) {
    return {
      bgClass: "bg-purple-500/15",
      textClass: "text-purple-300",
      borderClass: "border-purple-500/30",
      fullClass: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      dotClass: "bg-purple-400",
    };
  }

  // Professionnel hors secteur ciblé : gris/neutre en verre
  if (
    catLower.includes("hors secteur") ||
    (catLower.includes("hors") && catLower.includes("ciblé"))
  ) {
    return {
      bgClass: "bg-slate-500/15",
      textClass: "text-slate-300",
      borderClass: "border-slate-500/30",
      fullClass: "bg-slate-500/15 text-slate-300 border-slate-500/30",
      dotClass: "bg-slate-400",
    };
  }

  // Professionnel du secteur ciblé : ambre/doré doux
  if (catLower.includes("secteur ciblé") || catLower.includes("ciblé")) {
    return {
      bgClass: "bg-amber-500/15",
      textClass: "text-amber-300",
      borderClass: "border-amber-500/30",
      fullClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      dotClass: "bg-amber-400",
    };
  }

  // Autre / non catégorisable : gris plus clair, discret
  return {
    bgClass: "bg-zinc-500/10",
    textClass: "text-zinc-400",
    borderClass: "border-zinc-500/20",
    fullClass: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    dotClass: "bg-zinc-400",
  };
}

export const SOURCES_CONTACT = [
  "manual",
  "phone",
  "linkedin",
  "opportunity",
  "imported",
] as const;
export type ContactSource = (typeof SOURCES_CONTACT)[number];

export const SOURCE_LABELS: Record<ContactSource, string> = {
  manual: "Manuel",
  phone: "Téléphone",
  linkedin: "LinkedIn",
  opportunity: "Opportunité",
  imported: "Import",
};

export const CANAUX = [
  "Email",
  "LinkedIn",
  "Téléphone",
  "Entretien",
  "Autre",
] as const;
export type Canal = (typeof CANAUX)[number];

export type Echange = {
  id: string;
  date: string;
  canal: Canal;
  sens: "Envoyé" | "Reçu";
  resume: string;
};

export type Contact = {
  id: string;
  // Nom et identité
  nom: string; // Nom d'affichage / complet
  firstName?: string;
  lastName?: string;
  fullName?: string;

  // Entreprise & Poste
  entreprise: string;
  companyId?: string | null;
  poste: string;
  jobTitle?: string;

  // Coordonnées
  email: string;
  telephone: string;
  phone?: string;
  linkedin: string;
  linkedinUrl?: string;
  location?: string;
  avatarUrl?: string | null;

  // Classification & Tags
  type: TypeContact;
  category?: CategoryContact;
  categoryConfidence?: number; // 0-100
  normalizedFunction?: string;
  normalizedLevel?: string;
  aiEnriched?: boolean;
  tags?: string[];

  // Parcours, Formation & Pertinence
  pastCompanies?: string[]; // Entreprises antérieures
  education?: string[]; // Établissements & diplômes
  companySector?: string; // Secteur d'activité de l'entreprise
  connectionPoints?: string[]; // Puces/tags de points de connexion détectés avec l'utilisateur
  relevanceScore?: number; // Score de pertinence calculé (0 à 100)

  // Opportunités associées (relation 1-to-N)
  candidatureId: string; // Rétrocompatibilité
  candidatureIds?: string[]; // Toutes les opportunités rattachées

  // Suivi & Actions
  derniereInteraction: string;
  prochaineAction: string;
  dateProchaineAction: string;
  notes: string;
  historique: Echange[];

  // Sources de capture
  source?: ContactSource;
  sources?: ContactSource[];

  // Drapeaux & Métadonnées
  isManual?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function emptyContact(nom?: string): Contact {
  const displayNom = (nom || "").trim();
  return {
    id: crypto.randomUUID(),
    nom: displayNom,
    firstName: "",
    lastName: "",
    fullName: displayNom,
    entreprise: "",
    companyId: null,
    poste: "",
    jobTitle: "",
    email: "",
    telephone: "",
    phone: "",
    linkedin: "",
    linkedinUrl: "",
    location: "",
    avatarUrl: null,
    type: "Recruteur",
    tags: [],
    candidatureId: "",
    candidatureIds: [],
    derniereInteraction: "",
    prochaineAction: "",
    dateProchaineAction: "",
    notes: "",
    historique: [],
    source: "manual",
    sources: ["manual"],
    isManual: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function nouvelEchange(): Echange {
  return {
    id: crypto.randomUUID(),
    date: todayIso(),
    canal: "Email",
    sens: "Envoyé",
    resume: "",
  };
}

// ---------------------------------------------------------------------------
// Helpers d'affichage & Normalisation
// ---------------------------------------------------------------------------

export function getContactFullName(c: Partial<Contact>): string {
  if (c.fullName && c.fullName.trim().length > 0) return c.fullName.trim();
  const parts = [c.firstName, c.lastName].filter(Boolean);
  if (parts.length > 0) return parts.join(" ").trim();
  if (c.nom && c.nom.trim().length > 0) return c.nom.trim();
  return "Sans nom";
}

export function getContactInitials(c: Partial<Contact>): string {
  const name = getContactFullName(c);
  if (!name || name === "Sans nom") return "??";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function getContactCompany(c: Partial<Contact>): string {
  return (c.entreprise || "").trim();
}

export function getContactJobTitle(c: Partial<Contact>): string {
  return (c.jobTitle || c.poste || "").trim();
}

export function getContactEmail(c: Partial<Contact>): string {
  return (c.email || "").trim();
}

export function getContactPhone(c: Partial<Contact>): string {
  return (c.telephone || c.phone || "").trim();
}

export function getContactLinkedIn(c: Partial<Contact>): string {
  return (c.linkedinUrl || c.linkedin || "").trim();
}

export function normalizeEmail(email?: string | null): string {
  if (!email) return "";
  return email.trim().toLowerCase();
}

export function normalizePhone(phone?: string | null): string {
  if (!phone) return "";
  // Retirer les espaces, tirets, points, parenthèses
  let clean = phone.replace(/[\s.\-()]/g, "");
  // Normaliser indicatif français (+33 ou 0033 vers 0)
  if (clean.startsWith("+33")) {
    clean = "0" + clean.slice(3);
  } else if (clean.startsWith("0033")) {
    clean = "0" + clean.slice(4);
  }
  return clean;
}

export function normalizeLinkedInUrl(url?: string | null): string {
  if (!url) return "";
  let clean = url.trim().toLowerCase();
  clean = clean.replace(
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/|pub\/)?/,
    "",
  );
  clean = clean.replace(/\/+$/, ""); // enlever trailing slashes
  return clean;
}

export function normalizePersonName(name?: string | null): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Détection des doublons (Ordre de priorité strict spécifié) :
// 1. Email (exact normalisé)
// 2. Téléphone (normalisé, min 6 chiffres)
// 3. URL LinkedIn (slug ou identifiant)
// 4. Prénom + Nom + Entreprise (normalisés)
// ---------------------------------------------------------------------------

export type DuplicateMatchReason =
  "email" | "phone" | "linkedin" | "name_company";

export function findMatchingContact(
  target: Partial<Contact>,
  existingContacts: Contact[],
): { contact: Contact; reason: DuplicateMatchReason } | null {
  // 1. Email (priorité absolue)
  const targetEmail = normalizeEmail(target.email);
  if (targetEmail) {
    const match = existingContacts.find(
      (c) => normalizeEmail(c.email) === targetEmail,
    );
    if (match) return { contact: match, reason: "email" };
  }

  // 2. Téléphone
  const targetPhone = normalizePhone(target.telephone || target.phone);
  if (targetPhone && targetPhone.length >= 6) {
    const match = existingContacts.find((c) => {
      const p = normalizePhone(c.telephone || c.phone);
      return Boolean(p && p.length >= 6 && p === targetPhone);
    });
    if (match) return { contact: match, reason: "phone" };
  }

  // 3. Profil LinkedIn
  const targetLinkedIn = normalizeLinkedInUrl(
    target.linkedinUrl || target.linkedin,
  );
  if (targetLinkedIn && targetLinkedIn.length >= 3) {
    const match = existingContacts.find((c) => {
      const l = normalizeLinkedInUrl(c.linkedinUrl || c.linkedin);
      return Boolean(l && l.length >= 3 && l === targetLinkedIn);
    });
    if (match) return { contact: match, reason: "linkedin" };
  }

  // 4. Nom complet + Entreprise
  const targetName = normalizePersonName(getContactFullName(target));
  const targetCompany = normalizePersonName(getContactCompany(target));
  if (targetName && targetCompany) {
    const match = existingContacts.find((c) => {
      const cName = normalizePersonName(getContactFullName(c));
      const cComp = normalizePersonName(getContactCompany(c));
      return cName === targetName && cComp === targetCompany;
    });
    if (match) return { contact: match, reason: "name_company" };
  }

  return null;
}

export function getInitials(c: Partial<Contact>): string {
  const name = getContactFullName(c);
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ---------------------------------------------------------------------------
// Règle d'or : DONNÉE MANUELLE > DONNÉE IMPORTÉE > DONNÉE DÉDUITE
// Enrichit un contact existant sans JAMAIS écraser de données non vides.
// ---------------------------------------------------------------------------

export function enrichContactWithoutLoss(
  existing: Contact,
  incoming: Partial<Contact>,
  preferredSource: ContactSource = "imported",
): Contact {
  const merged: Contact = { ...existing };

  // Prénom / Nom / FullName
  if (!merged.firstName && incoming.firstName)
    merged.firstName = incoming.firstName;
  if (!merged.lastName && incoming.lastName)
    merged.lastName = incoming.lastName;
  if (!merged.nom && incoming.nom) merged.nom = incoming.nom;
  if (!merged.fullName && incoming.fullName)
    merged.fullName = incoming.fullName;
  if (!merged.nom) merged.nom = getContactFullName(merged);

  // Entreprise & Poste
  if (!merged.entreprise && incoming.entreprise)
    merged.entreprise = incoming.entreprise;
  if (!merged.companyId && incoming.companyId)
    merged.companyId = incoming.companyId;
  if (!merged.poste && (incoming.poste || incoming.jobTitle)) {
    merged.poste = incoming.poste || incoming.jobTitle || "";
    merged.jobTitle = merged.poste;
  }

  // Coordonnées
  if (!merged.email && incoming.email) merged.email = incoming.email;
  if (!merged.telephone && (incoming.telephone || incoming.phone)) {
    merged.telephone = incoming.telephone || incoming.phone || "";
    merged.phone = merged.telephone;
  }
  if (!merged.linkedin && (incoming.linkedin || incoming.linkedinUrl)) {
    merged.linkedin = incoming.linkedin || incoming.linkedinUrl || "";
    merged.linkedinUrl = merged.linkedin;
  }
  if (!merged.location && incoming.location)
    merged.location = incoming.location;
  if (!merged.avatarUrl && incoming.avatarUrl)
    merged.avatarUrl = incoming.avatarUrl;

  // Categorisation & IA
  if (!merged.category && incoming.category)
    merged.category = incoming.category;
  if (incoming.categoryConfidence !== undefined)
    merged.categoryConfidence = incoming.categoryConfidence;
  if (!merged.normalizedFunction && incoming.normalizedFunction)
    merged.normalizedFunction = incoming.normalizedFunction;
  if (!merged.normalizedLevel && incoming.normalizedLevel)
    merged.normalizedLevel = incoming.normalizedLevel;
  if (incoming.aiEnriched) merged.aiEnriched = true;

  if (incoming.pastCompanies?.length) {
    merged.pastCompanies = Array.from(
      new Set([...(merged.pastCompanies || []), ...incoming.pastCompanies]),
    );
  }
  if (incoming.education?.length) {
    merged.education = Array.from(
      new Set([...(merged.education || []), ...incoming.education]),
    );
  }
  if (!merged.companySector && incoming.companySector) {
    merged.companySector = incoming.companySector;
  }
  if (incoming.relevanceScore !== undefined) {
    merged.relevanceScore = incoming.relevanceScore;
  }
  if (incoming.connectionPoints?.length) {
    merged.connectionPoints = Array.from(
      new Set([
        ...(merged.connectionPoints || []),
        ...incoming.connectionPoints,
      ]),
    );
  }

  // Notes : ajout sans écrasement
  if (incoming.notes && incoming.notes.trim()) {
    if (!merged.notes) {
      merged.notes = incoming.notes.trim();
    } else if (!merged.notes.includes(incoming.notes.trim())) {
      merged.notes = `${merged.notes.trim()}\n\n[Import ${new Date().toLocaleDateString()}] ${incoming.notes.trim()}`;
    }
  }

  // Tags : union sans doublons
  const tagsSet = new Set(merged.tags || []);
  if (Array.isArray(incoming.tags)) {
    for (const t of incoming.tags) {
      if (t && t.trim()) tagsSet.add(t.trim());
    }
  }
  merged.tags = Array.from(tagsSet);

  // Opportunités : fusion des IDs liés
  const oppIdsSet = new Set(merged.candidatureIds || []);
  if (merged.candidatureId) oppIdsSet.add(merged.candidatureId);
  if (incoming.candidatureId) oppIdsSet.add(incoming.candidatureId);
  if (Array.isArray(incoming.candidatureIds)) {
    for (const id of incoming.candidatureIds) {
      if (id) oppIdsSet.add(id);
    }
  }
  merged.candidatureIds = Array.from(oppIdsSet);
  if (!merged.candidatureId && merged.candidatureIds.length > 0) {
    merged.candidatureId = merged.candidatureIds[0];
  }

  // Sources : union sans doublons
  const sourcesSet = new Set(merged.sources || []);
  if (merged.source) sourcesSet.add(merged.source);
  if (incoming.source) sourcesSet.add(incoming.source);
  if (Array.isArray(incoming.sources)) {
    for (const s of incoming.sources) sourcesSet.add(s);
  }
  sourcesSet.add(preferredSource);
  merged.sources = Array.from(sourcesSet);

  merged.updatedAt = new Date().toISOString();
  return merged;
}

// ---------------------------------------------------------------------------
// Parser universel de carnet vCard (.vcf 2.1, 3.0, 4.0)
// ---------------------------------------------------------------------------

export function parseVCardString(rawVcf: string): Partial<Contact>[] {
  const contacts: Partial<Contact>[] = [];
  if (!rawVcf || typeof rawVcf !== "string") return contacts;

  // Unfolding: selon la norme RFC 2425/6350, les lignes commençant par un espace ou une tabulation
  // sont la continuation de la ligne précédente.
  const unfolded = rawVcf.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
  const lines = unfolded.split(/\r?\n/);

  let inVcard = false;
  let current: Partial<Contact> = {};
  let rawN = "";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (/^BEGIN:VCARD/i.test(line)) {
      inVcard = true;
      current = {
        id: crypto.randomUUID(),
        source: "phone",
        sources: ["phone"],
        tags: ["Téléphone"],
        type: "Contact professionnel",
      };
      rawN = "";
      continue;
    }

    if (/^END:VCARD/i.test(line)) {
      if (inVcard) {
        // Finaliser le contact
        if (!current.nom) {
          if (rawN) {
            const parts = rawN.split(";").map((p) => p.trim());
            const lastName = parts[0] || "";
            const firstName = parts[1] || "";
            current.lastName = lastName;
            current.firstName = firstName;
            current.nom = [firstName, lastName].filter(Boolean).join(" ");
          }
        }
        current.fullName = current.nom || "Sans nom";
        // Valider qu'il y a un minimum de données signifiantes (un nom, email ou tél)
        if (current.nom || current.email || current.telephone) {
          contacts.push(current);
        }
      }
      inVcard = false;
      continue;
    }

    if (!inVcard) continue;

    // Découpage Propriété / Paramètres / Valeur
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const propPart = line.slice(0, colonIndex).toUpperCase();
    let value = line.slice(colonIndex + 1).trim();

    // Remplacement d'échappement vCard: \, -> , et \; -> ;
    value = value
      .replace(/\\,/g, ",")
      .replace(/\\;/g, ";")
      .replace(/\\n/gi, "\n");

    if (propPart.startsWith("FN")) {
      current.fullName = value;
      current.nom = value;
    } else if (propPart.startsWith("N")) {
      rawN = value;
      const parts = value.split(";").map((p) => p.trim());
      if (parts.length >= 2) {
        current.lastName = parts[0] || "";
        current.firstName = parts[1] || "";
        if (!current.nom) {
          current.nom = [current.firstName, current.lastName]
            .filter(Boolean)
            .join(" ");
        }
      }
    } else if (propPart.startsWith("EMAIL")) {
      if (!current.email) {
        current.email = value;
      }
    } else if (propPart.startsWith("TEL")) {
      if (!current.telephone) {
        current.telephone = value;
        current.phone = value;
      }
    } else if (propPart.startsWith("ORG")) {
      const orgParts = value
        .split(";")
        .map((p) => p.trim())
        .filter(Boolean);
      if (orgParts.length > 0 && !current.entreprise) {
        current.entreprise = orgParts[0];
      }
    } else if (propPart.startsWith("TITLE") || propPart.startsWith("ROLE")) {
      if (!current.poste) {
        current.poste = value;
        current.jobTitle = value;
      }
    } else if (propPart.startsWith("ADR")) {
      const adrParts = value
        .split(";")
        .map((p) => p.trim())
        .filter(Boolean);
      if (adrParts.length > 0 && !current.location) {
        current.location = adrParts.join(", ");
      }
    } else if (propPart.startsWith("URL")) {
      if (value.toLowerCase().includes("linkedin.com") && !current.linkedin) {
        current.linkedin = value;
        current.linkedinUrl = value;
      }
    } else if (propPart.startsWith("NOTE")) {
      if (!current.notes) {
        current.notes = value;
      }
    }
  }

  return contacts;
}

// ---------------------------------------------------------------------------
// Parser de fichier CSV d'export standard LinkedIn
// Format officiel : First Name, Last Name, URL, Email Address, Company, Position, Connected On
// ou variantes françaises : Prénom, Nom, URL, Adresse e-mail, Entreprise, Poste
// ---------------------------------------------------------------------------

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip next quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === "," || char === ";") {
        currentRow.push(currentField.trim());
        currentField = "";
      } else if (char === "\r") {
        // Ignorer \r
      } else if (char === "\n") {
        currentRow.push(currentField.trim());
        if (currentRow.some((f) => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function parseLinkedInCsv(rawCsv: string): Partial<Contact>[] {
  const contacts: Partial<Contact>[] = [];
  if (!rawCsv || typeof rawCsv !== "string") return contacts;

  const rows = parseCsvRows(rawCsv);
  if (rows.length < 2) return contacts;

  // Repérage dynamique de la ligne d'en-tête (en cas de commentaires/notes au début du fichier)
  let headerRowIndex = -1;
  let idxFirstName = -1;
  let idxLastName = -1;
  let idxUrl = -1;
  let idxEmail = -1;
  let idxCompany = -1;
  let idxPosition = -1;

  for (let r = 0; r < Math.min(rows.length, 15); r++) {
    const candidateRow = rows[r].map((h) =>
      h
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim(),
    );

    const fn = candidateRow.findIndex(
      (h) => h.includes("first") || h.includes("prenom"),
    );
    const ln = candidateRow.findIndex(
      (h) => h.includes("last") || (h.includes("nom") && !h.includes("prenom")),
    );
    const comp = candidateRow.findIndex(
      (h) =>
        h.includes("company") ||
        h.includes("entreprise") ||
        h.includes("societe") ||
        h.includes("organization"),
    );
    const pos = candidateRow.findIndex(
      (h) =>
        h.includes("position") ||
        h.includes("poste") ||
        h.includes("titre") ||
        h.includes("job") ||
        h.includes("title"),
    );

    // Si au moins deux colonnes clés sont trouvées, c'est la ligne d'en-tête
    let matchesCount = 0;
    if (fn !== -1) matchesCount++;
    if (ln !== -1) matchesCount++;
    if (comp !== -1) matchesCount++;
    if (pos !== -1) matchesCount++;

    if (matchesCount >= 2) {
      headerRowIndex = r;
      idxFirstName = fn;
      idxLastName = ln;
      idxCompany = comp;
      idxPosition = pos;
      idxUrl = candidateRow.findIndex(
        (h) =>
          h.includes("url") || h.includes("profil") || h.includes("linkedin"),
      );
      idxEmail = candidateRow.findIndex(
        (h) =>
          h.includes("email") || h.includes("mail") || h.includes("courriel"),
      );
      break;
    }
  }

  // Si aucune ligne d'en-tête explicite n'est trouvée, utiliser la ligne 0 par défaut
  if (headerRowIndex === -1) {
    headerRowIndex = 0;
    const headerRow = rows[0].map((h) =>
      h
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim(),
    );
    idxFirstName = headerRow.findIndex(
      (h) => h.includes("first") || h.includes("prenom"),
    );
    idxLastName = headerRow.findIndex(
      (h) => h.includes("last") || (h.includes("nom") && !h.includes("prenom")),
    );
    idxUrl = headerRow.findIndex(
      (h) =>
        h.includes("url") || h.includes("profil") || h.includes("linkedin"),
    );
    idxEmail = headerRow.findIndex(
      (h) =>
        h.includes("email") || h.includes("mail") || h.includes("courriel"),
    );
    idxCompany = headerRow.findIndex(
      (h) =>
        h.includes("company") ||
        h.includes("entreprise") ||
        h.includes("societe"),
    );
    idxPosition = headerRow.findIndex(
      (h) =>
        h.includes("position") ||
        h.includes("poste") ||
        h.includes("titre") ||
        h.includes("job"),
    );
  }

  for (let r = headerRowIndex + 1; r < rows.length; r++) {
    const row = rows[r];
    const firstName = idxFirstName !== -1 ? row[idxFirstName] || "" : "";
    const lastName = idxLastName !== -1 ? row[idxLastName] || "" : "";
    const url = idxUrl !== -1 ? row[idxUrl] || "" : "";
    const email = idxEmail !== -1 ? row[idxEmail] || "" : "";
    const company = idxCompany !== -1 ? row[idxCompany] || "" : "";
    const position = idxPosition !== -1 ? row[idxPosition] || "" : "";

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    if (!fullName && !email && !company) continue;

    const contact: Partial<Contact> = {
      id: crypto.randomUUID(),
      nom: fullName || "Contact LinkedIn",
      firstName,
      lastName,
      fullName: fullName || "Contact LinkedIn",
      entreprise: company,
      poste: position,
      jobTitle: position,
      email,
      linkedin: url,
      linkedinUrl: url,
      type: "Contact professionnel",
      source: "linkedin",
      sources: ["linkedin"],
      tags: ["LinkedIn"],
      notes: "",
    };

    contacts.push(contact);
  }

  return contacts;
}

// ---------------------------------------------------------------------------
// Parseur intelligent pour champ texte libre (ex: depuis l'opportunité)
// "Jean Dupont (RH) - jean@pwc.com - 06 12 34 56 78"
// ---------------------------------------------------------------------------

export function parseRawContactInput(raw: string): Partial<Contact> {
  const result: Partial<Contact> = {
    nom: "",
    email: "",
    telephone: "",
    poste: "",
  };
  if (!raw || !raw.trim()) return result;

  let text = raw.trim();

  // 1. Détection email
  const emailMatch = text.match(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
  );
  if (emailMatch) {
    result.email = emailMatch[1];
    text = text.replace(emailMatch[0], " ");
  }

  // 2. Détection téléphone (+33 ou 0x xx xx xx xx)
  const phoneMatch = text.match(/(\+?\d[\d\s.\-()]{7,}\d)/);
  if (phoneMatch) {
    result.telephone = phoneMatch[1].trim();
    result.phone = result.telephone;
    text = text.replace(phoneMatch[0], " ");
  }

  // 3. Détection parenthèses éventuelles pour le rôle (ex: "(RH)" ou "(Talent Acquisition)")
  const roleMatch = text.match(/\(([^)]+)\)/);
  if (roleMatch) {
    result.poste = roleMatch[1].trim();
    result.jobTitle = result.poste;
    text = text.replace(roleMatch[0], " ");
  }

  // 4. Nettoyage et extraction du nom
  const cleanedParts = text
    .split(/[-–—·|;,]/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (cleanedParts.length > 0) {
    result.nom = cleanedParts[0];
    result.fullName = cleanedParts[0];
    if (cleanedParts.length > 1 && !result.poste) {
      result.poste = cleanedParts[1];
      result.jobTitle = cleanedParts[1];
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Relances IA & Modèles
// ---------------------------------------------------------------------------

export const TYPES_RELANCE = [
  "relance_candidature",
  "apres_entretien",
  "prise_contact",
  "renseignements",
  "remerciement",
  "reseau_ancien_eleve",
  "relance_sans_reponse",
] as const;
export type TypeRelance = (typeof TYPES_RELANCE)[number];

export const LIBELLES_RELANCE: Record<TypeRelance, string> = {
  relance_candidature: "Relance de candidature",
  apres_entretien: "Suivi après entretien",
  prise_contact: "Prise de contact spontanée",
  renseignements: "Demande de renseignements",
  remerciement: "Remerciement après entretien",
  reseau_ancien_eleve: "Mise en relation (ancien élève)",
  relance_sans_reponse: "Relance sans réponse",
};

export function historiqueEnTexte(h: Echange[]): string {
  if (!h || h.length === 0) return "Aucun échange enregistré.";
  return [...h]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(
      (e) =>
        `${e.date} — ${e.canal} (${e.sens}) : ${e.resume || "sans résumé"}`,
    )
    .join("\n");
}

export function contactEnTexte(c: Contact): string {
  const l = (k: string, v?: string) =>
    v && v.trim() ? `${k} : ${v.trim()}\n` : "";
  return (
    l("Nom", getContactFullName(c)) +
    l("Type de contact", c.type) +
    l("Entreprise", c.entreprise) +
    l("Poste", getContactJobTitle(c)) +
    l("Email", c.email) +
    l("Téléphone", c.telephone) +
    l("LinkedIn", c.linkedin) +
    l("Dernière interaction", c.derniereInteraction) +
    l("Prochaine action prévue", c.prochaineAction) +
    l("Notes", c.notes)
  );
}

export const CONTACTS_STORAGE_KEY = "careerly_contacts_v1";

export function loadContactsLocal(): Contact[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CONTACTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Contact[]) : [];
  } catch {
    return [];
  }
}

export function saveContactsLocal(items: Contact[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignorer
  }
}

export type UserScoringContext = {
  school?: string; // ex: "IUT Clermont Auvergne", "Montluçon", "B.U.T. Techniques de Commercialisation"
  targetSectors?: string[]; // ex: ["finance", "fintech", "gestion de patrimoine", "banque"]
};

/**
 * PONDÉRATION DU SCORE DE PERTINENCE NACORA (0 à 100%)
 *
 * 1. ÉTABLISSEMENT / FORMATION COMMUNE (Poids max : 30 pts)
 *    - Même établissement/école (ex: IUT Clermont Auvergne / Montluçon) : +25 pts
 *    - Même diplôme/spécialité (ex: Tech de Co / B.U.T. Techniques de Commercialisation) : +5 pts
 *
 * 2. CATÉGORIE DU CONTACT (Poids max : 30 pts)
 *    - Recruteur / RH : +30 pts (contacts prioritaires pour le recrutement)
 *    - Alumni : +25 pts (contacts réseau à fort taux de réponse)
 *    - Professionnel du secteur ciblé : +20 pts
 *    - Étudiant / en recherche : +10 pts
 *    - Professionnel hors secteur ciblé : +5 pts
 *    - Autre : 0 pt
 *
 * 3. CORRESPONDANCE SECTEUR CIBLÉ (Poids max : 20 pts)
 *    - Secteur correspondant à la finance / fintech / gestion de patrimoine / banque / conseil : +20 pts
 *
 * 4. RACCORDEMENT OPPORTUNITÉ KANBAN (Poids max : 20 pts)
 *    - Entreprise actuelle du contact correspondant à une opportunité active du Kanban : +20 pts
 *    - Entreprise passée du contact correspondant à une opportunité active du Kanban : +10 pts
 *
 * 5. CONTACT DÉJÀ "CHAUD" / ÉCHANGES EXISTANTS (Bonus max : 10 pts)
 *    - Au moins une interaction enregistrée dans l'historique : +10 pts
 *
 * SCORE FINAL = Math.min(100, Total des points)
 */
export function computeContactRelevance(
  contact: Contact,
  candidatures: { entreprise: string; status?: string }[] = [],
  userCtx?: UserScoringContext,
): { score: number; connectionPoints: string[] } {
  let score = 0;
  const connectionPoints: string[] = [];

  const rawSchool = (userCtx?.school || "IUT Clermont Auvergne").toLowerCase();
  const defaultTargetSectors = [
    "finance",
    "fintech",
    "gestion de patrimoine",
    "banque",
    "conseil",
    "assurance",
    "investissement",
    "private equity",
    "m&a",
    "commercialisation",
  ];
  const targetSectors = userCtx?.targetSectors?.length
    ? userCtx.targetSectors.map((s) => s.toLowerCase())
    : defaultTargetSectors;

  // 1. ÉTABLISSEMENT / FORMATION (Max 30 pts)
  const contactEduStr = (contact.education || []).join(" ").toLowerCase();
  const contactNotesStr = (contact.notes || "").toLowerCase();
  const combinedEduText = `${contactEduStr} ${contactNotesStr} ${contact.category === "Alumni" ? "alumni" : ""}`;

  const isSameSchool =
    combinedEduText.includes("iut clermont") ||
    combinedEduText.includes("montluçon") ||
    combinedEduText.includes("montlucon") ||
    (rawSchool.length > 3 && combinedEduText.includes(rawSchool));

  const isSameFormation =
    combinedEduText.includes("techniques de commercialisation") ||
    combinedEduText.includes("tech de co") ||
    combinedEduText.includes("b.u.t") ||
    combinedEduText.includes("but tc");

  if (isSameSchool) {
    score += 25;
    connectionPoints.push(
      "Même établissement : IUT Clermont Auvergne (Montluçon)",
    );
    if (isSameFormation) {
      score += 5;
      connectionPoints.push("Même formation : Tech de Co (B.U.T.)");
    }
  } else if (isSameFormation) {
    score += 15;
    connectionPoints.push(
      "Formation similaire : Techniques de Commercialisation",
    );
  } else if (contact.category === "Alumni") {
    score += 20;
    connectionPoints.push("Alumni de ta formation");
  }

  // 2. CATÉGORIE DU CONTACT (Max 30 pts)
  switch (contact.category) {
    case "Recruteur / RH":
      score += 30;
      connectionPoints.push("Contact stratégique : Recruteur / RH");
      break;
    case "Alumni":
      if (!isSameSchool) {
        score += 25;
      }
      break;
    case "Professionnel du secteur ciblé":
      score += 20;
      break;
    case "Étudiant / en recherche":
      score += 10;
      break;
    case "Professionnel hors secteur ciblé":
      score += 5;
      break;
    default:
      break;
  }

  // 3. SECTEUR D'ACTIVITÉ CIBLÉ (Max 20 pts)
  const contactSector = (contact.companySector || "").toLowerCase();
  const contactRole = (contact.poste || "").toLowerCase();

  const isTargetSector = targetSectors.some(
    (sec) => contactSector.includes(sec) || contactRole.includes(sec),
  );

  if (isTargetSector) {
    score += 20;
    const sectorLabel =
      contact.companySector || "Finance / Fintech / Gestion de patrimoine";
    connectionPoints.push(`Secteur ciblé : ${sectorLabel}`);
  }

  // 4. RACCORDEMENT AVEC ENTREPRISES DU KANBAN (Max 20 pts)
  const currentCompany = (contact.entreprise || "").trim();
  const pastCompanies = contact.pastCompanies || [];

  const matchedKanbanCurrent = candidatures.find(
    (c) =>
      c.entreprise &&
      currentCompany &&
      (c.entreprise.toLowerCase().includes(currentCompany.toLowerCase()) ||
        currentCompany.toLowerCase().includes(c.entreprise.toLowerCase())),
  );

  if (matchedKanbanCurrent) {
    score += 20;
    connectionPoints.push(
      `Poste chez ${matchedKanbanCurrent.entreprise} (Opportunité dans ton Kanban)`,
    );
  } else {
    const matchedKanbanPast = candidatures.find(
      (c) =>
        c.entreprise &&
        pastCompanies.some(
          (past) =>
            past.toLowerCase().includes(c.entreprise.toLowerCase()) ||
            c.entreprise.toLowerCase().includes(past.toLowerCase()),
        ),
    );
    if (matchedKanbanPast) {
      score += 10;
      connectionPoints.push(
        `Ex-collaborateur de ${matchedKanbanPast.entreprise} (Entreprise visée)`,
      );
    }
  }

  // 5. CONTACT DÉJÀ "CHAUD" (Bonus Max 10 pts)
  if (contact.historique && contact.historique.length > 0) {
    score += 10;
    connectionPoints.push(
      `${contact.historique.length} échange(s) déjà enregistré(s)`,
    );
  }

  const finalScore = Math.min(100, Math.max(0, score));
  const uniquePoints = Array.from(new Set(connectionPoints));

  return {
    score: finalScore,
    connectionPoints: uniquePoints,
  };
}
