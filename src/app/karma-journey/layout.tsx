import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Karma Journey — Live Multiple Lives | 4-Life",
  description:
    "Make choices. Build trust. Watch karma compound across multiple lives. Cooperative choices build slow trust; selfish choices yield quick gains but erode your legacy.",
  openGraph: {
    title: "Karma Journey: Live Multiple Lives",
    description:
      "Make choices that shape your trust across multiple lives. What kind of trust archetype will you become?",
  },
};

export default function KarmaJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
