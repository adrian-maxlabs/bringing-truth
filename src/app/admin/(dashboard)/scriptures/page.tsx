import type { Metadata } from "next";
import Link from "next/link";
import { deleteScripture } from "@/features/cms/actions";
import { getAllScriptures } from "@/lib/cms/admin-queries";

export const metadata: Metadata = {
  title: "Homepage scripture",
};

export default async function AdminScripturesPage() {
  const rows = await getAllScriptures();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Homepage scripture</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Full-width verse bands on the home page. Order controls which verse appears in each
            slot (first four published rows, lowest sort order first).
          </p>
        </div>
        <Link
          href="/admin/scriptures/new"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
        >
          New scripture band
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Anchor</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/80 last:border-0">
                <td className="px-4 py-3 font-medium">{r.reference}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {r.anchor_slug}
                </td>
                <td className="px-4 py-3">{r.sort_order}</td>
                <td className="px-4 py-3">{r.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/scriptures/${r.id}/edit`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteScripture}>
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
