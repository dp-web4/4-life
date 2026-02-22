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
          <strong>Web4</strong> is a proposed protocol where trust is built into the internet itself, not bolted on after the fact.
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

interface DilemmaQuestion {
  question: string;
  pillar: string;
  options: { id: string; label: string; icon: string }[];
  feedback: Record<string, { text: string; web4: string }>;
}

const DILEMMA_QUESTIONS: DilemmaQuestion[] = [
  {
    question: 'Someone creates 10,000 fake accounts to spam your community. What do you do?',
    pillar: 'Energy',
    options: [
      { id: 'ban', label: 'Ban the spammer', icon: '🚫' },
      { id: 'captcha', label: 'Add more CAPTCHAs', icon: '🤖' },
      { id: 'cost', label: 'Make each action cost something', icon: '⚡' },
    ],
    feedback: {
      ban: {
        text: 'They make a new account in 30 seconds and do it again.',
        web4: 'Web4: every action costs energy (ATP). Spam burns through it with no return. Spammers die.',
      },
      captcha: {
        text: 'AI solves CAPTCHAs better than humans now. Arms race never ends.',
        web4: 'Web4: instead of proving you\'re human, prove you\'re consistent. Coherence is harder to fake.',
      },
      cost: {
        text: 'You\'re thinking like Web4.',
        web4: 'This IS the Web4 approach. Every action costs energy. Spam becomes economically irrational.',
      },
    },
  },
  {
    question: 'A troll gets banned. Five minutes later, they\'re back with a new account. How do you stop this?',
    pillar: 'Identity',
    options: [
      { id: 'ip', label: 'Block their IP address', icon: '🌐' },
      { id: 'phone', label: 'Require phone verification', icon: '📱' },
      { id: 'hardware', label: 'Tie identity to their device', icon: '🔗' },
    ],
    feedback: {
      ip: {
        text: 'VPNs cost $3/month. They switch IPs in seconds.',
        web4: 'Web4: identity is hardware-bound. Creating a new identity means buying a new device. Scale attacks require warehouses of phones.',
      },
      phone: {
        text: 'Burner SIMs cost $5. Phone farms exist. This slows trolls slightly but doesn\'t stop them.',
        web4: 'Web4: goes deeper than phone numbers — cryptographic keys in your device\'s security chip (TPM/Secure Enclave) prove it\'s really you.',
      },
      hardware: {
        text: 'You\'re thinking like Web4.',
        web4: 'Web4 ties identity to hardware security chips. No new account without a new physical device. Reputation follows the device.',
      },
    },
  },
  {
    question: 'A respected community member starts posting harmful content. What should happen to their 3-year reputation?',
    pillar: 'Consequences',
    options: [
      { id: 'delete', label: 'Delete their account entirely', icon: '🗑️' },
      { id: 'warning', label: 'Give them a warning', icon: '⚠️' },
      { id: 'permanent', label: 'Let the bad behavior damage their permanent record', icon: '📜' },
    ],
    feedback: {
      delete: {
        text: 'They start fresh with a new account. Three years of context erased. No lessons learned.',
        web4: 'Web4: reputation is permanent. Bad behavior costs trust. But good history isn\'t erased — it enables recovery if they change.',
      },
      warning: {
        text: 'Warnings without consequences teach people to push limits. Three warnings later, nothing changed.',
        web4: 'Web4: every action costs energy AND affects trust. Bad behavior is immediately expensive, not just warned against.',
      },
      permanent: {
        text: 'You\'re thinking like Web4.',
        web4: 'Web4: your track record is permanent. Bad behavior reduces trust. But a 3-year positive history provides resilience — one bad day doesn\'t erase years of contribution.',
      },
    },
  },
];

function TrustDilemma() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);

  const isComplete = step >= DILEMMA_QUESTIONS.length;
  const currentQuestion = !isComplete ? DILEMMA_QUESTIONS[step] : null;

  const handleAnswer = (answerId: string) => {
    setCurrentAnswer(answerId);
  };

  const handleNext = () => {
    if (currentAnswer) {
      setAnswers([...answers, currentAnswer]);
      setCurrentAnswer(null);
      setStep(step + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setCurrentAnswer(null);
  };

  const handleShare = async () => {
    const text = 'I just answered 3 questions about internet trust problems and saw how a trust-native protocol addresses each one. Try it yourself:';
    const url = 'https://4-life-ivory.vercel.app';
    if (navigator.share) {
      try { await navigator.share({ title: '3 Trust Dilemmas', text, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Copied to clipboard!');
    }
  };

  // Summary after all 3 questions
  if (isComplete) {
    return (
      <section className="card" style={{
        maxWidth: '48rem', margin: '0 auto',
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
      }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Three problems, one framework
        </p>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
          {DILEMMA_QUESTIONS.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.4rem', borderRadius: '0.25rem',
                background: 'rgba(56, 189, 248, 0.15)', color: 'var(--color-sky)', whiteSpace: 'nowrap',
              }}>
                {q.pillar}
              </span>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                {q.feedback[answers[i]].web4}
              </p>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--color-sky)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Energy + Identity + Consequences = a self-regulating internet. No moderators needed.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={handleShare}
            style={{
              color: 'var(--color-sky)', fontSize: '0.8rem', background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '0.375rem',
              padding: '0.35rem 0.75rem', cursor: 'pointer',
            }}
          >
            Share this quiz
          </button>
          <button
            onClick={handleReset}
            style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  // Show current question or feedback
  if (currentAnswer) {
    const fb = currentQuestion!.feedback[currentAnswer];
    return (
      <section className="card" style={{
        maxWidth: '48rem', margin: '0 auto',
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
            {step + 1} of 3
          </span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.4rem', borderRadius: '0.25rem',
            background: 'rgba(56, 189, 248, 0.15)', color: 'var(--color-sky)',
          }}>
            {currentQuestion!.pillar}
          </span>
        </div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          {fb.text}
        </p>
        <p style={{ color: 'var(--color-sky)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          {fb.web4}
        </p>
        <button
          onClick={handleNext}
          className="btn-primary"
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
        >
          {step < 2 ? 'Next question →' : 'See the full picture →'}
        </button>
      </section>
    );
  }

  // Show question
  return (
    <section style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {DILEMMA_QUESTIONS.map((_, i) => (
          <div key={i} style={{
            width: '2rem', height: '3px', borderRadius: '2px',
            background: i < step ? 'var(--color-sky)' : i === step ? 'var(--color-text-secondary)' : 'var(--color-border)',
          }} />
        ))}
      </div>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
        <strong>{currentQuestion!.question}</strong>
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentQuestion!.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
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
          Imagine a day with trust built in: <Link href="/day-in-web4" style={{ color: 'var(--color-sky)' }}>A Day in Web4</Link>.
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
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            <Link href="/day-in-web4" style={{ color: 'var(--color-sky)' }}>A Day in Web4</Link> — walk through everyday scenarios with trust built in
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
