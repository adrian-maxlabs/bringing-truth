import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  demoHighlights,
  demoOrganizationProfile,
  demoPosts,
  demoScriptureBanners,
  demoTestimonies,
} from "@/lib/content/demo-data";
import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["organization_profile"]["Row"];
type Post = Database["public"]["Tables"]["posts"]["Row"];
type Highlight = Database["public"]["Tables"]["mission_highlights"]["Row"];
type Testimony = Database["public"]["Tables"]["testimonies"]["Row"];
type ScriptureBanner = Database["public"]["Tables"]["scripture_banners"]["Row"];

export async function getOrganizationProfile(): Promise<Profile> {
  if (!isSupabaseConfigured()) {
    return demoOrganizationProfile;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organization_profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return demoOrganizationProfile;
  }

  return data;
}

export async function getPublishedPosts(limit = 20): Promise<Post[]> {
  if (!isSupabaseConfigured()) {
    return demoPosts.slice(0, limit);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error || !data?.length) {
    return demoPosts.slice(0, limit);
  }

  return data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) {
    return demoPosts.find((p) => p.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) {
    return demoPosts.find((p) => p.slug === slug) ?? null;
  }

  return data;
}

export async function getMissionHighlights(): Promise<Highlight[]> {
  if (!isSupabaseConfigured()) {
    return demoHighlights;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mission_highlights")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return demoHighlights;
  }

  return data;
}

export async function getTestimonies(): Promise<Testimony[]> {
  if (!isSupabaseConfigured()) {
    return demoTestimonies;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonies")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return demoTestimonies;
  }

  return data;
}

export async function getHomePostTeasers(count = 2): Promise<Post[]> {
  const posts = await getPublishedPosts(count);
  return posts.slice(0, count);
}

/** Published scripture bands for the home page, ordered by `sort_order` (position 1 = first band after hero). */
export async function getScriptureBannersForHome(): Promise<ScriptureBanner[]> {
  if (!isSupabaseConfigured()) {
    return demoScriptureBanners;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("scripture_banners")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return demoScriptureBanners;
  }

  return data ?? [];
}