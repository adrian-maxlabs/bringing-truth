import Link from "next/link";
import { Heart } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/updates", label: "Updates" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL ?? "#";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold tracking-tight text-foreground"
        >
          BringingTruth
        </Link>
        <nav
          className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1 gap-y-2 sm:justify-end sm:gap-x-2 sm:gap-y-0"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:min-h-9 sm:min-w-0 sm:px-2 sm:py-1.5"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={donationUrl}
            target={donationUrl === "#" ? undefined : "_blank"}
            rel={
              donationUrl === "#" ? undefined : "noopener noreferrer"
            }
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:ml-1 sm:h-9 sm:min-h-0 sm:px-3"
            aria-label="Donate to BringingTruth"
          >
            <Heart className="size-3.5 shrink-0" aria-hidden />
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pb-10">
        <p className="text-base text-muted-foreground">
          © {year} BringingTruth. All rights reserved.
        </p>
        <p className="text-base text-muted-foreground">
          Christian ministry · NGO
        </p>
      </div>
    </footer>
  );
}
