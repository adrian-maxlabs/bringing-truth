import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/content/queries";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Company updates, field reports, and stories from BringingTruth.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function UpdatesPage() {
  const posts = await getPublishedPosts(50);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Updates
        </h1>
        <p className="max-w-2xl text-base leading-[1.65] text-muted-foreground sm:text-lg">
          News from the field, prayer requests, and how your support makes a
          difference.
        </p>
      </header>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/updates/${post.slug}`}
              className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
            >
              <p className="text-sm text-muted-foreground">
                {formatDate(post.published_at)}
              </p>
              <h2 className="mt-2 text-xl font-semibold group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 text-base leading-[1.6] text-muted-foreground">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
