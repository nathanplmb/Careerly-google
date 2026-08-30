import { supabase } from "@/integrations/supabase/client";
import {
  emptyPreparation,
  normalizeCandidature,
  type Candidature,
  type MatchScore,
  type Preparation,
  type PrioriteChoix,
} from "./candidatures";

type Row = {
  id: string;
  entreprise: string;
  poste: string;
  statut: string;
  lieu: string;
  lien: string;
  contact: string;
  date_envoi: string | null;
  date_relance: string | null;
  date_dernier_contact: string | null;
  date_limite: string | null;
  commentaire: string;
  detail: string;
  priorite?: string | null;
  source?: string | null;
  secteur?: string | null;
  archive?: boolean | null;
  match?: unknown;
  preparation?: unknown;
};

function toCandidature(r: Row): Candidature {
  const match =
    r.match && typeof r.match === "object" && "global" in (r.match as object)
      ? (r.match as MatchScore)
      : null;
  const preparation = {
    ...emptyPreparation(),
    ...((r.preparation as Partial<Preparation> | null) ?? {}),
  };
  return normalizeCandidature({
    id: r.id,
    entreprise: r.entreprise ?? "",
    poste: r.poste ?? "",
    statut: r.statut,
    lieu: r.lieu ?? "",
    lien: r.lien ?? "",
    contact: r.contact ?? "",
    dateEnvoi: r.date_envoi ?? "",
    dateRelance: r.date_relance ?? "",
    dateDernierContact: r.date_dernier_contact ?? "",
    dateLimite: r.date_limite ?? "",
    commentaire: r.commentaire ?? "",
    detail: r.detail ?? "",
    priorite: (r.priorite as PrioriteChoix) || "auto",
    source: r.source ?? "",
    secteur: r.secteur ?? "",
    archive: r.archive ?? false,
    match,
    preparation,
  } as Partial<Candidature>);
}

function isUuid(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
}

function toRow(c: Candidature, userId: string) {
  return {
    id: isUuid(c.id) ? c.id : crypto.randomUUID(),
    user_id: userId,
    entreprise: c.entreprise,
    poste: c.poste,
    statut: c.statut,
    lieu: c.lieu,
    lien: c.lien,
    contact: c.contact,
    date_envoi: c.dateEnvoi || null,
    date_relance: c.dateRelance || null,
    date_dernier_contact: c.dateDernierContact || null,
    date_limite: c.dateLimite || null,
    commentaire: c.commentaire,
    detail: c.detail,
    priorite: c.priorite,
    source: c.source,
    secteur: c.secteur,
    archive: c.archive,
    match: (c.match ?? {}) as never,
    preparation: c.preparation as never,
  };
}

export async function fetchCandidatures(): Promise<Candidature[]> {
  const { data, error } = await supabase
    .from("candidatures")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as unknown as Row[]).map(toCandidature);
}

export async function upsertCandidature(
  c: Candidature,
  userId: string,
): Promise<Candidature> {
  const row = toRow(c, userId);
  const { data, error } = await supabase
    .from("candidatures")
    .upsert(row)
    .select()
    .single();
  if (error) throw error;
  return toCandidature(data as unknown as Row);
}

export async function deleteCandidature(id: string) {
  const { error } = await supabase.from("candidatures").delete().eq("id", id);
  if (error) throw error;
}

export async function insertManyCandidatures(
  items: Candidature[],
  userId: string,
): Promise<Candidature[]> {
  if (items.length === 0) return [];
  const { data, error } = await supabase
    .from("candidatures")
    .insert(items.map((c) => toRow(c, userId)))
    .select();
  if (error) throw error;
  return (data as unknown as Row[]).map(toCandidature);
}
