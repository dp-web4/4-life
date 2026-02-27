import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Pattern Corpus — Agent Learning Across Lives | 4-Life",
  description:
    "Browse 250+ patterns that agents learn across lives in Web4. See how epistemic proprioception enables multi-life learning and pattern maturation.",
  openGraph: {
    title: "Pattern Corpus: Agent Learning Across Lives",
    description:
      "250+ patterns showing how Web4 agents learn and mature across multiple lives.",
  },
};

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
