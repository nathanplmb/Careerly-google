export type GenerateNetworkingMessageInput = {
  contact: {
    nom: string;
    entreprise?: string;
    poste?: string;
    type?: string;
    category?: string;
    linkedin?: string;
    notes?: string;
    connectionPoints?: string[];
    pastCompanies?: string[];
    education?: string[];
    companySector?: string;
  };
  opportunity?: {
    poste?: string;
    entreprise?: string;
    currentStage?: string;
    lieu?: string;
  };
  userProfile?: {
    prenom?: string;
    nom?: string;
    ecole?: string;
    posteRecherche?: string;
    competences?: string[];
  };
  tone?: "alumni" | "spontane" | "direct" | "entretien";
};

export type GenerateNetworkingMessageResult = {
  objet: string;
  message: string;
  conseils: string[];
};
