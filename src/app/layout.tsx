import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SiteSearch from "@/components/SiteSearch";
import GlossaryPanel from "@/components/GlossaryPanel";
import ExplorationProgress from "@/components/ExplorationProgress";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "4-Life | The Web4 Onramp",
  description:
    "Web4 makes AI actions verifiable: trust earned through witnessed behavior, not declared by a platform or asserted by a key. The onramp is four composable pieces: the core standard, the hub, hestia, and hardbound.",
  metadataBase: new URL("https://4-life-ivory.vercel.app"),
  openGraph: {
    title: "4-Life | The Web4 Onramp",
    description:
      "An educational onramp to Web4: the core standard, the hub, hestia, and hardbound. Honest about what is real today.",
    siteName: "4-Life",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4-Life | The Web4 Onramp",
    description:
      "An educational onramp to Web4: the core standard, the hub, hestia, and hardbound. Honest about what is real today.",
  },
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
            <Link
              href="/tldr"
              className="btn-primary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              Start here
            </Link>
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
          <MobileNav />
        </header>
        <ExplorationProgress />
        <main>{children}</main>
        <GlossaryPanel />
        <footer className="footer">
          <p>4-Life is an educational onramp to Web4.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="https://dp-web4.github.io/web4/" target="_blank" rel="noreferrer">
              Read the Web4 whitepaper
            </a>
            {' · '}
            <a href="https://github.com/dp-web4" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>
            Web4 is a proposed open standard and an active research project. Each page says what is real today and what is not.
          </p>
        </footer>
      </body>
    </html>
  );
}
