'use client';

import { useState, useCallback } from 'react';

/**
 * LCTSetupMockup
 *
 * Three steppable phone-frame panels showing what the first 5 minutes of LCT
 * setup actually look like. Addresses recurring "what does the UI actually
 * look like?" visitor friction (Mar 7, Mar 9, Apr 30 visitor logs).
 *
 * Pure CSS/SVG. No image assets. No icon library.
 */

type Step = 0 | 1 | 2;

const STEPS: Array<{
  label: string;
  minute: string;
  caption: string;
}> = [
  {
    label: 'Create',
    minute: 'Minute 0:00',
    caption: 'Your device’s security chip generates a key pair. No email, no password.',
  },
  {
    label: 'Pair',
    minute: 'Minute 1:00',
    caption: 'Scan a QR code with a second device. The two devices witness each other.',
  },
  {
    label: 'Contribute',
    minute: 'Minute 3:00',
    caption: 'You make your first post. ATP is spent. Trust starts building from a low-but-nonzero baseline.',
  },
];

/* ─── Phone-frame wrapper ──────────────────────────────── */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[260px] rounded-[2rem] bg-gray-950 border border-gray-700 shadow-xl shadow-black/40 p-2">
      {/* Top notch */}
      <div className="mx-auto mb-1 h-4 w-20 rounded-b-xl bg-gray-950 border-x border-b border-gray-800" />
      {/* Screen */}
      <div className="rounded-[1.4rem] bg-gray-900 border border-gray-800 overflow-hidden h-[420px] flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 text-[10px] text-gray-500 border-b border-gray-800/60">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full border border-gray-600" />
            <span className="font-medium text-gray-400">Web4</span>
          </span>
        </div>
        {children}
      </div>
      {/* Home indicator */}
      <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-gray-700" />
    </div>
  );
}

/* ─── Step 1: Create Account ───────────────────────────── */

function CreateScreen() {
  return (
    <div className="flex-1 flex flex-col p-4">
      <p className="text-[11px] uppercase tracking-wider text-sky-400 mb-2">Welcome</p>
      <h3 className="text-base font-semibold text-gray-100 mb-3 leading-tight">
        Create your identity
      </h3>
      <div className="rounded-lg bg-gray-800/70 border border-gray-700 p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex w-6 h-6 rounded-md bg-emerald-900/40 border border-emerald-700 items-center justify-center text-emerald-400 text-xs">&#10003;</span>
          <span className="text-xs text-gray-300">Security chip detected</span>
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed">
          TPM 2.0 found. Generating cryptographic key pair on-device.
        </p>
      </div>
      <label className="text-[10px] text-gray-500 mb-1">Display name</label>
      <div className="rounded-md bg-gray-950 border border-gray-700 px-2.5 py-1.5 mb-3">
        <span className="text-xs text-gray-200">Alex</span>
      </div>
      <p className="text-[10px] text-gray-500 mb-auto leading-relaxed">
        No email. No password. Identity lives in the hardware, not a username.
      </p>
      <button
        type="button"
        className="w-full mt-3 rounded-md bg-sky-700/80 hover:bg-sky-600 text-white text-xs font-medium py-2 transition-colors"
        tabIndex={-1}
        aria-hidden
      >
        Create account
      </button>
    </div>
  );
}

/* ─── Step 2: Pair Second Device (QR) ──────────────────── */

function PairScreen() {
  return (
    <div className="flex-1 flex flex-col p-4">
      <p className="text-[11px] uppercase tracking-wider text-sky-400 mb-2">Strengthen identity</p>
      <h3 className="text-base font-semibold text-gray-100 mb-3 leading-tight">
        Pair a second device
      </h3>
      {/* QR mock */}
      <div className="mx-auto mb-3 w-32 h-32 rounded-md bg-white p-2">
        <div className="grid grid-cols-8 gap-[2px] w-full h-full">
          {Array.from({ length: 64 }).map((_, i) => {
            // Pseudo-random checker pattern. Stable across renders since index-derived.
            const on = (i * 37 + (i % 5) * 11) % 7 < 3;
            return (
              <div
                key={i}
                className={on ? 'bg-gray-900' : 'bg-white'}
              />
            );
          })}
        </div>
      </div>
      <div className="rounded-lg bg-gray-800/70 border border-gray-700 p-2.5 mb-2">
        <div className="flex items-start gap-2">
          <span className="text-sky-400 text-xs mt-px">&#9678;</span>
          <p className="text-[10px] text-gray-300 leading-relaxed">
            Open Web4 on your laptop. Scan this code. The two devices will witness each other.
          </p>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mt-auto leading-relaxed">
        Two witnessing devices &rarr; trust ceiling rises.{' '}
        <span className="text-gray-400">No copy-paste codes. No SMS.</span>
      </p>
    </div>
  );
}

