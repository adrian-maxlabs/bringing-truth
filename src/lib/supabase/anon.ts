import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Anonymous (cookie-free) Supabase client for public read-only queries.
 * Safe in any context — Server Components, build-time, generateMetadata, etc.
 * Uses the anon key; data is protected by RLS (public SELECT policies).
 */
export function createAnonClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
