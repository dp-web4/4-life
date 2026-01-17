# Adversarial Simulation Framework

## Testing Hostile Behaviors in 4-Life

This directory contains adversarial simulation scenarios for testing system robustness against hostile, deceptive, and destructive agents.

---

## Documents

### [SIMULATION_SCENARIOS.md](./SIMULATION_SCENARIOS.md)
Comprehensive guide to simulating adversarial behaviors.

**Contents**:
- Adversary classification (entity type, motivation)
- Attack simulation recipes with code
- Scenario test suites (5 categories, 20+ scenarios)
- Metrics to capture
- Integration with existing 4-life infrastructure

---

## Quick Start

### Run Existing Adversarial Tests

```bash
# Scale test with 20% adversarial agents
python lib/game/run_scale_test.py

# Byzantine fault injection
python lib/game/run_fault_injection_test.py

# Attack simulation with ROI analysis
python lib/game/agent_based_attack_simulation.py
```

### Create New Adversarial Scenario

```python
# adversarials/scenarios/my_attack.py
from lib.game.base_agent import Agent

class MyAdversary(Agent):
    def __init__(self, motivation="extract"):
        self.motivation = motivation

    def act(self, context):
        # Your attack logic here
        pass
```

---

## Adversary Types

| Type | Description | Key Scenarios |
|------|-------------|---------------|
| **Extractive** | Gain without giving value | Quality inflation, ATP drain |
| **Manipulative** | Distort trust/reputation | Long-con, collusion rings |
| **Destructive** | System destruction | Trust nihilism, cascades |
| **Subversive** | Undermine from within | Governance capture |
| **Chaotic** | Maximize entropy | Random attacks |

## Attack Categories

| Category | Scenarios | Existing Coverage |
|----------|-----------|-------------------|
| Identity/Sybil | 5 | Good |
| Trust Manipulation | 5 | Partial |
| Economic | 4 | Partial |
| Network | 4 | Good |
| Destruction | 4 | **Gap** |

---

## Key Gaps to Address

1. **Long-horizon attacks** - Patient adversaries (100+ cycles)
2. **Destruction motivation** - Agents wanting system failure (not just extraction)
3. **Appeals process** - How system handles false positives
4. **Societal dynamics** - Emergent adversarial behavior at scale

---

## Integration Points

| File | How It Integrates |
|------|-------------------|
| `lib/game/run_scale_test.py` | Add adversarial profiles |
| `lib/game/discover_edge_cases.py` | Parameter sweep for attack boundaries |
| `src/app/coherence-index/` | Detection via 9-domain coherence |
| `src/app/threat-model/` | Document new findings |

---

## Metrics

### Attack Effectiveness
- Success rate (<5% target for mitigated)
- Detection time (<10 cycles for critical)
- Damage before detection (minimize)

### System Resilience
- Coherence under attack (>0.7 target)
- Trust network stability (>90%)
- Recovery completeness (>95%)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-17 | Initial framework |
