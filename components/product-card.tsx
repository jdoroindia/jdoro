"use client";

import Image from "next/image";
import Link from "next/link";
import { useFittingRoom } from "@/lib/fitting-room";
import { formatPrice, type Product } from "@/lib/products";
import { cx } from "@/lib/cx";

/** Front/back crops are 3:4 and fill the frame; single shots sit inside it. */
export function ProductImage({
  src,
  alt,
  fill = true,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cx(fill ? "object-cover" : "object-contain p-[8%]", className)}
    />
  );
}

export function ProductCard({ product, priority, showUnisex = false }: { product: Product; priority?: boolean; showUnisex?: boolean }) {
  const { has, toggle, ready } = useFittingRoom();
  const colour = product.colours[0] ?? { name: "", hex: "#eee", image: "/video/hero-poster.jpg" };
  const inLook = ready && has(product.slug);
  const filled = Boolean(colour.back);

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden border border-line bg-white">
        <Link href={`/shop/${product.slug}`} aria-label={product.name} className="absolute inset-0">
          <ProductImage
            src={colour.image}
            alt={`${product.name} in ${colour.name}`}
            fill={filled}
            priority={priority}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="transition duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
          />
          {colour.back && (
            <ProductImage
              src={colour.back}
              alt=""
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
        {product.left <= 4 && (
          <span className="cap absolute left-3 top-3 bg-ink px-2.5 py-1.5 text-[0.5625rem] text-shell">
            Only {product.left} left
          </span>
        )}
        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={inLook}
          className={cx(
            "cap absolute inset-x-2 bottom-2 min-h-11 border text-[0.5625rem] transition sm:inset-x-3 sm:bottom-3 sm:text-[0.625rem] md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
            inLook ? "border-bur bg-bur text-shell md:translate-y-0 md:opacity-100" : "border-line bg-bone text-bur hover:bg-shell",
          )}
        >
          {inLook ? "✓ In bag · tap to remove" : "+ Add to bag"}
        </button>
      </div>
      <Link href={`/shop/${product.slug}`} className="mt-3 block">
        <div className="flex justify-between gap-3 text-[0.8125rem]">
          <span>{product.name}</span>
          <span className="font-medium">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] text-ash">
          {showUnisex && product.unisex && <span className="cap border border-olive/60 px-1.5 py-0.5 text-[0.5rem] text-olive">Unisex</span>}
          <span>{product.detail} · {product.fit} fit</span>
        </p>
      </Link>
    </article>
  );
}
