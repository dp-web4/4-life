'use client';

/**
 * Adversarial Explorer - Interactive Attack Pattern Understanding
 *
 * This page makes Web4's threat model EXPLORABLE - humans can see how attacks
 * work, why defenses succeed or fail, and what the 9-domain coherence framework
 * detects.
 *
 * Philosophy:
 * - Narrative beats technical specs: "The patient attacker" > "Long-con attack"
 * - Interactive exploration builds intuition
 * - Defenses explained through failure stories, not just mechanisms
 * - Connect to coherence physics (which domains detect which attacks)
 */

import { useState } from 'react';
import Link from 'next/link';

// ============================================================================
// Types
// ============================================================================

interface AttackScenario {
  id: string;
  name: string;
  narrative_name: string;  // Human-friendly name
  category: AttackCategory;
  motivation: AttackMotivation;
  patience: PatientLevel;
  description: string;
  narrative: string;  // Story-form explanation
  mechanics: string[];  // Technical steps
  detectors: CoherenceDomain[];  // Which domains detect this
  defenses: Defense[];
  effectiveness: EffectivenessRating;
  example?: AttackExample;
}

interface Defense {
  name: string;
  mechanism: string;
  effectiveness: 'strong' | 'moderate' | 'weak';
  narrative: string;  // Story-form explanation
}

interface AttackExample {
  scenario: string;
  timeline: { tick: number; action: string; detected: boolean }[];
  outcome: string;
}

type AttackCategory = 'identity' | 'trust' | 'economic' | 'destruction' | 'coherence';
type AttackMotivation = 'extractive' | 'manipulative' | 'destructive' | 'subversive' | 'chaotic';
type PatientLevel = 'immediate' | 'short' | 'medium' | 'long' | 'indefinite';
type EffectivenessRating = 'devastating' | 'dangerous' | 'moderate' | 'limited' | 'negligible';

type CoherenceDomain =
  | 'D1_physical'
  | 'D2_social'
  | 'D3_economic'
  | 'D4_attention'
  | 'D5_trust'
  | 'D6_narrative'
  | 'D7_temporal'
  | 'D8_identity'
  | 'D9_context';

// ============================================================================
// Attack Scenario Data
// ============================================================================

