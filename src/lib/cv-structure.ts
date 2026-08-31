/** Modèle détaillé et enrichi de profil / CV (Career Profile Source de Vérité). */

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
  missions?: string[];
  responsabilites?: string[];
  realisations: string[];
  competences: string[];
  outils?: string[];
  kpi?: string;
  realisationsCles?: string;
};

export type FormationCV = {
  id: string;
  diplome: string;
  etablissement: string;
  lieu: string;
  debut: string;
  fin: string;
  enCours?: boolean;
  mention: string;
  specialisation?: string;
  coursImportants?: string[];
  projets?: string[];
  resultats?: string;
  details: string;
  niveau?: string;
};

export type CertificationCV = {
  id: string;
  nom: string;
  organisme: string;
  date: string;
  dateExpiration?: string;
  identifiant: string;
  lien: string;
  competencesAssociees?: string[];
};

export type ProjetCV = {
  id: string;
  nom: string;
  role: string;
  type?: "personnel" | "scolaire" | "professionnel" | "hackathon" | "autre";
  periode: string;
  description: string;
  technologies?: string[];
  competences?: string[];
  resultats?: string;
  lien: string;
};

export const NIVEAUX_COMPETENCE = [
  "Débutant",
  "Notions",
  "Intermédiaire",
  "Avancé",
  "Expert",
] as const;
export type NiveauCompetence = (typeof NIVEAUX_COMPETENCE)[number];

export const CATEGORIES_COMPETENCE = [
  "hard",
  "soft",
  "outil",
  "methode",
  "autre",
] as const;
export type CategorieCompetence = (typeof CATEGORIES_COMPETENCE)[number];

export type CompetenceCV = {
  id: string;
  nom: string;
  categorie: string;
  typeCategorie?: CategorieCompetence;
  niveau: NiveauCompetence;
  anneesExperience?: string;
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
  score?: string;
};

export type BenevolatCV = {
  id: string;
  role: string;
  organisation: string;
  periode: string;
  description: string;
  responsabilites?: string[];
  realisations?: string[];
  competences?: string[];
};

export type DistinctionCV = {
  id: string;
  titre: string;
  organisme: string;
  date: string;
  description: string;
};

export type DocumentProfil = {
  id: string;
  nom: string;
  type:
    | "cv_principal"
    | "cv_alternatif"
    | "lettre"
    | "portfolio"
    | "diplome"
    | "autre";
  url?: string;
  dateAjout: string;
  note?: string;
};

export type PreferencesCandidature = {
  secteursPrivilegies: string[];
  secteursAEviter: string[];
  metiersPrivilegies: string[];
  entreprisesCibles: string[];
  taillesEntreprise: string[]; // Startup, PME, ETI, Grand groupe, Cabinet
  travailInternational: boolean;
  mobiliteGeo: string;
  teletravailPrefere: "full_remote" | "hybride" | "presentiel" | "indifferent";
  salaireMin: string;
  distanceMaxKm?: string;
  criteresNonNegociables: string[];
};

export type SyntheseProfilIA = {
  titrePro?: string;
  resumeGlobal: string;
  forcesCles: string[];
  domainesExpertise: string[];
  typePosteIdeal: string;
  pitchEntretien: string;
  pointsVigilance: string[];
  actualiseLe: string;
};

export type CvStructure = {
  titre: string;
  accroche: string;
  email: string;
  telephone: string;
  ville: string;
  pays?: string;
  linkedin: string;
  portfolio: string;
  github?: string;
  permis: string;
  photoUrl?: string;
  experiences: ExperienceCV[];
  formations: FormationCV[];
  certifications: CertificationCV[];
  projets: ProjetCV[];
  competences: CompetenceCV[];
  langues: LangueCV[];
  benevolats: BenevolatCV[];
  distinctions?: DistinctionCV[];
  interets: string[];
  preferences?: Partial<PreferencesCandidature>;
  documents?: DocumentProfil[];
  syntheseIa?: SyntheseProfilIA | null;
};

