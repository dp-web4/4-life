'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import PageTracker from '@/components/PageTracker';
import TrustDilemma, { DILEMMA_QUESTIONS } from '@/components/TrustDilemma';

export default function TrustDilemmasPage() {
  return (
    <>
      <PageTracker slug="trust-dilemmas" />
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <Breadcrumbs currentPath="/trust-dilemmas" />

        <h1 style={{ marginBottom: '0.5rem' }}>Trust Dilemmas</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          Five real problems the internet faces today. Pick how you&apos;d solve them,
          then see how a trust-native approach would handle each one.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
          }}>
            <span>~5 minutes</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
            You&apos;ll explore: <strong style={{ color: 'var(--color-text-primary)' }}>spam prevention</strong>,{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>identity persistence</strong>,{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>permanent reputation</strong>,{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>privacy</strong>, and{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>portable trust</strong>
          </div>
        </div>

        <noscript>
          <div style={{ marginBottom: '2rem' }}>
            {DILEMMA_QUESTIONS.map((q, i) => (
              <div key={i} style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '12px', marginBottom: '1.5rem', padding: '1.5rem' }}>
                <p style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  {i + 1}. {q.question}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  Web4 mechanism: {q.pillar}
                </p>
                {q.options.map(opt => {
                  const fb = q.feedback[opt.id];
                  return (
                    <div key={opt.id} style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
                      <p style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {opt.icon} &ldquo;{opt.label}&rdquo;
                      </p>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                        {fb.text}
                      </p>
                      <p style={{ color: '#10b981', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                        {fb.web4}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}
            <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center' }}>
              For the interactive quiz experience, visit with JavaScript enabled.{' '}
              <a href="/tldr" style={{ color: '#38bdf8' }}>2-minute overview</a> ·{' '}
              <a href="/day-in-web4" style={{ color: '#38bdf8' }}>A Day in Web4</a>
            </p>
          </div>
        </noscript>

        <TrustDilemma />

        <ExplorerNav currentPath="/trust-dilemmas" />
      </div>
    </>
  );
}
