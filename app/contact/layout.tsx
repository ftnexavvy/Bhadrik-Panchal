import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Bhadrik Panchal | Book Business Coaching Call",
  description:
    "Book a strategy call with Bhadrik Panchal to identify bottlenecks, improve systems, and plan your next stage of business growth.",
  path: "/contact",
  keywords: [
    "book business coaching call",
    "contact Bhadrik Panchal",
    "business coach appointment Ahmedabad",
  ],
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
