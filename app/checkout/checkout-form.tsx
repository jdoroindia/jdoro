"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState, useTransition } from "react";
import { ProductImage } from "@/components/product-card";
import { useCatalog } from "@/lib/catalog-context";
import { useFittingRoom } from "@/lib/fitting-room";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";
import { confirmPayment, startCheckout, type Customer } from "./actions";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay?: any;
  }
}

const empty: Customer = { name: "", email: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" };
const input = "mt-1.5 block min-h-11 w-full border-b border-line bg-transparent py-2.5 text-[0.9375rem] outline-none focus:border-bur";

export function CheckoutForm() {
  const { items, ready, total, clear } = useFittingRoom();
  const { find } = useCatalog();
  const router = useRouter();
  const [c, setC] = useState<Customer>(empty);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) => setC((p) => ({ ...p, [k]: e.target.value }));

  const look = items.map((i) => ({ i, p: find(i.slug) })).filter((x) => x.p);

  function pay() {
    setError(null);
    start(async () => {
      const res = await startCheckout(items, c);
      if (!res.ok) return setError(res.error);
      if (!window.Razorpay) return setError("The payment window didn’t load. Check your connection and try again.");
      const rz = new window.Razorpay({
        key: res.keyId,
        amount: res.amount,
        currency: "INR",
        name: "JD’ORO",
        description: `Order #${res.number}`,
        order_id: res.razorpayOrderId,
        prefill: { name: c.name, email: c.email, contact: c.phone },
        theme: { color: "#4A1412" },
        handler: async (r: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          const ok = await confirmPayment({ orderId: res.orderId, razorpayOrderId: r.razorpay_order_id, paymentId: r.razorpay_payment_id, signature: r.razorpay_signature });
          if (!ok.ok) return setError("We couldn’t confirm the payment. If money left your account, message us and we’ll sort it out.");
          clear();
          router.push(`/order/${res.orderId}`);
        },
        modal: { ondismiss: () => setError("Payment was cancelled. Your bag is still saved.") },
      });
      rz.on("payment.failed", () => setError("The payment didn’t go through. You haven’t been charged. Try again or use another method."));
      rz.open();
    });
  }

  if (ready && !look.length)
    return (
      <section className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-4xl text-bur">Nothing to check out yet.</h1>
        <Link href="/shop" className="btn mt-8 border-bur bg-bur text-shell">Browse the drop</Link>
      </section>
    );

  return (
    <section className="mx-auto grid max-w-[72rem] gap-10 px-5 py-10 md:px-10 md:py-12 lg:grid-cols-[1fr_24rem]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pay();
        }}
        className="grid content-start gap-6"
        noValidate
      >
        <h1 className="font-display text-4xl font-normal text-bur">Checkout</h1>
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="cap mb-2 text-ash">Contact</legend>
          <label className="sm:col-span-2 text-[0.75rem] text-ash">Full name<input className={input} autoComplete="name" value={c.name} onChange={set("name")} /></label>
          <label className="text-[0.75rem] text-ash">Email<input className={input} type="email" autoComplete="email" value={c.email} onChange={set("email")} /></label>
          <label className="text-[0.75rem] text-ash">Mobile<input className={input} type="tel" autoComplete="tel" value={c.phone} onChange={set("phone")} /></label>
        </fieldset>
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="cap mb-2 text-ash">Delivery address</legend>
          <label className="sm:col-span-2 text-[0.75rem] text-ash">House, street<input className={input} autoComplete="address-line1" value={c.line1} onChange={set("line1")} /></label>
          <label className="sm:col-span-2 text-[0.75rem] text-ash">Area, landmark (optional)<input className={input} autoComplete="address-line2" value={c.line2} onChange={set("line2")} /></label>
          <label className="text-[0.75rem] text-ash">City<input className={input} autoComplete="address-level2" value={c.city} onChange={set("city")} /></label>
          <label className="text-[0.75rem] text-ash">State<input className={input} autoComplete="address-level1" value={c.state} onChange={set("state")} /></label>
          <label className="text-[0.75rem] text-ash">Pincode<input className={input} inputMode="numeric" autoComplete="postal-code" value={c.pincode} onChange={set("pincode")} /></label>
        </fieldset>
        {error && (
          <p role="alert" className="flex items-start gap-2.5 border border-error bg-error-soft px-4 py-3 text-[0.875rem] text-error-ink">
            <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-error text-[0.75rem] text-white">!</span>
            {error}
          </p>
        )}
        <button disabled={pending || !ready} className="btn border-bur bg-bur text-shell hover:bg-ink disabled:opacity-60">
          {pending ? "Opening payment…" : `Pay ${formatPrice(total)}`}
        </button>
        <p className="text-[0.75rem] text-ash">
          By paying you agree to our <Link className="underline" href="/terms">terms</Link> and{" "}
          <Link className="underline" href="/refunds">refund policy</Link>. Secure payment by Razorpay: UPI, cards, netbanking and wallets. Prefer to talk first?{" "}
          <a className="underline" href={`https://wa.me/${site.contact.whatsapp}`}>Order on WhatsApp</a>.
        </p>
      </form>

      <aside className="order-first h-fit border border-line bg-white p-5 md:p-6 lg:order-none lg:sticky lg:top-32">
        <h2 className="cap">Your order</h2>
        <ul className="mt-3">
          {look.map(({ i, p }) => {
            const col = p!.colours.find((x) => x.name === i.colour) ?? p!.colours[0];
            return (
              <li key={i.slug} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-line py-3 text-[0.8125rem]">
                <span className="relative block h-16 overflow-hidden border border-line">{col && <ProductImage src={col.image} alt="" fill={Boolean(col.back)} sizes="48px" />}</span>
                <span>
                  {p!.name}
                  <small className="block text-ash">{i.colour} · {i.size === "Custom" ? "Made to measure" : i.size}</small>
                </span>
                <span>{formatPrice(p!.price)}</span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 grid gap-1.5 text-[0.875rem]">
          <div className="flex justify-between"><dt className="text-ash">Shipping</dt><dd>Free</dd></div>
          <div className="flex justify-between font-medium"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        <Link href="/fitting-room" className="mt-4 inline-block text-[0.75rem] underline">Edit your bag</Link>
      </aside>
    </section>
  );
}