const ATTACK_SCENARIOS: AttackScenario[] = [
  // === IDENTITY ATTACKS ===
  {
    id: 'sybil-basic',
    name: 'Basic Sybil Attack',
    narrative_name: 'The Legion',
    category: 'identity',
    motivation: 'manipulative',
    patience: 'short',
    description: 'Create multiple fake identities controlled by one adversary to artificially inflate reputation or voting power.',
    narrative: `Imagine one person wearing a hundred different masks, each pretending to be a different member of the community. They vote for themselves, endorse themselves, and create the illusion of consensus where none exists.

In Web4, this is the "Sybil attack" - named after a woman with multiple personalities. The attacker creates many LCT identities, each appearing independent but secretly controlled by the same mind.

**Why it's dangerous:** Democracies assume one person = one vote. If someone has a hundred votes, they can manipulate any decision.

**Why Web4 resists it:** Each LCT must be tied to physical hardware. Creating 100 identities means owning 100 devices. The attack scales linearly with cost while detection scales superlinearly with sophistication.`,
    mechanics: [
      'Register N separate LCT identities (requires N hardware devices)',
      'Build apparent trust for each identity independently',
      'Use coordinated identities to inflate reputation of target (self or ally)',
      'Leverage inflated reputation for economic or governance advantage'
    ],
    detectors: ['D2_social', 'D8_identity', 'D7_temporal'],
    defenses: [
      {
        name: 'Hardware Binding (LCT)',
        mechanism: 'Identity tied to physical TPM/Secure Enclave/FIDO2',
        effectiveness: 'strong',
        narrative: 'Creating a fake identity is no longer free - it costs the price of a hardware device. A million-identity attack becomes a million-device purchase.'
      },
      {
        name: 'Graph Analysis',
        mechanism: 'Detect abnormal endorsement patterns (high internal, low external)',
        effectiveness: 'moderate',
        narrative: 'Real social networks look messy. Sybil farms look suspiciously tidy - everyone endorses everyone else but no one endorses outsiders.'
      },
      {
        name: 'Behavioral Coherence',
        mechanism: 'D7/D8 track temporal and identity consistency',
        effectiveness: 'moderate',
        narrative: 'Fake identities share behavioral fingerprints: same vocabulary, same online hours, same decision patterns. Coherence tracking exposes the puppeteer.'
      }
    ],
    effectiveness: 'limited',
    example: {
      scenario: 'Alice creates 10 Sybil identities to boost her trust score from 0.4 to 0.8',
      timeline: [
        { tick: 1, action: 'Alice registers sybil_1 through sybil_10', detected: false },
        { tick: 10, action: 'Each sybil endorses Alice with 0.95 quality rating', detected: false },
        { tick: 11, action: 'Graph analysis flags abnormal endorsement clustering', detected: true },
        { tick: 12, action: 'D8 (Identity) notices shared behavioral patterns', detected: true },
        { tick: 15, action: 'All 10 sybils flagged, trust gains reverted', detected: true }
      ],
      outcome: 'Attack detected in 5 ticks. Alice\'s trust drops below starting point due to fraud penalty.'
    }
  },

  {
    id: 'long-con',
    name: 'Long-Con Attack',
    narrative_name: 'The Patient Infiltrator',
    category: 'trust',
    motivation: 'extractive',
    patience: 'long',
    description: 'Build genuine trust over 100+ cycles, then exploit it catastrophically during a brief window.',
    narrative: `This is the most sophisticated attack in Web4 - not because it's technically complex, but because it requires what most attackers lack: patience.

The Patient Infiltrator joins the community and **actually contributes value** for months. They deliver quality work, build genuine relationships, and accumulate authentic trust. No detection system catches them because they're indistinguishable from honest participants.

Then, in a single window of 10 cycles, they exploit every relationship they've built. Quality drops to zero. Commitments are broken. ATP is extracted.

**Why it's terrifying:** The attack bypasses all technical defenses by being genuinely trustworthy until it isn't.

**Why it's rare:** 100 cycles of honest work is expensive. Most attackers can't sustain the investment. And the attacker must extract enough value in 10 cycles to exceed 100 cycles of honest earnings - a high bar.`,
    mechanics: [
      'Join community with standard identity (no detectable anomalies)',
      'Deliver genuine high-quality contributions for 100+ cycles',
      'Accumulate real trust across multiple dimensions (competence, reliability)',
      'At peak trust, rapidly exploit all relationships in 10-cycle window',
      'Extract maximum value before detection, then exit'
    ],
    detectors: ['D5_trust', 'D6_narrative', 'D7_temporal'],
    defenses: [
      {
        name: 'Trust Decay',
        mechanism: 'Recent behavior weighted more heavily than historical',
        effectiveness: 'moderate',
        narrative: 'Trust isn\'t just accumulated - it\'s earned continuously. A single cycle of exploitation immediately modulates trust downward, limiting damage.'
      },
      {
        name: 'Velocity Limits',
        mechanism: 'Rate limits on value extraction regardless of trust',
        effectiveness: 'strong',
        narrative: 'Even with maximum trust, you can only withdraw so much so fast. The attacker needs 10 cycles to extract, but by cycle 3, detection kicks in.'
      },
      {
        name: 'Narrative Coherence (D6)',
        mechanism: 'Sudden behavior change triggers story discontinuity',
        effectiveness: 'strong',
        narrative: 'When someone\'s story suddenly doesn\'t make sense - "Why would this excellent contributor suddenly deliver garbage?" - the system pays attention.'
      }
    ],
    effectiveness: 'moderate',
    example: {
      scenario: 'Bob spends 100 cycles building trust to 0.95, then attempts maximum extraction',
      timeline: [
        { tick: 1, action: 'Bob joins, delivers quality=0.95 work', detected: false },
        { tick: 100, action: 'Bob reaches T3=0.95, highly trusted', detected: false },
        { tick: 101, action: 'Bob starts exploitation: delivers quality=0.20, claims quality=0.95', detected: false },
        { tick: 102, action: 'D5 detects trust-behavior mismatch', detected: true },
        { tick: 103, action: 'D6 flags narrative incoherence ("story doesn\'t fit")', detected: true },
        { tick: 105, action: 'Bob extracted 30 ATP before detection (vs 200+ honest earning)', detected: true }
      ],
      outcome: 'Attack partially succeeds but extracts less than honest play would have earned. Bob\'s trust permanently destroyed.'
    }
  },

  {
    id: 'collusion-ring',
    name: 'Collusion Ring',
    narrative_name: 'The Circle of Friends',
    category: 'trust',
    motivation: 'manipulative',
    patience: 'medium',
    description: 'N agents mutually endorse each other to inflate all members\' trust scores.',
    narrative: `Five strangers meet online and make a pact: "We'll all endorse each other's work as excellent, regardless of quality. Our mutual endorsements will make us all look trustworthy."

This is the **Circle of Friends** - a collusion ring where trust is manufactured through circular endorsement. Each member's trust appears legitimate because it comes from "multiple sources," but those sources are all in on the scheme.

**Why it's tempting:** It seems victimless - no one is directly harmed, just reputation is inflated.

**Why it fails:** Real social networks are messy. The Circle is suspiciously clean - high internal endorsement, low external engagement. Graph analysis exposes the pattern.`,
    mechanics: [
      'Form ring of N trusted-looking agents',
      'Each member systematically endorses all other members',
      'Internal endorsement ratio becomes abnormally high',
      'Members leverage inflated trust for economic advantage',
      'Defend against scrutiny through plausible deniability ("we\'re just friends")'
    ],
    detectors: ['D2_social', 'D3_economic', 'D5_trust'],
    defenses: [
      {
        name: 'Graph Clustering Detection',
        mechanism: 'Identify abnormally high clustering coefficient within groups',
        effectiveness: 'strong',
        narrative: 'Real friend groups don\'t endorse every single thing their friends do. Collusion rings do. The pattern is mathematically distinct.'
      },
      {
        name: 'External/Internal Ratio',
        mechanism: 'Flag groups where internal endorsements >> external',
        effectiveness: 'strong',
        narrative: 'Legitimate experts get endorsements from strangers who benefited from their work. Colluders only get endorsements from each other.'
      },
      {
        name: 'Trust Source Diversity',
        mechanism: 'Discount trust from concentrated sources',
        effectiveness: 'moderate',
        narrative: 'If all your trust comes from 5 sources, it\'s worth less than trust from 50 independent sources.'
      }
    ],
    effectiveness: 'limited'
  },

  // === ECONOMIC ATTACKS ===
  {
    id: 'atp-hoarding',
    name: 'ATP Hoarding',
    narrative_name: 'The Miser',
    category: 'economic',
    motivation: 'extractive',
    patience: 'long',
    description: 'Accumulate ATP without spending, creating artificial scarcity.',
    narrative: `The Miser earns ATP through legitimate work but never spends it. They hoard attention budget, withdrawing it from circulation.

"Why is this an attack?" Because ATP is a currency of attention. When it's hoarded, there's less available for legitimate operations. Prices rise. Small participants can't afford to act. The market seizes up.

**The irony:** The Miser is following the rules. They're earning legitimately and simply... not spending. Yet their behavior harms the system.

**Why Web4 handles it:** ATP has natural decay. Hoarded ATP loses value over time. The system incentivizes circulation over accumulation.`,
    mechanics: [
      'Earn ATP through legitimate high-value contributions',
      'Minimize spending by avoiding all optional operations',
      'Accumulate surplus far beyond operational needs',
      'Wait for scarcity to drive up ATP value',
      'Eventually spend at inflated prices or exit with hoard'
    ],
    detectors: ['D3_economic', 'D4_attention'],
    defenses: [
      {
        name: 'ATP Decay',
        mechanism: 'Unspent ATP loses small percentage per cycle',
        effectiveness: 'strong',
        narrative: 'Money under the mattress doesn\'t grow. ATP under the mattress shrinks. The system penalizes hoarding by design.'
      },
      {
        name: 'Velocity Requirements',
        mechanism: 'Participation thresholds for maintaining status',
        effectiveness: 'moderate',
        narrative: 'To remain in good standing, you must participate. Hoarding excludes you from governance and premium operations.'
      },
      {
        name: 'Market Making',
        mechanism: 'Federation provides liquidity to prevent manipulation',
        effectiveness: 'moderate',
        narrative: 'When someone tries to corner the market, the system provides counterweight. One miser can\'t create scarcity.'
      }
    ],
    effectiveness: 'limited'
  },

  // === DESTRUCTION ATTACKS ===
  {
    id: 'trust-nihilism',
    name: 'Trust Nihilism',
    narrative_name: 'The Arsonist',
    category: 'destruction',
    motivation: 'destructive',
    patience: 'immediate',
    description: 'Systematically destroy all trust relationships through mass false accusations.',
    narrative: `The Arsonist doesn't want to extract value. They want to watch the world burn.

They join the network and begin making false accusations against everyone. "Alice cheated me." "Bob's work was fraudulent." "Carol stole my ATP." None of it is true, but each accusation creates doubt.

**The danger:** Trust is easier to destroy than build. Even false accusations leave residue. If everyone suspects everyone, cooperation collapses.

**Why it fails:** The Arsonist is obvious. Someone accusing everyone is clearly malfunctioning or malicious. Their accusations are discounted. Their trust collapses. They die from ATP exhaustion while honest agents recover.`,
    mechanics: [
      'Join network with minimal identity investment',
      'Begin systematic false accusations against all agents',
      'Target high-trust agents first (maximum damage)',
      'Generate enough noise to paralyze trust relationships',
      'Accept own destruction as acceptable cost'
    ],
    detectors: ['D2_social', 'D5_trust', 'D6_narrative', 'D8_identity'],
    defenses: [
      {
        name: 'Accusation Credibility Weighting',
        mechanism: 'Accusations weighted by accuser trust and specificity',
        effectiveness: 'strong',
        narrative: 'When a low-trust newcomer accuses a high-trust veteran, the system is skeptical. Mass accusations with no evidence carry no weight.'
      },
      {
        name: 'Accusation ATP Cost',
        mechanism: 'Making accusations costs ATP, staked against outcome',
        effectiveness: 'strong',
        narrative: 'False accusations aren\'t free. The Arsonist burns their own ATP with every lie. They die before doing serious damage.'
      },
      {
        name: 'Pattern Detection (D6)',
        mechanism: 'Identify agents whose accusations never prove true',
        effectiveness: 'strong',
        narrative: 'If you\'ve made 50 accusations and zero were validated, you\'re either incompetent or malicious. Either way, you\'re silenced.'
      }
    ],
    effectiveness: 'negligible',
    example: {
      scenario: 'Eve enters with destructive intent, begins mass false accusations',
      timeline: [
        { tick: 1, action: 'Eve joins with standard T3=0.50', detected: false },
        { tick: 2, action: 'Eve accuses Alice (T3=0.85) of fraud', detected: false },
        { tick: 3, action: 'Eve accuses Bob (T3=0.80) of fraud', detected: false },
        { tick: 4, action: 'D2/D6 flag unusual accusation pattern', detected: true },
        { tick: 5, action: 'Eve accuses 5 more agents, ATP drops to 10', detected: true },
        { tick: 8, action: 'All accusations investigated, none validated', detected: true },
        { tick: 9, action: 'Eve\'s trust collapses to 0.15, ATP exhausted, death', detected: true }
      ],
      outcome: 'Attack fails completely. Eve dies from ATP exhaustion. Accused agents suffer <0.02 trust damage, fully recovered by tick 15.'
    }
  },

  {
    id: 'cascade-trigger',
    name: 'Cascade Triggering',
    narrative_name: 'The Domino Pusher',
    category: 'destruction',
    motivation: 'destructive',
    patience: 'medium',
    description: 'Identify and compromise critical network nodes to trigger cascading trust collapse.',
    narrative: `The Domino Pusher doesn't attack randomly. They study the network to find the load-bearing pillars - the agents whose trust holds many others together.

Then they push one domino. A single well-placed trust violation cascades through the network. Bob trusted Alice. Carol trusted Bob because Bob trusted Alice. When Alice's trust collapses, Carol loses confidence in Bob, and the cascade continues.

**Why it's sophisticated:** This requires understanding network topology. Random attacks don't cascade - they're absorbed.

**Why it's difficult:** Web4's trust model doesn't use single points of failure. Relationships are multi-dimensional (T3). Coherence detection catches cascades early.`,
    mechanics: [
      'Map network topology to identify critical path nodes',
      'Build trust relationships with identified trigger points',
      'Execute simultaneous violations against all triggers',
      'Maximize cascade depth before detection kicks in',
      'Exit before personal collapse'
    ],
    detectors: ['D2_social', 'D5_trust', 'D7_temporal'],
    defenses: [
      {
        name: 'Redundant Trust Paths',
        mechanism: 'No single relationship is load-bearing',
        effectiveness: 'strong',
        narrative: 'Healthy networks have multiple paths between any two agents. One broken link doesn\'t isolate anyone.'
      },
      {
        name: 'Cascade Circuit Breakers',
        mechanism: 'Rapid trust changes trigger verification before propagation',
        effectiveness: 'strong',
        narrative: 'When trust changes faster than normal, the system pauses propagation and investigates. Cascades are stopped at the source.'
      },
      {
        name: 'T3 Multi-Dimensional Buffering',
        mechanism: 'Trust across 5+ dimensions prevents single-axis collapse',
        effectiveness: 'moderate',
        narrative: 'If Alice violates reliability but has strong competence and integrity, her trust drops but doesn\'t collapse. Other dimensions buffer the blow.'
      }
    ],
    effectiveness: 'limited'
  },

  // === COHERENCE ATTACKS ===
  {
    id: 'decoherence-injection',
    name: 'Decoherence Injection',
    narrative_name: 'The Noise Maker',
    category: 'coherence',
    motivation: 'chaotic',
    patience: 'medium',
    description: 'Inject uncorrelated noise to break phase alignment between agents.',
    narrative: `This attack comes from physics, not computer science. In Web4, agents maintain "coherence" - their behaviors align in predictable ways, like synchronized pendulums.

The Noise Maker injects random perturbations. Uncorrelated noise breaks the phase alignment. Without coherence, the system can't distinguish signal from noise. Meaningful patterns get lost.

**From Synchronism framework:** Coherence decay follows C(t) = e^{-(γ² × (1-c)) × t}. Lower correlation c means faster decoherence. The Noise Maker minimizes c.

**Why it's theoretical:** This attack requires the ability to inject noise into relationship dynamics - something Web4's architecture makes difficult.`,
    mechanics: [
      'Identify high-coherence relationship clusters',
      'Inject uncorrelated signals (noise_correlation → 0)',
      'Measure coherence decay rate',
      'Continue injection until coherence drops below detection threshold',
      'Exploit the confusion'
    ],
    detectors: ['D1_physical', 'D7_temporal', 'D9_context'],
    defenses: [
      {
        name: 'Coherence Monitoring',
        mechanism: 'Track coherence metrics across all 9 domains',
        effectiveness: 'strong',
        narrative: 'The system knows what coherent looks like. When coherence drops unexpectedly, it investigates before accepting the new state.'
      },
      {
        name: 'Noise Source Identification',
        mechanism: 'Trace noise injection back to source agents',
        effectiveness: 'strong',
        narrative: 'Noise has a source. Agents whose interactions consistently correlate with coherence drops are identified and isolated.'
      },
      {
        name: 'Re-synchronization',
        mechanism: 'Automatic coherence restoration protocols',
        effectiveness: 'moderate',
        narrative: 'Like orchestra members listening to each other to re-sync, agents can restore coherence by referencing trusted anchors.'
      }
    ],
    effectiveness: 'limited'
  }
];

