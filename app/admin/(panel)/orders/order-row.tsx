"use client";

import { useState, useTransition } from "react";
import { formatPrice } from "@/lib/products";
import { cx } from "@/lib/cx";
import { shipWithShiprocket, updateOrder } from "../../actions";

const steps = [
  { id: "paid", label: "Paid" },
  { id: "cutting", label: "Making" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
];

type Line = { name: string; colour: string; size: string; measurements: string | null; price: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OrderRow({ order: o, shiprocket }: { order: any; shiprocket: boolean }) {
  const [pending, start] = useTransition();
  const [tracking, setTracking] = useState(o.tracking ?? "");
  const [shipError, setShipError] = useState<string | null>(null);
  const canBook = shiprocket && ["paid", "cutting"].includes(o.status);
  const a = o.address;
  const lines = o.items as Line[];

  return (
    <li className={cx("border bg-white p-4 md:p-5", o.status === "paid" ? "border-bur" : "border-line")}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-xl">
          #{o.number} · {o.name}
        </p>
        <p className="text-[0.8125rem] text-ash">
          {new Date(o.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} · <b className="text-ink">{formatPrice(o.total)}</b>
        </p>
      </div>
      <ul className="mt-3 grid gap-1 text-[0.875rem]">
        {lines.map((l, i) => (
          <li key={i}>
            {l.name} · {l.colour} · <b className="font-medium">{l.size === "Custom" ? "Made to measure" : l.size}</b>
            {l.measurements && <span className="block text-[0.8125rem] text-bur">{l.measurements}</span>}
          </li>
        ))}
      </ul>
      <p className="mt-3 break-words text-[0.8125rem] leading-relaxed text-graphite">
        {[a.line1, a.line2, a.city, a.state, a.pincode].filter(Boolean).join(", ")}
        <br />
        <a className="underline" href={`tel:${o.phone}`}>{o.phone}</a> · <a className="underline" href={`mailto:${o.email}`}>{o.email}</a> ·{" "}
        <a className="underline" href={`https://wa.me/${o.phone.replace(/\D/g, "").replace(/^(?!91)(\d{10})$/, "91$1")}`} target="_blank" rel="noreferrer">WhatsApp</a>
      </p>

      {o.status === "pending" ? (
        <p className="mt-4 text-[0.8125rem] text-ash">Not paid. The customer closed the payment window. Nothing to do.</p>
      ) : (
        <div className="mt-4 grid grid-cols-4 gap-1.5 md:flex md:flex-wrap md:items-center md:gap-2">
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              disabled={pending}
              onClick={() => start(() => updateOrder(o.id, { status: s.id }))}
              className={cx("min-h-11 border px-1 text-[0.8125rem] disabled:opacity-50 md:min-h-0 md:px-3 md:py-1.5", o.status === s.id ? "border-ink bg-ink text-shell" : "border-line hover:border-ink")}
            >
              {s.label}
            </button>
          ))}
          <input
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="Tracking / AWB no."
            className="col-span-3 mt-2 min-h-11 border-b border-line bg-transparent py-1.5 text-[0.8125rem] outline-none focus:border-bur md:col-span-1 md:ml-auto md:mt-0 md:min-h-0 md:w-44"
          />
          <button type="button" disabled={pending || tracking === (o.tracking ?? "")} onClick={() => start(() => updateOrder(o.id, { tracking }))} className="mt-2 min-h-11 text-[0.8125rem] underline disabled:opacity-40 md:mt-0 md:min-h-0">
            Save
          </button>
        </div>
      )}
      {canBook && (
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (!confirm("Book a Shiprocket pickup for this order? Shiprocket charges your wallet for the cheapest suitable courier.")) return;
              setShipError(null);
              start(async () => {
                const r = await shipWithShiprocket(o.id);
                if (!r.ok) setShipError(r.error ?? "Booking failed.");
              });
            }}
            className="btn w-full border-olive bg-olive py-2.5 text-shell hover:bg-ink disabled:opacity-50 sm:w-auto"
          >
            {pending ? "Booking…" : "Book Shiprocket pickup"}
          </button>
          <span className="text-[0.75rem] text-ash">Creates the shipment, assigns a courier, requests pickup, saves the AWB and emails the customer.</span>
          {shipError && <p role="alert" className="w-full border border-error bg-error-soft px-3 py-2 text-[0.8125rem] text-error-ink">{shipError}</p>}
        </div>
      )}
      {(o.courier || o.label_url) && (
        <p className="mt-3 text-[0.8125rem]">
          {o.courier && <>Courier: {o.courier} · </>}
          {o.tracking && <a className="underline" target="_blank" rel="noreferrer" href={`https://shiprocket.co/tracking/${o.tracking}`}>Track</a>}
          {o.label_url && <> · <a className="underline" target="_blank" rel="noreferrer" href={o.label_url}>Print shipping label</a></>}
        </p>
      )}
      <a href={`/order/${o.id}`} target="_blank" className="mt-3 inline-block text-[0.75rem] text-ash underline">Customer’s order page ↗</a>
    </li>
  );
}
