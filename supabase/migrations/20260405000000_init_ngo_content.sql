-- BringingTruth NGO content model (see docs/bringingtruth-ngo-site-plan.md)
-- Run via Supabase SQL editor or CLI after project creation.

-- Organization copy (single row)
create table if not exists public.organization_profile (
  id uuid primary key default gen_random_uuid (),
  hero_tagline text not null default '',
  hero_subtitle text not null default '',
  mission_title text not null default '',
  mission_body text not null default '',
  vision_title text not null default '',
  vision_body text not null default '',
  updated_at timestamptz not null default now ()
);

alter table public.organization_profile enable row level security;

-- Posts (company updates / blog-style)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body text not null default '',
  cover_image_path text,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now (),
  updated_at timestamptz not null default now ()
);

create index if not exists posts_published_at_idx on public.posts (published_at desc);

alter table public.posts enable row level security;

-- Mission highlights
create table if not exists public.mission_highlights (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  body text not null default '',
  image_path text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now ()
);

create index if not exists mission_highlights_sort_idx on public.mission_highlights (sort_order);

alter table public.mission_highlights enable row level security;

-- Testimonies
create table if not exists public.testimonies (
  id uuid primary key default gen_random_uuid (),
  author_name text not null,
  body text not null default '',
  image_path text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now ()
);

create index if not exists testimonies_sort_idx on public.testimonies (sort_order);

alter table public.testimonies enable row level security;

-- Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid (),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now ()
);

alter table public.contact_submissions enable row level security;

-- RLS: public read for published marketing content
create policy "Anyone can read organization profile"
  on public.organization_profile for select
  using (true);

create policy "Anyone can read published posts"
  on public.posts for select
  using (
    status = 'published'
    and published_at is not null
    and published_at <= now()
  );

create policy "Anyone can read published mission highlights"
  on public.mission_highlights for select
  using (published = true);

create policy "Anyone can read published testimonies"
  on public.testimonies for select
  using (published = true);

-- Anonymous contact inserts (validated in app with Zod)
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

-- No public select on contact rows (admin uses authenticated policies later)
create policy "No public select on contact submissions"
  on public.contact_submissions for select
  using (false);

-- Seed demo row + content (safe to run once)
insert into public.organization_profile (
  id,
  hero_tagline,
  hero_subtitle,
  mission_title,
  mission_body,
  vision_title,
  vision_body
)
values (
  '00000000-0000-4000-8000-000000000001',
  'Bringing truth and hope to communities',
  'A Christian ministry serving with integrity, compassion, and a long-term commitment to the people we walk alongside.',
  'Our mission',
  'We equip local leaders, support families in crisis, and share the good news through word and deed — meeting practical needs while building relationships rooted in trust.',
  'Our vision',
  'We envision communities where dignity is restored, faith is lived out in everyday life, and every person knows they are seen, known, and loved.'
)
on conflict (id) do nothing;

insert into public.posts (title, slug, excerpt, body, status, published_at)
values
  (
    'Field report: new outreach season',
    'field-report-new-outreach-season',
    'What we are seeing on the ground this quarter — partnerships, prayer needs, and next steps.',
    E'# Field report\n\nThis season we expanded outreach in two regions. Local volunteers hosted weekly gatherings, and we distributed resources to families facing hardship.\n\n**Pray with us** for sustained relationships and wisdom for our team.\n\nThank you for standing with BringingTruth.',
    'published',
    now() - interval '12 days'
  ),
  (
    'How your support fuels long-term change',
    'how-your-support-fuels-change',
    'A short look at how donations translate into training, care, and follow-up — not one-off aid alone.',
    E'# Long-term change\n\nWe prioritize follow-up: mentoring, skills training, and pastoral care. Your giving helps us stay present after the first visit.\n\n> *Faithful presence multiplies impact.*\n\nWe are grateful.',
    'published',
    now() - interval '35 days'
  ),
  (
    'Draft: upcoming event (not published)',
    'draft-upcoming-event',
    'This post is a draft for admin testing.',
    'Draft body.',
    'draft',
    null
  )
on conflict (slug) do nothing;

insert into public.mission_highlights (title, body, sort_order, published)
select * from (values
  (
    'Leadership development',
    'Workshops and mentoring for emerging leaders who want to serve their neighborhoods with excellence and humility.',
    1,
    true
  ),
  (
    'Family care & relief',
    'Practical support during crisis — food, shelter referrals, and pastoral presence when it matters most.',
    2,
    true
  ),
  (
    'Community gatherings',
    'Regular gatherings for worship, testimony, and mutual encouragement in a welcoming space.',
    3,
    true
  )
) as v(title, body, sort_order, published)
where not exists (select 1 from public.mission_highlights limit 1);

insert into public.testimonies (author_name, body, sort_order, published)
select * from (values
  (
    'M. R.',
    'When our family lost everything, BringingTruth did not disappear after the first delivery. They walked with us — prayed with us — and helped us find stability again.',
    1,
    true
  ),
  (
    'Pastor J.',
    'I have seen their team show up consistently, with respect for local culture and a genuine love for people. That integrity matters.',
    2,
    true
  )
) as v(author_name, body, sort_order, published)
where not exists (select 1 from public.testimonies limit 1);
