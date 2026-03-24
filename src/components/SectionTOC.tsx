'use client';

import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

export default function SectionTOC({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Mobile: floating button + dropdown */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 text-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
          aria-label="Jump to section"
          title="Jump to section"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="15" y2="12" />
            <line x1="3" y1="18" x2="18" y2="18" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-64 max-h-80 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-2">
            <div className="text-xs uppercase tracking-wide text-gray-500 px-3 py-1 mb-1">Sections</div>
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                  activeId === id
                    ? 'text-sky-400 bg-sky-950/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block fixed top-28 right-4 xl:right-8 w-52 z-40">
        <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">On this page</div>
        <div className="space-y-0.5 border-l border-gray-700">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block pl-3 py-1 text-xs leading-snug transition-colors border-l -ml-px ${
                activeId === id
                  ? 'text-sky-400 border-sky-400'
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-500'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
