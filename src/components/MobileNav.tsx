"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const sections = [
  {
    label: "Start Here",
    links: [
      { href: "/tldr", title: "Web4 in 2 Minutes" },
      { href: "/why-web4", title: "Why Web4?" },
      { href: "/first-contact", title: "First Contact" },
      { href: "/how-it-works", title: "How It Works" },
      { href: "/learn", title: "Learning Journey" },
      { href: "/glossary", title: "Glossary" },
    ],
  },
  {
    label: "Core Concepts",
    links: [
      { href: "/lct-explainer", title: "Linked Context Token" },
      { href: "/trust-tensor", title: "Trust Tensor (T3)" },
      { href: "/atp-economics", title: "ATP Economics" },
      { href: "/trust-neighborhood", title: "MRH" },
      { href: "/aliveness", title: "Aliveness" },
    ],
  },
  {
    label: "Interactive Labs",
    links: [
      { href: "/simulation-sandbox", title: "Simulation Sandbox" },
      { href: "/society-simulator", title: "Society Simulator" },
      { href: "/trust-tensor-explorer", title: "Trust Explorer" },
      { href: "/karma-journey", title: "Karma Journey" },
      { href: "/research-hub", title: "Research Hub" },
    ],
  },
  {
    label: "AI Agents",
    links: [
      { href: "/understanding-consciousness", title: "AI Identity" },
      { href: "/capacity-thresholds", title: "AI Trust Limits" },
      { href: "/exploration-not-evaluation", title: "AI Learning" },
    ],
  },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="mobile-nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="mobile-nav-overlay" onClick={() => setOpen(false)} />
      )}

      <div className={`mobile-nav-drawer${open ? " open" : ""}`}>
        <div className="mobile-nav-header">
          <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
            4-Life
          </Link>
          <button
            className="mobile-nav-toggle"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-nav-content">
          {sections.map((section) => (
            <div key={section.label} className="mobile-nav-section">
              <div className="mobile-nav-section-label">{section.label}</div>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-nav-link${pathname === link.href ? " active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}

          <div className="mobile-nav-section">
            <a
              href="https://dp-web4.github.io/web4/"
              target="_blank"
              rel="noreferrer"
              className="mobile-nav-link"
              style={{ color: "var(--color-accent-blue)" }}
            >
              Whitepaper ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
