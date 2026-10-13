import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JUAN. | Houston Real Estate",
  description:
    "Discover a more personal way home in Houston. Explore beautiful homes and Houston neighborhoods, and start your next chapter with Juan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
