"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Product } from "@/lib/products";

type Catalog = { products: Product[]; find: (slug: string) => Product | undefined };

const CatalogContext = createContext<Catalog>({ products: [], find: () => undefined });

/** Hands the server-fetched catalogue to client components (shop grid, Fitting Room). */
export function CatalogProvider({ products, children }: { products: Product[]; children: ReactNode }) {
  const value = useMemo<Catalog>(() => {
    const map = new Map(products.map((p) => [p.slug, p]));
    return { products, find: (s) => map.get(s) };
  }, [products]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export const useCatalog = () => useContext(CatalogContext);
