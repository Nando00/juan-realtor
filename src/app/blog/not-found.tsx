import { Icon } from "@/components/icons";

export default function BlogNotFound() {
  return (
    <section className="blog-intro blog-not-found container">
      <p className="eyebrow red">THE LANZA JOURNAL</p>
      <h1>
        This chapter
        <br />
        <em>couldn’t be found.</em>
      </h1>
      <p>
        The article or page may have moved. There’s more to explore in the
        journal.
      </p>
      <a href="/blog" className="button button-black">
        Back to the blog <Icon name="arrow-up" size={17} />
      </a>
    </section>
  );
}
