/**
 * Decision Evolution Visualization
 *
 * Shows how agent decision-making improves across multiple lives through
 * Epistemic Proprioception (EP) - learning what you know.
 *
 * Philosophy:
 * - EP is invisible meta-cognition UNLESS you show decision quality evolution
 * - Humans understand "getting better at something" intuitively
 * - Compare similar situations across lives to reveal learning
 * - Show BOTH what improved AND what stayed problematic
 *
 * This component makes EP learning comprehensible by showing:
 * 1. Decision quality metrics (efficiency, risk management, trust maintenance)
 * 2. Life-by-life comparison of similar decisions
 * 3. Pattern recognition improvements
 * 4. Meta-cognitive maturity progression
 */

'use client'

import React, { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'

// ============================================================================
// Types
// ============================================================================

interface ActionRecord {
  action_type: string
  atp_before: number
  atp_after: number
  atp_cost: number
  trust_before: number
  trust_after: number
  reason: string
  world_tick: number
  life_id: string
}

interface LifeData {
  life_id: string
  life_number: number
  actions: ActionRecord[]
}

interface DecisionMetrics {
  life_number: number
  atp_efficiency: number // ATP gained per cost spent
  risk_management: number // % of decisions that didn't crash ATP
  trust_maintenance: number // Net trust change
  survival_duration: number // How many ticks survived
  decision_wisdom: number // Composite quality score (0-1)
}

interface DecisionPattern {
  situation: string
  life1_decision?: string
  life2_decision?: string
  life3_decision?: string
  improvement: 'better' | 'worse' | 'same'
  explanation: string
}

export interface DecisionEvolutionProps {
  lives: LifeData[]
  className?: string
}

// ============================================================================
// Metrics Calculator
// ============================================================================

function calculateLifeMetrics(life: LifeData): DecisionMetrics {
  const actions = life.actions
  if (actions.length === 0) {
    return {
      life_number: life.life_number,
      atp_efficiency: 0,
      risk_management: 0,
      trust_maintenance: 0,
      survival_duration: 0,
      decision_wisdom: 0,
    }
  }

  // ATP efficiency: How much value gained relative to cost
  const totalCost = actions.reduce((sum, a) => sum + a.atp_cost, 0)
  const startATP = actions[0].atp_before
  const endATP = actions[actions.length - 1].atp_after
  const atpEfficiency = totalCost > 0 ? (endATP - startATP + totalCost) / totalCost : 0

  // Risk management: % of non-crisis decisions
  const crisisDecisions = actions.filter(a => a.atp_after < 20).length
  const riskManagement = 1 - (crisisDecisions / actions.length)

  // Trust maintenance: Net trust change
  const startTrust = actions[0].trust_before
  const endTrust = actions[actions.length - 1].trust_after
  const trustMaintenance = endTrust - startTrust

  // Survival duration: Number of ticks
  const survivalDuration = actions.length

  // Decision wisdom: Composite score (0-1)
  // Factors: efficiency (0.3), risk management (0.3), trust (0.2), survival (0.2)
  const normalizedEfficiency = Math.max(0, Math.min(1, atpEfficiency / 2))
  const normalizedTrust = Math.max(0, Math.min(1, (trustMaintenance + 0.5) / 1.0))
  const normalizedSurvival = Math.min(1, survivalDuration / 15)

  const decisionWisdom =
    normalizedEfficiency * 0.3 +
    riskManagement * 0.3 +
    normalizedTrust * 0.2 +
    normalizedSurvival * 0.2

  return {
    life_number: life.life_number,
    atp_efficiency: atpEfficiency,
    risk_management: riskManagement,
    trust_maintenance: trustMaintenance,
    survival_duration: survivalDuration,
    decision_wisdom: decisionWisdom,
  }
}

// ============================================================================
// Pattern Detector
// ============================================================================

function detectDecisionPatterns(lives: LifeData[]): DecisionPattern[] {
  const patterns: DecisionPattern[] = []

  // Pattern 1: High ATP decisions (what do they do when resources are abundant?)
  const highATPDecisions = lives.map(life => {
    const highATPActions = life.actions.filter(a => a.atp_before > 70)
    if (highATPActions.length === 0) return null
    const riskiness = highATPActions.filter(a => a.atp_cost > 20).length / highATPActions.length
    return { life: life.life_number, riskiness, action: highATPActions[0] }
  }).filter(d => d !== null)

  if (highATPDecisions.length >= 2) {
    const improvement =
      highATPDecisions[highATPDecisions.length - 1]!.riskiness <
      highATPDecisions[0]!.riskiness
        ? 'better'
        : highATPDecisions[highATPDecisions.length - 1]!.riskiness >
          highATPDecisions[0]!.riskiness
        ? 'worse'
        : 'same'

    patterns.push({
      situation: 'High ATP (abundant resources)',
      life1_decision: highATPDecisions[0]?.action.reason,
      life2_decision: highATPDecisions[1]?.action.reason,
      life3_decision: highATPDecisions[2]?.action.reason,
      improvement,
      explanation:
        improvement === 'better'
          ? 'Agent learned to be more conservative even when resources are high'
          : improvement === 'worse'
          ? 'Agent became more reckless with abundance'
          : 'Agent maintained similar risk appetite',
    })
  }

  // Pattern 2: Low ATP decisions (crisis management)
  const lowATPDecisions = lives.map(life => {
    const lowATPActions = life.actions.filter(a => a.atp_before < 30 && a.atp_before > 10)
    if (lowATPActions.length === 0) return null
    const conservatism = lowATPActions.filter(
      a => a.action_type.includes('audit') || a.atp_cost < 10
    ).length / lowATPActions.length
    return { life: life.life_number, conservatism, action: lowATPActions[0] }
  }).filter(d => d !== null)

  if (lowATPDecisions.length >= 2) {
    const improvement =
      lowATPDecisions[lowATPDecisions.length - 1]!.conservatism >
      lowATPDecisions[0]!.conservatism
        ? 'better'
        : lowATPDecisions[lowATPDecisions.length - 1]!.conservatism <
          lowATPDecisions[0]!.conservatism
        ? 'worse'
        : 'same'

    patterns.push({
      situation: 'Low ATP (resource crisis)',
      life1_decision: lowATPDecisions[0]?.action.reason,
      life2_decision: lowATPDecisions[1]?.action.reason,
      life3_decision: lowATPDecisions[2]?.action.reason,
      improvement,
      explanation:
        improvement === 'better'
          ? 'Agent learned better crisis management - more conservative when vulnerable'
          : improvement === 'worse'
          ? 'Agent crisis management degraded'
          : 'Agent crisis management stayed consistent',
    })
  }

  // Pattern 3: Trust management
  const trustManagement = lives.map(life => {
    const trustGainingActions = life.actions.filter(a => a.trust_after > a.trust_before).length
    const trustLosingActions = life.actions.filter(a => a.trust_after < a.trust_before).length
    const netTrust = life.actions[life.actions.length - 1]?.trust_after - life.actions[0]?.trust_before
    return { life: life.life_number, trustGainingActions, trustLosingActions, netTrust }
  })

  if (trustManagement.length >= 2) {
    const firstNet = trustManagement[0].netTrust
    const lastNet = trustManagement[trustManagement.length - 1].netTrust
    const improvement = lastNet > firstNet ? 'better' : lastNet < firstNet ? 'worse' : 'same'

    patterns.push({
      situation: 'Trust management overall',
      life1_decision: `Net trust: ${trustManagement[0].netTrust.toFixed(3)}`,
      life2_decision: trustManagement[1] ? `Net trust: ${trustManagement[1].netTrust.toFixed(3)}` : undefined,
      life3_decision: trustManagement[2] ? `Net trust: ${trustManagement[2].netTrust.toFixed(3)}` : undefined,
      improvement,
      explanation:
        improvement === 'better'
          ? 'Agent learned behaviors that build trust over time'
          : improvement === 'worse'
          ? 'Agent trust management degraded'
          : 'Agent maintained trust levels consistently',
    })
  }

  return patterns
}

// ============================================================================
// Component
// ============================================================================

export default function DecisionEvolution({ lives, className = '' }: DecisionEvolutionProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']))

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  // Calculate metrics for each life
  const metricsPerLife = useMemo(() => lives.map(calculateLifeMetrics), [lives])

  // Detect decision patterns
  const patterns = useMemo(() => detectDecisionPatterns(lives), [lives])

  // Calculate overall improvement
  const overallImprovement = useMemo(() => {
    if (metricsPerLife.length < 2) return null
    const first = metricsPerLife[0]
    const last = metricsPerLife[metricsPerLife.length - 1]
    return {
      wisdom: ((last.decision_wisdom - first.decision_wisdom) / first.decision_wisdom) * 100,
      efficiency: ((last.atp_efficiency - first.atp_efficiency) / first.atp_efficiency) * 100,
      survival: ((last.survival_duration - first.survival_duration) / first.survival_duration) * 100,
    }
  }, [metricsPerLife])

  if (lives.length === 0) {
    return (
      <div className={`rounded-lg border border-gray-700 bg-gray-800 p-6 ${className}`}>
        <p className="text-gray-400">No life data available for decision evolution analysis.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overview Section */}
      <section className="rounded-lg border border-gray-700 bg-gray-800">
        <button
          onClick={() => toggleSection('overview')}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-750"
        >
          <h3 className="text-lg font-semibold text-gray-100">
            📊 Decision Evolution Overview
          </h3>
          {expandedSections.has('overview') ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('overview') && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              This shows how the agent&apos;s decision-making improved across {lives.length} lives through{' '}
              <strong>Epistemic Proprioception (EP)</strong> - learning what it knows.
            </p>

            {overallImprovement && (
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="text-xs text-gray-400 mb-1">Decision Wisdom</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      overallImprovement.wisdom > 0 ? 'text-green-400' :
                      overallImprovement.wisdom < 0 ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {overallImprovement.wisdom > 0 ? '+' : ''}
                      {overallImprovement.wisdom.toFixed(1)}%
                    </span>
                    {overallImprovement.wisdom > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : overallImprovement.wisdom < 0 ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="text-xs text-gray-400 mb-1">ATP Efficiency</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      overallImprovement.efficiency > 0 ? 'text-green-400' :
                      overallImprovement.efficiency < 0 ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {overallImprovement.efficiency > 0 ? '+' : ''}
                      {overallImprovement.efficiency.toFixed(1)}%
                    </span>
                    {overallImprovement.efficiency > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : overallImprovement.efficiency < 0 ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-gray-900 p-3">
                  <div className="text-xs text-gray-400 mb-1">Survival Duration</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${
                      overallImprovement.survival > 0 ? 'text-green-400' :
                      overallImprovement.survival < 0 ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {overallImprovement.survival > 0 ? '+' : ''}
                      {overallImprovement.survival.toFixed(1)}%
                    </span>
                    {overallImprovement.survival > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : overallImprovement.survival < 0 ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Metrics Comparison Section */}
      <section className="rounded-lg border border-gray-700 bg-gray-800">
        <button
          onClick={() => toggleSection('metrics')}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-750"
        >
          <h3 className="text-lg font-semibold text-gray-100">
            📈 Life-by-Life Metrics
          </h3>
          {expandedSections.has('metrics') ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('metrics') && (
          <div className="border-t border-gray-700 p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-3 py-2 text-left text-gray-400 font-medium">Life</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium">Decision Wisdom</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium">ATP Efficiency</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium">Risk Management</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium">Trust Change</th>
                    <th className="px-3 py-2 text-left text-gray-400 font-medium">Survival</th>
                  </tr>
                </thead>
                <tbody>
                  {metricsPerLife.map((metrics, index) => (
                    <tr key={metrics.life_number} className="border-b border-gray-700 last:border-0">
                      <td className="px-3 py-2 text-gray-300 font-medium">Life {metrics.life_number}</td>
                      <td className="px-3 py-2">
                        <span className={`font-mono ${
                          index > 0 && metrics.decision_wisdom > metricsPerLife[index - 1].decision_wisdom
                            ? 'text-green-400'
                            : index > 0 && metrics.decision_wisdom < metricsPerLife[index - 1].decision_wisdom
                            ? 'text-red-400'
                            : 'text-gray-300'
                        }`}>
                          {metrics.decision_wisdom.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`font-mono ${
                          index > 0 && metrics.atp_efficiency > metricsPerLife[index - 1].atp_efficiency
                            ? 'text-green-400'
                            : index > 0 && metrics.atp_efficiency < metricsPerLife[index - 1].atp_efficiency
                            ? 'text-red-400'
                            : 'text-gray-300'
                        }`}>
                          {metrics.atp_efficiency.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`font-mono ${
                          index > 0 && metrics.risk_management > metricsPerLife[index - 1].risk_management
                            ? 'text-green-400'
                            : index > 0 && metrics.risk_management < metricsPerLife[index - 1].risk_management
                            ? 'text-red-400'
                            : 'text-gray-300'
                        }`}>
                          {(metrics.risk_management * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`font-mono ${
                          metrics.trust_maintenance > 0 ? 'text-green-400' :
                          metrics.trust_maintenance < 0 ? 'text-red-400' :
                          'text-gray-300'
                        }`}>
                          {metrics.trust_maintenance > 0 ? '+' : ''}
                          {metrics.trust_maintenance.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <span className={`font-mono ${
                          index > 0 && metrics.survival_duration > metricsPerLife[index - 1].survival_duration
                            ? 'text-green-400'
                            : index > 0 && metrics.survival_duration < metricsPerLife[index - 1].survival_duration
                            ? 'text-red-400'
                            : 'text-gray-300'
                        }`}>
                          {metrics.survival_duration} ticks
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-gray-400 space-y-1">
              <p><strong>Decision Wisdom</strong>: Composite quality score (0-1) combining efficiency, risk, trust, survival</p>
              <p><strong>ATP Efficiency</strong>: Value generated per ATP spent</p>
              <p><strong>Risk Management</strong>: Percentage of decisions that avoided crisis</p>
              <p><strong>Trust Change</strong>: Net trust gained/lost during life</p>
            </div>
          </div>
        )}
      </section>

      {/* Decision Patterns Section */}
      <section className="rounded-lg border border-gray-700 bg-gray-800">
        <button
          onClick={() => toggleSection('patterns')}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-750"
        >
          <h3 className="text-lg font-semibold text-gray-100">
            🧩 Decision Patterns Across Lives
          </h3>
          {expandedSections.has('patterns') ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('patterns') && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            {patterns.length === 0 ? (
              <p className="text-gray-400 text-sm">Not enough data to detect patterns.</p>
            ) : (
              patterns.map((pattern, index) => (
                <div key={index} className="rounded-lg bg-gray-900 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-100">{pattern.situation}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      pattern.improvement === 'better' ? 'bg-green-900 text-green-300' :
                      pattern.improvement === 'worse' ? 'bg-red-900 text-red-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {pattern.improvement === 'better' ? 'Improved' :
                       pattern.improvement === 'worse' ? 'Degraded' :
                       'Stable'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    {pattern.life1_decision && (
                      <div className="text-sm">
                        <span className="text-gray-400 font-medium">Life 1:</span>{' '}
                        <span className="text-gray-300 italic">&quot;{pattern.life1_decision}&quot;</span>
                      </div>
                    )}
                    {pattern.life2_decision && (
                      <div className="text-sm">
                        <span className="text-gray-400 font-medium">Life 2:</span>{' '}
                        <span className="text-gray-300 italic">&quot;{pattern.life2_decision}&quot;</span>
                      </div>
                    )}
                    {pattern.life3_decision && (
                      <div className="text-sm">
                        <span className="text-gray-400 font-medium">Life 3:</span>{' '}
                        <span className="text-gray-300 italic">&quot;{pattern.life3_decision}&quot;</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-400">{pattern.explanation}</p>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      {/* Learning Insights Section */}
      <section className="rounded-lg border border-gray-700 bg-gray-800">
        <button
          onClick={() => toggleSection('insights')}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-750"
        >
          <h3 className="text-lg font-semibold text-gray-100">
            💡 What This Shows About EP Learning
          </h3>
          {expandedSections.has('insights') ? (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {expandedSections.has('insights') && (
          <div className="border-t border-gray-700 p-4 space-y-3 text-sm text-gray-300">
            <p>
              <strong className="text-gray-100">Epistemic Proprioception (EP)</strong> is meta-cognition:
              knowing what you know, and knowing what you don&apos;t know.
            </p>
            <p>
              When an agent dies and is reborn, it doesn&apos;t remember specific events, but it{' '}
              <strong>carries forward learned patterns</strong> about what decisions work in different situations.
            </p>
            <p>
              This visualization shows that learning in action:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Decision Wisdom</strong> increasing = agent making smarter choices</li>
              <li><strong>Pattern changes</strong> = agent recognizing similar situations and adjusting strategy</li>
              <li><strong>Survival duration</strong> improving = consequences of better decisions</li>
            </ul>
            <p className="pt-2 border-t border-gray-700 text-gray-400">
              EP makes it possible for agents to{' '}
              <strong className="text-gray-300">learn across lives without memory</strong> - they develop
              intuition about what works through pattern recognition, similar to how humans develop expertise.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
