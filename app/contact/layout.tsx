import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Bhadrik Panchal | Scale with Clarity and Systems",
  description:
    "Book a strategic call with Bhadrik Panchal to diagnose growth blocks, align systems, and execute a clear plan for scalable business growth and control.",
  keywords: [
    "business coach",
    "business growth",
    "scaling",
    "systems",
    "clarity",
    "contact business coach",
  ],
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
