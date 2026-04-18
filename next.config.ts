import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL || undefined,
  productionBrowserSourceMaps: false,
  compiler: {
    // strip console.* in prod bundles to reduce JS size
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "lucide-react"],
    inlineCss: true,
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
};

export default withAnalyzer(nextConfig);
