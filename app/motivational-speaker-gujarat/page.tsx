import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Motivational Speaker in Gujarat | Bhadrik Panchal",
  description:
    "Hire Bhadrik Panchal as a motivational speaker in Gujarat for founder events, business summits, and leadership talks focused on execution.",
  path: "/motivational-speaker-gujarat",
  keywords: [
    "motivational speaker in Gujarat",
    "Ahmedabad keynote speaker",
    "business leadership speaker",
  ],
});

const speakingTopics = [
  "From hustle to systems: building sustainable growth",
  "Founder mindset and leadership under uncertainty",
  "Clarity-led branding and market positioning",
  "Execution systems that teams can actually follow",
  "Decision-making frameworks for scaling businesses",
  "Turning business intent into measurable outcomes",
];

export default function MotivationalSpeakerGujaratPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold mb-6">
          Gujarat Keynote & Motivation
        </p>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight italic leading-[0.95] mb-8">
          Motivational Speaker In Gujarat
        </h1>

        <p className="text-white/75 text-lg leading-relaxed max-w-3xl mb-14">
          Bhadrik Panchal delivers practical, high-impact talks for entrepreneurs, founders,
          leadership teams, and growth-focused organizations across Gujarat. Every keynote combines
          mindset, strategy, and execution so audiences leave with clear action, not just inspiration.
        </p>

        <section className="grid gap-10 md:grid-cols-2 mb-16">
          <article className="border border-white/10 rounded-3xl p-8 bg-white/[0.03]">
            <h2 className="text-2xl font-black uppercase italic mb-4">Event Fit</h2>
            <p className="text-white/70 leading-relaxed">
              Ideal for startup summits, business communities, sales kickoffs, leadership off-sites,
              and educational entrepreneur forums. Sessions are customized for audience maturity,
              language preference, and business context.
            </p>
          </article>

          <article className="border border-white/10 rounded-3xl p-8 bg-white/[0.03]">
            <h2 className="text-2xl font-black uppercase italic mb-4">Outcome-Led Sessions</h2>
            <p className="text-white/70 leading-relaxed">
              Talks are built around one objective: create a shift in decision-making and execution.
              Instead of generic motivation, each session gives frameworks the audience can apply
              immediately in business and leadership.
            </p>
          </article>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic mb-6">Popular Speaking Topics</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {speakingTopics.map((topic) => (
              <li
                key={topic}
                className="border border-white/10 rounded-2xl p-5 text-white/80 text-sm tracking-wide"
              >
                {topic}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 border border-white/10 rounded-3xl p-8 bg-white/[0.02]">
          <h2 className="text-3xl font-black uppercase italic mb-4">What Organizers Get</h2>
          <p className="text-white/75 leading-relaxed mb-5">
            Organizers receive pre-event alignment on audience profile, goals, and session structure.
            This makes each keynote relevant, actionable, and aligned with event outcomes. Delivery
            can be tailored for English, Hindi, or Gujarati-speaking audiences.
          </p>
          <p className="text-white/75 leading-relaxed">
            If your event needs a speaker who can combine motivation with business logic, this is
            a strong fit for growth-focused programs across Gujarat.
          </p>
        </section>

        <section className="flex flex-wrap gap-4 items-center">
          <Link
            href="/contact"
            data-track-event="cta_contact_speaker_gujarat"
            data-track-category="lead"
            className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center"
          >
            Enquire For Speaking
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center"
          >
            About Bhadrik
          </Link>
          <Link
            href="/insights"
            className="text-sm uppercase tracking-[0.25em] font-bold text-white/70 hover:text-white"
          >
            Read Insights →
          </Link>
        </section>
      </div>
    </main>
  );
}
