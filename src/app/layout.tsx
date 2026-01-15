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
          <div className="nav-logo">4-Life</div>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/web4-explainer">Web4 explainer</Link>
            <Link href="/starter-kit">Starter kit</Link>
            <Link href="/playground">Playground</Link>
            <Link href="/lab-console">Lab console</Link>
            <Link href="/trust-networks">Trust networks</Link>
            <Link href="/compare">Compare</Link>
            <Link href="/narratives">Narratives</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div>4-Life is an experimental lab for Web4 societies.</div>
          <div>All behavior is subject to change as the standard evolves.</div>
          <div>
            Curious about the full design? Read the
            <a
              href="https://dp-web4.github.io/web4/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#38bdf8", marginLeft: 4 }}
            >
              Web4 whitepaper
            </a>
            .
          </div>
        </footer>
      </body>
    </html>
  );
}
