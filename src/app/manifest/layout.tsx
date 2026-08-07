import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Manifest - Canonical Web4 Reference | 4-Life",
  // Aug-07: the metadata twin of the body fix at page.tsx:50. Two corrections. (1) "R6" alone
  // named one of the two canonical modes while the body was being corrected to name both.
  // (2) "simulation parameters" is retired-sim residue: the page's sections are Core Primitives,
  // Core Claims, Assumptions, Known Failure Modes, The Onramp, Deep Resources, Research Status.
  // There is no simulation section, and the sim was archived on archive/v1-2026-07.
  description:
    "One-page canonical summary of Web4 primitives (LCT, ATP, MRH, T3, V3, CI, R6/R7, EP), core claims, assumptions, known failure modes, the onramp, and research status.",
  openGraph: {
    title: "4-Life Manifest: Canonical Web4 Reference",
    description:
      "All Web4 primitives, claims, and failure modes on one page.",
  },
};

export default function ManifestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
