import type { Metadata } from "next";
import Link from "next/link";
import { HighlightFormNew } from "@/features/cms/highlight-form";

export const metadata: Metadata = {
  title: "New highlight",
};

export default function AdminNewHighlightPage() {
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
          New highlight
        </h1>
      </div>
      <HighlightFormNew />
    </div>
  );
}
