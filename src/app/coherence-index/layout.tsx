import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Coherence Index (CI) — Consistency Detection | 4-Life",
  description:
    "The Coherence Index measures behavioral consistency across space, capability, time, and relationships. Inconsistent behavior tanks your score — no moderator needed.",
  openGraph: {
    title: "Coherence Index: Consistency Detection",
    description:
      "Behavioral consistency scored automatically. Fake patterns caught by math, not moderators.",
  },
};

export default function CoherenceIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
