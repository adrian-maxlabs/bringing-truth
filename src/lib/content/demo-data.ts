import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["organization_profile"]["Row"];
type Post = Database["public"]["Tables"]["posts"]["Row"];
type Highlight = Database["public"]["Tables"]["mission_highlights"]["Row"];
type Testimony = Database["public"]["Tables"]["testimonies"]["Row"];

/** Mirrors seed SQL so the POC looks complete before Supabase is connected. */
export const demoOrganizationProfile: Profile = {
  id: "00000000-0000-4000-8000-000000000001",
  hero_tagline: "Bringing truth and hope to communities",
  hero_subtitle:
    "A Christian ministry serving with integrity, compassion, and a long-term commitment to the people we walk alongside.",
  mission_title: "Our mission",
  mission_body:
    "We equip local leaders, support families in crisis, and share the good news through word and deed — meeting practical needs while building relationships rooted in trust.",
  vision_title: "Our vision",
  vision_body:
    "We envision communities where dignity is restored, faith is lived out in everyday life, and every person knows they are seen, known, and loved.",
  updated_at: new Date().toISOString(),
};

export const demoPosts: Post[] = [
  {
    id: "00000000-0000-4000-8000-000000000101",
    title: "Field report: new outreach season",
    slug: "field-report-new-outreach-season",
    excerpt:
      "What we are seeing on the ground this quarter — partnerships, prayer needs, and next steps.",
    body:
      "# Field report\n\nThis season we expanded outreach in two regions. Local volunteers hosted weekly gatherings, and we distributed resources to families facing hardship.\n\n**Pray with us** for sustained relationships and wisdom for our team.\n\nThank you for standing with BringingTruth.",
    cover_image_path: null,
    published_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-4000-8000-000000000102",
    title: "How your support fuels long-term change",
    slug: "how-your-support-fuels-change",
    excerpt:
      "A short look at how donations translate into training, care, and follow-up — not one-off aid alone.",
    body:
      "# Long-term change\n\nWe prioritize follow-up: mentoring, skills training, and pastoral care. Your giving helps us stay present after the first visit.\n\n> *Faithful presence multiplies impact.*\n\nWe are grateful.",
    cover_image_path: null,
    published_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const demoHighlights: Highlight[] = [
  {
    id: "00000000-0000-4000-8000-000000000201",
    title: "Leadership development",
    body: "Workshops and mentoring for emerging leaders who want to serve their neighborhoods with excellence and humility.",
    image_path: null,
    sort_order: 1,
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-4000-8000-000000000202",
    title: "Family care & relief",
    body: "Practical support during crisis — food, shelter referrals, and pastoral presence when it matters most.",
    image_path: null,
    sort_order: 2,
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-4000-8000-000000000203",
    title: "Community gatherings",
    body: "Regular gatherings for worship, testimony, and mutual encouragement in a welcoming space.",
    image_path: null,
    sort_order: 3,
    published: true,
    created_at: new Date().toISOString(),
  },
];

export const demoTestimonies: Testimony[] = [
  {
    id: "00000000-0000-4000-8000-000000000301",
    author_name: "M. R.",
    body: "When our family lost everything, BringingTruth did not disappear after the first delivery. They walked with us — prayed with us — and helped us find stability again.",
    image_path: null,
    sort_order: 1,
    published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "00000000-0000-4000-8000-000000000302",
    author_name: "Pastor J.",
    body: "I have seen their team show up consistently, with respect for local culture and a genuine love for people. That integrity matters.",
    image_path: null,
    sort_order: 2,
    published: true,
    created_at: new Date().toISOString(),
  },
];
