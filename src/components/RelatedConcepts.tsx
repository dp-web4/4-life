'use client';

import Link from 'next/link';
import { getRelatedPages, getPrerequisites, NavItem } from '@/lib/navigation';

interface RelatedConceptsProps {
  currentPath: string;
  showPrerequisites?: boolean;
}

export default function RelatedConcepts({
  currentPath,
  showPrerequisites = true
}: RelatedConceptsProps) {
  const related = getRelatedPages(currentPath);
  const prerequisites = showPrerequisites ? getPrerequisites(currentPath) : [];

  if (related.length === 0 && prerequisites.length === 0) {
    return null;
  }

  return (
    <section
      className="related-concepts"
      style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Related content"
    >
      {prerequisites.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Prerequisites
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '0.75rem'
          }}>
            Understanding these concepts first will help:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {prerequisites.map(page => (
              <PagePill key={page.href} page={page} variant="prerequisite" />
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem'
          }}>
            Related Concepts
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {related.map(page => (
              <PagePill key={page.href} page={page} variant="related" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function PagePill({ page, variant }: { page: NavItem; variant: 'related' | 'prerequisite' }) {
  const isPrereq = variant === 'prerequisite';

  return (
    <Link
      href={page.href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: isPrereq
          ? 'rgba(251, 191, 36, 0.1)'
          : 'var(--color-dark-surface)',
        border: `1px solid ${isPrereq ? 'rgba(251, 191, 36, 0.3)' : 'var(--color-border)'}`,
        borderRadius: '9999px',
        fontSize: '0.875rem',
        color: 'var(--color-text)',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isPrereq
          ? 'rgba(251, 191, 36, 0.2)'
          : 'var(--color-accent)';
        e.currentTarget.style.borderColor = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isPrereq
          ? 'rgba(251, 191, 36, 0.1)'
          : 'var(--color-dark-surface)';
        e.currentTarget.style.borderColor = isPrereq
          ? 'rgba(251, 191, 36, 0.3)'
          : 'var(--color-border)';
      }}
    >
      <span style={{ fontWeight: 500 }}>{page.title}</span>
      <span style={{
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        maxWidth: '150px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {page.desc}
      </span>
    </Link>
  );
}
