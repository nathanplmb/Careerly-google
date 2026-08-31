/**
 * Import de fichiers tableur (Excel / CSV) vers les objets Careerly.
 * Tout se fait dans le navigateur : aucun fichier n'est envoyé au serveur.
 */
import {
  emptyCandidature,
  STATUTS,
  type Candidature,
  type Statut,
} from "./candidatures";
import {
  emptyContact,
  TYPES_CONTACT,
  type Contact,
  type TypeContact,
} from "./contacts";

export const TYPES_TABLEUR = ".xlsx,.xls,.csv,.tsv,.ods";

export type Tableau = {
  colonnes: string[];
  lignes: Record<string, string>[];
  feuilles: string[];
  feuille: string;
};

const TAILLE_MAX = 15 * 1024 * 1024;

/** Lit un fichier tableur et renvoie les en-têtes + les lignes en texte. */
export async function lireTableur(
  file: File,
  feuille?: string,
): Promise<Tableau> {
  if (file.size === 0) throw new Error("Ce fichier est vide.");
  if (file.size > TAILLE_MAX) throw new Error("Ce fichier dépasse 15 Mo.");

  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: "array", cellDates: true });
  const feuilles = wb.SheetNames;
  const nom =
    feuille && feuilles.includes(feuille) ? feuille : (feuilles[0] ?? "");
  const ws = nom ? wb.Sheets[nom] : undefined;
  if (!ws) throw new Error("Aucune feuille lisible dans ce fichier.");

  const matrice = XLSX.utils.sheet_to_json<unknown[]>(ws, {
    header: 1,
    raw: false,
    defval: "",
    blankrows: false,
  });

  // La ligne d'en-tête est la première ligne contenant au moins 2 cellules non vides.
  const iEntete = matrice.findIndex(
    (r) => r.filter((c) => String(c ?? "").trim() !== "").length >= 2,
  );
  if (iEntete < 0)
    throw new Error("Impossible de trouver les colonnes de ce tableau.");

  const brutes = (matrice[iEntete] ?? []).map((c) => String(c ?? "").trim());
  const colonnes = brutes.map((c, i) => (c === "" ? `Colonne ${i + 1}` : c));

  const lignes: Record<string, string>[] = [];
  for (const r of matrice.slice(iEntete + 1)) {
    const ligne: Record<string, string> = {};
    let vide = true;
    colonnes.forEach((col, i) => {
      const v = String(r[i] ?? "").trim();
      ligne[col] = v;
      if (v !== "") vide = false;
    });
    if (!vide) lignes.push(ligne);
  }

  return { colonnes, lignes, feuilles, feuille: nom };
}

/* ---------------------------------- Utils --------------------------------- */

