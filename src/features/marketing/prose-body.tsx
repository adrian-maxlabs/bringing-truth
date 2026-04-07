/**
 * Lightweight formatting for update bodies (markdown-like; no runtime parser).
 */
export function ProseBody({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\n+/);

  return (
    <div className="max-w-none text-foreground">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const first = lines[0] ?? "";

        if (first.startsWith("# ")) {
          return (
            <h2
              key={i}
              className="mt-8 mb-3 text-xl font-semibold tracking-tight first:mt-0 sm:text-2xl"
            >
              {first.slice(2).trim()}
            </h2>
          );
        }

        if (first.startsWith("> ")) {
          const quote = lines
            .map((l) => l.replace(/^>\s?/, ""))
            .join("\n")
            .replace(/^\*|\*$/g, "");
          return (
            <blockquote
              key={i}
              className="border-l-4 border-primary/40 pl-4 text-base italic leading-[1.65] text-muted-foreground sm:text-lg"
            >
              {quote}
            </blockquote>
          );
        }

        const paragraph = lines
          .map((line) => line.replace(/\*\*(.+?)\*\*/g, "$1"))
          .join(" ");
        return (
          <p
            key={i}
            className="mb-4 text-base leading-[1.7] text-muted-foreground sm:text-lg"
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
