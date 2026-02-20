"use client";

import { useState } from "react";

/**
 * PlaygroundControls - Interactive parameter configuration UI
 *
 * Provides sliders and inputs for all playground simulation parameters,
 * organized into logical groups with descriptions.
 *
 * Session #12: Interactive Parameter Playground
 */

export interface PlaygroundConfig {
  // Agent initial conditions
  initial_atp: number;
  initial_trust: number;

  // Action costs/rewards
  action_cost_low: number;
  action_cost_medium: number;
  action_cost_high: number;
  action_reward_low: number;
  action_reward_medium: number;
  action_reward_high: number;

  // Trust dynamics
  trust_gain_good: number;
  trust_loss_bad: number;
  trust_threshold_death: number;

  // Rebirth karma
  karma_atp_bonus: number;
  karma_trust_boost: number;

  // Simulation parameters
  num_lives: number;
  ticks_per_life: number;
  risk_appetite: number;
}

const DEFAULT_CONFIG: PlaygroundConfig = {
  initial_atp: 100.0,
  initial_trust: 0.5,
  action_cost_low: 5.0,
  action_cost_medium: 15.0,
  action_cost_high: 30.0,
  action_reward_low: 8.0,
  action_reward_medium: 20.0,
  action_reward_high: 45.0,
  trust_gain_good: 0.05,
  trust_loss_bad: 0.08,
  trust_threshold_death: 0.2,
  karma_atp_bonus: 40.0,
  karma_trust_boost: 0.1,
  num_lives: 3,
  ticks_per_life: 15,
  risk_appetite: 0.5,
};

interface ParameterSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  description?: string;
}

function ParameterSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  description,
}: ParameterSliderProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
        <label style={{ fontSize: "0.875rem", color: "#d1d5db" }}>{label}</label>
        <span style={{ fontSize: "0.875rem", color: "#38bdf8", fontFamily: "monospace" }}>
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "3px",
          background: "#374151",
          outline: "none",
          opacity: 0.9,
        }}
      />
      {description && (
        <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
          {description}
        </p>
      )}
    </div>
  );
}

interface PlaygroundControlsProps {
  onRunSimulation: (config: PlaygroundConfig) => void;
  isRunning: boolean;
}

