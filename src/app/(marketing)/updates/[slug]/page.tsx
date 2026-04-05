import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBody } from "@/features/marketing/sections";
import { getPostBySlug, getPublishedPosts } from "@/lib/content/queries";

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

export async function generateStaticParams() {
  const posts = await getPublishedPosts(100);
  return posts.map((p) => ({ slug: p.slug }));
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
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-base text-muted-foreground">
        <Link
          href="/updates"
          className="font-medium text-foreground hover:underline"
        >
          ← All updates
        </Link>
        <span className="mx-2 text-border">·</span>
        {formatDate(post.published_at)}
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
        {post.title}
      </h1>
      {post.excerpt ? (
        <p className="mt-4 text-xl leading-[1.65] text-muted-foreground">
          {post.excerpt}
        </p>
      ) : null}
      <div className="mt-10">
        <PostBody body={post.body} />
      </div>
    </article>
  );
}
