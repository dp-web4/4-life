import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Research Hub — Explore Web4 Tools & Concepts | 4-Life",
  description:
    "Central hub for all Web4 interactive exploration tools. Organized by learning path: understand, explore, participate, and experiment.",
  openGraph: {
    title: "Research Participation Hub",
    description:
      "All Web4 interactive tools organized by learning path and complexity level.",
  },
};

export default function ResearchHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
