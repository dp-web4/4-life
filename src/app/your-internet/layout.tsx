import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Your Internet — What Would Change? | 4-Life",
  description:
    "Pick your biggest internet frustrations and see exactly how trust-native infrastructure would address each one — with honest caveats about what's unsolved.",
  openGraph: {
    title: "What Frustrates You About the Internet?",
    description:
      "Pick your frustrations. See what would change with trust-native infrastructure.",
  },
};

export default function YourInternetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
