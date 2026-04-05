#!/usr/bin/env node
/**
 * Links this repo to your Supabase project (from NEXT_PUBLIC_SUPABASE_URL in .env.local)
 * and runs `supabase db push` to apply supabase/migrations/*.sql in order.
 *
 * Prerequisites:
 *   1. npx supabase login   (once per machine — opens browser or use access token)
 *   2. export SUPABASE_DB_PASSWORD='...'   (database password from when you created the project)
 *
 * Then: npm run db:push
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envPath = path.join(root, ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("Missing .env.local — copy .env.example and add NEXT_PUBLIC_SUPABASE_URL.");
  process.exit(1);
}

const raw = fs.readFileSync(envPath, "utf8");
const urlLine = raw
  .split(/\r?\n/)
  .find((l) => l.startsWith("NEXT_PUBLIC_SUPABASE_URL="));
const url = urlLine?.split("=").slice(1).join("=").trim();
if (!url) {
  console.error("NEXT_PUBLIC_SUPABASE_URL not found in .env.local");
  process.exit(1);
}

const ref = url
  .replace(/^https:\/\//, "")
  .replace(/\.supabase\.co\/?$/, "")
  .trim();
if (!ref || ref.includes("/")) {
  console.error("Could not parse project ref from NEXT_PUBLIC_SUPABASE_URL:", url);
  process.exit(1);
}

const password = process.env.SUPABASE_DB_PASSWORD;
if (!password) {
  console.error(
    [
      "Do this once, then run db:push again:",
      "",
      "  1) npx supabase login          # authenticates the Supabase CLI (browser or token)",
      "  2) export SUPABASE_DB_PASSWORD='your-database-password'",
      "  3) npm run db:push",
      "",
      "Database password: Supabase Dashboard → Project Settings → Database",
      "(the password you chose when creating the project; use Reset if needed).",
    ].join("\n")
  );
  process.exit(1);
}

const npxArgs = (cmd) => ["--yes", "supabase@latest", ...cmd];

function run(label, file, args) {
  console.error(`\n→ ${label}\n`);
  const r = spawnSync(file, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env },
  });
  if (r.error) {
    console.error(r.error);
    process.exit(1);
  }
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

run("Checking Supabase CLI login…", "npx", [
  ...npxArgs(["projects", "list"]),
]);

run(
  "Linking project (ref: " + ref + ")…",
  "npx",
  npxArgs([
    "link",
    "--project-ref",
    ref,
    "-p",
    password,
  ])
);

run("Applying migrations (db push)…", "npx", npxArgs(["db", "push", "-p", password]));

console.error("\nDone. Migrations should now be on your Supabase project.\n");
