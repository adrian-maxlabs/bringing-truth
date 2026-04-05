# BringingTruth

Next.js marketing site for **BringingTruth** (Christian ministry / NGO): mission, updates, highlights, testimonies, contact, and an external **Donate** link. IT updates content via **`/admin`** (Supabase Auth + RLS).

## Plan

See **[docs/bringingtruth-ngo-site-plan.md](./docs/bringingtruth-ngo-site-plan.md)** for the full modular plan (CMS tables, `/admin`, RLS, Vercel/NameCheap).

## Stack (initial setup)

- [Next.js](https://nextjs.org) (App Router) · [Tailwind CSS v4](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com) (Base UI preset)
- [Supabase](https://supabase.com) via `@supabase/ssr` — clients in `src/lib/supabase/`
- [Zod](https://zod.dev) for Server Action validation (public contact + admin CRUD)

## IT handoff

Staff-facing steps: **[docs/IT-HANDOFF.md](./docs/IT-HANDOFF.md)** (admin login, env vars, first admin SQL).

## Environment

Copy `.env.example` to `.env.local` and fill in values from your Supabase project (**Settings → API**):

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `NEXT_PUBLIC_DONATION_URL` | External giving page (opens from the header Donate button) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for `metadataBase`, sitemap, and robots (no trailing slash) |

## Scripts

```bash
npm run dev    # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Deploy

Import the repo into [Vercel](https://vercel.com), add the same env vars, then point your Namecheap domain to Vercel per their DNS docs.

## Project layout (growing)

- `src/app/` — routes (thin; pages compose `src/features/…` later)
- `src/components/ui/` — shadcn components
- `src/lib/supabase/` — browser + server Supabase clients
- `src/types/supabase.ts` — align with `supabase/migrations/` and regenerate types after schema changes
- `supabase/migrations/` — Postgres schema + RLS + Storage policies
- `docs/IT-HANDOFF.md` — onboarding for IT staff
# bringing-truth
