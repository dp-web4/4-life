import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "ATP: Allocation Transfer Packets — Every Action Has a Cost | 4-Life",
  description:
    "Every online action costs energy (ATP — Allocation Transfer Packets). Quality earns it back. Spam burns out. See why a finite budget per agent makes self-regulating communities possible.",
  openGraph: {
    title: "ATP: Allocation Transfer Packets",
    description:
      "Every action costs energy. Quality earns it back. Spam burns out.",
  },
};

export default function AtpEconomicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
