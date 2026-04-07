"use client";

import { useActionState } from "react";
import { submitContact, type ContactActionState } from "@/actions/contact";

const initial: ContactActionState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initial
  );

  if (state.ok) {
    return (
      <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-base leading-[1.6] text-foreground">
        {state.message ?? "Thank you — we will get back to you soon."}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-base font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="w-full rounded-lg border border-input bg-background px-3 py-3 text-base leading-normal outline-none ring-offset-background transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:py-2.5"
          aria-invalid={state.fieldErrors?.name ? true : undefined}
        />
        {state.fieldErrors?.name ? (
          <p className="text-base text-destructive">{state.fieldErrors.name}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-base font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-input bg-background px-3 py-3 text-base leading-normal outline-none ring-offset-background transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:py-2.5"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
        />
        {state.fieldErrors?.email ? (
          <p className="text-base text-destructive">{state.fieldErrors.email}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-base font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-lg border border-input bg-background px-3 py-3 text-base leading-[1.55] outline-none ring-offset-background transition-shadow focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:py-2.5"
          aria-invalid={state.fieldErrors?.message ? true : undefined}
        />
        {state.fieldErrors?.message ? (
          <p className="text-base text-destructive">{state.fieldErrors.message}</p>
        ) : null}
      </div>
      {state.message && !state.ok ? (
        <p className="text-base text-destructive">{state.message}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/85 disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:h-10 sm:w-auto"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
