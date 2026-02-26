import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Trust Networks — How Societies Self-Organize | 4-Life",
  description:
    "Watch trust networks form in real-time. Cooperators cluster, free-riders get isolated, and coalitions emerge — all without central authority.",
  openGraph: {
    title: "Trust Networks",
    description:
      "Watch societies self-organize through trust dynamics.",
  },
};

export default function TrustNetworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
