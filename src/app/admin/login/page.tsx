import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/features/cms/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="text-sm text-muted-foreground">
          BringingTruth content management
        </p>
      </div>
      <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading…</p>}>
        <LoginForm />
      </Suspense>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/" className="font-medium text-foreground hover:underline">
          ← Back to site
        </Link>
      </p>
    </div>
  );
}
