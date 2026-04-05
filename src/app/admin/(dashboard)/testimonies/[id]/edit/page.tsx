import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TestimonyFormEdit } from "@/features/cms/testimony-form";
import { getTestimonyById } from "@/lib/cms/admin-queries";
import { z } from "zod";

type Props = { params: Promise<{ id: string }> };

const uuid = z.string().uuid();

export const metadata: Metadata = {
  title: "Edit testimony",
};

export default async function AdminEditTestimonyPage(props: Props) {
  const { id } = await props.params;
  const parsed = uuid.safeParse(id);
  if (!parsed.success) {
    notFound();
  }
  const row = await getTestimonyById(parsed.data);
  if (!row) {
    notFound();
  }

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
          Edit testimony
        </h1>
      </div>
      <TestimonyFormEdit row={row} />
    </div>
  );
}
