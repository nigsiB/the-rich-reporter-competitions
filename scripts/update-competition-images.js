const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URL before running this script.");
  process.exit(1);
}

const MAGAZINE_URL =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=85&w=1200&sat=-25&bri=-15";
const CASH_URL =
  "https://images.unsplash.com/photo-1716782494065-e9268365ef9f?auto=format&fit=crop&q=85&w=1200&sat=-20&bri=-15";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const magazine = await client.query(
    `UPDATE competitions SET image_url = $1, updated_at = NOW()
     WHERE title = 'Free Magazine Advert'
     RETURNING id, title, image_url`,
    [MAGAZINE_URL],
  );
  const cash = await client.query(
    `UPDATE competitions SET image_url = $1, updated_at = NOW()
     WHERE title = 'Cash Prize $1,000'
     RETURNING id, title, image_url`,
    [CASH_URL],
  );

  console.log("Updated magazine:", magazine.rows);
  console.log("Updated cash:", cash.rows);

  const all = await client.query(
    `SELECT title, image_url FROM competitions
     WHERE title IN ('Free Magazine Advert', 'Cash Prize $1,000')
     ORDER BY title`,
  );
  console.log("Verify:", all.rows);
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
