"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/modal";
import { PhotoGallery } from "@/components/photo-gallery";
import { homePhotos } from "@/lib/photos";
import { legalContent, type LegalPageId } from "@/lib/legal";

type ContactDraft = {
  name: string;
  email: string;
  interest: string;
  message: string;
};
const draftKey = "lanza-contact-draft";
const neighborhoods = [
  {
    name: "Houston Heights",
    mood: "Historic charm. A neighborhood rhythm.",
    image: "/images/IMG_1184.JPEG",
    label: "THE CLASSIC HOUSTON",
  },
  {
    name: "Montrose",
    mood: "Creative energy. A place all your own.",
    image: "/images/IMG_1190.JPEG",
    label: "THE CREATIVE SPIRIT",
  },
  {
    name: "Memorial",
    mood: "Leafy streets. Room to settle in.",
    image: "/images/IMG_1187.JPEG",
    label: "ROOM TO BREATHE",
  },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Lanza Enterprises LLC home"
    >
      <span className="brand-wordmark">
        <span className="brand-name">
          LANZA<span>.</span>
        </span>
        <span className="brand-business">ENTERPRISES LLC</span>
      </span>
      <span className="brand-rule" />
      <span className="brand-caption">
        HOUSTON,
        <br />
        TEXAS
      </span>
    </a>
  );
}

