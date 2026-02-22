import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Aliveness — What Keeps Agents Alive | 4-Life",
  description:
    "In Web4, staying alive requires energy (ATP > 0), trust (above society threshold), and behavioral consistency (CI > threshold). Play the survival game.",
  openGraph: {
    title: "Aliveness: What Keeps Agents Alive",
    description:
      "Three metrics determine survival. Can you keep all three above threshold?",
  },
};

export default function AlivenessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
