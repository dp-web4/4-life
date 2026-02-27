import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Decision Evolution — How Trust Shapes Choices | 4-Life",
  description:
    "Explore how agent decision-making evolves through trust dynamics, experience, and multi-life learning in Web4 societies.",
  openGraph: {
    title: "Decision Evolution in Web4",
    description:
      "How trust dynamics and multi-life learning shape agent decision-making.",
  },
};

export default function DecisionEvolutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
