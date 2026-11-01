"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { categoryIds, fits, type Colour, type Product } from "@/lib/products";
import { browserClient } from "@/lib/supabase/browser";
import { cx } from "@/lib/cx";
import { deleteProduct, saveProduct } from "../../actions";

export const inputCls =
  "mt-1.5 block w-full border-b border-line bg-transparent py-2 text-[0.9375rem] text-ink outline-none focus:border-bur";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="cap text-[0.625rem] text-ash">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[0.6875rem] text-mist">{hint}</span>}
    </label>
  );
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function upload(file: File): Promise<string> {
  const supabase = browserClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("products").upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from("products").getPublicUrl(path).data.publicUrl;
}

function PhotoSlot({ label, src, onChange }: { label: string; src?: string; onChange: (url: string | undefined) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div>
      <span className="cap text-[0.625rem] text-ash">{label}</span>
      <label className="mt-1.5 flex aspect-[3/4] w-28 cursor-pointer items-center justify-center overflow-hidden border border-dashed border-mist bg-white text-center text-[0.6875rem] text-ash hover:border-bur">
        {src ? (
          <span className="relative block h-full w-full">
            <Image src={src} alt="" fill sizes="112px" className="object-cover" />
          </span>
        ) : busy ? (
          "Uploading…"
        ) : (
          "+ Add photo"
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            if (f.size > 8 * 1024 * 1024) return setErr("Max 8 MB");
            setBusy(true);
            setErr(null);
            try {
              onChange(await upload(f));
            } catch (x) {
              setErr((x as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      {src && (
        <button type="button" onClick={() => onChange(undefined)} className="mt-1 text-[0.6875rem] text-ash underline">
          Remove
        </button>
      )}
      {err && <p className="mt-1 text-[0.6875rem] text-error-ink">{err}</p>}
    </div>
  );
}

export function ProductForm({ product, others }: { product: Product | null; others: { slug: string; name: string }[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [f, setF] = useState({
    slug: product?.slug ?? "",
    name: product?.name ?? "",
    price: String(product?.price ?? ""),
    category: product?.category ?? "tops",
    fit: product?.fit ?? "Regular",
    unisex: product?.unisex ?? false,
    detail: product?.detail ?? "",
    description: product?.description ?? "",
    fabric: product?.fabric ?? "",
    sizes: product?.sizes ?? ["XS", "S", "M", "L", "XL"],
    pairsWith: product?.pairsWith ?? [],
    stock: String(product?.left ?? 5),
    published: product?.published ?? true,
  });
  const [colours, setColours] = useState<Colour[]>(product?.colours ?? [{ name: "", hex: "#cccccc", image: "" }]);
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    setSaved(false);
  };
  const setColour = (i: number, patch: Partial<Colour>) => {
    setColours((cs) => cs.map((c, j) => (j === i ? { ...c, ...patch } : c)));
    setSaved(false);
  };

  function submit() {
    setError(null);
    start(async () => {
      const res = await saveProduct({
        originalSlug: product?.slug ?? null,
        ...f,
        price: Number(f.price),
        stock: Number(f.stock || 0),
        colours,
      });
      if (!res.ok) return setError(res.error ?? "Could not save.");
      setSaved(true);
      if (!product || res.slug !== product.slug) router.replace(`/admin/products/${res.slug}`);
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="mt-8 grid gap-8"
    >
      <section className="grid gap-6 md:grid-cols-2">
        <Field label="Name">
          <input
            value={f.name}
            onChange={(e) => {
              set("name", e.target.value);
              if (!slugTouched) set("slug", slugify(e.target.value));
            }}
            className={inputCls}
            required
          />
        </Field>
        <Field label="Web address" hint={`jdoro.in/shop/${f.slug || "…"}`}>
          <input
            value={f.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", slugify(e.target.value));
            }}
            className={inputCls}
            required
          />
        </Field>
        <Field label="Price (₹)">
          <input inputMode="numeric" value={f.price} onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))} className={inputCls} required />
        </Field>
        <Field label="Pieces left" hint="Shows “Only N left” when 4 or fewer.">
          <input inputMode="numeric" value={f.stock} onChange={(e) => set("stock", e.target.value.replace(/\D/g, ""))} className={inputCls} />
        </Field>
        <Field label="Category">
          <div className="mt-2 flex flex-wrap gap-2">
            {categoryIds.map((c) => (
              <Chip key={c} on={f.category === c} onClick={() => set("category", c)}>
                {c[0].toUpperCase() + c.slice(1)}
              </Chip>
            ))}
          </div>
        </Field>
        <Field label="Fit">
          <div className="mt-2 flex flex-wrap gap-2">
            {fits.map((x) => (
              <Chip key={x} on={f.fit === x} onClick={() => set("fit", x)}>
                {x}
              </Chip>
            ))}
            <Chip on={f.unisex} onClick={() => set("unisex", !f.unisex)}>
              {f.unisex ? "✓ Unisex" : "Unisex?"}
            </Chip>
          </div>
        </Field>
      </section>

      <section className="grid gap-6">
        <Field label="Short line under the name" hint="e.g. “Charcoal · also in blush”">
          <input value={f.detail} onChange={(e) => set("detail", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Description">
          <textarea rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Fabric">
          <input value={f.fabric} onChange={(e) => set("fabric", e.target.value)} className={inputCls} />
        </Field>
        <div>
          <span className="cap text-[0.625rem] text-ash">Sizes</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALL_SIZES.map((s) => (
              <Chip key={s} on={f.sizes.includes(s)} onClick={() => set("sizes", f.sizes.includes(s) ? f.sizes.filter((x) => x !== s) : ALL_SIZES.filter((x) => x === s || f.sizes.includes(x)))}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <section>
        <span className="cap text-[0.625rem] text-ash">Colours and photos</span>
        <div className="mt-3 grid gap-4">
          {colours.map((c, i) => (
            <div key={i} className="flex flex-wrap items-start gap-4 border border-line bg-white p-3 md:gap-5 md:p-4">
              <PhotoSlot label="Front" src={c.image || undefined} onChange={(u) => setColour(i, { image: u ?? "" })} />
              <PhotoSlot label="Back (optional)" src={c.back} onChange={(u) => setColour(i, { back: u })} />
              <div className="grid w-full gap-4 sm:w-auto sm:min-w-[12rem] sm:flex-1">
                <Field label="Colour name">
                  <input value={c.name} onChange={(e) => setColour(i, { name: e.target.value })} className={inputCls} />
                </Field>
                <label className="flex items-center gap-3 text-[0.8125rem]">
                  <input type="color" value={c.hex} onChange={(e) => setColour(i, { hex: e.target.value })} className="h-8 w-10 cursor-pointer border border-line bg-transparent" />
                  Swatch colour
                </label>
                {colours.length > 1 && (
                  <button type="button" onClick={() => setColours((cs) => cs.filter((_, j) => j !== i))} className="w-fit text-[0.75rem] text-error-ink underline">
                    Remove this colour
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setColours((cs) => [...cs, { name: "", hex: "#cccccc", image: "" }])} className="w-fit text-[0.8125rem] underline underline-offset-2">
            + Add another colour
          </button>
        </div>
      </section>

      {others.length > 0 && (
        <section>
          <span className="cap text-[0.625rem] text-ash">Goes well with (Fitting Room suggestions)</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {others.map((o) => (
              <Chip key={o.slug} on={f.pairsWith.includes(o.slug)} onClick={() => set("pairsWith", f.pairsWith.includes(o.slug) ? f.pairsWith.filter((x) => x !== o.slug) : [...f.pairsWith, o.slug])}>
                {o.name}
              </Chip>
            ))}
          </div>
        </section>
      )}

      <label className="flex items-center gap-3 text-[0.9375rem]">
        <input type="checkbox" checked={f.published} onChange={(e) => set("published", e.target.checked)} className="size-5" />
        Live on the site
      </label>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-line bg-bone/95 px-4 py-3 backdrop-blur md:-mx-8 md:gap-4 md:px-8 md:py-4">
        <button disabled={pending} className="btn flex-1 border-bur bg-bur text-shell hover:bg-ink disabled:opacity-60 sm:flex-none">
          {pending ? "Saving…" : product ? "Save changes" : "Create piece"}
        </button>
        {saved && <span role="status" className="text-[0.875rem] text-olive">✓ Saved. The site is updated.</span>}
        {error && (
          <span role="alert" className="border border-error bg-error-soft px-3 py-2 text-[0.875rem] text-error-ink">
            {error}
          </span>
        )}
        {product && (
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm(`Delete “${product.name}” for good? To take it off the site for now, untick “Live on the site” instead.`))
                start(() => deleteProduct(product.slug));
            }}
            className="min-h-11 text-[0.8125rem] text-error-ink underline sm:ml-auto"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cx("min-h-11 border px-3 text-[0.8125rem] transition-colors md:min-h-0 md:py-1.5", on ? "border-ink bg-ink text-shell" : "border-line bg-white hover:border-ink")}
    >
      {children}
    </button>
  );
}
