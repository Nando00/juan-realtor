"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/modal";
import { PhotoGallery } from "@/components/photo-gallery";
import { homePhotos } from "@/lib/photos";
import { ContactBanner, ContactDetails } from "@/components/contact";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  function openContact() {
    setGalleryOpen(false);
    setContactOpen(true);
  }

  return (
    <>
      <SiteHeader onContact={openContact} />

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
                At Lanza Realty Group, we believe finding a home should feel
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
                <span className="signature">LRG.</span>
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
                onClick={() => openContact()}
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

        <ContactBanner />
      </main>

      <SiteFooter />

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
            <button className="button button-red" onClick={() => openContact()}>
              Let’s talk <Icon name="arrow-up" size={18} />
            </button>
          </div>
        </Modal>
      )}
      {contactOpen && (
        <Modal
          title="Let's talk about your next move"
          onClose={() => setContactOpen(false)}
        >
          <ContactDetails />
        </Modal>
      )}
    </>
  );
}
