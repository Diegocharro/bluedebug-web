import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.domain, changeFrequency: "monthly", priority: 1 },
    ...apps.map((app) => ({
      url: `${site.domain}/portfolio/${app.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
