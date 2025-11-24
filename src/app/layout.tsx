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
            <Link href="/starter-kit">Starter kit</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div>4-Life is an experimental lab for Web4 societies.</div>
          <div>All behavior is subject to change as the standard evolves.</div>
        </footer>
      </body>
    </html>
  );
}
