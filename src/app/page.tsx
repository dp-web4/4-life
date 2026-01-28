'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationTree } from '@/lib/navigation';
import FeaturedMoment, { FeaturedMomentCompact } from '@/components/FeaturedMoment';
import EcosystemStats from '@/components/EcosystemStats';
import type { MomentCategory } from '@/lib/moments/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'intro' | 'deepdive'>('intro');

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <p className="eyebrow">Web4 Societies, In Motion</p>
        <h1 style={{ marginBottom: '1.5rem' }}>
          Trust-Native Societies for Humans and AI
        </h1>
        <p className="hero-subtitle" style={{ margin: '0 auto 2rem' }}>
          What if trust was measurable? What if spam died from metabolic exhaustion?
          What if societies self-organized without central authority?
        </p>

        {/* Tab Selector */}
        <div className="nav-links" style={{ justifyContent: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('intro')}
            className={`tab-button ${activeTab === 'intro' ? 'active' : ''}`}
          >
            Introduction
          </button>
          <button
            onClick={() => setActiveTab('deepdive')}
            className={`tab-button ${activeTab === 'deepdive' ? 'active' : ''}`}
          >
            Deep Dive
          </button>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'intro' ? (
        <IntroTab />
      ) : (
        <DeepDiveTab />
      )}
    </div>
  );
}

function IntroTab() {
  return (
    <div className="space-y-12" style={{ maxWidth: '48rem', margin: '0 auto' }}>
      {/* Quick Start */}
      <section className="card card-highlight text-center">
        <h2 style={{ fontSize: '1.5rem' }}>New here?</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Start with our interactive tutorial. Zero to understanding in 10 minutes.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/first-contact" className="btn-primary">
            First Contact →
          </Link>
          <Link href="/explore-guide" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            Not sure where to start?
          </Link>
        </div>
      </section>

      {/* The Big Idea */}
      <section>
        <h2>The Big Idea</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Web4 is a trust-native internet where:
        </p>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          display: 'grid',
          gap: '1rem',
        }}>
          <li className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>🔗</span>
            <div>
              <strong>Identity is hardware-bound</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                You can't create fake accounts cheaply. Trust accumulates on you, not an account.
              </p>
            </div>
          </li>
          <li className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <div>
              <strong>Attention is metabolic</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Every action costs ATP. Quality earns ATP. Spam burns out.
              </p>
            </div>
          </li>
          <li className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>📜</span>
            <div>
              <strong>Consequences are permanent</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Your track record follows you forever. No fresh starts. No hiding from your history.
              </p>
            </div>
          </li>
          <li className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <div>
              <strong>AI and humans coexist</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                The same trust framework applies to all agents, regardless of substrate.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* See It Work */}
      <section className="card" style={{ background: 'var(--color-dark-surface)' }}>
        <h2 style={{ fontSize: '1.25rem' }}>See It Work</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Watch agents build trust, manage resources, and face consequences in a Web4 society.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/society-simulator" className="btn-primary">
            Society Simulator
          </Link>
          <Link href="/lab-console" className="btn-secondary">
            Lab Console
          </Link>
          <Link href="/playground" className="btn-secondary">
            Playground
          </Link>
        </div>
      </section>

      {/* Featured Moment - Dynamic carousel from simulations */}
      <FeaturedMoment rotate rotationInterval={10000} rotationCount={6} />

      {/* CTA to Deep Dive */}
      <section className="text-center" style={{ paddingTop: '1rem' }}>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Ready to go deeper?
        </p>
        <button
          onClick={() => {
            const element = document.querySelector('[data-tab="deepdive"]');
            if (element) (element as HTMLElement).click();
          }}
          className="btn-secondary"
        >
          Explore All Topics →
        </button>
      </section>
    </div>
  );
}

function DeepDiveTab() {
  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      <p style={{
        color: 'var(--color-text-secondary)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Explore by category, or use the search in your browser (Ctrl/Cmd+F).
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {Object.entries(navigationTree).map(([category, items]) => (
          <div key={category} className="nav-tree-category">
            <h3 className="nav-tree-category-title">{category}</h3>
            <ul className="nav-tree-items">
              {items.map((item) => (
                <li key={item.href} className="nav-tree-item">
                  <Link href={item.href} className="nav-tree-link">
                    <span style={{ fontWeight: 500 }}>{item.title}</span>
                    <span style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      marginTop: '0.125rem'
                    }}>
                      {item.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Ecosystem Overview */}
      <div style={{ marginTop: '2.5rem' }}>
        <EcosystemStats variant="full" showCategoryBreakdown />
      </div>

      {/* Live Moments Preview */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>
          Live from Simulations
        </h3>
        <p style={{
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          Real events detected in Web4 societies
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
        }}>
          {(['emergence', 'karma', 'learning', 'crisis', 'trust'] as MomentCategory[]).map(cat => (
            <FeaturedMomentCompact key={cat} category={cat} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>Jump Into Action</h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/first-contact" className="btn-primary">
            First Contact (10 min)
          </Link>
          <Link href="/lab-console" className="btn-secondary">
            Lab Console
          </Link>
          <Link href="/act-explorer" className="btn-secondary">
            ACT Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
