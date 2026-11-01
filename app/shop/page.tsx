import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop-grid";
import { getDrop } from "@/lib/catalog";

export async function generateMetadata(): Promise<Metadata> {
  const drop = await getDrop();
  return {
    title: "Shop",
    description: `Shop Drop ${drop.number}: ${drop.name}. Small runs, made to order in rare-run fabrics.`,
    alternates: { canonical: "/shop" },
  };
}

export default async function ShopPage() {
  const drop = await getDrop();
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-10 lg:py-20">
      <p className="cap text-ash">
        Drop {drop.number} · {drop.name}
      </p>
      <h1 className="mt-4 font-display text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-none text-bur">Shop the drop</h1>
      <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-graphite">
        Every piece is cut to order in a small run. Add pieces to the Fitting Room to see how they work together before
        you buy.
      </p>
      <ShopGrid />
    </div>
  );
}
