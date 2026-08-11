import Link from "next/link";
import { Media } from "@/components/media";
import { cx } from "@/lib/cx";
import { badges, soldOut } from "@/lib/microcopy";
import {
  formatPrice,
  garmentsRemaining,
  type Product,
} from "@/lib/products";

/**
 * One piece in a grid. The card names the fabric and how much of it is left,
 * because scarcity here is a fact about the roll rather than a sales tactic.
 */
export function ProductCard({
  product,
  priority = false,
  sizes,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const remaining = garmentsRemaining(product);
  const hasReady = product.sizes.some((size) => size.state === "ready");
  const isRetired = remaining < 1 && !hasReady;

  const flag = isRetired
    ? soldOut.badge
    : remaining > 0 && remaining <= 2
      ? soldOut.badgeFinalMetres
      : hasReady
        ? badges.readyToShip
        : badges.madeToOrder;

  return (
    <article className="group">
      <Link href={`/collection/${product.slug}`} className="block">
        <Media
          src={product.image}
          alt={`${product.name} — ${product.line}`}
          texture={product.texture}
          tone={product.tone}
          ratio="3 / 4"
          priority={priority}
          sizes={sizes}
          showCaption={false}
          caption={product.shots[0]?.note}
          overlay={
            <div className="flex justify-between p-4">
              <span
                className={cx(
                  "eyebrow bg-paper/90 px-3 py-2 backdrop-blur-sm",
                  isRetired ? "text-ash" : "text-ink",
                )}
              >
                {flag}
              </span>
            </div>
          }
        />

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="type-subtitle text-ink transition-colors duration-500 ease-editorial group-hover:text-oro">
            {product.name}
          </h3>
          <p className="shrink-0 text-[0.8125rem] tracking-wide text-graphite">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="type-caption mt-2">{product.line}</p>

        <p className="eyebrow mt-4 text-oro">
          {product.fabric.source === "deadstock"
            ? badges.deadstock
            : badges.naturalFibre}
          <span className="text-ash"> · {product.fabric.name}</span>
        </p>

        <p className="type-caption mt-2">
          {isRetired
            ? "Fabric finished — this piece has retired."
            : remaining === 1
              ? soldOut.singleLeft
              : remaining > 0
                ? `${soldOut.lowStockPrefix} ${remaining} ${soldOut.lowStockSuffix}`
                : "Ready to ship in the sizes cut."}
        </p>
      </Link>
    </article>
  );
}
