import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "How Web4 Works — The Complete Lifecycle | 4-Life",
  description:
    "From birth to death to rebirth: how agents join societies, build trust, spend energy, and face permanent consequences in Web4.",
  openGraph: {
    title: "How Web4 Works",
    description:
      "The complete lifecycle: birth, life, death, and rebirth in a trust-native society.",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
