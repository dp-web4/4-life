import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

// Aug-08 definitional sweep (Q8 Ruling 1: software-only anchoring is conformant and canon forbids
// protocol-level exclusion of the tier). This file is the definition of record in search results
// and link previews for the page whose whole job is defining LCT, and it asserted the universal in
// all three slots. The Sybil-cost claim in the description is kept and scoped rather than dropped:
// it is true of the hardware tiers, which is where the page's own argument lives (see
// what-could-go-wrong:171, "every Web4 identity that carries real weight is anchored in hardware").
// The BODY of /lct-explainer still carries the universal in several places (:182, :849-852, :2205
// and more); that is a larger pass, deliberately not taken here, and it is enumerated file:line in
// docs/WEB4-CANON-QUESTIONS.md under the discharged "identity is hardware-bound" follow-up.
export const metadata: Metadata = {
  title: "Verified Presence (LCT) - Device-Anchored Identity | 4-Life",
  description:
    "LCT anchors your digital presence to a device you control rather than a company database. Anchored in a security chip, creating fake presences means buying new devices. Your presence is verifiable without exposing who you are.",
  openGraph: {
    title: "Verified Presence (LCT)",
    description:
      "Device-anchored presence that's verifiable without exposing who you are.",
  },
};

export default function LctExplainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
