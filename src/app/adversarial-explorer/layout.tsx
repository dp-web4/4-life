import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Adversarial Explorer — Attack Simulations | 4-Life",
  description:
    "Interactive attack simulation for Web4: Sybil attacks, sleeper agents, collusion rings, trust arsonists, and slow poisoners. See defenses in action.",
  openGraph: {
    title: "Adversarial Explorer: Attack Simulations",
    description:
      "5 attack types with defenses, narratives, and interactive timelines.",
  },
};

export default function AdversarialExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
