import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { BLOG_PAGE_SIZE, getBlogPagePath } from "@/lib/blog-pagination";
import { SITE_URL } from "@/lib/blog-seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const count = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  return [
    ...["", "/privacy-policy", "/terms-and-conditions"].map((path) => ({
      url: SITE_URL + path,
    })),
    ...Array.from({ length: count }, (_, index) => ({
      url: SITE_URL + getBlogPagePath(index + 1),
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated,
    })),
  ];
}
