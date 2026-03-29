'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';
import { saveDayInWeb4Result, trackPageVisit } from '@/lib/exploration';
import WireframeFrame from '@/components/WireframeFrame';

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
    time: '4:30 PM',
    title: 'You\'re the Newcomer',
    icon: '🌱',
    setup: 'You just joined a new community. Your trust is 0.50 — neutral. You see established members with trust scores of 0.85. Their posts get more visibility, they pay lower action costs, and partners seek them out. You feel like an outsider.',
    choices: [
      {
        label: 'Make a quality contribution',
        icon: '✨',
        atpCost: 10,
        atpEarned: 15,
        trustDelta: 0.02,
        todayInternet: 'You post something great. It gets buried because you have zero followers. Nobody sees it.',
        web4Result: 'Your post costs 10 ATP (40% more than veterans pay — you have no consistency history yet). But if it\'s genuinely useful, recipients confirm it and you earn 15 ATP back. Two more quality posts and your action costs start dropping. The system rewards you for substance, not seniority.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
      {
        label: 'Watch and learn first',
        icon: '👀',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Lurking is fine, but you\'re invisible. No reputation builds.',
        web4Result: 'Lurking costs nothing. But unlike today\'s platforms, observing high-trust members teaches you what quality looks like in this community. When you\'re ready, your first contribution benefits from that understanding.',
        concept: 'Trust Tensor (T3)',
        conceptLink: '/trust-tensor',
      },
      {
        label: 'Try to game the system',
        icon: '🎭',
        atpCost: 8,
        atpEarned: 0,
        trustDelta: -0.03,
        todayInternet: 'You create multiple accounts and upvote yourself. Works great. Happens millions of times daily.',
        web4Result: 'Each identity costs real hardware. Your low-quality post earns zero ATP but costs 8. Your trust drops to 0.47. Two more attempts and you\'re below the 0.5 threshold — effectively invisible. Gaming costs more than contributing honestly.',
        concept: 'Coherence Index (CI)',
        conceptLink: '/coherence-index',
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
    time: '8:00 PM',
    title: 'You Upgrade Your Phone',
    icon: '📲',
    setup: 'Your new phone arrived today. On the current internet, you spend an hour logging back into everything, resetting two-factor auth, and hoping you remember all your passwords. In Web4, you have witnesses.',
    choices: [
      {
        label: 'Transfer identity via device witnesses',
        icon: '🔄',
        atpCost: 2,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'Hours of password resets, re-entering SMS codes, re-verifying accounts. Some services lock you out for days. If you lost your phone, some accounts may be gone forever.',
        web4Result: 'Your laptop and tablet already witness for you. They confirm: "Yes, this new phone belongs to the same person." Your identity transfers in seconds. Two of three devices agree — that\'s a quorum. All your trust, history, and ATP move with you seamlessly.',
        concept: 'Linked Context Token (LCT)',
        conceptLink: '/lct-explainer',
      },
      {
        label: 'What if I lost all my devices?',
        icon: '🆘',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'If you lose your phone and don\'t have backup codes, you may permanently lose access to accounts. Support tickets take weeks.',
        web4Result: 'Web4 uses m-of-n recovery: trusted contacts you designated in advance can vouch for you, similar to how a bank verifies identity in person. It\'s slower (by design — speed would help attackers), but your identity and trust history are never truly lost.',
        concept: 'Linked Context Token (LCT)',
        conceptLink: '/lct-explainer',
      },
    ],
  },
  {
    time: '7:30 PM',
    title: 'You Drop Your Phone',
    icon: '📱',
    setup: 'Your phone slips out of your pocket and shatters on the sidewalk. On today\'s internet, you\'d reset passwords for dozens of accounts. In Web4, your identity doesn\'t live in one device.',
    choices: [
      {
        label: 'Use your backup device',
        icon: '💻',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You spend the evening resetting passwords, re-enabling 2FA, and hoping you didn\'t lose access to any accounts. Some services make you wait 48 hours for "security."',
        web4Result: 'Your laptop already witnessed your identity — it\'s part of your device constellation. Open the Web4 app on your laptop, confirm with biometrics, and you\'re back. Your trust, reputation, and energy are untouched. When you get a new phone, your laptop vouches for it.',
        concept: 'Verified Presence (LCT)',
        conceptLink: '/lct-explainer',
      },
      {
        label: 'Get a new phone first',
        icon: '📱',
        atpCost: 2,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You buy a new phone and spend hours reinstalling apps, logging in everywhere, and discovering which accounts you\'ve been locked out of.',
        web4Result: 'Install the Web4 app on your new phone. Your other devices (laptop, tablet) vouch for it — a "witness recovery" that takes about 60 seconds. The broken phone is automatically revoked. Your identity is restored, not recreated. It costs a small amount of ATP (2) to register the new device.',
        concept: 'Device Recovery (LCT)',
        conceptLink: '/lct-explainer',
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

  useEffect(() => { trackPageVisit('day-in-web4'); }, []);

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
      <Breadcrumbs currentPath="/day-in-web4" />

      <h1 className="text-3xl font-bold mb-2">
        A Day in Web4
      </h1>
      <p className="text-gray-400 mb-4 text-lg">
        What would your day look like if the internet had trust built in?
        Walk through 8 real scenarios and see the difference.
      </p>

      {/* Your First 5 Minutes — Onboarding Walkthrough */}
      <details className="mb-8 rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.4)' }}>
        <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-800/30 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
          <span className="text-lg">🚀</span>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-sky-400 font-medium">But what does setting up Web4 look like?</span>
            <span className="text-xs text-gray-500 ml-2">— Your first 5 minutes</span>
          </div>
          <span className="text-gray-500 text-sm shrink-0">▶</span>
        </summary>

        <div className="px-4 pb-4 pt-2 space-y-4">
          <p className="text-gray-400 text-sm">
            Before your day starts, you need to set up once. Here&apos;s what that looks like — no crypto wallet, no blockchain, no 24-word seed phrase.
          </p>

          {/* Step 1: Install */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 1</span>
              <span className="text-sm text-gray-300 font-medium">Download the app</span>
              <span className="text-xs text-gray-600 ml-auto">~30 seconds</span>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-xl">🔐</div>
                <div>
                  <div className="text-sm text-gray-200 font-medium">Web4 Identity</div>
                  <div className="text-xs text-gray-500">Your trust wallet — not a crypto wallet</div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                One app. Works like a password manager, but instead of storing passwords, it manages your trust identity across every Web4-enabled service. Install it like any other app.
              </p>
            </div>
          </div>

          {/* Step 2: Device binding */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 2</span>
              <span className="text-sm text-gray-300 font-medium">Bind your device</span>
              <span className="text-xs text-gray-600 ml-auto">~60 seconds</span>
            </div>
            <div className="p-3">
              <div className="rounded-lg bg-gray-900/50 border border-gray-800 p-3 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">Security chip detected</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Device</span>
                    <span className="text-gray-300">iPhone 15 (Secure Enclave)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trust ceiling</span>
                    <span className="text-emerald-400">0.85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Action required</span>
                    <span className="text-gray-300">Face ID to confirm</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                The app finds your phone&apos;s security chip automatically. One biometric scan (Face ID, fingerprint) and your device becomes your identity anchor. No seed phrases to write down. No keys to lose.
              </p>
            </div>
          </div>

          {/* Step 3: Join a community */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 3</span>
              <span className="text-sm text-gray-300 font-medium">Join your first community</span>
              <span className="text-xs text-gray-600 ml-auto">~2 minutes</span>
            </div>
            <div className="p-3">
              <div className="space-y-2 mb-2">
                {[
                  { name: 'Local Photographers', members: '342 members', trust: '0.78 avg', icon: '📸' },
                  { name: 'Home Cooking', members: '1,204 members', trust: '0.82 avg', icon: '🍳' },
                  { name: 'Neighborhood Help', members: '89 members', trust: '0.91 avg', icon: '🏘️' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-900/30 px-3 py-2 text-xs">
                    <span>{c.icon}</span>
                    <span className="text-gray-200 font-medium">{c.name}</span>
                    <span className="text-gray-600 ml-auto">{c.members}</span>
                    <span className="text-emerald-400 font-mono">{c.trust}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Browse communities or get invited by someone you know. You start with trust 0.50 (neutral) and 100 ATP (energy). Everyone starts equal — your reputation builds from your actions, not your join date.
              </p>
            </div>
          </div>

          {/* Step 4: First interaction */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 4</span>
              <span className="text-sm text-gray-300 font-medium">Your first action</span>
              <span className="text-xs text-gray-600 ml-auto">~1 minute</span>
            </div>
            <div className="p-3">
              <div className="rounded-lg bg-gray-900/50 border border-gray-800 p-3 mb-2">
                <div className="text-xs text-gray-500 mb-2">Posting to Neighborhood Help...</div>
                <div className="bg-gray-800/50 rounded p-2 text-xs text-gray-300 mb-2">
                  &quot;Hi everyone! Just moved to Oak Street. Anyone know a good plumber? Our kitchen sink has been leaking.&quot;
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-orange-400">-3 ATP</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">Your trust: <span className="text-sky-400 font-mono">0.50</span> (new member)</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">Post visible to: <span className="text-gray-300">89 members</span></span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Your first post costs a small amount of energy. People respond, you thank them — and your trust starts building. Within a week of genuine participation, you&apos;ll feel the difference: people trust your recommendations, your posts cost less, and your replies carry weight.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-sky-950/20 border border-sky-800/30 p-3">
            <p className="text-xs text-sky-300">
              <strong>That&apos;s it.</strong> No blockchain to sync. No gas fees. No wallet addresses to copy.
              Install an app, scan your face, join a community, say hello. The rest unfolds through the day below.
            </p>
          </div>

          <p className="text-xs text-gray-600 italic">
            This is a conceptual walkthrough — Web4 is active research. The real onboarding will be designed by the communities that build on it.
            {' '}<Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">See honest limitations →</Link>
          </p>
        </div>
      </details>

      {/* Wireframe preview teaser — links to visual mockups below */}
      <a
        href="#wireframes"
        className="flex items-center gap-3 rounded-xl border border-gray-700 hover:border-sky-500 transition-colors p-3 mb-6"
        style={{ background: 'rgba(17, 24, 39, 0.6)', textDecoration: 'none' }}
      >
        <div className="flex gap-1.5 shrink-0">
          <div className="w-8 h-6 rounded border border-gray-600 flex items-center justify-center text-[10px]">📱</div>
          <div className="w-8 h-6 rounded border border-gray-600 flex items-center justify-center text-[10px]">💼</div>
          <div className="w-8 h-6 rounded border border-gray-600 flex items-center justify-center text-[10px]">⭐</div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm text-sky-400 font-medium">See what the interface would look like</span>
          <span className="text-xs text-gray-500 ml-2">— 5 app mockups below</span>
        </div>
        <span className="text-gray-500 text-sm shrink-0">↓</span>
      </a>

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

      {/* What Would This Look Like? — Conceptual UI Wireframes */}
      <section id="wireframes" className="mt-16 pt-8 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-2">What Would This Actually Look Like?</h2>
        <p className="text-gray-400 mb-8 text-sm">
          The scenarios above describe the <em>experience</em>. But what would the interface actually look like?
          Here are five app mockups — inbox, hiring, reviews, social feed, and marketplace.
        </p>

        {/* Wireframe 1: Inbox */}
        <WireframeFrame title="Web4 Mail" url="mail.web4.local/inbox">
          <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
            {/* Header bar */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-sm font-medium text-gray-300">Messages</span>
              <span className="text-xs text-gray-500 ml-auto">3 new</span>
            </div>
            {/* Messages */}
            <div className="divide-y divide-gray-800">
              {[
                { from: 'Maya Chen', trust: 0.87, cost: '2 ATP', subject: 'Re: Kitchen faucet fix', time: '9:12 AM', color: 'text-emerald-400' },
                { from: 'Dev Community', trust: 0.91, cost: '5 ATP', subject: 'Your answer was marked helpful (+20 ATP)', time: '9:45 AM', color: 'text-emerald-400' },
                { from: 'New Contact', trust: 0.43, cost: '8 ATP', subject: 'Freelance inquiry', time: '10:30 AM', color: 'text-amber-400' },
              ].map((msg, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                    {msg.from[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-200">{msg.from}</span>
                      <span className={`text-xs font-mono ${msg.color}`}>
                        {msg.trust.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-gray-600">{msg.time}</div>
                    <div className="text-xs text-gray-600">cost sender {msg.cost}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
              0 spam — messages cost energy to send. Bots can&apos;t afford to reach you.
            </div>
          </div>
        </WireframeFrame>

        {/* Wireframe 2: Hiring Dashboard */}
        <WireframeFrame title="Web4 Talent" url="talent.web4.local/project/logo-design">
          <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-sm font-medium text-gray-300">Applicants — Logo Design</span>
              <span className="text-xs text-gray-500 ml-auto">2 candidates</span>
            </div>
            <div className="p-4 space-y-3">
              {/* Candidate 1 */}
              <div className="rounded-lg border border-gray-700 p-3" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-200 text-sm">Sarah K.</span>
                  <span className="text-xs text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full">Verified — 156 projects</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <div className="text-gray-500 mb-0.5">Talent</div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-sky-400" style={{ width: '91%' }} /></div>
                    <div className="text-sky-400 font-mono mt-0.5">0.91</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-0.5">Training</div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-sky-400" style={{ width: '87%' }} /></div>
                    <div className="text-sky-400 font-mono mt-0.5">0.87</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-0.5">Temperament</div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-sky-400" style={{ width: '94%' }} /></div>
                    <div className="text-sky-400 font-mono mt-0.5">0.94</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Scores from real interactions, verified by hardware-bound identity. Can&apos;t be faked.</p>
              </div>
              {/* Candidate 2 */}
              <div className="rounded-lg border border-gray-700 p-3" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-200 text-sm">Alex M.</span>
                  <span className="text-xs text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full">New — 3 projects</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <div className="text-gray-500 mb-0.5">Talent</div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-amber-400" style={{ width: '62%' }} /></div>
                    <div className="text-amber-400 font-mono mt-0.5">0.62</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-0.5">Training</div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-amber-400" style={{ width: '55%' }} /></div>
                    <div className="text-amber-400 font-mono mt-0.5">0.55</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-0.5">Temperament</div>
                    <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden"><div className="h-full rounded-full bg-amber-400" style={{ width: '70%' }} /></div>
                    <div className="text-amber-400 font-mono mt-0.5">0.70</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Limited history — lower cost, but you&apos;re taking more of a risk. Trust builds with time.</p>
              </div>
            </div>
            <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
              No fake portfolios. No bought reviews. Trust scores earned through 156 real projects.
            </div>
          </div>
        </WireframeFrame>

        {/* Wireframe 3: Review Page */}
        <WireframeFrame title="Web4 Reviews" url="reviews.web4.local/golden-dragon">
          <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm font-medium text-gray-300">Golden Dragon — 89 reviews</span>
              <span className="text-xs text-amber-400 font-mono ml-auto">4.6 ★</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 shrink-0 mt-0.5">R</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-200">Rachel T.</span>
                    <span className="text-xs font-mono text-emerald-400">0.83</span>
                    <span className="text-xs text-gray-600">· cost 5 ATP to post</span>
                  </div>
                  <p className="text-xs text-gray-400">&quot;The dan dan noodles are incredible. We&apos;ve been coming here monthly for two years.&quot;</p>
                </div>
                <span className="text-xs text-amber-400 shrink-0">★★★★★</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 shrink-0 mt-0.5">J</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-200">James W.</span>
                    <span className="text-xs font-mono text-emerald-400">0.71</span>
                    <span className="text-xs text-gray-600">· cost 5 ATP to post</span>
                  </div>
                  <p className="text-xs text-gray-400">&quot;Good food, slow service on weekends. Weekday lunch is the move.&quot;</p>
                </div>
                <span className="text-xs text-amber-400 shrink-0">★★★★</span>
              </div>
            </div>
            <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
              Every review cost the reviewer energy. No review farms — each reviewer has a verifiable trust history.
            </div>
          </div>
        </WireframeFrame>

        {/* Wireframe 4: Social Feed */}
        <WireframeFrame title="Web4 Social" url="social.web4.local/feed">
          <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-gray-300">Community Feed</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-gray-600">Sort:</span>
                <span className="text-xs text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded">Trust-weighted</span>
              </div>
            </div>
            <div className="divide-y divide-gray-800">
              {/* High-trust post */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">L</div>
                  <span className="text-sm font-medium text-gray-200">Dr. Lisa Park</span>
                  <span className="text-xs font-mono text-emerald-400">0.92</span>
                  <span className="text-xs text-gray-600">· Nutritionist</span>
                </div>
                <p className="text-xs text-gray-300 mb-1.5">&quot;New research on intermittent fasting — the 16:8 claims are overstated. Here&apos;s what the data actually shows...&quot;</p>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>47 found helpful (+94 ATP earned)</span>
                  <span>·</span>
                  <span>Cost: 3 ATP to post</span>
                </div>
              </div>
              {/* Low-trust post — flagged */}
              <div className="px-4 py-3 bg-amber-950/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">M</div>
                  <span className="text-sm font-medium text-gray-200">Mike&apos;s Supplements</span>
                  <span className="text-xs font-mono text-red-400">0.31</span>
                  <span className="text-xs text-amber-500 bg-amber-950/50 px-1.5 py-0.5 rounded">Low trust</span>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">&quot;This ONE trick reverses aging! Buy now...&quot;</p>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>2 found helpful, 38 flagged</span>
                  <span>·</span>
                  <span>Cost: 15 ATP to post (low-trust premium)</span>
                </div>
              </div>
              {/* Mid-trust newcomer */}
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">T</div>
                  <span className="text-sm font-medium text-gray-200">Tomas R.</span>
                  <span className="text-xs font-mono text-sky-400">0.58</span>
                  <span className="text-xs text-gray-600">· New member (2 weeks)</span>
                </div>
                <p className="text-xs text-gray-300 mb-1.5">&quot;Has anyone tried the new bike path along the river? Took some photos today.&quot;</p>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>12 found helpful (+24 ATP earned)</span>
                  <span>·</span>
                  <span>Cost: 5 ATP to post</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
              Posts sorted by trust × helpfulness. Low-trust promotional content sinks naturally — no moderator needed.
            </div>
          </div>
        </WireframeFrame>

        {/* Wireframe 5: Marketplace */}
        <WireframeFrame title="Web4 Market" url="market.web4.local/listing/used-camera">
          <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <span className="text-sm font-medium text-gray-300">Marketplace — Used Camera</span>
            </div>
            <div className="p-4">
              {/* Seller profile */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-400">N</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-200">Nina K.</span>
                    <span className="text-xs font-mono text-emerald-400">0.88</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-gray-500">As seller</span>
                      <div className="text-emerald-400 font-mono">0.91</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Transactions</span>
                      <div className="text-gray-300">43 completed</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Disputes</span>
                      <div className="text-gray-300">0</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Trust earned through 43 real transactions — not self-reported star ratings.</p>
                </div>
              </div>
              {/* Trust comparison */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Your risk assessment</span>
                  <span className="text-emerald-400">Low risk</span>
                </div>
                <div className="space-y-1.5 text-gray-500">
                  <div className="flex justify-between"><span>Seller trust (as seller role)</span><span className="text-emerald-400">0.91</span></div>
                  <div className="flex justify-between"><span>Connection distance</span><span className="text-gray-300">2 hops (friend of a friend)</span></div>
                  <div className="flex justify-between"><span><Link href="/markov-relevancy-horizon" className="text-sky-400 hover:underline">Distance-adjusted trust</Link> <span className="text-gray-600">(trust fades with distance — 2 hops away means 30% weaker)</span></span><span className="text-sky-400">0.64 (0.91 × 0.70 decay over 2 hops)</span></div>
                  <div className="flex justify-between"><span>Escrow cost</span><span className="text-gray-300">2 ATP (reduced — high seller trust)</span></div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
              No fake reviews. No paid badges. Every number traces back to real interactions with real people.
            </div>
          </div>
        </WireframeFrame>

        <p className="text-xs text-gray-500 italic">
          These are conceptual wireframes, not final designs. Web4 is active research — the real interfaces
          will be built by the communities that adopt it.{' '}
          <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">See what&apos;s genuinely unsolved →</Link>
        </p>
      </section>

      {/* Footer nav */}
      <div className="mt-12 pt-6 border-t border-gray-800 flex flex-wrap gap-4 text-sm text-gray-500">
        <Link href="/why-web4" className="hover:text-sky-400 transition-colors">Why Web4?</Link>
        <Link href="/first-contact" className="hover:text-sky-400 transition-colors">First Contact</Link>
        <Link href="/playground" className="hover:text-sky-400 transition-colors">Playground</Link>
        <Link href="/society-simulator" className="hover:text-sky-400 transition-colors">Society Simulator</Link>
      </div>

      <noscript>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem' }}>
          <div style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '12px', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#38bdf8' }}>A Day in Web4</h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Interactive version requires JavaScript. Here are all 7 scenarios:
            </p>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>7:30 AM &mdash; Your Phone Wakes Up</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You enter a password. Your inbox has 12 messages &mdash; 9 are spam.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your device&apos;s security chip proves it&apos;s you. No password. Your inbox has 3 messages &mdash; each sender spent energy to contact you. Zero spam.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>9:00 AM &mdash; Someone Asks for Help</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You write a helpful answer about fixing a faucet. It gets buried under SEO spam.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your answer costs 8 energy. Three people mark it helpful &mdash; you earn 20 back. Quality rises to the top because low-effort posts don&apos;t pay off.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>11:00 AM &mdash; Hiring a Freelancer</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> Two freelancers apply. One has a shiny portfolio. Reviews might be fake. You&apos;re gambling.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> One has a trust history across 156 projects: Talent 0.91, Training 0.87, Temperament 0.94. These scores were earned through real interactions. Unfakeable.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>1:00 PM &mdash; Lunch Decision</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> A restaurant has 4.8 stars from 2,000 reviews. Half are from paid review farms. The rating is manufactured.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Each review cost the reviewer energy to post. 2,000 real reviews from verified people. You can see each reviewer&apos;s trust history. The 4.6-star place with 89 honest reviews might actually be better.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>3:30 PM &mdash; A Stranger Needs Help</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> A newcomer asks a basic question. Trolls pile on with &quot;just Google it.&quot; They leave. Community loses another contributor.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Helping costs 4 energy but earns 10 back. Trolling costs energy with no return. Constructive behavior becomes the path of least resistance.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>6:00 PM &mdash; Someone Lies About You</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> A competitor posts a false accusation. It goes viral. Even after removal, screenshots circulate. Your reputation is damaged.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your 2-year trust history speaks louder than one accusation. The accuser&apos;s consistency score drops &mdash; their behavior doesn&apos;t match their history. The community sees the full picture.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>9:00 PM &mdash; End of Day</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You have a follower count and likes. Numbers that mean nothing about who you actually are.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your profile shows real dimensions: how skilled you are, how reliable you are, how you treat people. Built from hundreds of real interactions. Tomorrow, today&apos;s trust carries forward. Good days compound.
              </p>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem' }}>
                <strong style={{ color: '#38bdf8' }}>The pattern:</strong> Every scenario follows the same logic &mdash; actions cost energy, quality is rewarded, bad behavior has real consequences, and trust compounds over time. No moderators needed. The economics do the work.
              </p>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.875rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              Continue learning:
              <a href="/tldr" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>2-minute overview</a> &middot;
              <a href="/first-contact" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>First Contact</a> &middot;
              <a href="/karma-journey" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>Karma Journey</a> &middot;
              <a href="/what-could-go-wrong" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>What Could Go Wrong</a>
            </p>
          </div>
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

  // Persist result to exploration tracker (once)
  const savedRef = useRef(false);
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    saveDayInWeb4Result({
      archetype: dayType.label,
      scenariosCompleted: records.length,
      totalATPEarned: totalAtpEarned,
      totalTrustDelta: currentTrust - 0.5,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <RelatedConcepts currentPath="/day-in-web4" />
      <ExplorerNav currentPath="/day-in-web4" />
    </div>
  );
}
