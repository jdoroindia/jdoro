import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { getProduct, getProducts } from "@/lib/catalog";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: { images: product.colours[0] ? [product.colours[0].image] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = (await getProducts()).filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <nav className="cap mx-auto max-w-[88rem] px-5 pt-8 text-[0.625rem] text-ash md:px-10" aria-label="Breadcrumb">
        <Link href="/shop" className="link-draw inline-block py-2">
          Shop
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>
      <ProductDetail product={product} />
      <section className="mx-auto max-w-[88rem] border-t border-line px-5 py-16 md:px-10">
        <h2 className="font-display text-3xl font-normal">You’ll also look good in</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
