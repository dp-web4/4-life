import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Playground — Experiment with Trust Parameters | 4-Life",
  description:
    "Tweak energy costs, trust thresholds, and karma strength. Run instant simulations and discover how different rules create different societies.",
  openGraph: {
    title: "Parameter Playground",
    description:
      "Tweak the rules. Run simulations. See what kind of society emerges.",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
