"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import { bag, buttons, errors, soldOut, trust, ways } from "@/lib/microcopy";
import { buttonStyles } from "@/components/ui";
import { formatPrice, type Product } from "@/lib/products";

/**
 * Size and route selection.
 *
 * The two purchase routes are decided by the size, not by a toggle: pick a size
 * we cut and it ships; pick one we did not and the same piece is made for you.
 * The button label changes so there is never a question about which is happening.
 */
export function SizeSelector({ product }: { product: Product }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const size = product.sizes.find((item) => item.label === selected);
  const route = size?.state ?? null;
  const anythingAvailable = product.sizes.some(
    (item) => item.state !== "none",
  );

  if (!anythingAvailable) {
    return (
      <div className="border-t border-line pt-8">
        <p className="eyebrow text-ash">{soldOut.badge}</p>
        <h2 className="type-title mt-5 text-ink">{soldOut.heading}</h2>
        <p className="type-body mt-5">{soldOut.body}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          <a href="/contact" className={buttonStyles("outline")}>
            {soldOut.primary}
          </a>
          <a href="/collection" className={buttonStyles("quiet")}>
            {soldOut.secondary}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-line pt-8">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">Size</p>
        <a
          href="/made-to-order#measurements"
          className="text-[0.6875rem] uppercase tracking-[0.2em] text-ash transition-colors duration-500 hover:text-oro"
        >
          <span className="link-draw">How to measure</span>
        </a>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {product.sizes.map((item) => {
          const unavailable = item.state === "none";
          const active = selected === item.label;

          return (
            <button
              key={item.label}
              type="button"
              disabled={unavailable}
              aria-pressed={active}
              onClick={() => {
                setSelected(item.label);
                setError(false);
                setAdded(false);
              }}
              className={cx(
                "min-w-[4.5rem] border px-4 py-3 text-[0.75rem] tracking-[0.12em] transition-colors duration-400",
                active
                  ? "border-ink bg-ink text-paper"
                  : unavailable
                    ? "cursor-not-allowed border-line text-mist line-through decoration-line"
                    : "border-line text-ink hover:border-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* What picking this size actually means. */}
      <p className="type-caption mt-5 min-h-[3.2em]">
        {route === "ready" ? (
          <>
            <span className="text-oro">{ways.readyLabel}.</span>{" "}
            {size?.ready === 1
              ? "One left in this size."
              : `${size?.ready} left in this size.`}{" "}
            {ways.readyLine}
          </>
        ) : route === "measure" ? (
          <>
            <span className="text-oro">{ways.measureLabel}.</span>{" "}
            {soldOut.runFinishedBody}
          </>
        ) : (
          <>
            Sizes struck through have sold out of the cut run. If there is fabric
            left, we can still make them — choose one to see.
          </>
        )}
      </p>

      <div className="mt-7">
        <button
          type="button"
          onClick={() => {
            if (!selected) {
              setError(true);
              return;
            }
            setAdded(true);
          }}
          className={buttonStyles("solid", "w-full sm:w-auto")}
        >
          {!selected
            ? buttons.chooseSize
            : route === "ready"
              ? `${buttons.addToBag} · ${formatPrice(product.price)}`
              : `${buttons.addToBagMadeToOrder} · ${formatPrice(product.price)}`}
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-[0.8125rem] text-oro">
          {errors.sizeRequired}
        </p>
      ) : null}

      {added ? (
        <p role="status" className="type-caption mt-4">
          {route === "ready" ? bag.readyNotice : bag.madeToOrderNotice}
        </p>
      ) : null}

      <ul className="mt-8 space-y-2.5">
        {[
          route === "measure" ? trust.measureLeadTime : trust.readyLeadTime,
          trust.alterations,
          trust.packaging,
          trust.repairs,
        ].map((line) => (
          <li key={line} className="type-caption flex gap-3">
            <span aria-hidden="true" className="text-oro">
              ·
            </span>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
