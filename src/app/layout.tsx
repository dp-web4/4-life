import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SiteSearch from "@/components/SiteSearch";
import GlossaryPanel from "@/components/GlossaryPanel";
import ExplorationProgress from "@/components/ExplorationProgress";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "4-Life | Trust-Native Internet Lab",
  description:
    "Explore a trust-native internet through interactive simulations. See how hardware-bound identity, attention budgets, and permanent consequences create self-regulating digital societies.",
  metadataBase: new URL("https://4-life-ivory.vercel.app"),
  openGraph: {
    title: "4-Life | Trust-Native Internet Lab",
    description:
      "What if spam cost energy, identity was hardware-bound, and reputation followed you forever? See it working in simulation.",
    siteName: "4-Life",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4-Life | Trust-Native Internet Lab",
    description:
      "What if spam cost energy, identity was hardware-bound, and reputation followed you forever? See it working in simulation.",
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
        <ExplorationProgress />
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
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>
            Active research project · Updated weekly · Last update: Feb 27, 2026
          </p>
        </footer>
      </body>
    </html>
  );
}
