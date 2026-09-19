/**
/**
 * Module Entreprises : types, persistance et logique de synchronisation
 * intelligente avec les opportunités et les contacts.
 */
import type { Candidature } from "./candidatures";
import type { Contact } from "./contacts";

export const STORAGE_KEY_ENTREPRISES = "careerly-entreprises-v1";

export type Entreprise = {
  id: string;
  nom: string;
  normalizedName: string;
  description?: string | null;
  secteur?: string | null;
  taille?: string | null;
  siege?: string | null;
  siteWeb?: string | null;
  chiffresCles?: string[];
  contexte?: string[];
  partenaires?: string[];
  logoUrl?: string | null;

  // Données utilisateur manuelles (priorité absolue, protégées de l'écrasement IA)
  notes?: string;
  contactRH?: string;
  telephone?: string;
  email?: string;
  linkedin?: string;
  tags?: string[];
  isFavorite?: boolean;
  manualFields?: string[]; // Clés de champs modifiés ou saisis manuellement par l'utilisateur
  isManual?: boolean;

  createdAt: string;
  updatedAt: string;
};

export const KNOWN_ALIASES: Record<string, string> = {
  pricewaterhousecoopers: "pwc",
  pwc: "pwc",
  "ernst & young": "ey",
  "ernst and young": "ey",
  ey: "ey",
  kpmg: "kpmg",
  deloitte: "deloitte",
  mckinsey: "mckinsey",
  "mckinsey & company": "mckinsey",
  bcg: "bcg",
  "boston consulting group": "bcg",
  bain: "bain",
  "bain & company": "bain",
  bnp: "bnp paribas",
  "bnp paribas": "bnp paribas",
  sg: "societe generale",
  "societe generale": "societe generale",
  dassault: "dassault systemes",
  "dassault systemes": "dassault systemes",
  lvmh: "lvmh",
  "moet hennessy": "lvmh",
  generali: "generali",
  "generali italia": "generali",
};

/**
 * Normalise le nom d'une entreprise pour éviter les faux doublons
 * (en retirant les formes juridiques, la ponctuation, les accents et variantes régionales).
 */
export function normalizeCompanyName(name: string): string {
  if (!name) return "";
  let s = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Nettoyage de la ponctuation courante
  s = s.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");

  // Retrait des formes juridiques et suffixes communs en mot entier
  s = s.replace(
    /\b(sas|sarl|sa|inc|ltd|llc|gmbh|corp|corporation|group|groupe|holding|holdings|france|paris|europe|international|emea|global)\b/gi,
    " ",
  );

  s = s.replace(/\s+/g, " ").trim();

  if (KNOWN_ALIASES[s]) {
    return KNOWN_ALIASES[s];
  }

  return s;
}

/**
 * Extrait le nom de domaine racine (ex: 'pwc' depuis 'https://careers.pwc.fr/jobs')
 * en ignorant les plateformes d'emploi généralistes.
 */
export function extractRootDomain(urlOrDomain?: string | null): string | null {
  if (!urlOrDomain) return null;
  try {
    let host = urlOrDomain.trim().toLowerCase();
    if (host.includes("://")) {
      host = new URL(host).hostname;
    }
    host = host.replace(/^(www\.|careers\.|jobs\.|recrutement\.)/, "");

    // Ignorer les job boards et plateformes génériques
    if (
      host.includes("linkedin.com") ||
      host.includes("indeed.com") ||
      host.includes("welcomekit.co") ||
      host.includes("welcometothejungle.com") ||
      host.includes("hellowork.com") ||
      host.includes("glassdoor.com") ||
      host.includes("google.com")
    ) {
      return null;
    }

    const parts = host.split(".");
    if (parts.length >= 2) {
      return parts[0];
    }
    return host;
  } catch {
    return null;
  }
}

/**
 * Recherche une entreprise existante correspondante sans fusion hasardeuse.
 */
