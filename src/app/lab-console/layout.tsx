import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Lab Console — Web4 Simulation Engine | 4-Life",
  description:
    "Run Web4 society simulations in real-time: EP closed loop, maturation demo, five-domain coherence, multi-life cycles, and one-life scenarios.",
  openGraph: {
    title: "Lab Console: Web4 Simulation Engine",
    description:
      "Real-time simulations of Web4 societies with multiple modes and configurations.",
  },
};

export default function LabConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
