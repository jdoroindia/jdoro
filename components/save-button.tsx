"use client";

import { useWishlist } from "@/lib/wishlist";
import { cx } from "@/lib/cx";

/** Heart toggle for the wishlist. */
export function SaveButton({ slug, name, className, withLabel = false }: { slug: string; name: string; className?: string; withLabel?: boolean }) {
  const { has, toggle, ready } = useWishlist();
  const on = ready && has(slug);
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={cx("inline-flex items-center gap-2", className)}
    >
      <svg viewBox="0 0 24 24" className={cx("size-5 transition-colors", on ? "fill-bur text-bur" : "fill-none text-ink")} stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10Z" />
      </svg>
      {withLabel && <span className="text-[0.875rem]">{on ? "Saved" : "Save for later"}</span>}
    </button>
  );
}
