import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { serverClient } from "@/lib/supabase/server";
import { AccountLogin } from "./account-login";
import { signOutCustomer } from "./actions";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

const label: Record<string, string> = {
  paid: "Paid",
  cutting: "Being made",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const supabase = await serverClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;

  if (!user)
    return (
      <section className="mx-auto max-w-md px-5 py-20">
        <p className="cap text-olive">Your account</p>
        <h1 className="mt-3 font-display text-4xl font-normal text-bur">Your orders</h1>
        <p className="mt-3 text-[0.9375rem] text-graphite">Enter the email you ordered with. We’ll send a sign-in link, no password needed.</p>
        {error && (
          <p role="alert" className="mt-6 border border-error bg-error-soft px-4 py-3 text-[0.875rem] text-error-ink">
            That link has expired or was already used. Ask for a new one.
          </p>
        )}
        <AccountLogin />
      </section>
    );

  // RLS only returns paid orders placed with this email.
  const { data: orders } = await supabase.from("orders").select("id,number,status,total,items,created_at,tracking").order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-2xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="cap text-olive">Signed in as {user.email}</p>
          <h1 className="mt-3 font-display text-4xl font-normal text-bur">Your orders</h1>
        </div>
        <form action={signOutCustomer}>
          <button className="text-[0.8125rem] underline">Sign out</button>
        </form>
      </div>
      {!orders?.length ? (
        <p className="mt-10 text-graphite">
          No orders with this email yet. <Link href="/shop" className="underline">Browse the drop</Link>.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {orders.map((o) => (
            <li key={o.id}>
              <Link href={`/order/${o.id}`} className="flex items-center justify-between gap-4 py-4 hover:bg-shell/40">
                <span>
                  <span className="block text-[0.9375rem]">
                    #{o.number} · {(o.items as { name: string }[]).map((l) => l.name).join(", ")}
                  </span>
                  <span className="block text-[0.75rem] text-ash">
                    {new Date(o.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })} · {label[o.status] ?? o.status}
                    {o.tracking ? ` · Tracking ${o.tracking}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-[0.875rem]">{formatPrice(o.total)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
