import { notFound } from "next/navigation";
import { fromRow } from "@/lib/products";
import { serverClient } from "@/lib/supabase/server";
import { ProductForm } from "../product-form";

export default async function EditProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await serverClient();
  const { data: all } = await supabase.from("products").select("*").order("sort");
  const products = (all ?? []).map(fromRow);
  const isNew = slug === "new";
  const product = isNew ? null : products.find((p) => p.slug === slug);
  if (!isNew && !product) notFound();

  return (
    <>
      <h1 className="font-display text-3xl font-normal text-bur">{isNew ? "New piece" : product!.name}</h1>
      <ProductForm product={product ?? null} others={products.filter((p) => p.slug !== slug).map((p) => ({ slug: p.slug, name: p.name }))} />
    </>
  );
}
