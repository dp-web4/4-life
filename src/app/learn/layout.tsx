import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

// Aug-01 visitor MEDIUM 6: kept in agreement with the page's own H1, which changed from
// "Learn Web4 Progressively" to "Read the Site in Order" in the same pass. Two other rots
// went with it: "aliveness" named a route retired in the Jul-15 rebuild, and "beginner to
// expert" / "beginner to practitioner" oversold a five-page read. No time total is carried
// here, deliberately; adding one would extend the six-surface cascade documented on the
// reading-path box in page.tsx.
export const metadata: Metadata = {
  title: "The Reading Path - Read the Site in Order | 4-Life",
  description:
    "The recommended order to read this site in: five pages from never having heard of Web4 to knowing what runs today, then deeper paths through identity, trust tensors, energy, and coherence.",
  openGraph: {
    title: "The Reading Path",
    description:
      "The recommended order to read this site in, with time estimates. Track your progress.",
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
