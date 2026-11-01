import type { Metadata } from "next";
import { WishlistGrid } from "./wishlist-grid";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-10 lg:py-20">
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-none text-bur">Wishlist</h1>
      <p className="mt-4 max-w-lg text-[0.9375rem] text-graphite">Pieces you’ve saved. Runs are small, so add them to your bag before the fabric runs out.</p>
      <WishlistGrid />
    </div>
  );
}
