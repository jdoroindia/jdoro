"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useCatalog } from "@/lib/catalog-context";
import { useWishlist } from "@/lib/wishlist";

export function WishlistGrid() {
  const { slugs, ready } = useWishlist();
  const { find } = useCatalog();
  const list = slugs.map(find).filter((p) => p !== undefined);
  if (!ready) return null;
  if (!list.length)
    return (
      <p className="mt-10 text-graphite">
        Nothing saved yet. Tap the heart on any piece to save it.{" "}
        <Link href="/shop" className="underline">Browse the drop</Link>
      </p>
    );
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
      {list.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