export type CvExperience = ExperienceCV;
export type CvFormation = FormationCV;
export type CvCompetence = CompetenceCV;
export type CvLangue = LangueCV;
export type CvCertification = CertificationCV;
export type CvProjet = ProjetCV;
export type CvBenevolat = BenevolatCV;

export function nouvelId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function defaultPreferences(): PreferencesCandidature {
  return {
    secteursPrivilegies: [],
    secteursAEviter: [],
    metiersPrivilegies: [],
    entreprisesCibles: [],
    taillesEntreprise: ["Scale-up", "Grand groupe"],
    travailInternational: false,
    mobiliteGeo: "France entière & Télétravail",
    teletravailPrefere: "hybride",
    salaireMin: "",
    criteresNonNegociables: [],
  };
}

export function emptyCvStructure(): CvStructure {
  return {
    titre: "",
    accroche: "",
    email: "",
    telephone: "",
    ville: "",
    pays: "France",
    linkedin: "",
    portfolio: "",
    github: "",
    permis: "",
    photoUrl: "",
    experiences: [],
    formations: [],
    certifications: [],
    projets: [],
    competences: [],
    langues: [],
    benevolats: [],
    distinctions: [],
    interets: [],
    preferences: defaultPreferences(),
    documents: [],
    syntheseIa: null,
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
    missions: [],
    responsabilites: [],
    realisations: [],
    competences: [],
    outils: [],
    kpi: "",
    realisationsCles: "",
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
    enCours: false,
    mention: "",
    specialisation: "",
    coursImportants: [],
    projets: [],
    resultats: "",
    details: "",
  };
}

export function nouvelleCertification(): CertificationCV {
  return {
    id: nouvelId(),
    nom: "",
    organisme: "",
    date: "",
    dateExpiration: "",
    identifiant: "",
    lien: "",
    competencesAssociees: [],
  };
}

export function nouveauProjet(): ProjetCV {
  return {
    id: nouvelId(),
    nom: "",
    role: "",
    type: "personnel",
    periode: "",
    description: "",
    technologies: [],
    competences: [],
    resultats: "",
    lien: "",
  };
}

export function nouvelleCompetence(): CompetenceCV {
  return {
    id: nouvelId(),
    nom: "",
    categorie: "Compétence",
    typeCategorie: "hard",
    niveau: "Intermédiaire",
    anneesExperience: "",
  };
}

export function nouvelleLangue(): LangueCV {
  return {
    id: nouvelId(),
    nom: "",
    niveau: "B2",
    certification: "",
    score: "",
  };
}

export function nouveauBenevolat(): BenevolatCV {
  return {
    id: nouvelId(),
    role: "",
    organisation: "",
    periode: "",
    description: "",
    responsabilites: [],
    realisations: [],
    competences: [],
  };
}

export function nouvelleDistinction(): DistinctionCV {
  return {
    id: nouvelId(),
    titre: "",
    organisme: "",
    date: "",
    description: "",
  };
}

/** Normalise et fusionne une structure partielle avec le modèle complet enrichi. */
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
    pays: brut.pays ?? base.pays,
    github: brut.github ?? "",
    photoUrl: brut.photoUrl ?? "",
    experiences: liste(brut.experiences, nouvelleExperience).map((e) => ({
      ...e,
      missions: Array.isArray(e.missions) ? e.missions : [],
      responsabilites: Array.isArray(e.responsabilites)
        ? e.responsabilites
        : [],
      realisations: Array.isArray(e.realisations) ? e.realisations : [],
      competences: Array.isArray(e.competences) ? e.competences : [],
      outils: Array.isArray(e.outils) ? e.outils : [],
    })),
    formations: liste(brut.formations, nouvelleFormation).map((f) => ({
      ...f,
      coursImportants: Array.isArray(f.coursImportants)
        ? f.coursImportants
        : [],
      projets: Array.isArray(f.projets) ? f.projets : [],
    })),
    certifications: liste(brut.certifications, nouvelleCertification).map(
      (c) => ({
        ...c,
        competencesAssociees: Array.isArray(c.competencesAssociees)
          ? c.competencesAssociees
          : [],
      }),
    ),
    projets: liste(brut.projets, nouveauProjet).map((p) => ({
      ...p,
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      competences: Array.isArray(p.competences) ? p.competences : [],
    })),
    competences: liste(brut.competences, nouvelleCompetence),
    langues: liste(brut.langues, nouvelleLangue),
    benevolats: liste(brut.benevolats, nouveauBenevolat).map((b) => ({
      ...b,
      responsabilites: Array.isArray(b.responsabilites)
        ? b.responsabilites
        : [],
      realisations: Array.isArray(b.realisations) ? b.realisations : [],
      competences: Array.isArray(b.competences) ? b.competences : [],
    })),
    distinctions: liste(brut.distinctions, nouvelleDistinction),
    interets: Array.isArray(brut.interets) ? brut.interets.filter(Boolean) : [],
    preferences: {
      ...defaultPreferences(),
      ...(brut.preferences || {}),
    },
    documents: Array.isArray(brut.documents) ? brut.documents : [],
    syntheseIa: brut.syntheseIa ?? null,
  };
}

