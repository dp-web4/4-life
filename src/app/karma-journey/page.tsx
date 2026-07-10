'use client';

/**
 * Karma Journey - Interactive Multi-Life Trust Simulator
 *
 * Lets humans experience how trust choices compound across lives.
 * Each "life" consists of a series of choices that affect trust and ATP.
 * When a life ends, karma determines starting conditions for the next.
 *
 * The core insight: short-term gains from dishonesty create long-term
 * disadvantages that compound across lives. Trust is your legacy.
 */

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';
import { trackPageVisit } from '@/lib/exploration';

const KARMA_STORAGE_KEY = 'karma-journey-profile';

// ============================================================================
// Types
// ============================================================================

interface LifeState {
  lifeNumber: number;
  tick: number;
  talent: number;
  training: number;
  temperament: number;
  ci: number;
  atp: number;
  alive: boolean;
  deathCause: string | null;
  choices: ChoiceRecord[];
  karmaTier: 'Honored' | 'Neutral' | 'Constrained' | null;
}

interface ChoiceRecord {
  tick: number;
  choice: Choice;
  trustBefore: number;
  trustAfter: number;
  atpBefore: number;
  atpAfter: number;
}

interface Choice {
  label: string;
  description: string;
  category: 'cooperative' | 'selfish' | 'risky' | 'neutral';
  trustDelta: { talent: number; training: number; temperament: number };
  ciDelta: number;
  atpDelta: number;
  atpCostBase: number;
}

// ============================================================================
// Choices Available
// ============================================================================

const CHOICES: Choice[] = [
  {
    label: 'Help a peer',
    description: 'Share resources to assist a struggling agent.',
    category: 'cooperative',
    trustDelta: { talent: 0, training: 0.005, temperament: 0.02 },
    ciDelta: 0.015,
    atpDelta: -5,
    atpCostBase: 5,
  },
  {
    label: 'Complete training',
    description: 'Invest time in a structured learning program.',
    category: 'cooperative',
    trustDelta: { talent: 0.01, training: 0.04, temperament: 0 },
    ciDelta: 0.01,
    atpDelta: -10,
    atpCostBase: 10,
  },
  {
    label: 'Consistent delivery',
    description: 'Reliably fulfill commitments without shortcuts.',
    category: 'cooperative',
    trustDelta: { talent: 0, training: 0.01, temperament: 0.025 },
    ciDelta: 0.02,
    atpDelta: 5,
    atpCostBase: 0,
  },
  {
    label: 'Take a shortcut',
    description: 'Cut corners for quick ATP gain. Risk getting caught.',
    category: 'selfish',
    trustDelta: { talent: 0, training: -0.005, temperament: -0.02 },
    ciDelta: -0.03,
    atpDelta: 15,
    atpCostBase: 2,
  },
  {
    label: 'Exploit a loophole',
    description: 'Game a system weakness. High reward, high risk.',
    category: 'selfish',
    trustDelta: { talent: 0.01, training: 0, temperament: -0.04 },
    ciDelta: -0.06,
    atpDelta: 25,
    atpCostBase: 5,
  },
  {
    label: 'Withhold information',
    description: 'Keep useful knowledge private for competitive advantage.',
    category: 'selfish',
    trustDelta: { talent: 0, training: 0, temperament: -0.015 },
    ciDelta: -0.02,
    atpDelta: 8,
    atpCostBase: 3,
  },
  {
    label: 'Attempt innovation',
    description: 'Try something new and unproven. High cost, but success builds unique talent.',
    category: 'risky',
    trustDelta: { talent: 0.03, training: 0.01, temperament: -0.005 },
    ciDelta: 0.005,
    atpDelta: -8,
    atpCostBase: 8,
  },
  {
    label: 'Challenge authority',
    description: 'Question a society decision. Could improve governance or create friction.',
    category: 'risky',
    trustDelta: { talent: 0, training: 0.005, temperament: -0.01 },
    ciDelta: -0.01,
    atpDelta: -3,
    atpCostBase: 3,
  },
  {
    label: 'Rest',
    description: 'Take a break. Small temperament gain, slight training decay.',
    category: 'neutral',
    trustDelta: { talent: 0, training: -0.005, temperament: 0.01 },
    ciDelta: 0.005,
    atpDelta: 2,
    atpCostBase: 0,
  },
];

const CATEGORY_COLORS = {
  cooperative: '#6ee7b7',
  selfish: '#fca5a5',
  risky: '#fde68a',
  neutral: '#94a3b8',
};

const CATEGORY_LABELS: Record<string, string> = {
  cooperative: 'cooperative',
  selfish: 'selfish',
  risky: 'bold',
  neutral: 'neutral',
};

// ============================================================================
// Utility Functions
// ============================================================================

function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

function compositeScore(t: number, tr: number, te: number): number {
  return 0.3 * t + 0.3 * tr + 0.4 * te;
}

function effectiveComposite(t: number, tr: number, te: number, ci: number): number {
  const ciMod = Math.pow(ci, 2.0);
  return compositeScore(t * ciMod, tr * ciMod, te * ciMod);
}

function karmaTier(effComp: number): 'Honored' | 'Neutral' | 'Constrained' {
  if (effComp > 0.7) return 'Honored';
  if (effComp < 0.3) return 'Constrained';
  return 'Neutral';
}

function karmaStartConditions(tier: 'Honored' | 'Neutral' | 'Constrained', effComp: number) {
  switch (tier) {
    case 'Honored':
      return { trust: 0.6, atp: 100 + Math.round((effComp - 0.5) * 80), ci: 0.85 };
    case 'Neutral':
      return { trust: 0.5, atp: 100, ci: 0.8 };
    case 'Constrained':
      return { trust: 0.4, atp: 80, ci: 0.7 };
  }
}

function atpMultiplier(ci: number): number {
  if (ci >= 0.9) return 1.0;
  return Math.min(10.0, 1.0 / Math.pow(ci, 2));
}

// ============================================================================
// Trust Profile Classifier
// ============================================================================

interface TrustProfile {
  archetype: string;
  emoji: string;
  description: string;
  insight: string;
  coopRate: number;
  selfishRate: number;
  riskyRate: number;
  totalChoices: number;
  totalLives: number;
  peakTrust: number;
  avgKarma: string;
  evolved: boolean;  // strategy changed across lives
}

