import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "AI Guide Explorer — Conversational Web4 Learning | 4-Life",
  description:
    "Ask questions about Web4 concepts and get context-aware answers. Load simulations for event analysis or explore concepts through conversation.",
  openGraph: {
    title: "AI Guide: Conversational Web4 Explorer",
    description:
      "Learn Web4 through conversation — ask questions, analyze simulations, explore concepts.",
  },
};

export default function ActExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
