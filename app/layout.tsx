import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Bhadrik Panchal | Business Coach • Motivational Speaker • Entrepreneur",
  description: "Helping vyaparis grow into 7-figure entrepreneurs using 15+ years of relentless digital marketing strategy and combat-tested systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Only preconnect to origins actually used at page load */}
        <link rel="preconnect" href="https://asset.cal.com" />
        <link rel="dns-prefetch" href="https://api.web3forms.com" />

        {/* Inline critical CSS to eliminate render-blocking network request */}
        <style dangerouslySetInnerHTML={{ __html: `html,body{overflow-x:clip;max-width:100%;position:relative}body{background:#000;color:#fff}` }} />

        {/* Preload LCP hero image with responsive sources */}
        <link
          rel="preload"
          href="/sequence/frame_00_delay-0.1s-400.webp"
          as="image"
          imageSrcSet="/sequence/frame_00_delay-0.1s-400.webp 400w, /sequence/frame_00_delay-0.1s.webp 800w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/sequence/frame_00_delay-0.1s-400.jpg"
          as="image"
          imageSrcSet="/sequence/frame_00_delay-0.1s-400.jpg 400w, /sequence/frame_00_delay-0.1s.jpg 800w"
          imageSizes="100vw"
          type="image/jpeg"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.variable} ${dmSans.variable} font-sans bg-black text-white antialiased cursor-none`}>
        <div id="initial-lcp-fallback" aria-hidden className="fixed inset-0 bg-black pointer-events-none">
          <picture className="absolute inset-0 block h-full w-full">
            <source
              srcSet="/sequence/frame_00_delay-0.1s-400.webp 400w, /sequence/frame_00_delay-0.1s.webp 800w"
              sizes="100vw"
              type="image/webp"
            />
            <source
              srcSet="/sequence/frame_00_delay-0.1s-400.jpg 400w, /sequence/frame_00_delay-0.1s.jpg 800w"
              sizes="100vw"
              type="image/jpeg"
            />
            <img
              src="/sequence/frame_00_delay-0.1s.jpg"
              alt=""
              width={800}
              height={450}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
