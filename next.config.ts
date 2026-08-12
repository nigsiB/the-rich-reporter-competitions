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
};

export default nextConfig;
