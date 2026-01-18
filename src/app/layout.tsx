import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "4-Life | Fractal Web4 Societies",
  description:
    "4-Life is a fractal network of Web4 societies for humans and AI agents, built on verifiable trust, MRH, and hardware-bound identities.",
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
          <nav className="nav-links">
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
