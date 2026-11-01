import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { getProduct, getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.colours.flatMap((c) => [c.image, c.back].filter(Boolean)).map((u) => (u!.startsWith("http") ? u : `${site.url}${u}`)),
            brand: { "@type": "Brand", name: site.plainName },
            material: product.fabric,
            sku: product.slug,
            offers: {
              "@type": "Offer",
              url: `${site.url}/shop/${product.slug}`,
              priceCurrency: "INR",
              price: product.price,
              availability: product.left > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
              itemCondition: "https://schema.org/NewCondition",
              shippingDetails: { "@type": "OfferShippingDetails", shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "INR" }, shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN" } },
              hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: "IN", returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 7 },
            },
          }),
        }}
      />
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
