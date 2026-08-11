import type { MetadataRoute } from "next";
import { journal } from "@/lib/journal";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

/** Static routes with their editorial priority. */
const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/collection", priority: 0.9 },
  { path: "/made-to-order", priority: 0.8 },
  { path: "/materials", priority: 0.8 },
  { path: "/deadstock", priority: 0.8 },
  { path: "/craftsmanship", priority: 0.8 },
  { path: "/sustainability", priority: 0.8 },
  { path: "/packaging", priority: 0.6 },
  { path: "/care", priority: 0.6 },
  { path: "/story", priority: 0.7 },
  { path: "/founder", priority: 0.6 },
  { path: "/journal", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/shipping-returns", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
  { path: "/terms", priority: 0.2 },
  { path: "/privacy", priority: 0.2 },
  { path: "/accessibility", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: `${site.url}/collection/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...journal.map((entry) => ({
      url: `${site.url}/journal/${entry.slug}`,
      lastModified: new Date(entry.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
