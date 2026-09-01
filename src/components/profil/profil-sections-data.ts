import type { LucideIcon } from "lucide-react";
import {
  Compass,
  UserRound,
  GraduationCap,
  Briefcase,
  Wrench,
  Languages,
  Lightbulb,
  SlidersHorizontal,
  FileCode,
} from "lucide-react";

export type ProfilSectionId =
  | "recherche"
  | "identite"
  | "experiences"
  | "formation"
  | "competences"
  | "langues"
  | "engagements"
  | "preferences"
  | "documents";

export type SectionMeta = {
  id: ProfilSectionId;
  titre: string;
  description: string;
  icone: LucideIcon;
  color: string;
  keywords: string[];
};

export type SectionGroup = {
  id: string;
  titre: string;
  sections: SectionMeta[];
};

export const PROFIL_SECTION_GROUPS: SectionGroup[] = [
  {
    id: "vision",
    titre: "1. Projet & Positionnement",
    sections: [
      {
        id: "recherche",
        titre: "Ma recherche & Cible",
        description: "Postes ciblés, contrats, télétravail, salaires",
        icone: Compass,
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        keywords: [
          "recherche",
          "poste",
          "metier",
          "contrat",
          "stage",
          "alternance",
          "cdi",
          "salaire",
          "remuneration",
          "teletravail",
          "remote",
          "disponibilite",
          "secteur",
          "entreprises cibles",
        ],
      },
      {
        id: "identite",
        titre: "Identité & Contact",
        description: "Nom, prénom, titre, réseaux & bio",
        icone: UserRound,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        keywords: [
          "identite",
          "nom",
          "prenom",
          "email",
          "telephone",
          "contact",
          "linkedin",
          "github",
          "portfolio",
          "ville",
          "titre",
          "bio",
          "photo",
        ],
      },
    ],
  },
  {
    id: "parcours",
    titre: "2. Parcours & Compétences",
    sections: [
      {
        id: "experiences",
        titre: "Expériences & KPI",
        description: "Stages, alternances, missions & impacts",
        icone: Briefcase,
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        keywords: [
          "experiences",
          "stages",
          "alternances",
          "emploi",
          "missions",
          "kpi",
          "impact",
          "chiffres",
          "realisations",
          "entreprises",
        ],
      },
      {
        id: "formation",
        titre: "Formations & Diplômes",
        description: "Écoles, universités, cursus & mentions",
        icone: GraduationCap,
        color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        keywords: [
          "formation",
          "diplome",
          "ecole",
          "universite",
          "master",
          "licence",
          "bac",
          "etudes",
          "cours",
          "specialisation",
        ],
      },
      {
        id: "competences",
        titre: "Compétences & Outils",
        description: "Hard skills, logiciels maîtrisés, soft skills",
        icone: Wrench,
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        keywords: [
          "competences",
          "hard skills",
          "logiciels",
          "outils",
          "excel",
          "python",
          "sql",
          "figma",
          "soft skills",
          "expertise",
        ],
      },
      {
        id: "langues",
        titre: "Langues & Certifs",
        description: "Niveaux de langues & certifications",
        icone: Languages,
        color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        keywords: [
          "langues",
          "anglais",
          "espagnol",
          "toeic",
          "toefl",
          "cecr",
          "certifications",
          "diplomes certifiants",
          "certif",
        ],
      },
      {
        id: "engagements",
        titre: "Projets & Asso",
        description: "Projets personnels, associations & bénévolat",
        icone: Lightbulb,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        keywords: [
          "projets",
          "engagements",
          "associations",
          "benevolat",
          "hackathon",
          "projets perso",
          "sport",
          "leadership",
        ],
      },
    ],
  },
  {
    id: "intelligence",
    titre: "3. IA & Documents",
    sections: [
      {
        id: "preferences",
        titre: "Critères & Match IA",
        description: "Pondérations, culture d'entreprise, valeurs",
        icone: SlidersHorizontal,
        color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
        keywords: [
          "criteres",
          "preferences",
          "matching",
          "valeurs",
          "culture",
          "ponderations",
          "attentes",
          "management",
          "red flags",
        ],
      },
      {
        id: "documents",
        titre: "CV & Documents",
        description: "Importation CV, synthèse IA & exports",
        icone: FileCode,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        keywords: [
          "cv",
          "documents",
          "pdf",
          "importer",
          "synthese",
          "export",
          "lettre de motivation",
          "fichiers",
        ],
      },
    ],
  },
];

export const ALL_PROFIL_SECTIONS: SectionMeta[] = PROFIL_SECTION_GROUPS.flatMap(
  (g) => g.sections,
);
