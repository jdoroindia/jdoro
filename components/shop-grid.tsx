"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, fits, matches, type Filter, type Fit } from "@/lib/products";
import { useCatalog } from "@/lib/catalog-context";
import { cx } from "@/lib/cx";

export function ShopGrid() {
  const { products } = useCatalog();
  const [cat, setCat] = useState<Filter>("all");
  const [fit, setFit] = useState<Fit | null>(null);
  const list = products.filter((p) => matches(p, cat) && (!fit || p.fit === fit));

  return (
    <>
      <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-4 border-b border-line">
        <div className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={cx(
                "-mb-px min-h-11 border-b pb-3 pt-2 text-[0.875rem] transition-colors",
                cat === c.id ? "border-ink text-ink" : "border-transparent text-ash hover:text-ink",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 pb-3 sm:ml-auto" role="group" aria-label="Filter by fit">
          <span className="cap mr-1 text-[0.625rem] text-ash">Fit</span>
          {fits.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={fit === f}
              onClick={() => setFit(fit === f ? null : f)}
              className={cx(
                "min-h-10 border px-3.5 text-[0.8125rem] transition-colors",
                fit === f ? "border-ink bg-ink text-shell" : "border-line text-graphite hover:border-ink",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[0.75rem] text-ash" aria-live="polite">
        {list.length} {list.length === 1 ? "piece" : "pieces"}
      </p>
      {list.length ? (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="mt-10 font-display text-2xl text-bur">Nothing in that fit yet. Try another.</p>
      )}
    </>
  );
}
