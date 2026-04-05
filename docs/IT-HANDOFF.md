# IT handoff — BringingTruth site

This document is for **internal staff** who update the public website without editing code.

## 1. Environments

| Where | What to set |
|-------|-------------|
| **Vercel** (hosting) | Project → Settings → Environment Variables: same keys as `.env.example` in the repo. |
| **Supabase** (database & login) | Project URL and anon key power the site; Auth powers `/admin` sign-in. Developers: first-time project setup is in **[connect-supabase.md](./connect-supabase.md)**. |

Important variables:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase → **Settings → API**.
- `NEXT_PUBLIC_SITE_URL` — canonical URL (no trailing slash), e.g. `https://bringingtruth.org`.
- `NEXT_PUBLIC_DONATION_URL` — external giving page (PayPal, Tithe.ly, etc.). The **Donate** button in the header uses this; change it in Vercel when the link changes.

## 2. First-time admin setup (developer / one-time)

1. Run SQL migrations in `supabase/migrations/` on your Supabase project (CLI or SQL editor).
2. Create the admin login and grant **admin** — follow **[setup-admin-account.md](./setup-admin-account.md)** (or run `supabase/snippets/grant-admin-by-email.sql` after adding the user in **Authentication → Users**).
3. Keep **public sign-up disabled** if you only want invited staff (Authentication → Providers / policies).

## 3. Daily use — content

1. Open `https://<your-domain>/admin/login` (or `/admin` — you will be prompted to sign in).
2. Sign in with the IT account.
3. Use the navigation:

| Section | What it controls |
|---------|------------------|
| **Organization** | Hero text, mission, vision on the **home** page. |
| **Posts** | News / updates; set **Published** and date to show on **Updates** and home teasers. |
| **Highlights** | Mission highlight cards on the home page. |
| **Testimonies** | Quotes on the home page. |
| **Contacts** | Read-only list of messages from the **Contact** form. |

4. **Publishing posts**: create or edit a post, set status to **Published**, and set **Published at** if needed. Drafts stay out of the public site.

## 4. Images (optional)

- Storage bucket **`site-media`** is configured for public reads; admins can upload via Supabase **Storage** (or future in-app upload). Store paths like `folder/image.jpg` in **Cover image path** / **Image path** fields if you use direct URLs from Supabase public URLs.

## 5. If someone is locked out

- Use **Authentication → Users** in Supabase to send a password reset, or reset the password from the dashboard.
- If the user exists but has no **`profiles`** row with `role = 'admin'`, they cannot access `/admin` — add the row (section 2).

## 6. Who to call

- **Domain/DNS** (Namecheap → Vercel): whoever manages the domain.
- **Supabase** billing and backups: account owner.
- **Code changes**: your developer — the site is a Next.js app deployed from Git on Vercel.
