import type { Metadata } from "next";
import type { BlogPost } from "./blog";
import { getBlogPagePath } from "./blog-pagination";

export const SITE_URL = "https://www.lanzacorporation.com";
const SITE_NAME = "Lanza Realty Group";

export function blogIndexMetadata(page = 1): Metadata {
  const title = `The Lanza Journal${page > 1 ? ` — Page ${page}` : ""} | ${SITE_NAME}`;
  const description =
    "Thoughtful advice for buying, selling, and feeling at home in Houston. Explore the Lanza journal for your next chapter.";
  const url = SITE_URL + getBlogPagePath(page);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary", title, description },
  };
}

export function blogPostMetadata(post: BlogPost): Metadata {
  const title = `${post.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const images = post.coverImage
    ? [
        {
          url: new URL(post.coverImage, SITE_URL).href,
          alt: post.coverImageAlt,
        },
      ]
    : undefined;
  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description: post.description,
      images,
    },
  };
}

export function postStructuredData(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": post.author === SITE_NAME ? "Organization" : "Person",
      name: post.author,
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.coverImage
      ? { image: new URL(post.coverImage, SITE_URL).href }
      : {}),
  };
}
