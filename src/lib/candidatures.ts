export const STATUTS = [
  "Je vais postuler",
  "J'ai postulé",
  "J'ai relancé",
  "J'ai un entretien",
  "J'ai reçu une réponse négative",
  "Je n'ai pas reçu de réponse",
] as const;

export type Statut = (typeof STATUTS)[number];

export const PRIORITES = ["Haute", "Moyenne", "Faible"] as const;
export type Priorite = (typeof PRIORITES)[number];
/** "auto" = priorité calculée par l'app, sinon priorité choisie manuellement. */
export type PrioriteChoix = Priorite | "auto";

export const SOURCES = [
  "LinkedIn",
  "Welcome to the Jungle",
  "JobTeaser",
  "Indeed",
  "Site entreprise",
  "Candidature spontanée",
  "Réseau",
  "École",
  "Autre",
] as const;
export type Source = (typeof SOURCES)[number];

export type MatchDetail = {
  critere: string;
  score: number;
  /** Phrase d'explication du sous-score (facultative sur les anciennes analyses). */
  explication?: string;
};

/** Codes de recommandation (les anciennes analyses peuvent contenir un libellé libre). */
export const RECOMMANDATIONS = [
  "postuler",
  "postuler_si_interet",
  "secondaire",
  "peu_prioritaire",
] as const;
export type RecommandationCode = (typeof RECOMMANDATIONS)[number];
export type Recommandation = RecommandationCode | (string & {});

export type CompetencesMatch = {
  correspondances: string[];
  aRenforcer: string[];
  nonRenseignees: string[];
};

export type MatchScore = {
  global: number;
  details: MatchDetail[];
  pointsForts: string[];
  vigilance: string[];
  competencesManquantes: string[];
  recommandation: Recommandation;
  explication: string;
  genereLe: string; // ISO
  /** V2.2 — champs facultatifs pour rester rétrocompatible. */
  confiance?: number; // 0-100
  confianceRaison?: string;
  competences?: CompetencesMatch;
  profilHash?: string;
  offreHash?: string;
  /** Réservé au futur CV Analyzer. */
  cvHash?: string;
  modele?: string;
};

export type Preparation = {
  // Renseigné par l'utilisateur
  pourquoiEntreprise: string;
  pourquoiPoste: string;
  notes: string;
  // Généré par l'IA (vide tant que non généré)
  resumeEntreprise: string;
  resumePoste: string;
  competencesRecherchees: string[];
  questionsRH: string[];
  questionsComportementales: string[];
  questionsPoste: string[];
  questionsARecruteur: string[];
  argumentsCles: string[];
  pointsFaibles: string[];
  genereLe: string;
};

export function emptyPreparation(): Preparation {
  return {
    pourquoiEntreprise: "",
    pourquoiPoste: "",
    notes: "",
    resumeEntreprise: "",
    resumePoste: "",
    competencesRecherchees: [],
    questionsRH: [],
    questionsComportementales: [],
    questionsPoste: [],
    questionsARecruteur: [],
    argumentsCles: [],
    pointsFaibles: [],
    genereLe: "",
  };
}

export type Candidature = {
  id: string;
  entreprise: string;
  poste: string;
  statut: Statut;
  lieu: string;
  lien: string;
  contact: string;
  dateEnvoi: string; // yyyy-mm-dd
  dateRelance: string;
  dateDernierContact: string;
  dateLimite: string; // date limite pour postuler
  commentaire: string;
  missions: string;
  profilRecherche: string;
  modalites: string;
  detail: string;
  // V2.1
  priorite: PrioriteChoix;
  source: string;
  secteur: string;
  archive: boolean;
  match: MatchScore | null;
  preparation: Preparation;
};

export const STORAGE_KEY = "neoma-suivi-stage-v1";

export function emptyCandidature(): Candidature {
  return {
    id: crypto.randomUUID(),
    entreprise: "",
    poste: "",
    statut: "Je vais postuler",
    lieu: "",
    lien: "",
    contact: "",
    dateEnvoi: "",
    dateRelance: "",
    dateDernierContact: "",
    dateLimite: "",
    commentaire: "",
    missions: "",
    profilRecherche: "",
    modalites: "",
    detail: "",
    priorite: "auto",
    source: "",
    secteur: "",
    archive: false,
    match: null,
    preparation: emptyPreparation(),
  };
}

