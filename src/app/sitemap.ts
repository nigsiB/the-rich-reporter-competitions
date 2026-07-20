import type { MetadataRoute } from "next";
import { competitions } from "@/data/competitions";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date() },
    ...competitions.map((c) => ({
      url: `${base}/competitions/${c.id}`,
      lastModified: new Date(),
    })),
  ];
}
