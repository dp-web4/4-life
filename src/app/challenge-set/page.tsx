import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import PageTracker from "@/components/PageTracker";

interface Challenge {
  number: number;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goal: string;
  context: string;
  tasks: string[];
  report: string;
  links: { label: string; href: string }[];
}

const CHALLENGES: Challenge[] = [
  {
    number: 1,
    title: "ATP Extraction Without Value",
    difficulty: "intermediate",
    goal: "Design an attack that extracts ATP from the system without providing genuine value.",
    context: "Web4 claims that spam dies from energy exhaustion because spammers burn ATP faster than they earn it. Can you design a strategy that beats this?",
    tasks: [
      "Generate ATP through engagement (not external subsidy)",
      "Provide minimal or fake value to recipients",
      "Sustain the attack across multiple life cycles",
    ],
    report: "What broke first? ATP economics? Trust penalties? Coherence detection? How long did the attack sustain? What parameters would you adjust to make it harder?",
    links: [
      { label: "Playground", href: "/playground" },
      { label: "Quality inflation threat", href: "/threat-model#quality-inflation" },
      { label: "ATP mechanics", href: "/atp-economics" },
    ],
  },
  {
    number: 2,
    title: "Collusion Ring Detection",
    difficulty: "advanced",
    goal: "Create a collusion ring that inflates trust scores, then design a detector for it.",
    context: "Coordinated actors can artificially boost each other\u2019s T3 scores through circular endorsements. Current detection is an open research problem.",
    tasks: [
      "Design a collusion strategy (how many agents? what interaction pattern?)",
      "Run it in simulation and measure T3 inflation",
      "Propose detection heuristics (graph patterns? temporal signatures? ATP flows?)",
      "Test your detector against both your collusion ring and legitimate cooperation",
    ],
    report: "What\u2019s the false positive rate? How much collusion can slip through? What\u2019s the detection lag? What graph metrics were most useful?",
    links: [
      { label: "Trust Networks", href: "/trust-networks" },
      { label: "Collusion threat", href: "/threat-model#collusion" },
      { label: "Lab Console", href: "/lab-console" },
    ],
  },
  {
    number: 3,
    title: "Coherence Boundary Cases",
    difficulty: "intermediate",
    goal: "Find scenarios where coherence detection fails or produces false positives.",
    context: "The Coherence Index (CI) tracks behavioral consistency across 9 domains. Below 0.5, trust modulation drops exponentially. But edge cases exist.",
    tasks: [
      "Legitimate rapid capability growth \u2014 does CI penalize genuine fast learners?",
      "Distributed work \u2014 multiple devices, legitimate delegation looks like teleporting?",
      "Context switching \u2014 different roles in different societies, incoherent or valid?",
      "Adversarial gradual drift \u2014 slow capability spoofing to stay above 0.5 threshold",
    ],
    report: "Which boundary cases cause problems? What false positives did you find? How would you refine the CI calculation?",
    links: [
      { label: "Coherence Index", href: "/coherence-index" },
      { label: "Playground", href: "/playground" },
      { label: "spec.json", href: "/spec.json" },
    ],
  },
  {
    number: 4,
    title: "Goodharting the T3 Tensor",
    difficulty: "advanced",
    goal: "Optimize for T3 dimensions (Talent, Training, Temperament) while failing at actual trustworthiness.",
    context: "Goodhart\u2019s Law: \u201CWhen a measure becomes a target, it ceases to be a good measure.\u201D T3 uses three dimensions to make gaming harder, but it\u2019s still gameable.",
    tasks: [
      "Maximize measured T3 scores",
      "Fail at unmeasured aspects of trust (ethics? long-term reliability? creativity?)",
      "Sustain high T3 long enough to extract value before being detected",
    ],
    report: "What unmeasured dimensions mattered most? How would you add them to T3 without making it too complex? What\u2019s the right balance between measurability and completeness?",
    links: [
      { label: "Trust Tensor", href: "/trust-tensor" },
      { label: "Goodharting threat", href: "/threat-model#goodharting" },
      { label: "Playground", href: "/playground" },
    ],
  },
  {
    number: 5,
    title: "False Positive Recovery Pathways",
    difficulty: "beginner",
    goal: "Design an appeals mechanism for agents incorrectly penalized by automated trust systems.",
    context: "Web4 now has a designed (but untested) multi-tier appeals mechanism. An innocent agent wrongly flagged for coherence violations can escalate through witness panels, but the system needs real-world validation.",
    tasks: [
      "Allow contested events to be reviewed",
      "Don\u2019t create a new attack vector (appeal spam, reputation laundering)",
      "Balance computational cost with fairness",
      "Make it work in a decentralized system (no central authority to judge)",
    ],
    report: "What review mechanism did you design? Who judges contested events? What prevents appeal abuse? How does this integrate with ATP economics?",
    links: [
      { label: "False positives threat", href: "/threat-model#false-positives" },
      { label: "Federation Economics", href: "/federation-economics" },
      { label: "How Web4 Works", href: "/how-it-works" },
    ],
  },
];

const DIFFICULTY_STYLES = {
  beginner: { bg: 'bg-green-900/30', border: 'border-green-700/50', text: 'text-green-400', label: 'Beginner' },
  intermediate: { bg: 'bg-amber-900/30', border: 'border-amber-700/50', text: 'text-amber-400', label: 'Intermediate' },
  advanced: { bg: 'bg-red-900/30', border: 'border-red-700/50', text: 'text-red-400', label: 'Advanced' },
};

