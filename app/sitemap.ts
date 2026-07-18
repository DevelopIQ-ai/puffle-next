import type { MetadataRoute } from "next";

import { SITE_URL } from "./site";

const pages = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/ai-gtm-agent", priority: 0.9, changeFrequency: "weekly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "weekly" },
  { path: "/founder-led-gtm", priority: 0.8, changeFrequency: "monthly" },
  { path: "/outbound-automation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/compare/puffle-vs-clay", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
