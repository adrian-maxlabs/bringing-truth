import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HighlightFormEdit } from "@/features/cms/highlight-form";
import { getHighlightById } from "@/lib/cms/admin-queries";
import { z } from "zod";

type Props = { params: Promise<{ id: string }> };

const uuid = z.string().uuid();

export const metadata: Metadata = {
  title: "Edit highlight",
};

export default async function AdminEditHighlightPage(props: Props) {
  const { id } = await props.params;
  const parsed = uuid.safeParse(id);
  if (!parsed.success) {
    notFound();
  }
  const row = await getHighlightById(parsed.data);
  if (!row) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/highlights"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← All highlights
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Edit highlight
        </h1>
      </div>
      <HighlightFormEdit row={row} />
    </div>
  );
}
