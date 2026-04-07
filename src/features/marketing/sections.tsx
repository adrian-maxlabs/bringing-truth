import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { publicMediaUrl } from "@/lib/content/public-media-url";
import { PLACEHOLDER_IMAGES } from "@/features/marketing/placeholders";
import { imgFillCover } from "@/features/marketing/image-styles";
import type { Database } from "@/types/supabase";
import { ProseBody } from "@/features/marketing/prose-body";

type Profile = Database["public"]["Tables"]["organization_profile"]["Row"];
type Post = Database["public"]["Tables"]["posts"]["Row"];
type Highlight = Database["public"]["Tables"]["mission_highlights"]["Row"];
type Testimony = Database["public"]["Tables"]["testimonies"]["Row"];

const trustPoints = [
  "Rooted in local relationships",
  "Transparent, accountable stewardship",
  "Care that does not stop at the first visit",
] as const;

export function HeroPrimarySection({ profile }: { profile: Profile }) {
  const { src, alt } = PLACEHOLDER_IMAGES.hero;

  return (
    <section
      className="relative isolate min-h-[min(88vh,820px)] w-full overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={imgFillCover}
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/75 to-primary/25"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,oklch(0.55_0.09_230/0.18),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-[min(88vh,820px)] w-full max-w-6xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3 py-1.5 text-sm font-medium uppercase tracking-[0.16em] text-primary backdrop-blur-sm">
            <Sparkles className="size-3.5" aria-hidden />
            Christian ministry · NGO
          </p>
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight text-foreground shadow-sm sm:text-5xl md:text-[3.25rem] md:leading-[1.1]"
          >
            {profile.hero_tagline}
          </h1>
          <p className="text-pretty text-lg leading-[1.65] text-muted-foreground sm:text-xl sm:leading-[1.65]">
            {profile.hero_subtitle}
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/updates"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full justify-center gap-2 shadow-md sm:w-auto"
              )}
            >
              Read updates
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full justify-center gap-2 border border-border/80 bg-background/80 backdrop-blur-sm sm:w-auto"
              )}
            >
              <Mail className="size-4" />
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroImpactSection() {
  const { src, alt } = PLACEHOLDER_IMAGES.impactStrip;

  return (
    <section
      className="grid gap-10 overflow-hidden rounded-3xl border border-border/70 bg-muted/15 shadow-sm lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-0 lg:items-stretch"
      aria-labelledby="impact-heading"
    >
      <div className="relative min-h-[220px] w-full overflow-hidden sm:min-h-[260px] lg:min-h-[min(100%,320px)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className={imgFillCover}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent lg:bg-gradient-to-r"
          aria-hidden
        />
      </div>
      <div className="flex flex-col justify-center gap-6 px-6 py-10 sm:px-10 lg:py-14">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Why we serve
          </p>
          <h2
            id="impact-heading"
            className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl"
          >
            Presence that lasts beyond a single moment
          </h2>
          <p className="max-w-md text-pretty text-base leading-[1.65] text-muted-foreground">
            We invest in people and places for the long haul — combining practical
            help with spiritual care and honest partnership.
          </p>
        </div>
        <ul className="space-y-3">
          {trustPoints.map((line) => (
            <li key={line} className="flex gap-3 text-base leading-[1.6]">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MissionVisionSection({ profile }: { profile: Profile }) {
  return (
    <section className="space-y-10" aria-labelledby="mission-vision">
      <div className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Heart of the ministry
        </p>
        <h2
          id="mission-vision"
          className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl"
        >
          Mission &amp; vision
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={PLACEHOLDER_IMAGES.mission.src}
              alt={PLACEHOLDER_IMAGES.mission.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className={cn(
                imgFillCover,
                "transition-transform duration-500 group-hover:scale-[1.02]"
              )}
            />
          </div>
          <div className="space-y-3 p-6 sm:p-7">
            <h3 className="text-xl font-semibold tracking-tight">
              {profile.mission_title}
            </h3>
            <p className="text-pretty text-base leading-[1.65] text-muted-foreground">
              {profile.mission_body}
            </p>
          </div>
        </article>
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={PLACEHOLDER_IMAGES.vision.src}
              alt={PLACEHOLDER_IMAGES.vision.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className={cn(
                imgFillCover,
                "transition-transform duration-500 group-hover:scale-[1.02]"
              )}
            />
          </div>
          <div className="space-y-3 p-6 sm:p-7">
            <h3 className="text-xl font-semibold tracking-tight">
              {profile.vision_title}
            </h3>
            <p className="text-pretty text-base leading-[1.65] text-muted-foreground">
              {profile.vision_body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function HighlightsSection({ highlights }: { highlights: Highlight[] }) {
  return (
    <section className="space-y-8" aria-labelledby="highlights-heading">
      <div className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          On the ground
        </p>
        <h2
          id="highlights-heading"
          className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl"
        >
          Mission highlights
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-[1.65] text-muted-foreground sm:mx-0">
          A snapshot of how we serve — full stories appear across updates and
          field reports.
        </p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h, i) => {
          const resolved = publicMediaUrl(h.image_path);
          const fallback = PLACEHOLDER_IMAGES.highlights[i % PLACEHOLDER_IMAGES.highlights.length];
          const src = resolved ?? fallback.src;
          const alt = resolved
            ? `Photo for ${h.title}`
            : fallback.alt;

          return (
            <li
              key={h.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className={cn(
                    imgFillCover,
                    "transition-transform duration-500 group-hover:scale-[1.03]"
                  )}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug">{h.title}</h3>
                <p className="mt-2 flex-1 text-base leading-[1.6] text-muted-foreground">
                  {h.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function TestimoniesSection({
  testimonies,
}: {
  testimonies: Testimony[];
}) {
  return (
    <section className="space-y-8" aria-labelledby="testimonies-heading">
      <div className="space-y-2 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Stories
        </p>
        <h2
          id="testimonies-heading"
          className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl"
        >
          Testimonies
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-base leading-[1.65] text-muted-foreground sm:mx-0">
          Voices from partners and neighbors we are privileged to walk
          alongside.
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonies.map((t, i) => {
          const resolved = publicMediaUrl(t.image_path);
          const fallback = PLACEHOLDER_IMAGES.testimonies[i % PLACEHOLDER_IMAGES.testimonies.length];
          const src = resolved ?? fallback.src;
          const showAlt = resolved
            ? `Photo of ${t.author_name}`
            : "";

          return (
            <li
              key={t.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-card p-6 shadow-sm sm:flex-row sm:gap-5 sm:p-7"
            >
              <div className="relative mx-auto size-16 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-md sm:mx-0 sm:size-20">
                <Image
                  src={src}
                  alt={showAlt}
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className={imgFillCover}
                />
              </div>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <blockquote className="text-pretty text-base italic leading-[1.65] text-foreground/90">
                  &ldquo;{t.body}&rdquo;
                </blockquote>
                <p className="mt-4 text-base font-medium not-italic text-muted-foreground">
                  — {t.author_name}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function UpdatesTeaserSection({ posts }: { posts: Post[] }) {
  return (
    <section className="space-y-8" aria-labelledby="updates-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            From the field
          </p>
          <h2
            id="updates-heading"
            className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl"
          >
            Company updates
          </h2>
          <p className="max-w-xl text-pretty text-base leading-[1.65] text-muted-foreground">
            News from the field, stories of impact, and how to pray with us.
          </p>
        </div>
        <Link
          href="/updates"
          className="inline-flex items-center gap-1 text-base font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <ul className="grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => {
          const resolved = publicMediaUrl(post.cover_image_path);
          const fallback = PLACEHOLDER_IMAGES.posts[i % PLACEHOLDER_IMAGES.posts.length];
          const src = resolved ?? fallback.src;
          const alt = resolved
            ? `Cover image for ${post.title}`
            : fallback.alt;

          return (
            <li key={post.id}>
              <Link
                href={`/updates/${post.slug}`}
                className="group grid h-full min-h-0 grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/35 hover:shadow-md lg:min-h-[220px] lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] lg:items-stretch"
              >
                <div className="relative aspect-[16/10] min-h-0 w-full overflow-hidden lg:aspect-auto lg:min-h-[200px]">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className={cn(
                      imgFillCover,
                      "transition-transform duration-500 group-hover:scale-[1.03]"
                    )}
                  />
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.published_at)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-base leading-[1.55] text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-base font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read article
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ContactTeaserSection() {
  const { src, alt } = PLACEHOLDER_IMAGES.contactBand;

  return (
    <section
      className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border/60 shadow-md sm:min-h-[300px]"
      aria-labelledby="contact-teaser-heading"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt=""
          fill
          sizes="(min-width: 1280px) 1152px, 100vw"
          className={imgFillCover}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/88 to-primary/30"
          aria-hidden
        />
      </div>
      <div className="relative z-10 flex flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-14">
        <div className="max-w-xl space-y-3">
          <Heart
            className="size-8 text-primary"
            aria-hidden
            strokeWidth={1.5}
          />
          <h2
            id="contact-teaser-heading"
            className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl"
          >
            Partner with us
          </h2>
          <p className="text-pretty text-base leading-[1.65] text-muted-foreground">
            Questions, invitations to speak, or ideas for collaboration — we
            read every message.
          </p>
        </div>
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full shrink-0 justify-center shadow-md sm:w-auto"
          )}
        >
          Contact
        </Link>
      </div>
    </section>
  );
}

export function PostBody({ body }: { body: string }) {
  return <ProseBody text={body} />;
}