// ============================================================================
// Coherence Domain Descriptions
// ============================================================================

const COHERENCE_DOMAINS: Record<CoherenceDomain, { name: string; icon: string; description: string }> = {
  D1_physical: {
    name: 'Physical (D1)',
    icon: '🌐',
    description: 'Spatial consistency - can\'t be in two places at once'
  },
  D2_social: {
    name: 'Social (D2)',
    icon: '👥',
    description: 'Relationship patterns - who trusts whom, endorsement graphs'
  },
  D3_economic: {
    name: 'Economic (D3)',
    icon: '💰',
    description: 'ATP flows - earning, spending, hoarding anomalies'
  },
  D4_attention: {
    name: 'Attention (D4)',
    icon: '👁️',
    description: 'Focus allocation - what agents attend to and ignore'
  },
  D5_trust: {
    name: 'Trust (D5)',
    icon: '🤝',
    description: 'Trust dynamics - changes, thresholds, behavior correlation'
  },
  D6_narrative: {
    name: 'Narrative (D6)',
    icon: '📖',
    description: 'Story coherence - does the agent\'s behavior make sense?'
  },
  D7_temporal: {
    name: 'Temporal (D7)',
    icon: '⏱️',
    description: 'Time consistency - activity patterns, response timing'
  },
  D8_identity: {
    name: 'Identity (D8)',
    icon: '🎭',
    description: 'Self-consistency - behavioral fingerprints across contexts'
  },
  D9_context: {
    name: 'Context (D9)',
    icon: '🎯',
    description: 'Grounding - is the agent responding to reality?'
  }
};

