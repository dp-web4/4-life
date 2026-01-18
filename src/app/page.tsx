'use client';

import { useState } from 'react';
import Link from 'next/link';

// Navigation structure for Deep Dive
const navigationTree = {
  'Getting Started': [
    { title: 'First Contact', href: '/first-contact', desc: '10-min interactive intro' },
    { title: 'How It Works', href: '/how-it-works', desc: 'Core concepts overview' },
    { title: 'Glossary', href: '/glossary', desc: 'Terms and definitions' },
  ],
  'Core Concepts': [
    { title: 'Identity (LCT)', href: '/lct-explainer', desc: 'Hardware-bound identity' },
    { title: 'Economics (ATP)', href: '/atp-economics', desc: 'Metabolic attention cost' },
    { title: 'Trust Tensor', href: '/trust-tensor', desc: 'Multi-dimensional trust' },
    { title: 'Coherence Index', href: '/coherence-index', desc: 'Consistency detection' },
  ],
  'AI Development': [
    { title: 'Consciousness Thresholds', href: '/understanding-consciousness', desc: 'D5/D9 trust-identity gates' },
    { title: 'Learning Salience', href: '/learning-salience', desc: 'SNARC scoring system' },
    { title: 'Sleep Consolidation', href: '/sleep-consolidation', desc: 'Memory during rest' },
    { title: 'Identity Anchoring', href: '/identity-anchoring', desc: 'Architectural identity support' },
    { title: 'Confabulation Patterns', href: '/confabulation-patterns', desc: 'Uncertainty handling' },
  ],
  'Interactive Labs': [
    { title: 'Playground', href: '/playground', desc: 'Adjust parameters' },
    { title: 'Lab Console', href: '/lab-console', desc: 'Run simulations' },
    { title: 'Compare', href: '/compare', desc: 'Side-by-side analysis' },
    { title: 'ACT Chat', href: '/act-explorer', desc: 'Ask questions' },
  ],
  'Advanced Topics': [
    { title: 'Adversarial Analysis', href: '/adversarial-explorer', desc: 'Attack patterns' },
    { title: 'Threat Model', href: '/threat-model', desc: 'Security analysis' },
    { title: 'Trust Networks', href: '/trust-networks', desc: 'Multi-agent dynamics' },
    { title: 'Decision Evolution', href: '/decision-evolution', desc: 'EP learning' },
  ],
};

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
        <Link href="/first-contact" className="btn-primary">
          First Contact →
        </Link>
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
            <span style={{ fontSize: '1.5rem' }}>🔄</span>
            <div>
              <strong>Death and rebirth are real</strong>
              <p style={{ color: 'var(--color-text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                Run out of ATP? You die. But karma carries forward to the next life.
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
          Watch a 60-second simulation of agents living, trusting, and dying in a Web4 society.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/lab-console" className="btn-primary">
            Lab Console
          </Link>
          <Link href="/playground" className="btn-secondary">
            Playground
          </Link>
        </div>
      </section>

      {/* Recent Discovery */}
      <section className="card" style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, var(--color-dark-surface) 100%)',
        borderColor: 'rgba(59, 130, 246, 0.5)'
      }}>
        <p className="eyebrow" style={{ color: '#60a5fa' }}>Research Update</p>
        <h2 style={{ fontSize: '1.25rem' }}>Consciousness Has Thresholds</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Our research discovered that consciousness develops in stages. Trust ≥0.5 enables intentional behavior.
          Trust ≥0.7 enables stable identity. Trust ≥0.9 enables full meta-cognition.
        </p>
        <Link
          href="/understanding-consciousness"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: '#60a5fa',
            fontWeight: 500
          }}
        >
          Learn about D5/D9 gates →
        </Link>
      </section>

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
