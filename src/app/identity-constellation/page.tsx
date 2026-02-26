"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import { trackPageVisit } from "@/lib/exploration";

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
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
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
                Your identity isn&apos;t stored on a server that can be hacked. It&apos;s rooted in hardware you control.
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
                The more devices witnessing your identity, the higher your trust score.
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
                <td className="p-3 text-gray-400">Device quorum (2 of 3)</td>
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
            href="/"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
          >
            ← Back to 4-Life Home
          </a>
          <a
            href="/lct-explainer"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold transition-colors"
          >
            Learn About Identity (LCT) →
          </a>
        </div>
      </div>
      <ExplorerNav currentPath="/identity-constellation" />
      <RelatedConcepts currentPath="/identity-constellation" />
    </div>
  );
}
