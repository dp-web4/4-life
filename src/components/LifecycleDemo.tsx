'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * LifecycleDemo - a 30-second auto-run of a single agent's Web4 lifecycle:
 * Birth → build trust → spam backfires → rebuild → established → death → rebirth.
 *
 * Purpose: the /how-it-works `#journey` section DESCRIBED this arc entirely in
 * prose. Visitor feedback (2026-07-02 MEDIUM #5) asked to "let me run it, don't
 * just describe it." This is the lightweight, purpose-built demo - pure React +
 * CSS, no WASM - that lets a first-time reader SEE the arc before reading the prose.
 *
 * NOTE ON NUMBERS: the seven stages below are a faithful subsample of the
 * canonical 16-tick Alice narrative in src/app/first-contact/page.tsx (the
 * `simulationEvents` array, ticks 0/1/4-5/6/9-10/13/14). If Alice's numbers ever
 * change there, mirror the change here so the two pages don't silently diverge.
 */

type Tone = 'neutral' | 'grow' | 'warn' | 'peak' | 'death' | 'reborn';

interface Stage {
  emoji: string;
  label: string;
  caption: string;
  atp: number; // energy budget, 0-120 scale (rebirth surplus is 112)
  trust: number; // T3, 0-1 scale (0.50 = neutral, below 0.50 = restricted)
  tone: Tone;
}

const ATP_MAX = 120;

const STAGES: Stage[] = [
  {
    emoji: '🐣',
    label: 'Birth',
    caption: 'Alice joins with 100 energy and neutral trust (0.50). Nobody knows her yet.',
    atp: 100,
    trust: 0.5,
    tone: 'neutral',
  },
  {
    emoji: '🌱',
    label: 'Build trust',
    caption: 'She posts something useful. It costs a little energy, but earns a little trust.',
    atp: 92,
    trust: 0.52,
    tone: 'grow',
  },
  {
    emoji: '⚠️',
    label: 'Spam backfires',
    caption:
      'A batch of low-effort spam costs 25 energy AND drops her below the 0.50 line - features get restricted.',
    atp: 74,
    trust: 0.48,
    tone: 'warn',
  },
  {
    emoji: '🔧',
    label: 'Rebuild',
    caption: 'Consistent, thoughtful replies slowly earn her trust back above the line.',
    atp: 70,
    trust: 0.5,
    tone: 'grow',
  },
  {
    emoji: '✨',
    label: 'Established',
    caption: 'Recognition for quality. Others confirm her work - energy flows back, trust climbs.',
    atp: 80,
    trust: 0.62,
    tone: 'peak',
  },
  {
    emoji: '💀',
    label: 'Death',
    caption: 'She overcommits, quality slips, energy drains to zero. Her entity dies - but her record persists.',
    atp: 0,
    trust: 0.51,
    tone: 'death',
  },
  {
    emoji: '🌅',
    label: 'Rebirth',
    caption:
      'Good karma carries forward: she is reborn with a surplus (112 energy) and trust above neutral. Lessons compound.',
    atp: 112,
    trust: 0.54,
    tone: 'reborn',
  },
];

const STEP_MS = 2600;

const toneAccent: Record<Tone, string> = {
  neutral: 'text-sky-400',
  grow: 'text-green-400',
  warn: 'text-amber-400',
  peak: 'text-cyan-300',
  death: 'text-red-400',
  reborn: 'text-emerald-400',
};

export default function LifecycleDemo() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Respect prefers-reduced-motion: don't auto-play; visitor steps manually.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % STAGES.length);
    }, STEP_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playing, index]);

  const stage = STAGES[index];
  const atpPct = Math.round((stage.atp / ATP_MAX) * 100);
  const trustPct = Math.round(stage.trust * 100);
  const belowLine = stage.trust < 0.5;

  const goTo = useCallback((i: number) => {
    setPlaying(false);
    setIndex(i);
  }, []);

  const restart = useCallback(() => {
    setIndex(0);
    setPlaying(true);
  }, []);

  const barTransition = reduceMotion ? 'none' : 'width 0.7s ease, background-color 0.5s ease';

  return (
    <div
      className="mb-10 p-5 bg-gray-900/60 border border-gray-700 rounded-xl"
      aria-label="Auto-running demonstration of an agent's lifecycle"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wide text-sky-400 font-semibold">
          Watch it run - one agent, one life
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="px-3 py-1 text-xs rounded bg-gray-800 border border-gray-600 text-gray-200 hover:bg-gray-700"
            aria-label={playing ? 'Pause the demo' : 'Play the demo'}
          >
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={restart}
            className="px-3 py-1 text-xs rounded bg-gray-800 border border-gray-600 text-gray-200 hover:bg-gray-700"
            aria-label="Restart the demo from birth"
          >
            ↺ Restart
          </button>
        </div>
      </div>

      {/* Stage marker + caption */}
      <div className="flex items-start gap-3 mb-4 min-h-[3.5rem]">
        <div className="text-4xl leading-none" aria-hidden="true">
          {stage.emoji}
        </div>
        <div>
          <div className={`text-lg font-semibold ${toneAccent[stage.tone]}`}>
            {index + 1}. {stage.label}
          </div>
          <p className="text-sm text-gray-300 leading-snug" aria-live="polite">
            {stage.caption}
          </p>
        </div>
      </div>

      {/* Energy (ATP) bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">
            🔋 Energy <span className="text-gray-600">(ATP)</span>
          </span>
          <span className="text-green-400 font-mono tabular-nums">{stage.atp}</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${atpPct}%`,
              backgroundColor: stage.atp === 0 ? '#7f1d1d' : '#10b981',
              transition: barTransition,
            }}
          />
        </div>
      </div>

      {/* Trust (T3) bar with 0.50 threshold marker */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">
            🤝 Trust <span className="text-gray-600">(T3)</span>
          </span>
          <span
            className={`font-mono tabular-nums ${belowLine ? 'text-amber-400' : 'text-purple-300'}`}
          >
            {stage.trust.toFixed(2)}
            {belowLine && <span className="ml-1 text-amber-400">· restricted</span>}
          </span>
        </div>
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          {/* 0.50 neutral / restriction threshold */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gray-500 z-10"
            style={{ left: '50%' }}
            aria-hidden="true"
          />
          <div
            className="h-full rounded-full"
            style={{
              width: `${trustPct}%`,
              backgroundColor: belowLine ? '#f59e0b' : '#a855f7',
              transition: barTransition,
            }}
          />
        </div>
        <p className="text-[11px] text-gray-600 mt-1">
          The thin line is 0.50 - neutral trust. Drop below it and the society restricts you.
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {STAGES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => goTo(i)}
            aria-label={`Jump to stage ${i + 1}: ${s.label}`}
            aria-current={i === index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index ? 'bg-sky-400' : 'bg-gray-700 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
      <p className="text-center text-[11px] text-gray-600 mt-2">
        Same rules, same numbers you can drive yourself in{' '}
        <a href="/first-contact" className="text-sky-500 hover:underline">
          First Contact
        </a>
        .
      </p>
    </div>
  );
}
