# Create your first admin login

Do this **after** [database migrations](./connect-supabase.md) are applied. The app checks `public.profiles.role = 'admin'` before allowing `/admin`.

## Option A — Seed script (automated)

Uses the Supabase **service role** key (server-only; never put it in `NEXT_PUBLIC_*` or client code).

1. In Supabase: **Project Settings → API**, copy the **service_role** secret (not the anon key).
2. Add to **`.env.local`** (never commit this file):

   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SEED_ADMIN_EMAIL=you@example.com
   SEED_ADMIN_PASSWORD=a-strong-password
   ```

   `NEXT_PUBLIC_SUPABASE_URL` must already match your project.

3. From the repo root:

   ```bash
   npm run seed:admin
   ```

The script creates the Auth user (if missing), sets **email confirmed**, updates the password if the user already exists, and upserts `public.profiles` with `role = 'admin'`.

4. Sign in at **http://localhost:3000/admin/login**.

**Security:** Remove `SEED_ADMIN_PASSWORD` (and optionally rotate the password) after you’re done if you don’t want it stored on disk. Never commit `SUPABASE_SERVICE_ROLE_KEY`.

---

## Option B — Manual (dashboard + SQL)

### 1. Create the user in Supabase Auth

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project.
2. Go to **Authentication → Users**.
3. Click **Add user → Create new user**.
4. Enter **email** and **password** (save the password somewhere safe).
5. Leave **Auto Confirm User** **ON** for local testing so you can sign in immediately without email confirmation.  
   (For production, you can require email confirmation instead.)

### 2. Grant the `admin` role in Postgres

The login user must have a row in `public.profiles` with `role = 'admin'`.

1. Go to **SQL Editor → New query**.
2. Paste the contents of **`supabase/snippets/grant-admin-by-email.sql`**.
3. Change `'you@example.com'` to the **same email** you used in step 1.
4. Run the query. You should see “Success”.

One-shot alternative (replace both placeholders):

```sql
insert into public.profiles (id, role)
select id, 'admin'::text
from auth.users
where lower(email) = lower('your-actual@email.com')
on conflict (id) do update set role = excluded.role;
```

### 3. Sign in on the site

1. Start the app: `npm run dev`
2. Open **http://localhost:3000/admin/login**
3. Sign in with that email and password.

If you see “This account is not authorized for admin”, the `profiles` row is missing or `role` is not `admin` — re-run the SQL and confirm the email matches `auth.users` exactly.

## Troubleshooting

| Issue | What to try |
|--------|-------------|
| “Invalid login credentials” | Wrong password, or user not created; reset password under **Authentication → Users**. |
| “Email not confirmed” | **Authentication → Providers → Email**: disable “Confirm email” for dev, or confirm the message in inbox. |
| “Supabase is not configured” | `.env.local` missing `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. |
| “Not authorized for admin” | Run Option A again, or run the SQL in Option B with the correct email. |
| `seed:admin` auth errors | Confirm **service_role** key (not anon). Migrations must have created `public.profiles`. |

## Security note

Keep **sign-up** restricted to invited users if possible (**Authentication → Providers**). The service role key bypasses RLS — store it only in `.env.local` / CI secrets, never in the browser.
