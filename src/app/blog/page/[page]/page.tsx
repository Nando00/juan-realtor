import { notFound, permanentRedirect } from "next/navigation";
import { BlogIndex } from "@/components/blog-index";
import { getAllPosts } from "@/lib/blog";
import { BLOG_PAGE_SIZE, paginatePosts } from "@/lib/blog-pagination";
import { blogIndexMetadata } from "@/lib/blog-seo";

type Props = { params: Promise<{ page: string }> };

export async function generateStaticParams() {
  const count = Math.ceil((await getAllPosts()).length / BLOG_PAGE_SIZE);
  return Array.from({ length: Math.max(0, count - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

async function getPage(params: Props["params"]) {
  const { page } = await params;
  if (page === "1") permanentRedirect("/blog");
  if (!/^[1-9]\d*$/.test(page)) notFound();
  const posts = await getAllPosts();
  const value = Number(page);
  if (!paginatePosts(posts, value)) notFound();
  return { posts, value };
}

export async function generateMetadata({ params }: Props) {
  return blogIndexMetadata((await getPage(params)).value);
}

export default async function BlogPage({ params }: Props) {
  const { posts, value } = await getPage(params);
  return <BlogIndex posts={posts} page={value} />;
}
