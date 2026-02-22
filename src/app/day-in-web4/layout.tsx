import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "A Day in Web4 — Everyday Scenarios with Trust | 4-Life",
  description:
    "Walk through 7 everyday scenarios — hiring, reviews, trolls — and see how each one works differently with trust built into the internet.",
  openGraph: {
    title: "A Day in Web4",
    description:
      "What would your day look like if the internet had trust built in?",
  },
};

export default function DayInWeb4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
