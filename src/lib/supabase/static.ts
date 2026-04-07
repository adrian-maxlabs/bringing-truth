import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Cookie-free Supabase client for build-time contexts (generateStaticParams,
 * generateMetadata when pre-rendered, etc.) where `cookies()` is unavailable.
 * Uses the public anon key — safe for read-only public queries behind RLS.
 */
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
