import type { Metadata } from "next";
import Link from "next/link";
import { TestimonyFormNew } from "@/features/cms/testimony-form";

export const metadata: Metadata = {
  title: "New testimony",
};

export default function AdminNewTestimonyPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/testimonies"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← All testimonies
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          New testimony
        </h1>
      </div>
      <TestimonyFormNew />
    </div>
  );
}
