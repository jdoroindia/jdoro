"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { markPaid } from "@/lib/orders";
import { fromRow } from "@/lib/products";
import { serviceClient } from "@/lib/supabase/service";
import type { LookItem } from "@/lib/fitting-room";

export type Customer = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
};

const SHIPPING = 0; // Free across India for now.

function keys() {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  return id && secret ? { id, secret } : null;
}

function validate(c: Customer) {
  if (c.name.trim().length < 2) return "Add your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim())) return "Add a valid email so we can send your receipt.";
  if (!/^(\+?91)?[6-9]\d{9}$/.test(c.phone.replace(/[\s-]/g, ""))) return "Add a 10-digit Indian mobile number.";
  if (c.line1.trim().length < 4) return "Add your house and street.";
  if (!c.city.trim()) return "Add your city.";
  if (!c.state.trim()) return "Add your state.";
  if (!/^\d{6}$/.test(c.pincode.trim())) return "Add a 6-digit pincode.";
  return null;
}

export type StartResult =
  | { ok: true; orderId: string; razorpayOrderId: string; amount: number; keyId: string; number: number }
  | { ok: false; error: string };

/** Prices come from the database, never from the browser. */
export async function startCheckout(items: LookItem[], customer: Customer): Promise<StartResult> {
  const k = keys();
  if (!k) return { ok: false, error: "Online payment isn’t switched on yet. Please order on WhatsApp for now." };
  const problem = validate(customer);
  if (problem) return { ok: false, error: problem };
  if (!items.length) return { ok: false, error: "Your look is empty." };

  const db = serviceClient();
  const { data: rows, error } = await db
    .from("products")
    .select("*")
    .in("slug", items.map((i) => i.slug))
    .eq("published", true);
  if (error) return { ok: false, error: "Could not load products. Try again." };
  const bySlug = new Map(rows.map((r) => [r.slug, fromRow(r)]));

  const lines = [];
  for (const i of items) {
    const p = bySlug.get(i.slug);
    if (!p) return { ok: false, error: "One of your pieces is no longer available. Remove it and try again." };
    if (p.left < 1) return { ok: false, error: `${p.name} has sold out.` };
    if (i.size !== "Custom" && !p.sizes.includes(i.size)) return { ok: false, error: `Pick a size for ${p.name}.` };
    lines.push({ slug: p.slug, name: p.name, price: p.price, qty: 1, colour: i.colour, size: i.size, measurements: i.measurements ?? null });
  }
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const total = subtotal + SHIPPING;

  const { data: order, error: insErr } = await db
    .from("orders")
    .insert({
      name: customer.name.trim(),
      email: customer.email.trim().toLowerCase(),
      phone: customer.phone.trim(),
      address: { line1: customer.line1.trim(), line2: customer.line2.trim(), city: customer.city.trim(), state: customer.state.trim(), pincode: customer.pincode.trim() },
      items: lines,
      subtotal,
      shipping: SHIPPING,
      total,
    })
    .select("id, number")
    .single();
  if (insErr || !order) return { ok: false, error: "Could not create your order. Try again." };

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${k.id}:${k.secret}`).toString("base64") },
    body: JSON.stringify({ amount: total * 100, currency: "INR", receipt: `JD${order.number}`, notes: { order_id: order.id } }),
  });
  const rz = await res.json();
  if (!res.ok) {
    console.error("razorpay order", rz);
    return { ok: false, error: "The payment service didn’t respond. Try again in a minute." };
  }
  await db.from("orders").update({ razorpay_order_id: rz.id }).eq("id", order.id);
  return { ok: true, orderId: order.id, razorpayOrderId: rz.id, amount: total * 100, keyId: k.id, number: order.number };
}

/** Called after the Razorpay popup succeeds. The signature proves the payment is genuine. */
export async function confirmPayment(p: { orderId: string; razorpayOrderId: string; paymentId: string; signature: string }) {
  const k = keys();
  if (!k) return { ok: false };
  const expected = createHmac("sha256", k.secret).update(`${p.razorpayOrderId}|${p.paymentId}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(p.signature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { ok: false };

  await markPaid(p.razorpayOrderId, p.paymentId);
  return { ok: true };
}
