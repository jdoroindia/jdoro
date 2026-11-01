import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/products";
import { serviceClient } from "@/lib/supabase/service";

export const metadata: Metadata = { title: "Your order", robots: { index: false } };

const label: Record<string, string> = {
  pending: "Waiting for payment",
  paid: "Paid · we’ll start cutting soon",
  cutting: "Being made",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

/** The order id is a random UUID, so only someone with the link can see it. */
export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { data: o } = await serviceClient().from("orders").select("*").eq("id", id).maybeSingle();
  if (!o) notFound();
  const items = o.items as { name: string; colour: string; size: string; price: number }[];

  return (
    <section className="mx-auto max-w-2xl px-5 py-16">
      <p className="cap text-olive">Order #{o.number}</p>
      <h1 className="mt-3 font-display text-4xl font-normal text-bur">
        {o.status === "pending" ? "Almost there." : `Thank you, ${o.name.split(" ")[0]}.`}
      </h1>
      <p className="mt-3 text-[0.9375rem] text-graphite">
        Status: <b className="font-medium">{label[o.status]}</b>
        {o.tracking && (
          <>
            {" "}· {o.courier ? `${o.courier} ` : ""}tracking{" "}
            <a className="underline" target="_blank" rel="noreferrer" href={`https://shiprocket.co/tracking/${encodeURIComponent(o.tracking)}`}>
              {o.tracking}
            </a>
          </>
        )}
      </p>
      <p className="mt-2 text-[0.875rem] text-ash">Each piece is cut to order, so allow 10–14 days. Save this page to check on your order.</p>
      <ul className="mt-8 border-y border-line">
        {items.map((l, i) => (
          <li key={i} className="flex justify-between border-b border-line py-3 text-[0.875rem] last:border-0">
            <span>{l.name} <small className="text-ash">· {l.colour} · {l.size === "Custom" ? "Made to measure" : l.size}</small></span>
            <span>{formatPrice(l.price)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex justify-between text-[0.9375rem] font-medium"><span>Total</span><span>{formatPrice(o.total)}</span></p>
      <Link href="/shop" className="btn mt-10 text-ink hover:bg-ink hover:text-shell">Keep browsing</Link>
    </section>
  );
}
