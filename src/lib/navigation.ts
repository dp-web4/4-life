// Navigation configuration for 4-Life
// Used by breadcrumbs, related concepts, and search
//
// IA rebuilt 2026-07 around the Web4 onramp: the core standard, plus the three
// ways to run it (hub, hestia, hardbound). The Jan-2026 exploration era and the
// game/sim are preserved on branch archive/v1-2026-07 (tag v1-archive-2026-07-15).

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
  'Start Here': [
    {
      title: 'Web4 in 2 Minutes',
      href: '/tldr',
      desc: 'The shortest honest explanation of what Web4 is and why it exists.',
      keywords: ['tldr', 'summary', 'quick', 'overview', '2 minutes', 'elevator', 'short', 'intro'],
      related: ['/why-web4', '/first-contact', '/onramp'],
    },
    {
      title: 'Why Web4?',
      href: '/why-web4',
      desc: 'The problem before the solution: why AI actions today cannot be trusted or proven.',
      keywords: ['why', 'problem', 'trust', 'agents', 'accountability', 'introduction', 'start'],
      related: ['/tldr', '/the-standard', '/what-could-go-wrong'],
    },
    {
      title: 'First Contact',
      href: '/first-contact',
      desc: 'A guided first walk through Web4 for someone arriving with zero background.',
      keywords: ['first contact', 'intro', 'guide', 'onboarding', 'newcomer', 'start here'],
      related: ['/tldr', '/why-web4', '/how-it-works', '/glossary'],
    },
    {
      title: 'How It Works',
      href: '/how-it-works',
      desc: 'The moving parts: identity, trust, energy, and law, and how they fit together.',
      keywords: ['how', 'mechanics', 'overview', 'architecture', 'parts', 'works'],
      related: ['/the-standard', '/onramp', '/lct-explainer'],
    },
    {
      title: 'Running Now',
      href: '/running-now',
      desc: 'What is actually real and runnable today, stated honestly: the standard, the hub, hestia, hardbound.',
      keywords: ['running', 'real', 'live', 'status', 'maturity', 'deployed', 'runnable', 'honest'],
      related: ['/onramp', '/hub', '/hestia', '/hardbound', '/the-standard'],
    },
  ],

  'The Onramp': [
    {
      title: 'The Core Standard',
      href: '/the-standard',
      desc: 'The open ontology that makes AI actions verifiable: witnessed presence, role-contextual trust, auditable authority.',
      keywords: ['standard', 'core', 'ontology', 'spec', 'web4-core', 'rdf', 'substrate', 'equation'],
      related: ['/onramp', '/lct-explainer', '/trust-tensor', '/glossary'],
    },
    {
      title: 'The Hub',
      href: '/hub',
      desc: 'Community scale: a single binary that turns a group into a sovereign Web4 society with signed law and a witnessed ledger.',
      keywords: ['hub', 'society', 'law', 'ledger', 'roles', 'sealed channel', 'community', 'governance', 'rust'],
      related: ['/onramp', '/hestia', '/the-standard', '/karma-consequences'],
    },
    {
      title: 'Hestia',
      href: '/hestia',
      desc: 'Personal scale: local-first identity, an encrypted vault, scoped delegation, and a witnessed trust record on your own machine.',
      keywords: ['hestia', 'local-first', 'vault', 'identity', 'lct', 'delegation', 'agent', 'personal', 'constellation'],
      related: ['/onramp', '/hub', '/hardbound', '/identity-constellation'],
    },
    {
      title: 'Hardbound',
      href: '/hardbound',
      desc: 'Enterprise scale: hardware-bound identity and pre-action policy enforcement, with regulator-defensible audit trails.',
      keywords: ['hardbound', 'enterprise', 'oversight', 'tpm', 'policy', 'audit', 'compliance', 'governance', 'regulatory'],
      related: ['/onramp', '/hestia', '/the-standard', '/what-could-go-wrong'],
    },
    {
      title: 'How the Pieces Compose',
      href: '/onramp',
      desc: 'The core standard is the substrate; hub, hestia, and hardbound are three scales of the same posture. Adoption order and the real seams.',
      keywords: ['onramp', 'compose', 'adoption', 'order', 'architecture', 'scales', 'how to start', 'stack'],
      related: ['/the-standard', '/hub', '/hestia', '/hardbound'],
    },
  ],

  'Core Concepts': [
    {
      title: 'LCT (Identity)',
      href: '/lct-explainer',
      desc: 'The Linked Context Token: a verifiable presence certificate binding an entity to its context through witnessed relationships.',
      keywords: ['lct', 'linked context token', 'identity', 'presence', 'key', 'witness'],
      related: ['/the-standard', '/identity-constellation', '/trust-tensor', '/glossary'],
    },
    {
      title: 'T3 (Trust Tensor)',
      href: '/trust-tensor',
      desc: 'Role-contextual trust in three dimensions: Talent, Training, Temperament. Trust is scoped to a role, not global.',
      keywords: ['t3', 'trust tensor', 'talent', 'training', 'temperament', 'trust', 'reputation'],
      related: ['/value-tensor', '/trust-neighborhood', '/karma-consequences', '/glossary'],
    },
    {
      title: 'V3 (Value Tensor)',
      href: '/value-tensor',
      desc: 'Value in three dimensions: Valuation, Veracity, Validity. The quality-of-output companion to T3.',
      keywords: ['v3', 'value tensor', 'valuation', 'veracity', 'validity', 'value', 'output'],
      related: ['/trust-tensor', '/atp-economics', '/glossary'],
    },
    {
      title: 'MRH (Trust Neighborhood)',
      href: '/trust-neighborhood',
      desc: "The Markov Relevancy Horizon: an entity's dynamic context boundary, scoping what is relevant and how far trust extends.",
      keywords: ['mrh', 'markov relevancy horizon', 'neighborhood', 'context', 'boundary', 'scope', 'relevance'],
      related: ['/trust-tensor', '/the-standard', '/glossary'],
    },
    {
      title: 'ATP/ADP (Energy)',
      href: '/atp-economics',
      desc: 'The bio-inspired value cycle: charged (ATP) and discharged (ADP) packets. A unit of account each society manages, not a currency.',
      keywords: ['atp', 'adp', 'energy', 'economics', 'value', 'work', 'unit of account', 'budget'],
      related: ['/value-tensor', '/karma-consequences', '/glossary'],
    },
    {
      title: 'Coherence Index',
      href: '/coherence-index',
      desc: 'How a society detects inconsistency and incoherence in behavior over time.',
      keywords: ['coherence', 'index', 'consistency', 'incoherence', 'ci', 'behavior'],
      related: ['/trust-tensor', '/coherence-framework', '/glossary'],
    },
    {
      title: 'Karma & Consequences',
      href: '/karma-consequences',
      desc: "Reputation that persists and propagates: how consequential acts back-propagate to an entity's standing (R7).",
      keywords: ['karma', 'reputation', 'consequences', 'r7', 'accountability', 'permanent'],
      related: ['/trust-tensor', '/hub', '/glossary'],
    },
    {
      title: 'Identity Constellation',
      href: '/identity-constellation',
      desc: 'One entity, many devices: how a constellation of keys forms a single witnessed identity.',
      keywords: ['constellation', 'identity', 'devices', 'multi-device', 'keys', 'hestia'],
      related: ['/lct-explainer', '/hestia', '/glossary'],
    },
    {
      title: 'Glossary',
      href: '/glossary',
      desc: 'Plain-language definitions of every Web4 term the site uses, kept current with the core spec.',
      keywords: ['glossary', 'terms', 'definitions', 'vocabulary', 'reference', 'lct', 't3', 'mrh', 'atp', 'society', 'law'],
      related: ['/the-standard', '/first-contact'],
    },
  ],

  'Going Deeper': [
    {
      title: 'A Day in Web4',
      href: '/day-in-web4',
      desc: 'A concrete walk through what changes when trust is built into the internet instead of bolted on.',
      keywords: ['day', 'scenario', 'walkthrough', 'concrete', 'example', 'practical'],
      related: ['/tldr', '/why-web4', '/your-internet'],
    },
    {
      title: 'Your Internet',
      href: '/your-internet',
      desc: 'What would change for you: pick your frustrations and see the difference Web4 would make.',
      keywords: ['personal', 'frustration', 'spam', 'fake', 'platform', 'scenario'],
      related: ['/day-in-web4', '/why-web4'],
    },
    {
      title: 'Web4 Explainer',
      href: '/web4-explainer',
      desc: 'A longer-form explanation of the framework for readers who want the full picture.',
      keywords: ['explainer', 'deep', 'framework', 'full', 'detail'],
      related: ['/the-standard', '/onramp', '/glossary'],
    },
    {
      title: 'What Could Go Wrong',
      href: '/what-could-go-wrong',
      desc: 'The honest adversarial view: attacks, failure modes, and open problems Web4 has to answer.',
      keywords: ['adversarial', 'attack', 'failure', 'threat', 'risk', 'honest', 'limits', 'open problems'],
      related: ['/hardbound', '/trust-tensor', '/glossary'],
    },
    {
      title: 'Coherence Framework',
      href: '/coherence-framework',
      desc: 'The foundations under coherence: the physics-of-trust framing the model draws on.',
      keywords: ['coherence', 'framework', 'foundations', 'physics', 'theory', 'synchronism'],
      related: ['/coherence-index', '/the-standard'],
    },
    {
      title: 'Manifest',
      href: '/manifest',
      desc: 'The stance behind the project: what Web4 is for and what it refuses to be.',
      keywords: ['manifest', 'manifesto', 'stance', 'principles', 'vision', 'values'],
      related: ['/why-web4', '/the-standard'],
    },
    {
      title: 'Learn',
      href: '/learn',
      desc: 'Suggested reading paths through the site, from newcomer to hands-on.',
      keywords: ['learn', 'path', 'guide', 'sequence', 'curriculum', 'reading'],
      related: ['/first-contact', '/onramp', '/glossary'],
    },
  ],
};

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
