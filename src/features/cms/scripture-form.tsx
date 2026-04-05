"use client";

import { useActionState } from "react";
import { createScripture, updateScripture } from "@/features/cms/actions";
import type { Database } from "@/types/supabase";

type ScriptureBanner = Database["public"]["Tables"]["scripture_banners"]["Row"];

const initial: { ok: boolean; error?: string } = { ok: false };

const input =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";
const textarea =
  "w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function ScriptureFormNew() {
  const [state, formAction, pending] = useActionState(createScripture, initial);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="anchor_slug" className="text-sm font-medium">
          Anchor slug
        </label>
        <input
          id="anchor_slug"
          name="anchor_slug"
          placeholder="e.g. scripture-jesus-is-truth"
          className={input}
        />
        <p className="text-xs text-muted-foreground">
          Used for links like /#your-slug. Lowercase letters, numbers, hyphens. Leave blank
          to generate from the reference.
        </p>
      </div>
      <div className="space-y-2">
        <label htmlFor="reference" className="text-sm font-medium">
          Reference
        </label>
        <input id="reference" name="reference" required className={input} />
      </div>
      <div className="space-y-2">
        <label htmlFor="translation_note" className="text-sm font-medium">
          Translation note
        </label>
        <input
          id="translation_note"
          name="translation_note"
          defaultValue="ESV"
          className={input}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium">
          Verse text
        </label>
        <textarea id="body" name="body" rows={6} required className={textarea} />
      </div>
      <div className="space-y-2">
        <label htmlFor="sort_order" className="text-sm font-medium">
          Sort order (home page position)
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={0}
          className={input}
        />
        <p className="text-xs text-muted-foreground">
          Lower numbers appear first. The first four published rows map to the four full-width
          bands (after hero, after impact, after mission, after highlights).
        </p>
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Tone</span>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="tone" value="light" defaultChecked className="size-4" />
            Light
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="tone" value="deep" className="size-4" />
            Deep
          </label>
        </div>
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
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Create scripture band"}
      </button>
    </form>
  );
}

export function ScriptureFormEdit({ row }: { row: ScriptureBanner }) {
  const [state, formAction, pending] = useActionState(updateScripture, initial);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={row.id} />
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="anchor_slug" className="text-sm font-medium">
          Anchor slug
        </label>
        <input
          id="anchor_slug"
          name="anchor_slug"
          required
          defaultValue={row.anchor_slug}
          className={input}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="reference" className="text-sm font-medium">
          Reference
        </label>
        <input
          id="reference"
          name="reference"
          required
          defaultValue={row.reference}
          className={input}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="translation_note" className="text-sm font-medium">
          Translation note
        </label>
        <input
          id="translation_note"
          name="translation_note"
          defaultValue={row.translation_note}
          className={input}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium">
          Verse text
        </label>
        <textarea
          id="body"
          name="body"
          rows={6}
          required
          defaultValue={row.body}
          className={textarea}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="sort_order" className="text-sm font-medium">
          Sort order (home page position)
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={row.sort_order}
          className={input}
        />
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Tone</span>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="tone"
              value="light"
              defaultChecked={row.tone === "light"}
              className="size-4"
            />
            Light
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="tone"
              value="deep"
              defaultChecked={row.tone === "deep"}
              className="size-4"
            />
            Deep
          </label>
        </div>
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
