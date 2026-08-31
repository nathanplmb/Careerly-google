import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import {
  emptyContact,
  type Contact,
  type Echange,
  type TypeContact,
} from "./contacts";

type Row = {
  id: string;
  nom: string | null;
  entreprise: string | null;
  poste: string | null;
  email: string | null;
  telephone: string | null;
  linkedin: string | null;
  type: string | null;
  candidature_id: string | null;
  derniere_interaction: string | null;
  prochaine_action: string | null;
  date_prochaine_action: string | null;
  notes: string | null;
  historique: unknown;
};

function toContact(r: Row): Contact {
  const base = emptyContact();
  return {
    ...base,
    id: r.id,
    nom: r.nom ?? "",
    entreprise: r.entreprise ?? "",
    poste: r.poste ?? "",
    email: r.email ?? "",
    telephone: r.telephone ?? "",
    linkedin: r.linkedin ?? "",
    type: (r.type as TypeContact) || "Recruteur",
    candidatureId: r.candidature_id ?? "",
    derniereInteraction: r.derniere_interaction ?? "",
    prochaineAction: r.prochaine_action ?? "",
    dateProchaineAction: r.date_prochaine_action ?? "",
    notes: r.notes ?? "",
    historique: Array.isArray(r.historique) ? (r.historique as Echange[]) : [],
  };
}

function toRow(c: Contact, userId: string) {
  return {
    id: c.id,
    user_id: userId,
    nom: c.nom,
    entreprise: c.entreprise,
    poste: c.poste,
    email: c.email,
    telephone: c.telephone,
    linkedin: c.linkedin,
    type: c.type,
    candidature_id: c.candidatureId || null,
    derniere_interaction: c.derniereInteraction || null,
    prochaine_action: c.prochaineAction,
    date_prochaine_action: c.dateProchaineAction || null,
    notes: c.notes,
    historique: c.historique as never,
  };
}

export async function fetchContacts(): Promise<Contact[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as unknown as Row[]).map(toContact);
}

export async function upsertContact(
  c: Contact,
  userId: string,
): Promise<Contact> {
  if (!isSupabaseConfigured()) return c;
  const { data, error } = await supabase
    .from("contacts")
    .upsert(toRow(c, userId))
    .select()
    .single();
  if (error) throw error;
  return toContact(data as unknown as Row);
}

export async function deleteContact(id: string) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) throw error;
}
