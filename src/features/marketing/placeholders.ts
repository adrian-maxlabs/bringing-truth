/**
 * Self-hosted JPEGs in /public/images/marketing (see repo). Served same-origin so
 * they load reliably on all devices without depending on external hotlink URLs.
 * CMS uploads still override via `publicMediaUrl()` where applicable.
 */
export const PLACEHOLDER_IMAGES = {
  hero: {
    src: "/images/marketing/hero.jpg",
    alt: "People gathering in a community setting outdoors",
  },
  impactStrip: {
    src: "/images/marketing/impact.jpg",
    alt: "Hands joined together in a circle showing unity",
  },
  mission: {
    src: "/images/marketing/mission.jpg",
    alt: "Volunteers organizing supplies for families",
  },
  vision: {
    src: "/images/marketing/vision.jpg",
    alt: "Sunrise over mountains symbolizing hope and renewal",
  },
  highlights: [
    {
      src: "/images/marketing/highlight-1.jpg",
      alt: "Team discussion and workshop",
    },
    {
      src: "/images/marketing/highlight-2.jpg",
      alt: "Care packages and support",
    },
    {
      src: "/images/marketing/highlight-3.jpg",
      alt: "Group learning and working together",
    },
  ] as const,
  testimonies: [
    {
      src: "/images/marketing/testimony-1.jpg",
      alt: "",
    },
    {
      src: "/images/marketing/testimony-2.jpg",
      alt: "",
    },
    {
      src: "/images/marketing/testimony-3.jpg",
      alt: "",
    },
  ] as const,
  posts: [
    {
      src: "/images/marketing/post-1.jpg",
      alt: "Team collaboration",
    },
    {
      src: "/images/marketing/post-2.jpg",
      alt: "Hands raised in celebration and gratitude",
    },
  ] as const,
  contactBand: {
    src: "/images/marketing/contact.jpg",
    alt: "Forest path with sunlight",
  },
} as const;
