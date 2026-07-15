/** @type {import('next').NextConfig} */

// Routes retired in the 2026-07 onramp rebuild map to their nearest surviving
// page so old links (and the visitor QA's memory of the site) never 404. The
// full prior site lives on branch archive/v1-2026-07 (tag v1-archive-2026-07-15).
const retiredTo = {
  '/identity-constellation': [
    '/identity-anchoring', '/multi-session-identity', '/identity-confabulation', '/ai-identity',
  ],
  '/why-web4': [
    '/ai-agents', '/understanding-consciousness', '/consciousness-layers', '/modal-awareness',
    '/meta-cognition-feedback',
  ],
  '/the-standard': [
    '/learning-salience', '/training-data-insights', '/sleep-consolidation', '/circadian-ai',
    '/decision-evolution', '/context-dependent-behavior', '/facultative-behavior',
    '/conversational-context', '/confabulation-patterns', '/honest-reporting', '/context-experiment',
    '/exploration-not-evaluation', '/capacity-baseline', '/purpose-integration', '/ai-learning',
  ],
  '/what-could-go-wrong': [
    '/adversarial-explorer', '/threat-model', '/challenge-set', '/trust-dilemma', '/trust-dilemmas',
    '/capacity-thresholds', '/trajectory-analysis', '/ai-trust-limits',
  ],
  '/hub': ['/society-simulator'],
  '/karma-consequences': ['/karma-journey', '/aliveness'],
  '/trust-tensor': ['/trust-tensor-explorer', '/trust-networks'],
  '/trust-neighborhood': ['/mrh-explorer'],
  '/onramp': ['/federation-economics'],
  '/running-now': [
    '/playground', '/simulation-sandbox', '/lab-console', '/first-simulation', '/data-explorer',
    '/compare', '/feedback-loop-explorer', '/moments', '/trust-timeline', '/trajectory-explorer',
    '/narratives',
  ],
  '/learn': [
    '/explore-guide', '/starter-kit', '/concepts-to-tools', '/research-hub', '/act-explorer',
    '/patterns', '/pattern-library', '/behavioral-repertoire', '/prompt-framing-lab',
    '/scaffolding-lab', '/achievements',
  ],
};

// Long-standing alias redirects that still point at surviving pages.
const aliasTo = {
  '/day-in-web4': ['/a-day-in-web4'],
  '/trust-neighborhood': ['/mrh', '/markov-relevancy-horizon'],
  '/learn': ['/learning-journey'],
};

function buildRedirects() {
  const out = [];
  for (const map of [retiredTo, aliasTo]) {
    for (const [destination, sources] of Object.entries(map)) {
      for (const source of sources) {
        out.push({ source, destination, permanent: true });
      }
    }
  }
  return out;
}

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return buildRedirects();
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
