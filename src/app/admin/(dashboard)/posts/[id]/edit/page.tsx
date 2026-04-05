import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostFormEdit } from "@/features/cms/post-form";
import { getPostById } from "@/lib/cms/admin-queries";
import { z } from "zod";

type Props = { params: Promise<{ id: string }> };

const uuid = z.string().uuid();

export const metadata: Metadata = {
  title: "Edit post",
};

export default async function AdminEditPostPage(props: Props) {
  const { id } = await props.params;
  const parsed = uuid.safeParse(id);
  if (!parsed.success) {
    notFound();
  }
  const post = await getPostById(parsed.data);
  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/posts"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← All posts
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Edit post</h1>
      </div>
      <PostFormEdit post={post} />
    </div>
  );
}
