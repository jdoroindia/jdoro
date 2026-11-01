import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";

const routes = ["/", "/shop", "/fitting-room", "/about", "/contact", "/shipping-returns", "/refunds", "/terms", "/privacy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getProducts();
  return [
    ...routes.map((path) => ({ url: `${site.url}${path}`, lastModified: now, priority: path === "/" ? 1 : 0.6 })),
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
