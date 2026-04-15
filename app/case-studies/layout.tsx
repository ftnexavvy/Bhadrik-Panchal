import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Business Growth Systems in Action",
  description:
    "See business growth case studies where founders used clarity, systems, and focused execution to break plateaus, scale operations, and build momentum.",
  keywords: [
    "business coach",
    "business growth",
    "scaling",
    "systems",
    "clarity",
    "case studies",
  ],
};

export default function CaseStudiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
