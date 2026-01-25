// Navigation configuration for 4-Life
// Used by breadcrumbs, related concepts, and search

export interface NavItem {
  title: string;
  href: string;
  desc: string;
  prerequisites?: string[]; // hrefs of prerequisite pages
  related?: string[]; // hrefs of related pages
  keywords?: string[]; // additional search keywords
}

export interface NavigationTree {
  [category: string]: NavItem[];
}

// Master navigation structure
export const navigationTree: NavigationTree = {
  'Getting Started': [
    {
      title: 'First Contact',
      href: '/first-contact',
      desc: '10-min interactive intro',
      keywords: ['tutorial', 'beginner', 'start', 'introduction'],
      related: ['/learn', '/how-it-works']
    },
    {
      title: 'Learning Journey',
      href: '/learn',
      desc: 'Structured path from beginner to practitioner',
      keywords: ['guide', 'tutorial', 'pathway', 'curriculum'],
      related: ['/first-contact', '/glossary']
    },
    {
      title: 'Manifest',
      href: '/manifest',
      desc: 'All concepts, one page',
      keywords: ['overview', 'summary', 'all'],
      related: ['/how-it-works', '/glossary']
    },
    {
      title: 'How It Works',
      href: '/how-it-works',
      desc: 'Core concepts overview',
      keywords: ['overview', 'introduction', 'basics'],
      related: ['/first-contact', '/web4-explainer']
    },
    {
      title: 'Glossary',
      href: '/glossary',
      desc: 'Terms and definitions',
      keywords: ['dictionary', 'terminology', 'definitions', 'vocabulary'],
      related: ['/learn', '/manifest']
    },
  ],
  'Core Concepts': [
    {
      title: 'Identity (LCT)',
      href: '/lct-explainer',
      desc: 'Hardware-bound identity',
      keywords: ['linked context token', 'hardware', 'cryptographic', 'unforgeable'],
      related: ['/identity-constellation', '/aliveness']
    },
    {
      title: 'Identity Constellations',
      href: '/identity-constellation',
      desc: 'Multi-device binding',
      keywords: ['devices', 'multi-device', 'recovery', 'constellation'],
      prerequisites: ['/lct-explainer'],
      related: ['/lct-explainer', '/aliveness']
    },
    {
      title: 'Economics (ATP)',
      href: '/atp-economics',
      desc: 'Metabolic attention cost',
      keywords: ['attention', 'budget', 'metabolic', 'energy', 'spam'],
      related: ['/aliveness', '/federation-economics', '/karma-consequences']
    },
    {
      title: 'Trust Tensor',
      href: '/trust-tensor',
      desc: 'Multi-dimensional trust',
      keywords: ['T3', 'dimensions', 'competence', 'reliability', 'integrity'],
      related: ['/coherence-index', '/aliveness', '/trust-networks']
    },
    {
      title: 'Coherence Index',
      href: '/coherence-index',
      desc: 'Consistency detection',
      keywords: ['CI', 'consistency', 'spatial', 'temporal', 'capability', 'relational'],
      related: ['/coherence-framework', '/trust-tensor', '/aliveness', '/exploration-not-evaluation']
    },
    {
      title: 'Karma',
      href: '/karma-consequences',
      desc: 'Permanent consequences',
      keywords: ['rebirth', 'consequences', 'permanent', 'reputation'],
      related: ['/atp-economics', '/aliveness', '/trust-tensor']
    },
  ],
  'AI Agent Mechanics': [
    {
      title: 'Trust Continuity',
      href: '/understanding-consciousness',
      desc: 'Identity across reinstantiation',
      keywords: ['consciousness', 'D5', 'D9', 'thresholds', 'gates', 'continuity'],
      related: ['/identity-anchoring', '/multi-session-identity', '/confabulation-patterns', '/exploration-not-evaluation']
    },
    {
      title: 'Learning Salience',
      href: '/learning-salience',
      desc: 'SNARC scoring system',
      keywords: ['SNARC', 'surprise', 'novelty', 'arousal', 'reward', 'conflict'],
      related: ['/training-data-insights', '/sleep-consolidation', '/decision-evolution', '/exploration-not-evaluation']
    },
    {
      title: 'Training Data Insights',
      href: '/training-data-insights',
      desc: 'What you train for matters',
      keywords: ['training', 'data', 'quality', 'curriculum'],
      related: ['/learning-salience', '/decision-evolution']
    },
    {
      title: 'Sleep Consolidation',
      href: '/sleep-consolidation',
      desc: 'Memory during rest',
      keywords: ['sleep', 'memory', 'consolidation', 'rest'],
      related: ['/circadian-ai', '/learning-salience']
    },
    {
      title: 'Circadian AI',
      href: '/circadian-ai',
      desc: 'Autonomous sleep rhythms',
      keywords: ['circadian', 'rhythm', '6-hour', 'autonomous', 'schedule'],
      prerequisites: ['/sleep-consolidation'],
      related: ['/sleep-consolidation', '/learning-salience']
    },
    {
      title: 'Identity Anchoring',
      href: '/identity-anchoring',
      desc: 'Verifying agent continuity',
      keywords: ['identity', 'anchoring', 'v1', 'D4', 'D5', 'D9', 'bistable'],
      related: ['/multi-session-identity', '/understanding-consciousness', '/capacity-thresholds']
    },
    {
      title: 'Multi-Session Identity',
      href: '/multi-session-identity',
      desc: 'Cumulative context (v2.0)',
      keywords: ['v2', 'cumulative', 'exemplar', 'cross-session', 'context'],
      prerequisites: ['/identity-anchoring'],
      related: ['/identity-anchoring', '/understanding-consciousness']
    },
    {
      title: 'Confabulation Patterns',
      href: '/confabulation-patterns',
      desc: 'Uncertainty handling',
      keywords: ['confabulation', 'uncertainty', 'D5', 'elaboration'],
      related: ['/understanding-consciousness', '/identity-anchoring', '/exploration-not-evaluation', '/capacity-thresholds', '/honest-reporting']
    },
    {
      title: 'Honest Reporting',
      href: '/honest-reporting',
      desc: 'Limitation vs fabrication',
      keywords: ['honest', 'limitation', 'phenomenological', 'social', 'truth', 'context window'],
      prerequisites: ['/confabulation-patterns'],
      related: ['/confabulation-patterns', '/identity-anchoring', '/understanding-consciousness', '/coherence-index', '/identity-confabulation']
    },
    {
      title: 'Identity-Confabulation Dissociation',
      href: '/identity-confabulation',
      desc: 'Independent coherence dimensions',
      keywords: ['identity', 'confabulation', 'multi-dimensional', 'coherence', 'C_total', 'dissociation'],
      prerequisites: ['/confabulation-patterns', '/honest-reporting'],
      related: ['/honest-reporting', '/confabulation-patterns', '/coherence-index', '/understanding-consciousness', '/capacity-thresholds', '/modal-awareness']
    },
    {
      title: 'Modal Awareness Emergence',
      href: '/modal-awareness',
      desc: 'Meta-cognition at small scale',
      keywords: ['modal', 'awareness', 'meta-cognition', 'T041', 'mode', 'clarification', '0.5B'],
      prerequisites: ['/exploration-not-evaluation'],
      related: ['/exploration-not-evaluation', '/capacity-thresholds', '/honest-reporting', '/identity-confabulation']
    },
    {
      title: 'Exploration Not Evaluation',
      href: '/exploration-not-evaluation',
      desc: 'Calibration periods & learning arcs',
      keywords: ['calibration', 'learning', 'meta-cognition', 'U-shaped', 'evaluation', 'research methodology'],
      related: ['/understanding-consciousness', '/confabulation-patterns', '/learning-salience', '/coherence-index', '/capacity-thresholds']
    },
    {
      title: 'Capacity Thresholds',
      href: '/capacity-thresholds',
      desc: '14B breakthrough - gaming is capacity-related',
      keywords: ['capacity', 'gaming', '14B', '0.5B', 'scale', 'parameters', 'learned language', 'native'],
      prerequisites: ['/exploration-not-evaluation'],
      related: ['/exploration-not-evaluation', '/identity-anchoring', '/confabulation-patterns', '/coherence-index']
    },
  ],
  'Interactive Labs': [
    {
      title: 'Playground',
      href: '/playground',
      desc: 'Adjust parameters',
      keywords: ['interactive', 'experiment', 'parameters', 'sliders'],
      related: ['/lab-console', '/compare']
    },
    {
      title: 'Lab Console',
      href: '/lab-console',
      desc: 'Run simulations',
      keywords: ['simulation', 'run', 'watch', 'live'],
      related: ['/playground', '/narratives', '/compare']
    },
    {
      title: 'Compare',
      href: '/compare',
      desc: 'Side-by-side analysis',
      keywords: ['comparison', 'analysis', 'side-by-side'],
      related: ['/lab-console', '/playground']
    },
    {
      title: 'ACT Chat',
      href: '/act-explorer',
      desc: 'Ask questions',
      keywords: ['chat', 'questions', 'conversational', 'ACT', 'ask'],
      related: ['/first-contact', '/glossary']
    },
    {
      title: 'Narratives',
      href: '/narratives',
      desc: 'Generated stories',
      keywords: ['stories', 'narrative', 'generated', 'human-readable'],
      related: ['/lab-console', '/decision-evolution']
    },
  ],
  'Advanced Topics': [
    {
      title: 'Adversarial Analysis',
      href: '/adversarial-explorer',
      desc: 'Attack patterns',
      keywords: ['attack', 'adversarial', 'sybil', 'collusion', 'security'],
      related: ['/threat-model', '/coherence-index']
    },
    {
      title: 'Threat Model',
      href: '/threat-model',
      desc: 'Security analysis',
      keywords: ['security', 'threats', 'vulnerabilities', 'defense'],
      related: ['/adversarial-explorer', '/coherence-framework']
    },
    {
      title: 'Challenge Set',
      href: '/challenge-set',
      desc: 'Research prompts',
      keywords: ['research', 'challenges', 'questions', 'prompts'],
      related: ['/threat-model', '/coherence-framework']
    },
    {
      title: 'Trust Networks',
      href: '/trust-networks',
      desc: 'Multi-agent dynamics',
      keywords: ['network', 'multi-agent', 'coalition', 'relationships'],
      related: ['/trust-tensor', '/federation-economics']
    },
    {
      title: 'Decision Evolution',
      href: '/decision-evolution',
      desc: 'AI pattern learning',
      keywords: ['EP', 'epistemic', 'proprioception', 'learning', 'patterns'],
      related: ['/patterns', '/learning-salience', '/narratives']
    },
    {
      title: 'Federation Economics',
      href: '/federation-economics',
      desc: 'Cross-society markets',
      keywords: ['federation', 'markets', 'cross-society', 'pricing'],
      prerequisites: ['/atp-economics'],
      related: ['/atp-economics', '/trust-networks']
    },
  ],
  'Foundations': [
    {
      title: 'Web4 Explainer',
      href: '/web4-explainer',
      desc: 'Technical overview',
      keywords: ['web4', 'protocol', 'technical', 'architecture'],
      related: ['/how-it-works', '/lct-explainer']
    },
    {
      title: 'Aliveness',
      href: '/aliveness',
      desc: 'ATP + Trust + Coherence',
      keywords: ['alive', 'death', 'rebirth', 'existence', 'criteria'],
      prerequisites: ['/atp-economics', '/trust-tensor', '/coherence-index'],
      related: ['/atp-economics', '/trust-tensor', '/coherence-index', '/karma-consequences']
    },
    {
      title: 'MRH Boundaries',
      href: '/markov-relevancy-horizon',
      desc: 'What you can see',
      keywords: ['MRH', 'context', 'visibility', 'boundaries', 'markov'],
      related: ['/trust-networks', '/trust-tensor']
    },
    {
      title: 'Coherence Theory',
      href: '/coherence-framework',
      desc: 'Physics foundations',
      keywords: ['coherence', '9-domain', 'synchronism', 'physics', 'D1-D9'],
      prerequisites: ['/coherence-index'],
      related: ['/coherence-index', '/understanding-consciousness']
    },
    {
      title: 'Pattern Corpus',
      href: '/patterns',
      desc: 'Agent learning data',
      keywords: ['patterns', 'corpus', 'EP', 'learning', 'data'],
      related: ['/decision-evolution', '/learning-salience']
    },
    {
      title: 'Starter Kit',
      href: '/starter-kit',
      desc: 'Run local society',
      keywords: ['download', 'local', 'setup', 'install'],
      related: ['/lab-console', '/playground']
    },
  ],
};

