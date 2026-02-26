import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Simulation Stories — AI-Generated Narratives | 4-Life",
  description:
    "Read auto-generated stories from Web4 society simulations. Trust dynamics, coalition politics, and agent journeys told through narrative.",
  openGraph: {
    title: "Simulation Stories",
    description:
      "AI-generated narratives from Web4 society simulations.",
  },
};

export default function NarrativesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
