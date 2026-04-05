import type { Metadata } from "next";
import { ContactForm } from "@/features/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BringingTruth — questions, partnerships, and prayer.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-8 space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="text-lg leading-[1.65] text-muted-foreground">
          Send a message — we read every note and will respond as soon as we can.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
