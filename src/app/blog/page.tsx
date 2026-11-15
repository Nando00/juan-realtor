import { BlogIndex } from "@/components/blog-index";
import { getAllPosts } from "@/lib/blog";
import { blogIndexMetadata } from "@/lib/blog-seo";

export const metadata = blogIndexMetadata();

export default async function BlogPage() {
  return <BlogIndex posts={await getAllPosts()} />;
}
