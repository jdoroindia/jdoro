import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const routes = ["/", "/shop", "/fitting-room", "/about", "/contact", "/shipping-returns", "/terms", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((path) => ({ url: `${site.url}${path}`, lastModified: now, priority: path === "/" ? 1 : 0.6 })),
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
