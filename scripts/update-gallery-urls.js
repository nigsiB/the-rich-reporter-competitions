/**
 * Set exactly 3 secondary gallery images per active competition.
 * Does NOT modify image_url (main).
 * Usage: node scripts/update-gallery-urls.js
 */
const { Client } = require("pg");

const Q = "?auto=format&fit=crop&q=85&w=1200";

const GALLERIES = {
  "iPhone 17": [
    `https://images.unsplash.com/photo-1759588071847-6ba0f3dbd16e${Q}`,
    `https://images.unsplash.com/photo-1758467700508-1de0ab755248${Q}`,
    `https://images.unsplash.com/photo-1758186361602-c3f23037eb95${Q}`,
  ],
  "Cash Prize $1,000": [
    `https://images.unsplash.com/photo-1567427017947-545c5f8d16ad${Q}`,
    `https://images.unsplash.com/photo-1526304640581-d334cdbbf45e${Q}`,
    `https://images.unsplash.com/photo-1607863680198-23d4b2565df0${Q}`,
  ],
  "Free Magazine Advert": [
    `https://images.unsplash.com/photo-1504711434969-e33886168f5c${Q}`,
    `https://images.unsplash.com/photo-1586339949916-3e9457bef6d3${Q}`,
    `https://images.unsplash.com/photo-1455849318743-b2233052fcff${Q}`,
  ],
  iPad: [
    `https://images.unsplash.com/photo-1561154464-82e9adf32764${Q}`,
    `https://images.unsplash.com/photo-1585790050230-5dd28404ccb9${Q}`,
    `https://images.unsplash.com/photo-1542759564-7ccbb6ac450a${Q}`,
  ],
  "Samsung Laptop": [
    `https://images.unsplash.com/photo-1588872657578-7efd1f1555ed${Q}`,
    `https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2${Q}`,
    `https://images.unsplash.com/photo-1593640408182-31c70c8268f5${Q}`,
  ],
};

async function verifyUrls(urls) {
  for (const url of urls) {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    console.log("  OK", res.status, url);
  }
}

async function main() {
  const allUrls = Object.values(GALLERIES).flat();
  console.log("Verifying Unsplash URLs...");
  await verifyUrls(allUrls);

  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:fxijNjGa2_nar9r@db.briyqzbaslkbsbkmiwys.supabase.co:5432/postgres",
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  for (const [title, gallery] of Object.entries(GALLERIES)) {
    const { rows } = await client.query(
      `UPDATE competitions
       SET gallery_urls = $1::text[],
           updated_at = NOW()
       WHERE title = $2 AND status = 'active'
       RETURNING id, title, image_url, gallery_urls`,
      [gallery, title],
    );
    if (!rows.length) {
      console.warn("No active competition titled:", title);
      continue;
    }
    const row = rows[0];
    console.log("\nUpdated:", row.title);
    console.log("  main (unchanged):", row.image_url);
    console.log("  gallery:", row.gallery_urls);
  }

  const check = await client.query(
    `SELECT title, cardinality(gallery_urls) AS n, image_url, gallery_urls
     FROM competitions WHERE status = 'active' ORDER BY display_order, title`,
  );
  console.log("\nFinal active competitions:");
  for (const row of check.rows) {
    console.log(`- ${row.title}: gallery count=${row.n}`);
  }

  await client.end();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
