/**
 * Apply migration 004 + seed via Postgres URI.
 * Usage:
 *   $env:SUPABASE_DB_PASSWORD="your-db-password"
 *   node scripts/apply-db.mjs
 */
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const root = path.resolve(import.meta.dirname, "..");
const password = process.env.SUPABASE_DB_PASSWORD;
const host = process.env.SUPABASE_DB_HOST ?? "db.briyqzbaslkbsbkmiwys.supabase.co";

if (!password) {
  console.error("Set SUPABASE_DB_PASSWORD before running.");
  process.exit(1);
}

async function main() {
  const client = new pg.Client({
    host,
    port: 5432,
    user: "postgres",
    password,
    database: "postgres",
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });
  await client.connect();
  console.log("Connected.");

  const migration = fs.readFileSync(
    path.join(root, "supabase/migrations/004_cash_marketing_subs.sql"),
    "utf8",
  );
  const seed = fs.readFileSync(path.join(root, "supabase/seed.sql"), "utf8");

  await client.query(migration);
  console.log("Migration 004 OK.");
  await client.query(seed);
  console.log("Seed OK.");

  const { rows } = await client.query(
    "SELECT title, cash_alternative, retail_value, is_monthly FROM competitions ORDER BY display_order",
  );
  console.table(rows);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
