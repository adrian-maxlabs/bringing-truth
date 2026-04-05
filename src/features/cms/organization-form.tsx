"use client";

import { useActionState } from "react";
import { updateOrganizationProfile } from "@/features/cms/actions";
import type { Database } from "@/types/supabase";

type Org = Database["public"]["Tables"]["organization_profile"]["Row"];

const initial: { ok: boolean; error?: string } = { ok: false };

export function OrganizationForm({ profile }: { profile: Org }) {
  const [state, formAction, pending] = useActionState(
    updateOrganizationProfile,
    initial
  );

  return (
    <form action={formAction} className="space-y-6">
      {state?.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm">
          Saved. Changes appear on the public homepage after refresh.
        </p>
      ) : null}

      <div className="grid gap-5">
        <div className="space-y-2">
          <label htmlFor="hero_tagline" className="text-sm font-medium">
            Hero tagline
          </label>
          <input
            id="hero_tagline"
            name="hero_tagline"
            required
            defaultValue={profile.hero_tagline}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="hero_subtitle" className="text-sm font-medium">
            Hero subtitle
          </label>
          <textarea
            id="hero_subtitle"
            name="hero_subtitle"
            rows={3}
            defaultValue={profile.hero_subtitle}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="mission_title" className="text-sm font-medium">
            Mission title
          </label>
          <input
            id="mission_title"
            name="mission_title"
            required
            defaultValue={profile.mission_title}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="mission_body" className="text-sm font-medium">
            Mission body
          </label>
          <textarea
            id="mission_body"
            name="mission_body"
            rows={5}
            defaultValue={profile.mission_body}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="vision_title" className="text-sm font-medium">
            Vision title
          </label>
          <input
            id="vision_title"
            name="vision_title"
            required
            defaultValue={profile.vision_title}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="vision_body" className="text-sm font-medium">
            Vision body
          </label>
          <textarea
            id="vision_body"
            name="vision_body"
            rows={5}
            defaultValue={profile.vision_body}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
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
