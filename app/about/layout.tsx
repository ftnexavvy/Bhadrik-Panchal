import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bhadrik Panchal | Business Coach & Growth Strategist",
  description:
    "Learn how Bhadrik Panchal drives business growth through clarity, systems, and decisive execution, coaching founders to scale with confidence and control.",
  keywords: [
    "business coach",
    "business growth",
    "scaling",
    "systems",
    "clarity",
    "growth strategist",
  ],
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
