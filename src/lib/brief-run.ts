/** Orchestration client du Daily Brief : faits app -> IA -> brief validé. */
import { genererBrief } from "./brief.functions";
import { profilEnTexte } from "./match-run";
import {
  briefDeRepli,
  faitsDuJour,
  type Brief,
  type ElementBrief,
  type FaitBrief,
} from "./brief";
import type { Candidature } from "./candidatures";
import type { Profil } from "./profil";

function faitsEnTexte(faits: FaitBrief[]): string {
  return faits
    .map(
      (f, i) =>
        `${i + 1}. id=${f.id} | catégorie=${f.categorie} | statut=${f.statut}` +
        `${f.match !== null ? ` | match=${f.match}%` : ""}\n   ${f.fait}`,
    )
    .join("\n");
}

export async function lancerBrief(
  items: Candidature[],
  profil: Profil | null,
): Promise<Brief> {
  const faits = faitsDuJour(items);
  if (faits.length === 0) {
    return {
      resume:
        "Aucune action urgente aujourd'hui. Profitez-en pour repérer de nouvelles offres.",
      elements: [],
      recommandations: [],
      genereLe: new Date().toISOString(),
    };
  }

  let ia: Awaited<ReturnType<typeof genererBrief>>;
  try {
    ia = await genererBrief({
      data: {
        faits: faitsEnTexte(faits),
        profil: profil ? profilEnTexte(profil) : "",
      },
    });
  } catch (e) {
    throw e instanceof Error ? e : new Error(String(e ?? ""));
  }

  if (ia.quotaAtteint) throw new Error(ia.message);

  // Garde-fou : on ne garde que les éléments rattachés à un fait réel.
  const parId = new Map(faits.map((f) => [f.id, f]));
  const vus = new Set<string>();
  const elements: ElementBrief[] = [];
  for (const e of ia.elements ?? []) {
    const f = parId.get(e.id);
    if (!f || vus.has(e.id)) continue;
    vus.add(e.id);
    elements.push({
      id: f.id,
      categorie: f.categorie,
      titre: (e.titre || "").trim().slice(0, 90) || f.entreprise,
      // La raison affichée reste rattachée au fait vérifié.
      raison: (e.raison || "").trim() || f.fait,
      action: f.action,
    });
  }

  if (elements.length === 0) return briefDeRepli(faits);

  return {
    resume: (ia.resume || "").trim() || briefDeRepli(faits).resume,
    elements: elements.slice(0, 6),
    recommandations: (ia.recommandations ?? [])
      .map((r) => r.trim())
      .filter(Boolean)
      .slice(0, 3),
    genereLe: new Date().toISOString(),
  };
}
