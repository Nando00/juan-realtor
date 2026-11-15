import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { Marked } from "marked";
import { parse } from "yaml";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  author: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  readingMinutes: number;
  html: string;
};

const postsDirectory = path.join(process.cwd(), "content/blog");

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

function safeUrl(value: string, image = false) {
  if (/[\s\\\u0000-\u001f]/.test(value)) return false;
  return (
    /^\/(?!\/)/.test(value) ||
    /^https?:\/\//i.test(value) ||
    (!image && /^(#|mailto:|tel:)/i.test(value))
  );
}

const markdown = new Marked({
  gfm: true,
  renderer: {
    html() {
      return "";
    },
    heading({ tokens, depth }) {
      const level = Math.max(2, depth);
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
    },
    link({ href, title, tokens }) {
      const label = this.parser.parseInline(tokens);
      if (!safeUrl(href)) return label;
      return `<a href="${escapeHtml(href)}"${title ? ` title="${escapeHtml(title)}"` : ""}>${label}</a>`;
    },
    image({ href, text }) {
      if (!safeUrl(href, true)) return escapeHtml(text);
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" loading="lazy" />`;
    },
  },
});

export function parsePost(raw: string, source: string): BlogPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match)
    throw new Error(`${source}: Markdown must start with YAML frontmatter.`);
  const data: unknown = parse(match[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${source}: frontmatter must be a mapping.`);
  }
  const fields = data as Record<string, unknown>;
  const string = (key: string) =>
    typeof fields[key] === "string" ? fields[key].trim() : "";
  const required = (key: string) => {
    const value = string(key);
    if (!value) throw new Error(`${source}: missing ${key}.`);
    return value;
  };
  const dateField = (key: string, fallback?: string) => {
    const value =
      fields[key] === undefined && fallback ? fallback : required(key);
    const date = new Date(`${value}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value
    ) {
      throw new Error(`${source}: ${key} must be a valid YYYY-MM-DD date.`);
    }
    return value;
  };
  const slug = required("slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug === "page") {
    throw new Error(
      `${source}: use a lowercase, hyphenated slug other than "page".`,
    );
  }
  const date = dateField("date");
  const updated = dateField("updated", date);
  if (updated < date)
    throw new Error(`${source}: updated cannot precede date.`);
  const content = raw.slice(match[0].length).trim();
  if (!content) throw new Error(`${source}: article body is empty.`);
  const coverImage = string("coverImage") || undefined;
  const coverImageAlt = string("coverImageAlt") || undefined;
  if (coverImage && (!safeUrl(coverImage, true) || !coverImageAlt)) {
    throw new Error(
      `${source}: coverImage needs a safe URL and descriptive coverImageAlt.`,
    );
  }
  const plain = content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`~>]/g, "");
  return {
    slug,
    title: required("title"),
    description: required("description"),
    date,
    updated,
    category: string("category") || "Home & life",
    author: string("author") || "Lanza Realty Group",
    tags: Array.isArray(fields.tags)
      ? fields.tags
          .filter(
            (tag): tag is string => typeof tag === "string" && !!tag.trim(),
          )
          .map((tag) => tag.trim())
      : [],
    coverImage,
    coverImageAlt,
    readingMinutes: Math.max(
      1,
      Math.ceil(plain.trim().split(/\s+/).length / 220),
    ),
    html: markdown.parse(content, { async: false }),
  };
}

export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const files = (await readdir(postsDirectory)).filter(
    (file) => file.endsWith(".md") && file !== "README.md",
  );
  const posts = await Promise.all(
    files.map(async (file) =>
      parsePost(await readFile(path.join(postsDirectory, file), "utf8"), file),
    ),
  );
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug))
      throw new Error(`Duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
  }
  return posts.sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
  );
});

export async function getPostBySlug(slug: string) {
  return (await getAllPosts()).find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
