/**
 * Product types and pure helpers. The catalogue itself lives in Supabase
 * (see lib/catalog.ts for server reads and lib/catalog-context.tsx for the
 * client), and is managed by Jahnvi in /admin.
 */

export type Fit = "Relaxed" | "Regular" | "Oversized";
export type Category = "tops" | "dresses" | "jackets";

export type Colour = {
  name: string;
  /** Swatch colour shown in the picker. */
  hex: string;
  image: string;
  back?: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  fit: Fit;
  /** Cut to work on any body. Shown first and tagged in the shop. */
  unisex: boolean;
  detail: string;
  description: string;
  fabric: string;
  colours: Colour[];
  sizes: string[];
  /** Hand-picked pieces that complete the outfit. */
  pairsWith: string[];
  /** Pieces left in the run. */
  left: number;
  published: boolean;
  sort: number;
};

export type Drop = { number: string; name: string; line: string; intro: string };

export const fallbackDrop: Drop = { number: "01", name: "The drop", line: "Made slow. Worn often.", intro: "" };

export const fits: Fit[] = ["Relaxed", "Regular", "Oversized"];
export const categoryIds: Category[] = ["tops", "dresses", "jackets"];

export type Filter = Category | "all" | "unisex";

export const categories: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "unisex", label: "Unisex" },
  { id: "tops", label: "Tops" },
  { id: "dresses", label: "Dresses" },
  { id: "jackets", label: "Jackets" },
];

export function matches(p: Product, filter: Filter) {
  return filter === "all" || (filter === "unisex" ? p.unisex : p.category === filter);
}

/** Database row → Product. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromRow(r: any): Product {
  return {
    slug: r.slug,
    name: r.name,
    price: r.price,
    category: r.category,
    fit: r.fit,
    unisex: r.unisex,
    detail: r.detail ?? "",
    description: r.description ?? "",
    fabric: r.fabric ?? "",
    colours: Array.isArray(r.colours) ? r.colours : [],
    sizes: r.sizes ?? [],
    pairsWith: r.pairs_with ?? [],
    left: r.stock ?? 0,
    published: r.published ?? true,
    sort: r.sort ?? 0,
  };
}

/** Unisex pieces lead, then the admin's chosen order. */
export function sortProducts(list: Product[]) {
  return [...list].sort((a, b) => Number(b.unisex) - Number(a.unisex) || a.sort - b.sort);
}

/** Pieces that style with the given ones: curated pairs first, never a piece already chosen. */
export function stylesWith(all: Product[], slugs: string[], limit = 4) {
  const chosen = new Set(slugs);
  const find = (s: string) => all.find((p) => p.slug === s);
  const out: Product[] = [];
  for (const slug of slugs) {
    for (const pair of find(slug)?.pairsWith ?? []) {
      const p = find(pair);
      if (p && !chosen.has(p.slug) && !out.includes(p)) out.push(p);
    }
  }
  return out.slice(0, limit);
}

export function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
