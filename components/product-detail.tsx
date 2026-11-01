"use client";

import { useRef, useState } from "react";
import { ProductImage } from "@/components/product-card";
import { useFittingRoom } from "@/lib/fitting-room";
import { formatPrice, type Product } from "@/lib/products";
import { cx } from "@/lib/cx";

/** Body measurements in inches. Placeholder values: replace with JD’ORO's own block. */
const sizeChart = [
  { size: "XS", bust: 32, waist: 26, hip: 35 },
  { size: "S", bust: 34, waist: 28, hip: 37 },
  { size: "M", bust: 36, waist: 30, hip: 39 },
  { size: "L", bust: 38, waist: 32, hip: 41 },
  { size: "XL", bust: 40, waist: 34, hip: 43 },
];

const CUSTOM = "Custom";

/** Fields for a made-to-measure request, in inches. */
const measureFields = [
  { key: "bust", label: "Bust", required: true },
  { key: "waist", label: "Waist", required: true },
  { key: "hip", label: "Hip", required: true },
  { key: "shoulder", label: "Shoulder", required: false },
  { key: "length", label: "Length", required: false },
  { key: "notes", label: "Notes", required: false },
];

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useFittingRoom();
  const [colourName, setColourName] = useState(product.colours[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [measures, setMeasures] = useState<Record<string, string>>({});
  const chartRef = useRef<HTMLDialogElement>(null);
  const colour = product.colours.find((c) => c.name === colourName) ?? product.colours[0];
  const views = [colour.image, colour.back].filter(Boolean) as string[];
  const filled = Boolean(colour.back);

  const custom = size === CUSTOM;
  const missing = custom ? measureFields.filter((f) => f.required && !measures[f.key]?.trim()) : [];

  const names = missing.map((f) => f.label.toLowerCase());
  const problem = !size
    ? "Please choose a size, or select “Made to your measurements”."
    : names.length
      ? `Please add your ${names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0]} measurement${names.length > 1 ? "s" : ""} to continue.`
      : null;
  // Only shown after the shopper tries to add; clears itself as fields are filled.
  const error = attempted ? problem : null;

  function addToLook() {
    if (problem || !size) {
      setAttempted(true);
      return;
    }
    setAttempted(false);
    const measurements = custom
      ? measureFields
          .filter((f) => measures[f.key]?.trim())
          .map((f) => `${f.label} ${measures[f.key].trim()}${f.key === "notes" ? "" : "″"}`)
          .join(", ")
      : undefined;
    add({ slug: product.slug, colour: colour.name, size, measurements });
    setAdded(true);
  }

  return (
    <section className="mx-auto grid max-w-[88rem] gap-10 px-5 py-8 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-12">
      <div className={cx("grid gap-3", views.length > 1 && "sm:grid-cols-2")}>
        {views.map((src, i) => (
          <div key={src} className="relative aspect-[3/4] overflow-hidden border border-line bg-white">
            <ProductImage
              src={src}
              alt={`${product.name} in ${colour.name}, ${i === 0 ? "front" : "back"}`}
              fill={filled}
              priority={i === 0}
              sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
            />
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-32 lg:self-start">
        {product.left <= 4 && (
          <span className="cap inline-block bg-candy px-2.5 py-1.5 text-[0.5625rem] text-bur">Only {product.left} left in this run</span>
        )}
        <h1 className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-normal leading-tight text-bur">{product.name}</h1>
        <p className="mt-2 text-lg">{formatPrice(product.price)}</p>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-graphite">{product.description}</p>

        <div className="mt-8">
          <p className="cap text-ash">
            Colour · <span className="text-ink">{colour.name}</span>
          </p>
          <div className="mt-3 flex gap-3">
            {product.colours.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                aria-pressed={c.name === colour.name}
                onClick={() => setColourName(c.name)}
                className={cx(
                  "size-7 rounded-full border border-line outline-offset-[3px]",
                  c.name === colour.name && "outline outline-1 outline-ink",
                )}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="cap text-ash">Size</p>
            <button
              type="button"
              onClick={() => chartRef.current?.showModal()}
              className="cap text-ink underline decoration-line underline-offset-4 hover:text-bur hover:decoration-bur"
            >
              Size chart
            </button>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setAdded(false);
                }}
                className={cx(
                  "border py-3 text-[0.8125rem] transition-colors",
                  size === s ? "border-ink bg-ink text-shell" : "border-line hover:border-ink",
                )}
              >
                {s}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={custom}
              aria-expanded={custom}
              aria-controls="custom-measurements"
              onClick={() => {
                setSize(CUSTOM);
                setAdded(false);
              }}
              className={cx(
                "col-span-5 border py-3 text-[0.8125rem] transition-colors",
                custom ? "border-bur bg-bur text-shell" : "border-dashed border-mist hover:border-bur hover:text-bur",
              )}
            >
              Made to your measurements
            </button>
          </div>

          {custom ? (
            <fieldset id="custom-measurements" className="mt-4 border border-line bg-white p-4">
              <legend className="cap px-1 text-bur">Your measurements (inches)</legend>
              <div className="grid grid-cols-3 gap-3">
                {measureFields
                  .filter((f) => f.key !== "notes")
                  .map((f) => (
                    <label key={f.key} className="block text-[0.6875rem] text-ash">
                      {f.label}
                      {f.required && <span className="text-berry"> *</span>}
                      <input
                        inputMode="decimal"
                        value={measures[f.key] ?? ""}
                        onChange={(e) => {
                          setMeasures((m) => ({ ...m, [f.key]: e.target.value }));
                          setAdded(false);
                        }}
                        placeholder="—"
                        aria-invalid={Boolean(error) && missing.some((m) => m.key === f.key)}
                        className={cx(
                          "mt-1 block w-full border-b bg-transparent py-1.5 text-[0.875rem] text-ink outline-none focus:border-bur",
                          error && missing.some((m) => m.key === f.key) ? "border-b-2 border-[#B3261E] bg-[#FDECEC]" : "border-line",
                        )}
                      />
                    </label>
                  ))}
              </div>
              <label className="mt-4 block text-[0.6875rem] text-ash">
                Anything else? (height, fit you like, occasion)
                <textarea
                  rows={2}
                  value={measures.notes ?? ""}
                  onChange={(e) => {
                    setMeasures((m) => ({ ...m, notes: e.target.value }));
                    setAdded(false);
                  }}
                  className="mt-1 block w-full resize-none border-b border-line bg-transparent py-1.5 text-[0.875rem] text-ink outline-none focus:border-bur"
                />
              </label>
              <p className="mt-3 text-[0.6875rem] text-ash">
                No extra charge. We’ll confirm the fit with you on WhatsApp before we cut. Allow 3–5 extra days.
              </p>
            </fieldset>
          ) : (
            <p className="mt-3 text-[0.75rem] text-ash">Made to order. Between sizes? Choose “Made to your measurements”.</p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {error && (
            <p
              role="alert"
              className="flex items-center gap-2.5 border border-[#B3261E] bg-[#FDECEC] px-4 py-3 text-[0.875rem] font-normal text-[#8C1D18]"
            >
              <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-[#B3261E] text-[0.75rem] font-medium text-white">
                !
              </span>
              {error}
            </p>
          )}
          <button type="button" onClick={addToLook} className="btn border-bur bg-bur text-shell hover:border-ink hover:bg-ink">
            {added ? "✓ Added to Fitting Room" : "Add to Fitting Room"}
          </button>
        </div>

        <dialog
          ref={chartRef}
          aria-labelledby="size-chart-title"
          onClick={(e) => e.target === e.currentTarget && chartRef.current?.close()}
          className="m-auto w-[min(92vw,30rem)] bg-bone p-0 text-ink backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
        >
          <div className="p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="size-chart-title" className="font-display text-2xl font-normal text-bur">Size chart</h2>
            <button type="button" onClick={() => chartRef.current?.close()} className="cap text-ash hover:text-ink" aria-label="Close size chart">
              Close ✕
            </button>
          </div>
          <table className="w-full text-left text-[0.8125rem]">
            <caption className="sr-only">Body measurements in inches</caption>
            <thead>
              <tr className="border-b border-line text-ash">
                <th className="py-2 font-normal">Size</th>
                <th className="py-2 font-normal">Bust</th>
                <th className="py-2 font-normal">Waist</th>
                <th className="py-2 font-normal">Hip</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((r) => (
                <tr key={r.size} className={cx("border-b border-line", size === r.size && "bg-shell")}>
                  <td className="py-2.5">{r.size}</td>
                  <td>{r.bust}″</td>
                  <td>{r.waist}″</td>
                  <td>{r.hip}″</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="pb-2 pt-3 text-[0.75rem] text-ash">
            Body measurements in inches. Measure the fullest part of the bust and hip, and the narrowest part of the waist.
          </p>
          </div>
        </dialog>

        <dl className="mt-10 divide-y divide-line border-y border-line text-[0.8125rem]">
          {[
            ["Fabric", product.fabric],
            ["Made", "Cut to order in India, ships in 10–14 days"],
            ["Care", "Cold hand wash, dry in shade"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-3.5">
              <dt className="text-ash">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
