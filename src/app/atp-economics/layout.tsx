import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Attention Economics (ATP) — Every Action Has a Cost | 4-Life",
  description:
    "Every online action costs energy (ATP). Quality earns it back. Spam burns out. See why attention economics makes self-regulating communities possible.",
  openGraph: {
    title: "Attention Economics (ATP)",
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
