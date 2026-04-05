# BringingTruth — Modular NGO Landing + Lightweight CMS

**Stack:** Next.js (App Router), ShadCN UI, Tailwind, Vercel, Supabase. Donations: external URL (day one).

## Goals

- **Public site**: Mission, Vision, **Company Updates** (blog-style), **Mission Highlights**, **Testimonies**, **Contact** (and a prominent **Donate** CTA pointing to your external giving URL).
- **Maintainability**: IT updates copy and media through a **simple admin** (CRUD), not Git/code deploys.

**Recommendation**: Keep this as a **separate Next.js repo** from internal ERP work so deployments and env vars stay simple.

---

## High-level architecture

- **Public routes**: Server Components fetch published content from Supabase (read-only policies).
- **Admin routes**: e.g. `/admin/*` — protected; mutations via **Server Actions** (session check → write). Avoid `app/api/` except webhooks if needed later.

---

## Phase 1 — Foundation

1. Bootstrap Next.js (App Router, TypeScript, Tailwind), ShadCN, `@supabase/ssr`, `zod`, `lucide-react`.
2. Layout & brand: NGO-appropriate design; reusable sections under `src/features/marketing/`.
3. Vercel + Supabase projects; NameCheap DNS → Vercel.

---

## Phase 2 — Supabase data model

| Area | Tables | Notes |
|------|--------|--------|
| Mission / Vision | `site_settings` or `organization_profile` | Single row or key/value; IT edits in admin. |
| Updates (blog) | `posts` | `title`, `slug`, `excerpt`, `body`, `cover_image_path`, `published_at`, `status` |
| Mission highlights | `mission_highlights` | `title`, `body`, `image_path`, `sort_order`, `published` |
| Testimonies | `testimonies` | `author_name`, `body`, `image_path`, `sort_order`, `published` |
| Contact | `contact_submissions` | Form rows; optional email notifications later |

**Security:** RLS on every table; Storage policies for images; admin auth (small team, simple `admin` role).

---

## Phase 3 — Public routes

| Route | Purpose |
|-------|---------|
| `/` | Hero, Mission, Vision, teasers, Donate CTA (`NEXT_PUBLIC_DONATION_URL`), Contact teaser |
| `/updates` | Published posts list |
| `/updates/[slug]` | Post detail |
| `/contact` | Form → Server Action → `contact_submissions` |

**SEO:** `metadata`, `sitemap.ts`, `robots.ts`.

---

## Phase 4 — Admin UI

- `/admin` with auth gate (middleware or layout + `getUser()` + role).
- ShadCN forms/tables; Zod in Server Actions; Markdown or simple rich text; Supabase Storage uploads.

---

## Phase 5 — Donations

- **Day one:** `NEXT_PUBLIC_DONATION_URL` for external platform.
- Contact form separate from giving.

---

## Phase 6 — IT handoff

- Admin login, publish flow, where to change donation URL (Vercel env), password reset via Supabase.

---

## Suggested folder shape

```
src/
  app/
    (marketing)/...
    updates/[slug]/...
    contact/...
    admin/...
  features/
    marketing/
    cms/
  lib/supabase/
  types/
```

---

## Implementation order

1. Next + ShadCN + Tailwind + Vercel (stub homepage).
2. Supabase schema + RLS + Storage + admin user(s).
3. Public pages reading published content.
4. Admin CRUD.
5. Contact form + donation env URL.
6. SEO, a11y, handoff doc.

---

## Implementation todos

- [ ] Bootstrap Next.js + ShadCN + Tailwind; Supabase SSR clients + `.env.example`
- [ ] Supabase: tables, RLS, Storage buckets
- [ ] Public marketing routes + sections
- [ ] `/admin` CRUD + auth
- [ ] Donation URL + contact Server Action
- [ ] SEO + IT handoff notes
