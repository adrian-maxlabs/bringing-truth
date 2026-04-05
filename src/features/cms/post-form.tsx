"use client";

import { useActionState } from "react";
import { createPost, updatePost } from "@/features/cms/actions";
import type { Database } from "@/types/supabase";

type Post = Database["public"]["Tables"]["posts"]["Row"];

const initial: { ok: boolean; error?: string } = { ok: false };

function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) {
    return "";
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function PostFormNew() {
  const [state, formAction, pending] = useActionState(createPost, initial);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <Field label="Title" htmlFor="title">
        <input
          id="title"
          name="title"
          required
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Slug (optional — generated from title if empty)" htmlFor="slug">
        <input
          id="slug"
          name="slug"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          placeholder="my-post-slug"
        />
      </Field>
      <Field label="Excerpt" htmlFor="excerpt">
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Body (markdown-style: # heading, **bold**)" htmlFor="body">
        <textarea
          id="body"
          name="body"
          rows={14}
          required
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Cover image path (storage: site-media/…)" htmlFor="cover_image_path">
        <input
          id="cover_image_path"
          name="cover_image_path"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue="draft"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <Field
        label="Published at (ISO, optional — defaults to now when publishing)"
        htmlFor="published_at"
      >
        <input
          id="published_at"
          name="published_at"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          placeholder="2026-04-05T12:00:00.000Z"
        />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create post"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function PostFormEdit({ post }: { post: Post }) {
  const [state, formAction, pending] = useActionState(updatePost, initial);

  const publishedAt = toDatetimeLocalValue(post.published_at);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={post.id} />
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <Field label="Title" htmlFor="title">
        <input
          id="title"
          name="title"
          required
          defaultValue={post.title}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Slug" htmlFor="slug">
        <input
          id="slug"
          name="slug"
          required
          defaultValue={post.slug}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Excerpt" htmlFor="excerpt">
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post.excerpt}
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Body" htmlFor="body">
        <textarea
          id="body"
          name="body"
          rows={14}
          required
          defaultValue={post.body}
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <Field label="Cover image path" htmlFor="cover_image_path">
        <input
          id="cover_image_path"
          name="cover_image_path"
          defaultValue={post.cover_image_path ?? ""}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={post.status}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      <Field label="Published at (local datetime)" htmlFor="published_at">
        <input
          id="published_at"
          name="published_at"
          type="datetime-local"
          defaultValue={publishedAt}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
