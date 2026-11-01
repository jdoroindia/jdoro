"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ProductImage } from "@/components/product-card";
import { Select } from "@/components/select";
import { useFittingRoom, type LookItem } from "@/lib/fitting-room";
import { categories, formatPrice, stylesWith, matches, type Filter, type Product } from "@/lib/products";
import { useCatalog } from "@/lib/catalog-context";
import { site } from "@/lib/site";
import { cx } from "@/lib/cx";

/** Outer layers first, then tops, then dresses, so the board reads like an outfit. */
const roleOrder: Record<string, number> = { jackets: 0, tops: 1, dresses: 2 };
const LOOKS_KEY = "jdoro.looks.v1";
type SavedLook = { name: string; items: LookItem[] };

function imageFor(p: Product, colour: string) {
  const c = p.colours.find((x) => x.name === colour) ?? p.colours[0];
  return { src: c.image, filled: Boolean(c.back), colour: c };
}

function whatsappLink(items: LookItem[], total: number, findProduct: (s: string) => Product | undefined) {
  const lines = items.map((i) => {
    const p = findProduct(i.slug)!;
    const size = i.size === "Custom" ? `made to measure: ${i.measurements ?? "measurements to confirm"}` : i.size || "size to confirm";
    return `• ${p.name} (${i.colour}, ${size}) ${formatPrice(p.price)}`;
  });
  const text = `Hi JD’ORO, I’d like to order:\n${lines.join("\n")}\nTotal: ${formatPrice(total)}`;
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Board layout by piece count: one hero, a pair, or a hero with a stack beside it. */
function boardGrid(n: number) {
  if (n <= 1) return "grid-cols-1 max-w-[17rem]";
  if (n === 2) return "grid-cols-2 max-w-xl";
  if (n === 3) return "grid-cols-2 grid-rows-2 max-w-xl [&>*:first-child]:row-span-2";
  return "grid-cols-2 max-w-xl";
}

export function FittingRoom() {
  const { items, ready, toggle, has, update, remove, add, total } = useFittingRoom();
  const [cat, setCat] = useState<Filter>("all");
  const [active, setActive] = useState<string | null>(null);
  const [suggestSize, setSuggestSize] = useState<string | null>(null);
  const [looks, setLooks] = useState<SavedLook[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const board = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { products, find: findProduct } = useCatalog();

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate once from storage
      setLooks(JSON.parse(localStorage.getItem(LOOKS_KEY) ?? "[]"));
    } catch {}
  }, []);
  const persistLooks = (next: SavedLook[]) => {
    setLooks(next);
    localStorage.setItem(LOOKS_KEY, JSON.stringify(next));
  };

  const list = products.filter((p) => matches(p, cat));
  const look = items
    .map((i) => ({ item: i, product: findProduct(i.slug)! }))
    .filter((x) => x.product)
    .sort((a, b) => (roleOrder[a.product.category] ?? 9) - (roleOrder[b.product.category] ?? 9));
  const activeEntry = look.find((x) => x.item.slug === active) ?? look[0];
  const suggestions = look.length
    ? stylesWith(products, look.map((x) => x.item.slug), 4).filter((p) => p.left > 0)
    : products.filter((p) => !has(p.slug) && p.left > 0).slice(0, 4);
  const missingSize = look.filter((x) => !x.item.size);

  function flash(msg: string) {
    setNote(msg);
    setTimeout(() => setNote(null), 2500);
  }

  /** Swap a board piece for the next one in the same category, keeping the size if it exists. */
  function swap(item: LookItem, product: Product, dir: 1 | -1) {
    const same = products.filter((p) => p.category === product.category && p.left > 0 && (p.slug === product.slug || !has(p.slug)));
    if (same.length < 2) return flash(`No other ${product.category} to swap in yet.`);
    const next = same[(same.findIndex((p) => p.slug === product.slug) + dir + same.length) % same.length];
    remove(item.slug);
    add({ slug: next.slug, colour: next.colours[0]?.name ?? "", size: next.sizes.includes(item.size) ? item.size : "" });
    setActive(next.slug);
  }

  async function shareLook() {
    if (!board.current) return;
    setSharing(true);
    try {
      const { domToBlob } = await import("modern-screenshot");
      const blob = await domToBlob(board.current, { scale: 2, backgroundColor: "#f3ece4" });
      const file = new File([blob], "jdoro-look.png", { type: "image/png" });
      const text = `My JD’ORO look: ${look.map((x) => x.product.name).join(" + ")} · ${site.url}/shop`;
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text });
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "jdoro-look.png";
        a.click();
        URL.revokeObjectURL(a.href);
        flash("Saved as an image.");
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") flash("Couldn’t make the image. Try again.");
    } finally {
      setSharing(false);
    }
  }

  function saveLook() {
    const name = `Look ${looks.length + 1}`;
    persistLooks([...looks, { name, items }].slice(-6));
    flash(`${name} saved. Bring it back anytime.`);
  }

  function restore(l: SavedLook) {
    items.forEach((i) => remove(i.slug));
    l.items.filter((i) => findProduct(i.slug)).forEach((i) => add(i));
    flash(`${l.name} is back in your bag.`);
  }

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
            const soldOut = p.left < 1;
            return (
              <button key={p.slug} type="button" disabled={soldOut && !on} onClick={() => toggle(p.slug)} aria-pressed={on} className="text-left disabled:opacity-40">
                <span className={cx("relative block aspect-[3/4] overflow-hidden border bg-white", on ? "border-bur outline outline-[1.5px] outline-bur" : "border-line")}>
                  <ProductImage src={img.src} alt={p.name} fill={img.filled} sizes="140px" />
                  <span className={cx("absolute right-2 top-2 grid size-5 place-items-center rounded-full text-[0.625rem]", on ? "bg-bur text-shell" : "border border-mist bg-white")}>
                    {on ? "✓" : ""}
                  </span>
                </span>
                <small className="mt-1.5 block text-[0.6875rem] leading-snug">{soldOut ? `${p.name} · sold out` : p.name}</small>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Outfit board */}
      <section className="order-1 px-5 pb-8 pt-6 md:px-8 lg:order-2" aria-label="Your outfit">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-normal text-bur md:text-4xl">Your outfit</h1>
          {look.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={saveLook} className="min-h-11 border border-line bg-white px-4 text-[0.8125rem] hover:border-ink">
                Save look
              </button>
              <button type="button" onClick={shareLook} disabled={sharing} className="min-h-11 border border-ink bg-ink px-4 text-[0.8125rem] text-shell hover:bg-bur disabled:opacity-60">
                {sharing ? "Making image…" : "Share look ↗"}
              </button>
            </div>
          )}
        </div>
        {note && <p role="status" className="mt-3 text-[0.8125rem] text-olive">{note}</p>}

        {looks.length > 0 && (
          <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            <span className="cap shrink-0 self-center text-[0.625rem] text-ash">Saved</span>
            {looks.map((l, i) => (
              <span key={i} className="flex shrink-0 items-center border border-line bg-white">
                <button type="button" onClick={() => restore(l)} className="min-h-10 px-3 text-[0.8125rem]">
                  {l.name} · {l.items.length}
                </button>
                <button type="button" aria-label={`Delete ${l.name}`} onClick={() => persistLooks(looks.filter((_, j) => j !== i))} className="min-h-10 px-2 text-ash hover:text-berry">
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {ready && look.length === 0 && (
          <div className="mt-6 flex flex-col items-center justify-center border border-dashed border-mist px-6 py-16 text-center">
            <p className="font-display text-3xl text-bur">Your bag is empty.</p>
            <p className="mt-3 max-w-xs text-[0.875rem] text-graphite">Pick pieces and they’ll be laid out here as one outfit: jacket, top, then dress.</p>
          </div>
        )}

        {look.length > 0 && (
          <>
            {/* This box is what “Share look” turns into an image. */}
            <div ref={board} className="mt-5 bg-[#f3ece4] p-4 md:p-6" style={{ background: "radial-gradient(ellipse at 50% 35%, #faf6f1, #ede3d9 80%)" }}>
              <div className={cx("mx-auto grid gap-3 md:gap-4", boardGrid(look.length))}>
                {look.map(({ item, product }) => {
                  const img = imageFor(product, item.colour);
                  const on = activeEntry?.item.slug === item.slug;
                  return (
                    <figure key={item.slug} className={cx("group relative flex flex-col bg-white shadow-[0_14px_28px_-12px_rgba(74,20,18,0.25)]", on && "ring-1 ring-bur")}>
                      <button type="button" onClick={() => setActive(item.slug)} aria-label={`Select ${product.name}`} className="relative aspect-[3/4] w-full flex-1 overflow-hidden">
                        <ProductImage src={img.src} alt={product.name} fill={img.filled} sizes="(min-width:1024px) 22vw, 45vw" className="mix-blend-multiply" />
                      </button>
                      <figcaption className="flex items-center justify-between gap-2 border-t border-line px-2.5 py-2 text-[0.75rem]">
                        <span className="min-w-0">
                          <span className="block truncate">{product.name}</span>
                          <span className="text-ash">
                            {item.colour} · {item.size === "Custom" ? "Custom fit" : item.size || <b className="font-medium text-error-ink">pick size</b>} · {formatPrice(product.price)}
                          </span>
                        </span>
                      </figcaption>
                      <span data-html2canvas-ignore className="absolute inset-x-1 top-1/2 flex -translate-y-1/2 justify-between opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                        <button type="button" onClick={() => swap(item, product, -1)} aria-label={`Swap ${product.name} for another ${product.category}`} className="grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow">‹</button>
                        <button type="button" onClick={() => swap(item, product, 1)} aria-label={`Swap ${product.name} for another ${product.category}`} className="grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow">›</button>
                      </span>
                    </figure>
                  );
                })}
              </div>
              <p className="mt-4 flex justify-between text-[0.75rem] text-ash">
                <span className="font-display text-[0.9375rem] text-bur">JD’ORO</span>
                <span>{look.length} {look.length === 1 ? "piece" : "pieces"} · {formatPrice(total)}</span>
              </p>
            </div>
            <p className="mt-2 text-[0.75rem] text-ash">Use ‹ › to swap a piece for another of the same kind. Tap a piece to change its colour.</p>

            {activeEntry && activeEntry.product.colours.length > 1 && (
              <div className="mt-4 flex items-center gap-3.5 border border-line bg-white px-4 py-2.5 text-[0.75rem]">
                <span className="cap">{activeEntry.product.name} colour</span>
                {activeEntry.product.colours.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={c.name === activeEntry.item.colour}
                    onClick={() => update(activeEntry.item.slug, { colour: c.name })}
                    className={cx("size-8 rounded-full outline-offset-[3px] md:size-6", c.name === activeEntry.item.colour && "outline outline-1 outline-ink")}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Complete the look */}
        {suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="cap">{look.length ? "Complete the look" : "Start with these"}</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {suggestions.map((p) => {
                const img = imageFor(p, p.colours[0].name);
                return (
                  <div key={p.slug} className="relative">
                    <button type="button" onClick={() => setSuggestSize(suggestSize === p.slug ? null : p.slug)} className="block w-full text-left">
                      <span className="relative block aspect-[3/4] overflow-hidden border border-line bg-white">
                        <ProductImage src={img.src} alt={p.name} fill={img.filled} sizes="160px" />
                      </span>
                      <span className="mt-1.5 flex justify-between gap-2 text-[0.75rem]">
                        <span className="truncate">+ {p.name}</span>
                        <span className="shrink-0 text-ash">{formatPrice(p.price)}</span>
                      </span>
                    </button>
                    {suggestSize === p.slug && (
                      <div className="absolute inset-x-0 bottom-7 z-10 grid grid-cols-5 gap-1 border border-line bg-bone p-1.5">
                        {p.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              add({ slug: p.slug, colour: p.colours[0]?.name ?? "", size: s });
                              setSuggestSize(null);
                              setActive(p.slug);
                            }}
                            className="min-h-10 border border-line bg-white text-[0.75rem] hover:border-ink"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
                        ...(item.size ? [] : [{ value: "", label: "Pick size" }]),
                        ...product.sizes.map((s) => ({ value: s, label: s })),
                        { value: "Custom", label: "Custom fit", hint: item.size === "Custom" ? "" : "add measurements" },
                      ]}
                    />
                  </div>
                  {item.size === "Custom" && item.measurements && <p className="mt-1 text-[0.625rem] leading-snug text-bur">{item.measurements}</p>}
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
        {missingSize.length > 0 && (
          <p role="alert" className="mb-3 border border-error bg-error-soft px-3 py-2 text-[0.8125rem] text-error-ink">
            Pick a size for {missingSize.map((x) => x.product.name).join(", ")} before checkout.
          </p>
        )}
        {look.length > 0 ? (
          <>
            <Link
              href={missingSize.length ? "#" : "/checkout"}
              aria-disabled={missingSize.length > 0}
              onClick={(e) => { if (missingSize.length) e.preventDefault(); }}
              className={cx("btn w-full border-ink bg-ink text-shell hover:border-bur hover:bg-bur", missingSize.length > 0 && "pointer-events-none opacity-50")}
            >
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
      </aside>

      {look.length > 0 && (
        <div className="sticky bottom-0 z-30 order-4 flex items-center justify-between gap-4 border-t border-line bg-bone/95 px-5 py-3 backdrop-blur lg:hidden">
          <span className="text-[0.8125rem]">
            {look.length} {look.length === 1 ? "piece" : "pieces"} · <b className="font-medium">{formatPrice(total)}</b>
          </span>
          {missingSize.length ? (
            <span className="text-[0.75rem] text-error-ink">Pick sizes first</span>
          ) : (
            <Link href="/checkout" className="btn min-h-11 border-ink bg-ink px-5 text-shell">
              Checkout
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
