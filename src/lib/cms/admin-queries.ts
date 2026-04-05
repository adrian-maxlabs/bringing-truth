import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Highlight = Database["public"]["Tables"]["mission_highlights"]["Row"];
type Testimony = Database["public"]["Tables"]["testimonies"]["Row"];
type Contact = Database["public"]["Tables"]["contact_submissions"]["Row"];
type OrgProfile = Database["public"]["Tables"]["organization_profile"]["Row"];

export async function getOrganizationProfileRow(): Promise<OrgProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("organization_profile")
    .select("*")
    .limit(1)
    .maybeSingle();
  return data;
}

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function getAllHighlights(): Promise<Highlight[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mission_highlights")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getHighlightById(id: string): Promise<Highlight | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mission_highlights")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function getAllTestimonies(): Promise<Testimony[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonies")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getTestimonyById(id: string): Promise<Testimony | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonies")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

export async function getContactSubmissions(limit = 100): Promise<Contact[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
