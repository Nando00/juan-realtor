export const BLOG_PAGE_SIZE = 6;

export function getBlogPagePath(page: number) {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function paginatePosts<T>(posts: readonly T[], page = 1) {
  const total = posts.length;
  const pageCount = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  if (!Number.isSafeInteger(page) || page < 1 || page > pageCount) return null;
  const offset = (page - 1) * BLOG_PAGE_SIZE;
  return {
    items: posts.slice(offset, offset + BLOG_PAGE_SIZE),
    page,
    pageCount,
    total,
    start: total === 0 ? 0 : offset + 1,
    end: Math.min(offset + BLOG_PAGE_SIZE, total),
  };
}

export function getPageNumbers(page: number, pageCount: number) {
  const pages: (number | string)[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) pages.push(i);
    else if (typeof pages[pages.length - 1] === "number")
      pages.push(`gap-${i}`);
  }
  return pages;
}
