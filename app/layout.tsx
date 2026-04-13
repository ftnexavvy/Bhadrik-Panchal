import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import ConditionalFooter from "@/components/ConditionalFooter";
import CustomCursor from "@/components/CustomCursor";

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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
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
        {/* Preload the first frame of the scrolly sequence as it is the LCP element */}
        <link
          rel="preload"
          href="/sequence/frame_00_delay-0.1s.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.variable} ${dmSans.variable} ${cormorant.variable} font-sans bg-black text-white antialiased cursor-none`}>
        <CustomCursor />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          {children}
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
