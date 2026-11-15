import { Brand } from "@/components/brand";
import { BusinessContactLinks } from "@/components/contact";
import { Icon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-column">
            <Brand light />
            <p>Houston roots. New beginnings.</p>
            <a className="footer-top-link" href="#home">
              BACK TO TOP <Icon name="arrow-up" size={17} />
            </a>
          </div>
          <div className="footer-contact-column">
            <h3 className="footer-column-label">LET’S CONNECT</h3>
            <BusinessContactLinks />
          </div>
          <nav aria-label="Footer navigation">
            <h3 className="footer-column-label">EXPLORE</h3>
            <a href="/#contact">Buy with us</a>
            <a href="/#contact">Sell with us</a>
            <a href="/#neighborhoods">Neighborhoods</a>
            <a href="/#about">About us</a>
            <a href="/blog">Blog</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lanza Realty Group</span>
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms & Conditions</a>
          </div>
          <span className="footer-note">
            <Icon name="home" size={15} />
            Houston, Texas
          </span>
        </div>
      </div>
    </footer>
  );
}
