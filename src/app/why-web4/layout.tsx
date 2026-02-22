import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Why Web4? The Problem Before the Solution | 4-Life",
  description:
    "The internet has no memory. Spammers reset, reputations don't travel, and bad actors face no consequences. Here's what Web4 does differently.",
  openGraph: {
    title: "Why Web4?",
    description:
      "The internet has no memory. Here's what Web4 does differently.",
  },
};

export default function WhyWeb4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
