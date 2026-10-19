import { legalContent, type LegalPageId } from "@/lib/legal";

function LinkedText({ text }: { text: string }) {
  return text
    .split(
      /(https:\/\/www\.lanzacorporation\.com\/privacy-policy|juan@lanzacorporation\.com|\(832\) 379-0358)/g,
    )
    .map((part, index) => {
      const href = part.startsWith("https://")
        ? part
        : part === "juan@lanzacorporation.com"
          ? `mailto:${part}`
          : part === "(832) 379-0358"
            ? "tel:+18323790358"
            : null;
      return href ? (
        <a key={index} href={href}>
          {part}
        </a>
      ) : (
        part
      );
    });
}

export function LegalPage({ page }: { page: LegalPageId }) {
  const document = legalContent[page];
  return (
    <main className="legal-page">
      <nav className="legal-page-nav" aria-label="Legal page navigation">
        <a href="/">Lanza Enterprises LLC</a>
        <a href="/">Back to home ↗</a>
      </nav>
      <article className="legal-content">
        <span className="eyebrow red">LANZA ENTERPRISES LLC</span>
        <h1>{document.title}</h1>
        <p className="legal-date">Last updated: {document.updated}</p>
        <p className="legal-intro">{document.intro}</p>
        {document.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <LinkedText text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </article>
      <footer className="legal-page-footer">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms &amp; Conditions</a>
        <a href="mailto:juan@lanzacorporation.com">juan@lanzacorporation.com</a>
        <a href="tel:+18323790358">(832) 379-0358</a>
      </footer>
    </main>
  );
}
