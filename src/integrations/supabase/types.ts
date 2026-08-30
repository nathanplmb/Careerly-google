export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      candidatures: {
        Row: {
          archive: boolean;
          commentaire: string;
          contact: string;
          created_at: string;
          date_dernier_contact: string | null;
          date_envoi: string | null;
          date_limite: string | null;
          date_relance: string | null;
          detail: string;
          entreprise: string;
          id: string;
          lien: string;
          lieu: string;
          match: Json;
          poste: string;
          preparation: Json;
          priorite: string;
          secteur: string;
          source: string;
          statut: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          archive?: boolean;
          commentaire?: string;
          contact?: string;
          created_at?: string;
          date_dernier_contact?: string | null;
          date_envoi?: string | null;
          date_limite?: string | null;
          date_relance?: string | null;
          detail?: string;
          entreprise?: string;
          id?: string;
          lien?: string;
          lieu?: string;
          match?: Json;
          poste?: string;
          preparation?: Json;
          priorite?: string;
          secteur?: string;
          source?: string;
          statut?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          archive?: boolean;
          commentaire?: string;
          contact?: string;
          created_at?: string;
          date_dernier_contact?: string | null;
          date_envoi?: string | null;
          date_limite?: string | null;
          date_relance?: string | null;
          detail?: string;
          entreprise?: string;
          id?: string;
          lien?: string;
          lieu?: string;
          match?: Json;
          poste?: string;
          preparation?: Json;
          priorite?: string;
          secteur?: string;
          source?: string;
          statut?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          candidature_id: string | null;
          created_at: string;
          date_prochaine_action: string | null;
          derniere_interaction: string | null;
          email: string;
          entreprise: string;
          historique: Json;
          id: string;
          linkedin: string;
          nom: string;
          notes: string;
          poste: string;
          prochaine_action: string;
          telephone: string;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          candidature_id?: string | null;
          created_at?: string;
          date_prochaine_action?: string | null;
          derniere_interaction?: string | null;
          email?: string;
          entreprise?: string;
          historique?: Json;
          id?: string;
          linkedin?: string;
          nom?: string;
          notes?: string;
          poste?: string;
          prochaine_action?: string;
          telephone?: string;
          type?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          candidature_id?: string | null;
          created_at?: string;
          date_prochaine_action?: string | null;
          derniere_interaction?: string | null;
          email?: string;
          entreprise?: string;
          historique?: Json;
          id?: string;
          linkedin?: string;
          nom?: string;
          notes?: string;
          poste?: string;
          prochaine_action?: string;
          telephone?: string;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contacts_candidature_id_fkey";
            columns: ["candidature_id"];
            isOneToOne: false;
            referencedRelation: "candidatures";
            referencedColumns: ["id"];
          },
        ];
      };
      debit_ia: {
        Row: {
          derniers: string[];
          user_id: string;
        };
        Insert: {
          derniers?: string[];
          user_id: string;
        };
        Update: {
          derniers?: string[];
          user_id?: string;
        };
        Relationships: [];
      };
      evenements: {
        Row: {
          candidature_id: string | null;
          created_at: string;
          date: string;
          detail: string;
          id: string;
          titre: string;
          type: string;
          user_id: string;
        };
        Insert: {
          candidature_id?: string | null;
          created_at?: string;
          date?: string;
          detail?: string;
          id?: string;
          titre?: string;
          type?: string;
          user_id: string;
        };
        Update: {
          candidature_id?: string | null;
          created_at?: string;
          date?: string;
          detail?: string;
          id?: string;
          titre?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evenements_candidature_id_fkey";
            columns: ["candidature_id"];
            isOneToOne: false;
            referencedRelation: "candidatures";
            referencedColumns: ["id"];
          },
        ];
      };
      plans_utilisateur: {
        Row: {
          created_at: string;
          expire_le: string | null;
          plan: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          expire_le?: string | null;
          plan?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          expire_le?: string | null;
          plan?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profils: {
        Row: {
          competences: string;
          contrats: string;
          created_at: string;
          criteres: Json;
          cv: Json | null;
          cv_structure: Json | null;
          date_debut: string | null;
          domaines: string;
          duree: string;
          ecole: string;
          entreprises_ciblees: string;
          experiences: string;
          formation: string;
          langues: string;
          localisation: string;
          logiciels: string;
          metiers: string;
          mobilite: string;
          niveau: string;
          niveau_anglais: string;
          nom: string;
          prenom: string;
          remuneration: string;
          teletravail: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          competences?: string;
          contrats?: string;
          created_at?: string;
          criteres?: Json;
          cv?: Json | null;
          cv_structure?: Json | null;
          date_debut?: string | null;
          domaines?: string;
          duree?: string;
          ecole?: string;
          entreprises_ciblees?: string;
          experiences?: string;
          formation?: string;
          langues?: string;
          localisation?: string;
          logiciels?: string;
          metiers?: string;
          mobilite?: string;
          niveau?: string;
          niveau_anglais?: string;
          nom?: string;
          prenom?: string;
          remuneration?: string;
          teletravail?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          competences?: string;
          contrats?: string;
          created_at?: string;
          criteres?: Json;
          cv?: Json | null;
          cv_structure?: Json | null;
          date_debut?: string | null;
          domaines?: string;
          duree?: string;
          ecole?: string;
          entreprises_ciblees?: string;
          experiences?: string;
          formation?: string;
          langues?: string;
          localisation?: string;
          logiciels?: string;
          metiers?: string;
          mobilite?: string;
          niveau?: string;
          niveau_anglais?: string;
          nom?: string;
          prenom?: string;
          remuneration?: string;
          teletravail?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      quotas_plan: {
        Row: {
          limite_jour: number;
          outil: string;
          plan: string;
        };
        Insert: {
          limite_jour: number;
          outil: string;
          plan: string;
        };
        Update: {
          limite_jour?: number;
          outil?: string;
          plan?: string;
        };
        Relationships: [];
      };
      simulations: {
        Row: {
          analyse_json: Json;
          candidature_id: string | null;
          created_at: string;
          id: string;
          messages: Json;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          analyse_json?: Json;
          candidature_id?: string | null;
          created_at?: string;
          id?: string;
          messages?: Json;
          type?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          analyse_json?: Json;
          candidature_id?: string | null;
          created_at?: string;
          id?: string;
          messages?: Json;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "simulations_candidature_id_fkey";
            columns: ["candidature_id"];
            isOneToOne: false;
            referencedRelation: "candidatures";
            referencedColumns: ["id"];
          },
        ];
      };
      usage_ia: {
        Row: {
          compteur: number;
          jour: string;
          outil: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          compteur?: number;
          jour?: string;
          outil: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          compteur?: number;
          jour?: string;
          outil?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      consommer_quota_ia: { Args: { _outil: string }; Returns: Json };
      usage_ia_du_jour: { Args: never; Returns: Json };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
