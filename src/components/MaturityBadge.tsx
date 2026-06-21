// MaturityBadge — answers "is this real?" at a glance, site-wide.
// Spec = defined in the Web4 ontology. Reference = built + runnable reference
// implementation (web4-core, the hub MVP). Running = deployed and operational today
// (hestia). A concept can carry several. Tier honesty is a UI primitive: if something
// is Spec-only, badge it Spec — don't let enthusiasm re-introduce over-claiming.

export type MaturityTier = "spec" | "reference" | "running";

const TIERS: Record<MaturityTier, { label: string; cls: string; title: string }> = {
  spec: {
    label: "Spec",
    cls: "border-sky-500/40 bg-sky-500/10 text-sky-300",
    title: "Specified — defined in the Web4 ontology / standard",
  },
  reference: {
    label: "Reference",
    cls: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    title: "Reference implementation — built and runnable (web4-core, the hub MVP)",
  },
  running: {
    label: "Running",
    cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    title: "Running — deployed and operational today (hestia)",
  },
};

export default function MaturityBadge({ tier }: { tier: MaturityTier }) {
  const t = TIERS[tier];
  return (
    <span
      title={t.title}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${t.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {t.label}
    </span>
  );
}

// Convenience: render a row of tiers, e.g. <MaturityBadges tiers={["spec","reference","running"]} />
export function MaturityBadges({ tiers }: { tiers: MaturityTier[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {tiers.map((t) => (
        <MaturityBadge key={t} tier={t} />
      ))}
    </span>
  );
}
