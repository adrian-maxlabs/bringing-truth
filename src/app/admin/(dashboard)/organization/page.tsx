import type { Metadata } from "next";
import { OrganizationForm } from "@/features/cms/organization-form";
import { getOrganizationProfileRow } from "@/lib/cms/admin-queries";

export const metadata: Metadata = {
  title: "Organization",
};

export default async function AdminOrganizationPage() {
  const profile = await getOrganizationProfileRow();

  if (!profile) {
    return (
      <p className="text-sm text-muted-foreground">
        No organization profile row found. Run Supabase migrations / seed SQL.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Organization</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Hero, mission, and vision copy shown on the public homepage.
        </p>
      </div>
      <OrganizationForm profile={profile} />
    </div>
  );
}
