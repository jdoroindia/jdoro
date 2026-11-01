import "server-only";
import { revalidatePath } from "next/cache";
import { emails } from "@/lib/email";
import { serviceClient } from "@/lib/supabase/service";

/**
 * Marks an order paid exactly once, whether the confirmation comes from the
 * customer's browser or from Razorpay's webhook. Stock and emails only happen
 * for whichever arrives first.
 */
export async function markPaid(razorpayOrderId: string, paymentId: string) {
  const db = serviceClient();
  const { data: order } = await db
    .from("orders")
    .update({ status: "paid", razorpay_payment_id: paymentId, paid_at: new Date().toISOString() })
    .eq("razorpay_order_id", razorpayOrderId)
    .eq("status", "pending")
    .select("*")
    .maybeSingle();
  if (!order) return false;
  for (const l of order.items as { slug: string; qty: number }[]) await db.rpc("take_stock", { p_slug: l.slug, p_qty: l.qty });
  revalidatePath("/", "layout");
  await Promise.allSettled([emails.paid(order), emails.studio(order)]);
  return true;
}
