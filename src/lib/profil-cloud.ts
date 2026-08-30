import { supabase } from "@/integrations/supabase/client";
import {
  emptyProfil,
  type Critere,
  type Importance,
  type Profil,
} from "./profil";
import { normaliserCvStructure, type CvStructure } from "./cv-structure";

type Row = {
  prenom?: string | null;
  nom?: string | null;
  formation?: string | null;
  ecole?: string | null;
  niveau?: string | null;
  localisation?: string | null;
  mobilite?: string | null;
  contrats?: string | null;
  domaines?: string | null;
  metiers?: string | null;
  entreprises_ciblees?: string | null;
  competences?: string | null;
  logiciels?: string | null;
  langues?: string | null;
  niveau_anglais?: string | null;
  experiences?: string | null;
  teletravail?: string | null;
  remuneration?: string | null;
  date_debut?: string | null;
  duree?: string | null;
  criteres?: unknown;
  cv?: unknown;
  cv_structure?: unknown;
};

function toProfil(r: Row): Profil {
  const base = emptyProfil();
  return {
    ...base,
    prenom: (r.prenom as string) ?? "",
    nom: (r.nom as string) ?? "",
    formation: (r.formation as string) ?? base.formation,
    ecole: (r.ecole as string) ?? base.ecole,
    niveau: (r.niveau as string) ?? base.niveau,
    localisation: (r.localisation as string) ?? "",
    mobilite: (r.mobilite as string) ?? "",
    contrats: (r.contrats as string) ?? base.contrats,
    domaines: (r.domaines as string) ?? "",
    metiers: (r.metiers as string) ?? "",
    entreprisesCiblees: (r.entreprises_ciblees as string) ?? "",
    competences: (r.competences as string) ?? "",
    logiciels: (r.logiciels as string) ?? "",
    langues: (r.langues as string) ?? "",
    niveauAnglais: (r.niveau_anglais as string) ?? "",
    experiences: (r.experiences as string) ?? "",
    teletravail: (r.teletravail as string) ?? "",
    remuneration: (r.remuneration as string) ?? "",
    dateDebut: (r.date_debut as string) ?? "",
    duree: (r.duree as string) ?? "",
    criteres:
      (r.criteres as Partial<Record<Critere, Importance>> | null) ??
      base.criteres,
    cv: (r.cv as Profil["cv"]) ?? null,
    cvStructure: normaliserCvStructure(
      r.cv_structure as Partial<CvStructure> | null,
    ),
  };
}

function toRow(p: Profil, userId: string) {
  return {
    user_id: userId,
    prenom: p.prenom,
    nom: p.nom,
    formation: p.formation,
    ecole: p.ecole,
    niveau: p.niveau,
    localisation: p.localisation,
    mobilite: p.mobilite,
    contrats: p.contrats,
    domaines: p.domaines,
    metiers: p.metiers,
    entreprises_ciblees: p.entreprisesCiblees,
    competences: p.competences,
    logiciels: p.logiciels,
    langues: p.langues,
    niveau_anglais: p.niveauAnglais,
    experiences: p.experiences,
    teletravail: p.teletravail,
    remuneration: p.remuneration,
    date_debut: p.dateDebut || null,
    duree: p.duree,
    criteres: p.criteres as never,
    cv: (p.cv ?? null) as never,
    cv_structure: (p.cvStructure ?? null) as never,
  };
}

export async function fetchProfil(): Promise<Profil | null> {
  const { data, error } = await supabase
    .from("profils")
    .select("*")
    .maybeSingle();
  if (error) throw error;
  return data ? toProfil(data as Row) : null;
}

export async function saveProfilCloud(
  p: Profil,
  userId: string,
): Promise<Profil> {
  const { data, error } = await supabase
    .from("profils")
    .upsert(toRow(p, userId), { onConflict: "user_id" })
    .select()
    .single();
  if (error) throw error;
  return toProfil(data as Row);
}
