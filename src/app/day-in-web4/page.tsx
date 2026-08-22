'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';
import { saveDayInWeb4Result, trackPageVisit } from '@/lib/exploration';
import InteractiveMailDemo from '@/components/InteractiveMailDemo';
import {
  InteractiveTalentWireframe,
  InteractiveReviewsWireframe,
  InteractiveSocialWireframe,
  InteractiveMarketWireframe,
} from '@/components/InteractiveWireframes';
import InProduction from '@/components/InProduction';

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
    setup: 'You pick up your phone. On today\'s internet, you enter a password or use Face ID to unlock your apps. In Web4, something different happens - your device\'s security chip quietly proves it\'s really you. No password. No centralized login server. Your identity is grounded.',
    choices: [
      {
        label: 'Open social feed',
        icon: '📰',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You scroll past bots, ads, and engagement bait. You have no idea which accounts are real.',
        web4Result: 'Every post cost the author energy to create. The bots are gone - spam is economically irrational. What remains is real.',
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
        web4Result: 'Your inbox has 3 messages. Each sender spent energy to message you. Zero spam - it costs too much.',
        concept: 'Energy Budget (ATP)',
        conceptLink: '/atp-economics',
      },
    ],
  },
  {
    time: '9:00 AM',
    title: 'Someone Asks for Help',
    icon: '❓',
    setup: 'On a community forum, someone asks: "How do I fix a leaky kitchen faucet?" You actually know the answer - you fixed yours last month.',
    choices: [
      {
        label: 'Write a detailed answer',
        icon: '✍️',
        atpCost: 8,
        atpEarned: 20,
        trustDelta: 0.03,
        todayInternet: 'You spend 10 minutes writing a great answer. It gets buried under SEO spam and AI-generated filler.',
        web4Result: 'Your answer costs 8 ATP to post. Three people mark it helpful - you earn 20 ATP back and your trust score rises. Quality is rewarded.',
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
        conceptLink: '/karma-consequences',
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
        todayInternet: 'You check reviews - but are they real? 30% of online reviews are fake. You\'re gambling.',
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
        web4Result: 'They\'re new, so their trust scores are neutral (0.5). Low risk if the project is small - everyone starts somewhere. But you can see they\'re real.',
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
        conceptLink: '/karma-consequences',
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
        web4Result: 'Helping costs 4 ATP. But the newcomer marks you helpful - 10 ATP back. Trolls can\'t afford to pile on because every hostile reply costs THEM energy. Constructive behavior is the path of least resistance.',
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
        web4Result: 'Low effort, low cost (2 ATP), small return. Efficient and nobody\'s hurt. The original answer author earns ATP too - good content keeps paying forward.',
        concept: 'Consequences',
        conceptLink: '/karma-consequences',
      },
      {
        label: 'Ignore it',
        icon: '🚶',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'The question gets no answer. Or worse, a wrong one from someone guessing.',
        web4Result: 'No cost, no gain. But others who DO help build trust and earn energy. Over time, helpers become the community\'s leaders - not because they were appointed, but because they earned it.',
        concept: 'Trust Tensor (T3)',
        conceptLink: '/trust-tensor',
      },
    ],
  },
  {
    time: '4:30 PM',
    title: 'You\'re the Newcomer',
    icon: '🌱',
    setup: 'You just joined a new community. Your trust is 0.50 - neutral. You see established members with trust scores of 0.85. Their posts get more visibility, they pay lower action costs, and partners seek them out. You feel like an outsider.',
    choices: [
      {
        label: 'Make a quality contribution',
        icon: '✨',
        atpCost: 10,
        atpEarned: 15,
        trustDelta: 0.02,
        todayInternet: 'You post something great. It gets buried because you have zero followers. Nobody sees it.',
        web4Result: 'Your post costs 10 ATP - a 40% newcomer surcharge, because you have no consistency history yet. But if it\'s genuinely useful, recipients confirm it and you earn 15 ATP back. Two more quality posts and your action costs start dropping. The system rewards you for substance, not seniority.',
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
        web4Result: 'Each identity costs real hardware. Your low-quality post earns zero ATP but costs 8. Your trust drops to 0.47. Two more attempts and you\'re below the 0.5 threshold - effectively invisible. Gaming costs more than contributing honestly.',
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
        web4Result: 'Your 2-year trust history speaks louder than one accusation. The accuser\'s coherence drops - their behavior is inconsistent with their history. The community sees the full picture, not just the headline.',
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
        web4Result: 'Your laptop and tablet already witness for you. They confirm: "Yes, this new phone belongs to the same person." Your identity transfers in seconds. Two of three devices agree - that\'s a quorum. All your trust, history, and ATP move with you seamlessly.',
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
        web4Result: 'Web4 uses m-of-n recovery: trusted contacts who have interacted with you before can vouch for you, similar to how a bank verifies identity in person. It\'s slower (by design - speed would help attackers), but your identity and trust history are never truly lost.',
        concept: 'Linked Context Token (LCT)',
        conceptLink: '/lct-explainer',
      },
    ],
  },
  {
    time: '9:00 PM',
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
        web4Result: 'Your laptop already witnessed your identity - it\'s part of your device constellation. Open the Web4 app on your laptop, confirm with biometrics, and you\'re back. Your trust, reputation, and energy are untouched. When you get a new phone, your laptop vouches for it.',
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
        web4Result: 'Install the Web4 app on your new phone. Your other devices (laptop, tablet) vouch for it - a "witness recovery" that takes about 60 seconds. The broken phone is automatically revoked. Your identity is restored, not recreated. It costs a small amount of ATP (2) to register the new device.',
        concept: 'Device Recovery (LCT)',
        conceptLink: '/lct-explainer',
      },
    ],
  },
  {
    time: '9:00 PM',
    title: 'End of Day',
    icon: '🌙',
    setup: 'You check your trust profile before bed. Every interaction today - the help you gave, the reviews you wrote, the connections you made - is part of your permanent record.',
    choices: [
      {
        label: 'Review your trust profile',
        icon: '📈',
        atpCost: 0,
        atpEarned: 0,
        trustDelta: 0,
        todayInternet: 'You have a follower count. A like count. Numbers that mean nothing about who you actually are.',
        web4Result: 'Your profile shows real dimensions: how skilled you are (Talent), how reliable you are (Training), how you treat people (Temperament). Built from hundreds of real interactions. Not likes - trust.',
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
        conceptLink: '/karma-consequences',
      },
    ],
  },
];

