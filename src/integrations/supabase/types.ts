export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          issue_date: string | null
          issuer: string | null
          name: string
          user_id: string
          verification_hash: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuer?: string | null
          name: string
          user_id: string
          verification_hash?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuer?: string | null
          name?: string
          user_id?: string
          verification_hash?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      mock_interviews: {
        Row: {
          ai_feedback: string | null
          answer: string
          category: string | null
          created_at: string | null
          id: string
          question: string
          score: number | null
          user_id: string
        }
        Insert: {
          ai_feedback?: string | null
          answer: string
          category?: string | null
          created_at?: string | null
          id?: string
          question: string
          score?: number | null
          user_id: string
        }
        Update: {
          ai_feedback?: string | null
          answer?: string
          category?: string | null
          created_at?: string | null
          id?: string
          question?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      nft_credentials: {
        Row: {
          blockchain_tx_hash: string | null
          credential_type: string
          id: string
          last_evolved_at: string | null
          level: number | null
          metadata: Json
          minted_at: string | null
          polygon_scan_url: string | null
          skill_id: string | null
          token_id: string | null
          user_id: string
        }
        Insert: {
          blockchain_tx_hash?: string | null
          credential_type: string
          id?: string
          last_evolved_at?: string | null
          level?: number | null
          metadata: Json
          minted_at?: string | null
          polygon_scan_url?: string | null
          skill_id?: string | null
          token_id?: string | null
          user_id: string
        }
        Update: {
          blockchain_tx_hash?: string | null
          credential_type?: string
          id?: string
          last_evolved_at?: string | null
          level?: number | null
          metadata?: Json
          minted_at?: string | null
          polygon_scan_url?: string | null
          skill_id?: string | null
          token_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nft_credentials_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nft_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          github_username: string | null
          id: string
          reputation_score: number | null
          total_xp: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          github_username?: string | null
          id: string
          reputation_score?: number | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          github_username?: string | null
          id?: string
          reputation_score?: number | null
          total_xp?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          ai_feedback: Json | null
          analysis_status: string | null
          analyzed_at: string | null
          code_quality_score: number | null
          complexity_score: number | null
          created_at: string | null
          id: string
          repo_name: string
          repo_url: string | null
          user_id: string
          xp_awarded: number | null
        }
        Insert: {
          ai_feedback?: Json | null
          analysis_status?: string | null
          analyzed_at?: string | null
          code_quality_score?: number | null
          complexity_score?: number | null
          created_at?: string | null
          id?: string
          repo_name: string
          repo_url?: string | null
          user_id: string
          xp_awarded?: number | null
        }
        Update: {
          ai_feedback?: Json | null
          analysis_status?: string | null
          analyzed_at?: string | null
          code_quality_score?: number | null
          complexity_score?: number | null
          created_at?: string | null
          id?: string
          repo_name?: string
          repo_url?: string | null
          user_id?: string
          xp_awarded?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_endorsements: {
        Row: {
          blockchain_signature: string | null
          created_at: string | null
          endorsement_message: string | null
          endorser_id: string
          id: string
          skill_id: string
        }
        Insert: {
          blockchain_signature?: string | null
          created_at?: string | null
          endorsement_message?: string | null
          endorser_id: string
          id?: string
          skill_id: string
        }
        Update: {
          blockchain_signature?: string | null
          created_at?: string | null
          endorsement_message?: string | null
          endorser_id?: string
          id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_endorsements_endorser_id_fkey"
            columns: ["endorser_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_endorsements_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          ai_score: number | null
          id: string
          last_updated: string | null
          proficiency_level: number | null
          skill_category: string
          skill_name: string
          user_id: string
          verified_at: string | null
          xp_earned: number | null
        }
        Insert: {
          ai_score?: number | null
          id?: string
          last_updated?: string | null
          proficiency_level?: number | null
          skill_category: string
          skill_name: string
          user_id: string
          verified_at?: string | null
          xp_earned?: number | null
        }
        Update: {
          ai_score?: number | null
          id?: string
          last_updated?: string | null
          proficiency_level?: number | null
          skill_category?: string
          skill_name?: string
          user_id?: string
          verified_at?: string | null
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_analysis: {
        Row: {
          certifications: Json | null
          coding_stats: Json | null
          created_at: string | null
          feedback: string | null
          github_id: string | null
          id: string
          is_public: boolean | null
          linkedin_url: string | null
          progress: Json | null
          recommendations: Json | null
          resume_score: number | null
          updated_at: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          certifications?: Json | null
          coding_stats?: Json | null
          created_at?: string | null
          feedback?: string | null
          github_id?: string | null
          id?: string
          is_public?: boolean | null
          linkedin_url?: string | null
          progress?: Json | null
          recommendations?: Json | null
          resume_score?: number | null
          updated_at?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          certifications?: Json | null
          coding_stats?: Json | null
          created_at?: string | null
          feedback?: string | null
          github_id?: string | null
          id?: string
          is_public?: boolean | null
          linkedin_url?: string | null
          progress?: Json | null
          recommendations?: Json | null
          resume_score?: number | null
          updated_at?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      xp_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          source: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          source: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          source?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "xp_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
