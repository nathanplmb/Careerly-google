export interface UnifiedUserAccount {
  id: string; // UID
  email: string;
  displayName?: string;
  prenom?: string;
  nom?: string;
  photoUrl?: string;
  provider: "google" | "password" | "apple" | "microsoft" | "other" | "unknown";
  providerLabel: string;
  emailVerified: boolean;
  disabled: boolean;
  creeLe: string;
  dernierAccesLe: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasFirestoreProfile: boolean;
  statutDiagnostic:
    | "auth_et_firestore"
    | "auth_sans_firestore"
    | "firestore_sans_auth"
    | "desactive"
    | "admin"
    | "standard";
  statutLabel: string;
  stats: {
    candidaturesCount: number;
    contactsCount: number;
    entreprisesCount: number;
    documentsCount: number;
    tauxCompletionProfil: number;
  };
  customClaims?: Record<string, unknown>;
  derniereActivite?: string;
}

export interface AdminMetrics {
  totalUsers: number;
  googleUsers: number;
  passwordUsers: number;
  activeUsers: number;
  disabledUsers: number;
  adminUsers: number;
  withoutProfileUsers: number;
  totalCandidatures: number;
  totalContacts: number;
  totalEntreprises: number;
  totalDocuments: number;
}

export interface AdminUsersResponse {
  users: UnifiedUserAccount[];
  metrics: AdminMetrics;
}

export interface CascadeDeletionResult {
  success: boolean;
  message: string;
  deletedDetails: {
    authDeleted: boolean;
    profileDeleted: boolean;
    candidaturesDeleted: number;
    contactsDeleted: number;
    entreprisesDeleted: number;
    documentsDeleted: number;
    storageFilesDeleted: number;
  };
}
