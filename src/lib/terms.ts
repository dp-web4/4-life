/**
 * Canonical Web4 Terminology Definitions
 *
 * These definitions align with the web4 glossary:
 * https://github.com/dp-web4/web4/blob/main/whitepaper/sections/02-glossary/index.md
 *
 * Used by the TermTooltip component for inline definitions.
 * Educational simplifications are noted where they differ from canonical definitions.
 */

export interface TermDefinition {
  /** The term/acronym */
  term: string;
  /** Full name/expansion */
  fullName: string;
  /** Brief plain-English definition (1-2 sentences) */
  brief: string;
  /** Longer educational explanation */
  explanation?: string;
  /** Link to deeper content */
  learnMore?: string;
  /** Link to canonical specification */
  canonicalSpec?: string;
  /** Note if educational definition differs from canonical */
  educationalNote?: string;
}

export const terms: Record<string, TermDefinition> = {
  // Core Presence
  LCT: {
    term: "LCT",
    fullName: "Linked Context Token",
    brief: "Your hardware-bound proof of verifiable presence in Web4.",
    explanation:
      "An LCT is bound to physical devices (TPM, Secure Enclave, FIDO2 keys) and witnessed by other entities, creating verifiable proof of your presence. Unlike passwords (knowledge) or wallet keys (possession), LCTs prove what hardware and witnesses can verify.",
    learnMore: "/lct-explainer",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/LCT-linked-context-token.md",
  },

  // Economics
  ATP: {
    term: "ATP",
    fullName: "Allocation Transfer Packet",
    brief: "Metabolic budget for actions. Spend to act, earn by contributing value.",
    explanation:
      "Every action in Web4 costs ATP. Post a message? Costs ATP. Vote? Costs ATP. High-quality contributions earn ATP back from the community. Run out of ATP? You can't act. This makes spam economically self-defeating—spammers burn resources faster than they earn them.",
    learnMore: "/atp-economics",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/atp-adp-cycle.md",
  },

  ADP: {
    term: "ADP",
    fullName: "Allocation Discharge Packet",
    brief: "The spent record when ATP is used—proves how resources were allocated.",
    explanation:
      "When you spend ATP, an ADP is created recording what action was taken, how much was spent, and what value was created. ADPs are audited and then discharged, creating a complete metabolic history that determines trust scores and karma.",
    learnMore: "/atp-economics",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/atp-adp-cycle.md",
  },

  // Trust
  T3: {
    term: "T3",
    fullName: "Trust Tensor",
    brief: "Multi-dimensional trust scores (not just one number).",
    explanation:
      "Instead of 'trust = 7/10', T3 tracks separate dimensions: Talent (capability), Training (experience), and Temperament (behavioral consistency). This makes gaming harder—you can't just optimize one metric. You trust a surgeon's skill but maybe not their punctuality; T3 captures that nuance.",
    learnMore: "/trust-tensor",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/t3-v3-tensors.md",
    educationalNote:
      "T3 dimensions are always role-specific. Trust as a surgeon is independent of trust as a mechanic.",
  },

  V3: {
    term: "V3",
    fullName: "Value Tensor",
    brief: "Multi-dimensional value scores for contributions.",
    explanation:
      "Like T3 but for value created, not trustworthiness. A 3D tensor measuring Valuation (perceived worth), Veracity (accuracy), and Validity (confirmed delivery). Used to price ATP costs for tasks and measure contribution quality.",
    learnMore: "/glossary",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/t3-v3-tensors.md",
  },

  // Context Boundaries
  MRH: {
    term: "MRH",
    fullName: "Markov Relevancy Horizon",
    brief: "The boundary of what you can see, based on trust relationships.",
    explanation:
      "Your MRH is defined by trust relationships—you see entities you trust and entities they trust (transitively). This limits spam blast radius (spammers can't reach you if they're not in your trust network) and preserves privacy. Like email filters, but for entire entities.",
    learnMore: "/markov-relevancy-horizon",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/mrh-tensors.md",
  },

  // Coherence
  CI: {
    term: "CI",
    fullName: "Coherence Index",
    brief: "Measure of behavioral consistency across time, space, and relationships.",
    explanation:
      "Can you claim to be in two places at once? Did your skills suddenly jump impossibly? Do your relationships make sense? Incoherent behavior reduces trust. Physical constraints provide fraud detection—teleporting is suspicious.",
    learnMore: "/coherence-index",
  },

  // Action Framework
  R6: {
    term: "R6",
    fullName: "Rules/Role/Request/Reference/Resource/Result",
    brief: "The structured framework for describing any action in Web4.",
    explanation:
      "Every action follows R6: what rules apply, what role you're in, what you're requesting, what references you provide, what resources you need, and what result you produce. Ensures actions are auditable and trust-scored consistently.",
    canonicalSpec:
      "https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/r6-framework.md",
    educationalNote:
      "R7 adds a seventh element (Reputation) in newer specifications.",
  },

  // Agent Mechanics
  EP: {
    term: "EP",
    fullName: "Epistemic Proprioception",
    brief: "Self-awareness of what you know and don't know.",
    explanation:
      "Knowing what you know and don't know. Agents that recognize patterns (epistemic proprioception) survive better than those who don't. In Web4 simulations, agents use EP to learn: 'High-value contributions earn more ATP' or 'Transparency rebuilds trust faster.'",
    learnMore: "/patterns",
  },

  // Web4 Itself
  Web4: {
    term: "Web4",
    fullName: "Trust-Native Internet",
    brief: "Internet infrastructure where trust, identity, and value flow from verifiable behavior.",
    explanation:
      "Unlike Web2 (platforms own your data/identity) or Web3 (blockchain-first), Web4 proposes that trust emerges from measurable actions and verifiable presence rooted in hardware. It's a working label for a different architectural philosophy.",
    learnMore: "/why-web4",
  },

  // Karma
  Karma: {
    term: "Karma",
    fullName: "Cross-Life Consequences",
    brief: "Your history follows you across 'lives' (restarts, rebirths, new contexts).",
    explanation:
      "In Web4, consequences persist. Positive karma means more ATP and faster trust recovery when you restart. Negative karma means handicapped resources and slower rebuilding. You can't escape history by 'starting fresh'—hardware-bound identity prevents that.",
    learnMore: "/karma-consequences",
  },

  // Society
  Society: {
    term: "Society",
    fullName: "Web4 Society",
    brief: "A collection of entities with shared rules and trust thresholds.",
    explanation:
      "Societies can be your personal device (home society), a community of peers, or planet-scale networks. Each sets its own trust thresholds. The same architecture works at every scale (fractal design). Ejection from one society doesn't prevent participation in others.",
    learnMore: "/glossary",
  },
};

/**
 * Get a term definition by its key (case-insensitive)
 */
export function getTerm(key: string): TermDefinition | undefined {
  // Try exact match first
  if (terms[key]) return terms[key];
  // Try uppercase
  if (terms[key.toUpperCase()]) return terms[key.toUpperCase()];
  // Try finding by term field
  return Object.values(terms).find(
    (t) => t.term.toLowerCase() === key.toLowerCase()
  );
}

/**
 * Get all term keys
 */
export function getAllTermKeys(): string[] {
  return Object.keys(terms);
}
