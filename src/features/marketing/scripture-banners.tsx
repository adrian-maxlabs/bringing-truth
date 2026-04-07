import { cn } from "@/lib/utils";

type Tone = "light" | "deep";

type ScriptureHeroSectionProps = {
  id: string;
  reference: string;
  /** Short label, e.g. "ESV" — optional */
  translationNote?: string;
  children: string;
  tone?: Tone;
};

/**
 * Full-width band for Scripture — place between major homepage sections.
 * Use stable `id` values for in-page anchors (e.g. /#scripture-jesus-is-truth).
 */
export function ScriptureHeroSection({
  id,
  reference,
  translationNote = "ESV",
  children,
  tone = "light",
}: ScriptureHeroSectionProps) {
  return (
    <section
      id={id}
      aria-label={`Bible verse: ${reference}`}
      className={cn(
        "relative w-full scroll-mt-28 border-y sm:scroll-mt-[4.5rem]",
        tone === "light"
          ? "border-border/60 bg-gradient-to-b from-muted/50 via-muted/30 to-muted/50"
          : "border-primary/15 bg-gradient-to-br from-primary/[0.12] via-primary/[0.06] to-background"
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.55_0.09_230/0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Scripture
        </p>
        <blockquote
          className={cn(
            "mt-5 text-pretty font-serif text-xl italic leading-[1.65] text-foreground sm:text-2xl md:text-[1.75rem] md:leading-[1.55]"
          )}
          cite={reference}
        >
          &ldquo;{children}&rdquo;
        </blockquote>
        <p className="mt-6 text-base font-medium text-muted-foreground">
          {reference}
          {translationNote ? (
            <span className="text-muted-foreground/80"> · {translationNote}</span>
          ) : null}
        </p>
      </div>
    </section>
  );
}
