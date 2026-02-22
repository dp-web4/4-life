'use client';

import { useState, useEffect } from 'react';
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

function TrustDilemma() {
  const [answer, setAnswer] = useState<string | null>(null);

  const options = [
    { id: 'ban', label: 'Ban the spammer', icon: '🚫' },
    { id: 'captcha', label: 'Add more CAPTCHAs', icon: '🤖' },
    { id: 'cost', label: 'Make each account cost something', icon: '⚡' },
  ];

  const feedback: Record<string, { text: string; web4: string }> = {
    ban: {
      text: 'They make a new account in 30 seconds and do it again.',
      web4: 'Web4 approach: identity is tied to physical hardware. A new account means buying a new device.',
    },
    captcha: {
      text: 'AI solves CAPTCHAs better than humans now. Arms race never ends.',
      web4: 'Web4 approach: instead of proving you\'re human, prove you\'re consistent. Coherence is harder to fake than CAPTCHAs.',
    },
    cost: {
      text: 'You\'re thinking like Web4. When every action costs energy, spam becomes economically irrational.',
      web4: 'This IS the Web4 approach. Every action costs ATP (energy). Spam burns through it with no return.',
    },
  };

  if (answer) {
    const fb = feedback[answer];
    return (
      <section className="card" style={{
        maxWidth: '48rem', margin: '0 auto',
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
      }}>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          {fb.text}
        </p>
        <p style={{ color: 'var(--color-sky)', fontSize: '0.9rem', fontWeight: 500 }}>
          {fb.web4}
        </p>
        <button
          onClick={() => setAnswer(null)}
          style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Try another answer
        </button>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
        Quick question
      </p>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
        <strong>Someone creates 10,000 fake accounts to spam your community. What do you do?</strong>
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setAnswer(opt.id)}
            className="card"
            style={{
              cursor: 'pointer',
              padding: '0.75rem 1.25rem',
              border: '1px solid var(--color-border)',
              background: 'var(--color-dark-surface)',
              fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-sky)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            <span>{opt.icon}</span> {opt.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function IntroTab({ onSwitchToDeepDive }: { onSwitchToDeepDive: () => void }) {
  const [karmaProfile, setKarmaProfile] = useState<{ archetype: string; emoji: string; totalLives: number; coopRate: number } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('karma-journey-profile');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.archetype) setKarmaProfile(p);
      }
    } catch { /* ok */ }
  }, []);

  return (
    <div className="space-y-12" style={{ maxWidth: '48rem', margin: '0 auto' }}>
      {/* Trust Dilemma — 10-second engagement hook */}
      <TrustDilemma />

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
          Short on time? Read the <Link href="/tldr" style={{ color: 'var(--color-sky)' }}>2-minute overview</Link>.
          {' · '}
          What frustrates you about the internet? <Link href="/your-internet" style={{ color: 'var(--color-sky)' }}>See what would change</Link>.
          {' · '}
          Skeptic? Start with <Link href="/what-could-go-wrong" style={{ color: 'var(--color-sky)' }}>What Could Go Wrong</Link>.
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
                Every action costs <TermTooltip term="ATP">ATP</TermTooltip> (energy). Quality earns it back. Spam burns out.
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
        {karmaProfile && (
          <div style={{
            padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem',
            background: 'linear-gradient(135deg, rgba(110,231,183,0.08), rgba(147,197,253,0.08))',
            border: '1px solid rgba(110,231,183,0.15)',
          }}>
            <Link href="/karma-journey" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Welcome back, <strong style={{ color: '#6ee7b7' }}>{karmaProfile.archetype}</strong> {karmaProfile.emoji}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                — {karmaProfile.totalLives} {karmaProfile.totalLives === 1 ? 'life' : 'lives'} lived, {Math.round(karmaProfile.coopRate * 100)}% cooperative.
                Continue your journey →
              </span>
            </Link>
          </div>
        )}
        <Link href="/society-simulator" className="btn-primary">
          Launch Society Simulator →
        </Link>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          Watch 12 agents form alliances, betray each other, and self-organize
        </p>
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            <Link href="/karma-journey" style={{ color: 'var(--color-sky)' }}>Karma Journey</Link> — make choices that shape your trust across multiple lives
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            <Link href="/playground" style={{ color: 'var(--color-sky)' }}>Playground</Link> — tweak energy costs, trust thresholds, and see what happens
          </p>
        </div>
      </section>

      {/* Featured Moment - Dynamic carousel from simulations */}
      <FeaturedMoment rotate rotationInterval={15000} rotationCount={6} />

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
          <Link href="/playground" className="btn-secondary">
            Try the Playground
          </Link>
          <Link href="/act-explorer" className="btn-secondary">
            AI Guide Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
