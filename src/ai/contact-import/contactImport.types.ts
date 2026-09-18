export type ContactToClassifyInput = {
  id: string;
  nom: string;
  entreprise: string;
  poste: string;
  notes?: string;
  linkedin?: string;
};

export type ContactClassificationOutput = {
  id: string;
  normalizedCompany: string;
  companyMatchedWithExisting?: string;
  normalizedFunction: string;
  normalizedLevel: string;
  category:
    | "Recruteur / RH"
    | "Alumni"
    | "Étudiant / en recherche"
    | "Professionnel du secteur ciblé"
    | "Professionnel hors secteur ciblé"
    | "Autre";
  categoryConfidence: number; // 0 à 100
  pastCompanies?: string[];
  education?: string[];
  companySector?: string;
  explanation?: string;
};

export type ClassifyContactsBatchInput = {
  contacts: ContactToClassifyInput[];
  existingCompanies?: string[];
  userSchool?: string;
  userTargetSector?: string;
};

export type ClassifyContactsBatchResult = {
  classifications: ContactClassificationOutput[];
};
