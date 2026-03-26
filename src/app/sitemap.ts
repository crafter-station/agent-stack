import type { MetadataRoute } from "next";
import { getServices, getCategories } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const categories = getCategories();
  const now = new Date();

  const serviceUrls = services.map((s) => ({
    url: `https://agent-stack.crafter.run/${s.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((c) => ({
    url: `https://agent-stack.crafter.run/category/${c}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: "https://agent-stack.crafter.run",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://agent-stack.crafter.run/methodology",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...serviceUrls,
    ...categoryUrls,
  ];
}
