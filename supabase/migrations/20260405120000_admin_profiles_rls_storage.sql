-- Admin profiles + policies for IT-managed content (see docs/IT-HANDOFF.md)

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now ()
);

alter table public.profiles enable row level security;

-- Users can read their own profile (role check in the app)
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid () = id);

-- Rows are inserted via SQL (service role) when onboarding an admin — see docs/IT-HANDOFF.md

-- Helper: admin check
-- Policies below use exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')

-- organization_profile: allow admins to update the single row
create policy "organization_profile_update_admin"
  on public.organization_profile for update to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

-- posts: admins full CRUD; drafts visible only to admins via this policy OR published read
create policy "posts_select_admin_all"
  on public.posts for select to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "posts_insert_admin"
  on public.posts for insert to authenticated
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "posts_update_admin"
  on public.posts for update to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "posts_delete_admin"
  on public.posts for delete to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

-- mission_highlights
create policy "mission_highlights_select_admin_all"
  on public.mission_highlights for select to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "mission_highlights_insert_admin"
  on public.mission_highlights for insert to authenticated
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "mission_highlights_update_admin"
  on public.mission_highlights for update to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "mission_highlights_delete_admin"
  on public.mission_highlights for delete to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

-- testimonies
create policy "testimonies_select_admin_all"
  on public.testimonies for select to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "testimonies_insert_admin"
  on public.testimonies for insert to authenticated
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "testimonies_update_admin"
  on public.testimonies for update to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "testimonies_delete_admin"
  on public.testimonies for delete to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

-- contact_submissions: admins can read
create policy "contact_submissions_select_admin"
  on public.contact_submissions for select to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

-- Storage: public bucket for site images
insert into
  storage.buckets (id, name, public)
values
  ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "site_media_public_read"
  on storage.objects for select
  using (bucket_id = 'site-media');

create policy "site_media_admin_insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'site-media'
    and exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "site_media_admin_update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'site-media'
    and exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  )
  with check (
    bucket_id = 'site-media'
    and exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "site_media_admin_delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'site-media'
    and exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );
