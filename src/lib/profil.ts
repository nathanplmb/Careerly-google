import type { CvEtat } from "./cv";
import {
  emptyCvStructure,
  normaliserCvStructure,
  type CvStructure,
} from "./cv-structure";

export const CRITERES = [
  "secteur",
  "localisation",
  "remuneration",
  "teletravail",
  "missions",
  "taille entreprise",
] as const;
export type Critere = (typeof CRITERES)[number];

export const IMPORTANCES = [
  "Très important",
  "Important",
  "Moyen",
  "Faible",
] as const;
export type Importance = (typeof IMPORTANCES)[number];

export type Profil = {
  prenom: string;
  nom: string;
  formation: string;
  ecole: string;
  niveau: string;
  localisation: string;
  mobilite: string;
  contrats: string;
  domaines: string;
  metiers: string;
  entreprisesCiblees: string;
  competences: string;
  logiciels: string;
  langues: string;
  niveauAnglais: string;
  experiences: string;
  teletravail: string;
  remuneration: string;
  dateDebut: string;
  duree: string;
  criteres: Partial<Record<Critere, Importance>>;
  cvStructure: CvStructure;
  cv?: CvEtat | null;
};

export const PROFIL_STORAGE_KEY = "neoma-profil-v1";

export function emptyProfil(): Profil {
  return {
    prenom: "",
    nom: "",
    formation: "Programme Grande École",
    ecole: "",
    niveau: "M1",
    localisation: "",
    mobilite: "",
    contrats: "Stage",
    domaines: "",
    metiers: "",
    entreprisesCiblees: "",
    competences: "",
    logiciels: "",
    langues: "",
    niveauAnglais: "",
    experiences: "",
    teletravail: "",
    remuneration: "",
    dateDebut: "",
    duree: "",
    criteres: {
      secteur: "Important",
      localisation: "Important",
      remuneration: "Moyen",
      teletravail: "Moyen",
      missions: "Très important",
    },
    cvStructure: emptyCvStructure(),
    cv: null,
  };
}

/** Un profil est utilisable par l'IA dès qu'il contient quelques informations clés. */
export function profilRempli(p: Profil): boolean {
  return Boolean(
    (p.competences || p.metiers || p.domaines || p.experiences) &&
    (p.formation || p.ecole),
  );
}

export function loadProfil(): Profil {
  if (typeof window === "undefined") return emptyProfil();
  try {
    const raw = window.localStorage.getItem(PROFIL_STORAGE_KEY);
    if (!raw) return emptyProfil();
    const brut = JSON.parse(raw) as Partial<Profil>;
    return {
      ...emptyProfil(),
      ...brut,
      cvStructure: normaliserCvStructure(brut.cvStructure),
    };
  } catch {
    return emptyProfil();
  }
}

export function saveProfilLocal(p: Profil) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFIL_STORAGE_KEY, JSON.stringify(p));
}