function ContactForm({ subject }: { subject: string }) {
  const initialInterest =
    subject === "selling my home" ? "Selling a home" : "Buying a home";
  const [draft, setDraft] = useState<ContactDraft>({
    name: "",
    email: "",
    interest: initialInterest,
    message: subject ? `I'd love to learn more about ${subject}.` : "",
  });
  const [saved, setSaved] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const value: unknown = JSON.parse(raw);
      if (
        typeof value === "object" &&
        value !== null &&
        ["name", "email", "interest", "message"].every(
          (key) => typeof (value as Record<string, unknown>)[key] === "string",
        )
      ) {
        const stored = value as ContactDraft;
        setDraft({
          ...stored,
          interest: subject ? initialInterest : stored.interest,
          message: subject
            ? `I'd love to learn more about ${subject}.`
            : stored.message,
        });
        setHasDraft(true);
      }
    } catch {
      /* The form remains available when storage is disabled. */
    }
  }, [subject, initialInterest]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      localStorage.setItem(draftKey, JSON.stringify(draft));
      setSaved(true);
      setHasDraft(true);
      setError("");
    } catch {
      setError(
        "Your browser could not save this draft. Enable site storage and try again.",
      );
    }
  }

  function clearDraft() {
    try {
      localStorage.removeItem(draftKey);
      setDraft({ name: "", email: "", interest: "Buying a home", message: "" });
      setHasDraft(false);
      setSaved(false);
      setError("");
    } catch {
      setError(
        "Your browser could not clear this draft. Try clearing this site's data in browser settings.",
      );
    }
  }

  function downloadDraft() {
    const content = `LANZA ENTERPRISES LLC — INQUIRY DRAFT\n\nName: ${draft.name}\nEmail: ${draft.email}\nInterest: ${draft.interest}\n\n${draft.message}\n\nThis draft has not been sent to an agent.`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "lanza-inquiry.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="contact-dialog">
      <span className="eyebrow red">GOOD THINGS START WITH A CONVERSATION</span>
      <h2>
        {saved ? (
          <>
            One step closer
            <br />
            to your <em>next chapter.</em>
          </>
        ) : (
          <>
            Let’s make
            <br />
            your next move.
          </>
        )}
      </h2>
      {saved ? (
        <div className="draft-success" role="status">
          <span className="success-icon">
            <Icon name="check" size={26} />
          </span>
          <h3>Your inquiry is saved.</h3>
          <p>
            Your draft is saved on this device. This preview does not send it to
            an agent. Download a copy to keep your plans handy.
          </p>
          <button className="button button-red" onClick={downloadDraft}>
            Download inquiry <Icon name="arrow" />
          </button>
          <button className="text-button" onClick={() => setSaved(false)}>
            Edit my inquiry
          </button>
          <button className="text-button subtle" onClick={clearDraft}>
            Delete saved draft
          </button>
        </div>
      ) : (
        <>
          <p className="dialog-intro">
            Big plans, small questions, or just exploring. There’s a place to
            start.
          </p>
          <form onSubmit={submit} className="contact-form">
            <div className="form-row">
              <label>
                Your name
                <input
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </label>
              <label>
                Email address
                <input
                  required
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  placeholder="alex@example.com"
                  value={draft.email}
                  onChange={(e) =>
                    setDraft({ ...draft, email: e.target.value })
                  }
                />
              </label>
            </div>
            <label>
              I’m interested in
              <select
                value={draft.interest}
                onChange={(e) =>
                  setDraft({ ...draft, interest: e.target.value })
                }
              >
                <option>Buying a home</option>
                <option>Selling a home</option>
                <option>Just exploring</option>
              </select>
            </label>
            <label>
              A little about your plans
              <textarea
                rows={4}
                maxLength={2000}
                placeholder="Your dream neighborhood, your timeline, your must-haves…"
                value={draft.message}
                onChange={(e) =>
                  setDraft({ ...draft, message: e.target.value })
                }
              />
            </label>
            <p className="form-note">
              <Icon name="home" size={16} />
              Preview mode: your inquiry stays in this browser and is not sent.
            </p>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button className="button button-red" type="submit">
              Save my inquiry <Icon name="arrow-up" />
            </button>
            {hasDraft && (
              <button
                type="button"
                className="text-button subtle"
                onClick={clearDraft}
              >
                Delete saved draft
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [legal, setLegal] = useState<LegalPageId | null>(null);
  const [contact, setContact] = useState<{ subject: string } | null>(null);
  function openContact(subject = "") {
    setMenuOpen(false);
    setGalleryOpen(false);
    setContact({ subject });
  }
  function exploreNeighborhood(name: string) {
    openContact(`finding a home in ${name}, Houston`);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="home">
        <div className="header-inner">
          <Brand />
          <nav
            aria-label="Main navigation"
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
          >
            <button onClick={() => openContact("buying a home")}>
              Buy with us
            </button>
            <button onClick={() => openContact("selling my home")}>
              Sell with us
            </button>
            <a href="#neighborhoods" onClick={() => setMenuOpen(false)}>
              Neighborhoods
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About us
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="button button-black header-cta"
              onClick={() => openContact()}
            >
              Let’s talk <Icon name="arrow-up" size={17} />
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero hero-collage" aria-labelledby="hero-title">
          <div className="hero-feature">
            <img
              className="hero-image"
              src="/images/IMG_1194.JPEG"
              alt="Single-story home with warm glowing windows beneath a colorful sunset"
              fetchPriority="high"
            />
            <div className="hero-shade" />
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="red-dot" />
                YOUR HOUSTON. YOUR HOME.
              </div>
              <h1 id="hero-title">
                A place for your
                <br />
                <em>next chapter.</em>
              </h1>
              <p>
                More than a new address. A new beginning.
                <br />
                Let’s find the place that feels like you.
              </p>
              <a className="hero-link" href="#neighborhoods">
                Find your place{" "}
                <span>
                  <Icon name="arrow-up" size={19} />
                </span>
              </a>
            </div>
            <div className="hero-index">
              <span>01</span>
              <span className="index-rule" />
              <span>THE NEXT CHAPTER</span>
            </div>
          </div>
          <div
            className="hero-mosaic"
            aria-label="A collection of places to call home"
          >
            <div className="hero-tile hero-tile-wide">
              <img
                src="/images/IMG_1191.JPEG"
                alt="Sunlit white kitchen with pendant lighting and a generous island"
              />
              <span className="hero-photo-label">
                ROOM FOR EVERYDAY MOMENTS
              </span>
            </div>
            <div className="hero-tile">
              <img
                src="/images/IMG_1190.JPEG"
                alt="Modern dark-sided home with mature trees and a landscaped lawn"
              />
            </div>
            <div className="hero-tile">
              <img
                src="/images/IMG_1196.JPEG"
                alt="Welcoming living room with a fireplace and exposed ceiling beam"
              />
            </div>
            <button
              className="hero-gallery-link"
              aria-label="View home photo collection"
              onClick={() => setGalleryOpen(true)}
            >
              <span>Explore all 13 photos</span>
              <Icon name="arrow-up" size={18} />
            </button>
          </div>
        </section>

        <section
          className="intro-strip container"
          aria-label="A personal approach"
        >
          <div className="intro-title">
            A little local knowledge.
            <br />
            <em>A world of difference.</em>
          </div>
          <div className="intro-item">
            <span>01</span>
            <div>
              <strong>Local by heart.</strong>
              <p>Houston is more than a pin on a map.</p>
            </div>
          </div>
          <div className="intro-item">
            <span>02</span>
            <div>
              <strong>You-first. Always.</strong>
              <p>Your goals set the direction.</p>
            </div>
          </div>
          <div className="intro-item">
            <span>03</span>
            <div>
              <strong>Every step, together.</strong>
              <p>From the first hello to the keys.</p>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <div className="container about-grid">
            <div className="about-visual">
              <img
                className="about-image"
                src="/images/IMG_1189.JPEG"
                alt="Bright open-plan living room with white sofas, wood floors, and a kitchen island"
                loading="lazy"
              />
              <div className="about-stamp">
                <Icon name="home" size={28} />
                <span>
                  ROOTED IN HOUSTON.
                  <br />
                  FOCUSED ON YOU.
                </span>
              </div>
              <div className="image-caption">
                <span>HOME IS A FEELING.</span>
                <span>
                  Let’s find yours. <Icon name="arrow-up" size={14} />
                </span>
              </div>
            </div>
            <div className="about-copy">
              <span className="eyebrow">
                <span className="mini-line" />
                YOUR NEIGHBOR. YOUR REALTOR.
              </span>
              <h2 id="about-title">
                Real estate.
                <br />
                <em>A little more personal.</em>
              </h2>
              <p className="about-lead">
                At Lanza Enterprises LLC, we believe finding a home should feel
                as good as coming home.
              </p>
              <p>
                It starts with listening. To what matters to you, where you see
                yourself, and all the little things that make a place your own.
                Then we turn that picture into a plan.
              </p>
              <p>
                Whether you’re putting down roots, making room for more, or
                ready for something new, you deserve a partner who’s in your
                corner.
              </p>
              <div className="about-signoff">
                <span className="signature">Lanza.</span>
                <span>
                  YOUR NEXT CHAPTER
                  <br />
                  STARTS WITH A HELLO.
                </span>
              </div>
              <button
                className="button button-black"
                onClick={() => openContact()}
              >
                Get to know your next move <Icon name="arrow-up" size={17} />
              </button>
            </div>
          </div>
        </section>

        <section
          id="neighborhoods"
          className="neighborhood-section container section-space"
          aria-labelledby="neighborhood-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="mini-line" />
                FIND YOUR KIND OF HOUSTON
              </span>
              <h2 id="neighborhood-title">
                A neighborhood.
                <br className="mobile-break" /> <em>A way of life.</em>
              </h2>
            </div>
            <p className="heading-description">
              The coffee spot. The morning walk.
              <br />
              The feeling that you belong.
            </p>
          </div>
          <div className="neighborhood-grid">
            {neighborhoods.map((neighborhood) => (
              <button
                className="neighborhood-card"
                key={neighborhood.name}
                onClick={() => exploreNeighborhood(neighborhood.name)}
                aria-label={`Explore homes in ${neighborhood.name}`}
              >
                <img
                  src={neighborhood.image}
                  alt={`Illustrative home photography for ${neighborhood.name}`}
                  loading="lazy"
                />
                <div className="neighborhood-overlay" />
                <span className="neighborhood-label">{neighborhood.label}</span>
                <div className="neighborhood-content">
                  <h3>{neighborhood.name}</h3>
                  <p>{neighborhood.mood}</p>
                </div>
                <span className="round-arrow">
                  <Icon name="arrow-up" size={20} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="process-section container">
          <div>
            <span className="eyebrow">
              <span className="mini-line" />
              THE WAY HOME
            </span>
            <h2>
              Big move.
              <br />
              <em>Clear next steps.</em>
            </h2>
            <button className="section-link" onClick={() => openContact()}>
              Let’s take the first one <Icon name="arrow-up" size={18} />
            </button>
          </div>
          <div className="process-steps">
            {[
              {
                n: "01",
                title: "Tell us your story.",
                text: "The dream, the timeline, the non-negotiables. We start with what matters to you.",
              },
              {
                n: "02",
                title: "Make a plan. Find your place.",
                text: "Thoughtful options, honest conversations, and a path that fits your life.",
              },
              {
                n: "03",
                title: "Open a new door.",
                text: "From the details to the big day, you’ll know what’s next at every step.",
              },
            ].map((step) => (
              <div className="process-step" key={step.n}>
                <span>{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <Icon name="arrow-up" size={21} />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-banner">
          <div className="container contact-banner-inner">
            <div>
              <span className="eyebrow">YOUR NEXT CHAPTER IS OUT THERE.</span>
              <h2>
                Let’s find it. <em>Together.</em>
              </h2>
              <p>A fresh start begins with a simple conversation.</p>
            </div>
            <button
              className="button button-ivory"
              onClick={() => openContact()}
            >
              Let’s talk about home <Icon name="arrow-up" size={21} />
            </button>
            <span className="banner-mark" aria-hidden="true">
              L.
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand light />
              <p>Houston roots. New beginnings.</p>
            </div>
            <nav aria-label="Footer navigation">
              <button onClick={() => openContact("buying a home")}>
                Buy with us
              </button>
              <button onClick={() => openContact("selling my home")}>
                Sell with us
              </button>
              <a href="#neighborhoods">Neighborhoods</a>
              <a href="#about">About us</a>
            </nav>
            <a className="footer-top-link" href="#home">
              BACK TO TOP <Icon name="arrow-up" size={17} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Lanza Enterprises LLC</span>
            <div className="footer-legal">
              <button onClick={() => setLegal("privacy")}>
                Privacy Policy
              </button>
              <button onClick={() => setLegal("terms")}>
                Terms & Conditions
              </button>
            </div>
            <span className="footer-note">
              <Icon name="home" size={15} />
              Houston, Texas
            </span>
          </div>
        </div>
      </footer>

      {galleryOpen && (
        <Modal
          title="Home photo collection"
          onClose={() => setGalleryOpen(false)}
          className="photo-modal"
        >
          <PhotoGallery images={homePhotos} title="Home inspiration" />
          <div className="photo-caption">
            <span className="eyebrow red">SPACE FOR YOUR NEXT CHAPTER</span>
            <h2>Home, in the details.</h2>
            <p>
              A little inspiration for what comes next. Tell us what feels like
              home to you.
            </p>
            <button
              className="button button-red"
              onClick={() => openContact("finding my next home")}
            >
              Let’s talk <Icon name="arrow-up" size={18} />
            </button>
          </div>
        </Modal>
      )}
      {contact && (
        <Modal
          title="Let's talk about your next move"
          onClose={() => setContact(null)}
        >
          <ContactForm subject={contact.subject} />
        </Modal>
      )}
      {legal && (
        <Modal
          title={legalContent[legal].title}
          onClose={() => setLegal(null)}
          className="legal-modal"
        >
          <article className="legal-content">
            <span className="eyebrow red">LANZA ENTERPRISES LLC</span>
            <h2>{legalContent[legal].title}</h2>
            <p className="legal-date">
              Last updated: {legalContent[legal].updated}
            </p>
            <p className="legal-intro">{legalContent[legal].intro}</p>
            {legalContent[legal].sections.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <button
              className="section-link"
              onClick={() =>
                setLegal(legal === "privacy" ? "terms" : "privacy")
              }
            >
              Read our{" "}
              {legal === "privacy" ? "Terms & Conditions" : "Privacy Policy"}
              <Icon name="arrow" size={17} />
            </button>
          </article>
        </Modal>
      )}
    </>
  );
}
