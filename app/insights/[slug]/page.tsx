import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_URL, absoluteUrl, buildPageMetadata } from "@/lib/seo";
import SectionWrapper from "@/components/SectionWrapper";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildPageMetadata({
      title: "Insights | Bhadrik Panchal",
      description: "Business growth insights and founder strategy articles.",
      path: "/insights",
    });
  }

  const metadata = buildPageMetadata({
    title: `${post.title} | Bhadrik Panchal Insights`,
    description: post.desc,
    path: `/insights/${post.slug}`,
    keywords: post.keywords,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      section: post.category,
      tags: post.keywords,
    },
  };
}

const BRAND_IMAGES = [
    "/assets/images/bhadrik panchal 1.webp",
    "/assets/images/bhadrik panchal 2.webp",
    "/assets/images/bhadrik panchal 3.webp",
    "/assets/images/bhadrik panchal 4.webp",
    "/assets/images/bhadrik panchal 5.webp",
    "/assets/images/bhadrik panchal 6.webp",
];

const getPostImage = (slug: string) => {
    const allPosts = getAllPosts();
    const postIndex = allPosts.findIndex(p => p.slug === slug);
    // Fallback to 0 if not found, though it should always be found
    const index = postIndex === -1 ? 0 : postIndex;
    return BRAND_IMAGES[index % BRAND_IMAGES.length];
};

const renderContentBlocks = (rawContent: string) => {
  const blocks = rawContent
    .trim()
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const isList = lines.every((line) => line.startsWith("- "));

    if (isList) {
      return (
        <ul key={`list-${index}`} className="grid gap-4 sm:grid-cols-2 mt-8 mb-12">
          {lines.map((line, itemIndex) => (
            <li 
              key={`item-${itemIndex}`}
              className="border border-white/10 rounded-2xl p-5 text-white/80 text-sm tracking-wide bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              {line.slice(2)}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <article 
        key={`paragraph-${index}`} 
        className="border border-white/10 rounded-3xl p-8 bg-white/[0.03] mb-8 last:mb-0"
      >
        <p className="text-white/75 text-lg leading-relaxed">
          {lines.join(" ")}
        </p>
      </article>
    );
  });
};

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const postImage = getPostImage(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/insights/${post.slug}`)}#article`,
    headline: post.title,
    description: post.desc,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
    image: absoluteUrl(postImage), // Use the specific post image for schema too
    author: {
      "@id": `${SITE_URL}/#person`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    keywords: post.keywords,
    articleSection: post.category,
  };

  return (
    <main className="bg-black text-white min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* HERO SECTION */}
      <SectionWrapper className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-bold mb-6">
                        {post.category} • {post.date} • {post.readTime}
                    </p>

                    <h1 className="text-4xl sm:text-6xl lg:text-5xl xl:text-7xl font-black uppercase tracking-tight italic leading-[0.95] mb-8">
                        {post.title}
                    </h1>

                    <p className="text-white/75 text-xl leading-relaxed">
                        {post.desc}
                    </p>
                </div>

                <div className="lg:col-span-5">
                    <div className="relative aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/10 group">
                        <Image 
                            src={postImage}
                            alt={`Bhadrik Panchal - Business Coach and Motivational Speaker - ${post.title}`}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    </div>
                </div>
            </div>
        </div>
      </SectionWrapper>

      {/* CONTENT SECTION */}
      <SectionWrapper className="pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {renderContentBlocks(post.content)}
          </div>

          {/* CTAs */}
          <div className="mt-20 flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-black text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:scale-105 transition-transform"
            >
              Book Strategy Call
            </Link>
            <Link
              href="/insights"
              className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black min-h-12 inline-flex items-center hover:bg-white/5 transition-colors"
            >
              Back To Insights
            </Link>
            <Link
              href="/about"
              className="text-sm uppercase tracking-[0.25em] font-bold text-white/70 hover:text-white transition-colors"
            >
              About Bhadrik →
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER SERVICES SECTION */}
      <SectionWrapper className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-black uppercase italic mb-12 tracking-wider text-white/30">Explore More</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <Link
                    href="/business-coach-ahmedabad"
                    className="px-8 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-black hover:border-white/30 hover:bg-white/5 transition-all"
                >
                    Business Coach Ahmedabad
                </Link>
                <Link
                    href="/motivational-speaker-gujarat"
                    className="px-8 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-black hover:border-white/30 hover:bg-white/5 transition-all"
                >
                    Motivational Speaker Gujarat
                </Link>
            </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

