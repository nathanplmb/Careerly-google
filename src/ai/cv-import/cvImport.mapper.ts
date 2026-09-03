import type { Profil } from "@/lib/profil";
import type {
  CvStructure,
  CvExperience,
  CvFormation,
  CvCompetence,
  CvLangue,
  CvCertification,
  CvProjet,
  CvBenevolat,
} from "@/lib/cv-structure";
import type { CvImportResult } from "./cvImport.types";

/**
 * Normalise une chaîne pour comparaison sans casse ni accents.
 */
function normalizeStr(val?: string | null): string {
  if (!val) return "";
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Fusionne fidèlement le résultat de l'extraction CV V4 avec le profil utilisateur existant.
 * - Conservation exhaustive de toutes les entités et de leurs détails riches.
 * - Respect des fonctions/périodes distinctes au sein d'une même organisation (aucun écrasement).
 * - Maintien des corrélations (langues, certifications, scores, attestations).
 * - Ne supprime jamais les informations existantes du profil.
 */
export function mergeCvImportWithProfil(
  result: CvImportResult,
  currentProfil?: Profil | null,
): Partial<Profil> {
  const existingCv: CvStructure = currentProfil?.cvStructure || {
    titre: "",
    accroche: "",
    email: "",
    telephone: "",
    linkedin: "",
    portfolio: "",
    github: "",
    permis: "",
    photoUrl: "",
    ville: "",
    pays: "France",
    experiences: [],
    formations: [],
    competences: [],
    langues: [],
    certifications: [],
    projets: [],
    interets: [],
    benevolats: [],
  };

  // 1. Identité & coordonnées
  const prenom = currentProfil?.prenom || result.identity.firstName || "";
  const nom = currentProfil?.nom || result.identity.lastName || "";
  const emailContact =
    currentProfil?.emailContact || result.identity.email || "";
  const telephone = currentProfil?.telephone || result.identity.phone || "";
  const localisation =
    currentProfil?.localisation ||
    (result.identity.city
      ? `${result.identity.city}${result.identity.postalCode ? ` (${result.identity.postalCode})` : ""}`
      : "");
  const titre =
    currentProfil?.titre ||
    result.identity.professionalTitle ||
    result.summary.headline ||
    "";
  const mobilite = currentProfil?.mobilite || result.identity.mobility || "";
  const permis = existingCv.permis || result.identity.drivingLicense || "";

  // 2. Expériences professionnelles (Exhaustivité garantie - multi-postes préservés)
  const existingExpKeys = new Set(
    (existingCv.experiences || []).map(
      (e) =>
        `${normalizeStr(e.poste)}_${normalizeStr(e.entreprise)}_${normalizeStr(e.debut || e.periode || "")}`,
    ),
  );

  const newExperiences: CvExperience[] = [];
  for (const exp of result.experiences) {
    const key = `${normalizeStr(exp.title)}_${normalizeStr(exp.company)}_${normalizeStr(exp.startDate || "")}`;
    if (!existingExpKeys.has(key)) {
      const allMissions = [
        ...(exp.missions || []),
        ...(exp.responsibilities || []),
      ];
      const uniqueMissions = Array.from(new Set(allMissions.filter(Boolean)));

      const allResults = [
        ...(exp.achievements || []),
        ...(exp.results || []),
        ...(exp.quantifiedResults || []),
      ];
      const uniqueResults = Array.from(new Set(allResults.filter(Boolean)));

      const isCurrent = Boolean(
        exp.isCurrent ||
        !exp.endDate ||
        exp.endDate.toLowerCase().includes("aujourd") ||
        exp.endDate.toLowerCase().includes("cours") ||
        exp.endDate.toLowerCase().includes("actuel"),
      );
      const cleanFin = isCurrent ? "" : exp.endDate || "";

      const missionsDescription =
        uniqueMissions.length > 0
          ? uniqueMissions
              .map((m) => (m.startsWith("•") ? m : `• ${m}`))
              .join("\n")
          : "";
      const finalDescription = exp.description
        ? missionsDescription && !exp.description.includes("•")
          ? `${exp.description}\n\n${missionsDescription}`
          : exp.description
        : missionsDescription;

      const kpiStr = uniqueResults.join(" • ");

      newExperiences.push({
        id: exp.id || Math.random().toString(36).slice(2, 10),
        poste: exp.title,
        entreprise: exp.company,
        lieu: exp.location || "",
        ville: exp.location || "",
        contrat: exp.contractType || "",
        typeContrat: exp.contractType || "",
        debut: exp.startDate || "",
        fin: cleanFin,
        periode: exp.startDate
          ? `${exp.startDate}${cleanFin ? ` - ${cleanFin}` : isCurrent ? " - Aujourd'hui" : ""}`
          : "",
        enCours: isCurrent,
        description: finalDescription,
        missions: uniqueMissions,
        responsabilites: uniqueMissions,
        realisations: uniqueResults,
        resultats: uniqueResults,
        quantifiedResults: exp.quantifiedResults || [],
        kpi: kpiStr || undefined,
        realisationsCles: kpiStr || undefined,
        competences: exp.skills || [],
        outils: exp.tools || [],
        sourceText: exp.sourceText || undefined,
      });
      existingExpKeys.add(key);
    }
  }
  const mergedExperiences = [
    ...(existingCv.experiences || []),
    ...newExperiences,
  ];

  // 3. Formations académiques
  const existingEduKeys = new Set(
    (existingCv.formations || []).map(
      (f) =>
        `${normalizeStr(f.diplome)}_${normalizeStr(f.etablissement)}_${normalizeStr(f.debut || "")}`,
    ),
  );

  const newFormations: CvFormation[] = [];
  for (const edu of result.education) {
    const key = `${normalizeStr(edu.degree)}_${normalizeStr(edu.school)}_${normalizeStr(edu.startDate || "")}`;
    if (!existingEduKeys.has(key)) {
      newFormations.push({
        id: edu.id || Math.random().toString(36).slice(2, 10),
        diplome: edu.degree,
        etablissement: edu.school,
        lieu: edu.location || "",
        specialisation: edu.specialization || undefined,
        parcours: edu.track || undefined,
        track: edu.track || undefined,
        mention: edu.grade || edu.honors || "",
        debut: edu.startDate || "",
        fin: edu.endDate || "",
        enCours: edu.isCurrent,
        coursImportants: edu.keyCourses || [],
        options: edu.options || [],
        details: edu.description || "",
        sourceText: edu.sourceText || undefined,
      });
      existingEduKeys.add(key);
    }
  }
  const mergedFormations = [...(existingCv.formations || []), ...newFormations];

  // 4. Compétences & Outils
  const existingSkillNames = new Set(
    (existingCv.competences || []).map((c) => normalizeStr(c.nom)),
  );

  const newCompetences: CvCompetence[] = [];

  // Compétences métier
  for (const s of result.skills) {
    const norm = normalizeStr(s.name);
    if (norm && !existingSkillNames.has(norm)) {
      newCompetences.push({
        id: s.id || Math.random().toString(36).slice(2, 10),
        nom: s.name,
        categorie: s.category || "Métier",
        typeCategorie: "hard",
        niveau: mapNiveau(s.level),
      });
      existingSkillNames.add(norm);
    }
  }

  // Outils logiciels
  for (const t of result.tools) {
    const norm = normalizeStr(t.name);
    if (norm && !existingSkillNames.has(norm)) {
      newCompetences.push({
        id: t.id || Math.random().toString(36).slice(2, 10),
        nom: t.name,
        categorie: t.category || "Outil",
        typeCategorie: "outil",
        niveau: mapNiveau(t.level),
      });
      existingSkillNames.add(norm);
    }
  }

  // Soft skills
  for (const ss of result.softSkills) {
    const norm = normalizeStr(ss.name);
    if (norm && !existingSkillNames.has(norm)) {
      newCompetences.push({
        id: ss.id || Math.random().toString(36).slice(2, 10),
        nom: ss.name,
        categorie: "Comportemental",
        typeCategorie: "soft",
        niveau: "Avancé",
      });
      existingSkillNames.add(norm);
    }
  }

  const mergedCompetences = [
    ...(existingCv.competences || []),
    ...newCompetences,
  ];

  // 5. Langues (avec préservation des corrélations et scores)
  const existingLangNames = new Set(
    (existingCv.langues || []).map((l) => normalizeStr(l.nom)),
  );

  const newLangues: CvLangue[] = [];
  for (const l of result.languages) {
    const norm = normalizeStr(l.name);
    if (norm && !existingLangNames.has(norm)) {
      newLangues.push({
        id: l.id || Math.random().toString(36).slice(2, 10),
        nom: l.name,
        niveau: mapNiveauLangue(l.level),
        certification: l.associatedCertification || "",
        score: l.score || undefined,
        attestation: l.attestation || undefined,
        certificationsAssociees: (l.certifications || []).map((c) => ({
          nom: c.name,
          score: c.score || undefined,
          niveau: c.level || undefined,
        })),
      });
      existingLangNames.add(norm);
    }
  }
  const mergedLangues = [...(existingCv.langues || []), ...newLangues];

  // 6. Certifications (TOEIC, TAGE MAGE, etc.)
  const existingCertNames = new Set(
    (existingCv.certifications || []).map((c) => normalizeStr(c.nom)),
  );

  const newCertifications: CvCertification[] = [];
  for (const c of result.certifications) {
    const norm = normalizeStr(c.name);
    if (norm && !existingCertNames.has(norm)) {
      newCertifications.push({
        id: c.id || Math.random().toString(36).slice(2, 10),
        nom: c.name,
        organisme: c.organization || c.issuer || "",
        date: c.date || "",
        score: c.score || undefined,
        niveau: c.level || undefined,
        langue: c.language || undefined,
        description: c.description || undefined,
        identifiant: c.credentialId || "",
        lien: "",
        sourceText: c.sourceText || undefined,
      });
      existingCertNames.add(norm);
    }
  }
  const mergedCertifications = [
    ...(existingCv.certifications || []),
    ...newCertifications,
  ];

  // 7. Projets (Objets riches)
  const existingProjNames = new Set(
    (existingCv.projets || []).map((p) => normalizeStr(p.nom)),
  );

  const newProjets: CvProjet[] = [];
  for (const p of result.projects) {
    const norm = normalizeStr(p.name);
    if (norm && !existingProjNames.has(norm)) {
      newProjets.push({
        id: p.id || Math.random().toString(36).slice(2, 10),
        nom: p.name,
        description: p.description,
        role: p.role || p.type || "Projet",
        type: p.type || "autre",
        contexte: p.context || undefined,
        periode:
          p.date ||
          (p.startDate
            ? `${p.startDate}${p.endDate ? ` - ${p.endDate}` : ""}`
            : ""),
        debut: p.startDate || "",
        fin: p.endDate || "",
        objectif: p.objective || undefined,
        missions: p.missions || p.responsibilities || [],
        responsabilites: p.responsibilities || p.missions || [],
        realisations: p.achievements || p.results || [],
        resultats: p.results || p.achievements || [],
        technologies: p.tools || [],
        outils: p.tools || [],
        competences: p.skills || [],
        collaborateurs: p.collaborators || [],
        lien: p.url || "",
        sourceText: p.sourceText || undefined,
      });
      existingProjNames.add(norm);
    }
  }
  const mergedProjets = [...(existingCv.projets || []), ...newProjets];

  // 8. Associations & Bénévolats (Rôles multiples préservés)
  const existingAssoKeys = new Set(
    (existingCv.benevolats || []).map(
      (b) =>
        `${normalizeStr(b.organisation)}_${normalizeStr(b.role)}_${normalizeStr(b.debut || b.periode || "")}`,
    ),
  );

  const newBenevolats: CvBenevolat[] = [];
  for (const a of result.associations) {
    const key = `${normalizeStr(a.organization)}_${normalizeStr(a.role)}_${normalizeStr(a.startDate || a.date || "")}`;
    if (!existingAssoKeys.has(key)) {
      newBenevolats.push({
        id: a.id || Math.random().toString(36).slice(2, 10),
        organisation: a.organization,
        role: a.role || "Bénévole",
        periode:
          a.date ||
          (a.startDate
            ? `${a.startDate}${a.endDate ? ` - ${a.endDate}` : a.isCurrent ? " - Aujourd'hui" : ""}`
            : ""),
        debut: a.startDate || a.date || "",
        fin: a.endDate || "",
        enCours: a.isCurrent,
        description: a.description || "",
        missions: a.missions || a.responsibilities || [],
        responsabilites: a.responsibilities || a.missions || [],
        realisations: a.achievements || a.results || [],
        resultats: a.results || a.achievements || [],
        equipe: a.teamSize || undefined,
        budget: a.budget || undefined,
        outils: a.tools || [],
        competences: a.skills || [],
        sourceText: a.sourceText || undefined,
      });
      existingAssoKeys.add(key);
    }
  }
  const mergedBenevolats = [...(existingCv.benevolats || []), ...newBenevolats];

  // 9. Centres d'intérêt
  const existingInterets = new Set(
    (existingCv.interets || []).map((i) => normalizeStr(i)),
  );

  const newInterets: string[] = [];
  const interetsDetailles: Array<{
    nom: string;
    categorie?: string;
    description?: string;
    sousThemes?: string[];
    details?: string;
    sourceText?: string;
  }> = existingCv.interetsDetailles || [];

  for (const i of result.interests) {
    const norm = normalizeStr(i.name);
    if (norm && !existingInterets.has(norm)) {
      const formattedLabel =
        i.subtopics && i.subtopics.length > 0
          ? `${i.name} (${i.subtopics.join(", ")})`
          : i.details
            ? `${i.name} (${i.details})`
            : i.name;
      newInterets.push(formattedLabel);
      existingInterets.add(norm);

      interetsDetailles.push({
        nom: i.name,
        categorie: i.category || undefined,
        description: i.description || undefined,
        sousThemes: i.subtopics || [],
        details: i.details || undefined,
        sourceText: i.sourceText || undefined,
      });
    }
  }
  const mergedInterets = [...(existingCv.interets || []), ...newInterets];

  // 10. Assemblage de la CvStructure complète
  const updatedCvStructure: CvStructure = {
    ...existingCv,
    titre: titre || existingCv.titre || "",
    accroche: result.summary.shortBio || existingCv.accroche || "",
    email: emailContact || existingCv.email || "",
    telephone: telephone || existingCv.telephone || "",
    ville: result.identity.city || existingCv.ville || "",
    pays: result.identity.country || existingCv.pays || "France",
    permis: permis || existingCv.permis || "",
    linkedin: result.identity.linkedin || existingCv.linkedin || "",
    portfolio: result.identity.portfolio || existingCv.portfolio || "",
    github: result.identity.github || existingCv.github || "",
    experiences: mergedExperiences,
    formations: mergedFormations,
    competences: mergedCompetences,
    langues: mergedLangues,
    certifications: mergedCertifications,
    projets: mergedProjets,
    benevolats: mergedBenevolats,
    interets: mergedInterets,
    interetsDetailles,
  };

  // Résumé textuel des compétences métier
  const hardSkillsStr = mergedCompetences
    .filter(
      (c) =>
        c.typeCategorie === "hard" ||
        c.categorie === "Métier" ||
        c.categorie === "Compétence" ||
        c.categorie === "Hard Skill",
    )
    .map((c) => c.nom)
    .join(", ");

  // Résumé textuel des outils logiciels
  const outilsStr = mergedCompetences
    .filter(
      (c) =>
        c.typeCategorie === "outil" ||
        c.categorie === "Outil" ||
        c.categorie === "Logiciel",
    )
    .map((c) => c.nom)
    .join(", ");

  // Résumé textuel des langues
  const languesStr = mergedLangues
    .map(
      (l) =>
        `${l.nom} (${l.niveau}${l.score ? ` - ${l.certification ? `${l.certification} ` : ""}${l.score}` : ""})`,
    )
    .join(", ");

  // Niveau d'anglais
  const anglaisObj = mergedLangues.find((l) => {
    const n = normalizeStr(l.nom);
    return n.includes("anglais") || n.includes("english");
  });
  const niveauAnglais =
    anglaisObj?.niveau ||
    result.languages.find((l) => normalizeStr(l.name).includes("anglais"))
      ?.level ||
    currentProfil?.niveauAnglais ||
    "B2";

  // Formation principale (la plus récente ou la plus avancée)
  const primaryFormation = mergedFormations[0];
  const formationTitle =
    primaryFormation?.diplome || currentProfil?.formation || "";
  const ecoleName =
    primaryFormation?.etablissement || currentProfil?.ecole || "";

  let niveauEtudes = currentProfil?.niveau || "";
  if (!niveauEtudes && primaryFormation?.diplome) {
    const d = primaryFormation.diplome.toLowerCase();
    if (
      d.includes("master") ||
      d.includes("ingénieur") ||
      d.includes("mba") ||
      d.includes("bac +5")
    ) {
      niveauEtudes = "Bac +5 (Master / Diplôme d'Ingénieur / Mastère)";
    } else if (
      d.includes("but") ||
      d.includes("licence") ||
      d.includes("bachelor") ||
      d.includes("bac +3")
    ) {
      niveauEtudes = "Bac +3 (Licence / BUT / Bachelor)";
    } else if (
      d.includes("bts") ||
      d.includes("dut") ||
      d.includes("deust") ||
      d.includes("bac +2")
    ) {
      niveauEtudes = "Bac +2 (BTS / DUT / CPGE)";
    } else if (d.includes("bac") || d.includes("lycée")) {
      niveauEtudes = "Baccalauréat";
    }
  }

  // Résumé textuel des expériences pour compatibilité
  const experiencesResume = mergedExperiences
    .map(
      (e) => `${e.poste} chez ${e.entreprise} (${e.periode || e.debut || ""})`,
    )
    .join(" ; ");

  return {
    prenom,
    nom,
    emailContact,
    telephone,
    localisation,
    pays: result.identity.country || currentProfil?.pays || "France",
    titre,
    mobilite,
    permis,
    formation: formationTitle,
    ecole: ecoleName,
    niveau:
      niveauEtudes ||
      currentProfil?.niveau ||
      "Bac +3 (Licence / BUT / Bachelor)",
    competences: hardSkillsStr || currentProfil?.competences || "",
    logiciels: outilsStr || currentProfil?.logiciels || "",
    langues: languesStr || currentProfil?.langues || "",
    niveauAnglais:
      (niveauAnglais as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Bilingue") ||
      currentProfil?.niveauAnglais ||
      "B2",
    experiences: experiencesResume || currentProfil?.experiences || "",
    cvStructure: updatedCvStructure,
  };
}

export function mapExtractedCVToProfile(
  result: CvImportResult,
  currentProfil?: Profil | null,
): Profil {
  const patch = mergeCvImportWithProfil(result, currentProfil);
  const base = currentProfil || emptyProfil();
  return {
    ...base,
    ...patch,
    cvStructure: normaliserCvStructure(patch.cvStructure || base.cvStructure),
  };
}

function mapNiveau(
  level?: string | null,
): "Notions" | "Débutant" | "Intermédiaire" | "Avancé" | "Expert" {
  if (!level) return "Intermédiaire";
  const l = level.toLowerCase();
  if (l.includes("notion")) return "Notions";
  if (l.includes("débutant") || l.includes("debutant")) return "Débutant";
  if (l.includes("expert")) return "Expert";
  if (l.includes("avancé") || l.includes("avance")) return "Avancé";
  return "Intermédiaire";
}

function mapNiveauLangue(
  level?: string | null,
): "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Langue maternelle" {
  if (!level) return "B2";
  const l = level.toLowerCase();
  if (l.includes("maternelle") || l.includes("natif"))
    return "Langue maternelle";
  if (l.includes("c2")) return "C2";
  if (l.includes("c1") || l.includes("courant")) return "C1";
  if (l.includes("b2")) return "B2";
  if (l.includes("b1")) return "B1";
  if (l.includes("a2")) return "A2";
  if (l.includes("a1") || l.includes("notions") || l.includes("débutant"))
    return "A1";
  return "B2";
}