/** Sépare intelligemment les blocs structurés (missions, profil, modalités) du texte brut de l'offre si présent. */
export function extraireSectionsDetail(detail: string): {
  missions: string;
  profilRecherche: string;
  modalites: string;
  detailNettoye: string;
} {
  if (!detail) {
    return {
      missions: "",
      profilRecherche: "",
      modalites: "",
      detailNettoye: "",
    };
  }

  const aMarqueurs =
    /🎯|\bMissions?\s*(?:cl[ée]s?|principales?)|\bProfil(?:\s*&|\s*et)?\s*Comp[ée]tences?|👤|\bModalit[ée]s?\s*:|ℹ️/i.test(
      detail,
    );

  if (!aMarqueurs) {
    return {
      missions: "",
      profilRecherche: "",
      modalites: "",
      detailNettoye: detail,
    };
  }

  let missions = "";
  let profilRecherche = "";
  let modalites = "";
  const autresLignes: string[] = [];

  const blocs = detail.split(
    /\n(?=(?:🎯|👤|ℹ️|\*{1,2}\s*(?:Missions?|Profil|Modalit[ée]s?)))/i,
  );

  for (const bloc of blocs) {
    const b = bloc.trim();
    if (!b) continue;

    if (/^(?:🎯|\*{0,2}\s*🎯|\*{0,2}\s*Missions?\s*cl[ée]s?)/i.test(b)) {
      missions = b
        .replace(
          /^(?:🎯\s*)?(?:\*{1,2})?Missions?\s*cl[ée]s?\s*:?(?:\*{1,2})?\s*\n?/i,
          "",
        )
        .trim();
    } else if (
      /^(?:👤|\*{0,2}\s*👤|\*{0,2}\s*Profil(?:\s*&|\s*et)?\s*Comp[ée]tences?)/i.test(
        b,
      )
    ) {
      profilRecherche = b
        .replace(
          /^(?:👤\s*)?(?:\*{1,2})?Profil(?:\s*&|\s*et)?\s*Comp[ée]tences?\s*(?:recherch[ée]s?)?\s*:?(?:\*{1,2})?\s*\n?/i,
          "",
        )
        .trim();
    } else if (/^(?:ℹ️|\*{0,2}\s*ℹ️|\*{0,2}\s*Modalit[ée]s?)/i.test(b)) {
      modalites = b
        .replace(
          /^(?:ℹ️\s*)?(?:\*{1,2})?Modalit[ée]s?\s*:?(?:\*{1,2})?\s*\n?/i,
          "",
        )
        .trim();
    } else {
      autresLignes.push(b);
    }
  }

  return {
    missions,
    profilRecherche,
    modalites,
    detailNettoye: autresLignes.join("\n\n").trim(),
  };
}

/** Complète une candidature venant d'une ancienne version (localStorage / cloud). */
export function normalizeCandidature(c: Partial<Candidature>): Candidature {
  const base = emptyCandidature();
  let missions = c.missions ?? "";
  let profilRecherche = c.profilRecherche ?? "";
  let modalites = c.modalites ?? "";
  let detail = c.detail ?? "";

  // Rétrocompatibilité : si les champs dédiés sont vides mais detail contient les sections structurées
  if ((!missions || !profilRecherche) && detail) {
    const extraits = extraireSectionsDetail(detail);
    if (extraits.missions || extraits.profilRecherche || extraits.modalites) {
      missions = missions || extraits.missions;
      profilRecherche = profilRecherche || extraits.profilRecherche;
      modalites = modalites || extraits.modalites;
      detail = extraits.detailNettoye;
    }
  }

  return {
    ...base,
    ...c,
    id: c.id ?? base.id,
    statut: (STATUTS as readonly string[]).includes(c.statut ?? "")
      ? (c.statut as Statut)
      : "Je vais postuler",
    missions,
    profilRecherche,
    modalites,
    detail,
    priorite: c.priorite ?? "auto",
    source: c.source ?? "",
    secteur: c.secteur ?? "",
    archive: c.archive ?? false,
    match: c.match ?? null,
    preparation: { ...emptyPreparation(), ...(c.preparation ?? {}) },
  };
}

export function addDays(date: string, days: number): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string): number | null {
  if (!from || !to) return null;
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / 86400000);
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(date: string): string {
  if (!date) return "—";
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return "—";
  return `${d}/${m}/${y}`;
}

const seed = (c: Partial<Candidature>): Candidature => normalizeCandidature(c);

