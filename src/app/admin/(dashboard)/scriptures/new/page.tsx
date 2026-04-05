import type { Metadata } from "next";
import Link from "next/link";
import { ScriptureFormNew } from "@/features/cms/scripture-form";

export const metadata: Metadata = {
  title: "New scripture band",
};

export default function AdminNewScripturePage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/scriptures"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← All scripture bands
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">New scripture band</h1>
      </div>
      <ScriptureFormNew />
    </div>
  );
}
