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
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">BringingTruth admin</span>
            <nav className="flex flex-wrap gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View site
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        {children}
      </div>
    </div>
  );
}
