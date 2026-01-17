# Adversarial Simulation Scenarios

## Testing Hostile, Deceptive, and Destructive Behaviors in 4-Life

Version: 1.0
Last Updated: 2026-01-17

---

## 1. Existing Simulation Infrastructure

### 1.1 Core Simulation Files

| File | Purpose | Adversarial Capability |
|------|---------|----------------------|
| `lib/game/agent_based_attack_simulation.py` | Attack ROI analysis | Quality inflation, challenge evasion |
| `lib/game/run_scale_test.py` | Multi-agent scenarios | 50% honest, 30% greedy, 20% adversarial mix |
| `lib/game/run_fault_injection_test.py` | Byzantine testing | Proposer attacks, conflicting messages |
| `lib/game/engine/federation_attack_analysis.py` | Attack vector DB | 15+ vectors, 7 categories |
| `lib/game/discover_edge_cases.py` | Parameter exploration | Stability boundaries, failure modes |
| `lib/game/ep_five_domain_multi_life.py` | Multi-domain testing | Cascade failures, frustration dynamics |

### 1.2 Agent Profile System

Current profiles in `run_scale_test.py`:
```python
# Agent distribution
HONEST = 0.50      # Play by rules
GREEDY = 0.30      # Maximize self-interest within rules
ADVERSARIAL = 0.20 # Actively attack system
```

### 1.3 Coherence Measurement

9-domain coherence tracking enables detection of:
- D1 (Physical): Spatial impossibility
- D2 (Social): Relationship violations
- D3 (Economic): ATP anomalies
- D4 (Attention): Focus collapse
- D5 (Trust): Confidence gating
- D6 (Narrative): Story coherence
- D7 (Temporal): Time inconsistencies
- D8 (Identity): Self-consistency
- D9 (Context): Grounding failures

---

## 2. Adversary Classification

### 2.1 By Entity Type

| Type | Description | Simulation Approach |
|------|-------------|---------------------|
| **AI Agent** | Autonomous misaligned optimizer | Parameterized agent with objective function |
| **Human Individual** | Single malicious actor | Single agent with specific attack behavior |
| **Human Collective** | Coordinated group | Multi-agent with shared controller |
| **Societal/Systemic** | Emergent adversarial dynamics | Environmental parameters, incentive structures |
| **Hybrid** | AI-human coordination | Mixed agent types with coordination protocol |

### 2.2 By Motivation

| Category | Goal | Simulation Parameter |
|----------|------|---------------------|
| **Extractive** | Gain without giving | `motivation="extract"`, `target_atp=X` |
| **Manipulative** | Distort trust | `motivation="manipulate"`, `trust_target=X` |
| **Destructive** | System destruction | `motivation="destroy"`, `chaos_factor=X` |
| **Subversive** | Undermine from within | `motivation="subvert"`, `patience=HIGH` |
| **Chaotic** | Maximize entropy | `motivation="chaos"`, `random_seed=X` |

---

## 3. Attack Simulation Recipes

### 3.1 Identity & Sybil Attacks

#### Basic Sybil Attack
```python
# scenarios/identity/sybil_basic.py
class SybilFarm:
    """Create coordinated Sybil identities controlled by single adversary."""

    def __init__(self, controller_id: str, num_sybils: int, atp_per_sybil: int = 1200):
        self.controller_id = controller_id
        self.sybils = []
        for i in range(num_sybils):
            sybil = Agent(
                id=f"sybil_{controller_id}_{i}",
                controller=controller_id,
                behavior="coordinated",
                atp_stake=atp_per_sybil
            )
            self.sybils.append(sybil)

    def execute_attack(self, target: str, attack_type: str):
        """Coordinate all sybils to attack target."""
        for sybil in self.sybils:
            if attack_type == "reputation_boost":
                sybil.endorse(target)
            elif attack_type == "reputation_attack":
                sybil.accuse(target)
            elif attack_type == "eclipse":
                sybil.position_near(target)
```

