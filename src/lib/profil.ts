import type { CvEtat } from "./cv";
import {
  defaultPreferences,
  emptyCvStructure,
  normaliserCvStructure,
  type CvStructure,
  type PreferencesCandidature,
  type SyntheseProfilIA,
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
  titre?: string;
  formation: string;
  ecole: string;
  niveau: string;
  localisation: string;
  pays?: string;
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
  modeTravail?: string; // "presentiel" | "hybride" | "teletravail"
  remuneration: string;
  dateDebut: string;
  duree: string;
  rechercheVraie?: string; // Zone de texte libre "Ce que je recherche vraiment" pour l'IA
  environnements?: string[]; // Scale-up, Grand groupe, Startup, Cabinet, etc.
  prioritesRecherche?: string[];
  emailContact?: string;
  telephone?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  permis?: string;
  photoUrl?: string;
  criteres: Partial<Record<Critere, Importance>>;
  cvStructure: CvStructure;
  cv?: CvEtat | null;
  preferences?: Partial<PreferencesCandidature>;
};

export const PROFIL_STORAGE_KEY = "neoma-profil-v1";

export function emptyProfil(): Profil {
  return {
    prenom: "",
    nom: "",
    titre: "",
    formation: "Programme Grande École",
    ecole: "",
    niveau: "M1",
    localisation: "",
    pays: "France",
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
    modeTravail: "hybride",
    remuneration: "",
    dateDebut: "",
    duree: "",
    rechercheVraie: "",
    environnements: ["Grand groupe", "Scale-up"],
    prioritesRecherche: [
      "Missions apprenantes",
      "Mentorat / Équipe",
      "Perspectives de recrutement",
    ],
    emailContact: "",
    telephone: "",
    linkedin: "",
    portfolio: "",
    github: "",
    permis: "",
    photoUrl: "",
    criteres: {
      secteur: "Important",
      localisation: "Important",
      remuneration: "Moyen",
      teletravail: "Moyen",
      missions: "Très important",
    },
    cvStructure: emptyCvStructure(),
    cv: null,
    preferences: defaultPreferences(),
  };
}

/** Un profil est utilisable par l'IA dès qu'il contient quelques informations clés. */
export function profilRempli(p: Profil): boolean {
  return Boolean(
    (p.competences ||
      p.metiers ||
      p.domaines ||
      p.experiences ||
      p.cvStructure?.experiences?.length) &&
    (p.formation || p.ecole || p.cvStructure?.formations?.length),
  );
}

export function loadProfil(): Profil {
  if (typeof window === "undefined") return emptyProfil();
  try {
    const raw = window.localStorage.getItem(PROFIL_STORAGE_KEY);
    if (!raw) return emptyProfil();
    const brut = JSON.parse(raw) as Partial<Profil>;
    const cvStruct = normaliserCvStructure(brut.cvStructure);
    return {
      ...emptyProfil(),
      ...brut,
      titre: brut.titre || cvStruct.titre || "",
      telephone: brut.telephone || cvStruct.telephone || "",
      emailContact: brut.emailContact || cvStruct.email || "",
      linkedin: brut.linkedin || cvStruct.linkedin || "",
      portfolio: brut.portfolio || cvStruct.portfolio || "",
      github: brut.github || cvStruct.github || "",
      permis: brut.permis || cvStruct.permis || "",
      photoUrl: brut.photoUrl || cvStruct.photoUrl || "",
      cvStructure: cvStruct,
    };
  } catch {
    return emptyProfil();
  }
}

export function saveProfilLocal(p: Profil) {
  if (typeof window === "undefined") return;
  // Synchronise les champs d'identité croisés
  const cvStructure = normaliserCvStructure({
    ...p.cvStructure,
    titre: p.titre || p.cvStructure.titre,
    email: p.emailContact || p.cvStructure.email,
    telephone: p.telephone || p.cvStructure.telephone,
    linkedin: p.linkedin || p.cvStructure.linkedin,
    portfolio: p.portfolio || p.cvStructure.portfolio,
    github: p.github || p.cvStructure.github || "",
    permis: p.permis || p.cvStructure.permis,
    photoUrl: p.photoUrl || p.cvStructure.photoUrl || "",
    ville: p.localisation || p.cvStructure.ville,
  });

  const payload: Profil = {
    ...p,
    cvStructure,
  };

  window.localStorage.setItem(PROFIL_STORAGE_KEY, JSON.stringify(payload));
}
