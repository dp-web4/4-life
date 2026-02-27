import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Compare Simulations — Side-by-Side Analysis | 4-Life",
  description:
    "Compare multiple Web4 simulation runs side-by-side. See how different parameters affect trust dynamics, agent behavior, and society outcomes.",
  openGraph: {
    title: "Compare Simulations: Side-by-Side Analysis",
    description:
      "Compare multiple Web4 simulation runs to understand how parameters affect outcomes.",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
