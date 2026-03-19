'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { navigationTree } from '@/lib/navigation';
import FeaturedMoment, { FeaturedMomentCompact } from '@/components/FeaturedMoment';
import EcosystemStats from '@/components/EcosystemStats';
import TermTooltip from '@/components/TermTooltip';
import type { MomentCategory } from '@/lib/moments/types';
import { loadExploration, trackPageVisit, type ExplorationProfile } from '@/lib/exploration';

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
          <strong>Web4</strong> is a proposed framework where trust is built into the internet itself, not bolted on after the fact &mdash; that&apos;s what &quot;trust-native&quot; means.
          Identity costs something, every action costs energy,
          and consequences follow you forever.
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
            Browse Topic Library
          </button>
        </div>
        <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <Link href="/tldr" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '0.5rem',
            color: 'var(--color-sky)',
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}>
            Just 2 minutes? Read the TL;DR →
          </Link>
          <Link href="/your-internet" style={{
            padding: '0.5rem 1rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '0.5rem',
            color: 'rgb(168, 85, 247)',
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}>
            How would this change my internet? →
          </Link>
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
  useEffect(() => {
    trackPageVisit('home');
  }, []);

  return (
    <div className="space-y-12" style={{ maxWidth: '48rem', margin: '0 auto' }}>

      {/* What Is This, Really? */}
      <section className="card" style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
        padding: '1.5rem 1.75rem',
      }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>What is this, really?</h2>
        <div style={{ display: 'grid', gap: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>Web4 is a research proposal</strong> for
            making trust work on the internet. Not a product, not a company, not a blockchain.
            It&apos;s a set of ideas about what would happen if identity cost something,
            actions had consequences, and your reputation followed you everywhere.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>Right now, you can&apos;t install it.</strong>{' '}
            This is an active open-source research project. We&apos;re building the theory, running
            simulations, and testing whether these ideas actually work. This site lets you
            explore the concepts and see the results.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>Nobody profits from this yet.</strong>{' '}
            The bet is that trust infrastructure for the internet will eventually be as
            fundamental as HTTPS. If these ideas hold up, they&apos;ll need to be
            open standards &mdash; not owned by anyone.
          </p>
        </div>
      </section>

      {/* The Big Idea */}
      <section>
        <h2>How would it work?</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Web4 proposes a trust-native internet built on four rules:
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
              <strong>Identity is anchored in your devices</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Your phone, laptop, and tablet each carry a security chip. Linked together through Linked Context Tokens (LCTs), they form a constellation that <em>is</em> your identity. More devices = stronger identity. Can&apos;t be cheaply faked.
              </p>
            </div>
          </li>
          <li className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <div>
              <strong>Every action costs energy</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Every action costs energy from a personal budget called <TermTooltip term="ATP">ATP (Allocation Transfer Packets)</TermTooltip>. Quality earns it back. Spam burns through it with no return.
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
              <strong>AI and humans play by the same rules</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                The same trust framework applies to all agents &mdash; human or AI. No special categories.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* What would change for me? */}
      <section>
        <h2>What would change for you?</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.25rem' }}>📧</span>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Spam disappears</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
                Creating accounts costs real resources. Mass-creating fake accounts
                becomes economically irrational. Comment sections become usable again.
              </p>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.25rem' }}>⭐</span>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Your reputation travels with you</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
                Years of good behavior on one platform count everywhere.
                Switch services without starting from zero.
              </p>
            </div>
          </div>
          <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.25rem' }}>🤝</span>
            <div>
              <strong style={{ fontSize: '0.95rem' }}>You can trust AI agents</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
                AI acting on your behalf carries verifiable identity and trust history.
                You can tell which AI agents have earned trust and which haven&apos;t.
              </p>
            </div>
          </div>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
          Want the full picture? <Link href="/your-internet" style={{ color: 'var(--color-sky)' }}>See how Web4 would change your specific internet frustrations</Link>
        </p>
      </section>

      {/* Where to start */}
      <section className="card card-highlight" style={{
        textAlign: 'center',
        border: '2px solid var(--color-emerald)',
        background: 'linear-gradient(135deg, var(--color-emerald-surface) 0%, var(--color-bg-secondary) 100%)'
      }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Go deeper</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '32rem', margin: '0 auto 1.5rem' }}>
          Pick your path based on how much time you have:
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/tldr" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none' }}>
            2-minute overview
          </Link>
          <Link href="/why-web4" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Why Web4? (5 min)</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/first-contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none' }}>
            First Contact (7 min)
          </Link>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
          Want to play? <Link href="/trust-dilemmas" style={{ color: 'var(--color-sky)' }}>Try the trust dilemma quiz</Link>
          {' · '}
          <Link href="/society-simulator" style={{ color: 'var(--color-sky)' }}>Launch a society simulation</Link>
          {' · '}
          <Link href="/playground" style={{ color: 'var(--color-sky)' }}>Experiment in the playground</Link>
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Wondering what it would look like? <Link href="/day-in-web4#wireframes" style={{ color: 'var(--color-sky)' }}>See conceptual interface mockups →</Link>
          {' · '}
          Skeptical? <Link href="/what-could-go-wrong" style={{ color: 'var(--color-sky)' }}>Read what could go wrong →</Link>
        </p>
      </section>

      {/* CTA to Deep Dive */}
      <section className="text-center" style={{ paddingTop: '1rem' }}>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Want to explore everything?
        </p>
        <button
          onClick={onSwitchToDeepDive}
          className="btn-secondary"
        >
          Browse the full topic library →
        </button>
      </section>
    </div>
  );
}

