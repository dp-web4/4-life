import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Trust Tensor Explorer — Interactive T3 Tool | 4-Life",
  description:
    "Manipulate the 3D trust tensor (Talent, Training, Temperament) in real-time. See how coherence gates trust, calculate ATP costs, and simulate trust evolution over time.",
  openGraph: {
    title: "Trust Tensor Explorer: Interactive T3 Tool",
    description:
      "Real-time manipulation of Web4 trust tensors with coherence modulation and scenario simulation.",
  },
};

export default function TrustTensorExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
