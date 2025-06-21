export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      fishing_results: {
        Row: {
          id: string
          date: string
          weather: string | null
          moon_age: number | null
          tide_type: string | null
          catch_count: number
          size: string | null
          image_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          weather?: string | null
          moon_age?: number | null
          tide_type?: string | null
          catch_count: number
          size?: string | null
          image_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          weather?: string | null
          moon_age?: number | null
          tide_type?: string | null
          catch_count?: number
          size?: string | null
          image_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          username: string
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
        }
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