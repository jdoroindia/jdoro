import { formatPrice } from "@/lib/products";
import { serverClient } from "@/lib/supabase/server";
import { OrderRow } from "./order-row";

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { show } = await searchParams;
  const supabase = await serverClient();
  let q = supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(200);
  // Unpaid attempts are hidden by default; they're people who closed the payment window.
  if (show !== "all") q = q.neq("status", "pending");
  const { data: orders, error } = await q;
  const open = (orders ?? []).filter((o) => ["paid", "cutting"].includes(o.status));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-normal text-bur">Orders</h1>
          <p className="mt-1 text-[0.8125rem] text-ash">
            {open.length} to make · {formatPrice(open.reduce((s, o) => s + o.total, 0))} in open orders
          </p>
        </div>
        <a href={show === "all" ? "/admin/orders" : "/admin/orders?show=all"} className="inline-flex min-h-11 items-center text-[0.8125rem] underline">
          {show === "all" ? "Hide unpaid attempts" : "Show unpaid attempts too"}
        </a>
      </div>
      {error && <p className="mt-6 text-error-ink">{error.message}</p>}
      {!orders?.length && <p className="mt-10 text-graphite">No orders yet.</p>}
      <ul className="mt-8 grid gap-4">
        {(orders ?? []).map((o) => (
          <OrderRow key={o.id} order={o} shiprocket={process.env.SHIPROCKET_ENABLED === "true"} />
        ))}
      </ul>
    </>
  );
}
