import Link from "next/link";
import { Heart, Menu } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/updates", label: "Updates" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL ?? "#";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:flex sm:h-14 sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-tight text-foreground"
          >
            BringingTruth
          </Link>
          <details className="group sm:hidden">
            <summary className="inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md border border-border/70 bg-background/90 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <span className="sr-only">Toggle menu</span>
              <Menu className="size-5" aria-hidden />
            </summary>
            <nav
              className="mt-3 flex min-w-0 flex-col gap-2 rounded-xl border border-border/70 bg-background/95 p-2 shadow-sm"
              aria-label="Primary"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                aria-label="Donate to BringingTruth"
              >
                <Heart className="size-3.5 shrink-0" aria-hidden />
                Donate
              </Link>
            </nav>
          </details>
        </div>
        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-x-2 sm:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-9 items-center justify-center rounded-md px-2 py-1.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
