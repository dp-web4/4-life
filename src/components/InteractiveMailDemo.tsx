'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

/* ─── Types ────────────────────────────────────────────── */

interface MailMessage {
  id: string;
  from: string;
  trust: number;
  cost: number;
  subject: string;
  time: string;
  body: string;
  trustBreakdown: { talent: number; training: number; temperament: number };
}

type DemoView = 'inbox' | 'compose' | 'spam-demo';

/* ─── Data ─────────────────────────────────────────────── */

const INBOX_MESSAGES: MailMessage[] = [
  {
    id: 'msg-1',
    from: 'Maya Chen',
    trust: 0.87,
    cost: 2,
    subject: 'Re: Kitchen faucet fix',
    time: '9:12 AM',
    body: 'Hey! That washer replacement tip worked perfectly — no more dripping. Saved me a plumber visit. Thanks for the detailed walkthrough!',
    trustBreakdown: { talent: 0.84, training: 0.89, temperament: 0.88 },
  },
  {
    id: 'msg-2',
    from: 'Dev Community',
    trust: 0.91,
    cost: 5,
    subject: 'Your answer was marked helpful (+20 ATP)',
    time: '9:45 AM',
    body: '3 community members confirmed your faucet repair answer as helpful. You earned 20 ATP. Your trust in the Home Repair role increased by +0.03.',
    trustBreakdown: { talent: 0.93, training: 0.90, temperament: 0.91 },
  },
  {
    id: 'msg-3',
    from: 'New Contact',
    trust: 0.43,
    cost: 8,
    subject: 'Freelance inquiry',
    time: '10:30 AM',
    body: 'Hi, I found your profile through a friend-of-a-friend. I\'m looking for someone to help with a small plumbing project. Are you available this weekend? I\'m new here so my trust score is still building up.',
    trustBreakdown: { talent: 0.45, training: 0.40, temperament: 0.44 },
  },
];

/* ─── Trust color helper ───────────────────────────────── */

function trustColor(score: number): string {
  if (score >= 0.7) return 'text-emerald-400';
  if (score >= 0.5) return 'text-sky-400';
  return 'text-amber-400';
}

function trustBg(score: number): string {
  if (score >= 0.7) return 'bg-emerald-400';
  if (score >= 0.5) return 'bg-sky-400';
  return 'bg-amber-400';
}

/* ─── Component ────────────────────────────────────────── */