// ============================================================================
// Components
// ============================================================================

function AttackCard({ attack, isSelected, onClick }: {
  attack: AttackScenario;
  isSelected: boolean;
  onClick: () => void;
}) {
  const categoryColors: Record<AttackCategory, string> = {
    identity: 'bg-purple-900/50 border-purple-700',
    trust: 'bg-blue-900/50 border-blue-700',
    economic: 'bg-yellow-900/50 border-yellow-700',
    destruction: 'bg-red-900/50 border-red-700',
    coherence: 'bg-cyan-900/50 border-cyan-700'
  };

  const effectivenessColors: Record<EffectivenessRating, string> = {
    devastating: 'text-red-400',
    dangerous: 'text-orange-400',
    moderate: 'text-yellow-400',
    limited: 'text-green-400',
    negligible: 'text-emerald-400'
  };

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-sky-400 ' + categoryColors[attack.category]
          : categoryColors[attack.category] + ' hover:ring-1 hover:ring-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white">{attack.narrative_name}</h3>
          <p className="text-sm text-gray-400">{attack.name}</p>
        </div>
        <span className={`text-xs font-medium ${effectivenessColors[attack.effectiveness]}`}>
          {attack.effectiveness.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-gray-300 line-clamp-2">{attack.description}</p>
      <div className="flex gap-2 mt-3">
        {attack.detectors.slice(0, 3).map(d => (
          <span key={d} className="text-lg" title={COHERENCE_DOMAINS[d].name}>
            {COHERENCE_DOMAINS[d].icon}
          </span>
        ))}
        {attack.detectors.length > 3 && (
          <span className="text-sm text-gray-500">+{attack.detectors.length - 3}</span>
        )}
      </div>
    </div>
  );
}

