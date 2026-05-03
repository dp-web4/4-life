'use client';

/**
 * Your Internet — Personalized "What Would Change For You?" scenario
 *
 * This page bridges the "recommend: maybe" gap. The visitor feedback showed
 * people understand the concepts but don't feel personal stakes. This page
 * asks about THEIR internet frustrations and shows how Web4 would specifically
 * address each one.
 *
 * Design: 3 questions → personalized result screen → share button
 * Target: < 2 minutes to complete
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';
import { saveYourInternetResult, trackPageVisit } from '@/lib/exploration';

// ============================================================================
// Types
// ============================================================================

interface Frustration {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface ScenarioResult {
  frustration: string;
  today: string;
  withWeb4: string;
  scenario: string;
  mechanism: string;
  learnMore: string;
  learnMoreLabel: string;
}

// ============================================================================
// Data
// ============================================================================

const FRUSTRATIONS: Frustration[] = [
  {
    id: 'spam',
    label: 'Spam & fake accounts',
    icon: '🤖',
    description: 'Bots, scams, fake followers, comment spam',
  },
  {
    id: 'reputation',
    label: 'Reputation doesn\'t travel',
    icon: '🔒',
    description: 'My years of good behavior on one platform mean nothing elsewhere',
  },
  {
    id: 'ai-content',
    label: 'AI-generated deception',
    icon: '🎭',
    description: 'Can\'t tell what\'s human-written vs AI-generated',
  },
  {
    id: 'platform-power',
    label: 'Platforms have too much power',
    icon: '🏢',
    description: 'Arbitrary bans, algorithm changes, data harvesting',
  },
  {
    id: 'fake-reviews',
    label: 'Fake reviews & ratings',
    icon: '⭐',
    description: 'Can\'t trust product reviews, restaurant ratings, app store scores',
  },
  {
    id: 'accountability',
    label: 'No accountability for bad actors',
    icon: '🚪',
    description: 'Trolls get banned, make a new account, and do it again',
  },
  {
    id: 'surveillance',
    label: 'Constant surveillance & data harvesting',
    icon: '👁️',
    description: 'Every click tracked, sold to advertisers, used to manipulate behavior',
  },
];

const SCENARIOS: Record<string, ScenarioResult> = {
  spam: {
    frustration: 'Spam & fake accounts',
    today: 'Creating an account costs nothing. A spammer can create 10,000 accounts in an hour. Platforms play whack-a-mole with detection, but attackers just adapt.',
    withWeb4: 'Every account requires a physical device with a security chip. Creating 10,000 fake accounts means buying 10,000 devices — at $50–500 each, that\'s $500K–$5M in hardware. Spam isn\'t impossible, just economically irrational.',
    scenario: 'You post a question on a forum. Every reply cost its author real energy to write — no bot-generated noise. The three answers you get are from people who chose to spend their limited budget helping you.',
    mechanism: 'Hardware-bound identity (LCT) + energy costs (ATP) make spam more expensive than the return it generates.',
    learnMore: '/atp-economics',
    learnMoreLabel: 'How ATP Economics kills spam',
  },
  reputation: {
    frustration: 'Reputation doesn\'t travel',
    today: 'You build a 5-star reputation on Airbnb, but it means nothing on Uber. Your 10-year Stack Overflow credibility doesn\'t help on a new coding platform. Every platform is an island.',
    withWeb4: 'Your trust score is portable because it\'s attached to YOU, not to an account on a platform. When you join a new community, your track record comes with you — scoped by relevance (your coding trust doesn\'t claim cooking expertise).',
    scenario: 'You join a new freelance platform. Instead of starting at zero, clients can see you have 4 years of verified "web development" trust from your previous work — but your "graphic design" score starts fresh, because it should.',
    mechanism: 'Trust Tensors (T3) are multi-dimensional and role-specific. Your trust in "data analysis" travels to any context where data analysis matters.',
    learnMore: '/trust-tensor',
    learnMoreLabel: 'How multi-dimensional trust works',
  },
  'ai-content': {
    frustration: 'AI-generated deception',
    today: 'AI can generate text, images, and video indistinguishable from human-created content. There\'s no reliable way to know if a review, comment, or article was written by a person or a language model.',
    withWeb4: 'Every action is tied to a hardware-verified identity and costs energy. An AI can participate openly — but it plays by the same rules as humans. Its trust is earned through consistent, quality contributions, not manufactured.',
    scenario: 'You read a product review. The author\'s behavioral consistency score is 0.92 — their review history shows genuine purchase patterns over 2 years. An AI-generated review farm would show erratic patterns and low consistency.',
    mechanism: 'LCT binds actions to verified entities. ATP makes bulk content generation expensive. The system doesn\'t ban AI — it makes ALL participants earn trust through behavior.',
    learnMore: '/aliveness',
    learnMoreLabel: 'How agents earn the right to participate',
  },
  'platform-power': {
    frustration: 'Platforms have too much power',
    today: 'One company can ban you, delete your content, change the algorithm, sell your data, or shut down entirely — taking your network and reputation with them.',
    withWeb4: 'Trust infrastructure is federated — no single company controls it. Your identity, reputation, and connections exist independently of any platform. Getting banned from one community doesn\'t erase your existence.',
    scenario: 'Your favorite social network shuts down. You lose nothing — your identity, trust history, and connections move with you to a new platform in minutes, like switching email providers.',
    mechanism: 'Federated architecture + hardware-bound identity means your digital life isn\'t held hostage by any single service.',
    learnMore: '/lct-explainer',
    learnMoreLabel: 'How identity works without platforms',
  },
  'fake-reviews': {
    frustration: 'Fake reviews & ratings',
    today: 'Businesses buy fake 5-star reviews. Competitors post fake 1-star reviews. Review platforms try to detect fraud, but it\'s an arms race. You can\'t trust the numbers.',
    withWeb4: 'Every reviewer has a verifiable history and a consistency score. A reviewer who only reviews one business, or who suddenly posts 50 reviews in a day, gets flagged by coherence scoring. Fake reviews cost real energy with no return.',
    scenario: 'You\'re choosing a restaurant. Reviews are weighted by reviewer trust — a local food blogger with 3 years of consistent reviews carries more weight than 50 anonymous 5-star ratings posted the same day.',
    mechanism: 'Coherence Index detects behavioral anomalies. ATP makes each review cost energy. Trust scores mean a review from a trusted reviewer carries more weight.',
    learnMore: '/coherence-index',
    learnMoreLabel: 'How consistency scoring catches fakes',
  },
  accountability: {
    frustration: 'No accountability for bad actors',
    today: 'A troll gets banned, creates a new account in 30 seconds, and resumes. A scammer gets caught, moves to another platform, starts over. There are no lasting consequences.',
    withWeb4: 'Bad behavior permanently damages your trust score. Creating a new identity means starting from scratch with a new device and zero reputation — not banned, just unproven. Your history follows you, and trust takes time to rebuild.',
    scenario: 'A scammer tries to start fresh. Their old identity\'s trust is ruined. Their new identity starts at zero — no one trusts an unknown entity with high-stakes transactions. Rebuilding trust takes months of genuine behavior.',
    mechanism: 'Trust history is permanent and tied to your device constellation. Even if you abandon an identity and start fresh on new hardware, you begin at zero — no reputation, no trust. The old record still exists for anyone who witnessed it.',
    learnMore: '/karma-journey',
    learnMoreLabel: 'Explore consequences in a trust simulation',
  },
  surveillance: {
    frustration: 'Constant surveillance & data harvesting',
    today: 'Every page you visit, every click, every purchase feeds a profile that ad networks sell to whoever pays. You can\'t opt out — your data is the product, whether you agree or not.',
    withWeb4: 'You can prove your trust score meets a threshold without revealing the score itself. "This person has high trust in this context" — verified, without exposing your history, devices, or behavior patterns. Platforms get the signal they need; you keep your data.',
    scenario: 'You apply for a loan. The bank verifies "this person has high financial trust" without seeing your purchase history, browsing habits, or social connections. You prove you\'re trustworthy without surrendering your privacy.',
    mechanism: 'Zero-knowledge trust proofs let you share credentials without sharing data. Decentralized identity means there\'s no central repository to harvest.',
    learnMore: '/lct-explainer',
    learnMoreLabel: 'How identity works without surveillance',
  },
};

// ============================================================================
// Component
// ============================================================================

export default function YourInternetPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const savedRef = useRef(false);

  useEffect(() => { trackPageVisit('your-internet'); }, []);

  // Persist selections when results are shown
  useEffect(() => {
    if (showResults && selected.length > 0 && !savedRef.current) {
      savedRef.current = true;
      saveYourInternetResult(selected);
    }
  }, [showResults, selected]);

  const toggleFrustration = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleShare = async () => {
    const frustrationNames = selected.map(id => SCENARIOS[id]?.frustration).join(', ');
    const text = `My biggest internet frustrations: ${frustrationNames}. Found this site that shows how a trust-native internet could fix them — with honest assessments of what's unsolved.`;
    const url = 'https://4-life-ivory.vercel.app/your-internet';

    if (navigator.share) {
      try {
        await navigator.share({ title: 'What Would Web4 Change For You?', text, url });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Copied to clipboard!');
    }
  };

  if (showResults && selected.length > 0) {
    return (
      <>
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs currentPath="/your-internet" />
        </div>

        <section className="max-w-3xl mx-auto">
          <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
            Your Results
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-100">
            What Would Change For You
          </h1>
          <p className="text-gray-400 mb-8">
            Based on your {selected.length} frustration{selected.length > 1 ? 's' : ''}, here&apos;s how
            trust-native infrastructure would specifically address each one.
          </p>

          <div className="space-y-8">
            {selected.map(id => {
              const scenario = SCENARIOS[id];
              if (!scenario) return null;
              return (
                <div key={id} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-amber-400">
                      {scenario.frustration}
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-red-400 mb-2">Today</h3>
                      <p className="text-gray-300 leading-relaxed">{scenario.today}</p>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-green-400 mb-2">With Trust-Native Infrastructure</h3>
                      <p className="text-gray-300 leading-relaxed">{scenario.withWeb4}</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                      <h3 className="text-sm uppercase tracking-wide text-purple-400 mb-2">Picture This</h3>
                      <p className="text-gray-300 leading-relaxed text-sm italic">{scenario.scenario}</p>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <p className="text-gray-500 text-sm">
                        <strong className="text-gray-400">How:</strong> {scenario.mechanism}
                      </p>
                      <Link href={scenario.learnMore} className="text-sky-400 text-sm hover:underline mt-1 inline-block">
                        {scenario.learnMoreLabel} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Honesty callout */}
          <div className="mt-8 bg-amber-950/20 border border-amber-800/30 rounded-lg p-4">
            <p className="text-gray-400 text-sm leading-relaxed">
              <strong className="text-amber-400">Honest note:</strong> These scenarios describe
              how Web4 is <em>designed</em> to work, based on simulations. The system is theoretical
              research, not deployed software. Want to know what could go wrong?{' '}
              <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">
                Read the failure analysis
              </Link>.
            </p>
          </div>

          {/* Next Steps — context-aware based on selected frustrations */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Go Deeper</h3>

            {/* Primary CTA: most relevant concept page based on first frustration */}
            {selected.length > 0 && SCENARIOS[selected[0]] && (
              <Link
                href={SCENARIOS[selected[0]].learnMore}
                className="block mb-3 px-5 py-3 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-colors text-center text-sm"
              >
                {SCENARIOS[selected[0]].learnMoreLabel} &rarr;
              </Link>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <Link
                href="/day-in-web4"
                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-500 text-white rounded-lg transition-colors text-center text-sm"
              >
                A Day in Web4
              </Link>
              <Link
                href="/karma-journey"
                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-sky-500 text-white rounded-lg transition-colors text-center text-sm"
              >
                Make your own choices
              </Link>
              <button
                onClick={handleShare}
                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-colors text-center text-sm"
              >
                Share results
              </button>
            </div>
          </div>

          {/* Try again */}
          <div className="mt-4 text-center">
            <button
              onClick={() => { setShowResults(false); setSelected([]); }}
              className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
            >
              &larr; Choose different frustrations
            </button>
          </div>
        </section>
        <RelatedConcepts currentPath="/your-internet" />
        <ExplorerNav currentPath="/your-internet" />
      </>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs currentPath="/your-internet" />
      </div>

      <noscript>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#38bdf8' }}>What Would Web4 Change For You?</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem' }}>
            Seven internet frustrations you already know &mdash; and how trust-native infrastructure would address each one.
          </p>

          {Object.entries(SCENARIOS).map(([id, s]) => (
            <div key={id} style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '12px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div style={{ background: '#0f172a', padding: '0.75rem 1.5rem', borderBottom: '1px solid #475569' }}>
                <p style={{ color: '#f59e0b', fontWeight: 'bold', margin: 0 }}>{s.frustration}</p>
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#ef4444' }}>Today:</strong> {s.today}
                </p>
                <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                  <strong style={{ color: '#10b981' }}>With Web4:</strong> {s.withWeb4}
                </p>
                <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '0.75rem', padding: '0.75rem', background: '#0f172a', borderRadius: '6px' }}>
                  {s.scenario}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                  <strong style={{ color: '#94a3b8' }}>How:</strong> {s.mechanism}{' '}
                  <a href={s.learnMore} style={{ color: '#38bdf8' }}>{s.learnMoreLabel} &rarr;</a>
                </p>
              </div>
            </div>
          ))}

          <div style={{ background: '#451a03', border: '1px solid #92400e', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#f59e0b' }}>Honest note:</strong> These scenarios describe how Web4 is <em>designed</em> to work, based on simulations. The system is theoretical research, not deployed software.{' '}
              <a href="/what-could-go-wrong" style={{ color: '#38bdf8' }}>Read the failure analysis</a>.
            </p>
          </div>

          <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center' }}>
            <a href="/tldr" style={{ color: '#38bdf8' }}>2-minute overview</a> ·{' '}
            <a href="/day-in-web4" style={{ color: '#38bdf8' }}>A Day in Web4</a> ·{' '}
            <a href="/why-web4" style={{ color: '#38bdf8' }}>Why Web4</a>
          </p>
        </div>
      </noscript>

      <section className="max-w-3xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          1-Minute Exercise
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-green-400 bg-clip-text text-transparent">
          What Frustrates You About the Internet?
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-2">
          Pick up to 3 frustrations. We&apos;ll show you exactly how trust-native
          infrastructure would address each one &mdash; and what&apos;s still unsolved.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          No signup. No tracking. Just honest answers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {FRUSTRATIONS.map(f => {
            const isSelected = selected.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggleFrustration(f.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-950/30'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <div className={`font-semibold ${isSelected ? 'text-sky-400' : 'text-gray-200'}`}>
                      {f.label}
                    </div>
                    <div className="text-gray-500 text-sm mt-0.5">{f.description}</div>
                  </div>
                </div>
                {isSelected && (
                  <div className="text-sky-400 text-xs mt-2 text-right">Selected</div>
                )}
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowResults(true)}
              className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Show me what would change ({selected.length} selected)
            </button>
          </div>
        )}

        {selected.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            Select at least one frustration to continue
          </p>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          Already know Web4?{' '}
          <Link href="/society-simulator" className="text-sky-400 hover:underline">Skip to the Society Simulator</Link>
          {' · '}
          <Link href="/tldr" className="text-sky-400 hover:underline">Read the 2-minute overview</Link>
        </div>
      </section>
      <RelatedConcepts currentPath="/your-internet" />
      <ExplorerNav currentPath="/your-internet" />
    </>
  );
}
