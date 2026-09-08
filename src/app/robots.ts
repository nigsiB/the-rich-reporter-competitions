import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing useful to crawl here, and /account and /admin redirect to the
      // login page anyway — keeping them out avoids a pile of duplicate
      // sign-in pages in the index.
      disallow: ["/api/", "/admin", "/account", "/checkout"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
