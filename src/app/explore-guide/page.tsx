'use client';

/**
 * "What Should I Explore?" - Interactive Recommender
 *
 * Session #41: With 63+ pages, humans need personalized guidance.
 * This page asks 3-4 quick questions and recommends a tailored
 * exploration path through the site.
 *
 * Philosophy: Don't dump a sitemap. Understand what the human wants
 * and guide them to exactly the right starting point.
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface QuestionOption {
  label: string;
  description: string;
  value: string;
}

interface Recommendation {
  title: string;
  description: string;
  href: string;
  timeEstimate: string;
  type: 'read' | 'interactive' | 'experiment' | 'research';
}

interface ExplorationPath {
  name: string;
  tagline: string;
  color: string;
  steps: Recommendation[];
  nextPath?: string;
}

// ============================================================================
// Questions
// ============================================================================

const QUESTIONS: Question[] = [
  {
    id: 'background',
    question: 'What best describes your background?',
    options: [
      { label: 'Curious newcomer', description: 'I\'ve heard of Web4 / trust-native systems and want to understand what they are', value: 'newcomer' },
      { label: 'Technical practitioner', description: 'I work in software, AI, or related fields and want to understand the mechanics', value: 'technical' },
      { label: 'Researcher / theorist', description: 'I\'m interested in the theoretical foundations — trust, coherence, emergence', value: 'researcher' },
      { label: 'Skeptic / adversarial thinker', description: 'I want to understand attack surfaces and failure modes before the idealistic parts', value: 'skeptic' },
    ],
  },
  {
    id: 'interest',
    question: 'What are you most curious about?',
    options: [
      { label: 'How trust works', description: 'Identity, trust measurement, and how it accumulates or collapses', value: 'trust' },
      { label: 'The economics', description: 'Attention budgets, action costs, and why spam becomes impossible', value: 'economics' },
      { label: 'Emergence & AI', description: 'How trust awareness develops, how agents learn, how societies self-organize', value: 'emergence' },
      { label: 'The big picture', description: 'Why does this matter? What problem does it solve? How is it different from Web3?', value: 'vision' },
    ],
  },
  {
    id: 'style',
    question: 'How do you prefer to learn?',
    options: [
      { label: 'Show me a story', description: 'I want narratives and examples before abstractions', value: 'narrative' },
      { label: 'Let me play', description: 'Give me interactive tools — I learn by doing', value: 'interactive' },
      { label: 'Give me the specs', description: 'I want precise definitions and formal descriptions', value: 'formal' },
      { label: 'Challenge me', description: 'I learn best by questioning assumptions and finding edge cases', value: 'adversarial' },
    ],
  },
];

// ============================================================================
// Path Generation
// ============================================================================

function generatePath(answers: Record<string, string>): ExplorationPath {
  const { background, interest, style } = answers;

  // Newcomer paths
  if (background === 'newcomer') {
    if (style === 'narrative') {
      return {
        name: 'Story-First Journey',
        tagline: 'Understanding Web4 through the lives of simulated agents',
        color: '#6ee7b7',
        steps: [
          { title: 'First Contact', description: 'A 10-minute interactive introduction to Web4 — no jargon, just exploration', href: '/first-contact', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Karma Journey', description: 'Play through multiple lives, making choices and seeing how trust and karma shape outcomes', href: '/karma-journey', timeEstimate: '15 min', type: 'interactive' },
          { title: 'Simulation Narratives', description: 'Read auto-generated stories about agents navigating Web4 societies', href: '/narratives', timeEstimate: '10 min', type: 'read' },
          { title: 'How It Works', description: 'Now that you\'ve seen it in action, understand the mechanics behind it', href: '/how-it-works', timeEstimate: '8 min', type: 'read' },
          { title: 'Data Explorer', description: 'Browse the raw simulation data that generates those stories', href: '/data-explorer', timeEstimate: '5 min', type: 'experiment' },
        ],
        nextPath: 'Explore the Trust Tensor and MRH Explorers for deeper mechanics.',
      };
    }
    if (style === 'interactive') {
      return {
        name: 'Hands-On Discovery',
        tagline: 'Learn by doing — manipulate parameters and watch what happens',
        color: '#93c5fd',
        steps: [
          { title: 'First Contact', description: 'Interactive tutorial that teaches through exploration, not lectures', href: '/first-contact', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Trust Tensor Explorer', description: 'Drag sliders to change trust dimensions and see real-time effects', href: '/trust-tensor-explorer', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Karma Journey', description: 'Live through multiple lives, making choices that carry consequences', href: '/karma-journey', timeEstimate: '15 min', type: 'interactive' },
          { title: 'Playground', description: 'Full parameter playground — tweak any setting and run your own simulation', href: '/playground', timeEstimate: '15 min', type: 'experiment' },
          { title: 'Concepts to Tools', description: 'Map every concept to its interactive tool', href: '/concepts-to-tools', timeEstimate: '5 min', type: 'read' },
        ],
        nextPath: 'Try the Lab Console to run full simulations with all parameters.',
      };
    }
    if (style === 'adversarial') {
      return {
        name: 'Skeptic\'s Tour',
        tagline: 'Start from "this can\'t work" and see what survives scrutiny',
        color: '#fde68a',
        steps: [
          { title: 'Threat Model', description: 'Comprehensive analysis of attack surfaces, failure modes, and what\'s unknown', href: '/threat-model', timeEstimate: '12 min', type: 'read' },
          { title: 'Adversarial Explorer', description: 'Interactive tool to test attack patterns and see how defenses work', href: '/adversarial-explorer', timeEstimate: '10 min', type: 'interactive' },
          { title: 'How It Works', description: 'Understand the mechanics so you can spot weaknesses', href: '/how-it-works', timeEstimate: '8 min', type: 'read' },
          { title: 'First Contact', description: 'Now see the idealistic version — does it hold up?', href: '/first-contact', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Challenge Set', description: 'Research prompts for discovering edge cases yourself', href: '/challenge-set', timeEstimate: '5 min', type: 'research' },
        ],
        nextPath: 'Try the Playground to test your hypotheses with parameter manipulation.',
      };
    }
    // Default newcomer (formal)
    return {
      name: 'Structured Introduction',
      tagline: 'A systematic walkthrough of Web4 fundamentals',
      color: '#c4b5fd',
      steps: [
        { title: 'How It Works', description: 'Clear, structured explanation of the core mechanics', href: '/how-it-works', timeEstimate: '8 min', type: 'read' },
        { title: 'Glossary', description: 'Precise definitions of all key terms', href: '/glossary', timeEstimate: '5 min', type: 'read' },
        { title: 'LCT Explainer', description: 'Identity: the foundation everything builds on', href: '/lct-explainer', timeEstimate: '6 min', type: 'read' },
        { title: 'ATP Economics', description: 'The attention economy that makes participation meaningful', href: '/atp-economics', timeEstimate: '7 min', type: 'read' },
        { title: 'Trust Tensor', description: 'Multi-dimensional trust measurement and its implications', href: '/trust-tensor', timeEstimate: '8 min', type: 'read' },
      ],
      nextPath: 'Continue to the Learning Journey for intermediate and advanced topics.',
    };
  }

  // Technical practitioner paths
  if (background === 'technical') {
    if (interest === 'trust') {
      return {
        name: 'Trust Mechanics Deep Dive',
        tagline: 'How trust is measured, earned, lost, and carried across lives',
        color: '#60a5fa',
        steps: [
          { title: 'Trust Tensor Explorer', description: 'Interactive manipulation of T3 dimensions with real-time CI modulation', href: '/trust-tensor-explorer', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Coherence Index', description: 'How behavioral consistency maps to 4 CI dimensions', href: '/coherence-index', timeEstimate: '8 min', type: 'read' },
          { title: 'Coherence Framework', description: '9-domain coherence visualizer — the physics of trust', href: '/coherence-framework', timeEstimate: '10 min', type: 'interactive' },
          { title: 'MRH Explorer', description: 'Context boundaries and how they shape trust visibility', href: '/mrh-explorer', timeEstimate: '8 min', type: 'interactive' },
          { title: 'Data Explorer', description: 'Raw simulation data showing trust trajectories across all datasets', href: '/data-explorer', timeEstimate: '10 min', type: 'experiment' },
        ],
        nextPath: 'Run your own trust experiments in the Lab Console.',
      };
    }
    if (interest === 'economics') {
      return {
        name: 'Attention Economics Lab',
        tagline: 'Attention budgets, action costs, and why spam dies',
        color: '#34d399',
        steps: [
          { title: 'Attention Economics', description: 'The attention budget: earn by contributing, spend on actions', href: '/atp-economics', timeEstimate: '7 min', type: 'read' },
          { title: 'Federation Economics', description: 'Interactive market simulator for ATP pricing dynamics', href: '/federation-economics', timeEstimate: '12 min', type: 'interactive' },
          { title: 'Feedback Loop Explorer', description: 'See how ATP and trust create reinforcing feedback loops', href: '/feedback-loop-explorer', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Playground', description: 'Tweak economic parameters and watch what happens', href: '/playground', timeEstimate: '15 min', type: 'experiment' },
          { title: 'Data Explorer', description: 'Compare ATP trajectories across all simulation types', href: '/data-explorer', timeEstimate: '10 min', type: 'experiment' },
        ],
        nextPath: 'Explore the Trust Tensor for how economics connects to identity.',
      };
    }
    if (interest === 'emergence') {
      return {
        name: 'Emergence & Learning Lab',
        tagline: 'How awareness, learning, and social structure emerge from simple rules',
        color: '#a78bfa',
        steps: [
          { title: 'Consciousness Layers', description: 'Interactive visualization of 3-layer consciousness emergence', href: '/consciousness-layers', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Trajectory Explorer', description: 'Model how capacity affects developmental trajectories', href: '/trajectory-explorer', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Trust Networks', description: 'Multi-agent trust dynamics and coalition formation', href: '/trust-networks', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Karma Journey', description: 'Experience learning across multiple lives firsthand', href: '/karma-journey', timeEstimate: '15 min', type: 'interactive' },
          { title: 'Narratives', description: 'Read stories of agents maturing through cross-life learning', href: '/narratives', timeEstimate: '10 min', type: 'read' },
        ],
        nextPath: 'The Lab Console lets you run full emergence simulations with cross-life learning.',
      };
    }
    // Default technical (vision)
    return {
      name: 'Architecture Overview',
      tagline: 'How the pieces fit together and why they matter',
      color: '#f472b6',
      steps: [
        { title: 'Web4 Explainer', description: 'The big picture: trust-native internet architecture', href: '/web4-explainer', timeEstimate: '8 min', type: 'read' },
        { title: 'How It Works', description: 'Technical walkthrough of all subsystems', href: '/how-it-works', timeEstimate: '8 min', type: 'read' },
        { title: 'Concepts to Tools', description: 'Map every concept to its interactive demonstration', href: '/concepts-to-tools', timeEstimate: '5 min', type: 'read' },
        { title: 'Data Explorer', description: 'Browse all simulation data to see the system in action', href: '/data-explorer', timeEstimate: '10 min', type: 'experiment' },
        { title: 'Manifest', description: 'Design principles and specification of all Web4 primitives', href: '/manifest', timeEstimate: '15 min', type: 'read' },
      ],
      nextPath: 'Pick any specific explorer to dive deeper into individual components.',
    };
  }

  // Researcher paths
  if (background === 'researcher') {
    if (interest === 'emergence') {
      return {
        name: 'Emergence Research Path',
        tagline: 'From simple rules to awareness, learning, and society',
        color: '#c084fc',
        steps: [
          { title: 'Consciousness Layers', description: '3-layer emergence model with empirical R14B data', href: '/consciousness-layers', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Purpose Integration', description: 'How purpose-driven behavior emerges from developmental progression', href: '/purpose-integration', timeEstimate: '10 min', type: 'interactive' },
          { title: 'Coherence Framework', description: '9-domain coherence theory from Synchronism research', href: '/coherence-framework', timeEstimate: '12 min', type: 'interactive' },
          { title: 'Capacity Thresholds', description: 'Empirical validation of capacity effects on emergence', href: '/capacity-thresholds', timeEstimate: '8 min', type: 'research' },
          { title: 'Research Hub', description: 'All research tools and explorers in one catalog', href: '/research-hub', timeEstimate: '5 min', type: 'read' },
        ],
        nextPath: 'The Challenge Set has open research questions to explore.',
      };
    }
    return {
      name: 'Theoretical Foundations',
      tagline: 'Trust tensors, behavioral coherence, and cross-life learning',
      color: '#f0abfc',
      steps: [
        { title: 'Coherence Framework', description: '9-domain coherence visualizer — grounded in Synchronism theory', href: '/coherence-framework', timeEstimate: '12 min', type: 'interactive' },
        { title: 'Trust Tensor', description: 'Formal description of multi-dimensional trust measurement', href: '/trust-tensor', timeEstimate: '8 min', type: 'read' },
        { title: 'MRH Explorer', description: 'Context boundaries and their mathematical basis', href: '/mrh-explorer', timeEstimate: '8 min', type: 'interactive' },
        { title: 'Prompt Framing Lab', description: 'Context-dependency research with real experimental data', href: '/prompt-framing-lab', timeEstimate: '10 min', type: 'research' },
        { title: 'Challenge Set', description: 'Open research questions and experimental prompts', href: '/challenge-set', timeEstimate: '5 min', type: 'research' },
      ],
      nextPath: 'The Data Explorer has raw simulation data for independent analysis.',
    };
  }

  // Skeptic paths
  if (background === 'skeptic') {
    return {
      name: 'Red Team Path',
      tagline: 'Start with the weaknesses, then decide if the strengths compensate',
      color: '#fb923c',
      steps: [
        { title: 'Threat Model', description: '6 attack surfaces, honest unknowns, failure modes', href: '/threat-model', timeEstimate: '12 min', type: 'read' },
        { title: 'Adversarial Explorer', description: 'Interactive attack pattern analysis', href: '/adversarial-explorer', timeEstimate: '10 min', type: 'interactive' },
        { title: 'Trust Networks', description: 'Multi-agent dynamics — where collusion could emerge', href: '/trust-networks', timeEstimate: '10 min', type: 'interactive' },
        { title: 'Honest Reporting', description: 'Research on honest vs manipulated self-reporting', href: '/honest-reporting', timeEstimate: '8 min', type: 'research' },
        { title: 'Playground', description: 'Try to break things — extreme parameter settings', href: '/playground', timeEstimate: '15 min', type: 'experiment' },
      ],
      nextPath: 'If you find it compelling despite the weaknesses, try First Contact.',
    };
  }

  // Fallback
  return {
    name: 'Explorer\'s Choice',
    tagline: 'A curated starting point for the curious',
    color: '#6ee7b7',
    steps: [
      { title: 'First Contact', description: 'Interactive introduction — the best starting point for anyone', href: '/first-contact', timeEstimate: '10 min', type: 'interactive' },
      { title: 'Karma Journey', description: 'Experience trust dynamics through gameplay', href: '/karma-journey', timeEstimate: '15 min', type: 'interactive' },
      { title: 'How It Works', description: 'Understand the mechanics', href: '/how-it-works', timeEstimate: '8 min', type: 'read' },
      { title: 'Data Explorer', description: 'Browse all simulation data', href: '/data-explorer', timeEstimate: '10 min', type: 'experiment' },
      { title: 'Research Hub', description: 'Find everything from one central catalog', href: '/research-hub', timeEstimate: '5 min', type: 'read' },
    ],
    nextPath: 'Use the Learning Journey to go deeper into any topic.',
  };
}

// ============================================================================
// Components
// ============================================================================

function TypeIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    read: 'M',
    interactive: 'I',
    experiment: 'E',
    research: 'R',
  };
  const colors: Record<string, string> = {
    read: 'bg-blue-900/50 text-blue-300',
    interactive: 'bg-emerald-900/50 text-emerald-300',
    experiment: 'bg-amber-900/50 text-amber-300',
    research: 'bg-purple-900/50 text-purple-300',
  };
  const labels: Record<string, string> = {
    read: 'Read',
    interactive: 'Interactive',
    experiment: 'Experiment',
    research: 'Research',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${colors[type] || 'bg-gray-700 text-gray-300'}`}>
      <span className="font-bold">{icons[type]}</span>
      <span>{labels[type]}</span>
    </span>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ExploreGuidePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [path, setPath] = useState<ExplorationPath | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate path
      setPath(generatePath(newAnswers));
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setPath(null);
  };

  const progress = path ? 100 : ((currentQuestion) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto p-8">
        <Breadcrumbs currentPath="/explore-guide" />

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">What Should I Explore?</h1>
          <p className="text-gray-400">
            Three quick questions to find your ideal starting point in the Web4 ecosystem.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            <span>Start</span>
            <span>{path ? 'Your Path' : `Question ${currentQuestion + 1} of ${QUESTIONS.length}`}</span>
          </div>
        </div>

        {/* Question phase */}
        {!path && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                {QUESTIONS[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {QUESTIONS[currentQuestion].options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(QUESTIONS[currentQuestion].id, option.value)}
                    className="w-full text-left p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-blue-500 rounded-lg transition-all group"
                  >
                    <div className="font-medium group-hover:text-blue-300 transition-colors">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Previous answers */}
            {currentQuestion > 0 && (
              <div className="flex gap-2 justify-center">
                {Object.entries(answers).map(([qId, val]) => (
                  <span key={qId} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                    {QUESTIONS.find(q => q.id === qId)?.options.find(o => o.value === val)?.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Path results */}
        {path && (
          <div className="space-y-6">
            {/* Path header */}
            <div className="bg-gray-800 rounded-xl p-6 text-center" style={{ borderColor: path.color, borderWidth: '1px' }}>
              <div className="text-xs uppercase tracking-wider mb-2" style={{ color: path.color }}>
                Your Recommended Path
              </div>
              <h2 className="text-3xl font-bold mb-2">{path.name}</h2>
              <p className="text-gray-400">{path.tagline}</p>
              <div className="flex justify-center gap-2 mt-4">
                {Object.entries(answers).map(([qId, val]) => (
                  <span key={qId} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-400">
                    {QUESTIONS.find(q => q.id === qId)?.options.find(o => o.value === val)?.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {path.steps.map((step, i) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="block"
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div className={`flex items-start gap-4 p-5 rounded-lg border transition-all ${
                    hoveredStep === i ? 'bg-gray-750 border-blue-600' : 'bg-gray-800 border-gray-700'
                  }`}>
                    {/* Step number */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{
                        backgroundColor: `${path.color}20`,
                        color: path.color,
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg">{step.title}</h3>
                        <TypeIcon type={step.type} />
                      </div>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>

                    {/* Time estimate */}
                    <div className="flex-shrink-0 text-xs text-gray-500 mt-1">
                      {step.timeEstimate}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Total time */}
            <div className="text-center text-sm text-gray-500">
              Total estimated time:{' '}
              <span className="text-gray-300">
                {path.steps.reduce((sum, s) => sum + parseInt(s.timeEstimate), 0)} min
              </span>
            </div>

            {/* Next path hint */}
            {path.nextPath && (
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-400">After completing this path:</div>
                <div className="text-sm text-blue-300 mt-1">{path.nextPath}</div>
              </div>
            )}

            {/* Reset / alternatives */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={reset}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                Try different answers
              </button>
              <Link
                href="/learn"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                Full Learning Journey
              </Link>
              <Link
                href="/research-hub"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        )}

        {/* Context */}
        <div className="mt-12 text-center text-xs text-gray-600">
          <p>This guide draws from {'>'}60 pages across 5 categories of interactive tools and documentation.</p>
          <p className="mt-1">
            <Link href="/first-contact" className="text-gray-500 hover:text-white transition-colors">
              Just want to dive in? Start with First Contact.
            </Link>
          </p>
        </div>

        <ExplorerNav currentPath="/explore-guide" />
      </div>
    </div>
  );
}
