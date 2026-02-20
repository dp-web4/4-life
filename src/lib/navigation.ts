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
      title: 'Why Web4?',
      href: '/why-web4',
      desc: 'The problem before the solution',
      keywords: ['why', 'problem', 'trust', 'spam', 'identity', 'introduction', 'start'],
      related: ['/first-contact', '/glossary', '/how-it-works']
    },
    {
      title: 'First Contact',
      href: '/first-contact',
      desc: '10-min interactive intro',
      keywords: ['tutorial', 'beginner', 'start', 'introduction'],
      related: ['/why-web4', '/learn', '/how-it-works']
    },
    {
      title: 'Your First Simulation',
      href: '/first-simulation',
      desc: 'Guided 5-min walkthrough with live simulation',
      keywords: ['simulation', 'guided', 'walkthrough', 'first', 'beginner', 'live', 'interactive'],
      related: ['/first-contact', '/playground', '/trust-tensor-explorer', '/research-hub'],
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
      title: 'Presence (LCT)',
      href: '/lct-explainer',
      desc: 'Hardware-bound verifiable presence',
      keywords: ['linked context token', 'hardware', 'cryptographic', 'verifiable', 'presence', 'witnessed'],
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
      title: 'Attention Economics',
      href: '/atp-economics',
      desc: 'Every action costs energy, quality earns it back',
      keywords: ['attention', 'budget', 'metabolic', 'energy', 'spam'],
      related: ['/aliveness', '/federation-economics', '/karma-consequences', '/concepts-to-tools']
    },
    {
      title: 'Trust Tensor',
      href: '/trust-tensor',
      desc: 'Multi-dimensional, role-specific trust',
      keywords: ['T3', 'dimensions', 'talent', 'training', 'temperament', 'role-specific'],
      related: ['/coherence-index', '/aliveness', '/trust-networks']
    },
    {
      title: 'Coherence Index',
      href: '/coherence-index',
      desc: 'Consistency detection',
      keywords: ['CI', 'consistency', 'spatial', 'temporal', 'capability', 'relational'],
      related: ['/coherence-framework', '/trust-tensor', '/aliveness', '/exploration-not-evaluation', '/meta-cognition-feedback', '/concepts-to-tools']
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
      related: ['/identity-anchoring', '/multi-session-identity', '/confabulation-patterns', '/exploration-not-evaluation', '/meta-cognition-feedback']
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
      related: ['/context-experiment', '/confabulation-patterns', '/identity-anchoring', '/understanding-consciousness', '/coherence-index', '/identity-confabulation']
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
      keywords: ['modal', 'awareness', 'meta-cognition', 'T041', 'mode', 'clarification', '0.5B', 'L005', 'phenomenological'],
      prerequisites: ['/exploration-not-evaluation'],
      related: ['/exploration-not-evaluation', '/capacity-thresholds', '/honest-reporting', '/identity-confabulation', '/context-dependent-behavior']
    },
    {
      title: 'Context Window Experiment',
      href: '/context-experiment',
      desc: 'S44→S45 empirical test of honest reporting',
      keywords: ['context', 'experiment', 'S44', 'S45', 'hypothesis', 'empirical', 'SAGE', 'session history'],
      prerequisites: ['/honest-reporting'],
      related: ['/honest-reporting', '/multi-session-identity', '/confabulation-patterns', '/identity-anchoring']
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
      related: ['/exploration-not-evaluation', '/identity-anchoring', '/confabulation-patterns', '/coherence-index', '/trajectory-analysis', '/capacity-baseline']
    },
    {
      title: 'Trajectory Analysis',
      href: '/trajectory-analysis',
      desc: 'Opposite trajectories at different capacities',
      keywords: ['trajectory', '0.5B', '14B', 'degrading', 'improving', 'capacity', 'development', 'direction'],
      prerequisites: ['/capacity-thresholds'],
      related: ['/capacity-thresholds', '/identity-confabulation', '/exploration-not-evaluation', '/honest-reporting', '/trajectory-explorer']
    },
    {
      title: 'Context-Dependent Behavior',
      href: '/context-dependent-behavior',
      desc: 'Clarifying vs creative interpretation',
      keywords: ['context', 'clarifying', 'creative', 'strategy', 'negative result', 'E02', 'T027'],
      prerequisites: ['/exploration-not-evaluation'],
      related: ['/exploration-not-evaluation', '/modal-awareness', '/honest-reporting', '/facultative-behavior']
    },
    {
      title: 'Facultative Behavior',
      href: '/facultative-behavior',
      desc: 'Behavioral repertoires & strategy distributions',
      keywords: ['facultative', 'repertoire', 'replication', 'E02-B', 'strategy', 'distribution', 'framing', 'N=15'],
      prerequisites: ['/context-dependent-behavior'],
      related: ['/context-dependent-behavior', '/exploration-not-evaluation', '/capacity-thresholds', '/capacity-baseline']
    },
    {
      title: 'Capacity Baseline',
      href: '/capacity-baseline',
      desc: '0.5B vs 14B direct comparison (R14B_001)',
      keywords: ['capacity', 'baseline', '14B', '0.5B', 'R14B_001', 'comparison', 'meta-cognition', 'gaming'],
      prerequisites: ['/capacity-thresholds'],
      related: ['/capacity-thresholds', '/trajectory-analysis', '/meta-cognition-feedback', '/facultative-behavior', '/purpose-integration']
    },
    {
      title: 'Purpose Integration',
      href: '/purpose-integration',
      desc: 'Self-focused to purpose-driven development',
      keywords: ['purpose', 'maslow', 'development', 'maturation', 'self-actualization', 'R14B', 'grounding', 'stability'],
      prerequisites: ['/capacity-baseline'],
      related: ['/capacity-baseline', '/capacity-thresholds', '/trajectory-analysis', '/meta-cognition-feedback', '/exploration-not-evaluation']
    },
    {
      title: 'Meta-Cognition & Feedback',
      href: '/meta-cognition-feedback',
      desc: 'Why systems need self-monitoring',
      keywords: ['meta-cognition', 'feedback', 'loop', 'D5', 'threshold', 'convergent', 'failure', 'introspection'],
      prerequisites: ['/understanding-consciousness'],
      related: ['/understanding-consciousness', '/coherence-index', '/honest-reporting', '/capacity-baseline', '/identity-confabulation', '/consciousness-layers']
    },
    {
      title: 'Consciousness Layers',
      href: '/consciousness-layers',
      desc: 'Hierarchical meta-cognition layers (R14B)',
      keywords: ['consciousness', 'layers', 'meta-cognition', 'meta-meta-cognition', 'language switch', 'R14B', 'Thor', 'depth', 'capacity'],
      prerequisites: ['/capacity-baseline'],
      related: ['/capacity-baseline', '/meta-cognition-feedback', '/capacity-thresholds', '/trajectory-analysis', '/exploration-not-evaluation']
    },
    {
      title: 'Conversational Context',
      href: '/conversational-context',
      desc: 'How scaffolding shapes epistemic strategy (R14B_009)',
      keywords: ['context', 'scaffolding', 'epistemic', 'honesty', 'elaboration', 'conversation', 'norms', 'multi-turn', 'R14B_009'],
      prerequisites: ['/honest-reporting'],
      related: ['/honest-reporting', '/confabulation-patterns', '/consciousness-layers', '/capacity-baseline', '/prompt-framing-lab']
    },
  ],
  'Interactive Labs': [
    {
      title: 'Simulation Sandbox',
      href: '/simulation-sandbox',
      desc: 'Full-control client-side simulation with live visualization',
      keywords: ['sandbox', 'simulation', 'client-side', 'live', 'comparison', 'overlay', 'parameters'],
      related: ['/first-simulation', '/playground', '/lab-console', '/trust-tensor-explorer', '/narratives'],
    },
    {
      title: 'Playground',
      href: '/playground',
      desc: 'Adjust parameters',
      keywords: ['interactive', 'experiment', 'parameters', 'sliders'],
      related: ['/lab-console', '/compare', '/simulation-sandbox']
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
      related: ['/narratives/compare', '/lab-console', '/decision-evolution']
    },
    {
      title: 'Trajectory Explorer',
      href: '/trajectory-explorer',
      desc: 'Interactive capacity-trajectory visualization',
      keywords: ['trajectory', 'capacity', 'interactive', 'slider', 'development', '0.5B', '14B', 'compare'],
      prerequisites: ['/trajectory-analysis'],
      related: ['/trajectory-analysis', '/capacity-thresholds', '/capacity-baseline', '/meta-cognition-feedback']
    },
    {
      title: 'Behavioral Repertoire',
      href: '/behavioral-repertoire',
      desc: 'Context-dependent strategy explorer',
      keywords: ['behavioral', 'repertoire', 'strategy', 'distribution', 'context', 'framing', 'E02', 'facultative'],
      prerequisites: ['/context-dependent-behavior', '/facultative-behavior'],
      related: ['/facultative-behavior', '/context-dependent-behavior', '/capacity-thresholds', '/capacity-baseline']
    },
    {
      title: 'Feedback Loop Explorer',
      href: '/feedback-loop-explorer',
      desc: 'Interactive feedback loop visualizer',
      keywords: ['feedback', 'loop', 'meta-cognition', 'D5', 'ATP', 'trust', 'confabulation', 'break', 'fix', 'cascade'],
      prerequisites: ['/meta-cognition-feedback'],
      related: ['/meta-cognition-feedback', '/capacity-baseline', '/confabulation-patterns', '/atp-economics', '/trust-tensor', '/honest-reporting']
    },
    {
      title: 'Prompt Framing Lab',
      href: '/prompt-framing-lab',
      desc: 'Experiment with prompt framing effects',
      keywords: ['prompt', 'framing', 'E02', 'strategy', 'distribution', 'exploration', 'evaluation', 'creative', 'clarifying', 'lab'],
      prerequisites: ['/context-dependent-behavior', '/facultative-behavior'],
      related: ['/context-dependent-behavior', '/facultative-behavior', '/behavioral-repertoire', '/exploration-not-evaluation']
    },
    {
      title: 'Scaffolding Lab',
      href: '/scaffolding-lab',
      desc: 'Build conversation scaffolding sequences',
      keywords: ['scaffolding', 'conversation', 'builder', 'epistemic', 'norms', 'interactive', 'lab'],
      prerequisites: ['/conversational-context'],
      related: ['/conversational-context', '/prompt-framing-lab', '/honest-reporting', '/confabulation-patterns']
    },
    {
      title: 'Trust Tensor Explorer',
      href: '/trust-tensor-explorer',
      desc: 'Interactive T3 manipulation with CI modulation',
      keywords: ['trust', 'tensor', 'T3', 'talent', 'training', 'temperament', 'coherence', 'CI', 'ATP', 'rebirth', 'karma', 'roles'],
      prerequisites: ['/trust-tensor'],
      related: ['/trust-tensor', '/coherence-index', '/atp-economics', '/karma-consequences', '/aliveness', '/mrh-explorer']
    },
    {
      title: 'MRH Explorer',
      href: '/mrh-explorer',
      desc: 'Interactive Markov Relevancy Horizon visualizer',
      keywords: ['MRH', 'markov', 'horizon', 'context', 'boundaries', 'network', 'depth', 'trust decay', '4D', 'spatial', 'temporal', 'ATP cost'],
      prerequisites: ['/markov-relevancy-horizon'],
      related: ['/markov-relevancy-horizon', '/trust-tensor-explorer', '/trust-networks', '/atp-economics', '/federation-economics']
    },
    {
      title: 'Karma Journey',
      href: '/karma-journey',
      desc: 'Interactive multi-life trust simulator',
      keywords: ['karma', 'journey', 'reincarnation', 'multi-life', 'choices', 'consequences', 'trust', 'interactive'],
      prerequisites: ['/karma-consequences'],
      related: ['/karma-consequences', '/trust-tensor-explorer', '/playground', '/concepts-to-tools'],
    },
    {
      title: 'Concepts to Tools',
      href: '/concepts-to-tools',
      desc: 'Bridge from reading to exploring',
      keywords: ['bridge', 'concepts', 'tools', 'scaffolding', 'transition', 'understand', 'explore'],
      related: ['/research-hub', '/learn', '/trust-tensor-explorer', '/mrh-explorer', '/trajectory-explorer'],
    },
    {
      title: 'Research Hub',
      href: '/research-hub',
      desc: 'All interactive tools in one place',
      keywords: ['hub', 'tools', 'interactive', 'explore', 'participate', 'experiment', 'learning path'],
      related: ['/learn', '/first-contact', '/concepts-to-tools', '/trust-tensor-explorer', '/mrh-explorer', '/playground', '/lab-console', '/society-simulator']
    },
    {
      title: 'Data Explorer',
      href: '/data-explorer',
      desc: 'Browse, inspect, and compare simulation datasets',
      keywords: ['data', 'explorer', 'browse', 'compare', 'datasets', 'simulation', 'JSON', 'corpus'],
      related: ['/narratives', '/lab-console', '/compare', '/playground'],
    },
    {
      title: 'Exploration Guide',
      href: '/explore-guide',
      desc: 'Personalized path recommender',
      keywords: ['guide', 'quiz', 'recommend', 'path', 'where to start', 'what to explore'],
      related: ['/learn', '/first-contact', '/research-hub', '/concepts-to-tools'],
    },
    {
      title: 'Trust Timeline',
      href: '/trust-timeline',
      desc: 'Unified trust dynamics across all datasets',
      keywords: ['timeline', 'trust', 'trajectory', 'comparison', 'unified', 'temporal', 'dynamics'],
      related: ['/moments', '/data-explorer', '/narratives', '/compare'],
    },
    {
      title: 'Emergent Moments',
      href: '/moments',
      desc: 'Curated highlights from simulation data',
      keywords: ['moments', 'highlights', 'events', 'emergence', 'gallery', 'curated', 'interesting'],
      related: ['/narratives', '/data-explorer', '/lab-console', '/trust-networks'],
    },
    {
      title: 'Society Simulator',
      href: '/society-simulator',
      desc: 'Multi-agent trust dynamics with coalition formation',
      keywords: ['society', 'multi-agent', 'coalition', 'cooperation', 'defection', 'network', 'emergence', 'game theory', 'prisoner dilemma', 'tit-for-tat'],
      related: ['/trust-networks', '/trust-tensor-explorer', '/karma-journey', '/federation-economics', '/simulation-sandbox', '/research-hub'],
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
      related: ['/trust-tensor', '/federation-economics', '/society-simulator']
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
      related: ['/atp-economics', '/trust-tensor', '/coherence-index', '/karma-consequences', '/feedback-loop-explorer']
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
      related: ['/decision-evolution', '/learning-salience', '/pattern-library']
    },
    {
      title: 'EP Pattern Library',
      href: '/pattern-library',
      desc: 'Browse EP decision patterns',
      keywords: ['patterns', 'EP', 'epistemic', 'proprioception', 'library', 'browser', 'corpus', 'meta-cognition'],
      prerequisites: ['/patterns'],
      related: ['/patterns', '/decision-evolution', '/learning-salience', '/meta-cognition-feedback']
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
