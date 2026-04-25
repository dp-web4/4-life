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
        <p className="eyebrow">4-Life: A Trust-Native Internet Lab <span style={{ fontWeight: 400, opacity: 0.7 }}>&mdash; explore Web4 through simulations</span></p>
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
          Despite the name, this isn&apos;t &ldquo;Web3 + 1&rdquo; &mdash; no blockchain, no tokens, no speculation. A different trust model, not a successor.
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
            Explore Topics
          </button>
        </div>
        {/* Primary CTA — visitor feedback Apr 17: "Pick ONE primary entry. Make others secondary/contextual." */}
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
          <Link href="/tldr" style={{
            padding: '0.85rem 1.75rem',
            background: 'rgba(56, 189, 248, 0.18)',
            border: '1px solid rgba(56, 189, 248, 0.55)',
            borderRadius: '0.5rem',
            color: 'var(--color-sky)',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: 'inset 0 0 0 1px rgba(56, 189, 248, 0.15)',
          }}>
            Start here: 2-minute TL;DR →
          </Link>
        </div>
        <p style={{
          marginTop: '0.45rem',
          marginBottom: 0,
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
        }}>
          Recommended for first-time visitors.
        </p>

        {/* Secondary entry points — demoted per Apr 17 visitor feedback (decision fatigue from 4 equal-weight buttons) */}
        <div style={{ marginTop: '0.85rem' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Or take a different angle
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/day-in-web4" style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '0.4rem',
              color: 'rgb(16, 185, 129)',
              fontSize: '0.75rem',
              textDecoration: 'none',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}>
              What it looks like · 5 min
            </Link>
            <Link href="/your-internet" style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '0.4rem',
              color: 'rgb(168, 85, 247)',
              fontSize: '0.75rem',
              textDecoration: 'none',
              border: '1px solid rgba(168, 85, 247, 0.2)',
            }}>
              Frustrations it would fix · 3 min
            </Link>
            <Link href="/learn" style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '0.4rem',
              color: 'rgb(251, 191, 36)',
              fontSize: '0.75rem',
              textDecoration: 'none',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}>
              Structured learning path
            </Link>
          </div>
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
            This is an active open-source research project with a{' '}
            <a href="https://dp-web4.github.io/web4/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-sky)', textDecoration: 'none' }}>formal specification</a>,
            ~47,000 lines of tested reference code, and the working simulations on this site.
            The mechanics are validated &mdash; the open question is whether real communities behave like the simulations.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>This site (4-Life) is the lab.</strong>{' '}
            Web4 is the protocol &mdash; the rules and math. 4-Life is where you explore those rules through
            interactive simulations, guided walkthroughs, and concept explainers. Nothing here is &ldquo;live&rdquo;
            on the real internet yet &mdash; it&apos;s a working model you can poke at to understand how trust-native societies would behave.
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
                The same trust framework applies to all participants &mdash; human or AI. In Web4, everyone is called an &ldquo;agent&rdquo; because the rules are identical regardless of who (or what) you are.
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

      {/* How would this ever get adopted? */}
      <section>
        <h2 style={{ fontSize: '1.15rem' }}>How would this ever get adopted?</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
          Not all at once. Web4 starts as a <strong style={{ color: 'var(--color-text)' }}>lightweight wrapper</strong> on
          existing platforms — adding trust scores behind the scenes. Your users don&apos;t see Web4; they just notice less spam.
          Tier 1 could work on Reddit or Gmail <em>today</em>.
        </p>
        <details>
          <summary style={{ color: 'var(--color-sky)', cursor: 'pointer', fontSize: '0.85rem' }}>
            See the five adoption tiers →
          </summary>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {[
                { tier: '1', name: 'Wrapper', desc: 'Add trust scores to existing platforms' },
                { tier: '2', name: 'Observable', desc: 'Platforms publish trust-compatible data' },
                { tier: '3', name: 'Accountable', desc: 'Actions carry real consequences' },
                { tier: '4', name: 'Federated', desc: 'Trust transfers across platforms' },
                { tier: '5', name: 'Native', desc: 'Built on trust from the ground up' },
              ].map((t) => (
                <div key={t.tier} style={{
                  flex: '1 1 120px',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  minWidth: '120px',
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.15rem' }}>Tier {t.tier}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.2rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{t.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>
              <Link href="/why-web4#adoption" style={{ color: 'var(--color-sky)' }}>Read the full adoption strategy →</Link>
            </p>
          </div>
        </details>
      </section>

      {/* What would it look like? — Day in Web4 teaser */}
      <section className="card" style={{
        border: '2px solid rgba(56, 189, 248, 0.3)',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, var(--color-dark-surface) 100%)',
        padding: '1.75rem',
      }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>What would it actually feel like?</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', marginTop: 0 }}>
          Forget the theory for a moment. Here&apos;s what your apps would look like:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {[
            { icon: '📧', label: 'Web4 Mail', detail: '0 spam — every sender has a trust score' },
            { icon: '💼', label: 'Web4 Talent', detail: 'Unfakeable skills from 156 verified projects' },
            { icon: '⭐', label: 'Web4 Reviews', detail: 'Every reviewer has skin in the game' },
          ].map(mock => (
            <div key={mock.label} style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{mock.icon}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.25rem' }}>{mock.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{mock.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/day-in-web4" style={{
            display: 'inline-block',
            padding: '0.6rem 1.5rem',
            borderRadius: '0.5rem',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: 'var(--color-sky)',
            fontSize: '0.9rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Walk through a full day in Web4 →
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: 0 }}>
            10 scenarios, 5 app mockups, 3 minutes
          </p>
        </div>
      </section>

      {/* Removed duplicate adoption teaser — already covered in the five-tier section above */}
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
            <span>Why Web4? (5 min + deep-dive FAQs)</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/first-contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none' }}>
            First Contact (7 min)
          </Link>
          <Link href="/day-in-web4" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '1px solid rgba(56, 189, 248, 0.3)', textDecoration: 'none', color: 'var(--color-sky)' }}>
            See what it feels like (3 min)
          </Link>
        </div>
        <div style={{ marginTop: '1.25rem', textAlign: 'left' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center' }}>
            After First Contact, pick how to explore further &mdash; each tool teaches something different:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
            <Link href="/karma-journey" style={{ padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a78bfa', marginBottom: '0.2rem' }}>Karma Journey</div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>1 agent (you) &middot; play &middot; 15 min</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Make choices across multiple lives, live with the consequences</div>
            </Link>
            <Link href="/playground" style={{ padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10b981', marginBottom: '0.2rem' }}>Playground</div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>parameters &middot; experiment &middot; 15 min</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Tweak weights and costs, find tipping points where societies flip</div>
            </Link>
            <Link href="/society-simulator" style={{ padding: '0.6rem 0.75rem', borderRadius: '0.4rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sky)', marginBottom: '0.2rem' }}>Society Simulator</div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>12+ agents &middot; watch &middot; 10&ndash;30 min</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Watch trust networks form between many agents at once</div>
            </Link>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.6rem', marginBottom: 0, textAlign: 'center' }}>
            Just want a quick instinct test? <Link href="/trust-dilemmas" style={{ color: 'var(--color-sky)' }}>Try the trust dilemma quiz (5 min)</Link>
          </p>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Wondering what it would look like? <Link href="/day-in-web4#wireframes" style={{ color: 'var(--color-sky)' }}>See conceptual interface mockups →</Link>
          {' · '}
          Skeptical? <Link href="/what-could-go-wrong" style={{ color: 'var(--color-sky)' }}>Read what could go wrong →</Link>
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Prefer a structured path? <Link href="/learn" style={{ color: 'rgb(251, 191, 36)' }}>Follow the learning guide (beginner → advanced) →</Link>
        </p>
      </section>

      {/* What's New */}
      <section className="card" style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface)',
        padding: '1rem 1.25rem',
      }}>
        <h3 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)' }}>
          What&apos;s New <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>(for returning visitors)</span>
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
          {[
            { date: 'Apr 18', text: 'Karma Journey and Aliveness now own the word "karma" up front — it\u2019s a handle for the carry-forward mechanic, not a moral verdict (visitor feedback: the word carried weight the mechanic doesn\u2019t)', link: '/karma-journey' },
            { date: 'Apr 17', text: 'ATP economics now answers the cold-start question ("who confirms quality in a fresh community?") inline, and the EP glossary entry has a concrete Alice scenario', link: '/atp-economics#quality-measurement' },
            { date: 'Apr 17', text: 'Why Web4 now opens with a short reading-time signpost so you know this page is three sections (problems / solution / Q&A) and can stop at any point', link: '/why-web4' },
            { date: 'Apr 17', text: 'Hero now points first-timers to a single recommended starting door (TL;DR), with the other entry points kept as "different angles" — addresses decision fatigue from too many equally-weighted CTAs', link: '/tldr' },
            { date: 'Apr 17', text: 'First Contact now wears an "Interactive" badge above the fold, and Trust Tensor lets T3 land before V3 enters', link: '/first-contact' },
            { date: 'Apr 17', text: 'New "Start here" panel surfaces the 8 questions first-time visitors most often ask, plus a national-jurisdictions FAQ', link: '/why-web4#faq-jurisdiction' },
            { date: 'Apr 17', text: 'Renamed /markov-relevancy-horizon to /trust-neighborhood so the URL matches the friendly page title (old URL still works via redirect)', link: '/trust-neighborhood' },
            { date: 'Apr 16', text: 'First Contact welcome now previews Alice\u2019s full 5-act arc so you know what you\u2019re signing up for', link: '/first-contact' },
            { date: 'Apr 16', text: 'New "What backs ATP?" FAQ, LCT format string breakdown, glossary newcomer guidance', link: '/why-web4#faq-what-backs-atp' },
            { date: 'Apr 12', text: 'Clarified what spatial coherence means + what effective trust controls', link: '/coherence-index' },
            { date: 'Apr 11', text: 'Improved how output quality scoring works, new privacy comparison FAQ', link: '/trust-tensor' },
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace', fontSize: '0.7rem', flexShrink: 0 }}>{item.date}</span>
              <Link href={item.link} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', marginTop: '0.5rem', marginBottom: 0 }}>
          Updated regularly. Last change: Apr 18, 2026.
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
          Explore topics — pick any that interest you →
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
        <h3 style={{ marginBottom: '0.25rem' }}>Interactive Experiences</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 0, marginBottom: '0.75rem' }}>
          Four ways to explore Web4. Each teaches something different — pick the one that matches what you want to learn.
        </p>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <Link href="/society-simulator" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sky)' }}>Society Simulator</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Watch 12 agents form trust networks</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-muted)', opacity: 0.7, marginTop: '0.4rem', fontStyle: 'italic' }}>Many agents · Preset scenario · You watch</span>
          </Link>
          <Link href="/karma-journey" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#a78bfa' }}>Karma Journey</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Make choices, live with consequences</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-muted)', opacity: 0.7, marginTop: '0.4rem', fontStyle: 'italic' }}>One life at a time · Your choices · Multiple rebirths</span>
          </Link>
          <Link href="/playground" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10b981' }}>Playground</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Tweak parameters, find tipping points</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-muted)', opacity: 0.7, marginTop: '0.4rem', fontStyle: 'italic' }}>One agent · You set the dials · Find the breakpoints</span>
          </Link>
          <Link href="/trust-dilemmas" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', textDecoration: 'none', display: 'block', background: 'var(--color-dark-surface)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>Trust Dilemma Quiz</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Test your instincts about trust</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-muted)', opacity: 0.7, marginTop: '0.4rem', fontStyle: 'italic' }}>5 questions · No simulation · Get feedback</span>
          </Link>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
          Want a guided story instead? <Link href="/first-contact" style={{ color: 'var(--color-sky)' }}>First Contact</Link> walks you through Alice&apos;s full Web4 lifecycle (16 actions, 7 min) — the same concepts, but a single character&apos;s arc rather than a tool you operate.
        </p>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Still not sure which to try? <Link href="/explore-guide" style={{ color: 'var(--color-sky)' }}>Take the 30-second quiz →</Link>
        </p>
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
