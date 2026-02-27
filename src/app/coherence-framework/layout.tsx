import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Coherence Framework — From Web4 to Synchronism | 4-Life",
  description:
    "How Web4's 4-dimensional Coherence Index connects to the broader 9-domain Synchronism framework. Three-dimensional gating model: attention gates metabolism, trust modulates coupling.",
  openGraph: {
    title: "Coherence Framework: Web4 to Synchronism",
    description:
      "The relationship between Web4's Coherence Index and the Synchronism framework.",
  },
};

export default function CoherenceFrameworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
