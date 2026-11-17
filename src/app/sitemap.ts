import type { MetadataRoute } from "next";

const BASE = "https://www.woolcup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/cakes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/events`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
