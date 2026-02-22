import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Learning Journey — Structured Path from Beginner to Expert | 4-Life",
  description:
    "A structured learning path through Web4 concepts: identity, attention economics, trust tensors, coherence, and aliveness. Track your progress.",
  openGraph: {
    title: "Learning Journey",
    description:
      "Structured path from Web4 beginner to practitioner. Track your progress.",
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