export function PlaygroundControls({ onRunSimulation, isRunning }: PlaygroundControlsProps) {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateConfig = (field: keyof PlaygroundConfig, value: number) => {
    setConfig({ ...config, [field]: value });
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#1f2937", borderRadius: "8px" }}>
      <h3 style={{ marginBottom: "1rem", color: "#f3f4f6" }}>Simulation Parameters</h3>

      {/* Basic Parameters */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
          SIMULATION SETTINGS
        </h4>
        <ParameterSlider
          label="Number of Lives"
          value={config.num_lives}
          onChange={(v) => updateConfig("num_lives", v)}
          min={1}
          max={10}
          step={1}
          description="How many life cycles to simulate"
        />
        <ParameterSlider
          label="Ticks per Life"
          value={config.ticks_per_life}
          onChange={(v) => updateConfig("ticks_per_life", v)}
          min={5}
          max={30}
          step={1}
          description="Each tick = one action/decision. More ticks = longer lives"
        />
        <ParameterSlider
          label="Risk Appetite"
          value={config.risk_appetite}
          onChange={(v) => updateConfig("risk_appetite", v)}
          min={0}
          max={1}
          step={0.1}
          description="0 = safe, cautious actions only. 1 = high-stakes gambles with bigger rewards"
        />
      </section>

      {/* Initial Conditions */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
          INITIAL CONDITIONS
        </h4>
        <ParameterSlider
          label="Starting ATP"
          value={config.initial_atp}
          onChange={(v) => updateConfig("initial_atp", v)}
          min={20}
          max={200}
          step={10}
          description="ATP budget at birth (metabolic energy)"
        />
        <ParameterSlider
          label="Starting Trust"
          value={config.initial_trust}
          onChange={(v) => updateConfig("initial_trust", v)}
          min={0}
          max={1}
          step={0.05}
          description="Trust score at birth (0 = untrusted, 1 = fully trusted)"
        />
      </section>

      {/* Karma System */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
          REBIRTH KARMA
        </h4>
        <p style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "0.75rem" }}>
          How much an agent&apos;s past life affects their next one. Good behavior compounds; bad behavior haunts.
        </p>
        <ParameterSlider
          label="ATP Karma Bonus"
          value={config.karma_atp_bonus}
          onChange={(v) => updateConfig("karma_atp_bonus", v)}
          min={0}
          max={100}
          step={5}
          description="ATP bonus/penalty based on previous life's trust"
        />
        <ParameterSlider
          label="Trust Karma Boost"
          value={config.karma_trust_boost}
          onChange={(v) => updateConfig("karma_trust_boost", v)}
          min={0}
          max={0.3}
          step={0.05}
          description="Trust boost for high-performing rebirths"
        />
      </section>

      {/* Advanced Parameters */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        style={{
          fontSize: "0.875rem",
          color: "#38bdf8",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "0.75rem",
        }}
      >
        {showAdvanced ? "▼" : "▶"} Advanced Parameters
      </button>

      {showAdvanced && (
        <>
          <section style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
              ACTION COSTS
            </h4>
            <ParameterSlider
              label="Low-Cost Action"
              value={config.action_cost_low}
              onChange={(v) => updateConfig("action_cost_low", v)}
              min={1}
              max={20}
              step={1}
              description="ATP cost for safe actions (observe, wait)"
            />
            <ParameterSlider
              label="Medium-Cost Action"
              value={config.action_cost_medium}
              onChange={(v) => updateConfig("action_cost_medium", v)}
              min={5}
              max={40}
              step={1}
              description="ATP cost for moderate actions (collaborate, message)"
            />
            <ParameterSlider
              label="High-Cost Action"
              value={config.action_cost_high}
              onChange={(v) => updateConfig("action_cost_high", v)}
              min={10}
              max={80}
              step={1}
              description="ATP cost for risky actions (broadcast, challenge)"
            />
          </section>

          <section style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
              ACTION REWARDS
            </h4>
            <ParameterSlider
              label="Low-Risk Reward"
              value={config.action_reward_low}
              onChange={(v) => updateConfig("action_reward_low", v)}
              min={0}
              max={30}
              step={1}
              description="ATP reward for successful low-cost actions"
            />
            <ParameterSlider
              label="Medium-Risk Reward"
              value={config.action_reward_medium}
              onChange={(v) => updateConfig("action_reward_medium", v)}
              min={5}
              max={50}
              step={1}
              description="ATP reward for successful medium-cost actions"
            />
            <ParameterSlider
              label="High-Risk Reward"
              value={config.action_reward_high}
              onChange={(v) => updateConfig("action_reward_high", v)}
              min={10}
              max={100}
              step={5}
              description="ATP reward for successful high-cost actions"
            />
          </section>

          <section style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
              TRUST DYNAMICS
            </h4>
            <ParameterSlider
              label="Trust Gain (Success)"
              value={config.trust_gain_good}
              onChange={(v) => updateConfig("trust_gain_good", v)}
              min={0}
              max={0.2}
              step={0.01}
              description="How much trust increases after successful actions"
            />
            <ParameterSlider
              label="Trust Loss (Failure)"
              value={config.trust_loss_bad}
              onChange={(v) => updateConfig("trust_loss_bad", v)}
              min={0}
              max={0.2}
              step={0.01}
              description="How much trust decreases after failed actions"
            />
            <ParameterSlider
              label="Death Threshold"
              value={config.trust_threshold_death}
              onChange={(v) => updateConfig("trust_threshold_death", v)}
              min={0}
              max={0.5}
              step={0.05}
              description="Minimum trust required to stay alive"
            />
          </section>
        </>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
        <button
          onClick={() => onRunSimulation(config)}
          disabled={isRunning}
          style={{
            flex: 1,
            padding: "0.75rem",
            backgroundColor: isRunning ? "#374151" : "#38bdf8",
            color: isRunning ? "#9ca3af" : "#0f172a",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
          }}
        >
          {isRunning ? "Running..." : "Run Simulation"}
        </button>
        <button
          onClick={resetToDefaults}
          style={{
            padding: "0.75rem",
            backgroundColor: "#374151",
            color: "#d1d5db",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Reset
        </button>
      </div>

      {/* Quick Presets */}
      <section style={{ marginTop: "1.5rem" }}>
        <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
          QUICK PRESETS
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <button
            onClick={() =>
              setConfig({
                ...DEFAULT_CONFIG,
                initial_atp: 150,
                karma_atp_bonus: 60,
                action_reward_high: 60,
              })
            }
            style={{
              padding: "0.5rem",
              backgroundColor: "#1f2937",
              color: "#d1d5db",
              border: "1px solid #374151",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Easy Mode
          </button>
          <button
            onClick={() =>
              setConfig({
                ...DEFAULT_CONFIG,
                initial_atp: 70,
                karma_atp_bonus: 20,
                action_cost_high: 40,
              })
            }
            style={{
              padding: "0.5rem",
              backgroundColor: "#1f2937",
              color: "#d1d5db",
              border: "1px solid #374151",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Hard Mode
          </button>
          <button
            onClick={() => setConfig({ ...DEFAULT_CONFIG, risk_appetite: 0.1 })}
            style={{
              padding: "0.5rem",
              backgroundColor: "#1f2937",
              color: "#d1d5db",
              border: "1px solid #374151",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Risk-Averse
          </button>
          <button
            onClick={() => setConfig({ ...DEFAULT_CONFIG, risk_appetite: 0.9 })}
            style={{
              padding: "0.5rem",
              backgroundColor: "#1f2937",
              color: "#d1d5db",
              border: "1px solid #374151",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            Risk-Seeking
          </button>
        </div>
      </section>
    </div>
  );
}
