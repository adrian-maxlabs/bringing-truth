import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { ScriptureFormEdit } from "@/features/cms/scripture-form";
import { getScriptureById } from "@/lib/cms/admin-queries";

type Props = { params: Promise<{ id: string }> };

const uuid = z.string().uuid();

export const metadata: Metadata = {
  title: "Edit scripture band",
};

export default async function AdminEditScripturePage(props: Props) {
  const { id } = await props.params;
  const parsed = uuid.safeParse(id);
  if (!parsed.success) {
    notFound();
  }
  const row = await getScriptureById(parsed.data);
  if (!row) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/scriptures"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← All scripture bands
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Edit scripture band</h1>
      </div>
      <ScriptureFormEdit row={row} />
    </div>
  );
}
