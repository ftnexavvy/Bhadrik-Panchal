import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Bhadrik Panchal Ahemdabad, Gujarat | Business Coach • Motivational Speaker • Entrepreneur",
  description:
    "Unlock business growth with clarity, systems, and disciplined execution. Bhadrik Panchal helps entrepreneurs scale faster with strategic precision and control.",
  keywords: [
    "business coach",
    "business growth",
    "scaling",
    "systems",
    "clarity",
    "entrepreneur coaching",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preload lightweight poster used in above-the-fold hero */}
        <link
          rel="preload"
          href="/sequence/frame_00_poster-640.webp"
          as="image"
          imageSrcSet="/sequence/frame_00_poster-400.webp 400w, /sequence/frame_00_poster-640.webp 640w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.variable} font-sans bg-black text-white antialiased cursor-none`}>
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
