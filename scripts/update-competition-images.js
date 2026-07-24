/**
 * Strip crushing Unsplash sat/bri params from live competition image URLs.
 * Usage: DATABASE_URL=... node scripts/update-competition-images.js
 * Or: SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL via .env.local
 */
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function stripCrushParams(url) {
  if (!url || typeof url !== "string") return url;
  try {
    const u = new URL(url);
    u.searchParams.delete("sat");
    u.searchParams.delete("bri");
    return u.toString();
  } catch {
    return url
      .replace(/&sat=-?\d+/g, "")
      .replace(/&bri=-?\d+/g, "")
      .replace(/\?sat=-?\d+/g, "?")
      .replace(/\?bri=-?\d+/g, "?")
      .replace(/\?&/, "?")
      .replace(/\?$/, "");
  }
}

const FALLBACKS = {
  "Free Magazine Advert":
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=85&w=1200",
  "Cash Prize $1,000":
    "https://images.unsplash.com/photo-1716782494065-e9268365ef9f?auto=format&fit=crop&q=85&w=1200",
  "iPhone 17":
    "https://images.unsplash.com/photo-1762512949121-c1fc05b36e1a?auto=format&fit=crop&q=85&w=1200",
  iPad: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=85&w=1200",
  "Samsung Laptop":
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=85&w=1200",
};

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      "Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (in env or .env.local).",
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: rows, error } = await supabase
    .from("competitions")
    .select("id, title, image_url, gallery_urls");

  if (error) throw error;

  for (const row of rows ?? []) {
    const nextImage =
      stripCrushParams(row.image_url) || FALLBACKS[row.title] || row.image_url;
    const gallery = Array.isArray(row.gallery_urls)
      ? row.gallery_urls.map(stripCrushParams)
      : row.gallery_urls;

    const { error: upErr } = await supabase
      .from("competitions")
      .update({
        image_url: nextImage,
        gallery_urls: gallery,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    if (upErr) throw upErr;
    console.log("Updated:", row.title);
    console.log("  image_url:", nextImage);
    if (gallery?.length) console.log("  gallery:", gallery);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
