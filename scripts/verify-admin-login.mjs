#!/usr/bin/env node
/**
 * Checks that SEED_ADMIN_EMAIL (or VERIFY_ADMIN_EMAIL) can sign in as admin:
 * Auth user exists + public.profiles.role = 'admin'.
 * Uses SUPABASE_SERVICE_ROLE_KEY from .env.local (same as seed script).
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const vars = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

function getEnv(name, fileVars) {
  const v = process.env[name] ?? fileVars[name];
  return v && String(v).length > 0 ? String(v) : "";
}

const root = process.cwd();
const fileVars = parseEnvFile(path.join(root, ".env.local"));

const url = getEnv("NEXT_PUBLIC_SUPABASE_URL", fileVars);
const serviceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY", fileVars);
const email =
  getEnv("VERIFY_ADMIN_EMAIL", fileVars) ||
  getEnv("SEED_ADMIN_EMAIL", fileVars);

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

if (!email) {
  console.error("Set SEED_ADMIN_EMAIL in .env.local (or VERIFY_ADMIN_EMAIL) to the account to check.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserIdByEmail(targetEmail) {
  const normalized = targetEmail.toLowerCase();
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const users = data?.users ?? [];
    const found = users.find((u) => u.email?.toLowerCase() === normalized);
    if (found) return found;
    if (users.length < perPage) break;
    page += 1;
  }
  return null;
}

async function main() {
  const user = await findUserIdByEmail(email);
  if (!user) {
    console.log("NOT ELIGIBLE: No Auth user found for this email.");
    console.log("  → Run npm run seed:admin or create the user in Supabase → Authentication.");
    process.exit(2);
  }

  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (pErr) {
    console.log("NOT ELIGIBLE:", pErr.message);
    if (/relation|does not exist|schema cache/i.test(pErr.message)) {
      console.log("  → Run database migrations (docs/connect-supabase.md), then npm run seed:admin.");
    }
    process.exit(2);
  }

  if (!profile) {
    console.log("NOT ELIGIBLE: Auth user exists but there is no row in public.profiles.");
    console.log("  → Run npm run seed:admin again, or run supabase/snippets/grant-admin-by-email.sql");
    process.exit(2);
  }

  if (profile.role !== "admin") {
    console.log("NOT ELIGIBLE: profiles.role is", JSON.stringify(profile.role), "(expected \"admin\").");
    process.exit(2);
  }

  console.log("ELIGIBLE: This account can use /admin/login.");
  console.log("  • Auth user: present (email confirmed:", user.email_confirmed_at ? "yes" : "no", ")");
  console.log("  • public.profiles.role: admin");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
