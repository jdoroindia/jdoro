"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "@/components/product-card";
import { useFittingRoom } from "@/lib/fitting-room";
import { formatPrice, type Product } from "@/lib/products";
import { cx } from "@/lib/cx";

export function ProductDetail({ product }: { product: Product }) {
  const { add, has, ready } = useFittingRoom();
  const [colourName, setColourName] = useState(product.colours[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const colour = product.colours.find((c) => c.name === colourName) ?? product.colours[0];
  const views = [colour.image, colour.back].filter(Boolean) as string[];
  const filled = Boolean(colour.back);

  function addToLook() {
    if (!size) {
      setError(true);
      return;
    }
    add({ slug: product.slug, colour: colour.name, size });
    setAdded(true);
  }

  return (
    <section className="mx-auto grid max-w-[88rem] gap-10 px-5 py-8 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-12">
      <div className={cx("grid gap-3", views.length > 1 && "sm:grid-cols-2")}>
        {views.map((src, i) => (
          <div key={src} className="relative aspect-[3/4] overflow-hidden border border-line bg-white">
            <ProductImage
              src={src}
              alt={`${product.name} in ${colour.name}, ${i === 0 ? "front" : "back"}`}
              fill={filled}
              priority={i === 0}
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
            />
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-32 lg:self-start">
        {product.left <= 4 && (
          <span className="cap inline-block bg-candy px-2.5 py-1.5 text-[0.5625rem] text-bur">Only {product.left} left in this run</span>
        )}
        <h1 className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-normal leading-tight text-bur">{product.name}</h1>
        <p className="mt-2 text-lg">{formatPrice(product.price)}</p>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-graphite">{product.description}</p>

        <div className="mt-8">
          <p className="cap text-ash">
            Colour · <span className="text-ink">{colour.name}</span>
          </p>
          <div className="mt-3 flex gap-3">
            {product.colours.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={c.name === colour.name}
                onClick={() => setColourName(c.name)}
                className={cx(
                  "size-7 rounded-full border border-line outline-offset-[3px]",
                  c.name === colour.name && "outline outline-1 outline-ink",
                )}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className={cx("cap", error ? "text-berry" : "text-ash")}>{error ? "Pick a size first" : "Size"}</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                  setAdded(false);
                }}
                className={cx(
                  "border py-3 text-[0.8125rem] transition-colors",
                  size === s ? "border-ink bg-ink text-shell" : "border-line hover:border-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.75rem] text-ash">Made to order. Between sizes? Add a note at checkout and we’ll cut to your measure.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button type="button" onClick={addToLook} className="btn border-bur bg-bur text-shell hover:border-ink hover:bg-ink">
            {added ? "✓ Added to Fitting Room" : "Add to Fitting Room"}
          </button>
          {(added || (ready && has(product.slug))) && (
            <Link href="/fitting-room" className="btn text-ink hover:bg-ink hover:text-shell">
              Style your look →
            </Link>
          )}
        </div>

        <dl className="mt-10 divide-y divide-line border-y border-line text-[0.8125rem]">
          {[
            ["Fabric", product.fabric],
            ["Made", "Cut to order in India, ships in 10–14 days"],
            ["Care", "Cold hand wash, dry in shade"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3.5">
              <dt className="text-ash">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