function DeepDiveTab() {
  const [karmaProfile, setKarmaProfile] = useState<{ archetype: string; emoji: string; totalLives: number; coopRate: number } | null>(null);
  const [exploration, setExploration] = useState<ExplorationProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('karma-journey-profile');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.archetype) setKarmaProfile(p);
      }
    } catch { /* ok */ }
    setExploration(loadExploration());
  }, []);

  return (
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      <p style={{
        color: 'var(--color-text-secondary)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Explore by category, or use the search in your browser (Ctrl/Cmd+F).
      </p>

      {/* Interactive experiences — moved here from intro tab */}
      <div className="card" style={{ marginBottom: '2rem', background: 'var(--color-dark-surface)' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Interactive Experiences</h3>
        {(karmaProfile || (exploration && exploration.pagesVisited.length > 2)) && (
          <div style={{
            padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem',
            background: 'linear-gradient(135deg, rgba(110,231,183,0.08), rgba(147,197,253,0.08))',
            border: '1px solid rgba(110,231,183,0.15)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
              Welcome back!
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {karmaProfile && (
                <Link href="/karma-journey" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    <strong style={{ color: '#6ee7b7' }}>{karmaProfile.archetype}</strong> {karmaProfile.emoji}
                    {' · '}{karmaProfile.totalLives} {karmaProfile.totalLives === 1 ? 'life' : 'lives'} lived
                    {' · '}{Math.round(karmaProfile.coopRate * 100)}% cooperative
                    {' · '}Continue →
                  </span>
                </Link>
              )}
              {exploration && exploration.conceptVisits.length > 0 && (() => {
                const totalExp = exploration.conceptVisits.reduce((s, v) => s + v.interactionCount, 0);
                const lastVisit = exploration.conceptVisits.sort(
                  (a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime()
                )[0];
                const conceptNames: Record<string, string> = {
                  'atp-economics': 'ATP Economics',
                  'trust-tensor': 'Trust Tensor',
                  'coherence-index': 'Coherence Index',
                  'aliveness': 'Aliveness',
                  'lct-explainer': 'LCT',
                };
                return (
                  <Link href={`/${lastVisit.slug}`} style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>
                      {totalExp} experiment{totalExp !== 1 ? 's' : ''} run
                      {' · '}Last explored: {conceptNames[lastVisit.slug] || lastVisit.slug}
                      {' · '}Continue →
                    </span>
                  </Link>
                );
              })()}
              {exploration?.dayInWeb4 && (
                <Link href="/day-in-web4" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    Day archetype: <strong style={{ color: '#fbbf24' }}>{exploration.dayInWeb4.archetype}</strong>
                    {' · '}{exploration.dayInWeb4.scenariosCompleted} scenarios
                    {' · '}Try a different approach →
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/trust-dilemmas" className="btn-primary" style={{ fontSize: '0.85rem' }}>
            Trust Dilemma Quiz
          </Link>
          <Link href="/society-simulator" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', fontSize: '0.85rem' }}>
            Society Simulator
          </Link>
          <Link href="/karma-journey" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', fontSize: '0.85rem' }}>
            Karma Journey (simulation)
          </Link>
          <Link href="/playground" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', fontSize: '0.85rem' }}>
            Playground
          </Link>
          <Link href="/day-in-web4" className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', fontSize: '0.85rem' }}>
            A Day in Web4
          </Link>
        </div>
      </div>

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
            First Contact (7 min)
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
