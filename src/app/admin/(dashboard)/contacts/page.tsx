import type { Metadata } from "next";
import { getContactSubmissions } from "@/lib/cms/admin-queries";

export const metadata: Metadata = {
  title: "Contacts",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default async function AdminContactsPage() {
  const rows = await getContactSubmissions(200);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Contact submissions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Messages from the public contact form (read-only here).
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-border bg-card p-5 text-sm shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{r.name}</p>
                <time
                  className="text-xs text-muted-foreground"
                  dateTime={r.created_at}
                >
                  {formatDate(r.created_at)}
                </time>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{r.email}</p>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-foreground">
                {r.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
