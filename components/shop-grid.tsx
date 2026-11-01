"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, products, type Category } from "@/lib/products";
import { cx } from "@/lib/cx";

export function ShopGrid({ compact = false }: { compact?: boolean }) {
  const [cat, setCat] = useState<Category | "all">("all");
  const list = cat === "all" ? products : products.filter((p) => p.category === cat);

  return (
    <>
      <div className="mt-10 flex gap-6 border-b border-line" role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={cx(
              "-mb-px border-b pb-3 text-[0.8125rem] transition-colors",
              cat === c.id ? "border-ink text-ink" : "border-transparent text-ash hover:text-ink",
            )}
          >
            {c.label}
          </button>
        ))}
        <span className="ml-auto self-center pb-3 text-[0.75rem] text-ash">{list.length} pieces</span>
      </div>
      <div className={cx("mt-10 grid grid-cols-2 gap-x-4 gap-y-10", compact ? "" : "lg:grid-cols-4 lg:gap-x-5")}>
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
    </>
  );
}
