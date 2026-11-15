import { ContactBanner } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./blog.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader blog />
      <main id="main">
        {children}
        <ContactBanner />
      </main>
      <SiteFooter />
    </>
  );
}
