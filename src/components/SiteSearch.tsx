'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchPages, NavItem, getCategory } from '@/lib/navigation';

export default function SiteSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NavItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search on query change
  useEffect(() => {
    if (query.length >= 2) {
      const found = searchPages(query).slice(0, 8);
      setResults(found);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].href);
      setIsOpen(false);
      setQuery('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Keyboard shortcut to focus search
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--color-dark-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          padding: '0.375rem 0.75rem',
          transition: 'border-color 0.15s ease',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search pages"
          aria-expanded={isOpen && results.length > 0}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
            width: isOpen ? '200px' : '120px',
            transition: 'width 0.2s ease',
          }}
        />
        <kbd
          style={{
            display: 'none',
            padding: '0.125rem 0.375rem',
            background: 'var(--color-border)',
            borderRadius: '0.25rem',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
          }}
          className="search-kbd"
        >
          {typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘K' : 'Ctrl+K'}
        </kbd>
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            width: '320px',
            maxHeight: '400px',
            overflowY: 'auto',
            background: 'var(--color-dark-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
          }}
        >
          {results.map((page, idx) => {
            const category = getCategory(page.href);
            const isSelected = idx === selectedIndex;

            return (
              <button
                key={page.href}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  router.push(page.href);
                  setIsOpen(false);
                  setQuery('');
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  border: 'none',
                  background: isSelected ? 'var(--color-accent)' : 'transparent',
                  cursor: 'pointer',
                  borderBottom: idx < results.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  marginBottom: '0.125rem'
                }}>
                  {page.title}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {page.desc}
                  </span>
                  {category && (
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.125rem 0.375rem',
                      background: 'var(--color-border)',
                      borderRadius: '0.25rem',
                      color: 'var(--color-text-secondary)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {category}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            width: '280px',
            padding: '1rem',
            background: 'var(--color-dark-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
          }}
        >
          No pages found for &ldquo;{query}&rdquo;
        </div>
      )}

      <style jsx>{`
        @media (min-width: 640px) {
          .search-kbd {
            display: inline-block !important;
          }
        }
      `}</style>
    </div>
  );
}
