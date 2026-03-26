'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import PageTracker from '@/components/PageTracker';
import TrustDilemma from '@/components/TrustDilemma';

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

        <TrustDilemma />

        <ExplorerNav currentPath="/trust-dilemmas" />
      </div>
    </>
  );
}
