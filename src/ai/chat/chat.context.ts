import type { Profil } from "@/lib/profil";

export interface NormalizedCandidateContext {
  name?: string;
  titreVise?: string;
  competences: string[];
  secteur?: string;
  formation?: string;
  experiences?: string;
  langues: string[];
  localisation?: string;
  contrats?: string;
  remuneration?: string;
  objectifs?: string;
}

/**
 * Normalise une chaîne ou un tableau de compétences en une liste propre de strings.
 * - Si tableau : conserve et nettoie les éléments
 * - Si tableau d'objets ({ nom, name }) : extrait les noms
 * - Si string : découpe par virgules, points-virgules ou sauts de ligne
 * - Si vide / null / undefined : retourne []
 */
export function normalizeStringArray(raw: unknown): string[] {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    const result: string[] = [];
    for (const item of raw) {
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (trimmed && !result.includes(trimmed)) {
          result.push(trimmed);
        }
      } else if (item && typeof item === "object") {
        const itemObj = item as Record<string, unknown>;
        const nameVal = itemObj.nom || itemObj.name || itemObj.label || itemObj.title;
        if (typeof nameVal === "string") {
          const trimmed = nameVal.trim();
          if (trimmed && !result.includes(trimmed)) {
            result.push(trimmed);
          }
        }
      }
    }
    return result;
  }

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    
    // Découpage multi-délimiteurs : virgules, points-virgules, retours à la ligne, puces
    const tokens = trimmed
      .split(/[,;\n\r•·|]+/)
      .map((t) => t.trim().replace(/^[-*•\s]+/, ""))
      .filter((t) => t.length > 0);

    // Déduplication
    const unique: string[] = [];
    for (const t of tokens) {
      if (!unique.includes(t)) {
        unique.push(t);
      }
    }
    return unique;
  }

  return [];
}

/**
 * Normalise les langues d'un profil (tableau ou string ou tableau d'objets LangueCV)
 */
export function normalizeLanguesArray(raw: unknown): string[] {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    const result: string[] = [];
    for (const item of raw) {
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (trimmed && !result.includes(trimmed)) {
          result.push(trimmed);
        }
      } else if (item && typeof item === "object") {
        const langObj = item as Record<string, unknown>;
        const nom = typeof langObj.nom === "string" ? langObj.nom.trim() : "";
        const niveau = typeof langObj.niveau === "string" ? langObj.niveau.trim() : "";
        if (nom) {
          const label = niveau ? `${nom} (${niveau})` : nom;
          if (!result.includes(label)) {
            result.push(label);
          }
        }
      }
    }
    return result;
  }

  if (typeof raw === "string") {
    return normalizeStringArray(raw);
  }

  return [];
}

/**
 * Fonction centrale de normalisation du contexte candidat.
 * Garantit que TOUS les champs respectent strictement le contrat Zod et l'API Gemini :
 * - `competences` est TOUJOURS un tableau (`Array.isArray() === true`)
 * - `langues` est TOUJOURS un tableau (`Array.isArray() === true`)
 * - Aucun `null` ni `undefined` dans les listes
 * - Ne fabrique AUCUNE fausse donnée (change le format, pas le contenu).
 */
export function normalizeCandidateContext(raw: unknown): NormalizedCandidateContext | undefined {
  if (!raw || typeof raw !== "object") {
    return undefined;
  }

  const rawObj = raw as Record<string, unknown>;

  const competences = normalizeStringArray(rawObj.competences);
  const langues = normalizeLanguesArray(rawObj.langues);

  const name =
    typeof rawObj.name === "string" && rawObj.name.trim().length > 0
      ? rawObj.name.trim()
      : undefined;

  const titreVise =
    typeof rawObj.titreVise === "string" && rawObj.titreVise.trim().length > 0
      ? rawObj.titreVise.trim()
      : typeof rawObj.titre === "string" && rawObj.titre.trim().length > 0
        ? rawObj.titre.trim()
        : undefined;

  const secteur =
    typeof rawObj.secteur === "string" && rawObj.secteur.trim().length > 0
      ? rawObj.secteur.trim()
      : typeof rawObj.domaines === "string" && rawObj.domaines.trim().length > 0
        ? rawObj.domaines.trim()
        : undefined;

  const formation =
    typeof rawObj.formation === "string" && rawObj.formation.trim().length > 0
      ? rawObj.formation.trim()
      : undefined;

  const experiences =
    typeof rawObj.experiences === "string" && rawObj.experiences.trim().length > 0
      ? rawObj.experiences.trim()
      : undefined;

  const localisation =
    typeof rawObj.localisation === "string" && rawObj.localisation.trim().length > 0
      ? rawObj.localisation.trim()
      : undefined;

  const contrats =
    typeof rawObj.contrats === "string" && rawObj.contrats.trim().length > 0
      ? rawObj.contrats.trim()
      : undefined;

  const remuneration =
    typeof rawObj.remuneration === "string" && rawObj.remuneration.trim().length > 0
      ? rawObj.remuneration.trim()
      : undefined;

  const objectifs =
    typeof rawObj.objectifs === "string" && rawObj.objectifs.trim().length > 0
      ? rawObj.objectifs.trim()
      : typeof rawObj.rechercheVraie === "string" && rawObj.rechercheVraie.trim().length > 0
        ? rawObj.rechercheVraie.trim()
        : undefined;

  // Si le contexte est totalement vide, on retourne un contexte normalisé vide ou undefined
  const hasData =
    name ||
    titreVise ||
    competences.length > 0 ||
    secteur ||
    formation ||
    experiences ||
    langues.length > 0 ||
    localisation ||
    contrats ||
    remuneration ||
    objectifs;

  if (!hasData) {
    return undefined;
  }

  return {
    name,
    titreVise,
    competences,
    secteur,
    formation,
    experiences,
    langues,
    localisation,
    contrats,
    remuneration,
    objectifs,
  };
}

