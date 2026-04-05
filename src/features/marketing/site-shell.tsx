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
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          BringingTruth
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
            className="ml-1 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