function normaliser(v: string): string {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Convertit une date de tableur (texte FR, ISO, série Excel) en yyyy-mm-dd. */
export function normaliserDate(valeur: string): string {
  const v = valeur.trim();
  if (!v) return "";

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  const fr = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/.exec(v);
  if (fr) {
    const j = fr[1]!.padStart(2, "0");
    const m = fr[2]!.padStart(2, "0");
    let a = fr[3]!;
    if (a.length === 2) a = Number(a) > 60 ? `19${a}` : `20${a}`;
    return `${a}-${m}-${j}`;
  }

  // Numéro de série Excel (jours depuis 1899-12-30).
  if (/^\d{5}$/.test(v)) {
    const d = new Date(Date.UTC(1899, 11, 30) + Number(v) * 86400000);
    return d.toISOString().slice(0, 10);
  }

  const d = new Date(v);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return "";
}

function trouverColonne(colonnes: string[], motsCles: string[]): string {
  const normalisees = colonnes.map((c) => ({ col: c, n: normaliser(c) }));
  for (const mot of motsCles) {
    const exact = normalisees.find((c) => c.n === mot);
    if (exact) return exact.col;
  }
  for (const mot of motsCles) {
    const partiel = normalisees.find((c) => c.n.includes(mot));
    if (partiel) return partiel.col;
  }
  return "";
}

/* ------------------------------- Candidatures ------------------------------ */

export const CHAMPS_CANDIDATURE = [
  { cle: "entreprise", label: "Entreprise", requis: true },
  { cle: "poste", label: "Poste", requis: false },
  { cle: "statut", label: "Statut", requis: false },
  { cle: "lieu", label: "Lieu", requis: false },
  { cle: "lien", label: "Lien de l'offre", requis: false },
  { cle: "contact", label: "Contact", requis: false },
  { cle: "source", label: "Source", requis: false },
  { cle: "secteur", label: "Secteur", requis: false },
  { cle: "dateEnvoi", label: "Date de candidature", requis: false },
  { cle: "dateRelance", label: "Date de relance", requis: false },
  { cle: "dateLimite", label: "Date limite", requis: false },
  { cle: "commentaire", label: "Commentaire / notes", requis: false },
  { cle: "missions", label: "Missions clés", requis: false },
  { cle: "profilRecherche", label: "Profil recherché", requis: false },
  { cle: "modalites", label: "Modalités", requis: false },
  { cle: "detail", label: "Détail de l'offre", requis: false },
] as const;

export type CleCandidature = (typeof CHAMPS_CANDIDATURE)[number]["cle"];
export type Mapping = Partial<Record<string, string>>;

const MOTS_CANDIDATURE: Record<CleCandidature, string[]> = {
  entreprise: [
    "entreprise",
    "societe",
    "company",
    "employeur",
    "boite",
    "organisation",
  ],
  poste: ["poste", "intitule", "job", "role", "position", "titre", "offre"],
  statut: ["statut", "status", "etat", "avancement", "etape"],
  lieu: ["lieu", "ville", "localisation", "location", "city", "site"],
  lien: ["lien", "url", "link", "annonce", "offre lien"],
  contact: ["contact", "recruteur", "referent", "interlocuteur"],
  source: ["source", "plateforme", "canal", "site", "provenance"],
  secteur: ["secteur", "industrie", "domaine", "sector"],
  dateEnvoi: [
    "date candidature",
    "date envoi",
    "date postule",
    "postule le",
    "date",
    "applied",
  ],
  dateRelance: ["relance", "date relance", "follow up", "suivi"],
  dateLimite: ["date limite", "deadline", "limite", "cloture", "expiration"],
  commentaire: [
    "commentaire",
    "note",
    "notes",
    "remarque",
    "observation",
    "comment",
  ],
  missions: [
    "missions",
    "responsabilites",
    "missions cles",
    "taches",
    "activities",
  ],
  profilRecherche: [
    "profil",
    "profil recherche",
    "competences",
    "requirements",
    "qualifications",
  ],
  modalites: [
    "modalites",
    "conditions",
    "duree",
    "remuneration",
    "gratification",
  ],
  detail: ["detail", "description", "texte offre", "fiche de poste"],
};

export function mappingAutoCandidature(colonnes: string[]): Mapping {
  const m: Mapping = {};
  for (const champ of CHAMPS_CANDIDATURE) {
    const col = trouverColonne(colonnes, MOTS_CANDIDATURE[champ.cle]);
    if (col && !Object.values(m).includes(col)) m[champ.cle] = col;
  }
  return m;
}

const ALIAS_STATUT: { mots: string[]; statut: Statut }[] = [
  { mots: ["entretien", "interview", "rdv"], statut: "J'ai un entretien" },
  { mots: ["relance", "relancé", "follow"], statut: "J'ai relancé" },
  {
    mots: ["refus", "negati", "rejet", "ko", "decline"],
    statut: "J'ai reçu une réponse négative",
  },
  {
    mots: ["sans reponse", "aucune reponse", "no answer", "attente", "pending"],
    statut: "Je n'ai pas reçu de réponse",
  },
  {
    mots: ["postul", "envoy", "applied", "candidature envoyee"],
    statut: "J'ai postulé",
  },
  {
    mots: [
      "a postuler",
      "prevu",
      "to apply",
      "reperee",
      "wishlist",
      "interesse",
    ],
    statut: "Je vais postuler",
  },
];

export function normaliserStatut(valeur: string): Statut {
  const v = normaliser(valeur);
  if (!v) return "Je vais postuler";
  const exact = STATUTS.find((s) => normaliser(s) === v);
  if (exact) return exact;
  for (const a of ALIAS_STATUT)
    if (a.mots.some((m) => v.includes(normaliser(m)))) return a.statut;
  return "Je vais postuler";
}

export function ligneVersCandidature(
  ligne: Record<string, string>,
  mapping: Mapping,
): Candidature | null {
  const val = (cle: string) => {
    const col = mapping[cle];
    return col ? (ligne[col] ?? "").trim() : "";
  };

  const entreprise = val("entreprise");
  const poste = val("poste");
  if (!entreprise && !poste) return null;

  const base = emptyCandidature();
  return {
    ...base,
    entreprise: entreprise || "Sans nom",
    poste,
    statut: normaliserStatut(val("statut")),
    lieu: val("lieu"),
    lien: val("lien"),
    contact: val("contact"),
    source: val("source"),
    secteur: val("secteur"),
    dateEnvoi: normaliserDate(val("dateEnvoi")),
    dateRelance: normaliserDate(val("dateRelance")),
    dateLimite: normaliserDate(val("dateLimite")),
    commentaire: val("commentaire"),
    missions: val("missions"),
    profilRecherche: val("profilRecherche"),
    modalites: val("modalites"),
    detail: val("detail"),
  };
}

/* --------------------------------- Contacts -------------------------------- */

export const CHAMPS_CONTACT = [
  { cle: "nom", label: "Nom", requis: true },
  { cle: "entreprise", label: "Entreprise", requis: false },
  { cle: "poste", label: "Poste", requis: false },
  { cle: "email", label: "Email", requis: false },
  { cle: "telephone", label: "Téléphone", requis: false },
  { cle: "linkedin", label: "Profil LinkedIn", requis: false },
  { cle: "type", label: "Type de contact", requis: false },
  { cle: "notes", label: "Notes", requis: false },
] as const;

export type CleContact = (typeof CHAMPS_CONTACT)[number]["cle"];

const MOTS_CONTACT: Record<CleContact, string[]> = {
  nom: [
    "nom complet",
    "nom",
    "name",
    "full name",
    "first name",
    "prenom",
    "contact",
  ],
  entreprise: ["entreprise", "company", "societe", "organisation", "employeur"],
  poste: ["poste", "position", "titre", "fonction", "job title", "role"],
  email: ["email", "e mail", "mail", "adresse mail", "email address"],
  telephone: ["telephone", "tel", "phone", "mobile", "portable"],
  linkedin: ["linkedin", "url", "profil", "profile"],
  type: ["type", "categorie", "relation", "role contact"],
  notes: ["notes", "note", "commentaire", "remarque"],
};

export function mappingAutoContact(colonnes: string[]): Mapping {
  const m: Mapping = {};
  for (const champ of CHAMPS_CONTACT) {
    const col = trouverColonne(colonnes, MOTS_CONTACT[champ.cle]);
    if (col && !Object.values(m).includes(col)) m[champ.cle] = col;
  }
  // Export LinkedIn : "First Name" + "Last Name" séparés.
  const prenom = trouverColonne(colonnes, ["first name", "prenom"]);
  const nomFamille = trouverColonne(colonnes, ["last name", "nom de famille"]);
  if (prenom && nomFamille) {
    m["nom"] = prenom;
    m["_nom2"] = nomFamille;
  }
  return m;
}

function normaliserTypeContact(valeur: string): TypeContact {
  const v = normaliser(valeur);
  const exact = TYPES_CONTACT.find((t) => normaliser(t) === v);
  if (exact) return exact;
  if (v.includes("rh") || v.includes("hr")) return "RH";
  if (v.includes("manager") || v.includes("directeur")) return "Manager";
  if (v.includes("alumni") || v.includes("eleve") || v.includes("ecole"))
    return "Ancien élève";
  if (v.includes("recrut")) return "Recruteur";
  return "Contact professionnel";
}

export function ligneVersContact(
  ligne: Record<string, string>,
  mapping: Mapping,
): Contact | null {
  const val = (cle: string) => {
    const col = mapping[cle];
    return col ? (ligne[col] ?? "").trim() : "";
  };

  const nom = [val("nom"), val("_nom2")].filter(Boolean).join(" ").trim();
  const email = val("email");
  if (!nom && !email) return null;

  const base = emptyContact();
  return {
    ...base,
    nom: nom || email,
    entreprise: val("entreprise"),
    poste: val("poste"),
    email,
    telephone: val("telephone"),
    linkedin: val("linkedin"),
    type: normaliserTypeContact(val("type")),
    notes: val("notes"),
  };
}

/* -------------------------------- Doublons -------------------------------- */

export function cleDoublonCandidature(c: {
  entreprise: string;
  poste: string;
}): string {
  return `${normaliser(c.entreprise)}|${normaliser(c.poste)}`;
}

export function cleDoublonContact(c: { nom: string; email: string }): string {
  return c.email ? normaliser(c.email) : normaliser(c.nom);
}
