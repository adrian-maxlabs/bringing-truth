import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const posts = await getPublishedPosts(200);
  const now = new Date();

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/updates/${p.slug}`,
    lastModified: new Date(p.updated_at ?? p.published_at ?? now),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/updates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...postEntries,
  ];
}
