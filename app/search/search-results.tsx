"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { useCatalog } from "@/lib/catalog-context";

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s]/g, " ");

/** Searches the whole catalogue in the browser: name, colour, fabric, fit, category and description. */
export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const { products } = useCatalog();
  const [q, setQ] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return products
      .map((p) => {
        const name = norm(p.name);
        const rest = norm([p.detail, p.fabric, p.fit, p.category, p.description, ...p.colours.map((c) => c.name)].join(" "));
        let score = 0;
        for (const w of words) {
          // Match whole words or their start, so "shirt" finds "shirts" and "den" finds "denim".
          const hit = (t: string) => t.split(/\s+/).some((x) => x.startsWith(w) || (w.length > 3 && x.startsWith(w.replace(/s$/, ""))));
          if (hit(name)) score += 3;
          else if (hit(rest)) score += 1;
          else return null;
        }
        return { p, score };
      })
      .filter((x) => x !== null)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.p);
  }, [q, products]);

  return (
    <>
      <form
        role="search"
        className="mt-8 flex max-w-xl border-b border-ink/30 focus-within:border-bur"
        onSubmit={(e) => {
          e.preventDefault();
          router.replace(`/search?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <label htmlFor="q" className="sr-only">Search the shop</label>
        <input
          id="q"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “shirt”, “denim”, “pink”, “linen”"
          className="min-w-0 flex-1 bg-transparent py-3 text-[1.125rem] outline-none"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} className="cap px-2 text-ash" aria-label="Clear search">✕</button>
        )}
      </form>
      {q.trim() && (
        <p className="mt-6 text-[0.8125rem] text-ash" aria-live="polite">
          {results.length} {results.length === 1 ? "piece" : "pieces"} for “{q.trim()}”
        </p>
      )}
      {q.trim() && !results.length && <p className="mt-6 font-display text-2xl text-bur">Nothing matches yet. Try a colour or a fabric.</p>}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
