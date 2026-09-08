import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "briyqzbaslkbsbkmiwys.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Magazine covers for the "Who We Are" strip, served from the
        // magazine's own WordPress install.
        protocol: "https",
        hostname: "therichreporter.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stops the site being framed for clickjacking. SAMEORIGIN rather
          // than DENY because Stripe Elements iframes live inside our own page.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // The old *.vercel.app host still serves the whole site, which would
        // have Google indexing two copies. Rather than redirect it (that would
        // also break preview deployments), tell crawlers to ignore that host
        // only. The domain stays reachable as a fallback.
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "the-rich-reporter-competitions.vercel.app",
          },
        ],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
