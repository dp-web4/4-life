import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Your First Simulation — Guided Walkthrough | 4-Life",
  description:
    "A 5-minute guided experience: watch trust evolve, agents cooperate, and Web4 dynamics emerge. No background needed.",
  openGraph: {
    title: "Your First Simulation",
    description:
      "Watch trust evolve in a 5-minute guided walkthrough of Web4 dynamics.",
  },
};

export default function FirstSimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
