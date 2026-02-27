import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Web4 Technical Reference — All Primitives Explained | 4-Life",
  description:
    "Technical reference for all Web4 primitives: LCT (verified presence), ATP/ADP (attention budget), MRH (trust-based visibility), T3/V3 (trust and value tensors), CI (coherence index), and R6/R7 (action framework).",
  openGraph: {
    title: "Web4 Technical Reference",
    description:
      "All Web4 primitives explained with stable anchors for deep linking.",
  },
};

export default function Web4ExplainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
