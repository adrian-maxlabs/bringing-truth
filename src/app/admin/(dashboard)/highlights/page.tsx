import type { Metadata } from "next";
import Link from "next/link";
import { deleteHighlight } from "@/features/cms/actions";
import { getAllHighlights } from "@/lib/cms/admin-queries";

export const metadata: Metadata = {
  title: "Highlights",
};

export default async function AdminHighlightsPage() {
  const rows = await getAllHighlights();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Mission highlights
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Shown on the homepage when published.
          </p>
        </div>
        <Link
          href="/admin/highlights/new"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
        >
          New highlight
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/80 last:border-0">
                <td className="px-4 py-3 font-medium">{r.title}</td>
                <td className="px-4 py-3">{r.sort_order}</td>
                <td className="px-4 py-3">{r.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/highlights/${r.id}/edit`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteHighlight}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        type="submit"
                        className="text-sm font-medium text-destructive hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
