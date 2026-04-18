import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Coaching Services in Ahmedabad | Bhadrik Panchal",
  description:
    "Explore business coaching services for founders who need better clarity, systems, execution, and consistent scale in Ahmedabad and across Gujarat.",
  path: "/services",
  keywords: [
    "business coaching services Ahmedabad",
    "growth mentor Gujarat",
    "founder strategy coaching",
  ],
});

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