#### Identity Theft Simulation
```python
# scenarios/identity/identity_theft.py
class IdentityThief(Agent):
    """Adversary that attempts to take over legitimate identity."""

    def __init__(self, target_lct: str):
        self.target_lct = target_lct
        self.phase = "reconnaissance"  # reconnaissance | compromise | exploitation

    def act(self, context):
        if self.phase == "reconnaissance":
            # Gather information about target
            return self.observe_target_behavior(context)
        elif self.phase == "compromise":
            # Attempt credential theft
            return self.attempt_lct_compromise(context)
        elif self.phase == "exploitation":
            # Use stolen identity
            return self.act_as_target(context)
```

### 3.2 Trust & Reputation Attacks

#### Long-Con Attack (Patient Adversary)
```python
# scenarios/trust/long_con.py
class LongConAdversary(Agent):
    """Patient adversary that builds trust over 100+ cycles before exploitation."""

    def __init__(self, patience_cycles: int = 100, exploit_window: int = 10):
        self.patience_cycles = patience_cycles
        self.exploit_window = exploit_window
        self.current_phase = "building"  # building | exploiting | extracted
        self.cycles_in_phase = 0

    def act(self, context):
        self.cycles_in_phase += 1

        if self.current_phase == "building":
            if self.cycles_in_phase >= self.patience_cycles:
                self.current_phase = "exploiting"
                self.cycles_in_phase = 0
            return self.provide_genuine_value(context)  # Build real trust

        elif self.current_phase == "exploiting":
            if self.cycles_in_phase >= self.exploit_window:
                self.current_phase = "extracted"
            return self.exploit_trust(context)  # Cash out

        else:
            return self.exit_system()

    def provide_genuine_value(self, context):
        """Actually deliver quality to build legitimate trust."""
        return {"action": "deliver", "quality": 0.95, "honest": True}

    def exploit_trust(self, context):
        """Extract maximum value using accumulated trust."""
        return {"action": "deliver", "quality": 0.20, "claimed_quality": 0.95}
```

#### Collusion Ring
```python
# scenarios/trust/collusion_ring.py
class CollusionRing:
    """N agents that mutually inflate each other's trust scores."""

    def __init__(self, num_members: int, coordinator_id: str):
        self.members = []
        self.coordinator = coordinator_id
        for i in range(num_members):
            member = Agent(
                id=f"ring_{coordinator_id}_{i}",
                behavior="collusion"
            )
            self.members.append(member)

    def execute_round(self):
        """Each member endorses all other members."""
        endorsements = []
        for member in self.members:
            for other in self.members:
                if member.id != other.id:
                    endorsements.append({
                        "from": member.id,
                        "to": other.id,
                        "type": "endorse",
                        "quality_claimed": 0.95
                    })
        return endorsements

    def detect_metrics(self):
        """Metrics that should trigger detection."""
        return {
            "internal_endorsement_ratio": self._internal_ratio(),
            "external_endorsement_ratio": self._external_ratio(),
            "graph_clustering_coefficient": self._clustering()
        }
```

### 3.3 Destructive Attacks

#### Trust Nihilism (System Destruction)
```python
# scenarios/destruction/trust_nihilism.py
class TrustNihilist(Agent):
    """Agent that systematically destroys all trust relationships."""

    def __init__(self, target_strategy: str = "high_trust_first"):
        self.target_strategy = target_strategy
        self.accusations_made = []
        self.motivation = "destroy"  # Not extractive - wants system failure

    def act(self, context):
        """Make false accusations against all agents."""
        network = context.get_network_state()

        if self.target_strategy == "high_trust_first":
            targets = sorted(network.agents, key=lambda a: a.trust_score, reverse=True)
        elif self.target_strategy == "connected_first":
            targets = sorted(network.agents, key=lambda a: len(a.relationships), reverse=True)
        elif self.target_strategy == "random":
            targets = random.shuffle(list(network.agents))

        for target in targets:
            accusation = self.fabricate_accusation(target)
            self.accusations_made.append(accusation)
            yield {"action": "accuse", "target": target.id, "evidence": accusation}

    def fabricate_accusation(self, target):
        """Create plausible-looking false evidence."""
        return {
            "type": "quality_violation",
            "claimed_severity": 0.9,
            "fabricated_evidence": self._generate_fake_evidence(target)
        }
```

