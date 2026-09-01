import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserRound,
  Briefcase,
  Wrench,
  Languages,
  Award,
  Lightbulb,
  Target,
  FileText,
} from "lucide-react";

export type ProfilSectionId =
  | "apercu"
  | "identite"
  | "parcours"
  | "competences"
  | "langues"
  | "certifications"
  | "projets"
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
    id: "vue_ensemble",
    titre: "Vue d'ensemble",
    sections: [
      {
        id: "apercu",
        titre: "Tableau de bord & IA",
        description: "Score de complétude, synthèse IA & actions",
        icone: LayoutDashboard,
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        keywords: [
          "apercu",
          "dashboard",
          "synthese",
          "ia",
          "score",
          "completude",
          "pitch",
          "forces",
        ],
      },
      {
        id: "identite",
        titre: "Identité & Contact",
        description: "Nom, prénom, titre, réseaux & coordonnées",
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
          "portfolio",
          "ville",
        ],
      },
      {
        id: "preferences",
        titre: "Objectifs & Préférences",
        description: "Métiers ciblés, secteurs, contrat, salaire & dispo",
        icone: Target,
        color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        keywords: [
          "objectifs",
          "recherche",
          "poste",
          "metier",
          "contrat",
          "stage",
          "alternance",
          "cdi",
          "salaire",
          "teletravail",
        ],
      },
    ],
  },
  {
    id: "dossier_academique_pro",
    titre: "Parcours & Compétences",
    sections: [
      {
        id: "parcours",
        titre: "Parcours & Expériences",
        description: "Expériences professionnelles & Formations",
        icone: Briefcase,
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        keywords: [
          "parcours",
          "experiences",
          "stages",
          "alternances",
          "formations",
          "diplomes",
          "ecoles",
          "kpi",
          "impact",
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
        ],
      },
      {
        id: "langues",
        titre: "Langues & Niveaux",
        description: "CECRL (A1-C2), TOEIC, IELTS, TOEFL",
        icone: Languages,
        color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        keywords: [
          "langues",
          "anglais",
          "espagnol",
          "toeic",
          "toefl",
          "cecr",
          "bilingue",
          "ielts",
        ],
      },
      {
        id: "certifications",
        titre: "Certifications",
        description: "AMF, Bloomberg, CFA, Google, AWS, Scrum...",
        icone: Award,
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        keywords: [
          "certifications",
          "amf",
          "bloomberg",
          "cfa",
          "aws",
          "google",
          "scrum",
          "accreditations",
        ],
      },
    ],
  },
  {
    id: "extra_documents",
    titre: "Engagements & Documents",
    sections: [
      {
        id: "projets",
        titre: "Projets & Engagements",
        description: "Hackathons, projets perso, asso & distinctions",
        icone: Lightbulb,
        color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        keywords: [
          "projets",
          "engagements",
          "associations",
          "benevolat",
          "distinctions",
          "hackathons",
          "passions",
        ],
      },
      {
        id: "documents",
        titre: "Documents & CV",
        description: "CVs, import IA, lettres & export de profil",
        icone: FileText,
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        keywords: [
          "cv",
          "documents",
          "pdf",
          "importer",
          "export",
          "lettres",
          "fichiers",
        ],
      },
    ],
  },
];

export const ALL_PROFIL_SECTIONS: SectionMeta[] = PROFIL_SECTION_GROUPS.flatMap(
  (g) => g.sections,
);
