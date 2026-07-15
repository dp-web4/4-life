import { MetadataRoute } from "next";
import { navigationTree } from "@/lib/navigation";

const BASE_URL = "https://4-life-ivory.vercel.app";

// Onramp pieces and the front door rank highest; everything else follows the nav.
const HIGH = new Set([
  "/",
  "/tldr",
  "/the-standard",
  "/hub",
  "/hestia",
  "/hardbound",
  "/onramp",
  "/running-now",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = new Set<string>(["/"]);
  for (const items of Object.values(navigationTree)) {
    for (const item of items) routes.add(item.href);
  }

  return Array.from(routes).map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/running-now" ? "weekly" : "monthly",
    priority: HIGH.has(path) ? 1.0 : 0.7,
  }));
}
