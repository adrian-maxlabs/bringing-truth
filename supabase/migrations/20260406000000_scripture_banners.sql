-- Full-width homepage scripture bands (editable in /admin/scripture)

create table if not exists public.scripture_banners (
  id uuid primary key default gen_random_uuid (),
  anchor_slug text not null unique,
  sort_order int not null default 0,
  reference text not null default '',
  translation_note text not null default 'ESV',
  body text not null default '',
  tone text not null default 'light' check (tone in ('light', 'deep')),
  published boolean not null default true,
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists scripture_banners_sort_idx on public.scripture_banners (sort_order);

alter table public.scripture_banners enable row level security;

-- Public: published rows only
create policy "scripture_banners_select_public"
  on public.scripture_banners for select
  using (published = true);

-- Admins: see all rows (incl. drafts)
create policy "scripture_banners_select_admin_all"
  on public.scripture_banners for select to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "scripture_banners_insert_admin"
  on public.scripture_banners for insert to authenticated
  with check (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

create policy "scripture_banners_update_admin"
  on public.scripture_banners for update to authenticated
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

create policy "scripture_banners_delete_admin"
  on public.scripture_banners for delete to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where
        p.id = auth.uid ()
        and p.role = 'admin'
    )
  );

insert into
  public.scripture_banners (
    anchor_slug,
    sort_order,
    reference,
    translation_note,
    body,
    tone,
    published
  )
values
  (
    'scripture-jesus-is-truth',
    1,
    'John 14:6',
    'ESV',
    'I am the way, and the truth, and the life. No one comes to the Father except through me.',
    'light',
    true
  ),
  (
    'scripture-truth-sets-free',
    2,
    'John 8:32',
    'ESV',
    'You will know the truth, and the truth will set you free.',
    'deep',
    true
  ),
  (
    'scripture-abide-and-fruit',
    3,
    'John 15:5',
    'ESV',
    'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.',
    'light',
    true
  ),
  (
    'scripture-fruit-of-the-spirit',
    4,
    'Galatians 5:22–23',
    'ESV',
    'The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law.',
    'deep',
    true
  )
on conflict (anchor_slug) do nothing;
