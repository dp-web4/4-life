import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Data Explorer — Browse Simulation Datasets | 4-Life",
  description:
    "Browse, inspect, and compare all Web4 simulation datasets. Discover patterns across 9 JSON datasets covering single-agent, multi-agent, policy, and maturation scenarios.",
  openGraph: {
    title: "Data Explorer: Browse Simulation Datasets",
    description:
      "Discover and inspect all Web4 simulation data in one unified browser.",
  },
};

export default function DataExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
