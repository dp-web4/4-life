import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Challenge Set — Research Prompts for Web4 | 4-Life",
  description:
    "5 research challenges for testing Web4 mechanics: ATP extraction attacks, collusion ring detection, coherence boundary cases, T3 Goodharting, and false positive recovery.",
  openGraph: {
    title: "Web4 Challenge Set: Research Prompts",
    description:
      "Test your understanding of Web4 with 5 research challenges and bonus problems.",
  },
};

export default function ChallengeSetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
