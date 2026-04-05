import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Edit organization copy, publish updates, manage highlights and
          testimonies, and read contact messages.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/organization"
            className="block rounded-xl border border-border bg-card p-5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            Organization copy
          </Link>
        </li>
        <li>
          <Link
            href="/admin/posts"
            className="block rounded-xl border border-border bg-card p-5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            Posts & updates
          </Link>
        </li>
        <li>
          <Link
            href="/admin/highlights"
            className="block rounded-xl border border-border bg-card p-5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            Mission highlights
          </Link>
        </li>
        <li>
          <Link
            href="/admin/testimonies"
            className="block rounded-xl border border-border bg-card p-5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            Testimonies
          </Link>
        </li>
        <li className="sm:col-span-2">
          <Link
            href="/admin/contacts"
            className="block rounded-xl border border-border bg-card p-5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            Contact submissions
          </Link>
        </li>
      </ul>
    </div>
  );
}