/**
 * Construit un contexte candidat propre et complet depuis le modèle de Profil utilisateur.
 */
export function buildCandidateContextFromProfil(
  profil: Profil | null | undefined,
): NormalizedCandidateContext | undefined {
  if (!profil) return undefined;

  // 1. Nom complet
  const name =
    [profil.prenom, profil.nom].filter(Boolean).join(" ").trim() || undefined;

  // 2. Titre / Métier visé
  const titreVise =
    profil.titre?.trim() ||
    profil.metiers?.trim() ||
    profil.cvStructure?.titre?.trim() ||
    undefined;

  // 3. Compétences : fusion propre profil textuel + cvStructure compétences structurées
  const skillsList: string[] = [];
  if (profil.competences) {
    skillsList.push(...normalizeStringArray(profil.competences));
  }
  if (profil.logiciels) {
    skillsList.push(...normalizeStringArray(profil.logiciels));
  }
  if (profil.cvStructure?.competences?.length) {
    skillsList.push(...normalizeStringArray(profil.cvStructure.competences));
  }
  const uniqueCompetences = Array.from(new Set(skillsList.filter(Boolean)));

  // 4. Secteur / Domaines
  const secteur =
    profil.domaines?.trim() ||
    (typeof profil.criteres?.secteur === "string" ? profil.criteres.secteur : undefined) ||
    profil.entreprisesCiblees?.trim() ||
    undefined;

  // 5. Formation
  const formationParts: string[] = [];
  if (profil.formation) formationParts.push(profil.formation.trim());
  if (profil.ecole) formationParts.push(`à ${profil.ecole.trim()}`);
  if (profil.niveau) formationParts.push(`(${profil.niveau.trim()})`);
  const formation =
    formationParts.length > 0
      ? formationParts.join(" ")
      : profil.cvStructure?.formations?.[0]?.diplome
        ? `${profil.cvStructure.formations[0].diplome} - ${profil.cvStructure.formations[0].etablissement || ""}`.trim()
        : undefined;

  // 6. Expériences
  let experiences = profil.experiences?.trim() || undefined;
  if (!experiences && profil.cvStructure?.experiences?.length) {
    experiences = profil.cvStructure.experiences
      .slice(0, 3)
      .map(
        (e) =>
          `${e.poste || "Poste"} chez ${e.entreprise || "Entreprise"} (${e.debut || ""} - ${e.enCours ? "En cours" : e.fin || ""})`,
      )
      .join(" ; ");
  }

  // 7. Langues
  const languesList: string[] = [];
  if (profil.langues) {
    languesList.push(...normalizeStringArray(profil.langues));
  }
  if (profil.niveauAnglais) {
    languesList.push(`Anglais: ${profil.niveauAnglais.trim()}`);
  }
  if (profil.cvStructure?.langues?.length) {
    languesList.push(...normalizeLanguesArray(profil.cvStructure.langues));
  }
  const uniqueLangues = Array.from(new Set(languesList.filter(Boolean)));

  // 8. Localisation & Mobilité
  const localisation =
    [profil.localisation, profil.pays, profil.mobilite ? `(Mobilité: ${profil.mobilite})` : ""]
      .filter(Boolean)
      .join(" ")
      .trim() || undefined;

  // 9. Contrats & Mode de travail
  const contrats =
    [profil.contrats, profil.modeTravail || profil.teletravail]
      .filter(Boolean)
      .join(" - ")
      .trim() || undefined;

  // 10. Rémunération
  const remuneration = profil.remuneration?.trim() || undefined;

  // 11. Objectifs & Recherche
  const objectifs =
    profil.rechercheVraie?.trim() ||
    (profil.prioritesRecherche?.length
      ? profil.prioritesRecherche.join(", ")
      : undefined);

  return normalizeCandidateContext({
    name,
    titreVise,
    competences: uniqueCompetences,
    secteur,
    formation,
    experiences,
    langues: uniqueLangues,
    localisation,
    contrats,
    remuneration,
    objectifs,
  });
}
