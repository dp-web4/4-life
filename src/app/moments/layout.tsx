import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Emergent Moments Gallery — Curated Simulation Highlights | 4-Life",
  description:
    "A curated gallery of the most interesting moments from Web4 simulations: trust collapses, threshold crossings, karma manifesting, ATP crises, and maturation breakthroughs.",
  openGraph: {
    title: "Emergent Moments: Curated Simulation Highlights",
    description:
      "The most interesting events detected across all Web4 simulation datasets.",
  },
};

export default function MomentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
