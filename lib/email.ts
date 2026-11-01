import "server-only";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";

type Order = {
  id: string;
  number: number;
  name: string;
  email: string;
  total: number;
  tracking?: string | null;
  items: { name: string; colour: string; size: string; price: number }[];
};

const base = () => process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/** Sends through Resend if RESEND_API_KEY is set; otherwise logs and skips, so orders never fail on email. */
async function send(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[email skipped: no RESEND_API_KEY] ${subject} → ${to}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.EMAIL_FROM ?? "JD’ORO <onboarding@resend.dev>", to, subject, html, reply_to: site.contact.email }),
  });
  if (!res.ok) console.error("email failed", res.status, await res.text());
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function wrap(o: Order, heading: string, body: string) {
  const rows = o.items
    .map((l) => `<tr><td style="padding:6px 0">${esc(l.name)} <span style="color:#6e6561">· ${esc(l.colour)} · ${l.size === "Custom" ? "Made to measure" : esc(l.size)}</span></td><td align="right">${formatPrice(l.price)}</td></tr>`)
    .join("");
  return `<div style="font-family:Georgia,serif;background:#faf7f3;padding:32px;color:#141111">
  <div style="max-width:520px;margin:auto;background:#fff;border:1px solid #e2d8cd;padding:32px">
    <p style="letter-spacing:.2em;font-size:11px;color:#806b29;margin:0">JD’ORO · ORDER #${o.number}</p>
    <h1 style="font-weight:normal;color:#4a1412;font-size:28px;margin:12px 0">${heading}</h1>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#3b3533">${body}</p>
    <table width="100%" style="font-family:Arial,sans-serif;font-size:14px;border-top:1px solid #e2d8cd;margin-top:16px">${rows}
      <tr><td style="padding-top:10px;border-top:1px solid #e2d8cd"><b>Total</b></td><td align="right" style="padding-top:10px;border-top:1px solid #e2d8cd"><b>${formatPrice(o.total)}</b></td></tr></table>
    <p style="margin-top:24px"><a href="${base()}/order/${o.id}" style="background:#4a1412;color:#ede3d9;padding:12px 20px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:.15em">VIEW YOUR ORDER</a></p>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#6e6561;margin-top:24px">Questions? Reply to this email or WhatsApp ${site.contact.phone}.</p>
  </div></div>`;
}

const first = (n: string) => esc(n.split(" ")[0]);

export const emails = {
  paid: (o: Order) =>
    send(o.email, `Order #${o.number} confirmed`, wrap(o, `Thank you, ${first(o.name)}.`, "Your payment is in. Each piece is cut to order, so allow 10–14 days. We’ll email you when it ships.")),
  cutting: (o: Order) =>
    send(o.email, `Order #${o.number} is being made`, wrap(o, "Your pieces are on the table.", "We’ve started cutting and sewing your order.")),
  shipped: (o: Order) =>
    send(o.email, `Order #${o.number} has shipped`, wrap(o, "It’s on its way.", o.tracking ? `Tracking number: <b>${esc(o.tracking)}</b>` : "Your parcel has left the studio.")),
  delivered: (o: Order) =>
    send(o.email, `Order #${o.number} delivered`, wrap(o, "Delivered. Wear it often.", "We hope it fits just right. If anything isn’t, reply and we’ll help.")),
  // Heads-up to the studio for every new paid order.
  studio: (o: Order) =>
    send(site.contact.email, `New order #${o.number} · ${formatPrice(o.total)}`, wrap(o, `New order from ${esc(o.name)}`, `Open <a href="${base()}/admin/orders">admin → Orders</a> for the address and sizes.`)),
};
