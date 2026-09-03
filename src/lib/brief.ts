/** Daily Brief — faits calculés côté app (jamais inventés par l'IA). */
import {
  addDays,
  daysBetween,
  todayIso,
  type Candidature,
} from "./candidatures";

export const ACTIONS_BRIEF = [
  "relancer",
  "postuler",
  "ouvrir",
  "voir_offre",
  "analyser",
] as const;
export type ActionBrief = (typeof ACTIONS_BRIEF)[number];

export const CATEGORIES_BRIEF = [
  "urgent",
  "relance",
  "entretien",
  "deadline",
  "opportunite",
  "finaliser",
] as const;
export type CategorieBrief = (typeof CATEGORIES_BRIEF)[number];

export type FaitBrief = {
  id: string;
  entreprise: string;
  poste: string;
  statut: string;
  categorie: CategorieBrief;
  /** Fait objectif, formulé par l'app à partir des données de la base. */
  fait: string;
  action: ActionBrief;
  match?: number | null;
  lien: boolean;
};

export type ElementBrief = {
  id: string;
  categorie: CategorieBrief;
  titre: string;
  raison: string;
  action: ActionBrief;
};

export type Brief = {
  resume: string;
  elements: ElementBrief[];
  recommandations: string[];
  genereLe: string;
  /** true si l'IA n'a pas pu être utilisée : brief factuel de repli. */
  repli?: boolean;
};

const label = (c: Candidature) =>
  `${c.entreprise || "Entreprise sans nom"} — ${c.poste || "poste non précisé"}`;

/** Construit la liste des faits du jour à partir des candidatures. */
export function faitsDuJour(
  items: Candidature[],
  aujourdhui = todayIso(),
): FaitBrief[] {
  const faits: FaitBrief[] = [];
  const dans7 = addDays(aujourdhui, 7);

  for (const c of items) {
    if (c.archive) continue;
    const base = {
      id: c.id,
      entreprise: c.entreprise,
      poste: c.poste,
      statut: c.statut,
      lien: Boolean(c.lien),
    };

    // Deadline de candidature imminente ou dépassée
    if (c.dateLimite && c.statut === "À candidater") {
      const reste = daysBetween(aujourdhui, c.dateLimite);
      if (reste !== null && reste < 0) {
        faits.push({
          ...base,
          categorie: "urgent",
          fait: `Date limite dépassée depuis ${Math.abs(reste)} j (${c.dateLimite}) chez ${label(c)}.`,
          action: "ouvrir",
        });
      } else if (c.dateLimite <= dans7) {
        faits.push({
          ...base,
          categorie: "deadline",
          fait: `Date limite de candidature le ${c.dateLimite} (dans ${reste} j) chez ${label(c)}.`,
          action: "postuler",
        });
      }
    }

    // Relance due
    if (
      c.statut === "Candidature envoyée" &&
      c.dateRelance &&
      c.dateRelance <= aujourdhui
    ) {
      const depuis = c.dateEnvoi ? daysBetween(c.dateEnvoi, aujourdhui) : null;
      faits.push({
        ...base,
        categorie: "relance",
        fait: `Relance prévue le ${c.dateRelance}${
          depuis !== null ? `, candidature envoyée il y a ${depuis} j` : ""
        } chez ${label(c)}.`,
        action: "relancer",
      });
    }

    // Entretien en cours
    if (c.statut === "Entretien") {
      faits.push({
        ...base,
        categorie: "entretien",
        fait: `Entretien en cours chez ${label(c)}${
          c.dateDernierContact
            ? ` (dernier contact le ${c.dateDernierContact})`
            : ""
        }.`,
        action: "ouvrir",
      });
    }

    // Candidature à finaliser (informations manquantes)
    if (c.statut === "À candidater") {
      const manques: string[] = [];
      if (!c.detail.trim()) manques.push("détail de l'offre");
      if (!c.lien.trim()) manques.push("lien de l'offre");
      if (!c.contact.trim()) manques.push("contact");
      if (manques.length > 0) {
        faits.push({
          ...base,
          categorie: "finaliser",
          fait: `Fiche incomplète chez ${label(c)} : ${manques.join(", ")} manquant(s).`,
          action: "ouvrir",
        });
      }
    }
  }

  const ordre: CategorieBrief[] = [
    "urgent",
    "deadline",
    "relance",
    "entretien",
    "opportunite",
    "finaliser",
  ];
  return faits.sort(
    (a, b) => ordre.indexOf(a.categorie) - ordre.indexOf(b.categorie),
  );
}

