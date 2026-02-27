import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "MRH Explorer — Interactive Context Boundaries | 4-Life",
  description:
    "Explore how trust-based context boundaries work in Web4. Visualize trust decay across hops, calculate ATP costs, and simulate what agents can and cannot see.",
  openGraph: {
    title: "MRH Explorer: Interactive Context Boundaries",
    description:
      "Visualize how far information travels through trust networks in Web4.",
  },
};

export default function MrhExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
