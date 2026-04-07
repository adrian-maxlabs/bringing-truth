import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { logout } from "@/actions/auth";

export const metadata: Metadata = {
  title: { template: "%s · Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/organization", label: "Organization" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/highlights", label: "Highlights" },
  { href: "/admin/testimonies", label: "Testimonies" },
  { href: "/admin/scriptures", label: "Scripture" },
  { href: "/admin/contacts", label: "Contacts" },
] as const;

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3 sm:px-6">
          <div className="min-w-0 space-y-2">
            <span className="block text-sm font-semibold">BringingTruth admin</span>
            <nav
              className="-mx-1 flex max-w-full flex-wrap gap-1 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
              aria-label="Admin sections"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-9 shrink-0 items-center rounded-md px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:min-h-0 sm:px-2 sm:py-1"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 sm:pt-0.5">
            <Link
              href="/"
              className="inline-flex min-h-9 items-center text-xs text-muted-foreground hover:text-foreground sm:min-h-0"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex min-h-9 items-center text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:min-h-0"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full min-w-0 max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
