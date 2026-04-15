import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights by Bhadrik Panchal | Clarity, Systems, Scaling",
  description:
    "Read sharp insights on business growth, scaling systems, and execution discipline. Gain clarity, make stronger decisions, and lead your business with authority.",
  keywords: [
    "business coach",
    "business growth",
    "scaling",
    "systems",
    "clarity",
    "business insights",
  ],
};

export default function InsightsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
