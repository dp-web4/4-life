"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import TermTooltip from "@/components/TermTooltip";

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
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [deviceCount, setDeviceCount] = useState(1);
  const [attackScenario, setAttackScenario] = useState<number>(0);

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
      name: "Witness Network",
      description: "Multiple independent devices/platforms witness and attest to this LCT's validity",
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

  const trust = calculateTrust(deviceCount);
  const attackDifficulty = calculateAttackDifficulty(deviceCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/lct-explainer" />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Linked Context Tokens (LCT)
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Web4&apos;s verifiable identity layer — hardware-bound, witnessed, and resistant to faking
          </p>
        </div>

        {/* The Three Models */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Identity Evolution: Web2 → Web3 → Web4</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Web2 */}
            <div className="border-2 border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="text-xl font-bold mb-3 text-red-800">Web2: Passwords</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Identity is:</div>
                  <div className="text-sm text-gray-600">What you <span className="font-bold">know</span></div>
                  <div className="text-xs text-gray-500 italic mt-1">username + password</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Stored:</div>
                  <div className="text-sm text-gray-600">Company's server</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Weakness:</div>
                  <div className="text-sm text-red-600">Server breach = everyone compromised</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Attack surface:</div>
                  <div className="text-sm text-red-600">Central database</div>
                </div>
              </div>
            </div>

            {/* Web3 */}
            <div className="border-2 border-yellow-200 rounded-lg p-6 bg-yellow-50">
              <h3 className="text-xl font-bold mb-3 text-yellow-800">Web3: Wallet Keys</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Identity is:</div>
                  <div className="text-sm text-gray-600">What you <span className="font-bold">have</span></div>
                  <div className="text-xs text-gray-500 italic mt-1">private key / seed phrase</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Stored:</div>
                  <div className="text-sm text-gray-600">Your device (filesystem)</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Weakness:</div>
                  <div className="text-sm text-yellow-600">Key theft = identity stolen forever</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Attack surface:</div>
                  <div className="text-sm text-yellow-600">File access, seed phrase exposure</div>
                </div>
              </div>
            </div>

            {/* Web4 */}
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold mb-3 text-green-800">Web4: LCTs</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Identity is:</div>
                  <div className="text-sm text-gray-600">What <span className="font-bold">witnesses verify</span></div>
                  <div className="text-xs text-gray-500 italic mt-1">hardware + behavior + attestation</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Stored:</div>
                  <div className="text-sm text-gray-600">Secure hardware (TPM, Secure Enclave, FIDO2)</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Strength:</div>
                  <div className="text-sm text-green-600">Hardware-bound, multi-witness, revocable</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">Attack surface:</div>
                  <div className="text-sm text-green-600">Multiple independent hardware chips</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Key insight:</span> Web2 trusts what you memorize (forgettable, shareable).
              Web3 trusts what you store (copyable, stealable).
              Web4 trusts what hardware proves and witnesses verify (verifiable, revocable).
            </p>
          </div>

          {/* Hardware explainer */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-sm font-bold text-purple-800 mb-2">
              What are TPM, Secure Enclave, and FIDO2?
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              These are <span className="font-bold">tamper-resistant security chips</span> already
              built into devices you probably own:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc list-inside">
              <li><span className="font-bold">Secure Enclave</span> &mdash; Apple&apos;s security chip in every iPhone, iPad, and Mac. It handles Face ID, Touch ID, and encryption keys.</li>
              <li><span className="font-bold">TPM (Trusted Platform Module)</span> &mdash; A security chip in most modern laptops and PCs. Windows uses it for BitLocker encryption and secure boot.</li>
              <li><span className="font-bold">FIDO2 / WebAuthn</span> &mdash; Security keys you can buy (like YubiKey) or built-in biometrics (fingerprint readers). Used for passwordless login on many websites already.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              The key property: these chips generate cryptographic keys internally and
              <span className="font-bold"> never let them leave the hardware</span>. Even if someone copies
              your entire hard drive, they can&apos;t extract the keys.
            </p>
          </div>

          {/* Witness explainer */}
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-bold text-green-800 mb-2">
              What are &ldquo;witnesses&rdquo;?
            </h3>
            <p className="text-sm text-gray-700">
              In Web4, a <span className="font-bold">witness</span> is another device or
              platform that independently confirms your presence is real. Think of it like
              co-signers on a document: your phone, laptop, and security key each independently
              vouch that &ldquo;yes, this is really Alice.&rdquo; An attacker would need to
              compromise <span className="font-bold">all</span> of your witnesses simultaneously
              to impersonate you &mdash; not just steal one password.
            </p>
          </div>
        </div>

        {/* What Is An LCT */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">What Is a Linked Context Token?</h2>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">
              An <span className="font-bold text-purple-600">LCT</span> is Web4's foundational presence primitive.
              Unlike a password (knowledge) or wallet address (cryptographic key), an LCT is a
              {" "}<span className="font-bold">hardware-bound, witnessed, contextual proof of presence</span> that verifies:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><span className="font-bold">Where you are</span>: Which physical device/platform (via hardware attestation)</li>
              <li><span className="font-bold">Who created you</span>: Your lineage chain (accountability)</li>
              <li><span className="font-bold">What you can do</span>: Your task scope (limited delegation)</li>
              <li><span className="font-bold">Who witnesses you</span>: Which devices/platforms attest to your existence</li>
              <li><span className="font-bold">How you behave</span>: Your reputation history (trust earned, not claimed)</li>
            </ul>
          </div>

          {/* LCT Format Example */}
          <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
            <div className="text-sm font-mono mb-2 text-gray-600">Example LCT:</div>
            <div className="text-lg font-mono text-purple-600 break-all">
              lct:web4:agent:alice.assistant1@Thor#perception
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div><span className="font-bold">Lineage</span>: alice.assistant1 (created by Alice, who vouches for it)</div>
              <div><span className="font-bold">Context</span>: Thor (Jetson AGX device with TPM attestation)</div>
              <div><span className="font-bold">Task</span>: perception (read-only, cannot execute code)</div>
            </div>
          </div>

          {/* Interactive Component Explorer */}
          <div>
            <h3 className="text-xl font-bold mb-4">LCT Components (Click to Explore)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {lctComponents.map((component) => (
                <button
                  key={component.name}
                  onClick={() => setSelectedComponent(component.name)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedComponent === component.name
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="font-bold text-gray-800">{component.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{component.description}</div>
                </button>
              ))}
            </div>

            {selectedComponent && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
                <h4 className="font-bold text-purple-800 mb-2">
                  {lctComponents.find(c => c.name === selectedComponent)?.name}
                </h4>
                <p className="text-gray-700 mb-3">
                  {lctComponents.find(c => c.name === selectedComponent)?.description}
                </p>
                <div className="bg-white border border-purple-200 rounded p-3">
                  <div className="text-sm font-semibold text-gray-700 mb-1">Example:</div>
                  <div className="text-sm text-gray-600 italic">
                    {lctComponents.find(c => c.name === selectedComponent)?.example}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive: Trust vs Device Count */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Interactive: How Device Witnesses Strengthen Presence</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Hardware Devices Witnessing Your LCT: {deviceCount}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={deviceCount}
              onChange={(e) => setDeviceCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Presence Trust Score</h3>
              <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300 transition-all duration-500"
                  style={{ height: `${trust * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold text-gray-800 drop-shadow-lg">
                    {trust.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                {trust < 0.5 && "⚠️ Low trust - vulnerable to compromise"}
                {trust >= 0.5 && trust < 0.75 && "🟡 Moderate trust - single device"}
                {trust >= 0.75 && trust < 0.9 && "🟢 Good trust - multi-device constellation"}
                {trust >= 0.9 && "✅ Excellent trust - strong multi-device network"}
              </div>
            </div>

            {/* Attack Difficulty */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Compromise Difficulty</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-purple-600">
                  {attackDifficulty.toFixed(1)}x
                </div>
                <div className="text-sm text-gray-600 mt-1">harder to attack</div>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-bold">Attacker must compromise:</span>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {deviceCount >= 1 && <li>Secure Enclave (iPhone/Android)</li>}
                  {deviceCount >= 2 && <li>FIDO2 Security Key</li>}
                  {deviceCount >= 3 && <li>TPM 2.0 (Laptop)</li>}
                  {deviceCount >= 4 && <li>Secondary FIDO2 Key</li>}
                  {deviceCount >= 5 && <li>Tablet/Additional Device</li>}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Why this matters:</span> With {deviceCount} device{deviceCount > 1 ? 's' : ''},
              an attacker must physically steal AND biometrically unlock {deviceCount === 1 ? 'your device' : `all ${deviceCount} independent devices`}.
              Each additional hardware witness makes compromise exponentially harder.
            </p>
          </div>
        </div>

        {/* Attack Scenario Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Security Comparison: Web2 vs Web3 vs Web4</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Attack Scenario:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {attackScenarios.map((scenario, idx) => (
                <button
                  key={idx}
                  onClick={() => setAttackScenario(idx)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    attackScenario === idx
                      ? "border-purple-500 bg-purple-50 font-semibold"
                      : "border-gray-200 bg-white hover:border-purple-300"
                  }`}
                >
                  <div className="text-sm">{scenario.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              {attackScenarios[attackScenario].name}
            </h3>
            <p className="text-gray-700 mb-4">
              {attackScenarios[attackScenario].description}
            </p>

            <div className="space-y-3">
              <div className="bg-white border-l-4 border-red-500 p-3 rounded">
                <div className="text-sm font-semibold text-gray-700 mb-1">Web2 (Passwords):</div>
                <div className="text-sm text-gray-600">{attackScenarios[attackScenario].web2Result}</div>
              </div>

              <div className="bg-white border-l-4 border-yellow-500 p-3 rounded">
                <div className="text-sm font-semibold text-gray-700 mb-1">Web3 (Wallet Keys):</div>
                <div className="text-sm text-gray-600">{attackScenarios[attackScenario].web3Result}</div>
              </div>

              <div className="bg-white border-l-4 border-green-500 p-3 rounded">
                <div className="text-sm font-semibold text-gray-700 mb-1">Web4 (LCTs):</div>
                <div className="text-sm text-gray-600">{attackScenarios[attackScenario].web4Result}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Why LCTs Enable Trust-Native Societies */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Why LCTs Enable Trust-Native Societies</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">1. Verifiable Presence</h3>
              <p className="text-gray-700 mb-2">
                Because LCTs are hardware-bound and multi-witnessed, they resist forgery:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Keys exist only in secure hardware (TPM, Secure Enclave, FIDO2), never exported</li>
                <li>Birth certificates prove when/where/by whom this LCT was created</li>
                <li>Multiple independent witnesses must attest (can't fool them all)</li>
                <li>Hardware attestation proves keys are in real chips, not software emulation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">2. Behavioral Reputation</h3>
              <p className="text-gray-700 mb-2">
                LCTs accumulate verifiable behavioral history:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Every action is signed by your LCT, creating an audit trail</li>
                <li>Trust Tensors (T3) track multi-dimensional reputation</li>
                <li>Good behavior increases trust, bad behavior decreases it</li>
                <li>Can't escape reputation by creating new account (birth certificate shows lineage)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">3. Precise Delegation</h3>
              <p className="text-gray-700 mb-2">
                Task scoping enables limited authority:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Create AI agents with specific capabilities (perception only, execution, delegation, etc.)</li>
                <li>Each task type has defined ATP budget and resource limits</li>
                <li>Compromised agent has limited damage radius</li>
                <li>Creator can revoke delegated authority instantly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">4. Revocable Trust</h3>
              <p className="text-gray-700 mb-2">
                Unlike stolen Web3 keys (permanent loss), LCTs can be revoked:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Creator can instantly revoke compromised LCTs</li>
                <li>Stolen LCT becomes worthless immediately</li>
                <li>Recovery via device constellation (other devices witness revocation + new enrollment)</li>
                <li>Reputation preserved (history transfers to new LCT)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">5. Accountability Chain</h3>
              <p className="text-gray-700 mb-2">
                Lineage creates clear responsibility:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                <li>Every LCT points to its creator's LCT</li>
                <li>Bad actor agents damage creator's reputation</li>
                <li>Organizations accountable for their AI agents</li>
                <li>Creates incentive for responsible delegation</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
            <p className="text-gray-700">
              <span className="font-bold">Foundation for everything else:</span> LCTs make <TermTooltip term="ATP">ATP economics</TermTooltip> work
              (can&apos;t create fake accounts cheaply if presence requires hardware), <TermTooltip term="T3">Trust Tensors</TermTooltip> work (reputation bound to
              verifiable presence), <TermTooltip term="CI">Coherence Index</TermTooltip> work (behavioral consistency verifiable), and <TermTooltip term="MRH">MRH</TermTooltip> work
              (context graphs rooted in verified presence).
            </p>
          </div>

          {/* FAQ: Device Loss */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-sm font-bold text-yellow-800 mb-2">
              What if I lose all my devices?
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              If you have <strong>multiple devices</strong> (phone + laptop + security key), losing one is manageable:
              your remaining devices revoke the lost one and you enroll a replacement. Your reputation transfers intact.
            </p>
            <p className="text-sm text-gray-700 mb-2">
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
        </div>

        {/* Technical Deep Dive — collapsed by default */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <details>
          <summary className="text-2xl font-bold mb-6 cursor-pointer list-none flex items-center gap-2">
            <span className="text-gray-400 text-lg">▶</span> Technical Details (For The Curious)
          </summary>

          <div className="space-y-6 mt-6">
            {/* LCT Format */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Full LCT Object Structure</h3>
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
              <h3 className="text-lg font-bold mb-3 text-gray-800">Supported Hardware Platforms</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Security Level</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Max Trust</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ubiquity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Phone Secure Enclave</td>
                      <td className="px-4 py-2 text-sm text-gray-600">High</td>
                      <td className="px-4 py-2 text-sm text-green-600 font-semibold">0.75</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Very High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">FIDO2 Security Key</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Very High</td>
                      <td className="px-4 py-2 text-sm text-green-600 font-semibold">0.80</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">TPM 2.0 (Laptop)</td>
                      <td className="px-4 py-2 text-sm text-gray-600">High</td>
                      <td className="px-4 py-2 text-sm text-green-600 font-semibold">0.75</td>
                      <td className="px-4 py-2 text-sm text-gray-600">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Multi-device (3+)</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Very High</td>
                      <td className="px-4 py-2 text-sm text-green-600 font-semibold">0.95-0.98</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Medium</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm text-gray-900">Software-only (fallback)</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Low</td>
                      <td className="px-4 py-2 text-sm text-red-600 font-semibold">0.40</td>
                      <td className="px-4 py-2 text-sm text-gray-600">Universal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Task Types */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Standardized Task Types</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="font-semibold text-gray-700">Task Type</div>
                  <div className="font-semibold text-gray-700">ATP Budget</div>
                  <div className="font-semibold text-gray-700">Capabilities</div>
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
                  <div key={task} className="grid grid-cols-3 gap-2 text-sm py-2 border-t border-gray-100">
                    <div className="font-mono text-purple-600">{task}</div>
                    <div className="text-gray-600">{atp}</div>
                    <div className="text-gray-600">{cap}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Chain */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-800">Dual Signature Verification</h3>
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <div><span className="font-bold">Step 1:</span> Creator signs (lineage + task + timestamp)</div>
                  <div className="ml-4 text-gray-600">→ Proves creator authorized this identity</div>

                  <div className="mt-2"><span className="font-bold">Step 2:</span> Platform signs (context + attestation + creator_sig)</div>
                  <div className="ml-4 text-gray-600">→ Proves platform attests to hardware binding</div>

                  <div className="mt-2"><span className="font-bold">Verification:</span> Both signatures must validate</div>
                  <div className="ml-4 text-gray-600">→ Attacker needs both private keys (nearly impossible)</div>
                </div>
              </div>
            </div>
          </div>
          </details>
        </div>

        {/* Related Concepts */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Related Web4 Concepts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/identity-constellation" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-800 mb-1">Identity Constellations</div>
              <div className="text-sm text-gray-600">How multi-device LCT binding makes presence stronger</div>
            </a>

            <a href="/trust-tensor" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-800 mb-1">Trust Tensors (T3)</div>
              <div className="text-sm text-gray-600">Multi-dimensional reputation that LCTs accumulate</div>
            </a>

            <a href="/atp-economics" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-800 mb-1">ATP Economics</div>
              <div className="text-sm text-gray-600">Attention budgets that LCTs earn and spend</div>
            </a>

            <a href="/markov-relevancy-horizon" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-800 mb-1">Markov Relevancy Horizon (MRH)</div>
              <div className="text-sm text-gray-600">Context graphs rooted in LCT relationships</div>
            </a>

            <a href="/coherence-index" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-800 mb-1">Coherence Index (CI)</div>
              <div className="text-sm text-gray-600">Behavioral consistency verification for LCT trust</div>
            </a>

            <a href="/lab-console" className="block p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-all">
              <div className="font-bold text-gray-800 mb-1">Lab Console</div>
              <div className="text-sm text-gray-600">See LCT-based agents in action</div>
            </a>
          </div>
        </div>
        {/* Sequence Navigation */}
        <div className="mt-8 flex gap-4">
          <a href="/why-web4" className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm text-white text-center" style={{ background: '#374151' }}>
            ← Why Web4
          </a>
          <a href="/atp-economics" className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm text-white text-center" style={{ background: '#0284c7' }}>
            Next: Energy Budget (ATP) →
          </a>
        </div>

        <RelatedConcepts currentPath="/lct-explainer" />
      </div>
    </div>
  );
}
