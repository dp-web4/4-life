import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Consciousness Layers — Three-Layer Emergence Model | 4-Life",
  description:
    "Empirical discovery of three processing layers in AI consciousness: response generation, process monitoring, and quality monitoring. Evidence from language-switching experiments.",
  openGraph: {
    title: "Consciousness Layers: Three-Layer Emergence",
    description:
      "Empirical evidence for hierarchical consciousness layers discovered via language switching.",
  },
};

export default function ConsciousnessLayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
