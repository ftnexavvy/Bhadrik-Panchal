import { posts } from "@/lib/posts";
import { notFound } from "next/navigation";

// 🔥 static export support
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// ✅ FIXED FOR NEXT 15
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <main className="bg-black text-white min-h-screen px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8 text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
          {post.category} • {post.date}
        </div>

        <h1 className="text-5xl font-black mb-10">
          {post.title}
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed">
          {post.content}
        </p>

      </div>
    </main>
  );
}