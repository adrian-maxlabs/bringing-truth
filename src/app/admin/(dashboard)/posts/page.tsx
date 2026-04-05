import type { Metadata } from "next";
import Link from "next/link";
import { deletePost } from "@/features/cms/actions";
import { getAllPosts } from "@/lib/cms/admin-queries";

export const metadata: Metadata = {
  title: "Posts",
};

function formatDate(iso: string | null) {
  if (!iso) {
    return "—";
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Drafts and published updates. Slugs must stay unique.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
        >
          New post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-border/80 last:border-0">
                <td className="px-4 py-3">
                  <span className="font-medium">{p.title}</span>
                  <p className="text-xs text-muted-foreground">{p.slug}</p>
                </td>
                <td className="px-4 py-3 capitalize">{p.status}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(p.published_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/posts/${p.id}/edit`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-sm font-medium text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
