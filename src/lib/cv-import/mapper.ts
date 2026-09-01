import type { Profil } from "../profil";
import type {
  CvExperience,
  CvFormation,
  CvProjet,
  CvCertification,
  CvLangue,
  CvStructure,
} from "../cv-structure";
import type {
  CVImportResult,
  ProfileDiff,
  DiffItem,
  ExperienceEntity,
  EducationEntity,
  SkillEntity,
  LanguageEntity,
  CertificationEntity,
  ProjectEntity,
  InterestEntity,
} from "./types";

export function computeProfileDiff(
  imported: CVImportResult,
  existingProfil?: Profil | null,
): ProfileDiff {
  const existingCv = existingProfil?.cv?.structure;

  // 1. Expériences
  const existingExps = existingCv?.experiences || [];
  const experiencesDiff: DiffItem<ExperienceEntity>[] = imported.experiences.map(
    (imp) => {
      const match = existingExps.find(
        (e) =>
          normalizeStr(e.poste) === normalizeStr(imp.title) &&
          normalizeStr(e.entreprise) === normalizeStr(imp.company),
      );
      if (!match) {
        return {
          entityType: "experience",
          status: "new",
          imported: imp,
          description: `${imp.title} chez ${imp.company} (${imp.startDate || "Date non précisée"} → ${imp.endDate || (imp.isCurrent ? "Actuellement" : "")})`,
          selected: true,
        };
      }
      return {
        entityType: "experience",
        status: "identical",
        imported: imp,
        existing: {
          id: match.id,
          title: match.poste,
          company: match.entreprise,
          location: match.lieu || null,
          contractType: match.typeContrat || null,
          startDate: match.debut || null,
          endDate: match.fin || null,
          isCurrent: match.enCours,
          responsibilities: match.missions || [],
          achievements: match.realisations || [],
        },
        description: `${imp.title} chez ${imp.company} (Déjà présent)`,
        selected: false,
      };
    },
  );

  // 2. Formations
  const existingEdu = existingCv?.formations || [];
  const educationDiff: DiffItem<EducationEntity>[] = imported.education.map(
    (imp) => {
      const match = existingEdu.find(
        (e) =>
          normalizeStr(e.diplome) === normalizeStr(imp.degree) &&
          normalizeStr(e.etablissement) === normalizeStr(imp.school),
      );
      if (!match) {
        return {
          entityType: "education",
          status: "new",
          imported: imp,
          description: `${imp.degree} — ${imp.school}`,
          selected: true,
        };
      }
      return {
        entityType: "education",
        status: "identical",
        imported: imp,
        existing: {
          id: match.id,
          school: match.etablissement,
          location: match.lieu || null,
          degree: match.diplome,
          specialization: match.domaine || null,
          mention: null,
          startDate: match.debut || null,
          endDate: match.fin || null,
        },
        description: `${imp.degree} — ${imp.school} (Déjà présent)`,
        selected: false,
      };
    },
  );

  // 3. Compétences
  const existingSkills = new Set(
    (existingCv?.competences || []).map((c) => normalizeStr(c.nom)),
  );
  const skillsDiff: DiffItem<SkillEntity>[] = imported.skills.map((imp) => {
    const isPresent = existingSkills.has(normalizeStr(imp.name));
    return {
      entityType: "skill",
      status: isPresent ? "identical" : "new",
      imported: imp,
      description: imp.name,
      selected: !isPresent,
    };
  });

  // 4. Langues
  const existingLangs = new Set(
    (existingCv?.langues || []).map((l) => normalizeStr(l.nom)),
  );
  const languagesDiff: DiffItem<LanguageEntity>[] = imported.languages.map((imp) => {
    const isPresent = existingLangs.has(normalizeStr(imp.name));
    return {
      entityType: "language",
      status: isPresent ? "identical" : "new",
      imported: imp,
      description: `${imp.name}${imp.level ? ` (${imp.level})` : ""}`,
      selected: !isPresent,
    };
  });

  // 5. Certifications
  const existingCerts = new Set(
    (existingCv?.certifications || []).map((c) => normalizeStr(c.nom)),
  );
  const certificationsDiff: DiffItem<CertificationEntity>[] =
    imported.certifications.map((imp) => {
      const isPresent = existingCerts.has(normalizeStr(imp.name));
      return {
        entityType: "certification",
        status: isPresent ? "identical" : "new",
        imported: imp,
        description: `${imp.name}${imp.score ? ` — Score : ${imp.score}` : ""}`,
        selected: !isPresent,
      };
    });

  // 6. Projets
  const existingProjs = new Set(
    (existingCv?.projets || []).map((p) => normalizeStr(p.nom)),
  );
  const projectsDiff: DiffItem<ProjectEntity>[] = imported.projects.map((imp) => {
    const isPresent = existingProjs.has(normalizeStr(imp.name));
    return {
      entityType: "project",
      status: isPresent ? "identical" : "new",
      imported: imp,
      description: imp.name,
      selected: !isPresent,
    };
  });

  // 7. Intérêts
  const existingInterests = new Set(
    (existingCv?.interets || []).map((i) => normalizeStr(i)),
  );
  const interestsDiff: DiffItem<InterestEntity>[] = imported.interests.map((imp) => {
    const isPresent = existingInterests.has(normalizeStr(imp.name));
    return {
      entityType: "interest",
      status: isPresent ? "identical" : "new",
      imported: imp,
      description: imp.name,
      selected: !isPresent,
    };
  });

  // 8. Identité
  const identityChangedFields = [
    {
      field: "prenom",
      label: "Prénom",
      imported: imported.identity.firstName || null,
      existing: existingProfil?.prenom || null,
      selected: !existingProfil?.prenom && !!imported.identity.firstName,
    },
    {
      field: "nom",
      label: "Nom",
      imported: imported.identity.lastName || null,
      existing: existingProfil?.nom || null,
      selected: !existingProfil?.nom && !!imported.identity.lastName,
    },
    {
      field: "email",
      label: "Email",
      imported: imported.identity.email || null,
      existing: existingProfil?.email || null,
      selected: !existingProfil?.email && !!imported.identity.email,
    },
    {
      field: "telephone",
      label: "Téléphone",
      imported: imported.identity.phone || null,
      existing: existingProfil?.telephone || null,
      selected: !existingProfil?.telephone && !!imported.identity.phone,
    },
    {
      field: "ville",
      label: "Ville de résidence",
      imported: imported.identity.city || null,
      existing: existingProfil?.ville || null,
      selected: !existingProfil?.ville && !!imported.identity.city,
    },
    {
      field: "titreProfessionnel",
      label: "Titre du profil",
      imported: imported.identity.professionalTitle || null,
      existing: existingProfil?.titreProfessionnel || null,
      selected:
        !existingProfil?.titreProfessionnel &&
        !!imported.identity.professionalTitle,
    },
  ].filter((f) => f.imported !== null && f.imported !== f.existing);

  return {
    experiences: experiencesDiff,
    education: educationDiff,
    skills: skillsDiff,
    languages: languagesDiff,
    certifications: certificationsDiff,
    projects: projectsDiff,
    interests: interestsDiff,
    identityChangedFields,
  };
}