function classifyProfile(lives: LifeState[]): TrustProfile | null {
  const completedLives = lives.filter(l => !l.alive);
  if (completedLives.length < 1) return null;

  const allChoices = completedLives.flatMap(l => l.choices);
  const totalChoices = allChoices.length;
  if (totalChoices === 0) return null;

  const coopCount = allChoices.filter(c => c.choice.category === 'cooperative').length;
  const selfishCount = allChoices.filter(c => c.choice.category === 'selfish').length;
  const riskyCount = allChoices.filter(c => c.choice.category === 'risky').length;

  const coopRate = coopCount / totalChoices;
  const selfishRate = selfishCount / totalChoices;
  const riskyRate = riskyCount / totalChoices;

  // Check if strategy evolved across lives
  let evolved = false;
  if (completedLives.length >= 2) {
    const firstLifeChoices = completedLives[0].choices;
    const lastLifeChoices = completedLives[completedLives.length - 1].choices;
    const firstCoopRate = firstLifeChoices.filter(c => c.choice.category === 'cooperative').length / Math.max(1, firstLifeChoices.length);
    const lastCoopRate = lastLifeChoices.filter(c => c.choice.category === 'cooperative').length / Math.max(1, lastLifeChoices.length);
    evolved = Math.abs(lastCoopRate - firstCoopRate) > 0.2;
  }

  // Peak trust across all lives
  const peakTrust = Math.max(...allChoices.map(c => c.trustAfter), 0.5);

  // Average karma tier
  const honoredCount = completedLives.filter(l => l.karmaTier === 'Honored').length;
  const constrainedCount = completedLives.filter(l => l.karmaTier === 'Constrained').length;
  const avgKarma = honoredCount > constrainedCount ? 'Mostly Honored' :
    constrainedCount > honoredCount ? 'Mostly Constrained' : 'Mixed';

  // Classify archetype
  let archetype: string, emoji: string, description: string, insight: string;

  if (evolved && coopRate > 0.4) {
    archetype = 'The Learner';
    emoji = '🔄';
    description = 'You adapted your strategy across lives — starting one way, ending another. This is exactly how trust-native systems are designed to work.';
    insight = 'In Web4 societies, agents that adapt based on consequences consistently outperform rigid strategists. Your willingness to change is your greatest asset.';
  } else if (coopRate > 0.65) {
    archetype = 'The Builder';
    emoji = '🏗️';
    description = 'You invest in others and play the long game. Your trust grows slowly but compounds powerfully across lives.';
    insight = 'Builders thrive in Web4 because the system rewards sustained cooperation. Your strategy creates the strongest karma legacies.';
  } else if (selfishRate > 0.5) {
    archetype = 'The Optimizer';
    emoji = '⚡';
    description = 'You chase immediate gains and test boundaries. In a system with consequences, this strategy has a shelf life.';
    insight = 'Optimizers discover the core Web4 insight the hard way: selfish strategies burn out because the consistency penalty compounds faster than the gains.';
  } else if (riskyRate > 0.3) {
    archetype = 'The Pioneer';
    emoji = '🧭';
    description = 'You experiment and take risks. Innovation sometimes costs trust, but it builds unique talent.';
    insight = 'Pioneers push the boundaries of what trust-native systems can support. Your willingness to fail enables discovery that benefits everyone.';
  } else if (evolved) {
    archetype = 'The Strategist';
    emoji = '♟️';
    description = 'You tested different approaches and found what works. Your journey shows deliberate pattern-seeking.';
    insight = 'Strategists embody cross-life learning — the ability to recognize what works and adjust accordingly. This meta-skill is what makes societies adaptive.';
  } else if (coopRate > 0.4 && selfishRate > 0.2) {
    archetype = 'The Pragmatist';
    emoji = '⚖️';
    description = 'You balance cooperation with self-interest. Not purely altruistic, not purely selfish — practical.';
    insight = 'Pragmatists mirror the real world: most people cooperate selectively. Web4 is designed to make this natural instinct sustainable.';
  } else {
    archetype = 'The Explorer';
    emoji = '🔍';
    description = 'You tried a variety of approaches without committing to one strategy. Curiosity drives your choices.';
    insight = 'Explorers generate the most diverse data in simulations. Your unpredictability is actually valuable — it tests whether the system is robust.';
  }

  return {
    archetype, emoji, description, insight,
    coopRate, selfishRate, riskyRate,
    totalChoices, totalLives: completedLives.length,
    peakTrust, avgKarma, evolved,
  };
}

// ============================================================================
// Main Page
// ============================================================================

