import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { blogPostMetadata, postStructuredData } from "@/lib/blog-seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  return blogPostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postStructuredData(post)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <header className="blog-article-intro container">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">/</span>
          <a href="/blog">Blog</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.title}</span>
        </nav>
        <p className="eyebrow red">
          <span className="mini-line" />
          {post.category.toUpperCase()}
        </p>
        <h1>{post.title}</h1>
        <p className="blog-article-description">{post.description}</p>
        <div className="blog-byline">
          <span>By {post.author}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="blog-reading-time">
            <Icon name="clock" size={14} />
            {post.readingMinutes} min read
          </span>
        </div>
        {post.coverImage && (
          <figure className="blog-cover">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt}
              fetchPriority="high"
            />
          </figure>
        )}
      </header>
      <div className="blog-article-layout container">
        <div className="blog-article-content">
          <a className="section-link" href="/blog">
            <Icon name="arrow" size={16} className="arrow-back" />
            All articles
          </a>
          <article
            className="blog-prose"
            aria-label={post.title}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <div className="blog-article-end">
            <a className="section-link" href="/blog">
              <Icon name="arrow" size={16} className="arrow-back" />
              Back to all articles
            </a>
            {post.updated !== post.date && (
              <p>
                Updated{" "}
                <time dateTime={post.updated}>
                  {formatPostDate(post.updated)}
                </time>
              </p>
            )}
          </div>
        </div>
        <aside className="blog-sidebar" aria-label="About Lanza Realty Group">
          <p className="eyebrow red">ROOTED IN HOUSTON</p>
          <h2>
            A little local knowledge.
            <br />
            <em>A personal touch.</em>
          </h2>
          <p>
            Your next chapter starts with what matters to you. Let’s talk about
            your plans, your questions, and the place you’d love to call home.
          </p>
          <a href="/#about" className="section-link">
            Get to know us <Icon name="arrow-up" size={16} />
          </a>
          {post.tags.length > 0 && (
            <ul className="blog-tags" aria-label="Article topics">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          <a href="/#contact" className="button button-black">
            Let’s talk about home <Icon name="arrow-up" size={16} />
          </a>
        </aside>
      </div>
    </>
  );
}
