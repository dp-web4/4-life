"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigationTree } from "@/lib/navigation";

// Driven by the single navigation registry so this menu can never drift from the
// real IA (Start Here / The Onramp / Core Concepts / Going Deeper).
const sections = Object.entries(navigationTree).map(([label, items]) => ({
  label,
  links: items.map((i) => ({ href: i.href, title: i.title })),
}));

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
