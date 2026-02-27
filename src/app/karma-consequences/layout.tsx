import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Karma Consequences — Trust Across Lives | 4-Life",
  description:
    "10 scenarios exploring how trust decisions cascade across lifetimes in Web4. See how cooperation, betrayal, and reputation shape multi-life outcomes.",
  openGraph: {
    title: "Karma Consequences: Trust Across Lives",
    description:
      "10 scenarios showing how trust decisions cascade across lifetimes.",
  },
};

export default function KarmaConsequencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
