'use client';

import { useState } from 'react';
import Link from 'next/link';
import WireframeFrame from '@/components/WireframeFrame';

/* ─── Web4 Talent ───────────────────────────────────────── */

const CANDIDATES = [
  {
    name: 'Sarah K.', projects: 156, badge: 'Verified', badgeColor: 'text-emerald-400 bg-emerald-950/50',
    t3: { talent: 0.91, training: 0.87, temperament: 0.94 },
    detail: {
      topSkills: ['Brand Identity', 'Typography', 'Motion Graphics'],
      recentWork: '4.9 avg quality across last 20 projects',
      responseTime: 'Usually replies within 2 hours',
      rate: '45 ATP/hour — high-trust discount applied (30% off)',
    },
  },
  {
    name: 'Alex M.', projects: 3, badge: 'New', badgeColor: 'text-amber-400 bg-amber-950/50',
    t3: { talent: 0.62, training: 0.55, temperament: 0.70 },
    detail: {
      topSkills: ['Illustration', 'Photoshop'],
      recentWork: '3 projects completed, all rated above average',
      responseTime: 'Usually replies within 6 hours',
      rate: '20 ATP/hour — newcomer rate (no discount yet)',
    },
  },
];

export function InteractiveTalentWireframe() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <WireframeFrame title="Web4 Talent" url="talent.web4.local/project/logo-design">
      <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="text-sm font-medium text-gray-300">Applicants — Logo Design</span>
          <span className="text-xs text-gray-500 ml-auto">2 candidates</span>
        </div>
        <div className="p-4 space-y-3">
          {CANDIDATES.map((c, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-700 overflow-hidden transition-colors hover:border-gray-600 cursor-pointer"
              style={{ background: 'rgba(15, 23, 42, 0.5)' }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-200 text-sm">{c.name}</span>
                  <span className={`text-xs ${c.badgeColor} px-2 py-0.5 rounded-full`}>
                    {c.badge} — {c.projects} projects
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  {Object.entries(c.t3).map(([dim, val]) => (
                    <div key={dim}>
                      <div className="text-gray-500 mb-0.5 capitalize">{dim}</div>
                      <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${val >= 0.7 ? 'bg-sky-400' : 'bg-amber-400'}`}
                          style={{ width: `${val * 100}%` }}
                        />
                      </div>
                      <div className={`font-mono mt-0.5 ${val >= 0.7 ? 'text-sky-400' : 'text-amber-400'}`}>
                        {val.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {c.projects >= 100
                    ? "Scores from real interactions, verified by hardware-bound identity. Can\u2019t be faked."
                    : "Limited history \u2014 lower cost, but you\u2019re taking more of a risk. Trust builds with time."}
                </p>
              </div>
              {expanded === i && (
                <div className="border-t border-gray-700 p-3 bg-gray-900/40 text-xs space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {c.detail.topSkills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-gray-800 text-gray-300">{skill}</span>
                    ))}
                  </div>
                  <div className="space-y-1 text-gray-400">
                    <div>{c.detail.recentWork}</div>
                    <div>{c.detail.responseTime}</div>
                    <div>{c.detail.rate}</div>
                  </div>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 px-3 py-1.5 rounded bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600/50 transition-colors text-xs"
                  >
                    Send project brief (costs 3 ATP)
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
          <span className="text-purple-400/70">Click a candidate</span> to see skills and rates. No fake portfolios — trust scores earned through real projects.
        </div>
      </div>
    </WireframeFrame>
  );
}

/* ─── Web4 Reviews ──────────────────────────────────────── */

const REVIEWS = [
  {
    initials: 'R', name: 'Rachel T.', trust: 0.83, cost: 5, rating: 5,
    text: '\u201CThe dan dan noodles are incredible. We\u2019ve been coming here monthly for two years.\u201D',
    t3: { talent: 0.85, training: 0.80, temperament: 0.84 },
    summary: '43 restaurant reviews \u00B7 89% marked helpful',
  },
  {
    initials: 'J', name: 'James W.', trust: 0.71, cost: 5, rating: 4,
    text: '\u201CGood food, slow service on weekends. Weekday lunch is the move.\u201D',
    t3: { talent: 0.74, training: 0.68, temperament: 0.72 },
    summary: '12 restaurant reviews \u00B7 75% marked helpful',
  },
];

export function InteractiveReviewsWireframe() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <WireframeFrame title="Web4 Reviews" url="reviews.web4.local/golden-dragon">
      <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-sm font-medium text-gray-300">Golden Dragon — 89 reviews</span>
          <span className="text-xs text-amber-400 font-mono ml-auto">4.6 ★</span>
        </div>
        <div className="p-4 space-y-3">
          {REVIEWS.map((r, i) => (
            <div key={i}>
              <div
                className="flex items-start gap-3 cursor-pointer hover:bg-gray-800/20 rounded-lg p-1 -m-1 transition-colors"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 shrink-0 mt-0.5">
                  {r.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-200">{r.name}</span>
                    <span className="text-xs font-mono text-emerald-400">{r.trust.toFixed(2)}</span>
                    <span className="text-xs text-gray-600">\u00B7 cost {r.cost} ATP to post</span>
                  </div>
                  <p className="text-xs text-gray-400">{r.text}</p>
                </div>
                <span className="text-xs text-amber-400 shrink-0">
                  {'\u2605'.repeat(r.rating)}{'\u2606'.repeat(5 - r.rating)}
                </span>
              </div>
              {expanded === i && (
                <div className="ml-10 mt-2 p-3 bg-gray-800/40 rounded-lg text-xs">
                  <div className="text-gray-500 mb-2 font-medium">Reviewer Trust Profile</div>
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    {Object.entries(r.t3).map(([dim, val]) => (
                      <div key={dim}>
                        <div className="text-gray-500 capitalize mb-0.5">{dim}</div>
                        <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-400" style={{ width: `${val * 100}%` }} />
                        </div>
                        <div className="text-emerald-400 font-mono mt-0.5">{val.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-500">{r.summary}</div>
                  <p className="text-gray-600 mt-1">
                    Every score traces back to real interactions.{' '}
                    <Link href="/trust-tensor" className="text-sky-400 hover:underline">How trust works \u2192</Link>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
          <span className="text-amber-400/70">Click a reviewer</span> to see their trust profile. Every review cost energy — no review farms.
        </div>
      </div>
    </WireframeFrame>
  );
}

/* ─── Web4 Social ───────────────────────────────────────── */

const SOCIAL_POSTS = [
  {
    initials: 'L', name: 'Dr. Lisa Park', trust: 0.92, role: 'Nutritionist', trustColor: 'text-emerald-400',
    text: '\u201CNew research on intermittent fasting \u2014 the 16:8 claims are overstated. Here\u2019s what the data actually shows...\u201D',
    helpful: 47, earned: 94, cost: 3, flagged: 0, lowTrust: false,
  },
  {
    initials: 'M', name: "Mike\u2019s Supplements", trust: 0.31, role: '', trustColor: 'text-red-400',
    text: '\u201CThis ONE trick reverses aging! Buy now...\u201D',
    helpful: 2, earned: 4, cost: 15, flagged: 38, lowTrust: true,
  },
  {
    initials: 'T', name: 'Tomas R.', trust: 0.58, role: 'New member (2 weeks)', trustColor: 'text-sky-400',
    text: '\u201CHas anyone tried the new bike path along the river? Took some photos today.\u201D',
    helpful: 12, earned: 24, cost: 5, flagged: 0, lowTrust: false,
  },
];

export function InteractiveSocialWireframe() {
  const [interactions, setInteractions] = useState<Record<number, 'helpful' | 'flagged' | null>>({});
  const [atpSpent, setAtpSpent] = useState(0);

  const handleInteraction = (postIdx: number, action: 'helpful' | 'flagged') => {
    setInteractions(prev => {
      const current = prev[postIdx];
      if (current === action) {
        setAtpSpent(s => s - 1);
        return { ...prev, [postIdx]: null };
      }
      if (!current) setAtpSpent(s => s + 1);
      return { ...prev, [postIdx]: action };
    });
  };

  return (
    <WireframeFrame title="Web4 Social" url="social.web4.local/feed">
      <div className="overflow-hidden" style={{ background: 'rgba(17, 24, 39, 0.8)' }}>
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-gray-300">Community Feed</span>
          <div className="ml-auto flex items-center gap-2">
            {atpSpent > 0 && <span className="text-xs text-orange-400">\u2212{atpSpent} ATP spent</span>}
            <span className="text-xs text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded">Trust-weighted</span>
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {SOCIAL_POSTS.map((post, i) => {
            const userAction = interactions[i] || null;
            return (
              <div key={i} className={`px-4 py-3 ${post.lowTrust ? 'bg-amber-950/10' : ''}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">{post.initials}</div>
                  <span className="text-sm font-medium text-gray-200">{post.name}</span>
                  <span className={`text-xs font-mono ${post.trustColor}`}>{post.trust.toFixed(2)}</span>
                  {post.role && <span className="text-xs text-gray-600">\u00B7 {post.role}</span>}
                  {post.lowTrust && <span className="text-xs text-amber-500 bg-amber-950/50 px-1.5 py-0.5 rounded">Low trust</span>}
                </div>
                <p className={`text-xs mb-2 ${post.lowTrust ? 'text-gray-500' : 'text-gray-300'}`}>{post.text}</p>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <button
                    onClick={() => handleInteraction(i, 'helpful')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      userAction === 'helpful'
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                        : 'hover:text-gray-400'
                    }`}
                  >
                    \uD83D\uDC4D {post.helpful + (userAction === 'helpful' ? 1 : 0)} helpful
                    {userAction === 'helpful' && <span className="text-emerald-500 ml-1">(\u22121 ATP)</span>}
                  </button>
                  <button
                    onClick={() => handleInteraction(i, 'flagged')}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                      userAction === 'flagged'
                        ? 'bg-red-950/50 text-red-400 border border-red-800/50'
                        : 'hover:text-gray-400'
                    }`}
                  >
                    \uD83D\uDEA9 {post.flagged + (userAction === 'flagged' ? 1 : 0)} flagged
                    {userAction === 'flagged' && <span className="text-red-500 ml-1">(\u22121 ATP)</span>}
                  </button>
                  <span>\u00B7</span>
                  <span>Cost poster: {post.cost} ATP</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
          <span className="text-emerald-400/70">Try the buttons</span> \u2014 every action costs 1 ATP. Flagging low-trust content is how communities self-moderate.
        </div>
      </div>
    </WireframeFrame>
  );
}

/* ─── Web4 Market ───────────────────────────────────────── */

const ESCROW_STEPS = [
  { label: 'You click \u201CBuy\u201D', detail: '2 ATP escrow fee deducted (reduced \u2014 seller has high trust)', icon: '\uD83D\uDED2' },
  { label: 'ATP held in escrow', detail: '350 ATP locked. Neither party can touch it until delivery confirmed.', icon: '\uD83D\uDD12' },
  { label: 'Seller ships camera', detail: 'Shipment logged. Seller\u2019s Temperament score at stake if they ghost.', icon: '\uD83D\uDCE6' },
  { label: 'You confirm receipt', detail: '350 ATP released to seller. Both trust scores updated. Transaction complete.', icon: '\u2705' },
];

export function InteractiveMarketWireframe() {
  const [showEscrow, setShowEscrow] = useState(false);
  const [escrowStep, setEscrowStep] = useState(0);

  return (
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
                <div><span className="text-gray-500">As seller</span><div className="text-emerald-400 font-mono">0.91</div></div>
                <div><span className="text-gray-500">Transactions</span><div className="text-gray-300">43 completed</div></div>
                <div><span className="text-gray-500">Disputes</span><div className="text-gray-300">0</div></div>
              </div>
              <p className="text-xs text-gray-500">Trust earned through 43 real transactions — not self-reported star ratings.</p>
            </div>
          </div>
          {/* Trust assessment */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-xs mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Your risk assessment</span>
              <span className="text-emerald-400">Low risk</span>
            </div>
            <div className="space-y-1.5 text-gray-500">
              <div className="flex justify-between"><span>Seller trust (as seller role)</span><span className="text-emerald-400">0.91</span></div>
              <div className="flex justify-between"><span>Connection distance</span><span className="text-gray-300">2 hops (friend of a friend)</span></div>
              <div className="flex justify-between">
                <span>
                  <Link href="/markov-relevancy-horizon" className="text-sky-400 hover:underline">Distance-adjusted trust</Link>
                  {' '}<span className="text-gray-600">(trust fades with distance)</span>
                </span>
                <span className="text-sky-400">0.64</span>
              </div>
              <div className="flex justify-between"><span>Escrow cost</span><span className="text-gray-300">2 ATP (reduced — high seller trust)</span></div>
            </div>
          </div>
          {/* Buy button / Escrow flow */}
          {!showEscrow ? (
            <div>
              <button
                onClick={() => { setShowEscrow(true); setEscrowStep(0); }}
                className="w-full py-2 rounded-lg bg-violet-600/30 border border-violet-500/40 text-violet-300 hover:bg-violet-600/50 transition-colors text-sm font-medium"
              >
                Buy for 350 ATP — see how escrow works
              </button>
              <p className="text-xs text-gray-600 mt-1.5 text-center">
                ATP is both your energy budget <em>and</em> your currency — the same resource you spend on actions also works as a medium of exchange.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {ESCROW_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 p-2 rounded-lg text-xs transition-all ${
                    i <= escrowStep ? 'bg-violet-950/30 border border-violet-800/30' : 'opacity-30'
                  }`}
                >
                  <span className="text-base shrink-0">{step.icon}</span>
                  <div className="flex-1">
                    <div className={`font-medium ${i <= escrowStep ? 'text-violet-300' : 'text-gray-500'}`}>{step.label}</div>
                    <div className="text-gray-500">{step.detail}</div>
                  </div>
                  {i === escrowStep && i < ESCROW_STEPS.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setEscrowStep(s => s + 1); }}
                      className="ml-auto shrink-0 px-2 py-1 rounded bg-violet-600/30 border border-violet-500/40 text-violet-300 hover:bg-violet-600/50 transition-colors"
                    >
                      Next \u2192
                    </button>
                  )}
                </div>
              ))}
              {escrowStep === ESCROW_STEPS.length - 1 && (
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    No escrow company. No PayPal. Trust scores replace intermediaries.{' '}
                    <Link href="/atp-economics" className="text-sky-400 hover:underline">How ATP works \u2192</Link>
                  </p>
                  <button
                    onClick={() => { setShowEscrow(false); setEscrowStep(0); }}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    Reset demo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
          <span className="text-violet-400/70">{showEscrow ? 'Step through the escrow flow' : 'Click \u201CBuy\u201D'}</span> — every number traces back to real interactions with real people.
        </div>
      </div>
    </WireframeFrame>
  );
}
