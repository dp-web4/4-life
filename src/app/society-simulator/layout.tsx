import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Society Simulator — Multi-Agent Trust Dynamics | 4-Life",
  description:
    "Watch 12 agents with different strategies form alliances, betray each other, and self-organize. No central authority — just trust dynamics at society scale.",
  openGraph: {
    title: "Society Simulator",
    description:
      "Watch agents form alliances and self-organize through trust dynamics. Play as an agent yourself.",
  },
};

export default function SocietySimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
