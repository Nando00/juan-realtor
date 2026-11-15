# The Lanza journal

Add one Markdown file to this folder and rebuild to publish an article. No page code changes are needed. `README.md` is not a post.

```yaml
---
title: "Your article title"
description: "A short summary for the blog list, article intro, and search results."
date: "2026-11-14"
slug: "your-article-title"
category: "Buying a home"
author: "Lanza Realty Group"
tags:
  - Houston
coverImage: "/images/IMG_1189.JPEG"
coverImageAlt: "Describe the actual photograph"
---
```

`title`, `description`, `date`, and `slug` are required. Slugs must be unique lowercase words separated by hyphens; `page` is reserved for pagination. Dates must be valid `YYYY-MM-DD` values. Optional `updated` dates cannot precede the publication date. The author defaults to Lanza Realty Group; the category defaults to Home & life.

Use `##` for section headings and `###` for subsections; the template supplies the page title. Lists, links, blockquotes, and tables are supported. Raw HTML is omitted, and unsafe link/image schemes are blocked. Internal links can use `/blog/your-article-title` or `/#contact`.

A cover photo is optional. If you set `coverImage`, provide descriptive `coverImageAlt`. Use local images in `public/images` or an HTTPS URL. Supplied home photos are illustrative, not verified listings or neighborhood photographs.

Posts appear newest first, six per page. The first page is `/blog`; later pages use `/blog/page/2`, and so on. Pagination appears when needed. Each article has its own `/blog/<slug>` page, reading time, canonical URL, social metadata, and BlogPosting structured data. Invalid article URLs and page numbers show a 404; `/blog/page/1` redirects to `/blog`.

The production site URL is defined in `src/lib/blog-seo.ts`. The sitemap includes every post and blog index page. Future-dated files are published immediately when built; this setup does not schedule publication.
