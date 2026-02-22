import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Trust Tensor (T3) — Multi-Dimensional Trust | 4-Life",
  description:
    "Trust isn't a single score. T3 measures Talent, Training, and Temperament — three dimensions that paint a complete picture of trustworthiness.",
  openGraph: {
    title: "Trust Tensor: Multi-Dimensional Trust",
    description:
      "Trust measured in three dimensions: Talent, Training, and Temperament.",
  },
};

export default function TrustTensorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
