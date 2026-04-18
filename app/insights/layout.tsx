import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Growth Insights & Founder Blog | Bhadrik Panchal",
  description:
    "Read practical insights on business growth, leadership, positioning, and systems built for founders who want strategic and sustainable scale.",
  path: "/insights",
  keywords: [
    "business growth blog",
    "founder insights",
    "business strategy articles",
  ],
});

export default function InsightsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