/** Brief factuel sans IA (repli honnête si l'IA échoue). */
export function briefDeRepli(faits: FaitBrief[]): Brief {
  const elements = faits.slice(0, 8).map((f) => ({
    id: f.id,
    categorie: f.categorie,
    titre: `${f.entreprise || "Candidature"} — ${titreAction(f.action)}`,
    raison: f.fait,
    action: f.action,
  }));
  return {
    resume: elements.length
      ? `${elements.length} action${elements.length > 1 ? "s" : ""} à traiter aujourd'hui.`
      : "Rien d'urgent aujourd'hui.",
    elements,
    recommandations: [],
    genereLe: new Date().toISOString(),
    repli: true,
  };
}

export function titreAction(a: ActionBrief): string {
  switch (a) {
    case "relancer":
      return "relancer";
    case "postuler":
      return "postuler";
    case "analyser":
      return "analyser avec l'IA";
    case "voir_offre":
      return "consulter l'offre";
    default:
      return "compléter la fiche";
  }
}

export const LIBELLES_CATEGORIE: Record<CategorieBrief, string> = {
  urgent: "Urgent",
  deadline: "Deadline",
  relance: "Relance",
  entretien: "Entretien",
  opportunite: "Opportunité",
  finaliser: "À finaliser",
};

const CLE = "careerly-daily-brief-v1";
const CLE_AUTO = "careerly-daily-brief-auto";

type BriefCache = { brief: Brief; hash: string };

/** Empreinte des faits du jour : tant qu'elle ne change pas, on réutilise le brief. */
export function hashFaits(faits: FaitBrief[]): string {
  const t = faits
    .map((f) => `${f.id}|${f.categorie}|${f.statut}|${f.fait}`)
    .sort()
    .join("\n");
  let h = 5381;
  for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/**
 * Renvoie le brief en cache s'il correspond exactement aux faits actuels,
 * quelle que soit sa date : rien n'a changé, inutile de rappeler l'IA.
 */
export function chargerBriefCache(hash: string): Brief | null {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;
    const c = JSON.parse(brut) as BriefCache | Brief;
    const cache: BriefCache =
      "brief" in (c as BriefCache)
        ? (c as BriefCache)
        : { brief: c as Brief, hash: "" };
    if (!cache.brief?.genereLe) return null;
    if (cache.hash && cache.hash === hash) return cache.brief;
    // Ancien format ou faits modifiés : on garde l'affichage du jour sans régénérer.
    if (cache.brief.genereLe.slice(0, 10) === todayIso()) return cache.brief;
    return null;
  } catch {
    return null;
  }
}

export function sauverBriefCache(b: Brief, hash: string) {
  try {
    window.localStorage.setItem(
      CLE,
      JSON.stringify({ brief: b, hash } satisfies BriefCache),
    );
  } catch {
    /* stockage indisponible */
  }
}

/** Une seule génération automatique par jour, même en cas d'échec. */
export function autoDejaTente(): boolean {
  try {
    return window.localStorage.getItem(CLE_AUTO) === todayIso();
  } catch {
    return true;
  }
}

export function marquerAutoTente() {
  try {
    window.localStorage.setItem(CLE_AUTO, todayIso());
  } catch {
    /* stockage indisponible */
  }
}