/**
 * One-phrase plain-language gloss per concept, keyed by conceptLink. Some
 * concept labels already lead with plain words (LCT = "Verified Presence",
 * ATP = "Energy Budget"), but the trust/coherence labels are bare jargon
 * ("Trust Tensor (T3)", "Coherence Index (CI)"). Glossing every term keeps
 * the "New to these terms?" line uniform so a naive reader gets the meaning
 * at the read point without clicking out.
 */
const CONCEPT_GLOSS: Record<string, string> = {
  '/lct-explainer': 'identity your device proves is really you',
  '/atp-economics': 'the energy you spend to act, earn by contributing',
  '/trust-tensor': 'your reputation, scored on talent, training & temperament',
  '/coherence-index': 'how consistent your behavior stays over time',
  '/karma-consequences': 'agents live and die by their choices',
};

/**
 * The concepts a scenario touches, deduped by link and kept in first-seen
 * order. Used to surface "what do these terms mean?" links at the point of
 * confusion (the setup text) instead of only after a choice is made.
 */
function scenarioConcepts(s: Scenario): { concept: string; conceptLink: string }[] {
  const seen = new Set<string>();
  const out: { concept: string; conceptLink: string }[] = [];
  for (const c of s.choices) {
    if (seen.has(c.conceptLink)) continue;
    seen.add(c.conceptLink);
    out.push({ concept: c.concept, conceptLink: c.conceptLink });
  }
  return out;
}

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
        10 scenarios across one day - pick a choice in each, see what happens, then click <em>Next scenario</em> to advance through the timeline above.
      </p>
      <p className="text-gray-500 mb-4 text-sm italic">
        Everything below is narrated in the present tense as a thought experiment - none of it ships today. Read it as what a trust-native internet <em>would</em> feel like if you were living an ordinary day inside it.
      </p>
      <p className="text-gray-500 mb-6 text-sm">
        Two things to know before the numbers start. First, <strong className="text-gray-400">trust scores run 0 to 1</strong>, where <strong className="text-gray-400">0.5 is neutral</strong> (everyone starts there) and 1.0 is the theoretical max - so a &ldquo;0.85&rdquo; below means well-trusted; a &ldquo;0.50&rdquo; means brand-new or neutral. Second, <strong className="text-gray-400">ATP is your energy budget for taking actions</strong> - every post or reply spends some, and contributions others find useful earn it back.
      </p>

      <InProduction concept="stack" />

      {/* Your First 5 Minutes - Onboarding Walkthrough */}
      <details className="mb-8 rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.4)' }}>
        <summary className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-800/30 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
          <span className="text-lg">🚀</span>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-sky-400 font-medium">But what does setting up Web4 look like?</span>
            <span className="text-xs text-gray-500 ml-2">- Your first 5 minutes</span>
          </div>
          <span className="text-gray-500 text-sm shrink-0">▶</span>
        </summary>

        <div className="px-4 pb-4 pt-2 space-y-4">
          {/* Jul-28 visitor HIGH: "None of this is downloadable yet" was flatly false against the
              `pip install web4-core web4-trust` printed on /the-standard and /running-now, and the
              visitor said reading it "made me distrust the install lines" - the one thing they had
              correctly believed. Scoped to the phone-level consumer experience this section actually
              narrates (Step 1 is literally "Download the app", which is the thing that does not exist).
              CANONICAL SENTENCE below is IDENTICAL on /how-it-works and /hestia - keep it verbatim. */}
          <p className="text-gray-400 text-sm">
            <strong className="text-gray-300">The phone-level experience below isn&apos;t downloadable - that part is still active research.</strong> The spec is written, the code is installable today, and there is no public network open to outside members yet: what&apos;s missing here is the consumer app that would wrap it. But <em>if</em> it existed, you&apos;d set up once before your day starts. Here&apos;s what that setup <em>would</em> look like - no crypto wallet, no blockchain, no 24-word seed phrase. Read the steps below as &ldquo;what it would feel like,&rdquo; not &ldquo;what to do today.&rdquo; For what you <em>can</em> install right now, see{" "}
            <Link href="/running-now" className="text-sky-400 hover:underline">what&apos;s actually running now</Link>.
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
                  <div className="text-xs text-gray-500">A trust wallet - not a crypto wallet</div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                One app. Works like a password manager, but instead of storing passwords, it manages your trust identity across every Web4-enabled service. Delivered as a <strong className="text-gray-400">mobile app or browser extension</strong> (your choice - most people will use both, paired into one identity). Install it like any other app.
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
                    <span className="text-gray-300">iPhone 15 / Pixel 8 / Galaxy S24 (built-in security chip: Secure Enclave / Titan M2 / Knox)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Chip tier max</span>
                    <span className="text-emerald-400">0.85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Action required</span>
                    <span className="text-gray-300">Face ID to confirm</span>
                  </div>
                </div>
              </div>
              {/* AUG-20 visitor HIGH #3: "a single freshly-bound iPhone is shown with Trust
                  ceiling 0.85; the /lct-explainer page this step LINKS TO for exactly this says
                  device count and chip class combine and the lower wins". Two pages that link to
                  each other, disagreeing on the number.
                  HALF THE FIX WAS ALREADY HERE ([[page-ships-the-answer-and-denies-it]]): the prose
                  below already said the 0.85 "comes from the chip's tier". What contradicted it was
                  the STAT ROW eight lines up, still labelled a flat "Trust ceiling". Relabelled
                  "Chip tier max", matching how /lct-explainer renders the same tier ("max 0.85").
                  The residual was that the SECOND rule was named nowhere on this page, so nothing
                  told the reader another cap exists. Added, and deliberately with NO device-count
                  numeral: /lct-explainer is itself unreconciled on what one device gets (its
                  device-count list says 50% while its own combination rule and six other surfaces
                  say 0.75, filed in that file's Aug-12 guard, `grep -n "The 0.50-0.75 numeral
                  SURVIVES" src/app/lct-explainer/page.tsx`, which says outright not to recalibrate
                  in a hurry). Any numeral here picks a side of a filed, deliberately-untaken row.
                  The visitor's own suggested replacement (0.50) is that outlier, so it is NOT what
                  shipped ([[naive-reading-right-suggestion-wrong]]).
                  The link also promised "hardware ceilings" while pointing at bare /lct-explainer
                  ([[promise-link-class-grep-text-not-href]]); now anchored to #device-witnesses,
                  the block that actually carries the combination rule.
                  AUG-21 visitor MEDIUM 6: this step offered a biometric as the ONLY way to bind a
                  first device ("Action required: Face ID to confirm", "One biometric scan ... and
                  your device becomes your identity anchor"), while /what-could-go-wrong risk 8 is
                  "Hardware-bound identity excludes users who can't use it" and lists the routes out.
                  THE ANSWER ALREADY SHIPPED ON TWO OTHER PAGES AND NOTHING ROUTED HERE
                  ([[page-ships-the-answer-and-denies-it]]): risk 8 mitigation (1), and
                  /lct-explainer's "What if biometrics aren't an option for me?" block. This step was
                  already deep-linking /lct-explainer, i.e. a DIFFERENT ANCHOR ON THE PAGE THAT
                  CARRIES THE ANSWER. The added clause is risk 8 mitigation (1) propagated near
                  verbatim ([[propagate-the-sentence-not-your-summary]]).
                  IT OFFERS A DIFFERENT ANCHOR TYPE, NOT A DIFFERENT UNLOCK, and that distinction is
                  canon's: multi-device-lct-binding.md puts "biometric_gate": true on the phone
                  secure element specifically, while FIDO2 uses "user_verification": "required",
                  which WebAuthn satisfies by PIN or biometric. So "no biometric? use a PIN on your
                  phone" would be false against canon; "bind a security key instead of the phone" is
                  the true form ([[fix-may-commit-the-defect-it-diagnoses]]).
                  NO NUMERAL, for a second reason on top of the device-count one above: risk 8 rates
                  this route "~0.75", below this step's "Chip tier max 0.85", but canon's anchor
                  table INVERTS that ordering (2.2.1 phone secure enclave "Security Level: High",
                  2.2.2 FIDO2 "Security Level: Very High"). Printing 0.75 beside 0.85 here would
                  render an ordering canon reverses. That inversion is a real latent defect and is
                  FILED FORWARD, not fixed here; it belongs to whoever owns the tier ladder on
                  /lct-explainer. Nothing here says the key tier caps higher or lower.
                  THE DESTINATION IS /what-could-go-wrong, NOT /lct-explainer, and that was a
                  correction. /lct-explainer's "What if biometrics aren't an option for me?" block is
                  the gentler answer-first prose, so it was the first choice and an id was drafted on
                  it. It is UNREACHABLE by a deep link: everything on that page below
                  `grep -n "<DeepDiveToggle" src/app/lct-explainer/page.tsx` sits inside
                  DeepDiveToggle, which returns null until mount and renders children only when the
                  reader has opted in (localStorage, default off). Verified against the live site,
                  not the source: curl /lct-explainer and that block is absent from the served HTML,
                  while risk 8 is present in /what-could-go-wrong's ([[check-what-renders-at-the-anchor]],
                  [[ui-claim-check-the-mount-effect]]). #risk-accessibility is server-rendered, owns
                  the sentence propagated above, and is the honest framing the visitor said was the
                  site's strongest argument. Link TEXT names what is actually at the other end
                  ([[promise-link-class-grep-text-not-href]]).
                  LEFT, with the criterion: an instance is in scope only if it presents a biometric
                  as the sole route to ANCHORING AN IDENTITY. The stat row above ("Face ID to
                  confirm") is left because it mocks up one named handset (iPhone 15 / Pixel 8 /
                  Galaxy S24) doing what that handset asks, and the prose beneath it now names the
                  alternative. The 8 PM device-loss scenario and its comparison-card twin ("confirm
                  with biometrics" on an already-bound laptop) are left because that is re-auth on a
                  device the reader bound by whatever method they chose at this step, not a claim
                  about how an identity is anchored. If either is re-filed, change BOTH: they are a
                  data-object / rendered-JSX pair, like the surcharge line below
                  ([[duplicate-pair-filing-decomposes]]). */}
              <p className="text-xs text-gray-500">
                The app finds your phone&apos;s security chip automatically. One biometric scan (Face ID, fingerprint) and your device becomes your identity anchor. No seed phrases to write down. If biometrics are not an option for you, a hardware security key can be your anchor instead of the phone: YubiKey or Titan keys accept a numeric PIN instead of a biometric, and they are hardware-bound (<a href="/what-could-go-wrong#risk-accessibility" className="text-sky-400 hover:underline">what a biometric requirement excludes, and the routes around it</a>). The 0.85 comes from the chip&apos;s tier - a phone secure enclave caps trust at 0.85; stronger or weaker hardware caps it higher or lower. That is the chip&apos;s rating, not your ceiling on day one: how many devices witness you sets how much of that maximum you can actually reach, and the lower of the two rules wins. One device is where that climb starts; adding a second raises it (see <a href="/lct-explainer#device-witnesses" className="text-sky-400 hover:underline">hardware ceilings in the LCT explainer</a>).
              </p>
            </div>
          </div>

          {/* AUG-20 visitor MEDIUM #6 + their Unanswered Q3. Filed as: setup binds exactly ONE
              device and closes with "No keys to lose", then the 8 PM and 9 PM scenarios lean on
              "your laptop and tablet already witness for you" - a constellation the walkthrough
              never told the reader to build. Their Q3: "How do I get a second device onto my
              identity? Nothing showed me the enrolment step."
              THE MECHANISM ALREADY SHIPPED, ON TWO OTHER PAGES, AND NOTHING ROUTED HERE
              ([[page-ships-the-answer-and-denies-it]] at site scale). /identity-constellation's
              "How It Works: The Enrollment Ceremony" step 2 answers Q3 outright, and
              /lct-explainer's minute-1:00 line narrates the SAME five minutes with pairing in it.
              So this is a routing + sequencing fix: Step 2 already promised "adding a second
              raises it", and the artifact arrived 600 lines away on another page
              ([[promise-artifact-arrives-by-another-route]]).
              POSITION: before "Join your first community", because /lct-explainer orders the same
              five minutes pair-then-join (grep -n "linking a second device" on that file, minute
              1:00, vs joining at 2:00). Two narrations of one setup must not disagree on sequence.
              WHAT THIS DELIBERATELY DOES NOT SAY, so a later pass does not "complete" it:
              (1) WHICH DEVICE SCANS. Three surfaces disagree: /lct-explainer's prose says the
                  phone scans, while LCTSetupMockup's PairScreen rendered ten lines below it says
                  the laptop does, and /identity-constellation says phone-to-laptop. That is a real
                  defect on /lct-explainer, filed in SESSION_FOCUS, NOT fixed here. Propagating the
                  minority reading would have shipped a fresh cross-page contradiction
                  ([[propagate-the-sentence-not-your-summary]]: check the source sentence is TRUE).
              (2) A DEVICE-COUNT NUMERAL. /lct-explainer is itself unreconciled on what one device
                  gets (grep -n "The 0.50-0.75 numeral SURVIVES" on that file). Step 2 above shipped
                  numeral-free for the same reason; any numeral here picks a side of a filed,
                  deliberately-untaken row.
              (3) AN ATP COST. Registering a device is priced at 2 ATP in the 9 PM choice
                  (grep -n "witness recovery" in this file), but this step lands BEFORE the block
                  that first gives the reader 100 ATP, so a priced action here would precede their
                  having any. Steps 1 and 2 carry no ATP chip either; silence is consistent.
              (4) THE 8 PM QUORUM. That scenario needs "two of three devices agree"; one added
                  device gives two. This step licenses the 9 PM "your laptop already witnessed you"
                  story only, which is why the sentence says "when a phone breaks" and not "or gets
                  replaced".
              (5) Q3's THIRD sub-question ("is there a window where I am vulnerable?"). Nothing
                  on-site or in ../web4 grounds a pairing-window claim; coining one is the failure
                  mode. Filed forward.
              DURATION: ~30 seconds, not the "about 60 seconds" the 9 PM witness recovery prints.
              Different events (first pairing vs replacing a lost device through witnesses you
              already have), and the steps must still sum to the "Your first 5 minutes" label above
              (30+60+30+120+60 = 5:00 exactly), which /lct-explainer's sibling narration also uses.
              HEDGE KEPT: all three shipped instances of the recovery figure say "typically" or
              "roughly" (grep -rn "3 to 7 days" src/app), and /lct-explainer's own card says peer
              selection is "designed but not yet pinned in spec". Do not harden it.
              HARDWARE QUALIFIER KEPT on the ceiling clause: /lct-explainer#single-device says a
              software-only setup's ceiling does NOT rise with a second device, only a
              hardware-anchored one does.
              SWEEP CRITERION for what this leaves: this closes the DEVICE half of the
              constellation-prerequisite class. The sibling prerequisite in the "What if I lost all
              my devices?" choice was NOT left open - it asserted contacts "you designated in
              advance", the site's only pre-designation claim, against /lct-explainer's canonical
              "people you've previously interacted with", so it was corrected in the same pass
              rather than allowed to contradict this step. Nothing of that shape remains. */}
          {/* Step 3: Pair a second device */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 3</span>
              <span className="text-sm text-gray-300 font-medium">Pair a second device</span>
              <span className="text-xs text-gray-600 ml-auto">~30 seconds</span>
            </div>
            <div className="p-3">
              <div className="rounded-lg bg-gray-900/50 border border-gray-800 p-3 mb-2">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Device 1</span>
                    <span className="text-gray-300">The phone you just bound</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Device 2</span>
                    <span className="text-gray-300">A laptop, a tablet, or a hardware security key</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Action required</span>
                    <span className="text-gray-300">One shows a QR code, the other scans it</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                From then on the two devices witness each other. That is the identity constellation the evening scenarios below lean on when a phone breaks. The app suggests this rather than requires it. What changes if you skip it: there is no second witness, so losing your one device means community vouching, typically over 3 to 7 days, rather than just opening the app on your laptop. A second <strong className="text-gray-400">hardware</strong> device also raises how much of the chip&apos;s rating you can reach. <Link href="/identity-constellation#enrollment-ceremony" className="text-sky-400 hover:underline">See the enrollment ceremony step by step &rarr;</Link>
              </p>
            </div>
          </div>

          {/* Step 4: Join a community */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 4</span>
              <span className="text-sm text-gray-300 font-medium">Join your first community</span>
              <span className="text-xs text-gray-600 ml-auto">~2 minutes</span>
            </div>
            <div className="p-3">
              <div className="space-y-2 mb-2">
                {/* Aug-21 visitor MEDIUM 4: "0.91 avg exceeds the site's own maximum achievable
                    trust. An average cannot exceed the maximum of its members, so an 89-member
                    community cannot average 0.91." Correct and unarguable: /lct-explainer calls
                    0.90 "the hardware-bound ceiling" (grep -n "hardware-bound ceiling" there) and
                    /trust-tensor tops its calibration scale at the same value.

                    WHICH QUANTITY THE CEILING BINDS, and state it, because fixing this without a
                    criterion creates a sweep obligation across surfaces that are NOT wrong
                    ([[adding-a-distinction-creates-a-sweep-obligation]]). The ceiling binds a
                    MEAN OF MEMBER COMPOSITE SCORES, which is what this row renders, and a mean
                    cannot exceed its members' maximum. It does not bind:
                      - a per-dimension T3 value. This same page renders "Talent: 0.91 ...
                        Temperament: 0.94" twice (grep -n "156 real interactions" here). Those are
                        dimensions, not a composite, and they are deliberately untouched.
                      - a transitive path combination. /trust-neighborhood renders 0.91 as the
                        correct output of its own published formula combined = 1 - prod(1 - path_i)
                        from two 0.7 paths. Different quantity, also untouched.

                    ALL THREE VALUES MOVED, not just the illegal one, and the reason is not
                    tidiness. The visitor's parenthetical is the real finding: "the neighbouring
                    0.82 and 0.78 averages are legal but imply near-ceiling hardware for
                    essentially everyone". /lct-explainer's device-count rule caps a one-device
                    person at 0.75 whatever their chip (grep -n "device count is the limit" there),
                    and a mock general-population community is mostly one-device people. So 0.6x
                    is what this site's own model predicts for a neighbourhood group, and the old
                    set quietly asserted a hardware distribution the site says is unusual. The
                    values are the visitor's own suggested set, mapped to preserve the rendered
                    ascending order and the story it tells (the smallest community has the highest
                    trust). Nothing else in Step 4 moved. */}
                {[
                  { name: 'Local Photographers', members: '342 members', trust: '0.64 avg', icon: '📸' },
                  { name: 'Home Cooking', members: '1,204 members', trust: '0.68 avg', icon: '🍳' },
                  { name: 'Neighborhood Help', members: '89 members', trust: '0.71 avg', icon: '🏘️' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-900/30 px-3 py-2 text-xs">
                    <span>{c.icon}</span>
                    <span className="text-gray-200 font-medium">{c.name}</span>
                    <span className="text-gray-600 ml-auto">{c.members}</span>
                    <span className="text-emerald-400 font-mono">{c.trust}</span>
                  </div>
                ))}
              </div>
              {/* AUG-21 visitor MEDIUM 7: "Everyone starts equal" sat one step above "your first
                  post costs 10 ATP, 40% more than veterans pay", twice on this page. The visitor
                  said the REASON given ("no consistency history yet") is fine and they accepted it;
                  it is the unqualified word "equal" that snags.
                  THE DEFECT WAS ONE WORD FURTHER ALONG, and it is why the page read as self-refuting:
                  "than VETERANS pay" names a seniority class the owning derivation does not use.
                  /coherence-index #why-ci-starts-low owns and derives this number ("with CI 0.85,
                  actions cost about 1.4x their base price (1/0.85^2 ~ 1.38) - new accounts really do
                  pay ~38% more per action until behavior is established") and says the gap closes on
                  "a handful of consistent grounding events ... and it closes fast". So the payer of
                  the lower price is anyone with an established consistency record, which a three-day
                  -old account can have. That is exactly why "the system rewards substance, not
                  seniority" one sentence later read as a contradiction: the sentence was true and
                  the contrast class beside it was wrong.
                  Re-keyed on all THREE surfaces, not two: the scenario data object, its rendered
                  twin in the Web2-vs-Web4 comparison, and this setup step's Step 5 prose. A
                  JSX-attribute grep misses the data-object literal.
                  THE NUMERAL DID NOT MOVE. 40% / 1.4x / ~38% are one figure under an explicit
                  "change both or neither" guard on /coherence-index. For the same reason the
                  replacement is NOT "40% more than the listed price": that phrasing makes the base
                  (~7.1 ATP) computable, and /how-it-works puts posting at 10-20 ATP, so naming the
                  base would promote a latent entailment into a stated seam. Dissolving the person
                  class keeps the entailment exactly as implicit as it already was.
                  "Established members" was NOT available as the swap: this page already uses that
                  phrase at the top of the same scenario ("You see established members with trust
                  scores of 0.85") for a TRUST story, and the surcharge is a CI effect
                  ([[borrowed-word-means-something-else-there]]). That line is LEFT, and the
                  criterion for leaving it: higher trust genuinely does buy cheaper access
                  (/atp-economics, "high-trust entities pay less for resource access"), so it is
                  trust-keyed and true. An instance is in scope here only if it attributes the
                  newcomer surcharge to time served.
                  DELIBERATELY NOT TOUCHED: /atp-economics' "not the seniority of whoever took it"
                  and "earned trust, not seniority" are about the TRUST lever, not this one.
                  /lct-explainer's Aug-12 guard: "Both effects are real and they are not the same
                  lever." They explain why the adjacent sentence read wrong; they do not ground the
                  number. */}
              <p className="text-xs text-gray-500">
                Browse communities or get invited by someone you know. You start with trust 0.50 (neutral) and 100 ATP (energy). Everyone starts with the same reputation, and it builds from your actions, not your join date. Action costs are the one thing that differs: a new account has no established pattern to check new behavior against, so its actions cost more until a handful of consistent ones close the gap (<a href="/coherence-index#why-ci-starts-low" className="text-sky-400 hover:underline">why a new account pays more</a>).
              </p>
            </div>
          </div>

          {/* Step 5: First interaction */}
          <div className="rounded-lg border border-gray-700 overflow-hidden" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <span className="text-xs font-mono text-sky-400">Step 5</span>
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
                  <span className="text-orange-400">-10 ATP</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">Your trust: <span className="text-sky-400 font-mono">0.50</span> (new member)</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">Post visible to: <span className="text-gray-300">89 members</span></span>
                </div>
              </div>
              {/* AUG-20 visitor MEDIUM #4: same page, same brand-new member, two post costs. This
                  step showed "-3 ATP" while the day timeline and the Web2/Web4 comparison both say
                  a newcomer's post costs 10 ATP with a 40% no-history surcharge
                  (the 4:30 PM "You're the Newcomer" scenario and the Web2-vs-Web4 comparison card;
                  both said "40% more than veterans pay" until the Aug-21 pass re-keyed all three
                  surfaces, see the Step 4 note below), and
                  /how-it-works puts posting at 10-20 ATP. The 3 was out of family with both. Moved
                  onto 10 and the surcharge REASON propagated from those two lines rather than
                  restated, which turns the inconsistency into the teaching moment the visitor asked
                  for. No running balance in this mockup depends on the old figure (checked). */}
              <p className="text-xs text-gray-500">
                Your first post costs 10 ATP - a 40% newcomer surcharge, because you have no consistency history yet. People respond, you thank them - and your trust starts building. Within a week of genuine participation, you&apos;ll feel the difference: people trust your recommendations, your posts cost less, and your replies carry weight.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-sky-950/20 border border-sky-800/30 p-3">
            <p className="text-xs text-sky-300">
              <strong>That&apos;s it.</strong> No blockchain to sync. No gas fees. No wallet addresses to copy.
              Install an app, bind your first device, pair a second, join a community, say hello. The rest unfolds through the day below.
            </p>
          </div>

          <p className="text-xs text-gray-600 italic">
            This is a conceptual walkthrough - Web4 is active research. The real onboarding will be designed by the communities that build on it.
            {' '}<Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">See honest limitations →</Link>
          </p>
        </div>
      </details>

      {/* Wireframe preview teaser - links to visual mockups below */}
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
          <span className="text-sm text-sky-400 font-medium">Try the interactive app demos</span>
          <span className="text-xs text-gray-500 ml-2">- 5 clickable mockups below</span>
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
            <div className="flex items-baseline gap-2">
              <span className="text-sky-400 text-sm font-mono">{scenario.time}</span>
              <span className="text-xs text-gray-500 font-mono uppercase tracking-wide">
                Scenario {currentScenario + 1} of {SCENARIOS.length}
              </span>
            </div>
            <h2 className="text-xl font-bold mt-1">
              {scenario.icon} {scenario.title}
            </h2>
          </div>

          {/* Setup */}
          <p className="text-gray-300 leading-relaxed mb-3">
            {scenario.setup}
          </p>

          {/* Concept links at the point of confusion - available before you
              pick a choice, not only in the post-choice comparison. */}
          <p className="text-gray-500 text-xs mb-6">
            New to these terms?{' '}
            {scenarioConcepts(scenario).map((c, i) => (
              <span key={c.conceptLink}>
                {i > 0 && <span className="text-gray-700"> · </span>}
                <Link
                  href={c.conceptLink}
                  className="text-sky-500 hover:text-sky-400 transition-colors"
                >
                  {c.concept}
                </Link>
                {CONCEPT_GLOSS[c.conceptLink] && (
                  <span className="text-gray-600">
                    {' - '}{CONCEPT_GLOSS[c.conceptLink]}
                  </span>
                )}
              </span>
            ))}
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

      {/* What Would This Look Like? - Conceptual UI Wireframes */}
      <section id="wireframes" className="mt-16 pt-8 border-t border-gray-800">
        <h2 className="text-2xl font-bold mb-2">What Would This Actually Look Like?</h2>
        <p className="text-gray-400 mb-2 text-sm">
          The scenarios above describe the <em>experience</em>. But what would the interface actually look like?
          Here are five interactive app mockups - click, tap, and explore them.
        </p>
        {/* Jul-29 visitor MEDIUM (recurrence of the Jul-15 one, and the shipped fix did not reach
            it): "I started the day with 100 ATP. The camera is 350. Where did the other 250 come
            from? Nothing in the scenario says."
            The 100 they mean is their OWN live ledger (the `const netAtp =` derivation, rendered
            once beside "Energy:" above the wireframes and again in the day-summary card), not the
            collapsed onboarding walkthrough in the "Your first 5 minutes" details block. Cites are
            grep targets, not line numbers: three of the four integers that stood here had already
            rotted, and a fourth would have pointed at the pairing step added in the same commit
            that says it is NOT the walkthrough. So the
            reconciliation shipped at InteractiveWireframes.tsx:370 ("an active member's working
            balance climbs well past that") is true but generic, and the reader's own ledger
            visibly does NOT climb - the scenario choices are almost all refund-channel events.
            Answer it at the boundary where the reader stops being the protagonist, and name the
            channel that actually grows a balance (atp-economics item 3, L208).
            Deliberately QUALITATIVE: the SCENARIOS choice set cannot produce a day anywhere near
            350, so printing a derived figure would ship a new arithmetic claim on the page already
            filed for arithmetic. And keep it on the BUDGET side of the budget-vs-wealth line
            (guard at atp-economics:168-176) - no accumulation-as-savings language. */}
        <p className="text-gray-400 mb-2 text-sm">
          One thing to carry across the line: the ledger you just ran is a single day, starting from
          the 100 ATP everyone begins with. The mockups below belong to an account built up over far
          longer, which is why the marketplace one can price a camera at 350. A day of posting and
          replying mostly earns back what that day cost you; balances grow past the starting budget
          through the other channel, work that someone else commissions and pays for. See{' '}
          <Link href="/atp-economics#earning-atp" className="text-sky-400 hover:underline">how you actually earn ATP back</Link>.
        </p>
        <p className="text-xs text-sky-400/60 mb-8">
          Each mockup is clickable - try reading messages, comparing candidates, rating posts, and buying things.
        </p>

        {/* Interactive Wireframe 1: Mail (with compose + spam demo) */}
        <InteractiveMailDemo />

        {/* Interactive Wireframe 2: Hiring Dashboard */}
        <InteractiveTalentWireframe />

        {/* Interactive Wireframe 3: Review Page */}
        <InteractiveReviewsWireframe />

        {/* Interactive Wireframe 4: Social Feed */}
        <InteractiveSocialWireframe />

        {/* Interactive Wireframe 5: Marketplace */}
        {/* Aug-06 21:00: id added so /atp-economics' "where does that energy go?" FAQ can route
            here for the escrow sequence. The section id above (#wireframes) is the wrong target:
            it lands the reader on the heading with four other mockups to scroll past, and the
            escrow steps are inside this one (ESCROW_STEPS, InteractiveWireframes.tsx:293-298).
            Wrapper rather than a prop so the component stays untouched. */}
        <div id="escrow-walkthrough" className="scroll-mt-24">
          <InteractiveMarketWireframe />
        </div>

        <p className="text-xs text-gray-500 italic">
          These are interactive concept demos, not final designs. Web4 is active research - the real interfaces
          will be built by the communities that adopt it.{' '}
          <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">See what&apos;s genuinely unsolved →</Link>
        </p>
      </section>

      {/* How Would You Get It? - Form factor by adoption tier.
          2026-08-18: id added on demand. why-web4 #faq-app-ui says "A browser extension or
          community plugin would be the first real-world step (see adoption tiers)" and linked
          /day-in-web4#adoption, an id that did not exist, so the link silently landed at page
          top. This section is what that sentence promises: its first card is "Tier 1: Browser
          Extension". The inbound sentence was left exactly as written; only the destination
          was missing. */}
      <section id="adoption" className="mt-12 pt-8 border-t border-gray-800 scroll-mt-24">
        <p className="text-gray-500 text-sm italic mb-6">
          So when could you actually live this day? That depends on adoption - and it starts smaller than you think.
        </p>
        <h2 className="text-2xl font-bold mb-2">How Would You Actually Get This?</h2>
        <p className="text-gray-400 mb-6 text-sm">
          The demos above show <em>what</em> you&apos;d see. But <em>how</em> does Web4 reach your device?
          It depends on how far along adoption is.
        </p>

        <div className="space-y-4">
          {/* Tier 1: Wrapper */}
          <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <span className="text-lg">🔌</span>
              <div>
                <span className="text-sm font-semibold text-gray-200">Tier 1: Browser Extension</span>
                <span className="text-xs text-sky-400 ml-2">First realistic step</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400 mb-2">
                A browser extension that adds trust signals to sites you already use. Reddit comments show
                the author&apos;s trust score. Amazon reviews show whether the reviewer has consistent history.
                Emails show sender cost. <strong className="text-gray-300">You don&apos;t change your behavior - the extension adds context.</strong>
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">Chrome / Firefox / Safari</span>
                <span>·</span>
                <span>Works with existing accounts</span>
                <span>·</span>
                <span>No app download</span>
              </div>
            </div>
          </div>

          {/* Tier 2-3: Standalone Apps */}
          <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <span className="text-lg">📱</span>
              <div>
                <span className="text-sm font-semibold text-gray-200">Tier 2-3: Standalone Apps</span>
                <span className="text-xs text-purple-400 ml-2">Where it gets interesting</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400 mb-2">
                Web4-native apps - like the demos above. A mail client where spam is impossible.
                A marketplace where reviews are real. A hiring platform where credentials are verified.
                Each is a regular app on your phone, but built on Web4 trust instead of platform accounts.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">iOS / Android / Desktop</span>
                <span>·</span>
                <span>One identity app + domain-specific apps</span>
              </div>
            </div>
          </div>

          {/* Tier 4-5: OS/Protocol Integration */}
          <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <span className="text-lg">🌐</span>
              <div>
                <span className="text-sm font-semibold text-gray-200">Tier 4-5: Built Into Everything</span>
                <span className="text-xs text-emerald-400 ml-2">Long-term vision</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400 mb-2">
                Trust becomes infrastructure - like HTTPS is today. Your operating system manages your identity.
                Every app inherits trust natively. There&apos;s no &quot;Web4 app&quot; because everything is Web4.
                This is years away, but it&apos;s what the protocol is designed to support.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">OS-level integration</span>
                <span>·</span>
                <span>Trust as a system service</span>
                <span>·</span>
                <span>Invisible to users</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-sky-800/30 p-4" style={{ background: 'rgba(14, 116, 144, 0.08)' }}>
          <p className="text-sm text-gray-300">
            <strong className="text-sky-400">The honest answer:</strong> Today, none of these exist - Web4 is research.
            But the adoption path is designed so you don&apos;t have to wait for Tier 5.
            A browser extension (Tier 1) could ship as soon as the protocol stabilizes.
            Each tier adds capability without requiring the next.{' '}
            {/* May 23 visitor Unanswered Q4: "I'd love a clearer sense of 'here's what exists today vs.
                what's still on paper.'" The box gives only the negative ("none of these exist") + the
                adoption path; the positive built-vs-not-built breakdown lives one click away at
                why-web4#faq-deployed but was never linked from here. Route to it - don't restate it. */}
            <Link href="/why-web4#faq-deployed" className="text-sky-400 hover:underline">See exactly what&apos;s built today vs. still on paper &rarr;</Link>
          </p>
        </div>
      </section>

      {/* What about when only some people have it? - asymmetric coexistence */}
      <section id="coexistence" className="mt-12 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm italic mb-6">
          Adoption isn&apos;t all-or-nothing. Realistically, early Web4 looks like a small minority with LCTs interacting with everyone else.
        </p>
        <h2 className="text-2xl font-bold mb-2">What about when only some people have it?</h2>
        <p className="text-gray-400 mb-6 text-sm">
          A fair question: <em>when 1% of users have LCTs and 99% don&apos;t, what does that actually look like?</em>
          Tier 1 is designed so early adopters gain something <strong className="text-gray-300">without breaking anything for the rest</strong>.
          Three concrete moments:
        </p>

        <div className="space-y-4">
          {/* Scenario A: LCT user → non-LCT user */}
          <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <span className="text-lg">📤</span>
              <div>
                <span className="text-sm font-semibold text-gray-200">You have an LCT. You email someone who doesn&apos;t.</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400 mb-2">
                You pay ATP to send (every action costs energy in Web4 - that&apos;s how spam dies). The recipient sees
                a normal email in their normal inbox. No Web4 metadata visible to them, no signup required.
                <strong className="text-gray-300"> From their side, nothing changed.</strong>
              </p>
              <p className="text-xs text-gray-500 italic">
                Side note: because the recipient can&apos;t attest you delivered value, your ATP doesn&apos;t recharge from
                this specific exchange - early adopters spend a bit more freely than they get back, until adoption catches up.
              </p>
            </div>
          </div>

          {/* Scenario B: non-LCT user → LCT user */}
          <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <span className="text-lg">📥</span>
              <div>
                <span className="text-sm font-semibold text-gray-200">Someone without an LCT emails you.</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400 mb-2">
                Your Tier 1 extension labels the message <em>&quot;unverified - no trust history.&quot;</em>
                Not blocked, not penalized, not zero - just a stranger you don&apos;t know yet.
                <strong className="text-gray-300"> You use your normal judgment.</strong> The label is information, not gatekeeping.
              </p>
              <p className="text-xs text-gray-500 italic">
                Important distinction: unverified ≠ untrusted. It&apos;s the same status every Web4 user has on day one,
                before they&apos;ve built any history. Newcomers aren&apos;t invisible; they&apos;re fresh.
              </p>
            </div>
          </div>

          {/* Scenario C: Reddit-style mixed audience */}
          <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.6)' }}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <span className="text-lg">💬</span>
              <div>
                <span className="text-sm font-semibold text-gray-200">You post a comment on a normal Reddit thread.</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400 mb-2">
                The comment goes up on Reddit like any other. <strong className="text-gray-300">Other Tier 1 extension users</strong> browsing
                that thread see a small trust badge next to your name - pulled from your LCT history, overlaid by their browser.
                Everyone else sees a regular Reddit comment, exactly as they always have.
              </p>
              <p className="text-xs text-gray-500 italic">
                Reddit doesn&apos;t need to know Web4 exists. The trust signal lives on the readers&apos; side, not the platform&apos;s.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-800/30 p-4" style={{ background: 'rgba(16, 185, 129, 0.06)' }}>
          <p className="text-sm text-gray-300">
            <strong className="text-emerald-400">Why this works:</strong> asymmetric coexistence is what makes Tier 1 viable.
            Web4 doesn&apos;t need everyone to adopt at once - it just needs early adopters to gain something
            (signal, anti-spam, reputation portability) without breaking anything for the rest. The cost of being
            outside the network is zero. The cost of being early is a slightly leaky ATP budget until others arrive.
          </p>
        </div>
      </section>

      {/* Footer nav */}
      <div className="mt-12 pt-6 border-t border-gray-800 flex flex-wrap gap-4 text-sm text-gray-500">
        <Link href="/why-web4" className="hover:text-sky-400 transition-colors">Why Web4?</Link>
        <Link href="/first-contact" className="hover:text-sky-400 transition-colors">First Contact</Link>
        <Link href="/onramp" className="hover:text-sky-400 transition-colors">The Onramp</Link>
        <Link href="/running-now" className="hover:text-sky-400 transition-colors">Running Now</Link>
      </div>

      <noscript>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem' }}>
          <div style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '12px', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#38bdf8' }}>A Day in Web4</h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Interactive version requires JavaScript. Here are all 10 scenarios:
            </p>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>7:30 AM - Your Phone Wakes Up</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You enter a password. Your inbox has 12 messages - 9 are spam.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your device&apos;s security chip proves it&apos;s you. No password. Your inbox has 3 messages - each sender spent energy to contact you. Zero spam.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>9:00 AM - Someone Asks for Help</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You write a helpful answer about fixing a faucet. It gets buried under SEO spam.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your answer costs 8 energy. Three people mark it helpful - you earn 20 back. Quality rises to the top because low-effort posts don&apos;t pay off.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>11:00 AM - Hiring a Freelancer</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> Two freelancers apply. One has a shiny portfolio. Reviews might be fake. You&apos;re gambling.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> One has a trust history across 156 projects: Talent 0.91, Training 0.87, Temperament 0.94. These scores were earned through real interactions. Unfakeable.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>1:00 PM - Lunch Decision</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> A restaurant has 4.8 stars from 2,000 reviews. Half are from paid review farms. The rating is manufactured.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Each review cost the reviewer energy to post. 2,000 real reviews from verified people. You can see each reviewer&apos;s trust history. The 4.6-star place with 89 honest reviews might actually be better.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>3:30 PM - A Stranger Needs Help</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> A newcomer asks a basic question. Trolls pile on with &quot;just Google it.&quot; They leave. Community loses another contributor.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Helping costs 4 energy but earns 10 back. Trolling costs energy with no return. Constructive behavior becomes the path of least resistance.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>4:30 PM - You&apos;re the Newcomer</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You post something great in a new community. It gets buried because you have zero followers. Nobody sees it.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your post costs 10 ATP - a 40% newcomer surcharge, no consistency history yet. But if it&apos;s genuinely useful, recipients confirm it and you earn 15 ATP back. The system rewards substance, not seniority.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>6:00 PM - Someone Lies About You</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> A competitor posts a false accusation. It goes viral. Even after removal, screenshots circulate. Your reputation is damaged.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your 2-year trust history speaks louder than one accusation. The accuser&apos;s consistency score drops - their behavior doesn&apos;t match their history. The community sees the full picture.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>8:00 PM - You Upgrade Your Phone</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> Hours of password resets, re-entering SMS codes, re-verifying accounts. Some services lock you out for days.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your laptop and tablet already witness for you. They confirm the new phone belongs to the same person. Identity transfers in seconds - two of three devices agree. All your trust, history, and ATP move with you.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>9:00 PM - You Drop Your Phone</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You spend the evening resetting passwords, re-enabling 2FA, and hoping you didn&apos;t lose access to any accounts.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your laptop already witnessed your identity. Open the Web4 app on your laptop, confirm with biometrics, and you&apos;re back. When you get a new phone, your laptop vouches for it. The broken phone is automatically revoked.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.25rem' }}>9:00 PM - End of Day</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>Today:</strong> You have a follower count and likes. Numbers that mean nothing about who you actually are.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#10b981' }}>Web4:</strong> Your profile shows real dimensions: how skilled you are, how reliable you are, how you treat people. Built from hundreds of real interactions. Tomorrow, today&apos;s trust carries forward. Good days compound.
              </p>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem' }}>
                <strong style={{ color: '#38bdf8' }}>The pattern:</strong> Every scenario follows the same logic - actions cost energy, quality is rewarded, bad behavior has real consequences, and trust compounds over time. No moderators needed to police spam. The economics do that work; people still settle disputes.
              </p>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '0.5rem' }}>How would you actually get this?</p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#38bdf8' }}>Tier 1 - Browser extension:</strong> Adds trust signals to sites you already use (Reddit, Amazon, email). No new app needed.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#a78bfa' }}>Tier 2-3 - Standalone apps:</strong> Web4-native mail, marketplace, hiring - like the demos above. Regular phone apps, built on trust.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#34d399' }}>Tier 4-5 - Built into everything:</strong> Trust becomes infrastructure, like HTTPS. Your OS manages identity. Years away, but designed for.
              </p>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                Today, none of these exist - Web4 is research. But Tier 1 could ship as soon as the protocol stabilizes.
              </p>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.875rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              Continue learning:
              <a href="/tldr" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>2-minute overview</a> &middot;
              <a href="/first-contact" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>First Contact</a> &middot;
              <a href="/karma-consequences" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>Karma &amp; Consequences</a> &middot;
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
      description: 'You invested energy in others all day. In Web4, this kind of day compounds - your trust rises, your energy comes back, and the community is stronger for it.',
    };
  } else if (passiveChoices >= 4) {
    dayType = {
      label: 'Observer',
      emoji: '👁️',
      description: 'You watched more than you participated. That\'s fine - lurking is free in Web4. But builders earn trust and energy. Tomorrow you might want to jump in.',
    };
  } else if (totalAtpSpent > totalAtpEarned) {
    dayType = {
      label: 'Big Spender',
      emoji: '⚡',
      description: 'You spent more energy than you earned. In Web4, that\'s sustainable for a while - everyone starts with a budget. But long-term, you need to create value to stay alive.',
    };
  } else {
    dayType = {
      label: 'Balanced Participant',
      emoji: '⚖️',
      description: 'You mixed contributing with consuming. In Web4, this is sustainable - you\'re earning back what you spend while building a real reputation.',
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
          href="/karma-consequences"
          className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #0284c7, #7c3aed)' }}
        >
          How consequences compound →
        </Link>
        <Link
          href="/your-internet"
          className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors text-sm"
        >
          What would change for you? →
        </Link>
      </div>
      {/* Common questions - deep links to existing FAQs on /why-web4 */}
      <div className="mt-8 rounded-xl border border-gray-800 p-5 bg-gray-900/30">
        <p className="text-sm text-gray-400 mb-3 font-semibold">Common questions after reading this</p>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>
            <Link href="/why-web4#faq-infrastructure" className="text-sky-400 hover:underline">
              Who runs the infrastructure? How is this deployed?
            </Link>{' '}
           - no single company. Federated witnesses; W3C DID-compatible.
          </li>
          <li>
            <Link href="/why-web4#faq-many-identities" className="text-sky-400 hover:underline">
              Can&apos;t someone with lots of hardware create many identities?
            </Link>{' '}
           - expensive, not impossible. Raises the floor, not the ceiling.
          </li>
          <li>
            <Link href="/why-web4#faq-bootstrap-witnesses" className="text-sky-400 hover:underline">
              How do you bootstrap the initial witness network?
            </Link>{' '}
           - seed partners (universities, hardware vendors), then web-of-trust.
          </li>
        </ul>
      </div>

      <RelatedConcepts currentPath="/day-in-web4" />
      <ExplorerNav currentPath="/day-in-web4" />
    </div>
  );
}
