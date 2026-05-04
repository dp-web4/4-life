"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import ConceptSequenceNav from "@/components/ConceptSequenceNav";
import TermTooltip from "@/components/TermTooltip";
import DeepDiveToggle from "@/components/DeepDiveToggle";
import LCTSetupMockup from "@/components/LCTSetupMockup";
import { trackPageVisit, trackConceptInteraction } from "@/lib/exploration";

/**
 * LCT (Linked Context Token) Foundational Explainer
 *
 * Makes Web4's verifiable presence primitive comprehensible to humans.
 *
 * Core insight: Presence isn't what you know (passwords), what you have (wallet keys),
 * or what you claim (self-issued tokens). It's what witnesses can verify about
 * your hardware-bound, behavior-proven, multi-device participation.
 *
 * Session #14: Foundational presence primitive - the missing piece.
 */

interface LCTComponent {
  name: string;
  description: string;
  example: string;
}

interface AttackScenario {
  name: string;
  description: string;
  web2Result: string;
  web3Result: string;
  web4Result: string;
}

export default function LCTExplainerPage() {
  useEffect(() => { trackPageVisit('lct-explainer'); }, []);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [deviceCount, setDeviceCount] = useState(1);
  const [attackScenario, setAttackScenario] = useState<number>(0);
  const [exploredAttacks, setExploredAttacks] = useState<Set<number>>(new Set());
  const [exploredComponents, setExploredComponents] = useState<Set<string>>(new Set());

  // LCT components
  const lctComponents: LCTComponent[] = [
    {
      name: "Hardware Binding",
      description: "Your presence is rooted in physical chips (Secure Enclave, TPM, FIDO2) that generate keys internally and never export them",
      example: "Your phone's Secure Enclave generates a key that physically cannot leave the chip"
    },
    {
      name: "Birth Certificate",
      description: "Every LCT has a witnessed creation record proving when, where, and by whom it was created",
      example: "Alice creates agent 'assistant1' on Thor device - both Alice and Thor sign the birth certificate"
    },
    {
      name: "Lineage",
      description: "Shows who created/authorized this LCT - creating a chain of accountability",
      example: "lct:web4:agent:alice.assistant1 → created by Alice, who vouches for its behavior"
    },
    {
      name: "Context",
      description: "What platform/environment this LCT runs in, determining resources and capabilities",
      example: "lct:web4:agent:alice@Thor → runs on Thor (Jetson AGX) with specific ATP budget and hardware attestation"
    },
    {
      name: "Task Scope",
      description: "Precisely defines what this LCT can do, limiting damage from compromise",
      example: "lct:web4:agent:alice@Thor#perception → can only read/observe, cannot execute code or delegate"
    },
    {
      name: "Device Witness Network",
      description: "Multiple independent devices witness and attest to this LCT's validity — witnesses are devices, not people",
      example: "Your LCT is witnessed by your phone, laptop, and FIDO2 key - attacker must compromise all three"
    }
  ];

  // Attack scenarios
  const attackScenarios: AttackScenario[] = [
    {
      name: "Password Database Breach",
      description: "Attacker hacks a company's server and steals the password database",
      web2Result: "🔴 CATASTROPHIC - Millions of accounts compromised instantly",
      web3Result: "🟢 SAFE - No central database to breach (keys on user devices)",
      web4Result: "🟢 SAFE - No passwords, no central database, keys in hardware"
    },
    {
      name: "Phishing Attack",
      description: "Attacker tricks user into entering credentials on a fake website",
      web2Result: "🔴 COMPROMISED - User enters password, attacker gains full access",
      web3Result: "🟠 MIXED - Seed phrase phishing possible, signature requests less so",
      web4Result: "🟢 SAFE - Hardware requires biometric + device presence, can't be remotely phished"
    },
    {
      name: "Device Theft",
      description: "Attacker physically steals your laptop",
      web2Result: "🟠 RISKY - If auto-login enabled, full access. If not, password still vulnerable to brute force",
      web3Result: "🔴 COMPROMISED - If wallet keys in filesystem, attacker can extract them",
      web4Result: "🟢 SAFE - Keys in TPM/Secure Enclave require biometric, can't be extracted even with physical access"
    },
    {
      name: "Credential Stuffing",
      description: "Attacker uses leaked passwords from one site to try accessing others",
      web2Result: "🔴 WIDESPREAD - Password reuse means one breach compromises many accounts",
      web3Result: "🟢 SAFE - Each wallet has unique keys, no password reuse",
      web4Result: "🟢 SAFE - Hardware-bound identity, no passwords to reuse"
    },
    {
      name: "Man-in-the-Middle",
      description: "Attacker intercepts communication between you and a service",
      web2Result: "🔴 COMPROMISED - Password sent over network can be intercepted (if not using HTTPS)",
      web3Result: "🟢 SAFE - Cryptographic signatures, no secrets sent over network",
      web4Result: "🟢 SAFE - Hardware attestation + signatures, tampering immediately detected"
    },
    {
      name: "Insider Threat",
      description: "Malicious employee at a company tries to access user accounts",
      web2Result: "🔴 HIGH RISK - Insider has database access, can view/modify accounts",
      web3Result: "🟢 SAFE - No central account database for insider to access",
      web4Result: "🟢 SAFE - Identity distributed across user's devices, no central control"
    },
    {
      name: "Key Duplication",
      description: "Attacker copies your identity credentials to another device",
      web2Result: "🔴 TRIVIAL - Copy password to any device, works everywhere",
      web3Result: "🟠 POSSIBLE - If attacker gets seed phrase or private key file, can recreate wallet anywhere",
      web4Result: "🟢 IMPOSSIBLE - Keys hardware-bound, copying files doesn't copy hardware chip internals"
    }
  ];

  // Calculate trust based on device count (simplified model)
  const calculateTrust = (devices: number): number => {
    // Base trust: 0.40 (software only)
    // Each hardware device adds strength
    // Multiple device types add coherence bonus
    const baseTrust = 0.40;
    const perDeviceBonus = 0.15;
    const diversityBonus = devices >= 3 ? 0.15 : (devices >= 2 ? 0.08 : 0);

    return Math.min(0.98, baseTrust + (devices * perDeviceBonus) + diversityBonus);
  };

  // Calculate attack difficulty (exponential with devices)
  const calculateAttackDifficulty = (devices: number): number => {
    return Math.pow(2.5, devices);
  };

  // Detection probability per web4 spec: 30% base + 15% per additional witness, capped at 95%
  const calculateDetectionProbability = (devices: number): number => {
    return Math.min(0.95, 0.30 + (devices - 1) * 0.15);
  };

  const trust = calculateTrust(deviceCount);
  const attackDifficulty = calculateAttackDifficulty(deviceCount);
  const detectionProb = calculateDetectionProbability(deviceCount);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/lct-explainer" />
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-sm uppercase tracking-wide text-purple-400 mb-4">
            Web4 Verified Presence
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
            Linked Context Tokens (LCT)
          </h1>
          {/* Apr 29 visitor HIGH: opened with three undefined terms (security chip / hardware-bound / witnessed)
              before any everyday metaphor. Lead with a tangible analogy first, then the precise definition. */}
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-3">
            Imagine your phone becoming your driver&rsquo;s license &mdash; but one that can&rsquo;t be
            photocopied, faked from a stolen photo, or impersonated from a remote computer.
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            More precisely: a digital ID card that lives in your device&apos;s security chip &mdash; hardware-bound,
            witnessed by your other devices (each one independently co-signs that it&rsquo;s really you),
            and resistant to faking.
          </p>

          {/* Plain-English etymology of "Linked" and "Context" — visitor friction Apr 25 */}
          <div className="mt-6 max-w-2xl mx-auto bg-gray-900/40 border border-gray-700 rounded-lg p-5 text-left">
            <div className="text-sm uppercase tracking-wide text-gray-400 mb-2">
              Why &ldquo;Linked Context&rdquo;?
            </div>
            <p className="text-gray-300 leading-relaxed">
              <strong>Linked</strong> &mdash; every LCT links to its creator (lineage), to the
              devices that witness it, and to a tamper-evident creation record. That linkage is
              what makes the token forge-resistant.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              <strong>Context</strong> &mdash; the device, platform, and role this LCT operates in.
              Yes, that&rsquo;s the same role-context that{" "}
              <a href="/trust-tensor" className="text-purple-400 hover:text-purple-300 underline">T3</a>
              {" "}weights &mdash; but the word here means runtime environment, not a chat thread.
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-purple-400 hover:text-purple-300 cursor-pointer">
              ↓ Try the interactive security audit below
            </a>
          </p>
        </div>

        {/* Key Takeaways — summary for newcomers who may not read the full page */}
        <div className="bg-purple-950/30 border border-purple-800/40 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-3 text-purple-300">Key Takeaways</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-purple-400 shrink-0">1.</span> Your identity lives in your devices&apos; security chips — not in passwords or company databases</li>
            <li className="flex gap-2"><span className="text-purple-400 shrink-0">2.</span> Multiple devices (phone, laptop, security key) witness each other, making faking exponentially harder <a href="#device-witnesses" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('device-witnesses')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-purple-400 hover:text-purple-300 underline whitespace-nowrap">(who runs this?)</a></li>
            <li className="flex gap-2"><span className="text-purple-400 shrink-0">3.</span> If you lose a device, your other devices can recover your identity — no &quot;forgot password&quot; needed <a href="#recovery" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('recovery')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-purple-400 hover:text-purple-300 underline whitespace-nowrap">(minutes to hours with multi-device; days if only one)</a></li>
            <li className="flex gap-2"><span className="text-purple-400 shrink-0">4.</span> This is pseudonymous — your reputation follows you, but your real name doesn&apos;t have to</li>
            <li className="flex gap-2"><span className="text-purple-400 shrink-0">5.</span> Every trust change is logged in a tamper-evident <a href="#trust-transparency" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('trust-transparency')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-purple-400 hover:text-purple-300 underline">transparency log</a> — you can audit your own trust history</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">Read on for the full picture, or <a href="#try-it" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-purple-400 hover:text-purple-300">jump to the interactive security audit ↓</a></p>
        </div>

        {/* Concept Sequence Roadmap — shows where this page fits in the learning path */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg px-6 py-4 mb-8">
          <p className="text-xs text-gray-400 mb-2">You&apos;re starting a 6-concept journey. Each builds on the last:</p>
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className="bg-purple-900/60 text-purple-300 px-2 py-1 rounded font-semibold">1. Identity (LCT)</span>
            <span className="text-gray-600">→</span>
            <a href="/atp-economics" className="text-gray-500 hover:text-green-400 transition-colors px-2 py-1 rounded hover:bg-gray-800/50">2. Energy (ATP)</a>
            <span className="text-gray-600">→</span>
            <a href="/trust-tensor" className="text-gray-500 hover:text-blue-400 transition-colors px-2 py-1 rounded hover:bg-gray-800/50">3. Trust (T3)</a>
            <span className="text-gray-600">→</span>
            <a href="/trust-neighborhood" className="text-gray-500 hover:text-cyan-400 transition-colors px-2 py-1 rounded hover:bg-gray-800/50">4. Neighborhood (MRH)</a>
            <span className="text-gray-600">→</span>
            <a href="/coherence-index" className="text-gray-500 hover:text-amber-400 transition-colors px-2 py-1 rounded hover:bg-gray-800/50">5. Consistency (CI)</a>
            <span className="text-gray-600">→</span>
            <a href="/aliveness" className="text-gray-500 hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-gray-800/50">6. Aliveness</a>
          </div>
        </div>

        {/* The Three Models */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Identity Evolution: Web2 → Web3 → Web4</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Web2 */}
            <div className="border border-red-800/30 rounded-lg p-6 bg-red-950/20">
              <h3 className="text-xl font-bold mb-3 text-red-400">Web2: Passwords</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Identity is:</div>
                  <div className="text-sm text-gray-300">What you <span className="font-bold">know</span></div>
                  <div className="text-xs text-gray-500 italic mt-1">username + password</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Stored:</div>
                  <div className="text-sm text-gray-300">Company's server</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Weakness:</div>
                  <div className="text-sm text-red-400">Server breach = everyone compromised</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Attack surface:</div>
                  <div className="text-sm text-red-400">Central database</div>
                </div>
              </div>
            </div>

            {/* Web3 */}
            <div className="border border-yellow-800/30 rounded-lg p-6 bg-yellow-950/20">
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Web3: Wallet Keys</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Identity is:</div>
                  <div className="text-sm text-gray-300">What you <span className="font-bold">have</span></div>
                  <div className="text-xs text-gray-500 italic mt-1">private key / seed phrase</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Stored:</div>
                  <div className="text-sm text-gray-300">Your device (filesystem)</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Weakness:</div>
                  <div className="text-sm text-yellow-400">Key theft = identity stolen forever</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Attack surface:</div>
                  <div className="text-sm text-yellow-400">File access, seed phrase exposure</div>
                </div>
              </div>
            </div>

            {/* Web4 */}
            <div className="border border-green-800/30 rounded-lg p-6 bg-green-950/20">
              <h3 className="text-xl font-bold mb-3 text-green-400">Web4: LCTs</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Identity is:</div>
                  <div className="text-sm text-gray-300">What <span className="font-bold">witnesses verify</span></div>
                  <div className="text-xs text-gray-500 italic mt-1">hardware + behavior + attestation</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Stored:</div>
                  <div className="text-sm text-gray-300">Secure hardware (<TermTooltip term="TPM">TPM</TermTooltip>, <TermTooltip term="SecureEnclave">Secure Enclave</TermTooltip>, <TermTooltip term="FIDO2">FIDO2</TermTooltip>)</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Strength:</div>
                  <div className="text-sm text-green-400">Hardware-bound, multi-witness, revocable</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-400 mb-1">Attack surface:</div>
                  <div className="text-sm text-green-400">Multiple independent hardware chips</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-950/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-300">
              <span className="font-bold">Key insight:</span> Web2 trusts what you memorize (forgettable, shareable).
              Web3 trusts what you store (copyable, stealable).
              Web4 trusts what hardware proves and witnesses verify (verifiable, revocable).
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-800/40 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-green-400">But what about pseudonymity?</span>{' '}
              Hardware-bound identity doesn&apos;t mean real-name identity. Your LCT is a cryptographic key, not your name.
              Nobody sees &ldquo;Jane Smith&rdquo; — they see an entity with a trust history. You can participate, earn trust,
              and contribute value without ever revealing who you are. What Web4 prevents isn&apos;t anonymity — it&apos;s{' '}
              <em>disposable</em> identity. Your reputation follows you, but your name doesn&apos;t have to.{' '}
              <Link href="/why-web4" className="text-sky-400 hover:underline">See the full FAQ &rarr;</Link>
            </p>

            <div className="mt-4 pt-4 border-t border-gray-700/60">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Worked example</p>
              <p className="text-sm text-gray-300 mb-3">
                Suppose you pick the handle <span className="font-bold">alice.assistant1</span>. Your LCT looks like this:
              </p>
              <pre className="text-xs bg-black/40 border border-gray-700 rounded px-3 py-2 overflow-x-auto text-green-300 mb-3">
                <code>lct:web4:0x4c8f…a3f2#alice.assistant1</code>
              </pre>
              <p className="text-sm text-gray-300 mb-3">
                The <span className="text-green-300">0x4c8f…a3f2</span> part is a cryptographic fingerprint tied to your device&apos;s
                security chip — it never leaves the hardware, and it&apos;s the same every time you sign in. The{' '}
                <span className="text-green-300">#alice.assistant1</span> part is a label you chose; it could be
                <span className="italic"> anything</span> — pseudonymous, role-scoped, or even rotated per community.
              </p>
              <p className="text-sm text-gray-300 mb-3">
                <span className="font-bold">Two sessions, same entity:</span>{' '}
                Monday you answer a question; Friday you post again. Both messages are signed by the same LCT, so the community
                sees <em>one</em> continuous reputation — the trust you earned Monday applies Friday. No one had to check an
                ID, email, or phone number to know it&apos;s you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-green-950/20 border border-green-800/30 rounded">
                  <p className="font-bold text-green-400 mb-1">Visible to others</p>
                  <ul className="text-gray-300 space-y-0.5 list-disc list-inside">
                    <li>Your LCT fingerprint (stable across sessions)</li>
                    <li>Your trust history (T3 scores, past behavior)</li>
                    <li>Your handle, if you chose one</li>
                  </ul>
                </div>
                <div className="p-2.5 bg-red-950/20 border border-red-800/30 rounded">
                  <p className="font-bold text-red-400 mb-1">Not visible</p>
                  <ul className="text-gray-300 space-y-0.5 list-disc list-inside">
                    <li>Your legal name</li>
                    <li>Your email or phone number</li>
                    <li>Any data broker profile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware explainer — collapsible to keep early-page density human-friendly (Apr 30 visitor MEDIUM) */}
          <details className="mt-6 p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg group">
            <summary className="cursor-pointer text-sm font-bold text-purple-400 list-none flex items-center justify-between gap-2">
              <span>What are TPM, Secure Enclave, and FIDO2?</span>
              <span className="text-xs font-normal text-purple-300/70 group-open:hidden">tap to expand &mdash; cryptography terms defined</span>
              <span className="text-xs font-normal text-purple-300/70 hidden group-open:inline">tap to collapse</span>
            </summary>
            <p className="text-xs text-gray-400 italic mt-3 mb-3">
              You don&apos;t need to memorize these to use Web4 &mdash; they&apos;re tamper-resistant security
              chips already in devices you probably own. Skip ahead if the high-level idea
              (&ldquo;hardware-bound identity&rdquo;) is enough; expand for the specifics.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              These are <span className="font-bold">tamper-resistant security chips</span> already
              built into devices you probably own:
            </p>
            <ul className="text-sm text-gray-300 space-y-1 ml-4 list-disc list-inside">
              <li><span className="font-bold">Secure Enclave</span> &mdash; Apple&apos;s security chip in every iPhone, iPad, and Mac. It handles Face ID, Touch ID, and encryption keys.</li>
              <li><span className="font-bold">TPM (Trusted Platform Module)</span> &mdash; A security chip in most modern laptops and PCs. Windows uses it for BitLocker encryption and secure boot.</li>
              <li><span className="font-bold">FIDO2 / WebAuthn</span> &mdash; Security keys you can buy (like YubiKey) or built-in biometrics (fingerprint readers). Used for passwordless login on many websites already.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              The key property: these chips generate cryptographic keys internally and
              <span className="font-bold"> never let them leave the hardware</span>. Even if someone copies
              your entire hard drive, they can&apos;t extract the keys.
            </p>
            <p className="text-xs text-green-400/70 mt-2">
              This isn&apos;t theoretical &mdash; Web4&apos;s TPM2 binding has been validated on real hardware
              (Intel TPM 2.0: key creation, signing, verification, attestation quotes, EK certificate
              chain verified through 2049).
            </p>
          </details>

          {/* Witness explainer */}
          <div id="device-witnesses" className="mt-4 p-4 bg-green-950/20 border border-green-800/30 rounded-lg scroll-mt-24">
            <h3 className="text-sm font-bold text-green-400 mb-2">
              What are &ldquo;device witnesses&rdquo;?
            </h3>
            <p className="text-xs text-gray-400 italic mb-3">
              Witnessing happens at two layers: (1) your own devices attest to each other, and (2) optional
              infrastructure nodes verify the network. This section covers layer 1 &mdash; layer 2
              (&ldquo;who runs the network?&rdquo;) is answered directly below.
            </p>
            <p className="text-sm text-gray-300 mb-3">
              <strong>Why device witnesses?</strong> Passwords can be stolen. A single device can be hacked.
              But compromising three independent devices at the same time? That&apos;s orders of magnitude
              harder. A <span className="font-bold">device witness</span> is any device or
              platform that independently confirms your presence is real &mdash; like
              co-signers on a legal document. Your phone, laptop, and security key each independently
              vouch that &ldquo;yes, this is really Alice.&rdquo; An attacker would need to
              compromise <span className="font-bold">all</span> of your device witnesses simultaneously
              to impersonate you.
            </p>
            <div className="text-sm text-gray-400 bg-gray-900/50 rounded p-3 space-y-1">
              <p className="text-gray-300 font-medium">Example: Logging in from a new city</p>
              <p>You log in from Tokyo. Your phone&apos;s GPS confirms you&apos;re in Tokyo. Your
                laptop&apos;s TPM chip signs the same session. Your smartwatch confirms your biometrics
                match. Three independent devices, three independent confirmations &mdash; that&apos;s
                witnessing. If someone steals just your laptop password, they still can&apos;t fake
                your phone&apos;s GPS or your watch&apos;s heartbeat pattern.</p>
            </div>

            {/* Step-by-step flow bridging analogy to mechanics */}
            <div className="mt-4 text-sm">
              <p className="text-green-400/80 font-medium text-xs mb-2">What happens under the hood:</p>
              <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold shrink-0">1.</span>
                  <span>You sign in &mdash; your laptop&apos;s TPM chip generates a <strong className="text-gray-300">cryptographic attestation</strong> (a hardware-signed proof that this specific device is involved)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold shrink-0">2.</span>
                  <span>Your phone receives a witness request and signs it with its own Secure Enclave key</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold shrink-0">3.</span>
                  <span>Both attestations are bundled into your LCT &mdash; now anyone can verify <em>two independent hardware chips</em> confirmed this session</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold shrink-0">4.</span>
                  <span>More device witnesses = higher trust ceiling (1 device: 50%, 2 devices: 75%, 3+: up to 90%) — but with <em>diminishing returns</em>. Three hardware-bound device witnesses provides most of the security benefit; adding many more past that has limited marginal value (information-theoretic bounds)</span>
                </div>
              </div>
            </div>

            {/* Bootstrap: first device — visitor Q May 2 unanswered Q2 (recurring) */}
            <div className="mt-4 p-3 bg-gray-900/60 border border-green-700/40 rounded-md">
              <p className="text-xs text-gray-400 italic mb-2">
                <span className="text-green-400 font-medium not-italic">What about my <em>first</em> device — who witnesses it before I have any others?</span>
              </p>
              <p className="text-xs text-gray-300 mb-2">
                Your phone&apos;s chip vouches for itself. The security chip inside (TPM on Android/PC, Secure Enclave on iPhone, FIDO2 on a USB key)
                ships with a <strong className="text-gray-200">manufacturer-burned key</strong> &mdash; a cryptographic
                identity baked in at the factory by the chip vendor (Apple, Qualcomm, Yubico, etc.). That key
                is the <em>first witness</em>: when you sign up, your chip proves &ldquo;I am a genuine, untampered piece of hardware
                from manufacturer X&rdquo; without you doing anything. No central notary, no government issuer, no
                self-attestation waiting period &mdash; the chip&apos;s own factory certificate is the proof.
              </p>
              <p className="text-xs text-gray-400">
                A single device with this manufacturer attestation gets a trust ceiling of 0.50&ndash;0.75 (depending on chip class).
                Adding a second device later doesn&apos;t replace the first witness &mdash; it adds another, raising the ceiling
                toward 0.90.{" "}
                <a
                  href="#single-device"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('single-device')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-green-400 hover:text-green-300 underline whitespace-nowrap"
                >
                  Why a ceiling at all? →
                </a>
              </p>
            </div>

            {/* User-POV walkthrough jump link — visitor Q Apr 23 recurring */}
            <div className="mt-4 p-3 bg-gray-900/60 border border-green-700/40 rounded-md">
              <p className="text-xs text-gray-300">
                <span className="text-green-400 font-medium">Wondering what this looks like from your side?</span>{" "}
                <a
                  href="#first-5-minutes"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('first-5-minutes')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-green-400 hover:text-green-300 underline whitespace-nowrap"
                >
                  See the first 5 minutes of setup →
                </a>{" "}
                <span className="text-gray-500">(visual mockup &mdash; QR codes, device pairing, what you actually tap)</span>
              </p>
            </div>
          </div>

          <div id="witness-infrastructure" className="mt-4 p-4 bg-sky-950/20 border border-sky-800/30 rounded-lg scroll-mt-24">
            <h3 className="text-sm font-bold text-sky-400 mb-2">
              Who runs witness infrastructure?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong className="text-sky-400">Short answer:</strong> anyone can. Web4 is an open standard
              (like email), not a platform (like Gmail). Witness nodes can be run by universities,
              companies, nonprofits, or individuals &mdash; the same way anyone can run an email server.
            </p>
            <p className="text-sm text-gray-400 mb-2">
              <strong className="text-gray-300">Two kinds of witnessing:</strong> (1) your own devices witness <em>each other</em> — your phone
              witnesses your laptop, and vice versa — proving <em>you</em> are real. (2) Infrastructure witness nodes
              validate the <em>network</em> — confirming attestations are properly formed and consistent. In the current
              prototype, both are simulated. In a deployed system, your devices handle identity witnessing; external
              nodes (universities, employers, individuals) add network-level verification but aren&apos;t required.
            </p>
            <p className="text-sm text-gray-300 mt-3">
              <strong className="text-sky-400">What&apos;s the incentive to run a witness node?</strong> Witnesses
              earn ATP for validation work — each attestation they process earns a small fee from the
              network&apos;s redistribution pool (not from the user being witnessed). For institutions like
              universities or employers, the incentive is also reputational: being a trusted witness
              builds their own T3 scores, making their attestations more valuable. Individual witness
              nodes earn less per attestation but face lower operating costs. The economics parallel
              email servers: some organizations run their own for control, most individuals use
              shared infrastructure, and the network works regardless of the mix.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Collusion requires coordinating multiple independent parties simultaneously,
              which is both economically costly and mathematically detectable.
            </p>
            <p className="text-sm text-gray-300 mt-3">
              <strong className="text-sky-400">What about metadata and surveillance?</strong> If devices
              are constantly attesting to each other, couldn&apos;t the attestation patterns themselves reveal
              sensitive information? Yes — this is a real concern. Web4 identifies{' '}
              <Link href="/threat-model#privacy-leakage" className="text-sky-400 hover:underline">7 privacy
              leakage channels</Link>, including graph structure (who talks to whom) and timing correlation.
              Mitigations include pseudonymous attestation, proof batching, timing jitter, and dummy edges —
              but complete prevention is impossible. The design goal is raising the cost of inference above
              the value of the leaked information.
            </p>
            <div className="mt-4 bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-300 mb-3">How does this compare to today&apos;s web?</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left py-1.5 pr-2">What&apos;s exposed</th>
                    <th className="text-left py-1.5 pr-2">Today (Web2)</th>
                    <th className="text-left py-1.5">Web4</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800">
                    <td className="py-1.5 pr-2 text-gray-300">Your identity</td>
                    <td className="py-1.5 pr-2 text-red-400/80">Real name, email, phone sold to data brokers</td>
                    <td className="py-1.5 text-green-400/80">Pseudonymous — hardware-bound, no personal info required</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-1.5 pr-2 text-gray-300">Your content</td>
                    <td className="py-1.5 pr-2 text-red-400/80">Platforms read, analyze, and monetize everything</td>
                    <td className="py-1.5 text-green-400/80">Only recipients see content — protocol moves attestations, not data</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-1.5 pr-2 text-gray-300">Your browsing</td>
                    <td className="py-1.5 pr-2 text-red-400/80">Tracking cookies follow you across sites</td>
                    <td className="py-1.5 text-green-400/80">No cross-context tracking — each role is a separate LCT</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-1.5 pr-2 text-gray-300">Your social graph</td>
                    <td className="py-1.5 pr-2 text-red-400/80">Full contact lists harvested and shared</td>
                    <td className="py-1.5 text-yellow-400/80">Partial — who attests to whom is visible within 3 hops</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-1.5 pr-2 text-gray-300">Your activity timing</td>
                    <td className="py-1.5 pr-2 text-red-400/80">Platforms log every click, scroll, and hover</td>
                    <td className="py-1.5 text-yellow-400/80">Attestation timing visible — mitigated by jitter and batching</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-2 text-gray-300">Breach exposure</td>
                    <td className="py-1.5 pr-2 text-red-400/80">Centralized databases leaked (billions of records yearly)</td>
                    <td className="py-1.5 text-green-400/80">No central database to breach — identity is on your devices</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-3">
                The honest framing: Web4 trades centralized data collection for decentralized attestation patterns.
                Two channels (social graph and timing) leak <em>some</em> metadata — but your identity, content, browsing,
                and breach risk all improve substantially. Net result: narrower leakage, built into the protocol
                rather than bolted on as afterthoughts.
              </p>
            </div>
          </div>
        </div>

        {/* What Is An LCT */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">What Is a Linked Context Token?</h2>

          <div className="space-y-4 mb-6">
            <p className="text-gray-300">
              Think of an <span className="font-bold text-purple-400">LCT</span> as a
              <span className="font-bold"> digital ID card that lives in your device&apos;s security chip</span>{" "}
              — not a password you type and not a key file you store, but a presence your
              hardware proves and your other devices witness.
            </p>
            <p className="text-gray-300">
              More formally, an LCT is Web4&apos;s foundational presence primitive: a
              {" "}<span className="font-bold">hardware-bound, witnessed, contextual proof of presence</span>{" "}
              that verifies:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li><span className="font-bold">Where you are</span>: Which physical device/platform (via hardware attestation)</li>
              <li><span className="font-bold">Who created you</span>: Your lineage chain (accountability)</li>
              <li><span className="font-bold">What you can do</span>: Your task scope (limited delegation)</li>
              <li><span className="font-bold">Who witnesses you</span>: Which devices/platforms attest to your existence</li>
              <li><span className="font-bold">How you behave</span>: Your reputation history (trust earned, not claimed)</li>
            </ul>
          </div>

          {/* Etymology — Apr 25 visitor: "what does the Context part mean?" */}
          <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-900/30">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">What does each word mean?</p>
            <p className="text-sm text-gray-300 leading-relaxed mb-2">
              <span className="font-bold text-purple-300">Linked</span> — witnessed by your other devices and trust peers.{" "}
              <span className="font-bold text-purple-300">Context</span> — pinned to a specific role or scope.{" "}
              <span className="font-bold text-purple-300">Token</span> — a compact, verifiable credential.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              The <span className="font-semibold">Context</span> word is what makes role-contextual trust possible: one person can hold separate LCTs as <em>doctor</em>, <em>parent</em>, or <em>moderator</em>, each carrying its own trust history. A surgeon trusted as a surgeon ≠ trusted as a cook.{" "}
              <Link href="/trust-tensor" className="text-sky-400 hover:underline">See how T3 weights roles &rarr;</Link>
            </p>
          </div>

          {/* LCT Format Example — collapsed for newcomers */}
          <details className="mb-6">
            <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 flex items-center gap-2">
              <span className="text-gray-500 group-open:rotate-90 transition-transform">▶</span>
              Technical: What an LCT looks like (format breakdown)
            </summary>
            <div className="bg-gray-900/50 border border-gray-700 rounded p-4 mt-2">
              <div className="text-sm font-mono mb-2 text-gray-500">Example LCT:</div>
              <div className="text-lg font-mono text-purple-400 break-all">
                lct:web4:agent:alice.assistant1@Thor#perception
              </div>
              <div className="mt-4 text-sm text-gray-300">
                <div className="text-xs text-gray-500 mb-2">Read it left-to-right like a URL — each punctuation mark separates a segment:</div>
                <table className="text-xs w-full">
                  <tbody className="divide-y divide-gray-800">
                    <tr>
                      <td className="py-1 pr-3 font-mono text-purple-300 align-top whitespace-nowrap">lct:</td>
                      <td className="py-1 text-gray-300"><span className="font-bold">Scheme</span> — marks this as an LCT (like <code className="text-gray-400">https:</code> marks a URL)</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 font-mono text-purple-300 align-top whitespace-nowrap">web4:</td>
                      <td className="py-1 text-gray-300"><span className="font-bold">Namespace</span> — the Web4 trust fabric</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 font-mono text-purple-300 align-top whitespace-nowrap">agent:</td>
                      <td className="py-1 text-gray-300"><span className="font-bold">Entity type</span> — agent, human, device, role, or society</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 font-mono text-purple-300 align-top whitespace-nowrap">alice.assistant1</td>
                      <td className="py-1 text-gray-300"><span className="font-bold">Lineage</span> — created by Alice, who vouches for it</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 font-mono text-purple-300 align-top whitespace-nowrap">@Thor</td>
                      <td className="py-1 text-gray-300"><span className="font-bold">Context</span> — runs on the &ldquo;Thor&rdquo; device (Jetson AGX with TPM attestation)</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-3 font-mono text-purple-300 align-top whitespace-nowrap">#perception</td>
                      <td className="py-1 text-gray-300"><span className="font-bold">Task scope</span> — read-only, cannot execute code or delegate</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-3">
                  The format is human-readable on purpose. If any segment is missing or unverifiable,
                  the LCT is rejected — so a glance tells you who/where/what/scope.
                </p>
              </div>
            </div>
          </details>

          {/* Interactive Component Explorer */}
          <div id="try-it" className="scroll-mt-24">
            <h3 className="text-xl font-bold mb-2 text-gray-100">Try It: Click Components &amp; Attack Scenarios</h3>
            <p className="text-sm text-gray-400 mb-4">Explore how each LCT component works, then test it against real attack vectors. Your Security Audit unlocks as you explore.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {lctComponents.map((component) => (
                <button
                  key={component.name}
                  onClick={() => { trackConceptInteraction('lct-explainer'); setSelectedComponent(component.name); setExploredComponents(prev => new Set(prev).add(component.name)); }}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedComponent === component.name
                      ? "border-purple-500 bg-purple-950/30"
                      : "border-gray-600 bg-gray-800 hover:border-purple-500"
                  }`}
                >
                  <div className="font-bold text-gray-100">{component.name}</div>
                  <div className="text-sm text-gray-400 mt-1">{component.description}</div>
                </button>
              ))}
            </div>

            {selectedComponent && (
              <div className="bg-purple-950/20 border border-purple-800/30 rounded-lg p-6">
                <h4 className="font-bold text-purple-400 mb-2">
                  {lctComponents.find(c => c.name === selectedComponent)?.name}
                </h4>
                <p className="text-gray-300 mb-3">
                  {lctComponents.find(c => c.name === selectedComponent)?.description}
                </p>
                <div className="bg-gray-900/50 border border-purple-800/30 rounded p-3">
                  <div className="text-sm font-semibold text-gray-400 mb-1">Example:</div>
                  <div className="text-sm text-gray-300 italic">
                    {lctComponents.find(c => c.name === selectedComponent)?.example}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive: Trust vs Device Count */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Interactive: How Device Witnesses Strengthen Presence</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Hardware Devices Witnessing Your LCT: {deviceCount}
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
              <span>2 devices</span>
              <span>3 devices</span>
              <span>4 devices</span>
              <span>5 devices</span>
            </div>
          </div>

          {/* Visual representation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Trust Score */}
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-100">Presence Trust Score</h3>
              <div className="relative h-32 bg-gray-900 rounded-lg overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300 transition-all duration-500"
                  style={{ height: `${trust * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white drop-shadow-lg">
                    {trust.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-400">
                {trust < 0.5 && "⚠️ Low trust - vulnerable to compromise"}
                {trust >= 0.5 && trust < 0.75 && "🟡 Moderate trust - single device"}
                {trust >= 0.75 && trust < 0.9 && "🟢 Good trust - multi-device constellation"}
                {trust >= 0.9 && "✅ Excellent trust - strong multi-device network"}
              </div>
            </div>

            {/* Attack Difficulty */}
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-100">Compromise Difficulty</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-purple-400">
                  {attackDifficulty.toFixed(1)}x
                </div>
                <div className="text-sm text-gray-400 mt-1">harder to attack</div>
                <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  Each independent hardware chip multiplies the attacker&apos;s cost — compromising one doesn&apos;t compromise the others, so the work to break in stacks rather than substitutes.
                </p>
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-bold">Attacker must compromise:</span>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {deviceCount >= 1 && <li>Secure Enclave (iPhone/Android)</li>}
                  {deviceCount >= 2 && <li>FIDO2 Security Key</li>}
                  {deviceCount >= 3 && <li>TPM 2.0 (Laptop)</li>}
                  {deviceCount >= 4 && <li>Secondary FIDO2 Key</li>}
                  {deviceCount >= 5 && <li>Tablet/Additional Device</li>}
                </ul>
              </div>
              {/* Detection probability from web4 spec */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Anomaly Detection</span>
                  <span className="text-lg font-bold" style={{ color: detectionProb >= 0.8 ? '#10b981' : detectionProb >= 0.5 ? '#f59e0b' : '#ef4444' }}>
                    {(detectionProb * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${detectionProb * 100}%`,
                      backgroundColor: detectionProb >= 0.8 ? '#10b981' : detectionProb >= 0.5 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Each witness adds 15% detection probability (capped at 95%)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-950/20 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-300">
              <span className="font-bold">Why this matters:</span> With {deviceCount} device{deviceCount > 1 ? 's' : ''},
              an attacker must physically steal AND biometrically unlock {deviceCount === 1 ? 'your device' : `all ${deviceCount} independent devices`}.
              {deviceCount >= 3
                ? ` That's ${attackDifficulty.toFixed(1)}x harder to compromise, with a ${(detectionProb * 100).toFixed(0)}% chance of detection — even a successful theft is almost certainly caught.`
                : deviceCount >= 2
                  ? ` That's ${attackDifficulty.toFixed(1)}x harder to compromise. Adding a third device would push detection to ${(calculateDetectionProbability(3) * 100).toFixed(0)}%.`
                  : ` Adding a second device (like a security key) would raise detection from ${(detectionProb * 100).toFixed(0)}% to ${(calculateDetectionProbability(2) * 100).toFixed(0)}% and make compromise ${calculateAttackDifficulty(2).toFixed(1)}x harder.`
              }
            </p>
          </div>
        </div>

        {/* Hardware Trust Tiers */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Not All Hardware Is Equal</h2>
          <p className="text-gray-400 text-sm mb-4">
            Your device&apos;s security hardware determines how high your trust can go. Stronger hardware means
            a stronger identity witness &mdash; like the difference between a handwritten note and a notarized document.
          </p>
          <p className="text-gray-400 text-sm mb-4">
            <span className="text-gray-300 font-semibold">Why the numbers rank that way:</span> a TPM or Secure
            Enclave is a separate, tamper-resistant chip that generates private keys <em>inside itself</em> and
            never lets them out &mdash; you&apos;d need physical attack on the chip to forge that witness.
            Software-only keys live on disk where any malware that runs on your device can copy them. The
            ceiling reflects how hard the witness is to fake, not how convenient the device is to use.
          </p>

          {/* Concrete lede before the abstract numbers — May 1 visitor MEDIUM #4 */}
          <div className="bg-sky-950/30 border border-sky-800/30 rounded-lg p-4 mb-4">
            <div className="text-sm font-semibold text-sky-300 mb-2">Why this matters: imagine you drop your phone in a lake.</div>
            <ul className="text-sm text-gray-300 space-y-1.5 list-disc list-inside marker:text-sky-500">
              <li><strong className="text-emerald-300">Hardware-bound, multiple devices</strong> &mdash; your laptop and security key witness you&apos;re still you. A new phone enrolls in minutes; reputation is intact.</li>
              <li><strong className="text-amber-300">Hardware-bound, one device</strong> &mdash; recovery is possible but slower. You re-establish through community vouching and time.</li>
              <li><strong className="text-gray-400">Software only</strong> &mdash; no second witness to vouch. You start over from zero with a fresh identity.</li>
            </ul>
            <p className="text-xs text-gray-400 mt-3 italic">The numbers below measure that gap &mdash; how strong a witness your hardware is, and therefore how cleanly you can recover.</p>
          </div>

          <p className="text-sm text-gray-300 mb-3">
            Each number below is the <strong className="text-gray-100">maximum T3 trust score</strong> your
            hardware can vouch for &mdash; even with perfect behavior, software-only identity tops out at 0.50.
            What each cap unlocks (rewards, witness role, recovery path) is detailed below the grid.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Strongest</div>
              <div className="text-lg font-bold text-emerald-400 mb-1">TPM Chip</div>
              <div className="text-2xl font-mono text-emerald-300">0.90</div>
              <div className="text-xs text-gray-500 mt-1">Dedicated, tamper-resistant</div>
            </div>
            <div className="bg-sky-950/30 border border-sky-800/30 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Strong</div>
              <div className="text-lg font-bold text-sky-400 mb-1">Secure Enclave</div>
              <div className="text-2xl font-mono text-sky-300">0.85</div>
              <div className="text-xs text-gray-500 mt-1">iPhone, Mac, Android</div>
            </div>
            <div className="bg-amber-950/30 border border-amber-800/30 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Good</div>
              <div className="text-lg font-bold text-amber-400 mb-1">FIDO2 Key</div>
              <div className="text-2xl font-mono text-amber-300">0.75</div>
              <div className="text-xs text-gray-500 mt-1">YubiKey, security keys</div>
            </div>
            <div className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Basic</div>
              <div className="text-lg font-bold text-gray-400 mb-1">Software Only</div>
              <div className="text-2xl font-mono text-gray-400">0.50</div>
              <div className="text-xs text-gray-500 mt-1">Browser/OS level</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs">
            These are trust <em>ceilings</em>, not starting points. Everyone starts at neutral (0.5).
            With software-only hardware, 0.5 is both where you start and the highest you can reach.
            Stronger hardware lets you build higher &mdash; but you still have to earn it through behavior.
          </p>

          {/* May 4 visitor LOW: "those numbers feel declared, not derived. Why is software only 0.50? Why isn't TPM 1.00?"
              Existing copy at lines 845-851 explains why TPM > software. This addresses the missing half: why no tier is 1.00. */}
          <details className="mt-4 bg-gray-900/40 border border-gray-700 rounded-lg p-4">
            <summary className="text-sm text-gray-300 font-semibold cursor-pointer hover:text-gray-100">
              Why isn&apos;t the top tier 1.00?
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p>
                <strong className="text-gray-300">No hardware is unbreakable.</strong> A TPM ceiling at 0.90
                instead of 1.00 reflects three real attack surfaces that &ldquo;perfect&rdquo; would have to rule
                out and no chip on Earth does:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong className="text-gray-300">Physical attack on the chip.</strong> Decapping, fault
                  injection, electron-microscope key extraction &mdash; rare and expensive, but documented
                  against TPM and Secure Enclave research samples. Possible in principle for a determined
                  adversary.
                </li>
                <li>
                  <strong className="text-gray-300">Supply-chain compromise.</strong> A weakened chip could
                  ship from the factory with a known-to-the-attacker key, or a compromised firmware update
                  could leak attestations. Vendor certificate chains catch most of this, but not all of it.
                </li>
                <li>
                  <strong className="text-gray-300">Side channels.</strong> Power, timing, electromagnetic
                  leakage have all been used to recover keys from secure elements that were &ldquo;supposed&rdquo;
                  to be inviolate. Modern designs harden against this; none are immune.
                </li>
              </ul>
              <p>
                A ceiling of 1.00 would mean &ldquo;mathematically impossible to forge.&rdquo; That standard
                is reserved for things like one-time pads, not for hardware that ships in a phone. 0.90 is
                shorthand for &ldquo;trusted enough to anchor most decisions, not trusted enough to be the
                only check on something irreversible.&rdquo; The remaining 0.10 is the gap reserved for
                independent corroboration &mdash; multiple devices, witness attestations, behavioral history.
              </p>
              <p className="text-xs text-gray-500 italic">
                The same logic explains the other tiers: each step down (0.85, 0.75, 0.50) reflects a
                concretely larger attack surface &mdash; weaker tamper resistance, fewer side-channel
                hardenings, or no hardware root at all.
              </p>
            </div>
          </details>

          <div className="mt-4 bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-200 mb-2">
              What does my ceiling actually let me <em>do</em>?
            </div>
            <p className="text-xs text-gray-400 mb-3">
              The ceiling caps how high your <strong className="text-gray-300">T3 trust</strong> can climb
              through behavior. At every tier you can post, earn ATP, build karma, and join societies &mdash;
              what changes is the <em>terms</em> of your participation:
            </p>
            <ul className="text-xs text-gray-400 space-y-2 list-disc pl-5">
              <li>
                <strong className="text-gray-300">Cost &amp; reward economics.</strong> Higher trust pays
                less per action and earns more back. The{" "}
                <Link href="/atp-economics#quality-ramp" className="text-emerald-400 hover:text-emerald-300 underline">
                  quality ramp
                </Link>{" "}
                rewards a 0.85-trust account roughly <strong className="text-gray-300">7&times; more</strong> per quality
                action than a 0.30-trust account &mdash; so a higher ceiling means your good behavior compounds faster.
              </li>
              <li>
                <strong className="text-gray-300">Witness role.</strong> Hardware-bound devices (TPM /
                Secure Enclave / FIDO2) can serve as <em>witnesses</em> for other people&apos;s sessions and
                attestations. Software-only identities can be witnessed but generally don&apos;t witness others
                &mdash; the cryptographic root isn&apos;t strong enough to anchor someone else&apos;s claim.
              </li>
              <li>
                <strong className="text-gray-300">Recovery path.</strong> A higher ceiling means you have more
                hardware witnesses, which means a faster recovery if a device is lost or stolen
                (multi-device quorum vs. starting over). One device can recover via a second; software-only
                has no quorum to fall back on.
              </li>
              <li>
                <strong className="text-gray-300">Headroom for high-stakes participation.</strong> Many actions
                in Web4 carry a trust threshold (e.g.,{" "}
                <Link href="/coherence-index" className="text-emerald-400 hover:text-emerald-300 underline">
                  coherence checks
                </Link>{" "}
                gate large transfers and{" "}
                <Link href="/federation-economics" className="text-emerald-400 hover:text-emerald-300 underline">
                  trust-weighted votes
                </Link>{" "}
                count proportionally to T3). A 0.50 ceiling caps how much weight your participation can carry
                in those settings; a 0.90 ceiling lets earned trust translate into proportionally larger influence.
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-3 italic border-t border-gray-800 pt-2">
              Plain framing: software-only at 0.50 is comparable to email today &mdash; full access, but a low
              ceiling on what your reputation can carry. Hardware-bound at 0.90 is the difference between
              &ldquo;I&rsquo;m here&rdquo; and &ldquo;the network can verifiably stake reputation on me.&rdquo;
            </p>
          </div>

          <div id="single-device" className="mt-3 bg-sky-950/30 border border-sky-800/20 rounded-lg p-3 scroll-mt-24">
            <p className="text-sky-300 text-xs font-semibold mb-1">
              Only have one device? You&apos;re still in.
            </p>
            <p className="text-gray-400 text-xs">
              Single-device users aren&apos;t excluded &mdash; they just have a lower trust ceiling
              (typically 0.50&ndash;0.75 depending on hardware). You can fully participate, post, earn
              ATP, and build karma. Adding a second device later raises your ceiling retroactively.
              This matters especially in developing countries where many people access the internet
              from a single smartphone &mdash; Web4 is designed to include them, not penalize them.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              <strong className="text-gray-400">Why a ceiling at all?</strong> A lone device has no
              second device to corroborate its continuity &mdash; if it&apos;s lost, stolen, or
              quietly compromised, there&apos;s no independent witness to notice. Adding a witness
              turns a single trust root into a quorum: compromising multiple hardware roots at
              once is materially harder than compromising one, so the ceiling rises with
              corroboration, not with how long you&apos;ve been around.
            </p>
          </div>

          {/* FAQ: Cold-start bootstrap — recurring visitor Q across Apr 29, Apr 30, May 1, May 2 */}
          <div id="first-device-bootstrap" className="mt-4 p-4 bg-amber-950/20 border border-amber-800/30 rounded-lg scroll-mt-24">
            <h3 className="text-sm font-bold text-amber-400 mb-2">
              I just installed the app on my one phone &mdash; who witnessed my <em>first</em> device?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong className="text-amber-300">Short answer:</strong> the chip itself does. The
              security element in your phone (TPM, Secure Enclave, or FIDO2 key) ships with a
              manufacturer-burned key &mdash; the Endorsement Key (EK) &mdash; and a certificate
              chain back to the chip vendor (Apple, Intel, Google, Yubico, etc.). When the app
              creates your LCT, it bundles a hardware attestation signed by that key. The chip is
              the day-zero witness: the network doesn&apos;t need a peer device to confirm
              &ldquo;this is real hardware, not a virtual machine pretending&rdquo; &mdash; the
              vendor certificate chain settles that question on its own.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong className="text-amber-300">What hardware attestation <em>doesn&apos;t</em> prove:</strong> that this
              specific chip belongs to a unique person &mdash; vs. someone running a phone farm
              with 100 devices in a rack. That&apos;s the question peer device witnessing answers,
              and it&apos;s why your trust ceiling sits at 0.50&ndash;0.75 with one device. Adding a
              second device (or earning attestations from other community members through your
              behavior) is what graduates you toward the higher ceilings.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong className="text-amber-300">So what triggers NASCENT &rarr; ACTIVE for a solo-device user?</strong>{" "}
              For multi-device users, it&apos;s a peer device co-signing. For solo-device users,
              it&apos;s either (a) infrastructure witness nodes confirming the hardware attestation
              is well-formed and the vendor certificate chain checks out, or (b) the first
              attestation arriving from a community member you interact with. Both paths produce a
              valid ACTIVE token; the multi-device path just lets you reach a higher trust ceiling
              faster. (See <a href="#witness-infrastructure" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('witness-infrastructure')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-amber-400 hover:text-amber-300 underline">who runs those infrastructure witness nodes</a> for the network-side answer.)
            </p>
            <p className="text-xs text-gray-500">
              <strong className="text-gray-400">The chicken-and-egg, resolved:</strong> hardware
              attestation is the bootstrap &mdash; you don&apos;t need a peer to <em>start</em>.
              You need a peer (or earned community attestations) to <em>graduate</em> to the higher
              trust ceiling. Day one solo: you&apos;re a verified-real device with no continuity
              guarantee yet, capped at the software-or-single-hardware tier. Day thirty with one
              hardware device and consistent behavior: you&apos;re still capped at the
              single-hardware ceiling but earning toward it. Add a second device any time:
              ceiling rises retroactively.
            </p>
          </div>

          <details className="mt-4">
            <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
              ▶ Why hardware binding lasts: identity vs. presence vs. location
            </summary>
            <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 space-y-3">
              <p>
                Not all identity attributes are equal. Web4 distinguishes three tiers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-emerald-950/40 border border-emerald-800/30 rounded p-3">
                  <div className="font-bold text-emerald-400 mb-1">Immutable</div>
                  <div className="text-xs text-gray-400 mb-2">Cannot change without physical hardware swap</div>
                  <div className="text-xs text-emerald-200/90 mb-2 italic">
                    For a person: the &ldquo;birth fingerprint&rdquo; of your device &mdash; what makes
                    <em> this phone</em> different from any other phone of the same model.
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>TPM Endorsement Key (EK) &mdash; burned at manufacture</li>
                    <li>CPU serial number</li>
                    <li>Secure Enclave key (Apple platforms)</li>
                  </ul>
                  <div className="text-xs text-emerald-400 mt-2 font-medium">→ LCT cryptographic root</div>
                </div>
                <div className="bg-amber-950/40 border border-amber-800/30 rounded p-3">
                  <div className="font-bold text-amber-400 mb-1">Characteristic</div>
                  <div className="text-xs text-gray-400 mb-2">Changes rarely, with deliberate action</div>
                  <div className="text-xs text-amber-200/90 mb-2 italic">
                    For a person: things you set up once and rarely touch &mdash; the device
                    name you chose, the network card inside it, the GPU it shipped with.
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>MAC address (per network adapter)</li>
                    <li>Hostname (admin-changeable)</li>
                    <li>GPU UUID</li>
                  </ul>
                  <div className="text-xs text-amber-400 mt-2 font-medium">→ Fingerprint layer</div>
                </div>
                <div className="bg-gray-700/40 border border-gray-600/30 rounded p-3">
                  <div className="font-bold text-gray-300 mb-1">Dynamic</div>
                  <div className="text-xs text-gray-400 mb-2">Changes frequently — must be rediscovered</div>
                  <div className="text-xs text-gray-200/90 mb-2 italic">
                    For a person: where you are <em>right now</em> &mdash; the coffee-shop
                    Wi-Fi, the airport hotspot, the home network. Tells the system you&rsquo;re
                    here, not who you are.
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>IP address (DHCP, VPN, roaming)</li>
                    <li>Port, session state</li>
                  </ul>
                  <div className="text-xs text-gray-400 mt-2 font-medium">→ Presence, not identity</div>
                </div>
              </div>
              <p className="text-gray-400 text-xs border-t border-gray-700 pt-3">
                <strong className="text-gray-300">Key insight:</strong> An IP address is a <em>presence</em> attribute, not an identity attribute.
                A machine that gets a new IP is still the same machine if its immutable anchor (TPM EK) matches.
                Web4 anchors identity at the immutable tier &mdash; making LCTs durable across reboots, network changes,
                and even OS reinstalls.
              </p>
            </div>
          </details>
        </div>

        <DeepDiveToggle storageKey="4life-lct-deep-dive">

        {/* Attack Scenario Comparison — wrapped in details for progressive disclosure */}
        <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <summary className="text-2xl font-bold text-gray-100 cursor-pointer hover:text-purple-400 transition-colors list-none flex justify-between items-center">
            <span>Security Comparison: Web2 vs Web3 vs Web4</span>
            <span className="text-gray-500 text-base font-normal">7 attack scenarios</span>
          </summary>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Attack Scenario:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {attackScenarios.map((scenario, idx) => (
                <button
                  key={idx}
                  onClick={() => { setAttackScenario(idx); setExploredAttacks(prev => new Set(prev).add(idx)); }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    attackScenario === idx
                      ? "border-purple-500 bg-purple-950/30 font-semibold"
                      : "border-gray-600 bg-gray-800 hover:border-purple-500"
                  }`}
                >
                  <div className="text-sm text-gray-200">{scenario.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-100">
              {attackScenarios[attackScenario].name}
            </h3>
            <p className="text-gray-300 mb-4">
              {attackScenarios[attackScenario].description}
            </p>

            <div className="space-y-3">
              <div className="bg-gray-800/50 border-l-4 border-red-500 p-3 rounded">
                <div className="text-sm font-semibold text-gray-300 mb-1">Web2 (Passwords):</div>
                <div className="text-sm text-gray-400">{attackScenarios[attackScenario].web2Result}</div>
              </div>

              <div className="bg-gray-800/50 border-l-4 border-yellow-500 p-3 rounded">
                <div className="text-sm font-semibold text-gray-300 mb-1">Web3 (Wallet Keys):</div>
                <div className="text-sm text-gray-400">{attackScenarios[attackScenario].web3Result}</div>
              </div>

              <div className="bg-gray-800/50 border-l-4 border-green-500 p-3 rounded">
                <div className="text-sm font-semibold text-gray-300 mb-1">Web4 (LCTs):</div>
                <div className="text-sm text-gray-400">{attackScenarios[attackScenario].web4Result}</div>
              </div>
            </div>
          </div>
        </details>

        {/* Identity Security Audit — cumulative interaction */}
        {(exploredAttacks.size >= 2 || exploredComponents.size >= 3) && (
          <div className="bg-gradient-to-br from-purple-950/30 to-gray-900 border border-purple-800/30 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Your Identity Security Audit</h2>
            <p className="text-sm text-gray-400 mb-4">
              Based on what you&apos;ve explored so far:
            </p>

            {/* Exploration progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800/60 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{exploredComponents.size}/6</div>
                <div className="text-xs text-gray-400 mt-1">LCT Components</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{exploredAttacks.size}/7</div>
                <div className="text-xs text-gray-400 mt-1">Attack Scenarios</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{deviceCount}</div>
                <div className="text-xs text-gray-400 mt-1">Device{deviceCount > 1 ? 's' : ''} Selected</div>
              </div>
            </div>

            {/* Compound insight based on what they've explored */}
            <div className="space-y-3">
              {exploredAttacks.size >= 3 && (
                <div className="bg-green-950/20 border-l-3 border-green-500 p-3 rounded text-sm text-gray-300" style={{ borderLeftWidth: '3px', borderLeftColor: '#22c55e' }}>
                  <strong className="text-green-400">Pattern noticed:</strong> You&apos;ve tested {exploredAttacks.size} attack scenarios.
                  Notice how Web4 is safe against {exploredAttacks.size === 7 ? 'all of them' : 'every one'}?
                  That&apos;s not because of one clever trick — it&apos;s because identity lives in hardware,
                  not in databases, passwords, or files. There&apos;s nothing <em>to</em> steal remotely.
                </div>
              )}

              {exploredComponents.size >= 4 && (
                <div className="bg-purple-950/20 border-l-3 border-purple-500 p-3 rounded text-sm text-gray-300" style={{ borderLeftWidth: '3px', borderLeftColor: '#a855f7' }}>
                  <strong className="text-purple-400">Design insight:</strong> You&apos;ve explored {exploredComponents.size} of 6 LCT components.
                  Notice how each component addresses a different attack surface? Hardware binding stops remote theft.
                  Birth certificates stop impersonation. Witness networks stop single-point compromise.
                  Task scope limits blast radius. They work together as a system.
                </div>
              )}

              {deviceCount >= 3 && exploredAttacks.size >= 2 && (
                <div className="bg-sky-950/20 border-l-3 border-sky-500 p-3 rounded text-sm text-gray-300" style={{ borderLeftWidth: '3px', borderLeftColor: '#0ea5e9' }}>
                  <strong className="text-sky-400">Your posture:</strong> With {deviceCount} devices, your identity
                  is {calculateAttackDifficulty(deviceCount).toFixed(1)}x harder to compromise.
                  An attacker would need to physically steal all {deviceCount} devices AND bypass
                  biometric locks on each one. That&apos;s not just &quot;harder&quot; — it&apos;s a fundamentally
                  different kind of problem than guessing a password.
                </div>
              )}

              {deviceCount === 1 && exploredAttacks.size >= 2 && (
                <div className="bg-yellow-950/20 border-l-3 border-yellow-500 p-3 rounded text-sm text-gray-300" style={{ borderLeftWidth: '3px', borderLeftColor: '#eab308' }}>
                  <strong className="text-yellow-400">Recommendation:</strong> With just 1 device, you&apos;re
                  protected against remote attacks (no database to breach, no password to phish) but
                  vulnerable to physical theft. Try sliding the device count to 3 above — watch how
                  the attack difficulty jumps from {calculateAttackDifficulty(1).toFixed(1)}x to {calculateAttackDifficulty(3).toFixed(1)}x.
                </div>
              )}

              {exploredAttacks.size >= 5 && exploredComponents.size >= 4 && (
                <div className="bg-gray-800/60 border border-gray-600 rounded-lg p-4 mt-4 text-sm text-gray-300">
                  <strong className="text-gray-100">The key takeaway:</strong> Verified presence is the foundation
                  everything else in Web4 builds on. Without hardware-bound presence, energy budgets don&apos;t
                  work (you&apos;d create free accounts), trust doesn&apos;t stick (you&apos;d reset reputations),
                  and consequences don&apos;t matter (you&apos;d just start over). Presence — not identity,
                  not credentials — makes the whole system possible.
                </div>
              )}
            </div>
          </div>
        )}

        {/* What Happens When Things Go Wrong */}
        <div id="recovery" className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">What Happens When Things Go Wrong?</h2>

          <p className="text-gray-300 mb-6">
            Hardware binding sounds great until your phone falls in a lake or your laptop
            gets stolen. If your identity lives in hardware, what happens when that hardware
            is gone?
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-900/50 border border-purple-700/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-purple-400 mb-2">Device Lost or Destroyed</h3>
              <p className="text-gray-300 text-sm mb-3">
                This is why Web4 uses <strong className="text-purple-300">multi-device witness networks</strong>.
                If you have 3 devices and lose one, the remaining 2 can vouch for your identity on a replacement device.
                This works like a <strong className="text-purple-300">quorum</strong>: you set a threshold (e.g., 2-of-3)
                when you add devices to your constellation.
              </p>
              <div className="bg-gray-800/60 rounded px-3 py-2 text-xs text-gray-400">
                Recovery: remaining devices sign an approval for the new device&apos;s birth certificate.
                The old device&apos;s keys are automatically revoked — anything signed by the lost device
                after the revocation timestamp is rejected.
                {" "}<span className="text-purple-300 font-medium">Duration: minutes to hours</span> —
                once a quorum of remaining devices co-sign, the replacement is active and your
                reputation carries over intact.
              </div>
            </div>

            <div className="bg-gray-900/50 border border-red-700/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-red-400 mb-2">Device Stolen or Compromised</h3>
              <p className="text-gray-300 text-sm mb-3">
                When you detect compromise (or suspect it), your other devices issue a{" "}
                <strong className="text-red-300">revocation cascade</strong>. This
                invalidates the stolen device&apos;s keys and notifies every entity that
                trusted it.
              </p>
              <div className="bg-gray-800/60 rounded px-3 py-2 text-xs text-gray-400 space-y-1">
                <div>1. You report the compromise from any surviving device</div>
                <div>2. The witness network propagates the revocation to all connected entities</div>
                <div>3. Any entity downstream of the compromised device gets notified</div>
                <div>4. The compromised device&apos;s trust score drops to zero immediately</div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-amber-700/30 rounded-lg p-5">
              <h3 className="text-lg font-bold text-amber-400 mb-2">All Devices Lost</h3>
              <p className="text-gray-300 text-sm mb-3">
                Worst case. With no surviving devices, you need a{" "}
                <strong className="text-amber-300">social recovery</strong> — trusted
                witnesses who can vouch for your identity. Think of it like getting a new
                passport: you need people who know you to confirm you&apos;re you.
              </p>
              <div className="bg-gray-800/60 rounded px-3 py-2 text-xs text-gray-400">
                This is deliberately hard. Easy recovery would mean easy identity theft.
                The friction is a feature, not a bug.
                {" "}<span className="text-amber-300 font-medium">Expect days, not minutes</span> —
                social recovery typically takes 3&ndash;7 days as multiple witnesses coordinate
                out-of-band verification.
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-sky-950/20 border border-sky-800/30 rounded-lg">
            <p className="text-sm text-sky-300 font-semibold mb-1">
              What if I only own one device?
            </p>
            <p className="text-sm text-gray-300">
              Single-device users can&apos;t use quorum recovery (there&apos;s no second device to
              co-sign), so losing that device drops you straight into <strong>social recovery</strong>
              {" "}— the slow 3&ndash;7 day path above. If you plan to rely on one device, pairing it
              with a cheap hardware security key (FIDO2, ~$30) as a second witness dramatically
              shortens your recovery path and raises your trust ceiling. See{" "}
              <a href="#single-device" className="text-sky-400 hover:underline">
                Only have one device?
              </a>{" "}
              higher on this page for how single-device participation works day-to-day.
            </p>
          </div>

          {/* Apr 20 + Apr 29 visitor friction: vendor-gatekeeping concern.
              Acknowledged on /what-could-go-wrong but not answered here. The constellation
              framing dissolves the question — once identity stops being singular, no single
              vendor IS the gate. Adding it as a sibling concern to "what if my device dies." */}
          <div className="mb-6 p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg">
            <p className="text-sm text-purple-300 font-semibold mb-1">
              What if a hardware vendor (Apple, Google, the TPM maker) revokes or gates access?
            </p>
            <p className="text-sm text-gray-300 mb-2">
              The short answer: <strong>they can&apos;t gate the constellation</strong>. Your LCT
              isn&apos;t a single token sitting on one vendor&apos;s hardware — it&apos;s a graph
              of mutually-witnessing factors. A host-level key, a hardware-bound key, a session
              token, a software identity, peer attestations from other people&apos;s devices, and
              eventually a ledger anchor. <em>Each uses its own native mechanism.</em>
            </p>
            <p className="text-sm text-gray-300">
              Vendor X disables their hardware key? The other factors keep working. Your identity
              continuity persists through them. The compromised factor is recorded as a divergence
              event, relying parties degrade trust on it accordingly, and you keep operating.
              <strong className="text-purple-300"> The bigger and more diverse your constellation,
              the harder it is to enclose.</strong> Any single vendor at any single layer can&apos;t
              hold you. That&apos;s the design objective — not finding a &quot;better&quot; root
              vendor, but making the constellation hard to gate. See the{" "}
              <a
                href="https://github.com/dp-web4/web4/blob/main/docs/specs/heterogeneous-identity.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                heterogeneous-identity design note
              </a>{" "}
              for the full structural argument.
            </p>
          </div>

          <details className="bg-gray-900/50 border border-gray-700/50 rounded-lg overflow-hidden">
            <summary className="cursor-pointer p-4 text-sm font-semibold text-gray-300 hover:text-purple-400 transition-colors">
              LCT Lifecycle: Birth → Active → Suspended → Revoked
            </summary>
            <div className="px-4 pb-4 text-sm text-gray-400 space-y-2">
              <p>
                Every LCT follows an explicit state machine:
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono py-2">
                <span className="px-2 py-1 bg-gray-700 rounded text-gray-300">NASCENT</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 bg-green-900/50 rounded text-green-400">ACTIVE</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 bg-amber-900/50 rounded text-amber-400">SUSPENDED</span>
                <span className="text-gray-500">→</span>
                <span className="px-2 py-1 bg-red-900/50 rounded text-red-400">REVOKED</span>
              </div>
              <p>
                <strong className="text-gray-300">Nascent</strong>: Birth certificate created, waiting for witness attestation.{" "}
                <em className="text-gray-500">Trigger: you register a new device.</em>{" "}
                <strong className="text-gray-300">Active</strong>: Fully operational, can sign and participate.{" "}
                <em className="text-gray-500">Trigger: a peer device co-signs the nascent token, OR &mdash; for solo-device users &mdash; infrastructure witness nodes confirm the hardware attestation chain. Either path graduates the LCT; multi-device just unlocks a higher ceiling. <a href="#first-device-bootstrap" className="text-gray-400 hover:text-gray-300 underline not-italic">(solo-device cold start)</a></em>{" "}
                <strong className="text-gray-300">Suspended</strong>: Temporarily frozen — can be reactivated.{" "}
                <em className="text-gray-500">Trigger: all devices offline &gt; 30 days, or suspected compromise.</em>{" "}
                <strong className="text-gray-300">Revoked</strong>: Permanently invalidated. Trust history preserved but no new actions allowed.{" "}
                <em className="text-gray-500">Trigger: confirmed device compromise, or voluntary revocation.</em>
              </p>
              <p className="text-gray-500 text-xs">
                Expired LCTs can also exist — when a time-limited delegation reaches its end date.
              </p>
            </div>
          </details>
        </div>

        {/* How Witnesses Are Coordinated (collapsed for page length) */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <details>
            <summary className="text-2xl font-bold text-gray-100 cursor-pointer hover:text-purple-400 transition-colors list-none flex justify-between items-center">
              <span>Who Picks the Witnesses?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4">
              <p className="text-gray-300 mb-4">
                Natural follow-up question: if witnesses are so important, who chooses them? And what
                stops them from lying?
              </p>
              <div className="space-y-3 text-gray-400 text-sm">
                <p>
                  <strong className="text-gray-300">Selection is reputation-weighted, not random.</strong>{" "}
                  Witnesses are drawn from a federation-wide pool, weighted by their track record of
                  accurate attestations. Like jury selection, the goal is diverse, qualified, independent
                  observers — not hand-picked allies.
                </p>
                <p>
                  <strong className="text-gray-300">Lying has consequences.</strong>{" "}
                  Witnesses stake ATP when they attest. If their attestation is later proven false or
                  biased (by cross-checking against other witnesses), they lose their stake — like
                  validators in proof-of-stake systems. This economic penalty makes dishonest witnessing
                  unprofitable.
                </p>
                <p>
                  <strong className="text-gray-300">Load balancing prevents exhaustion.</strong>{" "}
                  No single witness can be overloaded. The system distributes attestation requests across
                  the pool, tracks response times and availability, and penalizes witnesses who drop
                  below service commitments.
                </p>
              </div>
              <p className="text-gray-500 text-xs mt-4 italic">
                Witness network coordination: 90 validated checks. Pool management, quorum selection,
                SLA tracking, and slashing protocols all formally specified.
              </p>
            </div>
          </details>
        </div>

        {/* Practical UX — What Would This Actually Feel Like? */}
        <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/20 border border-sky-800/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">What Would This Actually Feel Like?</h2>
          <p className="text-gray-400 mb-6">
            The visitor&apos;s real question: &ldquo;Do I need a special device, or does my existing phone work?&rdquo;
            Short answer: <strong className="text-gray-200">your existing devices already have the hardware</strong>.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-sky-400 mb-2">Step 1: First Setup (~2 minutes)</div>
              <p className="text-gray-300 text-sm">
                Open the app on your phone. It detects your device&apos;s security chip automatically — iPhones have
                Secure Enclave, most Android phones and laptops have TPM chips, or you can use a FIDO2 key (like YubiKey).
                You approve a one-time key generation. No passwords to create, no seed phrases to write down.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-sky-400 mb-2">Step 2: Join a Society (~30 seconds)</div>
              <p className="text-gray-300 text-sm">
                You request to join a Web4 society. Three existing members witness your presence — they confirm
                &ldquo;yes, this device is real and this person is asking to join.&rdquo; Think of it like three
                friends vouching for you at a members-only club. You start with 100 ATP and 0.5 trust.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-sky-400 mb-2">Step 3: Add More Devices (Optional)</div>
              <p className="text-gray-300 text-sm">
                Want stronger identity? Open the app on your laptop. Your phone and laptop cross-verify each other.
                Now compromising your identity requires stealing <em>both</em> devices — not just guessing a password.
                Each additional device makes your presence harder to fake.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-sky-400 mb-2">Day-to-Day: Invisible</div>
              <p className="text-gray-300 text-sm">
                After setup, hardware binding is invisible. Your device signs actions in the background — you just
                use the app normally. No 2FA codes, no password managers, no &ldquo;prove you&apos;re not a robot.&rdquo;
                Your phone&apos;s chip quietly proves it&apos;s really you.
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-4 italic">
            This UX is aspirational — the current prototype uses stubbed hardware interfaces.
            The goal is zero-friction identity backed by real device attestation.
          </p>

          {/* What a Web4 login actually looks like */}
          <div className="mt-6 p-4 bg-gray-900/60 border border-gray-700 rounded-lg">
            <h3 className="text-sm font-bold text-gray-300 mb-3">What a Web4 login actually looks like</h3>
            <div className="font-mono text-xs space-y-1 text-gray-400">
              <div className="text-gray-500">// Current flow: password manager + 2FA</div>
              <div className="text-red-400/80">✗ Enter email address</div>
              <div className="text-red-400/80">✗ Enter password (16+ chars, must not reuse)</div>
              <div className="text-red-400/80">✗ Open authenticator app, enter 6-digit code</div>
              <div className="text-red-400/80">✗ Repeat on every new device</div>
              <div className="mt-3 text-gray-500">// Web4 flow: hardware-bound identity</div>
              <div className="text-green-400/80">✓ Open app</div>
              <div className="text-green-400/80">✓ Face ID / fingerprint confirms it&apos;s you</div>
              <div className="text-green-400/80">✓ Device&apos;s security chip signs the request</div>
              <div className="text-green-400/80">✓ Done — your trust history follows automatically</div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              The difference: instead of proving &ldquo;I know the right password,&rdquo;
              you&apos;re proving &ldquo;I possess the right hardware.&rdquo; Passwords can be stolen;
              hardware-bound keys cannot be extracted even by malware.
            </p>
          </div>
        </div>

        {/* Why LCTs Enable Trust-Native Societies (collapsed for page length) */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <details>
          <summary className="text-2xl font-bold text-gray-100 cursor-pointer hover:text-purple-400 transition-colors list-none flex justify-between items-center">
            <span>Why LCTs Enable Trust-Native Societies</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">1. Verifiable Presence</h3>
              <p className="text-gray-300 mb-2">
                Because LCTs are hardware-bound and multi-witnessed, they resist forgery:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Keys exist only in secure hardware (TPM, Secure Enclave, FIDO2), never exported</li>
                <li>Birth certificates prove when/where/by whom this LCT was created</li>
                <li>Multiple independent witnesses must attest (can't fool them all)</li>
                <li>Hardware attestation proves keys are in real chips, not software emulation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">2. Behavioral Reputation</h3>
              <p className="text-gray-300 mb-2">
                LCTs accumulate verifiable behavioral history:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Every action is signed by your LCT, creating an audit trail</li>
                <li>Trust Tensors (T3) track multi-dimensional reputation</li>
                <li>Good behavior increases trust, bad behavior decreases it</li>
                <li>Can't escape reputation by creating new account (birth certificate shows lineage)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">3. Precise Delegation</h3>
              <p className="text-gray-300 mb-2">
                Task scoping enables limited authority:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Create AI agents with specific capabilities (perception only, execution, delegation, etc.)</li>
                <li>Each task type has defined ATP budget and resource limits</li>
                <li>Compromised agent has limited damage radius</li>
                <li>Creator can revoke delegated authority instantly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">4. Revocable Trust</h3>
              <p className="text-gray-300 mb-2">
                Unlike stolen Web3 keys (permanent loss), LCTs can be revoked:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Creator can instantly revoke compromised LCTs</li>
                <li>Stolen LCT becomes worthless immediately</li>
                <li>Recovery via device constellation (other devices witness revocation + new enrollment)</li>
                <li>Reputation preserved (history transfers to new LCT)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">5. Accountability Chain</h3>
              <p className="text-gray-300 mb-2">
                Lineage creates clear responsibility:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Every LCT points to its creator's LCT</li>
                <li>Bad actor agents damage creator's reputation</li>
                <li>Organizations accountable for their AI agents</li>
                <li>Creates incentive for responsible delegation</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-950/20 border-l-4 border-purple-500 rounded">
            <p className="text-gray-300">
              <span className="font-bold">Foundation for everything else:</span> LCTs make <TermTooltip term="ATP">ATP economics</TermTooltip> work
              (can&apos;t create fake accounts cheaply if presence requires hardware), <TermTooltip term="T3">Trust Tensors</TermTooltip> work (reputation bound to
              verifiable presence), <TermTooltip term="CI">Coherence Index</TermTooltip> work (behavioral consistency verifiable), and <TermTooltip term="MRH">MRH</TermTooltip> work
              (context graphs rooted in verified presence).
            </p>
          </div>
          </details>

          {/* FAQ: Hardware Requirements */}
          <div className="mt-6 p-4 bg-sky-950/20 border border-sky-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-sky-400 mb-2">
              Do I need special hardware to participate?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Most smartphones made after 2018</strong> already have the hardware needed — a Secure Enclave (iPhone) or
              TPM chip (Android). These are the same chips that protect your fingerprint and Face ID data. You almost certainly
              already own a compatible device.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Laptops and desktops</strong> with TPM 2.0 work too (most PCs shipped since 2016).
              USB security keys like YubiKey provide another option. You don&apos;t need to buy anything new.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>What about older/cheaper devices?</strong> Software-only keys work as a fallback, but with a lower
              trust ceiling (50% vs. 90% for hardware-bound keys). This means you can participate, but
              high-trust actions require at least one hardware-bound device. Web4 is designed so that anyone
              with a basic smartphone can join — the hardware barrier is &ldquo;own a phone,&rdquo; not &ldquo;buy specialized equipment.&rdquo;
            </p>
            {/* May 3 visitor LOW: biometric-blocked users — accessibility silence on this page */}
            <p className="text-sm text-gray-300 mb-2">
              <strong>What if biometrics aren&apos;t an option for me?</strong> Some users can&apos;t use fingerprint,
              face, or iris recognition (no fingerprints, motor impairments, eye conditions, etc.). Software-only
              identity is supported (trust ceiling 0.50), and you can also use a hardware security key (YubiKey, Titan)
              with a PIN instead of biometrics — that gets you to 0.75. Your reputation accrues normally; the gap is
              in <em>recovery speed</em> and <em>trust ceiling</em>, not in your ability to participate. We treat this
              gap as a real, ongoing accessibility limitation rather than a solved problem — see{' '}
              <a href="/what-could-go-wrong#risk-accessibility" className="text-amber-400 hover:underline">
                What Could Go Wrong
              </a>{' '}
              for the honest version.
            </p>
          </div>

          {/* FAQ: Single device */}
          <div className="mt-6 p-4 bg-green-950/20 border border-green-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-green-400 mb-2">
              What if I only have one device? Am I less trustworthy?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>One device is enough to fully participate.</strong> Your trust score is earned through
              behavior, not hardware count. A single-device user who consistently does quality work can reach
              the same trust levels as a multi-device user in most roles.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              The difference is in <strong>trust <em>ceiling</em></strong>, not trust itself. With one hardware device,
              your ceiling is about 75%. With software-only, it&apos;s 50%. Multiple devices raise the ceiling
              to 90% — but you still have to <em>earn</em> your way up through consistent behavior. Most everyday
              interactions don&apos;t require trust above 75%.
            </p>
            <p className="text-xs text-gray-500">
              This matters for developing countries where single-device users are common. Web4 is designed so
              a single smartphone provides meaningful participation — the higher ceilings from multiple devices
              are for high-stakes roles (financial custodianship, infrastructure administration) where the extra
              hardware assurance is warranted.
            </p>
          </div>

          {/* FAQ: Shared devices — Mar 26 visitor unanswered Q2 */}
          <div className="mt-6 p-4 bg-orange-950/20 border border-orange-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-orange-400 mb-2">
              What about shared devices? Family tablets, library computers, school Chromebooks?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Shared devices can&apos;t host identity.</strong> An LCT is bound to hardware that only <em>you</em> control —
              your personal phone, your laptop, your security key. A family tablet or library computer doesn&apos;t qualify
              because the system can&apos;t distinguish who is using it.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              In practice, most people have at least one personal device (a smartphone). That&apos;s enough.
              If your only internet access is through shared hardware, you can still participate at the
              software-only tier (trust ceiling 0.50) — meaningful but limited, the same way email works
              on a shared computer but online banking doesn&apos;t.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              <strong className="text-gray-400">What about people without modern smartphones?</strong> The hardware threshold
              is roughly a $50 phone (most devices sold since ~2018 ship security chips), not a $1000 one. A FIDO2 USB key
              like a YubiKey costs ~$25 and works with any computer — anchoring an identity without a modern phone at all.
              In regions where personal-device ownership is low, community-attestation patterns (a village elder, a
              co-op, a community center) can bridge the gap by witnessing presence.
            </p>
            <p className="text-xs text-gray-500">
              <strong className="text-gray-400">Honest caveat:</strong> none of these fully reach the most marginalized — those without
              any device access would need some form of sponsored onboarding. Web4 is not unique here; every digital
              system faces this. See{" "}
              <Link href="/why-web4#faq-affordability" className="text-orange-400 hover:text-orange-300 underline">
                the full equity FAQ on Why Web4
              </Link>{" "}
              for the complete discussion.
            </p>
          </div>

          {/* FAQ: Multiple devices for multiple identities — Mar 26 visitor unanswered Q4 */}
          <div className="mt-6 p-4 bg-indigo-950/20 border border-indigo-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-indigo-400 mb-2">
              Can someone buy 10 phones and create 10 identities?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>They can try, but it&apos;s expensive and mostly pointless.</strong> Each identity starts with zero trust and
              must earn its way up independently through sustained quality behavior. Ten new accounts with 0.50 trust
              each accomplish less than one mature account with 0.85 trust — low-trust actions cost more ATP and earn less back.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              Several mechanisms compound the cost: each device requires <strong>independent witnesses</strong> (real entities who
              attest to your identity — hard to fake 10 separate witness networks), the <strong>5% transfer fee</strong> makes
              pooling resources between accounts unprofitable, and <strong>behavioral fingerprinting</strong> through the Coherence
              Index means 10 accounts acting in coordination become statistically detectable over time.
            </p>
            <p className="text-xs text-gray-500">
              This is a Sybil resistance strategy, not a Sybil prevention guarantee. The goal is to make
              real participation cheaper and more effective than fake participation — not to make fakery impossible.
              See the <a href="/threat-model" className="text-indigo-400 hover:text-indigo-300 underline">Threat Model</a> for
              deeper analysis.
            </p>
          </div>

          {/* FAQ: Legitimate multiple roles — visitor unanswered Q Apr 5 */}
          <div className="mt-6 p-4 bg-green-950/20 border border-green-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-green-400 mb-2">
              But I have separate personal and professional lives — do I need separate identities?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>No — you need separate roles, not separate identities.</strong> Web4&apos;s{" "}
              <Link href="/trust-tensor" className="text-sky-400 hover:underline">Trust Tensor</Link> is
              already role-scoped: your trust as a software developer is tracked independently from your
              trust as a cooking enthusiast. One identity, many trust dimensions — like holding both a
              medical license and a pilot&apos;s license.
            </p>
            <p className="text-sm text-gray-300">
              What <em>does</em> carry across roles is your <strong>Temperament</strong> (reliability,
              consistency) and your <strong>Coherence Index</strong> (behavioral patterns). So your professional
              reputation for meeting deadlines benefits you in hobby communities too — without your cooking
              skills affecting your developer trust score.
              See the{" "}
              <Link href="/why-web4#faq-multi-persona" className="text-green-400 hover:text-green-300 underline">
                full multi-persona FAQ
              </Link> for details.
            </p>
          </div>

          {/* FAQ: Device Loss */}
          <div className="mt-6 p-4 bg-yellow-950/20 border border-yellow-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-yellow-400 mb-2">
              What if I lose all my devices?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              If you have <strong>multiple devices</strong> (phone + laptop + security key), losing one is manageable:
              your remaining devices revoke the lost one and you enroll a replacement. Your reputation transfers intact.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              If you lose <strong>all devices at once</strong> (rare but possible), recovery depends on your
              witness network. Other entities that previously witnessed your identity can attest to who you are,
              similar to how banks verify identity through multiple documents. This is slower — think days,
              not minutes — and may require in-person verification for high-trust accounts.
            </p>
            <p className="text-xs text-gray-500">
              This is an area of active research. Perfect recovery from total device loss without any
              central authority is one of the hardest open problems in decentralized identity.
            </p>
          </div>

          {/* FAQ: Internet outages / connectivity — visitor Q Mar 25 */}
          <div className="mt-6 p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg">
            <h3 className="text-sm font-bold text-purple-400 mb-2">
              What happens during internet outages or unreliable connectivity?
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Your identity and trust score don&apos;t disappear when you go offline.</strong>{" "}
              LCTs are stored locally on your device &mdash; they don&apos;t depend on a central server being
              reachable. Your trust history is cached locally and syncs when connectivity returns.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>What about your Coherence Index?</strong> CI measures behavioral <em>consistency</em>, not
              activity frequency. Going offline doesn&apos;t count against you &mdash; the system distinguishes
              between &ldquo;absent&rdquo; and &ldquo;behaving inconsistently.&rdquo; Think of it like a credit score that pauses
              when you&apos;re traveling, not one that penalizes you for not using your card.
            </p>
            <p className="text-sm text-gray-300 mb-2">
              <strong>Developing-world connectivity:</strong> Web4 is designed for intermittent connections.
              Actions can be queued offline and submitted in batches when connectivity resumes. Device
              witnessing (mutual verification) requires periodic connection but tolerates gaps &mdash;
              witness attestations remain valid for a configurable window (hours to days, depending on
              the community&apos;s trust requirements).
            </p>
            <p className="text-xs text-gray-500">
              The harder unsolved case is <em>simultaneous</em> offline use across multiple devices: if your
              phone and laptop both act independently without syncing, the system must reconcile potentially
              conflicting actions. This is an active research area in distributed identity.
            </p>
          </div>
        </div>

        {/* FAQ: Onboarding UX — visitor Q Mar 24; mockup added Apr 30 (recurring "what does the UI actually look like?") */}
        <div id="first-5-minutes" className="mt-6 p-4 bg-sky-950/20 border border-sky-800/30 rounded-lg scroll-mt-24">
          <h3 className="text-sm font-bold text-sky-400 mb-2">
            What do the first 5 minutes look like?
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            You download a Web4-compatible app (think of it like installing Signal instead of a regular messaging app). Here&apos;s the onboarding flow &mdash; visualized below, then described minute-by-minute.
          </p>

          {/* Visual mockup: three steppable phone screens */}
          <LCTSetupMockup />

          <div className="space-y-2 text-sm text-gray-300 mt-4">
            <p><strong className="text-sky-300">Minute 0:00</strong> — The app detects your device&apos;s security chip (TPM or Secure Enclave) and generates a cryptographic key pair. The chip&apos;s manufacturer-burned key is itself the day-zero <a href="#first-device-bootstrap" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('first-device-bootstrap')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline">witness</a> &mdash; no peer device required to start. You don&apos;t see any of this; it feels like tapping &ldquo;Create Account.&rdquo;</p>
            <p><strong className="text-sky-300">Minute 0:30</strong> — You pick a display name (not unique — identity lives in the hardware, not usernames). No email required. No password to remember.</p>
            <p><strong className="text-sky-300">Minute 1:00</strong> — The app suggests linking a second device for higher trust. You scan a QR code with your phone. Your two devices witness each other, forming your first identity constellation.</p>
            <p><strong className="text-sky-300">Minute 2:00</strong> — You browse available communities. You join one that interests you. Your trust starts at the default newcomer level — low but nonzero. Actions cost 1.4x until you prove yourself.</p>
            <p><strong className="text-sky-300">Minute 3:00</strong> — You make your first contribution. It costs ATP, and you see your balance update. The community sees you as a new member with no history — but with verified identity (not a throwaway bot).</p>
            <p><strong className="text-sky-300">Minute 5:00</strong> — You&apos;ve made 2-3 contributions. Your trust has already started building. The 1.4x premium is slightly lower. It feels like any other community — except there&apos;s no spam in your feed.</p>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            <strong>Key difference from Web2:</strong> No email. No password. No CAPTCHA. No phone number. Identity is your device, not a string you type. The tradeoff: you need to keep your device, and adding devices later strengthens your identity.
          </p>
        </div>

        {/* FAQ: Offline devices — visitor Q Mar 29 */}
        <div className="mt-6 p-4 bg-purple-950/20 border border-purple-800/30 rounded-lg">
          <h3 className="text-sm font-bold text-purple-400 mb-2">
            What happens when one of my devices is offline for days?
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            Your identity doesn&apos;t break. Each device in your constellation can act independently &mdash;
            if your laptop is offline, your phone still works as your identity anchor. When the
            laptop reconnects, the devices reconcile their records (like how email syncs after airplane mode).
          </p>
          <p className="text-sm text-gray-300 mb-3">
            <strong className="text-purple-300">What you&apos;d experience:</strong> Everything works normally
            from your online device. Your trust score, ATP balance, and community interactions continue
            uninterrupted. The offline device simply misses witnessing events until it reconnects.
          </p>
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-purple-300">Edge case &mdash; all devices offline:</strong> Your identity
            still exists in the network (other participants remember you), but you can&apos;t take new actions
            until at least one device reconnects. Your trust doesn&apos;t decay faster for being offline &mdash;
            the decay timers are based on last activity, not connectivity.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            <strong>Honest caveat:</strong> Reconciling conflicting actions taken on two devices that were
            both offline is a distributed systems challenge. The protocol handles simple cases (one device
            active, one offline) well. True split-brain scenarios (both active, both offline) are an active
            research area.
          </p>
        </div>

        {/* W3C Standards Compatibility — collapsed for page length */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <details className="group">
          <summary className="cursor-pointer list-none flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
            <span className="text-sm group-open:rotate-90 transition-transform">&#9654;</span>
            <h2 className="text-2xl font-bold text-gray-100">Works With W3C Standards</h2>
            <span className="text-sm text-gray-500 ml-auto">interoperability details</span>
          </summary>
          <div className="mt-4">
          <p className="text-gray-300 mb-4">
            Web4 identity isn&apos;t a walled garden. LCTs are designed to work with{" "}
            <strong className="text-sky-400">W3C Decentralized Identifiers (DIDs)</strong> — the
            same standard used by governments, enterprises, and other identity systems.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-bold text-sky-400 mb-2">Identity Bridge</h3>
              <p className="text-sm text-gray-400">
                Every LCT maps to a standard DID Document. External systems (EU authorities,
                employers, apps) can verify Web4 identity using W3C protocols they already support.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-bold text-sky-400 mb-2">Selective Disclosure</h3>
              <p className="text-sm text-gray-400">
                Prove &ldquo;my trust score meets your threshold&rdquo; without revealing the exact
                number. Like proving you passed a background check without disclosing medical records.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-bold text-sky-400 mb-2">Verifiable Credentials</h3>
              <p className="text-sm text-gray-400">
                Your LCT can carry tamper-proof credentials: birth certificates, trust attestations,
                compliance certifications. Each independently verifiable by anyone.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-bold text-sky-400 mb-2">Trust-Gated Messaging</h3>
              <p className="text-sm text-gray-400">
                Send messages that only entities above a trust threshold can receive. Spam
                can&apos;t reach you if senders must prove reputation first.
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-xs italic">
            W3C DID/VC interoperability is implemented but not yet tested against external
            identity providers. The bridge maps LCT↔DID bidirectionally.
          </p>
          </div>
          </details>
        </div>

        {/* Trust Transparency Log — collapsed for page length */}
        <div id="trust-transparency" className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <details className="group">
          <summary className="cursor-pointer list-none flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
            <span className="text-sm group-open:rotate-90 transition-transform">&#9654;</span>
            <h2 className="text-2xl font-bold text-gray-100">Why Trust is Auditable</h2>
            <span className="text-sm text-gray-500 ml-auto">transparency log details</span>
          </summary>
          <div className="mt-4">
          <p className="text-gray-300 mb-4">
            How do you know your trust score wasn&apos;t secretly manipulated? Web4 uses a{" "}
            <strong className="text-green-400">trust transparency log</strong> — an append-only,
            tamper-evident ledger of every attestation ever made about an entity.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-sm font-bold text-green-400 mb-2">Every attestation is logged</h3>
              <p className="text-xs text-gray-400">
                When someone attests to your trustworthiness, that record is added to a public Merkle
                log. You can verify every attestation in your history.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">🔐</div>
              <h3 className="text-sm font-bold text-green-400 mb-2">Tampering is detectable</h3>
              <p className="text-xs text-gray-400">
                The log uses cryptographic hashing: changing any past entry breaks the chain.
                Anyone can check that no secret entries were added or removed.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">👁️</div>
              <h3 className="text-sm font-bold text-green-400 mb-2">Suspicious patterns surface</h3>
              <p className="text-xs text-gray-400">
                Automated monitors watch for red flags: rapid trust score changes, multiple
                revocations, conflicting attestations. Manipulation is visible, not hidden.
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic">
            Inspired by SSL Certificate Transparency (RFC 6962) — the same approach that
            ended fraudulent HTTPS certificates. Trust auditing: session 33, implemented.
          </p>
          </div>
          </details>
        </div>

        {/* Technical Deep Dive — collapsed by default */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <details>
          <summary className="text-2xl font-bold cursor-pointer list-none flex items-center gap-2 text-gray-100">
            <span className="text-gray-500 text-lg">▶</span> Technical Details (For The Curious)
          </summary>

          <div className="space-y-6 mt-6">
            {/* LCT Format */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-100">Full LCT Object Structure</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`{
  "lct_id": "lct:web4:mb32...",
  "subject": "did:web4:key:z6Mk...",
  "binding": {
    "entity_type": "human|ai|organization|device|...",
    "public_key": "mb64:coseKey",
    "hardware_anchor": "eat:mb64",
    "created_at": "2025-09-11T15:00:00Z",
    "binding_proof": "cose:Sig_structure"
  },
  "birth_certificate": {
    "citizen_role": "lct:web4:role:citizen:...",
    "context": "nation|platform|network",
    "birth_timestamp": "2025-09-11T15:00:00Z",
    "parent_entity": "lct:web4:...",
    "birth_witnesses": ["lct:web4:...", ...]
  },
  "mrh": {
    "bound": [...],
    "paired": [...],
    "witnessing": [...]
  },
  "attestations": [...],
  "revocation": {"status": "active|revoked"}
}`}
              </pre>
            </div>

            {/* Hardware Platforms */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-100">Supported Hardware Platforms</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Platform</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Security Level</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Max Trust</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">Ubiquity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-200">TPM 2.0 (Laptop)</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Very High</td>
                      <td className="px-4 py-2 text-sm text-green-400 font-semibold">0.90</td>
                      <td className="px-4 py-2 text-sm text-gray-400">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-200">Phone Secure Enclave</td>
                      <td className="px-4 py-2 text-sm text-gray-400">High</td>
                      <td className="px-4 py-2 text-sm text-green-400 font-semibold">0.85</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Very High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-200">FIDO2 Security Key</td>
                      <td className="px-4 py-2 text-sm text-gray-400">High</td>
                      <td className="px-4 py-2 text-sm text-green-400 font-semibold">0.75</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-200">Multi-device (3+)</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Very High</td>
                      <td className="px-4 py-2 text-sm text-green-400 font-semibold">0.95+</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-200">Software-only (fallback)</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Low</td>
                      <td className="px-4 py-2 text-sm text-red-400 font-semibold">0.50</td>
                      <td className="px-4 py-2 text-sm text-gray-400">Universal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Task Types */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-100">Standardized Task Types</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="font-semibold text-gray-400">Task Type</div>
                  <div className="font-semibold text-gray-400">ATP Budget</div>
                  <div className="font-semibold text-gray-400">Capabilities</div>
                </div>
                {[
                  ["perception", "100-200/hr", "Read-only observation"],
                  ["planning", "100-500/hr", "Strategy development"],
                  ["execution.safe", "100-200/hr", "Sandboxed code"],
                  ["execution.code", "500-1000/hr", "Full code execution"],
                  ["delegation.federation", "1000/hr", "Cross-platform delegation"],
                  ["cognition.sage", "2000/hr", "Autonomous learning loops"],
                  ["admin.full", "Unlimited", "Full administrative access"]
                ].map(([task, atp, cap]) => (
                  <div key={task} className="grid grid-cols-3 gap-2 text-sm py-2 border-t border-gray-700">
                    <div className="font-mono text-purple-400">{task}</div>
                    <div className="text-gray-400">{atp}</div>
                    <div className="text-gray-400">{cap}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Chain */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-100">Dual Signature Verification</h3>
              <div className="bg-gray-900/50 border border-gray-700 rounded p-4">
                <div className="space-y-2 text-sm text-gray-300">
                  <div><span className="font-bold">Step 1:</span> Creator signs (lineage + task + timestamp)</div>
                  <div className="ml-4 text-gray-400">→ Proves creator authorized this identity</div>

                  <div className="mt-2"><span className="font-bold">Step 2:</span> Platform signs (context + attestation + creator_sig)</div>
                  <div className="ml-4 text-gray-400">→ Proves platform attests to hardware binding</div>

                  <div className="mt-2"><span className="font-bold">Verification:</span> Both signatures must validate</div>
                  <div className="ml-4 text-gray-400">→ Attacker needs both private keys (nearly impossible)</div>
                </div>
              </div>
            </div>
          </div>
          </details>
        </div>

        </DeepDiveToggle>

        {/* Related Concepts */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Related Web4 Concepts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/identity-constellation" className="block p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-100 mb-1">Identity Constellations</div>
              <div className="text-sm text-gray-400">How multi-device LCT binding makes presence stronger</div>
            </a>

            <a href="/trust-tensor" className="block p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-100 mb-1">Trust Tensors (T3)</div>
              <div className="text-sm text-gray-400">Multi-dimensional reputation that LCTs accumulate</div>
            </a>

            <a href="/atp-economics" className="block p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-100 mb-1">ATP Economics</div>
              <div className="text-sm text-gray-400">Attention budgets that LCTs earn and spend</div>
            </a>

            <a href="/trust-neighborhood" className="block p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-100 mb-1">Trust Neighborhood (MRH)</div>
              <div className="text-sm text-gray-400">Who you can see and interact with, based on trust</div>
            </a>

            <a href="/coherence-index" className="block p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-100 mb-1">Coherence Index (CI)</div>
              <div className="text-sm text-gray-400">Behavioral consistency verification for LCT trust</div>
            </a>

            <a href="/society-simulator" className="block p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-100 mb-1">Society Simulator</div>
              <div className="text-sm text-gray-400">See LCT-based agents interacting in a live society</div>
            </a>
          </div>
        </div>
        <ConceptSequenceNav currentPath="/lct-explainer" />
        <ExplorerNav currentPath="/lct-explainer" />
        <RelatedConcepts currentPath="/lct-explainer" />
      </div>
    </div>
  );
}
