import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  compress: true,
  compiler: {
    // strip console.* in prod bundles to reduce JS size
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "lucide-react"],
  },
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{member}}",
      preventFullImport: true,
    },
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=86400, stale-while-revalidate=59" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default withAnalyzer(nextConfig);
