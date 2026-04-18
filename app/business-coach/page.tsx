import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = buildPageMetadata({
  title: "Business Coach & Growth Strategist | Bhadrik Panchal",
  description:
    "Expert business coaching for founders and CEOs. Build repeatable systems, sharpen your strategy, and scale your business with Bhadrik Panchal.",
  path: "/business-coach",
  keywords: [
    "business coach",
    "growth strategist",
    "executive coaching",
    "founder mentorship",
    "business systems coach",
  ],
});

const coachingPillars = [
  {
    title: "Strategic Clarity",
    desc: "Move from 'doing everything' to doing what matters. We define your high-leverage activities and align your business model with your goals.",
  },
  {
    title: "Execution Systems",
    desc: "Build the infrastructure that allows your business to run without your constant intervention. Systems for sales, delivery, and operations.",
  },
  {
    title: "Leadership Cadence",
    desc: "Establish a rhythm of decision-making and accountability. Shift from reactive firefighting to proactive leadership and management.",
  },
  {
    title: "Offer Positioning",
    desc: "Refine your value proposition to eliminate competition. We position your business so it becomes the obvious choice for your ideal clients.",
  },
];

export default function BusinessCoachPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-24">
      
      {/* HERO */}
      <SectionWrapper className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold mb-6">
            Elite Business Coaching
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight italic leading-[0.9] mb-8">
            Business Coach <br /> & Growth Strategist
          </h1>

          <p className="text-white/75 text-xl leading-relaxed max-w-3xl mb-12">
            Most businesses don&apos;t have a growth problem—they have a structure problem. 
            Bhadrik Panchal helps founders build the systems and leadership clarity 
            required to move from hustle to true scale.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:scale-105 transition-transform"
            >
                Apply For Coaching
            </Link>
            <Link
                href="/about"
                className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:bg-white/5 transition-colors"
            >
                The Methodology
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* PILLARS GRID */}
      <SectionWrapper className="pb-24">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black uppercase italic mb-12 tracking-wider">The Four Pillars Of Scale</h2>
            <div className="grid gap-8 md:grid-cols-2">
                {coachingPillars.map((pillar, i) => (
                    <article key={i} className="border border-white/10 rounded-[2.5rem] p-10 bg-white/[0.03] hover:border-white/20 transition-all group">
                        <h3 className="text-2xl font-black uppercase italic mb-4 group-hover:translate-x-2 transition-transform">{pillar.title}</h3>
                        <p className="text-white/70 leading-relaxed text-sm lg:text-base">
                            {pillar.desc}
                        </p>
                    </article>
                ))}
            </div>
        </div>
      </SectionWrapper>

      {/* OUTCOME SECTION */}
      <SectionWrapper className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <h2 className="text-4xl font-black uppercase italic mb-6 leading-tight">Clarity Is The Only <br /> Competitive Advantage</h2>
                    <p className="text-white/75 leading-relaxed text-lg mb-8">
                        Coaching is not about giving you more to do; it&apos;s about giving you fewer things to focus on. 
                        By removing the noise and building repeatable execution systems, we create a business 
                        that compounds over time without requiring more of your hours.
                    </p>
                    <Link
                        href="/insights"
                        className="text-sm uppercase tracking-[0.25em] font-bold text-white/70 hover:text-white transition-colors"
                    >
                        Read Scaling Insights →
                    </Link>
                </div>
                <div className="flex flex-col justify-center gap-4">
                    <div className="p-6 rounded-2xl border border-white/5 bg-black">
                        <span className="block text-4xl font-black italic mb-1">90+</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Days To Transformation</span>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/5 bg-black">
                        <span className="block text-4xl font-black italic mb-1">1:1</span>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Personal Focus</span>
                    </div>
                </div>
            </div>
        </div>
      </SectionWrapper>

      {/* FOOTER NAVIGATION */}
      <SectionWrapper className="py-24">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl font-black uppercase italic mb-12 tracking-wider text-white/20">Related Expertise</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/motivational-speaker"
                    className="px-6 py-3 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all"
                >
                    Motivational Speaker
                </Link>
                <Link
                    href="/entrepreneur"
                    className="px-6 py-3 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all"
                >
                    Entrepreneur Mindset
                </Link>
            </div>
        </div>
      </SectionWrapper>

    </main>
  );
}
