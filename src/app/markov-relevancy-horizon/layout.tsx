import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Markov Relevancy Horizon — Trust-Based Visibility | 4-Life",
  description:
    "How trust-based visibility boundaries work in Web4. Trust decays 30% per hop (0.7 factor). Beyond 3 hops, trust reaches zero. Privacy by design, not by policy.",
  openGraph: {
    title: "MRH: Trust-Based Visibility Boundaries",
    description:
      "How Web4 filters information through trust networks instead of algorithms.",
  },
};

export default function MarkovRelevancyHorizonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