export const SEED: Candidature[] = [
  seed({
    id: "seed-1",
    entreprise: "Nom entreprise 1",
    poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
    statut: "Je vais postuler",
    lieu: "Paris 15e",
    lien: "https://",
    contact: "M. Dupont - email@email.fr",
    commentaire: "Envoyer une lettre de motivation personnalisée",
    source: "LinkedIn",
    detail:
      "Vous pouvez copier/coller ici le détail de l'offre car elle peut être supprimée du site web.",
  }),
  seed({
    id: "seed-2",
    entreprise: "Nom entreprise 2",
    poste: "Conseiller(ère) commercial(e) bien-être auprès particuliers (H/F)",
    statut: "J'ai postulé",
    lieu: "Paris 15e",
    lien: "https://",
    dateEnvoi: "2023-02-09",
    dateRelance: "2023-02-19",
    dateDernierContact: "2023-02-09",
    commentaire: "Offre très intéressante car ...",
    source: "Welcome to the Jungle",
  }),
  seed({
    id: "seed-3",
    entreprise: "Nom entreprise 3",
    poste: "Commerce de gros — fournitures pour la plomberie et le chauffage",
    statut: "J'ai relancé",
    lieu: "Paris 15e",
    lien: "https://",
    contact: "M. Dupont - email@email.fr - 0600000000",
    dateEnvoi: "2023-02-01",
    dateRelance: "2023-02-13",
    dateDernierContact: "2023-04-13",
    commentaire: "Candidature spontanée",
    source: "Candidature spontanée",
  }),
  seed({
    id: "seed-4",
    entreprise: "Nom entreprise 4",
    poste: "Assistant relation franchise (F/H) en alternance (H/F)",
    statut: "J'ai un entretien",
    lieu: "Saint Herblain",
    lien: "https://",
    dateEnvoi: "2023-01-25",
    dateRelance: "2023-02-03",
    dateDernierContact: "2023-02-03",
    commentaire: "Entretien prévu le JJ/MM/AAAA",
    source: "JobTeaser",
  }),
  seed({
    id: "seed-5",
    entreprise: "Nom entreprise 5",
    poste: "Assistant relation franchise (F/H) en alternance (H/F)",
    statut: "J'ai reçu une réponse négative",
    lieu: "Marseille",
    lien: "https://",
    contact: "M. Dupont - 0132520000",
    dateEnvoi: "2023-01-05",
    dateRelance: "2023-01-15",
    dateDernierContact: "2023-02-12",
    commentaire: "L'entreprise ne recrute plus d'alternant pour cette année",
    source: "Indeed",
  }),
  seed({
    id: "seed-6",
    entreprise: "Nom entreprise 6",
    poste: "Assistant relation franchise (F/H) en alternance (H/F)",
    statut: "Je n'ai pas reçu de réponse",
    lieu: "Marseille",
    lien: "https://",
    contact: "M. Dupont - 0132520000",
    dateEnvoi: "2023-01-05",
    dateRelance: "2023-01-15",
    dateDernierContact: "2023-01-15",
    commentaire: "Aucune réponse à ce jour",
    source: "Site entreprise",
  }),
];

export function loadCandidatures(): Candidature[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED;
    const parsed = JSON.parse(raw) as Partial<Candidature>[];
    return Array.isArray(parsed) ? parsed.map(normalizeCandidature) : SEED;
  } catch {
    return SEED;
  }
}

export function saveCandidatures(items: Candidature[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function toCsv(items: Candidature[]): string {
  const head = [
    "Entreprise",
    "Intitulé du poste",
    "Etat d'avancement",
    "Priorité",
    "Score de correspondance",
    "Source",
    "Secteur",
    "Lieu",
    "Lien de l'offre",
    "Contact",
    "Date d'envoi",
    "Date de relance",
    "Dernier contact",
    "Date limite de candidature",
    "Commentaire",
    "Missions clés",
    "Profil recherché",
    "Modalités",
    "Détail de l'offre",
  ];
  const esc = (v: string) => `"${(v ?? "").replace(/"/g, '""')}"`;
  const rows = items.map((c) =>
    [
      c.entreprise,
      c.poste,
      c.statut,
      c.priorite === "auto" ? "" : c.priorite,
      c.match ? `${c.match.global}%` : "",
      c.source,
      c.secteur,
      c.lieu,
      c.lien,
      c.contact,
      formatDate(c.dateEnvoi),
      formatDate(c.dateRelance),
      formatDate(c.dateDernierContact),
      formatDate(c.dateLimite),
      c.commentaire,
      c.missions,
      c.profilRecherche,
      c.modalites,
      c.detail,
    ]
      .map(esc)
      .join(";"),
  );
  return [head.map(esc).join(";"), ...rows].join("\n");
}
