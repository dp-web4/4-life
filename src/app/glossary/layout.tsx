import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Web4 Glossary — Terms & Definitions | 4-Life",
  description:
    "Searchable glossary of Web4 terms: LCT, ATP, Trust Tensors, Coherence Index, MRH, and more. Plain English definitions for every concept.",
  openGraph: {
    title: "Web4 Glossary",
    description:
      "Plain English definitions for every Web4 concept and term.",
  },
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
