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
  const cvStructure = normaliserCvStructure(
    r.cv_structure as Partial<CvStructure> | null,
  );
  return {
    ...base,
    prenom: (r.prenom as string) ?? "",
    nom: (r.nom as string) ?? "",
    titre: cvStructure.titre || "",
    formation: (r.formation as string) ?? base.formation,
    ecole: (r.ecole as string) ?? base.ecole,
    niveau: (r.niveau as string) ?? base.niveau,
    localisation: (r.localisation as string) ?? "",
    pays: cvStructure.pays || "France",
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
    modeTravail:
      cvStructure.preferences?.teletravailPrefere ||
      (r.teletravail?.includes("100%") ? "teletravail" : "hybride"),
    remuneration: (r.remuneration as string) ?? "",
    dateDebut: (r.date_debut as string) ?? "",
    duree: (r.duree as string) ?? "",
    rechercheVraie:
      (cvStructure as unknown as { rechercheVraie?: string })?.rechercheVraie ||
      "",
    environnements: (cvStructure as unknown as { environnements?: string[] })
      ?.environnements || ["Grand groupe", "Scale-up"],
    prioritesRecherche: (
      cvStructure as unknown as { prioritesRecherche?: string[] }
    )?.prioritesRecherche || ["Missions apprenantes", "Mentorat / Équipe"],
    emailContact: cvStructure.email || "",
    telephone: cvStructure.telephone || "",
    linkedin: cvStructure.linkedin || "",
    portfolio: cvStructure.portfolio || "",
    github: cvStructure.github || "",
    permis: cvStructure.permis || "",
    photoUrl: cvStructure.photoUrl || "",
    criteres:
      (r.criteres as Partial<Record<Critere, Importance>> | null) ??
      base.criteres,
    cv: (r.cv as Profil["cv"]) ?? null,
    cvStructure,
    preferences: cvStructure.preferences,
    syntheseIa: cvStructure.syntheseIa,
  };
}

function toRow(p: Profil, userId: string) {
  const cvStructure = normaliserCvStructure({
    ...p.cvStructure,
    titre: p.titre || p.cvStructure.titre,
    email: p.emailContact || p.cvStructure.email,
    telephone: p.telephone || p.cvStructure.telephone,
    linkedin: p.linkedin || p.cvStructure.linkedin,
    portfolio: p.portfolio || p.cvStructure.portfolio,
    github: p.github || p.cvStructure.github,
    permis: p.permis || p.cvStructure.permis,
    photoUrl: p.photoUrl || p.cvStructure.photoUrl,
    ville: p.localisation || p.cvStructure.ville,
    pays: p.pays || p.cvStructure.pays,
    preferences: {
      ...p.cvStructure.preferences,
      ...p.preferences,
      teletravailPrefere:
        (p.modeTravail as
          "full_remote" | "hybride" | "presentiel" | "indifferent") ||
        p.cvStructure.preferences?.teletravailPrefere ||
        "hybride",
    },
    syntheseIa: p.syntheseIa || p.cvStructure.syntheseIa,
    ...(p.rechercheVraie ? { rechercheVraie: p.rechercheVraie } : {}),
    ...(p.environnements ? { environnements: p.environnements } : {}),
    ...(p.prioritesRecherche
      ? { prioritesRecherche: p.prioritesRecherche }
      : {}),
  } as unknown as CvStructure);

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
    cv_structure: cvStructure as never,
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
