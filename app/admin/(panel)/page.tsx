import Image from "next/image";
import Link from "next/link";
import { formatPrice, fromRow } from "@/lib/products";
import { serverClient } from "@/lib/supabase/server";
import { PublishToggle } from "./publish-toggle";

export default async function AdminProducts() {
  const supabase = await serverClient();
  const { data, error } = await supabase.from("products").select("*").order("sort");
  const products = (data ?? []).map(fromRow);

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-normal text-bur">Products</h1>
          <p className="mt-1 text-[0.8125rem] text-ash">
            {products.filter((p) => p.published).length} live · {products.filter((p) => !p.published).length} hidden
          </p>
        </div>
        <Link href="/admin/products/new" className="btn border-bur bg-bur text-shell hover:bg-ink">
          + New piece
        </Link>
      </div>
      {error && <p className="mt-6 text-error-ink">{error.message}</p>}
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {products.map((p) => (
          <li key={p.slug} className="flex items-center gap-4 py-3">
            <span className="relative block h-16 w-12 shrink-0 overflow-hidden border border-line bg-white">
              {p.colours[0] && <Image src={p.colours[0].image} alt="" fill sizes="48px" className="object-cover" />}
            </span>
            <Link href={`/admin/products/${p.slug}`} className="min-w-0 flex-1">
              <span className="block truncate text-[0.9375rem]">{p.name}</span>
              <span className="block text-[0.75rem] text-ash">
                {formatPrice(p.price)} · {p.left} left · {p.fit}
                {p.unisex ? " · Unisex" : ""}
              </span>
            </Link>
            <PublishToggle slug={p.slug} published={p.published} />
            <Link href={`/admin/products/${p.slug}`} className="text-[0.8125rem] underline underline-offset-2">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