export function findMatchingEntreprise(
  target: {
    companyId?: string | null;
    nom?: string | null;
    entreprise?: string | null;
    siteWeb?: string | null;
    lien?: string | null;
  },
  entreprises: Entreprise[],
): Entreprise | null {
  // 1. Identifiant direct
  if (target.companyId) {
    const direct = entreprises.find((e) => e.id === target.companyId);
    if (direct) return direct;
  }

  const rawName = target.nom || target.entreprise || "";
  const norm = normalizeCompanyName(rawName);
  if (!norm) return null;

  // 2. Correspondance exacte du nom normalisé
  const exactNorm = entreprises.find((e) => e.normalizedName === norm);
  if (exactNorm) return exactNorm;

  // 3. Correspondance de domaine racine de site web
  const targetDomain =
    extractRootDomain(target.siteWeb) || extractRootDomain(target.lien);
  if (targetDomain) {
    const domainMatch = entreprises.find((e) => {
      const eDomain = extractRootDomain(e.siteWeb);
      return Boolean(eDomain && eDomain === targetDomain);
    });
    if (domainMatch) return domainMatch;
  }

  // 4. Préfixe sécurisé si longueur significative (>= 4 caractères)
  const prefixMatch = entreprises.find((e) => {
    if (!e.normalizedName) return false;
    if (norm.length >= 4 && e.normalizedName.length >= 4) {
      if (
        e.normalizedName.startsWith(`${norm} `) ||
        norm.startsWith(`${e.normalizedName} `)
      ) {
        return true;
      }
    }
    return false;
  });

  return prefixMatch || null;
}

