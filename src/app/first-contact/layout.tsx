import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "First Contact — Your First Web4 Experience | 4-Life",
  description:
    "Follow Alice through 10 actions in a Web4 community. Watch trust build, spam fail, and reputation compound — all in 10 minutes.",
  openGraph: {
    title: "First Contact: Your First Web4 Experience",
    description:
      "Watch trust build and spam fail in a 10-minute interactive walkthrough.",
  },
};

export default function FirstContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
