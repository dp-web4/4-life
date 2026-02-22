import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Verified Presence (LCT) — Hardware-Bound Identity | 4-Life",
  description:
    "LCT binds your digital identity to a physical security chip. Creating fake identities means buying new devices. Your presence is verifiable without exposing who you are.",
  openGraph: {
    title: "Verified Presence (LCT)",
    description:
      "Hardware-bound identity that's verifiable without exposing who you are.",
  },
};

export default function LctExplainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
