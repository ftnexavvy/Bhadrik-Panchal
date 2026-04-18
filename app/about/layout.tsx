import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Bhadrik Panchal | Business Coach & Mentor Ahmedabad",
  description:
    "Learn how Bhadrik Panchal helps founders in Ahmedabad build clarity, decision systems, and scalable growth with practical business coaching.",
  path: "/about",
  keywords: [
    "about Bhadrik Panchal",
    "business coach Ahmedabad",
    "founder mentor Gujarat",
  ],
});

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
