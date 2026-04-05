# Connect your Supabase project (developer)

Follow these steps once per environment (local dev, then production on Vercel).

## 1. Create the Supabase project

1. In [Supabase Dashboard](https://supabase.com/dashboard), create a **new project** (choose region, set a database password, wait until provisioning finishes).

## 2. API keys for the Next.js app

1. Open **Project Settings → API**.
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe to use in the browser; RLS protects data.

## 3. Local environment file

From the repo root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and paste the URL and anon key. Set:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000` (no trailing slash) for local dev.
- `NEXT_PUBLIC_DONATION_URL` — any valid `https://` URL for testing; you can change it later.

Restart `npm run dev` after saving.

## 4. Run database migrations (schema + RLS + storage)

Pick **one** of these.

### Option A — Supabase CLI (recommended from this repo)

From the repo root (after `.env.local` has `NEXT_PUBLIC_SUPABASE_URL`):

1. **Log in to the CLI** (once per machine):

   ```bash
   npx supabase login
   ```

2. **Set your database password** in the shell (the one from project creation; reset under **Project Settings → Database** if needed):

   ```bash
   export SUPABASE_DB_PASSWORD='your-database-password'
   ```

3. **Apply migrations**:

   ```bash
   npm run db:push
   ```

This runs `supabase link` using your project ref (parsed from `NEXT_PUBLIC_SUPABASE_URL`) and `supabase db push` so everything in `supabase/migrations/` is applied in order.

**Note:** The database password is **not** the anon API key. Do not commit `SUPABASE_DB_PASSWORD`; only `export` it in your terminal for the push.

### Option B — SQL Editor (no CLI)

Apply the SQL in **`supabase/migrations/`** in **filename order** (oldest first):

1. Open **SQL Editor** in the Supabase dashboard.
2. Paste and run the full contents of `20260405000000_init_ngo_content.sql`.
3. Paste and run the full contents of `20260405120000_admin_profiles_rls_storage.sql`.

If a migration fails partway, fix the error before re-running; you may need a fresh project or manual cleanup.

## 5. Auth settings for the admin app

1. **Authentication → Providers → Email**: ensure **Email** is enabled (password sign-in).
2. **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` for local development.
   - **Redirect URLs**: add `http://localhost:3000/**` so OAuth/PKCE flows work if you add them later.

Optional: disable **Confirm email** for faster dev testing (under Email provider settings).

## 6. First admin user

Full walkthrough (create user + grant `admin`): **[setup-admin-account.md](./setup-admin-account.md)**.

Short version:

1. **Authentication → Users → Add user** (email + password; enable **Auto Confirm User** for easy local testing).
2. In **SQL Editor**, run **`supabase/snippets/grant-admin-by-email.sql`** after changing the email to match step 1 (or use the `insert … select from auth.users` query in the doc).
3. Sign in at `http://localhost:3000/admin/login`.

## 7. Verify

- Public site loads content from **Postgres** (seed rows exist after migrations).
- `/admin` works after login; CRUD actions use Server Actions + RLS.

## Production (Vercel)

Add the same variables in Vercel **Environment Variables**; set `NEXT_PUBLIC_SITE_URL` to your real domain (no trailing slash). Update Supabase **Site URL** and **Redirect URLs** to include your production URL.

See also **[IT-HANDOFF.md](./IT-HANDOFF.md)** for staff-facing operations.
