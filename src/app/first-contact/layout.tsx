import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "First Contact — Your First Web4 Experience | 4-Life",
  description:
    "Follow Alice through 16 actions in a Web4 community. Watch trust build, spam fail, death arrive, and karma carry forward — all in 12 minutes.",
  openGraph: {
    title: "First Contact: Your First Web4 Experience",
    description:
      "Watch trust build, spam fail, and karma compound in a 12-minute interactive walkthrough.",
  },
};

export default function FirstContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
