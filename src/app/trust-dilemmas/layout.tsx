import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Trust Dilemmas — Interactive Quiz | 4-Life",
  description:
    "Three real internet trust problems. Pick how you'd solve them, then see how a trust-native approach would handle each one.",
  openGraph: {
    title: "Trust Dilemmas: Can You Solve These?",
    description:
      "Interactive quiz exploring spam, identity, and reputation problems — and how Web4 proposes to fix them.",
  },
};

export default function TrustDilemmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
