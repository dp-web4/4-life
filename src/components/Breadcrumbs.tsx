'use client';

import Link from 'next/link';
import { getCategory, getPageInfo } from '@/lib/navigation';

interface BreadcrumbsProps {
  currentPath: string;
}

export default function Breadcrumbs({ currentPath }: BreadcrumbsProps) {
  const category = getCategory(currentPath);
  const pageInfo = getPageInfo(currentPath);

  if (!category || !pageInfo) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '0.5rem',
        marginBottom: '1.5rem',
      }}
    >
      <nav
        aria-label="Breadcrumb"
        style={{
          fontSize: '0.875rem',
        }}
      >
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <Link
              href="/"
              style={{
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
              }}
            >
              Home
            </Link>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
            /
          </li>
          <li>
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {category}
            </span>
          </li>
          <li style={{ color: 'var(--color-text-muted)' }} aria-hidden="true">
            /
          </li>
          <li aria-current="page">
            <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>
              {pageInfo.title}
            </span>
          </li>
        </ol>
      </nav>
      {/* Acronym escape-hatch: every concept page is one click from the glossary's
          "Acronyms at a glance" index (June-10 visitor HIGH - index was only
          discoverable by happening to visit /glossary). Outside the <nav> so it
          doesn't pollute breadcrumb semantics; hidden on /glossary itself.
          Jul-13 visitor MEDIUM: the old label "Lost in the acronyms?" announced
          difficulty up front ("reads like the page knows it overloaded me") - 
          neutral label now, same affordance/href. Don't re-add the "Lost?" framing. */}
      {currentPath !== '/glossary' && (
        <Link
          href="/glossary#acronyms"
          style={{
            fontSize: '0.8rem',
            color: '#38bdf8',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Acronym quick index →
        </Link>
      )}
    </div>
  );
}
