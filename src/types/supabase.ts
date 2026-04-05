/**
 * Align with `supabase/migrations/` and regenerate after schema changes:
 * `npx supabase gen types typescript --project-id <id> > src/types/supabase.gen.ts`
 * then merge into this file.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PostStatus = "draft" | "published";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "admin" | "staff";
          created_at: string;
        };
        Insert: {
          id: string;
          role?: "admin" | "staff";
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: "admin" | "staff";
          created_at?: string;
        };
        Relationships: [];
      };
      organization_profile: {
        Row: {
          id: string;
          hero_tagline: string;
          hero_subtitle: string;
          mission_title: string;
          mission_body: string;
          vision_title: string;
          vision_body: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_tagline?: string;
          hero_subtitle?: string;
          mission_title?: string;
          mission_body?: string;
          vision_title?: string;
          vision_body?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hero_tagline?: string;
          hero_subtitle?: string;
          mission_title?: string;
          mission_body?: string;
          vision_title?: string;
          vision_body?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          body: string;
          cover_image_path: string | null;
          published_at: string | null;
          status: PostStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string;
          body?: string;
          cover_image_path?: string | null;
          published_at?: string | null;
          status?: PostStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          body?: string;
          cover_image_path?: string | null;
          published_at?: string | null;
          status?: PostStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      mission_highlights: {
        Row: {
          id: string;
          title: string;
          body: string;
          image_path: string | null;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          body?: string;
          image_path?: string | null;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          body?: string;
          image_path?: string | null;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      testimonies: {
        Row: {
          id: string;
          author_name: string;
          body: string;
          image_path: string | null;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          author_name: string;
          body?: string;
          image_path?: string | null;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          author_name?: string;
          body?: string;
          image_path?: string | null;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      scripture_banners: {
        Row: {
          id: string;
          anchor_slug: string;
          sort_order: number;
          reference: string;
          translation_note: string;
          body: string;
          tone: "light" | "deep";
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          anchor_slug: string;
          sort_order?: number;
          reference?: string;
          translation_note?: string;
          body?: string;
          tone?: "light" | "deep";
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          anchor_slug?: string;
          sort_order?: number;
          reference?: string;
          translation_note?: string;
          body?: string;
          tone?: "light" | "deep";
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
