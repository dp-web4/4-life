/**
 * ExplorerNav - retired 2026-07.
 *
 * This was the bottom-of-page "Interactive Tools" navigator for the old sim era
 * (Playground, Lab Console, Trust Tensor Explorer, Adversarial Analysis, etc.).
 * Those tools were retired in the onramp rebuild, so the navigator has nothing
 * real to point at. Cross-linking is now handled by RelatedConcepts (driven by
 * the curated navigation registry in src/lib/navigation.ts).
 *
 * Kept as a no-op so the ~20 pages that import it need no edit. Safe to delete
 * the import and this file in a later cleanup pass.
 */

export default function ExplorerNav(_props: { currentPath: string }) {
  return null;
}
