import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Identity Constellation — Multi-Device Presence | 4-Life",
  description:
    "Visualize how LCT presence spans multiple devices. Explore device enrollment, witness quorums, and trust inheritance across your hardware constellation.",
  openGraph: {
    title: "Identity Constellation: Multi-Device Presence",
    description:
      "How Web4 presence spans multiple devices through hardware binding and witness quorums.",
  },
};

export default function IdentityConstellationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
