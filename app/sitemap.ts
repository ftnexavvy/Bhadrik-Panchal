import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const staticPages = [
  "/",
  "/about",
  "/services",
  "/case-studies",
  "/contact",
  "/insights",
  "/business-coach-ahmedabad",
  "/motivational-speaker-gujarat",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const baseEntries = staticPages.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  const blogEntries = getAllPosts().map((post) => ({
    url: absoluteUrl(`/insights/${post.slug}`),
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...baseEntries, ...blogEntries];
}
