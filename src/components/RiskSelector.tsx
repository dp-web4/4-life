'use client';

const RISKS = [
  { label: 'Nobody uses it', id: 'risk-adoption' },
  { label: 'Hardware lock-in', id: 'risk-gatekeepers' },
  { label: 'Unfair penalties', id: 'risk-threshold' },
  { label: 'Rich people cheat', id: 'risk-gaming' },
  { label: 'Lose my device', id: 'risk-hardware-loss' },
  { label: 'Witnesses go bad', id: 'risk-witnesses' },
  { label: 'Doesn\'t scale', id: 'risk-scale' },
  { label: 'Excludes disabled users', id: 'risk-accessibility' },
  // Jul-31: this list is the register's index and is hardcoded, so a risk added to the page
  // without an entry here is invisible to anyone using the jump buttons. Keep it in sync with
  // the numbered cards in what-could-go-wrong/page.tsx.
  { label: 'The agent ignores the rules', id: 'risk-gate-bypass' },
];

export default function RiskSelector() {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="mt-6 mb-2">
      <p className="text-gray-500 text-sm mb-3">What concerns you most? Jump to that risk:</p>
      <div className="flex flex-wrap gap-2">
        {RISKS.map((r) => (
          <button
            key={r.id}
            onClick={() => handleClick(r.id)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
