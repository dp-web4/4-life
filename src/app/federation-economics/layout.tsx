import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Federation Economics — Dynamic ATP Markets | 4-Life",
  description:
    "How Web4 coordinates resource allocation without central planning. ATP prices adjust to scarcity, signaling opportunities and guiding specialization.",
  openGraph: {
    title: "Federation Economics",
    description:
      "How trust-native markets self-regulate through ATP dynamics.",
  },
};

export default function FederationEconomicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
