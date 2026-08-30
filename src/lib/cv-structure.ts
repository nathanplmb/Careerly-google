/** Modèle détaillé de CV (créateur de CV modulaire). */

export type ExperienceCV = {
  id: string;
  poste: string;
  entreprise: string;
  lieu: string;
  contrat: string;
  debut: string;
  fin: string;
  enCours: boolean;
  description: string;
  realisations: string[];
  competences: string[];
};

export type FormationCV = {
  id: string;
  diplome: string;
  etablissement: string;
  lieu: string;
  debut: string;
  fin: string;
  mention: string;
  details: string;
};

export type CertificationCV = {
  id: string;
  nom: string;
  organisme: string;
  date: string;
  identifiant: string;
  lien: string;
};

export type ProjetCV = {
  id: string;
  nom: string;
  role: string;
  periode: string;
  description: string;
  lien: string;
};

export const NIVEAUX_COMPETENCE = [
  "Notions",
  "Intermédiaire",
  "Avancé",
  "Expert",
] as const;
export type NiveauCompetence = (typeof NIVEAUX_COMPETENCE)[number];

export type CompetenceCV = {
  id: string;
  nom: string;
  categorie: string;
  niveau: NiveauCompetence;
};

export const NIVEAUX_LANGUE = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Langue maternelle",
] as const;
export type NiveauLangue = (typeof NIVEAUX_LANGUE)[number];

export type LangueCV = {
  id: string;
  nom: string;
  niveau: NiveauLangue;
  certification: string;
};

export type BenevolatCV = {
  id: string;
  role: string;
  organisation: string;
  periode: string;
  description: string;
};

export type CvStructure = {
  titre: string;
  accroche: string;
  email: string;
  telephone: string;
  ville: string;
  linkedin: string;
  portfolio: string;
  permis: string;
  experiences: ExperienceCV[];
  formations: FormationCV[];
  certifications: CertificationCV[];
  projets: ProjetCV[];
  competences: CompetenceCV[];
  langues: LangueCV[];
  benevolats: BenevolatCV[];
  interets: string[];
};

export function nouvelId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function emptyCvStructure(): CvStructure {
  return {
    titre: "",
    accroche: "",
    email: "",
    telephone: "",
    ville: "",
    linkedin: "",
    portfolio: "",
    permis: "",
    experiences: [],
    formations: [],
    certifications: [],
    projets: [],
    competences: [],
    langues: [],
    benevolats: [],
    interets: [],
  };
}

export function nouvelleExperience(): ExperienceCV {
  return {
    id: nouvelId(),
    poste: "",
    entreprise: "",
    lieu: "",
    contrat: "Stage",
    debut: "",
    fin: "",
    enCours: false,
    description: "",
    realisations: [],
    competences: [],
  };
}

export function nouvelleFormation(): FormationCV {
  return {
    id: nouvelId(),
    diplome: "",
    etablissement: "",
    lieu: "",
    debut: "",
    fin: "",
    mention: "",
    details: "",
  };
}

export function nouvelleCertification(): CertificationCV {
  return {
    id: nouvelId(),
    nom: "",
    organisme: "",
    date: "",
    identifiant: "",
    lien: "",
  };
}

export function nouveauProjet(): ProjetCV {
  return {
    id: nouvelId(),
    nom: "",
    role: "",
    periode: "",
    description: "",
    lien: "",
  };
}

export function nouvelleCompetence(): CompetenceCV {
  return {
    id: nouvelId(),
    nom: "",
    categorie: "Compétence",
    niveau: "Intermédiaire",
  };
}

export function nouvelleLangue(): LangueCV {
  return { id: nouvelId(), nom: "", niveau: "B2", certification: "" };
}

export function nouveauBenevolat(): BenevolatCV {
  return {
    id: nouvelId(),
    role: "",
    organisation: "",
    periode: "",
    description: "",
  };
}

/** Fusionne une structure partielle (IA, cloud…) avec le modèle vide. */
export function normaliserCvStructure(
  brut: Partial<CvStructure> | null | undefined,
): CvStructure {
  const base = emptyCvStructure();
  if (!brut || typeof brut !== "object") return base;
  const liste = <T extends { id?: string }>(
    v: unknown,
    defaut: () => T,
  ): T[] =>
    Array.isArray(v)
      ? v.map((x) => ({
          ...defaut(),
          ...(x as T),
          id: (x as T)?.id ?? nouvelId(),
        }))
      : [];
  return {
    ...base,
    ...brut,
    experiences: liste(brut.experiences, nouvelleExperience).map((e) => ({
      ...e,
      realisations: Array.isArray(e.realisations) ? e.realisations : [],
      competences: Array.isArray(e.competences) ? e.competences : [],
    })),
    formations: liste(brut.formations, nouvelleFormation),
    certifications: liste(brut.certifications, nouvelleCertification),
    projets: liste(brut.projets, nouveauProjet),
    competences: liste(brut.competences, nouvelleCompetence),
    langues: liste(brut.langues, nouvelleLangue),
    benevolats: liste(brut.benevolats, nouveauBenevolat),
    interets: Array.isArray(brut.interets) ? brut.interets.filter(Boolean) : [],
  };
}

/** Nombre d'éléments renseignés — sert à l'indicateur de complétion. */
export function completionCv(cv: CvStructure): number {
  const blocs = [
    Boolean(cv.titre || cv.accroche),
    Boolean(cv.email || cv.telephone),
    cv.experiences.length > 0,
    cv.formations.length > 0,
    cv.competences.length > 0,
    cv.langues.length > 0,
    cv.certifications.length > 0 || cv.projets.length > 0,
  ];
  return Math.round((blocs.filter(Boolean).length / blocs.length) * 100);
}

/** Résumé texte utilisé par les moteurs IA (match, préparation…). */
export function cvStructureEnTexte(cv: CvStructure): string {
  const l: string[] = [];
  if (cv.titre) l.push(`Titre : ${cv.titre}`);
  if (cv.accroche) l.push(`Accroche : ${cv.accroche}`);
  for (const e of cv.experiences) {
    l.push(
      `Expérience : ${e.poste} — ${e.entreprise} (${e.debut}${e.enCours ? " → aujourd'hui" : e.fin ? ` → ${e.fin}` : ""})${e.lieu ? `, ${e.lieu}` : ""}. ${e.description} ${e.realisations.join(" ; ")}`.trim(),
    );
  }
  for (const f of cv.formations) {
    l.push(
      `Formation : ${f.diplome} — ${f.etablissement} (${f.debut} → ${f.fin}) ${f.mention}`.trim(),
    );
  }
  for (const c of cv.certifications)
    l.push(`Certification : ${c.nom} (${c.organisme}, ${c.date})`);
  for (const p of cv.projets)
    l.push(`Projet : ${p.nom} — ${p.role}. ${p.description}`);
  if (cv.competences.length)
    l.push(
      `Compétences : ${cv.competences.map((c) => `${c.nom} (${c.niveau})`).join(", ")}`,
    );
  if (cv.langues.length)
    l.push(
      `Langues : ${cv.langues.map((x) => `${x.nom} ${x.niveau}`).join(", ")}`,
    );
  if (cv.interets.length)
    l.push(`Centres d'intérêt : ${cv.interets.join(", ")}`);
  return l.join("\n");
}
