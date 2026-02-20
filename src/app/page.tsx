'use client';

import { useState } from 'react';
import Link from 'next/link';
import { navigationTree } from '@/lib/navigation';
import FeaturedMoment, { FeaturedMomentCompact } from '@/components/FeaturedMoment';
import EcosystemStats from '@/components/EcosystemStats';
import TermTooltip from '@/components/TermTooltip';
import type { MomentCategory } from '@/lib/moments/types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'intro' | 'deepdive'>('intro');

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center" style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <p className="eyebrow">4-Life: A Trust-Native Internet Lab</p>
        <h1 style={{ marginBottom: '1rem' }}>
          The Internet Has a Trust Problem
        </h1>
        <p className="hero-subtitle" style={{ margin: '0 auto 1.5rem', color: 'var(--color-text-secondary)' }}>
          Spam wins because accounts are free. Reputations are trapped in silos.
          Bad actors get unlimited fresh starts. AI deception outpaces verification.
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--color-text)',
          margin: '0 auto 1.5rem',
          maxWidth: '36rem',
          lineHeight: 1.6
        }}>
          <strong>Web4</strong> is a trust-native internet — trust is built into the protocol, not bolted on.
          Identity costs something, every action costs energy,
          and consequences follow you forever.
          This site lets you <em>see</em> how it works.
        </p>

        {/* Tab Selector */}
        <div className="nav-links" style={{ justifyContent: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('intro')}
            className={`tab-button ${activeTab === 'intro' ? 'active' : ''}`}
          >
            Start Here
          </button>
          <button
            onClick={() => setActiveTab('deepdive')}
            className={`tab-button ${activeTab === 'deepdive' ? 'active' : ''}`}
          >
            Explore All Topics
          </button>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'intro' ? (
        <IntroTab onSwitchToDeepDive={() => { setActiveTab('deepdive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      ) : (
        <DeepDiveTab />
      )}
    </div>
  );
}

function IntroTab({ onSwitchToDeepDive }: { onSwitchToDeepDive: () => void }) {
  return (
    <div className="space-y-12" style={{ maxWidth: '48rem', margin: '0 auto' }}>
      {/* Guided Start - Most Prominent */}
      <section className="card card-highlight" style={{
        textAlign: 'center',
        border: '2px solid var(--color-emerald)',
        background: 'linear-gradient(135deg, var(--color-emerald-surface) 0%, var(--color-bg-secondary) 100%)'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>New Here? Start Here</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '32rem', margin: '0 auto 1.5rem' }}>
          Recommended path: <strong>Why Web4</strong> (understand the problem) → <strong>First Contact</strong> (learn the concepts) → <strong>Playground</strong> (experiment yourself)
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/why-web4" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>1. Why Web4?</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/first-contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>2. First Contact</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/playground" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none' }}>
            3. Playground
          </Link>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
          Not sure where to begin? <Link href="/explore-guide" style={{ color: 'var(--color-sky)' }}>Take the quiz</Link> for a personalized path.
          Or read the <Link href="/how-it-works" style={{ color: 'var(--color-sky)' }}>How It Works</Link> overview.
        </p>
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
              <strong>Every action costs energy</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Every action costs <TermTooltip term="ATP">ATP</TermTooltip>. Quality earns ATP. Spam burns out.
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
                The same trust framework applies to all agents — human or AI.
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
        <Link href="/society-simulator" className="btn-primary">
          Launch Society Simulator →
        </Link>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
          Or try the <Link href="/karma-journey" style={{ color: 'var(--color-sky)' }}>Karma Journey</Link> for a quicker look.
        </p>
      </section>

      {/* Featured Moment - Dynamic carousel from simulations */}
      <FeaturedMoment rotate rotationInterval={10000} rotationCount={6} />

      {/* CTA to Deep Dive */}
      <section className="text-center" style={{ paddingTop: '1rem' }}>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Ready to go deeper?
        </p>
        <button
          onClick={onSwitchToDeepDive}
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
          <Link href="/starter-kit" className="btn-secondary">
            Build Your Own
          </Link>
          <Link href="/act-explorer" className="btn-secondary">
            ACT Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
