import { createHmac, timingSafeEqual } from "node:crypto";
import { markPaid } from "@/lib/orders";

/**
 * Razorpay calls this after a payment is captured, even if the customer closed
 * the tab before returning. Set it up in Razorpay → Settings → Webhooks with
 * URL https://jdoro.in/api/razorpay/webhook, events "payment.captured" and
 * "order.paid", and the same secret as RAZORPAY_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return new Response("webhook not configured", { status: 503 });

  const raw = await request.text();
  const sig = request.headers.get("x-razorpay-signature") ?? "";
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response("bad signature", { status: 401 });

  const event = JSON.parse(raw);
  const payment = event?.payload?.payment?.entity;
  if ((event.event === "payment.captured" || event.event === "order.paid") && payment?.order_id) {
    await markPaid(payment.order_id, payment.id);
  }
  return Response.json({ ok: true });
}
