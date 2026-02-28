'use client';

/**
 * Live Trust Engine — Real web4 trust calculations in the browser
 *
 * This component loads the actual web4-trust-core WASM module (66KB)
 * and lets visitors create entities, perform actions, witness events,
 * and watch trust evolve — all using the real protocol math.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Types matching the WASM module
interface EntityState {
  id: string;
  name: string;
  t3: number;
  v3: number;
  level: string;
  actions: number;
  successes: number;
}

interface ActionLog {
  tick: number;
  actor: string;
  action: string;
  success: boolean;
  magnitude: number;
  result: string;
}

const SCENARIOS: { label: string; description: string; actions: ActionLog[] }[] = [
  {
    label: 'Honest Builder',
    description: 'Alice does quality work consistently. Watch trust compound.',
    actions: [
      { tick: 1, actor: 'alice', action: 'Quality contribution', success: true, magnitude: 0.8, result: '' },
      { tick: 2, actor: 'alice', action: 'Help a newcomer', success: true, magnitude: 0.6, result: '' },
      { tick: 3, actor: 'alice', action: 'Peer review', success: true, magnitude: 0.7, result: '' },
      { tick: 4, actor: 'alice', action: 'Collaborative project', success: true, magnitude: 0.9, result: '' },
      { tick: 5, actor: 'alice', action: 'Mentor session', success: true, magnitude: 0.7, result: '' },
      { tick: 6, actor: 'alice', action: 'Original research', success: true, magnitude: 0.85, result: '' },
      { tick: 7, actor: 'alice', action: 'Community standards vote', success: true, magnitude: 0.5, result: '' },
      { tick: 8, actor: 'alice', action: 'Quality contribution', success: true, magnitude: 0.8, result: '' },
    ],
  },
  {
    label: 'Trust Crash',
    description: 'Bob builds trust then betrays it. Watch what happens.',
    actions: [
      { tick: 1, actor: 'bob', action: 'Quality contribution', success: true, magnitude: 0.8, result: '' },
      { tick: 2, actor: 'bob', action: 'Collaborative project', success: true, magnitude: 0.9, result: '' },
      { tick: 3, actor: 'bob', action: 'Help a newcomer', success: true, magnitude: 0.7, result: '' },
      { tick: 4, actor: 'bob', action: 'Peer review', success: true, magnitude: 0.6, result: '' },
      { tick: 5, actor: 'bob', action: 'SPAM — low quality post', success: false, magnitude: 0.9, result: '' },
      { tick: 6, actor: 'bob', action: 'FRAUD — fake credentials', success: false, magnitude: 1.0, result: '' },
      { tick: 7, actor: 'bob', action: 'Quality contribution', success: true, magnitude: 0.7, result: '' },
      { tick: 8, actor: 'bob', action: 'Quality contribution', success: true, magnitude: 0.8, result: '' },
    ],
  },
  {
    label: 'Witness Network',
    description: 'Alice and Bob witness each other. Trust flows through the network.',
    actions: [
      { tick: 1, actor: 'alice', action: 'Quality contribution', success: true, magnitude: 0.8, result: '' },
      { tick: 2, actor: 'bob', action: 'Quality contribution', success: true, magnitude: 0.7, result: '' },
      { tick: 3, actor: 'alice', action: 'Witnesses Bob\'s work', success: true, magnitude: 0.7, result: '' },
      { tick: 4, actor: 'bob', action: 'Witnesses Alice\'s work', success: true, magnitude: 0.8, result: '' },
      { tick: 5, actor: 'alice', action: 'Joint project with Bob', success: true, magnitude: 0.9, result: '' },
      { tick: 6, actor: 'bob', action: 'Joint project with Alice', success: true, magnitude: 0.9, result: '' },
      { tick: 7, actor: 'alice', action: 'Quality contribution', success: true, magnitude: 0.75, result: '' },
      { tick: 8, actor: 'bob', action: 'Quality contribution', success: true, magnitude: 0.8, result: '' },
    ],
  },
];

export default function LiveTrustEngine() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [entities, setEntities] = useState<Record<string, EntityState>>({});
  const [log, setLog] = useState<ActionLog[]>([]);
  const [history, setHistory] = useState<{ step: number; entities: Record<string, EntityState> }[]>([]);

  // WASM module ref
  const wasmRef = useRef<any>(null);
  const storeRef = useRef<any>(null);

  // Initialize WASM engine
  useEffect(() => {
    let cancelled = false;

    async function loadEngine() {
      try {
        const { initTrustEngine } = await import('@/lib/web4-trust');
        const mod = await initTrustEngine();

        if (cancelled) return;

        wasmRef.current = mod;

        // Create trust store
        const store = new mod.WasmTrustStore();
        storeRef.current = store;

        // Create initial entities
        const alice = new mod.EntityTrust('alice');
        const bob = new mod.EntityTrust('bob');
        store.save(alice);
        store.save(bob);

        setEntities({
          alice: readEntity(store, 'alice'),
          bob: readEntity(store, 'bob'),
        });

        setEngineReady(true);
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          console.error('WASM load error:', err);
          setError('Trust engine failed to load');
          setLoading(false);
        }
      }
    }

    loadEngine();
    return () => { cancelled = true; };
  }, []);

  // Read entity state from WASM store
  function readEntity(store: any, id: string): EntityState {
    try {
      const entity = store.get(id);
      const state: EntityState = {
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        t3: entity.t3Average(),
        v3: entity.v3Average(),
        level: entity.trustLevel(),
        actions: Number(entity.actionCount),
        successes: Number(entity.successCount),
      };
      entity.free();
      return state;
    } catch {
      return { id, name: id, t3: 0.5, v3: 0.5, level: 'Neutral', actions: 0, successes: 0 };
    }
  }

  // Reset scenario
  const resetScenario = useCallback(() => {
    if (!wasmRef.current) return;

    const mod = wasmRef.current;

    // Clean up old store
    if (storeRef.current) {
      try { storeRef.current.free(); } catch { /* ignore */ }
    }

    const store = new mod.WasmTrustStore();
    storeRef.current = store;

    const alice = new mod.EntityTrust('alice');
    const bob = new mod.EntityTrust('bob');
    store.save(alice);
    store.save(bob);

    alice.free();
    bob.free();

    const initialEntities = {
      alice: readEntity(store, 'alice'),
      bob: readEntity(store, 'bob'),
    };

    setEntities(initialEntities);
    setCurrentStep(0);
    setRunning(false);
    setLog([]);
    setHistory([{ step: 0, entities: initialEntities }]);
  }, []);

  // Reset when scenario changes
  useEffect(() => {
    if (engineReady) resetScenario();
  }, [selectedScenario, engineReady, resetScenario]);

  // Execute one step
  const executeStep = useCallback(() => {
    const store = storeRef.current;
    const scenario = SCENARIOS[selectedScenario];
    if (!store || currentStep >= scenario.actions.length) return;

    const action = scenario.actions[currentStep];
    const { actor, success, magnitude } = action;

    // Check if this is a witness action
    const isWitness = action.action.toLowerCase().includes('witness');
    const otherActor = actor === 'alice' ? 'bob' : 'alice';

    let resultText: string;

    if (isWitness) {
      // Witness event
      try {
        store.witness(actor, otherActor, success, magnitude);
        resultText = `${actor} witnessed ${otherActor}'s work`;
      } catch {
        // Fallback to regular update
        store.update(actor, success, magnitude);
        resultText = success ? `Trust +` : `Trust -`;
      }
    } else {
      // Regular action
      try {
        store.update(actor, success, magnitude);
      } catch {
        // Entity might not exist, create it
        const mod = wasmRef.current;
        const entity = new mod.EntityTrust(actor);
        store.save(entity);
        entity.free();
        store.update(actor, success, magnitude);
      }
      resultText = success
        ? `+${(magnitude * 0.02).toFixed(3)} trust`
        : `-${(magnitude * 0.04).toFixed(3)} trust`;
    }

    const logEntry: ActionLog = { ...action, result: resultText };
    const newEntities = {
      alice: readEntity(store, 'alice'),
      bob: readEntity(store, 'bob'),
    };
    const nextStep = currentStep + 1;

    setLog(prev => [...prev, logEntry]);
    setEntities(newEntities);
    setCurrentStep(nextStep);
    setHistory(prev => [...prev, { step: nextStep, entities: newEntities }]);
  }, [currentStep, selectedScenario]);

  // Auto-play
  useEffect(() => {
    if (!running) return;
    const scenario = SCENARIOS[selectedScenario];
    if (currentStep >= scenario.actions.length) {
      setRunning(false);
      return;
    }
    const timer = setTimeout(executeStep, 800);
    return () => clearTimeout(timer);
  }, [running, currentStep, executeStep, selectedScenario]);

  // Trust bar component
  function TrustBar({ value, label, color }: { value: number; label: string; color: string }) {
    const pct = Math.max(0, Math.min(100, value * 100));
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="w-6 text-gray-500">{label}</span>
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <span className="w-10 text-right font-mono" style={{ color }}>
          {value.toFixed(2)}
        </span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 text-center">
        <div className="animate-pulse text-gray-400">
          Loading Web4 Trust Engine (66KB WASM)...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-red-800/30 rounded-xl p-6">
        <p className="text-red-400 text-sm">{error}</p>
        <p className="text-gray-500 text-xs mt-2">The trust engine requires WebAssembly support in your browser.</p>
      </div>
    );
  }

  const scenario = SCENARIOS[selectedScenario];
  const isComplete = currentStep >= scenario.actions.length;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-emerald-800/40 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700/50 bg-emerald-900/10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-semibold text-emerald-400">Live Trust Engine</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Real web4-trust-core running in your browser via WebAssembly
            </p>
          </div>
          <span className="px-2 py-0.5 bg-emerald-900/30 border border-emerald-700/30 rounded text-[10px] text-emerald-400 font-mono">
            WASM 66KB
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Scenario selector */}
        <div className="flex gap-2 flex-wrap">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedScenario(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                i === selectedScenario
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-400">{scenario.description}</p>

        {/* Entity cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(entities).map(entity => (
            <div key={entity.id} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-200">{entity.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  entity.level === 'High' ? 'bg-green-900/40 text-green-400' :
                  entity.level === 'Low' ? 'bg-red-900/40 text-red-400' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {entity.level}
                </span>
              </div>
              <TrustBar value={entity.t3} label="T3" color="#a78bfa" />
              <TrustBar value={entity.v3} label="V3" color="#38bdf8" />
              <div className="flex justify-between text-[10px] text-gray-600 pt-1">
                <span>{entity.actions} actions</span>
                <span>{entity.actions > 0 ? ((entity.successes / entity.actions) * 100).toFixed(0) : 0}% success</span>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isComplete) {
                resetScenario();
              } else if (running) {
                setRunning(false);
              } else {
                setRunning(true);
              }
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isComplete
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : running
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isComplete ? 'Reset' : running ? 'Pause' : currentStep === 0 ? 'Run Scenario' : 'Resume'}
          </button>
          {!running && !isComplete && (
            <button
              onClick={executeStep}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all"
            >
              Step
            </button>
          )}
          <div className="flex-1" />
          <span className="text-xs text-gray-600 font-mono">
            {currentStep}/{scenario.actions.length}
          </span>
          {/* Progress dots */}
          <div className="flex gap-1">
            {scenario.actions.map((a, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < currentStep
                    ? a.success ? 'bg-emerald-500' : 'bg-red-500'
                    : i === currentStep
                    ? 'bg-white/60 animate-pulse'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action log */}
        {log.length > 0 && (
          <div className="bg-gray-900/50 rounded-lg p-3 max-h-40 overflow-y-auto space-y-1">
            {log.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 font-mono w-4">{entry.tick}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${entry.success ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-gray-400">
                  <span className="text-gray-300 font-medium">
                    {entry.actor.charAt(0).toUpperCase() + entry.actor.slice(1)}
                  </span>
                  {' — '}
                  {entry.action}
                </span>
                <span className={`ml-auto font-mono ${entry.success ? 'text-emerald-500' : 'text-red-400'}`}>
                  {entry.result}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Completion insight */}
        {isComplete && (
          <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-lg p-4">
            <p className="text-sm text-emerald-300 font-medium mb-1">
              {selectedScenario === 0 && 'Consistent quality compounds trust exponentially.'}
              {selectedScenario === 1 && 'Betrayal destroys trust faster than cooperation builds it — the asymmetry is by design.'}
              {selectedScenario === 2 && 'Witnessing creates trust that outlives any single action.'}
            </p>
            <p className="text-xs text-gray-500">
              These are real calculations from the web4 trust engine, not animations.
              The same WASM module powers protocol conformance testing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
