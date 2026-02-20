import type { Metadata } from "next";
import Link from "next/link";
import SiteSearch from "@/components/SiteSearch";
import GlossaryPanel from "@/components/GlossaryPanel";
import "./globals.css";

export const metadata: Metadata = {
  title: "4-Life | Trust-Native Internet Lab",
  description:
    "Explore a trust-native internet through interactive simulations. See how hardware-bound identity, attention budgets, and permanent consequences create self-regulating digital societies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <Link href="/" className="nav-logo">4-Life</Link>
          <nav className="nav-links" aria-label="Main navigation">
            <SiteSearch />
            <a
              href="https://dp-web4.github.io/web4/"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              Whitepaper ↗
            </a>
          </nav>
        </header>
        <main>{children}</main>
        <GlossaryPanel />
        <footer className="footer">
          <p>4-Life is an experimental lab for Web4 societies.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="https://dp-web4.github.io/web4/" target="_blank" rel="noreferrer">
              Read the Web4 whitepaper
            </a>
            {' · '}
            <a href="https://github.com/dp-web4" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
