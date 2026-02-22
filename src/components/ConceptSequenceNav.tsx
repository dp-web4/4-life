import Link from 'next/link';

/**
 * Sequential navigation for the core concept learning path.
 *
 * Learning sequence: LCT → ATP → T3 → CI → Aliveness
 * Placed at the bottom of each concept page, above RelatedConcepts.
 */

interface ConceptStep {
  path: string;
  title: string;
  shortTitle: string;
}

const CONCEPT_SEQUENCE: ConceptStep[] = [
  { path: '/lct-explainer', title: 'Witnessed Presence (LCT)', shortTitle: 'Identity' },
  { path: '/atp-economics', title: 'Energy Budget (ATP)', shortTitle: 'Energy' },
  { path: '/trust-tensor', title: 'Trust Tensor (T3)', shortTitle: 'Trust' },
  { path: '/coherence-index', title: 'Coherence Index (CI)', shortTitle: 'Coherence' },
  { path: '/aliveness', title: 'Aliveness & Death', shortTitle: 'Aliveness' },
];

interface ConceptSequenceNavProps {
  currentPath: string;
}

export default function ConceptSequenceNav({ currentPath }: ConceptSequenceNavProps) {
  const currentIndex = CONCEPT_SEQUENCE.findIndex(s => s.path === currentPath);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? CONCEPT_SEQUENCE[currentIndex - 1] : null;
  const next = currentIndex < CONCEPT_SEQUENCE.length - 1 ? CONCEPT_SEQUENCE[currentIndex + 1] : null;

  return (
    <nav
      aria-label="Concept sequence"
      style={{
        marginTop: '3rem',
        padding: '1.5rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        alignItems: 'center',
      }}>
        {CONCEPT_SEQUENCE.map((step, i) => (
          <div key={step.path} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {i === currentIndex ? (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-sky)',
                padding: '0.125rem 0.5rem',
                background: 'rgba(56, 189, 248, 0.15)',
                borderRadius: '9999px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}>
                {step.shortTitle}
              </span>
            ) : (
              <Link
                href={step.path}
                style={{
                  fontSize: '0.75rem',
                  color: i < currentIndex ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '9999px',
                  border: '1px solid transparent',
                }}
              >
                {step.shortTitle}
              </Link>
            )}
            {i < CONCEPT_SEQUENCE.length - 1 && (
              <span style={{
                color: i < currentIndex ? 'var(--color-text-secondary)' : 'var(--color-border)',
                fontSize: '0.625rem',
              }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* Previous / Next buttons */}
      <div style={{
        display: 'flex',
        justifyContent: prev && next ? 'space-between' : next ? 'flex-end' : 'flex-start',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        {prev && (
          <Link
            href={prev.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--color-dark-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s ease',
              minWidth: '140px',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              ← Previous
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)' }}>
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={next.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              padding: '0.75rem 1.25rem',
              background: 'var(--color-dark-surface)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              transition: 'border-color 0.15s ease',
              textAlign: 'right',
              minWidth: '140px',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--color-sky)' }}>
              Next →
            </span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)' }}>
              {next.title}
            </span>
          </Link>
        )}
      </div>

      {/* End-of-sequence CTA */}
      {!next && (
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            You&apos;ve covered all 5 core concepts!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/society-simulator"
              style={{
                padding: '0.5rem 1.25rem',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(168, 85, 247, 0.2))',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                color: 'var(--color-sky)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Watch a Society →
            </Link>
            <Link
              href="/playground"
              style={{
                padding: '0.5rem 1.25rem',
                background: 'var(--color-dark-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Build Your Own →
            </Link>
          </div>
        </div>
      )}

      {/* First-in-sequence note */}
      {!prev && (
        <div style={{
          marginTop: '1rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            This is the first concept in the <Link href="/learn" style={{ color: 'var(--color-sky)', textDecoration: 'none' }}>learning path</Link>. Each concept builds on the last.
          </p>
        </div>
      )}
    </nav>
  );
}