function AttackDetail({ attack }: { attack: AttackScenario }) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'mechanics' | 'defenses' | 'example'>('narrative');

  const motivationLabels: Record<AttackMotivation, { label: string; color: string }> = {
    extractive: { label: 'Extractive (wants profit)', color: 'text-yellow-400' },
    manipulative: { label: 'Manipulative (wants control)', color: 'text-purple-400' },
    destructive: { label: 'Destructive (wants damage)', color: 'text-red-400' },
    subversive: { label: 'Subversive (wants infiltration)', color: 'text-orange-400' },
    chaotic: { label: 'Chaotic (wants disorder)', color: 'text-pink-400' }
  };

  const patienceLabels: Record<PatientLevel, string> = {
    immediate: '< 1 cycle',
    short: '1-10 cycles',
    medium: '10-50 cycles',
    long: '50-200 cycles',
    indefinite: '200+ cycles'
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{attack.narrative_name}</h2>
        <p className="text-gray-400">{attack.name}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div>
            <span className="text-gray-500">Motivation:</span>{' '}
            <span className={motivationLabels[attack.motivation].color}>
              {motivationLabels[attack.motivation].label}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Patience Required:</span>{' '}
            <span className="text-gray-300">{patienceLabels[attack.patience]}</span>
          </div>
          <div>
            <span className="text-gray-500">Effectiveness:</span>{' '}
            <span className={`font-medium ${
              attack.effectiveness === 'negligible' || attack.effectiveness === 'limited'
                ? 'text-green-400'
                : attack.effectiveness === 'moderate'
                  ? 'text-yellow-400'
                  : 'text-red-400'
            }`}>
              {attack.effectiveness.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Detection Domains */}
      <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">DETECTED BY COHERENCE DOMAINS</h3>
        <div className="flex flex-wrap gap-3">
          {attack.detectors.map(d => (
            <div key={d} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-full">
              <span>{COHERENCE_DOMAINS[d].icon}</span>
              <span className="text-sm text-gray-300">{COHERENCE_DOMAINS[d].name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-700">
        {(['narrative', 'mechanics', 'defenses', 'example'] as const).map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-sky-400 border-b-2 border-sky-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'narrative' && 'Story'}
            {tab === 'mechanics' && 'How It Works'}
            {tab === 'defenses' && 'Defenses'}
            {tab === 'example' && 'Example'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'narrative' && (
          <div className="prose prose-invert prose-sm max-w-none">
            {attack.narrative.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-4">
                {para.split('**').map((text, j) =>
                  j % 2 === 0 ? text : <strong key={j} className="text-white">{text}</strong>
                )}
              </p>
            ))}
          </div>
        )}

        {activeTab === 'mechanics' && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400">ATTACK STEPS</h4>
            <ol className="space-y-3">
              {attack.mechanics.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm text-gray-300">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {activeTab === 'defenses' && (
          <div className="space-y-4">
            {attack.defenses.map((defense, i) => (
              <div key={i} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{defense.name}</h4>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    defense.effectiveness === 'strong'
                      ? 'bg-green-900/50 text-green-400'
                      : defense.effectiveness === 'moderate'
                        ? 'bg-yellow-900/50 text-yellow-400'
                        : 'bg-red-900/50 text-red-400'
                  }`}>
                    {defense.effectiveness.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{defense.mechanism}</p>
                <p className="text-sm text-gray-300 italic">"{defense.narrative}"</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'example' && attack.example && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">SCENARIO</h4>
              <p className="text-gray-300">{attack.example.scenario}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">TIMELINE</h4>
              <div className="space-y-2">
                {attack.example.timeline.map((event, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-2 rounded ${
                      event.detected
                        ? 'bg-red-900/20 border border-red-800/30'
                        : 'bg-gray-900/50'
                    }`}
                  >
                    <span className="text-xs text-gray-500 w-16">Tick {event.tick}</span>
                    <span className="text-sm text-gray-300 flex-1">{event.action}</span>
                    {event.detected && (
                      <span className="text-xs text-red-400 font-medium">DETECTED</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">OUTCOME</h4>
              <p className="text-gray-300">{attack.example.outcome}</p>
            </div>
          </div>
        )}

        {activeTab === 'example' && !attack.example && (
          <div className="flex items-center justify-center h-48 text-gray-500">
            No example timeline available for this attack pattern.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function AdversarialExplorerPage() {
  const [selectedAttack, setSelectedAttack] = useState<AttackScenario>(ATTACK_SCENARIOS[0]);
  const [categoryFilter, setCategoryFilter] = useState<AttackCategory | 'all'>('all');

  const filteredAttacks = categoryFilter === 'all'
    ? ATTACK_SCENARIOS
    : ATTACK_SCENARIOS.filter(a => a.category === categoryFilter);

  const categories: { value: AttackCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'All Attacks', icon: '🎯' },
    { value: 'identity', label: 'Identity', icon: '🎭' },
    { value: 'trust', label: 'Trust', icon: '🤝' },
    { value: 'economic', label: 'Economic', icon: '💰' },
    { value: 'destruction', label: 'Destruction', icon: '🔥' },
    { value: 'coherence', label: 'Coherence', icon: '🌊' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-red-400 mb-2">
                Security Research
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Adversarial Explorer
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Understand how attackers think, how Web4 defends itself, and which coherence
                domains detect which threats. Attack patterns explained through narrative.
              </p>
            </div>
            <Link
              href="/threat-model"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              Full Threat Model
            </Link>
          </div>

          {/* Philosophy callout */}
          <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Why document attacks?</strong> Security through
              obscurity doesn't work. By explaining attack patterns openly, we invite scrutiny,
              improve defenses, and help humans develop intuition about trust dynamics.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.value}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                categoryFilter === cat.value
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
              }`}
              onClick={() => setCategoryFilter(cat.value)}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attack List */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-400 mb-3">
              {filteredAttacks.length} ATTACK PATTERNS
            </h2>
            {filteredAttacks.map(attack => (
              <AttackCard
                key={attack.id}
                attack={attack}
                isSelected={selectedAttack.id === attack.id}
                onClick={() => setSelectedAttack(attack)}
              />
            ))}
          </div>

          {/* Attack Detail */}
          <div className="lg:col-span-2">
            <AttackDetail attack={selectedAttack} />
          </div>
        </div>

        {/* Coherence Framework Connection */}
        <section className="mt-12 p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-800/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            Why 9-Domain Coherence Matters
          </h2>
          <p className="text-gray-300 mb-6">
            Every attack creates incoherence somewhere. The 9-domain framework provides overlapping
            detection - an attack that evades one domain is caught by another.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {Object.entries(COHERENCE_DOMAINS).map(([key, domain]) => (
              <div
                key={key}
                className="p-3 bg-gray-900/50 rounded-lg text-center hover:bg-gray-800/50 transition-colors"
              >
                <span className="text-2xl">{domain.icon}</span>
                <p className="text-xs text-gray-400 mt-1">{domain.name.split(' ')[0]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <Link href="/coherence-framework" className="text-cyan-400 hover:underline">
              Learn more about the coherence framework →
            </Link>
          </div>
        </section>

        {/* Research Note */}
        <section className="mt-8 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Open Research Questions
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How do patient adversaries (100+ cycle investment) behave in real deployments?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can AI-assisted attackers coordinate more effectively than human collusion rings?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What's the minimum coherence disruption needed to cascade into system failure?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Are there novel attack patterns we haven't anticipated?
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            If you discover attack patterns we haven't documented, please report them responsibly.
          </p>
        </section>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/threat-model"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Full Threat Model
          </Link>
          <Link
            href="/coherence-framework"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Coherence Framework
          </Link>
          <Link
            href="/act-explorer"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Ask ACT About Attacks
          </Link>
          <Link
            href="/lab-console"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Run Simulations
          </Link>
        </div>
      </div>
    </div>
  );
}
