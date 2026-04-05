"use client";

import { useActionState } from "react";
import { createHighlight, updateHighlight } from "@/features/cms/actions";
import type { Database } from "@/types/supabase";

type Highlight = Database["public"]["Tables"]["mission_highlights"]["Row"];

const initial: { ok: boolean; error?: string } = { ok: false };

const input =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";
const textarea =
  "w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function HighlightFormNew() {
  const [state, formAction, pending] = useActionState(createHighlight, initial);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input id="title" name="title" required className={input} />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium">
          Body
        </label>
        <textarea id="body" name="body" rows={5} className={textarea} />
      </div>
      <div className="space-y-2">
        <label htmlFor="sort_order" className="text-sm font-medium">
          Sort order
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={0}
          className={input}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          className="size-4 rounded border-input"
          defaultChecked
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published
        </label>
      </div>
      <div className="space-y-2">
        <label htmlFor="image_path" className="text-sm font-medium">
          Image path (optional)
        </label>
        <input id="image_path" name="image_path" className={input} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Create highlight"}
      </button>
    </form>
  );
}

export function HighlightFormEdit({ row }: { row: Highlight }) {
  const [state, formAction, pending] = useActionState(updateHighlight, initial);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={row.id} />
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={row.title}
          className={input}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          rows={5}
          defaultValue={row.body}
          className={textarea}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="sort_order" className="text-sm font-medium">
          Sort order
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={row.sort_order}
          className={input}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          className="size-4 rounded border-input"
          defaultChecked={row.published}
        />
        <label htmlFor="published" className="text-sm font-medium">
          Published
        </label>
      </div>
      <div className="space-y-2">
        <label htmlFor="image_path" className="text-sm font-medium">
          Image path (optional)
        </label>
        <input
          id="image_path"
          name="image_path"
          defaultValue={row.image_path ?? ""}
          className={input}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
