import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ClientShell from "@/components/ClientShell";
import Analytics from "@/components/Analytics";
import {
  SITE_SHORT_NAME,
  SITE_URL,
  buildPageMetadata,
  globalSchemas,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const homeMetadata = buildPageMetadata({
  title: "Business Growth Coach in Ahmedabad | Bhadrik Panchal",
  description:
    "Work with Bhadrik Panchal to build clarity, systems, and predictable business growth through strategic coaching, speaking, and execution support.",
  path: "/",
  keywords: [
    "business growth coach in Ahmedabad",
    "business coach in Ahmedabad",
    "motivational speaker in Gujarat",
    "Bhadrik Panchal",
  ],
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_SHORT_NAME,
  referrer: "origin-when-cross-origin",
  category: "Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
   icons: {
    icon: "/favicon.ico",
  },
   verification: {
    google: "IWHaxHUFJG_dj4eJeq8V1FHtvW0MF2oGU6qZlqF32Z0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preload"
          href="/sequence/frame_00_poster-640.webp"
          as="image"
          imageSrcSet="/sequence/frame_00_poster-400.webp 400w, /sequence/frame_00_poster-640.webp 640w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        {globalSchemas.map((schema, index) => (
          <script
            key={`global-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${inter.variable} font-sans bg-black text-white antialiased cursor-none`}
      >
        <ClientShell>{children}</ClientShell>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
