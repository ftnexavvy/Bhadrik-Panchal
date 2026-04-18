import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata: Metadata = buildPageMetadata({
  title: "Keynote Motivational Speaker | Bhadrik Panchal",
  description:
    "Hire Bhadrik Panchal for your next event. High-impact keynote speaking on leadership, execution systems, and the founder mindset. Practical, actionable, and transformative.",
  path: "/motivational-speaker",
  keywords: [
    "motivational speaker",
    "keynote speaker",
    "business speaker",
    "leadership speaker",
    "founder event speaker",
    "corporate trainer",
  ],
});

const speakingTopics = [
  "Systems vs Motivation: Building Sustainable Execution",
  "The Founder Mindset: Decisions Under Pressure",
  "Clarity-Led Branding and Market Dominance",
  "Scaling Without Chaos: The Framework of a CEO",
  "High-Performance Leadership and Team Alignment",
  "Turning Business Intent into Measurable Outcomes",
];

export default function MotivationalSpeakerPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-24">
      
      {/* HERO */}
      <SectionWrapper className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold mb-6">
            Keynotes & Transformative Speaking
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight italic leading-[0.9] mb-8">
            Motivational <br /> Speaker
          </h1>

          <p className="text-white/75 text-xl leading-relaxed max-w-3xl mb-12">
            Bhadrik Panchal delivers high-impact talks that combine business logic with 
            human psychology. Every session is designed to move the audience from 
            inspiration to immediate action.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:scale-105 transition-transform"
            >
                Inquire For Speaking
            </Link>
            <Link
                href="/about"
                className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:bg-white/5 transition-colors"
            >
                View Speaking Reel
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* TOPICS SECTION */}
      <SectionWrapper className="pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black uppercase italic mb-12 tracking-wider">Popular Speaking Topics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {speakingTopics.map((topic, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-2xl p-6 text-white/80 text-sm tracking-wide bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 transition-all flex items-center gap-4 group"
              >
                <span className="text-white/20 font-black italic text-xl group-hover:text-white transition-colors">{String(i + 1).padStart(2, '0')}</span>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* EVENT FIT SECTION */}
      <SectionWrapper className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <article>
                <h3 className="text-2xl font-black uppercase italic mb-6">Built For Outcomes</h3>
                <p className="text-white/70 leading-relaxed mb-6">
                    Bhadrik’s keynotes aren’t just about feeling good—they are about doing better. 
                    Each session provides practical frameworks that leaders and teams can 
                    apply the moment they leave the room.
                </p>
                <p className="text-white/70 leading-relaxed">
                    Ideal for corporate summits, startup events, and leadership off-sites 
                    where real change is the objective.
                </p>
            </article>
            <div className="border border-white/10 rounded-3xl p-8 bg-black flex flex-col justify-center">
                <blockquote className="text-lg italic text-white/90 mb-6 font-medium">
                    &quot;Bhadrik has a unique ability to simplify complex business problems and motivate 
                    teams through clarity, not just hype.&quot;
                </blockquote>
                <cite className="text-[10px] uppercase tracking-widest font-black text-white/40 not-italic">
                    — Leadership Summit Attendee
                </cite>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER NAVIGATION */}
      <SectionWrapper className="py-24">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl font-black uppercase italic mb-12 tracking-wider text-white/20">Explore Further</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/business-coach"
                    className="px-6 py-3 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all"
                >
                    Business Coaching
                </Link>
                <Link
                    href="/entrepreneur"
                    className="px-6 py-3 rounded-full border border-white/10 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-white/5 transition-all"
                >
                    Entrepreneur Insights
                </Link>
            </div>
        </div>
      </SectionWrapper>

    </main>
  );
}
