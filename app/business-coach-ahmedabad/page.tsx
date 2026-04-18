import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Coach in Ahmedabad | Bhadrik Panchal Official",
  description:
    "Work with Bhadrik Panchal, a business coach in Ahmedabad, to build strategy, leadership, and growth systems for long-term business scale.",
  path: "/business-coach-ahmedabad",
  keywords: [
    "business coach in Ahmedabad",
    "Ahmedabad business mentor",
    "business growth coach Gujarat",
  ],
});

const focusAreas = [
  "Business clarity and offer positioning",
  "Founder decision-making and leadership systems",
  "Demand generation with repeatable execution",
  "Sales process design and pipeline discipline",
  "Team alignment and operating cadence",
  "Scale planning and accountability frameworks",
];

export default function BusinessCoachAhmedabadPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold mb-6">
          Ahmedabad Business Coaching
        </p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight italic leading-[0.95] mb-8">
          Business Coach In Ahmedabad
        </h1>

        <p className="text-white/75 text-lg leading-relaxed max-w-3xl mb-14">
          If your business is growing but still depends on daily firefighting, you are not alone.
          Bhadrik Panchal works with founders and business owners in Ahmedabad who want structure,
          decision clarity, and systems that scale without burning out the founder.
        </p>

        <section className="grid gap-10 md:grid-cols-2 mb-16">
          <article className="border border-white/10 rounded-3xl p-8 bg-white/[0.03]">
            <h2 className="text-2xl font-black uppercase italic mb-4">Who This Is For</h2>
            <p className="text-white/70 leading-relaxed">
              This coaching is designed for founders who are strong executors but need a sharper
              strategy and operating system. If your business has momentum yet feels chaotic,
              this framework helps you transition from reactive operations to strategic growth.
            </p>
          </article>

          <article className="border border-white/10 rounded-3xl p-8 bg-white/[0.03]">
            <h2 className="text-2xl font-black uppercase italic mb-4">How Engagement Works</h2>
            <p className="text-white/70 leading-relaxed">
              Every engagement starts with a clarity audit. We map bottlenecks across positioning,
              delivery, sales, and leadership. Then we build a 90-day execution plan with measurable
              outcomes and accountability checkpoints.
            </p>
          </article>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic mb-6">Core Focus Areas</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {focusAreas.map((item) => (
              <li
                key={item}
                className="border border-white/10 rounded-2xl p-5 text-white/80 text-sm tracking-wide"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border border-white/10 rounded-3xl p-8 bg-white/[0.02]">
          <h2 className="text-3xl font-black uppercase italic mb-4">Why Ahmedabad Founders Choose This</h2>
          <p className="text-white/75 leading-relaxed mb-5">
            Ahmedabad has high entrepreneurial energy, but most teams still struggle with predictable
            execution. This coaching approach is built for that exact gap: translating ambition into
            repeatable systems. Instead of random tactics, you get practical structures for pipeline,
            team rhythm, and leadership clarity.
          </p>
          <p className="text-white/75 leading-relaxed">
            The goal is simple: reduce friction, strengthen strategic thinking, and create business
            momentum that continues without constant founder overload.
          </p>
        </section>

        <section className="flex flex-wrap gap-4 items-center">
          <Link
            href="/contact"
            data-track-event="cta_contact_business_coach_ahmedabad"
            data-track-category="lead"
            className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center"
          >
            Book A Strategy Call
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center"
          >
            Explore Services
          </Link>
          <Link
            href="/case-studies"
            className="text-sm uppercase tracking-[0.25em] font-bold text-white/70 hover:text-white"
          >
            View Case Studies →
          </Link>
        </section>
      </div>
    </main>
  );
}
