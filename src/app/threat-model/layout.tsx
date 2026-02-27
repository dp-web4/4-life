import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Threat Model & Failure Modes — Web4 Security Analysis | 4-Life",
  description:
    "Comprehensive analysis of Web4's known vulnerabilities: Sybil attacks, collusion, quality inflation, Goodharting, MRH limits, and false positives. 400+ attack simulations documented.",
  openGraph: {
    title: "Web4 Threat Model & Failure Modes",
    description:
      "Honest analysis of Web4's known vulnerabilities and failure modes with 400+ attack simulations.",
  },
};

export default function ThreatModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
