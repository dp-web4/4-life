import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Society Starter Kit — Build a Web4 Community | 4-Life",
  description:
    "Everything you need to spin up a local Web4 society: hardware-bound presence tokens, per-society record chains, and default governance roles.",
  openGraph: {
    title: "Society Starter Kit",
    description:
      "Spin up a local Web4 society with hardware-bound presence and default governance.",
  },
};

export default function StarterKitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
