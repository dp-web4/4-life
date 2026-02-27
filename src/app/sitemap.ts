import { MetadataRoute } from "next";

const BASE_URL = "https://4-life-ivory.vercel.app";

// Priority tiers for sitemap
const HIGH_PRIORITY = 1.0;
const MEDIUM_PRIORITY = 0.7;
const LOW_PRIORITY = 0.4;

// Pages organized by importance for search engines
const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  // Homepage
  { path: "/", priority: HIGH_PRIORITY, changeFrequency: "weekly" },

  // Entry points & onboarding (high priority — visitor journey starts here)
  { path: "/first-contact", priority: HIGH_PRIORITY, changeFrequency: "monthly" },
  { path: "/why-web4", priority: HIGH_PRIORITY, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: HIGH_PRIORITY, changeFrequency: "monthly" },
  { path: "/tldr", priority: HIGH_PRIORITY, changeFrequency: "monthly" },
  { path: "/explore-guide", priority: 0.9, changeFrequency: "monthly" },
  { path: "/learn", priority: 0.9, changeFrequency: "monthly" },
  { path: "/day-in-web4", priority: 0.8, changeFrequency: "monthly" },
  { path: "/your-internet", priority: 0.8, changeFrequency: "monthly" },
  { path: "/what-could-go-wrong", priority: 0.8, changeFrequency: "monthly" },
  { path: "/first-simulation", priority: 0.8, changeFrequency: "monthly" },

  // Core concept pages (learning sequence)
  { path: "/lct-explainer", priority: 0.9, changeFrequency: "monthly" },
  { path: "/atp-economics", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trust-tensor", priority: 0.9, changeFrequency: "monthly" },
  { path: "/coherence-index", priority: 0.9, changeFrequency: "monthly" },
  { path: "/aliveness", priority: 0.9, changeFrequency: "monthly" },

  // Interactive tools (high value — unique content)
  { path: "/society-simulator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/karma-journey", priority: 0.9, changeFrequency: "monthly" },
  { path: "/playground", priority: 0.8, changeFrequency: "monthly" },
  { path: "/trust-networks", priority: 0.8, changeFrequency: "monthly" },
  { path: "/simulation-sandbox", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/adversarial-explorer", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/lab-console", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },

  // Reference & research pages
  { path: "/manifest", priority: 0.8, changeFrequency: "monthly" },
  { path: "/glossary", priority: 0.8, changeFrequency: "monthly" },
  { path: "/threat-model", priority: 0.8, changeFrequency: "monthly" },
  { path: "/challenge-set", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/web4-explainer", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/federation-economics", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/markov-relevancy-horizon", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/karma-consequences", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/patterns", priority: MEDIUM_PRIORITY, changeFrequency: "monthly" },
  { path: "/achievements", priority: 0.6, changeFrequency: "monthly" },
  { path: "/narratives", priority: 0.6, changeFrequency: "monthly" },
  { path: "/research-hub", priority: 0.6, changeFrequency: "monthly" },

  // Intermediate exploration pages
  { path: "/identity-constellation", priority: 0.5, changeFrequency: "monthly" },
  { path: "/multi-session-identity", priority: 0.5, changeFrequency: "monthly" },
  { path: "/decision-evolution", priority: 0.5, changeFrequency: "monthly" },
  { path: "/coherence-framework", priority: 0.5, changeFrequency: "monthly" },
  { path: "/starter-kit", priority: 0.5, changeFrequency: "monthly" },
  { path: "/moments", priority: 0.5, changeFrequency: "monthly" },

  // Research deep-dives (lower priority — specialized content)
  { path: "/capacity-thresholds", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/consciousness-layers", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/honest-reporting", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/purpose-integration", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/identity-anchoring", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/meta-cognition-feedback", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/context-dependent-behavior", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/facultative-behavior", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/act-explorer", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/behavioral-repertoire", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/concepts-to-tools", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/data-explorer", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/compare", priority: LOW_PRIORITY, changeFrequency: "monthly" },

  // Deep research (lowest priority)
  { path: "/understanding-consciousness", priority: 0.3, changeFrequency: "monthly" },
  { path: "/training-data-insights", priority: 0.3, changeFrequency: "monthly" },
  { path: "/sleep-consolidation", priority: 0.3, changeFrequency: "monthly" },
  { path: "/circadian-ai", priority: 0.3, changeFrequency: "monthly" },
  { path: "/learning-salience", priority: 0.3, changeFrequency: "monthly" },
  { path: "/exploration-not-evaluation", priority: 0.3, changeFrequency: "monthly" },
  { path: "/identity-confabulation", priority: 0.3, changeFrequency: "monthly" },
  { path: "/confabulation-patterns", priority: 0.3, changeFrequency: "monthly" },
  { path: "/context-experiment", priority: 0.3, changeFrequency: "monthly" },
  { path: "/modal-awareness", priority: 0.3, changeFrequency: "monthly" },
  { path: "/trajectory-analysis", priority: 0.3, changeFrequency: "monthly" },
  { path: "/capacity-baseline", priority: 0.3, changeFrequency: "monthly" },

  // Tool/explorer pages
  { path: "/trust-tensor-explorer", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/mrh-explorer", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/trust-timeline", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/trajectory-explorer", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/feedback-loop-explorer", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/pattern-library", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/prompt-framing-lab", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/scaffolding-lab", priority: LOW_PRIORITY, changeFrequency: "monthly" },
  { path: "/conversational-context", priority: LOW_PRIORITY, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