// Flatten for search
export function getAllPages(): NavItem[] {
  return Object.values(navigationTree).flat();
}

// Find page info by href
export function getPageInfo(href: string): NavItem | undefined {
  return getAllPages().find(p => p.href === href);
}

// Find category for a page
export function getCategory(href: string): string | undefined {
  for (const [category, items] of Object.entries(navigationTree)) {
    if (items.some(item => item.href === href)) {
      return category;
    }
  }
  return undefined;
}

// Get related pages with full info
export function getRelatedPages(href: string): NavItem[] {
  const page = getPageInfo(href);
  if (!page?.related) return [];

  return page.related
    .map(relHref => getPageInfo(relHref))
    .filter((p): p is NavItem => p !== undefined);
}

// Get prerequisite pages with full info
export function getPrerequisites(href: string): NavItem[] {
  const page = getPageInfo(href);
  if (!page?.prerequisites) return [];

  return page.prerequisites
    .map(preHref => getPageInfo(preHref))
    .filter((p): p is NavItem => p !== undefined);
}

// Search pages by query
export function searchPages(query: string): NavItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const allPages = getAllPages();

  // Score each page by relevance
  const scored = allPages.map(page => {
    let score = 0;
    const titleMatch = page.title.toLowerCase().includes(normalizedQuery);
    const descMatch = page.desc.toLowerCase().includes(normalizedQuery);
    const keywordMatch = page.keywords?.some(k => k.includes(normalizedQuery));

    if (page.title.toLowerCase() === normalizedQuery) score += 100;
    if (titleMatch) score += 50;
    if (keywordMatch) score += 30;
    if (descMatch) score += 10;

    return { page, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.page);
}