export default function InteractiveMailDemo() {
  const [view, setView] = useState<DemoView>('inbox');
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const [composeText, setComposeText] = useState('');
  const [composeSent, setComposeSent] = useState(false);
  const [spamStep, setSpamStep] = useState(0);
  const [spamRunning, setSpamRunning] = useState(false);

  const toggleMsg = useCallback((id: string) => {
    setExpandedMsg(prev => prev === id ? null : id);
  }, []);

  const handleComposeSend = useCallback(() => {
    if (composeText.trim().length > 0) {
      setComposeSent(true);
    }
  }, [composeText]);

  const resetCompose = useCallback(() => {
    setComposeText('');
    setComposeSent(false);
  }, []);

  const runSpamDemo = useCallback(() => {
    setSpamStep(0);
    setSpamRunning(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setSpamStep(step);
      if (step >= 5) {
        clearInterval(interval);
        setSpamRunning(false);
      }
    }, 800);
  }, []);

  return (
    <div className="mb-10 rounded-xl overflow-hidden shadow-xl shadow-black/30 border border-gray-600/50">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-400 ml-2 font-medium">Web4 Mail</span>
        <div className="ml-auto flex items-center gap-1.5 bg-gray-900/60 rounded-md px-3 py-1 max-w-[50%]">
          <svg className="w-3 h-3 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-500 truncate font-mono">mail.web4.local/inbox</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-800/50 border-b border-gray-700/50">
        {([
          ['inbox', 'Inbox', '3'],
          ['compose', 'Compose', null],
          ['spam-demo', 'What about spam?', null],
        ] as [DemoView, string, string | null][]).map(([key, label, badge]) => (
          <button
            key={key}
            onClick={() => { setView(key); setExpandedMsg(null); }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              view === key
                ? 'bg-sky-500/20 text-sky-400'
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-700/30'
            }`}
          >
            {label}
            {badge && <span className="ml-1.5 text-[10px] bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded-full">{badge}</span>}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{ background: 'rgba(17, 24, 39, 0.8)' }} className="min-h-[280px]">

        {/* ─── INBOX VIEW ─── */}
        {view === 'inbox' && (
          <>
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-700" style={{ background: 'rgba(15, 23, 42, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-sm font-medium text-gray-300">Messages</span>
              <span className="text-xs text-gray-500 ml-auto">Click a message to read it</span>
            </div>
            <div className="divide-y divide-gray-800">
              {INBOX_MESSAGES.map(msg => (
                <div key={msg.id}>
                  <button
                    onClick={() => toggleMsg(msg.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/30 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 shrink-0">
                      {msg.from[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-200">{msg.from}</span>
                        <span className={`text-xs font-mono ${trustColor(msg.trust)}`}>
                          {msg.trust.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{msg.subject}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-gray-600">{msg.time}</div>
                      <div className="text-xs text-gray-600">cost sender {msg.cost} ATP</div>
                    </div>
                    <svg className={`w-4 h-4 text-gray-600 shrink-0 transition-transform ${expandedMsg === msg.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded message */}
                  {expandedMsg === msg.id && (
                    <div className="px-4 pb-4 pt-1 border-t border-gray-800/50">
                      <p className="text-sm text-gray-300 mb-3 leading-relaxed">{msg.body}</p>
                      {/* Trust breakdown */}
                      <div className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-2 font-medium">Sender&apos;s Trust Profile</div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          {(['talent', 'training', 'temperament'] as const).map(dim => (
                            <div key={dim}>
                              <div className="text-gray-500 mb-1 capitalize">{dim}</div>
                              <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${trustBg(msg.trustBreakdown[dim])}`}
                                  style={{ width: `${msg.trustBreakdown[dim] * 100}%` }}
                                />
                              </div>
                              <div className={`font-mono mt-0.5 ${trustColor(msg.trustBreakdown[dim])}`}>
                                {msg.trustBreakdown[dim].toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          These scores are earned through real interactions — not self-reported.{' '}
                          <Link href="/trust-tensor" className="text-sky-400 hover:underline">How trust works →</Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 py-2 text-xs text-gray-600 border-t border-gray-800">
              0 spam — messages cost energy to send. Bots can&apos;t afford to reach you.
            </div>
          </>
        )}

        {/* ─── COMPOSE VIEW ─── */}
        {view === 'compose' && (
          <div className="p-4">
            {!composeSent ? (
              <>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">To:</div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded bg-gray-900/50 border border-gray-700/50">
                    <span className="text-sm text-gray-300">Maya Chen</span>
                    <span className="text-xs font-mono text-emerald-400">0.87</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-1">Message:</div>
                  <textarea
                    value={composeText}
                    onChange={e => setComposeText(e.target.value)}
                    placeholder="Type a message..."
                    rows={3}
                    className="w-full px-3 py-2 rounded bg-gray-900/50 border border-gray-700/50 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                {/* ATP cost breakdown */}
                <div className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Message cost</span>
                    <span className="text-sky-400 font-mono">2 ATP</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Your trust with Maya</span>
                    <span className="text-emerald-400 font-mono">0.87 — high trust discount</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-gray-700/50">
                    <span className="text-gray-400 font-medium">Your balance after sending</span>
                    <span className="text-gray-300 font-mono">148 → 146 ATP</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Every message costs energy. High mutual trust = lower cost.
                    A stranger pays more. A spammer pays too much.{' '}
                    <Link href="/atp-economics" className="text-sky-400 hover:underline">How ATP works →</Link>
                  </p>
                </div>
                <button
                  onClick={handleComposeSend}
                  disabled={composeText.trim().length === 0}
                  className="px-4 py-2 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-medium hover:bg-sky-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Send (−2 ATP)
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-sm text-gray-300 mb-1">Message sent to Maya Chen</p>
                <p className="text-xs text-gray-500 mb-4">Cost: 2 ATP · Balance: 146 ATP</p>
                <p className="text-xs text-gray-600 mb-4">
                  Maya will see your trust score (0.87) alongside the message —
                  she knows you&apos;re a real person with a real reputation.
                </p>
                <button
                  onClick={resetCompose}
                  className="px-3 py-1.5 rounded text-xs text-gray-400 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                >
                  Compose another
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── SPAM DEMO VIEW ─── */}
        {view === 'spam-demo' && (
          <div className="p-4">
            <p className="text-sm text-gray-300 mb-1">Why you&apos;ll never see spam in Web4 Mail</p>
            <p className="text-xs text-gray-500 mb-4">
              On today&apos;s internet, sending email is essentially free — so spammers send millions.
              In Web4, every message costs the sender energy (ATP). Watch what happens when a
              spammer tries:
            </p>

            {spamStep === 0 && !spamRunning && (
              <button
                onClick={runSpamDemo}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors"
              >
                ▶ Simulate spam attack
              </button>
            )}

            {(spamStep > 0 || spamRunning) && (
              <div className="space-y-2">
                {/* Step 1: Spammer appears */}
                <SpamStep
                  active={spamStep >= 1}
                  icon="🤖"
                  text={<>Spammer &quot;BuyNow Bot&quot; has <span className="text-amber-400 font-mono">100 ATP</span> and wants to send 1,000 messages</>}
                />

                {/* Step 2: First batch */}
                {spamStep >= 2 && (
                  <SpamStep
                    active
                    icon="📤"
                    text={<>Sends 10 messages × 15 ATP each (low trust = high cost). Balance: <span className="text-amber-400 font-mono">100 → 0 ATP</span></>}
                  />
                )}

                {/* Step 3: Bankrupt */}
                {spamStep >= 3 && (
                  <SpamStep
                    active
                    icon="💀"
                    text={<>ATP exhausted. BuyNow Bot can&apos;t send message #11. <span className="text-red-400">No energy = no actions.</span></>}
                  />
                )}

                {/* Step 4: Consequences */}
                {spamStep >= 4 && (
                  <SpamStep
                    active
                    icon="📉"
                    text={<>Recipients flagged the 10 messages → trust drops to <span className="text-red-400 font-mono">0.12</span>. Next time, each message would cost <span className="text-red-400 font-mono">25+ ATP</span></>}
                  />
                )}

                {/* Step 5: Summary */}
                {spamStep >= 5 && (
                  <div className="mt-4 bg-gray-900/60 border border-gray-700/50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                      <div>
                        <div className="text-gray-500 mb-1">Today&apos;s email</div>
                        <div className="text-red-400">1,000 spam messages sent</div>
                        <div className="text-gray-600">Cost to spammer: ~$0</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Web4 Mail</div>
                        <div className="text-emerald-400">10 messages, then bankrupt</div>
                        <div className="text-gray-600">Cost: all their energy + reputation</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      No filters. No AI detection. No blocklists.
                      Spam dies because it&apos;s economically impossible — the sender runs out of energy before reaching you.{' '}
                      <Link href="/atp-economics" className="text-sky-400 hover:underline">Learn about ATP →</Link>
                    </p>
                    <button
                      onClick={() => { setSpamStep(0); setSpamRunning(false); }}
                      className="mt-2 px-3 py-1.5 rounded text-xs text-gray-400 hover:text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    >
                      Reset demo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Spam step sub-component ──────────────────────────── */

function SpamStep({ active, icon, text }: { active: boolean; icon: string; text: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
      active ? 'bg-gray-800/40 opacity-100' : 'opacity-0'
    }`}>
      <span className="text-lg shrink-0">{icon}</span>
      <p className="text-xs text-gray-300 pt-1">{text}</p>
    </div>
  );
}