#### Cascade Triggering
```python
# scenarios/destruction/cascade_trigger.py
class CascadeTrigger(Agent):
    """Trigger cascading trust collapse through strategic violations."""

    def __init__(self, cascade_target: str = "critical_path"):
        self.cascade_target = cascade_target

    def identify_trigger_points(self, network):
        """Find nodes whose failure maximizes cascade."""
        if self.cascade_target == "critical_path":
            # Find nodes on most trust dependency paths
            return self._find_critical_path_nodes(network)
        elif self.cascade_target == "high_trust":
            # Violations by high-trust nodes hurt more
            return sorted(network.agents, key=lambda a: a.trust_score, reverse=True)[:3]
        elif self.cascade_target == "bridge_nodes":
            # Find nodes connecting otherwise separate clusters
            return self._find_bridge_nodes(network)

    def execute_cascade_attack(self, network):
        """Strategically violate trust to maximize cascade."""
        triggers = self.identify_trigger_points(network)

        for trigger_node in triggers:
            # Build relationship with trigger
            yield {"action": "build_trust", "target": trigger_node.id}

        # Then violate all at once for maximum cascade
        for trigger_node in triggers:
            yield {"action": "violate", "target": trigger_node.id, "severity": 1.0}
```

### 3.4 Coherence & Decoherence Attacks

#### Decoherence Injection
```python
# scenarios/coherence/decoherence_injection.py
class DecoherenceAttacker(Agent):
    """Injects noise to break phase alignment between agents."""

    def __init__(self, noise_correlation: float = 0.0, gamma: float = 0.1):
        self.noise_correlation = noise_correlation  # 0 = max decoherence, 1 = none
        self.gamma = gamma

    def inject_noise(self, relationship):
        """
        Lower correlation = more decoherence.
        From Synchronism: C(t) = e^{-(γ² × (1-c)) × t}
        """
        noise_a = random.gauss(0, 1)
        noise_b = noise_a * self.noise_correlation + \
                  random.gauss(0, 1) * math.sqrt(1 - self.noise_correlation**2)

        relationship.inject_phase_perturbation(noise_a, noise_b)

        expected_rate = self.gamma**2 * (1 - self.noise_correlation)
        return {
            "decoherence_rate": expected_rate,
            "time_to_50pct_coherence": math.log(2) / expected_rate if expected_rate > 0 else float('inf')
        }

    def attack_network(self, network, cycles: int = 100):
        """Systematically decohere all relationships."""
        results = []
        for cycle in range(cycles):
            for relationship in network.relationships:
                result = self.inject_noise(relationship)
                results.append(result)
        return results
```

---

## 4. Scenario Test Suites

### 4.1 Identity Attack Suite

```
adversarials/scenarios/identity/
├── sybil_basic.py          # Single controller, N identities
├── sybil_farm_scaled.py    # Mass identity creation (100-10000)
├── sybil_detection_test.py # Verify detection mechanisms work
├── identity_theft.py       # LCT takeover scenarios
└── reputation_inheritance.py # Trust transfer attacks
```

### 4.2 Trust Manipulation Suite

```
adversarials/scenarios/trust/
├── trust_inflation.py      # Build trust → exploit
├── long_con.py             # Patient adversary (100+ cycles)
├── collusion_ring.py       # N-agent mutual inflation
├── reputation_laundering.py # Multi-hop trust washing
└── pump_and_dump.py        # Quality burst → exploitation
```

### 4.3 Economic Attack Suite

