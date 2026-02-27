import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Multi-Session Identity — Persistent Presence Across Lives | 4-Life",
  description:
    "How Web4 maintains coherent presence across sessions, devices, and lives. Explore identity anchoring, karma preservation, and cross-life continuity.",
  openGraph: {
    title: "Multi-Session Identity in Web4",
    description:
      "How Web4 maintains coherent presence across sessions, devices, and lives.",
  },
};

export default function MultiSessionIdentityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
