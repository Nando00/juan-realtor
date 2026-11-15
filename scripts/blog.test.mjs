import assert from "node:assert/strict";
import test from "node:test";
import { getAllPosts, parsePost } from "../src/lib/blog.ts";
import { getBlogPagePath, paginatePosts } from "../src/lib/blog-pagination.ts";

const frontmatter = `---
title: "A home tour"
description: "A practical guide."
date: "2026-11-14"
slug: "a-home-tour"
---
`;

test("published Markdown produces article content and metadata", async () => {
  const posts = await getAllPosts();
  const post = posts.find(post => post.slug === "how-to-make-the-most-of-a-home-tour");
  assert.ok(post);
  assert.match(post.html, /<h2>Start with your everyday life<\/h2>/);
  assert.ok(post.readingMinutes > 0);
  assert.equal(new Set(posts.map(post => post.slug)).size, posts.length);
  assert.deepEqual(posts.map(post => post.date), posts.map(post => post.date).sort().reverse());
});

test("Markdown omits executable HTML and unsafe URLs while keeping valid links", () => {
  const post = parsePost(frontmatter + `# Body heading

<script>alert(1)</script>

[bad](javascript:alert%281%29) ![bad](data:image/svg+xml,anything)

[Contact](/#contact) [Example](https://example.com)
`, "fixture.md");
  assert.doesNotMatch(post.html, /<script|javascript:|data:image|<h1>/);
  assert.match(post.html, /<h2>Body heading<\/h2>/);
  assert.match(post.html, /href="\/#contact"/);
  assert.match(post.html, /href="https:\/\/example.com"/);
});

test("invalid publishing data fails with an actionable error", () => {
  assert.throws(() => parsePost(frontmatter.replace("2026-11-14", "2026-02-30") + "Body", "bad.md"), /valid YYYY-MM-DD/);
  assert.throws(() => parsePost(frontmatter.replace("a-home-tour", "../escape") + "Body", "bad.md"), /slug/);
  assert.throws(() => parsePost(frontmatter + "", "bad.md"), /body is empty/);
  assert.throws(() => parsePost(frontmatter.replace('slug: "a-home-tour"', 'slug: "a-home-tour"\ncoverImage: "/image.jpg"') + "Body", "bad.md"), /coverImageAlt/);
});

test("pagination keeps all posts reachable and rejects invalid pages", () => {
  const posts = Array.from({ length: 13 }, (_, index) => index);
  const pages = [1, 2, 3].map(page => paginatePosts(posts, page));
  assert.deepEqual(pages.map(page => page.items.length), [6, 6, 1]);
  assert.deepEqual(pages.flatMap(page => page.items), posts);
  assert.equal(pages[2].start, 13);
  for (const page of [0, -1, 4, 1.5, Infinity, NaN]) assert.equal(paginatePosts(posts, page), null);
  assert.equal(getBlogPagePath(1), "/blog");
  assert.equal(getBlogPagePath(2), "/blog/page/2");
});

test("empty and one-post blogs have accurate counts", () => {
  assert.equal(paginatePosts([]).start, 0);
  assert.equal(paginatePosts([]).pageCount, 1);
  assert.equal(paginatePosts(["post"]).end, 1);
  assert.equal(paginatePosts(["post"]).pageCount, 1);
});