```
adversarials/scenarios/economic/
├── atp_hoarding.py         # Market manipulation via accumulation
├── quality_inflation.py    # Claim high quality for mediocre work
├── resource_exhaustion.py  # DoS via request flooding
└── market_manipulation.py  # Pump-dump, liquidity attacks
```

### 4.4 Network Attack Suite

```
adversarials/scenarios/network/
├── eclipse_attack.py       # Isolate honest nodes
├── byzantine_consensus.py  # Malicious proposers
├── gossip_poisoning.py     # False information injection
└── partition_attack.py     # Network splitting
```

### 4.5 Destruction Attack Suite

```
adversarials/scenarios/destruction/
├── trust_nihilism.py       # Mass false accusations
├── reputation_holocaust.py # Coordinated smear campaigns
├── cascade_triggering.py   # Single violation → system collapse
└── governance_capture.py   # Decision-making subversion
```

---

## 5. Metrics to Capture

### 5.1 Attack Effectiveness

| Metric | Description | Target |
|--------|-------------|--------|
| Success Rate | % of attacks achieving goal | <5% for mitigated attacks |
| Detection Time | Cycles until attack detected | <10 for critical attacks |
| Damage Before Detection | Value extracted/destroyed | Minimize |
| Recovery Time | Cycles to return to normal | <50 cycles |

### 5.2 Defense Effectiveness

| Metric | Description | Target |
|--------|-------------|--------|
| True Positive Rate | Correctly identified attacks | >95% |
| False Positive Rate | Incorrectly flagged honest behavior | <1% |
| Cost to Attacker | ATP/resources required for attack | Maximize |
| Cost to Defender | Resources for defense | Minimize |

### 5.3 System Resilience

| Metric | Description | Target |
|--------|-------------|--------|
| Coherence Under Attack | CI during active attack | >0.7 |
| Trust Network Stability | % of relationships maintained | >90% |
| Economic Stability | ATP circulation variance | <20% |
| Recovery Completeness | Return to pre-attack state | >95% |

---

## 6. New Capabilities Needed

### 6.1 High Priority (P0)

| Capability | Purpose | Complexity |
|------------|---------|------------|
| **Long-horizon simulation** | Test patient adversaries (100+ cycles) | Medium |
| **Destruction motivation** | Agents that want system failure | Low |
| **Appeals process simulation** | Test false positive handling | High |
| **Multi-adversary coordination** | Test collusion detection | Medium |

### 6.2 Medium Priority (P1)

| Capability | Purpose | Complexity |
|------------|---------|------------|
| Network topology modeling | Eclipse attacks | High |
| ATP market dynamics | Economic manipulation | High |
| Governance simulation | Capture attacks | Very High |
| Recovery mechanisms | Post-attack resilience | Medium |

---

## 7. Integration with Existing Code

### 7.1 Extending Agent Profiles

Add to `lib/game/run_scale_test.py`:
```python
# Extended adversarial profiles
ADVERSARIAL_PROFILES = {
    "extractive": {"motivation": "extract", "patience": 10},
    "long_con": {"motivation": "extract", "patience": 100},
    "destroyer": {"motivation": "destroy", "patience": 0},
    "subversive": {"motivation": "subvert", "patience": 200},
    "chaotic": {"motivation": "chaos", "patience": 0}
}
```

### 7.2 Extending Coherence Tracking

The 9-domain coherence system already supports adversarial detection. Key integration points:
- D5 (Trust): Detect trust manipulation
- D3 (Economic): Detect ATP anomalies
- D2 (Social): Detect relationship inconsistencies

---

## References

- `lib/game/agent_based_attack_simulation.py` - Existing attack simulation
- `lib/game/run_scale_test.py` - Agent profile system
- `lib/game/engine/federation_attack_analysis.py` - Attack vector database
- `src/app/threat-model/page.tsx` - Documented threat model
- `src/app/coherence-index/page.tsx` - Coherence tracking
