import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Manifest — Canonical Web4 Reference | 4-Life",
  description:
    "One-page canonical summary of Web4 primitives (LCT, ATP, MRH, T3, V3, CI, R6, EP), core claims, assumptions, known failure modes, and simulation parameters.",
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
