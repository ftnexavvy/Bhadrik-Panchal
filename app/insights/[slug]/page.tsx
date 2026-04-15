import { posts } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="bg-black text-white min-h-screen px-6 py-40">

      {/* CONTAINER */}
      <div className="max-w-4xl mx-auto">

        {/* META */}
        <div className="flex justify-between items-center mb-8 text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
          <span>{post.category}</span>
          <span>
            {post.date} • {post.readTime}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] italic mb-10">
          {post.title}
        </h1>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/10 mb-12" />

        {/* CONTENT */}
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>{post.content}</p>

          {/* 👉 future me multiple paragraphs yaha add kar sakta hai */}
        </div>

      </div>

    </main>
  );
}