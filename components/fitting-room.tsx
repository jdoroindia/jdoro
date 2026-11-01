"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductImage } from "@/components/product-card";
import { Select } from "@/components/select";
import { useFittingRoom, type LookItem } from "@/lib/fitting-room";
import { categories, formatPrice, stylesWith, matches, type Filter, type Product } from "@/lib/products";
import { useCatalog } from "@/lib/catalog-context";
import { site } from "@/lib/site";
import { cx } from "@/lib/cx";

/** Collage slots on the styling board, in the order pieces are added. */
const slots = [
  { left: "4%", top: "4%", width: "46%", rotate: -3 },
  { left: "44%", top: "18%", width: "44%", rotate: 2 },
  { left: "14%", top: "40%", width: "38%", rotate: 4 },
  { left: "54%", top: "50%", width: "36%", rotate: -2 },
];

function imageFor(p: Product, colour: string) {
  const c = p.colours.find((x) => x.name === colour) ?? p.colours[0];
  return { src: c.image, filled: Boolean(c.back), colour: c };
}

function whatsappLink(items: LookItem[], total: number, findProduct: (s: string) => Product | undefined) {
  const lines = items.map((i) => {
    const p = findProduct(i.slug)!;
    const size = i.size === "Custom" ? `made to measure: ${i.measurements ?? "measurements to confirm"}` : i.size;
    return `• ${p.name} (${i.colour}, ${size}) ${formatPrice(p.price)}`;
  });
  const text = `Hi JD’ORO, I’d like to order:\n${lines.join("\n")}\nTotal: ${formatPrice(total)}`;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function FittingRoom() {
  const { items, ready, toggle, has, update, remove, total } = useFittingRoom();
  const [cat, setCat] = useState<Filter>("all");
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const { products, find: findProduct } = useCatalog();

  const list = products.filter((p) => matches(p, cat));
  const look = items.map((i) => ({ item: i, product: findProduct(i.slug)! })).filter((x) => x.product);
  const activeEntry = look.find((x) => x.item.slug === active) ?? look[look.length - 1];
  const recommended = look.length
    ? stylesWith(products, look.map((x) => x.item.slug), 3)
    : products.filter((p) => !has(p.slug)).slice(0, 3);

  return (
    <div className="grid border-b border-line lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-[18rem_1fr_21rem] xl:grid-cols-[20rem_1fr_23rem]">
      {/* Picker */}
      <aside className="order-2 border-line p-5 md:p-7 lg:order-1 lg:border-r">
        <h2 className="cap">Add more pieces</h2>
        <div className="no-scrollbar -mx-5 mb-4 mt-2 flex gap-5 overflow-x-auto px-5 text-[0.875rem] md:mx-0 md:px-0 md:text-[0.75rem]" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={cx("min-h-11 shrink-0 pb-1", cat === c.id ? "border-b border-ink text-ink" : "text-ash hover:text-ink")}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          {list.map((p) => {
            const on = ready && has(p.slug);
            const img = imageFor(p, p.colours[0].name);
            return (
              <button key={p.slug} type="button" onClick={() => toggle(p.slug)} aria-pressed={on} className="text-left">
                <span className={cx("relative block aspect-[3/4] overflow-hidden border bg-white", on ? "border-bur outline outline-[1.5px] outline-bur" : "border-line")}>
                  <ProductImage src={img.src} alt={p.name} fill={img.filled} sizes="140px" />
                  <span
                    className={cx(
                      "absolute right-2 top-2 grid size-5 place-items-center rounded-full text-[0.625rem]",
                      on ? "bg-bur text-shell" : "border border-mist bg-white",
                    )}
                  >
                    {on ? "✓" : ""}
                  </span>
                </span>
                <small className="mt-1.5 block text-[0.6875rem] leading-snug">{p.name}</small>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Styling board */}
      <section
        className={cx("relative order-1 overflow-hidden px-5 pt-14 md:min-h-[38rem] md:pb-24 lg:order-2", look.length ? "min-h-[26rem] pb-20" : "pb-8")}
        style={{ background: "radial-gradient(ellipse at 50% 40%, #F6F0E9, #EDE3D9 75%)" }}
        aria-label="How your pieces look together"
      >
        <div className="absolute inset-x-5 top-5 flex justify-between md:inset-x-7">
          <span className="cap">How it goes together</span>
          <span className="cap hidden text-ash sm:block">Tap a piece to change its colour</span>
        </div>

        {ready && look.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-center md:h-full md:min-h-[22rem]">
            <p className="font-display text-3xl text-bur md:text-4xl">Your bag is empty.</p>
            <p className="mt-3 max-w-xs text-[0.875rem] text-graphite">Add pieces from the shop, or pick some below. You’ll see them together here before you pay.</p>
          </div>
        )}

        <div className={cx("relative mx-auto h-full max-w-2xl md:min-h-[32rem]", look.length ? "min-h-[20rem]" : "hidden md:block")}>
          {look.slice(0, 4).map(({ item, product }, i) => {
            const slot = slots[i];
            const img = imageFor(product, item.colour);
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActive(item.slug)}
                aria-label={`Select ${product.name}`}
                className={cx(
                  "absolute aspect-[3/4] overflow-hidden bg-white shadow-[0_18px_30px_rgba(74,20,18,0.14)] transition-transform duration-500 hover:scale-[1.02]",
                  activeEntry?.item.slug === item.slug && "ring-1 ring-bur",
                )}
                style={{ left: slot.left, top: slot.top, width: slot.width, transform: `rotate(${slot.rotate}deg)`, zIndex: i + 1 }}
              >
                <ProductImage src={img.src} alt="" fill={img.filled} sizes="(min-width:1024px) 22vw, 45vw" className="mix-blend-multiply" />
                <span className="cap absolute bottom-2 left-2 bg-white/95 px-2 py-1.5 text-left text-[0.5625rem]">
                  <b className="text-berry">●</b> {product.name} · {item.size === "Custom" ? "Custom fit" : item.size}
                </span>
              </button>
            );
          })}
          {look.length > 4 && (
            <p className="cap absolute bottom-0 right-0 text-ash">+{look.length - 4} more in your bag</p>
          )}
        </div>

        {activeEntry && activeEntry.product.colours.length > 1 && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3.5 whitespace-nowrap border border-line bg-white px-4 py-2.5 text-[0.6875rem]">
            <span className="cap">{activeEntry.product.name.split(" ").slice(-1)} colour</span>
            {activeEntry.product.colours.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={c.name === activeEntry.item.colour}
                onClick={() => update(activeEntry.item.slug, { colour: c.name })}
                className={cx("size-8 rounded-full outline-offset-[3px] md:size-5", c.name === activeEntry.item.colour && "outline outline-1 outline-ink")}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Summary */}
      <aside className="order-3 border-t border-line bg-white p-5 md:p-7 lg:border-l lg:border-t-0">
        <h2 className="cap">Your bag</h2>
        {look.length === 0 && <p className="mt-4 text-[0.8125rem] text-ash">Nothing yet.</p>}
        <ul>
          {look.map(({ item, product }) => {
            const img = imageFor(product, item.colour);
            return (
              <li key={item.slug} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3.5 border-b border-line py-3.5 text-[0.8125rem]">
                <span className="relative block h-[4.5rem] overflow-hidden border border-line">
                  <ProductImage src={img.src} alt="" fill={img.filled} sizes="56px" />
                </span>
                <div>
                  <Link href={`/shop/${product.slug}`} className="link-draw">
                    {product.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-[0.6875rem] text-ash">
                    {item.colour} ·
                    <Select
                      label={`Size for ${product.name}`}
                      value={item.size}
                      onChange={(v) => {
                        if (v === "Custom") router.push(`/shop/${product.slug}#custom-measurements`);
                        else update(item.slug, { size: v, measurements: undefined });
                      }}
                      options={[
                        ...product.sizes.map((s) => ({ value: s, label: s })),
                        { value: "Custom", label: "Custom fit", hint: item.size === "Custom" ? "" : "add measurements" },
                      ]}
                    />
                  </div>
                  {item.size === "Custom" && item.measurements && (
                    <p className="mt-1 text-[0.625rem] leading-snug text-bur">{item.measurements}</p>
                  )}
                  <button type="button" onClick={() => remove(item.slug)} className="-my-1 py-2 text-[0.75rem] text-ash underline underline-offset-2 hover:text-berry">
                    Remove
                  </button>
                </div>
                <span>{formatPrice(product.price)}</span>
              </li>
            );
          })}
        </ul>
        <div className="my-5 flex justify-between text-sm">
          <span>Total</span>
          <b className="font-medium">{formatPrice(total)}</b>
        </div>
        {look.length > 0 ? (
          <>
            <Link href="/checkout" className="btn w-full border-ink bg-ink text-shell hover:border-bur hover:bg-bur">
              Checkout
            </Link>
            <a href={whatsappLink(items, total, findProduct)} target="_blank" rel="noreferrer" className="mt-2 block text-center text-[0.75rem] underline underline-offset-2">
              or order on WhatsApp
            </a>
          </>
        ) : (
          <Link href="/shop" className="btn w-full border-ink bg-ink text-shell">
            Browse the drop
          </Link>
        )}
        <p className="mt-2.5 text-center text-[0.6875rem] text-ash">Pay securely by UPI, card or netbanking. Remove or swap any piece before you pay.</p>

        {recommended.length > 0 && (
          <>
            <h3 className="cap mt-10">Recommended for you</h3>
            <div className="mt-3.5 grid grid-cols-3 gap-2.5">
              {recommended.map((p) => {
                const img = imageFor(p, p.colours[0].name);
                return (
                  <button key={p.slug} type="button" onClick={() => toggle(p.slug)} className="text-left">
                    <span className="relative block aspect-[3/4] overflow-hidden border border-line bg-white">
                      <ProductImage src={img.src} alt={p.name} fill={img.filled} sizes="100px" />
                    </span>
                    <small className="mt-1 block text-[0.625rem] leading-snug">+ {p.name}</small>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </aside>
      {look.length > 0 && (
        <div className="sticky bottom-0 z-30 order-4 flex items-center justify-between gap-4 border-t border-line bg-bone/95 px-5 py-3 backdrop-blur lg:hidden">
          <span className="text-[0.8125rem]">
            {look.length} {look.length === 1 ? "piece" : "pieces"} · <b className="font-medium">{formatPrice(total)}</b>
          </span>
          <Link href="/checkout" className="btn min-h-11 border-ink bg-ink px-5 text-shell">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
