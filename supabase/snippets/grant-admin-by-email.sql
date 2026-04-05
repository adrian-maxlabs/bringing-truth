-- Run in Supabase → SQL Editor after migrations and after the user exists in Authentication.
-- Replace the email with the admin account you created (Authentication → Users).

insert into public.profiles (id, role)
select id, 'admin'::text
from auth.users
where lower(email) = lower('you@example.com')
on conflict (id) do update set role = excluded.role;

-- Verify (optional):
-- select u.email, p.role from auth.users u join public.profiles p on p.id = u.id;
