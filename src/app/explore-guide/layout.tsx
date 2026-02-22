import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Exploration Guide — Find Your Path | 4-Life",
  description:
    "Answer 3 questions and get a personalized path through Web4. Whether you're a newcomer, practitioner, researcher, or skeptic — there's a route for you.",
  openGraph: {
    title: "Find Your Path Through Web4",
    description:
      "3 questions → personalized exploration path. Newcomer, practitioner, or skeptic.",
  },
};

export default function ExploreGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
