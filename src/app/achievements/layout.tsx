import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Achievements — Society Simulator Challenges | 4-Life",
  description:
    "34 achievements to unlock in the Society Simulator. Track your progress across trust-building, cooperation, and strategic challenges.",
  openGraph: {
    title: "Society Simulator Achievements",
    description:
      "34 challenges to unlock. How many trust dynamics can you discover?",
  },
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
