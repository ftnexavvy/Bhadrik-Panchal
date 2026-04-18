import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = buildPageMetadata({
  title: "Entrepreneurship & Founder Strategy | Bhadrik Panchal",
  description:
    "Master the founder mindset. Strategic frameworks, execution systems, and leadership clarity for the modern entrepreneur by Bhadrik Panchal.",
  path: "/entrepreneur",
  keywords: [
    "entrepreneurship",
    "founder strategy",
    "startup leadership",
    "entrepreneur mindset",
    "business ownership",
    "scaling for founders",
  ],
});

const founderPrinciples = [
  {
    title: "The Execution Mindset",
    desc: "Ideas are easy. Execution is everything. We focus on building the discipline required to turn intent into measurable results every single day.",
  },
  {
    title: "Decision Clarity",
    desc: "Founders are paid to make decisions. We establish frameworks to reduce emotional bias and increase strategic accuracy in your leadership.",
  },
  {
    title: "Systemic Scaling",
    desc: "A business that depends on the founder is not a business. We build the architecture that allows you to step back and the business to step up.",
  },
  {
    title: "Resource Allocation",
    desc: "Time, capital, and energy are finite. Learn how to deploy your most valuable resources where they create the maximum leverage for your vision.",
  },
];

export default function EntrepreneurPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-24">
      
      {/* HERO */}
      <SectionWrapper className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold mb-6">
            For The Modern Visionary
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight italic leading-[0.9] mb-8">
            Entrepreneur <br /> & Founder
          </h1>

          <p className="text-white/75 text-xl leading-relaxed max-w-3xl mb-12">
            Entrepreneurship is the ultimate game of clarity and execution. 
            Bhadrik Panchal provides the frameworks and mentorship founders need 
            to navigate uncertainty and build enduring companies.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:scale-105 transition-transform"
            >
                Start Your Journey
            </Link>
            <Link
                href="/insights"
                className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:bg-white/5 transition-colors"
            >
                Founder Insights
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* PRINCIPLES GRID */}
      <SectionWrapper className="pb-24">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black uppercase italic mb-12 tracking-wider">The Founder&apos;s Operating System</h2>
            <div className="grid gap-8 md:grid-cols-2">
                {founderPrinciples.map((principle, i) => (
                    <article key={i} className="border border-white/10 rounded-[2.5rem] p-10 bg-white/[0.03] hover:border-white/20 transition-all group">
                        <h3 className="text-2xl font-black uppercase italic mb-4 group-hover:translate-x-2 transition-transform">{principle.title}</h3>
                        <p className="text-white/70 leading-relaxed text-sm lg:text-base">
                            {principle.desc}
                        </p>
                    </article>
                ))}
            </div>
        </div>
      </SectionWrapper>

      {/* MISSION SECTION */}
      <SectionWrapper className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-black uppercase italic mb-8 leading-none tracking-tighter">
                DON&apos;T JUST BUILD <br /> A BUSINESS. BUILD <br /> A LEGACY.
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-12 uppercase tracking-widest font-light">
                Success is predictable when your strategy is clear and your systems are robust.
            </p>
            <Link
                href="/contact"
                className="text-sm uppercase tracking-[0.4em] font-black border-b border-white pb-2 hover:text-white/70 hover:border-white/70 transition-all"
            >
                WORK WITH BHADRIK →
            </Link>
        </div>
      </SectionWrapper>

      {/* FOOTER NAVIGATION */}
      <SectionWrapper className="py-24">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl font-black uppercase italic mb-12 tracking-wider text-white/20">Expand Your Vision</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/business-coach"
                    className="px-6 py-3 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all"
                >
                    Business Coach
                </Link>
                <Link
                    href="/motivational-speaker"
                    className="px-6 py-3 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all"
                >
                    Motivational Speaker
                </Link>
            </div>
        </div>
      </SectionWrapper>

    </main>
  );
}
