#!/usr/bin/env node
/**
 * Creates (or updates) an admin Auth user and public.profiles row using the
 * Supabase **service role** key (server-only — never expose to the browser).
 *
 * Prerequisites: migrations applied (profiles table exists).
 *
 * Usage:
 *   Set in .env.local (see .env.example):
 *     SUPABASE_SERVICE_ROLE_KEY
 *     NEXT_PUBLIC_SUPABASE_URL
 *     SEED_ADMIN_EMAIL
 *     SEED_ADMIN_PASSWORD
 *
 *   npm run seed:admin
 *
 * If the email already exists in Auth, the script ensures profiles.role = 'admin'.
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
const email = getEnv("SEED_ADMIN_EMAIL", fileVars);
const password = getEnv("SEED_ADMIN_PASSWORD", fileVars);

const missingUrl = !url;
const missingService = !serviceKey;
if (missingUrl || missingService) {
  const lines = ["Add these to .env.local (repo root):"];
  if (missingUrl) lines.push("  • NEXT_PUBLIC_SUPABASE_URL — from Supabase → Settings → API → Project URL");
  if (missingService) {
    lines.push(
      "  • SUPABASE_SERVICE_ROLE_KEY — from Supabase → Settings → API → service_role (secret, not anon)"
    );
  }
  lines.push("Never commit the service role key.");
  console.error(lines.join("\n"));
  process.exit(1);
}

if (!email || !password) {
  console.error(
    [
      "Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in .env.local",
      "(or pass via environment variables).",
    ].join("\n")
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function findUserIdByEmail(targetEmail) {
  const normalized = targetEmail.toLowerCase();
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error) throw error;
    const users = data?.users ?? [];
    const found = users.find(
      (u) => u.email?.toLowerCase() === normalized
    );
    if (found) return found.id;
    if (users.length < perPage) break;
    page += 1;
  }
  return null;
}

async function main() {
  console.error("Seeding admin user…\n");

  let userId = await findUserIdByEmail(email);

  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) {
      console.error("auth.admin.createUser failed:", error.message);
      process.exit(1);
    }
    userId = data.user.id;
    console.error("Created Auth user:", email);
  } else {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (error) {
      console.error("auth.admin.updateUserById failed:", error.message);
      process.exit(1);
    }
    console.error("Auth user already existed; password updated:", email);
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    { id: userId, role: "admin" },
    { onConflict: "id" }
  );

  if (profileError) {
    console.error("profiles upsert failed:", profileError.message);
    if (
      /schema cache|relation .* does not exist|Could not find the table/i.test(
        profileError.message
      )
    ) {
      console.error(
        "\n→ Apply database migrations first: supabase/migrations/*.sql (SQL Editor or npm run db:push).\n" +
          "→ Then run npm run seed:admin again (same email/password is fine)."
      );
    }
    process.exit(1);
  }

  console.error("\nDone. You can sign in at /admin/login with this email and password.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