export function mapImportResultToProfilePatch(
  imported: CVImportResult,
  selectedDiff?: ProfileDiff,
): Partial<Profil> {
  const patch: Partial<Profil> = {};

  // 1. Identité
  if (selectedDiff) {
    for (const f of selectedDiff.identityChangedFields) {
      if (f.selected && f.imported) {
        if (f.field === "prenom") patch.prenom = f.imported;
        if (f.field === "nom") patch.nom = f.imported;
        if (f.field === "email") patch.email = f.imported;
        if (f.field === "telephone") patch.telephone = f.imported;
        if (f.field === "ville") patch.ville = f.imported;
        if (f.field === "titreProfessionnel")
          patch.titreProfessionnel = f.imported;
      }
    }
  } else {
    if (imported.identity.firstName) patch.prenom = imported.identity.firstName;
    if (imported.identity.lastName) patch.nom = imported.identity.lastName;
    if (imported.identity.email) patch.email = imported.identity.email;
    if (imported.identity.phone) patch.telephone = imported.identity.phone;
    if (imported.identity.city) patch.ville = imported.identity.city;
    if (imported.identity.professionalTitle)
      patch.titreProfessionnel = imported.identity.professionalTitle;
  }

  // 2. Expériences
  const targetExperiences = selectedDiff
    ? selectedDiff.experiences
        .filter((d) => d.selected)
        .map((d) => d.imported)
    : imported.experiences;

  const cvExperiences: CvExperience[] = targetExperiences.map((exp) => ({
    id: exp.id || Math.random().toString(36).slice(2, 10),
    poste: exp.title,
    entreprise: exp.company,
    lieu: exp.location || undefined,
    typeContrat: (exp.contractType as CvExperience["typeContrat"]) || undefined,
    debut: exp.startDate || "",
    fin: exp.endDate || "",
    enCours: exp.isCurrent,
    missions: exp.responsibilities || [],
    realisations: exp.achievements || [],
    competences: exp.tools || [],
  }));

  // 3. Formations
  const targetEdu = selectedDiff
    ? selectedDiff.education.filter((d) => d.selected).map((d) => d.imported)
    : imported.education;

  const cvFormations: CvFormation[] = targetEdu.map((edu) => ({
    id: edu.id || Math.random().toString(36).slice(2, 10),
    diplome: edu.degree,
    etablissement: edu.school,
    lieu: edu.location || undefined,
    domaine: edu.specialization || undefined,
    debut: edu.startDate || "",
    fin: edu.endDate || "",
    enCours: edu.isCurrent || false,
    cours: edu.courses || [],
  }));

  // 4. Compétences
  const targetSkills = selectedDiff
    ? selectedDiff.skills.filter((d) => d.selected).map((d) => d.imported)
    : imported.skills;

  const cvCompetences = targetSkills.map((s) => ({
    nom: s.name,
    categorie: s.category,
    niveau: s.level ? mapNiveauCompetence(s.level) : undefined,
  }));

  // 5. Langues
  const targetLanguages = selectedDiff
    ? selectedDiff.languages.filter((d) => d.selected).map((d) => d.imported)
    : imported.languages;

  const cvLangues: CvLangue[] = targetLanguages.map((l) => ({
    nom: l.name,
    niveau: l.level || "Non précisé",
  }));

  // 6. Certifications
  const targetCerts = selectedDiff
    ? selectedDiff.certifications
        .filter((d) => d.selected)
        .map((d) => d.imported)
    : imported.certifications;

  const cvCertifications: CvCertification[] = targetCerts.map((c) => ({
    id: c.id || Math.random().toString(36).slice(2, 10),
    nom: c.name,
    organisme: c.organization || undefined,
    annee: c.date || undefined,
    score: c.score || undefined,
  }));

  // 7. Projets
  const targetProjs = selectedDiff
    ? selectedDiff.projects.filter((d) => d.selected).map((d) => d.imported)
    : imported.projects;

  const cvProjets: CvProjet[] = targetProjs.map((p) => ({
    id: p.id || Math.random().toString(36).slice(2, 10),
    nom: p.name,
    description: p.description,
    role: p.type || undefined,
    organisation: p.organization || undefined,
    annee: p.date || undefined,
    technologies: p.technologies || [],
  }));

  // 8. Intérêts
  const targetInterests = selectedDiff
    ? selectedDiff.interests.filter((d) => d.selected).map((d) => d.imported)
    : imported.interests;

  const cvInterets = targetInterests.map((i) => i.name);

  // Construction de la CvStructure
  const cvStructure: CvStructure = {
    titre: imported.identity.professionalTitle || undefined,
    resume: imported.identity.summary || undefined,
    experiences: cvExperiences,
    formations: cvFormations,
    competences: cvCompetences,
    langues: cvLangues,
    certifications: cvCertifications,
    projets: cvProjets,
    interets: cvInterets,
    benevolat: imported.engagements.map((e) => ({
      id: e.id,
      organisation: e.organization,
      role: e.role,
      debut: e.date || "",
      fin: "",
      enCours: false,
      description: e.description,
    })),
  };

  patch.cv = {
    texteBrut: `${imported.identity.firstName} ${imported.identity.lastName}\n${imported.document.fileName}`,
    dateMaj: new Date().toISOString(),
    nomFichier: imported.document.fileName,
    structure: cvStructure,
  };

  return patch;
}

function normalizeStr(str?: string | null): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function mapNiveauCompetence(
  level: string,
): "notions" | "intermediaire" | "avance" | "expert" | undefined {
  const l = level.toLowerCase();
  if (l.includes("notion") || l.includes("débutant")) return "notions";
  if (l.includes("intermédiaire")) return "intermediaire";
  if (l.includes("avancé")) return "avance";
  if (l.includes("expert")) return "expert";
  return undefined;
}