/** Taux de complétion global du CV structuré. */
export function completionCv(cv: CvStructure): number {
  const blocs = [
    Boolean(cv.titre || cv.accroche),
    Boolean(cv.email || cv.telephone),
    cv.experiences.length > 0,
    cv.formations.length > 0,
    cv.competences.length > 0,
    cv.langues.length > 0,
    cv.certifications.length > 0 || cv.projets.length > 0,
    cv.benevolats.length > 0 || (cv.distinctions && cv.distinctions.length > 0),
    cv.interets.length > 0,
  ];
  return Math.round((blocs.filter(Boolean).length / blocs.length) * 100);
}

/** Résumé texte enrichi utilisé par tous les moteurs IA (match, email, brief, interview...). */
export function cvStructureEnTexte(cv: CvStructure): string {
  const l: string[] = [];
  if (cv.titre) l.push(`Titre professionnel : ${cv.titre}`);
  if (cv.accroche) l.push(`Accroche / Profil : ${cv.accroche}`);
  if (cv.ville || cv.pays)
    l.push(`Localisation : ${[cv.ville, cv.pays].filter(Boolean).join(", ")}`);
  if (cv.permis) l.push(`Permis : ${cv.permis}`);

  if (cv.experiences.length > 0) {
    l.push("\n--- EXPÉRIENCES PROFESSIONNELLES ---");
    for (const e of cv.experiences) {
      const dates = `${e.debut}${e.enCours ? " → aujourd'hui" : e.fin ? ` → ${e.fin}` : ""}`;
      const missions =
        e.missions && e.missions.length
          ? ` Missions : ${e.missions.join(" ; ")}`
          : "";
      const real = e.realisations.length
        ? ` Réalisations : ${e.realisations.join(" ; ")}`
        : "";
      const kpis = e.kpi ? ` KPI / Impact : ${e.kpi}` : "";
      const cles = e.realisationsCles
        ? ` Réalisations clés : ${e.realisationsCles}`
        : "";
      const comp = e.competences.length
        ? ` Compétences : ${e.competences.join(", ")}`
        : "";
      const out =
        e.outils && e.outils.length ? ` Outils : ${e.outils.join(", ")}` : "";

      l.push(
        `• ${e.poste} chez ${e.entreprise} (${e.contrat}, ${dates}${e.lieu ? `, ${e.lieu}` : ""})\n  ${e.description}${missions}${real}${kpis}${cles}${comp}${out}`.trim(),
      );
    }
  }

  if (cv.formations.length > 0) {
    l.push("\n--- FORMATIONS & ÉTUDES ---");
    for (const f of cv.formations) {
      const dates = `${f.debut}${f.enCours ? " → en cours" : f.fin ? ` → ${f.fin}` : ""}`;
      const spec = f.specialisation
        ? ` Spécialisation : ${f.specialisation}.`
        : "";
      const ment = f.mention ? ` (${f.mention})` : "";
      const cours =
        f.coursImportants && f.coursImportants.length
          ? ` Cours clés : ${f.coursImportants.join(", ")}.`
          : "";
      const proj =
        f.projets && f.projets.length
          ? ` Projets : ${f.projets.join(", ")}.`
          : "";
      const res = f.resultats ? ` Distinctions : ${f.resultats}.` : "";

      l.push(
        `• ${f.diplome} — ${f.etablissement} (${dates}${f.lieu ? `, ${f.lieu}` : ""})${ment}\n  ${spec}${cours}${proj}${res} ${f.details}`.trim(),
      );
    }
  }

  if (cv.competences.length > 0) {
    l.push("\n--- COMPÉTENCES & OUTILS ---");
    const hards = cv.competences.filter(
      (c) => c.typeCategorie === "hard" || !c.typeCategorie,
    );
    const softs = cv.competences.filter((c) => c.typeCategorie === "soft");
    const outils = cv.competences.filter((c) => c.typeCategorie === "outil");
    const methodes = cv.competences.filter(
      (c) => c.typeCategorie === "methode",
    );

    if (hards.length)
      l.push(
        `Hard skills : ${hards.map((c) => `${c.nom} (${c.niveau})`).join(", ")}`,
      );
    if (softs.length)
      l.push(`Soft skills : ${softs.map((c) => `${c.nom}`).join(", ")}`);
    if (outils.length)
      l.push(
        `Outils & Logiciels : ${outils.map((c) => `${c.nom} (${c.niveau})`).join(", ")}`,
      );
    if (methodes.length)
      l.push(`Méthodologies : ${methodes.map((c) => `${c.nom}`).join(", ")}`);
  }

  if (cv.langues.length > 0) {
    l.push(
      `Langues : ${cv.langues.map((x) => `${x.nom} (${x.niveau}${x.certification ? ` - Certif: ${x.certification}${x.score ? ` ${x.score}` : ""}` : ""})`).join(", ")}`,
    );
  }

  if (cv.certifications.length > 0) {
    l.push("\n--- CERTIFICATIONS ---");
    for (const c of cv.certifications) {
      l.push(
        `• ${c.nom} (${c.organisme}, ${c.date}${c.identifiant ? `, ID: ${c.identifiant}` : ""}${c.lien ? ` - ${c.lien}` : ""})`,
      );
    }
  }

  if (cv.projets.length > 0) {
    l.push("\n--- PROJETS RÉALISÉS ---");
    for (const p of cv.projets) {
      const type = p.type ? ` [${p.type}]` : "";
      const tech =
        p.technologies && p.technologies.length
          ? ` Tech: ${p.technologies.join(", ")}`
          : "";
      const res = p.resultats ? ` Résultat: ${p.resultats}` : "";
      l.push(
        `• ${p.nom}${type} — Rôle : ${p.role} (${p.periode}). ${p.description}${tech}${res}${p.lien ? ` (Lien: ${p.lien})` : ""}`,
      );
    }
  }

  if (cv.benevolats.length > 0) {
    l.push("\n--- ASSOCIATIONS & ENGAGEMENTS ---");
    for (const b of cv.benevolats) {
      l.push(
        `• ${b.role} au sein de ${b.organisation} (${b.periode}). ${b.description}`,
      );
    }
  }

  if (cv.distinctions && cv.distinctions.length > 0) {
    l.push("\n--- DISTINCTIONS & RÉCOMPENSES ---");
    for (const d of cv.distinctions) {
      l.push(`• ${d.titre} (${d.organisme}, ${d.date}) : ${d.description}`);
    }
  }

  if (cv.interets.length > 0) {
    l.push(`Centres d'intérêt & Passions : ${cv.interets.join(", ")}`);
  }

  if (cv.syntheseIa) {
    l.push("\n--- SYNTHÈSE PROFIL IA (CAREERLY ORBIT) ---");
    l.push(`Pitch : ${cv.syntheseIa.pitchEntretien}`);
    if (cv.syntheseIa.forcesCles?.length)
      l.push(`Forces : ${cv.syntheseIa.forcesCles.join(" ; ")}`);
    if (cv.syntheseIa.typePosteIdeal)
      l.push(`Poste Idéal : ${cv.syntheseIa.typePosteIdeal}`);
  }

  return l.join("\n");
}
