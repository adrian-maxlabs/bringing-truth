/**
 * Public URL for objects in the `site-media` bucket (see supabase migrations).
 */
export function publicMediaUrl(path: string | null | undefined): string | null {
  if (!path?.trim()) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const clean = path.replace(/^\/+/, "").trim();
  if (!clean || clean.includes("..") || clean.startsWith("//")) return null;
  return `${base}/storage/v1/object/public/site-media/${clean}`;
}
