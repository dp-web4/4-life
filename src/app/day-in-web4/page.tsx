'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

/* ─── Types ────────────────────────────────────────────── */

interface ScenarioChoice {
  label: string;
  icon: string;
  atpCost: number;
  atpEarned: number;
  trustDelta: number;
  todayInternet: string;
  web4Result: string;
  concept: string;      // which Web4 concept this illustrates
  conceptLink: string;  // learn more link
}

interface Scenario {
  time: string;
  title: string;
  icon: string;
  setup: string;
  choices: ScenarioChoice[];
}

interface ChoiceRecord {
  scenarioIndex: number;
  choiceIndex: number;
  atpCost: number;
  atpEarned: number;
  trustDelta: number;
}

/* ─── Scenario Data ────────────────────────────────────── */

const SCENARIOS: Scenario[] = [
  {
    time: '7:30 AM',
    title: 'Your Phone Wakes Up',
    icon: '📱',
    setup: 'You pick up your phone. On today\'s internet, you enter a password or use Face ID to unlock your apps. In Web4, something different happens — your device\'s security chip quietly proves it\'s really you. No password. No centralized login server. Your identity is grounded.',
    choices: [
      {
        label: 'Open social feed',
        icon: '📰',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You scroll past bots, ads, and engagement bait. You have no idea which accounts are real.',
        web4Result: 'Every post cost the author energy to create. The bots are gone — spam is economically irrational. What remains is real.',
        concept: 'Verified Presence (LCT)',
        conceptLink: '/lct-explainer',
      },
      {
        label: 'Check messages',
        icon: '💬',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Your inbox has 12 messages. 9 are spam. You delete them manually.',
        web4Result: 'Your inbox has 3 messages. Each sender spent energy to message you. Zero spam — it costs too much.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
    ],
  },
  {
    time: '9:00 AM',
    title: 'Someone Asks for Help',
    icon: '❓',
    setup: 'On a community forum, someone asks: "How do I fix a leaky kitchen faucet?" You actually know the answer — you fixed yours last month.',
    choices: [
      {
        label: 'Write a detailed answer',
        icon: '✍️',
        atpCost: 8,
        atpEarned: 20,
        trustDelta: 0.03,
        todayInternet: 'You spend 10 minutes writing a great answer. It gets buried under SEO spam and AI-generated filler.',
        web4Result: 'Your answer costs 8 ATP to post. Three people mark it helpful — you earn 20 ATP back and your trust score rises. Quality is rewarded.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
      {
        label: 'Post a quick one-liner',
        icon: '💨',
        atpCost: 3,
        atpEarned: 5,
        trustDelta: 0.01,
        todayInternet: 'Your quick reply gets lost in a sea of similar low-effort responses.',
        web4Result: 'Low-cost post, small return. Not harmful, but the community doesn\'t reward it much. You break even.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
      {
        label: 'Scroll past',
        icon: '👀',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'The question gets 47 joke replies and no real answer. The person gives up.',
        web4Result: 'Others who DO answer earn trust and energy. You don\'t lose anything, but you don\'t gain either. Lurking is free.',
        concept: 'Consequences',
        conceptLink: '/aliveness',
      },
    ],
  },
  {
    time: '11:00 AM',
    title: 'Hiring a Freelancer',
    icon: '💼',
    setup: 'You need a logo designed. Two freelancers apply. One has a shiny portfolio. The other has a 2-year Web4 trust history with 94% client satisfaction across 156 projects.',
    choices: [
      {
        label: 'Hire the verified freelancer',
        icon: '✅',
        atpCost: 5,
        atpEarned: 0,
        trustDelta: 0.02,
        todayInternet: 'You check reviews — but are they real? 30% of online reviews are fake. You\'re gambling.',
        web4Result: 'Their trust tensor shows Talent: 0.91, Training: 0.87, Temperament: 0.94. These scores were earned across 156 real interactions. Unfakeable.',
        concept: 'Trust Tensor (T3)',
        conceptLink: '/trust-tensor',
      },
      {
        label: 'Take a chance on the new designer',
        icon: '🎲',
        atpCost: 5,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Could be amazing. Could be a scam account made yesterday. You have no way to know.',
        web4Result: 'They\'re new, so their trust scores are neutral (0.5). Low risk if the project is small — everyone starts somewhere. But you can see they\'re real.',
        concept: 'Trust Tensor (T3)',
        conceptLink: '/trust-tensor',
      },
    ],
  },
  {
    time: '1:00 PM',
    title: 'Lunch Decision',
    icon: '🍽️',
    setup: 'You\'re looking for a restaurant nearby. One place has 4.8 stars with 2,000 reviews. Another has 4.6 stars with 89 reviews.',
    choices: [
      {
        label: 'Go with the popular choice',
        icon: '⭐',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Half those reviews are from paid review farms. The "4.8 stars" is manufactured. The food is mediocre.',
        web4Result: 'Each review cost the reviewer ATP to post. 2,000 real reviews, each from a verified person who actually spent energy writing it. The rating is trustworthy.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
      {
        label: 'Try the hidden gem',
        icon: '💎',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Fewer reviews, but are even those real? No way to tell.',
        web4Result: '89 reviews, but each reviewer has a visible trust history. You can see they\'re regulars who review honestly. Quality over quantity.',
        concept: 'Coherence Index (CI)',
        conceptLink: '/coherence-index',
      },
      {
        label: 'Leave a review after eating',
        icon: '📝',
        atpCost: 5,
        atpEarned: 8,
        trustDelta: 0.02,
        todayInternet: 'Your honest review competes with hundreds of fake ones. Impact: negligible.',
        web4Result: 'Your review costs 5 ATP. If others find it helpful, you earn 8 ATP back. Over time, consistently helpful reviewers become trusted voices. Your reviews carry weight.',
        concept: 'Consequences',
        conceptLink: '/aliveness',
      },
    ],
  },
  {
    time: '3:30 PM',
    title: 'A Stranger Needs Help',
    icon: '🤝',
    setup: 'Someone new to the platform asks a basic question that\'s been answered a thousand times. The community is split: some want to help, others are tired of repeating themselves.',
    choices: [
      {
        label: 'Welcome them and help',
        icon: '🌱',
        atpCost: 4,
        atpEarned: 10,
        trustDelta: 0.03,
        todayInternet: 'You help, but trolls pile on with "just Google it." The newcomer leaves. Community loses another potential contributor.',
        web4Result: 'Helping costs 4 ATP. But the newcomer marks you helpful — 10 ATP back. Trolls can\'t afford to pile on because every hostile reply costs THEM energy. Constructive behavior is the path of least resistance.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
      {
        label: 'Link to existing answer',
        icon: '🔗',
        atpCost: 2,
        atpEarned: 3,
        trustDelta: 0.01,
        todayInternet: 'Efficient, but feels cold. The newcomer might not come back.',
        web4Result: 'Low effort, low cost (2 ATP), small return. Efficient and nobody\'s hurt. The original answer author earns ATP too — good content keeps paying forward.',
        concept: 'Consequences',
        conceptLink: '/aliveness',
      },
      {
        label: 'Ignore it',
        icon: '🚶',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'The question gets no answer. Or worse, a wrong one from someone guessing.',
        web4Result: 'No cost, no gain. But others who DO help build trust and earn energy. Over time, helpers become the community\'s leaders — not because they were appointed, but because they earned it.',
        concept: 'Trust Tensor (T3)',
        conceptLink: '/trust-tensor',
      },
    ],
  },
  {
    time: '6:00 PM',
    title: 'Someone Lies About You',
    icon: '😠',
    setup: 'A competitor posts a false accusation: "This person scammed me!" It\'s completely fabricated. In today\'s internet, this could ruin your reputation overnight.',
    choices: [
      {
        label: 'Report and let the record speak',
        icon: '📊',
        atpCost: 3,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You report it, but platforms are slow. The lie goes viral. Even after removal, screenshots circulate forever. Your reputation is damaged.',
        web4Result: 'Your 2-year trust history speaks louder than one accusation. The accuser\'s coherence drops — their behavior is inconsistent with their history. The community sees the full picture, not just the headline.',
        concept: 'Coherence Index (CI)',
        conceptLink: '/coherence-index',
      },
      {
        label: 'Fight back publicly',
        icon: '⚔️',
        atpCost: 10,
        atpEarned: 0,
        trustDelta: -0.01,
        todayInternet: 'Public fights just amplify the drama. Both of you look bad. The algorithm loves conflict.',
        web4Result: 'Fighting costs 10 ATP and slightly hurts your trust. But here\'s the key: your accuser\'s CI (behavioral consistency) drops every time they act out of character. If they\'re lying, the math catches up to them.',
        concept: 'Coherence Index (CI)',
        conceptLink: '/coherence-index',
      },
    ],
  },
  {
    time: '9:00 PM',
    title: 'End of Day',
    icon: '🌙',
    setup: 'You check your trust profile before bed. Every interaction today — the help you gave, the reviews you wrote, the connections you made — is part of your permanent record.',
    choices: [
      {
        label: 'Review your trust profile',
        icon: '📈',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You have a follower count. A like count. Numbers that mean nothing about who you actually are.',
        web4Result: 'Your profile shows real dimensions: how skilled you are (Talent), how reliable you are (Training), how you treat people (Temperament). Built from hundreds of real interactions. Not likes — trust.',
        concept: 'Trust Tensor (T3)',
        conceptLink: '/trust-tensor',
      },
      {
        label: 'Plan tomorrow',
        icon: '📋',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Tomorrow looks the same. More spam. More fake reviews. More guessing who to trust.',
        web4Result: 'Tomorrow, your trust from today carries forward. The helpful answer you wrote will keep earning ATP as people find it useful. Your reputation compounds. Good days build on each other.',
        concept: 'Consequences',
        conceptLink: '/aliveness',
      },
    ],
  },
];

/* ─── Component ────────────────────────────────────────── */

export default function DayInWeb4Page() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [choiceRecords, setChoiceRecords] = useState<ChoiceRecord[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const scenario = SCENARIOS[currentScenario];
  const isComplete = currentScenario >= SCENARIOS.length;

  // Running totals
  const totalAtpSpent = choiceRecords.reduce((s, r) => s + r.atpCost, 0);
  const totalAtpEarned = choiceRecords.reduce((s, r) => s + r.atpEarned, 0);
  const totalTrustDelta = choiceRecords.reduce((s, r) => s + r.trustDelta, 0);
  const netAtp = 100 + totalAtpEarned - totalAtpSpent; // start with 100
  const currentTrust = Math.min(1, 0.5 + totalTrustDelta); // start at 0.5

  const handleChoice = useCallback((choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowComparison(true);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedChoice === null) return;
    const choice = SCENARIOS[currentScenario].choices[selectedChoice];
    setChoiceRecords(prev => [...prev, {
      scenarioIndex: currentScenario,
      choiceIndex: selectedChoice,
      atpCost: choice.atpCost,
      atpEarned: choice.atpEarned,
      trustDelta: choice.trustDelta,
    }]);
    setSelectedChoice(null);
    setShowComparison(false);
    setCurrentScenario(prev => prev + 1);
  }, [currentScenario, selectedChoice]);

  const handleRestart = useCallback(() => {
    setCurrentScenario(0);
    setChoiceRecords([]);
    setSelectedChoice(null);
    setShowComparison(false);
  }, []);

  return (
    <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-300">
          ← Home
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        A Day in Web4
      </h1>
      <p className="text-gray-400 mb-6 text-lg">
        What would your day look like if the internet had trust built in?
        Walk through 7 real scenarios and see the difference.
      </p>

      {/* Progress Timeline */}
      {!isComplete && (
        <div className="mb-8">
          <div className="flex items-center gap-1 mb-3">
            {SCENARIOS.map((s, i) => (
              <div key={i} className="flex items-center" style={{ flex: 1 }}>
                <div
                  className="flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: '2rem', height: '2rem',
                    background: i < currentScenario
                      ? 'rgba(56, 189, 248, 0.3)'
                      : i === currentScenario
                        ? 'rgba(56, 189, 248, 0.8)'
                        : 'rgba(55, 65, 81, 0.5)',
                    color: i <= currentScenario ? '#fff' : '#6b7280',
                    transition: 'all 0.3s',
                  }}
                  title={s.time}
                >
                  {s.icon}
                </div>
                {i < SCENARIOS.length - 1 && (
                  <div style={{
                    flex: 1, height: '2px',
                    background: i < currentScenario ? 'rgba(56, 189, 248, 0.4)' : 'rgba(55, 65, 81, 0.4)',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>
          {/* ATP/Trust tracker */}
          <div className="flex gap-4 text-sm">
            <span className="text-gray-500">
              Energy: <span className="text-sky-400 font-mono font-bold">{netAtp}</span> ATP
            </span>
            <span className="text-gray-500">
              Trust: <span className="text-emerald-400 font-mono font-bold">{currentTrust.toFixed(2)}</span>
            </span>
          </div>
        </div>
      )}

      {/* Current Scenario or Completion */}
      {isComplete ? (
        <DaySummary
          records={choiceRecords}
          netAtp={netAtp}
          currentTrust={currentTrust}
          totalAtpSpent={totalAtpSpent}
          totalAtpEarned={totalAtpEarned}
          onRestart={handleRestart}
        />
      ) : (
        <div>
          {/* Time & Title */}
          <div className="mb-4">
            <span className="text-sky-400 text-sm font-mono">{scenario.time}</span>
            <h2 className="text-xl font-bold mt-1">
              {scenario.icon} {scenario.title}
            </h2>
          </div>

          {/* Setup */}
          <p className="text-gray-300 leading-relaxed mb-6">
            {scenario.setup}
          </p>

          {/* Choices or Comparison */}
          {!showComparison ? (
            <div className="space-y-3">
              <p className="text-gray-500 text-sm uppercase tracking-wide font-semibold">What do you do?</p>
              {scenario.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(i)}
                  className="w-full text-left rounded-xl border border-gray-700 hover:border-sky-500 transition-colors p-4"
                  style={{ background: 'rgba(17, 24, 39, 0.6)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{choice.icon}</span>
                    <span className="text-gray-200 font-medium">{choice.label}</span>
                    {(choice.atpCost > 0 || choice.atpEarned > 0) && (
                      <span className="ml-auto text-xs text-gray-500 font-mono">
                        {choice.atpCost > 0 && <span className="text-orange-400">-{choice.atpCost}</span>}
                        {choice.atpCost > 0 && choice.atpEarned > 0 && ' / '}
                        {choice.atpEarned > 0 && <span className="text-emerald-400">+{choice.atpEarned}</span>}
                        {' ATP'}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : selectedChoice !== null && (
            <ComparisonView
              choice={scenario.choices[selectedChoice]}
              onNext={handleNext}
              isLast={currentScenario === SCENARIOS.length - 1}
            />
          )}
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-12 pt-6 border-t border-gray-800 flex flex-wrap gap-4 text-sm text-gray-500">
        <Link href="/why-web4" className="hover:text-sky-400 transition-colors">Why Web4?</Link>
        <Link href="/first-contact" className="hover:text-sky-400 transition-colors">First Contact</Link>
        <Link href="/playground" className="hover:text-sky-400 transition-colors">Playground</Link>
        <Link href="/society-simulator" className="hover:text-sky-400 transition-colors">Society Simulator</Link>
      </div>

      <noscript>
        <div style={{ padding: '2rem', color: '#d1d5db' }}>
          <h2>A Day in Web4 — What Would Change?</h2>
          <p>This interactive walkthrough requires JavaScript to run. Here&apos;s the summary:</p>
          <p>Web4 changes your daily internet experience by making identity hardware-bound (no fake accounts),
          every action cost energy (no spam), and consequences permanent (no fresh starts).
          The result: reviews you can trust, communities that self-moderate, and reputations that mean something.</p>
          <p><a href="/tldr">Read the 2-minute overview instead →</a></p>
        </div>
      </noscript>
    </div>
  );
}

/* ─── Comparison View ──────────────────────────────────── */

function ComparisonView({
  choice,
  onNext,
  isLast,
}: {
  choice: ScenarioChoice;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div className="space-y-4">
      {/* Today's Internet */}
      <div className="rounded-xl border border-gray-700 p-4" style={{ background: 'rgba(127, 29, 29, 0.08)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Today&apos;s Internet</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{choice.todayInternet}</p>
      </div>

      {/* Web4 */}
      <div className="rounded-xl border border-sky-800/50 p-4" style={{ background: 'rgba(14, 116, 144, 0.08)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">In Web4</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{choice.web4Result}</p>
        <div className="mt-3 flex items-center gap-3">
          {choice.atpCost > 0 && (
            <span className="text-xs bg-orange-900/30 text-orange-400 px-2 py-0.5 rounded-full">
              -{choice.atpCost} ATP
            </span>
          )}
          {choice.atpEarned > 0 && (
            <span className="text-xs bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded-full">
              +{choice.atpEarned} ATP
            </span>
          )}
          {choice.trustDelta !== 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              choice.trustDelta > 0
                ? 'bg-emerald-900/30 text-emerald-400'
                : 'bg-red-900/30 text-red-400'
            }`}>
              {choice.trustDelta > 0 ? '+' : ''}{choice.trustDelta.toFixed(2)} Trust
            </span>
          )}
          <Link
            href={choice.conceptLink}
            className="ml-auto text-xs text-sky-500 hover:text-sky-400 transition-colors"
          >
            Learn: {choice.concept} →
          </Link>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl font-semibold text-white transition-colors"
        style={{
          background: 'linear-gradient(135deg, #0284c7, #7c3aed)',
        }}
      >
        {isLast ? 'See your day summary →' : 'Next scenario →'}
      </button>
    </div>
  );
}

/* ─── Day Summary ──────────────────────────────────────── */

function DaySummary({
  records,
  netAtp,
  currentTrust,
  totalAtpSpent,
  totalAtpEarned,
  onRestart,
}: {
  records: ChoiceRecord[];
  netAtp: number;
  currentTrust: number;
  totalAtpSpent: number;
  totalAtpEarned: number;
  onRestart: () => void;
}) {
  // Classify the day
  const helpfulChoices = records.filter(r => {
    const choice = SCENARIOS[r.scenarioIndex].choices[r.choiceIndex];
    return choice.trustDelta > 0.02;
  }).length;
  const passiveChoices = records.filter(r => {
    const choice = SCENARIOS[r.scenarioIndex].choices[r.choiceIndex];
    return choice.atpCost === 0 && choice.atpEarned === 0;
  }).length;

  let dayType: { label: string; emoji: string; description: string };
  if (helpfulChoices >= 4) {
    dayType = {
      label: 'Community Builder',
      emoji: '🌟',
      description: 'You invested energy in others all day. In Web4, this kind of day compounds — your trust rises, your energy comes back, and the community is stronger for it.',
    };
  } else if (passiveChoices >= 4) {
    dayType = {
      label: 'Observer',
      emoji: '👁️',
      description: 'You watched more than you participated. That\'s fine — lurking is free in Web4. But builders earn trust and energy. Tomorrow you might want to jump in.',
    };
  } else if (totalAtpSpent > totalAtpEarned) {
    dayType = {
      label: 'Big Spender',
      emoji: '⚡',
      description: 'You spent more energy than you earned. In Web4, that\'s sustainable for a while — everyone starts with a budget. But long-term, you need to create value to stay alive.',
    };
  } else {
    dayType = {
      label: 'Balanced Participant',
      emoji: '⚖️',
      description: 'You mixed contributing with consuming. In Web4, this is sustainable — you\'re earning back what you spend while building a real reputation.',
    };
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{dayType.emoji} Your Day: {dayType.label}</h2>
      <p className="text-gray-400 mb-6">{dayType.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-gray-700 p-4 text-center" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
          <div className="text-2xl font-bold font-mono text-sky-400">{netAtp}</div>
          <div className="text-xs text-gray-500 mt-1">Energy (ATP)</div>
          <div className="text-xs text-gray-600 mt-0.5">
            spent {totalAtpSpent} · earned {totalAtpEarned}
          </div>
        </div>
        <div className="rounded-xl border border-gray-700 p-4 text-center" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
          <div className="text-2xl font-bold font-mono text-emerald-400">{currentTrust.toFixed(2)}</div>
          <div className="text-xs text-gray-500 mt-1">Trust Score</div>
          <div className="text-xs text-gray-600 mt-0.5">
            started at 0.50 · {totalAtpSpent > 0 ? `+${(currentTrust - 0.5).toFixed(2)} today` : 'unchanged'}
          </div>
        </div>
      </div>

      {/* Timeline recap */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Timeline</h3>
        <div className="space-y-2">
          {records.map((r, i) => {
            const s = SCENARIOS[r.scenarioIndex];
            const c = s.choices[r.choiceIndex];
            return (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-gray-600 font-mono w-16 shrink-0">{s.time}</span>
                <span>{s.icon}</span>
                <span className="text-gray-400">{c.label}</span>
                <span className="ml-auto flex gap-2 text-xs font-mono">
                  {c.atpCost > 0 && <span className="text-orange-400">-{c.atpCost}</span>}
                  {c.atpEarned > 0 && <span className="text-emerald-400">+{c.atpEarned}</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insight */}
      <div className="rounded-xl border border-sky-800/50 p-5 mb-6" style={{ background: 'rgba(14, 116, 144, 0.08)' }}>
        <p className="text-sky-400 font-semibold mb-2">The difference?</p>
        <p className="text-gray-300 text-sm leading-relaxed">
          On today&apos;s internet, your good behavior is invisible. Spammers pay nothing. Fake reviews
          look identical to real ones. Your reputation resets with every new platform.
        </p>
        <p className="text-gray-300 text-sm leading-relaxed mt-2">
          In Web4, <strong>every action has weight</strong>. The energy cost filters out noise.
          The trust record rewards consistency. The permanent history means your good days
          actually compound into something real.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRestart}
          className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors text-sm"
        >
          Try different choices
        </button>
        <Link
          href="/karma-journey"
          className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}
        >
          Play the full Karma Journey →
        </Link>
        <Link
          href="/your-internet"
          className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors text-sm"
        >
          What would change for you? →
        </Link>
      </div>
    </div>
  );
}
