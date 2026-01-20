"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

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

  // Trust increases with witness count (simplified model)
  const constellationTrust = Math.min(0.95, 0.3 + (deviceCount * 0.15));

  // Attack difficulty increases exponentially
  const attackDifficulty = Math.pow(2, deviceCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/identity-constellation" />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Identity Constellations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Why Web4 identity gets <span className="font-bold text-blue-600">stronger</span> with more devices,
            not weaker
          </p>
        </div>

        {/* The Problem */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🔐</span>
            <span>The Traditional Model (Passwords & Accounts)</span>
          </h2>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Problem:</span> Your identity is a username + password stored on someone else's server.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Each device that logs in is another place your credentials can be stolen</li>
                <li>More devices = more attack surface</li>
                <li>If any one device is compromised, your whole identity is at risk</li>
                <li>The server can be hacked, leaking millions of accounts at once</li>
              </ul>
            </div>

            <div className="text-center text-red-600 font-bold text-lg">
              More Devices = More Risk ❌
            </div>
          </div>
        </div>

        {/* The Web4 Solution */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>✨</span>
            <span>The Web4 Model (Identity Constellations)</span>
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Solution:</span> Your identity is rooted in hardware chips in devices YOU control.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Each device has a cryptographic key that never leaves its secure chip (Secure Enclave, TPM, FIDO2 key)</li>
                <li>Devices "witness" each other - they sign statements saying "I've seen this identity"</li>
                <li>More devices witnessing = harder to fake</li>
                <li>An attacker would need to compromise MULTIPLE independent hardware chips</li>
                <li>No central server to hack</li>
              </ul>
            </div>

            <div className="text-center text-blue-600 font-bold text-lg">
              More Devices = Stronger Identity ✓
            </div>
          </div>
        </div>

        {/* Interactive Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Interactive: See Identity Strength Grow</h2>

          {/* Device Count Slider */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Devices in Your Constellation: {deviceCount}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={deviceCount}
              onChange={(e) => setDeviceCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1 device</span>
              <span>5 devices</span>
            </div>
          </div>

          {/* Constellation Visualization */}
          <div className="relative bg-gray-50 rounded-lg p-8 mb-6" style={{ minHeight: "300px" }}>
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
                    <circle cx={cx} cy={cy} r="25" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <text x={cx} y={cy} textAnchor="middle" fontSize="20">
                      {deviceIcons[idx]}
                    </text>
                    <text x={cx} y={cy + 45} textAnchor="middle" fontSize="12" fill="#374151">
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

            <p className="text-center text-sm text-gray-600 mt-4">
              Solid lines = device attests to root identity<br />
              Dotted lines = devices witness each other
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Identity Trust</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {(constellationTrust * 100).toFixed(0)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${constellationTrust * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Higher trust = more confidence this identity is genuine
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Attack Difficulty</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {attackDifficulty}x
              </div>
              <p className="text-sm text-gray-700">
                An attacker must compromise <span className="font-bold">{deviceCount} independent</span> hardware chips
              </p>
              <p className="text-xs text-gray-600 mt-2">
                {deviceCount === 1 && "One device = vulnerable to single-point compromise"}
                {deviceCount === 2 && "Two devices = must hack phone AND laptop"}
                {deviceCount === 3 && "Three devices = extremely difficult"}
                {deviceCount >= 4 && "Four+ devices = practically impossible"}
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How It Works: The Enrollment Ceremony</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">First Device (Genesis)</h3>
                <p className="text-gray-700">
                  You create your identity on your first device (usually your phone).
                  A cryptographic key is generated inside the Secure Enclave chip - it never leaves the device.
                  This becomes your Root LCT.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Add Second Device</h3>
                <p className="text-gray-700">
                  Want to add your laptop? You scan a QR code from your phone to your laptop.
                  Your phone signs a "witness statement" saying "this laptop belongs to the same identity."
                  The laptop generates its own key in its TPM chip.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Cross-Device Witnessing</h3>
                <p className="text-gray-700">
                  Your devices periodically "see" each other. When you use your phone and laptop at the same time,
                  they create mutual witness records. This makes your identity more trustworthy over time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Recovery Quorum</h3>
                <p className="text-gray-700">
                  If you lose your phone, you can recover your identity using your other devices.
                  You need a "quorum" (e.g., 2 out of 3 devices) to prove you're still you.
                  No central authority needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Why This Matters</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-bold">No Password Leaks</h3>
                <p className="text-gray-700">
                  Your identity isn't stored on a server that can be hacked. It's rooted in hardware you control.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-bold">Targeted Attacks Get Harder</h3>
                <p className="text-gray-700">
                  To impersonate you, an attacker would need to physically steal and compromise multiple independent devices.
                  Not impossible, but exponentially harder than guessing a password.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <h3 className="font-bold">Works Across Web4</h3>
                <p className="text-gray-700">
                  Your constellation identity works everywhere in Web4 - no separate accounts, no passwords to remember,
                  no "Sign in with Google/Facebook."
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <h3 className="font-bold">Trust Through Witnesses</h3>
                <p className="text-gray-700">
                  The more devices witnessing your identity, the higher your trust score.
                  Web4 societies can see: "This identity has been witnessed by 5 independent hardware anchors over 2 years."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Traditional vs Web4 Identity</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-3">Aspect</th>
                  <th className="text-left p-3 bg-red-50">Traditional (Passwords)</th>
                  <th className="text-left p-3 bg-blue-50">Web4 (Constellations)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Where stored</td>
                  <td className="p-3 text-gray-700">Company servers</td>
                  <td className="p-3 text-gray-700">Hardware chips you control</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Attack surface</td>
                  <td className="p-3 text-gray-700">One server leak = millions compromised</td>
                  <td className="p-3 text-gray-700">Must target each individual</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">More devices</td>
                  <td className="p-3 text-red-600 font-bold">= More risk</td>
                  <td className="p-3 text-blue-600 font-bold">= Stronger identity</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Recovery</td>
                  <td className="p-3 text-gray-700">"Forgot password" email</td>
                  <td className="p-3 text-gray-700">Device quorum (2 of 3)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Privacy</td>
                  <td className="p-3 text-gray-700">Company knows your activity</td>
                  <td className="p-3 text-gray-700">No central tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Details (Optional) */}
        <details className="bg-gray-50 rounded-lg p-6 mb-8">
          <summary className="font-bold text-lg cursor-pointer">
            🤓 For the Technically Curious: How the Cryptography Works
          </summary>

          <div className="mt-4 space-y-4 text-gray-700">
            <p>
              <span className="font-bold">Secure Enclaves (iPhone/Android):</span> These are separate processors
              inside your phone that handle cryptography. Keys are generated inside and never leave. Even the main
              processor can't read them.
            </p>

            <p>
              <span className="font-bold">TPM Chips (Laptops):</span> Trusted Platform Module chips provide
              hardware-based key storage. The key is bound to the specific hardware configuration.
            </p>

            <p>
              <span className="font-bold">FIDO2 Keys:</span> Physical security keys (like YubiKey) that generate
              and store keys internally. They require physical touch to sign, making remote attacks impossible.
            </p>

            <p>
              <span className="font-bold">Attestation:</span> Each device proves its key came from genuine hardware.
              Apple/Google/TPM manufacturers sign certificates saying "this key was generated in real hardware."
            </p>

            <p>
              <span className="font-bold">Cross-Device Witnessing:</span> When two of your devices are used together,
              they create signed statements like: "Device A witnessed Device B at timestamp T, both claiming identity I."
              This creates a verifiable history.
            </p>
          </div>
        </details>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore Web4?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Identity constellations are just one piece of trust-native architecture.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              ← Back to 4-Life Home
            </a>
            <a
              href="/web4-explainer"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition-colors"
            >
              Learn More About Web4 →
            </a>
          </div>
        </div>
        <RelatedConcepts currentPath="/identity-constellation" />
      </div>
    </div>
  );
}
