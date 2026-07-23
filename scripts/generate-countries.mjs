import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "src", "data", "countries.ts");

const res = await fetch(
  "https://raw.githubusercontent.com/umpirsky/country-list/master/data/en/country.json",
);
if (!res.ok) throw new Error(`Failed to fetch country list: ${res.status}`);
const obj = await res.json();

const entries = Object.entries(obj)
  .filter(([code]) => /^[A-Z]{2}$/.test(code))
  .sort((a, b) => a[1].localeCompare(b[1], "en"));

const rows = entries
  .map(([code, name]) => `  { code: "${code}", name: ${JSON.stringify(name)} },`)
  .join("\n");

const contents = `/** ISO 3166-1 alpha-2 countries (English names). Shared by signup and address forms. */

export type CountryOption = {
  code: string;
  name: string;
};

export const COUNTRIES: CountryOption[] = [
${rows}
];

export const DEFAULT_COUNTRY_CODE = "US";

const COUNTRY_CODES = new Set(COUNTRIES.map((c) => c.code));

export function isValidCountryCode(code: string): boolean {
  return COUNTRY_CODES.has(code.toUpperCase());
}

export function getCountryName(code: string): string | undefined {
  return COUNTRIES.find((c) => c.code === code.toUpperCase())?.name;
}
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, contents, "utf8");
console.log(`Wrote ${entries.length} countries to ${outPath}`);