export function emptyEntreprise(nom?: string): Entreprise {
  const displayNom = nom?.trim() || "";
  return {
    id: crypto.randomUUID(),
    nom: displayNom,
    normalizedName: normalizeCompanyName(displayNom),
    description: null,
    secteur: null,
    taille: null,
    siege: null,
    siteWeb: null,
    chiffresCles: [],
    contexte: [],
    partenaires: [],
    logoUrl: null,
    notes: "",
    contactRH: "",
    telephone: "",
    email: "",
    linkedin: "",
    tags: [],
    isFavorite: false,
    manualFields: [],
    isManual: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Crée ou identifie une fiche entreprise depuis les données d'un contact réseau
 * (import LinkedIn ou ajout manuel).
 */
export function syncEntrepriseFromContact(
  contact: Contact,
  entreprises: Entreprise[],
): { entreprise: Entreprise; isNew: boolean; hasChanged: boolean } | null {
  const compName = contact.entreprise?.trim();
  if (!compName) return null;

  const existing = findMatchingEntreprise(
    {
      companyId: contact.candidatureId,
      nom: compName,
    },
    entreprises,
  );

  if (!existing) {
    const newEnt: Entreprise = {
      ...emptyEntreprise(compName),
      // Si le contact a des coordonnées de société ou un lien utile, on peut s'en servir sans écraser
      linkedin:
        contact.linkedin && !contact.linkedin.includes("/in/")
          ? contact.linkedin
          : "",
    };
    return { entreprise: newEnt, isNew: true, hasChanged: true };
  }

  return { entreprise: existing, isNew: false, hasChanged: false };
}

/**
 * Crée ou enrichit intelligemment une fiche entreprise depuis les données
 * d'une opportunité, tout en respectant strictly la règle :
 * DONNÉES UTILISATEUR > DONNÉES IA.
 */
export function syncEntrepriseFromOpportunity(
  opp: Candidature,
  entreprises: Entreprise[],
): { entreprise: Entreprise; isNew: boolean; hasChanged: boolean } {
  const oppNom =
    opp.companyName || opp.company || opp.entreprise || "Entreprise";
  const existing = findMatchingEntreprise(
    {
      companyId: opp.companyId,
      nom: oppNom,
      siteWeb: opp.companyWebsite,
      lien: opp.lien,
    },
    entreprises,
  );

  if (!existing) {
    // Création automatique
    const newEnt: Entreprise = {
      id: opp.companyId || crypto.randomUUID(),
      nom: oppNom,
      normalizedName: normalizeCompanyName(oppNom),
      description: opp.companyDescription || null,
      secteur: opp.companySector || opp.secteur || null,
      taille: opp.companySize || null,
      siege: opp.companyLocation || opp.lieu || null,
      siteWeb: opp.companyWebsite || null,
      chiffresCles: Array.isArray(opp.companyMetrics)
        ? opp.companyMetrics.map(
            (m) =>
              `${m.label} : ${m.value}${m.context ? ` (${m.context})` : ""}`,
          )
        : [],
      contexte: Array.isArray(opp.companyContext) ? opp.companyContext : [],
      partenaires: Array.isArray(opp.companyPartners)
        ? opp.companyPartners
        : [],
      logoUrl: null,
      notes: "",
      contactRH: "",
      telephone: "",
      email: "",
      linkedin: "",
      tags: [],
      isFavorite: false,
      manualFields: [],
      isManual: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { entreprise: newEnt, isNew: true, hasChanged: true };
  }

  // Enrichissement prudent sans écraser les données manuelles de l'utilisateur
  const manualFields = existing.manualFields || [];
  let hasChanged = false;
  const updated: Entreprise = { ...existing };

  if (
    !manualFields.includes("description") &&
    (!updated.description ||
      (opp.companyDescription &&
        opp.companyDescription.length > updated.description.length))
  ) {
    if (
      opp.companyDescription &&
      opp.companyDescription !== updated.description
    ) {
      updated.description = opp.companyDescription;
      hasChanged = true;
    }
  }

  if (
    !manualFields.includes("secteur") &&
    !updated.secteur &&
    (opp.companySector || opp.secteur)
  ) {
    const newSec = opp.companySector || opp.secteur || null;
    if (newSec && newSec !== updated.secteur) {
      updated.secteur = newSec;
      hasChanged = true;
    }
  }

  if (!manualFields.includes("taille") && !updated.taille && opp.companySize) {
    if (opp.companySize !== updated.taille) {
      updated.taille = opp.companySize;
      hasChanged = true;
    }
  }

  if (
    !manualFields.includes("siege") &&
    !updated.siege &&
    (opp.companyLocation || opp.lieu)
  ) {
    const newSiege = opp.companyLocation || opp.lieu || null;
    if (newSiege && newSiege !== updated.siege) {
      updated.siege = newSiege;
      hasChanged = true;
    }
  }

  if (
    !manualFields.includes("siteWeb") &&
    !updated.siteWeb &&
    (opp.companyWebsite || opp.lien)
  ) {
    const newWeb = opp.companyWebsite || opp.lien || null;
    if (newWeb && newWeb !== updated.siteWeb) {
      updated.siteWeb = newWeb;
      hasChanged = true;
    }
  }

  // Fusion des chiffres clés sans doublons
  if (Array.isArray(opp.companyMetrics) && opp.companyMetrics.length > 0) {
    const currentMetrics = new Set(updated.chiffresCles || []);
    const initialSize = currentMetrics.size;
    for (const m of opp.companyMetrics) {
      currentMetrics.add(
        `${m.label} : ${m.value}${m.context ? ` (${m.context})` : ""}`,
      );
    }
    if (currentMetrics.size > initialSize) {
      updated.chiffresCles = Array.from(currentMetrics);
      hasChanged = true;
    }
  }

  // Fusion des contextes
  if (Array.isArray(opp.companyContext) && opp.companyContext.length > 0) {
    const currentContext = new Set(updated.contexte || []);
    const initialSize = currentContext.size;
    for (const ctx of opp.companyContext) {
      currentContext.add(ctx);
    }
    if (currentContext.size > initialSize) {
      updated.contexte = Array.from(currentContext);
      hasChanged = true;
    }
  }

  // Fusion des partenaires
  if (Array.isArray(opp.companyPartners) && opp.companyPartners.length > 0) {
    const currentPartners = new Set(updated.partenaires || []);
    const initialSize = currentPartners.size;
    for (const p of opp.companyPartners) {
      currentPartners.add(p);
    }
    if (currentPartners.size > initialSize) {
      updated.partenaires = Array.from(currentPartners);
      hasChanged = true;
    }
  }

  if (hasChanged) {
    updated.updatedAt = new Date().toISOString();
    return { entreprise: updated, isNew: false, hasChanged: true };
  }

  return { entreprise: existing, isNew: false, hasChanged: false };
}

/**
 * Vérifie si une entreprise possède des données persistantes utiles à préserver
 * même si toutes ses opportunités ont été supprimées :
 * - contacts associés ;
 * - notes personnelles ;
 * - modifications manuelles par l'utilisateur ;
 * - coordonnées saisies (téléphone, email, linkedin, contact RH) ;
 * - favoris ou tags.
 */
export function hasPersistentData(
  entreprise: Entreprise,
  contacts: Contact[] = [],
): boolean {
  // 1. Contacts associés
  const hasContacts = contacts.some((ct) => {
    if (ct.candidatureId && ct.candidatureId === entreprise.id) return true;
    if (ct.entreprise) {
      const match = findMatchingEntreprise({ nom: ct.entreprise }, [
        entreprise,
      ]);
      if (match) return true;
    }
    return false;
  });
  if (hasContacts) return true;

  // 2. Notes personnelles
  if (
    typeof entreprise.notes === "string" &&
    entreprise.notes.trim().length > 0
  ) {
    return true;
  }

  // 3. Fiche créée ou modifiée manuellement
  if (entreprise.isManual) return true;
  if (
    Array.isArray(entreprise.manualFields) &&
    entreprise.manualFields.length > 0
  ) {
    return true;
  }

  // 4. Coordonnées directes
  if (
    (entreprise.contactRH && entreprise.contactRH.trim().length > 0) ||
    (entreprise.email && entreprise.email.trim().length > 0) ||
    (entreprise.telephone && entreprise.telephone.trim().length > 0) ||
    (entreprise.linkedin && entreprise.linkedin.trim().length > 0)
  ) {
    return true;
  }

  // 5. Favori ou tags
  if (entreprise.isFavorite) return true;
  if (Array.isArray(entreprise.tags) && entreprise.tags.length > 0) return true;

  return false;
}

/**
 * Détermine si une entreprise doit être conservée lors de la suppression d'une opportunité.
 * Règle de protection : en cas de doute, on CONSERVE toujours l'entreprise.
 */
export function shouldKeepEntrepriseAfterOpportunityDeleted(
  entreprise: Entreprise,
  remainingOpportunities: Candidature[],
  contacts: Contact[] = [],
): boolean {
  // 1. A-t-elle encore d'autres opportunités liées ?
  const hasRemainingOpps = remainingOpportunities.some((opp) => {
    if (opp.companyId && opp.companyId === entreprise.id) return true;
    const oppNorm = normalizeCompanyName(
      opp.companyName || opp.company || opp.entreprise,
    );
    return oppNorm === entreprise.normalizedName;
  });

  if (hasRemainingOpps) return true;

  // 2. Sinon, possède-t-elle des données persistantes utiles ?
  return hasPersistentData(entreprise, contacts);
}

// ----------------------------------------------------
// Stockage Local (localStorage)
// ----------------------------------------------------

export function loadEntreprisesLocal(): Entreprise[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENTREPRISES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as Entreprise[];
    }
    return [];
  } catch (err) {
    console.warn("Échec lecture localStorage entreprises:", err);
    return [];
  }
}

export function saveEntreprisesLocal(items: Entreprise[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_ENTREPRISES, JSON.stringify(items));
  } catch (err) {
    console.warn("Échec écriture localStorage entreprises:", err);
  }
}
