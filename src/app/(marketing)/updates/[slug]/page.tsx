import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBody } from "@/features/marketing/sections";
import { getPostBySlug } from "@/lib/content/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Update" };
  }
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function UpdateDetailPage(props: Props) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground sm:text-base">
        <Link
          href="/updates"
          className="font-medium text-foreground hover:underline"
        >
          ← All updates
        </Link>
        <span className="text-border" aria-hidden>
          ·
        </span>
        <span>{formatDate(post.published_at)}</span>
      </p>
      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
        {post.title}
      </h1>
      {post.excerpt ? (
        <p className="mt-4 text-lg leading-[1.65] text-muted-foreground sm:text-xl">
          {post.excerpt}
        </p>
      ) : null}
      <div className="mt-10">
        <PostBody body={post.body} />
      </div>
    </article>
  );
}