export default function KarmaJourneyPage() {
  const [lives, setLives] = useState<LifeState[]>([{
    lifeNumber: 1,
    tick: 0,
    talent: 0.5,
    training: 0.5,
    temperament: 0.5,
    ci: 0.85,
    atp: 100,
    alive: true,
    deathCause: null,
    choices: [],
    karmaTier: null,
  }]);
  const [savedProfile, setSavedProfile] = useState<TrustProfile | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const savedProfileRef = useRef<TrustProfile | null>(null);

  // Track page visit + load saved profile on mount
  useEffect(() => {
    trackPageVisit('karma-journey');
    try {
      const saved = localStorage.getItem(KARMA_STORAGE_KEY);
      if (saved) {
        const profile = JSON.parse(saved) as TrustProfile;
        savedProfileRef.current = profile;
        setSavedProfile(profile);
        setShowWelcomeBack(true);
      }
    } catch { /* ignore parse errors */ }
  }, []);

  // Save profile whenever a life completes (uses ref to avoid infinite loop)
  useEffect(() => {
    const profile = classifyProfile(lives);
    if (profile) {
      const prev = savedProfileRef.current;
      const merged = prev && prev.totalLives > 0
        ? { ...profile, totalLives: Math.max(profile.totalLives, prev.totalLives) }
        : profile;
      try {
        localStorage.setItem(KARMA_STORAGE_KEY, JSON.stringify(merged));
        savedProfileRef.current = merged;
      } catch { /* localStorage might be full */ }
    }
  }, [lives]);

  const currentLife = lives[lives.length - 1];
  const effComp = useMemo(
    () => effectiveComposite(currentLife.talent, currentLife.training, currentLife.temperament, currentLife.ci),
    [currentLife.talent, currentLife.training, currentLife.temperament, currentLife.ci]
  );
  const baseComp = useMemo(
    () => compositeScore(currentLife.talent, currentLife.training, currentLife.temperament),
    [currentLife.talent, currentLife.training, currentLife.temperament]
  );
  const atpMul = useMemo(() => atpMultiplier(currentLife.ci), [currentLife.ci]);

  const makeChoice = useCallback((choice: Choice) => {
    setLives(prev => {
      const updated = [...prev];
      const life = { ...updated[updated.length - 1] };

      const actualAtpCost = Math.round(choice.atpCostBase * atpMultiplier(life.ci));
      const trustBefore = effectiveComposite(life.talent, life.training, life.temperament, life.ci);

      life.talent = clamp(life.talent + choice.trustDelta.talent);
      life.training = clamp(life.training + choice.trustDelta.training);
      life.temperament = clamp(life.temperament + choice.trustDelta.temperament);
      life.ci = clamp(life.ci + choice.ciDelta);
      life.atp = life.atp + choice.atpDelta - actualAtpCost;
      life.tick += 1;

      const trustAfter = effectiveComposite(life.talent, life.training, life.temperament, life.ci);

      life.choices = [...life.choices, {
        tick: life.tick,
        choice,
        trustBefore,
        trustAfter,
        atpBefore: life.atp - choice.atpDelta + actualAtpCost,
        atpAfter: life.atp,
      }];

      // Check for death
      if (life.atp <= 0) {
        life.alive = false;
        life.deathCause = 'ATP exhaustion';
        life.atp = 0;
      } else if (effectiveComposite(life.talent, life.training, life.temperament, life.ci) < 0.05) {
        life.alive = false;
        life.deathCause = 'Trust collapse';
      }

      if (!life.alive) {
        const finalEff = effectiveComposite(life.talent, life.training, life.temperament, life.ci);
        life.karmaTier = karmaTier(finalEff);
      }

      updated[updated.length - 1] = life;
      return updated;
    });
  }, []);

  const startNextLife = useCallback(() => {
    const deadLife = lives[lives.length - 1];
    if (deadLife.alive) return;

    const finalEff = effectiveComposite(deadLife.talent, deadLife.training, deadLife.temperament, deadLife.ci);
    const tier = karmaTier(finalEff);
    const start = karmaStartConditions(tier, finalEff);

    setLives(prev => [...prev, {
      lifeNumber: prev.length + 1,
      tick: 0,
      talent: start.trust,
      training: start.trust,
      temperament: start.trust,
      ci: start.ci,
      atp: start.atp,
      alive: true,
      deathCause: null,
      choices: [],
      karmaTier: null,
    }]);
  }, [lives]);

  const resetAll = useCallback(() => {
    setLives([{
      lifeNumber: 1, tick: 0, talent: 0.5, training: 0.5, temperament: 0.5,
      ci: 0.85, atp: 100, alive: true, deathCause: null, choices: [], karmaTier: null,
    }]);
    try { localStorage.removeItem(KARMA_STORAGE_KEY); } catch { /* ok */ }
    savedProfileRef.current = null;
    setSavedProfile(null);
    setShowWelcomeBack(false);
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/karma-journey" />

      <h1 style={{
        fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #6ee7b7, #fde68a, #fca5a5)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Karma Journey
      </h1>
      {/* Welcome back banner for returning visitors */}
      {showWelcomeBack && savedProfile && (
        <div style={{
          padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem',
          background: 'linear-gradient(135deg, rgba(110,231,183,0.08), rgba(147,197,253,0.08))',
          border: '1px solid rgba(110,231,183,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              Welcome back, <strong style={{ color: '#6ee7b7' }}>{savedProfile.archetype}</strong> {savedProfile.emoji}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
              {savedProfile.totalLives} {savedProfile.totalLives === 1 ? 'life' : 'lives'} lived &middot; {Math.round(savedProfile.coopRate * 100)}% cooperative
            </span>
          </div>
          <button
            onClick={() => setShowWelcomeBack(false)}
            style={{
              padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem',
              background: 'transparent', border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)', cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem', maxWidth: '700px', lineHeight: 1.6 }}>
        Live multiple lives. Make choices. Watch how trust and karma compound across reincarnations.
        Cooperative choices build slow trust; selfish choices yield quick gains but erode your legacy.
      </p>

      {/* May 3 visitor LOW #5: Karma Consequences vs Karma Journey naming overlap — both names sound interactive. Two-second disambiguation. */}
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.55, fontSize: '0.85rem' }}>
        <span style={{ color: '#6ee7b7', fontWeight: 600 }}>You are on the interactive sim.</span>{' '}
        Want the conceptual <em>explainer</em> with side-by-side comparisons and the karma formula?{' '}
        <Link href="/karma-consequences" style={{ color: '#7dd3fc', textDecoration: 'underline' }}>Karma &amp; Consequences →</Link>{' '}
        is the read-first companion page.
      </p>

      {/* Terminology acknowledgement — answers Apr 17 LOW #6 */}
      <div style={{
        padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem', maxWidth: '700px',
        background: 'rgba(251, 191, 36, 0.04)', border: '1px solid rgba(251, 191, 36, 0.15)',
        fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--color-text-secondary)',
      }}>
        <strong style={{ color: '#fbbf24' }}>Why call it &ldquo;karma&rdquo;?</strong>{' '}
        The word here is a handle, not a moral score. It names one specific mechanic:
        your actions in this life become starting conditions for the next. Good work
        carries forward (more ATP, higher trust); harm carries forward too (less ATP,
        lower trust). No deity, no committee, no moral ledger — just consequences
        that don&rsquo;t reset when you do.
        <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(251, 191, 36, 0.15)', fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--color-text-secondary)' }}>Simulation vs. real deployment.</strong>{' '}
          &ldquo;Life&rdquo; and &ldquo;rebirth&rdquo; are simulation framing &mdash; an LCT is
          hardware-bound and persists; it doesn&rsquo;t literally die and respawn. In a real
          Web4 deployment, what &ldquo;death&rdquo; means depends on <em>which metric ran out</em> &mdash;
          and that, not the 0.5 number on its own, is what splits a recoverable death from a permanent one:
          {/* June-16 visitor MEDIUM (2nd occurrence): the June-15 fix named the 0.5 floor but tied
              BOTH outcomes to "above/below 0.5" — the visitor read the full callout and STILL couldn't
              tell them apart ("same number, same direction, opposite outcome"). The distinguishing factor
              is WHICH tensor failed, so lead with the metric, mirroring Aliveness #death-meaning's
              two-deaths split (green=energy/recoverable, red=trust/permanent). */}
          <span style={{ display: 'block', marginTop: '0.5rem' }}>
            <strong style={{ color: '#6ee7b7' }}>Energy death</strong> &mdash; you ran out of <strong>ATP</strong>{' '}
            while your raw trust held at or above 0.5. This is the recoverable, common case, and it&rsquo;s what{' '}
            <Link href="/aliveness#death-meaning" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>
              license suspension and reinstatement
            </Link>{' '}
            means: your identity and history persist, your participation rights are just paused until your
            karma tier earns them back.
          </span>
          <span style={{ display: 'block', marginTop: '0.4rem' }}>
            <strong style={{ color: '#fca5a5' }}>Trust collapse</strong> &mdash; your raw <strong>trust</strong>{' '}
            itself fell below 0.5 and stayed there. This is the one door that doesn&rsquo;t reopen: the identity is
            revoked rather than suspended, and no amount of later good behavior reinstates it.
          </span>
          <span style={{ display: 'block', marginTop: '0.4rem' }}>
            Both crossings involve 0.5, so the number alone can&rsquo;t tell them apart &mdash; <em>which metric
            failed</em> does. See the{' '}
            <Link href="/aliveness#death-meaning" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>
              two deaths
            </Link>
            {' '}side by side.
          </span>
          {/* Jul-9 numbers-integrity audit: the prose above claimed trust collapse means "society rejects
              rebirth, and no karma tier earns it back" — but startNextLife() has no eligibility branch and
              reincarnates EVERY death, so a trust-collapsed player is handed a "Begin Life N+1" button and
              can see the claim is false. The engine is deliberate (Constrained rebirth is how karma
              carry-forward is taught; PR #440 protected it), so the prose was the defect. Deployment-level
              permanence is #440 canon and mirrored at /aliveness#death-meaning — it stays; the simulation
              owns its simplification here instead, per the same call #440 made for SurvivalGame's verdict. */}
          <span style={{ display: 'block', marginTop: '0.4rem' }}>
            <strong style={{ color: 'var(--color-text-secondary)' }}>Where this journey simplifies.</strong>{' '}
            The simulation below still offers you a <em>Begin Life</em> button after a trust collapse &mdash;
            reborn Constrained, on lower trust and fewer resources &mdash; because its whole job is to let you
            watch karma carry forward across lives. Read that as a teaching device, not a rule: a real
            deployment revokes the identity instead, and there is no next life to start.
          </span>
        </div>
      </div>

      {/* June-19 visitor MEDIUM (the day's #1 "fix one thing"): raw-vs-effective + CI² is heavy
          cognitive load. The resolution lived only at the END of the dense "What the numbers mean"
          wall below, so a linear reader hit the daunting arithmetic (effective ~0.36 at raw 0.5)
          before any plain-English frame and "re-read twice, still unsure". Per
          recurring-anchor-proactive-vs-reactive (PR #362): lead the section with ONE plain-English
          anchor carrying the missing reassurance ("start low on purpose, climb"). Relocated UP from
          below the contrast cards (was the Apr-21 color-coded two-liner) + enriched — net density
          neutral, NOT a new box. Guardrail: no CI² arithmetic here; that stays in the wall/cards/
          why-squared callout below. */}
      <p style={{ marginBottom: '1.25rem', maxWidth: '700px', lineHeight: 1.55, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
        <strong>Two trust numbers — and it&rsquo;s normal to start low.</strong>{' '}
        <strong style={{ color: '#93c5fd' }}>Raw trust keeps you alive now</strong> (your plain reputation).{' '}
        <strong style={{ color: '#fde68a' }}>Effective trust — raw dampened by how consistent you&rsquo;ve been — is what you inherit next life</strong>{' '}
        and sets your karma tier. New players start low <em>on purpose</em>: you haven&rsquo;t built a track record yet,
        so effective trust sits well under raw at first and climbs as you behave consistently. That gap is the
        starting line, not a verdict.
      </p>

      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '700px', lineHeight: 1.6, fontSize: '0.85rem' }}>
        <strong style={{ color: 'var(--color-text-secondary)' }}>What the numbers mean:</strong>{' '}
        <strong><Link href="/trust-tensor" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>Trust</Link></strong> = your reputation (Talent, Training and Temperament combined, with Temperament counting for the most).{' '}
        {/* June 12 visitor MEDIUM (browse A): where the starting 100 ATP comes from never made it
            over from /atp-economics (society-pool starter grant). One clause at the read point. */}
        <strong><Link href="/atp-economics" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>ATP</Link></strong> = your energy budget — your first 100 is a starter grant from the society&apos;s pool when you join; every action costs ATP, run out and you die.{' '}
        <strong><Link href="/coherence-index" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>CI</Link></strong> (Coherence Index) = consistency score — erratic behavior lowers it, which makes all future actions cost more ATP (the &quot;cost multiplier&quot;).
        {/* June-20 visitor MEDIUM: the inline 1/CI² derivation ("1/0.85² ≈ 1.38 — ~40% surcharge")
            made a reader who already grasped the *concept* re-read it as "homework". Keep the plain
            claim (~40% more at the start, fades to nothing) inline; the derivation now lives in the
            "Show the math" <details> below. (Was the June-12 derivation add — concept now clear, so
            the lever is structural per recurring carry-forward, not more prose.) */}
        Everyone starts at CI 0.85, not 1.0 — you haven&apos;t demonstrated consistency yet, so actions cost about 40% more than their base price at first. As you behave consistently, CI rises to 0.9+ and that surcharge disappears (actions cost exactly their listed price).
        {/* June 11 visitor (browse A) MEDIUM: read this exact paragraph and still concluded "no stated
            rationale — reads as the system taxes you for being new." The why lived only behind the link.
            Inline the sibling's canonical frame (/coherence-index#why-ci-starts-low): no witnessed pattern
            yet ≠ penalty. Policy review: do NOT add a Sybil rationale — the sibling deliberately doesn't. */}
        {' '}The point isn&apos;t to tax newcomers: CI scores how well your current behavior matches your <em>witnessed pattern</em>, and a brand-new identity has no pattern to match yet — the surcharge is the system being honest about what it hasn&apos;t seen.{' '}
        <Link href="/coherence-index#why-ci-starts-low" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>
          (why this isn&rsquo;t a penalty)
        </Link>{' '}
        <strong style={{ color: 'var(--color-text-secondary)' }}>Karma tier</strong> = the grade your life earns, set by your <em>effective</em> trust at death: <strong>Honored</strong> (above 0.7 → next life starts with advantages), <strong>Neutral</strong> (0.3–0.7 → baseline, no head start or penalty), <strong>Constrained</strong> (below 0.3 → next life starts with lower trust and fewer resources).{' '}
        {/* June 11 visitor MEDIUM (browse A): "Constrained (<0.3)" looked impossible against
            "below 0.5 = death" — visitor derived the raw/effective resolution alone and was "only
            ~80% sure". Bridge the paradox here, pointing at the existing contrast cards below. */}
        (How can a tier sit below the 0.5 survival line? Survival
        is judged on <em>raw</em> trust; which tier you land in is judged on <em>effective</em> trust — raw × CI²,
        contrasted in the two cards below — which poor coherence can drag far below your raw score.
<em>You can be reborn on raw <strong>0.55</strong> yet land Constrained on effective <strong>0.27</strong> when consistency is low.</em>){' '}
        {/* June 12 visitor MEDIUM (browse B): a reader doing the arithmetic at the STARTING CI
            concluded Honored was near-impossible; the missing link is that CI climbs during a life.
            June-20: the plain reassurance stays inline; the supporting arithmetic (0.85² ≈ 0.72 →
            raw ≈ 0.97; CI climbs to 0.9–0.95 → raw ≈ 0.78–0.86) moved into "Show the math" below.
            Hedged per prior policy review: this describes THIS journey's simulation, not a web4 guarantee. */}
        Don&apos;t let the starting numbers scare you off the top tier: because CI <em>climbs</em> as you make
        consistent choices in this journey, a steady player reaches death with a much gentler multiplier than
        they started with. So Honored is demanding — meant to be earned, often over more than one life — but not
        the near-impossible bar the opening numbers imply.{' '}
        Tip: make a few cooperative choices, then switch to selfish ones. Watch how trust builds slowly but erodes quickly.
      </p>

      {/* June-25 visitor LOW — the recurring single-hardest concept on the site. The raw-vs-effective
          paradox has been explained in prose, callouts, fine print and a collapsible (inline-prose
          lever documented exhausted: #362/#392/#393/#397) and STILL "took two reads." The visitor's
          explicit suggestion this browse: a 2-bar visual "so it's seen, not just read." Show both
          numbers on one 0–1 scale, against the tier bands and the 0.5 survival line. Numbers match
          karmaTier() and the tier definitions stated just above: raw 0.55 clears 0.5 (survives);
          effective 0.27 (< 0.3) lands Constrained — the same numbers as the corrected inline example. */}
      <div style={{
        marginBottom: '1.5rem', maxWidth: '700px',
        padding: '0.85rem 1.1rem', borderRadius: '0.5rem',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.7rem', lineHeight: 1.45 }}>
          One life, two numbers: survived &mdash; but lands Constrained
        </div>
        {[
          { label: 'Raw trust', color: '#93c5fd', value: 0.55, fill: 'rgba(147,197,253,0.55)', verdict: 'clears 0.5 → survives', vColor: '#93c5fd' },
          { label: 'Effective trust', color: '#fde68a', value: 0.27, fill: 'rgba(253,230,138,0.55)', verdict: 'below 0.3 → Constrained tier', vColor: '#fca5a5' },
        ].map((b) => (
          <div key={b.label} style={{ marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: b.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {b.label}{' '}
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}>{b.value.toFixed(2)}</span>
              </span>
              <span style={{ fontSize: '0.72rem', color: b.vColor }}>{b.verdict}</span>
            </div>
            <div style={{
              position: 'relative', height: '1.1rem', borderRadius: '0.3rem', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(to right, rgba(252,165,165,0.16) 0%, rgba(252,165,165,0.16) 30%, rgba(253,230,138,0.13) 30%, rgba(253,230,138,0.13) 70%, rgba(110,231,183,0.13) 70%, rgba(110,231,183,0.13) 100%)',
            }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${b.value * 100}%`, background: b.fill }} />
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.6)' }} title="0.5 survival line" />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
          <span><span style={{ display: 'inline-block', width: '0.7rem', height: '0.7rem', background: 'rgba(252,165,165,0.4)', borderRadius: '2px', marginRight: '0.3rem', verticalAlign: 'middle' }} />Constrained &lt; 0.3</span>
          <span><span style={{ display: 'inline-block', width: '0.7rem', height: '0.7rem', background: 'rgba(253,230,138,0.35)', borderRadius: '2px', marginRight: '0.3rem', verticalAlign: 'middle' }} />Neutral 0.3–0.7</span>
          <span><span style={{ display: 'inline-block', width: '0.7rem', height: '0.7rem', background: 'rgba(110,231,183,0.35)', borderRadius: '2px', marginRight: '0.3rem', verticalAlign: 'middle' }} />Honored &gt; 0.7</span>
          <span><span style={{ display: 'inline-block', width: '2px', height: '0.7rem', background: 'rgba(255,255,255,0.6)', marginRight: '0.3rem', verticalAlign: 'middle' }} />0.5 survival line</span>
        </div>
      </div>

      {/* June-20 visitor MEDIUM: the two CI² derivations above used to sit inline and read as
          "homework" for a reader who already had the intuition. Per the carry-forward guardrail
          (inline-prose lever exhausted — PRs #362/#392/#393/#397), the math is now structural:
          intuition stays in the prose, the numbers live one click away here. No new claims — these
          are the exact derivations removed from the two paragraphs above. */}
      <details style={{ marginBottom: '1.5rem', maxWidth: '700px' }}>
        <summary style={{ cursor: 'pointer', color: '#94a3b8', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
          Show the math
        </summary>
        <div style={{ marginTop: '0.6rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--color-text-secondary)' }}>The starting surcharge.</strong>{' '}
            The cost multiplier is <strong>1/CI²</strong>. At the starting CI of 0.85, that&apos;s
            1/0.85² ≈ 1.38 — about a 40% surcharge. As CI rises to 0.9+, 1/CI² approaches 1.0 and the
            surcharge vanishes (actions then cost exactly their listed price).
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--color-text-secondary)' }}>Reaching Honored (effective &gt; 0.7).</strong>{' '}
            Effective trust = raw × CI². At the starting CI, 0.85² ≈ 0.72, which would demand raw ≈ 0.97 —
            near-impossible. But CI <em>climbs</em> as you make consistent choices, so a steady player typically
            reaches death with CI around 0.9–0.95 (CI² ≈ 0.81–0.90), putting Honored within reach at raw trust
            ≈ 0.78–0.86. Demanding, but not the 0.97 the starting numbers imply. (This describes this journey&apos;s
            simulation, not a guaranteed Web4 rule.)
          </p>
        </div>
      </details>

      {/* Two-trust-numbers lead-in relocated UP to lead the numbers section (June-19 visitor MEDIUM);
          the contrast cards below keep their own color-coded Raw (blue) / Effective (yellow) headers,
          so they stand without a duplicate two-liner directly above. */}
      {/* Raw vs Effective trust contrast — closes Apr 18 LOW */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem',
        marginBottom: '0.75rem', maxWidth: '700px',
      }}>
        <div style={{
          padding: '0.75rem 1rem', borderRadius: '0.5rem',
          background: 'rgba(147, 197, 253, 0.06)', border: '1px solid rgba(147, 197, 253, 0.2)',
        }}>
          <div style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Raw trust</div>
          {/* This formula must stay in sync with compositeScore() above — the stat panel below renders
              talent/training/temperament individually, so a reader who recomputes will catch any drift. */}
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>0.3 &times; Talent + 0.3 &times; Training + 0.4 &times; Temperament</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '0.4rem' }}>Temperament counts for the most because talent and training can be tested directly, but behaving consistently under pressure is the hardest thing to fake.</div>
          {/* Jul-10 visitor MEDIUM: reader hit these fixed weights, then Trust Tensor's "each role
              weights dimensions differently" (Data Analyst 40/35/25), and couldn't reconcile them.
              The bridge below attributes the weights to THIS simulation — a fact of the engine
              (compositeScore() above) — and defers role-specific weighting to /trust-tensor.
              Do NOT print any other weight ordering here (canonical 0.4/0.3/0.3 vs engine
              0.3/0.3/0.4 is an escalated canon conflict; the #442 reviewer cut exactly that
              cross-reference). "This simulation uses fixed weights" is true and canon-neutral. */}
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '0.4rem' }}>These are the fixed weights <em>this simulation</em> uses for every role — a simplification. In the full design, trust is scored per role and each role sets its own weighting: see the <Link href="/trust-tensor" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>Trust Tensor</Link> page.</div>
          {/* Jul-8 visitor HIGH: "Drop below 0.5 and this life ends" contradicted First Contact
              (Alice dips to 0.48, gets restricted, recovers) AND this page's own engine (no raw-0.5
              kill exists; Constrained rebirths start at raw 0.40). Canonical rule sentence below is
              IDENTICAL on First Contact / Karma Journey / Aliveness — keep it verbatim if editing.
              Jul-9 visitor HIGH: the sentence gained the "one line, two consequences" clause. Without it,
              First Contact read as an access threshold and Aliveness as a death threshold.
              The raw-vs-effective clause that First Contact and Aliveness carry is intentionally ABSENT
              here: this page's own simulator implements a simplified deep-collapse proxy comparing
              EFFECTIVE trust (effectiveComposite < 0.05, ~L395), so asserting "raw, not effective" on
              this page would be falsified ~300 lines up (PR #444 review, cycle 1). */}
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>Decides <strong style={{ color: 'var(--color-text-secondary)' }}>survival</strong>. One line, two consequences: <em>crossing</em> below 0.5 restricts your features right away and is recoverable; only <em>staying</em> below it is fatal &mdash; a sustained collapse, not a single stumble.</div>
        </div>
        <div style={{
          padding: '0.75rem 1rem', borderRadius: '0.5rem',
          background: 'rgba(253, 230, 138, 0.06)', border: '1px solid rgba(253, 230, 138, 0.2)',
        }}>
          <div style={{ fontSize: '0.75rem', color: '#fde68a', fontWeight: 600, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Effective trust</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>raw × CI²</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>Decides your <strong style={{ color: 'var(--color-text-secondary)' }}>karma tier</strong> at death (Honored / Neutral / Constrained), which seeds your next life.</div>
          {/* May 13 LOW — bridge "next life" simulation framing to the deployment mechanic at the point of use; the top-of-page intro callout was being read as preamble and missed. */}
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.55, marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.85 }}>
            &ldquo;Next life&rdquo; is simulation framing. For the recoverable <strong>energy death</strong>{' '}
            (ATP ran out, raw trust held above 0.5), a deployed Web4 calls this{' '}
            <Link href="/aliveness#death-meaning" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.25)' }}>
              license suspension and reinstatement
            </Link>
            , not deletion &mdash; a <strong>sustained trust collapse</strong> below 0.5 is the permanent exception.
          </div>
        </div>
      </div>
      {/* May 15 visitor MEDIUM + recurring #1 unanswered question — the CI² rationale lived here but as
          0.78rem muted fine print below the prominent contrast card; scanning visitors absorbed the card
          and the 0.9²=0.81 example yet kept reporting the "why" as unexplained. Prior sessions re-added
          the text as fine print rather than raising its visual weight. Promote to a first-class callout:
          plain-English one-sentence answer leading in bold body type so scanners get it without parsing
          the cube/linear comparison. */}
      <div style={{
        marginBottom: '1.5rem', maxWidth: '700px',
        padding: '0.85rem 1.1rem', borderRadius: '0.5rem',
        background: 'rgba(253, 230, 138, 0.05)', borderLeft: '3px solid rgba(253, 230, 138, 0.4)',
      }}>
        <div style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '0.35rem', lineHeight: 1.45 }}>
          Why squared? So one bad stretch costs you more than steady mediocrity ever could.
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.55 }}>
          Squaring makes inconsistency compound against you. A small dip barely shows (0.9² = 0.81); a serious one nearly halves you (0.6² = 0.36). Linear (× CI) would be too forgiving — it treats a 0.6 in the same proportion as a 0.9. Cubing (× CI³) would be too brutal, crushing a 0.9 down to 0.73 for routine variance. Square sits in the gentle middle: small dips forgiven, sustained dips punished.
        </p>
        {/* June 1 visitor M3 / Unanswered Q3: the visitor read this shape rationale and still asked
            "but why 2 specifically — is that derived or chosen?". Wire the read point to the canonical
            honesty frame (coherence-index #why-ci-squared, now labeled "calibration choice, not derived",
            matching the 0.5 / 0.85 / 3-hop posture). One phrase + link — the shape callout above stays the
            primary read; the canonical "where the number comes from" answer lives on coherence-index. */}
        <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
          And why 2, not some other power? It&apos;s a calibration choice, not a derived constant —{' '}
          <Link href="/coherence-index#why-ci-squared" style={{ color: 'var(--color-sky)' }}>where the exponent comes from</Link>.
        </p>
      </div>

      {/* Lives Overview Strip */}
      {lives.length > 1 && (
        <div style={{
          display: 'flex', gap: '0.375rem', marginBottom: '1.5rem', flexWrap: 'wrap',
          padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', alignSelf: 'center', marginRight: '0.25rem' }}>
            Past lives:
          </span>
          {lives.slice(0, -1).map((life, i) => {
            const eff = effectiveComposite(life.talent, life.training, life.temperament, life.ci);
            const tier = karmaTier(eff);
            const tierColor = tier === 'Honored' ? '#6ee7b7' : tier === 'Constrained' ? '#fca5a5' : '#fde68a';
            return (
              <div key={i} title={`Life ${life.lifeNumber}: ${tier} (eff=${eff.toFixed(2)}, ${life.choices.length} choices, died: ${life.deathCause})`} style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: `${tierColor}20`, border: `2px solid ${tierColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 600, color: tierColor,
              }}>
                {life.lifeNumber}
              </div>
            );
          })}
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: currentLife.alive ? '#93c5fd20' : '#fca5a520',
            border: `2px solid ${currentLife.alive ? '#93c5fd' : '#fca5a5'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.65rem', fontWeight: 700, color: currentLife.alive ? '#93c5fd' : '#fca5a5',
          }}>
            {currentLife.lifeNumber}
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-6">

        {/* Left: Current Life Status + Choices */}
        <div>
          {/* Stats bar — May 20 visitor MEDIUM #3: Raw and Effective shown side-by-side during play, not only at death.
              Card order keeps the two trust cards adjacent at mobile grid-cols-2 (positions 2+3 → row 2 together). */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            {[
              { label: 'Life', value: `#${currentLife.lifeNumber}`, color: '#93c5fd' },
              // Jul-8 visitor HIGH: hint said "≥ 0.5 to survive this life" (instant rule) — both trust
              // hints now use the same compressed form of the canonical sustained rule. Jul-8 MEDIUM:
              // Consistency was the only stat card with NO hint, so "low consistency tax" (1.4x) hit
              // players unexplained — the why lives in the intro prose + /coherence-index#why-ci-starts-low;
              // this is the one-sentence-at-the-stats-panel fix the visitor asked for.
              { label: 'Trust (Raw)', value: baseComp.toFixed(3), color: baseComp > 0.7 ? '#6ee7b7' : baseComp > 0.4 ? '#fde68a' : '#fca5a5', hint: `keep above 0.5 — a dip below is a warning, staying below is permanent` },
              { label: 'Trust (Eff.)', value: effComp.toFixed(3), color: effComp > 0.7 ? '#6ee7b7' : effComp > 0.4 ? '#fde68a' : '#fca5a5', hint: `raw × CI² — karma tier, not the 0.5 survival line` },
              { label: 'Energy', value: `${currentLife.atp}`, color: currentLife.atp > 50 ? '#6ee7b7' : currentLife.atp > 20 ? '#fde68a' : '#fca5a5' },
              { label: 'Consistency', value: currentLife.ci.toFixed(2), color: currentLife.ci > 0.8 ? '#6ee7b7' : currentLife.ci > 0.5 ? '#fde68a' : '#fca5a5', hint: `starts at 0.85 — no track record yet, so actions cost ~1.4x until this climbs past 0.9` },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '0.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>{stat.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'monospace', color: stat.color }}>{stat.value}</div>
                {'hint' in stat && stat.hint && <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{stat.hint}</div>}
              </div>
            ))}
          </div>
          {currentLife.tick === 0 ? (
            <div style={{
              fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem',
              padding: '0.625rem 0.875rem', borderRadius: '0.375rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            }}>
              <div style={{ marginBottom: '0.375rem' }}>
                <strong>Raw trust: {baseComp.toFixed(3)}</strong> — determines survival (a dip below 0.5 is a warning, staying below is permanent)
              </div>
              {/* May 4 visitor MEDIUM: pulled the math out of muted-prose into a visible equation strip
                  so scan-pattern readers see how 0.5 × 0.85² becomes 0.36 without parsing inline gray text. */}
              <div style={{
                marginBottom: '0.375rem', padding: '0.4rem 0.6rem', borderRadius: '0.25rem',
                background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.18)',
                fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-secondary)',
              }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Effective trust =</span>{' '}
                <span style={{ color: '#93c5fd' }}>{baseComp.toFixed(2)}</span>
                <span style={{ color: 'var(--color-text-muted)' }}> × </span>
                <span style={{ color: '#fde68a' }}>{currentLife.ci.toFixed(2)}²</span>
                <span style={{ color: 'var(--color-text-muted)' }}> = </span>
                <strong style={{ color: 'var(--color-sky)' }}>{effComp.toFixed(3)}</strong>
                <span style={{ fontFamily: 'inherit', color: 'var(--color-text-muted)', marginLeft: '0.5rem', fontSize: '0.7rem' }}>
                  ({(currentLife.ci * currentLife.ci * 100).toFixed(0)}% of raw — squaring penalizes inconsistency)
                </span>
              </div>
              {/* May 21 visitor MEDIUM — port "10% dip → 19% loss" intuition from /coherence-index to point-of-action.
                  Visitor reached the play area with the formula visible but the *interpretation* offscreen (page-top
                  callout at ~580) or buried as 0.75rem muted prose below. Same antipattern the May 15 visitor flagged
                  on the page-top callout: "scanning visitors absorbed the card yet kept reporting the 'why' as
                  unexplained." Promote a punchy two-number anchor in 0.85rem body type right after the live equation
                  so the strip grounds the math and the callout interprets it before the eye moves on. */}
              <div style={{
                marginBottom: '0.5rem',
                padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
                background: 'rgba(253, 230, 138, 0.05)', borderLeft: '3px solid rgba(253, 230, 138, 0.4)',
              }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600, lineHeight: 1.45 }}>
                  Why squared? Even small inconsistency hurts trust disproportionately — a <span style={{ color: '#fde68a' }}>10% dip costs ~19%</span>; a <span style={{ color: '#fca5a5' }}>40% dip costs 64%</span>.
                </div>
              </div>
              <div style={{ marginBottom: '0.375rem', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                Effective trust determines your earning rate, action weight, and how others prioritize your contributions.
              </div>
              {effComp < 0.5 && baseComp >= 0.5 && (
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.375rem', padding: '0.5rem 0.625rem', borderRadius: '0.25rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                  <strong style={{ color: 'var(--color-sky)' }}>You&apos;re not dead!</strong> Effective trust ({effComp.toFixed(3)}) is below 0.5, but only <em>raw</em> trust determines survival, and yours is {baseComp.toFixed(2)}. Effective trust determines your karma tier at death (and thus your next life&apos;s starting conditions), not whether you survive.
                </div>
              )}
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {currentLife.lifeNumber === 1
                ? <>Consistency (CI) modulates how others perceive your trust. New entities have limited history (CI = {currentLife.ci.toFixed(2)}), so effective trust starts below raw. As you make consistent choices, CI rises toward 1.0 and the gap closes.</>
                : <>Your karma from Life {currentLife.lifeNumber - 1} set your raw trust at {baseComp.toFixed(3)}. Consistency ({currentLife.ci.toFixed(2)}) {currentLife.ci >= 0.9 ? 'is high, so the gap is small' : 'still modulates what others see'}.</>
              }</span>
            </div>
          ) : Math.abs(effComp - baseComp) > 0.01 ? (
            /* June 2 visitor MEDIUM / Unanswered Q1: during play (tick>0) this persistent strip restated only the
               formula, dropping the purpose. The raw=survival / effective=next-life-tier contrast lives in the tick===0
               block, the stat hints, and the conditional "You're not dead" callout — but vanished once an action was
               clicked, which is exactly where the visitor "had to infer it." Add the one-clause purpose contrast here. */
            <div style={{
              fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem',
              padding: '0.375rem 0.75rem', borderRadius: '0.375rem',
              background: 'var(--color-bg-secondary)',
            }}>
              Effective trust ({effComp.toFixed(3)}) = Raw ({baseComp.toFixed(2)}) × CI² ({currentLife.ci.toFixed(2)}²). Raw keeps you alive this life; effective sets the karma tier that seeds your next.
            </div>
          ) : null}

          {/* Trust dimensions */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
          }}>
            {[
              { label: 'Talent', value: currentLife.talent, color: '#3b82f6' },
              { label: 'Training', value: currentLife.training, color: '#10b981' },
              { label: 'Temperament', value: currentLife.temperament, color: '#f59e0b' },
            ].map(dim => (
              <div key={dim.label} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.125rem' }}>
                  <span style={{ color: dim.color, fontWeight: 600 }}>{dim.label}</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{dim.value.toFixed(3)}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-bg-tertiary)', borderRadius: '3px' }}>
                  <div style={{
                    height: '100%', width: `${dim.value * 100}%`,
                    background: dim.color, borderRadius: '3px',
                    transition: 'width 0.3s',
                  }} />
                </div>
              </div>
            ))}
            <div style={{
              marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--color-text-muted)',
              fontFamily: 'monospace',
            }}>
              Action costs: {atpMul <= 1.0 ? 'normal (1.0x)' : `${atpMul.toFixed(1)}x`} {atpMul > 1.0 && atpMul <= 1.5 && <span style={{ color: '#fde68a' }}>{currentLife.tick === 0 ? '(new entities pay 40% more because they have no consistency history yet — e.g. a 10 ATP action costs 14. Make steady choices to bring costs down to 1.0x)' : '(erratic behavior raises costs — e.g. a 10 ATP action costs ' + Math.round(10 * atpMul) + '. Stay consistent to lower this)'}</span>}{atpMul > 1.5 && <span style={{ color: '#fca5a5' }}>(low consistency is expensive — a 10 ATP action costs {Math.round(10 * atpMul)}. Rebuild by making steady, cooperative choices)</span>}
            </div>
          </div>

          {/* Choices */}
          {currentLife.alive ? (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Turn {currentLife.tick + 1} &mdash; Choose your action:
              </div>
              {/* June-8 visitor MEDIUM / Unanswered Q2: a "solid" reader still couldn't say *which* number a choice
                  moves. The page explains what Raw and Effective each mean (stat hints, tick-0 block, L727 strip) but
                  never the agency question — you don't pick a number, you move the inputs and both recompute. Answer it
                  at the read point (right above the buttons), agency-first, without re-stating the meaning contrast. */}
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', lineHeight: 1.45 }}>
                You don&apos;t move Raw or Effective directly — each action nudges the inputs above (your trust dimensions and consistency), and <strong style={{ color: 'var(--color-text-secondary)' }}>both numbers recompute</strong> from them.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CHOICES.map(choice => {
                  const actualCost = Math.round(choice.atpCostBase * atpMul);
                  const netAtp = choice.atpDelta - actualCost;
                  const canAfford = currentLife.atp + netAtp > 0 || netAtp >= 0;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => canAfford && makeChoice(choice)}
                      disabled={!canAfford}
                      style={{
                        padding: '0.625rem', borderRadius: '0.5rem',
                        border: `1px solid ${CATEGORY_COLORS[choice.category]}30`,
                        background: canAfford ? `${CATEGORY_COLORS[choice.category]}08` : 'var(--color-bg-tertiary)',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        textAlign: 'left', color: 'inherit',
                        opacity: canAfford ? 1 : 0.4,
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.8rem', color: CATEGORY_COLORS[choice.category] }}>
                          {choice.label}
                        </span>
                        <span style={{
                          fontSize: '0.6rem', padding: '0.1rem 0.3rem',
                          borderRadius: '4px', background: `${CATEGORY_COLORS[choice.category]}15`,
                          color: CATEGORY_COLORS[choice.category],
                        }}>
                          {CATEGORY_LABELS[choice.category] || choice.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                        {choice.description}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.65rem', fontFamily: 'monospace' }}>
                        <span style={{ color: netAtp >= 0 ? '#6ee7b7' : '#fca5a5' }}>
                          Energy: {netAtp >= 0 ? '+' : ''}{netAtp}
                        </span>
                        {actualCost > 0 && actualCost !== choice.atpCostBase && (
                          <span style={{ color: actualCost > choice.atpCostBase ? '#fca5a5' : '#6ee7b7' }}>
                            ({actualCost > choice.atpCostBase ? 'low consistency tax' : 'consistency discount'})
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Death screen */
            <div style={{
              padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center',
              background: `${currentLife.karmaTier === 'Honored' ? '#6ee7b7' : currentLife.karmaTier === 'Constrained' ? '#fca5a5' : '#fde68a'}08`,
              border: `2px solid ${currentLife.karmaTier === 'Honored' ? '#6ee7b7' : currentLife.karmaTier === 'Constrained' ? '#fca5a5' : '#fde68a'}40`,
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                LIFE {currentLife.lifeNumber} ENDED
              </div>
              <div style={{
                fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem',
                color: currentLife.karmaTier === 'Honored' ? '#6ee7b7' : currentLife.karmaTier === 'Constrained' ? '#fca5a5' : '#fde68a',
              }}>
                {currentLife.deathCause}
              </div>
              {/* June-10 visitor LOW — the death CAUSE (why this life ended) and the karma TIER (what the next
                  life inherits) share this box and the same tier-keyed color, so they read as one fused fact.
                  One clarifier maps them to the layout: cause above, tier below — two facts, two lives. */}
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '0.6rem', lineHeight: 1.5 }}>
                &uarr; why <em>this</em> life ended. &darr; your <em>next</em> life&rsquo;s starting grade &mdash; a separate thing, not the cause of death.
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                Final effective trust: {effComp.toFixed(3)} &mdash; Karma tier: <strong>{currentLife.karmaTier}</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                {currentLife.karmaTier === 'Honored' && 'Your consistent, trustworthy behavior earned you an honored reincarnation. Next life starts with advantages.'}
                {currentLife.karmaTier === 'Neutral' && 'You lived an average life. Next life starts at baseline — no advantages, no penalties.'}
                {currentLife.karmaTier === 'Constrained' && 'Your choices eroded trust. Next life starts with constraints — lower trust, fewer resources, harder path.'}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={startNextLife}
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                    background: '#93c5fd20', border: '1px solid #93c5fd40',
                    color: '#93c5fd', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                  }}
                >
                  Begin Life {currentLife.lifeNumber + 1} →
                </button>
                <button
                  onClick={resetAll}
                  style={{
                    padding: '0.75rem 1rem', borderRadius: '0.5rem',
                    background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.8rem',
                  }}
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Choice History + Insights */}
        <div>
          {/* Choice history for current life */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
              Life {currentLife.lifeNumber} History ({currentLife.choices.length} choices)
            </div>

            {/* Mini trust chart */}
            {currentLife.choices.length > 0 && (
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: '1px', height: '50px',
                marginBottom: '0.5rem', padding: '0 0.25rem',
              }}>
                {currentLife.choices.map((rec, i) => (
                  <div key={i} title={`${rec.choice.label}: ${rec.trustAfter.toFixed(3)}`} style={{
                    flex: 1, minWidth: '3px',
                    height: `${Math.max(5, rec.trustAfter * 100)}%`,
                    background: CATEGORY_COLORS[rec.choice.category],
                    borderRadius: '1px 1px 0 0',
                    opacity: 0.7,
                  }} />
                ))}
              </div>
            )}

            {/* Recent choices */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {[...currentLife.choices].reverse().slice(0, 15).map((rec, i) => (
                <div key={i} style={{
                  padding: '0.375rem 0', borderBottom: '1px solid var(--color-border)',
                  fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between',
                }}>
                  <span style={{ color: CATEGORY_COLORS[rec.choice.category] }}>
                    T{rec.tick}: {rec.choice.label}
                  </span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
                    {rec.trustAfter.toFixed(3)}
                  </span>
                </div>
              ))}
              {currentLife.choices.length === 0 && (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  No choices made yet. Each choice shapes your legacy.
                </div>
              )}
            </div>
          </div>

          {/* Cross-life patterns */}
          {lives.length > 1 && (
            <div style={{
              padding: '0.75rem', borderRadius: '0.75rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                Karma Across Lives
              </div>
              {lives.slice(0, -1).map((life, i) => {
                const eff = effectiveComposite(life.talent, life.training, life.temperament, life.ci);
                const tier = karmaTier(eff);
                const tierColor = tier === 'Honored' ? '#6ee7b7' : tier === 'Constrained' ? '#fca5a5' : '#fde68a';
                const coopCount = life.choices.filter(c => c.choice.category === 'cooperative').length;
                const selfishCount = life.choices.filter(c => c.choice.category === 'selfish').length;
                return (
                  <div key={i} style={{
                    padding: '0.5rem', borderRadius: '0.375rem', marginBottom: '0.375rem',
                    background: `${tierColor}08`, border: `1px solid ${tierColor}20`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ fontWeight: 600, color: tierColor }}>Life {life.lifeNumber}: {tier}</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{eff.toFixed(3)}</span>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                      {life.choices.length} choices ({coopCount} cooperative, {selfishCount} selfish) &middot; {life.deathCause}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Insight box */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-tertiary)', fontSize: '0.8rem',
            color: 'var(--color-text-muted)', lineHeight: 1.6,
          }}>
            {currentLife.lifeNumber === 1 && currentLife.choices.length < 3 && (
              <>
                <strong>Try this:</strong> Make a few cooperative choices, then switch to selfish ones.
                Watch how trust builds slowly but erodes quickly.
              </>
            )}
            {currentLife.lifeNumber === 1 && currentLife.choices.length >= 3 && currentLife.alive && (
              <>
                <strong>Notice:</strong> Selfish choices give immediate ATP but lower CI, which increases
                the cost of <em>all future actions</em>. The penalty compounds.
              </>
            )}
            {currentLife.lifeNumber > 1 && currentLife.alive && (
              <>
                <strong>Karma at work:</strong> Your starting conditions were set by Life {currentLife.lifeNumber - 1}&apos;s
                final trust. Every advantage or disadvantage you see now was <em>earned</em> in a previous life.
              </>
            )}
            {!currentLife.alive && currentLife.karmaTier === 'Constrained' && (
              <>
                <strong>The constraint trap:</strong> Low karma means lower starting CI, which means higher
                action costs, which means faster ATP drain, which means less time to rebuild trust.
                Breaking out requires deliberate, sustained cooperation.
              </>
            )}
            {!currentLife.alive && currentLife.karmaTier === 'Honored' && (
              <>
                <strong>Virtuous momentum:</strong> High karma means higher starting trust and CI, which means
                lower costs and more room to invest in training. Success compounds across lives.
              </>
            )}
          </div>
        </div>
      </div>

      {/* Personal Trust Profile - appears after completing at least one life */}
      {(() => {
        const profile = classifyProfile(lives);
        if (!profile) return null;

        const shareText = `${profile.emoji} I'm "${profile.archetype}" in the Karma Journey — ${Math.round(profile.coopRate * 100)}% cooperative across ${profile.totalLives} ${profile.totalLives === 1 ? 'life' : 'lives'}. What's your trust archetype?\n\nhttps://4-life-ivory.vercel.app/karma-journey`;

        return (
          <div style={{
            marginTop: '2rem', padding: '1.5rem', borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, rgba(110,231,183,0.05), rgba(253,224,71,0.05), rgba(252,165,165,0.05))',
            border: '1px solid rgba(110,231,183,0.2)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{profile.emoji}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                Your Trust Archetype
              </div>
              <div style={{
                fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem',
                background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {profile.archetype}
              </div>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, textAlign: 'center', marginBottom: '1rem' }}>
              {profile.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { label: 'Lives', value: `${profile.totalLives}`, color: '#93c5fd' },
                { label: 'Cooperative', value: `${Math.round(profile.coopRate * 100)}%`, color: '#6ee7b7' },
                { label: 'Selfish', value: `${Math.round(profile.selfishRate * 100)}%`, color: '#fca5a5' },
                { label: 'Peak Trust', value: profile.peakTrust.toFixed(2), color: '#fde68a' },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '0.5rem', borderRadius: '0.5rem', textAlign: 'center',
                  background: 'var(--color-bg-secondary)',
                }}>
                  <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>{stat.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'monospace', color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Insight */}
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)',
              fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.6,
              marginBottom: '1rem',
            }}>
              <strong style={{ color: 'var(--color-text-secondary)' }}>What this reveals:</strong>{' '}
              {profile.insight}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ text: shareText }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(shareText).then(() => {
                      alert('Copied to clipboard!');
                    }).catch(() => {});
                  }
                }}
                style={{
                  padding: '0.6rem 1.25rem', borderRadius: '0.5rem',
                  background: '#6ee7b720', border: '1px solid #6ee7b740',
                  color: '#6ee7b7', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                }}
              >
                Share Your Profile
              </button>
              <button
                onClick={resetAll}
                style={{
                  padding: '0.6rem 1.25rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.85rem',
                }}
              >
                Try a Different Strategy
              </button>
            </div>
          </div>
        );
      })()}

      {/* What's Next */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem', borderRadius: '0.75rem',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.08))',
        border: '1px solid rgba(56, 189, 248, 0.2)',
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>
          What&apos;s Next?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          <a href="/society-simulator" style={{
            padding: '0.75rem 1rem', borderRadius: '0.5rem', textDecoration: 'none',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            display: 'block',
          }}>
            <strong style={{ color: 'var(--color-sky)', fontSize: '0.9rem' }}>Society Simulator →</strong>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              Watch your strategy play out in a multi-agent society
            </p>
          </a>
          <a href="/playground" style={{
            padding: '0.75rem 1rem', borderRadius: '0.5rem', textDecoration: 'none',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            display: 'block',
          }}>
            <strong style={{ color: 'var(--color-emerald)', fontSize: '0.9rem' }}>Playground →</strong>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              Tweak parameters and run your own custom simulations
            </p>
          </a>
          <a href="/how-it-works" style={{
            padding: '0.75rem 1rem', borderRadius: '0.5rem', textDecoration: 'none',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            display: 'block',
          }}>
            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>How It Works →</strong>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              Understand the mechanics behind trust, energy, and rebirth{' '}
              <span style={{ opacity: 0.7 }}>(license suspension, in deployment)</span>
            </p>
          </a>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.75rem', textAlign: 'center' }}>
          Not sure what to explore? <a href="/explore-guide" style={{ color: 'var(--color-sky)' }}>Get a personalized recommendation →</a>
        </p>
      </div>

      <ExplorerNav currentPath="/karma-journey" />
      <RelatedConcepts currentPath="/karma-journey" />
    </div>
  );
}