/* ─── Step 3: First Contribution ───────────────────────── */

function ContributeScreen() {
  return (
    <div className="flex-1 flex flex-col p-4">
      <p className="text-[11px] uppercase tracking-wider text-sky-400 mb-2">Home Repair community</p>
      <h3 className="text-base font-semibold text-gray-100 mb-3 leading-tight">
        Your first post
      </h3>
      {/* Compose card */}
      <div className="rounded-lg bg-gray-800/70 border border-gray-700 p-3 mb-3">
        <p className="text-xs text-gray-300 leading-snug mb-2">
          &ldquo;Replacing a kitchen faucet washer &mdash; here’s the size chart I used.&rdquo;
        </p>
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <span>Cost: <span className="text-amber-400 font-medium">8 ATP</span></span>
          <span>Newcomer rate: <span className="text-amber-400">1.4&times;</span></span>
        </div>
      </div>
      {/* Trust + ATP after */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="rounded-md bg-gray-950/60 border border-gray-800 p-2">
          <p className="text-[9px] uppercase tracking-wider text-gray-500">Trust</p>
          <p className="text-sm font-semibold text-sky-400">0.50</p>
          <div className="mt-1 h-1 rounded-full bg-gray-800">
            <div className="h-full rounded-full bg-sky-500" style={{ width: '50%' }} />
          </div>
        </div>
        <div className="rounded-md bg-gray-950/60 border border-gray-800 p-2">
          <p className="text-[9px] uppercase tracking-wider text-gray-500">ATP</p>
          <p className="text-sm font-semibold text-emerald-400">42 / 50</p>
          <div className="mt-1 h-1 rounded-full bg-gray-800">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '84%' }} />
          </div>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mt-auto leading-relaxed">
        Posted. Verified identity, no spam to your feed. As helpful votes arrive, your trust climbs.
      </p>
    </div>
  );
}

/* ─── Component ────────────────────────────────────────── */

export default function LCTSetupMockup() {
  const [step, setStep] = useState<Step>(0);

  const next = useCallback(() => {
    setStep((s) => (s < 2 ? ((s + 1) as Step) : s));
  }, []);
  const prev = useCallback(() => {
    setStep((s) => (s > 0 ? ((s - 1) as Step) : s));
  }, []);

  const meta = STEPS[step];

  return (
    <div className="my-4 rounded-xl bg-gray-900/50 border border-gray-700 p-4">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {STEPS.map((s, i) => {
          const active = i === step;
          const past = i < step;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setStep(i as Step)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors ${
                active
                  ? 'bg-sky-700 text-white'
                  : past
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
              }`}
              aria-current={active ? 'step' : undefined}
              aria-label={`Step ${i + 1}: ${s.label}`}
            >
              <span className="font-mono text-[10px] opacity-70">{i + 1}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Phone-frame screens */}
      <div className="mb-3">
        {step === 0 && <PhoneFrame><CreateScreen /></PhoneFrame>}
        {step === 1 && <PhoneFrame><PairScreen /></PhoneFrame>}
        {step === 2 && <PhoneFrame><ContributeScreen /></PhoneFrame>}
      </div>

      {/* Caption */}
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-wider text-sky-400/80">{meta.minute}</p>
        <p className="text-sm text-gray-300 mt-1 max-w-md mx-auto leading-relaxed">{meta.caption}</p>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className="rounded-md bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-gray-800 text-gray-200 text-xs px-3 py-1.5 transition-colors"
        >
          &larr; Prev
        </button>
        <span className="text-[10px] text-gray-500">{step + 1} of {STEPS.length}</span>
        <button
          type="button"
          onClick={next}
          disabled={step === 2}
          className="rounded-md bg-sky-700 hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-sky-700 text-white text-xs px-3 py-1.5 transition-colors"
        >
          Next &rarr;
        </button>
      </div>

      <p className="text-[10px] text-gray-500 italic text-center mt-3">
        Conceptual mockup, not a final design. The real interfaces will be built by communities that adopt Web4.
      </p>
    </div>
  );
}
