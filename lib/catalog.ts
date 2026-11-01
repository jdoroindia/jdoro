import "server-only";
import { cache } from "react";
import { fallbackDrop, fromRow, sortProducts, type Drop, type Product } from "@/lib/products";
import { publicClient } from "@/lib/supabase/public";

/** Published products, unisex first. Cached per request; pages revalidate when admin saves. */
export const getProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await publicClient().from("products").select("*").eq("published", true);
  if (error) {
    console.error("getProducts", error.message);
    return [];
  }
  return sortProducts(data.map(fromRow));
});

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

export const getDrop = cache(async (): Promise<Drop> => {
  const { data } = await publicClient().from("drop_settings").select("number,name,line,intro").eq("id", 1).maybeSingle();
  return data ?? fallbackDrop;
});
