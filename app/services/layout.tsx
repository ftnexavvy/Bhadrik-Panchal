import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Coaching Services | Systems for Scaling",
  description:
    "Choose premium business coaching programs built for clarity, systems, and execution. Eliminate bottlenecks, sharpen strategy, and scale with repeatable growth.",
  keywords: [
    "business coach",
    "business growth",
    "scaling",
    "systems",
    "clarity",
    "business coaching services",
  ],
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
