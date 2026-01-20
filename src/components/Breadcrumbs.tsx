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
    <nav
      aria-label="Breadcrumb"
      style={{
        marginBottom: '1.5rem',
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
  );
}
