"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import { trackPageVisit } from "@/lib/exploration";
import InProduction from "@/components/InProduction";

/**
 * Identity Constellation Explainer
 *
 * Makes the multi-device LCT binding concept comprehensible to humans.
 *
 * Core insight: Traditional identity treats additional devices as risk.
 * Web4 inverts this - more devices witnessing your identity makes it STRONGER.
 */

export default function IdentityConstellationPage() {
  const [deviceCount, setDeviceCount] = useState(2);

  useEffect(() => { trackPageVisit('identity-constellation'); }, []);

  // Trust increases with witness count (simplified model)
  const constellationTrust = Math.min(0.95, 0.3 + (deviceCount * 0.15));

  // Attack difficulty increases exponentially
  const attackDifficulty = Math.pow(2, deviceCount);

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs currentPath="/identity-constellation" />
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-100">
          Identity Constellations
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Why Web4 identity gets <span className="font-bold text-sky-400">stronger</span> with more devices,
          not weaker
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mt-4">
          One entity across many devices: a constellation of hardware-bound keys forms a single witnessed
          identity. This is how{" "}
          <Link href="/hestia" className="text-sky-400 hover:underline">hestia</Link>{" "}
          handles multi-device identity.
        </p>
      </div>

      <InProduction concept="constellation" />

      {/* Aug-01 visitor Unanswered Question 8, which the friction table never filed: "If nothing
          has a live network, who am I being witnessed by? Hestia runs locally, the hub is
          pilot-ready with no users, hardbound is unreachable. Witnessing needs other participants,
          and I couldn't work out where they'd come from on day one of a real deployment."
          This is the page their own question routes them to (the nav registry lists it related to
          both /lct-explainer and /hestia), and it had NO maturity marker of any kind before Aug-05.
          The Jul-29 recurrence of this question was answered at /hestia#solo-witnessing for SOLO
          hestia; the missing clause is the split below, so link that block rather than restating
          it (id added there this session; it previously had none). The wording "the acts an agent
          takes under your policy gate" is deliberate and must NOT become "every action": the
          universal is falsified by hestia's gate-bypass completeness limit, and a guard at
          hestia:117-121 says do not restore it on any surface. The
          "no public network" sentence is reused byte-for-byte from /how-it-works:106, /hestia:481
          and /day-in-web4:515, which #490 made identical on purpose. Do not paraphrase it. */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 mb-8 text-sm leading-relaxed text-gray-300">
        <strong className="text-amber-300">Which half of this runs today.</strong>{" "}
        Web4 splits witnessing in two, and the two are at different stages. The kind that needs
        nobody else is running: on a single machine, the acts an agent takes under your policy
        gate are checked and recorded in your own hash-linked witness chain, and your{" "}
        <Link href="/trust-tensor" className="text-amber-400 underline hover:text-amber-300">
          T3/V3
        </Link>{" "}
        move with the outcomes (
        <Link href="/hestia#solo-witnessing" className="text-amber-400 underline hover:text-amber-300">
          solo is not the mechanism switched off
        </Link>
        ). The kind on this page is the other one: it needs a second device, and while the code
        ships and is wired into the hub handshake, that path has not yet been driven on a real
        second device. So read the constellation below as the design and the shipped code, not as
        something you can currently prove. The spec is written, the code is installable today, and
        there is no public network open to outside members yet.{" "}
        <Link href="/running-now" className="text-amber-400 underline hover:text-amber-300">
          See what&apos;s deployed &rarr;
        </Link>
      </div>

      {/* The Problem */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-100">
          <span>🔐</span>
          <span>The Traditional Model (Passwords & Accounts)</span>
        </h2>

        <div className="space-y-4">
          <div className="bg-red-950/30 border-l-4 border-red-500 p-4 rounded">
            <p className="text-gray-300 mb-2">
              <span className="font-bold">Problem:</span> Your identity is a username + password stored on someone else&apos;s server.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Each device that logs in is another place your credentials can be stolen</li>
              <li>More devices = more attack surface</li>
              <li>If any one device is compromised, your whole identity is at risk</li>
              <li>The server can be hacked, leaking millions of accounts at once</li>
            </ul>
          </div>

          <div className="text-center text-red-400 font-bold text-lg">
            More Devices = More Risk
          </div>
        </div>
      </div>

      {/* The Web4 Solution */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-100">
          <span>✨</span>
          <span>The Web4 Model (Identity Constellations)</span>
        </h2>

        <div className="space-y-4">
          <div className="bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-gray-300 mb-2">
              <span className="font-bold">Solution:</span> Your identity is rooted in hardware chips in devices YOU control.
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Each device has a cryptographic key that never leaves its secure chip (Secure Enclave, TPM, FIDO2 key)</li>
              <li>Devices &ldquo;witness&rdquo; each other - they sign statements saying &ldquo;I&apos;ve seen this identity&rdquo;</li>
              <li>More devices witnessing = harder to fake</li>
              <li>An attacker would need to compromise MULTIPLE independent hardware chips</li>
              <li>No central server to hack</li>
            </ul>
          </div>

          <div className="text-center text-sky-400 font-bold text-lg">
            More Devices = Stronger Identity ✓
          </div>
        </div>
      </div>

      {/* Interactive Visualization */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Interactive: See Identity Strength Grow</h2>

        {/* Device Count Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Devices in Your Constellation: {deviceCount}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={deviceCount}
            onChange={(e) => setDeviceCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 device</span>
            <span>5 devices</span>
          </div>
        </div>

        {/* Constellation Visualization */}
        <div className="relative bg-gray-900/50 rounded-lg p-8 mb-6" style={{ minHeight: "300px" }}>
          <svg width="100%" height="300" className="overflow-visible">
            {/* Root LCT (center) */}
            <circle cx="50%" cy="150" r="30" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
            <text x="50%" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              You
            </text>

            {/* Device constellation */}
            {[...Array(deviceCount)].map((_, idx) => {
              const angle = (idx / deviceCount) * 2 * Math.PI - Math.PI / 2;
              const radius = 100;
              const cx = `calc(50% + ${Math.cos(angle) * radius}px)`;
              const cy = 150 + Math.sin(angle) * radius;

              const deviceIcons = ["📱", "💻", "🔑", "🖥️", "⌚"];
              const deviceLabels = ["Phone", "Laptop", "FIDO2 Key", "Desktop", "Watch"];

              return (
                <g key={idx}>
                  {/* Connection line */}
                  <line
                    x1="50%"
                    y1="150"
                    x2={cx}
                    y2={cy}
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  {/* Device circle */}
                  <circle cx={cx} cy={cy} r="25" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="2" />
                  <text x={cx} y={cy} textAnchor="middle" fontSize="20">
                    {deviceIcons[idx]}
                  </text>
                  <text x={cx} y={cy + 45} textAnchor="middle" fontSize="12" fill="#9ca3af">
                    {deviceLabels[idx]}
                  </text>
                </g>
              );
            })}

            {/* Witness lines between devices */}
            {deviceCount > 1 && [...Array(deviceCount)].map((_, i) => {
              const nextIdx = (i + 1) % deviceCount;
              const angle1 = (i / deviceCount) * 2 * Math.PI - Math.PI / 2;
              const angle2 = (nextIdx / deviceCount) * 2 * Math.PI - Math.PI / 2;
              const radius = 100;

              return (
                <line
                  key={`witness-${i}`}
                  x1={`calc(50% + ${Math.cos(angle1) * radius}px)`}
                  y1={150 + Math.sin(angle1) * radius}
                  x2={`calc(50% + ${Math.cos(angle2) * radius}px)`}
                  y2={150 + Math.sin(angle2) * radius}
                  stroke="#93c5fd"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
          </svg>

          <p className="text-center text-sm text-gray-500 mt-4">
            Solid lines = device attests to root LCT<br />
            Dotted lines = devices witness each other
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-emerald-950/30 to-emerald-900/20 border border-emerald-800/30 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-100">Identity Trust</h3>
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {(constellationTrust * 100).toFixed(0)}%
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${constellationTrust * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Higher trust = more confidence this identity is genuine
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-950/30 to-red-900/20 border border-red-800/30 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-gray-100">Attack Difficulty</h3>
            <div className="text-3xl font-bold text-red-400 mb-2">
              {attackDifficulty}x
            </div>
            <p className="text-sm text-gray-300">
              An attacker must compromise <span className="font-bold">{deviceCount} independent</span> hardware chips
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {deviceCount === 1 && "One device = vulnerable to single-point compromise"}
              {deviceCount === 2 && "Two devices = must hack phone AND laptop"}
              {deviceCount === 3 && "Three devices = extremely difficult"}
              {deviceCount >= 4 && "Four+ devices = practically impossible"}
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      {/* Anchor added Aug-20 21:00 under the demand-driven anchor policy: this page had ZERO ids
          before this commit. The inbound link that asked for it is /day-in-web4's setup Step 3
          ("Pair a second device"), added in the same commit, whose link text promises "the
          enrollment ceremony step by step". That step exists because the Aug-20 visitor filed
          MEDIUM 6 and Unanswered Q3 ("nothing showed me the enrolment step") - and step 2 of the
          ceremony below already answered them, on a page /day-in-web4 linked to from nowhere and
          that the nav registry does not list among its related pages either.
          Id sits on the CONTAINER div, not the h2, matching the pattern at /lct-explainer's
          #single-device, #first-5-minutes and #device-witnesses cards, so the whole ceremony
          lands in view rather than the heading alone.
          NOT changed here: the ceremony's own wording. It says "You scan a QR code from your
          phone to your laptop", which agrees with LCTSetupMockup's PairScreen and disagrees with
          /lct-explainer's prose ("scan a QR code WITH your phone") ten lines above that mockup.
          That contradiction is filed in SESSION_FOCUS and belongs to a /lct-explainer pass; the
          inbound step deliberately asserts no scan direction so it does not take a side. */}
      <div id="enrollment-ceremony" className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">How It Works: The Enrollment Ceremony</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-sky-900/50 rounded-full flex items-center justify-center font-bold text-sky-400">
              1
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-100">First Device (Genesis)</h3>
              <p className="text-gray-300">
                You create your identity on your first device (usually your phone).
                A cryptographic key is generated inside the Secure Enclave chip - it never leaves the device.
                This becomes your Root LCT.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-sky-900/50 rounded-full flex items-center justify-center font-bold text-sky-400">
              2
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-100">Add Second Device</h3>
              <p className="text-gray-300">
                Want to add your laptop? You scan a QR code from your phone to your laptop.
                Your phone signs a &ldquo;witness statement&rdquo; saying &ldquo;this laptop belongs to the same identity.&rdquo;
                The laptop generates its own key in its TPM chip.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-sky-900/50 rounded-full flex items-center justify-center font-bold text-sky-400">
              3
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-100">Cross-Device Witnessing</h3>
              <p className="text-gray-300">
                Your devices periodically &ldquo;see&rdquo; each other. When you use your phone and laptop at the same time,
                they create mutual witness records. This makes your identity more trustworthy over time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-sky-900/50 rounded-full flex items-center justify-center font-bold text-sky-400">
              4
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-gray-100">Recovery Quorum</h3>
              <p className="text-gray-300">
                If you lose your phone, you can recover your identity using your other devices.
                You need a &ldquo;quorum&rdquo; (e.g., 2 out of 3 devices) to prove you&apos;re still you.
                No central authority needed.
              </p>
              {/* Jul-29 visitor HIGH (their #2) + the LOW "what is the quorum when you have
                  exactly 2 and lose 1?". The visitor arrived here FROM /what-could-go-wrong
                  specifically looking for the one-device case and found silence: this page
                  described only the quorum path and never said what happens below it.
                  Silence sitting next to a confident "e.g. 2 out of 3" reads as a third,
                  contradicting answer, which is how they came away with "three pages give
                  three different answers".
                  This is an OMISSION fix, not a reconciliation: the complete tiered answer
                  already ships at lct-explainer:1026-1040, so this propagates it to the page
                  that omits it rather than asserting anything new
                  ([[canonical-sentence-only-collapses-scattered-claims]] - the claim is not
                  absent from the site, only from here). lct-explainer stays the canonical
                  home and is linked as such.
                  The 2-device row is grounded in canon, not invented:
                  web4-standard/core-spec/multi-device-lct-binding.md:989-990
                  (`default_recovery_quorum`) returns `device_count` for `device_count <= 2`,
                  i.e. ALL devices are required, so 2 minus 1 fails quorum and falls through
                  to the vouching path.
                  GUARDRAILS: do NOT import canon's 0.4 software-only ceiling (the site's 0.50
                  calibration stands), and keep the "Device quorum (2 of 3)" table row below
                  consistent with this list. */}
              <div className="mt-3 bg-gray-900/50 border border-gray-700/60 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-300 mb-2">
                  And if you do not have a quorum left?
                </p>
                <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-outside ml-4">
                  <li>
                    <strong className="text-gray-300">Three or more devices, lose one:</strong>{' '}
                    the remaining devices meet quorum and authorize a replacement. This is the case above.
                  </li>
                  <li>
                    <strong className="text-gray-300">Exactly two devices, lose one:</strong>{' '}
                    with only two, the quorum is <em>both</em> of them, so one survivor is not enough
                    on its own and you fall to the vouching path below.
                  </li>
                  <li>
                    <strong className="text-amber-300">One hardware device, lose it:</strong>{' '}
                    recovery still works, but slowly, through community vouching: trusted witnesses
                    confirm you are you, typically over 3 to 7 days. The delay is deliberate, since a
                    fast recovery path is also a fast impersonation path.
                  </li>
                  <li>
                    <strong className="text-gray-400">Software only, lose it:</strong>{' '}
                    there is no hardware witness to vouch for you, so there is nothing to recover
                    <em> to</em>. You start over from zero with a fresh identity. This is the one tier
                    where device loss is not recoverable.
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Full walkthrough on the{' '}
                  <Link href="/lct-explainer#recovery" className="text-sky-400 hover:text-sky-300 underline">
                    LCT explainer
                  </Link>, which is where these paths are specified. If every device is destroyed{' '}
                  <em>and</em> no witnesses are reachable, recovery is an{' '}
                  <Link href="/what-could-go-wrong" className="text-sky-400 hover:text-sky-300 underline">
                    unsolved problem
                  </Link>, and the site says so rather than pretending otherwise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-800/30 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Why This Matters</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-bold text-gray-100">No Password Leaks</h3>
              <p className="text-gray-300">
                {/* Aug-11 visitor HIGH, the claim class rather than the quoted page. The visitor
                    said the site sells "identity bound to your device's security chip" as the
                    mechanism, then the one piece badged Running is not hardware-anchored, and
                    the phrase "hardware you control" is "true about the machine and
                    false-sounding about the identity". A whitespace-tolerant sweep for
                    /hardware\s+you\s+control/ over src/app returned TWO live surfaces (a
                    line-based grep returns only this one; the /tldr instance wraps across a JSX
                    line break). This card was the un-swept one, and it is the worse of the two
                    because its subject is the identity. This page already ships the honest
                    tiered answer ~30 lines above, in the "And if you do not have a quorum left?"
                    list ("Software only, lose it: there is no hardware witness to vouch for
                    you"), so this REUSES that list's vocabulary and points at it rather than
                    coining a variant of it ([[page-ships-the-answer-and-denies-it]]).
                    Deliberately NO ceiling number here: the guardrail above governs this region,
                    /hestia is where the Aug-11 pass states the cost, and duplicating it here
                    would be scope the visitor did not raise. */}
                Your identity isn&apos;t stored on a server that can be hacked. It&apos;s rooted in hardware you
                control, or, at the software-only tier, in a key on your own machine with no hardware witness
                behind it (the recovery list above).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-bold text-gray-100">Targeted Attacks Get Harder</h3>
              <p className="text-gray-300">
                To impersonate you, an attacker would need to physically steal and compromise multiple independent devices.
                Not impossible, but exponentially harder than guessing a password.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <h3 className="font-bold text-gray-100">Works Across Web4</h3>
              <p className="text-gray-300">
                Your constellation identity works everywhere in Web4 - no separate accounts, no passwords to remember,
                no &ldquo;Sign in with Google/Facebook.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🤝</span>
            <div>
              <h3 className="font-bold text-gray-100">Trust Through Witnesses</h3>
              <p className="text-gray-300">
                The more devices witnessing your identity, the higher your{" "}
                <Link href="/trust-tensor" className="text-sky-400 hover:underline">trust score</Link>.
                Web4 societies can see: &ldquo;This identity has been witnessed by 5 independent hardware anchors over 2 years.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Traditional vs Web4 Identity</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-600">
                <th className="text-left p-3 text-gray-300">Aspect</th>
                <th className="text-left p-3 bg-red-950/30 text-gray-300">Traditional (Passwords)</th>
                <th className="text-left p-3 bg-blue-950/30 text-gray-300">Web4 (Constellations)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="p-3 font-medium text-gray-300">Where stored</td>
                <td className="p-3 text-gray-400">Company servers</td>
                <td className="p-3 text-gray-400">Hardware chips you control</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3 font-medium text-gray-300">Attack surface</td>
                <td className="p-3 text-gray-400">One server leak = millions compromised</td>
                <td className="p-3 text-gray-400">Must target each individual</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3 font-medium text-gray-300">More devices</td>
                <td className="p-3 text-red-400 font-bold">= More risk</td>
                <td className="p-3 text-sky-400 font-bold">= Stronger identity</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3 font-medium text-gray-300">Recovery</td>
                <td className="p-3 text-gray-400">&ldquo;Forgot password&rdquo; email</td>
                {/* Jul-29 visitor HIGH: kept consistent with the tier list above, which now
                    states the below-quorum fallback. A bare "2 of 3" here was part of what
                    made the page look like it had only one answer. */}
                <td className="p-3 text-gray-400">Device quorum (2 of 3), else witness vouching</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="p-3 font-medium text-gray-300">Privacy</td>
                <td className="p-3 text-gray-400">Company knows your activity</td>
                <td className="p-3 text-gray-400">No central tracking</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Details (Optional) */}
      <details className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-8 cursor-pointer">
        <summary className="font-bold text-lg text-gray-100 list-none flex justify-between items-center">
          <span>For the Technically Curious: How the Cryptography Works</span>
          <span className="text-gray-500 text-xl">+</span>
        </summary>

        <div className="mt-4 space-y-4 text-gray-300">
          <p>
            <span className="font-bold text-gray-100">Secure Enclaves (iPhone/Android):</span> These are separate processors
            inside your phone that handle cryptography. Keys are generated inside and never leave. Even the main
            processor can&apos;t read them.
          </p>

          <p>
            <span className="font-bold text-gray-100">TPM Chips (Laptops):</span> Trusted Platform Module chips provide
            hardware-based key storage. The key is bound to the specific hardware configuration.
          </p>

          <p>
            <span className="font-bold text-gray-100">FIDO2 Keys:</span> Physical security keys (like YubiKey) that generate
            and store keys internally. They require physical touch to sign, making remote attacks impossible.
          </p>

          <p>
            <span className="font-bold text-gray-100">Attestation:</span> Each device proves its key came from genuine hardware.
            Apple/Google/TPM manufacturers sign certificates saying &ldquo;this key was generated in real hardware.&rdquo;
          </p>

          <p>
            <span className="font-bold text-gray-100">Cross-Device Witnessing:</span> When two of your devices are used together,
            they create signed statements like: &ldquo;Device A witnessed Device B at timestamp T, both claiming identity I.&rdquo;
            This creates a verifiable history.
          </p>
        </div>
      </details>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-sky-900/40 to-purple-900/40 border border-sky-800/30 rounded-xl p-8 text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Ready to Explore Web4?</h2>
        <p className="text-lg mb-6 text-gray-400">
          Identity constellations are just one piece of trust-native architecture.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/lct-explainer"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold transition-colors"
          >
            Learn About Identity (LCT) →
          </a>
          {/* Aug-12: this button promises an action ("get an identity") and landed on the
              /hestia hero, ~400 lines above the commands that do it. Deep-linked to the
              install section, which got its id in the same pass. */}
          <a
            href="/hestia#how-to-touch-it"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
          >
            Get an identity with Hestia →
          </a>
          <a
            href="/the-standard"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
          >
            Read the core standard →
          </a>
        </div>
      </div>
      <ExplorerNav currentPath="/identity-constellation" />
      <RelatedConcepts currentPath="/identity-constellation" />
    </div>
  );
}
