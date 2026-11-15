import { Icon } from "@/components/icons";
import { formatPostDate, type BlogPost } from "@/lib/blog";
import {
  getBlogPagePath,
  getPageNumbers,
  paginatePosts,
} from "@/lib/blog-pagination";

export function BlogIndex({
  posts,
  page = 1,
}: {
  posts: BlogPost[];
  page?: number;
}) {
  const pagination = paginatePosts(posts, page);
  if (!pagination) return null;
  const { items, total, start, end, pageCount } = pagination;

  return (
    <>
      <header className="blog-intro container">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Blog</span>
        </nav>
        <div className="blog-intro-grid">
          <div>
            <p className="eyebrow">
              <span className="mini-line" />
              THE LANZA JOURNAL
            </p>
            <h1>
              A little local insight.
              <br />
              <em>A clearer way home.</em>
            </h1>
          </div>
          <div className="blog-intro-copy">
            <p>
              Thoughtful advice for your next chapter. Explore ideas for buying,
              selling, and feeling at home in Houston.
            </p>
            <a className="section-link" href="/#contact">
              Your next move starts here <Icon name="arrow-up" size={17} />
            </a>
          </div>
        </div>
      </header>
      <section
        id="articles"
        className="blog-journal"
        aria-labelledby="articles-title"
        tabIndex={-1}
      >
        <div className="container">
          <div className="blog-section-heading">
            <h2 id="articles-title">
              All articles <span>{String(total).padStart(2, "0")}</span>
            </h2>
            <p>
              IDEAS & ADVICE <span aria-hidden="true">/</span> NEWEST FIRST
            </p>
          </div>
          {items.length ? (
            items.map((post) => (
              <article key={post.slug} className="blog-row">
                <a
                  href={`/blog/${post.slug}`}
                  aria-labelledby={`title-${post.slug}`}
                >
                  <div className="blog-row-meta">
                    <span className="blog-category">{post.category}</span>
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span className="blog-reading-time">
                      <Icon name="clock" size={14} />
                      {post.readingMinutes} min read
                    </span>
                  </div>
                  <div className="blog-row-copy">
                    <h3 id={`title-${post.slug}`}>{post.title}</h3>
                    <p>{post.description}</p>
                    <span className="blog-read">
                      Read the story <Icon name="arrow" size={16} />
                    </span>
                  </div>
                  <span className="blog-row-arrow" aria-hidden="true">
                    <Icon name="arrow-up" size={22} />
                  </span>
                </a>
              </article>
            ))
          ) : (
            <div className="blog-empty">
              <h3>A new chapter is on its way.</h3>
              <p>
                We’re putting together thoughtful advice for life at home. In
                the meantime, let’s talk about your next move.
              </p>
              <a href="/#contact" className="section-link">
                Get in touch <Icon name="arrow-up" size={17} />
              </a>
            </div>
          )}
          {total > 0 && (
            <div className="blog-pagination">
              <p>
                Showing {start === end ? start : `${start}–${end}`} of {total}{" "}
                {total === 1 ? "article" : "articles"}
              </p>
              {pageCount > 1 ? (
                <nav aria-label="Blog pagination">
                  {page > 1 ? (
                    <a
                      className="blog-page-direction"
                      href={`${getBlogPagePath(page - 1)}#articles`}
                      rel="prev"
                    >
                      <Icon name="arrow" size={16} className="arrow-back" />
                      Previous
                    </a>
                  ) : (
                    <span className="blog-page-direction" aria-disabled="true">
                      <Icon name="arrow" size={16} className="arrow-back" />
                      Previous
                    </span>
                  )}
                  <ol>
                    {getPageNumbers(page, pageCount).map((item) => (
                      <li key={item}>
                        {typeof item === "number" ? (
                          <a
                            href={`${getBlogPagePath(item)}#articles`}
                            aria-label={`Page ${item}`}
                            aria-current={item === page ? "page" : undefined}
                          >
                            {item}
                          </a>
                        ) : (
                          <span aria-hidden="true">…</span>
                        )}
                      </li>
                    ))}
                  </ol>
                  <span className="blog-page-mobile">
                    {page} / {pageCount}
                  </span>
                  {page < pageCount ? (
                    <a
                      className="blog-page-direction"
                      href={`${getBlogPagePath(page + 1)}#articles`}
                      rel="next"
                    >
                      Next
                      <Icon name="arrow" size={16} />
                    </a>
                  ) : (
                    <span className="blog-page-direction" aria-disabled="true">
                      Next
                      <Icon name="arrow" size={16} />
                    </span>
                  )}
                </nav>
              ) : (
                <span className="blog-page-label">
                  A LITTLE KNOWLEDGE. A NEW BEGINNING.
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
