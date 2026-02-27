import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Simulation Sandbox — Full-Control Web4 Experiments | 4-Life",
  description:
    "Full-control Web4 simulation with all parameters exposed. 4 presets, animated trust/ATP/coherence charts, event timeline, multi-run comparison, and exportable results.",
  openGraph: {
    title: "Simulation Sandbox: Full-Control Web4 Experiments",
    description:
      "Run custom Web4 simulations with all parameters exposed and animated visualizations.",
  },
};

export default function SimulationSandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
