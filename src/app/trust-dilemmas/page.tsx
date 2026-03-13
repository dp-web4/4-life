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
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Three real problems the internet faces today. Pick how you&apos;d solve them,
          then see how a trust-native protocol would handle each one.
        </p>

        <TrustDilemma />

        <ExplorerNav currentPath="/trust-dilemmas" />
      </div>
    </>
  );
}
