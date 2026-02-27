import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Pattern Library — Cross-Life Learning Patterns | 4-Life",
  description:
    "Browse cross-life learning pattern corpora. Inspect learned decision templates that agents use to predict outcomes across emotional, quality, and attention domains.",
  openGraph: {
    title: "Pattern Library: Cross-Life Learning Patterns",
    description:
      "Interactive explorer for learned decision templates in Web4 agent simulations.",
  },
};

export default function PatternLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
