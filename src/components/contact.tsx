import { Icon } from "@/components/icons";

export function BusinessContactLinks() {
  return (
    <address className="business-contact-links">
      <a className="contact-detail-row" href="mailto:juan@lanzacorporation.com">
        <span className="contact-detail-icon">
          <Icon name="mail" size={19} />
        </span>
        <span className="contact-detail-text">
          <span className="contact-detail-label">Email us</span>
          <span className="contact-detail-value">
            juan@lanzacorporation.com
          </span>
        </span>
        <Icon name="arrow-up" size={16} className="contact-detail-arrow" />
      </a>
      <a className="contact-detail-row" href="tel:+18323790358">
        <span className="contact-detail-icon">
          <Icon name="phone" size={19} />
        </span>
        <span className="contact-detail-text">
          <span className="contact-detail-label">Give us a call</span>
          <span className="contact-detail-value">(832) 379-0358</span>
        </span>
        <Icon name="arrow-up" size={16} className="contact-detail-arrow" />
      </a>
    </address>
  );
}

export function ContactDetails() {
  return (
    <div className="contact-dialog">
      <span className="eyebrow red">LANZA REALTY GROUP</span>
      <h2>
        Let’s talk about <em>home.</em>
      </h2>
      <p className="dialog-intro">
        Call or email us about your next move, or use the chat widget to get in
        touch.
      </p>
      <BusinessContactLinks />
    </div>
  );
}

export function ContactBanner() {
  return (
    <section id="contact" className="contact-banner">
      <div className="container contact-banner-inner">
        <div>
          <span className="eyebrow">YOUR NEXT CHAPTER IS OUT THERE.</span>
          <h2>
            Let’s find it. <em>Together.</em>
          </h2>
          <p>A fresh start begins with a simple conversation.</p>
        </div>
        <div className="contact-banner-details">
          <div className="contact-card-heading">
            <h3>Get in touch.</h3>
            <span>LANZA REALTY GROUP</span>
          </div>
          <BusinessContactLinks />
        </div>
        <span className="banner-mark" aria-hidden="true">
          LRG.
        </span>
      </div>
    </section>
  );
}