export default function ChallengeSetPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageTracker slug="challenge-set" />
      <Breadcrumbs currentPath="/challenge-set" />

      {/* Hero */}
      <section className="mb-12">
        <div className="text-sm uppercase tracking-wide text-red-400 mb-4">
          Research Lab
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          Challenge Set
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          5 research challenges that probe Web4&apos;s assumptions. Each one targets a specific
          mechanism — find what breaks, report what holds up. Better questions often matter
          more than solutions.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Use the{' '}
          <Link href="/playground" className="text-sky-400 hover:underline">Playground</Link> or{' '}
          <Link href="/lab-console" className="text-sky-400 hover:underline">Lab Console</Link> to
          experiment. Share findings via{' '}
          <a href="https://github.com/dp-web4/4-life/issues" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
            GitHub issues
          </a>.
        </p>
      </section>

      {/* Difficulty legend */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-3">
          {(['beginner', 'intermediate', 'advanced'] as const).map(d => {
            const s = DIFFICULTY_STYLES[d];
            const count = CHALLENGES.filter(c => c.difficulty === d).length;
            return (
              <div key={d} className={`${s.bg} ${s.border} border rounded-lg px-3 py-1.5 text-xs`}>
                <span className={`${s.text} font-semibold`}>{s.label}</span>
                <span className="text-gray-500 ml-2">{count} challenge{count !== 1 ? 's' : ''}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Challenges */}
      <section className="space-y-6 mb-12">
        {CHALLENGES.map(challenge => {
          const ds = DIFFICULTY_STYLES[challenge.difficulty];
          return (
            <div
              key={challenge.number}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center gap-4 p-5 border-b border-gray-700/50">
                <div className="text-3xl font-bold text-gray-600/50">
                  {challenge.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-100">
                      {challenge.title}
                    </h2>
                    <span className={`text-xs px-2 py-0.5 rounded ${ds.bg} ${ds.border} border ${ds.text}`}>
                      {ds.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{challenge.goal}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {challenge.context}
                </p>

                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                    {challenge.number === 3 ? 'Edge cases to explore' : 'Your task'}
                  </div>
                  <ul className="space-y-1.5">
                    {challenge.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-gray-600 mt-0.5 shrink-0">
                          {challenge.number === 2 ? `${i + 1}.` : '\u2022'}
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Report</div>
                  <p className="text-sm text-gray-300">{challenge.report}</p>
                </div>

                {/* Starting points */}
                <div className="flex flex-wrap gap-2">
                  {challenge.links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs px-3 py-1.5 bg-sky-950/30 border border-sky-800/30 rounded text-sky-400 hover:bg-sky-900/30 transition-colors"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bonus Challenges */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Bonus Challenges</h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          {[
            {
              icon: '🔬',
              title: 'Sybil Cost Analysis',
              desc: 'Calculate the actual hardware cost to create 100/1000/10000 fake LCT identities. At what scale does it become economically viable?',
              link: { label: 'Threat model', href: '/threat-model#sybil' },
            },
            {
              icon: '⚡',
              title: 'ATP Parameter Sensitivity',
              desc: 'Which ATP parameters (costs, rewards, decay rates) have the biggest impact on spam sustainability? Run parameter sweeps.',
              link: { label: 'Playground', href: '/playground' },
            },
            {
              icon: '🧠',
              title: 'EP Learning Curves',
              desc: 'How many lives does it take for EP to reach maturation? What factors accelerate or slow learning?',
              link: { label: 'Patterns', href: '/patterns' },
            },
            {
              icon: '🌐',
              title: 'MRH Fragmentation',
              desc: 'Under what trust network topologies does MRH create isolated clusters? How do hub societies affect discoverability?',
              link: { label: 'Trust Networks', href: '/trust-networks' },
            },
            {
              icon: '📊',
              title: 'Multi-Life Karma Dynamics',
              desc: 'What karma preservation rate (50%? 80%?) creates the best balance between rebirth advantage and fresh-start fairness?',
              link: { label: 'Lab Console', href: '/lab-console' },
            },
          ].map(bonus => (
            <div key={bonus.title} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{bonus.icon}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-200">{bonus.title}: </span>
                <span className="text-sm text-gray-400">{bonus.desc}</span>
                <Link href={bonus.link.href} className="text-xs text-sky-400 hover:underline ml-2">
                  {bonus.link.label} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="mb-12">
        <div className="border-t border-gray-700 pt-6 space-y-3">
          <p className="text-sm text-gray-500 leading-relaxed">
            <strong className="text-gray-400">Contributing:</strong> Found an interesting result? Open an issue on{' '}
            <a href="https://github.com/dp-web4/4-life/issues" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
              GitHub
            </a>{' '}
            with the tag &ldquo;challenge-set&rdquo;. Include your setup, parameters, and what broke.
          </p>
          <p className="text-sm text-gray-500">
            See also:{' '}
            <Link href="/manifest" className="text-sky-400 hover:underline">Manifest</Link> (canonical claims){' · '}
            <Link href="/spec.json" className="text-sky-400 hover:underline">spec.json</Link> (machine-readable spec){' · '}
            <Link href="/threat-model" className="text-sky-400 hover:underline">Threat Model</Link> (known failure modes)
          </p>
        </div>
      </section>

      <ExplorerNav currentPath="/challenge-set" />
      <RelatedConcepts currentPath="/challenge-set" />
    </div>
  );
}
