import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Value Tensor (V3) — Scoring the Work, Not the Worker | 4-Life",
  description:
    "T3 scores who you are. V3 scores what you produce — Valuation, Veracity, and Validity. Weighted so truth and rigor outrank popularity.",
  openGraph: {
    title: "Value Tensor: Scoring the Work, Not the Worker",
    description:
      "Every output gets three scores: was it useful, was it true, was it sound?",
  },
};

export default function ValueTensorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
