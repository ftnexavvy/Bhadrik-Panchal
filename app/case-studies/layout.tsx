import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Growth Case Studies | Bhadrik Panchal Ahmedabad",
  description:
    "Read real business case studies from founders who improved clarity, leadership, and growth systems with Bhadrik Panchal’s coaching approach.",
  path: "/case-studies",
  keywords: [
    "business coaching case studies",
    "growth results Ahmedabad",
    "founder transformation stories",
  ],
});

export default function CaseStudiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
