"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

async function getAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Not signed in" as const, supabase: null };
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") {
    return { error: "Forbidden" as const, supabase: null };
  }
  return { error: null, supabase };
}

const orgSchema = z.object({
  hero_tagline: z.string().trim().min(1).max(500),
  hero_subtitle: z.string().trim().max(2000),
  mission_title: z.string().trim().min(1).max(200),
  mission_body: z.string().trim().max(8000),
  vision_title: z.string().trim().min(1).max(200),
  vision_body: z.string().trim().max(8000),
});

export async function updateOrganizationProfile(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  const parsed = orgSchema.safeParse({
    hero_tagline: formData.get("hero_tagline"),
    hero_subtitle: formData.get("hero_subtitle"),
    mission_title: formData.get("mission_title"),
    mission_body: formData.get("mission_body"),
    vision_title: formData.get("vision_title"),
    vision_body: formData.get("vision_body"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { data: row } = await gate.supabase
    .from("organization_profile")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (!row) {
    return { ok: false, error: "Organization profile row not found." };
  }

  const { error } = await gate.supabase
    .from("organization_profile")
    .update({
      ...parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/organization");
  return { ok: true };
}

const postSchema = z.object({
  title: z.string().trim().min(1).max(300),
  slug: z.string().trim().min(1).max(300),
  excerpt: z.string().trim().max(2000),
  body: z.string().max(100_000),
  status: z.enum(["draft", "published"]),
  published_at: z.string().optional().nullable(),
  cover_image_path: z.string().max(500).nullable().optional(),
});

function toPublishedAtIso(
  raw: string | null | undefined,
  status: "draft" | "published"
): string | null {
  if (status === "draft") {
    return null;
  }
  const t = String(raw ?? "").trim();
  if (!t) {
    return new Date().toISOString();
  }
  const d = new Date(t);
  if (Number.isNaN(d.getTime())) {
    return new Date().toISOString();
  }
  return d.toISOString();
}

export async function createPost(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  let slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!slug && title) {
    slug = slugify(title);
  }
  if (!slug) {
    return { ok: false, error: "Add a title or slug." };
  }

  const status = formData.get("status") === "published" ? "published" : "draft";
  const publishedAt = toPublishedAtIso(
    String(formData.get("published_at") ?? ""),
    status
  );

  const parsed = postSchema.safeParse({
    title,
    slug,
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    status,
    published_at: publishedAt,
    cover_image_path:
      String(formData.get("cover_image_path") ?? "").trim() || null,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { error } = await gate.supabase.from("posts").insert({
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    body: parsed.data.body,
    status: parsed.data.status,
    published_at: parsed.data.published_at,
    cover_image_path: parsed.data.cover_image_path,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/updates");
  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { ok: false, error: "Missing post id." };
  }

  let slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!slug && title) {
    slug = slugify(title);
  }
  if (!slug) {
    return { ok: false, error: "Add a title or slug." };
  }

  const status = formData.get("status") === "published" ? "published" : "draft";
  const publishedAt = toPublishedAtIso(
    String(formData.get("published_at") ?? ""),
    status
  );

  const parsed = postSchema.safeParse({
    title,
    slug,
    excerpt: String(formData.get("excerpt") ?? ""),
    body: String(formData.get("body") ?? ""),
    status,
    published_at: publishedAt,
    cover_image_path:
      String(formData.get("cover_image_path") ?? "").trim() || null,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { error } = await gate.supabase
    .from("posts")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt,
      body: parsed.data.body,
      status: parsed.data.status,
      published_at: parsed.data.published_at,
      cover_image_path: parsed.data.cover_image_path,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/updates");
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath(`/updates/${parsed.data.slug}`);
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData): Promise<void> {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return;
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  const { error } = await gate.supabase.from("posts").delete().eq("id", id);

  if (error) {
    return;
  }

  revalidatePath("/updates");
  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

const highlightSchema = z.object({
  title: z.string().trim().min(1).max(300),
  body: z.string().trim().max(8000),
  sort_order: z.coerce.number().int().min(0).max(999_999),
  published: z.enum(["on"]).optional(),
  image_path: z.string().max(500).nullable().optional(),
});

export async function createHighlight(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  const parsed = highlightSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    sort_order: formData.get("sort_order"),
    published: formData.get("published"),
    image_path: String(formData.get("image_path") ?? "").trim() || null,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { error } = await gate.supabase.from("mission_highlights").insert({
    title: parsed.data.title,
    body: parsed.data.body,
    sort_order: parsed.data.sort_order,
    published: parsed.data.published === "on",
    image_path: parsed.data.image_path,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/highlights");
  redirect("/admin/highlights");
}

export async function updateHighlight(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { ok: false, error: "Missing id." };
  }

  const parsed = highlightSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    sort_order: formData.get("sort_order"),
    published: formData.get("published"),
    image_path: String(formData.get("image_path") ?? "").trim() || null,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { error } = await gate.supabase
    .from("mission_highlights")
    .update({
      title: parsed.data.title,
      body: parsed.data.body,
      sort_order: parsed.data.sort_order,
      published: parsed.data.published === "on",
      image_path: parsed.data.image_path,
    })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/highlights");
  redirect("/admin/highlights");
}

export async function deleteHighlight(formData: FormData): Promise<void> {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return;
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  const { error } = await gate.supabase
    .from("mission_highlights")
    .delete()
    .eq("id", id);

  if (error) {
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin/highlights");
  redirect("/admin/highlights");
}

const testimonySchema = z.object({
  author_name: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(8000),
  sort_order: z.coerce.number().int().min(0).max(999_999),
  published: z.enum(["on"]).optional(),
  image_path: z.string().max(500).nullable().optional(),
});

export async function createTestimony(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  const parsed = testimonySchema.safeParse({
    author_name: formData.get("author_name"),
    body: formData.get("body"),
    sort_order: formData.get("sort_order"),
    published: formData.get("published"),
    image_path: String(formData.get("image_path") ?? "").trim() || null,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { error } = await gate.supabase.from("testimonies").insert({
    author_name: parsed.data.author_name,
    body: parsed.data.body,
    sort_order: parsed.data.sort_order,
    published: parsed.data.published === "on",
    image_path: parsed.data.image_path,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonies");
  redirect("/admin/testimonies");
}

export async function updateTestimony(
  _prev: { ok?: boolean; error?: string },
  formData: FormData
) {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return { ok: false, error: gate.error };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { ok: false, error: "Missing id." };
  }

  const parsed = testimonySchema.safeParse({
    author_name: formData.get("author_name"),
    body: formData.get("body"),
    sort_order: formData.get("sort_order"),
    published: formData.get("published"),
    image_path: String(formData.get("image_path") ?? "").trim() || null,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const { error } = await gate.supabase
    .from("testimonies")
    .update({
      author_name: parsed.data.author_name,
      body: parsed.data.body,
      sort_order: parsed.data.sort_order,
      published: parsed.data.published === "on",
      image_path: parsed.data.image_path,
    })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonies");
  redirect("/admin/testimonies");
}

export async function deleteTestimony(formData: FormData): Promise<void> {
  const gate = await getAdminClient();
  if (!gate.supabase) {
    return;
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  const { error } = await gate.supabase.from("testimonies").delete().eq("id", id);

  if (error) {
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonies");
  redirect("/admin/testimonies");
}
