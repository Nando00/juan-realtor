"use client";

import { useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { ContactDetails } from "@/components/contact";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/modal";

export function SiteHeader({
  onContact,
  blog = false,
}: {
  onContact?: () => void;
  blog?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function openContact() {
    setMenuOpen(false);
    if (onContact) onContact();
    else setContactOpen(true);
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
            id="main-navigation"
            aria-label="Main navigation"
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                menuButton.current?.focus();
              }
            }}
          >
            <button onClick={openContact}>Buy with us</button>
            <button onClick={openContact}>Sell with us</button>
            <a href="/#neighborhoods" onClick={() => setMenuOpen(false)}>
              Neighborhoods
            </a>
            <a href="/#about" onClick={() => setMenuOpen(false)}>
              About us
            </a>
            <a
              href="/blog"
              aria-current={blog ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="button button-black header-cta"
              onClick={openContact}
            >
              Let’s talk <Icon name="arrow-up" size={17} />
            </button>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
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
