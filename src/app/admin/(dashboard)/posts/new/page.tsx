import type { Metadata } from "next";
import Link from "next/link";
import { PostFormNew } from "@/features/cms/post-form";

export const metadata: Metadata = {
  title: "New post",
};

export default function AdminNewPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/posts"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← All posts
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">New post</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use markdown-style headings (#) and **bold** in the body.
        </p>
      </div>
      <PostFormNew />
    </div>
  );
}
