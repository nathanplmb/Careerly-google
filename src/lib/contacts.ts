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
  tags?: string[];

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

  // Repérage des colonnes d'en-tête
  const headerRow = rows[0].map((h) =>
    h
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim(),
  );

  const idxFirstName = headerRow.findIndex(
    (h) => h.includes("first") || h.includes("prenom"),
  );
  const idxLastName = headerRow.findIndex(
    (h) => h.includes("last") || (h.includes("nom") && !h.includes("prenom")),
  );
  const idxUrl = headerRow.findIndex(
    (h) => h.includes("url") || h.includes("profil") || h.includes("linkedin"),
  );
  const idxEmail = headerRow.findIndex(
    (h) => h.includes("email") || h.includes("mail") || h.includes("courriel"),
  );
  const idxCompany = headerRow.findIndex(
    (h) =>
      h.includes("company") ||
      h.includes("entreprise") ||
      h.includes("societe"),
  );
  const idxPosition = headerRow.findIndex(
    (h) =>
      h.includes("position") ||
      h.includes("poste") ||
      h.includes("titre") ||
      h.includes("job"),
  );

  for (let r = 1; r < rows.length; r++) {
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
