#!/usr/bin/env node
/**
 * Verifies .env.local has non-empty Supabase URL and anon key (no secrets printed).
 */
import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");

if (!fs.existsSync(envPath)) {
  console.error(
    "Missing .env.local — copy .env.example to .env.local and add your Supabase keys.\n" +
      "See docs/connect-supabase.md"
  );
  process.exit(1);
}

const raw = fs.readFileSync(envPath, "utf8");
const lines = raw.split(/\r?\n/);
const vars = {};
for (const line of lines) {
  const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m) vars[m[1]] = m[2].trim();
}

function nonempty(name) {
  const v = vars[name];
  return v && v.length > 0 && !v.startsWith("#");
}

const okUrl = nonempty("NEXT_PUBLIC_SUPABASE_URL");
const okKey = nonempty("NEXT_PUBLIC_SUPABASE_ANON_KEY");

if (!okUrl || !okKey) {
  console.error(
    "Supabase env vars are incomplete in .env.local.\n" +
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY from Supabase → Settings → API.\n" +
      "See docs/connect-supabase.md"
  );
  process.exit(1);
}

console.log("Supabase env vars look set in .env.local (URL + anon key present).");
